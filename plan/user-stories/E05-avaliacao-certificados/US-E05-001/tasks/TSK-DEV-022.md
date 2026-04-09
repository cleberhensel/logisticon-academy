# TSK-DEV-022 — Quiz: start + submit embaralhado

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-022 |
| **Prioridade** | P0 |
| **Épico** | E05 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-05-avaliacao-certificados.md](../../../../specs/SPEC-05-avaliacao-certificados.md) |
| **Épico (detalhe DEV)** | [epic-05-avaliacao-e-certificados.md](../../../../features/epic-05-avaliacao-e-certificados.md) |
| **US** | [US-E05-001](../US-E05-001.md) |

## Contexto de negócio

Avaliação justa por tentativa (embaralhamento).

**API:** `POST /me/modules/:moduleId/quiz/start`; `POST /me/quiz-attempts/:id/submit`.

**Domínio:** Não enviar gabarito ao cliente; nota só no servidor.

**Infra:** `quizzes`, `quiz_questions`, `quiz_attempts`.

**Dependências:** DEV-019, DEV-030.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
