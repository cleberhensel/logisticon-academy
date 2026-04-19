import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  Injector,
  signal,
  effect,
  afterNextRender
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ThemeService } from '../../../core/theme/theme.service';
import { injectMermaidFromMarkedHtml } from '../../markdown/inject-mermaid-from-html';
import { renderMermaidInContainer } from '../../markdown/render-mermaid-in-container';
import { stripDuplicateLeadingH1 } from '../../markdown/strip-duplicate-leading-h1';

@Component({
  selector: 'lk-lesson-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }
    .loading {
      padding: var(--lk-space-4);
      border-radius: var(--lk-radius-sm);
      background: var(--lk-bg-2);
      border: 1px solid var(--lk-border);
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
    }
    .error {
      padding: var(--lk-space-4);
      border-radius: var(--lk-radius-sm);
      background: rgba(196, 123, 111, 0.08);
      border: 1px solid var(--lk-danger);
      color: var(--lk-danger);
      font-size: var(--lk-fs-13);
    }
  `],
  template: `
    @if (loading()) {
      <div class="loading" aria-live="polite">A carregar aula...</div>
    } @else if (errorMsg()) {
      <div class="error" role="alert">{{ errorMsg() }}</div>
    } @else {
      <article class="lk-prose" [innerHTML]="lessonHtml()"></article>
    }
  `
})
export class LkLessonContentComponent implements OnChanges {
  @Input({ required: true }) mdPath!: string;
  /** Se o Markdown abrir com `#` igual a este título, o primeiro `<h1>` é omitido (o player já mostra o título). */
  @Input() lessonTitle: string | null | undefined;

  readonly loading = signal(false);
  readonly errorMsg = signal<string | null>(null);
  /** HTML já passado por DOMPurify; SafeHtml evita o sanitizer do Angular a remover data-mermaid / pre. */
  readonly lessonHtml = signal<SafeHtml | null>(null);

  private readonly http = inject(HttpClient);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly theme = inject(ThemeService);
  private readonly injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly domSanitizer = inject(DomSanitizer);

  constructor() {
    effect(() => {
      this.theme.mode();
      const body = this.lessonHtml();
      const busy = this.loading();
      if (body === null || busy) return;
      this.scheduleMermaidRender();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.mdPath) return;
    if (changes['mdPath'] || changes['lessonTitle']) {
      void this.load();
    }
  }

  private scheduleMermaidRender(): void {
    afterNextRender(
      () => {
        setTimeout(() => {
          const article = this.host.nativeElement.querySelector('article.lk-prose');
          if (!article) {
            return;
          }
          void renderMermaidInContainer(article as HTMLElement, () => this.theme.isDark()).then(() =>
            this.cdr.markForCheck()
          );
        }, 0);
      },
      { injector: this.injector }
    );
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    this.errorMsg.set(null);
    this.lessonHtml.set(null);
    try {
      const url = `assets/aulas/${this.mdPath}`;
      const md = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
      const parsed = await marked.parse(md, { gfm: true, breaks: false });
      const withMermaid = injectMermaidFromMarkedHtml(parsed);
      const safe = DOMPurify.sanitize(withMermaid, {
        ADD_ATTR: ['data-mermaid', 'data-processed', 'class', 'id'],
        ADD_TAGS: ['div', 'pre']
      });
      const withoutDup = stripDuplicateLeadingH1(safe, this.lessonTitle);
      this.lessonHtml.set(this.domSanitizer.bypassSecurityTrustHtml(withoutDup));
    } catch (err) {
      this.lessonHtml.set(null);
      this.errorMsg.set('Não foi possível carregar a aula.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
