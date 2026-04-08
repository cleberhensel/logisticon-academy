# Tópico 07 — Funcionalidades para backoffice

**Origem:** Seção 7 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 7) Funcionalidades para Backoffice

### 7.1 Gestão acadêmica

- CRUD de trilhas, cursos, módulos e aulas.
- Organização por nível e categoria.
- Gestão de quizzes e banco de questões.
- Rubrica para correção de projetos.
- Publicar/despublicar conteúdo.

### 7.2 Gestão de usuários e acessos

- Consulta de usuários (aluno, cliente, instrutor).
- Alteração de papel (com auditoria).
- Bloqueio/desbloqueio de conta.
- Reset manual de senha (fluxo seguro).

### 7.3 Gestão comercial e financeira

- Lista de pedidos e filtros por status.
- Conciliação de eventos Stripe:
  - pago;
  - recusado;
  - estornado;
  - reembolsado.
- Reembolso parcial/total (com permissão específica).
- Gestão de cupons.

### 7.4 Gestão de certificados

- Template de certificado.
- Emissão manual (caso excepcional).
- Revogação com justificativa.
- Verificação pública por código/hash.

### 7.5 Suporte e operação

- Painel de tickets/solicitações.
- Histórico de interação por aluno.
- SLA e tags (pagamento, acesso, conteúdo).

### 7.6 Observabilidade e auditoria

- Logs de integração (Stripe webhook).
- Logs de ações críticas (admin/financeiro).
- Dashboard operacional:
  - compras por dia;
  - taxa de aprovação;
  - taxa de conclusão;
  - erro de pagamento.

---

## Notas de análise técnica

1. **Risco:** “Backoffice completo” na Fase 2 (§12) concentra CMS acadêmico, RBAC, financeiro, certificados, suporte e observabilidade — risco de atraso se não houver priorização por valor (publicar trilha vs. tickets vs. BI).
2. **Risco:** Reembolso parcial/total com regras de acesso (§7.3, §8.5) exige transações e eventos bem definidos; erro aqui é incidente de compliance e confiança.
3. **Dependência:** Acoplamento forte a todos os módulos listados em §9.1; sem APIs internas estáveis, o backoffice vira monólito de telas difícil de testar.
4. **MVP:** Entregar primeiro: CRUD mínimo de conteúdo + publicar/despublicar, lista de pedidos + webhook/conciliação, gestão de cupom básica; tickets “painel + histórico” pode começar como formulário + lista simples sem SLA completo.
5. **MVP:** Auditoria (§7.6) — logar só ações críticas acordadas (papel, reembolso, revogação certificado) em vez de auditar tudo desde o dia zero.
