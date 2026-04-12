# Adequação de posicionamento — menos ênfase em SAP na fase 1

**Contexto:** pedido de *stakeholder* para reduzir o destaque a **produtos SAP** neste primeiro momento, dada **pouca matéria-prima de conteúdo SAP** disponível; exceção condicional: **só reforçar SAP se a IA entregar um infoproduto pronto** (a tratar como hipótese, não como compromisso).

**Objetivo deste documento:** mapear **onde** o repositório hoje “puxa” para SAP, classificar o tipo de alteração e propor **ondas de adequação** sem **reabrir** o desenho técnico do LMS em `plan/` (épicos, specs, tasks).

---

## 1. Conclusão executiva

| Pergunta | Resposta |
|----------|----------|
| Os **planos atuais de software** (`plan/`) precisam mudar por causa do SAP? | **Não.** Não há menção a SAP em ficheiros `*.md` sob `plan/`. O backlog é **agnóstico ao conteúdo** das trilhas (catálogo, checkout, matrícula, player, avaliação, certificado, B2B). |
| O que **precisa** de adequação? | Sobretudo **narrativa de marca**, **priorização de oferta** em `discovery/base.md` e **documentação executiva** em `apresentacao/`. Opcionalmente **ajustes de tom** em `discovery/pesquisa/` (contexto de mercado pode manter SAP como *benchmark* competitivo sem dizer que *somos* escola SAP). |
| Temos material essencial para adaptar **sem** mudar planos de implementação? | **Sim para produto digital:** basta publicar trilhas **não-SAP** primeiro (dados, processos, Lean, Power BI, WMS/TMS genéricos, etc.). **Sim para narrativa:** reequilibrar texto para **ERP/sistemas/dados** sem SAP como âncora. **Conteúdo SAP profundo** continua **adiável** até haver gravações, *labs* e revisão jurídica de marca. |
| E a **IA** a entregar infoproduto “pronto”? | Tratar como **via opcional**: exige **revisão humana**, **compliance de marca** (SAP é marca de terceiros) e **critérios de qualidade** — não substitui decisão de priorização nem isenta risco reputacional. |

---

## 2. Interpretação do pedido do stakeholder

1. **Reduzir ênfase em produtos SAP** = comunicação e **ordem de entrada no mercado**, não necessariamente remoção permanente do nicho SAP (que continua diferenciador de médio prazo no *discovery* original).
2. **“A não ser que a IA entregue um infoproduto pronto”** = *trigger* futuro: só voltar a destacar SAP no *marketing* quando existir **pacote fechado** (roteiro, aulas, avaliações) **validado** — idealmente não confundir “texto gerado” com “curso pronto para venda” sem QA e jurídico.
3. **Pouco material SAP** = restrição real de **produção de conteúdo**, não de **plataforma**. O LMS não impõe SAP.

---

## 3. O que o repositório amarra ao SAP (inventário)

### 3.1 `plan/` — implementação

- **Menções a SAP:** **nenhuma** nos `*.md` analisados.
- **Implicação:** **nenhuma alteração obrigatória** em SPEC, épicos E01–E08, user stories ou tasks por esta decisão de *positioning*.

### 3.2 `discovery/base.md` — oferta e catálogo conceitual

- **Alto impacto:** diferencial explícito (“especialmente SAP e ecossistema ERP”), trilha “SAP para Logística (MM/SD/WM)”, rotas nomeadas **ERP Logistics Specialist** e **SAP Supply Chain Specialist**, sugestão de MVP “SAP + KPIs + Power BI”.
- **Tipo de alteração:** **conteúdo editorial / priorização** — reordenar exemplos de MVP e clarificar que SAP é **pilar futuro** ou **trilha entre várias**, não condição do produto.

### 3.3 `discovery/pesquisa/` — mercado e concorrência

- Múltiplas referências a SAP como **categoria competitiva**, *openSAP*, escolas SAP, eixos de posicionamento.
- **Tipo de alteração:** na maioria **opcional** — são análises de mercado; SAP continua a existir como *player*. Ajustar só se a marca interna quiser **evitar** que leitores confundam “análise de concorrente” com “promessa Logistikon = SAP”.

### 3.4 `apresentacao/` — narrativa executiva

- Ficheiros **01, 02, 03, 04, 05, 11** com foco ou exemplos SAP (stack corporativa “em especial SAP”, comparação com “treinamentos SAP isolados”, tabelas com SAP logística, rotas SKU com nomes SAP, matriz de valor “Profundidade SAP + logística”, riscos de marca SAP).
- **Tipo de alteração:** **copy e exemplos** — alinhar à nova tese: **processos + dados + sistemas empresariais (ERP/WMS/TMS)** com SAP como **uma** das trilhas, não o centro da promessa da fase 1.

### 3.5 Outros em `discovery/analises-tecnica/`

- Revisão pontual se algum tópico repetir “hero SAP”; a especificação da **plataforma** (fluxos, RBAC, Stripe) **não** depende de SAP.

---

## 4. Matriz: tipo de mudança × ficheiro

| Área | Ficheiros / pastas | Tipo de mudança | Prioridade |
|------|-------------------|-----------------|------------|
| Software MVP | `plan/**` | Nenhuma por SAP | — |
| Catálogo e visão pedagógica | `discovery/base.md` | Rebalancear texto, exemplos de MVP e ordem de rotas | **Alta** |
| Stakeholders / apresentações | `apresentacao/01,02,03,04,05,11` (+ índice se necessário) | Substituir ênfase “especialmente SAP” por narrativa **dados + processo + sistemas** | **Alta** |
| Pesquisa de mercado | `discovery/pesquisa/*.md` | Opcional: nota de rodapé ou secção “implicação para comunicação fase 1” | Baixa |
| Novo artefacto | Este ficheiro | Registar decisão e *hero route* fase 1 | Feito |

---

## 5. Plano de adequação em ondas (sugerido)

### Onda A — Comunicação e oferta (sem tocar em `plan/`)

1. Definir **rota herói fase 1** sem dependência SAP (ex.: **Logistics Data Analyst**, **Logistics Process Excellence**, ou trilha “KPIs + Power BI + processos” — alinhado ao material existente).
2. Atualizar **`discovery/base.md`**: primeiro parágrafo e “próximos passos” para não sugerir MVP = SAP-first.
3. Atualizar **`apresentacao/`** (tópicos listados na matriz): uma passagem de *copy* para **ERP/sistemas/dados genéricos**; manter SAP onde for **comparativo** (“diferente de treinamentos SAP isolados”) ou marcar como **roadmap de conteúdo**.

### Onda B — Consistência em `discovery/pesquisa/` (opcional)

- Incluir um parágrafo curto em `06-sintese-discovery` ou `05-amplificacao`: **“fase 1 de comunicação: ênfase em dados e processos; SAP como expansão quando o conteúdo estiver maduro.”**

### Onda C — Infoproduto assistido por IA (se avançar)

1. **Não** é alteração de *plan* de software; é **pipeline editorial**: roteiro → revisão → gravação → QA → jurídico (marca).
2. Critério de “pronto”: checklist próprio (qualidade, exercícios, avaliações), não só PDF gerado.

---

## 6. Onde alterar, linha a linha (referência rápida)

*(Lista orientativa — aplicar ao editar ficheiros.)*

| Local | O quê |
|-------|--------|
| `discovery/base.md` | Parágrafos de visão, diferencial, tabela Professional, trilha “SAP para Logística”, rotas 1–2 nomeadas, bullet “Priorizar MVP…” |
| `apresentacao/01-resumo-executivo.md` | Frase “em especial SAP e ecossistema ERP”; bullets de concorrência MM/SD/WM |
| `apresentacao/02-posicionamento-e-territorio.md` | Citação longa; eixos e tabelas com “SAP+dados”; *battle cards* |
| `apresentacao/03-estrutura-de-negocio-ponta-a-ponta.md` | Linhas Professional e família “Tecnologia”; lista das 6 rotas (ordem ou nota “fase posterior”) |
| `apresentacao/04-audiencias-personas-e-papeis.md` | Mid-career “SAP/KPI/S&OP” |
| `apresentacao/05-matriz-de-valor.md` | Linha “Profundidade SAP + logística” → reformular como “Profundidade sistemas + logística” ou similar |
| `apresentacao/11-riscos-e-decisoes-em-aberto.md` | Manter risco de **marca SAP** (continua válido); pode clarificar que **menos ênfase** reduz exposição inicial |

**Não alterar por esta decisão:** `plan/specs/*`, `plan/user-stories/*`, `plan/features/*` (salvo futura US específica de conteúdo CMS, irrelevante aqui).

---

## 7. Material essencial para adaptar **sem** mudar planos de engenharia

| Necessidade | Fonte possível | Nota |
|-------------|----------------|------|
| Trilhas **sem** SAP | Já previstas em `base.md`: dados, Excel, Power BI, Lean, WMS, TMS, fundamentos | Escolher 1–2 como MVP de conteúdo |
| Narrativa coerente | Ajuste de texto nos ficheiros da secção 6 | Não exige código |
| Certificação e LMS | Coberto por E02–E05 no `plan/` | Igual para qualquer tema de trilha |
| SAP mais tarde | Roadmap de conteúdo + eventual *pack* IA **revisado** | Fora do escopo do MVP de plataforma |

**Resposta direta:** **sim**, é possível adaptar o **cenário do stakeholder** mantendo os **planos atuais de produto/software**; a mudança é de **prioridade de conteúdo e de mensagem**, não de arquitetura nem de épicos.

---

## 8. Riscos de seguir só a “via IA”

- **Marca SAP:** uso indevido em *marketing* ou no curso sem alinhamento jurídico (já referido em `06-sintese` e `apresentacao/11`).
- **Qualidade:** infoproduto “pronto” só com IA tende a falhar em exercícios credíveis e em **outcomes** mensuráveis.
- **Expectativa:** se o site ainda prometer **profundidade SAP** enquanto o conteúdo não existe, aumenta **mismatch** com o *stakeholder* — por isso a Onda A é importante.

---

## 9. Próximo passo recomendado

1. **Workshop de 30 min:** fechar **uma** rota herói fase 1 **sem** SAP e lista mínima de módulos já produzíveis.  
2. **Editar** `discovery/base.md` + `apresentacao` (Onda A).  
3. **Registar** no *backlog* de **conteúdo** (fora do `plan/` de engenharia, ou em nota no Notion) a data-alvo de **primeira trilha SAP** quando o material existir.

---

*Documento de alinhamento stakeholder ↔ repositório. Não substitui decisão formal de produto ou jurídico.*
