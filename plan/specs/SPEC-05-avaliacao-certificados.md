# SPEC-05 — Avaliação e certificados

**Épico:** E05 · **Refs:** `plan/features/epic-05-avaliacao-e-certificados.md`, discovery tópico 05 (ASM, POST)

## Objetivo
Avaliar aprendizagem com **quiz** por módulo (embaralhamento, tentativas, nota mínima), opcionalmente **projeto** com upload, emitir **certificado PDF** com **código único** e expor **validação pública** sem vazar PII além do necessário.

## Requisitos funcionais
1. Iniciar tentativa de quiz: perguntas sem gabarito no cliente até submissão.
2. `max_attempts`, `passing_score` configuráveis por quiz/módulo.
3. Projeto (P2): upload, armazenamento privado, correção com rubrica no BO.
4. Motor de elegibilidade de certificado: progresso + notas + projeto se aplicável.
5. Certificado: PDF gerado server-side; `code` com entropia suficiente; idempotente se reavaliado.
6. `GET /verify/certificates/:code` público: válido / revogado / 404.
7. Área aluno: listar e re-download de certificados próprios.

## Entidades
`quizzes`, `quiz_questions`, `quiz_attempts`, `assignments`, `assignment_submissions`, `certificates`, template de certificado (config BO).

## Critérios globais de aceite
- Nota e tentativas só calculadas no servidor.
- Certificado não emitido se pré-requisitos pendentes.

## Rastreabilidade
**US:** `US-E05-001` … `US-E05-007` · **Tasks:** `TSK-DEV-022` … `TSK-DEV-027`
