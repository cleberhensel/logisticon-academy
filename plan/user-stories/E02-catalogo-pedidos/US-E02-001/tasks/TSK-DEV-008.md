# TSK-DEV-008 — API/UI catálogo público de trilhas

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-008 |
| **Prioridade** | P0 |
| **Épico** | E02 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-02-catalogo-pedidos.md](../../../../specs/SPEC-02-catalogo-pedidos.md) |
| **Épico (detalhe DEV)** | [epic-02-catalogo-e-pedidos.md](../../../../features/epic-02-catalogo-e-pedidos.md) |
| **US** | [US-E02-001](../US-E02-001.md) |

## Contexto de negócio

Descoberta de trilhas vendáveis.

**API:** `GET /catalog/tracks?page=&level=&locale=` — só `status = published`.

**Domínio:** `ListPublishedTracksUseCase`; sem autenticação.

**Infra:** Prisma read-only; paginação estável.

**Frontend:** Grid Carbon, cards, imagem lazy; facades catálogo.

**DevOps:** Cache HTTP opcional no nginx (curto) — documentar.

**Aceite:** Rascunhos nunca listados; metadados `total`, `page`, `page_size`.

**Dependências:** seed ou DEV-032.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
