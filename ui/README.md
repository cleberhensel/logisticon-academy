# Documentação de UI — Logistikon Academy (MVP B2C)

Documentação para **início do desenvolvimento frontend** (Angular + **IBM Carbon Design System**), alinhada ao happy path em `UX/happy-paths-mvp-e-criterios-acessibilidade.md` e a `plan/architecture/stack-e-padroes.md`.

## Como usar

1. Ler **fundamentos** (tokens, layout, componentes, estados).
2. Implementar **rotas** conforme mapa de rotas.
3. Por ecrã, seguir a ficha na pasta **`telas/`** (estrutura, componentes, estados, API de UI).

## Índice — fundamentos

| Ficheiro | Conteúdo |
|----------|----------|
| [00-escopo-stack-e-navegacao.md](./00-escopo-stack-e-navegacao.md) | Stack, âmbito MVP, shells, guards |
| [01-tokens-e-fundamentos-visuais.md](./01-tokens-e-fundamentos-visuais.md) | Tema Carbon, cores, tipo, espaçamento, elevação |
| [02-layout-shells-e-grids.md](./02-layout-shells-e-grids.md) | Grid de 2 colunas, cabeçalho, rodapé, área autenticada |
| [03-inventario-de-componentes.md](./03-inventario-de-componentes.md) | Mapeamento Carbon por função; componentes custom |
| [04-estados-feedback-e-copy.md](./04-estados-feedback-e-copy.md) | Loading, vazio, erro, notificações, tom de voz |
| [05-mapas-de-rotas-e-deep-links.md](./05-mapas-de-rotas-e-deep-links.md) | Rotas MVP, parâmetros, redirecionamentos Stripe |
| [06-fluxos-compostos-e-sequencias-mvp.md](./06-fluxos-compostos-e-sequencias-mvp.md) | Encadeamento detalhe→Stripe→matrícula; casos limite |

## Índice — telas (happy path)

| Ficheiro | Ecrã | Épicos |
|----------|------|--------|
| [telas/tela-catalogo-trilhas.md](./telas/tela-catalogo-trilhas.md) | Lista paginada de trilhas publicadas | E02 |
| [telas/tela-detalhe-trilha.md](./telas/tela-detalhe-trilha.md) | Syllabus, preço, CTA compra / já inscrito | E02 |
| [telas/tela-registo.md](./telas/tela-registo.md) | Criação de conta | E01 |
| [telas/tela-login.md](./telas/tela-login.md) | Início de sessão | E01 |
| [telas/tela-verificacao-email.md](./telas/tela-verificacao-email.md) | Confirmação de e-mail (token) | E01 |
| [telas/tela-checkout-retorno-stripe.md](./telas/tela-checkout-retorno-stripe.md) | Sucesso / cancelamento / processamento pós-Stripe | E03 |
| [telas/tela-dashboard-aluno.md](./telas/tela-dashboard-aluno.md) | Matrículas e progresso | E04 |
| [telas/tela-outline-trilha.md](./telas/tela-outline-trilha.md) | Módulos e aulas | E04 |
| [telas/tela-player-aula.md](./telas/tela-player-aula.md) | Consumo de aula e progresso | E04 |
| [telas/tela-quiz-modulo.md](./telas/tela-quiz-modulo.md) | Avaliação por módulo | E05 |
| [telas/tela-certificado-e-conclusao.md](./telas/tela-certificado-e-conclusao.md) | Certificado emitido, código, download PDF | E05 |
| [telas/tela-validacao-certificado-publica.md](./telas/tela-validacao-certificado-publica.md) | Verificação pública por código | E05 |
| [telas/tela-erros-globais.md](./telas/tela-erros-globais.md) | 403, 404, erro genérico, offline leve | Transversal |

## Fora do âmbito desta pasta (MVP)

- **Backoffice (E06)** e **B2B (E07)** — documentar noutra série quando entrarem no roadmap.
- **Stripe Checkout** (UI alojada na Stripe) — apenas redirecionamento e retorno; ver `tela-checkout-retorno-stripe.md`.

## Referências externas

- [Carbon Design System](https://carbondesignsystem.com/)
- [Angular Carbon](https://angular.carbondesignsystem.com/) (pacotes oficiais do ecossistema Carbon para Angular)
