# Análise 2 — Plataformas e players com enfoque similar

**Objetivo:** identificar **onde** o ensino acontece (distribuição, formato, monetização) e quais **padrões de produto** a Logistikon deve copiar, evitar ou integrar antes do planejamento de software.

---

## 1. Tipologia de plataformas

### 1.1 Marketplaces e MOOCs (B2C e B2B via licença)

| Plataforma | Papel | Relevância |
|------------|--------|------------|
| **Coursera / edX / FutureLearn** | Hospedam instituições; certificados com marca dupla | Benchmark de UX de **módulos**, deadlines, avaliações por pares |
| **LinkedIn Learning** | Assinatura; integração ao perfil LinkedIn | Forte alinhamento com GTM em **LinkedIn**; exemplos de “learning paths” |
| **Udemy / Domestika** (genérico) | Curso pago individual | Referência de preço percebido e promoções sazonais |

**CSCMP e LinkedIn Learning:** a CSCMP costuma promover **certificados** e **learning paths** em logística (transporte, procurement, warehousing, etc.) — referência direta de como **empacotar** microcursos em **rotas nomeadas**. Exemplo de comunicação: [CSCMP Supply Chain Foundations na LinkedIn Learning](https://www.linkedin.com/learning/paths/cscmp-supply-chain-foundations-transportation-professional-certificate).

### 1.2 LMS “white-label” e creator economy (infoproduto)

Provedores como **Hotmart**, **Eduzz**, **Monetizze** concentram em Brasil **venda**, **área de membros**, **afiliados** e **checkout**. O blog da Hotmart descreve mercado de infoprod em crescimento e faixas de ticket — útil para **precificação** e modelo de **order bump** / **upsell**.

| Capacidade típica | Implicação para software próprio |
|-------------------|----------------------------------|
| Checkout + PIX/cartão + parcelamento | Se MVP for marketplace-only, integrações fiscais podem ficar na plataforma; **marca própria** limitada |
| Área de membros padrão | Menos flexibilidade para **trilhas dependentes**, **pré-requisitos SAP**, **badges granulares** |
| Afiliados | Canal de aquisição; exige **rastreamento** e **política de marca** |

**Insight:** muitos criadores **começam** em marketplace e migram para **LMS próprio** quando o CAC/LTV e a **diferenciação** justificam investimento — sua conversa de discovery deve decidir **build vs. assemble** (ver Análise 6).

### 1.3 LMS corporativos e LXP (B2B)

Para **venda para empresas** (turmas fechadas, compliance, upskilling):

- **Cornerstone, Degreed, 360Learning, Docebo**, entre outros — foco em **catálogo**, **skills**, integração HRIS.
- **LinkedIn Learning** em licença corporativa — concorrente indireto em “catálogo amplo”, mas fraco onde a empresa quer **conteúdo super-nicho** SAP + Brasil.

**Insight:** mesmo sem vender B2B no MVP, desenhar **metadata de competências** (tags) facilita **integração futura** com RH.

### 1.4 Ecossistema SAP (oficial e parceiros)

| Camada | Descrição |
|--------|-----------|
| **SAP Learning Hub** (assinatura SAP) | Conteúdo oficial, simuladores — público que já está no ecossistema SAP |
| **openSAP** | Cursos massivos gratuitos — **benchmark** de estrutura semana a semana |
| **Parceiros de treinamento** (vários países) | Cursos pagos, preparatórios, workshops |

Posicionamento da Logistikon: **não substituir** o Learning Hub, mas ofertar **ponte** em português, **contexto logístico integrado** e **carreira** (LinkedIn + certificado com narrativa de outcomes).

### 1.5 Credenciais digitais (badges)

Plataformas como **Credly** hospedam **badges verificáveis** com metadados — usadas por ASCM, universidades e programas de microcredencial. Exemplo de badge: [Purdue University Global — Supply Chain Logistics Micro-credential (Credly)](https://www.credly.com/org/purdue-university-global/badge/supply-chain-logistics-micro-credential).

**Insight:** para **software**, decidir cedo se o certificado será **PDF simples**, **hash verificável**, ou **badge Open Badges / compatível Europass** (ver Análise 4 e material sobre [European Digital Credentials | Europass](https://europa.eu/europass/en/european-digital-credentials-for-learning)).

---

## 2. Padrões de produto educacional a observar

1. **Learning paths:** sequência nomeada com contagem de horas e outcomes — espelha as **6 certificações nomeadas** no `base.md`.
2. **Stackable microcredentials:** módulos curtos que somam um **diploma digital** maior — tendência descrita em análises de mercado (ex.: artigos sobre substituição parcial de diplomas longos por badges focados).
3. **Híbrido gravado + ao vivo:** webinars e mentorias aumentam **ARPU** e **conclusão**.
4. **Comunidade externa (Slack/Discord/WhatsApp):** retenção; custo operacional de moderação.
5. **Avaliação:** quizzes, projeto final, **rubric** — necessário para certificado ter **credibilidade**.

---

## 3. “Mesmo enfoque” — lista de adjacências

| Player / tipo | Enfoque similar | Diferencial Logistikon potencial |
|---------------|-----------------|----------------------------------|
| Escolas SAP BR/IN | MM/SD/WM técnico | Integrar **KPIs, S&OP, dados, Lean** na mesma jornada |
| MOOCs supply chain | Teoria + cases | **Hands-on** dados + ferramentas corporativas BR |
| ASCM Certificates | Operações / planejamento | Rapidez, idioma, **sem exame ASCM obrigatório** (ou parceria futura) |
| SENAI/SEBRAE | Fundamentos gratuitos | Camada **Professional/Specialist** paga |

---

## 4. Implicações para arquitetura de informação (pré-software)

Antes de codificar, convém fixar:

- **Unidade mínima de venda:** módulo vs. trilha vs. assinatura.
- **Pré-requisitos entre módulos** (DAG de conhecimento).
- **Idioma:** mesmo curso PT+EN como **dois SKUs** ou **um SKU** com legendas/tradução.
- **Evidência de conclusão:** quiz vs. trabalho entregue vs. tempo mínimo — impacta **suporte jurídico** do certificado.

---

## 5. Referências

- LinkedIn Learning — paths em logística (via CSCMP e outros): busca interna por “supply chain” / “logistics”.
- Hotmart — visão de mercado de infoprodutos: [blog Hotmart — mercado de cursos online](https://hotmart.com/pt-br/blog/mercado-de-cursos-online).
- Europass — infraestrutura de credenciais: [European Digital Credentials for Learning](https://europa.eu/europass/en/european-digital-credentials-for-learning).

---

*Ver também: `01-concorrencia-e-landscape-competitivo.md`, `06-sintese-discovery-implicacoes-para-planejamento-de-software.md`.*
