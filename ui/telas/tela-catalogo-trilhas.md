# Tela — Catálogo de trilhas

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-CATALOG-001` |
| **Rota** | `/trilhas` |
| **Shell** | Público |
| **Auth** | Não obrigatória |
| **Happy path** | Passo 1 (`UX/happy-paths-mvp-e-criterios-acessibilidade.md`, secção 5.1) |
| **User story** | US-E02-001 · DEV-008 |

## Objetivo

Permitir que **visitante ou aluno** veja **apenas trilhas publicadas**, em **lista paginada**, para escolher formação.

## Dados de entrada (UI)

| Fonte | Descrição |
|-------|-----------|
| API | Lista de trilhas `published`; metadados de paginação |
| Query | `page`, `pageSize` (opcional) |

## Estrutura da página (zonas)

```text
+------------------------------------------------------------------+
| [Header público]                                                  |
+------------------------------------------------------------------+
| h1: Formações                                                     |
| Texto introdutório opcional (1 linha)                           |
+------------------------------------------------------------------+
| [ Filtros futuros: placeholder invisível ou desativado no MVP ]   |
+------------------------------------------------------------------+
| +----------+ +----------+ +----------+                          |
| |  Card    | |  Card    | |  Card    |   (grelha responsiva)     |
| +----------+ +----------+ +----------+                          |
+------------------------------------------------------------------+
| [ Pagination ]                                                  |
+------------------------------------------------------------------+
| [Footer]                                                         |
+------------------------------------------------------------------+
```

## Componentes Carbon (obrigatórios)

| Zona | Componentes |
|------|-------------|
| Título | `Heading` nível 1 |
| Lista | `Row` / `Column`; cada item `ClickableTile` ou `LkTrailCard` |
| Paginação | `Pagination` (variant unstyled ou default) |
| Loading | `SkeletonText` em cartões |
| Vazio | `Tile` com mensagem + ícone opcional |

## Conteúdo de cada cartão (trilha)

| Elemento | Obrigatório | Fonte de dados |
|----------|-------------|----------------|
| Título | Sim | `title` |
| Resumo curto | Sim (1–2 linhas) | `summary` ou `shortDescription` |
| Tags | Recomendado | Nível, idioma, área temática |
| Carga horária | Recomendado | `durationHours` |
| Preço (desde) | Se existir preço ativo | API catálogo |
| Estado “Indisponível” | Se sem preço | US-E02-002 |

**Interação:** clique no cartão → navegação para `/trilhas/:slug`.

## Estados

| Estado | Comportamento |
|--------|----------------|
| **Loading** | Skeleton de 6 cartões |
| **Sucesso com dados** | Grelha + paginação |
| **Sucesso vazio** | Empty state (ver `04-estados-feedback-e-copy.md`) |
| **Erro** | `InlineNotification` + retry |

## Acessibilidade

- `h1` único: “Formações” ou “Catálogo de formações”.
- Cartões clicáveis: se usar `ClickableTile`, garantir título focável; se `Link` envolver cartão, não duplicar leitura.
- Paginação: labels acessíveis nos botões anterior/seguinte.

## Eventos API (referência)

| Método | Endpoint (exemplo) |
|--------|---------------------|
| GET | `/api/v1/trails?status=published&page=1` |

*(Contrato exato na SPEC-02 e OpenAPI.)*

## Critérios de aceite visuais

- [ ] Nenhum rascunho ou trilha não publicada visível.
- [ ] Paginação não quebra com 1 página ou muitas páginas.
- [ ] Layout estável em 320px de largura.
