# Logistikon Academy — POC Angular

POC do happy path MVP em **Angular 18 standalone** + **IBM Carbon Design System**, com **BFF in-browser** (HttpInterceptor + `localStorage`) e **aulas em Markdown** sincronizadas a partir de [`../aulas/`](../aulas/) sem alterar a fonte.

> Sem servidor Node em runtime: a SPA é 100% estática e funciona idêntica em `ng serve` local e no GitHub Pages.

## Pré-requisitos

- Node 20 LTS (ou superior)
- npm 10+

## Setup

```bash
cd web
npm install
```

## Comandos

| Comando | Efeito |
|---------|--------|
| `npm start` | SPA Angular em `http://localhost:4200`. Antes corre `prepare:assets` (sync das aulas + build do `db.json` estático). |
| `npm run sync:aulas` | Sincroniza `.md` de `../aulas/` para `projects/logistikon-web/src/assets/aulas/` e gera `index.json`. |
| `npm run build:static-db` | Gera `projects/logistikon-web/src/assets/api/db.json` a partir de `mock-api/seed/` + `assets/aulas/index.json`. |
| `npm run prepare:assets` | Atalho para `sync:aulas` + `build:static-db`. |
| `npm run build` | Build de produção (origem usa `<base href="/">`). |
| `npm run build:gh-pages` | Build para GitHub Pages: prepara assets, build com `--base-href=/logisticon-academy/`, copia `index.html → 404.html`, cria `.nojekyll`. |
| `npm run lint` | Lint. |
| `npm test` | Testes unitários. |

## Arquitectura — BFF in-browser

A SPA chama `${environment.apiBaseUrl}` (`/api`) normalmente. Um `HttpInterceptor` em [`src/app/core/static-bff/`](projects/logistikon-web/src/app/core/static-bff/README.md) curto-circuita os pedidos antes da rede e responde a partir de:

- **`assets/api/db.json`** — snapshot estático imutável (utilizadores demo, preços, trilhas, banco de quiz). Gerado no build.
- **`localStorage`** — overlay mutável (registos novos, matrículas, progresso, tentativas de quiz, certificados, orders, sessões de checkout, e-mail log).

Para reset do estado mutável: abrir a SPA com `?reset=1` na URL (ex.: `http://localhost:4200/?reset=1`).

Endpoints cobertos 1:1 com o antigo mock Node (auth, catálogo, orders, checkout/webhook, enrollments, quiz, certificados), incluindo:

- Admin (`admin@logistikon.test`) com matrícula virtual em todas as trilhas.
- Resposta neutra anti-enumeração no `register`.
- Idempotência do `__sim/stripe-webhook`.
- Latência simulada (~80–120 ms) para preservar a sensação de loading.

## Utilizadores demo

| Email | Password | Role |
|-------|----------|------|
| `demo@logistikon.test` | `demo123` | student |
| `admin@logistikon.test` | `admin123` | admin (acesso a tudo) |

## Documentação

Tudo o que está construído está descrito em [`docs/`](./docs/README.md).

## Importante

- **Nunca alterar** [`../aulas/`](../aulas/), [`../plan/`](../plan/), [`../discovery/`](../discovery/), [`../apresentacao/`](../apresentacao/), [`../UX/`](../UX/), [`../ui/`](../ui/).
- `assets/aulas/` e `assets/api/db.json` são **gerados** e estão no `.gitignore`.
- Os dados-fonte do BFF estático estão em [`mock-api/seed/`](mock-api/seed/) (`users.json`, `prices.json`, `quiz-bank.json`).

## Stripe

POC arranca em **modo `stub`** (sem chave): o Checkout é substituído por uma página interna em `/__stub/stripe`. O fluxo completo (criar order → webhook simulado → matrícula activa) corre 100% no browser.

## Publicar no GitHub Pages

1. Habilitar Pages no repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push para `main` afectando `web/**`, `aulas/**` ou o próprio workflow dispara o pipeline em [`.github/workflows/gh-pages.yml`](../.github/workflows/gh-pages.yml).
3. URL final: `https://<utilizador>.github.io/logisticon-academy/`.
4. Para deploy manual: aba **Actions → Deploy GitHub Pages → Run workflow**.

Para validar localmente o output que será publicado:

```bash
cd web
npm run build:gh-pages
npx http-server dist/logistikon-web/browser -p 8080 -c-1
# abrir http://localhost:8080/   (sem prefixo, pois servimos a raiz)
```
