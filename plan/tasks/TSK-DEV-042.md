# TSK-DEV-042 — Dashboard operacional e log de webhooks Stripe

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-042 |
| **Prioridade** | P1 |
| **Spec** | [SPEC-06-backoffice.md](../specs/SPEC-06-backoffice.md) |
| **US** | [US-E06-014](../user-stories/E06-backoffice/US-E06-014.md) |
| **Épico** | E06 |

## Objetivo

Expor KPIs operacionais (pedidos/dia, falhas webhook) e lista de eventos Stripe processados/erro para operações.

## Escopo

- Queries agregadas e/ou materialized views leves.
- UI admin ou página dedicada com filtros por data.

## Critérios de aceite

- [ ] Últimos N eventos webhook visíveis com estado sucesso/erro.
- [ ] Card ou gráfico simples de pedidos no período.
- [ ] Export CSV de pedidos (se incluído no mesmo DEV).

## Dependências

DEV-013 (eventos persistidos); DEV-036 (pedidos).
