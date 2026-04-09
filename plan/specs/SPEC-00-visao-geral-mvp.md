# SPEC-00 — Visão geral do MVP (Logistikon Academy LMS)

**Escopo:** fases, prioridades e ponteiros para backlog detalhado.

---

## Fases (alto nível)

| Fase | Foco | Entrega principal |
|------|------|-------------------|
| **1** | Core aluno + checkout | Auth, catálogo, matrícula, player, Stripe, certificado básico |
| **2** | Backoffice | CMS, usuários/papéis, financeiro operacional, suporte mínimo |
| **3** | B2B simples | Organização, pool de assentos, convites, painel buyer, CSV |
| **4** | Evoluções | SSO, certificado avançado, BI/automações |

---

## Prioridades

| Nível | Significado | Exemplos |
|-------|-------------|----------|
| **P0** | Bloqueia MVP B2C | Auth, checkout, webhook, matrícula, e-mails transacionais críticos |
| **P1** | MVP desejável / NFR | Health/readiness, LGPD mínima, rate limit em rotas sensíveis |
| **P2** | Pós-MVP / B2B | Organizações, assentos, convites, relatório buyer (DEV-044–046) |

---

## Referências

| Tipo | Caminho |
|------|---------|
| Features DEV por épico | `plan/features/epic-*.md` |
| Registro flat DEV | `plan/features/registro-de-features.md` |
| Specs técnicas | `plan/specs/SPEC-*.md` |
| User stories | `plan/user-stories/` |
| Tasks (`TSK-DEV-*`) | `plan/user-stories/<épico>/<US>/tasks/` |
| Discovery | `discovery/analises-tecnica/plataforma-logistikon-especificacao-tecnica-v1.md`, `discovery/analises-tecnica/topicos-v1/` |

---

*Documento executivo; detalhes de API e critérios ficam nas SPEC e nas tasks vinculadas.*
