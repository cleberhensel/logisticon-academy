# Tópico 03 — Canais de acesso da plataforma

**Origem:** Seção 3 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 3) Canais de acesso da plataforma

### 3.1 Canais externos (entrada)

- **Site público** (marketing, catálogo, páginas de trilha, FAQ).
- **Landing pages** por trilha/certificação.
- **Link direto de campanha** (LinkedIn, e-mail, parceiros).
- **Portal de login** (aluno e cliente corporativo).

### 3.2 Canais internos (uso contínuo)

- **Área do Aluno** (web responsiva).
- **Portal do Cliente** (empresa/comprador com visão da equipe).
- **Backoffice Admin** (time interno Logistikon).

### 3.3 Canais de comunicação

- E-mail transacional (cadastro, pagamento, acesso, lembrete, certificado).
- E-mail de relacionamento (retenção, trilhas sugeridas).
- Página de suporte (ticket simplificado ou formulário + SLA).

---

## Notas de análise técnica

1. **Dependência:** Site público, landings e campanhas implicam **CMS ou pipeline de deploy de conteúdo estático** + analytics/UTM; sem isso, “link de campanha” não é mensurável nem sustentável.
2. **Risco:** Três experiências web (Aluno, Cliente, Admin) multiplicam **auth, sessão, CORS e deploy** — três apps ou um monorepo com rotas isoladas precisam ser decididos cedo.
3. **MVP:** **E-mail transacional** antes de “relacionamento/retenção”; suporte pode começar como **formulário + fila manual** sem ticket completo na v1.
4. **Dependência:** Portal de login unificado para aluno e cliente corporativo exige **modelo de identidade** (um usuário, vários papéis/tenants) bem definido antes de codar telas.
