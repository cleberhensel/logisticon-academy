import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lk-stripe-stub',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-20); margin: 0 0 var(--lk-space-4); }
    .row { display: flex; gap: var(--lk-space-2); }
    .row > * { flex: 1; }
    .helper { font-size: var(--lk-fs-12); color: var(--lk-text-subtle); text-align: center; margin-top: var(--lk-space-5); }
    .badge-sim { display: inline-block; margin-bottom: var(--lk-space-3); }
  `],
  template: `
    <span class="badge badge--accent badge-sim">SIMULAÇÃO STRIPE · POC</span>
    <h1>Confirmar pagamento</h1>

    <form (submit)="$event.preventDefault(); pay()">
      <div class="field">
        <label for="card">Número do cartão</label>
        <input id="card" type="text" value="4242 4242 4242 4242" autocomplete="cc-number" />
      </div>
      <div class="row">
        <div class="field">
          <label for="exp">Validade</label>
          <input id="exp" type="text" value="12/30" autocomplete="cc-exp" />
        </div>
        <div class="field">
          <label for="cvc">CVC</label>
          <input id="cvc" type="text" value="123" autocomplete="cc-csc" />
        </div>
      </div>
      <button type="submit" class="btn btn--strong btn--block btn--lg" [disabled]="processing()">
        {{ processing() ? 'A processar…' : 'Pagar' }}
      </button>
    </form>

    <div style="text-align:center; margin-top: 1rem;">
      <button type="button" class="btn btn--quiet btn--sm" (click)="cancel()">Cancelar</button>
    </div>

    <p class="helper">Esta página simula o ecrã do Stripe Checkout. Nenhum pagamento real é efetuado.</p>
  `
})
export class StripeStubPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly processing = signal(false);
  private sessionId = '';

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id') || '';
  }

  pay(): void {
    this.processing.set(true);
    setTimeout(() => {
      void this.router.navigate(['/checkout/sucesso'], { queryParams: { session_id: this.sessionId } });
    }, 800);
  }

  cancel(): void {
    void this.router.navigate(['/checkout/cancelado'], { queryParams: { session_id: this.sessionId } });
  }
}
