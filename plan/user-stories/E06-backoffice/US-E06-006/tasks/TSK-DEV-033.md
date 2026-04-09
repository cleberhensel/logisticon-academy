# TSK-DEV-033 — BO busca utilizadores

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-033 |
| **Prioridade** | P1 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-006](../US-E06-006.md) |

## Contexto de negócio

Operação sobre contas (P1).

**API:** `GET /admin/users?q=&page=`.

**Infra:** Índice email.

**Frontend:** Data table Carbon com busca.

**Dependências:** DEV-006.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
