# TSK-DEV-020 — URLs assinadas download de materiais

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-020 |
| **Prioridade** | P1 |
| **Épico** | E04 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-04-area-do-aluno.md](../../../../specs/SPEC-04-area-do-aluno.md) |
| **Épico (detalhe DEV)** | [epic-04-area-do-aluno.md](../../../../features/epic-04-area-do-aluno.md) |
| **US** | [US-E04-004](../US-E04-004.md) |

## Contexto de negócio

Materiais com URL temporária (P1).

**API:** `POST /me/lessons/:id/material-url` ou redirect assinado.

**Domínio:** **Port** `SignedMaterialUrlPort`; TTL configurável; validar matrícula.

**Infra:** Adapter storage (S3/GCS) — futuro; contrato pronto desde já (**Adapter**).

**Segurança:** Sem bucket público direto; expiração 403.

**Dependências:** DEV-019.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
