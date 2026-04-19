import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStore } from './session.store';
import { environment } from '../../../environments/environment';

export const emailVerifiedGuard: CanActivateFn = () => {
  const session = inject(SessionStore);
  const router = inject(Router);

  if (!environment.requireEmailVerifiedForPurchase) return true;
  if (session.isEmailVerified()) return true;

  return router.createUrlTree(['/auth/verificar-email']);
};
