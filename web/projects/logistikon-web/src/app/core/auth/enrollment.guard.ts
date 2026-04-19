import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LearnService } from '../../features/learn/data/learn.service';
import { SessionStore } from './session.store';

export const enrollmentGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const learn = inject(LearnService);
  const session = inject(SessionStore);
  const router = inject(Router);
  const trailId = route.paramMap.get('trailId');

  if (!trailId) return router.createUrlTree(['/learn']);

  // Admin tem acesso a todas as trilhas — bypass do check de matrícula.
  if (session.isAdmin()) return true;

  return learn.hasEnrollment(trailId).pipe(
    map((has) => (has ? true : router.createUrlTree(['/erro/403'])))
  );
};
