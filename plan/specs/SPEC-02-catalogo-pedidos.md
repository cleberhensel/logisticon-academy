# SPEC-02 — Catálogo e pedidos (comércio)

**Épico:** E02 · **Refs:** `plan/features/epic-02-catalogo-e-pedidos.md`, discovery tópicos 05 (descoberta), 09

## Objetivo
Expor **trilhas** publicadas, detalhe comercial, elegibilidade de compra e criar **pedido** interno antes do Stripe.

## Requisitos funcionais
1. Listagem pública paginada só `status = published`.
2. Detalhe por slug: syllabus, CH, nível, preço ativo, CTA comprar.
3. `can_enroll` + motivo (já matriculado, sem preço, pré-requisito).
4. `products` ligados a `track_id`; `prices` com `stripe_price_id`.
5. `POST` cria `orders` + `order_items` em `pending_payment`; cupom opcional (validação com E03).

## API (sugerida)
| Método | Caminho | Descrição |
|--------|---------|-----------|
| GET | `/api/v1/catalog/tracks` | Lista |
| GET | `/api/v1/catalog/tracks/:slug` | Detalhe |
| GET | `/api/v1/catalog/tracks/:id/eligibility` | Elegibilidade (auth) |
| POST | `/api/v1/commerce/orders` | Criar pedido |

## Entidades
`tracks`, `modules`, `lessons`, `products`, `prices`, `orders`, `order_items`, `coupons` (uso transversal).

## Critérios globais de aceite
- Trilha rascunho invisível no catálogo público.
- Sem `stripe_price_id` ativo → checkout indisponível com mensagem clara.

## Rastreabilidade
**US:** `US-E02-001` … `US-E02-005` · **Tasks:** `TSK-DEV-008` … `TSK-DEV-011`
