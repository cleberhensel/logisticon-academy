# Tópico 06 — Funcionalidades para cliente (B2B simples)

**Origem:** Seção 6 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 6) Funcionalidades para Cliente (B2B simples)

### 6.1 Compra corporativa

- Compra de pacotes de vagas (assentos) por trilha.
- Fatura e recibo por pedido.
- Histórico de pedidos da empresa.

### 6.2 Gestão de equipe

- Convidar colaboradores por e-mail.
- Atribuir trilha para colaborador.
- Remover/revogar acesso de assento não usado.

### 6.3 Acompanhamento

- Relatório por colaborador:
  - progresso;
  - status (não iniciado / em andamento / concluído);
  - certificado emitido.
- Exportação CSV.

---

## Notas de análise técnica

1. **Risco:** Modelo de “assentos” por trilha exige regras claras (transferência, expiração, trilha trocada no meio do contrato) — ambiguidade vira bugs de cobrança e de acesso.
2. **Risco:** Convites por e-mail cruzam com cadastro B2C, confirmação de e-mail e anti-fraude; sem desenho único de identidade, há duplicidade de usuários ou convites órfãos.
3. **Dependência:** Depende de `organizations`, `organization_members`, `enrollments`, `products`/`prices` e fluxo de pedido alinhado ao Stripe (pacote ≠ compra avulsa).
4. **MVP:** Lançar com um único tipo de pacote (N assentos × uma trilha), sem cenários complexos de “pool” entre trilhas; CSV pode ser exportação mínima (campos fixos) ou postergar para Fase 3 conforme roadmap (§12).
5. **MVP:** Revogação de assento não usado deve ser explícita no domínio (estado do vínculo convite/matricula) para não conflitar com reembolso (§8.5).
