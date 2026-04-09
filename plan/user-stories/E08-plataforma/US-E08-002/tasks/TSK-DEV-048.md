# TSK-DEV-048 — Healthcheck e readiness (nginx/upstream)

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-048 |
| **Prioridade** | P1 |
| **Épico** | E08 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-08-plataforma-notificacoes-lgpd.md](../../../../specs/SPEC-08-plataforma-notificacoes-lgpd.md) |
| **Épico (detalhe DEV)** | [epic-08-notificacoes-e-plataforma.md](../../../../features/epic-08-notificacoes-e-plataforma.md) |
| **US** | [US-E08-002](../US-E08-002.md) |

## Contexto de negócio

Deploy saudável em VPS + nginx (P1).

**API:** `GET /health`, `GET /ready` (DB + opcional Stripe ping).

**Domínio:** Sem dados sensíveis no JSON público.

**Infra:** nginx upstream apenas quando ready OK.

**Dependências:** Neon acessível a partir da VPS.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
