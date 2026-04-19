import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { APP_ROUTES } from './app.routes';
import { authInterceptor } from './core/http/auth.interceptor';
import { errorInterceptor } from './core/http/error.interceptor';
import { staticBffInterceptor } from './core/static-bff/static-bff.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    // Ordem importa: authInterceptor injecta o header Authorization, errorInterceptor
    // trata 401/403/5xx, e o staticBffInterceptor (último) curto-circuita /api já com
    // o request enriquecido — como ele é o último a receber o request, é também o
    // primeiro a emitir a resposta de volta para a cadeia, garantindo que erros do
    // BFF passam pelo errorInterceptor.
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, staticBffInterceptor])),
    provideAnimations()
  ]
};
