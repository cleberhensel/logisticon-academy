import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  emailVerifiedAt: string | null;
  roles: string[];
  createdAt: string;
}

export interface StoredPrice {
  id: string;
  trailSlug: string;
  amountCents: number;
  currency: string;
}

export interface StoredLesson {
  id: string;
  slug: string;
  order: number;
  title: string;
  durationMin: number;
  mdPath: string;
}

export interface StoredModule {
  id: string;
  slug: string;
  order: number;
  title: string;
  readmePath: string | null;
  lessons: StoredLesson[];
}

export interface StoredTrail {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: string;
  language: string;
  durationHours: number;
  status: string;
  stripePriceId: string | null;
  modules: StoredModule[];
}

export interface StoredOrder {
  id: string;
  userId: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  amountCents: number;
  currency: string;
  status: 'pending_payment' | 'paid' | 'failed' | 'cancelled' | 'expired';
  createdAt: string;
  paidAt?: string;
}

export interface StoredEnrollment {
  id: string;
  userId: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  status: 'active' | 'completed' | 'cancelled';
  enrolledAt: string;
  progressPercent: number;
}

export interface StoredProgress {
  id: string;
  userId: string;
  trailId: string;
  lessonId: string;
  percent: number;
  completed: boolean;
  updatedAt: string;
}

export interface StoredQuizQuestion {
  id: string;
  stem: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
}

export interface StoredQuizConfig {
  questions: StoredQuizQuestion[];
  minScore: number;
  maxAttempts: number;
}

export interface StoredQuizBank {
  _default?: StoredQuizConfig;
  [moduleId: string]: StoredQuizConfig | undefined;
}

export interface StoredQuizAttempt {
  id: string;
  userId: string;
  trailId: string;
  moduleId: string;
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  approved: boolean | null;
}

export interface StoredCertificate {
  id: string;
  userId: string;
  userName: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  issuedAt: string;
  code: string;
  pdfUrl: string;
  revoked: boolean;
}

export interface StoredCheckoutSession {
  id: string;
  orderId: string;
  userId: string;
  status: 'open' | 'completed' | 'cancelled';
  successUrl: string;
  cancelUrl: string;
  createdAt: string;
}

export interface StoredEmailEntry {
  id: string;
  kind: string;
  to: string;
  payload: unknown;
  sentAt: string;
}

export interface StaticBffDb {
  users: StoredUser[];
  trails: StoredTrail[];
  prices: StoredPrice[];
  orders: StoredOrder[];
  enrollments: StoredEnrollment[];
  progress: StoredProgress[];
  quiz_attempts: StoredQuizAttempt[];
  quiz_bank: StoredQuizBank;
  certificates: StoredCertificate[];
  checkout_sessions: StoredCheckoutSession[];
  email_log: StoredEmailEntry[];
}

const EMPTY_DB: StaticBffDb = {
  users: [],
  trails: [],
  prices: [],
  orders: [],
  enrollments: [],
  progress: [],
  quiz_attempts: [],
  quiz_bank: { _default: { questions: [], minScore: 70, maxAttempts: 3 } },
  certificates: [],
  checkout_sessions: [],
  email_log: []
};

const PERSISTED_KEYS: (keyof StaticBffDb)[] = [
  'users',
  'orders',
  'enrollments',
  'progress',
  'quiz_attempts',
  'certificates',
  'checkout_sessions',
  'email_log'
];

@Injectable({ providedIn: 'root' })
export class StaticBffStore {
  private db: StaticBffDb = EMPTY_DB;
  private hydrated = false;
  private hydratingPromise: Promise<void> | null = null;
  private readonly storageKey = environment.staticBff?.storageKey ?? 'lk_static_bff_state_v1';
  private readonly seedUrl = environment.staticBff?.seedUrl ?? 'assets/api/db.json';

  async ensureReady(): Promise<void> {
    if (this.hydrated) return;
    if (this.hydratingPromise) return this.hydratingPromise;
    this.hydratingPromise = this.hydrate();
    return this.hydratingPromise;
  }

  getDb(): StaticBffDb {
    return this.db;
  }

  write(): void {
    try {
      const overlay: Partial<StaticBffDb> = {};
      for (const key of PERSISTED_KEYS) {
        (overlay as unknown as Record<string, unknown>)[key] = this.db[key];
      }
      localStorage.setItem(this.storageKey, JSON.stringify(overlay));
    } catch (err) {
      console.warn('[static-bff] falha ao persistir em localStorage', err);
    }
  }

  reset(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {}
    this.hydrated = false;
    this.hydratingPromise = null;
    this.db = EMPTY_DB;
  }

  private async hydrate(): Promise<void> {
    const seed = await this.loadSeed();
    const overlay = this.loadOverlay();
    const merged: StaticBffDb = {
      ...EMPTY_DB,
      ...seed,
      quiz_bank: seed.quiz_bank ?? EMPTY_DB.quiz_bank
    };
    if (overlay) {
      for (const key of PERSISTED_KEYS) {
        const value = overlay[key];
        if (Array.isArray(value)) {
          (merged as unknown as Record<string, unknown>)[key] = this.mergePersisted(
            key,
            seed[key] as unknown[],
            value as unknown[]
          );
        }
      }
    }
    this.db = merged;
    this.hydrated = true;

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === '1') {
        this.reset();
        await this.hydrate();
      }
    }
  }

  private mergePersisted(key: keyof StaticBffDb, seed: unknown[], overlay: unknown[]): unknown[] {
    if (key === 'users') {
      const seedUsers = (seed as StoredUser[]) ?? [];
      const overlayUsers = overlay as StoredUser[];
      const seenIds = new Set<string>(seedUsers.map((u) => u.id));
      const seenEmails = new Set<string>(seedUsers.map((u) => u.email));
      const merged: StoredUser[] = [...seedUsers];
      for (const u of overlayUsers) {
        if (seenEmails.has(u.email)) {
          const idx = merged.findIndex((m) => m.email === u.email);
          if (idx >= 0) merged[idx] = { ...merged[idx], ...u };
          continue;
        }
        if (seenIds.has(u.id)) continue;
        merged.push(u);
        seenIds.add(u.id);
        seenEmails.add(u.email);
      }
      return merged;
    }
    return overlay;
  }

  private async loadSeed(): Promise<StaticBffDb> {
    try {
      const url = this.resolveAssetUrl(this.seedUrl);
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Partial<StaticBffDb>;
      return { ...EMPTY_DB, ...json } as StaticBffDb;
    } catch (err) {
      console.error('[static-bff] não foi possível carregar o seed estático em', this.seedUrl, err);
      return EMPTY_DB;
    }
  }

  private loadOverlay(): Partial<StaticBffDb> | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      return JSON.parse(raw) as Partial<StaticBffDb>;
    } catch (err) {
      console.warn('[static-bff] overlay localStorage inválido, a ignorar.', err);
      return null;
    }
  }

  private resolveAssetUrl(rel: string): string {
    if (typeof document === 'undefined') return rel;
    const base = document.querySelector('base')?.getAttribute('href') ?? '/';
    if (rel.startsWith('http://') || rel.startsWith('https://') || rel.startsWith('/')) return rel;
    return base.endsWith('/') ? base + rel : base + '/' + rel;
  }
}
