import { Routes } from '@angular/router';

export const ERRORS_ROUTES: Routes = [
  {
    path: '403',
    loadComponent: () => import('./pages/forbidden.page').then((m) => m.ForbiddenPage)
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage)
  },
  {
    path: '500',
    loadComponent: () => import('./pages/server-error.page').then((m) => m.ServerErrorPage)
  },
  { path: '', pathMatch: 'full', redirectTo: '404' }
];
