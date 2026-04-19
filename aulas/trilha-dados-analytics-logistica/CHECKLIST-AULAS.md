# Checklist — 12 aulas · Dados e analytics aplicados à logística

Use para revisão de conteúdo antes de gravação ou publicação.

> **Status pós-revisão (2026-04-19):** as 12 aulas foram **reescritas** com template enriquecido (gancho, conceito-núcleo, modelo de dados, diagramas Mermaid, exemplos técnicos com fórmulas Excel reais, código M, medidas DAX, snippets SQL, dicionário operacional de KPI completo, governança e qualidade de dados, ferramentas modernas, exercícios com gabarito numérico, pontes entre trilhas). Todas mantêm os links existentes e a secção «Pergunta de reflexão»/«Pontes».

## Módulo 1 — Data Analytics para Logística

- [x] [Aula 1 — Do problema ao *dataset*](modulo-01-data-analytics-para-logistica/aula-01-do-problema-ao-dataset.md): pergunta testável, *grain*, fontes, dicionário, contrato de dado, qualidade mínima. **Status pós-revisão:** ★★★★★ (9/10).
- [x] [Aula 2 — Qualidade, viés e demanda «fantasma»](modulo-01-data-analytics-para-logistica/aula-02-qualidade-vies-demanda-fantasma.md): demanda latente/observada/atendida, reconciliação ERP×WMS×TMS, framework com tests dbt/GE, selo de qualidade, exemplos M e SQL. **Status pós-revisão:** ★★★★★ (9/10).
- [x] [Aula 3 — Visualização e narrativa](modulo-01-data-analytics-para-logistica/aula-03-visualizacao-narrativa-logistica.md): gramática Cleveland/Few, BLUF + SCQA, bullet chart, wireframes operacional/executivo, WCAG. **Status pós-revisão:** ★★★★★ (9/10).

## Módulo 2 — Excel Avançado para Logística

- [x] [Aula 1 — Modelagem tabular](modulo-02-excel-avancado-para-logistica/aula-01-modelagem-tabular-logistica.md): fato/dim, ER conceitual, Power Pivot, `XLOOKUP`, `LET`, `LAMBDA`, `SUMIFS`, DimCalendario com `SEQUENCE`, anti-join. **Status pós-revisão:** ★★★★★ (9/10).
- [x] [Aula 2 — Power Query](modulo-02-excel-avancado-para-logistica/aula-02-power-query-pratica-logistica.md): pipeline canónico, encoding, fuso, código M anotado, padrões (anti-dup, last-touch, snapshot, pasta dinâmica), query folding, caso prático OTD. **Status pós-revisão:** ★★★★★ (9/10).
- [x] [Aula 3 — Painéis operacionais](modulo-02-excel-avancado-para-logistica/aula-03-paineis-operacionais-excel.md): wireframe TechLar, cartões com `LET`, bullet chart, slicers/timelines, refresh + Power Automate, selo de qualidade. **Status pós-revisão:** ★★★★★ (8.5/10).

## Módulo 3 — Power BI para Supply Chain

- [x] [Aula 1 — Modelo de dados](modulo-03-power-bi-para-supply-chain/aula-01-modelo-dados-supply-chain-power-bi.md): star schema com 3 fatos, SCD2, RLS, DimCalendario DAX, Direct Lake, `.pbip` + Git. **Status pós-revisão:** ★★★★★ (9/10).
- [x] [Aula 2 — Medidas DAX](modulo-03-power-bi-para-supply-chain/aula-02-medidas-dax-supply-chain.md): contexto de filtro, fill rate linha/pedido, OTIF com janela, `PERCENTILEX.INC`, semi-aditivas, `USERELATIONSHIP`, dicionário, performance. **Status pós-revisão:** ★★★★★ (9.5/10).
- [x] [Aula 3 — Operacional *vs.* estratégico](modulo-03-power-bi-para-supply-chain/aula-03-operacional-vs-estrategico-power-bi.md): wireframes, drill-through, mobile, deployment pipeline Dev/Test/Prod, alertas/Teams, Copilot. **Status pós-revisão:** ★★★★★ (9/10).

## Módulo 4 — Indicadores Logísticos (KPIs)

- [x] [Aula 1 — OTIF e fill rate](modulo-04-indicadores-logisticos-kpis/aula-01-otif-fill-rate-contrato-interno.md): três versões honestas (cliente/interno/comercial), tratamento antecipação/substituição/parcial, dicionário publicável, benchmarks BR. **Status pós-revisão:** ★★★★★ (9.5/10).
- [x] [Aula 2 — Lead time](modulo-04-indicadores-logisticos-kpis/aula-02-lead-time-variabilidade-logistica.md): quatro LT, P50/P90/P95 calculados, CV, IQR, multimodalidade, ligação a SS via Silver/Pyke. **Status pós-revisão:** ★★★★★ (9/10).
- [x] [Aula 3 — Giro e cobertura](modulo-04-indicadores-logisticos-kpis/aula-03-giro-cobertura-estoque-capital.md): giro COGS×vendas, DOS, GMROI, capital empatado, acurácia inventário, caso prático 5 SKUs. **Status pós-revisão:** ★★★★★ (9/10).

## Critérios transversais (todas)

- [x] Pelo menos um diagrama **Mermaid** onde ajude (todas têm 1+).
- [x] Exercício com **gabarito pedagógico** (todas).
- [x] Secção **Referências** com fontes nomeadas (Kimball, Few, CSCMP, Microsoft, SQLBI, ILOS, etc.).
- [x] Sem bloco de metadados «Trilha / Público / Duração» no topo do ficheiro (objetivos e duração dentro de secção própria).
- [x] **Dicionário operacional de KPI** (numerador/denominador/exclusões/dono/fonte/cadência/meta) — novo critério.
- [x] **Exemplos técnicos** com fórmulas Excel, código M, DAX, SQL — novo critério.
- [x] **Pontes para outras trilhas** explícitas — novo critério.
- [x] **Trade-offs e decisão** com tabela comparativa — novo critério.
- [x] **Acessibilidade WCAG** mencionada onde pertinente (Aula 1.3 e 2.3).
