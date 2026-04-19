import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../features/catalog/data/catalog.service';
import { CatalogTrailListItem } from '../../features/catalog/data/catalog.models';
import { LearnContextStore } from '../../core/learn-context/learn-context.store';
import { UiStateStore } from '../../core/ui-state/ui-state.store';

interface PaletteItem {
  id: string;
  kind: 'trail' | 'lesson' | 'route';
  label: string;
  hint?: string;
  go: () => void;
}

@Component({
  selector: 'lk-command-palette',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(2px);
      z-index: 200;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 12vh;
    }
    .panel {
      width: min(640px, calc(100vw - 2rem));
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border-strong);
      border-radius: var(--lk-radius-md);
      box-shadow: var(--lk-shadow-2);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 70vh;
    }
    .search {
      display: flex;
      align-items: center;
      gap: var(--lk-space-2);
      padding: var(--lk-space-3) var(--lk-space-4);
      border-bottom: 1px solid var(--lk-border);
    }
    .search input {
      flex: 1;
      background: transparent;
      border: none;
      padding: 0;
      font-size: var(--lk-fs-15);
      color: var(--lk-text);
    }
    .search input:focus-visible { box-shadow: none; outline: none; }
    .icon { color: var(--lk-text-muted); font-size: var(--lk-fs-18); }
    kbd {
      font-family: var(--lk-font-mono);
      font-size: var(--lk-fs-12);
      padding: 2px 6px;
      background: var(--lk-bg-2);
      border: 1px solid var(--lk-border);
      border-radius: 3px;
      color: var(--lk-text-muted);
    }
    .results {
      overflow-y: auto;
      padding: var(--lk-space-2) 0;
    }
    .group {
      padding: 0 var(--lk-space-4);
      margin-top: var(--lk-space-3);
      font-size: var(--lk-fs-12);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--lk-text-subtle);
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--lk-space-3);
      padding: var(--lk-space-2) var(--lk-space-4);
      cursor: pointer;
      font-size: var(--lk-fs-14);
      color: var(--lk-text);
    }
    .item .hint { font-size: var(--lk-fs-12); color: var(--lk-text-muted); }
    .item.active,
    .item:hover {
      background: var(--lk-bg-hover);
    }
    .item.active { border-left: 2px solid var(--lk-accent); padding-left: calc(var(--lk-space-4) - 2px); }
    .empty {
      padding: var(--lk-space-6);
      text-align: center;
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
    }
    .footer {
      border-top: 1px solid var(--lk-border);
      padding: var(--lk-space-2) var(--lk-space-4);
      font-size: var(--lk-fs-12);
      color: var(--lk-text-subtle);
      display: flex;
      gap: var(--lk-space-4);
      flex-wrap: wrap;
    }
  `],
  template: `
    @if (ui.paletteOpen()) {
      <div class="backdrop" role="presentation" (click)="close()">
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label="Pesquisa rápida"
          (click)="$event.stopPropagation()"
        >
          <div class="search">
            <span class="icon" aria-hidden="true">⌕</span>
            <input
              #input
              type="text"
              placeholder="Pesquisar trilhas, aulas ou ações…"
              [ngModel]="query()"
              (ngModelChange)="setQuery($event)"
              (keydown)="onKey($event)"
              aria-label="Pesquisa"
            />
            <kbd>esc</kbd>
          </div>
          <div class="results" role="listbox">
            @if (filtered().length === 0) {
              <div class="empty">Sem resultados.</div>
            } @else {
              @for (group of grouped(); track group.title) {
                <div class="group">{{ group.title }}</div>
                @for (item of group.items; track item.id) {
                  <div
                    class="item"
                    role="option"
                    [class.active]="item.id === activeId()"
                    (mouseenter)="setActive(item.id)"
                    (click)="go(item)"
                  >
                    <span>{{ item.label }}</span>
                    @if (item.hint) { <span class="hint">{{ item.hint }}</span> }
                  </div>
                }
              }
            }
          </div>
          <div class="footer">
            <span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span>
            <span><kbd>↵</kbd> abrir</span>
            <span><kbd>esc</kbd> fechar</span>
          </div>
        </div>
      </div>
    }
  `
})
export class CommandPaletteComponent {
  readonly ui = inject(UiStateStore);
  private readonly catalog = inject(CatalogService);
  private readonly learnCtx = inject(LearnContextStore);
  private readonly router = inject(Router);

  @ViewChild('input') input?: ElementRef<HTMLInputElement>;

  readonly query = signal('');
  readonly trails = signal<CatalogTrailListItem[]>([]);
  readonly activeId = signal<string | null>(null);

  private readonly routes: PaletteItem[] = [
    { id: 'r:catalog', kind: 'route', label: 'Ir para Catálogo', hint: '/trilhas', go: () => this.nav('/trilhas') },
    { id: 'r:dashboard', kind: 'route', label: 'Ir para Dashboard', hint: '/learn', go: () => this.nav('/learn') },
    { id: 'r:verify', kind: 'route', label: 'Validar certificado', hint: '/certificado/verificar', go: () => this.nav('/certificado/verificar') }
  ];

  readonly trailItems = computed<PaletteItem[]>(() =>
    this.trails().map((t) => ({
      id: `t:${t.id}`,
      kind: 'trail' as const,
      label: t.title,
      hint: `${t.moduleCount} módulos · ${t.durationHours}h`,
      go: () => this.nav(`/trilhas/${t.slug}`)
    }))
  );

  readonly lessonItems = computed<PaletteItem[]>(() => {
    const o = this.learnCtx.outline();
    const slug = this.learnCtx.trailIdOrSlug();
    if (!o || !slug) return [];
    const items: PaletteItem[] = [];
    for (const m of o.modules) {
      for (const l of m.lessons) {
        items.push({
          id: `l:${l.id}`,
          kind: 'lesson',
          label: `${m.order}.${l.title}`,
          hint: `Trilha em curso`,
          go: () => this.nav(`/learn/trilhas/${slug}/aulas/${l.id}`)
        });
      }
    }
    return items;
  });

  readonly filtered = computed<PaletteItem[]>(() => {
    const q = this.query().trim().toLowerCase();
    const all = [...this.lessonItems(), ...this.trailItems(), ...this.routes];
    if (!q) return all.slice(0, 30);
    return all.filter((i) => i.label.toLowerCase().includes(q) || (i.hint ?? '').toLowerCase().includes(q)).slice(0, 30);
  });

  readonly grouped = computed(() => {
    const items = this.filtered();
    const lessons = items.filter((i) => i.kind === 'lesson');
    const trails = items.filter((i) => i.kind === 'trail');
    const routes = items.filter((i) => i.kind === 'route');
    const groups: { title: string; items: PaletteItem[] }[] = [];
    if (lessons.length) groups.push({ title: 'Aulas (trilha em curso)', items: lessons });
    if (trails.length) groups.push({ title: 'Trilhas', items: trails });
    if (routes.length) groups.push({ title: 'Navegação', items: routes });
    return groups;
  });

  constructor() {
    effect(() => {
      if (this.ui.paletteOpen()) {
        this.ensureTrailsLoaded();
        queueMicrotask(() => this.input?.nativeElement?.focus());
        const first = this.filtered()[0];
        this.activeId.set(first ? first.id : null);
      }
    });
  }

  setQuery(q: string): void {
    this.query.set(q);
    const first = this.filtered()[0];
    this.activeId.set(first ? first.id : null);
  }

  setActive(id: string): void { this.activeId.set(id); }

  close(): void {
    this.ui.closePalette();
    this.query.set('');
  }

  go(item: PaletteItem): void {
    item.go();
    this.close();
  }

  onKey(ev: KeyboardEvent): void {
    const list = this.filtered();
    if (!list.length) return;
    const idx = list.findIndex((i) => i.id === this.activeId());
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      const next = list[(idx + 1) % list.length];
      this.activeId.set(next.id);
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      const prev = list[(idx - 1 + list.length) % list.length];
      this.activeId.set(prev.id);
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      const cur = list[idx >= 0 ? idx : 0];
      if (cur) this.go(cur);
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocKey(ev: KeyboardEvent): void {
    const isCmd = ev.metaKey || ev.ctrlKey;
    if (isCmd && (ev.key === 'k' || ev.key === 'K')) {
      ev.preventDefault();
      this.ui.togglePalette();
    } else if (ev.key === 'Escape' && this.ui.paletteOpen()) {
      ev.preventDefault();
      this.close();
    }
  }

  private nav(url: string): void {
    void this.router.navigateByUrl(url);
  }

  private ensureTrailsLoaded(): void {
    if (this.trails().length > 0) return;
    this.catalog.list(1, 50).subscribe({
      next: (res) => this.trails.set(res.items),
      error: () => this.trails.set([])
    });
  }
}
