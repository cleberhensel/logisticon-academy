import { StaticBffDb, StoredEnrollment, StoredTrail, StoredUser } from './static-bff.store';

function isAdmin(user: StoredUser | null | undefined): boolean {
  return !!user && Array.isArray(user.roles) && user.roles.includes('admin');
}

export function virtualAdminEnrollment(user: StoredUser, trail: StoredTrail): StoredEnrollment & { virtual: true; role: 'admin' } {
  return {
    id: `enr_admin_${trail.id}`,
    userId: user.id,
    trailId: trail.id,
    trailSlug: trail.slug,
    trailTitle: trail.title,
    status: 'active',
    enrolledAt: '2026-01-01T00:00:00.000Z',
    progressPercent: 0,
    virtual: true,
    role: 'admin'
  };
}

export function effectiveEnrollment(db: StaticBffDb, user: StoredUser | null, trail: StoredTrail | null) {
  if (!user || !trail) return null;
  if (isAdmin(user)) return virtualAdminEnrollment(user, trail);
  return db.enrollments.find((e) => e.userId === user.id && (e.trailId === trail.id || e.trailSlug === trail.slug)) ?? null;
}

export function getQuizForModule(db: StaticBffDb, moduleId: string) {
  const bank = db.quiz_bank;
  if (!bank) return null;
  return bank[moduleId] ?? bank._default ?? null;
}

export interface BuiltOutlineLesson {
  id: string;
  slug: string;
  title: string;
  durationMin: number;
  mdPath: string;
  status: 'locked' | 'available' | 'completed';
  progressPercent: number;
}

export interface BuiltOutlineModule {
  id: string;
  slug: string;
  order: number;
  title: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  hasQuiz: boolean;
  quizApproved: boolean;
  quizAttemptsLeft: number;
  lessons: BuiltOutlineLesson[];
}

export interface BuiltOutline {
  trailId: string;
  trailTitle: string;
  modules: BuiltOutlineModule[];
  progressPercent: number;
  certificateEligible: boolean;
  certificateIssued: boolean;
  certificateCode: string | null;
}

export function buildOutline(db: StaticBffDb, trail: StoredTrail, userId: string): BuiltOutline {
  const userRecord = db.users.find((u) => u.id === userId) ?? null;
  const adminBypass = isAdmin(userRecord);
  const realEnrollment = db.enrollments.find((e) => e.userId === userId && e.trailId === trail.id) ?? null;
  const enrollment = realEnrollment || (adminBypass && userRecord ? virtualAdminEnrollment(userRecord, trail) : null);

  const progressMap = new Map<string, (typeof db.progress)[number]>();
  for (const p of db.progress) {
    if (p.userId === userId && p.trailId === trail.id) progressMap.set(p.lessonId, p);
  }
  const quizAttempts = db.quiz_attempts.filter((a) => a.userId === userId && a.trailId === trail.id);

  let totalLessons = 0;
  let completedLessons = 0;
  let prevModuleApproved = true;

  const modules: BuiltOutlineModule[] = trail.modules.map((m, mIdx) => {
    const lessons: BuiltOutlineLesson[] = m.lessons.map((l) => {
      totalLessons++;
      const p = progressMap.get(l.id);
      let status: BuiltOutlineLesson['status'];
      if (p?.completed) {
        status = 'completed';
        completedLessons++;
      } else if (adminBypass) {
        status = 'available';
      } else {
        status = prevModuleApproved ? 'available' : 'locked';
      }
      return {
        id: l.id,
        slug: l.slug,
        title: l.title,
        durationMin: l.durationMin,
        mdPath: l.mdPath,
        status,
        progressPercent: p?.percent ?? 0
      };
    });

    const allLessonsDone = lessons.every((l) => l.status === 'completed');
    const moduleAttempts = quizAttempts.filter((a) => a.moduleId === m.id);
    const approvedAttempt = moduleAttempts.find((a) => a.approved);
    const attemptsUsed = moduleAttempts.length;

    const quizConfig = getQuizForModule(db, m.id);
    const maxAttempts = quizConfig?.maxAttempts ?? 3;

    let moduleStatus: BuiltOutlineModule['status'] = 'locked';
    if (adminBypass) {
      if (approvedAttempt) moduleStatus = 'completed';
      else if (allLessonsDone && quizConfig) moduleStatus = 'in-progress';
      else if (allLessonsDone && !quizConfig) moduleStatus = 'completed';
      else moduleStatus = 'available';
    } else if (prevModuleApproved) {
      if (approvedAttempt) moduleStatus = 'completed';
      else if (allLessonsDone) moduleStatus = 'in-progress';
      else moduleStatus = 'available';
    }

    const moduleResult: BuiltOutlineModule = {
      id: m.id,
      slug: m.slug,
      order: m.order,
      title: m.title,
      status: moduleStatus,
      hasQuiz: !!quizConfig,
      quizApproved: !!approvedAttempt,
      quizAttemptsLeft: Math.max(0, maxAttempts - attemptsUsed),
      lessons
    };

    prevModuleApproved = !!approvedAttempt || (mIdx === 0 && !quizConfig);
    return moduleResult;
  });

  const allModulesApproved = modules.every((m) => m.quizApproved);
  const certificate = db.certificates.find((c) => c.userId === userId && c.trailId === trail.id) ?? null;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return {
    trailId: trail.id,
    trailTitle: trail.title,
    modules,
    progressPercent,
    certificateEligible: allModulesApproved && !!enrollment,
    certificateIssued: !!certificate,
    certificateCode: certificate?.code ?? null
  };
}
