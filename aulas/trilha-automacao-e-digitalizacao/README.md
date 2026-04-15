# Trilha — Automação e digitalização

Material curricular da **Logistikon Academy** para a secção «Automação e digitalização» em [`aulas/trilhas.md`](../trilhas.md): **RPA** em processos logísticos, **Python** para rotinas de dados, **IA/ML** aplicados com métricas e **transformação digital** da cadeia — complemento prático à [Logística estratégica — Logística 4.0](../trilha-logistica-estrategica/modulo-04-logistica-4-0/README.md) (maturidade e governança). **Não** substitui certificações de fornecedores RPA nem cursos de ciência de dados completos.

---

## Para quem é

Analistas de supply chain, coordenadores de CD/transporte/planejamento, *citizen developers* e líderes de transformação digital que precisam **automatizar rotinas**, **integrar dados** e **introduzir modelos** com critério de negócio.

**Pré-requisitos sugeridos:**

1. [Dados e analytics](../trilha-dados-analytics-logistica/README.md) — Excel/Power BI e vocabulário de KPI.  
2. [Fundamentos — custos e KPIs](../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/README.md) ou [Indicadores logísticos](../trilha-dados-analytics-logistica/modulo-04-indicadores-logisticos-kpis/README.md).  
3. Recomendado: [Tecnologia e sistemas](../trilha-tecnologia-e-sistemas/README.md) — origem dos dados (ERP/WMS/TMS).

---

## Ordem dos módulos (igual ao catálogo)

1. **Automação de processos (RPA)** — candidatos, exceções, governança e casos logísticos.  
2. **Python para logística** — ambiente, *pandas*, agendamento e leitura de APIs.  
3. **IA aplicada à *supply chain*** — previsão, classificação, otimização introdutória e *MLOps lite*.  
4. **Transformação digital da cadeia** — valor, *roadmap*, mudança e KPIs de adoção.

**Anti-redundância:**

| Tema | Onde já existe | O que esta trilha cobre |
|------|----------------|-------------------------|
| Excel / Power BI | [Dados e analytics](../trilha-dados-analytics-logistica/README.md) | Python para ETL leve, ficheiros, agendamento; RPA na **UI** quando não há API. |
| ERP / WMS / TMS | [Tecnologia e sistemas](../trilha-tecnologia-e-sistemas/README.md) | Automação **em volta** do sistema (export, robô, script) — não fluxo MM/WM como núcleo. |
| Maturidade, IoT, governança de IA (estratégia) | [Logística estratégica — Logística 4.0](../trilha-logistica-estrategica/modulo-04-logistica-4-0/README.md) | Aqui: **implementação** (robô, notebook, *features*, métricas de modelo). |
| Lean / *charter* | [Melhoria contínua](../trilha-melhoria-continua-e-processos/README.md) | DX usa *stakeholders* como ponte; foco em **adoção** e *roadmap*. |

**Pontes úteis:** [Logística estratégica](../trilha-logistica-estrategica/README.md) (quadro de decisão digital); [Melhoria contínua](../trilha-melhoria-continua-e-processos/README.md) (projetos).

---

## Módulos e pastas

| Ordem | Pasta | Foco |
|-------|--------|------|
| 1 | [`modulo-01-automacao-processos-logisticos-rpa/`](modulo-01-automacao-processos-logisticos-rpa/README.md) | RPA: candidatos, exceções, casos (doc, ASN, conciliação) |
| 2 | [`modulo-02-python-para-logistica/`](modulo-02-python-para-logistica/README.md) | venv, *pandas*, *cron*, REST |
| 3 | [`modulo-03-ai-aplicada-supply-chain/`](modulo-03-ai-aplicada-supply-chain/README.md) | Previsão, classificação, *MLOps lite* |
| 4 | [`modulo-04-transformacao-digital-supply-chain/`](modulo-04-transformacao-digital-supply-chain/README.md) | Valor, *roadmap*, mudança, adoção |

Cada módulo contém **três aulas** em Markdown (**12** no total).

**Checklist:** [CHECKLIST-AULAS.md](CHECKLIST-AULAS.md)

---

## Projeto integrador (opcional)

**Cenário TechLar:** (1) um processo com matriz go/no-go RPA e exceções; (2) descrição + pseudocódigo de relatório semanal em Python; (3) mini-problema de previsão ou classificação com métrica e *baseline*; (4) *roadmap* de 90 dias com *quick win* e risco de adoção.

---

## Avaliação sugerida

- **Formativa:** 2–3 perguntas por aula (candidato RPA, segredo em código, métrica de modelo).  
- **Somativa:** quiz 12–16 itens + rubrica do projeto integrador.

---

## Licença de uso

Uso interno da Logistikon Academy.
