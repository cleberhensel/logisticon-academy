# TSK-DEV-010 — Produto/preço Stripe por trilha

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-010 |
| **Prioridade** | P0 |
| **Épico** | E02 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-02-catalogo-pedidos.md](../../../../specs/SPEC-02-catalogo-pedidos.md) |
| **Épico (detalhe DEV)** | [epic-02-catalogo-e-pedidos.md](../../../../features/epic-02-catalogo-e-pedidos.md) |
| **US** | [US-E02-004](../US-E02-004.md) |

## Contexto de negócio

Ligação 1:1/N:1 trilha ↔ produto Stripe.

**DB:** `products`, `prices` com `stripe_price_id`.

**Domínio:** Invariante: sem `stripe_price_id` válido não há checkout.

**Infra:** Prisma; dados espelhados com Stripe (moeda/valor consistentes).

**Frontend BO (parcial):** E06 — associação de IDs; validação ao guardar.

**Dependências:** DEV-028.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
