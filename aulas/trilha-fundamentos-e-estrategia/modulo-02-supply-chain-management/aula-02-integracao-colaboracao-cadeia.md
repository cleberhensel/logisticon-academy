# Integração e colaboração na cadeia — quando a planilha da sexta-feira mente na segunda

**Trilha:** Fundamentos e estratégia · **Módulo:** Supply Chain Management  
**Público / nível:** Intermediário a avançado em dinâmica organizacional.  
**Duração sugerida:** duas horas, se você reproduzir o laboratório numérico em planilha.  
**Resultado de aprendizagem:** você será capaz de **definir** integração como alinhamento de **dados, decisões e incentivos**; **explicar** o *bullwhip* com as quatro causas clássicas de Lee, Padmanabhan e Whang (1997); **estruturar** dados mínimos para colaboração (incluindo visão de **CPFR**); e **simular** como **lotes** alteram a variabilidade vista pelo fornecedor.

---

Integração não é “todo mundo se gostar”. É **governança de número**: uma versão publicada de forecast, uma política de revisão, um conjunto de exceções tratadas com dono. Sem isso, cada função otimiza **a sua** planilha — e a cadeia, que não tem planilha própria, absorve o **choque**.

---

## O bullwhip como fenômeno econômico, não como curiosidade académica

Lee, Padmanabhan e Whang, em *Information Distortion in a Supply Chain: The Bullwhip Effect* (*Management Science*, 1997, DOI `10.1287/mnsc.43.4.546`), mostraram como a variabilidade das **ordens** pode amplificar a variabilidade da **demanda** a jusante quando se sobe a cadeia. As causas clássicas: **processamento de sinal** (forecast e política de revisão), **jogo de racionamento** (pedidos inflados na escassez), **loteamento** (acumular para frete ou processamento), **variação de preço** (promoções que distorcem o padrão de compra).

**Analogia do telefone sem fio em escada:** cada andar “melhora” a história; no último andar, o monstro tem dez metros — exceto que aqui o monstro é **pedido ao fornecedor**.

```mermaid
flowchart LR
  V[Varejo<br/>demanda moderada] --> D[Distribuidor<br/>ordens mais variáveis]
  D --> F[Fábrica<br/>picos amplificados]
  F --> M[Matéria-prima<br/>oscilação extrema]
```

---

## CPFR: colaboração como contrato de dados, não como abraço

**Collaborative Planning, Forecasting and Replenishment** pressupõe compartilhamento de **POS** (ponto de venda), **estoque em trânsito**, **pedidos abertos**, **calendário promocional** e **lead times** — e pressupõe **sanções** suaves ou fortes quando dados mentem. A literatura de SCM (Chopra & Meindl; Christopher) descreve o arcabouço; a vida real exige **IT** e **jurídico** alinhados.

---

## Laboratório numérico — o lote como amplificador

Use a série de demanda ao varejo: 100, 105, 95, 110 (semanal). Compare **Regra A** (pedido = média móvel de ordem 3) com **Regra B** (pedidos em lotes de 300). Calcule a amplitude dos pedidos ao distribuidor. **Leia o resultado como narrativa:** “economizei processamento” pode ser “inflamei o fornecedor”.

---

## Caso — duas verdades do forecast (MetalRio de novo)

Vendas crê em **+18%** YoY; operações crê em **+8%** de capacidade instalada. Sem **Pré-S&OP**, isso vira **dois** pedidos de matéria-prima diferentes na cabeça de dois compradores. A integração aqui é **ritual + número único**, não “mais uma ferramenta”.

---

## Exercícios

1. Mapeie cada causa de Lee et al. a um episódio real (anonimizado) da sua experiência.  
2. Liste **cinco** dados mínimos para CPFR entre varejista e fornecedor.

**Gabarito:** (2) POS limpo, estoque em trânsito, pedidos abertos, promoções, LT, fill rate histórico, política de devolução — escolha cinco e justifique.

---

## Referências

1. LEE, H. L.; PADMANABHAN, V.; WHANG, S. (1997). https://doi.org/10.1287/mnsc.43.4.546  
2. CHOPRA, S.; MEINDL, P. *Supply Chain Management*. Pearson. https://www.pearson.com/en-us/subject-catalog/p/supply-chain-management-strategy-planning-and-operation/P200000012829  
3. CHRISTOPHER, M. *Logistics and Supply Chain Management*. Pearson, 2022. https://www.pearson.com/en-us/subject-catalog/p/logistics-and-supply-chain-management/P200000007134  
4. CSCMP — Glossário: https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx  
5. ASCM — CPIM: https://www.ascm.org/learning-development/certifications-credentials/cpim/  

---

## Síntese

Integração é **sistema**; bullwhip é **sinal**; CPFR é **contrato de dados**.

**Pergunta:** qual número hoje tem **três versões** vivas na sua empresa?
