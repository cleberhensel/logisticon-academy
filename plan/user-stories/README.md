# User stories — Logistikon Academy

Histórias em formato **Given / When / Then**, organizadas por **épico** (pastas `E01-…` a `E08-…`) e por **US individual**.

## Convenções de ID

| Padrão | Épico |
|--------|--------|
| **US-E01-*** | Identidade, JWT, RBAC, organizações base |
| **US-E02-*** | Catálogo público, detalhe, elegibilidade, Stripe catalog, pedido |
| **US-E03-*** | Checkout, webhook, matrícula, estados, cupom, anti-duplicado, reconciliação, UX pós-checkout |
| **US-E04-*** | Dashboard, outline, player, materiais, retomar aula |
| **US-E05-*** | Quiz, tentativas, projeto, certificado, verificação, listagem, política de conclusão |
| **US-E06-*** | CMS, utilizadores, pedidos/financeiro, certificados BO, suporte, observabilidade |
| **US-E07-*** | B2B: org, assentos, painel buyer |
| **US-E08-*** | E-mail transacional, health, LGPD |

**Estrutura por US:** cada US fica em `Ejj-*/US-Ejj-NNN/` e contém:

- ficheiro principal `US-Ejj-NNN.md`;
- subpasta `tasks/` com os **ficheiros completos** `TSK-DEV-NNN.md` dessa US (a mesma task pode estar duplicada noutra US quando é partilhada — ex.: **TSK-DEV-012** em `US-E03-001` e `US-E03-008`).

**Links relativos:** a partir da pasta da US (ficheiro `US-*.md`), usar `../../../specs/`; links para a task principal usam `./tasks/TSK-DEV-NNN.md`.

## Pastas

| Pasta | Conteúdo |
|-------|----------|
| [E01-identidade-acesso/](E01-identidade-acesso/) | `US-E01-001/` … `US-E01-007/` |
| [E02-catalogo-pedidos/](E02-catalogo-pedidos/) | `US-E02-001/` … `US-E02-005/` |
| [E03-stripe-pagamentos/](E03-stripe-pagamentos/) | `US-E03-001/` … `US-E03-008/` |
| [E04-area-do-aluno/](E04-area-do-aluno/) | `US-E04-001/` … `US-E04-005/` |
| [E05-avaliacao-certificados/](E05-avaliacao-certificados/) | `US-E05-001/` … `US-E05-007/` |
| [E06-backoffice/](E06-backoffice/) | `US-E06-001/` … `US-E06-014/` |
| [E07-b2b/](E07-b2b/) | `US-E07-001/` … `US-E07-004/` |
| [E08-plataforma/](E08-plataforma/) | `US-E08-001/` … `US-E08-004/` |

## Casos com mais do que uma task ou US partilhada

- **US-E02-002** e **US-E02-003** partilham **TSK-DEV-009** (detalhe + elegibilidade).
- **US-E03-001** e **US-E03-008** referem-se a **TSK-DEV-012** (sessão Checkout + URLs de retorno / UX).
- **US-E04-002** e **US-E04-003** concentram-se em **TSK-DEV-019** (outline + player/progresso).
- **US-E04-005** cobre **TSK-DEV-018** e **TSK-DEV-019** (retomar última aula).
- **US-E06-014** cobre **TSK-DEV-041** (tickets) e **TSK-DEV-042** (dashboard / webhooks).

## Referência

- **Arquitetura e stack:** [plan/architecture/stack-e-padroes.md](../architecture/stack-e-padroes.md)
- **Geração/atualização em lote das tasks:** `scripts/enrich_plan_tasks.py` na raiz do repositório (conteúdo canónico por `DEV-NNN` no script).
- Índice por épico e DEV: [plan/features/registro-de-features.md](../features/registro-de-features.md)
- Specs: [plan/specs/README.md](../specs/README.md)
