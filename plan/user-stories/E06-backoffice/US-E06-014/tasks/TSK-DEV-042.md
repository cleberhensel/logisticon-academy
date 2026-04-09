# TSK-DEV-042 — BO dashboard KPIs e log webhooks

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-042 |
| **Prioridade** | P1 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-014](../US-E06-014.md) |

## Contexto de negócio

Operação vê falhas de integração Stripe (P1).

**Domínio:** KPIs + últimos eventos falhados; depende dados DEV-013.

**Frontend:** Carbon charts/tables simples.

**Dependências:** DEV-013, DEV-036.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
