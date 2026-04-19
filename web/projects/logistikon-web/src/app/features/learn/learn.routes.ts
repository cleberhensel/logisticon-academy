import { Routes } from '@angular/router';
import { enrollmentGuard } from '../../core/auth/enrollment.guard';

export const LEARN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard.page').then((m) => m.DashboardPage)
  },
  {
    path: 'trilhas/:trailId',
    canActivate: [enrollmentGuard],
    loadComponent: () => import('./pages/outline.page').then((m) => m.OutlinePage)
  },
  {
    path: 'trilhas/:trailId/aulas/:lessonId',
    canActivate: [enrollmentGuard],
    loadComponent: () => import('./pages/player.page').then((m) => m.PlayerPage)
  },
  {
    path: 'trilhas/:trailId/modulos/:moduleId/quiz',
    canActivate: [enrollmentGuard],
    loadComponent: () => import('../quiz/pages/quiz.page').then((m) => m.QuizPage)
  },
  {
    path: 'trilhas/:trailId/certificado',
    canActivate: [enrollmentGuard],
    loadComponent: () => import('../certificates/pages/certificate.page').then((m) => m.CertificatePage)
  }
];
