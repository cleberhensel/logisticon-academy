# TSK-DEV-043 — Job reconciliação pagamentos Stripe

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-043 |
| **Prioridade** | P1 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-007](../US-E03-007.md) |

## Contexto de negócio

Fechar pedidos órfãos se webhook falhar (P1).

**Domínio:** Job agendado; consultar Stripe por metadata/session; reutilizar DEV-014.

**Infra:** Worker/cron na VPS Hostinger; logs persistidos.

**DevOps:** Não correr com credenciais erradas de ambiente; alertas após N horas.

**Dependências:** DEV-012, DEV-013, DEV-014.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
