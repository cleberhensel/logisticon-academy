import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessionStore } from '../auth/session.store';
import { NotificationService } from '../notifications/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const session = inject(SessionStore);
  const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        session.clear();
        router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url } });
      } else if (err.status === 403) {
        router.navigate(['/erro/403']);
      } else if (err.status === 0) {
        notify.error('Sem ligação ao servidor. Tente novamente.');
      } else if (err.status >= 500) {
        notify.error('Ocorreu um erro inesperado. Tente novamente.');
      }
      return throwError(() => err);
    })
  );
};
