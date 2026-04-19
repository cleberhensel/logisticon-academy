# Medidas DAX que não quebram com o negócio — OTIF, fill rate e a cauda do lead time

DAX não é «fórmula de Excel com chique»: é **contexto de filtro**. Em supply chain, medidas mal escritas **mudam** quando alguém clica num *slicer* de produto — às vezes desejado, às vezes catástrofe silenciosa. Esta aula fixa **padrões prontos** para OTIF, fill rate, lead time (P50/P90), saldo semi-aditivo de estoque e comparações YoY, com **dicionário** obrigatório por medida e armadilhas reais.

---

## Objetivos e resultado de aprendizagem

- Distinguir **contexto de linha** × **contexto de filtro** em DAX.
- Escrever medidas para **OTIF** (linha → pedido) com `CALCULATE` + `FILTER`.
- Calcular **fill rate** ao nível **linha** e **pedido** sem dupla contagem.
- Aplicar `USERELATIONSHIP` para *role-playing dates* (promessa, embarque, POD).
- Implementar **percentis** (`PERCENTILEX.INC`) para lead time P50/P90.
- Tratar **semi-aditividade** do estoque com `LASTDATE`.
- Usar `SAMEPERIODLASTYEAR`, `DATESYTD`, `DATEADD` para comparativos.
- Documentar cada medida em **dicionário** padrão.

**Duração:** 80–100 min. **Pré-requisitos:** [Aula 3.1](aula-01-modelo-dados-supply-chain-power-bi.md); modelo TechLar carregado.

---

## Mapa do conteúdo

1. Gancho — o fill rate que contava linhas duas vezes.
2. Contexto de linha × contexto de filtro (mini-revisão).
3. Padrões DAX para fill rate (linha e pedido).
4. Padrões DAX para OTIF (com janela `[ini, fim]`).
5. Lead time P50/P90 com `PERCENTILEX.INC`.
6. Estoque semi-aditivo (`LASTDATE`).
7. Comparativos YoY, MoM, semana sobre semana.
8. *Role-playing dates* com `USERELATIONSHIP`.
9. Variáveis (`VAR`), performance e legibilidade.
10. Dicionário operacional por medida.
11. Caso prático com gabarito numérico.
12. Trade-offs, erros, ferramentas.
13. Exercícios, reflexão, fechamento, referências, pontes.

---

## Gancho — o fill rate que contava linhas duas vezes

Na TechLar, uma medida usou `SUMX` sobre tabela **desnormalizada** com produto repetido por *merge* errado. O fill rate **subiu** artificialmente de 91% para 96%. O CFO comemorou. A cauda foi descoberta no fechamento mensal — e a confiança no painel demorou meses a voltar.

> **Lição:** sempre **validar medida com tabela de teste** pequena (10–20 linhas) **antes** de publicar; o motor não pergunta se a soma faz sentido **de negócio**.

---

## Contexto de linha × contexto de filtro (revisão rápida)

- **Coluna calculada** opera em **contexto de linha**: vê **uma linha** por vez.
- **Medida** opera em **contexto de filtro**: vê **a tabela** já filtrada pelo visual (slicers, eixo, *cross-filter*).
- `CALCULATE` é a **única função** que **modifica** o contexto de filtro.
- `FILTER` cria uma **tabela** dentro de um filtro; pode ser caro se mal posicionado.

> **Regra do guarda-chuva:** `CALCULATE ( <medida>, <filtros> )` — a medida acontece **debaixo** do guarda-chuva dos filtros.

---

## Fill rate — duas medidas, dois grãos

### Fill rate ao nível **linha** (ponderado por quantidade)

```dax
QtdPedidaTotal :=
SUM ( f_pedido[qtd_pedida] )

QtdEntregueTotal :=
SUM ( f_pedido[qtd_entregue] )

FillRateLinha :=
DIVIDE (
    [QtdEntregueTotal],
    [QtdPedidaTotal]
)
```

### Fill rate ao nível **pedido** (1 ou 0 por pedido)

```dax
PedidosCompletos :=
VAR T =
    ADDCOLUMNS (
        VALUES ( f_pedido[pedido_id] ),
        "@completo",
            VAR Linhas = CALCULATETABLE ( f_pedido )
            RETURN
                IF (
                    SUMX ( Linhas, f_pedido[qtd_entregue] )
                        >= SUMX ( Linhas, f_pedido[qtd_pedida] ),
                    1,
                    0
                )
    )
RETURN
    SUMX ( T, [@completo] )

PedidosTotal :=
DISTINCTCOUNT ( f_pedido[pedido_id] )

FillRatePedido :=
DIVIDE ( [PedidosCompletos], [PedidosTotal] )
```

> **Não misture** `FillRateLinha` e `FillRatePedido` no mesmo cartão sem rótulo. Em farmácia, **fill rate por linha** ≥ 92% é benchmark; em varejo grande, contratos B2B exigem ≥ 95% como gatilho de **multa**.

---

## OTIF — composto «on time» **e** «in full»

```dax
PedidosOnTime :=
VAR T =
    ADDCOLUMNS (
        VALUES ( f_pedido[pedido_id] ),
        "@ontime",
            VAR PromessaIni = CALCULATE ( MIN ( f_pedido[data_promessa_ini] ) )
            VAR PromessaFim = CALCULATE ( MAX ( f_pedido[data_promessa_fim] ) )
            VAR DataPod     = CALCULATE ( MAX ( f_pedido[data_pod] ) )
            RETURN
                IF (
                    NOT ISBLANK ( DataPod )
                        && DataPod >= PromessaIni
                        && DataPod <= PromessaFim,
                    1,
                    0
                )
    )
RETURN
    SUMX ( T, [@ontime] )

PedidosOTIF :=
VAR T =
    ADDCOLUMNS (
        VALUES ( f_pedido[pedido_id] ),
        "@otif",
            VAR Linhas = CALCULATETABLE ( f_pedido )
            VAR EntregueOk =
                SUMX ( Linhas, f_pedido[qtd_entregue] ) >=
                SUMX ( Linhas, f_pedido[qtd_pedida] )
            VAR PromessaIni = CALCULATE ( MIN ( f_pedido[data_promessa_ini] ) )
            VAR PromessaFim = CALCULATE ( MAX ( f_pedido[data_promessa_fim] ) )
            VAR DataPod     = CALCULATE ( MAX ( f_pedido[data_pod] ) )
            VAR OnTime =
                NOT ISBLANK ( DataPod )
                    && DataPod >= PromessaIni
                    && DataPod <= PromessaFim
            RETURN
                IF ( EntregueOk && OnTime, 1, 0 )
    )
RETURN
    SUMX ( T, [@otif] )

PctOTIF :=
DIVIDE ( [PedidosOTIF], [PedidosTotal] )
```

> **Atenção à janela:** «cedo demais» é **falha** em B2B com janela `[ini, fim]`; aqui, *DataPod < PromessaIni* **conta como atraso**. Em e-commerce capital, a janela é geralmente `[..., promessa_fim]` (só `fim`) — adapte o predicado.

---

## Lead time P50 / P90

```dax
LeadTimeHorasMed :=
AVERAGEX (
    FILTER ( f_pedido, NOT ISBLANK ( f_pedido[data_pod] ) ),
    DATEDIFF ( f_pedido[data_embarque], f_pedido[data_pod], HOUR )
)

LeadTimeP50 :=
PERCENTILEX.INC (
    FILTER ( f_pedido, NOT ISBLANK ( f_pedido[data_pod] ) ),
    DATEDIFF ( f_pedido[data_embarque], f_pedido[data_pod], HOUR ),
    0.5
)

LeadTimeP90 :=
PERCENTILEX.INC (
    FILTER ( f_pedido, NOT ISBLANK ( f_pedido[data_pod] ) ),
    DATEDIFF ( f_pedido[data_embarque], f_pedido[data_pod], HOUR ),
    0.9
)
```

> **Performance:** `PERCENTILEX.INC` é caro em fatos grandes; em produção, considere materializar uma tabela diária com pré-cálculo dos percentis ou usar agregações.

---

## Estoque semi-aditivo

Saldo **não** soma no tempo. Para «estoque do mês» pegamos o **último dia** disponível:

```dax
EstoqueSaldoFim :=
CALCULATE (
    SUM ( f_estoque[qtd_disp] ),
    LASTDATE ( DimCalendario[data] )
)

EstoqueValorMedio :=
AVERAGEX (
    VALUES ( DimCalendario[data] ),
    CALCULATE ( SUM ( f_estoque[valor_brl] ) )
)
```

**Erro clássico:** `SUM ( f_estoque[qtd_disp] )` num cartão filtrado por mês → soma 30 dias e dá um saldo **30× maior** que o real.

---

## Comparativos temporais

```dax
PedidosTotal_LY :=
CALCULATE ( [PedidosTotal], SAMEPERIODLASTYEAR ( DimCalendario[data] ) )

PctOTIF_LY :=
CALCULATE ( [PctOTIF], SAMEPERIODLASTYEAR ( DimCalendario[data] ) )

DeltaOTIF_pp :=
[PctOTIF] - [PctOTIF_LY]

PctOTIF_YTD :=
CALCULATE ( [PctOTIF], DATESYTD ( DimCalendario[data] ) )

PctOTIF_4WkRolling :=
CALCULATE (
    [PctOTIF],
    DATESINPERIOD ( DimCalendario[data], MAX ( DimCalendario[data] ), -28, DAY )
)
```

---

## *Role-playing dates* com `USERELATIONSHIP`

`f_pedido` tem **três** datas: `data_promessa_fim`, `data_embarque`, `data_pod`. Apenas **uma** relação ativa com `DimCalendario` (geralmente `data_promessa_fim`). Outras ficam **inativas** e ativam-se sob demanda:

```dax
PctOTIF_PorEmbarque :=
CALCULATE (
    [PctOTIF],
    USERELATIONSHIP ( f_pedido[data_embarque], DimCalendario[data] )
)

LeadTimeP90_PorPod :=
CALCULATE (
    [LeadTimeP90],
    USERELATIONSHIP ( f_pedido[data_pod], DimCalendario[data] )
)
```

---

## Variáveis e performance

- Use `VAR` para **calcular uma vez** e reutilizar (semântico + performance).
- Evite `FILTER ( <tabela inteira> )`; prefira `KEEPFILTERS` ou colunas filtráveis.
- `DIVIDE ( a, b )` em vez de `a/b` — protege contra divisão por zero.
- Profile com **DAX Studio** → *Server Timings*; busque queries < 200 ms para visuais críticos.

```dax
PctOTIF_Otimizada :=
VAR Total = [PedidosTotal]
VAR OTIF  = [PedidosOTIF]
RETURN
    DIVIDE ( OTIF, Total )
```

---

## Dicionário operacional — exemplo

| Campo | Valor |
|-------|-------|
| **Nome** | `[PctOTIF]` |
| **Descrição** | % pedidos *on time* AND *in full* segundo contrato interno |
| **Numerador** | `[PedidosOTIF]` |
| **Denominador** | `[PedidosTotal]` |
| **Granularidade** | pedido |
| **Janela on time** | `[data_promessa_ini, data_promessa_fim]`; cedo conta como falha |
| **In full** | `SUM(qtd_entregue) >= SUM(qtd_pedida)` por pedido |
| **Exclusões** | pedidos cancelados pré-embarque; cortesia |
| **Fonte** | `f_pedido` (origem ERP+WMS+TMS) |
| **Cadência** | diária 06h00 |
| **Meta** | 95% (alerta < 92%) |
| **Dono** | Coordenação Performance Logística |
| **Versão** | v1.0 — abr/2026 |

> **Analogia:** medida sem dicionário é **dívida técnica emocional**: quando o número cair, alguém vai improvisar a definição na sala quente.

---

## Caso prático — TechLar (10 pedidos)

| pedido | linhas pedidas | linhas completas | janela | data_pod | OnTime | InFull | OTIF |
|--------|---------------|------------------|--------|----------|--------|--------|------|
| 101 | 3 | 3 | [01,03] | 02 | sim | sim | 1 |
| 102 | 5 | 4 | [01,03] | 03 | sim | não | 0 |
| 103 | 2 | 2 | [01,03] | 04 | não | sim | 0 |
| 104 | 1 | 1 | [01,03] | 01 | sim | sim | 1 |
| 105 | 4 | 4 | [01,03] | — | – | – | 0 |
| 106 | 3 | 3 | [01,03] | 03 | sim | sim | 1 |
| 107 | 2 | 1 | [01,03] | 02 | sim | não | 0 |
| 108 | 6 | 6 | [01,03] | 02 | sim | sim | 1 |
| 109 | 1 | 1 | [01,03] | 05 | não | sim | 0 |
| 110 | 2 | 2 | [01,03] | 03 | sim | sim | 1 |

**Cálculos:**

- `PedidosTotal` = 10
- `PedidosOTIF` = 5 → `PctOTIF` = **50%**
- `QtdPedida` = 29; `QtdEntregue` = 27 → `FillRateLinha` = **93,1%**
- Pedidos completos = 7 → `FillRatePedido` = **70%**

**Lição:** `FillRateLinha` (93,1%) parece bom, mas `FillRatePedido` (70%) e `PctOTIF` (50%) revelam o sofrimento do cliente. Mostrar **uma** métrica é **manipular**.

---

## Trade-offs

| Decisão | Mais legível | Mais rápido | Quando trocar |
|---------|--------------|-------------|---------------|
| `FILTER` + `ADDCOLUMNS` | Sim | Não | Volume baixo (< 1 M) |
| Pré-cálculo em SQL/dbt | Não (lógica fora) | Sim | > 10 M ou medidas reusadas |
| `CALCULATE + FILTER` simples | Sim | Médio | Padrão para a maioria dos casos |
| **Calculation Groups** | Médio | Reduz medidas | YoY, MoM, YTD repetidos em 5+ medidas |

---

## Erros comuns e armadilhas

- `COUNTROWS` na tabela errada (fato vs dim).
- `SUM` sobre coluna desnormalizada após *merge* mal feito.
- Misturar **moedas** sem conversão.
- Não usar `DIVIDE` (e ter `#DIV/0!` na cara do CEO).
- `SAMEPERIODLASTYEAR` sem **DimCalendario** marcada como tabela de datas.
- `PERCENTILEX.INC` num cartão sem agregação.
- Esquecer **`USERELATIONSHIP`** em medidas que precisam de outra data.
- Medidas com nomes parecidos (`OTIF`, `OTIF v2`, `OTIF_final`).

---

## Ferramentas e tecnologias

- **DAX Studio** — profiling e *server timings*.
- **Tabular Editor 3** — Calculation Groups, Best Practice Analyzer.
- **SQLBI DAX Patterns** — biblioteca de padrões prontos.
- **Power BI Copilot** — sugere medidas (revise sempre a definição).
- **dbt + métricas semânticas** — quando a definição precisa morar **fora** do BI.

---

## Glossário rápido

- **VAR:** variável local em medida; calculada uma vez.
- **CALCULATE:** modifica contexto de filtro.
- **USERELATIONSHIP:** ativa relação inativa temporariamente.
- **Calculation Group:** grupo de cálculos reutilizáveis (ex.: «Time Intelligence»).
- **PERCENTILEX.INC / EXC:** percentis com interpolação inclusiva/exclusiva.

---

## Aplicação — exercícios

1. Implemente `[PctOTIF]` no seu modelo e teste com 20 pedidos sintéticos.
2. Escreva `[FillRatePedido]` evitando dupla contagem.
3. Adicione `[LeadTimeP90]` e visualize por canal × semana.
4. Crie `[EstoqueSaldoFim]` e valide contra inventário físico.
5. Documente as 5 medidas no **dicionário**.

**Gabarito pedagógico:** medida `[PctOTIF]` deve cair quando você adicionar slicer de canal problemático; `[FillRatePedido]` ≤ `[FillRateLinha]` quase sempre; `[LeadTimeP90]` ≥ `[LeadTimeMed]`.

---

## Pergunta de reflexão

Qual medida hoje **ninguém** consegue explicar com **uma frase** — e quem decide com base nela toda semana?

---

## Fechamento — takeaways

- DAX é **contexto de filtro**: sempre que o número parecer estranho, pergunte «o que está filtrado?».
- Medidas críticas merecem **dicionário** e **teste com tabela de 10 linhas**.
- Performance: `VAR`, agregações e Calculation Groups antes de tunning exótico.

---

## Referências

1. Microsoft — [DAX guide](https://learn.microsoft.com/dax/).
2. RUSSO, M.; FERRARI, A. *The Definitive Guide to DAX*. Microsoft Press.
3. SQLBI — [DAX Patterns](https://www.daxpatterns.com/).
4. SQLBI — [Best practices in DAX](https://www.sqlbi.com/topics/best-practices/).
5. Microsoft — [Calculation groups](https://learn.microsoft.com/analysis-services/tabular-models/calculation-groups).
6. Trilha Fundamentos — [KPIs logísticos](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-03-nivel-servico-kpis-logisticos.md).

---

## Pontes para outras trilhas

- Anterior: [Aula 3.1 — Modelo de dados](aula-01-modelo-dados-supply-chain-power-bi.md).
- Próxima: [Aula 3.3 — Operacional × estratégico](aula-03-operacional-vs-estrategico-power-bi.md).
- [Módulo 4 — KPIs](../modulo-04-indicadores-logisticos-kpis/README.md): definições contratuais que estas medidas implementam.
