# TSK-DEV-024 — Upload projeto e armazenamento privado

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-024 |
| **Prioridade** | P2 |
| **Épico** | E05 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-05-avaliacao-certificados.md](../../../../specs/SPEC-05-avaliacao-certificados.md) |
| **Épico (detalhe DEV)** | [epic-05-avaliacao-e-certificados.md](../../../../features/epic-05-avaliacao-e-certificados.md) |
| **US** | [US-E05-003](../US-E05-003.md) |

## Contexto de negócio

Entrega avaliada por instrutor (P2).

**API:** `POST /me/assignments/:id/submit` multipart.

**Domínio:** Validação tamanho/MIME; storage privado.

**Dependências:** DEV-019, DEV-031.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
