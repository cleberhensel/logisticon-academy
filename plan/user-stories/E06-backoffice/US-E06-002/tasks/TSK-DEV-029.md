# TSK-DEV-029 — BO ordenação módulos/aulas

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-029 |
| **Prioridade** | P1 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-002](../US-E06-002.md) |

## Contexto de negócio

Ordem pedagógica correta no catálogo e aluno.

**API:** `PATCH` batch ordem ou endpoints dedicados.

**Frontend:** Drag-and-drop UX Carbon (onde aplicável).

**Dependências:** DEV-028.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
