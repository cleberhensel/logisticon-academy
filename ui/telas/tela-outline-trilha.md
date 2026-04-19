# Tela — Outline da trilha (módulos e aulas)

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-LEARN-002` |
| **Rota** | `/learn/trilhas/:trailId` (ou `.../outline`) |
| **Shell** | Área autenticada |
| **Auth** | Obrigatória |
| **Happy path** | Passo 13 |
| **User story** | US-E04-002 · DEV-019 |

## Objetivo

Navegar **módulos** e **aulas** em sequência; mostrar estado **concluído / em curso / bloqueado**; sem matrícula → **403** (não mostrar conteúdo).

## Dados

| Elemento | Descrição |
|----------|-----------|
| Árvore módulos → aulas | API outline |
| Estado por aula | `locked`, `available`, `completed` |
| Quiz por módulo | Link para quiz quando aulas obrigatórias concluídas |

## Layout desktop

```text
+------------------------------------------------------------------+
| Breadcrumb: Início > As minhas formações > [Trilha]               |
| h1: [Nome da trilha]                                             |
| ProgressBar global (opcional)                                    |
+------------------------------------------------------------------+
| SideNav (esq)              |  Área principal (opcional)          |
| Módulo 1                   |  "Selecione uma aula à esquerda"   |
|  Aula 1.1 ✓                |  ou resumo da trilha               |
|  Aula 1.2 →                |                                    |
| Módulo 2                   |                                    |
|  Aula 2.1 (locked)         |                                    |
+------------------------------------------------------------------+
```

## Layout mobile

- `Accordion` por módulo com lista de aulas.
- Cada aula é `Link` ou `Button` que navega para player.

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Navegação | `SideNav` + `SideNavLink` ou `Accordion` |
| Estado | `Tag` “Concluído”, ícone `Checkmark` / `Locked` |
| Progresso | `ProgressBar` no topo |

## Regras de bloqueio (UI)

| Estado | Ícone | Ação |
|--------|-------|------|
| Concluído | Check verde (token `$support-success`) | Link para rever |
| Disponível | — | Abre player |
| Bloqueado | `Locked` | `disabled` + tooltip “Complete a aula anterior” |

*(Lógica exata pode vir do backend — UI reflete só o DTO.)*

## Quiz

- Ao final do módulo, linha destacada: **“Avaliação do módulo X”** com estado `available` após pré-requisitos.

## Estados de página

| Estado | UI |
|--------|-----|
| 403 | Redirecionar para `tela-erros-globais` ou página “Sem acesso” com CTA compra |
| Loading | Skeleton do nav |
| Erro | `InlineNotification` |

## Acessibilidade

- `SideNav` com `aria-label="Estrutura da formação"`.
- Ícones decorativos com `aria-hidden="true"`.
