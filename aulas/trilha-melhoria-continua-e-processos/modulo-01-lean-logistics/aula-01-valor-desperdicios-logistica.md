# Valor, cliente e os desperdícios na logística — o que o cliente paga *versus* o que a fábrica interna adora

**Lean** na logística começa com uma pergunta desconfortável: **desta atividade, o que o cliente está disposto a pagar (ou a esperar)?** O resto é **necessário** (compliance, segurança) ou **desperdício** — e desperdício pode estar no **CD**, no **transporte**, no **pedido** ou no **dado** que viaja errado.

Esta aula dá **vocabulário comum** para reuniões entre operações, vendas e finanças, sem transformar Lean em decoração de parede.

---

## Objetivos e resultado de aprendizagem

**Ao final desta aula**, você será capaz de:

- Definir **valor** em logística a partir da perspectiva do cliente e do contrato.  
- Aplicar os **sete desperdícios** (e o oitavo, **talento não utilizado**, *consenso de mercado* em muitas adaptações) a cenários de armazém e transporte.  
- Marcar um fluxo pedido→entrega com **etiquetas** de desperdício.  
- Distinguir **atividade ocupada** de **criação de valor**.

**Duração sugerida:** 60–75 minutos.

---

## Gancho — a TechLar «produtiva» e irritante

O CD da **TechLar** batia meta de **linhas/hora**; o cliente B2B via **atraso** e **erro de mix**. A equipe estava «ocupada» com reprocesso, busca de endereço e espera na doca — **movimento** sem **fluxo de valor**. O painel de produtividade **mentiu** até alguém medir **lead time interno** e **first time right**.

**Analogia do restaurante:** cozinha a correr com pratos a voltar — todos trabalham, o cliente espera.

---

## Mapa do conteúdo

- Valor *versus* necessário *versus* desperdício.  
- Desperdícios na linguagem **TIM WOODS** (+ talento).  
- Fluxo simplificado com etiquetas.  
- Trade-off: cortar desperdício *versus* investir em estoque ou espaço.

---

## Conceito núcleo — valor na logística

**Valor** (definição operacional pedagógica): o que **avança** o produto ou a informação em direção ao que o cliente pediu, no **tempo** e na **qualidade** acordados.

**Necessário mas não valor:** inspeção regulatória, documentação fiscal, algumas conferências — o cliente não «ama», mas o negócio **não dispensa**.

**Desperdício:** tudo que consome **tempo, espaço, capital ou talento** sem mudar o que o cliente valoriza (ou sem cumprir requisito inevitável).

Os **sete** clássicos (mnemónico **TIM WOODS** em inglês), aplicados à logística:

| Desperdício | Exemplo logístico |
|-------------|-------------------|
| Transporte excessivo | cruzamento desnecessário de paletes entre zonas |
| Inventário (demais) | capital parado, obsolescência, esconde problemas |
| Movimento | caminhada por layout ruim ou slotting ruim |
| Espera | fila na doca, aguardar informação, WMS travado |
| *Overproduction* | separar antes da necessidade do próximo elo |
| *Overprocessing* | conferência dupla sem valor agregado |
| Defeitos | picking errado, etiqueta errada, devolução |
| **Talento** (8.º) | ideias ignoradas, medo de reportar falha |

```mermaid
flowchart LR
  P[Pedido cliente]
  R[Receber]
  K[Armazenar]
  S[Separar]
  E[Expedir]
  C[Cliente]
  P --> R --> K --> S --> E --> C
```

**Legenda:** em cada seta, pergunte: **espera? retrabalho? movimento inútil?** — e marque no papel.

---

## Trade-offs

- Reduzir **inventário** expõe **gargalos** — dói antes de melhorar (ver [custos e capital](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-01-estrutura-custos-logisticos.md)).  
- Cortar **tempo** sem padrão pode subir **erro** — Lean exige **disciplina** e métrica.

---

## Aplicação — exercício

Desenhe em **lista** (10–15 passos) o fluxo «pedido liberado → embarque» da sua operação. Para **cinco** passos, classifique: **V** (valor), **N** (necessário), **D** (desperdício) e justifique **uma linha** cada.

**Gabarito pedagógico:** deve aparecer pelo menos um **D** em espera, movimento ou retrabalho; se tudo for «V», o aluno provavelmente confundiu **ocupação** com valor.

---

## Erros comuns e armadilhas

- Lean como **workshop** sem owner nem indicador 90 dias depois.  
- Chamar **estoque de segurança** de «desperdício» sem analisar **variabilidade** (isso é tema do módulo Six Sigma).  
- Focar só no **CD** e ignorar **pedido errado** na origem (desperdício upstream).  
- «Cliente interno» usado para **justificar** qualquer processo — cliente final ou contrato B2B devem aparecer.

---

## KPIs e decisão

- **Lead time interno** (pedido→expedido) segmentado.  
- **First time right** na separação.  
- **% tempo** em espera (*queue time*) *versus* tempo de trabalho.

---

## Fechamento — três takeaways

1. Valor é **decisão de perspectiva** — contrato e cliente mandam.  
2. TIM WOODS é **checklist** de conversa honesta, não acusação.  
3. Produtividade sem **fluxo** é teatro com gráfico bonito.

**Pergunta de reflexão:** qual desperdício hoje é tratado como «**sempre foi assim**»?

---

## Referências

1. WOMACK, J. P.; JONES, D. T. *Lean Thinking*. Free Press.  
2. LIKER, J. K. *The Toyota Way*. McGraw-Hill.  
3. CSCMP — glossário: https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx  

**Tipo de fonte (VSM):** Rother, M.; Shook, J. *Learning to See* (valor de fluxo mapeado) — usar como referência de método.
