# Inventário e contexto UX/UI — Logistikon Academy

Documento de **Fase 1 (inventário)** e síntese inicial para **MVP**, **alternativas** e **entrega sustentável**, conforme metodologia de discovery UX. Cada afirmação relevante indica **fonte** no repositório ou «não encontrado no material».

---

## 1. Natureza do projeto (no repositório)

| Item | Descrição | Fonte |
|------|------------|--------|
| **Tipo de repo** | Planejamento e documentação (discovery, plano, apresentação executiva, aulas em Markdown). O **código da aplicação** pode existir noutro repositório ou pasta. | `README.md` (raiz) |
| **Produto** | **Logistikon Academy** — escola de **tecnologia aplicada à logística** (LMS + e-commerce de trilhas, pagamentos, certificação). | `README.md`, `discovery/base.md` |
| **Idioma da documentação** | Principalmente **português**; oferta pedagógica prevê conteúdo **PT/EN**. | `README.md`, `discovery/base.md` |

---

## 2. Negócio e produto

| Tema | O que está definido | Fonte / lacuna |
|------|---------------------|----------------|
| **Problema / oportunidade** | Capacitar profissionais em logística com profundidade em processos, dados, sistemas (SAP/ERP/WMS/TMS) e digitalização. | `discovery/base.md` §1 |
| **Proposta de valor** | Integração **processo + sistema + dados**; **bilíngue**; **certificado online**; alcance via LinkedIn/network. | `discovery/base.md` §2, `apresentacao/README.md` §5 |
| **O que não é só “curso genérico”** | Ênfase em stack corporativa (SAP/ecossistema ERP) + dados + melhoria contínua. | `discovery/base.md` §1 |
| **Operação comercial** | CNPJ, NF, obrigações fiscais **mencionados** como premissa. | `discovery/base.md` §2 |
| **Níveis pedagógicos** | **Foundation**, **Professional**, **Specialist** — progressão operacional → estratégica. | `discovery/base.md` §3 |
| **Trilhas temáticas** | Catálogo em 7 famílias (fundamentos, dados/analytics, tecnologia/sistemas, operações, melhoria contínua, logística estratégica, automação/digitalização). Detalhe alinhado em `aulas/trilhas.md`. | `discovery/base.md` §4, `aulas/trilhas.md` |
| **Rotas certificáveis nomeadas** | 6 rotas (ex.: ERP Logistics Specialist, SAP Supply Chain Specialist, …) — **produto deve descrever** pré-requisitos, duração, módulos, idioma, regra de certificado. | `discovery/base.md` §5 — *matriz curricular explícita ainda é “próximo passo”* |
| **Métricas de sucesso (north star)** | Hipóteses e métricas operacionais estão na série de apresentação (tópico 10). | `apresentacao/10-metricas-norte-e-operacionais.md` (não reproduzido aqui) |
| **Restrições legais** | LGPD mínima (export/exclusão de dados), base em backlog (E08). | `plan/features/registro-de-features.md` (DEV-049), `plan/architecture/stack-e-padroes.md` |

---

## 3. Público, jornadas e UX

### 3.1 Audiências

| Audiência | Expectativa resumida | Fonte |
|-----------|------------------------|--------|
| **B2C** | Trilha clara, time-to-value, certificado credível. Segmentos: early career, mid-career, career switcher (dores diferentes). | `apresentacao/04-audiencias-personas-e-papeis.md` |
| **B2B** | Assentos, convites, visão agregada (RH), NF/contrato; **comprador ≠ aluno**. | Mesmo ficheiro |
| **Operação interna** | Instrutor/editor, financeiro, admin — backoffice. | `apresentacao/README.md` diagrama stakeholders × superfícies |

### 3.2 Superfícies digitais (implicações de UI)

| Superfície | Utilizadores | Fonte |
|------------|--------------|--------|
| **Site / catálogo / checkout** | Visitante, aluno, comprador B2B (evolução) | `apresentacao/07-jornadas-ponta-a-ponta.md`, `README.md` (épicos) |
| **Área do aluno** | Aluno (dashboard, player, progresso) | E04, SPEC-00 |
| **Backoffice** | Conteúdo, usuários/papéis, financeiro, suporte, KPIs | E06 |
| **“Portal corporativo” (B2B)** | Buyer — fase posterior ao core B2C | Roadmap fase 3 |

### 3.3 Momentos de verdade (experiência)

| Momento | Risco se mal executado | Fonte |
|---------|-------------------------|--------|
| Pós-clique / landing vs promessa | Abandono | `apresentacao/07-jornadas-ponta-a-ponta.md` |
| Checkout | Fricção ou desconfiança | Idem |
| Pós-pagamento | Atraso na matrícula → chargeback/suporte | Idem |
| Meio da trilha | Abandono silencioso | Idem |
| Certificado | Erro de nome/regra → desgaste de marca | Idem |

### 3.4 Acessibilidade, idiomas, dispositivos

| Tema | Estado no material | Fonte / lacuna |
|------|-------------------|----------------|
| **WCAG** | Stack alvo cita **Carbon Design System** (componentes e acessibilidade). Meta numérica WCAG (AA/AAA) **não encontrada explícita** nos trechos lidos. | `plan/architecture/stack-e-padroes.md` |
| **i18n** | Conteúdo PT/EN na oferta; produto prevê i18n na estratégia consolidada. | `discovery/base.md`, `apresentacao/README.md` |
| **Dispositivos** | «Mobile-first» ou breakpoints **não detalhados** no inventário actual — validar com SPEC de UI ou decisão de produto. | Lacuna |

---

## 4. UI, stack e implementação

| Tema | Decisão / direção | Fonte |
|------|-------------------|--------|
| **Frontend** | **Angular** + **Carbon Design System**; feature modules/facades; componentes apresentacionais vs containers; HTTP como adapters da API. | `plan/architecture/stack-e-padroes.md` |
| **Backend** | Express + TypeScript, Clean Architecture, Prisma, portas/adapters (Stripe, Mailchimp, etc.). | Idem |
| **Dados** | Neon (PostgreSQL), ambientes hml/prd. | Idem |
| **Deploy** | VPS Hostinger, nginx, health/readiness. | Idem |
| **Pagamentos (MVP)** | Stripe Checkout como **única** superfície de pagamento. | `plan/architecture/stack-e-padroes.md` |
| **E-mail** | Mailchimp via `EmailPort` (adapter). | Idem |
| **Design System no repo** | Este repositório **não contém** a app Angular; convenções estão no doc de arquitetura, não em Storybook/código aqui. | Observação de inventário |

---

## 5. Épicos e backlog (âmbito de telas)

Resumo alinhado ao produto digital (não ao conteúdo Markdown das aulas):

| Épico | Âmbito | Fonte |
|-------|--------|--------|
| **E01** | Identidade, sessão, RBAC, multi-tenant base | `plan/features/README.md` |
| **E02** | Catálogo público, produto/preço, pedido | Idem |
| **E03** | Stripe checkout, webhook, pedidos | Idem |
| **E04** | Área do aluno: dashboard, player, progresso | Idem |
| **E05** | Quiz, projeto (P2), PDF certificado, validação pública | Idem |
| **E06** | Backoffice (CMS, usuários, financeiro, certificados, suporte, KPIs) | Idem |
| **E07** | B2B: organizações, assentos, convites, relatórios | Idem |
| **E08** | E-mail transacional, health, LGPD mínima | Idem |

Registo flat: `plan/features/registro-de-features.md` (DEV-001…049).

---

## 6. Prioridade MVP (síntese)

**Resultados que o utilizador precisa alcançar no MVP** (ordenados, derivados de SPEC-00 e fluxo B2C):

1. **Descobrir e avaliar** uma trilha (catálogo + detalhe + elegibilidade de compra).  
2. **Registar-se, autenticar-se** e completar **checkout** com liberação de matrícula após pagamento.  
3. **Estudar** com player e **progresso** persistido.  
4. **Ser avaliado** (quiz por módulo com regras mínimas) e obter **certificado** com **validação pública**.  
5. **Receber e-mails** transacionais críticos do fluxo.

**Manual / offline aceitável no MVP** (para não bloquear): parte do suporte, excepções pedagógicas avançadas, certificado manual/revogação (P2 no registo), projeto com upload (P2).

**Fases posteriores:** Backoffice completo (fase 2); B2B (fase 3); SSO e certificado avançado (fase 4). Fonte: `plan/specs/SPEC-00-visao-geral-mvp.md`, `README.md` (diagrama de fases).

---

## 7. Propostas — alternativas de abordagem UX/UI

Problema: **como estruturar IA e componentes** sem código neste repo.

| Opção | Ideia | Prós | Contras | Adequação ao MVP |
|-------|--------|------|---------|-------------------|
| **A — Carbon + Angular (plano)** | Seguir rigidamente Carbon DS no Angular, poucas customizações | Acessibilidade, consistência enterprise, alinha com `stack-e-padroes.md` | Curva Carbon + Angular; menos “startup flashy” | **Alta** — já é a direcção oficial |
| **B — Carbon tokens + excepções mínimas** | Camada de tokens (cor/tipo/espaço) por cima do Carbon para marca | Marca distinguível sem quebrar padrões | Exige disciplina e documentação de tokens | **Alta** quando houver identidade visual definida |
| **C — shadcn/Tailwind** | Avaliar apenas se o repo de código mudar de stack | Rapidez em protótipos React | **Desalinhado** do doc de arquitetura actual | **Baixa** para este contexto documentado |

**Recomendação:** Opção **A** (com evolução para **B** quando existir brief de marca), porque o plano já fixa **Angular + Carbon** e RBAC com backend como fonte de verdade — trocar DS sem decisão formal desvia esforço e duplica padrões de acessibilidade.

---

## 8. Plano de entrega e UI sustentável

| Área | Diretriz | Fonte |
|------|-----------|--------|
| **MVP** | Validar hipótese B2C: compra → estudo → certificado; medir momentos de verdade da secção 3.3 | `SPEC-00`, `apresentacao/07` |
| **Design System** | Mapear telas aos componentes Carbon (catálogo, formulários auth, checkout embed Stripe, player, estados vazio/erro, certificado); listar excepções num ADR ou doc de UI no repo **de implementação** | `plan/architecture/stack-e-padroes.md` |
| **Arquitetura de UI** | Feature por domínio (E01–E04 no núcleo); guards RBAC; facades — alinha ao doc de stack | Idem |
| **Conteúdo pedagógico** | Permanece em `aulas/`; **não** é a mesma coisa que CMS runtime — o backlog prevê CMS no E06 | `plan/features/epic-06-backoffice.md` (referência) |

---

## 9. Requisitos confirmados vs hipóteses vs dúvidas

| Tipo | Itens |
|------|--------|
| **Confirmados (documento)** | Produto tipo LMS + Stripe Checkout; épicos E01–E08; fases 1–4; Angular + Carbon; Neon + Express; momentos de verdade B2C/B2B; 6 rotas certificáveis nomeadas (definição de produto por fazer). |
| **Hipóteses (negócio)** | North star e conversões detalhadas — ver tópico 10 da apresentação. |
| **Dúvidas abertas** | Breakpoints e prioridade mobile; nível WCAG explícito; identidade visual e tom bilíngue no certificado; qual subconjunto de trilhas no primeiro catálogo live. |
| **Riscos** | Landing desalinhada à campanha; atraso pós-pagamento; abandono no meio da trilha — mitigações descritas em `apresentacao/07` e `11`. |

---

## 10. Próximos passos sugeridos (para UX e produto)

1. **Validar com stakeholder** a matriz trilha × nível × idioma e o pacote mínimo do catálogo MVP (`discovery/base.md`, secção 6). *(Em avaliação.)*  
2. **Produzir mapa de telas** (happy path B2C) ligando a componentes Carbon e a user stories E01–E05 (P0). **Feito:** [happy-paths-mvp-e-criterios-acessibilidade.md](./happy-paths-mvp-e-criterios-acessibilidade.md) (Parte I).  
3. **Definir critérios de acessibilidade** (ex.: WCAG 2.2 AA para fluxos críticos) e registar no repo de implementação. **Feito:** [happy-paths-mvp-e-criterios-acessibilidade.md](./happy-paths-mvp-e-criterios-acessibilidade.md) (Parte II).  
4. **Sincronizar** este inventário quando `SPEC-00` ou `stack-e-padroes.md` forem alterados.

---

## Referências cruzadas (leitura rápida)

| Documento | Uso |
|-----------|-----|
| `README.md` | Mapa do repositório e perfis |
| `plan/specs/SPEC-00-visao-geral-mvp.md` | Fases e prioridades P0–P2 |
| `discovery/base.md` | Currículo, trilhas, rotas nomeadas |
| `plan/architecture/stack-e-padroes.md` | Stack e padrões UI/backend |
| `apresentacao/04-audiencias-personas-e-papeis.md` | Personas e papéis |
| `apresentacao/07-jornadas-ponta-a-ponta.md` | Jornadas e riscos de UX |
| `plan/features/registro-de-features.md` | Lista DEV-001…049 |

---

*Documento gerado como inventário de projecto; alterações estruturais devem refletir as fontes canónicas em `discovery/` e `plan/`.*
