# TSK-DEV-047 — E-mails transacionais (Mailchimp adapter)

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-047 |
| **Prioridade** | P0 |
| **Épico** | E08 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-08-plataforma-notificacoes-lgpd.md](../../../../specs/SPEC-08-plataforma-notificacoes-lgpd.md) |
| **Épico (detalhe DEV)** | [epic-08-notificacoes-e-plataforma.md](../../../../features/epic-08-notificacoes-e-plataforma.md) |
| **US** | [US-E08-001](../US-E08-001.md) |

## Contexto de negócio

Comunicação transacional (registo, verificação, pago, certificado).

**Domínio:** **Port** `EmailPort`; **Adapter** Mailchimp (Marketing API e/ou Transactional — definir); **outbox** recomendado (falha do provedor não corrompe TX).

**Infra:** Fila/outbox table + worker; templates versionados.

**DevOps:** `MAILCHIMP_*` por ambiente hml/prd.

**Dependências:** credenciais Mailchimp.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
