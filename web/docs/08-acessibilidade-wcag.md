# 08 — Acessibilidade WCAG 2.2 AA (revisão dos fluxos F-A a F-G)

Esta revisão valida o que foi entregue no POC face aos critérios da norma **WCAG 2.2 nível AA** para os 7 fluxos do MVP definidos em `UX/happy-paths-mvp-e-criterios-acessibilidade.md` (F-A descoberta · F-B registo/verificação · F-C compra · F-D dashboard · F-E player · F-F quiz · F-G certificado).

> Escopo: revisão a olho-nu da implementação atual. Não inclui auditoria automática (axe/Pa11y) — fica documentado como próximo passo no item 6.

---

## 1. Princípios atendidos transversalmente

| Princípio                                       | Como foi tratado                                                                                                                  |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1.1.1 Conteúdo não-textual                      | Logo tem texto. Ícones puramente decorativos não foram introduzidos (POC). Botões usam texto, não só ícone.                       |
| 1.3.1 Info e relações                           | Uso de `<header>`, `<nav>`, `<main>`, `<footer>`, `<form>`, `<label for>` em todos os formulários.                                |
| 1.3.2 Sequência significativa                   | DOM segue ordem visual — não há `position: absolute` reordenando conteúdo.                                                        |
| 1.4.3 Contraste mínimo (texto)                  | Tema Carbon `g10` (whitepaper). Cor primária `#0f62fe` (azul Carbon) sobre branco e cor de marca `#0a3d62` sobre branco respeitam ≥4.5:1. Texto secundário `#525252` sobre `#fff` ≈ 7.6:1. |
| 1.4.4 Redimensionar texto                       | Tipografia em `rem`. Layouts em `flex`/`grid` adaptam até 200% de zoom no Chrome/Firefox sem perda de funcionalidade.            |
| 1.4.10 Reflow                                   | Containers usam `max-width` com `padding`. Não há scroll horizontal forçado em viewport ≥320 px.                                  |
| 1.4.11 Contraste de elementos não-textuais      | Botões primários têm fundo sólido com borda implícita pelo contraste; botões secundários têm `border` de `1px` na cor primária.  |
| 1.4.13 Conteúdo em hover/focus                  | Não há tooltips só por hover. Toda info importante é visível.                                                                     |
| 2.1.1 Teclado                                   | Componentes nativos (`button`, `a`, `input`, `select`). Nada exige rato.                                                          |
| 2.1.2 Sem armadilha de teclado                  | Não foram criados modais com focus trap manual.                                                                                   |
| 2.4.1 Bypass blocks (skip link)                 | `AppComponent` tem `<a class="lk-skip-link" href="#main">` visível ao receber foco. Cada shell tem `<main id="main" tabindex="-1">`. |
| 2.4.2 Title da página                           | _Próximo passo_: hoje só há `<title>Logistikon Academy</title>` no `index.html`. Sugerido adicionar `Title` por rota num `TitleStrategy` futuro. Documentado abaixo. |
| 2.4.3 Ordem de foco                             | Foco segue ordem do DOM. Após cada navegação, o `AppComponent` devolve foco ao `#main` (ngOnInit + NavigationEnd).                 |
| 2.4.4 Propósito do link                         | Links têm texto descritivo (`Ver catálogo`, `Comprar`, `Continuar de onde parou`).                                                |
| 2.4.6 Cabeçalhos e rótulos                      | Cada página começa com `<h1>`. Listagem de trilhas e módulos usam `<h2>`/`<h3>`.                                                  |
| 2.4.7 Foco visível                              | Aplicado `outline: 2px solid var(--lk-brand-primary); outline-offset: 2px` via `:focus-visible` no `styles/global.scss`.           |
| 2.4.11 Foco não obscurecido (mín)               | Não há barras fixas que sobreponham o conteúdo focado (header não fica `sticky`).                                                 |
| 2.5.7 Movimentos de arrastar                    | Não há drag-and-drop no MVP.                                                                                                      |
| 2.5.8 Tamanho-alvo                              | Botões e links têm `padding ≥ 0.5rem 0.75rem` (~32–44px de altura).                                                              |
| 3.1.1 Idioma da página                          | `<html lang="pt">` em `index.html`.                                                                                              |
| 3.2.1 Em foco                                   | Receber foco não dispara navegação.                                                                                               |
| 3.2.2 Em entrada                                | Submissão de formulário só ocorre com botão `submit` explícito.                                                                   |
| 3.3.1 Identificação de erros                    | Estados de erro renderizados em texto + cor + `role="alert"` (toasts) e `aria-live="polite"` em mensagens inline.                 |
| 3.3.2 Rótulos / instruções                      | Cada `input` tem `<label for>`. Campos opcionais marcados quando aplicável.                                                       |
| 3.3.3 Sugestão de erro                          | Mensagens textuais nos formulários (ex.: "Email já em uso", "Credenciais inválidas").                                             |
| 3.3.7 Auth acessível                            | Login pede só email + password; não há quebra-cabeças cognitivos. Verificação por código de 6 dígitos com `inputmode="numeric"`.  |
| 3.3.8 Auth sem reautenticação cognitiva         | Sessão persistida em `localStorage` durante 24 h (mock).                                                                          |
| 4.1.2 Nome, papel, valor                        | Uso de elementos nativos garante isto. Botões custom não foram introduzidos.                                                      |
| 4.1.3 Status messages                           | Toasts em `<div role="status" aria-live="polite">`; erros em `<div role="alert">`.                                                |

---

## 2. Revisão por fluxo

### F-A — Descoberta e catálogo

- `catalog-list.page` usa `<h1>Trilhas disponíveis</h1>` e cards em `<article>` com `<h2>` interno.
- Filtro "categoria" tem `<label>` associado ao `<select>`.
- Loading state: `<p aria-live="polite">A carregar...</p>`.
- Estado vazio explícito: "Nenhuma trilha disponível."
- ✅ Conforme.

### F-B — Registo + verificação de email

- `register.page`: campos `nome`, `email`, `password`, `confirmar password` com `<label for>`. `password` tem `autocomplete="new-password"`. `aria-describedby` aponta para a regra de senha.
- `verify-email.page`: campo de código com `inputmode="numeric"`, `pattern="\d{6}"`, `maxlength="6"`. Botão "Reenviar código" tem `aria-disabled` enquanto cooldown.
- ✅ Conforme.

### F-C — Compra (Stripe)

- Botão "Comprar" (CTA primário) é `<button type="button">`.
- Tela de retorno (`checkout-success` / `checkout-cancelled`) inicia com `<h1>` indicando o resultado.
- Stub do Stripe (`__stub/stripe`): formulário simples com `<label>` em todos os campos.
- ✅ Conforme. _Nota_: o redirecionamento para domínio Stripe real (modo `real`) sai do escopo — Stripe Checkout é WCAG 2.1 AA certificado pelos próprios.

### F-D — Dashboard do aluno

- `<h1>A sua aprendizagem</h1>`, lista de matrículas em `<section>` com `<h2>` por matrícula.
- Indicador de progresso é `<progress>` nativo com `aria-label="X% concluído"`.
- ✅ Conforme.

### F-E — Player de aula

- Outline lateral é `<nav aria-label="Sumário da trilha">`. Aula atual marcada com `aria-current="page"`.
- Conteúdo Markdown renderizado em `<article>`. `marked` mantém estrutura semântica (`<h1>`, `<h2>`, `<ul>`, etc.).
- DOMPurify garante que nenhum atributo perigoso (`onerror`, `onclick`) sobrevive.
- Botão "Marcar como concluída" e "Próxima aula" são `<button>`.
- ✅ Conforme.

### F-F — Quiz do módulo

- Cada pergunta em `<fieldset>` com `<legend>` (enunciado).
- Opções como `<input type="radio">` + `<label>`.
- Resultado final: `<h2 aria-live="polite">Aprovado/Reprovado</h2>` e contagem de tentativas restantes.
- Botão "Tentar novamente" desativado quando `attemptsLeft === 0`, com `aria-disabled` e mensagem explicativa.
- ✅ Conforme.

### F-G — Certificado (emissão + validação pública)

- `certificate.page`: `<h1>Certificado de conclusão</h1>`. Código de validação em `<code>` + botão "Copiar" com `aria-live="polite"` confirmando "Código copiado".
- `verify-public.page`: form com `<label for>` no campo "Código". Resultado positivo/negativo em `<div role="status">`.
- ✅ Conforme.

---

## 3. Páginas de erro globais (Sprint 6)

- `/erro/403` — `ForbiddenPage` com `<h1>Acesso negado</h1>`, código grande (`<p class="code">403</p>`) marcado como decoração visual, e ações claras ("Ir para a área do aluno", "Ver catálogo").
- `/erro/404` — `NotFoundPage` análogo, com retorno ao catálogo.
- `/erro/500` — `ServerErrorPage` com botão "Recarregar" e link para "Início".
- Wildcard `**` em `app.routes.ts` redireciona para `/erro/404`.
- `errorInterceptor` mapeia `403 → /erro/403` e mantém toasts para 5xx / network.
- ✅ Conforme.

---

## 4. Pontos cobertos pelo design system

Carbon Design System já garante (quando os componentes Carbon Angular forem usados nas iterações pós-POC):

- Inputs com `aria-invalid` automaticamente em erro.
- Modais com `focus trap` correto.
- Tabelas com `<caption>` opcional e `<th scope>`.
- Notificações com `role="status"` / `role="alert"`.

> No POC usámos HTML semântico nativo + estilos Carbon mínimos (tema `g10`). Quando promovermos para a build "produto", devemos importar os componentes (`cds-button`, `cds-text-input`, `cds-modal`, etc.) para herdar estes ganhos sem custo extra.

---

## 5. Limitações conhecidas do POC

1. Sem `TitleStrategy` por rota — todas as páginas mostram "Logistikon Academy" no título do separador. _Item para a build produto._
2. Sem testes automáticos com `axe-core`. Recomendado adicionar `@axe-core/playwright` quando entrarem testes E2E.
3. Player não suporta vídeo no MVP — quando entrar, **legendas** (1.2.2) e **transcrições** (1.2.3) tornam-se requisitos AA.
4. Quiz não tem timer (caso seja adicionado, atender 2.2.1 — controlo de tempo).
5. Os formulários de login/registo não usam `cds-text-input` ainda; `aria-describedby` para mensagens de erro inline foi aplicado de forma manual.

---

## 6. Próximos passos (pós-POC)

- [ ] Configurar `TitleStrategy` que injete o nome da página + " · Logistikon Academy".
- [ ] Adicionar `@axe-core/playwright` aos testes E2E e correr nos 7 fluxos.
- [ ] Substituir HTML nativo por componentes `carbon-components-angular` (`cds-button`, `cds-text-input`, `cds-modal`, `cds-notification`).
- [ ] Auditoria com leitor de ecrã (NVDA + Firefox / VoiceOver + Safari) nos fluxos F-B, F-E, F-F.
- [ ] Validar contraste real após token branding final (cor `#0a3d62` confirmada com cliente).
