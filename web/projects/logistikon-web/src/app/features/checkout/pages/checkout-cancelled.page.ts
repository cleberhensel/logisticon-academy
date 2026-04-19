import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StripeService } from '../data/stripe.service';

@Component({
  selector: 'lk-checkout-cancelled',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-20); margin: 0 0 var(--lk-space-4); }
    .actions { display: flex; gap: var(--lk-space-2); flex-wrap: wrap; margin-top: var(--lk-space-4); }
  `],
  template: `
    <h1>Pagamento cancelado</h1>
    <div class="alert alert--warn" role="status">
      O pagamento não foi concluído. O seu pedido permanece pendente.
    </div>
    <div class="actions">
      <a class="btn btn--strong" routerLink="/trilhas">Voltar ao catálogo</a>
      <a class="btn" routerLink="/learn">Área do aluno</a>
    </div>
  `
})
export class CheckoutCancelledPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly stripe = inject(StripeService);

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      this.stripe.simulateWebhook(sessionId, 'cancel').subscribe({ error: () => undefined });
    }
  }
}
