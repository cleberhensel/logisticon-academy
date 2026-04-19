import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-20); margin: 0 0 var(--lk-space-1); }
    .sub { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-6); font-size: var(--lk-fs-13); }
    .alt { margin-top: var(--lk-space-5); text-align: center; font-size: var(--lk-fs-13); color: var(--lk-text-muted); }
  `],
  template: `
    <h1>Entrar</h1>
    <p class="sub">Aceda à sua área do aluno.</p>

    @if (errorMsg()) {
      <div class="alert alert--error" role="alert" style="margin-bottom: 1rem;">{{ errorMsg() }}</div>
    }

    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" formControlName="email" autocomplete="email" required />
        @if (showError('email')) {
          <div class="error-msg">Indique um e-mail válido.</div>
        }
      </div>

      <div class="field">
        <label for="password">Palavra-passe</label>
        <input id="password" type="password" formControlName="password" autocomplete="current-password" required />
        @if (showError('password')) {
          <div class="error-msg">Indique a sua palavra-passe.</div>
        }
      </div>

      <button type="submit" class="btn btn--strong btn--block btn--lg" [disabled]="loading() || form.invalid">
        {{ loading() ? 'A entrar…' : 'Entrar' }}
      </button>
    </form>

    <div class="alt">
      Ainda não tem conta? <a routerLink="/auth/registo">Criar conta</a>
    </div>
  `
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notify = inject(NotificationService);

  readonly loading = signal(false);
  readonly errorMsg = signal<string | null>(null);
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  showError(name: 'email' | 'password'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.dirty || c.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set(null);
    const { email, password } = this.form.getRawValue();
    this.auth.login({ email: email!, password: password! }).subscribe({
      next: () => {
        this.loading.set(false);
        this.notify.success('Sessão iniciada');
        const ret = this.route.snapshot.queryParamMap.get('returnUrl') || '/learn';
        void this.router.navigateByUrl(ret);
      },
      error: () => {
        this.loading.set(false);
        this.errorMsg.set('E-mail ou palavra-passe incorretos.');
      }
    });
  }
}
