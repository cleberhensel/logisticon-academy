# Layout, shells e grids

## 1. Estrutura HTML semântica (todas as telas)

```text
[header global]
  [skip to content link — obrigatório a11y]
  [main id="main-content"]
    [conteúdo da rota]
  [footer global — opcional em fluxos mínimos]
```

- **Skip link:** primeiro elemento focável; salta para `#main-content`.
- **Landmarks:** um `main` por página; navegação em `nav` com `aria-label` distinto (ex.: “Principal”, “Conta”).

## 2. Cabeçalho público (shell público)

| Zona | Conteúdo | Componentes Carbon |
|------|----------|----------------------|
| Esquerda | Logo (link para `/`) | — + `Link` |
| Centro (opcional) | Nada no MVP; futuro: pesquisa | — |
| Direita | “Iniciar sessão” (ghost ou tertiary), “Criar conta” (primary) | `HeaderGlobalAction` pattern ou `Button` em toolbar |
| Mobile | Menu `HeaderPanel` ou `SideNav` colapsável com os mesmos links | `Header` + `SideNav` |

**Altura:** compacta (48px–56px) para maximizar conteúdo útil.

## 3. Cabeçalho área do aluno

| Zona | Conteúdo |
|------|----------|
| Esquerda | Logo → link para `/app` ou `/learn` (dashboard) |
| Navegação primária | “As minhas formações” (ativa no dashboard) |
| Direita | `OverflowMenu` ou menu nome: Perfil, Terminar sessão |

**Não mostrar** links para admin ou backoffice para roles `student`.

## 4. Grid de conteúdo

### 4.1 Página de catálogo

- **Container:** largura fluida com padding horizontal `$spacing-05` (mobile) a `$spacing-07` (desktop).
- **Grelha:** `Row` + `Column` Carbon: em `lg`, 3 colunas de `lg={4}`; em `md`, 2 colunas; em `sm`, 1 coluna.

### 4.2 Página de detalhe

- **Layout de duas colunas em `lg`:** coluna principal (8 cols) syllabus + CTA; coluna lateral (4 cols) cartão resumo preço e dados-chave.
- **Em `sm`:** stack vertical — primeiro resumo compra, depois syllabus (ou ordem inversa conforme teste A/B futuro; MVP: resumo após título).

### 4.3 Dashboard

- **Grelha de cartões:** cada matrícula = `Tile` ou `ClickableTile` com mesma altura mínima para alinhamento visual.

### 4.4 Outline + player

- **Desktop:** `SideNav` fixo ou painel esquerdo com lista de módulos/aulas (largura ~256px); área direita com player.
- **Mobile:** lista colapsável (`Accordion`) por módulo; player em ecrã completo com botão “Aulas” para voltar à lista (drawer opcional).

## 5. Rodapé

| Conteúdo MVP | Notas |
|----------------|-------|
| Links estáticos | Termos, privacidade, contacto (placeholder se conteúdo legal pendente) |
| Copyright | Nome da entidade com CNPJ se exigido pela marca |
| Idioma | Placeholder “PT | EN” desativado ou link inativo até i18n |

## 6. Espaçamento vertical global

- Entre `header` e `main`: `$spacing-06`.
- Entre `main` e `footer`: `$spacing-09`.

## 7. Diagrama ASCII — shell público

```text
+----------------------------------------------------------+
| [Logo]                    [Login]  [Criar conta]          |
+----------------------------------------------------------+
|                                                          |
|   [ Breadcrumb opcional ]                                |
|                                                          |
|   [ Conteúdo em Grid ]                                   |
|                                                          |
+----------------------------------------------------------+
| Rodapé · links · ©                                       |
+----------------------------------------------------------+
```

## 8. Diagrama ASCII — shell aluno (desktop)

```text
+----------------------------------------------------------+
| [Logo]  As minhas formações          [ Avatar ▼ ]        |
+----------------------------------------------------------+
| Módulos (nav)  |  [ Player / conteúdo principal ]       |
| lista          |                                        |
|                |                                        |
+----------------+----------------------------------------+
```

## 9. Breakpoints (Carbon alinhado)

| Nome | Largura aproximada | Comportamento MVP |
|------|--------------------|---------------------|
| sm | < 672px | Uma coluna; menu hamburger |
| md | 672–1056px | Duas colunas catálogo; detalhe empilhado |
| lg | 1056–1312px | Três colunas catálogo; detalhe 8+4 |
| xlg | ≥ 1312px | Igual a lg com margens maiores |

Valores exatos seguem `grid-breakpoints` do pacote Carbon instalado.
