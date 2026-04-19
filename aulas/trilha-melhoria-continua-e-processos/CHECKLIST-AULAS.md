# Checklist — Trilha Melhoria contínua e processos (12 aulas)

Critérios transversais (marcar ao revisar cada `aula-*.md`):

- [x] Objetivos e resultado de aprendizagem explícitos; duração sugerida.
- [x] Gancho (TechLar ou caso neutro plausível).
- [x] Pelo menos **uma analogia** além do gancho.
- [x] **≥1 diagrama Mermaid** com legenda.
- [x] Trade-offs explícitos (serviço/custo/capital ou mudança *vs.* estabilidade).
- [x] Erros comuns (lista objetiva).
- [x] Exercício + **gabarito pedagógico**.
- [x] Referências (livro/clássico + ASCM/CSCMP ou tipo de fonte).
- [x] Ponte a outra trilha quando couber (Fundamentos, Dados, Operações, Tecnologia).

> **Status pós-revisão (abr/2026):** todas as 12 aulas reescritas com template estendido (objetivos, mapa, gancho, conceito-núcleo, aprofundamentos, trade-offs, mini-laboratório com cálculo passo a passo, erros comuns, comportamento e cultura, KPIs, ferramentas, glossário, exercícios com gabarito, reflexão, referências, pontes). Conformidade nos 9 critérios = 12/12.

## Módulo 1 — Lean Logistics

| # | Arquivo | Título | Status pós-revisão |
|---|---------|--------|---------------------|
| 1.1 | [modulo-01-lean-logistics/aula-01-valor-desperdicios-logistica.md](modulo-01-lean-logistics/aula-01-valor-desperdicios-logistica.md) | Valor, cliente e os desperdícios na logística | ✅ Revista — 3M (Muda/Mura/Muri), TIM WOODS-E completo, Lean House, mini-lab fluxo eficiência TechLar |
| 1.2 | [modulo-01-lean-logistics/aula-02-fluxo-pull-kanban-estoque.md](modulo-01-lean-logistics/aula-02-fluxo-pull-kanban-estoque.md) | Fluxo, *pull* e estoque como decisão de desenho | ✅ Revista — MTS/MTO/ATO/ETO, CODP, Little's Law, Heijunka, dimensionamento Kanban com fórmula |
| 1.3 | [modulo-01-lean-logistics/aula-03-vsm-5s-armazem-doca.md](modulo-01-lean-logistics/aula-03-vsm-5s-armazem-doca.md) | VSM e 5S no armazém e na doca | ✅ Revista — VSM atual + futuro TechLar, símbolos, escada de lead time, kaizen bursts, OEE |

## Módulo 2 — Six Sigma aplicado à Logística

| # | Arquivo | Título | Status pós-revisão |
|---|---------|--------|---------------------|
| 2.1 | [modulo-02-six-sigma-logistica/aula-01-y-igual-fx-otif-lead-time.md](modulo-02-six-sigma-logistica/aula-01-y-igual-fx-otif-lead-time.md) | Y = f(X) na logística — OTIF, lead time e acurácia | ✅ Revista — VOC/CTQ, causa comum × especial, DPMO + nível sigma, DMAIC com gates |
| 2.2 | [modulo-02-six-sigma-logistica/aula-02-medir-analisar-pareto-amostragem.md](modulo-02-six-sigma-logistica/aula-02-medir-analisar-pareto-amostragem.md) | Medir e analisar — Pareto, gráficos e amostragem no chão | ✅ Revista — plano de coleta, Pareto, P50/P90/P99, Xbar-R com LSC/LIC, Cp/Cpk, Ishikawa 6M, 5 porquês |
| 2.3 | [modulo-02-six-sigma-logistica/aula-03-melhorar-controlar-poka-yoke-sop.md](modulo-02-six-sigma-logistica/aula-03-melhorar-controlar-poka-yoke-sop.md) | Melhorar e controlar — *poka-yoke*, SOP e plano de controlo | ✅ Revista — piloto + decisão, FMEA com RPN, catálogo 15 poka-yokes, plano controlo, DOE-lite |

## Módulo 3 — Continuous Improvement

| # | Arquivo | Título | Status pós-revisão |
|---|---------|--------|---------------------|
| 3.1 | [modulo-03-continuous-improvement/aula-01-pdca-gemba-sponsor.md](modulo-03-continuous-improvement/aula-01-pdca-gemba-sponsor.md) | PDCA, *gemba* e o patrocinador que não pode faltar | ✅ Revista — PDCA × PDSA × DMAIC, script gemba 7 perguntas, ADKAR, Kotter 8 passos, Hoshin/Obeya |
| 3.2 | [modulo-03-continuous-improvement/aula-02-kaizen-a3-backlog-priorizacao.md](modulo-03-continuous-improvement/aula-02-kaizen-a3-backlog-priorizacao.md) | Kaizen, A3 e priorização do *backlog* de melhoria | ✅ Revista — micro-kaizen × blitz × projeto, A3 7 seções com TechLar, ICE/RICE/WSJF calculado, agenda evento 5 dias |
| 3.3 | [modulo-03-continuous-improvement/aula-03-ci-cadeia-sop-dados-ti.md](modulo-03-continuous-improvement/aula-03-ci-cadeia-sop-dados-ti.md) | CI na cadeia — S&OP, dados e mudança de sistema | ✅ Revista — S&OP/IBP, DAMA-DMBoK, OKR, cut-over (Big Bang/Piloted/Parallel), gates, LPM |

## Módulo 4 — Gestão de Projetos Logísticos

| # | Arquivo | Título | Status pós-revisão |
|---|---------|--------|---------------------|
| 4.1 | [modulo-04-gestao-de-projetos-logisticos/aula-01-charter-raci-wbs.md](modulo-04-gestao-de-projetos-logisticos/aula-01-charter-raci-wbs.md) | *Charter*, stakeholders, RACI e WBS no CD | ✅ Revista — charter 15 elementos, Mendelow 4 quadrantes, RACI 5×5 com 7 regras, WBS 3 níveis + dicionário, cut-over 4 estratégias |
| 4.2 | [modulo-04-gestao-de-projetos-logisticos/aula-02-caminho-critico-buffer-riscos.md](modulo-04-gestao-de-projetos-logisticos/aula-02-caminho-critico-buffer-riscos.md) | Tempo, caminho crítico e *buffer* de projeto | ✅ Revista — CPM forward/backward com cálculo passo a passo, CCPM/Goldratt, risk register P×I, EVM completo (SPI/CPI/EAC), Monte Carlo lite |
| 4.3 | [modulo-04-gestao-de-projetos-logisticos/aula-03-pmo-beneficios-encerramento.md](modulo-04-gestao-de-projetos-logisticos/aula-03-pmo-beneficios-encerramento.md) | PMO enxuto, realização de benefícios e encerramento | ✅ Revista — PMO 1.0/2.0/3.0/EPMO/VMO, benefits realization plan T+30/60/90/12m, encerramento checklist 10 itens, lições 3 técnicas |
