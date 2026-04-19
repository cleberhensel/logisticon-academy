# Checklist — Trilha Operações logísticas (12 aulas)

Critérios transversais (marcar ao revisar cada `aula-*.md`):

- [ ] **Objetivos** e resultado de aprendizagem explícitos no início.
- [ ] **Gancho** (mini-caso **TechLar** ou cenário genérico plausível).
- [ ] **≥1 analogia** além do gancho, ligada a decisão de negócio.
- [ ] **≥1 diagrama Mermaid** com legenda curta (fluxo, sequência ou estados).
- [ ] **Conceito núcleo** com definições operacionais (não só jargão).
- [ ] **Trade-offs** (serviço × custo × capital ou equivalente).
- [ ] **Erros comuns e armadilhas** (lista objetiva).
- [ ] **Exercício ou discussão guiada** + **gabarito pedagógico**.
- [ ] **KPIs ou métricas** ligadas à decisão (mesmo que remissão à trilha Dados).
- [ ] **Referências** (livro/clássico + associação ou tipo de fonte normativa).
- [ ] **Ponte anti-redundância**: link explícito quando tocar em Fundamentos, Dados ou Tecnologia.

## Módulo 1 — Gestão de estoques

| # | Arquivo | Título |
|---|----------|--------|
| 1.1 | [modulo-01-gestao-de-estoques/aula-01-politicas-abc-servico-custo-capital.md](modulo-01-gestao-de-estoques/aula-01-politicas-abc-servico-custo-capital.md) | Políticas, ABC/XYZ e o triângulo serviço–custo–capital |
| 1.2 | [modulo-01-gestao-de-estoques/aula-02-fifo-fefo-lote-quarentena.md](modulo-01-gestao-de-estoques/aula-02-fifo-fefo-lote-quarentena.md) | FIFO, FEFO, lote e quarentena — física *versus* contabilidade |
| 1.3 | [modulo-01-gestao-de-estoques/aula-03-cobertura-inventario-acuracia.md](modulo-01-gestao-de-estoques/aula-03-cobertura-inventario-acuracia.md) | Cobertura, inventário cíclico e acurácia de registro |

## Módulo 2 — Armazenagem e layout logístico

| # | Arquivo | Título |
|---|----------|--------|
| 2.1 | [modulo-02-armazenagem-e-layout-logistico/aula-01-layout-zonas-fluxo-docas.md](modulo-02-armazenagem-e-layout-logistico/aula-01-layout-zonas-fluxo-docas.md) | Layout, zonas e docas — fluxo antes de boniteza |
| 2.2 | [modulo-02-armazenagem-e-layout-logistico/aula-02-slotting-golden-zone-dados.md](modulo-02-armazenagem-e-layout-logistico/aula-02-slotting-golden-zone-dados.md) | Slotting, *golden zone* e o loop dados → posição |
| 2.3 | [modulo-02-armazenagem-e-layout-logistico/aula-03-picking-ondas-fila-fisica.md](modulo-02-armazenagem-e-layout-logistico/aula-03-picking-ondas-fila-fisica.md) | Picking, ondas e a fila que não cabe na planilha |

## Módulo 3 — Transporte e distribuição

| # | Arquivo | Título |
|---|----------|--------|
| 3.1 | [modulo-03-transporte-e-distribuicao/aula-01-malha-hubs-estoque-posicionado.md](modulo-03-transporte-e-distribuicao/aula-01-malha-hubs-estoque-posicionado.md) | Malha logística — hubs, prazo e estoque posicionado |
| 3.2 | [modulo-03-transporte-e-distribuicao/aula-02-modais-milk-run-janelas.md](modulo-03-transporte-e-distribuicao/aula-02-modais-milk-run-janelas.md) | Modais, consolidação, *milk run* e janelas |
| 3.3 | [modulo-03-transporte-e-distribuicao/aula-03-roteirizacao-tsp-vrp-kpis.md](modulo-03-transporte-e-distribuicao/aula-03-roteirizacao-tsp-vrp-kpis.md) | Roteirização — TSP/VRP para gestores e KPIs |

## Módulo 4 — Logística internacional

| # | Arquivo | Título |
|---|----------|--------|
| 4.1 | [modulo-04-logistica-internacional/aula-01-processo-import-export-atores.md](modulo-04-logistica-internacional/aula-01-processo-import-export-atores.md) | Importar e exportar — atores, tempo e handoffs |
| 4.2 | [modulo-04-logistica-internacional/aula-02-incoterms-2020-logistica.md](modulo-04-logistica-internacional/aula-02-incoterms-2020-logistica.md) | Incoterms® 2020 — risco, custo e «quem faz o quê» |
| 4.3 | [modulo-04-logistica-internacional/aula-03-documentos-landed-cost-compliance.md](modulo-04-logistica-internacional/aula-03-documentos-landed-cost-compliance.md) | Documentos, *landed cost* e *compliance* — visão integrada |

---

## Status pós-revisão (especialista sénior em Operações Logísticas)

Critérios adicionais aplicados na revisão profunda (além dos transversais acima):

- **N**úmeros BR (R$/posição/mês, R$/km, lead times China–Santos, ICMS/II/IPI, demurrage USD).
- **R**egulação BR (ANTT, RNTRC, CT-e/MDF-e, RFB/Pucomex/Duimp, NRs, NBRs, GS1-128, RDC Anvisa, LC 214/25 Reforma Tributária).
- **F**órmulas com exemplos numéricos (EOQ, SS com `z`, `√N` pooling, COI Frazelle, Clarke–Wright, Lei de Little, landed cost gross-up).
- **K**PI tabela completa (KPI | Pergunta | Dono | Fonte | Cadência | Playbook).
- **D**ado no sistema (campos/eventos ERP/WMS/TMS).
- **G**lossário rápido por aula.
- **P**ontes para outras trilhas (Fundamentos, Dados, Tecnologia).

| # | Aula | N | R | F | K | D | G | P | Nota pós-edição |
|---|------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:---------------:|
| 1.1 | Políticas, ABC/XYZ e triângulo serviço–custo–capital | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,5** |
| 1.2 | FIFO/FEFO, lote e quarentena | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | **9,3** |
| 1.3 | Cobertura, inventário cíclico e acurácia | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,3** |
| 2.1 | Layout, zonas e docas | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,4** |
| 2.2 | Slotting, *golden zone* e dados | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,3** |
| 2.3 | Picking, ondas e fila física | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,4** |
| 3.1 | Malha, hubs e estoque posicionado | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,4** |
| 3.2 | Modais, *milk run* e janelas | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,5** |
| 3.3 | Roteirização — TSP/VRP e KPIs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,4** |
| 4.1 | Importar e exportar — atores e processo | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | **9,5** |
| 4.2 | Incoterms® 2020 | ✓ | ✓ | – | ✓ | ✓ | ✓ | ✓ | **9,4** |
| 4.3 | Documentos, *landed cost* e *compliance* | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **9,5** |

> **Notas:** «–» indica que a dimensão **F** (fórmulas com exercício) não se aplica diretamente (caso 1.2 — regras categóricas; 4.1/4.2 — processuais), mas exemplos quantitativos foram adicionados quando aderentes (lead times, custos, %).
