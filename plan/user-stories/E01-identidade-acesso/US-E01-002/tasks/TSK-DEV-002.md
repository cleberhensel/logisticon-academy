# TSK-DEV-002 — Login e emissão JWT access/refresh

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-002 |
| **Prioridade** | P0 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-002](../US-E01-002.md) |

## Contexto de negócio

Sessão segura para área do aluno e checkout.

**API:** `POST /auth/login` → `{ access_token, refresh_token, expires_in, user }`; claims: `sub`, `roles[]`, `org_id?`.

**Domínio:** `LoginUseCase`; `TokenIssuerPort` (access+refresh), `UserRepository`; sem vazar existência de email em mensagens (política definida com produto).

**Infra:** Prisma users + refresh storage; adapter JWT (biblioteca isolada em infra).

**Frontend:** Carbon login form; guard de rota após sucesso; tokens em storage seguro (decisão: httpOnly cookie vs memória — documentar).

**DevOps:** `JWT_SECRET` distinto hml/prd.

**Testes:** 401 credenciais inválidas; TTL access curto (15–60 min).

**Dependências:** DEV-001.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
