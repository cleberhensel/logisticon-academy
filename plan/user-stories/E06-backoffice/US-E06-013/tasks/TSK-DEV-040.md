# TSK-DEV-040 — BO emissão manual e revogação certificado

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-040 |
| **Prioridade** | P2 |
| **Épico** | E06 |
| **Arquitetura** | [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) |
| **Spec** | [SPEC-06-backoffice.md](../../../../specs/SPEC-06-backoffice.md) |
| **Épico (detalhe DEV)** | [epic-06-backoffice.md](../../../../features/epic-06-backoffice.md) |
| **US** | [US-E06-013](../US-E06-013.md) |

## Contexto de negócio

Casos manuais e fraude (P2).

**API:** `POST /admin/certificates/issue`, `POST /admin/certificates/:id/revoke` com motivo e actor.

**Domínio:** `IssueCertificateManuallyUseCase`, `RevokeCertificateUseCase`; **audit_logs** obrigatório; estado `revoked` visível em DEV-026.

**Infra:** Prisma `certificates`; transações com enrollment.

**Frontend:** Carbon fluxo confirmação + campo motivo; lista certificados com badge estado.

**Segurança:** Apenas `admin`; trilho de auditoria (DEV-034 padrão).

**Testes:** Revogar → validação pública retorna estado revogado.

**Dependências:** DEV-025, DEV-026.

## Checklist arquitetura (todas as tasks)

- [ ] Respeitar camadas em [stack-e-padroes.md](../../../../architecture/stack-e-padroes.md) (domain sem Prisma/SDK; use cases sem Express).
- [ ] Integrações externas via **ports + adapters** (Stripe, Mailchimp, storage).
- [ ] Políticas variáveis com **Strategy** quando aplicável (checkout errors, conclusão de aula, elegibilidade, estados de pedido).
- [ ] Rotas `/api/v1` alinhadas às SPECs; RBAC em rotas sensíveis.
