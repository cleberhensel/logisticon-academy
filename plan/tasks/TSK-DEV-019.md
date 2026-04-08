# TSK-DEV-019 — Player de aula e registro de progresso

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-019 |
| **Prioridade** | P0 |
| **Spec** | [SPEC-04-area-do-aluno.md](../specs/SPEC-04-area-do-aluno.md) |
| **US** | [US-E04-003](../user-stories/E04-area-do-aluno/US-E04-003.md) · também [US-E04-002](../user-stories/E04-area-do-aluno/US-E04-002.md) (outline) |
| **Épico** | E04 |

## Objetivo

Consumo de aula autenticado, persistência de progresso e APIs que suportam navegação por módulos/aulas (outline com matrícula).

## Escopo

- Player (vídeo/conteúdo) e endpoints `lesson-progress` (ou equivalente na SPEC).
- Outline da trilha para aluno matriculado (403 sem matrícula).

## Critérios de aceite

- [ ] Progresso gravado no servidor após conclusão de conteúdo conforme política.
- [ ] Outline completo apenas com matrícula ativa.
- [ ] Testes de autorização por matrícula.

## Dependências

DEV-018, matrícula ativa (fluxo E03).
