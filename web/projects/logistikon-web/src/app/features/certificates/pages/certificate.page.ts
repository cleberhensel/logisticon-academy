import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CertificatesService } from '../data/certificates.service';
import { Certificate } from '../data/certificates.models';
import { LkCertificateCodeComponent } from '../../../shared/components/lk-certificate-code/lk-certificate-code.component';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-certificate',
  standalone: true,
  imports: [RouterLink, DatePipe, LkCertificateCodeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    h1 { font-size: var(--lk-fs-22); margin: 0 0 var(--lk-space-4); }

    .frame {
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border-strong);
      padding: var(--lk-space-12) var(--lk-space-6);
      text-align: center;
      margin: var(--lk-space-4) 0;
      border-radius: var(--lk-radius-md);
      position: relative;
    }
    .frame::before,
    .frame::after {
      content: '';
      position: absolute;
      inset: 8px;
      border: 1px solid var(--lk-accent);
      border-radius: 4px;
      pointer-events: none;
    }
    .frame::after { inset: 16px; border-color: var(--lk-border); }
    .frame h2 {
      margin: 0 0 var(--lk-space-3);
      font-size: var(--lk-fs-12);
      color: var(--lk-accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: var(--lk-fw-medium);
    }
    .frame .holder {
      font-size: var(--lk-fs-28);
      font-weight: var(--lk-fw-bold);
      letter-spacing: -0.01em;
      margin: var(--lk-space-3) 0;
      color: var(--lk-text);
    }
    .frame .trail { font-size: var(--lk-fs-15); color: var(--lk-text); margin-top: var(--lk-space-2); }
    .frame .date { color: var(--lk-text-muted); margin-top: var(--lk-space-3); font-size: var(--lk-fs-12); }

    .actions {
      display: flex;
      gap: var(--lk-space-2);
      flex-wrap: wrap;
      margin-top: var(--lk-space-4);
    }

    .empty {
      padding: var(--lk-space-8);
      background: var(--lk-bg-1);
      border: 1px dashed var(--lk-accent);
      border-radius: var(--lk-radius-md);
      text-align: center;
    }
    .empty p { margin: 0 0 var(--lk-space-3); color: var(--lk-text-muted); }
    .code-row { display: flex; gap: var(--lk-space-2); align-items: center; margin-top: var(--lk-space-3); flex-wrap: wrap; font-size: var(--lk-fs-13); color: var(--lk-text-muted); }
  `],
  template: `
    <section class="lk-page">
      <h1>Certificado</h1>

      @if (loading()) {
        <p class="lk-muted">A processar…</p>
      } @else {
        @if (cert(); as c) {
          <div class="frame">
            <h2>Logistikon Academy declara que</h2>
            <div class="holder">{{ c.userName }}</div>
            <div class="lk-muted">concluiu com sucesso a trilha</div>
            <div class="trail">{{ c.trailTitle }}</div>
            <div class="date">Emitido em {{ c.issuedAt | date:'dd/MM/yyyy' }}</div>
          </div>

          <div class="code-row">
            <span>Código de verificação:</span>
            <lk-certificate-code [code]="c.code" />
          </div>

          <div class="actions">
            <a class="btn btn--strong" [href]="c.pdfUrl" download>Descarregar PDF</a>
            <a class="btn" [routerLink]="['/certificado/verificar']" [queryParams]="{ code: c.code }">Ver página pública</a>
            <a class="btn btn--quiet" [routerLink]="['/learn']">Voltar ao dashboard</a>
          </div>
        } @else if (errorMsg()) {
          <div class="alert alert--error" role="alert">{{ errorMsg() }}</div>
        } @else {
          <div class="empty">
            <p>Cumpriu todos os requisitos. Emita já o seu certificado.</p>
            <button type="button" class="btn btn--strong btn--lg" (click)="issue()" [disabled]="issuing()">
              {{ issuing() ? 'A emitir…' : 'Emitir certificado' }}
            </button>
          </div>
        }
      }
    </section>
  `
})
export class CertificatePage implements OnInit {
  private readonly svc = inject(CertificatesService);
  private readonly route = inject(ActivatedRoute);
  private readonly notify = inject(NotificationService);

  readonly loading = signal(true);
  readonly issuing = signal(false);
  readonly cert = signal<Certificate | null>(null);
  readonly errorMsg = signal<string | null>(null);

  trailIdParam = () => this.route.snapshot.paramMap.get('trailId') || '';

  ngOnInit(): void {
    this.issue();
  }

  issue(): void {
    this.errorMsg.set(null);
    this.issuing.set(true);
    this.svc.issue(this.trailIdParam()).subscribe({
      next: (c) => {
        this.cert.set(c);
        this.issuing.set(false);
        this.loading.set(false);
      },
      error: (err) => {
        this.issuing.set(false);
        this.loading.set(false);
        const code = err?.error?.error?.code;
        if (code === 'NOT_ELIGIBLE') {
          this.errorMsg.set('Ainda não cumpriu todos os requisitos da trilha.');
        } else if (code === 'ENROLLMENT_REQUIRED') {
          this.errorMsg.set('Sem matrícula nesta trilha.');
        } else {
          this.errorMsg.set('Não foi possível emitir o certificado.');
        }
      }
    });
  }
}
