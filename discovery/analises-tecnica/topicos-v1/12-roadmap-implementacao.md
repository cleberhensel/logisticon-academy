# Tópico 12 — Roadmap de implementação sugerido

**Origem:** Seção 12 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 12) Roadmap de implementação sugerido (simples e funcional)

### Fase 1 — Core Aluno + Checkout

- Auth, catálogo, matrícula, player, progresso.
- Stripe Checkout + webhook + pedido.
- Certificado básico.

### Fase 2 — Backoffice completo

- CMS acadêmico.
- Gestão de usuários/papéis.
- Financeiro operacional (reembolso, cupons, conciliação).
- Suporte e auditoria.

### Fase 3 — B2B simples

- Organização, assentos, convites, relatórios CSV.

### Fase 4 — Evoluções

- SSO corporativo.
- Certificado avançado (hash/badge).
- BI interno e automações de retenção.

---

## Notas de análise técnica

1. **Risco:** A Fase 1 agrega auth, catálogo, matrícula, player, progresso, Stripe e certificado — escopo amplo; sem definição explícita do que é “certificado básico” e do que fica manual, o prazo estoura.
2. **Dependência:** A Fase 2 (“backoffice completo”) depende do modelo de conteúdo e permissões das seções anteriores; mudanças tardias no RBAC ou no fluxo de publicação geram retrabalho.
3. **MVP:** Avaliar um **backoffice mínimo** na Fase 1 (só o necessário para publicar e precificar) se o objetivo for validar receita B2C cedo; “CMS completo” pode ir incrementando.
4. **Risco / dependência:** B2B na Fase 3 pressupõe entidades e escopo multi-tenant já pensados na Fase 1 (mesmo que desligados na UI) — senão, convites/assentos exigem refatoração de dados.
5. **Dependência:** SSO e “certificado avançado” na Fase 4 são dependentes claros de clientes enterprise e de requisitos legais de verificação — não devem ser prometidos no MVP sem critérios de aceite.
