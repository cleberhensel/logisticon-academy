# TSK-DEV-048 — Healthcheck e readiness

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-048 |
| **Prioridade** | P1 |
| **Spec** | [SPEC-08](../specs/SPEC-08-plataforma-notificacoes-lgpd.md) |
| **US** | [US-E08-002](../user-stories/E08-plataforma/US-E08-002.md) |
| **Épico** | E08 |

## Objetivo

Expor `GET /health` (liveness) e `GET /ready` (DB; opcional Stripe) para orquestração.

## Critérios de aceite

- [ ] Load balancer usa readiness para tráfego.
- [ ] JSON sem dados sensíveis.

## Dependências

Infra de deploy.
