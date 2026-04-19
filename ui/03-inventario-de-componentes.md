# Inventário de componentes (Carbon + custom)

## 1. Princípio

**Preferir sempre componentes Carbon** para obter acessibilidade, foco e consistência. Componentes **custom** só quando não existir equivalente ou quando for composição pura (layout) sem semântica própria.

Referência: [Carbon Components](https://carbondesignsystem.com/components/overview/).

## 2. Inventário por função

### 2.1 Navegação e estrutura

| Função | Componente Carbon | Notas |
|--------|---------------------|--------|
| Cabeçalho global | `Header`, `HeaderName`, `HeaderNav`, `HeaderMenu`, `HeaderMenuItem`, `HeaderGlobalBar`, `HeaderGlobalAction` | Ajustar ao pacote Angular Carbon disponível |
| Menu lateral | `SideNav`, `SideNavItems`, `SideNavMenu`, `SideNavLink` | Outline / trilha |
| Migas de pão | `Breadcrumb`, `BreadcrumbItem` | Detalhe, outline |
| Paginação | `Pagination` | Catálogo |

### 2.2 Conteúdo e listagem

| Função | Componente Carbon |
|--------|-------------------|
| Lista de trilhas | `ClickableTile` ou `StructuredList` (se dados tabulares) |
| Cartão resumo | `Tile`, `Card` |
| Tags | `Tag` (nível, idioma, “Novo”) |
| Progresso | `ProgressBar` |

### 2.3 Formulários e entrada

| Função | Componente Carbon |
|--------|-------------------|
| Formulário | `Form`, `FormGroup`, `FormItem` |
| Texto | `Input`, `PasswordInput` |
| Validação | `InlineLoading` no submit; mensagens de erro em `FormItem` |
| Botão primário | `Button` kind="primary" |
| Botão secundário | `Button` kind="secondary" / "tertiary" / "ghost" |

### 2.4 Feedback

| Função | Componente Carbon |
|--------|-------------------|
| Notificação toasts | `ToastNotification` ou `InlineNotification` |
| Alerta estático | `InlineNotification` |
| Modal | `Modal` com `danger` para ação destrutiva |
| Skeleton | `SkeletonText`, `SkeletonPlaceholder` |
| Loading | `Loading`, `InlineLoading` |

### 2.5 Mídia

| Função | Abordagem |
|--------|-----------|
| Vídeo | `<video>` HTML5 com controlos nativos; wrapper com ratio 16:9; **track** para legendas quando existirem ficheiros |
| Ícone play | `Play` de `@carbon/icons` |

### 2.6 Dados densos

| Função | Componente Carbon |
|--------|-------------------|
| Lista de aulas | `StructuredList` ou lista simples com `Link` |
| Accordion módulos | `Accordion`, `AccordionItem` |

### 2.7 Quiz

| Função | Componente Carbon |
|--------|-------------------|
| Escolha única | `RadioButtonGroup`, `RadioButton` |
| Múltipla escolha | `Checkbox` |
| Navegação | `Button` “Seguinte” / “Anterior”; `ProgressIndicator` opcional para passos |

## 3. Componentes custom (Logistikon)

Criar no repo de código com prefixo `Lk` ou `Logistikon` (definir no projeto):

| Componente | Responsabilidade |
|------------|------------------|
| `LkTrailCard` | Composição: imagem, título, tags, preço, CTA |
| `LkEnrollmentBadge` | Estados: não inscrito / inscrito / concluído |
| `LkVideoPlayer` | Wrapper com teclado, fullscreen acessível, eventos de progresso |
| `LkQuizQuestion` | Uma pergunta; embaralhamento vem da API; não renderizar gabarito |
| `LkCertificateCode` | Exibir código com `font-mono` e botão copiar |

Cada componente custom deve ter **inputs** tipados e **sem** chamadas HTTP diretas (delegar ao container).

## 4. O que evitar

- `div` com `onClick` sem `role` e `tabindex`.
- Cores de erro apenas com ícone vermelho sem texto.
- Modais aninhados sem necessidade.
- Tabelas para layout (usar Grid Carbon).

## 5. Ícones frequentes

| Contexto | Ícone |
|----------|--------|
| Continuar | `ArrowRight` |
| Concluído | `CheckmarkFilled` |
| Bloqueado | `Locked` |
| Download | `Download` |
| Copiar código | `Copy` |
