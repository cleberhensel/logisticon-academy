# Tela — Certificado e conclusão (área do aluno)

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-CERT-001` |
| **Rota** | `/learn/trilhas/:trailId/certificado` |
| **Shell** | Área autenticada |
| **Auth** | Obrigatória |
| **Happy path** | Passo 17 |
| **User stories** | US-E05-004 · DEV-025 |

## Objetivo

Quando o **motor de regras** emitir certificado: mostrar **confirmação**, **código único**, **download PDF**, instruções de **partilha** e link para **validação pública**.

## Pré-condição

- Requisitos da trilha cumpridos; se não, **não** mostrar certificado (mensagem “Ainda falta…” com checklist resumido).

## Layout

```text
+------------------------------------------------------------------+
| h1: Parabéns! Concluiu a formação                               |
| Ilustração opcional (leve)                                       |
+------------------------------------------------------------------+
| Tile destacado                                                    |
|   Nome da formação                                               |
|   Nome do aluno (como no certificado)                          |
|   Data de emissão                                                |
|   [ Código de verificação ]  [ Copiar ]  (LkCertificateCode)    |
+------------------------------------------------------------------+
| [ Descarregar PDF - primary ]                                    |
| [ Partilhar ] (Web Share API ou copiar link de verificação)      |
+------------------------------------------------------------------+
| Link: "Como validar o certificado" -> âncora ou modal             |
+------------------------------------------------------------------+
```

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Cartão | `Tile` |
| Código | `CodeSnippet` type single ou texto monoespaçado |
| Botões | `Button`, `Button` ghost para copiar |
| Alertas | `InlineNotification` se nome incorreto (fluxo exceção — backoffice) |

## Dados exibidos

| Campo | Fonte |
|-------|--------|
| Título da trilha | API |
| Nome do titular | Conforme perfil/certificado |
| Código alfanumérico | Único |
| URL de validação | `origin + /certificado/verificar?code=` |

## Estados

| Estado | UI |
|--------|-----|
| Ainda não elegível | Lista do que falta (módulos/quiz) |
| Emitido | Layout acima |
| Erro geração | `InlineNotification` + contacto suporte |

## PDF

- Download via link assinado ou blob — botão com `download` attribute quando possível.
- Nome do ficheiro sugerido: `Certificado-[Trilha]-[Ano].pdf`

## P1 relacionado

| Funcionalidade | Nota |
|----------------|------|
| Listagem “Meus certificados” | US-E05-006 — página adicional futura |

## Acessibilidade

- Código legível; botão copiar com feedback textual “Copiado”.
- Não depender só da cor para estado de sucesso.
