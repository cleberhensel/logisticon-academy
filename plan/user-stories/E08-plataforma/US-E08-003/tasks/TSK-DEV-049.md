# TSK-DEV-049 — LGPD export exclusão dados mínima

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-049 |
| **Prioridade** | P1 |
| **Épico** | E08 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-08-plataforma-notificacoes-lgpd.md](../../../../specs/SPEC-08-plataforma-notificacoes-lgpd.md) |
| **Épico (detalhe DEV)** | [epic-08-notificacoes-e-plataforma.md](../../../../features/epic-08-notificacoes-e-plataforma.md) |
| **US** | [US-E08-003](../US-E08-003.md) |

## Contexto de negócio

Requisitos mínimos LGPD (P1).

**API:** `POST /me/privacy/export`, `POST /me/privacy/delete-request` (ou fluxo manual inicial).

**Domínio:** Anonimização vs retenção fiscal; trilho audit BO.

**Dependências:** DEV-002, DEV-033.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
