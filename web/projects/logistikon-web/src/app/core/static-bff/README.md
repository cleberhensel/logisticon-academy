# static-bff

BFF "in-browser" da SPA Logistikon Academy. Substitui o antigo `web/mock-api/server.js` por um `HttpInterceptor` que intercepta toda chamada para `${environment.apiBaseUrl}` (ex.: `/api/...`) e responde a partir de:

- `assets/api/db.json` — snapshot estático gerado no build (utilizadores demo, preços, trilhas, banco de quiz).
- `localStorage` — overlay mutável (utilizadores criados via registo, matrículas, progresso, tentativas de quiz, certificados, orders, sessões de checkout, log de e-mails).

## Ficheiros

- `static-bff.interceptor.ts` — match de rotas, dispatch para handlers, conversão para `HttpResponse` / `HttpErrorResponse`. Suporta latência simulada via `environment.staticBff.simulatedLatencyMs`.
- `static-bff.store.ts` — singleton hidratado on-demand (`fetch` ao seed estático + leitura do overlay em `localStorage`). `write()` persiste o overlay. `reset()` limpa.
- `outline.builder.ts` — porta directa de `buildOutline` do antigo server, incluindo cálculo de status por aula/módulo, gating por quiz aprovado e admin bypass.
- `jwt-fake.ts` — gera/decode JWT no mesmo formato (alg `none`) usado pelo antigo server, para que o `authInterceptor` não precise mudar.
- `handlers/` — um ficheiro por área (auth, catalog, orders, checkout, enrollments, quiz, certificates) cobrindo 1:1 os endpoints originais.

## Reset de estado

Para limpar o overlay (re-hidratar tudo a partir do `db.json`), abrir a SPA com `?reset=1` na URL.

## Onde adicionar novos endpoints

1. Adicionar um `RouteRule` no handler relevante (ou criar um novo handler em `handlers/`).
2. Registar no array `HANDLERS` do `static-bff.interceptor.ts` (se for handler novo).
3. Se exigir novo dado-fonte: adicionar campo a `StaticBffDb` em `static-bff.store.ts` e povoar no `web/scripts/build-static-db.mjs`.
