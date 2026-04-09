# TSK-DEV-025 — Motor certificado PDF + código único

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-025 |
| **Prioridade** | P0 |
| **Épico** | E05 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-05-avaliacao-certificados.md](../../../../specs/SPEC-05-avaliacao-certificados.md) |
| **Épico (detalhe DEV)** | [epic-05-avaliacao-e-certificados.md](../../../../features/epic-05-avaliacao-e-certificados.md) |
| **US** | [US-E05-004](../US-E05-004.md) |

## Contexto de negócio

Prova verificável de conclusão.

**Domínio:** `evaluateCertificateEligibility`; PDF + `code` único; idempotência emitir.

**Infra:** Motor template (DEV-039); persistência `certificates`.

**Dependências:** DEV-023, DEV-021, DEV-039.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
