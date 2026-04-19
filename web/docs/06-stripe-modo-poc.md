# 06 — Stripe no POC

## Modo escolhido

**Stripe Checkout em modo TEST** com chave **publishable** (`pk_test_...`). Sem servidor exposto — o webhook real não pode chegar à máquina do dev. Substituímos por uma **simulação local** chamada pela própria SPA na landing de sucesso.

## Componentes envolvidos

| Peça | Onde |
|------|------|
| Chave publishable | `environment.ts` → `STRIPE_PUBLISHABLE_KEY` |
| Conta de teste | Configurar depois pela equipa (aguarda decisão de produto) |
| `priceId` por trilha | `mock-api/seed/prices.json` mapeia `trailId → stripePriceId` (`price_test_*`) |
| Loader Stripe.js | `@stripe/stripe-js` em `core/payments/stripe.service.ts` |
| Mock que gera URL | `POST /checkout/session` no mock; pode opcionalmente chamar API Stripe se já houver chave **secret** num `.env` local de quem já configurou conta — caso contrário, devolve `https://checkout.stripe.com/test/...` placeholder e a SPA simula tudo |
| Simulação webhook | `POST /__sim/stripe-webhook` no mock |

## Fluxo

```mermaid
sequenceDiagram
  participant U as Utilizador
  participant SPA as Angular SPA
  participant Mock as Mock API
  participant Stripe as Stripe Checkout

  U->>SPA: Clica "Comprar" no detalhe da trilha
  SPA->>Mock: POST /orders {trailId}
  Mock-->>SPA: { orderId, status: "pending_payment" }
  SPA->>Mock: POST /checkout/session {orderId}
  Mock-->>SPA: { url, sessionId }
  SPA->>Stripe: window.location = url
  U->>Stripe: Paga com cartão de teste 4242 4242 4242 4242
  Stripe-->>U: redirect /checkout/sucesso?session_id=...
  SPA->>Mock: POST /__sim/stripe-webhook { sessionId }
  Mock->>Mock: order.status = paid; cria enrollment
  Mock-->>SPA: { ok: true, enrollmentId }
  SPA->>Mock: GET /orders/:id
  Mock-->>SPA: { status: "paid" }
  SPA-->>U: "Já pode começar a estudar"
```

## Dois sub-modos do `POST /checkout/session`

### Sub-modo A — “Stripe-light” (sem conta configurada)

- Mock devolve URL placeholder (ex.: `http://localhost:4200/__stub/stripe?sessionId=xxx`).
- Página `/__stub/stripe` simula o ecrã Stripe (formulário falso) e redireciona para `/checkout/sucesso?session_id=...`.
- Útil para correr o POC totalmente offline.

### Sub-modo B — “Stripe real test”

- Backend mock recebe `STRIPE_SECRET_KEY` via env local e cria sessão real via SDK `stripe`.
- Devolve `url` real Stripe.
- Activado quando a chave de teste estiver configurada.

A SPA não conhece a diferença — só usa `url`.

**Toggle:** flag `STRIPE_MODE=stub|real` em `mock-api/server.js`.

## Cartões de teste úteis (modo real test)

| Cartão | Cenário |
|--------|---------|
| `4242 4242 4242 4242` | Sucesso |
| `4000 0000 0000 9995` | Fundos insuficientes |
| `4000 0027 6000 3184` | 3D Secure |

Qualquer CVC e data futura.

## Limitações conscientes

- Sem **assinatura** do webhook (não há transito real).
- Sem **idempotência** persistente entre reloads do mock — `db.json` é substituído por seed em `npm run seed:db`.
- Reembolso e ciclo `failed`/`expired` ficam para o backend real.
