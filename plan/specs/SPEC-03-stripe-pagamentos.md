# SPEC-03 — Stripe e pagamentos

**Épico:** E03 · **Refs:** `plan/features/epic-03-stripe-e-pagamentos.md`, discovery `topicos-v1/08-checkout-stripe.md`, `10-fluxos-e-passos.md` (fluxo D)

## Objetivo
Integrar **Stripe Checkout** (hosted), **webhooks** assinados e **idempotentes**, máquina de estados de **pedido** e **liberação de matrícula** após pagamento confirmado, com **reconciliação** e suporte a **cupom** e **reembolso**.

## Fora de escopo (MVP)
- Payment Element / PI custom na UI própria.
- Assinaturas recorrentes complexas.
- NF-e automática (épico fiscal separado).

## Requisitos funcionais
1. Criar **Checkout Session** com `line_items` (Price Stripe), `metadata` (`user_id`, `track_id`, `order_id`), `client_reference_id` = `order_id`.
2. URLs `success_url` / `cancel_url` parametrizáveis por ambiente.
3. Webhook `POST /webhooks/stripe` com **raw body**; validar `Stripe-Signature`.
4. Tabela `stripe_events` com `stripe_event_id` UNIQUE; replay sem efeito duplicado.
5. `checkout.session.completed` → transação: order `paid` + `enrollment` ativa.
6. Estados: `created`, `pending_payment`, `paid`, `failed`, `refunded`, `cancelled`.
7. Cupom: validação server-side + alinhamento com Stripe (`allow_promotion_codes` e/ou lógica interna).
8. Impedir compra duplicada: matrícula ativa na mesma trilha.
9. Reembolso: atualizar order e política de `enrollment` (suspender/remover no total).
10. Job de **reconciliação** periódica: pedidos inconsistentes e alertas.

## API (sugerida)
| Método | Caminho | Descrição |
|--------|---------|-----------|
| POST | `/api/v1/payments/checkout-session` | Body: `order_id` → `{ url }` |
| POST | `/api/v1/webhooks/stripe` | Eventos Stripe |

## Segurança
Segredos apenas server-side; não logar dados de cartão; webhook secret por ambiente (test/live).

## Critérios globais de aceite
- Replay do mesmo `event.id` não cria segunda matrícula.
- Pedido `paid` sem enrollment gera deteção no job de reconciliação.

## Rastreabilidade
**US:** `US-E03-001` … `US-E03-008` · **Tasks:** `TSK-DEV-012` … `TSK-DEV-017`, `TSK-DEV-043`
