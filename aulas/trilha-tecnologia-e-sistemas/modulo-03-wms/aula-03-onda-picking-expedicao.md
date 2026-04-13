# Onda, picking e expedição — ritmo, prioridade e a doca que não estica

**Onda** (*wave*) agrupa linhas de pedidos para **otimizar** picking (caminhada, equipamento, *cut-off* de transportadora, prioridade de cliente). **Picking** confirma retirada; **expedição** fecha carga, captura **peso/volume real**, gera etiquetas e faz **handoff** ao TMS. O erro típico é onda **enorme** sem capacidade de **embalagem** e doca — fila vira **atraso**, erro de **mix** e estresse humano.

---

## Objetivos e resultado de aprendizagem

**Ao final desta aula**, você será capaz de:

- Explicar **onda** como decisão de **capacidade**, não só de algoritmo.
- Comparar estratégias de picking (pedido, zona, *batch*, *cluster*).
- Definir **três** regras de prioridade e discutir conflito entre elas com transparência.
- Relacionar **cut-off** de carrier com planejamento de onda.

**Duração sugerida:** 60–90 minutos.

---

## Gancho — Black Friday na TechLar

O WMS gerou **uma** onda com **dez mil** linhas; o ERP mostrou «pronto»; a doca tinha **três** portas e o time de embalagem **metade** do efetivo necessário. O **OTD** interno colapsou; o SAC recebeu tickets com **status mentiroso**. **Onda** é decisão de **capacidade humana e física** — o algoritmo precisa respeitar **gargalo** real.

**Analogia do restaurante:** o sistema aceitou **200 pratos** na cozinha, mas só há **dois** chefs — a fila não some com otimismo.

---

## Estratégias de picking — âncoras mentais

| Estratégia | Quando tende a servir | Risco principal |
|------------|------------------------|-----------------|
| Por pedido | B2B, alto valor, compliance de lote | Caminhada repetida |
| Por zona | SKU dispersos geograficamente no armazém | Mistura no consolidado |
| *Batch* por SKU | Alto volume homogêneo | Erro de *mix* se controle fraco |
| *Cluster* | Muitos pedidos pequenos (e-commerce) | Complexidade de consolidação e *QA* |

```mermaid
flowchart LR
  W[Onda gerada]
  Cap[Checagem de capacidade doca / embalagem]
  A[Atribuição a equipe]
  P[Picking]
  C[Consolidação]
  E[Embarque / peso real]
  W --> Cap --> A --> P --> C --> E
```

**Legenda:** o nó **Cap** é onde muitos templates de WMS «pulam» — e aí nasce a fila.

---

## Cross-dock e *flow-through*

**Cross-dock** exige **sinalização física** clara, **janela** de tempo e frequentemente **cadastro** de lote/fornecedor alinhado — senão vira «corredor de bagunça» com alta taxa de erro.

**Hipótese pedagógica:** cross-dock sem disciplina de **evento** é pior que estoque parado — porque o erro viaja em velocidade.

---

## Aplicação — exercício

Defina **três** regras de **prioridade** de onda (ex.: pedido VIP, *cut-off* de transportadora, data prometida) e **um** conflito entre elas — como decidir com transparência?

**Gabarito pedagógico:** matriz de prioridade **publicada**; escalação quando SLA de carrier entra em choque com promessa VIP; registro de **decisão** (quem aprovou exceção).

---

## Erros comuns e armadilhas

- **Cross-dock** sem marcação física e sem critério de aceite.
- Etiqueta de transporte gerada **antes** de peso real — divergência na auditoria de frete.
- Onda sem **limite** de linhas por equipe — KPI de produtividade destrói qualidade.
- **Consolidação** sem *scan* de validação de pedido — *mix* trocado.
- Ignorar **temperatura** ou **HACCP** em cadeia fria (quando aplicável).

---

## KPIs e decisão

- **OTD interno** (doca): promessa de *cut-off* *vs.* saída real.
- **Linhas por hora** **e** **taxa de erro** de picking (nunca um sem o outro).
- **Fila média** na zona de embalagem (WIP).

---

## Fechamento — três takeaways

1. Onda bonita na tela com fila na doca é **ilusão operacional**.
2. Picking é **coreografia** humana; algoritmo sem capacidade é **violência de planejamento**.
3. *Cut-off* de carrier precisa existir como **restrição dura**, não como «tomara que dê».

**Pergunta de reflexão:** qual *cut-off* de transportadora hoje **não** está modelado no WMS?

---

## Referências

1. BOWERSOX, D. J.; et al. *Supply Chain Logistics Management*. McGraw-Hill.  
2. Trilha Dados — [OTIF e definição](../../trilha-dados-analytics-logistica/modulo-04-indicadores-logisticos-kpis/aula-01-otif-fill-rate-contrato-interno.md).  
3. Trilha Fundamentos — [nível de serviço e KPIs](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-03-nivel-servico-kpis-logisticos.md).
