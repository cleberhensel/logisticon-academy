# Épico E04 — Área do aluno (learning)

**Objetivo de produto:** após matrícula, consumir aulas, persistir **progresso** e retomar de onde parou.

**Artefactos de plano:** [SPEC-04](../specs/SPEC-04-area-do-aluno.md) · [User stories (E04)](../user-stories/E04-area-do-aluno/) · Tasks [TSK-DEV-018](../tasks/TSK-DEV-018.md) … [TSK-DEV-021](../tasks/TSK-DEV-021.md) · *Nota:* [US-E05-007](../user-stories/E05-avaliacao-certificados/US-E05-007/US-E05-007.md) (política de conclusão) referencia **DEV-021** neste épico.

---

## DEV-018 — Dashboard do aluno

- **Prioridade:** P0  
- **Ref spec:** LRN-01

**Objetivo (dev):** Visão das trilhas matriculadas com percentual de conclusão e próxima aula.

**Escopo técnico**
- **API:** `GET /me/enrollments` — incluir `progress_percent`, `next_lesson_id`, `track` resumido.
- **UI:** cards por trilha; barra de progresso.

**Critérios de aceite**
- `progress_percent` = aulas concluídas / total de aulas publicadas da trilha (definir se inclui módulos sem aula).
- Só lista matrículas do usuário autenticado.

**Dependências:** DEV-014, DEV-002.

---

## DEV-019 — Player de aula e registro de progresso

- **Prioridade:** P0  
- **Ref spec:** LRN-02, LRN-05

**Objetivo (dev):** Exibir conteúdo da aula (vídeo/embed/texto) e gravar progresso no servidor.

**Escopo técnico**
- **API:** `GET /me/tracks/:trackId/lessons/:lessonId` (autorizado se matriculado).
- **API:** `POST /me/lesson-progress` — eventos: `started`, `progress_pct`, `completed` (conforme política).
- **DB:** `lesson_progress` com último timestamp / posição vídeo.

**Critérios de aceite**
- Acesso negado sem matrícula ativa → 403.
- Última aula acessível via `GET /me/enrollments/:id/resume`.

**Dependências:** DEV-018, DEV-028 (conteúdo).

---

## DEV-020 — Download de material com URL assinada

- **Prioridade:** P1  
- **Ref spec:** LRN-03

**Objetivo (dev):** Gerar URL temporária para arquivo em object storage (S3/GCS) só para aluno matriculado.

**Escopo técnico**
- **API:** `POST /me/lessons/:id/material-url` ou redirect 302 assinado.
- TTL configurável (ex.: 15 min).

**Critérios de aceite**
- Link expirado retorna 403.
- Não expor bucket público direto.

**Dependências:** DEV-019.

---

## DEV-021 — Conclusão de aula manual conforme política

- **Prioridade:** P1  
- **Ref spec:** LRN-04

**Objetivo (dev):** Permitir botão “marcar concluída” apenas se `track.allow_manual_complete === true`.

**Escopo técnico**
- Campo na trilha ou política global.
- **API:** `POST /me/lessons/:id/complete` valida política.

**Critérios de aceite**
- Trilha só vídeo: conclusão pode ser automática por evento do player.
- Trilha texto: pode exigir clique explícito.

**Dependências:** DEV-019.

---

## Opcional MVP+ — Onboarding pós-cadastro

- **Ref spec:** ACC-03 (Could)

Fluxo wizard 1–3 passos após primeiro login: pode ser **feature separada** (ex.: DEV-050) se priorizado; não bloqueia MVP se omitido.

---
