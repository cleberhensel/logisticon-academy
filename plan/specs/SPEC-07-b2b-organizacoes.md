# SPEC-07 — B2B: organizações, assentos e buyer

**IDs DEV:** DEV-044, DEV-045, DEV-046 · **Prioridade:** P2  
**Épico:** E07 · **Origem:** `plan/features/epic-07-b2b-organizacoes.md`, discovery tópico 06 (B2B)

---

## Objetivo

Permitir compra corporativa de vagas, gestão de equipe por **buyer**, convites por e-mail e acompanhamento agregado (sem acesso ao conteúdo das aulas dos colaboradores).

---

## Requisitos funcionais (resumo)

| Área | IDs discovery | Conteúdo |
|------|---------------|----------|
| Pedido org | B2B-01 … B2B-04 | SKU pacote N×trilha, checkout com metadata org, NF/recibo, histórico |
| Assentos | B2B-10 … B2B-13 | Convite, estados, aceite, revogação; 1 assento ↔ 1 matrícula ativa na trilha |
| Relatórios | B2B-20 … B2B-22 | Lista por colaborador, export CSV UTF-8, agregados simples |

---

## Modelo e segurança

- Entidades: `organizations`, `organization_members` (papéis **buyer** vs **member**), `seat_pools`, `invitations`, vínculo com `enrollments` e `source = b2b_seat` quando aplicável.
- **Todas** as queries do buyer filtram por `organization_id` do token (multi-tenant).
- Buyer: métricas e status apenas; **não** expor conteúdo pedagógico das aulas.

---

## Critérios transversais

- Convite **expirado** devolve assento ao pool (regra MVP alinhada ao épico).
- CSV: colunas fixas documentadas; encoding UTF-8.
- Dependências técnicas: identidade (E01), catálogo/pedido/pagamento (E02/E03), matrícula (E03/E04), progresso/certificado (E04/E05), e-mail transacional (E08 / DEV-047).

---

## Mapeamento DEV → esta SPEC

| DEV | Escopo |
|-----|--------|
| DEV-044 | CRUD org + membros; escopo JWT |
| DEV-045 | Pool, convites, consumo de assento na matrícula |
| DEV-046 | Painel buyer + `GET` export CSV |
