# Escopo, stack e navegação (MVP)

## 1. Stack frontend (obrigatório)

| Camada | Escolha | Notas |
|--------|---------|--------|
| Framework | **Angular** (versão alinhar ao `package.json` do repo de código quando existir) | Feature modules ou standalone + rotas lazy |
| Design System | **IBM Carbon Design System** | Componentes `@carbon/styles` + pacotes Angular Carbon conforme adoção do projeto |
| API | REST JSON em `/api/v1/...` | Serviços como *adapters*; DTOs ≠ modelos de UI |
| Estado | Preferir facades por feature + `async` pipe | Evitar estado duplicado com backend |
| Auth | JWT (access + refresh conforme backend) | Guards em rotas; RBAC espelha claims; **backend é fonte de verdade** |

Referência: `plan/architecture/stack-e-padroes.md`.

## 2. Âmbito UI desta documentação

| Incluído | Excluído |
|----------|----------|
| Fluxo B2C: catálogo → auth → compra → área do aluno → quiz → certificado → validação pública | Backoffice, portal B2B, recuperação de palavra-passe (P1), lista “meus certificados” (P1), download de anexos (P1) salvo menção |

## 3. Tipos de shell (layout raiz)

### 3.1 Shell público

- **Uso:** catálogo, detalhe, login, registo, validação de certificado, erros públicos.
- **Características:** cabeçalho com marca + links “Iniciar sessão” / “Criar conta”; sem menu lateral de aluno; opcionalmente `Language switch` placeholder (i18n futuro).

### 3.2 Shell área do aluno (autenticado)

- **Uso:** dashboard, outline, player, quiz, certificado na área logada.
- **Características:** cabeçalho com identidade do utilizador (menu conta) + navegação primária mínima (“As minhas formações”, eventualmente “Certificados” em fase P1); **sem** expor rotas admin.

### 3.3 Shell mínimo

- **Uso:** páginas de retorno Stripe, verificação de e-mail (foco na tarefa).
- **Características:** cabeçalho reduzido ou só logo; CTA único claro.

## 4. Guards e regras de rota (lógica UI)

| Guard | Comportamento |
|-------|----------------|
| `AuthGuard` | Redireciona para login com `returnUrl` se rota exige sessão |
| `GuestOptionalGuard` | Catálogo e detalhe podem ser visitados sem sessão |
| `EnrollmentGuard` | Outline/player/quiz exigem matrícula ativa na trilha (403 → página de erro ou upsell) |
| `EmailVerifiedGuard` | **Opcional** conforme decisão de produto: se compra exige e-mail verificado, bloquear CTA “Comprar” até verificação |

Documentar a decisão final no PRD/SPEC-01; até lá, implementar o guard como **feature flag** ou constante de configuração.

## 5. Padrões de navegação

- **Breadcrumbs:** recomendados em detalhe da trilha e outline (Início → Trilhas → Nome da trilha).
- **Voltar:** no player, manter contexto da trilha; no quiz, confirmar saída se tentativa em curso (modal).
- **Deep links:** URLs estáveis com `slug` de trilha e ids de módulo/aula conforme `05-mapas-de-rotas-e-deep-links.md`.

## 6. Responsividade (MVP)

- **Mobile-first** no sentido de não bloquear leitura; breakpoints seguem **Carbon grid** (sm/md/lg/xl).
- **Player de vídeo:** prioridade em `min-width` legível; controlos tocáveis (alvo mínimo WCAG 2.5.5).
- **Quiz:** uma pergunta por ecrã em mobile (recomendado) ou scroll curto com âncora de foco.

## 7. Rastreabilidade happy path

Cada ficha em `telas/` referencia passos do documento `UX/happy-paths-mvp-e-criterios-acessibilidade.md` (secção 5.1).
