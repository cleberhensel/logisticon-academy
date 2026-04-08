# Épico E02 — Catálogo e pedidos (comércio)

**Objetivo de produto:** expor trilhas vendáveis, calcular elegibilidade e criar **pedido** antes do pagamento.

**Artefactos de plano:** [SPEC-02](../specs/SPEC-02-catalogo-pedidos.md) · [User stories (E02)](../user-stories/E02-catalogo-pedidos/) · Tasks [TSK-DEV-008](../tasks/TSK-DEV-008.md) … [TSK-DEV-011](../tasks/TSK-DEV-011.md)

---

## DEV-008 — API e UI catálogo de trilhas públicas

- **Prioridade:** P0  
- **Ref spec:** DISC-01

**Objetivo (dev):** Listar trilhas publicadas com paginação e filtros básicos.

**Escopo técnico**
- **API:** `GET /catalog/tracks?page=&level=&locale=`.
- **DB:** filtrar `status = published` apenas.
- **UI:** grid/lista com imagem, título, nível, CH.

**Critérios de aceite**
- Trilhas em rascunho nunca aparecem na lista pública.
- Metadados de paginação (`total`, `page`, `page_size`).

**Dependências:** trilhas `published` via **seed em desenvolvimento** ou fluxo **DEV-032** (evita dependência circular na documentação).

---

## DEV-009 — Página detalhe trilha e elegibilidade de compra

- **Prioridade:** P0  
- **Ref spec:** DISC-02, DISC-03

**Objetivo (dev):** Exibir syllabus, preço ativo e se o usuário pode comprar.

**Escopo técnico**
- **API:** `GET /catalog/tracks/:slug` e `GET /catalog/tracks/:id/eligibility` (ou campo embutido quando autenticado).
- Resposta: `can_enroll`, `reason` (já matriculado, pré-requisito, sem preço).

**Critérios de aceite**
- Preço exibido = `price` ativo vinculado ao `product` da trilha.
- CTA “Comprar” desabilitado ou oculto quando `can_enroll === false`.

**Dependências:** DEV-008, DEV-010.

---

## DEV-010 — Produto comercial vinculado à trilha e preço Stripe

- **Prioridade:** P0

**Objetivo (dev):** Modelar `products` → `track_id` e `prices` com `stripe_price_id`.

**Escopo técnico**
- **DB:** tabelas `products`, `prices`; constraint 1:1 ou N:1 trilha conforme regra comercial.
- **BO:** tela ou API para associar `stripe_price_id` (E06).

**Critérios de aceite**
- Não é possível criar checkout sem `stripe_price_id` válido configurado.
- Moeda e valor consistentes entre DB e Stripe.

**Dependências:** DEV-028 (trilha existente).

---

## DEV-011 — Criação de pedido e itens

- **Prioridade:** P0  
- **Ref spec:** PUR-01

**Objetivo (dev):** Persistir `order` em `pending_payment` antes de redirecionar ao Stripe.

**Escopo técnico**
- **API:** `POST /commerce/orders` — body: `track_id` ou `product_id`, `coupon_code?`, `utm?`.
- **DB:** `orders`, `order_items`; status inicial `pending_payment`.

**Critérios de aceite**
- Pedido retorna `id` usado como `client_reference_id` na Checkout Session.
- Falha se trilha sem preço ou usuário inelegível (DEV-009).

**Dependências:** DEV-009, DEV-010, DEV-002 (autenticado para compra).

---
