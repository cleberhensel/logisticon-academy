import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { makeId } from '../jwt-fake';
import { buildOutline, effectiveEnrollment, virtualAdminEnrollment } from '../outline.builder';
import { StaticBffDb, StoredTrail } from '../static-bff.store';

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

function trailMeta(db: StaticBffDb, idOrSlug: string): StoredTrail | null {
  return db.trails.find((t) => t.id === idOrSlug || t.slug === idOrSlug) ?? null;
}

function isAdmin(user: { roles?: string[] } | null | undefined): boolean {
  return !!user?.roles?.includes('admin');
}

export function handleEnrollments(): RouteRule[] {
  return [
    {
      pattern: /^\/enrollments$/,
      methods: ['GET'],
      handle: (ctx) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const db = ctx.store.getDb();
        if (isAdmin(user)) {
          const list = db.trails
            .filter((t) => t.status === 'published')
            .map((t) => {
              const enr = virtualAdminEnrollment(user, t);
              const outline = buildOutline(db, t, user.id);
              return { ...enr, progressPercent: outline.progressPercent };
            });
          return ok(list);
        }
        const list = db.enrollments
          .filter((e) => e.userId === user.id)
          .map((e) => {
            const trail = trailMeta(db, e.trailId);
            const outline = trail ? buildOutline(db, trail, user.id) : null;
            return { ...e, progressPercent: outline?.progressPercent ?? e.progressPercent };
          });
        return ok(list);
      }
    },
    {
      pattern: /^\/enrollments\/(?<trailId>[^/]+)\/outline$/,
      methods: ['GET'],
      handle: (ctx, { trailId }) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const db = ctx.store.getDb();
        const trail = trailMeta(db, trailId);
        if (!trail) return err(404, 'NOT_FOUND', 'Trilha não encontrada.');
        const enrollment = effectiveEnrollment(db, user, trail);
        if (!enrollment) return err(403, 'ENROLLMENT_REQUIRED', 'Sem matrícula nesta trilha.');
        return ok(buildOutline(db, trail, user.id));
      }
    },
    {
      pattern: /^\/enrollments\/(?<trailId>[^/]+)\/lessons\/(?<lessonId>[^/]+)\/progress$/,
      methods: ['PATCH'],
      handle: (ctx, { trailId, lessonId }) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const db = ctx.store.getDb();
        const trail = trailMeta(db, trailId);
        if (!trail) return err(404, 'NOT_FOUND', 'Trilha não encontrada.');
        const enrollment = effectiveEnrollment(db, user, trail);
        if (!enrollment) return err(403, 'ENROLLMENT_REQUIRED', 'Sem matrícula nesta trilha.');
        const lesson = trail.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
        if (!lesson) return err(404, 'NOT_FOUND', 'Aula não encontrada.');

        const { percent = 0, completed = false } = (ctx.body as { percent?: number; completed?: boolean }) ?? {};
        const normalised = {
          percent: Math.max(0, Math.min(100, Math.round(percent))),
          completed: !!completed,
          updatedAt: new Date().toISOString()
        };
        const existing = db.progress.find((p) => p.userId === user.id && p.trailId === trail.id && p.lessonId === lessonId);
        if (existing) {
          existing.percent = normalised.percent;
          existing.completed = normalised.completed;
          existing.updatedAt = normalised.updatedAt;
        } else {
          db.progress.push({
            id: makeId('prg'),
            userId: user.id,
            trailId: trail.id,
            lessonId,
            ...normalised
          });
        }
        const outline = buildOutline(db, trail, user.id);
        const isVirtual = (enrollment as unknown as { virtual?: boolean }).virtual === true;
        if (!isVirtual) {
          const real = db.enrollments.find((e) => e.id === enrollment.id);
          if (real) real.progressPercent = outline.progressPercent;
        }
        ctx.store.write();
        return ok({ ok: true, outlineProgressPercent: outline.progressPercent });
      }
    }
  ];
}
