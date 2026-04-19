import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../data/quiz.service';
import { QuizAnswers, QuizStartResponse, QuizSubmitResponse } from '../data/quiz.models';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-quiz',
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-22); margin: 0 0 var(--lk-space-1); }
    .meta { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-6); font-size: var(--lk-fs-13); }

    fieldset {
      border: 1px solid var(--lk-border);
      background: var(--lk-bg-1);
      border-radius: var(--lk-radius-md);
      margin: 0 0 var(--lk-space-3);
      padding: var(--lk-space-4);
    }
    legend {
      font-weight: var(--lk-fw-medium);
      font-size: var(--lk-fs-14);
      padding: 0 var(--lk-space-2);
      color: var(--lk-text);
    }
    .options { display: flex; flex-direction: column; gap: var(--lk-space-1); margin-top: var(--lk-space-3); }
    .options label {
      display: flex;
      align-items: flex-start;
      gap: var(--lk-space-2);
      padding: var(--lk-space-2) var(--lk-space-3);
      border-radius: var(--lk-radius-sm);
      cursor: pointer;
      font-size: var(--lk-fs-13);
      color: var(--lk-text);
      border: 1px solid transparent;
    }
    .options label:hover { background: var(--lk-bg-hover); border-color: var(--lk-border); }
    .options input[type="radio"] { margin-top: 2px; flex-shrink: 0; }

    .submit-row {
      display: flex;
      justify-content: space-between;
      gap: var(--lk-space-3);
      margin-top: var(--lk-space-5);
      flex-wrap: wrap;
    }

    .result {
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-md);
      padding: var(--lk-space-5);
      background: var(--lk-bg-1);
    }
    .result.success { border-color: var(--lk-success); background: rgba(143, 179, 122, 0.06); }
    .result.fail { border-color: var(--lk-warn); background: rgba(201, 169, 107, 0.06); }
    .result.no-attempts { border-color: var(--lk-danger); background: rgba(196, 123, 111, 0.06); }
    .result h2 { margin: 0 0 var(--lk-space-2); font-size: var(--lk-fs-18); }
    .result p { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-3); }
    .result .actions { display: flex; gap: var(--lk-space-2); flex-wrap: wrap; }
  `],
  template: `
    <section class="lk-page">
      @if (loading()) {
        <p class="lk-muted">A preparar o quiz…</p>
      } @else if (loadError()) {
        <div class="result no-attempts" role="alert">
          <h2>Não é possível iniciar o quiz</h2>
          <p>{{ loadError() }}</p>
          <div class="actions">
            <a class="btn" [routerLink]="['/learn/trilhas', trailIdParam()]">Voltar à trilha</a>
          </div>
        </div>
      } @else {
        @if (result(); as r) {
          @if (r.approved) {
            <div class="result success" role="status">
              <h2>Aprovado · {{ r.score }}%</h2>
              <p>Acertou {{ r.correct }} de {{ r.total }} perguntas. Pode avançar.</p>
              <div class="actions">
                <a class="btn btn--strong" [routerLink]="['/learn/trilhas', trailIdParam()]">Voltar à trilha</a>
              </div>
            </div>
          } @else if (r.attemptsLeft > 0) {
            <div class="result fail" role="status">
              <h2>Não aprovado · {{ r.score }}%</h2>
              <p>Mínimo necessário: {{ r.minScore }}%. Tem mais {{ r.attemptsLeft }} tentativa(s).</p>
              <div class="actions">
                <button type="button" class="btn btn--strong" (click)="retry()">Tentar de novo</button>
                <a class="btn" [routerLink]="['/learn/trilhas', trailIdParam()]">Voltar à trilha</a>
              </div>
            </div>
          } @else {
            <div class="result no-attempts" role="alert">
              <h2>Tentativas esgotadas</h2>
              <p>Reveja os materiais do módulo. Pode contactar o suporte se precisar de novas tentativas.</p>
              <div class="actions">
                <a class="btn" [routerLink]="['/learn/trilhas', trailIdParam()]">Voltar à trilha</a>
              </div>
            </div>
          }
        } @else {
          @if (quiz(); as q) {
            <h1>Avaliação do módulo</h1>
            <div class="meta">Mínimo: {{ q.minScore }}% · Tentativas restantes: {{ q.attemptsLeft }}</div>

            <form (submit)="$event.preventDefault(); submit()" novalidate>
              @for (question of q.questions; track question.id; let i = $index) {
                <fieldset>
                  <legend>{{ i + 1 }}. {{ question.stem }}</legend>
                  <div class="options">
                    @for (opt of question.options; track opt.id) {
                      <label>
                        <input type="radio" [name]="question.id" [value]="opt.id" [(ngModel)]="answers[question.id]" />
                        <span>{{ opt.label }}</span>
                      </label>
                    }
                  </div>
                </fieldset>
              }

              <div class="submit-row">
                <a class="btn btn--quiet" [routerLink]="['/learn/trilhas', trailIdParam()]">Cancelar</a>
                <button type="submit" class="btn btn--strong btn--lg" [disabled]="!allAnswered() || submitting()">
                  {{ submitting() ? 'A submeter…' : 'Submeter respostas' }}
                </button>
              </div>
            </form>
          }
        }
      }
    </section>
  `
})
export class QuizPage implements OnInit {
  private readonly quizSvc = inject(QuizService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly quiz = signal<QuizStartResponse | null>(null);
  readonly result = signal<QuizSubmitResponse | null>(null);
  readonly submitting = signal(false);
  answers: QuizAnswers = {};

  trailIdParam = () => this.route.snapshot.paramMap.get('trailId') || '';
  moduleId = () => this.route.snapshot.paramMap.get('moduleId') || '';

  ngOnInit(): void {
    this.start();
  }

  retry(): void {
    this.result.set(null);
    this.answers = {};
    this.start();
  }

  private start(): void {
    this.loading.set(true);
    this.loadError.set(null);
    this.quizSvc.start(this.moduleId()).subscribe({
      next: (q) => {
        this.quiz.set(q);
        this.answers = {};
        q.questions.forEach((qq) => (this.answers[qq.id] = ''));
        this.loading.set(false);
      },
      error: (err) => {
        const code = err?.error?.error?.code;
        if (code === 'NO_ATTEMPTS_LEFT') this.loadError.set('Esgotou as tentativas para este módulo.');
        else if (code === 'ENROLLMENT_REQUIRED') this.loadError.set('Sem matrícula nesta trilha.');
        else this.loadError.set('Não foi possível iniciar o quiz.');
        this.loading.set(false);
      }
    });
  }

  allAnswered(): boolean {
    const q = this.quiz();
    if (!q) return false;
    return q.questions.every((qq) => this.answers[qq.id]);
  }

  submit(): void {
    const q = this.quiz();
    if (!q || !this.allAnswered()) return;
    this.submitting.set(true);
    this.quizSvc.submit(q.attemptId, this.answers).subscribe({
      next: (r) => {
        this.result.set(r);
        this.submitting.set(false);
        if (r.approved) this.notify.success(`Aprovado com ${r.score}%`);
      },
      error: () => {
        this.submitting.set(false);
        this.notify.error('Não foi possível submeter o quiz.');
      }
    });
  }
}
