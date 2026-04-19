export interface CatalogPrice {
  amountCents: number;
  currency: string;
}

export interface CatalogTrailListItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: string;
  language: string;
  durationHours: number;
  moduleCount: number;
  lessonCount: number;
  price: CatalogPrice | null;
}

export interface CatalogPage {
  items: CatalogTrailListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CatalogTrailDetail {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: string;
  language: string;
  durationHours: number;
  status: string;
  price: CatalogPrice | null;
  modules: CatalogTrailDetailModule[];
}

export interface CatalogTrailDetailModule {
  id: string;
  slug: string;
  order: number;
  title: string;
  readmePath: string | null;
  lessons: CatalogTrailDetailLesson[];
}

export interface CatalogTrailDetailLesson {
  id: string;
  slug: string;
  order: number;
  title: string;
  durationMin: number;
}

export interface Eligibility {
  canEnroll: boolean;
  reason?: 'NEEDS_AUTH' | 'ALREADY_ENROLLED' | 'PRICE_UNAVAILABLE' | 'ADMIN_ACCESS' | string;
}
