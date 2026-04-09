# TSK-DEV-047 — Disparo de e-mails transacionais

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-047 |
| **Prioridade** | P0 |
| **Spec** | [SPEC-08](../specs/SPEC-08-plataforma-notificacoes-lgpd.md) |
| **US** | [US-E08-001](../user-stories/E08-plataforma/US-E08-001/US-E08-001.md) |
| **Épico** | E08 |

## Objetivo

Enviar e-mails para eventos: boas-vindas, verificação, pagamento, matrícula ativa, certificado — sem corromper transação principal em caso de falha do provedor.

## Escopo

- Fila/outbox ou assíncrono; templates versionados; variáveis por tipo.
- Retry com backoff; log de falhas.

## Critérios de aceite

- [ ] Falha do provedor não reverte persistência do evento de negócio.
- [ ] Eventos mínimos MVP cobertos.
- [ ] Configuração por ambiente (SMTP/API).

## Dependências

Variáveis de ambiente do provedor.
