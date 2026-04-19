import { Routes } from '@angular/router';

export const CHECKOUT_ROUTES: Routes = [
  {
    path: 'sucesso',
    loadComponent: () => import('./pages/checkout-success.page').then((m) => m.CheckoutSuccessPage)
  },
  {
    path: 'cancelado',
    loadComponent: () => import('./pages/checkout-cancelled.page').then((m) => m.CheckoutCancelledPage)
  }
];
