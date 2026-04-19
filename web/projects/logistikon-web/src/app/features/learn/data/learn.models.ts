export interface Enrollment {
  id: string;
  userId: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  status: 'active' | 'completed' | 'cancelled';
  enrolledAt: string;
  progressPercent: number;
}

export interface OutlineLesson {
  id: string;
  slug: string;
  title: string;
  durationMin: number;
  mdPath: string;
  status: 'locked' | 'available' | 'completed';
  progressPercent: number;
}

export interface OutlineModule {
  id: string;
  slug: string;
  order: number;
  title: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  lessons: OutlineLesson[];
  hasQuiz: boolean;
  quizApproved: boolean;
  quizAttemptsLeft: number;
}

export interface Outline {
  trailId: string;
  trailTitle: string;
  modules: OutlineModule[];
  progressPercent: number;
  certificateEligible: boolean;
  certificateIssued: boolean;
  certificateCode: string | null;
}

export interface ProgressUpdatePayload {
  percent: number;
  completed: boolean;
}
