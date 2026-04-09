# TSK-DEV-045 — B2B pool assentos e convites

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-045 |
| **Prioridade** | P2 |
| **Épico** | E07 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-07-b2b-organizacoes.md](../../../../specs/SPEC-07-b2b-organizacoes.md) |
| **Épico (detalhe DEV)** | [epic-07-b2b-organizacoes.md](../../../../features/epic-07-b2b-organizacoes.md) |
| **US** | [US-E07-002](../US-E07-002.md) |

## Contexto de negócio

Convites e consumo de assentos (P2).

**Domínio:** `seat_pools`, `invitations`; reutilizar fulfillment estilo DEV-014.

**Infra:** `EmailPort` (Mailchimp) para convites.

**Dependências:** DEV-044, checkout corporativo, DEV-047.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
