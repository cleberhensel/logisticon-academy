import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(LocalStorageService);
  private readonly _mode = signal<ThemeMode>(this.storage.get<ThemeMode>('theme') ?? 'dark');

  readonly mode = computed(() => this._mode());
  readonly isDark = computed(() => this._mode() === 'dark');

  constructor() {
    effect(() => {
      const m = this._mode();
      try {
        document.documentElement.setAttribute('data-theme', m);
      } catch {
        /* SSR / non-DOM env */
      }
      this.storage.set('theme', m);
    });
  }

  toggle(): void {
    this._mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  set(mode: ThemeMode): void {
    this._mode.set(mode);
  }
}
