# TSK-DEV-006 — Middleware RBAC e matriz de rotas

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-006 |
| **Prioridade** | P0 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-006](../US-E01-006.md) |

## Contexto de negócio

Proteger rotas admin, financeiro e dados de outros utilizadores.

**Domínio:** `AuthorizationPort` / políticas por rota (`student`, `instructor`, `finance`, `admin`, `buyer`); lista explícita de rotas públicas (`/catalog/*`, `/auth/*`, webhook Stripe).

**Infra:** Middleware Express que resolve user + roles e consulta matriz; **sem** lógica de negócio pesada no middleware (delegar a policy se necessário).

**Frontend:** Ponte com roles do token para UI; **autorização real no backend**.

**Testes:** Casos negativos em amostra de rotas (403).

**Dependências:** DEV-002.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
