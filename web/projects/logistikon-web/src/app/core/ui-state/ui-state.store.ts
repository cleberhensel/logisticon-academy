import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';

/**
 * Estado do shell: sidebars colapsadas + command palette aberto.
 * Persistido em localStorage (exceto o palette).
 */
@Injectable({ providedIn: 'root' })
export class UiStateStore {
  private readonly storage = inject(LocalStorageService);

  private readonly _leftCollapsed = signal<boolean>(this.storage.get<boolean>('ui:left-collapsed') ?? false);
  private readonly _rightOpen = signal<boolean>(this.storage.get<boolean>('ui:right-open') ?? false);
  private readonly _paletteOpen = signal<boolean>(false);

  readonly leftCollapsed = computed(() => this._leftCollapsed());
  readonly rightOpen = computed(() => this._rightOpen());
  readonly paletteOpen = computed(() => this._paletteOpen());

  constructor() {
    effect(() => this.storage.set('ui:left-collapsed', this._leftCollapsed()));
    effect(() => this.storage.set('ui:right-open', this._rightOpen()));
  }

  toggleLeft(): void { this._leftCollapsed.update((v) => !v); }
  toggleRight(): void { this._rightOpen.update((v) => !v); }
  setRight(v: boolean): void { this._rightOpen.set(v); }

  openPalette(): void { this._paletteOpen.set(true); }
  closePalette(): void { this._paletteOpen.set(false); }
  togglePalette(): void { this._paletteOpen.update((v) => !v); }
}
