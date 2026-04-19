import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { makeId, makeUpperCode } from '../jwt-fake';
import { buildOutline, effectiveEnrollment } from '../outline.builder';
import { StaticBffDb, StoredTrail } from '../static-bff.store';

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

function trailMeta(db: StaticBffDb, idOrSlug: string): StoredTrail | null {
  return db.trails.find((t) => t.id === idOrSlug || t.slug === idOrSlug) ?? null;
}

function logEmail(ctx: BffContext, kind: string, to: string, payload: unknown): void {
  ctx.store.getDb().email_log.push({ id: makeId('ml'), kind, to, payload, sentAt: new Date().toISOString() });
  console.log(`[static-bff:email] ${kind} -> ${to}`);
}

export function handleCertificates(): RouteRule[] {
  return [
    {
      pattern: /^\/enrollments\/(?<trailId>[^/]+)\/certificate$/,
      methods: ['POST'],
      handle: (ctx, { trailId }) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const db = ctx.store.getDb();
        const trail = trailMeta(db, trailId);
        if (!trail) return err(404, 'NOT_FOUND', 'Trilha não encontrada.');
        const enrollment = effectiveEnrollment(db, user, trail);
        if (!enrollment) return err(403, 'ENROLLMENT_REQUIRED', 'Sem matrícula nesta trilha.');

        const outline = buildOutline(db, trail, user.id);
        if (!outline.certificateEligible) return err(409, 'NOT_ELIGIBLE', 'Requisitos da trilha não cumpridos.');

        const existing = db.certificates.find((c) => c.userId === user.id && c.trailId === trail.id);
        if (existing) return ok(existing);

        const code = `LK-${trail.slug.slice(-6).toUpperCase().replace(/[^A-Z0-9]/g, '')}-${makeUpperCode(3)}`;
        const cert = {
          id: makeId('cer'),
          userId: user.id,
          userName: user.name,
          trailId: trail.id,
          trailSlug: trail.slug,
          trailTitle: trail.title,
          issuedAt: new Date().toISOString(),
          code,
          pdfUrl: `/__stub/certificate/${code}.pdf`,
          revoked: false
        };
        db.certificates.push(cert);
        ctx.store.write();
        logEmail(ctx, 'certificate_issued', user.email, { code, trailTitle: trail.title });
        return ok(cert, 201);
      }
    },
    {
      pattern: /^\/certificates\/verify$/,
      methods: ['GET'],
      handle: (ctx) => {
        const code = (ctx.query.get('code') || '').trim().toUpperCase();
        if (!code) return err(400, 'INVALID_INPUT', 'code obrigatório.');
        const cert = ctx.store.getDb().certificates.find((c) => c.code === code);
        if (!cert) return ok({ status: 'not_found' });
        if (cert.revoked) return ok({ status: 'revoked', code });
        return ok({ status: 'valid', code: cert.code, issuedAt: cert.issuedAt, trailTitle: cert.trailTitle, holder: cert.userName });
      }
    }
  ];
}
