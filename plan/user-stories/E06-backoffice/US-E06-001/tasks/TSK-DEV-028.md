# TSK-DEV-028 — BO CRUD trilha módulo aula

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-028 |
| **Prioridade** | P0 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-001](../US-E06-001.md) |

## Contexto de negócio

Gestão de conteúdo sem deploy.

**API:** `/admin/tracks`, `/admin/modules`, `/admin/lessons` (ajustar prefixo `/api/v1`).

**Domínio:** CRUD com RBAC instructor/admin; slug único.

**Frontend:** Forms e tabelas Carbon (data entry).

**Dependências:** DEV-006.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
