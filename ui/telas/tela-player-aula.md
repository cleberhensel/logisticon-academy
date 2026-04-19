# Tela — Player de aula

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-LEARN-003` |
| **Rota** | `/learn/trilhas/:trailId/aulas/:lessonId` |
| **Shell** | Área autenticada |
| **Auth** | Obrigatória + matrícula |
| **Happy path** | Passo 14 |
| **User story** | US-E04-003 · DEV-019 |

## Objetivo

Reproduzir conteúdo da aula (vídeo principalmente), mostrar **título** e **materiais**; registar **progresso** no servidor ao cumprir critério (ex.: percentagem de vídeo ou fim).

## Zonas da interface

```text
+------------------------------------------------------------------+
| [ ← Voltar ao outline ]   Breadcrumb compacto                    |
+------------------------------------------------------------------+
| h1: Título da aula                                               |
| Tags: duração · módulo                                           |
+------------------------------------------------------------------+
| +----------------------------------------------------------------+ |
| |                    ÁREA DE VÍDEO 16:9                        | |
| |  [ LkVideoPlayer ou video nativo + controlos ]                 | |
| +----------------------------------------------------------------+ |
| [Legendas CC] (se ficheiro disponível)                           |
+------------------------------------------------------------------+
| Secção: Sobre esta aula (texto opcional)                         |
+------------------------------------------------------------------+
| Secção: Materiais complementares (P1)                            |
| [ Download ] — US-E04-004 · DEV-020                              |
+------------------------------------------------------------------+
| [ Marcar como concluída ] — apenas se política manual (P1)       |
| ou conclusão automática ao fim do vídeo                          |
+------------------------------------------------------------------+
| Navegação: [ Aula anterior ]  [ Aula seguinte ]                   |
+------------------------------------------------------------------+
```

## Componente `LkVideoPlayer` (custom)

| Requisito | Detalhe |
|-----------|---------|
| Teclado | Space play/pausa; foco visível; não armadilha de foco em fullscreen |
| Progresso | Eventos `timeupdate` → debounce → API patch progresso |
| Conclusão | Ao atingir limiar (ex.: 90%) ou `ended` — **uma** chamada idempotente |
| Legendas | `<track kind="captions">` quando existir URL |

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Navegação | `Button` ghost + ícone `ArrowLeft` |
| Texto | Tipografia padrão |
| Materiais P1 | `Link` com `Download` icon |
| Notificação | `Toast` “Progresso guardado” (opcional, não intrusivo) |

## Estados

| Estado | UI |
|--------|-----|
| Loading aula | Skeleton do player |
| Vídeo indisponível | `InlineNotification` erro |
| Conclusão registada | Indicador na barra ou próximo passo outline |

## Política manual vs automática (P1)

- US-E05-007 / DEV-021: se manual, mostrar botão “Concluir aula” com confirmação se sair sem clicar.

## Acessibilidade

- Vídeo: pelo menos um método de alternativa se só áudio (conforme conteúdo).
- Botões anterior/seguinte com labels “Aula anterior: [título curto]”.
- Ver `UX/happy-paths-mvp-e-criterios-acessibilidade.md` fluxo F-E.

## Referência API

- `PATCH /progress` ou evento dedicado — alinhar à SPEC-04.
