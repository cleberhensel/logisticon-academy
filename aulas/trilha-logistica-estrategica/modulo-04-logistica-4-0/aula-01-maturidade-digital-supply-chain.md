# Maturidade digital na *supply chain* — escada, não pôster de «IA»

**Maturidade digital** descreve **capacidade progressiva**: dados confiáveis, integração, visibilidade, decisão assistida e, em alguns casos, automação avançada. Frameworks públicos (academia, consultorias, associações) **diferem** nos nomes dos degraus — o que importa pedagogicamente é **sequência lógica** e **dono de produto** (*product owner*) de cada salto. Esta aula **não** promove ranking comercial de fornecedores de «assessment».

---

## Objetivos e resultado de aprendizagem

**Ao final desta aula**, você será capaz de:

- Explicar **por que** dados e integração vêm antes de «IA em tudo».  
- Posicionar a sua organização em **faixas** de maturidade com **evidência**, não achismo.  
- Articular alinhamento **negócio–operações–TI** para *roadmap* digital.

**Duração sugerida:** 60–75 minutos.

---

## Gancho — a TechLar e o projeto «big data»

A **TechLar** patrocinou **IA para previsão** enquanto **cadastros** de lead time estavam **errados** e **pedidos** duplicados entre ERP e planilha. O modelo **treinou lixo** — *garbage in, garbage out*. O CIO pediu **higienização**; vendas pediu **demo** para cliente. Sem **mapa de maturidade**, o comitê discutiu **ferramenta**, não **capacidade**.

**Analogia de aprender a nadar:** não se começa por **maratona aquática** sem **flutuar** e **respirar** — a ordem importa.

---

## Mapa do conteúdo

- Degraus típicos (*consenso de mercado*, nomes variam): silos → dados → integração → visibilidade → analytics → decisão/automação.  
- *Governança* de dados mestres (MDM) em **uma frase** estratégica.  
- Papéis: **sponsor**, *owner* de dado, TI, operações.  
- Anti-padrão: **PoC eterno**.

---

## Conceito núcleo

**Maturidade (pedagógica):** não é «ter app»; é **confiar** nos números que alimentam decisão diária e **medir** resultado de negócio.

| Faixa | Sinais típicos | Risco se pular |
|-------|----------------|----------------|
| 1 — Fragmentado | planilhas paralelas, KPIs conflitantes | dashboards bonitos mentirosos |
| 2 — Integrado core | ERP como sistema de registro | ainda pouca visibilidade *end-to-end* |
| 3 — Visível | eventos de transporte, estoque, pedido alinhados | custo de integração e *change management* |
| 4 — Analítico | *forecast*, CTS, simulações recorrentes | falta de *governance* de modelo |
| 5 — Orquestrado | decisões automatizadas com *human-in-the-loop* definido | risco operacional e ético |

*Hipótese pedagógica:* a tabela é **didática**; empresas reais misturam faixas por processo.

```mermaid
flowchart LR
  D[Dados_confiaveis]
  I[Integracao_transacional]
  V[Visibilidade_eventos]
  A[Analytics_decisao]
  O[Automacao_governada]
  D --> I --> V --> A --> O
```

**Legenda:** setas = **dependência** típica; retroalimentação existe (ex.: descobrir erro de dado na fase `A` e voltar a `D`).

**Mini-caso:** *control tower* contratada **sem** SLA de qualidade de dados dos parceiros — torre vê **sombra**, não **cadeia**.

---

## Trade-offs

- **Investir** em MDM *versus* **ganho rápido** em *dashboard* — equilíbrio por *wave* de *roadmap*.  
- **Centralização** de analytics *versus* **empoderamento** local — sem padrão, vira torre de Babel.  
- **Velocidade** de *go-live* *versus* **dívida técnica** e auditoria futura.

---

## Aplicação — exercício

Para **três** processos (ex.: pedido, expedição, compra), marque **1–5** da tabela simplificada acima e escreva **uma evidência** por nota (ex.: «expedição 3 porque temos ASN em 80% dos fornecedores»). Identifique **o maior buraco** comum aos três.

**Gabarito pedagógico:** evidências devem ser **observáveis**; se todas as notas forem 4–5 sem prova, é **autoengano** pedagógico; buraco comum frequentemente é **dado mestre** ou **evento não integrado**.

---

## Erros comuns e armadilhas

- **RFP** de plataforma antes de **processo** e dado mínimo.  
- Confundir **digitalização** (PDF no e-mail) com **integração** (API/evento).  
- Maturidade como **checklist** de TI sem **métrica de negócio**.  
- «Estamos em 4.0» por **marketing** interno.

---

## KPIs e decisão

- **Acurácia** de cadastro (SKU, lead time, endereço).  
- **% pedidos** com status *end-to-end* sem intervenção manual.  
- **Tempo** de fechamento de ciclo S&OP com **um** número de demanda.  
- **ROI** de iniciativa digital (horizonte explícito).

---

## Fechamento — três takeaways

1. Maturidade é **escada** — respeitar dependências evita projeto caro inútil.  
2. Dado é **ativo**; sem dono, vira **passivo** oculto.  
3. TI e negócio precisam **mesma definição** de «pronto».

**Pergunta de reflexão:** qual decisão diária hoje ainda depende de **número que ninguém audita**?

---

## Referências

1. BRYNJOLFSSON, E.; MCAFEE, A. *The Second Machine Age*. W. W. Norton — contexto económico da digitalização (*não* manual de implementação).  
2. ASCM — *digital supply chain* e competências — [ascm.org](https://www.ascm.org/).  
3. Gartner / McKinsey / Deloitte publicam **modelos de maturidade** — usar como **inspiração**, citar fonte ao adaptar (*não* há um único padrão universal).

**Ponte:** [Integrações batch](../../trilha-tecnologia-e-sistemas/modulo-02-erp-aplicado-supply-chain/aula-03-integracoes-batch.md); trilha **Automação e digitalização** no catálogo ([`trilhas.md`](../../trilhas.md)) para RPA/Python/ML operacional.
