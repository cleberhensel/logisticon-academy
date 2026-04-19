import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { makeId } from '../jwt-fake';

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

function appOrigin(): string {
  if (typeof window === 'undefined') return '';
  const base = document.querySelector('base')?.getAttribute('href') ?? '/';
  const path = base.endsWith('/') ? base : base + '/';
  return window.location.origin + path;
}

function logEmail(ctx: BffContext, kind: string, to: string, payload: unknown): void {
  ctx.store.getDb().email_log.push({ id: makeId('ml'), kind, to, payload, sentAt: new Date().toISOString() });
  console.log(`[static-bff:email] ${kind} -> ${to}`);
}

export function handleCheckout(): RouteRule[] {
  return [
    {
      pattern: /^\/checkout\/session$/,
      methods: ['POST'],
      handle: (ctx) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const { orderId } = (ctx.body as { orderId?: string }) ?? {};
        const db = ctx.store.getDb();
        const order = db.orders.find((o) => o.id === orderId && o.userId === user.id);
        if (!order) return err(404, 'NOT_FOUND', 'Pedido não encontrado.');
        if (order.status !== 'pending_payment') return err(409, 'INVALID_STATE', 'Pedido não está pendente.');

        const sessionId = 'cs_' + makeId('').replace(/^_/, '').slice(0, 20);
        const origin = appOrigin();
        const successUrl = `${origin}checkout/sucesso?session_id=${sessionId}`;
        const cancelUrl = `${origin}checkout/cancelado?session_id=${sessionId}`;
        const stubUrl = `${origin}__stub/stripe?session_id=${sessionId}`;

        const session = {
          id: sessionId,
          orderId: order.id,
          userId: user.id,
          status: 'open' as const,
          successUrl,
          cancelUrl,
          createdAt: new Date().toISOString()
        };
        db.checkout_sessions.push(session);
        ctx.store.write();
        return ok({ sessionId, url: stubUrl, mode: 'stub' });
      }
    },
    {
      pattern: /^\/__sim\/stripe-webhook$/,
      methods: ['POST'],
      handle: (ctx) => {
        const { sessionId, action } = (ctx.body as { sessionId?: string; action?: string }) ?? {};
        if (!sessionId) return err(400, 'INVALID_INPUT', 'sessionId obrigatório.');
        const db = ctx.store.getDb();
        const session = db.checkout_sessions.find((s) => s.id === sessionId);
        if (!session) return err(404, 'NOT_FOUND', 'Sessão não encontrada.');
        const order = db.orders.find((o) => o.id === session.orderId);
        if (!order) return err(404, 'NOT_FOUND', 'Pedido não encontrado.');

        if (action === 'cancel') {
          session.status = 'cancelled';
          ctx.store.write();
          return ok({ ok: true, status: 'cancelled' });
        }

        if (order.status === 'paid') {
          const enrollment = db.enrollments.find((e) => e.userId === order.userId && e.trailId === order.trailId);
          return ok({ ok: true, status: 'already_paid', enrollmentId: enrollment?.id });
        }

        order.status = 'paid';
        order.paidAt = new Date().toISOString();
        session.status = 'completed';

        const enrollmentId = makeId('enr');
        db.enrollments.push({
          id: enrollmentId,
          userId: order.userId,
          trailId: order.trailId,
          trailSlug: order.trailSlug,
          trailTitle: order.trailTitle,
          status: 'active',
          enrolledAt: new Date().toISOString(),
          progressPercent: 0
        });

        const user = db.users.find((u) => u.id === order.userId);
        if (user) logEmail(ctx, 'payment_confirmed', user.email, { orderId: order.id, trailTitle: order.trailTitle });

        ctx.store.write();
        return ok({ ok: true, status: 'paid', enrollmentId });
      }
    }
  ];
}
