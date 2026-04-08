# SPEC-04 — Área do aluno (learning)

**Épico:** E04 · **Refs:** `plan/features/epic-04-area-do-aluno.md`, discovery `topicos-v1/05` (LRN)

## Objetivo
Permitir ao aluno matriculado: **dashboard**, **navegação** trilha → módulo → aula, **player**, **progresso** persistido, **download** de materiais por URL assinada e **retomada** da última aula.

## Requisitos funcionais
1. Dashboard: enrollments do utilizador, `%` progresso (aulas concluídas / total publicadas — regra única documentada).
2. Conteúdo de aula só com `enrollment` ativa → 403 caso contrário.
3. Eventos de progresso no servidor (`complete`, heartbeat conforme política).
4. Conclusão manual apenas se `track` permitir.
5. URLs de download com TTL; sem bucket público direto.
6. `last_lesson_id` ou equivalente por matrícula para “Continuar”.

## API (sugerida)
| Método | Caminho | Descrição |
|--------|---------|-----------|
| GET | `/api/v1/me/enrollments` | Lista + progresso |
| GET | `/api/v1/me/tracks/:trackId/outline` | Módulos/aulas |
| GET | `/api/v1/me/lessons/:id` | Metadados + URL mídia |
| POST | `/api/v1/me/lesson-progress` | Eventos de progresso |
| POST | `/api/v1/me/lessons/:id/material-url` | URL assinada |

## Critérios globais de aceite
- Isolamento estrito por `user_id`; nunca vazar aula de outro aluno.
- Link expirado não permite download.

## Rastreabilidade
**US:** `US-E04-001` … `US-E04-005` · **Tasks:** `TSK-DEV-018` … `TSK-DEV-021`
