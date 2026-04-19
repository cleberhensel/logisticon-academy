# Documentação do POC Angular — Logistikon Academy

Esta pasta concentra **a especificação operacional** do POC. Ler **antes** de tocar em código.

| # | Documento | Conteúdo |
|---|-----------|----------|
| 00 | [00-visao-geral-poc.md](./00-visao-geral-poc.md) | Objectivo, dentro/fora do âmbito, premissas |
| 01 | [01-estrutura-de-pastas.md](./01-estrutura-de-pastas.md) | Árvore Angular standalone + mock-api + scripts |
| 02 | [02-stack-e-dependencias.md](./02-stack-e-dependencias.md) | Versões, dependências, `package.json`, comandos |
| 03 | [03-mock-api.md](./03-mock-api.md) | Esquema `db.json`, endpoints, handlers custom |
| 04 | [04-sync-aulas.md](./04-sync-aulas.md) | Algoritmo do script + formato `index.json` |
| 05 | [05-features-x-telas-x-endpoints.md](./05-features-x-telas-x-endpoints.md) | Matriz feature × rota × tela × endpoint |
| 06 | [06-stripe-modo-poc.md](./06-stripe-modo-poc.md) | Stripe Checkout test + simulação webhook local |
| 07 | [07-sprints-e-ordem-execucao.md](./07-sprints-e-ordem-execucao.md) | Sequência de implementação e critérios de aceite |
| 08 | [08-acessibilidade-wcag.md](./08-acessibilidade-wcag.md) | Revisão WCAG 2.2 AA dos fluxos F-A a F-G + páginas de erro |

## Fontes externas (não duplicar)

- Happy path B2C: [`UX/happy-paths-mvp-e-criterios-acessibilidade.md`](../../UX/happy-paths-mvp-e-criterios-acessibilidade.md)
- Fichas de telas: [`ui/telas/`](../../ui/telas/)
- Tokens / componentes / rotas UI: [`ui/`](../../ui/)
- Backlog DEV: [`plan/features/registro-de-features.md`](../../plan/features/registro-de-features.md)

## Convenção dentro deste POC

- **Não alterar** [`aulas/`](../../aulas/), [`plan/`](../../plan/), [`discovery/`](../../discovery/), [`apresentacao/`](../../apresentacao/), [`UX/`](../../UX/), [`ui/`](../../ui/).
- Toda mudança fica isolada em [`web/`](../).
