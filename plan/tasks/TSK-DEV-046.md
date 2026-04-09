# TSK-DEV-046 — Painel buyer e export CSV de progresso

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-046 |
| **Prioridade** | P2 |
| **Spec** | [SPEC-07](../specs/SPEC-07-b2b-organizacoes.md) |
| **US** | [US-E07-003](../user-stories/E07-b2b/US-E07-003/US-E07-003.md) |
| **Épico** | E07 |

## Objetivo

UI/API para buyer visualizar colaboradores, progresso, status e certificado emitido; endpoint de exportação CSV.

## Escopo

- Ex.: `GET /org/reports/export.csv` (path final no contrato da API).
- Colunas fixas documentadas; UTF-8.

## Critérios de aceite

- [ ] Buyer não acessa conteúdo das aulas (apenas métricas).
- [ ] CSV conforme colunas acordadas.
- [ ] Autorização por org.

## Dependências

DEV-045; progresso/certificado (DEV-018, DEV-025 — referência épico).
