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

## Documentos — funções típicas

| Documento | Função pedagógica (alto nível) |
|-------------|--------------------------------|
| **BL** (*bill of lading*, marítimo) | evidência de embarque; título *dependendo da modalidade/forma* — validar com jurídico |
| **AWB** (*air waybill*, aéreo) | controle de carga aérea; regras próprias |
| Fatura comercial | base de valor e descrição consistente |
| Packing list | prova física de volumes/peso |
| Certificados | origem, inspeção, sanidade — quando aplicável |

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

## *Landed cost* — ideia para conversar com finanças

***Landed cost*** agrega, conceitualmente: preço + **frete internacional** + **seguro** + **taxas** portuárias/aeroportuárias estimáveis + **custo de capital** do tempo em trânsito + **risco** de exceção. **Consenso de mercado:** sem **definição**, cada área calcula «custo cheio» diferente.

**Ponte:** [estrutura de custos logísticos](../../trilha-fundamentos-e-estrategia/modulo-04-custos-logisticos-performance/aula-01-estrutura-custos-logisticos.md).

---

## *Compliance* — quando logística para

*Flags* típicos:

- **Embargos** e listas restritivas (origem/destinatário).  
- **Dupla utilização** (*dual-use*) em certos equipamentos.  
- **Origem** fraudulenta ou documentação inconsistente.

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

## KPIs e decisão

- **Lead time** documental (pedido → embarque → liberação).  
- **Taxa de exceções** por motivo (Pareto).  
- **Custo de exceção** / embarque (quando mensurável com definição estável).

---

## Fechamento — três takeaways

1. Documento é **interface** entre físico, financeiro e regulador.  
2. *Landed cost* exige **dicionário interno** — senão vira debate teológico.  
3. *Compliance* não é «modinha» — é **licença para operar**.

**Pergunta de reflexão:** qual documento hoje nasce **tarde demais** para a logística reagir?

---

## Referências

1. ICC — Incoterms® e publicações: https://iccwbo.org/  
2. CSCMP — glossário: https://cscmp.org/CSCMP/cscmp/educate/scm_definitions_and_glossary_of_terms.aspx  
3. CHOPRA, S.; MEINDL, P. *Supply Chain Management*. Pearson.
