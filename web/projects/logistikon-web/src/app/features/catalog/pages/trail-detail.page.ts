import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CatalogService } from '../data/catalog.service';
import { CatalogTrailDetail, Eligibility } from '../data/catalog.models';
import { SessionStore } from '../../../core/auth/session.store';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { OrderService } from '../../checkout/data/order.service';
import { StripeService } from '../../checkout/data/stripe.service';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-trail-detail',
  standalone: true,
  imports: [RouterLink, DurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-22); margin: 0 0 var(--lk-space-2); letter-spacing: -0.01em; }
    .meta { display: flex; flex-wrap: wrap; gap: var(--lk-space-2); margin: var(--lk-space-3) 0 var(--lk-space-5); }
    .summary {
      font-size: var(--lk-fs-15);
      line-height: var(--lk-lh-loose);
      color: var(--lk-text-muted);
      margin: 0 0 var(--lk-space-6);
      max-width: 70ch;
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
      gap: var(--lk-space-6);
      align-items: flex-start;
    }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }

    h2 {
      font-size: var(--lk-fs-13);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--lk-text-subtle);
      margin: 0 0 var(--lk-space-3);
      font-weight: var(--lk-fw-medium);
    }

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
      background: var(--lk-bg-2);
      border-bottom: 1px solid var(--lk-border);
      font-size: var(--lk-fs-14);
    }
    .module h3 { margin: 0; font-size: var(--lk-fs-14); font-weight: var(--lk-fw-medium); }
    .module ul { list-style: none; margin: 0; padding: var(--lk-space-2) var(--lk-space-4) var(--lk-space-3); }
    .module li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--lk-space-2) 0;
      border-bottom: 1px solid var(--lk-border);
      font-size: var(--lk-fs-13);
      color: var(--lk-text-muted);
    }
    .module li:last-child { border-bottom: 0; }
    .module li .num { color: var(--lk-text-subtle); margin-right: var(--lk-space-2); }
    .module li .dur { font-size: var(--lk-fs-12); color: var(--lk-text-subtle); }

    .buy {
      position: sticky;
      top: calc(var(--lk-topbar-h) + var(--lk-space-4));
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-md);
      padding: var(--lk-space-5);
    }
    .buy .price {
      font-size: var(--lk-fs-22);
      font-weight: var(--lk-fw-bold);
      color: var(--lk-text);
      letter-spacing: -0.01em;
    }
    .buy .price.no { font-size: var(--lk-fs-13); color: var(--lk-text-muted); font-weight: var(--lk-fw-regular); }
    .buy .reason { margin-top: var(--lk-space-3); font-size: var(--lk-fs-12); color: var(--lk-text-muted); }
    .buy .reason.warn { color: var(--lk-warn); }
    .buy .actions { margin-top: var(--lk-space-4); display: flex; flex-direction: column; gap: var(--lk-space-2); }
    .loading { padding: var(--lk-space-4); color: var(--lk-text-muted); }
  `],
  template: `
    <section class="lk-page">
      @if (loading()) {
        <div class="loading" aria-live="polite">A carregar trilha…</div>
      } @else if (errorMsg()) {
        <div class="alert alert--error" role="alert">{{ errorMsg() }}</div>
      } @else {
        @if (trail(); as t) {
          <h1>{{ t.title }}</h1>
          <div class="meta">
            <span class="badge">Nível: {{ t.level }}</span>
            <span class="badge">{{ t.durationHours }}h</span>
            <span class="badge">{{ t.language }}</span>
            <span class="badge">{{ totalLessons() }} aulas · {{ t.modules.length }} módulos</span>
          </div>

          <p class="summary">{{ t.summary }}</p>

          <div class="layout">
            <div>
              <h2>Conteúdo programático</h2>
              @for (m of t.modules; track m.id) {
                <article class="module">
                  <header>
                    <h3>M{{ m.order }} · {{ m.title }}</h3>
                    <span class="lk-subtle">{{ m.lessons.length }} aulas</span>
                  </header>
                  <ul>
                    @for (l of m.lessons; track l.id) {
                      <li>
                        <span><span class="num">{{ l.order }}.</span>{{ l.title }}</span>
                        <span class="dur">{{ l.durationMin | lkDuration }}</span>
                      </li>
                    }
                  </ul>
                </article>
              }
            </div>

            <aside class="buy" aria-label="Comprar trilha">
              @if (t.price) {
                <div class="price">{{ formatPrice(t.price.amountCents, t.price.currency) }}</div>
                <div class="reason">Acesso vitalício após pagamento.</div>
              } @else {
                <div class="price no">Sem preço ativo neste momento.</div>
              }

              <div class="actions">
                @if (eligibility(); as elig) {
                  @if (elig.canEnroll) {
                    <button type="button" class="btn btn--strong btn--block btn--lg" (click)="buy()" [disabled]="buying()">
                      {{ buying() ? 'A redirecionar…' : 'Comprar agora' }}
                    </button>
                  } @else if (elig.reason === 'NEEDS_AUTH') {
                    <a class="btn btn--strong btn--block btn--lg" [routerLink]="['/auth/login']" [queryParams]="{ returnUrl: returnUrl() }">Entrar para comprar</a>
                    <div class="reason">Crie conta ou entre antes de comprar.</div>
                  } @else if (elig.reason === 'ALREADY_ENROLLED') {
                    <a class="btn btn--strong btn--block btn--lg" [routerLink]="['/learn/trilhas', t.slug]">Ir para a área do aluno</a>
                    <div class="reason">Já está matriculado nesta trilha.</div>
                  } @else if (elig.reason === 'ADMIN_ACCESS') {
                    <a class="btn btn--strong btn--block btn--lg" [routerLink]="['/learn/trilhas', t.slug]">Aceder como admin</a>
                    <div class="reason">Tem acesso administrativo a todas as trilhas.</div>
                  } @else {
                    <button type="button" class="btn btn--block btn--lg" disabled>Indisponível</button>
                    <div class="reason warn">Não disponível para compra agora.</div>
                  }
                }
              </div>
            </aside>
          </div>
        }
      }
    </section>
  `
})
export class TrailDetailPage implements OnInit {
  private readonly catalog = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly session = inject(SessionStore);
  private readonly orders = inject(OrderService);
  private readonly stripe = inject(StripeService);
  private readonly notify = inject(NotificationService);

  readonly loading = signal(true);
  readonly errorMsg = signal<string | null>(null);
  readonly trail = signal<CatalogTrailDetail | null>(null);
  readonly eligibility = signal<Eligibility | null>(null);
  readonly buying = signal(false);

  readonly totalLessons = computed(() => {
    const t = this.trail();
    if (!t) return 0;
    return t.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  });

  returnUrl = () => `/trilhas/${this.route.snapshot.paramMap.get('slug')}`;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.errorMsg.set('Trilha não encontrada.');
      this.loading.set(false);
      return;
    }
    forkJoin({
      detail: this.catalog.detail(slug),
      eligibility: this.catalog.eligibility(slug)
    }).subscribe({
      next: ({ detail, eligibility }) => {
        this.trail.set(detail);
        this.eligibility.set(eligibility);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('Não foi possível carregar a trilha.');
        this.loading.set(false);
      }
    });
  }

  formatPrice(amountCents: number, currency: string): string {
    return `${(amountCents / 100).toFixed(2)} ${currency}`;
  }

  buy(): void {
    const t = this.trail();
    if (!t) return;
    if (!this.session.isAuthenticated()) {
      void this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl() } });
      return;
    }
    this.buying.set(true);
    this.orders.create({ trailId: t.id }).subscribe({
      next: (order) => {
        this.stripe.startCheckout(order.id).subscribe({
          next: (session) => { window.location.href = session.url; },
          error: () => {
            this.buying.set(false);
            this.notify.error('Não foi possível iniciar o pagamento.');
          }
        });
      },
      error: (err) => {
        this.buying.set(false);
        const code = err?.error?.error?.code;
        if (code === 'ALREADY_ENROLLED') {
          this.notify.info('Já está matriculado.');
          void this.router.navigate(['/learn/trilhas', t.slug]);
        } else {
          this.notify.error('Não foi possível criar o pedido.');
        }
      }
    });
  }
}
