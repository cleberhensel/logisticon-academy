# TSK-DEV-041 — BO fila tickets suporte

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-041 |
| **Prioridade** | P1 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-014](../US-E06-014.md) |

## Contexto de negócio

Suporte escalável (P1).

**Domínio:** `support_tickets`, estados, notas internas.

**Frontend:** Lista/detalhe Carbon BO.

**Dependências:** DEV-002, DEV-006.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
