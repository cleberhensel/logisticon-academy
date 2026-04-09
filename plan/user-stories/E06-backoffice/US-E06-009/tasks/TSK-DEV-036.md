# TSK-DEV-036 — BO lista e detalhe pedidos

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-036 |
| **Prioridade** | P0 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-009](../US-E06-009.md) |

## Contexto de negócio

Suporte e finanças veem pedidos.

**API:** `GET /admin/orders`, `GET /admin/orders/:id`.

**Frontend:** Carbon Data Table + detalhe.

**Dependências:** DEV-011, DEV-006 (role financeiro).

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
