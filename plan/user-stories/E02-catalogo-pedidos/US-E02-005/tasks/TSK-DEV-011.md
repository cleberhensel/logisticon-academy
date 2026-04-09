# TSK-DEV-011 — Criação de pedido e itens

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-011 |
| **Prioridade** | P0 |
| **Épico** | E02 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-02-catalogo-pedidos.md](../../../../specs/SPEC-02-catalogo-pedidos.md) |
| **Épico (detalhe DEV)** | [epic-02-catalogo-e-pedidos.md](../../../../features/epic-02-catalogo-e-pedidos.md) |
| **US** | [US-E02-005](../US-E02-005.md) |

## Contexto de negócio

Pedido persistido antes do redirect Stripe (**Stripe Checkout**).

**API:** `POST /commerce/orders` — `track_id` ou `product_id`, `coupon_code?`.

**Domínio:** `CreateOrderUseCase`; estado `pending_payment`; validação elegibilidade (DEV-009, DEV-017 quando aplicável).

**Infra:** `orders`, `order_items`.

**Frontend:** Fluxo compra autenticado Carbon.

**Aceite:** Retorna `id` para `client_reference_id`; falha se sem preço ou inelegível.

**Dependências:** DEV-009, DEV-010, DEV-002.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
