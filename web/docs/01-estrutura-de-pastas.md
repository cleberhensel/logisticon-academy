# 01 — Estrutura de pastas

Toda a aplicação POC vive em [`web/`](../). Estrutura proposta:

```text
web/
├── README.md
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── angular.json
├── .gitignore
├── .editorconfig
├── docs/                                  documentação do POC (este folder)
├── mock-api/
│   ├── server.js                          json-server programático + handlers custom
│   ├── db.json                            estado em runtime (gitignored, gerado de seed/)
│   ├── routes.json                        re-mapeamentos REST opcionais
│   └── seed/
│       ├── users.json
│       ├── trails.json
│       ├── prices.json
│       ├── orders.json
│       ├── enrollments.json
│       ├── progress.json
│       ├── certificates.json
│       └── quiz-attempts.json
├── scripts/
│   ├── sync-aulas.mjs                     copia /aulas → assets/aulas + gera index.json
│   └── seed-db.mjs                        recria mock-api/db.json a partir de seed/
└── projects/
    └── logistikon-web/
        ├── public/                        favicons, ícones de marca
        └── src/
            ├── index.html
            ├── main.ts
            ├── styles/
            │   ├── _carbon-theme.scss
            │   ├── _tokens-logistikon.scss
            │   └── styles.scss
            ├── environments/
            │   ├── environment.ts
            │   └── environment.development.ts
            ├── assets/
            │   └── aulas/                 GERADO pelo script (gitignored)
            └── app/
                ├── app.config.ts
                ├── app.routes.ts
                ├── app.component.ts       (mínimo: <router-outlet/>)
                │
                ├── core/                  serviços globais singleton
                │   ├── http/
                │   │   ├── api-base.url.ts
                │   │   ├── auth.interceptor.ts
                │   │   └── error.interceptor.ts
                │   ├── auth/
                │   │   ├── auth.service.ts
                │   │   ├── session.store.ts          signal-store + localStorage
                │   │   ├── auth.guard.ts
                │   │   ├── enrollment.guard.ts
                │   │   └── email-verified.guard.ts
                │   ├── storage/
                │   │   └── local-storage.service.ts
                │   ├── notifications/
                │   │   └── notification.service.ts   wrap Carbon Notification
                │   └── core.providers.ts             ApplicationConfig providers
                │
                ├── shared/
                │   ├── components/
                │   │   ├── lk-trail-card/
                │   │   ├── lk-enrollment-badge/
                │   │   ├── lk-video-player/
                │   │   ├── lk-quiz-question/
                │   │   ├── lk-certificate-code/
                │   │   ├── lk-lesson-content/        marked + DOMPurify
                │   │   └── lk-progress-indicator/
                │   ├── pipes/
                │   │   └── duration.pipe.ts
                │   └── directives/
                │       └── focus-on-init.directive.ts
                │
                ├── layouts/
                │   ├── shell-public/
                │   ├── shell-aluno/
                │   └── shell-minimo/
                │
                └── features/
                    ├── catalog/
                    │   ├── catalog.routes.ts
                    │   ├── pages/
                    │   │   ├── catalog-list.page.ts
                    │   │   └── trail-detail.page.ts
                    │   └── data/
                    │       ├── catalog.service.ts
                    │       └── catalog.models.ts
                    ├── auth/
                    │   ├── auth.routes.ts
                    │   └── pages/
                    │       ├── register.page.ts
                    │       ├── login.page.ts
                    │       └── verify-email.page.ts
                    ├── checkout/
                    │   ├── checkout.routes.ts
                    │   └── pages/
                    │       ├── checkout-success.page.ts
                    │       └── checkout-cancelled.page.ts
                    ├── learn/
                    │   ├── learn.routes.ts
                    │   ├── pages/
                    │   │   ├── dashboard.page.ts
                    │   │   ├── outline.page.ts
                    │   │   └── player.page.ts
                    │   └── data/
                    │       ├── learn.service.ts
                    │       └── learn.models.ts
                    ├── quiz/
                    │   ├── quiz.routes.ts
                    │   └── pages/
                    │       └── quiz.page.ts
                    ├── certificates/
                    │   ├── certificates.routes.ts
                    │   └── pages/
                    │       ├── certificate.page.ts
                    │       └── verify-public.page.ts
                    └── errors/
                        └── pages/
                            ├── not-found.page.ts
                            ├── forbidden.page.ts
                            └── server-error.page.ts
```

## Regras de organização

- **Tudo standalone** — sem `NgModule` salvo se uma lib obrigar.
- Cada **feature** expõe apenas `*.routes.ts` para o router carregar lazy.
- **Sem chamadas HTTP em componentes** — só em `*.service.ts` da pasta `data/`.
- **Sem lógica de UI em serviços** — serviços expõem `Observable`/`Signal` puros.
- Componentes Carbon importados localmente em cada componente que os usa.

## Convenção de nomes

| Tipo | Sufixo |
|------|--------|
| Página standalone | `*.page.ts` |
| Componente partilhado | `lk-*` (prefixo `Lk`) |
| Serviço | `*.service.ts` |
| Guard | `*.guard.ts` |
| Interceptor | `*.interceptor.ts` |
| Modelos | `*.models.ts` |

## .gitignore relevante

```text
web/node_modules/
web/.angular/
web/dist/
web/projects/logistikon-web/src/assets/aulas/
web/mock-api/db.json
```
