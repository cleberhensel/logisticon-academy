import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StripeService } from '../data/stripe.service';

@Component({
  selector: 'lk-checkout-success',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-20); margin: 0 0 var(--lk-space-4); }
    .actions { display: flex; gap: var(--lk-space-2); flex-wrap: wrap; margin-top: var(--lk-space-4); }
    .sub { color: var(--lk-text-muted); font-size: var(--lk-fs-13); margin: var(--lk-space-2) 0 0; }
  `],
  template: `
    <h1>Confirmação de pagamento</h1>

    @if (state() === 'loading') {
      <div class="alert alert--info" role="status" aria-live="polite">
        A confirmar o seu pagamento… Por favor, aguarde.
      </div>
    } @else if (state() === 'paid') {
      <div class="alert alert--success" role="status" aria-live="polite">
        Pagamento confirmado. A sua matrícula está ativa.
      </div>
      <p class="sub">Já pode aceder à trilha na sua área do aluno.</p>
      <div class="actions">
        <a class="btn btn--strong" routerLink="/learn">Ir para a área do aluno</a>
        <a class="btn" routerLink="/trilhas">Ver outras trilhas</a>
      </div>
    } @else {
      <div class="alert alert--error" role="alert">
        {{ errorMsg() }}
      </div>
      <div class="actions">
        <a class="btn" routerLink="/trilhas">Voltar ao catálogo</a>
      </div>
    }
  `
})
export class CheckoutSuccessPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly stripe = inject(StripeService);

  readonly state = signal<'loading' | 'paid' | 'error'>('loading');
  readonly errorMsg = signal<string>('Não foi possível confirmar o pagamento.');

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (!sessionId) {
      this.state.set('error');
      this.errorMsg.set('Sessão de checkout em falta.');
      return;
    }
    this.stripe.simulateWebhook(sessionId, 'complete').subscribe({
      next: (res) => {
        if (res.status === 'paid' || res.status === 'already_paid') {
          this.state.set('paid');
        } else {
          this.state.set('error');
        }
      },
      error: () => {
        this.state.set('error');
      }
    });
  }
}
