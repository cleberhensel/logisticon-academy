# Specs — Logistikon Academy

Especificações que consolidam discovery e épicos em documentos por tema. Registro canónico de itens de engenharia: `plan/features/registro-de-features.md`.

## Convenções de ID

| Prefixo | Uso |
|---------|-----|
| **SPEC-NN** | Spec temática (arquivo único) |
| **DEV-NNN** | Feature de engenharia (1:1 com `TSK-DEV-NNN`) |
| **E01…E08** | Épico (pastas em `plan/user-stories/`) |

## Matriz Spec ↔ épico ↔ tasks

| SPEC | Épico | Tasks (faixa) |
|------|-------|----------------|
| [SPEC-00](SPEC-00-visao-geral-mvp.md) | (visão MVP) | — |
| [SPEC-01](SPEC-01-identidade-acesso.md) | E01 | TSK-DEV-001 … **007** |
| [SPEC-02](SPEC-02-catalogo-pedidos.md) | E02 | TSK-DEV-008 … **011** |
| [SPEC-03](SPEC-03-stripe-pagamentos.md) | E03 | TSK-DEV-012 … **017**, **043** |
| [SPEC-04](SPEC-04-area-do-aluno.md) | E04 | TSK-DEV-018 … **021** |
| [SPEC-05](SPEC-05-avaliacao-certificados.md) | E05 | TSK-DEV-022 … **027** |
| [SPEC-06](SPEC-06-backoffice.md) | E06 | TSK-DEV-028 … **042** |
| [SPEC-07](SPEC-07-b2b-organizacoes.md) | E07 | TSK-DEV-044 … **046** |
| [SPEC-08](SPEC-08-plataforma-notificacoes-lgpd.md) | E08 | TSK-DEV-047 … **049** |

**Nota:** **DEV-021** (LRN-04) pertence ao épico **E04**; a user story [US-E05-007](../user-stories/E05-avaliacao-certificados/US-E05-007.md) permanece na pasta E05 por foco na política de conclusão (configuração no BO + impacto na avaliação).

## Índice de ficheiros

- [SPEC-00-visao-geral-mvp.md](SPEC-00-visao-geral-mvp.md)
- [SPEC-01-identidade-acesso.md](SPEC-01-identidade-acesso.md)
- [SPEC-02-catalogo-pedidos.md](SPEC-02-catalogo-pedidos.md)
- [SPEC-03-stripe-pagamentos.md](SPEC-03-stripe-pagamentos.md)
- [SPEC-04-area-do-aluno.md](SPEC-04-area-do-aluno.md)
- [SPEC-05-avaliacao-certificados.md](SPEC-05-avaliacao-certificados.md)
- [SPEC-06-backoffice.md](SPEC-06-backoffice.md)
- [SPEC-07-b2b-organizacoes.md](SPEC-07-b2b-organizacoes.md)
- [SPEC-08-plataforma-notificacoes-lgpd.md](SPEC-08-plataforma-notificacoes-lgpd.md)
