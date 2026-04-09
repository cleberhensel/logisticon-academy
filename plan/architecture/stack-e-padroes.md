# Stack, ambientes e padrões arquiteturais — Logistikon Academy

Documento de referência para **implementação** (backend, frontend, dados, deploy). As tasks (`TSK-DEV-*`) devem alinhar-se a estes princípios e citar este ficheiro em vez de repetir parágrafos longos.

## Visão em camadas (Clean Architecture)

### Backend (Express + TypeScript)

| Camada | Responsabilidade | Regras |
|--------|------------------|--------|
| **domain** | Entidades, value objects, políticas puras, **ports** (interfaces) | Sem imports de Express, Prisma ou SDKs externos |
| **application** | Casos de uso (orquestração), DTOs de aplicação, validação de fluxo | Depende só de `domain`; recebe implementações via injeção |
| **infrastructure** | **Prisma** (repositórios), **adapters** Stripe, Mailchimp, storage, relógio | Implementa interfaces definidas em `domain` / `application` |
| **interfaces/http** | Rotas Express finas, middleware (auth/RBAC), mapeamento HTTP ↔ DTO | Só orquestra: valida input, chama use case, formata resposta |

**Prisma:** modelos, queries e migrações **apenas** em `infrastructure`. Os casos de uso dependem de `UserRepository`, `OrderRepository`, etc., não de `prisma.*` diretamente.

**SOLID (aplicação prática):**

- **S** — Um use case / um controller por responsabilidade.
- **O/L/I/D** — Ports estáveis (`PaymentCheckoutPort`, `EmailPort`); novas integrações = novos adapters, não alteração do núcleo.

### Padrões de integração

- **Adapter:** Toda integração externa atrás de um port. Exemplos:
  - `StripeCheckoutPort` → `StripeCheckoutAdapter` (SDK `stripe`)
  - `EmailPort` → `MailchimpTransactionalAdapter` (ou Marketing API, conforme produto)
  - `ClockPort` → `SystemClockAdapter` (facilita testes)
- **Strategy:** Onde há **variação de política** sem `if` espalhado:
  - Conclusão de aula automática vs manual (DEV-021)
  - Mapeamento de erros Stripe → HTTP / mensagem de UI
  - Regras de elegibilidade de compra (encadear estratégias ou visitor)

---

## Frontend (Angular + Carbon Design System)

- Aproximar **Clean Architecture** no front: **feature modules / facades** por domínio, componentes **apresentacionais** “burros”, **smart containers** que chamam facades.
- **HTTP:** serviços como *adapters* da API (`/api/v1/...`); mappers DTO ↔ modelos de UI quando necessário.
- **UI:** [Carbon Design System](https://carbondesignsystem.com) — componentes, tokens, acessibilidade. Para desenvolvimento assistido por IA, usar o **Carbon MCP** (quando configurado no Cursor) para alinhar geração de markup e padrões aos componentes Carbon oficiais.
- **RBAC no front:** esconder rotas/ações com guards + dados do token; **fonte de verdade** continua no backend.

---

## Dados (Neon + Prisma)

- **Neon** (PostgreSQL): dois ambientes lógicos **hml** e **prd** (branches ou projetos separados conforme política Neon).
- **Variável:** `DATABASE_URL` por ambiente — **nunca** partilhar secrets entre hml e prd.
- **Migrações:** `prisma migrate deploy` no pipeline ou na VM por ambiente; revisar migrations antes de prd.
- **Auth da aplicação:** utilizadores e sessões na base própria (Prisma); não confundir com produtos “Auth” de terceiros salvo decisão explícita de adoção.

---

## DevOps

- **Hospedagem:** VPS **Hostinger**.
- **Proxy:** **nginx** como reverse proxy (TLS, `proxy_pass` para Node), rate limit opcional em rotas sensíveis (ex. webhook).
- **Ambientes:** `hml` / `prd` — URLs distintas, secrets distintos, Stripe **modo test** vs **live** em `STRIPE_SECRET_KEY` e webhooks separados.
- **Health:** readiness/liveness (E08 / DEV-048) para orquestração e monitorização.

---

## E-mail (Mailchimp)

- Definir contrato **`EmailPort`** na aplicação (`sendTemplate`, `sendRaw`, etc.).
- **Adapter** Mailchimp conforme produto: API **Marketing**, **Transaction Email** (anterior Mandrill), ou ambos — **documentar a escolha** num ADR ou na task E08.
- Variáveis típicas: `MAILCHIMP_API_KEY`, list/template IDs (nomes exatos dependem do produto Mailchimp utilizado).

---

## Pagamentos (Stripe Checkout)

- **Checkout Session** como superfície única de pagamento no MVP.
- **Webhook:** body **raw** para validação de assinatura; idempotência com persistência de `event.id`.
- Secrets: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, chave publicável no front apenas para Stripe.js quando necessário.

---

## Referências de plano

- Registro de features: [plan/features/registro-de-features.md](../features/registro-de-features.md)
- User stories: [plan/user-stories/README.md](../user-stories/README.md)
- Specs: [plan/specs/README.md](../specs/README.md)
