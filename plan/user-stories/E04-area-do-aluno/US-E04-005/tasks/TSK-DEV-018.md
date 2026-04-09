# TSK-DEV-018 — Dashboard aluno e API enrollments

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-018 |
| **Prioridade** | P0 |
| **Épico** | E04 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-04-area-do-aluno.md](../../../../specs/SPEC-04-area-do-aluno.md) |
| **Épico (detalhe DEV)** | [epic-04-area-do-aluno.md](../../../../features/epic-04-area-do-aluno.md) |
| **US** | [US-E04-005](../US-E04-005.md) |

## Contexto de negócio

Aluno vê progresso e próximos passos.

**API:** `GET /me/enrollments` com `progress_percent`, `next_lesson_id`, resumo da trilha.

**Domínio:** `ListMyEnrollmentsUseCase`; agregação progresso/preços apenas do próprio utilizador.

**Frontend:** Dashboard Carbon (tiles, `ProgressBar`).

**Dependências:** DEV-014, DEV-002.

## Ângulo desta user story

**Retomar** última aula: depende de `resume` / progresso (além desta US, ver `TSK-DEV-019` na mesma jornada).

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
