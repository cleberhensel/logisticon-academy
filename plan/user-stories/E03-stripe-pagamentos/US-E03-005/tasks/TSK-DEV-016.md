# TSK-DEV-016 — Cupom: validação e sessão Stripe

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-016 |
| **Prioridade** | P1 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-005](../US-E03-005.md) |

## Contexto de negócio

Desconto controlado no checkout (P1).

**Domínio:** Validação cupom no pedido ou na session; respeitar expiração/usos; integração com Stripe promo ou `price_data`.

**Infra:** Repositório cupons; opcional sincronização Stripe.

**Dependências:** DEV-011, DEV-038.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
