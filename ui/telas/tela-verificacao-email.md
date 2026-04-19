# Tela — Verificação de e-mail

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-AUTH-003` |
| **Rota** | `/verificar-email?token=` ou `/verificar-email/:token` |
| **Shell** | Mínimo |
| **Auth** | Opcional (alguns fluxos verificam já logados) |
| **Happy path** | Passo 4 |
| **User story** | US-E01-004 · DEV-004 |

## Objetivo

Processar **token** de verificação; mostrar **sucesso** ou **erro** com opção de **reenviar** e-mail.

## Fluxos de entrada

1. Utilizador clica link no e-mail → abre esta rota com token.
2. App em mount chama API `POST .../verify` ou `GET` com token (conforme backend).

## Layout

```text
+----------------------------------+
| [Logo pequeno]                   |
|                                  |
|   [ Ícone sucesso / erro ]       |
|   h1: E-mail confirmado          |
|   ou                             |
|   h1: Link inválido ou expirado  |
|                                  |
|   [ Texto explicativo ]          |
|                                  |
|   [ Reenviar e-mail ] (secondary)|
|   [ Ir para início de sessão ]   |
+----------------------------------+
```

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Feedback | `InlineNotification` kind success / error |
| Ações | `Button` primary / secondary |
| Loading inicial | `Loading` pequeno até resposta |

## Estados

| Estado | Conteúdo |
|--------|----------|
| `verifying` | Spinner + “A confirmar o seu e-mail…” |
| `success` | Mensagem de sucesso; CTA “Continuar” → `returnUrl` ou `/learn` ou `/login` |
| `token_expired` | Erro + “Reenviar” (dispara API resend) |
| `token_invalid` | Erro + “Pedir novo link” |

## Reenvio

- Botão “Reenviar e-mail de confirmação”: `POST` com sessão ou e-mail (conforme SPEC).
- **Throttle** na UI: desativar botão 60s após clique; mostrar contagem.

## Acessibilidade

- Resultado anunciado com `role="status"` ou `aria-live`.
- Não depender só da cor do ícone.

## Deep link

- E-mail deve conter URL completa HTTPS; token em query ou path conforme decisão de segurança (path preferível para não vazar em logs de referer em alguns casos).
