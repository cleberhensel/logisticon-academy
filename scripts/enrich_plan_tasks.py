#!/usr/bin/env python3
"""Gera conteúdo enriquecido para plan/user-stories/**/tasks/TSK-DEV-*.md."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
US_ROOT = ROOT / "plan" / "user-stories"

EPIC_FILE = {
    "E01": "epic-01-identidade-e-acesso.md",
    "E02": "epic-02-catalogo-e-pedidos.md",
    "E03": "epic-03-stripe-e-pagamentos.md",
    "E04": "epic-04-area-do-aluno.md",
    "E05": "epic-05-avaliacao-e-certificados.md",
    "E06": "epic-06-backoffice.md",
    "E07": "epic-07-b2b-organizacoes.md",
    "E08": "epic-08-notificacoes-e-plataforma.md",
}

DEV_EPIC: dict[int, str] = {}
for n in range(1, 8):
    DEV_EPIC[n] = "E01"
for n in range(8, 12):
    DEV_EPIC[n] = "E02"
for n in list(range(12, 18)) + [43]:
    DEV_EPIC[n] = "E03"
for n in range(18, 22):
    DEV_EPIC[n] = "E04"
for n in range(22, 28):
    DEV_EPIC[n] = "E05"
for n in range(28, 43):
    DEV_EPIC[n] = "E06"
for n in range(44, 47):
    DEV_EPIC[n] = "E07"
for n in range(47, 50):
    DEV_EPIC[n] = "E08"

SPEC: dict[int, str] = {
    1: "SPEC-01-identidade-acesso.md",
    2: "SPEC-01-identidade-acesso.md",
    3: "SPEC-01-identidade-acesso.md",
    4: "SPEC-01-identidade-acesso.md",
    5: "SPEC-01-identidade-acesso.md",
    6: "SPEC-01-identidade-acesso.md",
    7: "SPEC-01-identidade-acesso.md",
    8: "SPEC-02-catalogo-pedidos.md",
    9: "SPEC-02-catalogo-pedidos.md",
    10: "SPEC-02-catalogo-pedidos.md",
    11: "SPEC-02-catalogo-pedidos.md",
    12: "SPEC-03-stripe-pagamentos.md",
    13: "SPEC-03-stripe-pagamentos.md",
    14: "SPEC-03-stripe-pagamentos.md",
    15: "SPEC-03-stripe-pagamentos.md",
    16: "SPEC-03-stripe-pagamentos.md",
    17: "SPEC-03-stripe-pagamentos.md",
    18: "SPEC-04-area-do-aluno.md",
    19: "SPEC-04-area-do-aluno.md",
    20: "SPEC-04-area-do-aluno.md",
    21: "SPEC-04-area-do-aluno.md",
    22: "SPEC-05-avaliacao-certificados.md",
    23: "SPEC-05-avaliacao-certificados.md",
    24: "SPEC-05-avaliacao-certificados.md",
    25: "SPEC-05-avaliacao-certificados.md",
    26: "SPEC-05-avaliacao-certificados.md",
    27: "SPEC-05-avaliacao-certificados.md",
    28: "SPEC-06-backoffice.md",
    29: "SPEC-06-backoffice.md",
    30: "SPEC-06-backoffice.md",
    31: "SPEC-06-backoffice.md",
    32: "SPEC-06-backoffice.md",
    33: "SPEC-06-backoffice.md",
    34: "SPEC-06-backoffice.md",
    35: "SPEC-06-backoffice.md",
    36: "SPEC-06-backoffice.md",
    37: "SPEC-06-backoffice.md",
    38: "SPEC-06-backoffice.md",
    39: "SPEC-06-backoffice.md",
    40: "SPEC-06-backoffice.md",
    41: "SPEC-06-backoffice.md",
    42: "SPEC-06-backoffice.md",
    43: "SPEC-03-stripe-pagamentos.md",
    44: "SPEC-07-b2b-organizacoes.md",
    45: "SPEC-07-b2b-organizacoes.md",
    46: "SPEC-07-b2b-organizacoes.md",
    47: "SPEC-08-plataforma-notificacoes-lgpd.md",
    48: "SPEC-08-plataforma-notificacoes-lgpd.md",
    49: "SPEC-08-plataforma-notificacoes-lgpd.md",
}
TITLE: dict[int, str] = {
    1: "Registo de utilizador e validações",
    2: "Login e emissão JWT access/refresh",
    3: "Refresh token, logout e revogação",
    4: "Verificação de e-mail (token TTL)",
    5: "Fluxo forgot/reset password",
    6: "Middleware RBAC e matriz de rotas",
    7: "Modelo roles, user_roles, organizations base",
    8: "API/UI catálogo público de trilhas",
    9: "Detalhe trilha + API elegibilidade de compra",
    10: "Produto/preço Stripe por trilha",
    11: "Criação de pedido e itens",
    12: "Stripe Checkout Session + metadata",
    13: "Webhook Stripe assinatura e idempotência",
    14: "Fulfillment: order paid + enrollment",
    15: "Máquina de estados do pedido",
    16: "Cupom: validação e sessão Stripe",
    17: "Bloqueio compra duplicada mesma trilha",
    18: "Dashboard aluno e API enrollments",
    19: "Player aula + progresso e outline",
    20: "URLs assinadas download de materiais",
    21: "Conclusão de aula manual (política trilha)",
    22: "Quiz: start + submit embaralhado",
    23: "Tentativas, nota mínima e bloqueios",
    24: "Upload projeto e armazenamento privado",
    25: "Motor certificado PDF + código único",
    26: "Endpoint/página verificação pública certificado",
    27: "Listagem e download certificados aluno",
    28: "BO CRUD trilha módulo aula",
    29: "BO ordenação módulos/aulas",
    30: "BO CRUD quiz e questões",
    31: "BO rubrica projeto",
    32: "BO publicar/despublicar trilha",
    33: "BO busca utilizadores",
    34: "BO atribuir papéis + audit_logs",
    35: "BO bloquear conta + invalidar sessões",
    36: "BO lista e detalhe pedidos",
    37: "BO reembolso Stripe + enrollment",
    38: "BO CRUD cupons",
    39: "BO template certificado",
    40: "BO emissão manual e revogação certificado",
    41: "BO fila tickets suporte",
    42: "BO dashboard KPIs e log webhooks",
    43: "Job reconciliação pagamentos Stripe",
    44: "B2B entidade organização e membros",
    45: "B2B pool assentos e convites",
    46: "B2B painel buyer e export CSV",
    47: "E-mails transacionais (Mailchimp adapter)",
    48: "Healthcheck e readiness (nginx/upstream)",
    49: "LGPD export exclusão dados mínima",
}

PRIO: dict[int, str] = {n: "P0" for n in range(1, 50)}
for n in [5, 16, 20, 21, 27, 29, 33, 35, 37, 38, 41, 42, 43, 48, 49]:
    PRIO[n] = "P1"
for n in [24, 31, 40, 44, 45, 46]:
    PRIO[n] = "P2"

# Conteúdo por DEV (secções em markdown). Usar prefixo | para linhas que são bullets
CONTENT: dict[int, str] = {}

def add(dev: int, text: str) -> None:
    CONTENT[dev] = text.strip()


add(1, """
**Negócio:** Primeiro contacto do utilizador com a plataforma Logistikon; dados mínimos para contas B2C (e base B2B).

**API (prefixo `/api/v1`):** `POST /auth/register` — body: nome, email, senha, locale opcional.

**Domínio / ports:** `RegisterUserUseCase`; `UserRepository`, `PasswordHasherPort` (bcrypt/argon2); validação de email/forte senha na aplicação (sem PII em logs).

**Infra:** Prisma `User` + hash apenas em infra; adapter `BcryptPasswordHasher`.

**Frontend:** Formulário com componentes Carbon (`Input`, `Button`, `InlineLoading`); facade `AuthFacade.register()`; validação alinhada às mensagens 422 do API.

**DevOps:** Mesmo build; secrets não necessários para registo além de `DATABASE_URL`.

**Segurança:** Nunca logar senha; rate limit no gateway em `/auth/register`; política email duplicado documentada (anti-enumeração).

**Testes:** Unit do use case com hasher mock; integração API + DB (Neon branch hml).

**Aceite:** 422 com erros por campo (email inválido, senha fraca); duplicado tratado conforme política; senha nunca em claro na DB.

**Dependências:** nenhuma.
""")

add(2, """
**Negócio:** Sessão segura para área do aluno e checkout.

**API:** `POST /auth/login` → `{ access_token, refresh_token, expires_in, user }`; claims: `sub`, `roles[]`, `org_id?`.

**Domínio:** `LoginUseCase`; `TokenIssuerPort` (access+refresh), `UserRepository`; sem vazar existência de email em mensagens (política definida com produto).

**Infra:** Prisma users + refresh storage; adapter JWT (biblioteca isolada em infra).

**Frontend:** Carbon login form; guard de rota após sucesso; tokens em storage seguro (decisão: httpOnly cookie vs memória — documentar).

**DevOps:** `JWT_SECRET` distinto hml/prd.

**Testes:** 401 credenciais inválidas; TTL access curto (15–60 min).

**Dependências:** DEV-001.
""")

add(3, """
**Negócio:** Renovar sessão sem novo login; logout confiável.

**API:** `POST /auth/refresh`, `POST /auth/logout`.

**Domínio:** `RefreshTokenUseCase`, `LogoutUseCase`; `RefreshTokenStorePort` (revogação/allowlist).

**Infra:** Tabela refresh tokens; implementação com Prisma.

**Frontend:** Interceptor HTTP que tenta refresh em 401 controlado.

**Segurança:** Refresh rotacionado ou invalidado em logout.

**Testes:** 401 refresh inválido; após logout refresh inútil.

**Dependências:** DEV-002.
""")

add(4, """
**Negócio:** Garantir email válido antes de fluxos sensíveis (conforme política produto).

**API:** `GET /auth/verify-email?token=`; `POST /auth/resend-verification` (com throttle).

**Domínio:** `VerifyEmailUseCase`; token TTL + uso único; `EmailPort` para envio do link (DEV-047).

**Infra:** Prisma tokens de verificação; sem expor token em logs.

**Frontend:** Páginas sucesso/erro Carbon (`InlineNotification`).

**Testes:** Token expirado/usado → erro claro.

**Dependências:** DEV-047.
""")

add(5, """
**Negócio:** Recuperação de conta sem suporte manual (P1).

**API:** `POST /auth/forgot-password`, `POST /auth/reset-password`.

**Domínio:** Tokens únicos TTL curto; invalidar sessões após reset.

**Infra:** Tabela reset tokens; `EmailPort`.

**Frontend:** Fluxo multi-step Carbon; mensagens genéricas no forgot (anti-enumeração).

**Dependências:** DEV-002, DEV-047.
""")

add(6, """
**Negócio:** Proteger rotas admin, financeiro e dados de outros utilizadores.

**Domínio:** `AuthorizationPort` / políticas por rota (`student`, `instructor`, `finance`, `admin`, `buyer`); lista explícita de rotas públicas (`/catalog/*`, `/auth/*`, webhook Stripe).

**Infra:** Middleware Express que resolve user + roles e consulta matriz; **sem** lógica de negócio pesada no middleware (delegar a policy se necessário).

**Frontend:** Ponte com roles do token para UI; **autorização real no backend**.

**Testes:** Casos negativos em amostra de rotas (403).

**Dependências:** DEV-002.
""")

add(7, """
**Negócio:** Base multi-tenant para B2B sem quebrar B2C.

**API/DB:** `roles`, `user_roles`, `organizations`, `organization_members` (podem existir vazias no MVP).

**Domínio:** Modelo de papéis com união de permissões documentada; queries com `organization_id` opcional para futuro buyer.

**Infra:** Migrações Prisma + índices para `(user_id, org_id)`.

**Testes:** Utilizador só B2C ignora org nullable.

**Dependências:** DEV-006.
""")

add(8, """
**Negócio:** Descoberta de trilhas vendáveis.

**API:** `GET /catalog/tracks?page=&level=&locale=` — só `status = published`.

**Domínio:** `ListPublishedTracksUseCase`; sem autenticação.

**Infra:** Prisma read-only; paginação estável.

**Frontend:** Grid Carbon, cards, imagem lazy; facades catálogo.

**DevOps:** Cache HTTP opcional no nginx (curto) — documentar.

**Aceite:** Rascunhos nunca listados; metadados `total`, `page`, `page_size`.

**Dependências:** seed ou DEV-032.
""")

add(9, """
**Negócio:** Informação de compra e **elegibilidade** antes do Stripe.

**API:** `GET /catalog/tracks/:slug`; `GET /catalog/tracks/:id/eligibility` (ou embutido se autenticado).

**Domínio:** **Strategy** de elegibilidade (já matriculado, sem preço, B2B); retorno `can_enroll`, `reason`.

**Infra:** Repositories track, enrollment, price.

**Frontend:** Página detalhe; CTA Carbon desativado se `can_enroll === false`.

**Aceite:** Preço = price ativo Stripe/DB; CTA coerente.

**Dependências:** DEV-008, DEV-010.
""")

add(10, """
**Negócio:** Ligação 1:1/N:1 trilha ↔ produto Stripe.

**DB:** `products`, `prices` com `stripe_price_id`.

**Domínio:** Invariante: sem `stripe_price_id` válido não há checkout.

**Infra:** Prisma; dados espelhados com Stripe (moeda/valor consistentes).

**Frontend BO (parcial):** E06 — associação de IDs; validação ao guardar.

**Dependências:** DEV-028.
""")

add(11, """
**Negócio:** Pedido persistido antes do redirect Stripe (**Stripe Checkout**).

**API:** `POST /commerce/orders` — `track_id` ou `product_id`, `coupon_code?`.

**Domínio:** `CreateOrderUseCase`; estado `pending_payment`; validação elegibilidade (DEV-009, DEV-017 quando aplicável).

**Infra:** `orders`, `order_items`.

**Frontend:** Fluxo compra autenticado Carbon.

**Aceite:** Retorna `id` para `client_reference_id`; falha se sem preço ou inelegível.

**Dependências:** DEV-009, DEV-010, DEV-002.
""")

add(12, """
**Negócio:** Cobrança segura via **Stripe Checkout Session**.

**API:** `POST /payments/checkout-session` — body `order_id`.

**Domínio:** `CreateCheckoutSessionUseCase`; **port** `PaymentCheckoutPort`; metadata `user_id`, `track_id`, `order_id`; `client_reference_id = order_id`.

**Infra:** **Adapter** `StripeCheckoutAdapter`; guardar `stripe_checkout_session_id` no pedido.

**Frontend:** Redirect para `url` retornada; páginas `success`/`cancel` **hml/prd** com URLs distintas nas env vars.

**DevOps:** Chaves **test** vs **live**; webhook secret separado.

**Segurança:** Mapper **Strategy** erros Stripe → HTTP seguro (sem stack).

**Aceite:** URL válida; erros mapeados.

**Dependências:** DEV-011, `STRIPE_SECRET_KEY`.
""")

add(13, """
**Negócio:** Confirmar pagamento de forma **idempotente** (fonte de verdade Stripe).

**API:** `POST /webhooks/stripe` — **raw body** obrigatório para assinatura.

**Domínio:** `ProcessStripeWebhookUseCase`; tabela `stripe_events` UNIQUE por `stripe_event_id`; handler `checkout.session.completed` → DEV-014.

**Infra:** Adapter Stripe webhook; transação DB ao marcar evento processado.

**DevOps:** Endpoint público atrás nginx; rate limit; IP Stripe documentado.

**Testes:** Reenvio mesmo `event.id` sem duplicar efeito; assinatura inválida 400.

**Dependências:** DEV-012.
""")

add(14, """
**Negócio:** Matrícula ativa após pagamento confirmado (core learning + certificados).

**Domínio:** `FulfillOrderUseCase` (transação); `order` → `paid`; `enrollment` única por user+track; **concorrência:** lock/unique.

**Infra:** Prisma transação; reutilizado por DEV-043.

**Testes:** Uma ordem paga ≠ duas matrículas.

**Dependências:** DEV-013.
""")

add(15, """
**Negócio:** Pedidos rastreáveis para suporte e reconciliação.

**Domínio:** Máquina de estados explícita (`pending_payment`, `paid`, `failed`, `cancelled`, `refunded`); funções de transição; mapeamento eventos Stripe (Strategy).

**Infra:** Enum + persisted state.

**Testes:** Transições ilegais rejeitadas.

**Dependências:** DEV-011, DEV-013.
""")

add(16, """
**Negócio:** Desconto controlado no checkout (P1).

**Domínio:** Validação cupom no pedido ou na session; respeitar expiração/usos; integração com Stripe promo ou `price_data`.

**Infra:** Repositório cupons; opcional sincronização Stripe.

**Dependências:** DEV-011, DEV-038.
""")

add(17, """
**Negócio:** Evitar cobrança duplicada da mesma trilha.

**Domínio:** Checagem em `POST /commerce/orders` e/ou antes de checkout; mensagem amigável.

**Infra:** Query enrollment ativo.

**Dependências:** matrícula existente (DEV-014).
""")

add(18, """
**Negócio:** Aluno vê progresso e próximos passos.

**API:** `GET /me/enrollments` com `progress_percent`, `next_lesson_id`, resumo da trilha.

**Domínio:** `ListMyEnrollmentsUseCase`; agregação progresso/preços apenas do próprio utilizador.

**Frontend:** Dashboard Carbon (tiles, `ProgressBar`).

**Dependências:** DEV-014, DEV-002.
""")

add(19, """
**Negócio:** Consumo de conteúdo e gravação fiável de progresso.

**API:** `GET /me/tracks/:trackId/lessons/:lessonId`; `POST /me/lesson-progress`; `GET /me/enrollments/:id/resume`.

**Domínio:** Policies de acesso por matrícula; `lesson_progress` com eventos coerentes com política (integra DEV-021).

**Infra:** Prisma `lesson_progress`.

**Frontend:** Player + outline Carbon; serviços como adapters REST.

**Dependências:** DEV-018, DEV-028.
""")

add(20, """
**Negócio:** Materiais com URL temporária (P1).

**API:** `POST /me/lessons/:id/material-url` ou redirect assinado.

**Domínio:** **Port** `SignedMaterialUrlPort`; TTL configurável; validar matrícula.

**Infra:** Adapter storage (S3/GCS) — futuro; contrato pronto desde já (**Adapter**).

**Segurança:** Sem bucket público direto; expiração 403.

**Dependências:** DEV-019.
""")

add(21, """
**Negócio:** Conclusão alinhada à política da trilha (auto vs manual).

**API:** `POST /me/lessons/:id/complete` quando permitido.

**Domínio:** **Strategy** `LessonCompletionPolicy` (auto/manual); campo trilha `allow_manual_complete`; leitura de config BO (SPEC-06).

**Infra:** Prisma track/lesson.

**Frontend:** Botão Carbon condicionado à política.

**Dependências:** DEV-019.
""")

add(22, """
**Negócio:** Avaliação justa por tentativa (embaralhamento).

**API:** `POST /me/modules/:moduleId/quiz/start`; `POST /me/quiz-attempts/:id/submit`.

**Domínio:** Não enviar gabarito ao cliente; nota só no servidor.

**Infra:** `quizzes`, `quiz_questions`, `quiz_attempts`.

**Dependências:** DEV-019, DEV-030.
""")

add(23, """
**Negócio:** Limitar tentativas e exigir nota mínima.

**Domínio:** Regras por quiz; 409 quando esgotado; bloqueio certificado até aprovar módulo.

**Dependências:** DEV-022.
""")

add(24, """
**Negócio:** Entrega avaliada por instrutor (P2).

**API:** `POST /me/assignments/:id/submit` multipart.

**Domínio:** Validação tamanho/MIME; storage privado.

**Dependências:** DEV-019, DEV-031.
""")

add(25, """
**Negócio:** Prova verificável de conclusão.

**Domínio:** `evaluateCertificateEligibility`; PDF + `code` único; idempotência emitir.

**Infra:** Motor template (DEV-039); persistência `certificates`.

**Dependências:** DEV-023, DEV-021, DEV-039.
""")

add(26, """
**Negócio:** Terceiros validam autenticidade sem login.

**API:** `GET /verify/certificates/:code` público.

**Domínio:** Dados mínimos; sem email; rate limit recomendado.

**Frontend:** Página pública leve (Carbon ou estática).

**Dependências:** DEV-025.
""")

add(27, """
**Negócio:** Aluno acede às suas provas.

**API:** `GET /me/certificates` + download autenticado.

**Domínio:** Apenas dono; política se revogado.

**Dependências:** DEV-025, DEV-002.
""")

add(28, """
**Negócio:** Gestão de conteúdo sem deploy.

**API:** `/admin/tracks`, `/admin/modules`, `/admin/lessons` (ajustar prefixo `/api/v1`).

**Domínio:** CRUD com RBAC instructor/admin; slug único.

**Frontend:** Forms e tabelas Carbon (data entry).

**Dependências:** DEV-006.
""")

add(29, """
**Negócio:** Ordem pedagógica correta no catálogo e aluno.

**API:** `PATCH` batch ordem ou endpoints dedicados.

**Frontend:** Drag-and-drop UX Carbon (onde aplicável).

**Dependências:** DEV-028.
""")

add(30, """
**Negócio:** Avaliações configuráveis pelo staff.

**API:** `/admin/quizzes`, questões/opções.

**Domínio:** Validação: publicação só com questões válidas.

**Frontend:** Editor quiz Carbon.

**Dependências:** DEV-028.
""")

add(31, """
**Negócio:** Critérios de correção de projeto (P2).

**Domínio:** `rubric_criteria` com pesos 100%.

**Dependências:** DEV-028, DEV-024.
""")

add(32, """
**Negócio:** Controlo de visibilidade comercial.

**Domínio:** `draft` ↔ `published` com validações (módulos, preço se sellable).

**Aceite:** Publicada aparece DEV-008; despublicada oculta catálogo.

**Dependências:** DEV-028, DEV-010.
""")

add(33, """
**Negócio:** Operação sobre contas (P1).

**API:** `GET /admin/users?q=&page=`.

**Infra:** Índice email.

**Frontend:** Data table Carbon com busca.

**Dependências:** DEV-006.
""")

add(34, """
**Negócio:** Trilha de auditoria para mudanças sensíveis.

**API:** `POST /admin/users/:id/roles`.

**Domínio:** `audit_logs` com actor, target, old/new.

**Dependências:** DEV-033, DEV-007.
""")

add(35, """
**Negócio:** Cumprir políticas de segurança em contas abusivas (P1).

**Domínio:** `blocked_at`; invalidar refresh; 403 em rotas autenticadas.

**Dependências:** DEV-002, DEV-033.
""")

add(36, """
**Negócio:** Suporte e finanças veem pedidos.

**API:** `GET /admin/orders`, `GET /admin/orders/:id`.

**Frontend:** Carbon Data Table + detalhe.

**Dependências:** DEV-011, DEV-006 (role financeiro).
""")

add(37, """
**Negócio:** Estorno alinhado ao Stripe e ao acesso à trilha (P1).

**Domínio:** `stripe.refunds.create` via **StripeRefundPort**; atualizar order/enrollment (suspender).

**Infra:** Adapter Stripe.

**Dependências:** DEV-036, DEV-014.
""")

add(38, """
**Negócio:** Campanhas e descontos geridos sem código (P1).

**API:** `/admin/coupons` (lista/create) e `/admin/coupons/:id` (patch/delete) — alinhar à SPEC-06.

**Domínio:** `Coupon` entity + `CouponRepository`; validações de datas, `max_uses`, tipo (% vs fixo); uso reservado ao papel `finance`/`admin`.

**Infra:** Prisma `coupons`; opcional espelho Stripe Promotion Codes (adapter) se estratégia comercial exigir.

**Frontend:** Carbon `DataTable`, modais de edição, datas com `DatePicker`.

**Testes:** CRUD + rejeitar cupom inválido na validação de checkout (integração com DEV-016).

**Aceite:** Cupom criado no BO reflete-se na validação DEV-016 antes de ir ao Stripe.

**Dependências:** DEV-016 (consumo no checkout).
""")

add(39, """
**Negócio:** Certificado brandável (P0).

**API:** `GET/PATCH /admin/certificate-templates` (ou recurso equivalente na SPEC-06) para versão ativa por trilha/global.

**Domínio:** `CertificateTemplate` com placeholders (`{{studentName}}`, `{{trackName}}`, `{{code}}`, `{{issuedAt}}`); motor de render isolado (**port** `CertificateRenderPort`, implementação PDF em infra).

**Infra:** Armazenar HTML/mustache ou template binário; versão de template para auditoria.

**Frontend:** BO Carbon: editor seguro (sandbox) ou upload + preview.

**Testes:** Snapshot de render com dados fixos.

**Aceite:** DEV-025 usa template aprovado; alteração de template não invalida certificados já emitidos (versão).

**Dependências:** iterar em paralelo com DEV-025 além de DEV-028.
""")

add(40, """
**Negócio:** Casos manuais e fraude (P2).

**API:** `POST /admin/certificates/issue`, `POST /admin/certificates/:id/revoke` com motivo e actor.

**Domínio:** `IssueCertificateManuallyUseCase`, `RevokeCertificateUseCase`; **audit_logs** obrigatório; estado `revoked` visível em DEV-026.

**Infra:** Prisma `certificates`; transações com enrollment.

**Frontend:** Carbon fluxo confirmação + campo motivo; lista certificados com badge estado.

**Segurança:** Apenas `admin`; trilho de auditoria (DEV-034 padrão).

**Testes:** Revogar → validação pública retorna estado revogado.

**Dependências:** DEV-025, DEV-026.
""")

add(41, """
**Negócio:** Suporte escalável (P1).

**Domínio:** `support_tickets`, estados, notas internas.

**Frontend:** Lista/detalhe Carbon BO.

**Dependências:** DEV-002, DEV-006.
""")

add(42, """
**Negócio:** Operação vê falhas de integração Stripe (P1).

**Domínio:** KPIs + últimos eventos falhados; depende dados DEV-013.

**Frontend:** Carbon charts/tables simples.

**Dependências:** DEV-013, DEV-036.
""")

add(43, """
**Negócio:** Fechar pedidos órfãos se webhook falhar (P1).

**Domínio:** Job agendado; consultar Stripe por metadata/session; reutilizar DEV-014.

**Infra:** Worker/cron na VPS Hostinger; logs persistidos.

**DevOps:** Não correr com credenciais erradas de ambiente; alertas após N horas.

**Dependências:** DEV-012, DEV-013, DEV-014.
""")

add(44, """
**Negócio:** Organizações corporativas (P2).

**Domínio:** `organizations`, `organization_members` buyer/member; queries scoped por token.

**Dependências:** DEV-007, DEV-006.
""")

add(45, """
**Negócio:** Convites e consumo de assentos (P2).

**Domínio:** `seat_pools`, `invitations`; reutilizar fulfillment estilo DEV-014.

**Infra:** `EmailPort` (Mailchimp) para convites.

**Dependências:** DEV-044, checkout corporativo, DEV-047.
""")

add(46, """
**Negócio:** Buyer vê progresso agregado (P2).

**API:** `GET /org/reports/export.csv`.

**Domínio:** Sem leak de conteúdo de aula; só métricas.

**Dependências:** DEV-045, DEV-018, DEV-025.
""")

add(47, """
**Negócio:** Comunicação transacional (registo, verificação, pago, certificado).

**Domínio:** **Port** `EmailPort`; **Adapter** Mailchimp (Marketing API e/ou Transactional — definir); **outbox** recomendado (falha do provedor não corrompe TX).

**Infra:** Fila/outbox table + worker; templates versionados.

**DevOps:** `MAILCHIMP_*` por ambiente hml/prd.

**Dependências:** credenciais Mailchimp.
""")

add(48, """
**Negócio:** Deploy saudável em VPS + nginx (P1).

**API:** `GET /health`, `GET /ready` (DB + opcional Stripe ping).

**Domínio:** Sem dados sensíveis no JSON público.

**Infra:** nginx upstream apenas quando ready OK.

**Dependências:** Neon acessível a partir da VPS.
""")

add(49, """
**Negócio:** Requisitos mínimos LGPD (P1).

**API:** `POST /me/privacy/export`, `POST /me/privacy/delete-request` (ou fluxo manual inicial).

**Domínio:** Anonimização vs retenção fiscal; trilho audit BO.

**Dependências:** DEV-002, DEV-033.

""")

ANGLE_HEADING = "\n## Ângulo desta user story\n\n"

ANGLES: dict[tuple[int, str], str] = {
    (9, "US-E02-002"): "Ênfase na **página de detalhe** (syllabus, preço exibido, CTA).\n",
    (9, "US-E02-003"): "Ênfase na **API de elegibilidade** `can_enroll` / `reason` e bloqueio do CTA.\n",
    (12, "US-E03-001"): "Ênfase na criação da sessão e redirect para Stripe.\n",
    (12, "US-E03-008"): "Ênfase na **UX pós-checkout**: `success_url` / `cancel_url`, estado na app Angular após retorno, mensagens Carbon.\n",
    (18, "US-E04-001"): "Dashboard como entrada principal do aluno.\n",
    (18, "US-E04-005"): "**Retomar** última aula: depende de `resume` / progresso (além desta US, ver `TSK-DEV-019` na mesma jornada).\n",
    (19, "US-E04-002"): "**Outline** e navegação módulos/aulas autorizada por matrícula.\n",
    (19, "US-E04-003"): "**Player** e eventos de progresso (`lesson-progress`).\n",
    (19, "US-E04-005"): "Complementa retomada: mesma infra de progresso que `US-E04-003`.\n",
}


def rel_to_plan(tsk_path: Path) -> int:
    d = tsk_path.resolve().parent
    n = 0
    while d.name != "plan" and d != d.parent:
        d = d.parent
        n += 1
    if d.name != "plan":
        raise ValueError(f"plan/ not found above {tsk_path}")
    return n


def main() -> None:
    paths = sorted(US_ROOT.glob("**/tasks/TSK-DEV-*.md"))
    for p in paths:
        m = re.search(r"TSK-DEV-(\d+)", p.name)
        if not m:
            continue
        dev = int(m.group(1))
        epic = DEV_EPIC[dev]
        spec_file = SPEC[dev]
        up = p.resolve().parent.parent  # US folder
        us_id = up.name
        depth = rel_to_plan(p)
        dots = "../" * depth
        arch = f"{dots}architecture/stack-e-padroes.md"
        spec_link = f"{dots}specs/{spec_file}"
        feat_link = f"{dots}features/{EPIC_FILE[epic]}"
        us_link = f"../{us_id}.md"

        extra_us = ""
        if dev == 12 and us_id == "US-E03-001":
            extra_us = f" · [US-E03-008](../../US-E03-008/US-E03-008.md)"
        elif dev == 12 and us_id == "US-E03-008":
            extra_us = f" · [US-E03-001](../../US-E03-001/US-E03-001.md)"

        body = CONTENT.get(dev, "**(conteúdo em falta — rever script)**")
        angle = ANGLES.get((dev, us_id), "")
        angle_md = f"{ANGLE_HEADING}{angle}" if angle else ""

        business, rest = "", body
        if "**Negócio:**" in body:
            rest_part = body.split("**Negócio:**", 1)[1]
            lines = rest_part.split("\n\n")
            business = lines[0].strip()
            rest = "\n\n".join(lines[1:]) if len(lines) > 1 else ""

        md = f"""# TSK-DEV-{dev:03d} — {TITLE[dev]}

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-{dev:03d} |
| **Prioridade** | {PRIO[dev]} |
| **Épico** | {epic} |
| **Arquitetura** | [stack-e-padroes.md]({arch}) |
| **Spec** | [{spec_file}]({spec_link}) |
| **Épico (detalhe DEV)** | [{EPIC_FILE[epic]}]({feat_link}) |
| **US** | [{us_id}]({us_link}){extra_us} |

## Contexto de negócio

{business}

{rest.strip()}
{angle_md}
## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md]({arch}) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
"""
        p.write_text(md, encoding="utf-8")
        print("wrote", p.relative_to(ROOT))


if __name__ == "__main__":
    main()
