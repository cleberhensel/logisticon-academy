# 05 — Matriz Features × Telas × Endpoints

Liga **feature module Angular** ↔ **rota** ↔ **ficha de tela** ↔ **endpoints mock** ↔ **componentes Carbon principais**.

| Feature | Rota | Tela ([ui/telas/](../../ui/telas/)) | Endpoints mock | Componentes Carbon |
|---------|------|----------------|---------------|---------------------|
| catalog | `/trilhas` | [tela-catalogo-trilhas.md](../../ui/telas/tela-catalogo-trilhas.md) | `GET /trails` | `Tile`, `ClickableTile`, `Pagination`, `SkeletonText`, `Tag` |
| catalog | `/trilhas/:slug` | [tela-detalhe-trilha.md](../../ui/telas/tela-detalhe-trilha.md) | `GET /trails/:slug`, `GET /trails/:slug/eligibility` | `Breadcrumb`, `Tag`, `Accordion`, `Tile`, `Button` |
| auth | `/registo` | [tela-registo.md](../../ui/telas/tela-registo.md) | `POST /auth/register` | `Form`, `Input`, `PasswordInput`, `Checkbox`, `Button`, `InlineNotification` |
| auth | `/login` | [tela-login.md](../../ui/telas/tela-login.md) | `POST /auth/login` | idem |
| auth | `/verificar-email` | [tela-verificacao-email.md](../../ui/telas/tela-verificacao-email.md) | `POST /auth/verify-email`, `POST /auth/resend-verification` | `InlineNotification`, `Button`, `Loading` |
| checkout | `/checkout/sucesso` | [tela-checkout-retorno-stripe.md](../../ui/telas/tela-checkout-retorno-stripe.md) | `POST /__sim/stripe-webhook`, `GET /orders/:id` | `InlineNotification`, `Button`, `Loading` |
| checkout | `/checkout/cancelado` | idem (variante) | `GET /orders/:id` | `Button`, `Link` |
| learn | `/learn` | [tela-dashboard-aluno.md](../../ui/telas/tela-dashboard-aluno.md) | `GET /enrollments` | `Tile`, `ProgressBar`, `Button` |
| learn | `/learn/trilhas/:trailId` | [tela-outline-trilha.md](../../ui/telas/tela-outline-trilha.md) | `GET /enrollments/:trailId/outline` | `SideNav`, `Accordion`, `Tag`, `ProgressBar` |
| learn | `/learn/trilhas/:trailId/aulas/:lessonId` | [tela-player-aula.md](../../ui/telas/tela-player-aula.md) | `PATCH .../progress`, `LkLessonContent` lê `assets/aulas/...md` | `Button`, `Toast`, `Link` |
| quiz | `/learn/trilhas/:trailId/modulos/:moduleId/quiz` | [tela-quiz-modulo.md](../../ui/telas/tela-quiz-modulo.md) | `POST /modules/:moduleId/quiz/start`, `POST /quiz/attempts/:attemptId/submit` | `RadioButtonGroup`, `Modal`, `Button`, `ProgressBar` |
| certificates | `/learn/trilhas/:trailId/certificado` | [tela-certificado-e-conclusao.md](../../ui/telas/tela-certificado-e-conclusao.md) | `POST /enrollments/:trailId/certificate` | `Tile`, `CodeSnippet`, `Button` |
| certificates | `/certificado/verificar` | [tela-validacao-certificado-publica.md](../../ui/telas/tela-validacao-certificado-publica.md) | `GET /certificates/verify?code=` | `TextInput`, `Button`, `InlineNotification`, `Tag` |
| errors | `/erro/403`, `/erro/404`, `/erro/500`, wildcard | [tela-erros-globais.md](../../ui/telas/tela-erros-globais.md) | — | `Button`, `Link` |

## Mapeamento de guards por rota

| Rota | Guards |
|------|--------|
| `/learn/**` | `AuthGuard` |
| `/learn/trilhas/:trailId/**` | `AuthGuard` + `EnrollmentGuard` |
| `/checkout/sucesso`, `/checkout/cancelado` | `AuthGuard` |
| `/registo`, `/login` | nenhum (público) |

## Componentes custom × telas

| Componente | Usado em |
|------------|----------|
| `LkTrailCard` | catálogo |
| `LkEnrollmentBadge` | dashboard, detalhe (variante) |
| `LkLessonContent` | player |
| `LkVideoPlayer` | player (placeholder até existir vídeo real) |
| `LkQuizQuestion` | quiz |
| `LkCertificateCode` | certificado e validação pública |
| `LkProgressIndicator` | dashboard, outline |
