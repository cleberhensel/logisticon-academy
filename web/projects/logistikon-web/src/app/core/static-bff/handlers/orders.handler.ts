import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { makeId } from '../jwt-fake';
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

export function handleOrders(): RouteRule[] {
  return [
    {
      pattern: /^\/orders$/,
      methods: ['POST'],
      handle: (ctx) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        if (isAdmin(user)) return err(409, 'ADMIN_ACCESS', 'Admin já tem acesso a todas as trilhas.');
        const { trailId, trailSlug } = (ctx.body as { trailId?: string; trailSlug?: string }) ?? {};
        const db = ctx.store.getDb();
        const t = trailMeta(db, (trailId || trailSlug || '') as string);
        if (!t) return err(404, 'NOT_FOUND', 'Trilha não encontrada.');
        const existing = db.enrollments.find((e) => e.userId === user.id && e.trailId === t.id);
        if (existing) return err(409, 'ALREADY_ENROLLED', 'Já tem matrícula nesta trilha.');
        const price = priceForTrail(db, t);
        if (!price) return err(422, 'PRICE_UNAVAILABLE', 'Sem preço ativo para esta trilha.');
        const order = {
          id: makeId('ord'),
          userId: user.id,
          trailId: t.id,
          trailSlug: t.slug,
          trailTitle: t.title,
          amountCents: price.amountCents,
          currency: price.currency,
          status: 'pending_payment' as const,
          createdAt: new Date().toISOString()
        };
        db.orders.push(order);
        ctx.store.write();
        return ok(order, 201);
      }
    },
    {
      pattern: /^\/orders\/(?<id>[^/]+)$/,
      methods: ['GET'],
      handle: (ctx, { id }) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const order = ctx.store.getDb().orders.find((o) => o.id === id && o.userId === user.id);
        if (!order) return err(404, 'NOT_FOUND', 'Pedido não encontrado.');
        return ok(order);
      }
    }
  ];
}
