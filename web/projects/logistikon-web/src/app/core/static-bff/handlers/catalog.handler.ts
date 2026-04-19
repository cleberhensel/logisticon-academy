import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { StaticBffDb, StoredTrail } from '../static-bff.store';

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

function trailMeta(db: StaticBffDb, idOrSlug: string): StoredTrail | null {
  return db.trails.find((t) => t.id === idOrSlug || t.slug === idOrSlug) ?? null;
}

function priceForTrail(db: StaticBffDb, t: StoredTrail | null) {
  if (!t || !t.stripePriceId) return null;
  return db.prices.find((p) => p.id === t.stripePriceId) ?? null;
}

function isAdmin(user: { roles?: string[] } | null | undefined): boolean {
  return !!user?.roles?.includes('admin');
}

export function handleCatalog(): RouteRule[] {
  return [
    {
      pattern: /^\/trails$/,
      methods: ['GET'],
      handle: (ctx) => {
        const db = ctx.store.getDb();
        const status = ctx.query.get('status') || 'published';
        const page = Math.max(1, parseInt(ctx.query.get('page') || '1', 10));
        const pageSize = Math.max(1, Math.min(50, parseInt(ctx.query.get('pageSize') || '12', 10)));
        let items = db.trails.filter((t) => t.status === status);
        const total = items.length;
        const start = (page - 1) * pageSize;
        const slice = items.slice(start, start + pageSize).map((t) => {
          const price = priceForTrail(db, t);
          return {
            id: t.id,
            slug: t.slug,
            title: t.title,
            summary: t.summary,
            level: t.level,
            language: t.language,
            durationHours: t.durationHours,
            moduleCount: t.modules.length,
            lessonCount: t.modules.reduce((acc, m) => acc + m.lessons.length, 0),
            price: price ? { amountCents: price.amountCents, currency: price.currency } : null
          };
        });
        return ok({ items: slice, total, page, pageSize });
      }
    },
    {
      pattern: /^\/trails\/(?<slug>[^/]+)$/,
      methods: ['GET'],
      handle: (ctx, { slug }) => {
        const db = ctx.store.getDb();
        const t = trailMeta(db, slug);
        if (!t) return err(404, 'NOT_FOUND', 'Trilha não encontrada.');
        const price = priceForTrail(db, t);
        return ok({
          id: t.id,
          slug: t.slug,
          title: t.title,
          summary: t.summary,
          level: t.level,
          language: t.language,
          durationHours: t.durationHours,
          status: t.status,
          price: price ? { amountCents: price.amountCents, currency: price.currency } : null,
          modules: t.modules.map((m) => ({
            id: m.id,
            slug: m.slug,
            order: m.order,
            title: m.title,
            readmePath: m.readmePath,
            lessons: m.lessons.map((l) => ({ id: l.id, slug: l.slug, order: l.order, title: l.title, durationMin: l.durationMin }))
          }))
        });
      }
    },
    {
      pattern: /^\/trails\/(?<slug>[^/]+)\/eligibility$/,
      methods: ['GET'],
      handle: (ctx, { slug }) => {
        const db = ctx.store.getDb();
        const t = trailMeta(db, slug);
        if (!t) return err(404, 'NOT_FOUND', 'Trilha não encontrada.');
        const user = ctx.authUser;
        if (!user) return ok({ canEnroll: false, reason: 'NEEDS_AUTH' });
        if (isAdmin(user)) return ok({ canEnroll: false, reason: 'ADMIN_ACCESS' });
        const enrollment = db.enrollments.find((e) => e.userId === user.id && e.trailId === t.id);
        if (enrollment) return ok({ canEnroll: false, reason: 'ALREADY_ENROLLED' });
        const price = priceForTrail(db, t);
        if (!price) return ok({ canEnroll: false, reason: 'PRICE_UNAVAILABLE' });
        return ok({ canEnroll: true });
      }
    }
  ];
}
