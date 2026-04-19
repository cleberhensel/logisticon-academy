import {
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, defer, from, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { decodeFakeJwt } from './jwt-fake';
import { StaticBffStore, StoredUser } from './static-bff.store';
import { handleAuth } from './handlers/auth.handler';
import { handleCatalog } from './handlers/catalog.handler';
import { handleCertificates } from './handlers/certificates.handler';
import { handleCheckout } from './handlers/checkout.handler';
import { handleEnrollments } from './handlers/enrollments.handler';
import { handleOrders } from './handlers/orders.handler';
import { handleQuiz } from './handlers/quiz.handler';

export interface BffContext {
  store: StaticBffStore;
  method: string;
  path: string;
  query: URLSearchParams;
  body: unknown;
  headers: HttpHeaders;
  authUser: StoredUser | null;
}

export interface BffOk {
  kind: 'ok';
  status: number;
  body: unknown;
}

export interface BffErr {
  kind: 'err';
  status: number;
  code: string;
  message: string;
}

export type BffResult = BffOk | BffErr | null;

export const ok = (body: unknown, status = 200): BffOk => ({ kind: 'ok', status, body });
export const err = (status: number, code: string, message: string): BffErr => ({ kind: 'err', status, code, message });

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

const HANDLERS = [
  ...handleAuth(),
  ...handleCatalog(),
  ...handleOrders(),
  ...handleCheckout(),
  ...handleEnrollments(),
  ...handleQuiz(),
  ...handleCertificates()
] as RouteRule[];

function matchRoute(method: string, path: string): { rule: RouteRule; params: Record<string, string> } | null {
  for (const rule of HANDLERS) {
    if (!rule.methods.includes(method)) continue;
    const m = rule.pattern.exec(path);
    if (!m) continue;
    return { rule, params: m.groups ?? {} };
  }
  return null;
}

function getAuthUser(store: StaticBffStore, headers: HttpHeaders): StoredUser | null {
  const auth = headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const payload = decodeFakeJwt(auth.slice(7));
  if (!payload?.sub) return null;
  return store.getDb().users.find((u) => u.id === payload.sub) ?? null;
}

function stripApiPrefix(url: string): string | null {
  const base = environment.apiBaseUrl.replace(/\/$/, '');
  // suporte a urls absolutos ou relativos terminados em /api
  const noQuery = url.split('?')[0];
  if (noQuery === base) return '/';
  if (noQuery.startsWith(base + '/')) return noQuery.slice(base.length);
  // se a SPA passar URL absoluto com host, ainda corta o /api do path
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const p = u.pathname.replace(/^\/+$/, '/');
    if (p === base || p === base + '/') return '/';
    if (p.startsWith(base + '/')) return p.slice(base.length);
  } catch {}
  return null;
}

function parseBody(body: unknown): unknown {
  if (body === null || body === undefined) return body;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return body;
    }
  }
  return body;
}

function toResponse(req: HttpRequest<unknown>, result: BffOk): HttpResponse<unknown> {
  return new HttpResponse({
    status: result.status,
    statusText: 'OK',
    body: result.body,
    url: req.urlWithParams,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}

function toError(req: HttpRequest<unknown>, e: BffErr): HttpErrorResponse {
  return new HttpErrorResponse({
    error: { error: { code: e.code, message: e.message } },
    status: e.status,
    statusText: e.code,
    url: req.urlWithParams
  });
}

export const staticBffInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.staticBff?.enabled) return next(req);
  const path = stripApiPrefix(req.url);
  if (path === null) return next(req);

  const store = inject(StaticBffStore);
  const latency = Math.max(0, environment.staticBff.simulatedLatencyMs ?? 0);

  const work$: Observable<HttpEvent<unknown>> = defer(() =>
    from(store.ensureReady()).pipe(
      mergeMap(() => {
        const url = new URL(req.urlWithParams, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        const ctx: BffContext = {
          store,
          method: req.method.toUpperCase(),
          path,
          query: url.searchParams,
          body: parseBody(req.body),
          headers: req.headers,
          authUser: getAuthUser(store, req.headers)
        };
        const matched = matchRoute(ctx.method, ctx.path);
        if (!matched) {
          return throwError(() => toError(req, err(404, 'NOT_FOUND', `Rota ${ctx.method} ${ctx.path} não suportada pelo BFF estático.`)));
        }
        return from(Promise.resolve(matched.rule.handle(ctx, matched.params))).pipe(
          mergeMap((result) => {
            if (!result) {
              return throwError(() => toError(req, err(500, 'EMPTY_RESULT', 'Handler devolveu resultado vazio.')));
            }
            if (result.kind === 'err') {
              return throwError(() => toError(req, result));
            }
            return of(toResponse(req, result));
          })
        );
      })
    )
  );

  return latency > 0 ? work$.pipe(delay(latency)) : work$;
};
