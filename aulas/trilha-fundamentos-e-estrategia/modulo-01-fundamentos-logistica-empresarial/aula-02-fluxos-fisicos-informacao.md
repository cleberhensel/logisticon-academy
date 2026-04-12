# Fundamentos da Logística Empresarial — Aula 2: Fluxos físicos e de informação

**Trilha:** Fundamentos e estratégia  
**Módulo:** Fundamentos da Logística Empresarial  
**Duração sugerida:** 55 minutos  
**Pré-requisitos:** Aula 1 deste módulo (conceitos e trade-offs).

---

## 1. Objetivos de aprendizagem

1. Desenhar **fluxo físico** simples (fornecedor → armazém → cliente) com retorno opcional (devoluções, embalagens retornáveis).
2. Mapear **fluxo de informação** paralelo: pedido, confirmação, picking, expedição, fatura, evento de entrega.
3. Explicar por que **atraso de informação** vira atraso físico ou custo de segurança.
4. Identificar interfaces com **vendas**, **compras** e **produção** onde a logística é “cliente” ou “fornecedor” interno.
5. Relacionar visibilidade (o que se sabe, quando se sabe) a decisões de estoque e transporte.

---

## 2. Abertura — roteiro do instrutor

**Gancho:** “O caminhão saiu no horário, mas o cliente diz que atrasou. Onde está o problema — estrada, doca ou **dado**?”

**Mensagem central:** Fluxo físico sem fluxo de informação alinhado gera **atividade sem valor** (reprocessos, espera, inventário de ‘defesa’).

---

## 3. Conteúdo principal

### 3.1 Fluxo físico

Materiais, semi-acabados, acabados; pontos de consolidação; cross-dock; última milha. Incluir exemplo de **fluxo reverso** (devolução B2C ou recall).

### 3.2 Fluxo de informação

Eventos mínimos: criação de necessidade, alocação de estoque, separação confirmada, embarque, entrega comprovada, faturação. Discutir **latência** entre evento real e registo.

### 3.3 Lead time e variabilidade

Lead time de transporte versus lead time de **informação**; efeito de incerteza na necessidade de buffer (ligação leve ao módulo 3 sem antecipar fórmulas pesadas).

### 3.4 Colaboração digital (visão conceptual)

Portais de fornecedor, EDI/API, rastreio em tempo quase real, agendamento de docas — linguagem de negócio, sem tutorial de integração.

---

## 4. Oficina (15 min)

Entregar diagrama incompleto (físico sem informação). Os alunos completam setas de dados e comentam **um** gargalo informacional.

---

## 5. O que vira dado no sistema

Status de linha de pedido, eventos de **WMS** (confirm pick / ship), **ASN** (advance ship notice) quando existir, integração com faturação. Reforçar que **definição de “entregue”** é master data + processo.

---

## 6. Check de saída

- Nomear dois eventos de informação que devem preceder o embarque físico.
- Explicar um caso em que o stock está “certo no sistema” e errado na prática.

---

## 7. Próximo passo na Academy

Módulo seguinte (**Supply Chain Management**) e, em paralelo, trilha **Tecnologia e sistemas** (WMS/TMS) para aprofundar os mesmos eventos em stack real.
