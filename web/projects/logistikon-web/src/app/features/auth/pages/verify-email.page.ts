import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { SessionStore } from '../../../core/auth/session.store';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-verify-email',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-20); margin: 0 0 var(--lk-space-1); }
    .sub { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-6); font-size: var(--lk-fs-13); }
    .resend {
      margin-top: var(--lk-space-4);
      text-align: center;
    }
  `],
  template: `
    <h1>Verificar e-mail</h1>
    <p class="sub">Cole abaixo o token enviado para o seu e-mail.</p>

    @if (status() === 'success') {
      <div class="alert alert--success" role="status" style="margin-bottom: 1rem;">
        E-mail verificado com sucesso. <a routerLink="/learn">Ir para a área do aluno</a>.
      </div>
    } @else if (status() === 'error') {
      <div class="alert alert--error" role="alert" style="margin-bottom: 1rem;">{{ errorMsg() }}</div>
    }

    @if (status() !== 'success') {
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="field">
          <label for="token">Token de verificação</label>
          <input id="token" type="text" formControlName="token" autocomplete="off" required />
        </div>
        <button type="submit" class="btn btn--strong btn--block btn--lg" [disabled]="loading() || form.invalid">
          {{ loading() ? 'A verificar…' : 'Verificar e-mail' }}
        </button>
      </form>

      <div class="resend">
        <button type="button" class="btn btn--quiet btn--sm" (click)="resend()" [disabled]="resending()">
          {{ resending() ? 'A reenviar…' : 'Reenviar e-mail de verificação' }}
        </button>
      </div>
    }
  `
})
export class VerifyEmailPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly session = inject(SessionStore);
  private readonly route = inject(ActivatedRoute);
  private readonly notify = inject(NotificationService);

  readonly status = signal<'idle' | 'success' | 'error'>('idle');
  readonly errorMsg = signal<string>('');
  readonly loading = signal(false);
  readonly resending = signal(false);

  readonly form = this.fb.group({
    token: ['', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit(): void {
    const tokenFromUrl = this.route.snapshot.queryParamMap.get('token');
    if (tokenFromUrl) {
      this.form.patchValue({ token: tokenFromUrl });
      this.submit();
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.status.set('idle');
    const token = this.form.value.token!;
    this.auth.verifyEmail(token).subscribe({
      next: () => {
        this.loading.set(false);
        this.status.set('success');
      },
      error: () => {
        this.loading.set(false);
        this.status.set('error');
        this.errorMsg.set('Token inválido ou expirado. Reenvie e tente de novo.');
      }
    });
  }

  resend(): void {
    const email = this.session.user()?.email;
    if (!email) {
      this.notify.info('Inicie sessão para reenviar.');
      return;
    }
    this.resending.set(true);
    this.auth.resendVerification(email).subscribe({
      next: () => { this.resending.set(false); this.notify.success('E-mail reenviado se a conta existir.'); },
      error: () => { this.resending.set(false); this.notify.error('Não foi possível reenviar.'); }
    });
  }
}
