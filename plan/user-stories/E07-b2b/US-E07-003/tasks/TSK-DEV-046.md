# TSK-DEV-046 — B2B painel buyer e export CSV

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-046 |
| **Prioridade** | P2 |
| **Épico** | E07 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-07-b2b-organizacoes.md](../../../../specs/SPEC-07-b2b-organizacoes.md) |
| **Épico (detalhe DEV)** | [epic-07-b2b-organizacoes.md](../../../../features/epic-07-b2b-organizacoes.md) |
| **US** | [US-E07-003](../US-E07-003.md) |

## Contexto de negócio

Buyer vê progresso agregado (P2).

**API:** `GET /org/reports/export.csv`.

**Domínio:** Sem leak de conteúdo de aula; só métricas.

**Dependências:** DEV-045, DEV-018, DEV-025.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
