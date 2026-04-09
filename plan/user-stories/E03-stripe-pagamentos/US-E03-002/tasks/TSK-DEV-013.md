# TSK-DEV-013 — Webhook Stripe assinatura e idempotência

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-013 |
| **Prioridade** | P0 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-002](../US-E03-002.md) |

## Contexto de negócio

Confirmar pagamento de forma **idempotente** (fonte de verdade Stripe).

**API:** `POST /webhooks/stripe` — **raw body** obrigatório para assinatura.

**Domínio:** `ProcessStripeWebhookUseCase`; tabela `stripe_events` UNIQUE por `stripe_event_id`; handler `checkout.session.completed` → DEV-014.

**Infra:** Adapter Stripe webhook; transação DB ao marcar evento processado.

**DevOps:** Endpoint público atrás nginx; rate limit; IP Stripe documentado.

**Testes:** Reenvio mesmo `event.id` sem duplicar efeito; assinatura inválida 400.

**Dependências:** DEV-012.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
