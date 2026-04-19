# Tela — Início de sessão

## Identificação

| Campo | Valor |
|-------|--------|
| **ID de tela** | `SCR-AUTH-002` |
| **Rota** | `/login` |
| **Shell** | Público (centrado) |
| **Auth** | Não |
| **Happy path** | Passo 5 |
| **User story** | US-E01-002 · DEV-002 |

## Objetivo

Autenticar utilizador; emitir **tokens** e **claims** (roles); redirecionar para `returnUrl` ou `/learn`.

## Campos

| Campo | Tipo | Validação |
|-------|------|-----------|
| E-mail | `Input` | Obrigatório |
| Palavra-passe | `PasswordInput` | Obrigatório |

## Layout

```text
+----------------------------------+
| [Logo]                           |
| h1: Iniciar sessão               |
| Sem conta? [Criar conta]         |
+----------------------------------+
| [ Form ]                         |
|  E-mail                          |
|  Palavra-passe                   |
|  [ Esqueci a palavra-passe ]     |  <- P1; MVP: link opcional ou "Em breve"
|  [ Entrar - primary ]            |
+----------------------------------+
```

## Componentes Carbon

`Form`, `FormItem`, `Input`, `PasswordInput`, `Button`, `Link`, `InlineNotification`.

## Estados

| Estado | UI |
|--------|-----|
| Submitting | Botão com loading |
| Erro credenciais | `InlineNotification` ou mensagem genérica “Credenciais inválidas” (401) |
| Sucesso | Redirect imediato |

## Segurança (UI)

- Não mostrar qual campo falhou além do genérico (evitar enumeração).
- Rate limit: se backend devolver 429, mensagem “Muitas tentativas. Tente mais tarde.”

## Acessibilidade

- `h1` único na vista.
- Foco movido para primeiro erro ou para `main` após redirect (gestão no router).

## Nota MVP

| Funcionalidade | Prioridade no plano |
|----------------|---------------------|
| Esqueci palavra-passe | `DEV-005` **P1** — pode ser link inativo ou omitido até implementação |
