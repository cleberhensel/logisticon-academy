# SPEC-01 — Identidade e acesso

**Épico:** E01 · **Refs:** `plan/features/epic-01-identidade-e-acesso.md`, discovery tópico 04

## Objetivo
Autenticar utilizadores, gerir sessão (access/refresh), aplicar **RBAC** em toda a API e preparar **multi-tenant** (`organization_id` opcional) para B2B.

## Fora de escopo (MVP)
- SSO corporativo (SAML/OIDC) em produção.
- App nativo.

## Requisitos funcionais
1. Registo com e-mail e palavra-passe; validação server-side.
2. Login emissão JWT access + refresh; logout com revogação de refresh conforme estratégia.
3. Verificação de e-mail com token TTL e uso único.
4. Recuperação de palavra-passe (token seguro) — P1.
5. Papéis: `student`, `instructor`, `finance`, `admin`, `buyer` (buyer pode ser fase B2B); matriz em código.
6. Todas as rotas sensíveis validam papel e recurso.
7. Auditoria mínima: alteração de papel, ações críticas admin.

## API (sugerida)
| Método | Caminho | Descrição |
|--------|---------|-----------|
| POST | `/api/v1/auth/register` | Registo |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Renovar access |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/auth/verify-email` | Confirmar e-mail |
| POST | `/api/v1/auth/forgot-password` | Pedir reset |
| POST | `/api/v1/auth/reset-password` | Redefinir |
| GET/PATCH | `/api/v1/users/me` | Perfil |
| GET/PATCH | `/api/v1/admin/users/:id` | Gestão (admin) |

## Modelo de dados
`users`, `roles`, `user_roles`, `refresh_tokens` (ou equivalente), `email_verification_tokens`, `password_reset_tokens`, `audit_logs`, `organizations`, `organization_members` (nullable no fluxo B2C).

## Critérios globais de aceite
- 401/403 consistentes; sem vazamento de enumeração de e-mail (política definida).
- Token refresh rotacionado ou invalidado em logout.
- Testes de autorização negativa em amostra de rotas.

## Rastreabilidade
**US:** `US-E01-001` … `US-E01-007` · **Tasks:** `TSK-DEV-001` … `TSK-DEV-007`
