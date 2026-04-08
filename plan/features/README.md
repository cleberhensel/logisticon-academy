# Features de desenvolvimento — Logistikon Academy

Tradução da especificação técnica e dos tópicos enriquecidos em **itens implementáveis** para o time de engenharia.

## Origem

- Especificação: `discovery/analises-tecnica/plataforma-logistikon-especificacao-tecnica-v1.md`
- Tópicos detalhados: `discovery/analises-tecnica/topicos-v1/`

## Convenções

| Campo | Significado |
|-------|-------------|
| **ID** | `DEV-XXX` — identificador único no backlog |
| **Épico** | Agrupamento por área de produto (`E01` … `E08`) |
| **Prioridade** | **P0** MVP bloqueante · **P1** MVP desejável · **P2** fase seguinte |
| **Ref spec** | ID do documento de discovery (ex.: `DISC-01`, `CHK-01`) |

## Índice de épicos

| Épico | Arquivo | Escopo |
|-------|---------|--------|
| E01 | [epic-01-identidade-e-acesso.md](epic-01-identidade-e-acesso.md) | Auth, sessão, RBAC, multi-tenant base |
| E02 | [epic-02-catalogo-e-pedidos.md](epic-02-catalogo-e-pedidos.md) | Catálogo público, produto/preço, pedido |
| E03 | [epic-03-stripe-e-pagamentos.md](epic-03-stripe-e-pagamentos.md) | Checkout, webhook, reconciliação, reembolso |
| E04 | [epic-04-area-do-aluno.md](epic-04-area-do-aluno.md) | Dashboard, player, progresso |
| E05 | [epic-05-avaliacao-e-certificados.md](epic-05-avaliacao-e-certificados.md) | Quiz, projeto, PDF, validação pública |
| E06 | [epic-06-backoffice.md](epic-06-backoffice.md) | CMS, usuários, financeiro, certificados BO, suporte, KPIs |
| E07 | [epic-07-b2b-organizacoes.md](epic-07-b2b-organizacoes.md) | Organizações, assentos, convites, relatórios |
| E08 | [epic-08-notificacoes-e-plataforma.md](epic-08-notificacoes-e-plataforma.md) | E-mail, NFRs mínimos, health, LGPD base |

## Registro flat

Tabela única com todos os IDs: [registro-de-features.md](registro-de-features.md)

## Traceabilidade (specs, US, tasks)

Cada épico inclui no topo um bloco **Artefactos de plano** com ligações diretas. Índices consolidados:

- [Specs (README)](../specs/README.md)
- [User stories (README)](../user-stories/README.md)
- [Tasks (README)](../tasks/README.md)

## Formato de cada feature (nos épicos)

Cada item contém: **Objetivo**, **Escopo técnico** (API/DB/UI), **Critérios de aceite**, **Dependências**, **Ref spec**.
