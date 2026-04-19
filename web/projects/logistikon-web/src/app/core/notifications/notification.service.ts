import { Injectable, signal } from '@angular/core';

export type NotificationKind = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  kind: NotificationKind;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 1;
  readonly items = signal<Notification[]>([]);

  push(kind: NotificationKind, message: string, ttlMs = 4000): void {
    const id = this.nextId++;
    this.items.update((list) => [...list, { id, kind, message }]);
    if (ttlMs > 0) {
      setTimeout(() => this.dismiss(id), ttlMs);
    }
  }

  success(message: string): void { this.push('success', message); }
  error(message: string): void { this.push('error', message, 6000); }
  info(message: string): void { this.push('info', message); }
  warning(message: string): void { this.push('warning', message); }

  dismiss(id: number): void {
    this.items.update((list) => list.filter((n) => n.id !== id));
  }
}
