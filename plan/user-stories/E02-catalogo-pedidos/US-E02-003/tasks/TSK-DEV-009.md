# TSK-DEV-009 — Detalhe trilha + API elegibilidade de compra

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-009 |
| **Prioridade** | P0 |
| **Épico** | E02 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-02-catalogo-pedidos.md](../../../../specs/SPEC-02-catalogo-pedidos.md) |
| **Épico (detalhe DEV)** | [epic-02-catalogo-e-pedidos.md](../../../../features/epic-02-catalogo-e-pedidos.md) |
| **US** | [US-E02-003](../US-E02-003.md) |

## Contexto de negócio

Informação de compra e **elegibilidade** antes do Stripe.

**API:** `GET /catalog/tracks/:slug`; `GET /catalog/tracks/:id/eligibility` (ou embutido se autenticado).

**Domínio:** **Strategy** de elegibilidade (já matriculado, sem preço, B2B); retorno `can_enroll`, `reason`.

**Infra:** Repositories track, enrollment, price.

**Frontend:** Página detalhe; CTA Carbon desativado se `can_enroll === false`.

**Aceite:** Preço = price ativo Stripe/DB; CTA coerente.

**Dependências:** DEV-008, DEV-010.

## Ângulo desta user story

Ênfase na **API de elegibilidade** `can_enroll` / `reason` e bloqueio do CTA.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
