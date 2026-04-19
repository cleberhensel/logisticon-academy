import { Routes } from '@angular/router';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/catalog-list.page').then((m) => m.CatalogListPage)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/trail-detail.page').then((m) => m.TrailDetailPage)
  }
];
