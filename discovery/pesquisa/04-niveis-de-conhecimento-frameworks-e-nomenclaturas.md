# Análise 4 — Níveis de conhecimento, frameworks pedagógicos e nomenclaturas

**Objetivo:** dar **rigor** aos níveis Foundation / Professional / Specialist da Logistikon, alinhando-os a **taxonomias reconhecidas** (pedagogia, competências profissionais, certificações de mercado) para que **certificados, pré-requisitos e progressão** sejam defensáveis perante alunos, RH e parceiros.

---

## 1. Por que formalizar níveis antes do software?

O **LMS** ou produto próprio precisará modelar:

- **pré-requisitos** (bloqueio de módulos);
- **equivalências** (dispensa por certificação externa);
- **badges intermediários**;
- **descrições de outcome** exportáveis (PDF, LinkedIn, Europass).

Sem taxonomia explícita, tudo vira “nível avançado” subjetivo e **dilui confiança**.

---

## 2. Taxonomia de Bloom (revisada) — verbos e profundidade cognitiva

A **Taxonomia de Bloom** (versão revisada 2001) organiza objetivos em dimensões cognitivas, da base para o topo:

| Dimensão (revisada) | O que o aluno faz | Exemplos em logística / SAP |
|---------------------|-------------------|-----------------------------|
| Lembrar | Reconhece termos | INCOTERMS, siglas MRP, elementos de pedido |
| Entender | Explica com próprias palavras | Diferenciar lead time de cycle time |
| Aplicar | Usa em situação nova | Calcular cobertura de estoque com dados fictícios |
| Analisar | Decompõe, compara causas | OTIF baixo: discriminar raiz transporte vs. picking |
| Avaliar | Julga com critérios | Escolher desenho de rede com trade-off custo/serviço |
| Criar | Produz artefato novo | Dashboard em BI + narrativa para stakeholders |

**Mapeamento sugerido:**

| Nível Logistikon | Faixa Bloom dominante | Expectativa |
|------------------|----------------------|-------------|
| **Foundation** | Lembrar → Aplicar | Vocabulário, processos básicos, exercícios guiados |
| **Professional** | Aplicar → Analisar | Ferramentas reais (ERP conceito, BI, WMS/TMS overview), cases |
| **Specialist** | Analisar → Criar | Projetos integrados, desenho, estratégia, trade-offs complexos |

**Regra de ouro:** cada módulo deve declarar **2–4 learning outcomes** com **verbo observável** (evitar “entender bem”, “saber sobre”).

---

## 3. Modelo Europeu de Microcredenciais (alto nível)

A abordagem europeia define microcredencial como registro de **resultados de aprendizagem** obtidos com **pequeno volume** de aprendizagem; elementos padrão conectam-se ao **European Learning Model (ELM)** e a **European Digital Credentials (EDC)** — ver [micro-credentials e EDC | Europass](https://europass.europa.eu/en/news/micro-credentials-and-european-digital-credentials-learning).

**Implicação prática para Logistikon:**

- Cada **badge** deve listar: **titulo**, **issuer**, **data**, **carga horária**, **resultados** (em bullet), ** método de avaliação**.
- Agrupar microcredenciais em **diploma digital** da “rota” (uma das 6 certificações nomeadas).

Isso antecipa **interoperabilidade** sem obrigar implementação técnica no MVP.

---

## 4. Níveis profissionais CILT (referência de carreira)

O **CILT** usa **níveis de qualificação** (3, 5, 6) e **status chartered** (ex.: **CMILT**) com critérios de **experiência** e **senioridade** — ver [CILT UK — Chartered Member](https://ciltuk.org.uk/individuals/membership-grades/chartered-member/).

**Uso para Logistikon:**  
- **Foundation** ≈ literacia profissional + qualificação inicial (não necessariamente equivalência CILT).  
- **Professional** ≈ aplicador competente em contexto corporativo.  
- **Specialist** ≈ perfil **senior** ou **estrategista** — mas **atenção:** chartered status exige **anos de prática**; o curso **não deve** implicar CMILT sem parceria explícita.

---

## 5. Certificações ASCM / APICS como “calibrador” de conteúdo

ASCM oferece **CPIM** (produção e inventário), **CSCP** (supply chain ponta a ponta), **CLTD** (logística, transporte, distribuição), etc. — com **matrizes de conteúdo** públicas e [comparison charts](https://www.apics.org/docs/default-source/certification/apics-certification-comparison-chart.pdf?sfvrsn=7404e2df_2).

| Certificação | Foco | Inspiração para trilhas Logistikon |
|--------------|------|-------------------------------------|
| **CLTD** | Logística física e redes | Transporte, malha, armazém, distribuição |
| **CPIM** | Planejamento, MRP, inventário | S&OP, MRP, performance de estoque |
| **CSCP** | Design e gestão E2E | Integração estratégica, sustainability, risco (módulos futuros) |

**Posicionamento honesto:** trilhas podem ser **“aligned with ASCM body of knowledge em tópicos selecionados”** apenas se o conteúdo for auditado; caso contrário, usar linguagem **“complementa preparação”** sem violar marcas registradas.

---

## 6. Competências digitais e dados (camada transversal)

Além de Bloom, útil separar **literacias**:

| Domínio | Foundation | Professional | Specialist |
|---------|------------|--------------|------------|
| Dados | Lê gráfico KPI | Monta painel, trata qualidade | Define governança, arquitetura de métricas |
| ERP | Navega conceito | Mapeia processo vs. módulo | Desenha blueprint, integrações |
| Automação | Reconhece RPA | Automata relatório | Orquestra fluxo multi-sistema |
| IA | Saber o que é LLM | Prompt para análise assistida | Avalia uso de agente + risco |

---

## 7. Definição operacional dos 3 níveis Logistikon (proposta)

### Nível 1 — Foundation

- **Pré-requisito:** nenhum (recomenda-se escolaridade técnica superior para algumas trilhas).  
- **Carga típica:** 20–60 h por **conjunto** de módulos.  
- **Avaliação:** quizzes + casos curtos com gabarito.  
- **Certificado:** “Foundation in …” por trilha temática.

### Nível 2 — Professional

- **Pré-requisito:** Foundation equivalente **ou** experiência declarada (honor code) **ou** aprovação em teste de nivelamento.  
- **Carga típica:** 40–120 h por rota.  
- **Avaliação:** projetos entregues (BI, planilha, mapa de processo SAP genérico), correção por rubrica.  
- **Certificado:** nome da **rota** (ex.: ERP Logistics Specialist — track parcial até integração final).

### Nível 3 — Specialist

- **Pré-requisito:** Professional na mesma linha **ou** perfil sênior aprovado.  
- **Carga típica:** 30–80 h de **integração** + mentorias opcionais.  
- **Avaliação:** **capstone** (estudo de caso complexo), apresentação gravada ou relatório executivo.  
- **Certificado:** “Specialist” com listagem de **outcomes** alinhados ao ELM / Open Badges (fase 2).

---

## 8. Nomenclatura em português e inglês

Sugerir **nomes de produto bilíngues**:

| PT | EN |
|----|-----|
| Fundamentos | Foundations |
| Profissional | Professional |
| Especialista | Specialist |

Tradução de **nomes de trilha:** manter **SAP**, **S&OP**, **WMS**, **TMS** invariantes; traduzir apenas **descritores** (“Gestão de Estoques” / “Inventory Management”).

---

## 9. Checklist de discovery (pedagogia → software)

- [ ] Banco de **learning outcomes** por módulo (Bloom verb + evidência).
- [ ] Matriz **módulo → nível → badge → certificado final**.
- [ ] Política de **crédito por experiência** (portfolio review — sim/não).
- [ ] **Honor code** e detecção plágio em capstone (nível Specialist).
- [ ] Glossário **PT/EN** embutido no produto (feature de suporte).

---

## 10. Referências

- Anderson & Krathwohl (2001) — taxonomia revisada (literatura base; buscar edição universitária).
- [ASCM — Which certification (PDF)](https://www.apics.org/docs/default-source/certification/which-apics-certification-is-right-for-you.pdf)
- [CILT Qualifications](https://ciltuk.org.uk/CILT-Qualifications)
- [Europass — EDC e micro-credentials](https://europass.europa.eu/me/european-digital-credentials)

---

*Ver também: `03-tendencias-mercado-logistica-edtech.md`, `06-sintese-discovery-implicacoes-para-planejamento-de-software.md`.*
