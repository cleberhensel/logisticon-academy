# Documentos, *landed cost* e *compliance* — visão integrada (sem virar despachante)

> **Aviso:** comércio exterior envolve **documentos**, **câmbio**, **seguro**, **tributos** e **sanções** que variam por **país**, **tempo** e **produto**. Este capítulo é **mapa integrador** para logística falar com finanças e *compliance* — **não** é manual aduaneiro nem orientação fiscal.

Depois de **processo** (aula 4.1) e **Incoterms®** (aula 4.2), esta aula fecha o **triângulo documento–custo–risco regulatório**: o que precisa existir para o **TMS/ERP** não virar arquivo morto e para o **P&L** não levar susto.

---

## Objetivos e resultado de aprendizagem

**Ao final desta aula**, você será capaz de:

- Nomear **BL** e **AWB** como conhecimentos de transporte em **função** (prova de contrato de transporte — sem jurisprudência aqui).  
- Montar **checklist** pré-embarque internacional.  
- Explicar ***landed cost*** como ideia de **custo total aterrissado** — com ponte para custos dos Fundamentos.  
- Listar *flags* de **compliance** (embargo, origem, dupla utilização).

**Duração sugerida:** 60–75 minutos.

---

## Gancho — o BL em nome errado

Um conhecimento (**BL**) saiu com **consignatário** desalinhado ao cadastro mestre do ERP. O físico chegou; o **desembaraço** travou; o **capital** parou na praça. Documento é **dado mestre** com **data de validade** operacional.

**Analogia da chave:** certa porta, chave errada — nada abre, todo mundo culpa a fechadura.

---

## Mapa do conteúdo

- Documentos-chave (função, não tutorial país a país).  
- *Landed cost* e componentes.  
- *Compliance* e escalação.  
- Ponte TMS/ERP (trilha Tecnologia).

---

## Documentos — funções típicas e nuances BR

| Documento | Função pedagógica | Observação BR |
|-----------|-------------------|----------------|
| **BL** (*bill of lading*, marítimo) | evidência de embarque, contrato de transporte; pode ser título de crédito (negociável) | original/express release/telex release; eBL ganhando espaço (FIATA, BIMCO) |
| **HBL** (*house BL*) e **MBL** (*master BL*) | NVOCC emite HBL ao cliente; armador emite MBL ao NVOCC | sempre verificar consignatário em ambos |
| **AWB** (*air waybill*) | controle de carga aérea, **não-negociável** | IATA-padrão; HAWB/MAWB |
| **CTRC / CT-e** | conhecimento rodoviário interno | Ajuste SINIEF 09/07 |
| **Fatura comercial** (*commercial invoice*) | base de valor aduaneiro, descrição, NCM | precisa coincidir com PO + BL |
| **Packing list** | volumes, peso bruto/líquido, dimensões | gerador de risco se diverge do físico |
| **Certificado de origem** (CO) | base de preferência tarifária (Mercosul, Aladi, países tratado) | quando ausente = paga II cheio |
| **Certificado de inspeção** (SGS, Bureau Veritas, Cotecna) | qualidade pré-embarque | exigido em produtos sensíveis |
| **Certificado fitossanitário** (MAPA / origem) | vegetal | obrigatório para alimento, semente |
| **Certificado sanitário** | animal/farma | Anvisa, MAPA |
| **NIMF-15** (selo IPPC) | madeira tratada (palete, caixaria) | obrigatório embalagem de madeira |
| **MSDS / FISPQ** (NBR 14725) | produtos químicos | obrigatório transporte ADR |
| **Carta de crédito (L/C)** ou **cobrança (D/P, D/A)** | pagamento internacional | UCP 600 (ICC) |
| **Apólice de seguro** | cobertura | cláusulas ICC A/B/C |
| **Conhecimento de carga digital (eBL)** | substitui BL papel | FIATA eFBL, IBM/Maersk TradeLens descontinuado, mas Wave/Cargox em ascensão |
| **DI / Duimp** (BR) | declaração de importação | RFB Pucomex |
| **DU-E** (BR) | declaração única de exportação | RFB Portal Único |
| **Licença de Importação (LI)** | autorização anuente prévia | quando regime exige |

**Mermaid — integração conceitual:**

```mermaid
flowchart LR
  Doc[Documentos consistentes]
  ERP[ERP e TMS]
  Fin[Finanças e pagamento]
  Log[Execução física]
  Doc --> ERP
  ERP --> Fin
  Log --> Doc
```

**Legenda:** setas mostram **dependência**; divergência de documento derruba tudo à direita.

---

## *Landed cost* — fórmula de cálculo BR

***Landed cost*** ou **custo aterrissado** é o **custo total** do produto até a porta do CD, pronto para venda. **Sem dicionário interno**, cada área calcula «custo cheio» diferente.

### Componentes (importação BR — sequência de cálculo)

\[
\text{Valor Aduaneiro (VA)} = \text{FOB} + \text{frete internacional} + \text{seguro internacional}
\]

Tributos (sequência cumulativa BR):

\[
II = VA \cdot \text{aliq\_II}
\]

\[
IPI = (VA + II) \cdot \text{aliq\_IPI}
\]

\[
\text{PIS/COFINS-Imp} = VA \cdot \text{aliq\_PIS\_COFINS}
\]

\[
\text{Base ICMS} = \frac{VA + II + IPI + \text{PIS/COFINS} + \text{taxas}}{1 - \text{aliq\_ICMS}}
\]

\[
\text{ICMS} = \text{Base ICMS} \cdot \text{aliq\_ICMS}
\]

Acréscimos operacionais finais:

\[
\text{Landed Cost} = VA + II + IPI + \text{PIS/COFINS} + \text{ICMS} + \text{taxas portuárias} + \text{armazenagem} + \text{frete interno} + \text{despesas despachante} + \text{custo capital trânsito}
\]

### Exemplo numérico — TechLar smartphone (NCM 8517.13.00)

| Item | Valor |
|------|-------|
| FOB Shenzhen (USD) | 100,00 |
| Frete int. (USD) | 12,00 |
| Seguro int. (USD) | 1,50 |
| **VA (USD)** | **113,50** |
| Câmbio R$/USD (5,20) | 590,20 |
| II (16%) | 94,43 |
| IPI (15% sobre 590,20+94,43) | 102,69 |
| PIS/COFINS-Imp (~ 11,75% sobre VA) | 69,35 |
| Base ICMS (SP 18%, gross-up) | (590,20+94,43+102,69+69,35+10) / 0,82 = 1.057,40 |
| ICMS (18%) | 190,33 |
| Taxas portuárias + capatazia | 25,00 |
| Despachante | 35,00 |
| Frete interno Santos→Cajamar | 22,00 |
| **Landed cost (R$)** | **~ 1.225** (vs. FOB equivalente ~ R$ 520) |
| **Multiplicador landed/FOB** | **2,35×** |

**Reforma Tributária (LC 214/25):** PIS/COFINS-Imp + ICMS-Imp serão substituídos progressivamente por **CBS** (federal) + **IBS** (estadual+municipal) entre **2027–2033**, com **alíquota de referência** estimada em ~ 26,5%, **não-cumulativa plena** e cobrança no destino. Isso tende a **reduzir** o landed cost para muitos itens importados (fim da cumulatividade) e simplificar o cálculo. Cashback para baixa renda e regimes específicos (saúde, educação) terão tratamento diferenciado.

### Demurrage e detention — fórmula

\[
\text{custo demurrage} = \max(0, \text{dias parado} - \text{free time}) \cdot \text{tarifa diária}
\]

Tarifas típicas BR (Santos): USD 75/dia (1º dia além free), USD 150/dia (5º dia), USD 250+/dia (após 10º). Para **5 contêineres parados 6 dias além free**: ~ USD 4.500–6.000.

**Ponte:** [estrutura de custos logísticos](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-01-estrutura-custos-logisticos.md).

---

## *Compliance* — quando logística para

*Flags* típicos e listas a verificar:

- **Embargos e sanções**: ONU, OFAC (EUA), UE, Reino Unido, ANVISA, MAPA, ANTAQ; produtos para Rússia, Irã, Coreia do Norte, Mianmar, Síria têm restrição.
- **Dupla utilização** (*dual-use*): equipamentos com aplicação militar/civil — controle DECEX/Ministério da Defesa.
- **Origem fraudulenta** ou documentação inconsistente (CO falso, sub-faturamento, sub-classificação NCM).
- **Madeira**: lei brasileira proíbe importar madeira/derivados sem CITES quando aplicável.
- **Anti-dumping** (Camex) e **medidas de salvaguarda** — adicionais ao II em produtos específicos.
- **Embalagem de madeira sem NIMF-15** → recusa Anvisa/MAPA.
- **LGPD + dados pessoais** em transferência internacional.
- **Sanções secundárias**: pagamento via dólar pode trigar OFAC.

### Tipos de auto de infração mais comuns (BR)

| Infração | Multa típica |
|----------|--------------|
| Sub-classificação NCM | 1% sobre valor aduaneiro + diferença de tributo |
| Sub-faturamento | 100% diferença + multa fiscal 75–150% |
| Falta de informação na DI | 1% VA (mín. R$ 500) |
| Importar sem licença anuente | perdimento da mercadoria |
| Mercadoria abandonada (>90 dias armazém alfandegado) | perdimento + dívida |

**Política:** roteiro de **escalação** para jurídico/*compliance* — não «resolver criativo».

---

## Ponte — TMS como leitor de eventos

Eventos (*tracking*, chegada, *demurrage* conceitual) alimentam **decisão** e **auditoria** — ver [TMS na trilha Tecnologia](../../trilha-tecnologia-e-sistemas/modulo-04-tms/README.md).

---

## Aplicação — exercício

Checklist de **12 itens** «pré-embarque internacional» (descrição comercial consistente, Incoterm no contrato, seguro alinhado, *booking*, peso cubado, embalagem exportação, certificados, cadastro de consignatário, moeda e pagamento, *HS/NCM* validado por especialista, plano de rastreio, plano de exceção).

**Gabarito pedagógico:** deve misturar **dado**, **processo** e **governança**; faltar **NCM** ou **consignatário** é falha clássica.

---

## Erros comuns e armadilhas

- PDF «bonito» sem **linha** ligada a pedido/viagem no sistema.  
- Divergência **peso** packing list *vs.* físico.  
- Faturamento **antes** de evidência operacional quando política exige prova.  
- Misturar **importação** de revenda com **importação** industrial sem separar processo.

---

## Aprofundamentos — variações por modal e cenário

| Cenário | Particularidade |
|---------|-----------------|
| **FCL marítimo** | demurrage por contêiner, free time porto + free time deport |
| **LCL marítimo** | desconsolidação no porto/CFS adiciona 5–10 dias |
| **Aéreo TECA Guarulhos** | DI por AWB, lead time desembaraço 24–72 h se canal verde |
| **Express courier** (DHL/FedEx/UPS) | RTS — Regime Tributação Simplificada, até USD 3.000, alíquota fixa 60% (até 50, isento PF) |
| **ZFM Manaus** | benefícios SUFRAMA (II/IPI reduzidos, ICMS especial) |
| **REPETRO offshore** | suspensão tributos para indústria de E&P |
| **OEA habilitada** | canal preferencial, redução burocracia (~60% canal verde) |

---

## Trade-offs

| Alavanca | + Lead time | + Custo | + Risco | + Capital |
|----------|:-----------:|:-------:|:-------:|:---------:|
| OEA habilitação | ↓↓ | ↑ projeto | ↓↓ | ↓ |
| Drawback | ↔ | ↓↓ | ↔ | ↓ |
| Air-bridge plano B | ↓↓↓ (emergência) | ↑↑↑ | ↓↓ | ↓ |
| EADI / porto seco | ↑ | ↓ | ↓ | ↓ |
| Centralizar em GRU/VCP aéreo | ↓ | ↑ | ↓ | ↓ |
| LCL vs FCL | LCL ↑ | LCL ↓ se < 15 m³ | LCL ↑ | ↔ |

---

## O que vira dado no sistema

| Campo / evento | Sistema | Função |
|---|---|---|
| `bl_number`, `awb_number`, `cte_chave` | TMS+ERP | conhecimentos |
| `commercial_invoice_id`, `packing_list_id` | ERP+forwarder | rastrear documento |
| `di_number` ou `duimp_id` | sistema despachante / Pucomex | declaração |
| `customs_channel` (V/A/V/Cinza) | despachante | risco operacional |
| `landed_cost_calculated` (BRL) | ERP/BI | custo total |
| `demurrage_clock_start`, `free_time_end` | TMS/portal | risco financeiro |
| `compliance_check_status` | sistema compliance | sanções/embargos |
| `incoterm`, `insurance_clause` | ERP | espelho da aula 4.2 |
| evento `release_customs` | despachante | gatilho de coleta |

---

## KPIs e decisão (tabela)

| KPI | Pergunta | Dono | Fonte | Cadência | Playbook |
|-----|----------|------|-------|----------|----------|
| **Lead time documental** (PO→liberação) P50/P90 | Cauda dói? | Logística internac. | ERP+Pucomex | Mensal | Anuência prévia, OEA |
| **Taxa exceções por motivo** (Pareto) | Onde falha? | Compliance | despachante | Mensal | RCA + checklist |
| **Custo de exceção / embarque** | Sangria? | Controladoria | finanças+desp. | Mensal | Pickup planejado |
| **Landed cost / FOB ratio** | Multiplicador real? | Plan. | BI | Mensal | Otimizar Incoterm |
| **% canal verde** | Reputação RFB? | Compliance | Pucomex | Mensal | OEA, NCM correto |
| **Tempo médio em recinto alfandegado** | Armazenagem cara? | Plan. | despachante | Semanal | Pickup ágil |
| **Diferença declarado × físico** (volumes/peso) | Doc consistente? | Recebimento | WMS | Por embarque | Treino fornecedor |
| **% PO com checklist pré-embarque completo** | Disciplina? | Compras | sistema | Semanal | Bloqueio sistêmico |

---

## Ferramentas e tecnologias

| Família | Exemplos |
|---------|----------|
| **Portal Único / Pucomex** | RFB obrigatório |
| **Sistemas de despachante** | Conexos, ZTrade, Softway, Easycomex, MasterSAF |
| **Forwarder digital** | Flexport, Cargo X, Cargobr, Rocket Cargo |
| **Visibility multi-carrier** | project44, FourKites, Ocean Insights |
| **eBL / digital trade** | Wave BL, CargoX, edoxOnline (FIATA) |
| **Calculadora landed cost** | módulo SAP GTS, Oracle GTM, MasterSAF GTM, Conexos |
| **Compliance / sanctions screening** | Dow Jones Risk, LexisNexis, Refinitiv World-Check |
| **Sistema seguro internacional** | apólice anual + endossos por embarque |

---

## Glossário rápido

- **Anti-dumping:** sobretaxa contra preço predatório (Camex).
- **CFS** (*Container Freight Station*): local desconsolidação LCL.
- **CITES:** convenção tráfico de espécies ameaçadas.
- **Demurrage / detention:** taxas por contêiner além do free time.
- **Drawback:** regime suspende tributo se reexportar.
- **eBL:** *electronic bill of lading*.
- **Free time:** dias sem cobrança.
- **HBL/MBL:** house/master BL (NVOCC e armador).
- **LI:** Licença de Importação.
- **NIMF-15:** norma de embalagem madeira.
- **OEA:** Operador Econômico Autorizado.
- **Perdimento:** mercadoria confiscada pela RFB.
- **RTS:** Regime de Tributação Simplificada (express).
- **Termo de Avaria** / *survey report*: laudo de seguro.

---

## Fechamento — três takeaways

1. Documento é **interface** entre físico, financeiro e regulador.  
2. *Landed cost* exige **dicionário interno** — senão vira debate teológico.  
3. *Compliance* não é «modinha» — é **licença para operar**.

**Pergunta de reflexão:** qual documento hoje nasce **tarde demais** para a logística reagir?

---

## Referências

1. ICC — Incoterms® 2020 e UCP 600 (Carta de Crédito): https://iccwbo.org/  
2. RECEITA FEDERAL — Portal Único / Pucomex / Duimp: https://www.gov.br/siscomex e https://www.gov.br/receitafederal  
3. MDIC / SECEX / Camex — ex-tarifário, anti-dumping: https://www.gov.br/mdic  
4. ANVISA, MAPA, INMETRO, CNEN — anuências.  
5. BACEN — Resolução 277/22 (câmbio simplificado).  
6. LC 214/2025 — Reforma Tributária IBS/CBS.  
7. ABNT NBR 14725 (FISPQ); ISPM 15 / NIMF-15.  
8. Lloyd's — *Institute Cargo Clauses* A/B/C.  
9. CHOPRA, S.; MEINDL, P. *Supply Chain Management*. Pearson.  
10. ABRACOMEX e AEB — guias práticos.

---

## Pontes para outras trilhas

- **Operações** (esta trilha): [import/export e atores](aula-01-processo-import-export-atores.md), [Incoterms 2020](aula-02-incoterms-2020-logistica.md).
- **Fundamentos:** [estrutura de custos](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-01-estrutura-custos-logisticos.md), [fretes e contratos](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-02-fretes-contratos-negociacao.md).
- **Tecnologia:** [TMS](../../trilha-tecnologia-e-sistemas/modulo-04-tms/README.md), [ERP — estoque e movimentos](../../trilha-tecnologia-e-sistemas/modulo-02-erp-aplicado-supply-chain/aula-02-stock-movimentos.md).
- **Dados:** [lead time e variabilidade](../../trilha-dados-analytics-logistica/modulo-04-indicadores-logisticos-kpis/aula-02-lead-time-variabilidade-logistica.md).
