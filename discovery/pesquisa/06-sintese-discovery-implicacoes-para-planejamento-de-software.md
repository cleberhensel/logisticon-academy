# Análise 6 — Síntese do discovery: implicações para planejamento de software

**Objetivo:** consolidar **requisitos essenciais**, **riscos** e **decisões de arquitetura de produto** derivados das Análises 1–5, **antes** de comprometer backlog técnico. Este documento é o **ponte** entre *educação / mercado* e *engenharia*.

---

## 1. Resumo das conclusões cruzadas

| Dimensão | Conclusão para o produto |
|----------|---------------------------|
| Concorrência | Nicho **integrado** (processos + sistemas + dados) tem espaço vs. MOOC genérico e SAP isolado |
| Plataformas | Possível **MVP** em marketplace existente; **diferenciação** e dados de aluno favorecem **produto próprio** no médio prazo |
| Tendências | Demanda por **dados, IA, microcredenciais** e **time-to-value** curto |
| Níveis | Três níveis com **outcomes Bloom**, badges empilháveis e avaliação diferenciada |
| Ampliação | Mix B2C + B2B + comunidade; **6 rotas** como SKUs principais |

---

## 2. Personas e jornadas (mínimo viável para UX)

### Persona A — Analista (B2C)

- Descobre via **LinkedIn** → landing da rota → compra → onboarding → vídeos + quizzes → projeto BI → certificado → badge no perfil.

### Persona B — Gestor de operações (B2B)

- Contato comercial → proposta com **turma fechada** → convite por e-mail → dashboard de progresso → relatório CSV/PDF para RH.

### Persona C — Instrutor / admin interno

- Publica módulo, anexa rubrica, corrige submissions, emite **exceção** de pré-requisito.

**Implicação:** permissões **RBAC** (aluno, instrutor, admin, buyer org) já no desenho conceitual.

---

## 3. Domínio funcional (épico → capacidades)

### 3.1 Catálogo e progressão

- Trilhas, módulos, aulas (ou semanas tipo openSAP).
- **DAG de pré-requisitos** (módulo B exige A ou “placement test”).
- Progressão %, tempo gasto, **resume where you left off**.
- Suporte **PT/EN**: mesmo curso com **locales** ou SKUs separados.

### 3.2 Avaliação e integridade acadêmica

- Quizzes com **banco de questões** e embaralhamento.
- **Upload** de projeto (PDF, PBIX opcional, XLSX).
- **Rubrica** por rota Specialist; fila de correção para instrutor.
- (Opcional fase 2) Similaridade de texto / plágio.

### 3.3 Credenciais

- Geração de **certificado PDF** (template de marca).
- **ID único** + página pública de verificação **ou** integração **Open Badges / Credly-style** (fase 2).
- Registro de **emitidos** e revogação (fraude).

### 3.4 Comercial (Brasil)

- Checkout: PIX, cartão, parcelamento conforme adquirente.
- **Nota fiscal** e regime tributário (CNPJ já disponível no discovery — integrar com **emissor** contábil/API quando escala).
- Contratos B2B: **PO**, NF, **liberação em lote** de assentos.

### 3.5 Comunicação

- E-mail transacional (compra, lembrete, certificado).
- (Opcional) **push** comunidade externa; in-app **avisos**.

### 3.6 Conteúdo jurídico e compliance

- Termos de uso, política de privacidade (**LGPD**), consentimento de dados.
- Uso de **marca terceira** (SAP): revisão jurídica da **copy** do site.
- Direitos autorais de **materiais** e **música** em vídeos.

---

## 4. Integrações prováveis (ordem de probabilidade)

| Sistema | Finalidade |
|---------|------------|
| Gateway de pagamento (Pagar.me, Stripe BR, etc.) | Cobrança |
| Emissor NF (contador / ERP / API terceira) | Obrigações fiscais |
| Provedor e-mail (Resend, SendGrid, SES) | Transacional |
| Vídeo (Vimeo, Mux, YouTube unlisted) | Streaming |
| CRM (opcional) | Funil B2B |
| SSO SAML/OIDC (fase 2) | Cliente corporativo |
| LMS export (xAPI/SCORM) | Se precisar interoperar |

---

## 5. Decisão crítica: comprar vs. construir

| Abordagem | Quando faz sentido |
|-----------|---------------------|
| **Só Hotmart/Eduzz + Zoom** | Validar **PMF** em 90 dias com mínimo custo dev |
| **LMS SaaS (Teachable, Thinkific, LearnWorlds)** | Marca própria média; menos flex para DAG/rúbrica |
| **Custom (Next.js + headless)** | Controle total; custo de manutenção |
| **Open edX / Moodle** | Autogestão; curva de hospedagem e customização |

**Recomendação de discovery (hipótese):**  
- Fase **0–1:** validar com **ferramenta existente** + comunidade Discord/Slack se necessário.  
- Fase **2:** quando **pré-requisitos + rubrica + verificação de certificado** virarem dor, **customizar** ou **LMS headless**.

Registrar decisão em ata após **estimativa** de engenharia.

---

## 6. Métricas norte (North Star e operacionais)

| Métrica | Por quê |
|---------|---------|
| **Conclusão** por rota (%) | Credibilidade do certificado |
| **NPS / CSAT** pós-módulo | Qualidade percebida |
| **Tempo médio** até primeiro projeto entregue | Promessa time-to-value |
| **CAC / LTV** por canal (LinkedIn vs. afiliado) | Sustentabilidade |
| **Receita B2B vs. B2C** | Estratégia de feature |

---

## 7. Backlog inicial sugerido (épicos — não é estimativa)

1. Identidade, perfil, matrícula em trilha.  
2. Player de conteúdo + progresso.  
3. Quizzes e nota mínima.  
4. Submissão de projeto + rubrica.  
5. Certificado + verificação básica.  
6. Checkout + acesso pós-pagamento.  
7. Admin de conteúdo mínimo.  
8. i18n PT/EN no shell do produto.

---

## 8. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Escopo “ERP completo” inflado | **Roadmap por rota**; Mínimo **Professional** primeiro |
| Violação de marca SAP | Copy aprovada por jurídico; “SAP” como skill, não parceria implícita |
| Certificado sem valor | Avaliação **rigor** + prova social + verificação |
| NF/complexidade fiscal | Terceirizar emissão; não subestimar em MVP B2B |
| LGPD | DPIA leve; minimizar dados; políticas claras |

---

## 9. Lista de decisões pendentes (para workshop)

- [ ] MVP em plataforma terceira ou código próprio?  
- [ ] Assinatura vs. compra única no lançamento?  
- [ ] Certificado verificável **no go-live** ou fase 2?  
- [ ] Tradução: **duplicar curso** ou **legendas** + textos?  
- [ ] Primeira rota **hero**: qual das 6? (sugestão analítica: **Logistics Data Analyst** ou **ERP Logistics Specialist** conforme força do instrutor)

---

## 10. Índice dos documentos de análise

| Arquivo | Tema |
|---------|------|
| `01-concorrencia-e-landscape-competitivo.md` | Concorrência |
| `02-plataformas-players-enfoque-similar.md` | Plataformas |
| `03-tendencias-mercado-logistica-edtech.md` | Tendências |
| `04-niveis-de-conhecimento-frameworks-e-nomenclaturas.md` | Níveis e pedagogia |
| `05-amplificacao-da-proposta-posicionamento-e-matriz-de-valor.md` | Ampliação e posicionamento |
| `06-sintese-discovery-implicacoes-para-planejamento-de-software.md` | Este documento — ponte para engenharia |

---

## 11. Referências externas consolidadas

- Gartner supply chain tech trends: https://www.gartner.com/en/supply-chain/trends/supply-chain-technology-trends  
- WEF / skills e emprego: https://www.weforum.org/  
- ASCM learning: https://www.ascm.org/learning-development/  
- Europass / EDC: https://europa.eu/europass/en/european-digital-credentials-for-learning  

---

*Última atualização: discovery phase — antecede PRD técnico e arquitetura detalhada.*
