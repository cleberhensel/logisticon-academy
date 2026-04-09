# TSK-DEV-001 — Registo de utilizador e validações

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-001 |
| **Prioridade** | P0 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-001](../US-E01-001.md) |

## Contexto de negócio

Primeiro contacto do utilizador com a plataforma Logistikon; dados mínimos para contas B2C (e base B2B).

**API (prefixo `/api/v1`):** `POST /auth/register` — body: nome, email, senha, locale opcional.

**Domínio / ports:** `RegisterUserUseCase`; `UserRepository`, `PasswordHasherPort` (bcrypt/argon2); validação de email/forte senha na aplicação (sem PII em logs).

**Infra:** Prisma `User` + hash apenas em infra; adapter `BcryptPasswordHasher`.

**Frontend:** Form Carbon (`cds-text-input`, `cds-button`, feedback inline); facade `AuthFacade.register()`; validação alinhada às mensagens 422 do API.

**DevOps:** Mesmo build; secrets não necessários para registo além de `DATABASE_URL`.

**Segurança:** Nunca logar senha; rate limit no gateway em `/auth/register`; política email duplicado documentada (anti-enumeração).

**Testes:** Unit do use case com hasher mock; integração API + DB (Neon branch hml).

**Aceite:** 422 com erros por campo (email inválido, senha fraca); duplicado tratado conforme política; senha nunca em claro na DB.

**Dependências:** nenhuma.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
