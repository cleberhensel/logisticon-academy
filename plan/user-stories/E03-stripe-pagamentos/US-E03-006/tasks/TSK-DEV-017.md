# TSK-DEV-017 — Bloqueio compra duplicada mesma trilha

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-017 |
| **Prioridade** | P0 |
| **Épico** | E03 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-03-stripe-pagamentos.md](../../../../specs/SPEC-03-stripe-pagamentos.md) |
| **Épico (detalhe DEV)** | [epic-03-stripe-e-pagamentos.md](../../../../features/epic-03-stripe-e-pagamentos.md) |
| **US** | [US-E03-006](../US-E03-006.md) |

## Contexto de negócio

Evitar cobrança duplicada da mesma trilha.

**Domínio:** Checagem em `POST /commerce/orders` e/ou antes de checkout; mensagem amigável.

**Infra:** Query enrollment ativo.

**Dependências:** matrícula existente (DEV-014).

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
