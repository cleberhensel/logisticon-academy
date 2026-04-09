# TSK-DEV-020 — Download de material com URL assinada

| Campo | Valor |
|-------|--------|
| **DEV** | DEV-020 |
| **Prioridade** | P1 |
| **Spec** | [SPEC-04-area-do-aluno.md](../specs/SPEC-04-area-do-aluno.md) |
| **US** | [US-E04-004](../user-stories/E04-area-do-aluno/US-E04-004/US-E04-004.md) |
| **Épico** | E04 |

## Objetivo

Gerar URLs temporárias (TTL) para anexos/materiais, validando matrícula.

## Escopo

- Storage privado + endpoint de emissão de URL assinada ou proxy autenticado.

## Critérios de aceite

- [ ] Link expira e não reutilizável além do TTL.
- [ ] Sem matrícula → negado.
- [ ] Testes de expiração e permissão.

## Dependências

DEV-019 recomendado (contexto de aula); storage configurado.
