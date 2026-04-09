# TSK-DEV-037 — BO reembolso Stripe + enrollment

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-037 |
| **Prioridade** | P1 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-010](../US-E06-010.md) |

## Contexto de negócio

Estorno alinhado ao Stripe e ao acesso à trilha (P1).

**Domínio:** `stripe.refunds.create` via **StripeRefundPort**; atualizar order/enrollment (suspender).

**Infra:** Adapter Stripe.

**Dependências:** DEV-036, DEV-014.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
