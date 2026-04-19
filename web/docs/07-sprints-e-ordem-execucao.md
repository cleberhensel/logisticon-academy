# 07 — Sprints e ordem de execução

Cada sprint é **autocontido**: entrega rotas, guards, serviços, componentes, fixtures e critérios de aceite testáveis manualmente.

## S0 — Fundações

**Entregáveis**

- Workspace Angular standalone em [`web/`](../) com tema Carbon `g10`.
- Shells (público, aluno, mínimo) em `app/layouts/`.
- `core/` com interceptors, `SessionStore`, `LocalStorageService`, guards (`AuthGuard`, `EnrollmentGuard`).
- `mock-api/` com `server.js`, seeds, `db.json` recriável.
- `scripts/sync-aulas.mjs` + `scripts/seed-db.mjs`.
- `npm start` = SPA + mock + watcher de aulas.

**Aceite**

- `http://localhost:4200` mostra shell público vazio.
- `http://localhost:4300/trails` devolve trilhas seed.
- `assets/aulas/index.json` existe e descreve as trilhas reais.

## S1 — Catálogo

**Entregáveis**

- Feature `catalog` com rotas `/trilhas` e `/trilhas/:slug`.
- `LkTrailCard` partilhado.
- `CatalogService` consome `index.json` + endpoints mock.

**Aceite**

- Lista paginada apenas com `published`.
- Detalhe mostra syllabus (módulos/aulas) e CTA coerente com `eligibility`.

## S2 — Identidade

**Entregáveis**

- Feature `auth` com rotas `/registo`, `/login`, `/verificar-email`.
- `AuthService` + `SessionStore` em `localStorage`.
- `AuthGuard` + interceptor que injeta `Authorization`.
- Feature flag `requireEmailVerifiedForPurchase` em `environment`.

**Aceite**

- Registo cria utilizador no mock e devolve token.
- Login persiste sessão em reload.
- Token expirado → redirect para `/login` com `returnUrl`.

## S3 — Pedido + Stripe + retorno

**Entregáveis**

- `OrderService`, `StripeService`.
- Feature `checkout` com `/checkout/sucesso` e `/checkout/cancelado`.
- Endpoint `POST /__sim/stripe-webhook` ativo.
- Página de stub Stripe (sub-modo A) opcional.

**Aceite**

- Clicar “Comprar” no detalhe gera pedido + redireciona para Stripe (test ou stub).
- Retorno em sucesso confirma pagamento e cria matrícula.
- Retorno em cancelado preserva pedido em `pending_payment`.

## S4 — Área do aluno

**Entregáveis**

- Feature `learn` com rotas dashboard / outline / player.
- `LkLessonContent` (marked + DOMPurify).
- Endpoint de progresso ativo; persistência local.

**Aceite**

- Dashboard mostra trilhas matriculadas e progresso.
- Outline reflete `locked/available/completed`.
- Player renderiza Markdown sanitizado e marca aula como concluída.

## S5 — Avaliação e certificados

**Entregáveis**

- Feature `quiz` com rota e fluxo Aprovar/Reprovar/Sem tentativas.
- Feature `certificates` com certificado e validação pública.
- `LkCertificateCode` com botão copiar.

**Aceite**

- Quiz embaralhado, sem gabarito no payload do cliente.
- Certificado emitido quando regras cumpridas.
- Validação pública responde `valid` / `revoked` / `not_found`.

## S6 — Erros e a11y

**Entregáveis**

- Páginas 403/404/500 em `features/errors/`.
- Auditoria axe nos 7 fluxos críticos F-A a F-G.
- Foco gerido após navegação; `aria-live` em estados de pagamento e quiz.

**Aceite**

- Sem violação `serious`/`critical` no axe.
- Teclado completa o happy path do início ao fim.

## Pré-requisitos para iniciar implementação

1. Etapa 0 (este folder `docs/`) revista.
2. Aprovação do `package.json` proposto em [`02-stack-e-dependencias.md`](./02-stack-e-dependencias.md).
3. Confirmação de que se mantém o sub-modo A do Stripe enquanto não houver conta configurada (ver [`06-stripe-modo-poc.md`](./06-stripe-modo-poc.md)).
