# TSK-DEV-015 — Máquina de estados do pedido

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-015 |
| **Prioridade** | P0 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-004](../US-E03-004.md) |

## Contexto de negócio

Pedidos rastreáveis para suporte e reconciliação.

**Domínio:** Máquina de estados explícita (`pending_payment`, `paid`, `failed`, `cancelled`, `refunded`); funções de transição; mapeamento eventos Stripe (Strategy).

**Infra:** Enum + persisted state.

**Testes:** Transições ilegais rejeitadas.

**Dependências:** DEV-011, DEV-013.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
