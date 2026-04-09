# TSK-DEV-032 — BO publicar/despublicar trilha

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-032 |
| **Prioridade** | P0 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-005](../US-E06-005.md) |

## Contexto de negócio

Controlo de visibilidade comercial.

**Domínio:** `draft` ↔ `published` com validações (módulos, preço se sellable).

**Aceite:** Publicada aparece DEV-008; despublicada oculta catálogo.

**Dependências:** DEV-028, DEV-010.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
