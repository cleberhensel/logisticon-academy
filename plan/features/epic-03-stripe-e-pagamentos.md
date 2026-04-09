# Épico E03 — Stripe e pagamentos

**Objetivo de produto:** cobrar com **Stripe Checkout**, confirmar pagamento por **webhook idempotente** e manter **pedidos** consistentes com **matrículas**.

**Artefactos de plano:** [SPEC-03](../specs/SPEC-03-stripe-pagamentos.md) · [User stories (E03)](../user-stories/E03-stripe-pagamentos/) · Tasks [TSK-DEV-012](../user-stories/E03-stripe-pagamentos/US-E03-001/tasks/TSK-DEV-012.md) … [TSK-DEV-017](../user-stories/E03-stripe-pagamentos/US-E03-006/tasks/TSK-DEV-017.md) e [TSK-DEV-043](../user-stories/E03-stripe-pagamentos/US-E03-007/tasks/TSK-DEV-043.md) (reconciliação)

---

## DEV-012 — Endpoint criação Stripe Checkout Session

- **Prioridade:** P0  
- **Ref spec:** CHK-01 … CHK-06

**Objetivo (dev):** Criar sessão de checkout a partir de um `order` existente.

**Escopo técnico**
- **API:** `POST /payments/checkout-session` — body: `order_id`.
- Chamar `stripe.checkout.sessions.create` com `line_items`, `success_url`, `cancel_url`, `metadata` (`user_id`, `track_id`, `order_id`), `client_reference_id = order_id`.
- Salvar `stripe_checkout_session_id` no pedido.

**Critérios de aceite**
- Retorna `url` para redirect.
- Erros da API Stripe mapeados para mensagem segura ao cliente.

**Dependências:** DEV-011, variáveis `STRIPE_SECRET_KEY`.

---

## DEV-013 — Webhook Stripe com validação e idempotência

- **Prioridade:** P0  
- **Ref spec:** §8.3 tópico 08

**Objetivo (dev):** Endpoint `POST /webhooks/stripe` que valida assinatura e processa eventos sem duplicar efeitos.

**Escopo técnico**
- Validar `Stripe-Signature` com raw body.
- Tabela `stripe_events` com `stripe_event_id` UNIQUE.
- Handler principal: `checkout.session.completed` → orquestra DEV-014.
- Retornar 200 apenas após persistência bem-sucedida; 500 para retry onde aplicável.

**Critérios de aceite**
- Mesmo `event.id` reenviado não executa segunda vez lógica de negócio.
- Payload inválido ou assinatura errada → 400.

**Dependências:** DEV-012.

---

## DEV-014 — Liberação de matrícula após pagamento

- **Prioridade:** P0  
- **Ref spec:** PUR-01, fluxo A.6

**Objetivo (dev):** Em transação: atualizar `order` → `paid`, criar `enrollment` ativa.

**Escopo técnico**
- Serviço de domínio `fulfillOrder(orderId)` chamado apenas a partir do webhook (e opcionalmente job de reconciliação).
- **DB:** `enrollments` com `user_id`, `track_id`, `source = b2c_order`, `source_id = order_id`.

**Critérios de aceite**
- Uma ordem `paid` gera exatamente uma matrícula para o par usuário+trilha do pedido.
- Concorrência: lock ou unique constraint evita duplicata.

**Dependências:** DEV-013.

---

## DEV-015 — Máquina de estados do pedido

- **Prioridade:** P0  
- **Ref spec:** §8.4

**Objetivo (dev):** Implementar transições `created` → `pending_payment` → `paid` | `failed` | `cancelled` → `refunded`.

**Escopo técnico**
- Enum/status no modelo; funções de transição que impedem estados ilegais.
- Eventos Stripe adicionais (`payment_intent.payment_failed`, etc.) mapeados para `failed` quando couber.

**Critérios de aceite**
- Documentação das transições permitidas no código ou ADR.
- Testes unitários por transição principal.

**Dependências:** DEV-011, DEV-013.

---

## DEV-016 — Aplicação e validação de cupom

- **Prioridade:** P1  
- **Ref spec:** PUR-02, CHK-05

**Objetivo (dev):** Aplicar desconto no valor do checkout (Stripe promotion code ou cálculo interno + `price_data`).

**Escopo técnico**
- Validar cupom no `POST /commerce/orders` ou ao criar session.
- Decrementar uso / validar expiração.

**Critérios de aceite**
- Cupom inválido: erro claro; pedido não segue para Stripe com preço errado.
- Cupom esgotado: rejeitado.

**Dependências:** DEV-011, DEV-038 (CRUD cupom BO).

---

## DEV-017 — Bloqueio de compra duplicada da mesma trilha

- **Prioridade:** P0  
- **Ref spec:** PUR-03

**Objetivo (dev):** Impedir novo pedido/checkout se já existe `enrollment` ativa para a trilha.

**Escopo técnico**
- Checagem em `POST /commerce/orders` e/ou antes de `checkout-session`.

**Critérios de aceite**
- Resposta com mensagem amigável “você já possui esta trilha”.
- Opcional: permitir recompra se política for “renovação” (documentar).

**Dependências:** DEV-014 (matrícula existente).

---

## DEV-043 — Job de reconciliação de pagamentos

- **Prioridade:** P1  
- **Ref spec:** §8.3

**Objetivo (dev):** Job agendado que compara pedidos `pending_payment` antigos com Stripe e finaliza pedidos órfãos.

**Escopo técnico**
- Cron/worker; consulta Sessions/PaymentIntents por `order` ou metadata.
- Chamar mesma lógica que DEV-014 quando detectar pago.

**Critérios de aceite**
- Alerta se discrepância após N horas.
- Logs persistidos para auditoria.

**Dependências:** DEV-012, DEV-013, DEV-014.

> **Nota:** DEV-043 está no registro como E03; mantido neste épico.

---
