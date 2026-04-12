# Planejamento de Demanda (S&OP) — Aula 1: Previsão de demanda e métodos básicos

**Trilha:** Fundamentos e estratégia  
**Módulo:** Planejamento de Demanda (S&OP)  
**Duração sugerida:** 75 minutos  
**Pré-requisitos:** Módulos 1 e 2; conforto mínimo com médias e percentagens.

---

## 1. Objetivos de aprendizagem

1. Diferenciar **demanda independente** (SKU vendável) e **dependente** (componente ligado à produção).
2. Descrever componentes de uma série: nível, tendência, sazonalidade, ruído (visão qualitativa).
3. Aplicar métodos simples: **média móvel**, **naive**, suavização exponencial (intuição, sem derivar fórmulas).
4. Calcular **erro** com série pequena: MAD, MAPE (com cuidado quando demanda zero).
5. Escolher **granularidade** (família versus SKU) e **horizonte** adequados ao uso (operacional versus financeiro).

---

## 2. Abertura — roteiro do instrutor

**Gancho:** “Se o forecast errar 10%, onde esse erro aparece primeiro — no caixa, no armazém ou na linha de produção?”

**Mensagem central:** Forecast é **input** de decisão; o output saudável é política de estoque, produção e compra — não adivinhação.

---

## 3. Conteúdo principal

### 3.1 Para que serve o forecast

Alimentar **S&OP**, **MRP**, orçamento, contratos de capacidade. Erro esperado; papel de **consenso** humano.

### 3.2 Métodos e contexto

Estável: médias; com sazonalidade: seasonal naive ou decomposição simples; alto churn: métodos robustos ou agregação — manter pragmatismo.

### 3.3 Medir erro e revisar

Bias versus variância do erro; revisão semanal versus mensal; **forecast value add** (mencionar como conceito).

### 3.4 Qualidade de dados

Pedido versus demanda real (stockout distorce); promoções e **outliers**.

---

## 4. Oficina numérica (20 min)

Série fornecida pelo instrutor (8–12 períodos): calcular previsão naive e média móvel de 3; MAD e MAPE; discutir qual método perde menos para esse padrão.

---

## 5. O que vira dado no sistema

Histórico de vendas limpo, calendário de **promoções**, versões de forecast, atributos de SKU (vida útil, substitutos).

---

## 6. Check de saída

- Explicar quando MAPE engana.
- Dizer qual granularidade usar para reunião executiva versus compra de MP.

---

## 7. Próximo passo na Academy

Aula seguinte: **MRP**; trilhas **Excel** e **Python** para automação de forecast quando o aluno precisar de ferramenta.
