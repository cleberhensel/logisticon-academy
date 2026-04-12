# Módulo 3 — Power BI para Supply Chain

**Objetivo em uma linha:** dashboards **operacionais** e **estratégicos** sobre o mesmo modelo semântico.

---

## Objetivos de aprendizagem (mensuráveis)

1. Desenhar um **esquema em estrela** (dim tempo, produto, cliente; fato pedidos/entregas).
2. Escrever medidas **DAX** com definição alinhada ao negócio (OTIF, fill rate, P90 de lead time).
3. Explicar *row-level security* em nível conceitual (região/time) e ciclo de publicação.

---

## Aulas

| Aula | Arquivo | Duração sugerida |
|------|----------|------------------|
| 1 | [aula-01-modelo-dados-supply-chain-power-bi.md](aula-01-modelo-dados-supply-chain-power-bi.md) | 150 min |
| 2 | [aula-02-medidas-dax-supply-chain.md](aula-02-medidas-dax-supply-chain.md) | 180 min |
| 3 | [aula-03-operacional-vs-estrategico-power-bi.md](aula-03-operacional-vs-estrategico-power-bi.md) | 120 min |

---

## Erros comuns

- Medida correta com **filtro errado** no visual (quebra de *grain*).
- Calendário operacional ignorando **fuso** ou feriados regionais.
- Duplicar lógica em colunas calculadas onde **medida** seria mais limpa.

---

## Atividade de consolidação

**Dicionário de medidas** (nome, fórmula resumida, definição de negócio, *owner*) exportável para o *playbook* da empresa.
