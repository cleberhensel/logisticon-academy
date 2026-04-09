# TSK-DEV-044 — B2B entidade organização e membros

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-044 |
| **Prioridade** | P2 |
| **Épico** | E07 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-07-b2b-organizacoes.md](../../../../specs/SPEC-07-b2b-organizacoes.md) |
| **Épico (detalhe DEV)** | [epic-07-b2b-organizacoes.md](../../../../features/epic-07-b2b-organizacoes.md) |
| **US** | [US-E07-001](../US-E07-001.md) |

## Contexto de negócio

Organizações corporativas (P2).

**Domínio:** `organizations`, `organization_members` buyer/member; queries scoped por token.

**Dependências:** DEV-007, DEV-006.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
