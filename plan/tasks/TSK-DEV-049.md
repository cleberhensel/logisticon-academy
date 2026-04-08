# TSK-DEV-049 — Export e exclusão de dados LGPD mínima

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-049 |
| **Prioridade** | P1 |
| **Spec** | [SPEC-08](../specs/SPEC-08-plataforma-notificacoes-lgpd.md) |
| **US** | [US-E08-003](../user-stories/E08-plataforma/US-E08-003.md) |
| **Épico** | E08 |

## Objetivo

Permitir export de dados do usuário (ex.: JSON) e solicitação de exclusão/anonimização respeitando retenção legal de pedidos.

## Escopo

- Ex.: `POST /me/privacy/export`, `POST /me/privacy/delete-request` (ou fluxo manual inicial + BO).
- Anonimizar PII mantendo obrigações fiscais.

## Critérios de aceite

- [ ] Documento de retenção alinhado (jurídico).
- [ ] Log de processamento de exclusão no backoffice.

## Dependências

DEV-002, DEV-033 (referência épico — identidade e processamento admin).
