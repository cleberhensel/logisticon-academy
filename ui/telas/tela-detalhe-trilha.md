# Tela — Detalhe da trilha

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-CATALOG-002` |
| **Rota** | `/trilhas/:slug` |
| **Shell** | Público |
| **Auth** | Opcional (para CTA “Comprar”) |
| **Happy path** | Passos 2, 6–7 (elegibilidade + pedido) |
| **User stories** | US-E02-002 · US-E02-003 · DEV-009 · DEV-011 |

## Objetivo

Mostrar **syllabus**, **preço**, **nível**, **carga horária** e **critérios de certificação**; permitir **compra** se elegível e com preço ativo.

## Dados de entrada

| Parâmetro | Descrição |
|-----------|-----------|
| `slug` | Identificador da trilha na URL |

Chamadas adicionais se autenticado: **elegibilidade** (`can_enroll`, motivo).

## Estrutura da página (zonas)

```text
+------------------------------------------------------------------+
| [Breadcrumb] Início > Trilhas > [Nome da trilha]                  |
+------------------------------------------------------------------+
| Coluna principal (8)              | Coluna lateral (4)          |
|-------------------------------------+------------------------------|
| h1 [Título]                         | [Card resumo]                |
| Tags · CH · Nível                   | Preço                        |
| Parágrafo introdutório              | Botão Comprar / Já inscrito  |
|                                     | Confiança (garantia, NF*)     |
|-------------------------------------|------------------------------|
| Secção: O que vai aprender          |                              |
| Lista / rich text                   |                              |
|-------------------------------------|------------------------------|
| Secção: Módulos (preview)           |                              |
| Accordion ou lista numerada         |                              |
|-------------------------------------|------------------------------|
| Secção: Certificação                |                              |
| Requisitos em texto                 |                              |
+------------------------------------------------------------------+
```

## Componentes Carbon

| Zona | Componentes |
|------|-------------|
| Breadcrumb | `Breadcrumb`, `BreadcrumbItem` |
| Título | `Heading` |
| Tags | `Tag` (vários) |
| Conteúdo longo | Tipografia Carbon + listas |
| Sidebar | `Tile` com `Button` primary |
| Módulos | `Accordion`, `AccordionItem` |

## Estados do CTA principal

| Condição | Botão | Comportamento |
|----------|--------|---------------|
| Não autenticado + elegível + preço ativo | “Comprar” | → login com `returnUrl` ou fluxo registo → pedido |
| Autenticado + elegível + preço ativo | “Comprar” | → criar pedido → redirect Stripe |
| Autenticado + `can_enroll=false` (já matriculado) | “Ir para formação” | → `/learn/trilhas/...` |
| Sem preço ativo | `Button` disabled + texto | US-E02-002 |
| Autenticado + não verificado (se política exigir) | “Verificar e-mail” | link para fluxo de verificação |

## Estados de página

| Estado | UI |
|--------|-----|
| Loading | Skeleton para título + colunas |
| 404 | Página de trilha não encontrada (`tela-erros-globais.md`) |
| Erro API | `InlineNotification` |

## Acessibilidade

- Hierarquia: `h1` único; `h2` por secção (“O que vai aprender”, “Módulos”, “Certificação”).
- Preço anunciado com contexto: “Preço: 99 EUR” (exemplo).
- Botão desabilitado com `aria-disabled` e texto explicativo visível.

## Referências API (UI)

| Conceito | Uso na UI |
|----------|-----------|
| `stripe_price_id` presente | Habilitar compra quando elegível |
| `can_enroll` | Alterar CTA e mensagem |

## Observações

- *NF: mencionar apenas se copy legal aprovada; senão omitir no MVP.
