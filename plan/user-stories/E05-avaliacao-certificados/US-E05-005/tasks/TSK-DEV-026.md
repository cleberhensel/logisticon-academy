# TSK-DEV-026 — Endpoint/página verificação pública certificado

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-026 |
| **Prioridade** | P0 |
| **Épico** | E05 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-05-avaliacao-certificados.md](../../../../specs/SPEC-05-avaliacao-certificados.md) |
| **Épico (detalhe DEV)** | [epic-05-avaliacao-e-certificados.md](../../../../features/epic-05-avaliacao-e-certificados.md) |
| **US** | [US-E05-005](../US-E05-005.md) |

## Contexto de negócio

Terceiros validam autenticidade sem login.

**API:** `GET /verify/certificates/:code` público.

**Domínio:** Dados mínimos; sem email; rate limit recomendado.

**Frontend:** Página pública leve (Carbon ou estática).

**Dependências:** DEV-025.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
