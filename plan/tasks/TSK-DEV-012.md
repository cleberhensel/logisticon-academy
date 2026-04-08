# TSK-DEV-012 — Stripe Checkout Session + metadata

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-012 |
| **Prioridade** | P0 |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../specs/SPEC-03-stripe-pagamentos.md) |
| **US** | [US-E03-001](../user-stories/E03-stripe-pagamentos/US-E03-001.md) · [US-E03-008](../user-stories/E03-stripe-pagamentos/US-E03-008.md) (UX pós-checkout) |
| **Épico** | E03 |

## Objetivo

Criar Stripe Checkout Session com metadata (`order_id`, `user_id`, …) e URLs `success`/`cancel` alinhadas à UX pós-pagamento.

## Escopo

CHK-01…06 na SPEC-03; páginas ou estados de retorno descritos em US-E03-008.

## Critérios de aceite

- [ ] Código e migrações alinhados ao modelo de dados da SPEC.
- [ ] Testes automatizados mínimos (unit ou integração) para o fluxo principal.
- [ ] Documentação de API atualizada (OpenAPI ou README do módulo).
- [ ] Revisão de segurança/PII para rotas expostas.

## Dependências

Consultar grafo no `registro-de-features.md`; concluir dependências P0 upstream antes do merge.
