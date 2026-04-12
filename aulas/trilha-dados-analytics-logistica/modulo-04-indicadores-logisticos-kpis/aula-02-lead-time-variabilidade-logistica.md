# Lead time e variabilidade — a média que sorri enquanto a cauda morde

**Lead time** é intervalo entre **marcos** escolhidos (pedido → entrega, embarque → *POD*, etc.). A **média** esconde a **cauda**: dois modais com a mesma média podem ter **P90** radicalmente diferente — e a política de **estoque de segurança** sente o P90, não a média do slide.

---

## Gancho — «média de cinco dias» com cliente furioso

A TechLar prometeu **cinco dias** com base na **média** histórica. Dez por cento dos pedidos levaram **doze**. O cliente lembrou-se dos **doze**. **Hipótese pedagógica:** percentis comunicam **experiência** melhor que média em serviços logísticos.

---

## Definição operacional

Escolha **início** e **fim** com timestamps auditáveis. Exemplos comuns:

- **LT cliente:** confirmação de pagamento → *POD*.  
- **LT interno CD:** liberação da onda → embarque.  
- **LT transporte:** embarque → *POD*.

Cada um responde a **pergunta** diferente; misturá-los no mesmo KPI é **comparar maçãs com prazos de entrega**.

---

## P50, P90 e histograma

- **P50 (mediana):** «metade das entregas foi mais rápida».  
- **P90:** «90% das entregas foram até este tempo» — útil para **buffer** e promessas **conservadoras**.  
- **Histograma:** mostra **multimodalidade** (ex.: dois modais misturados).

```mermaid
flowchart LR
  subgraph segmentos["Segmentação"]
    R[Regiao]
    M[Modal]
    C[Canal]
  end
  subgraph metricas["Métricas"]
    P50[P50]
    P90[P90]
  end
  segmentos --> metricas
```

---

## Ligação ao buffer (intuição)

Modelos clássicos de inventário (ex.: Silver, Pyke & Peterson) ligam **variabilidade** de LT e demanda a **estoque de segurança**. Aqui não derivamos fórmulas; registamos que **reduzir variabilidade** do LT (consolidação de rotas, *cut-off* claro) pode **liberar capital** tanto quanto «cortar estoque».

---

## Exercício

Para a mesma amostra fictícia de 20 tempos de entrega (invente valores), calcule **média**, **P50** e **P90** à mão ou em planilha e escreva **duas frases** para o CFO: uma com média, outra com P90 — qual muda a decisão de **capital**?

**Gabarito pedagógico:** P90 pior que média quando cauda é pesada; decisão de **promessa** ou **seguro** deve ancorar na cauda, não na média.

---

## Erros comuns

- Misturar **dias úteis** e **dias corridos** sem conversão.  
- Ignorar **pedidos cancelados** no meio do fluxo.  
- Segmentar demais até **n** pequeno demais.

---

## Referências

1. SILVER, E. A.; PYKE, D. F.; PETERSON, R. *Inventory Management and Production Planning and Scheduling*. Wiley.  
2. CHOPRA, S.; MEINDL, P. *Supply Chain Management*. Pearson.  
3. FEW, S. — histogramas e comparação de distribuições.  

---

## Fechamento

Lead time sem **cauda** visível é **marketing interno** disfarçado de análise.

**Pergunta:** qual segmento hoje **dilui** a cauda no agregado global?
