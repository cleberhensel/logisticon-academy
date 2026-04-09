# TSK-DEV-039 — BO template certificado

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-039 |
| **Prioridade** | P0 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-012](../US-E06-012.md) |

## Contexto de negócio

Certificado brandável (P0).

**API:** `GET/PATCH /admin/certificate-templates` (ou recurso equivalente na SPEC-06) para versão ativa por trilha/global.

**Domínio:** `CertificateTemplate` com placeholders (`{{studentName}}`, `{{trackName}}`, `{{code}}`, `{{issuedAt}}`); motor de render isolado (**port** `CertificateRenderPort`, implementação PDF em infra).

**Infra:** Armazenar HTML/mustache ou template binário; versão de template para auditoria.

**Frontend:** BO Carbon: editor seguro (sandbox) ou upload + preview.

**Testes:** Snapshot de render com dados fixos.

**Aceite:** DEV-025 usa template aprovado; alteração de template não invalida certificados já emitidos (versão).

**Dependências:** iterar em paralelo com DEV-025 além de DEV-028.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
