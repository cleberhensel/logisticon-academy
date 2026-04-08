# Tópico 05 — Funcionalidades para alunos

**Origem:** Seção 5 da especificação técnica v1.  
**Índice:** [00-indice.md](00-indice.md)

---

## 5) Funcionalidades para Alunos

### 5.1 Descoberta e escolha

- Listagem de trilhas e certificações.
- Página de detalhe da trilha:
  - conteúdo programático;
  - carga horária;
  - nível (Foundation/Professional/Specialist);
  - pré-requisitos;
  - preço e formas de pagamento.

### 5.2 Conta e onboarding

- Cadastro simples (nome, e-mail, senha, país/idioma).
- Confirmação de e-mail.
- Onboarding inicial:
  - trilha recomendada;
  - nivelamento opcional;
  - metas de estudo.

### 5.3 Compra e ativação

- Compra avulsa de trilha (MVP).
- Cupom promocional.
- Liberação automática de acesso após pagamento aprovado.

### 5.4 Aprendizagem

- Dashboard com:
  - cursos ativos;
  - % progresso;
  - próximas aulas;
  - prazo sugerido.
- Player de aula (vídeo, texto, material para download).
- Marcação de aula concluída (auto/manual).
- Controle de progresso por módulo/trilha.

### 5.5 Avaliação e certificação

- Quiz por módulo (nota mínima configurável).
- Tentativas configuráveis.
- Projeto final (upload de arquivo) para trilhas específicas.
- Certificado emitido ao cumprir critérios:
  - progresso mínimo;
  - nota mínima;
  - aprovação em projeto (quando aplicável).

### 5.6 Pós-conclusão

- Download de certificado.
- Página pública de validação do certificado por código.
- Sugestão de próxima trilha (cross-sell natural).

---

## Notas de análise técnica

1. **MVP:** **Descoberta + compra avulsa + player + progresso + quiz por módulo + certificado** formam o núcleo; **projeto final com upload**, **nivelamento** e **metas de estudo** são bons candidatos a v1.1 para reduzir superfície (storage, correção, lógica pedagógica).
2. **Dependência:** Certificado com **página pública de validação** exige **código/hash único**, anti-adivinhação e possivelmente CDN/cache com cuidado para não vazar dados.
3. **Risco:** Player (vídeo, download, texto) implica **CDN, assinatura de URLs, DRM opcional** e **custos de bandwidth** — decisão de hospedagem (S3, Mux, Vimeo OTT, etc.) afeta arquitetura e custo.
4. **Risco:** “Marcação concluída auto/manual” sem regras claras abre fraude de progresso ou disputas com regra de certificação — precisa de **fonte da verdade** (eventos do player vs. clique manual) e política por tipo de aula.
5. **Dependência:** Cupom + Stripe Checkout exige **sincronização de preço** entre catálogo interno e sessão de checkout e testes de edge cases (cupom expirado, limite de uso).
