import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'lk-notifications',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 1000;
      width: min(360px, calc(100vw - 2rem));
    }
    .lk-toast {
      padding: 0.625rem 0.875rem;
      border-radius: var(--lk-radius-sm);
      background: var(--lk-bg-2);
      border: 1px solid var(--lk-border-strong);
      color: var(--lk-text);
      box-shadow: var(--lk-shadow-2);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: var(--lk-fs-13);
    }
    .lk-toast-success { border-left: 3px solid var(--lk-success); }
    .lk-toast-error { border-left: 3px solid var(--lk-danger); }
    .lk-toast-info { border-left: 3px solid var(--lk-info); }
    .lk-toast-warning { border-left: 3px solid var(--lk-warn); }
    button {
      background: transparent;
      border: 0;
      color: var(--lk-text-muted);
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      padding: 0 0.25rem;
    }
    button:hover { color: var(--lk-text); }
  `],
  template: `
    @for (n of notify.items(); track n.id) {
      <div role="status" aria-live="polite" class="lk-toast" [ngClass]="'lk-toast-' + n.kind">
        <span>{{ n.message }}</span>
        <button type="button" (click)="notify.dismiss(n.id)" aria-label="Dispensar notificação">×</button>
      </div>
    }
  `
})
export class LkNotificationsComponent {
  readonly notify = inject(NotificationService);
}
