# SPEC-06 — Backoffice operacional

**Épico:** E06 · **Refs:** `plan/features/epic-06-backoffice.md`, discovery tópico 07

## Objetivo
Operar **conteúdo académico**, **utilizadores e papéis**, **pedidos e reembolsos**, **cupons**, **certificados** (template, manual, revogação), **suporte** e **observabilidade** sem dependência de deploy de código.

## Módulos
1. **CMS:** trilha, módulo, aula; ordenação; quiz; rubrica (P2); publicar/despublicar com validações.
2. **Utilizadores:** busca, atribuição de papéis com `audit_logs`, bloqueio, reset senha (fluxo seguro).
3. **Financeiro:** lista/detalhe pedidos; reembolso Stripe + sincronização `enrollment`; CRUD cupons.
4. **Certificados:** template com variáveis; emissão manual e revogação (papéis restritos).
5. **Suporte:** tickets com estados e notas internas.
6. **Operação:** dashboard KPIs; log de webhooks Stripe; export CSV pedidos (P1).

## Autorização
Rotas `/admin/*` ou equivalente; papéis `instructor`, `finance`, `admin` com matriz explícita (tópico RBAC).

## Critérios globais de aceite
- Instrutor não executa reembolso.
- Ações sensíveis gravadas em auditoria.

## Rastreabilidade
**US:** `US-E06-001` … `US-E06-014` · **Tasks:** `TSK-DEV-028` … `TSK-DEV-042`
