import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CertificatesService } from '../data/certificates.service';
import { CertificateVerifyResult } from '../data/certificates.models';

@Component({
  selector: 'lk-verify-public',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-22); margin: 0 0 var(--lk-space-2); }
    .lead { color: var(--lk-text-muted); margin: 0 0 var(--lk-space-6); max-width: 60ch; font-size: var(--lk-fs-13); }

    form {
      display: flex;
      gap: var(--lk-space-2);
      max-width: 540px;
    }
    form input {
      flex: 1;
      font-family: var(--lk-font-mono);
      text-transform: uppercase;
    }

    .result {
      margin-top: var(--lk-space-6);
      padding: var(--lk-space-5);
      border-radius: var(--lk-radius-md);
      max-width: 600px;
      border: 1px solid var(--lk-border);
      background: var(--lk-bg-1);
    }
    .result.valid { border-color: var(--lk-success); background: rgba(143, 179, 122, 0.06); }
    .result.revoked { border-color: var(--lk-warn); background: rgba(201, 169, 107, 0.06); }
    .result.not_found { border-color: var(--lk-danger); background: rgba(196, 123, 111, 0.06); }
    .result h2 { margin: 0 0 var(--lk-space-3); font-size: var(--lk-fs-18); }
    .result dl { display: grid; grid-template-columns: max-content 1fr; gap: var(--lk-space-1) var(--lk-space-4); margin: 0; font-size: var(--lk-fs-13); }
    .result dt { color: var(--lk-text-muted); font-weight: var(--lk-fw-medium); }
    .result dd { margin: 0; color: var(--lk-text); }
    .result dd code { font-family: var(--lk-font-mono); }
  `],
  template: `
    <section class="lk-page">
      <h1>Validar certificado</h1>
      <p class="lead">Cole o código de verificação para confirmar a autenticidade de um certificado emitido pela Logistikon Academy.</p>

      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <input type="text" formControlName="code" placeholder="LK-XXXXXX-XXXXXX" aria-label="Código de verificação" required />
        <button type="submit" class="btn btn--strong" [disabled]="loading() || form.invalid">
          {{ loading() ? 'A verificar…' : 'Verificar' }}
        </button>
      </form>

      @if (result(); as r) {
        @switch (r.status) {
          @case ('valid') {
            <div class="result valid" role="status" aria-live="polite">
              <h2>Certificado válido ✓</h2>
              <dl>
                <dt>Titular</dt><dd>{{ r.holder }}</dd>
                <dt>Trilha</dt><dd>{{ r.trailTitle }}</dd>
                <dt>Emitido em</dt><dd>{{ r.issuedAt | date:'dd/MM/yyyy' }}</dd>
                <dt>Código</dt><dd><code>{{ r.code }}</code></dd>
              </dl>
            </div>
          }
          @case ('revoked') {
            <div class="result revoked" role="status" aria-live="polite">
              <h2>Certificado revogado</h2>
              <p class="lk-muted">Este código foi revogado pela instituição emissora.</p>
            </div>
          }
          @case ('not_found') {
            <div class="result not_found" role="alert">
              <h2>Código não encontrado</h2>
              <p class="lk-muted">Confirme o código e tente de novo.</p>
            </div>
          }
        }
      }
    </section>
  `
})
export class VerifyPublicPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(CertificatesService);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly result = signal<CertificateVerifyResult | null>(null);
  readonly form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(4)]]
  });

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.form.patchValue({ code });
      this.submit();
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    const code = (this.form.value.code || '').trim().toUpperCase();
    this.svc.verify(code).subscribe({
      next: (r) => {
        this.result.set(r);
        this.loading.set(false);
      },
      error: () => {
        this.result.set({ status: 'not_found' });
        this.loading.set(false);
      }
    });
  }
}
