# TSK-DEV-045 — Pool de assentos e convites por e-mail

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-045 |
| **Prioridade** | P2 |
| **Spec** | [SPEC-07](../specs/SPEC-07-b2b-organizacoes.md) |
| **US** | [US-E07-002](../user-stories/E07-b2b/US-E07-002/US-E07-002.md) |
| **Épico** | E07 |

## Objetivo

Após pedido corporativo pago: criar N assentos; enviar convite com token; ao aceitar, criar `enrollment` e consumir assento (reutilizar liberação de acesso com `source = b2b_seat`).

## Escopo

- Modelos: `seat_pools`, `invitations` (pending / accepted / expired / revoked).
- Integração com e-mail (DEV-047).

## Critérios de aceite

- [ ] Convite expirado devolve assento ao pool (MVP).
- [ ] Fluxo de matrícula consistente com B2C.
- [ ] Estados de convite testados.

## Dependências

DEV-044; pedido/pagamento corporativo (E03); DEV-047.
