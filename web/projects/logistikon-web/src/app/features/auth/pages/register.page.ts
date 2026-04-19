import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-20); margin: 0 0 var(--lk-space-1); }
    .sub { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-6); font-size: var(--lk-fs-13); }
    .alt { margin-top: var(--lk-space-5); text-align: center; font-size: var(--lk-fs-13); color: var(--lk-text-muted); }
  `],
  template: `
    <h1>Criar conta</h1>
    <p class="sub">Demora menos de um minuto.</p>

    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div class="field">
        <label for="name">Nome</label>
        <input id="name" type="text" formControlName="name" autocomplete="name" required />
        @if (showError('name')) { <div class="error-msg">Indique o seu nome.</div> }
      </div>

      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" formControlName="email" autocomplete="email" required />
        @if (showError('email')) { <div class="error-msg">Indique um e-mail válido.</div> }
      </div>

      <div class="field">
        <label for="password">Palavra-passe</label>
        <input id="password" type="password" formControlName="password" autocomplete="new-password" required minlength="6" />
        <div class="helper">Mínimo 6 caracteres.</div>
        @if (showError('password')) { <div class="error-msg">A palavra-passe precisa de pelo menos 6 caracteres.</div> }
      </div>

      <button type="submit" class="btn btn--strong btn--block btn--lg" [disabled]="loading() || form.invalid">
        {{ loading() ? 'A criar conta…' : 'Criar conta' }}
      </button>
    </form>

    <div class="alt">
      Já tem conta? <a routerLink="/auth/login">Entrar</a>
    </div>
  `
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);

  readonly loading = signal(false);
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  showError(name: 'name' | 'email' | 'password'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.dirty || c.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { name, email, password } = this.form.getRawValue();
    this.auth.register({ name: name!, email: email!, password: password! }).subscribe({
      next: () => {
        this.loading.set(false);
        this.notify.success('Conta criada. Verifique o e-mail.');
        void this.router.navigate(['/auth/verificar-email']);
      },
      error: () => {
        this.loading.set(false);
        this.notify.error('Não foi possível criar a conta. Tente novamente.');
      }
    });
  }
}
