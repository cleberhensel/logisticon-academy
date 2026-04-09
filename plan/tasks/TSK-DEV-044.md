# TSK-DEV-044 — Entidade organização e vínculo de membros

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-044 |
| **Prioridade** | P2 |
| **Spec** | [SPEC-07](../specs/SPEC-07-b2b-organizacoes.md) |
| **US** | [US-E07-001](../user-stories/E07-b2b/US-E07-001/US-E07-001.md) |
| **Épico** | E07 |

## Objetivo

CRUD mínimo de `organizations` e `organization_members` com papéis **buyer** vs **member**; queries do buyer sempre filtradas por `organization_id` do token.

## Escopo

- API: criação/gestão de org (admin ou self-serve corporativo — decidir no refinamento).
- Associação `user_id` ↔ `organization_id` com role.

## Critérios de aceite

- [ ] JWT de buyer só enxerga dados da própria org.
- [ ] Testes de autorização cobrindo escopo tenant.

## Dependências

DEV-007, DEV-006 (referência épico).
