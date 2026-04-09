# TSK-DEV-021 — Conclusão de aula manual (política trilha)

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-021 |
| **Prioridade** | P1 |
| **Épico** | E04 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-04-area-do-aluno.md](../../../../specs/SPEC-04-area-do-aluno.md) |
| **Épico (detalhe DEV)** | [epic-04-area-do-aluno.md](../../../../features/epic-04-area-do-aluno.md) |
| **US** | [US-E05-007](../US-E05-007.md) |

## Contexto de negócio

Conclusão alinhada à política da trilha (auto vs manual).

**API:** `POST /me/lessons/:id/complete` quando permitido.

**Domínio:** **Strategy** `LessonCompletionPolicy` (auto/manual); campo trilha `allow_manual_complete`; leitura de config BO (SPEC-06).

**Infra:** Prisma track/lesson.

**Frontend:** Botão Carbon condicionado à política.

**Dependências:** DEV-019.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
