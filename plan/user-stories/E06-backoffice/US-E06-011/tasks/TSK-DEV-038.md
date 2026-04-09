# TSK-DEV-038 — BO CRUD cupons

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-038 |
| **Prioridade** | P1 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-011](../US-E06-011.md) |

## Contexto de negócio

Campanhas e descontos geridos sem código (P1).

**API:** `/admin/coupons` (lista/create) e `/admin/coupons/:id` (patch/delete) — alinhar à SPEC-06.

**Domínio:** `Coupon` entity + `CouponRepository`; validações de datas, `max_uses`, tipo (% vs fixo); uso reservado ao papel `finance`/`admin`.

**Infra:** Prisma `coupons`; opcional espelho Stripe Promotion Codes (adapter) se estratégia comercial exigir.

**Frontend:** Carbon `DataTable`, modais de edição, datas com `DatePicker`.

**Testes:** CRUD + rejeitar cupom inválido na validação de checkout (integração com DEV-016).

**Aceite:** Cupom criado no BO reflete-se na validação DEV-016 antes de ir ao Stripe.

**Dependências:** DEV-016 (consumo no checkout).

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
