# Tópico 13 — Checklist de validação da solução

**Origem:** Seção 13 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 13) Checklist de validação da solução

- [ ] Aluno consegue comprar e iniciar em menos de 5 minutos.
- [ ] Pedido pago sempre gera matrícula (sem duplicidade).
- [ ] Backoffice consegue publicar trilha sem suporte técnico.
- [ ] Reembolso atualiza financeiro e acesso corretamente.
- [ ] Certificado só sai com critérios cumpridos.
- [ ] Cliente corporativo consegue acompanhar equipe.

---

## Notas de análise técnica

1. **Risco:** Itens misturam jornada B2C, integridade de dados, backoffice, financeiro e **cliente corporativo**; o último só é verificável quando o escopo B2B estiver entregue — risco de “checklist verde” com MVP incompleto.
2. **Risco:** “Pedido pago sempre gera matrícula (sem duplicidade)” exige testes explícitos de concorrência e replay de webhook; é um ponto crítico de bugs em produção.
3. **Dependência:** “Publicar trilha sem suporte técnico” depende de UX do CMS, validações, previews e permissões — não só de existir CRUD.
4. **MVP:** Vale amarrar cada item a **testes automatizados ou E2E** e a um responsável (produto/ops), para não ficar subjetivo.
5. **Risco:** Reembolso + acesso exige matriz de estados e testes de borda (parcial, estorno tardio, usuário já certificado).
