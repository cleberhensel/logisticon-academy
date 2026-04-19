# Tela — Validação pública de certificado

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-CERT-PUB-001` |
| **Rota** | `/certificado/verificar` com query `code=` |
| **Shell** | Público minimal |
| **Auth** | **Não** |
| **Happy path** | Passo 18 |
| **User story** | US-E05-005 · DEV-026 |

## Objetivo

Permitir a um **empregador ou terceiro** validar um **código** sem ver **PII** extra além do estritamente necessário para a verificação (alinhar ao DTO da API).

## Princípios

1. **Sem dados sensíveis** não essenciais (ex.: não mostrar email, NIF).
2. Estados claros: **válido**, **inválido**, **revogado**.
3. Formulário simples: um campo código + botão “Verificar”.

## Layout

```text
+------------------------------------------------------------------+
| [Logo] — opcional pequeno                                        |
| h1: Verificar certificado                                        |
| Texto: Introduza o código indicado no certificado PDF.          |
+------------------------------------------------------------------+
| [ Input código ]  [ Verificar ]                                  |
+------------------------------------------------------------------+
| Resultado (após submit):                                         |
|                                                                  |
| VÁLIDO                                                           |
|   Nome da formação                                               |
|   Data de emissão (se permitido pela API)                       |
|   Identificador curto (ex.: iniciais ou hash) — só se API      |
|                                                                  |
| INVÁLIDO                                                         |
|   "Código não encontrado."                                       |
|                                                                  |
| REVOGADO                                                         |
|   "Este certificado foi revogado."                              |
+------------------------------------------------------------------+
```

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Form | `Form`, `TextInput`, `Button` |
| Resultado | `InlineNotification` ou `Tile` com `Tag` de estado |

## Comportamento

- Opcional: pré-preencher `code` via query string para links partilhados.
- **GET** com código na URL pode deixar rasto em logs — preferir **POST** para verificação ou debater com segurança.

## Acessibilidade

- Resultado com `role="status"` ou região `aria-live`.
- Erro de rede distinguível de “código inválido” se API diferenciar.

## Referência

- LGPD mínima e exportação de dados do titular são outro fluxo (E08); esta tela é **só verificação**.
