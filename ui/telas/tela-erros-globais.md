# Telas — Erros globais (403, 404, 500, rede)

## Identificação

| ID | Rota / gatilho | Uso |
|----|----------------|-----|
| `SCR-ERR-404` | `**` wildcard | Recurso inexistente |
| `SCR-ERR-403` | Guard ou resposta API 403 | Sem permissão / sem matrícula |
| `SCR-ERR-500` | Erro não tratado | Falha servidor |
| `SCR-ERR-NET` | Interceptor HTTP | Offline / timeout |

## Objetivo

Comunicar o problema **sem culpar** o utilizador; oferecer **próximo passo** claro (voltar, contacto, retry).

## Layout genérico

```text
+------------------------------------------------------------------+
| [ Ilustração opcional leve ]                                     |
| h1: [Título curto]                                               |
| Parágrafo: 1–2 frases explicativas                               |
| [ Ação primária ]   [ Ação secundária ]                          |
+------------------------------------------------------------------+
```

## 404 — Não encontrado

| Elemento | Conteúdo |
|----------|----------|
| Título | “Página não encontrada” |
| Texto | “O endereço pode estar incorreto ou a página foi movida.” |
| Primário | “Ir para o início” → `/` ou `/trilhas` |
| Secundário | “Contactar suporte” (mailto/link) |

## 403 — Acesso negado

| Contexto | Copy |
|----------|------|
| Sem matrícula | “Não tem acesso a esta formação.” CTA: ver catálogo / comprar |
| Sessão expirada | “A sessão expirou.” CTA: iniciar sessão com `returnUrl` |
| Papel insuficiente | “Não tem permissão para ver esta página.” CTA: início |

## 500 — Erro no servidor

- Título: “Algo correu mal”
- Texto: “Tente novamente dentro de momentos.”
- Botão “Recarregar página”
- Não expor stack trace

## Rede / offline

- `InlineNotification` ou página leve: “Sem ligação à internet”
- Retry automático opcional em pedidos idempotentes GET

## Componentes Carbon

- `Button` primary / tertiary
- `Link`
- Opcional: ilustração SVG neutra (sem dependência pesada)

## Acessibilidade

- `h1` por página de erro
- Código HTTP não precisa ser visível ao utilizador final; útil para suporte em modo debug apenas

## Integração com router Angular

- `data: { title: '...' }` para cada erro
- Manter URL real ou redirecionar para `/erro?code=403` conforme preferência de analytics
