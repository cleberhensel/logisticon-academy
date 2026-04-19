import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/shell-app/shell-app.component').then((m) => m.ShellAppComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'trilhas' },
      {
        path: 'trilhas',
        loadChildren: () => import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES)
      },
      {
        path: 'certificado/verificar',
        loadComponent: () =>
          import('./features/certificates/pages/verify-public.page').then((m) => m.VerifyPublicPage)
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES)
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadChildren: () => import('./features/checkout/checkout.routes').then((m) => m.CHECKOUT_ROUTES)
      },
      {
        path: 'learn',
        canActivate: [authGuard],
        loadChildren: () => import('./features/learn/learn.routes').then((m) => m.LEARN_ROUTES)
      },
      {
        path: '__stub/stripe',
        loadComponent: () =>
          import('./features/checkout/pages/stripe-stub.page').then((m) => m.StripeStubPage)
      },
      {
        path: 'erro',
        loadChildren: () => import('./features/errors/errors.routes').then((m) => m.ERRORS_ROUTES)
      },
      { path: '**', redirectTo: 'erro/404' }
    ]
  }
];
