# Épico E08 — Notificações e plataforma transversal

**Objetivo de produto:** comunicação transacional, saúde do serviço e requisitos mínimos de **LGPD** e observabilidade leve.

**Artefactos de plano:** [SPEC-08](../specs/SPEC-08-plataforma-notificacoes-lgpd.md) · [User stories (E08)](../user-stories/E08-plataforma/) · Tasks [TSK-DEV-047](../tasks/TSK-DEV-047.md) … [TSK-DEV-049](../tasks/TSK-DEV-049.md)

---

## DEV-047 — Disparo de e-mails transacionais

- **Prioridade:** P0  
- **Ref spec:** EM-01, tópico 03

**Objetivo (dev):** Fila ou chamada síncrona a provedor (SMTP/API) para eventos: boas-vindas, confirmação pagamento, matrícula ativa, certificado emitido.

**Escopo técnico**
- Templates versionados; variáveis por tipo.
- Retry com backoff; log de falhas para reenvio manual (BO opcional).

**Critérios de aceite**
- Falha do provedor não corrompe transação principal (outbox pattern recomendado).
- Eventos mínimos MVP: registro, verificação e-mail, pago, certificado.

**Dependências:** variáveis ambiente provedor.

---

## DEV-048 — Healthcheck e readiness

- **Prioridade:** P1  
- **Ref spec:** NFR tópico 11

**Objetivo (dev):** `GET /health` (liveness) e `GET /ready` (DB + Stripe reachability opcional).

**Critérios de aceite**
- Load balancer/orquestrador usa readiness para tráfego.
- Não expor informações sensíveis no JSON público.

**Dependências:** infra deploy.

---

## DEV-049 — Export e exclusão de dados LGPD mínima

- **Prioridade:** P1  
- **Ref spec:** §11 LGPD

**Objetivo (dev):** Processo para exportar dados do usuário (JSON) e solicitar exclusão/anonymization respeitando retenção legal de pedidos.

**Escopo técnico**
- **API:** `POST /me/privacy/export`, `POST /me/privacy/delete-request` (ou fluxo manual inicial).
- Anonimizar PII mantendo registros financeiros obrigatórios.

**Critérios de aceite**
- Documento de retenção alinhado com jurídico.
- Logs de quem processou exclusão no BO.

**Dependências:** DEV-002, DEV-033 (processamento admin).

---

## Observações para o time

- **Rate limiting** em `/auth/login` e `/webhooks/stripe` (configurar no gateway ou app).
- **Structured logging** (JSON) com `request_id`, `user_id`, `order_id` nos fluxos críticos.
- Variáveis: `STRIPE_WEBHOOK_SECRET`, `JWT_SECRET`, URLs de front para redirects do checkout.

---
