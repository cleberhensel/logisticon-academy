# TSK-DEV-021 — Conclusão de aula manual conforme política

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-021 |
| **Prioridade** | P1 |
| **Spec** | [SPEC-04-area-do-aluno.md](../specs/SPEC-04-area-do-aluno.md) |
| **US** | [US-E05-007](../user-stories/E05-avaliacao-certificados/US-E05-007/US-E05-007.md) (política; perspetiva configuração no BO em E06/SPEC-06) |
| **Épico** | E04 |

## Objetivo

Aplicar política por trilha (conclusão automática vs manual) no fluxo de progresso do aluno, conforme LRN-04.

## Escopo

- Leitura da configuração definida no CMS (backoffice) e enforcement nos endpoints de progresso/conclusão.
- Fluxo de revisão manual quando a política exigir.

## Critérios de aceite

- [ ] Política da trilha respeitada de forma consistente.
- [ ] Testes cobrindo auto vs manual e casos de permissão.
- [ ] Documentação alinhada ao modelo de dados (SPEC-04 + trechos de CMS na SPEC-06).

## Dependências

DEV-019; campos de política no conteúdo/trilha (E06).
