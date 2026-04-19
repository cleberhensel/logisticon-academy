import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-certificate-code',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: inline-flex; align-items: center; gap: var(--lk-space-2); }
    code {
      font-family: var(--lk-font-mono);
      background: var(--lk-bg-2);
      border: 1px solid var(--lk-border);
      padding: 0.25rem 0.5rem;
      border-radius: var(--lk-radius-sm);
      font-size: var(--lk-fs-13);
      color: var(--lk-text);
    }
  `],
  template: `
    <code>{{ code }}</code>
    <button type="button" class="btn btn--sm" (click)="copy()">Copiar</button>
  `
})
export class LkCertificateCodeComponent {
  @Input({ required: true }) code!: string;
  private readonly notify = inject(NotificationService);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code);
      this.notify.success('Código copiado');
    } catch {
      this.notify.error('Não foi possível copiar');
    }
  }
}
