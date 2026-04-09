# TSK-DEV-004 — Verificação de e-mail (token TTL)

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-004 |
| **Prioridade** | P0 |
| **Épico** | E01 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-01-identidade-acesso.md](../../../../specs/SPEC-01-identidade-acesso.md) |
| **Épico (detalhe DEV)** | [epic-01-identidade-e-acesso.md](../../../../features/epic-01-identidade-e-acesso.md) |
| **US** | [US-E01-004](../US-E01-004.md) |

## Contexto de negócio

Garantir email válido antes de fluxos sensíveis (conforme política produto).

**API:** `GET /auth/verify-email?token=`; `POST /auth/resend-verification` (com throttle).

**Domínio:** `VerifyEmailUseCase`; token TTL + uso único; `EmailPort` para envio do link (DEV-047).

**Infra:** Prisma tokens de verificação; sem expor token em logs.

**Frontend:** Páginas sucesso/erro Carbon (`InlineNotification`).

**Testes:** Token expirado/usado → erro claro.

**Dependências:** DEV-047.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
