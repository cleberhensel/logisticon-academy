# 00 — Visão geral do POC

POC em **Angular** para validar o **happy path B2C MVP** da Logistikon Academy, com **BFF mockado** (json-server) e **conteúdo de aulas** vindo de [`aulas/`](../../aulas/) sem ser alterado.

## Objetivos

1. Demonstrar fluxo completo: **catálogo → auth → checkout → área do aluno → quiz → certificado → validação pública**.
2. Não bloquear progresso por falta de backend real — toda a API é mock.
3. Evidenciar a **estrutura final** desejada (Angular standalone + Carbon DS) para o repositório de implementação que vier depois.

## Dentro do âmbito

- Telas listadas em [`ui/telas/`](../../ui/telas/) (13 telas MVP).
- Persistência local em `localStorage` (sessão JWT-fake, matrículas, progresso, quiz, certificados).
- Integração **real** com **Stripe Checkout em modo test** (chave publishable de teste).
- Sincronização das aulas em **runtime** a partir de `assets/aulas/`, alimentado por um script de cópia/index a partir de [`aulas/`](../../aulas/).
- Acessibilidade WCAG 2.2 AA nos fluxos F-A a F-G de [`UX/happy-paths-mvp-e-criterios-acessibilidade.md`](../../UX/happy-paths-mvp-e-criterios-acessibilidade.md).

## Fora do âmbito

- Backoffice (E06), B2B (E07).
- Recuperação de palavra-passe (DEV-005, P1).
- Download de materiais com URL assinada (DEV-020, P1).
- Lista “Os meus certificados” (DEV-027, P1).
- Projeto com upload (DEV-024, P2).
- i18n (PT-PT apenas).
- Geração real de PDF do certificado (placeholder/imagem ou print HTML).

## Premissas técnicas

- **Angular 18+** standalone components, Router lazy.
- **IBM Carbon Design System** (`carbon-components-angular` + `@carbon/styles`, tema `g10`).
- **json-server** + handlers custom (`server.js`) para a parte que precisa de lógica.
- **Stripe** chave publishable de teste; ao retornar para `/checkout/sucesso?session_id=`, a SPA **chama localmente** `POST /__sim/stripe-webhook` no mock para concluir o pedido (substituto do webhook real, que não existe num POC sem servidor exposto).
- A pasta [`aulas/`](../../aulas/) **não pode ser alterada**. O script lê e copia para `assets/aulas/` no projeto Angular.

## Fontes canónicas (não duplicar conteúdo)

| Tema | Documento |
|------|-----------|
| Happy path | [`UX/happy-paths-mvp-e-criterios-acessibilidade.md`](../../UX/happy-paths-mvp-e-criterios-acessibilidade.md) |
| Telas | [`ui/telas/`](../../ui/telas/) |
| Tokens / componentes / rotas | [`ui/01-tokens-e-fundamentos-visuais.md`](../../ui/01-tokens-e-fundamentos-visuais.md), [`ui/03-inventario-de-componentes.md`](../../ui/03-inventario-de-componentes.md), [`ui/05-mapas-de-rotas-e-deep-links.md`](../../ui/05-mapas-de-rotas-e-deep-links.md) |
| Stack alvo de produto | [`plan/architecture/stack-e-padroes.md`](../../plan/architecture/stack-e-padroes.md) |
| Features DEV | [`plan/features/registro-de-features.md`](../../plan/features/registro-de-features.md) |

## Critério de “POC pronto”

- `npm start` na pasta [`web/`](../) levanta SPA + mock-api + script de sync.
- Utilizador consegue percorrer os 18 passos do happy path numa única sessão.
- Smoke axe passa nos 7 fluxos críticos.
