# Tópico 11 — Requisitos não funcionais (MVP)

**Origem:** Seção 11 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 11) Requisitos não funcionais (MVP)

- Performance: páginas principais < 2.5s em rede comum.
- Disponibilidade: alvo 99.5% mensal.
- Segurança:
  - senha com hash forte;
  - TLS obrigatório;
  - logs de auditoria para ações críticas;
  - princípio do menor privilégio.
- Privacidade/LGPD:
  - base legal e consentimento;
  - direito de exclusão;
  - política de retenção.
- Confiabilidade financeira:
  - webhooks idempotentes;
  - reconciliação de pagamentos.

---

## Notas de análise técnica

1. **Risco:** Metas de performance (< 2,5 s) e disponibilidade (99,5%) dependem de hospedagem, CDN, cache e observabilidade; sem baseline de medição (“rede comum” indefinida), o MVP pode “cumprir no papel” e falhar na prática.
2. **Risco:** LGPD (base legal, exclusão, retenção) exige processos jurídicos/operacionais além do código; atraso nesses alinhamentos bloqueia go-live seguro.
3. **Dependência:** Segurança (hash de senha, TLS, auditoria, menor privilégio) é pré-requisito transversal — auth, backoffice e integrações precisam ser desenhados juntos, não como “camada final”.
4. **MVP:** Priorizar **confiabilidade financeira** (webhooks idempotentes + reconciliação) e **integridade de acesso** antes de otimizar latência em todas as telas.
5. **Dependência:** 99,5% mensal implica monitoramento, alertas e (idealmente) status page — custo e disciplina de operação desde o início.
