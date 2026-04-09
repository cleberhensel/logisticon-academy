# TSK-DEV-003 — Refresh token, logout e revogação

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-003 |
| **Prioridade** | P0 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-003](../US-E01-003.md) |

## Contexto de negócio

Renovar sessão sem novo login; logout confiável.

**API:** `POST /auth/refresh`, `POST /auth/logout`.

**Domínio:** `RefreshTokenUseCase`, `LogoutUseCase`; `RefreshTokenStorePort` (revogação/allowlist).

**Infra:** Tabela refresh tokens; implementação com Prisma.

**Frontend:** Interceptor HTTP que tenta refresh em 401 controlado.

**Segurança:** Refresh rotacionado ou invalidado em logout.

**Testes:** 401 refresh inválido; após logout refresh inútil.

**Dependências:** DEV-002.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
