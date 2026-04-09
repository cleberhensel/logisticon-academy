# Épico E07 — B2B (organizações, assentos, convites)

**Objetivo de produto:** permitir que um **buyer** compre pacotes de vagas, convide colaboradores e acompanhe progresso — **fase posterior** ao MVP B2C (prioridade P2 no registro).

**Artefactos de plano:** [SPEC-07](../specs/SPEC-07-b2b-organizacoes.md) · [User stories (E07)](../user-stories/E07-b2b/) · Tasks [TSK-DEV-044](../user-stories/E07-b2b/US-E07-001/tasks/TSK-DEV-044.md) … [TSK-DEV-046](../user-stories/E07-b2b/US-E07-003/tasks/TSK-DEV-046.md)

---

## DEV-044 — Entidade organização e vínculo de membros

- **Prioridade:** P2  
- **Ref spec:** B2B, tópico 06

**Objetivo (dev):** CRUD mínimo de `organizations` e `organization_members` com papel `buyer` vs `member`.

**Escopo técnico**
- **API:** `POST /admin/organizations` ou self-serve signup corporativo (definir).
- Associar `user_id` a `organization_id` com role.

**Critérios de aceite**
- Queries do buyer sempre filtram `organization_id` do token.

**Dependências:** DEV-007, DEV-006.

---

## DEV-045 — Pool de assentos e convites por e-mail

- **Prioridade:** P2  
- **Ref spec:** B2B-10 … B2B-13

**Objetivo (dev):** Após pedido corporativo pago, criar N assentos; enviar convite com token; ao aceitar, criar `enrollment` e consumir assento.

**Escopo técnico**
- Tabelas: `seat_pools`, `invitations` (estados pending/accepted/expired/revoked).
- Reutilizar DEV-014 para “liberar acesso” com `source = b2b_seat`.

**Critérios de aceite**
- Convite expirado libera assento de volta ao pool (regra MVP).
- Mesmo fluxo de matrícula que B2C para consistência (nota tópico 10).

**Dependências:** DEV-044, DEV-012/DEV-014 (pagamento corporativo modelado), DEV-047.

---

## DEV-046 — Painel buyer e export CSV de progresso

- **Prioridade:** P2  
- **Ref spec:** B2B-20 … B2B-22

**Objetivo (dev):** UI/API para buyer ver colaboradores, % progresso, status, certificado emitido; `GET /org/reports/export.csv`.

**Critérios de aceite**
- CSV UTF-8; colunas fixas documentadas.
- Buyer não acessa conteúdo das aulas (apenas métricas).

**Dependências:** DEV-045, DEV-018, DEV-025.

---
