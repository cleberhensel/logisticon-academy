import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LearnService } from '../data/learn.service';
import { Enrollment } from '../data/learn.models';
import { LkProgressIndicatorComponent } from '../../../shared/components/lk-progress-indicator/lk-progress-indicator.component';
import { SessionStore } from '../../../core/auth/session.store';

@Component({
  selector: 'lk-dashboard',
  standalone: true,
  imports: [RouterLink, LkProgressIndicatorComponent, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-22); margin: 0 0 var(--lk-space-1); }
    .greeting { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-6); font-size: var(--lk-fs-13); }

    .lk-grid > a.card {
      height: 100%;
      min-height: 0;
    }

    .empty {
      padding: var(--lk-space-8);
      text-align: center;
      border: 1px dashed var(--lk-border-strong);
      border-radius: var(--lk-radius-md);
      color: var(--lk-text-muted);
    }
    .empty p { margin: 0 0 var(--lk-space-3); font-size: var(--lk-fs-13); }

    a.card {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-md);
      padding: var(--lk-space-4);
      display: flex;
      flex-direction: column;
      gap: var(--lk-space-3);
      transition: border-color 120ms ease, background-color 120ms ease;
    }
    a.card:hover {
      border-color: var(--lk-border-strong);
      background: var(--lk-bg-2);
    }
    a.card:focus-visible {
      outline: none;
      box-shadow: var(--lk-focus-ring);
    }
    .card h2 {
      font-size: var(--lk-fs-15);
      font-weight: var(--lk-fw-medium);
      margin: 0;
      line-height: 1.3;
      color: var(--lk-text);
    }
    .card .meta { font-size: var(--lk-fs-12); color: var(--lk-text-subtle); }
    .card .row-end {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: auto;
      padding-top: var(--lk-space-1);
    }
    .card .chev {
      font-size: var(--lk-fs-16);
      color: var(--lk-text-subtle);
      line-height: 1;
    }
    a.card:hover .chev { color: var(--lk-accent); }
  `],
  template: `
    <section class="lk-page">
      <h1>Olá, {{ session.user()?.name }}</h1>
      <p class="greeting">
        @if (session.isAdmin()) {
          Acesso de administrador — todas as trilhas publicadas estão disponíveis.
        } @else {
          Continue de onde parou.
        }
      </p>

      @if (loading()) {
        <div class="empty">A carregar matrículas…</div>
      } @else if (enrollments().length === 0) {
        <div class="empty">
          <p>Ainda não tem matrículas ativas.</p>
          <a class="btn btn--strong" routerLink="/trilhas">Explorar catálogo</a>
        </div>
      } @else {
        <div class="lk-grid">
          @for (e of enrollments(); track e.id) {
            <a
              class="card"
              [routerLink]="['/learn/trilhas', e.trailSlug]"
              [attr.aria-label]="ariaTrailCard(e)"
            >
              <h2>{{ e.trailTitle }}</h2>
              <div class="meta">
                @if (session.isAdmin()) {
                  Acesso administrativo
                } @else {
                  Matriculado em {{ e.enrolledAt | date:'dd/MM/yyyy' }}
                }
              </div>
              <lk-progress-indicator [percent]="e.progressPercent" label="Progresso da trilha" />
              <div class="row-end">
                <span class="chev" aria-hidden="true">→</span>
              </div>
            </a>
          }
        </div>
      }
    </section>
  `
})
export class DashboardPage implements OnInit {
  private readonly learn = inject(LearnService);
  readonly session = inject(SessionStore);

  readonly loading = signal(true);
  readonly enrollments = signal<Enrollment[]>([]);

  ariaTrailCard(e: Enrollment): string {
    return `${e.trailTitle}. ${e.progressPercent}% concluído.`;
  }

  ngOnInit(): void {
    this.learn.listEnrollments().subscribe({
      next: (list) => { this.enrollments.set(list); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
