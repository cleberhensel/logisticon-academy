# Épico E01 — Identidade e acesso

**Objetivo de produto:** autenticar usuários, emitir sessão segura e aplicar **RBAC** em toda a API, com base para **multi-tenant** (B2B).

**Artefactos de plano:** [SPEC-01](../specs/SPEC-01-identidade-acesso.md) · [User stories (E01)](../user-stories/E01-identidade-acesso/) · Tasks [TSK-DEV-001](../user-stories/E01-identidade-acesso/US-E01-001/tasks/TSK-DEV-001.md) … [TSK-DEV-007](../user-stories/E01-identidade-acesso/US-E01-007/tasks/TSK-DEV-007.md) (ficheiros em cada `US-*/tasks/`)

---

## DEV-001 — Registro de usuário

- **Prioridade:** P0  
- **Ref spec:** ACC-01

**Objetivo (dev):** Permitir criação de conta com validação de dados e armazenamento seguro de senha.

**Escopo técnico**
- **API:** `POST /auth/register` — body: nome, email, senha, locale opcional.
- **DB:** inserir em `users`; senha com hash (argon2/bcrypt); `email_verified_at` nulo até verificação.
- **UI:** formulário registro + validação client-side alinhada ao servidor.

**Critérios de aceite**
- E-mail inválido ou senha fraca retorna 422 com erros por campo.
- Política de produto: mensagem genérica ou específica para e-mail duplicado (definir e documentar).
- Não persistir senha em texto plano.

**Dependências:** nenhuma.

---

## DEV-002 — Login e emissão de tokens

- **Prioridade:** P0

**Objetivo (dev):** Autenticar credenciais e retornar par access + refresh JWT (ou sessão server-side, se adotado).

**Escopo técnico**
- **API:** `POST /auth/login` → `{ access_token, refresh_token, expires_in, user }`.
- **Claims mínimos:** `sub` (user id), `roles[]`, `org_id?`.

**Critérios de aceite**
- Credenciais inválidas → 401 sem vazar se e-mail existe.
- Access token com TTL curto (ex.: 15–60 min).

**Dependências:** DEV-001.

---

## DEV-003 — Refresh token e logout

- **Prioridade:** P0

**Objetivo (dev):** Renovar access sem novo login; invalidar sessão no logout.

**Escopo técnico**
- **API:** `POST /auth/refresh`, `POST /auth/logout`.
- Persistência de refresh (tabela ou allowlist) para revogação.

**Critérios de aceite**
- Refresh inválido/expirado → 401.
- Logout remove ou invalida refresh do usuário.

**Dependências:** DEV-002.

---

## DEV-004 — Verificação de e-mail

- **Prioridade:** P0  
- **Ref spec:** ACC-02

**Objetivo (dev):** Enviar link com token TTL; marcar usuário verificado.

**Escopo técnico**
- **API:** `GET /auth/verify-email?token=`, reenvio `POST /auth/resend-verification`.
- **UI:** página de sucesso/erro.

**Critérios de aceite**
- Token usado ou expirado → erro claro.
- Até verificar: limitar checkout ou exibir aviso (política produto).

**Dependências:** DEV-047 (e-mail).

---

## DEV-005 — Fluxo esqueci minha senha

- **Prioridade:** P1  
- **Ref spec:** USR-04

**Objetivo (dev):** Solicitar reset por e-mail e definir nova senha com token seguro.

**Escopo técnico**
- **API:** `POST /auth/forgot-password`, `POST /auth/reset-password`.
- Token único, TTL curto, uso único.

**Critérios de aceite**
- Resposta genérica ao pedir reset (anti enumeração), conforme decisão de produto.
- Após reset, invalidar sessões anteriores.

**Dependências:** DEV-002, DEV-047.

---

## DEV-006 — Autorização RBAC nas rotas da API

- **Prioridade:** P0  
- **Ref spec:** tópico 04 RBAC

**Objetivo (dev):** Middleware/guard que verifica papel + recurso em todas as rotas sensíveis.

**Escopo técnico**
- Matriz de permissões em código (ex.: Casbin, policies próprias ou decorator por rota).
- Rotas públicas explícitas (`/catalog/*`, `/auth/*`, webhook Stripe).

**Critérios de aceite**
- Usuário só aluno não acessa `/admin/*` nem ações de reembolso.
- Testes automatizados de autorização negativa para amostra de rotas.

**Dependências:** DEV-002.

---

## DEV-007 — Modelo de papéis e escopo organização

- **Prioridade:** P0

**Objetivo (dev):** Suportar `user_roles` e `organization_id` opcional em claims/queries para B2B futuro.

**Escopo técnico**
- **DB:** `roles`, `user_roles`, `organizations`, `organization_members` (mínimo: tabelas podem existir vazias no MVP).
- Queries de dados sensíveis filtradas por `organization_id` quando papel buyer.

**Critérios de aceite**
- Usuário pode ter múltiplos papéis; resolução de conflito documentada (ex.: union de permissões).
- Campos nullable não quebram fluxo B2C.

**Dependências:** DEV-006.

---
