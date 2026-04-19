# 03 — Mock BFF (json-server + handlers custom)

## Arquitetura

- `json-server` em **modo programático** dentro de [`mock-api/server.js`](../mock-api/server.js).
- Rotas REST simples derivadas de `db.json`.
- Rotas com **lógica** (criar pedido, simular webhook, embaralhar quiz, emitir certificado) são definidas como **middlewares Express** antes do handler do json-server.
- Latência simulada (`~120ms`) para tornar UI realista.

## Esquema do `db.json`

```jsonc
{
  "users": [
    {
      "id": "usr_demo",
      "email": "demo@logistikon.test",
      "passwordHash": "demo123",
      "name": "Aluno Demo",
      "emailVerifiedAt": "2026-04-19T10:00:00Z",
      "roles": ["student"]
    }
  ],
  "trails": [
    {
      "id": "trl_fundamentos",
      "slug": "fundamentos-logistica-empresarial",
      "title": "Fundamentos da Logística Empresarial",
      "summary": "Supply chain, transporte, armazenagem e planejamento.",
      "level": "Foundation",
      "language": "pt-PT",
      "durationHours": 12,
      "status": "published",
      "stripePriceId": "price_test_fundamentos",
      "modules": [
        {
          "id": "mod_01",
          "title": "Fundamentos da Logística Empresarial",
          "order": 1,
          "lessons": [
            { "id": "les_01", "title": "Conceitos e papel da logística", "durationMin": 60, "mdPath": "trilha-fundamentos-e-estrategia/modulo-01-fundamentos-logistica-empresarial/aula-01-conceitos-papel-logistica.md" }
          ]
        }
      ]
    }
  ],
  "prices": [
    { "id": "price_test_fundamentos", "amountCents": 9900, "currency": "EUR" }
  ],
  "orders": [],
  "enrollments": [],
  "progress": [],
  "quiz_attempts": [],
  "certificates": []
}
```

> **Trilhas reais** vêm de [`aulas/trilhas.md`](../../aulas/trilhas.md); o `seed/trails.json` é gerado a partir do `index.json` produzido pelo script `sync-aulas`.

## Endpoints

### Auth (E01)

| Verbo | Rota | Body | Resposta |
|-------|------|------|----------|
| POST | `/auth/register` | `{ email, password, name }` | `201 { user, accessToken, refreshToken }` ou `409` neutro |
| POST | `/auth/login` | `{ email, password }` | `200 { user, accessToken, refreshToken }` ou `401` |
| POST | `/auth/verify-email` | `{ token }` | `200 { ok }` ou `400` |
| POST | `/auth/resend-verification` | `{ email }` | `202 { ok }` (sempre neutro) |
| GET | `/auth/me` | — | `200 { user }` se Authorization válido |

**Fake JWT:** payload base64 com `{ sub, roles, exp }`; sem assinatura criptográfica (POC).

### Catálogo e pedidos (E02)

| Verbo | Rota | Resposta |
|-------|------|----------|
| GET | `/trails?status=published&page=1&pageSize=12` | `{ items, total, page, pageSize }` |
| GET | `/trails/:slug` | trilha com módulos preview |
| GET | `/trails/:slug/eligibility` | `{ canEnroll, reason }` (se já inscrito → false) |
| POST | `/orders` | `{ id, status: "pending_payment", trailId }` |
| GET | `/orders/:id` | estado do pedido |

### Pagamentos (E03)

| Verbo | Rota | Notas |
|-------|------|-------|
| POST | `/checkout/session` | cria registo `checkout_sessions` com URL real Stripe; devolve `{ url }` |
| POST | `/__sim/stripe-webhook` | **simulação local**; recebe `{ sessionId }`, marca order paid + cria enrollment + dispara “e-mail” em log |

### Área do aluno (E04)

| Verbo | Rota | Resposta |
|-------|------|----------|
| GET | `/enrollments` | matrículas do utilizador autenticado |
| GET | `/enrollments/:trailId/outline` | árvore + estado por aula (`locked`/`available`/`completed`) |
| PATCH | `/enrollments/:trailId/lessons/:lessonId/progress` | `{ percent, completed }` |

### Quiz (E05)

| Verbo | Rota | Resposta |
|-------|------|----------|
| POST | `/modules/:moduleId/quiz/start` | `{ attemptId, questions: [...sem gabarito], attemptsLeft, maxAttempts }` |
| POST | `/quiz/attempts/:attemptId/submit` | `{ approved, score, attemptsLeft }` |

### Certificados (E05)

| Verbo | Rota | Resposta |
|-------|------|----------|
| POST | `/enrollments/:trailId/certificate` | `{ id, code, issuedAt, pdfUrl }` se elegível |
| GET | `/certificates/verify?code=` | `{ status: "valid"\|"revoked"\|"not_found", trailTitle?, issuedAt? }` |

## Convenção de erro

```json
{ "error": { "code": "ENROLLMENT_REQUIRED", "message": "..." } }
```

Códigos referenciados em [`ui/04-estados-feedback-e-copy.md`](../../ui/04-estados-feedback-e-copy.md).

## Script de boot do mock

```js
// mock-api/server.js (esqueleto)
import jsonServer from 'json-server';
import path from 'node:path';
const server = jsonServer.create();
const router = jsonServer.router(path.resolve('mock-api/db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, _res, next) => setTimeout(next, 120));

// custom routes (auth, orders, checkout, quiz, certificates) ...

server.use(router);
server.listen(4300, () => console.log('Mock API on http://localhost:4300'));
```

## Reset do mock

`npm run seed:db` substitui `mock-api/db.json` pelo merge dos `seed/*.json`.
