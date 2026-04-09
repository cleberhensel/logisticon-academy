# Apresentação — Documentação executiva Logistikon Academy

Visão de **negócio, produto e jornada** derivada do *discovery* (`discovery/`) e do *planejamento* (`plan/`), em linguagem para **direção, produto, comercial, marketing, operações e parceiros**. **Não** substitui PRD, SPEC nem *tasks* de engenharia.

**Idioma:** português. **Estado:** tópicos `01`–`13` **enriquecidos manualmente** (detalhe contextual, tabelas e ligações cruzadas).

---

## 1. Onde isto vive no repositório

```mermaid
flowchart TB
  subgraph raiz["Projeto logisticon-academy"]
    D[discovery/]
    P[plan/]
    A[apresentacao/]
  end
  D --> |base, pesquisa, analises-tecnica| A
  P --> |specs, features, user-stories| A
  A --> |narrativa executiva| ST[Stakeholders]
```

| Pasta | Conteúdo | Papel para esta documentação |
|-------|----------|------------------------------|
| `discovery/` | Base pedagógica, pesquisa de mercado, tópicos técnicos fatiados | **Fonte** de posicionamento, fluxos e requisitos |
| `plan/` | SPEC-00, épicos, registro DEV, user stories | **Fonte** de fases MVP, épicos E01–E08 e prioridades |
| `apresentacao/` | Tópicos 01–13 + índice | **Tradução** técnica → negócio / produto / jornada |

---

## 2. Entrada recomendada

| Ficheiro | Uso |
|----------|-----|
| **[00-indice.md](./00-indice.md)** | Índice linear com links para os 13 tópicos |
| **[documento-executivo-logistikon-academy.md](./documento-executivo-logistikon-academy.md)** | Apenas ponteiro legado → índice |

**Leitura em 15 minutos:** [01-resumo-executivo.md](./01-resumo-executivo.md) → [02-posicionamento-e-territorio.md](./02-posicionamento-e-territorio.md) → [07-jornadas-ponta-a-ponta.md](./07-jornadas-ponta-a-ponta.md).

**Leitura para produto / PM:** ordem **1 → 13** ou saltar para **8** (épicos), **9** (roadmap), **13** (links para `plan/`).

---

## 3. Mapeamento completo dos 13 tópicos

| # | Tópico | Ficheiro | Conteúdo principal | Diagramas no ficheiro |
|---|--------|----------|---------------------|------------------------|
| 1 | Resumo executivo | [01-resumo-executivo.md](./01-resumo-executivo.md) | Visão, proposta de valor, para quem / o que não é | `flowchart` promessa → plataforma |
| 2 | Posicionamento e território | [02-posicionamento-e-territorio.md](./02-posicionamento-e-territorio.md) | Declaração de posicionamento, concorrentes na cabeça do cliente, estratégia → produto | `flowchart` pilares; tabela de quadrantes |
| 3 | Estrutura de negócio | [03-estrutura-de-negocio-ponta-a-ponta.md](./03-estrutura-de-negocio-ponta-a-ponta.md) | Ciclo de valor, níveis F/P/S, famílias de trilhas, rotas SKU | `flowchart` mercado → plataforma |
| 4 | Audiências e papéis | [04-audiencias-personas-e-papeis.md](./04-audiencias-personas-e-papeis.md) | B2C/B2B/B2B2C, segmentos, jornadas-resumo, RBAC em linguagem de negócio | `flowchart` atores × superfícies |
| 5 | Matriz de valor | [05-matriz-de-valor.md](./05-matriz-de-valor.md) | Promessa ↔ evidência ↔ risco; donos; anti-promessas | — |
| 6 | Estratégia de receita | [06-estrategia-de-receita.md](./06-estrategia-de-receita.md) | Modelos de monetização, hipóteses, canais de ampliação | `flowchart` evolução B2C → B2B → mentorias |
| 7 | Jornadas | [07-jornadas-ponta-a-ponta.md](./07-jornadas-ponta-a-ponta.md) | B2C, B2B, conteúdo → catálogo, pagamento → acesso | `journey`, `sequenceDiagram`, `flowchart` |
| 8 | Capacidades (épicos) | [08-capacidades-de-produto-epicos.md](./08-capacidades-de-produto-epicos.md) | E01–E08 em valor de negócio, dependências | `flowchart` experiência × governança × B2B |
| 9 | Roadmap | [09-roadmap-e-alinhamento-estrategico.md](./09-roadmap-e-alinhamento-estrategico.md) | Fases 1–4, P0, critérios de fase, SPEC-00 | `flowchart` dependências; `gantt` ilustrativo |
| 10 | Métricas | [10-metricas-norte-e-operacionais.md](./10-metricas-norte-e-operacionais.md) | North Star hipótese, operacionais, cadência | — |
| 11 | Riscos e decisões | [11-riscos-e-decisoes-em-aberto.md](./11-riscos-e-decisoes-em-aberto.md) | Riscos, mitigações, workshops, execução | — |
| 12 | Mapa mental | [12-mapa-mental-mercado-ao-backlog.md](./12-mapa-mental-mercado-ao-backlog.md) | Síntese mercado → backlog, ligação épicos | `mindmap` |
| 13 | Referências | [13-referencias-internas-repositorio.md](./13-referencias-internas-repositorio.md) | Mapa de ficheiros em `discovery/` e `plan/` | — |

---

## 4. Fluxo de leitura da série (ordem lógica)

```mermaid
flowchart LR
  T01[01 Resumo] --> T02[02 Posicionamento]
  T02 --> T03[03 Estrutura negócio]
  T03 --> T04[04 Audiências]
  T04 --> T05[05 Matriz valor]
  T05 --> T06[06 Receita]
  T06 --> T07[07 Jornadas]
  T07 --> T08[08 Épicos]
  T08 --> T09[09 Roadmap]
  T09 --> T10[10 Métricas]
  T10 --> T11[11 Riscos]
  T11 --> T12[12 Mapa mental]
  T12 --> T13[13 Refs repo]
```

---

## 5. Estratégia → produto (visão consolidada)

```mermaid
flowchart LR
  subgraph S["Estratégia"]
    S1[Integração processo+sistema+dados]
    S2[Bilíngue]
    S3[Credencial]
    S4[B2C + B2B]
  end
  subgraph P["Produto"]
    P1[Trilhas e progressão]
    P2[i18n]
    P3[Certificado e verificação]
    P4[Checkout matrícula B2B]
  end
  S1 --> P1
  S2 --> P2
  S3 --> P3
  S4 --> P4
```

---

## 6. Épicos E01–E08 e fluxo de valor (consolidado)

```mermaid
flowchart TB
  E01[E01 Identidade]
  E02[E02 Catálogo e pedidos]
  E03[E03 Pagamentos]
  E04[E04 Área do aluno]
  E05[E05 Avaliação e certificados]
  E06[E06 Backoffice]
  E07[E07 B2B]
  E08[E08 Plataforma]
  E01 --> E02 --> E03 --> E04 --> E05
  E06 --> E02
  E07 --> E01
  E08 -.-> E01
  E08 -.-> E03
```

---

## 7. Fases do roadmap (alinhamento SPEC-00)

```mermaid
flowchart LR
  F1["Fase 1 — Core B2C + checkout + certificado"]
  F2["Fase 2 — Backoffice"]
  F3["Fase 3 — B2B"]
  F4["Fase 4 — SSO credencial avançada"]
  F1 --> F2 --> F3 --> F4
  F1 -.->|base org| F3
```

---

## 8. Stakeholders × superfícies digitais

```mermaid
flowchart TB
  subgraph ext["Mercado"]
    V((Visitante))
    AL((Aluno))
    BY((Comprador B2B))
  end
  subgraph int["Logistikon"]
    INS((Instrutor))
    FIN((Financeiro))
    ADM((Admin))
  end
  subgraph sup["Superfícies"]
    WEB[Site e área aluno]
    POR[Portal corporativo]
    BO[Backoffice]
  end
  V --> WEB
  AL --> WEB
  BY --> WEB
  BY --> POR
  INS --> BO
  FIN --> BO
  ADM --> BO
```

---

## 9. Mapa mental resumido (síntese da série)

```mermaid
mindmap
  root((Logistikon Academy))
    Mercado
      Nicho integrado
      Bilíngue
      Credencial
    Oferta
      Níveis F P S
      Trilhas e rotas SKU
    Cliente
      B2C
      B2B
    Produto
      Catálogo
      Pagamento
      Aprendizagem
      Certificação
    Operação
      NF
      Suporte
      LGPD
```

---

## 10. Fontes canónicas no repositório

| Tema | Caminho |
|------|---------|
| MVP e fases | `plan/specs/SPEC-00-visao-geral-mvp.md` |
| Catálogo pedagógico | `discovery/base.md` |
| Síntese mercado → software | `discovery/pesquisa/06-sintese-discovery-implicacoes-para-planejamento-de-software.md` |
| Posicionamento e valor | `discovery/pesquisa/05-amplificacao-da-proposta-posicionamento-e-matriz-de-valor.md` |
| Especificação técnica fatiada | `discovery/analises-tecnica/plataforma-logistikon-especificacao-tecnica-v1.md` |
| Fluxos e roadmap técnico | `discovery/analises-tecnica/topicos-v1/10-fluxos-e-passos.md`, `12-roadmap-implementacao.md` |
| Registo DEV e épicos | `plan/features/registro-de-features.md`, `plan/features/epic-*.md` |
| User stories | `plan/user-stories/README.md` |

Lista expandida: [13-referencias-internas-repositorio.md](./13-referencias-internas-repositorio.md).

---

## 11. Convenções e notas

- Cada tópico `NN-*.md` tem cabeçalho **Foco**, **Estado: enriquecido** e ligações **← / Índice / →** para leitura linear ou saltos.
- Diagramas **Mermaid** adicionais e detalhados por tema estão **dentro** dos ficheiros 01–12 (jornada, sequência de pagamento, *Gantt*, etc.).
- Renderização: GitHub, GitLab, VS Code (extensão Mermaid), Notion e ferramentas de slides compatíveis com Mermaid renderizam estes blocos; em caso de falha, usar os ficheiros-fonte individuais.

---

**Navegação rápida:** [Índice 00](./00-indice.md) · [Tópico 1](./01-resumo-executivo.md) · [Tópico 13](./13-referencias-internas-repositorio.md)
