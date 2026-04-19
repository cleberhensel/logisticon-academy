import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LearnService } from '../data/learn.service';
import { Outline } from '../data/learn.models';
import { LkProgressIndicatorComponent } from '../../../shared/components/lk-progress-indicator/lk-progress-indicator.component';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { LearnContextStore } from '../../../core/learn-context/learn-context.store';

@Component({
  selector: 'lk-outline',
  standalone: true,
  imports: [RouterLink, LkProgressIndicatorComponent, DurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-22); margin: 0 0 var(--lk-space-2); }
    .meta { color: var(--lk-text-muted); margin-bottom: var(--lk-space-6); max-width: 480px; }

    .module {
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-md);
      margin-bottom: var(--lk-space-3);
      overflow: hidden;
    }
    .module > header {
      padding: var(--lk-space-3) var(--lk-space-4);
      display: flex;
      justify-content: space-between;
      gap: var(--lk-space-3);
      align-items: center;
      background: var(--lk-bg-2);
      border-bottom: 1px solid var(--lk-border);
    }
    .module h2 { margin: 0; font-size: var(--lk-fs-14); font-weight: var(--lk-fw-medium); }
    .module ul { list-style: none; margin: 0; padding: 0; }
    .module li { margin: 0; padding: 0; }
    .module li + li { border-top: 1px solid var(--lk-border); }
    .lesson-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--lk-space-3);
      min-height: 2.75rem;
      padding: var(--lk-space-2) var(--lk-space-4);
      font-size: var(--lk-fs-13);
      color: var(--lk-text-muted);
      text-decoration: none;
      box-sizing: border-box;
      width: 100%;
      border: none;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font: inherit;
      transition: background-color 120ms ease, color 120ms ease;
    }
    a.lesson-row:hover {
      background: var(--lk-bg-hover);
      color: var(--lk-text);
    }
    a.lesson-row:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--lk-accent);
    }
    .lesson-row .left { display: flex; gap: var(--lk-space-2); align-items: flex-start; flex: 1; min-width: 0; }
    .lesson-row .icon {
      width: 16px;
      flex-shrink: 0;
      text-align: center;
      color: var(--lk-text-subtle);
      margin-top: 2px;
    }
    .lesson-row .icon.done { color: var(--lk-success); }
    .lesson-row .trail { min-width: 0; }
    .lesson-row .chev {
      flex-shrink: 0;
      font-size: var(--lk-fs-14);
      color: var(--lk-text-subtle);
      opacity: 0.7;
    }
    a.lesson-row:hover .chev { color: var(--lk-accent); opacity: 1; }
    .lesson-row--locked {
      cursor: default;
      pointer-events: none;
    }
    .quiz-row {
      padding: var(--lk-space-3) var(--lk-space-4);
      border-top: 1px solid var(--lk-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--lk-space-3);
      flex-wrap: wrap;
      background: var(--lk-bg-2);
      font-size: var(--lk-fs-13);
      color: var(--lk-text-muted);
    }
    .cert-card {
      margin-top: var(--lk-space-5);
      padding: var(--lk-space-4);
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-accent);
      border-radius: var(--lk-radius-md);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--lk-space-3);
      flex-wrap: wrap;
    }
    .loading { padding: var(--lk-space-4); color: var(--lk-text-muted); }
  `],
  template: `
    <section class="lk-page">
      @if (loading()) {
        <div class="loading">A carregar trilha…</div>
      } @else {
        @if (outline(); as o) {
          <h1>{{ o.trailTitle }}</h1>
          <div class="meta">
            <lk-progress-indicator [percent]="o.progressPercent" label="Progresso da trilha" />
          </div>

          @for (m of o.modules; track m.id) {
            <article class="module">
              <header>
                <h2>M{{ m.order }} · {{ m.title }}</h2>
                <span class="badge" [class.badge--success]="m.status === 'completed'"
                                    [class.badge--accent]="m.status === 'in-progress'">
                  {{ statusLabel(m.status) }}
                </span>
              </header>
              <ul>
                @for (l of m.lessons; track l.id) {
                  <li>
                    @if (l.status === 'locked') {
                      <div class="lesson-row lesson-row--locked" aria-disabled="true">
                        <span class="left">
                          <span class="icon" aria-hidden="true">⌬</span>
                          <span class="trail">{{ l.title }} <small class="lk-subtle">({{ l.durationMin | lkDuration }})</small></span>
                        </span>
                        <span class="lk-subtle">Bloqueado</span>
                      </div>
                    } @else {
                      <a
                        class="lesson-row"
                        [routerLink]="['/learn/trilhas', trailId(), 'aulas', l.id]"
                        [attr.aria-label]="(l.status === 'completed' ? 'Rever: ' : 'Abrir: ') + l.title"
                      >
                        <span class="left">
                          <span class="icon" [class.done]="l.status === 'completed'" aria-hidden="true">
                            {{ l.status === 'completed' ? '✓' : '·' }}
                          </span>
                          <span class="trail">{{ l.title }} <small class="lk-subtle">({{ l.durationMin | lkDuration }})</small></span>
                        </span>
                        <span class="chev" aria-hidden="true">→</span>
                      </a>
                    }
                  </li>
                }
              </ul>
              @if (m.hasQuiz) {
                <div class="quiz-row">
                  <span>
                    Avaliação do módulo
                    @if (m.quizApproved) { · <strong>Aprovado</strong> }
                    @else { · {{ m.quizAttemptsLeft }} tentativa(s) restantes }
                  </span>
                  @if (canStartQuiz(m)) {
                    <a class="btn btn--strong btn--sm" [routerLink]="['/learn/trilhas', trailId(), 'modulos', m.id, 'quiz']">
                      {{ m.quizApproved ? 'Refazer' : 'Iniciar quiz' }}
                    </a>
                  } @else {
                    <span class="lk-subtle">{{ m.status === 'locked' ? 'Bloqueado' : 'Conclua as aulas' }}</span>
                  }
                </div>
              }
            </article>
          }

          @if (o.certificateEligible) {
            <div class="cert-card">
              <span>Cumpriu os requisitos. Já pode emitir o seu certificado.</span>
              <a class="btn btn--strong" [routerLink]="['/learn/trilhas', trailId(), 'certificado']">Emitir certificado</a>
            </div>
          }
        } @else {
          <div class="alert alert--error">Não foi possível carregar a trilha.</div>
        }
      }
    </section>
  `
})
export class OutlinePage implements OnInit, OnDestroy {
  private readonly learn = inject(LearnService);
  private readonly route = inject(ActivatedRoute);
  private readonly learnCtx = inject(LearnContextStore);

  readonly loading = signal(true);
  readonly outline = signal<Outline | null>(null);

  trailId = () => this.route.snapshot.paramMap.get('trailId') || '';

  ngOnInit(): void {
    const id = this.trailId();
    if (!id) return;
    this.learnCtx.setActiveLesson(null);
    this.learn.getOutline(id).subscribe({
      next: (o) => {
        this.outline.set(o);
        this.learnCtx.setOutline(id, o);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  ngOnDestroy(): void {
    // Mantém o outline no store: assim, ao navegar para uma aula da mesma trilha,
    // a sidebar continua a mostrar a árvore. Limpa só ao sair completamente da trilha.
  }

  statusLabel(s: string): string {
    switch (s) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em curso';
      case 'available': return 'Disponível';
      case 'locked': return 'Bloqueado';
      default: return s;
    }
  }

  canStartQuiz(m: { status: string; quizAttemptsLeft: number; quizApproved: boolean }): boolean {
    if (m.status === 'locked') return false;
    if (m.quizApproved) return true;
    return m.quizAttemptsLeft > 0 && (m.status === 'in-progress' || m.status === 'completed');
  }
}
