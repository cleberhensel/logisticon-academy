# TSK-DEV-005 — Fluxo forgot/reset password

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-005 |
| **Prioridade** | P1 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-005](../US-E01-005.md) |

## Contexto de negócio

Recuperação de conta sem suporte manual (P1).

**API:** `POST /auth/forgot-password`, `POST /auth/reset-password`.

**Domínio:** Tokens únicos TTL curto; invalidar sessões após reset.

**Infra:** Tabela reset tokens; `EmailPort`.

**Frontend:** Fluxo multi-step Carbon; mensagens genéricas no forgot (anti-enumeração).

**Dependências:** DEV-002, DEV-047.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
