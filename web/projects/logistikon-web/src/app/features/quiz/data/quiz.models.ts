export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  stem: string;
  options: QuizOption[];
}

export interface QuizStartResponse {
  attemptId: string;
  moduleId: string;
  questions: QuizQuestion[];
  minScore: number;
  maxAttempts: number;
  attemptsLeft: number;
}

export interface QuizSubmitResponse {
  approved: boolean;
  score: number;
  minScore: number;
  attemptsLeft: number;
  correct: number;
  total: number;
}

export interface QuizAnswers {
  [questionId: string]: string;
}
