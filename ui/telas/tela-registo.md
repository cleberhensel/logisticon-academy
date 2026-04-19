# Tela — Registo de conta

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-AUTH-001` |
| **Rota** | `/registo` |
| **Shell** | Público (centrado) |
| **Auth** | Não (objetivo é criar sessão) |
| **Happy path** | Passo 3 |
| **User story** | US-E01-001 · DEV-001 |

## Objetivo

Criar conta com **e-mail** e **palavra-passe**; feedback para **verificar e-mail** conforme política.

## Campos

| Campo | Tipo | Validação UI |
|-------|------|--------------|
| E-mail | `Input` type email | Obrigatório; formato válido |
| Palavra-passe | `PasswordInput` | Obrigatório; política mínima (comprimento, caracteres — alinhar ao backend) |
| Confirmar palavra-passe | `PasswordInput` | Igual à palavra-passe |
| Termos (se obrigatório legalmente) | `Checkbox` | Obrigatório para submit |

## Layout

```text
+----------------------------------+
| [Logo]                           |
| h1: Criar conta                  |
| Texto: Já tem conta? [Iniciar sessão]
+----------------------------------+
| [ Form ]                         |
|  E-mail                          |
|  Palavra-passe                   |
|  Confirmar                       |
|  [ ] Aceito os termos            |
|  [ Criar conta - primary ]       |
+----------------------------------+
| [ InlineNotification sucesso ]   |  (após submit)
+----------------------------------+
```

## Componentes Carbon

| Peça | Componente |
|------|------------|
| Formulário | `Form`, `FormItem`, `Input`, `PasswordInput` |
| Erro campo | `invalid` + `invalidText` |
| Botão | `Button` kind="primary" |
| Sucesso | `InlineNotification` kind="success" (mensagem neutra) |

## Estados

| Estado | Comportamento |
|--------|----------------|
| Idle | Formulário editável |
| Submitting | `InlineLoading` no botão; campos desativados |
| Sucesso | Mensagem: “Verifique o seu e-mail para continuar…” (se aplicável) |
| Erro e-mail duplicado | Copy anti-enumeração (alinhar backend); sugerir login |
| Erro genérico | `InlineNotification` danger |

## Navegação pós-sucesso

- Se `returnUrl` presente: após verificação de e-mail (ou imediato se não exigir) → redirecionar.
- Se fluxo compra: voltar para detalhe da trilha ou iniciar pedido.

## Acessibilidade

- Autocomplete: `email`, `new-password`.
- Erros ligados ao campo com `aria-describedby`.
- Não revelar em mensagem se o e-mail “existe” de forma agressiva (UX + segurança).

## Referências

- `04-estados-feedback-e-copy.md` — anti-enumeração.
