# TSK-DEV-034 — BO atribuir papéis + audit_logs

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-034 |
| **Prioridade** | P0 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-007](../US-E06-007.md) |

## Contexto de negócio

Trilha de auditoria para mudanças sensíveis.

**API:** `POST /admin/users/:id/roles`.

**Domínio:** `audit_logs` com actor, target, old/new.

**Dependências:** DEV-033, DEV-007.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
