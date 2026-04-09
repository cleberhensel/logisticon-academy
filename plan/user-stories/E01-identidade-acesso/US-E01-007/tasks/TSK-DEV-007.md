# TSK-DEV-007 — Modelo roles, user_roles, organizations base

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-007 |
| **Prioridade** | P0 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-007](../US-E01-007.md) |

## Contexto de negócio

Base multi-tenant para B2B sem quebrar B2C.

**API/DB:** `roles`, `user_roles`, `organizations`, `organization_members` (podem existir vazias no MVP).

**Domínio:** Modelo de papéis com união de permissões documentada; queries com `organization_id` opcional para futuro buyer.

**Infra:** Migrações Prisma + índices para `(user_id, org_id)`.

**Testes:** Utilizador só B2C ignora org nullable.

**Dependências:** DEV-006.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
