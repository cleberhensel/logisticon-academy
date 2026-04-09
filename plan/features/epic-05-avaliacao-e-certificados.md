# Épico E05 — Avaliação e certificados

**Objetivo de produto:** validar aprendizagem com **quiz**, opcionalmente **projeto**, e emitir **certificado** com validação pública.

**Artefactos de plano:** [SPEC-05](../specs/SPEC-05-avaliacao-certificados.md) · [User stories (E05)](../user-stories/E05-avaliacao-certificados/) · Tasks [TSK-DEV-022](../user-stories/E05-avaliacao-certificados/US-E05-001/tasks/TSK-DEV-022.md) … [TSK-DEV-027](../user-stories/E05-avaliacao-certificados/US-E05-006/tasks/TSK-DEV-027.md) · *Nota:* **DEV-021** (conclusão manual) está no [épico E04](epic-04-area-do-aluno.md); ver [US-E05-007](../user-stories/E05-avaliacao-certificados/US-E05-007/US-E05-007.md).

---

## DEV-022 — Quiz por módulo com embaralhamento

- **Prioridade:** P0  
- **Ref spec:** ASM-01

**Objetivo (dev):** Entregar conjunto de questões do módulo com ordem e opções embaralhadas por tentativa.

**Escopo técnico**
- **API:** `POST /me/modules/:moduleId/quiz/start` → `attempt_id` + perguntas sem gabarito.
- **API:** `POST /me/quiz-attempts/:id/submit` → respostas.
- **DB:** `quizzes`, `quiz_questions`, `quiz_attempts`.

**Critérios de aceite**
- Respostas corretas nunca enviadas ao cliente antes do submit.
- Nota calculada no servidor.

**Dependências:** DEV-019 (módulo acessível), DEV-030 (quiz definido no BO).

---

## DEV-023 — Limite de tentativas e nota mínima

- **Prioridade:** P0  
- **Ref spec:** ASM-02

**Objetivo (dev):** Respeitar `max_attempts` e `passing_score` por quiz/módulo.

**Escopo técnico**
- Bloquear `start` quando esgotado; opcional cooldown entre tentativas.

**Critérios de aceite**
- Tentativa extra após limite → 409 ou mensagem clara.
- Nota abaixo do mínimo não libera “módulo aprovado” para regra de certificado.

**Dependências:** DEV-022.

---

## DEV-024 — Entrega de projeto com upload

- **Prioridade:** P2  
- **Ref spec:** ASM-03

**Objetivo (dev):** Upload de arquivo (PDF/ZIP) vinculado à trilha; fila de correção para instrutor (BO).

**Escopo técnico**
- **API:** `POST /me/assignments/:id/submit` multipart.
- Armazenamento privado; validação tamanho/MIME.

**Critérios de aceite**
- Trilha sem projeto não exibe fluxo.
- Instrutor corrige no BO com rubrica (DEV-031).

**Dependências:** DEV-019, DEV-031.

---

## DEV-025 — Geração de certificado PDF e código único

- **Prioridade:** P0  
- **Ref spec:** ASM-04

**Objetivo (dev):** Quando regras da trilha satisfeitas (aulas + quizzes + projeto se houver), gerar PDF e persistir registro.

**Escopo técnico**
- Serviço `evaluateCertificateEligibility(enrollmentId)`.
- **DB:** `certificates` com `code` (UUID ou hash curto com entropia suficiente), `issued_at`, `pdf_url` ou blob.
- Template variáveis: nome, trilha, data, código (DEV-039).

**Critérios de aceite**
- Não emitir se qualquer pré-requisito pendente.
- Idempotente: segunda chamada não gera duplicata (retorna existente).

**Dependências:** DEV-023, DEV-021 (progresso), DEV-039.

---

## DEV-026 — Endpoint e página validação pública certificado

- **Prioridade:** P0  
- **Ref spec:** ASM-05

**Objetivo (dev):** `GET /verify/certificates/:code` (público) retorna status válido/revogado e dados mínimos.

**Escopo técnico**
- Sem autenticação; rate limit recomendado.
- Não expor e-mail; apenas nome como no certificado e nome da trilha.

**Critérios de aceite**
- Certificado revogado exibe estado explícito.
- Código inexistente → 404.

**Dependências:** DEV-025.

---

## DEV-027 — Download e listagem de certificados do aluno

- **Prioridade:** P1  
- **Ref spec:** POST-01

**Objetivo (dev):** Área “meus certificados” com link de download seguro.

**Escopo técnico**
- **API:** `GET /me/certificates` e download autenticado.

**Critérios de aceite**
- Apenas dono do certificado baixa.
- Certificado revogado: política de download (bloquear ou manter histórico com aviso).

**Dependências:** DEV-025, DEV-002.

---
