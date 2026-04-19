# Mapas de rotas e deep links (MVP)

Convenções **sugeridas** para o repositório Angular; alinhar com `path` reais da API quando implementados.

## 1. Prefixos

| Prefixo | Significado |
|---------|-------------|
| `/` | Público (sem auth obrigatória) |
| `/app` ou `/learn` | Área autenticada (escolher **um**; exemplos abaixo usam `/learn`) |

## 2. Rotas públicas

| Rota | Tela | Parâmetros |
|------|------|------------|
| `/` | Redireciona para `/trilhas` ou landing mínima | — |
| `/trilhas` | Catálogo | `?page=` `?tag=` (opcional futuro) |
| `/trilhas/:slug` | Detalhe da trilha | `slug` |
| `/registo` | Registo | `?returnUrl=` |
| `/login` | Login | `?returnUrl=` |
| `/verificar-email` | Verificação | `?token=` (ou segmento) |
| `/certificado/verificar` | Validação pública | query `?code=` ou rota `/certificado/verificar/:code` |

## 3. Rotas pós-pagamento (Stripe)

Stripe redireciona para URLs configuradas na Checkout Session.

| Rota | Tela |
|------|------|
| `/checkout/sucesso` | Retorno positivo (consulta API) |
| `/checkout/cancelado` | Utilizador cancelou no Stripe |

**Query params sugeridos:** `session_id` (Stripe) para correlacionar com pedido.

## 4. Rotas autenticadas (aluno)

| Rota | Tela | Parâmetros |
|------|------|------------|
| `/learn` | Dashboard | — |
| `/learn/trilhas/:trailId` | Outline (ou redirect) | UUID ou slug |
| `/learn/trilhas/:trailId/modulos/:moduleId` | Outline focado no módulo | — |
| `/learn/trilhas/:trailId/aulas/:lessonId` | Player | — |
| `/learn/trilhas/:trailId/modulos/:moduleId/quiz` | Quiz | — |
| `/learn/trilhas/:trailId/certificado` | Certificado obtido | — |

**Nota:** unificar `trailId` como slug ou id — **uma** convenção em todo o projeto.

## 5. Deep links críticos

| Link | Comportamento |
|------|----------------|
| `https://.../trilhas/sap-logistica` | Partilha social; abre detalhe |
| `https://.../certificado/verificar?code=XXXX` | Empregador valida sem login |

## 6. Guards (resumo)

| Rota | Guard |
|------|--------|
| `/learn/*` | `AuthGuard` |
| `.../aulas/:lessonId` | `EnrollmentGuard` + matrícula ativa |
| `.../quiz` | `EnrollmentGuard` |

## 7. Diagrama Mermaid — mapa de rotas

```mermaid
flowchart TB
  subgraph public["Público"]
    A[/trilhas]
    B[/trilhas/:slug]
    C[/login]
    D[/registo]
    E[/checkout/sucesso]
    F[/certificado/verificar]
  end
  subgraph auth["Autenticado /learn"]
    G[/learn]
    H[/learn/trilhas/:id/outline]
    I[/learn/.../aulas/:lessonId]
    J[/learn/.../quiz]
    K[/learn/.../certificado]
  end
  A --> B
  C --> G
  B -->|Comprar| E
  G --> H --> I --> J --> K
```

## 8. Redirecionamento pós-login

- Guardar `returnUrl` codificado; após login bem-sucedido, navegar para `returnUrl` se for rota interna permitida; senão `/learn`.
