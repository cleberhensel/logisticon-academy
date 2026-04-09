# TSK-DEV-023 — Tentativas, nota mínima e bloqueios

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-023 |
| **Prioridade** | P0 |
| **Épico** | E05 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-05-avaliacao-certificados.md](../../../../specs/SPEC-05-avaliacao-certificados.md) |
| **Épico (detalhe DEV)** | [epic-05-avaliacao-e-certificados.md](../../../../features/epic-05-avaliacao-e-certificados.md) |
| **US** | [US-E05-002](../US-E05-002.md) |

## Contexto de negócio

Limitar tentativas e exigir nota mínima.

**Domínio:** Regras por quiz; 409 quando esgotado; bloqueio certificado até aprovar módulo.

**Dependências:** DEV-022.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
