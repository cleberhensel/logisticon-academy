import { Injectable, computed, signal } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
  emailVerifiedAt: string | null;
}

export interface SessionState {
  user: SessionUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const STORAGE_KEY = 'session';

const empty: SessionState = { user: null, accessToken: null, refreshToken: null };

@Injectable({ providedIn: 'root' })
export class SessionStore {
  private readonly state = signal<SessionState>(empty);

  readonly user = computed(() => this.state().user);
  readonly token = computed(() => this.state().accessToken);
  readonly isAuthenticated = computed(() => this.state().accessToken !== null);
  readonly isEmailVerified = computed(() => this.state().user?.emailVerifiedAt !== null);
  readonly isAdmin = computed(() => !!this.state().user?.roles?.includes('admin'));

  constructor(private readonly storage: LocalStorageService) {
    const persisted = this.storage.get<SessionState>(STORAGE_KEY);
    if (persisted?.accessToken) {
      this.state.set(persisted);
    }
  }

  set(next: SessionState): void {
    this.state.set(next);
    this.storage.set(STORAGE_KEY, next);
  }

  patchUser(user: SessionUser): void {
    const current = this.state();
    this.set({ ...current, user });
  }

  clear(): void {
    this.state.set(empty);
    this.storage.remove(STORAGE_KEY);
  }
}
