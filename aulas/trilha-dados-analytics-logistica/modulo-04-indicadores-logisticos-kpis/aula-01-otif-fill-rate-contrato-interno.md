# OTIF e fill rate com contrato interno — a mesma sigla, três definições honestas

**OTIF** (*on time in full*) e **fill rate** são KPIs «óbvios» até a primeira briga entre comercial e logística. Esta aula **fecha** o ciclo da trilha: o que desenhaste em **Excel/Power BI** deve refletir **definições** que caberiam num anexo de contrato interno — sem ser assessoria jurídica, mas com **rigor operacional**. A trilha [Fundamentos e estratégia](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-03-nivel-servico-kpis-logisticos.md) já introduziu o vocabulário; aqui aprofundamos **implementação** e **denominadores**.

---

## Gancho — «cedo demais» quebrou a janela B2B

Cliente B2B da TechLar recusou recebimento porque o caminhão chegou **doze horas cedo** fora do *slot*. O OTIF interno contava «a tempo». O cliente contava «**dentro da janela**». **Definição** não é detalhe; é **fronteira** entre verde e vermelho.

---

## OTIF — componentes mínimos

- **On time:** comparação entre **data/hora efetiva de entrega** (ou *POD*) e **janela acordada** `[Início, Fim]` — incluir regra para **atraso** e **antecipação**.  
- **In full:** **quantidade** e **mix** conforme pedido; política para **substituição** e **parcial** autorizada.

**Ao nível de pedido:** o pedido só é OTIF=1 se **todas** as linhas elegíveis cumprem *in full* **e** o pedido é *on time* segundo a janela do **pedido** (ou da **entrega consolidada** — escolha e documente).

---

## Fill rate — linha *versus* pedido

| Nível | Numerador típico | Denominador típico |
|-------|------------------|---------------------|
| Linha | `QtdEntregue` (ajustada) | `QtdPedida` |
| Pedido | 1 se todas as linhas OK | 1 por pedido |

Misturar níveis no mesmo gráfico sem rótulo é **erro de desenho**, não de Excel.

---

## Laboratório tabular (recapitulação)

| Pedido | Linhas pedidas | Linhas completas | Dentro da janela? |
|--------|----------------|------------------|-------------------|
| 101 | 3 | 3 | Sim |
| 102 | 5 | 4 | Sim |
| 103 | 2 | 2 | Não |

**OTIF** (pedido): 1/3 ≈ **33,3%**. **Fill rate** (linha): (3+4+2)/(3+5+2) = **90%**. **Lição:** narrativas diferentes — escolha com o negócio.

---

## Dicionário de uma página (template)

1. **Nome do KPI**  
2. **Nível** (pedido/linha/unidade)  
3. **Fonte** de cada timestamp  
4. **Tratamento** de cancelamento, parcial, substituição  
5. **Responsável** pela alteração da definição  

---

## Exercício

Redija o parágrafo **«On time»** do dicionário da TechLar para **marketplace** *vs.* **site próprio** se as janelas forem diferentes.

**Gabarito pedagógico:** duas sub-definições ou KPIs separados; nunca média sem peso explícito.

---

## Erros comuns

- Bonificar **embarque** em vez de **entrega comprovada**.  
- OTIF global que **esconde** canal crítico.  
- Ignorar **linhas** excluídas por política (amostras, cortesia).

---

## Referências

1. CHOPRA, S.; MEINDL, P. *Supply Chain Management* — desempenho e serviço. Pearson.  
2. CSCMP — Glossário: https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx  
3. Artigo introdutório OTIF (não substitui cláusula contratual): https://www.mrpeasy.com/blog/on-time-in-full-otif/  

---

## Fechamento

OTIF bonito sem **dicionário** é **decoração**; com dicionário, vira **governança**.

**Pergunta:** que parte da definição hoje está só no **e-mail** de alguém?
