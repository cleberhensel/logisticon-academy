# Tokens e fundamentos visuais

## 1. Base: IBM Carbon

Toda a UI assenta em **tokens semânticos** do Carbon, não em cores hex soltas em componentes. Em Angular, consumir via tema SCSS/CSS variables expostas por `@carbon/styles` (ou pipeline equivalente do projeto).

Documentação de referência: [Carbon — Tokens](https://carbondesignsystem.com/elements/color/tokens/).

## 2. Tema de cor (recomendação MVP)

| Opção | Uso |
|-------|-----|
| **Tema claro `g10` (Gray 10)** | Fundo de página e superfícies de leitura prolongada (aulas, políticas) |
| **Tema claro `white`** | Cartões e modais sobre `g10` para hierarquia |
| **Tema escuro** | Não obrigatório no MVP; se existir preferência de marca, definir **um** tema escuro Carbon (`g100`) e testar contraste |

**Regra:** não misturar temas na mesma vista sem divisor claro (ex.: shell escuro + conteúdo claro exige desenho de marca explícito).

### 2.1 Tokens semânticos (mapeamento de uso)

| Token Carbon (exemplo) | Uso na Logistikon Academy |
|------------------------|---------------------------|
| `$background` | Fundo de página principal |
| `$layer-01` | Fundo de cartões / painéis |
| `$layer-02` | Secções aninhadas (sidebar outline) |
| `$border-subtle-01` | Separadores de lista |
| `$text-primary` | Corpo de texto |
| `$text-secondary` | Metadados (CH, nível, preço secundário) |
| `$link-primary` | Links inline e CTAs secundários |
| `$support-success` | Estado pago, quiz aprovado, certificado válido |
| `$support-warning` | Processamento assíncrono, última tentativa de quiz |
| `$support-error` | Erro de pagamento, quiz reprovado, token inválido |
| `$focus` | Anel de foco teclado (não remover) |

### 2.2 Marca (camada sobre Carbon)

Até existir **guia de marca** aprovado:

1. **Logo:** zona reservada no header (altura fixa, ex.: 32px ou 40px altura de logo).
2. **Cor de acento:** se a marca tiver cor primária fora da paleta Carbon, definir **um** token `--logistikon-accent` mapeado para **Button primary** e links críticos, e validar **contraste** WCAG AA com texto branco ou escuro conforme botão.
3. **Não** criar terceira cor de botão; usar `secondary` e `tertiary` Carbon para hierarquia.

## 3. Tipografia

| Estilo Carbon | Aplicação |
|---------------|-----------|
| **Productive heading** | Títulos de página (`heading-04` / `heading-05` conforme hierarquia) |
| **Body short 01** | Texto corrido em cartões e formulários |
| **Body long 01** | Descrições longas na página de detalhe da trilha |
| **Label 01** | Etiquetas de campo, metadados |
| **Helper text** | Texto de ajuda sob inputs |
| **Code 01** | Código de verificação de certificado |

**Regra:** uma página tem **um** `h1`; outline da trilha usa `h2` por módulo e `h3` por aula.

## 4. Espaçamento

- Usar escala **Carbon spacing** (`$spacing-03` … `$spacing-09`) para padding/margin entre blocos.
- **Secções verticais:** mínimo `$spacing-06` entre blocos principais numa página de marketing/detalhe.
- **Formulários:** `Form` Carbon com gap consistente; agrupar campos relacionados em `fieldset` semântico se aplicável.

## 5. Elevação e sombras

- Cartões clicáveis: `ClickableTile` ou `Tile` com estado hover; evitar sombras pesadas — Carbon usa **bordas** e **layers** antes de sombra.
- **Modal** de confirmação (sair do quiz): usar `Modal` Carbon com overlay padrão.

## 6. Ícones

- Biblioteca: **@carbon/icons** (tamanhos 16 / 20 / 24).
- Uso: reforçar ações (download PDF, play, check de progresso), nunca sozinhos sem `aria-label` ou texto visível.

## 7. Motion

- Transições curtas (150–200ms) em hovers de cartão; **respeitar `prefers-reduced-motion`** (Carbon trata parte disto; não adicionar animações decorativas em fluxos críticos).

## 8. Grid e largura máxima

- **Conteúdo de leitura:** `max-width` recomendada ~672px para bloco de texto longo (alinhado a padrões Carbon de legibilidade).
- **Catálogo em grelha:** 12 colunas; em `md` duas colunas de cartões; em `lg` três quando houver dados.

Ver também `02-layout-shells-e-grids.md`.

## 9. Ficheiros de tema no repo de código (quando criados)

Sugestão de estrutura (ajustar ao generator):

- `styles/_carbon-theme.scss` — import do tema e overrides de marca permitidos
- `styles/_tokens-logistikon.scss` — apenas variáveis de marca aprovadas

Neste repositório de documentação **não** há código; os developers copiam tokens para o repo da app.
