# TSK-DEV-012 — Stripe Checkout Session + metadata

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-012 |
| **Prioridade** | P0 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-001](../US-E03-001.md) · [US-E03-008](../../US-E03-008/US-E03-008.md) |

## Contexto de negócio

Cobrança segura via **Stripe Checkout Session**.

**API:** `POST /payments/checkout-session` — body `order_id`.

**Domínio:** `CreateCheckoutSessionUseCase`; **port** `PaymentCheckoutPort`; metadata `user_id`, `track_id`, `order_id`; `client_reference_id = order_id`.

**Infra:** **Adapter** `StripeCheckoutAdapter`; guardar `stripe_checkout_session_id` no pedido.

**Frontend:** Redirect para `url` retornada; páginas `success`/`cancel` **hml/prd** com URLs distintas nas env vars.

**DevOps:** Chaves **test** vs **live**; webhook secret separado.

**Segurança:** Mapper **Strategy** erros Stripe → HTTP seguro (sem stack).

**Aceite:** URL válida; erros mapeados.

**Dependências:** DEV-011, `STRIPE_SECRET_KEY`.

## Ângulo desta user story

Ênfase na criação da sessão e redirect para Stripe.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
