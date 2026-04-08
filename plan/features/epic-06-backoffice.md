# Épico E06 — Backoffice

**Objetivo de produto:** operar conteúdo, pessoas, financeiro, certificados e suporte **sem deploy** de código.

**Artefactos de plano:** [SPEC-06](../specs/SPEC-06-backoffice.md) · [User stories (E06)](../user-stories/E06-backoffice/) · Tasks [TSK-DEV-028](../tasks/TSK-DEV-028.md) … [TSK-DEV-042](../tasks/TSK-DEV-042.md)

---

## DEV-028 — CRUD trilha, módulo e aula

- **Prioridade:** P0  
- **Ref spec:** CMS-01

**Objetivo (dev):** APIs e UI protegidas para criar/editar hierarquia acadêmica.

**Escopo técnico**
- **API:** `/admin/tracks`, `/admin/modules`, `/admin/lessons` (nomes exemplificativos).
- Campos: título, slug, locale, nível, tipo de aula (`video`, `text`, `mixed`), referência de mídia.

**Critérios de aceite**
- Slug único por locale (ou global, conforme regra).
- Apenas papel instrutor/admin.

**Dependências:** DEV-006.

---

## DEV-029 — Ordenação de módulos e aulas

- **Prioridade:** P1  
- **Ref spec:** CMS-02

**Objetivo (dev):** Persistir `sort_order` via drag-and-drop no BO.

**Escopo técnico**
- **API:** `PATCH` batch ordem ou endpoints dedicados.

**Critérios de aceite**
- Ordem refletida imediatamente no catálogo e na área do aluno.

**Dependências:** DEV-028.

---

## DEV-030 — CRUD quiz e banco de questões

- **Prioridade:** P0  
- **Ref spec:** CMS-03

**Objetivo (dev):** Associar quiz a módulo; perguntas múltipla escolha; mínimo uma opção correta.

**Escopo técnico**
- **API:** `/admin/quizzes`, questões e opções embutidas ou sub-recurso.
- Preview no BO antes de publicar.

**Critérios de aceite**
- Quiz sem questão ou sem resposta correta não pode ser publicado junto à trilha (validação).

**Dependências:** DEV-028.

---

## DEV-031 — Rubrica de projeto

- **Prioridade:** P2  
- **Ref spec:** CMS-04

**Objetivo (dev):** Definir critérios ponderados (soma 100%) para correção de `assignment`.

**Escopo técnico**
- Modelo `rubric_criteria` ligado à trilha ou assignment.

**Critérios de aceite**
- Instrutor atribui nota por critério; gera nota final.

**Dependências:** DEV-028, DEV-024.

---

## DEV-032 — Publicar e despublicar trilha

- **Prioridade:** P0  
- **Ref spec:** CMS-05

**Objetivo (dev):** Transição de estado `draft` ↔ `published` com validações.

**Escopo técnico**
- Validar: ao menos um módulo, aulas publicáveis, preço configurado se `sellable`.

**Critérios de aceite**
- Trilha publicada aparece em DEV-008; despublicada some do catálogo, matrículas existentes mantidas (política documentada).

**Dependências:** DEV-028, DEV-010.

---

## DEV-033 — Busca e listagem de usuários no BO

- **Prioridade:** P1  
- **Ref spec:** USR-01

**Objetivo (dev):** Listar usuários com filtro por e-mail/nome e paginação.

**Escopo técnico**
- **API:** `GET /admin/users?q=&page=`.

**Critérios de aceite**
- Performance aceitável com índice em email.

**Dependências:** DEV-006.

---

## DEV-034 — Atribuição de papéis e auditoria

- **Prioridade:** P0  
- **Ref spec:** USR-02

**Objetivo (dev):** Adicionar/remover `user_roles`; registrar em `audit_logs`.

**Escopo técnico**
- **API:** `POST /admin/users/:id/roles`.

**Critérios de aceite**
- Entrada em audit: actor_id, target_id, old, new, timestamp.
- Apenas admin (ou política definida).

**Dependências:** DEV-033, DEV-007.

---

## DEV-035 — Bloqueio de conta e invalidação de sessão

- **Prioridade:** P1  
- **Ref spec:** USR-03

**Objetivo (dev):** Flag `blocked_at`; impedir login e invalidar refresh tokens.

**Critérios de aceite**
- Usuário bloqueado recebe 403 em todas as rotas autenticadas.

**Dependências:** DEV-002, DEV-033.

---

## DEV-036 — Lista e detalhe de pedidos no BO

- **Prioridade:** P0  
- **Ref spec:** FIN-01, FIN-02

**Objetivo (dev):** Operador vê pedidos com filtros e detalhe (itens, usuário, Stripe ids, cupom).

**Escopo técnico**
- **API:** `GET /admin/orders`, `GET /admin/orders/:id`.

**Dependências:** DEV-011, DEV-006 (financeiro role).

---

## DEV-037 — Reembolso via Stripe e atualização de acesso

- **Prioridade:** P1  
- **Ref spec:** FIN-03, §8.5

**Objetivo (dev):** Ação no BO chama `stripe.refunds.create`; atualiza `order` e `enrollment` (suspender/revogar).

**Critérios de aceite**
- Reembolso total → acesso removido conforme política.
- Reembolso parcial → regra única documentada + campo `note`.

**Dependências:** DEV-036, DEV-014, permissão financeiro.

---

## DEV-038 — CRUD de cupons no BO

- **Prioridade:** P1  
- **Ref spec:** FIN-04

**Objetivo (dev):** Criar cupom com código, tipo, valor, validade, limite de usos.

**Dependências:** DEV-016 (uso no checkout).

---

## DEV-039 — Template e variáveis de certificado

- **Prioridade:** P0  
- **Ref spec:** CRT-01

**Objetivo (dev):** Armazenar template HTML/PDF com placeholders; render engine no servidor.

**Dependências:** DEV-025.

---

## DEV-040 — Emissão manual e revogação de certificado

- **Prioridade:** P2  
- **Ref spec:** CRT-02, CRT-03

**Objetivo (dev):** Admin emite com motivo; revogação marca certificado e reflete em DEV-026.

**Dependências:** DEV-025, DEV-026.

---

## DEV-041 — Fila de tickets de suporte

- **Prioridade:** P1  
- **Ref spec:** BO-SUP

**Objetivo (dev):** Modelo `support_tickets` com estados; UI lista e detalhe; notas internas.

**Critérios de aceite**
- Aluno abre ticket (formulário) → aparece no BO.

**Dependências:** DEV-002, DEV-006.

---

## DEV-042 — Dashboard operacional e log de webhooks

- **Prioridade:** P1  
- **Ref spec:** OBS-01, OBS-02

**Objetivo (dev):** Cards KPIs (pedidos/dia, falhas webhook); tabela últimos eventos Stripe com erro.

**Dependências:** DEV-013, DEV-036.

---
