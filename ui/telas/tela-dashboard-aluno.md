# Tela — Dashboard do aluno

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-LEARN-001` |
| **Rota** | `/learn` |
| **Shell** | Área autenticada |
| **Auth** | Obrigatória |
| **Happy path** | Passo 12 |
| **User story** | US-E04-001 · DEV-018 |

## Objetivo

Mostrar **matrículas ativas** com **progresso percentual** por trilha; ponto de entrada para **continuar** a estudar.

## Dados

| Elemento | Fonte |
|----------|--------|
| Lista de trilhas matriculadas | API `GET /enrollments` ou equivalente |
| Progresso % | `progressPercent` |
| Última aula (P1) | US-E04-005 — seção opcional “Continuar” |

## Layout

```text
+------------------------------------------------------------------+
| [Header área do aluno]                                            |
+------------------------------------------------------------------+
| h1: As minhas formações                                         |
| Texto introdutório opcional                                      |
+------------------------------------------------------------------+
| +------------------------+ +------------------------+          |
| | Tile / Card            | | Tile / Card            |          |
| | [Thumb opcional]       | |                        |          |
| | Título trilha          | |                        |          |
| | [ProgressBar]  67%     | |                        |          |
| | [ Continuar ]          | |                        |          |
| +------------------------+ +------------------------+          |
+------------------------------------------------------------------+
```

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Cartão | `Tile` ou `ClickableTile` |
| Progresso | `ProgressBar` com label `aria-valuenow` |
| Ação | `Button` “Continuar” ou `Link` |

## Estados

| Estado | UI |
|--------|-----|
| Loading | Skeleton de 3 cartões |
| Vazio | Empty state “Ainda não está inscrito…” + CTA catálogo |
| Sucesso | Grelha responsiva |

## Interações

- Clicar em “Continuar” → última aula (P1) ou outline (`/learn/trilhas/:id`).

## Acessibilidade

- **Percentagem** também em texto visível: “Progresso: 67%”.
- Cartões com foco visível; ordem de tab lógica.

## P1 (referência)

| Funcionalidade | Documento |
|----------------|-----------|
| “Continuar de onde parou” | US-E04-005 — adicionar linha no cartão quando `lastLessonId` existir |
