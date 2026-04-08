# Registro mestre de features (DEV-XXX)

| ID | Título resumido | Épico | P | Ref spec |
|----|-----------------|-------|---|----------|
| DEV-001 | Registro de usuário | E01 | P0 | ACC-01 |
| DEV-002 | Login e emissão de tokens | E01 | P0 | — |
| DEV-003 | Refresh token e encerramento de sessão | E01 | P0 | — |
| DEV-004 | Verificação de e-mail | E01 | P0 | ACC-02 |
| DEV-005 | Fluxo esqueci minha senha | E01 | P1 | USR-04 |
| DEV-006 | Autorização RBAC nas rotas da API | E01 | P0 | §4 RBAC |
| DEV-007 | Modelo de papéis e escopo organização | E01 | P0 | B2B + RBAC |
| DEV-008 | API e UI catálogo de trilhas públicas | E02 | P0 | DISC-01 |
| DEV-009 | Página detalhe trilha e elegibilidade compra | E02 | P0 | DISC-02, DISC-03 |
| DEV-010 | Produto comercial vinculado à trilha e preço Stripe | E02 | P0 | §9 products/prices |
| DEV-011 | Criação de pedido e itens | E02 | P0 | PUR-01 |
| DEV-012 | Endpoint criação Stripe Checkout Session | E03 | P0 | CHK-01…06 |
| DEV-013 | Webhook Stripe com validação e idempotência | E03 | P0 | §8.3 |
| DEV-014 | Liberação de matrícula após pagamento | E03 | P0 | PUR-01 |
| DEV-015 | Máquina de estados do pedido | E03 | P0 | §8.4 |
| DEV-016 | Aplicação e validação de cupom | E03 | P1 | PUR-02, CHK-05 |
| DEV-017 | Bloqueio compra duplicada mesma trilha | E03 | P0 | PUR-03 |
| DEV-018 | Dashboard do aluno | E04 | P0 | LRN-01 |
| DEV-019 | Player de aula e registro de progresso | E04 | P0 | LRN-02, LRN-05 |
| DEV-020 | Download de material com URL assinada | E04 | P1 | LRN-03 |
| DEV-021 | Conclusão de aula manual conforme política | E04 | P1 | LRN-04 |
| DEV-022 | Quiz por módulo com embaralhamento | E05 | P0 | ASM-01 |
| DEV-023 | Limite de tentativas e nota mínima | E05 | P0 | ASM-02 |
| DEV-024 | Entrega de projeto com upload | E05 | P2 | ASM-03 |
| DEV-025 | Geração de certificado PDF e código único | E05 | P0 | ASM-04 |
| DEV-026 | Endpoint e página validação pública certificado | E05 | P0 | ASM-05 |
| DEV-027 | Download e listagem de certificados do aluno | E05 | P1 | POST-01 |
| DEV-028 | CRUD trilha módulo aula no backoffice | E06 | P0 | CMS-01 |
| DEV-029 | Ordenação de módulos e aulas | E06 | P1 | CMS-02 |
| DEV-030 | CRUD quiz e banco de questões no BO | E06 | P0 | CMS-03 |
| DEV-031 | Rubrica de projeto | E06 | P2 | CMS-04 |
| DEV-032 | Publicar e despublicar trilha | E06 | P0 | CMS-05 |
| DEV-033 | Busca e listagem de usuários no BO | E06 | P1 | USR-01 |
| DEV-034 | Atribuição de papéis e auditoria | E06 | P0 | USR-02 |
| DEV-035 | Bloqueio de conta e invalidação de sessão | E06 | P1 | USR-03 |
| DEV-036 | Lista e detalhe de pedidos no BO | E06 | P0 | FIN-01, FIN-02 |
| DEV-037 | Reembolso via Stripe e atualização acesso | E06 | P1 | FIN-03 |
| DEV-038 | CRUD de cupons no BO | E06 | P1 | FIN-04 |
| DEV-039 | Template e variáveis de certificado | E06 | P0 | CRT-01 |
| DEV-040 | Emissão manual e revogação de certificado | E06 | P2 | CRT-02, CRT-03 |
| DEV-041 | Fila de tickets de suporte | E06 | P1 | BO-SUP |
| DEV-042 | Dashboard operacional e log de webhooks | E06 | P1 | OBS-01, OBS-02 |
| DEV-043 | Job de reconciliação de pagamentos | E03 | P1 | §8.3 |
| DEV-044 | Entidade organização e vínculo membros | E07 | P2 | B2B |
| DEV-045 | Pool de assentos e convites por e-mail | E07 | P2 | B2B-10…13 |
| DEV-046 | Painel buyer e export CSV de progresso | E07 | P2 | B2B-20…22 |
| DEV-047 | Disparo de e-mails transacionais | E08 | P0 | EM-01 |
| DEV-048 | Healthcheck e readiness | E08 | P1 | NFR |
| DEV-049 | Export e exclusão de dados LGPD mínima | E08 | P1 | §11 LGPD |

**P:** P0 · P1 · P2
