# TSK-DEV-014 — Fulfillment: order paid + enrollment

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-014 |
| **Prioridade** | P0 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-003](../US-E03-003.md) |

## Contexto de negócio

Matrícula ativa após pagamento confirmado (core learning + certificados).

**Domínio:** `FulfillOrderUseCase` (transação); `order` → `paid`; `enrollment` única por user+track; **concorrência:** lock/unique.

**Infra:** Prisma transação; reutilizado por DEV-043.

**Testes:** Uma ordem paga ≠ duas matrículas.

**Dependências:** DEV-013.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
