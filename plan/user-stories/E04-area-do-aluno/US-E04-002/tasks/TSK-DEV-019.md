# TSK-DEV-019 — Player aula + progresso e outline

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-019 |
| **Prioridade** | P0 |
| **Épico** | E04 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-04-area-do-aluno.md](../../../../specs/SPEC-04-area-do-aluno.md) |
| **Épico (detalhe DEV)** | [epic-04-area-do-aluno.md](../../../../features/epic-04-area-do-aluno.md) |
| **US** | [US-E04-002](../US-E04-002.md) |

## Contexto de negócio

Consumo de conteúdo e gravação fiável de progresso.

**API:** `GET /me/tracks/:trackId/lessons/:lessonId`; `POST /me/lesson-progress`; `GET /me/enrollments/:id/resume`.

**Domínio:** Policies de acesso por matrícula; `lesson_progress` com eventos coerentes com política (integra DEV-021).

**Infra:** Prisma `lesson_progress`.

**Frontend:** Player + outline Carbon; serviços como adapters REST.

**Dependências:** DEV-018, DEV-028.

## Ângulo desta user story

**Outline** e navegação módulos/aulas autorizada por matrícula.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
