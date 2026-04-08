# SPEC-08 — Plataforma: notificações, saúde e LGPD mínima

**IDs DEV:** DEV-047, DEV-048, DEV-049  
**Épico:** E08 · **Origem:** `plan/features/epic-08-notificacoes-e-plataforma.md`, tópicos 03 (canais), 11 (NFR), LGPD na spec v1

---

## Objetivo

Garantir comunicação transacional confiável, endpoints de saúde para orquestração e direitos do titular (exportação e pedido de exclusão) sem violar retenção fiscal de pedidos.

---

## DEV-047 — E-mails transacionais (P0)

- Provedor SMTP/API; templates versionados com variáveis por tipo.
- Falha do provedor **não** corrompe transação principal (outbox ou fila assíncrona recomendado).
- Eventos mínimos MVP: registro, verificação de e-mail, pagamento confirmado, matrícula ativa, certificado emitido.
- Retry com backoff; log de falhas para reenvio (BO opcional).

---

## DEV-048 — Health e readiness (P1)

- `GET /health` (liveness) e `GET /ready` (dependências: DB; Stripe opcional).
- Resposta pública sem dados sensíveis; load balancer usa readiness para tráfego.

---

## DEV-049 — LGPD mínima (P1)

- Export de dados do titular (ex.: JSON) e fluxo de exclusão ou anonimização.
- Preservar registros financeiros obrigatórios; PII anonimizada onde aplicável.
- Alinhamento com documento de retenção (jurídico); log administrativo de quem processou exclusão.

---

## Observações de plataforma (cross-cutting)

- Rate limiting em `/auth/login` e `/webhooks/stripe` (gateway ou app).
- Logging estruturado (JSON) com `request_id`, `user_id`, `order_id` nos fluxos críticos.
