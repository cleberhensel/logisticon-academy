import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { makeId } from '../jwt-fake';
import { effectiveEnrollment, getQuizForModule } from '../outline.builder';

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function handleQuiz(): RouteRule[] {
  return [
    {
      pattern: /^\/modules\/(?<moduleId>[^/]+)\/quiz\/start$/,
      methods: ['POST'],
      handle: (ctx, { moduleId }) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const db = ctx.store.getDb();
        const trail = db.trails.find((t) => t.modules.some((m) => m.id === moduleId));
        if (!trail) return err(404, 'NOT_FOUND', 'Módulo não encontrado.');
        const enrollment = effectiveEnrollment(db, user, trail);
        if (!enrollment) return err(403, 'ENROLLMENT_REQUIRED', 'Sem matrícula nesta trilha.');

        const cfg = getQuizForModule(db, moduleId);
        if (!cfg) return err(404, 'NO_QUIZ', 'Módulo sem quiz.');

        const previous = db.quiz_attempts.filter(
          (a) => a.userId === user.id && a.trailId === trail.id && a.moduleId === moduleId
        );
        const attemptsLeft = Math.max(0, cfg.maxAttempts - previous.length);
        if (attemptsLeft === 0 && !previous.some((p) => p.approved)) {
          return err(409, 'NO_ATTEMPTS_LEFT', 'Sem tentativas restantes.');
        }

        const attemptId = makeId('att');
        const questions = shuffle(cfg.questions).map((q) => ({
          id: q.id,
          stem: q.stem,
          options: shuffle(q.options).map(({ id, label }) => ({ id, label }))
        }));

        db.quiz_attempts.push({
          id: attemptId,
          userId: user.id,
          trailId: trail.id,
          moduleId,
          startedAt: new Date().toISOString(),
          submittedAt: null,
          score: null,
          approved: null
        });
        ctx.store.write();

        return ok({
          attemptId,
          moduleId,
          questions,
          minScore: cfg.minScore,
          maxAttempts: cfg.maxAttempts,
          attemptsLeft
        });
      }
    },
    {
      pattern: /^\/quiz\/attempts\/(?<attemptId>[^/]+)\/submit$/,
      methods: ['POST'],
      handle: (ctx, { attemptId }) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        const db = ctx.store.getDb();
        const attempt = db.quiz_attempts.find((a) => a.id === attemptId && a.userId === user.id);
        if (!attempt) return err(404, 'NOT_FOUND', 'Tentativa não encontrada.');
        if (attempt.submittedAt) return err(409, 'ALREADY_SUBMITTED', 'Tentativa já submetida.');
        const cfg = getQuizForModule(db, attempt.moduleId);
        if (!cfg) return err(404, 'NO_QUIZ', 'Módulo sem quiz.');

        const answers = ((ctx.body as { answers?: Record<string, string> })?.answers) ?? {};
        let correct = 0;
        for (const q of cfg.questions) {
          if (answers[q.id] === q.correctOptionId) correct++;
        }
        const score = Math.round((correct / cfg.questions.length) * 100);
        const approved = score >= cfg.minScore;
        attempt.submittedAt = new Date().toISOString();
        attempt.score = score;
        attempt.approved = approved;

        const previousAll = db.quiz_attempts.filter(
          (a) => a.userId === user.id && a.trailId === attempt.trailId && a.moduleId === attempt.moduleId
        );
        const attemptsLeft = Math.max(0, cfg.maxAttempts - previousAll.length);
        ctx.store.write();
        return ok({ approved, score, minScore: cfg.minScore, attemptsLeft, correct, total: cfg.questions.length });
      }
    }
  ];
}
