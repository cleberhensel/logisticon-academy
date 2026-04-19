# Lead time e variabilidade — a média que sorri enquanto a cauda morde

**Lead time** é o intervalo entre **dois marcos** escolhidos (pedido → entrega, embarque → POD, liberação → embarque, etc.). A **média** esconde a **cauda**: dois modais com a mesma média podem ter **P90** radicalmente diferente — e a política de **estoque de segurança** sente o **P90** (ou P95), não a média do slide.

Esta aula formaliza **definições**, **percentis**, **histograma**, **CV** (coeficiente de variação) e **dicionário operacional** para LT — ligando à [Aula 4.1 (OTIF)](aula-01-otif-fill-rate-contrato-interno.md) e à [Aula 4.3 (Giro/Cobertura)](aula-03-giro-cobertura-estoque-capital.md). DAX e visualização em [Aula 3.2](../modulo-03-power-bi-para-supply-chain/aula-02-medidas-dax-supply-chain.md) e [Aula 1.3](../modulo-01-data-analytics-para-logistica/aula-03-visualizacao-narrativa-logistica.md).

---

## Objetivos e resultado de aprendizagem

- Distinguir **LT cliente**, **LT interno CD**, **LT transporte** e **LT fornecedor**.
- Calcular **P50**, **P90**, **P95** com fórmula e interpretação.
- Avaliar **variabilidade** com **CV** = σ/μ e **IQR** (intervalo interquartílico).
- Aplicar **histograma** e **boxplot** para detectar **multimodalidade**.
- Ligar variabilidade a **estoque de segurança** (intuição quantitativa).
- Documentar LT em **dicionário operacional**.

**Duração:** 60–80 min. **Pré-requisitos:** [Aula 4.1](aula-01-otif-fill-rate-contrato-interno.md); estatística descritiva básica.

---

## Mapa do conteúdo

1. Gancho — «média de cinco dias» com cliente furioso.
2. Definição operacional dos quatro LT.
3. Percentis P50/P90/P95 — fórmula e cálculo manual.
4. Variabilidade — CV, IQR, multimodalidade.
5. Visualização — histograma + boxplot.
6. Diagrama (Mermaid).
7. Ligação ao **estoque de segurança** (Silver, Pyke & Peterson).
8. Caso prático com 20 tempos de entrega.
9. Dicionário operacional.
10. Trade-offs, erros, ferramentas.
11. Exercícios, reflexão, fechamento, referências, pontes.

---

## Gancho — «média de cinco dias» com cliente furioso

A TechLar prometeu **5 dias** com base na **média** histórica. **10%** dos pedidos levaram **12 dias**. O cliente lembra-se dos **doze**, não da média. Resultado: NPS despencou, marketplace aplicou *de-rank*, comercial perdeu campanha.

> **Analogia do *Uber*:** preço médio numa segunda-feira pode ser «20 reais» — mas em hora de pico chove e custa **80**. Quem promete a média **mente** ao cliente que vive a cauda.

---

## Definição operacional — quatro LT

| LT | Início | Fim | Quem mede | Pergunta principal |
|----|--------|-----|-----------|---------------------|
| **LT cliente** | confirmação pagamento | POD | Cliente / NPS | «Quanto tempo do clique à porta?» |
| **LT interno CD** | liberação onda | embarque | Coord. Expedição | «Quanto demora a separar e expedir?» |
| **LT transporte** | embarque | POD | Coord. Transporte | «Quanto leva o caminhão?» |
| **LT fornecedor** | PO ao fornecedor | recebimento CD | Suprimentos | «Quanto demora a chegar matéria/SKU?» |

Cada um responde a **pergunta diferente**; misturá-los no **mesmo KPI** é **comparar maçãs com prazos de entrega**.

---

## Percentis — P50, P90, P95

- **P50 (mediana):** «metade das entregas foi mais rápida».
- **P90:** «90% das entregas foram **até** este tempo» — útil para **buffer** e promessas conservadoras.
- **P95:** mais conservador; usado para SLA premium.

**Cálculo manual** (`n=10`, valores ordenados):

```
posicao_p = (n - 1) * p + 1     // método linear interpolado
p_valor   = valor[floor(p)] + (p - floor(p)) * (valor[ceil(p)] - valor[floor(p)])
```

**Em Excel:**

```excel
= PERCENTILE.INC(intervalo; 0,5)
= PERCENTILE.INC(intervalo; 0,9)
= PERCENTILE.INC(intervalo; 0,95)
```

**Em DAX:** `PERCENTILEX.INC ( tabela, expressão, 0.9 )` (ver [Aula 3.2](../modulo-03-power-bi-para-supply-chain/aula-02-medidas-dax-supply-chain.md)).

---

## Variabilidade — CV, IQR e multimodalidade

| Métrica | Fórmula | Interpretação |
|---------|---------|----------------|
| **Média (μ)** | `Σx / n` | tendência central; sensível a outlier |
| **Mediana** | valor central | robusta |
| **Desvio padrão (σ)** | `√(Σ(x-μ)²/(n-1))` | dispersão absoluta |
| **CV** | `σ/μ` | dispersão relativa; comparável entre LT diferentes |
| **IQR** | `Q3 − Q1` | intervalo central 50% |
| **Multimodalidade** | dois ou mais picos no histograma | sinal de **mistura de processos** (ex.: rodoviário + aéreo) |

**Heurísticas:**

- `CV < 0,2` → processo **estável**.
- `CV 0,2–0,5` → variabilidade **moderada**; revisar buffers.
- `CV > 0,5` → variabilidade **alta**; cauda manda.

---

## Visualização — histograma + boxplot

```mermaid
flowchart LR
  subgraph segm["Segmentacao"]
    R[Regiao]
    M[Modal]
    C[Canal]
    T[Transportadora]
  end
  subgraph dist["Distribuicao"]
    H[Histograma]
    B[Boxplot]
  end
  subgraph metr["Metricas"]
    P50[P50]
    P90[P90]
    CV[CV]
  end
  segm --> dist --> metr
```

- **Histograma:** revela **modais** e **caudas** (LT geralmente é assimétrico à direita).
- **Boxplot:** mostra **mediana**, **quartis**, **outliers** — visualmente honesto.
- **Small multiples** por canal/região: detecta segmentos «escondidos».

> **Erro clássico:** mostrar só «média ± desvio» quando a distribuição é assimétrica (a cauda direita é longa em LT logístico).

---

## Ligação ao estoque de segurança

Modelos clássicos de inventário (Silver, Pyke & Peterson) ligam **variabilidade de LT e demanda** ao **estoque de segurança** (`SS`). Intuição:

\[
SS \approx z \cdot \sqrt{\bar{LT} \cdot \sigma_D^2 + \bar{D}^2 \cdot \sigma_{LT}^2}
\]

Onde:

- `z` = nível de serviço desejado (ex.: 1,65 para 95%).
- `LT̄, σ_LT` = média e desvio do lead time.
- `D̄, σ_D` = média e desvio da demanda.

**Lição prática:** **reduzir variabilidade do LT** (consolidação de rotas, *cut-off* claro, contrato com transportadora) pode **liberar capital** tanto quanto «cortar estoque». Em farma BR, com giro **8x/ano**, cada dia de variabilidade reduzido vale **milhões** em capital de giro.

---

## Caso prático — TechLar, 20 entregas (LT cliente em dias)

Amostra: `[3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 12, 12, 14]` (já ordenada, `n=20`).

**Cálculos:**

- **Soma:** 143; **Média:** 143 / 20 = **7,15 dias**.
- **Mediana (P50):** valor entre posição 10 e 11 → `(6 + 6) / 2` = **6,0 dias**.
- **Q1 (P25):** posição 5,75 → ≈ **5,0**.
- **Q3 (P75):** posição 15,25 → ≈ **9,25**.
- **IQR:** 9,25 − 5 = **4,25 dias**.
- **P90:** posição `(20-1)*0,9+1 = 18,1` → valor[18]=12, valor[19]=12, interpolado = **12,0**.
- **P95:** posição `19,05` → ≈ **12,1**.
- **σ:** ≈ **3,12** dias.
- **CV:** 3,12 / 7,15 ≈ **0,44** (variabilidade moderada-alta).

**Duas frases para o CFO:**

- «Nossa entrega média é de **7,2 dias**.» — verde, confortável.
- «**90% dos pedidos** chegam em até **12 dias**; o cliente promete-se a si mesmo a média e julga-nos pelo P90.» — vermelho, **decisão**.

**Decisão de capital:** comprometer-se com **8 dias** (entre P50 e P75) e investir em **redução de cauda** (consolidação) é mais barato que aumentar SS para cobrir P90 atual.

---

## Dicionário operacional — exemplo

| Campo | Valor |
|-------|-------|
| **Nome** | `[LT_Cliente_P90]` |
| **Descrição** | Percentil 90 do lead time cliente em dias úteis BR |
| **Início** | `data_confirmacao_pagto` (timestamp UTC → BRT) |
| **Fim** | `data_pod` (timestamp UTC → BRT) |
| **Cálculo** | `PERCENTILEX.INC` sobre dias úteis BR |
| **Exclusões** | pedidos cancelados; devoluções |
| **Universo** | últimos 90 dias móveis |
| **Granularidade visual** | semana × canal × região |
| **Cadência** | diária 06h00 |
| **Meta** | ≤ 5 dias úteis |
| **Alerta** | > 6 dias úteis |
| **Dono** | Coord. Performance Logística |
| **Versão** | v1.0 — abr/2026 |

---

## Trade-offs

| Decisão | Mais simples | Mais correto | Quando trocar |
|---------|--------------|--------------|---------------|
| Comunicar média | Slide bonito | Comunicar P90 | Sempre que houver SLA externo |
| Dias corridos | Mais simples | Dias úteis | Sempre que entrega humana for relevante |
| Histograma | Caro de fazer | Pequeno multiplicador | Análise mensal e estratégica |
| Reduzir cauda | Aumentar SS | Reduzir variabilidade na fonte | Capital alto + giro alto |

---

## Erros comuns e armadilhas

- Misturar **dias úteis** e **dias corridos** sem conversão.
- Ignorar **pedidos cancelados** no meio do fluxo.
- Segmentar demais até **n** pequeno demais (ruído > sinal).
- Comparar **modais** diferentes na mesma série sem rótulo.
- **Truncar outliers** sem documentar (alguns são reais, ex.: greve).
- Comunicar média quando o cliente **vive a cauda**.
- Esquecer **fuso** ao subtrair timestamps.

---

## Ferramentas e tecnologias

- **Excel** — `PERCENTILE.INC`, `STDEV.S`, `LET` para fórmulas legíveis.
- **Power BI** — `PERCENTILEX.INC`, visual *boxplot* (custom Vega-Lite).
- **Python (notebook)** — `numpy.percentile`, `seaborn.boxplot`, `matplotlib.hist`.
- **R** — `quantile`, `boxplot`, `ggplot2`.
- **Tableau / Looker** — boxplot nativo.

---

## Glossário rápido

- **Lead time:** intervalo entre marcos escolhidos.
- **P50/P90/P95:** percentis 50/90/95.
- **CV:** coeficiente de variação = σ/μ.
- **IQR:** intervalo interquartílico = Q3 − Q1.
- **Cauda:** extremo da distribuição (geralmente direita em LT).
- **Estoque de segurança (SS):** buffer para variabilidade de LT e demanda.

---

## Aplicação — exercícios

1. Capture **20 tempos** de entrega reais e calcule **média**, **P50**, **P90**, **CV**.
2. Construa **histograma** e **boxplot**; identifique multimodalidade.
3. Escreva **duas frases** para o CFO: uma com média, outra com P90.
4. Estime impacto de **reduzir CV** de 0,4 para 0,2 no estoque de segurança.
5. Documente o KPI no **dicionário operacional**.

**Gabarito pedagógico:** P90 ≥ média sempre que cauda for pesada. Decisão de **promessa** ou **seguro** deve ancorar na cauda, não na média. Reduzir CV pela metade pode reduzir SS em ~30–40% (regra de bolso, dependendo de demanda).

---

## Pergunta de reflexão

Qual segmento hoje **dilui a cauda** no agregado global da sua operação — e quem decide com base nessa média mascarada?

---

## Fechamento — takeaways

- Lead time sem **cauda visível** é **marketing interno** disfarçado de análise.
- **P90 + CV + segmentação** = base honesta para promessa e capital.
- **Reduzir variabilidade** vale tanto quanto «cortar estoque» — e às vezes mais.

---

## Referências

1. SILVER, E. A.; PYKE, D. F.; PETERSON, R. *Inventory Management and Production Planning and Scheduling*. Wiley.
2. CHOPRA, S.; MEINDL, P. *Supply Chain Management*. Pearson.
3. NAHMIAS, S. *Production and Operations Analysis*. McGraw-Hill.
4. FEW, S. *Show Me the Numbers* — histogramas e comparação de distribuições.
5. CSCMP — [Glossary](https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx).
6. Trilha Fundamentos — [KPIs logísticos](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-03-nivel-servico-kpis-logisticos.md).
7. ILOS — Indicadores logísticos no Brasil.

---

## Pontes para outras trilhas

- Anterior: [Aula 4.1 — OTIF e fill rate](aula-01-otif-fill-rate-contrato-interno.md).
- Próxima: [Aula 4.3 — Giro e cobertura](aula-03-giro-cobertura-estoque-capital.md).
- [Aula 3.2 — Medidas DAX](../modulo-03-power-bi-para-supply-chain/aula-02-medidas-dax-supply-chain.md).
