# Checklist — 15 aulas · Tecnologia e sistemas

## Módulo 1 — Master Data para Logística

- [x] [Aula 1 — Master data na cadeia](modulo-01-master-data-para-logistica/aula-01-master-data-na-cadeia.md) — **Status pós-revisão:** revisada (template completo, MDM hubs, BP S/4, IDocs DEBMAS/CREMAS/MATMAS, Kafka/Event Mesh, exemplo TechLar)
- [x] [Aula 2 — Material, unidade e embalagem](modulo-01-master-data-para-logistica/aula-02-material-unidade-embalagem.md) — **Status pós-revisão:** revisada (MARA/MARC/MARD/MARM, NCM/CEST/GTIN/SSCC, S/4 simplificações, GDSN, mini-laboratório cubagem+NF-e)
- [x] [Aula 3 — Parceiros, localizações e governança](modulo-01-master-data-para-logistica/aula-03-parceiros-localizacoes-governanca.md) — **Status pós-revisão:** revisada (BP S/4 + CVI, KNVP roles AG/WE/RE/RG/LF, Sintegra, IE, MDG-BP, EDI 832/845)

## Módulo 2 — ERP aplicado à Supply Chain

- [x] [Aula 1 — Documentos e estados do pedido](modulo-02-erp-aplicado-supply-chain/aula-01-documentos-estados-pedido.md) — **Status pós-revisão:** revisada (VBAK/VBAP/LIKP/LIPS/VTTK/VBRK/VBFA, ATP/aATP/CTP, fluxo SD com NF-e/CT-e/MDF-e/SEFAZ)
- [x] [Aula 2 — Stock e movimentos](modulo-02-erp-aplicado-supply-chain/aula-02-stock-movimentos.md) — **Status pós-revisão:** revisada (BWART completo 101/103/105/122/311/561/601, MARD/MCHB/MSKA, Material Ledger, S/4 MATDOC)
- [x] [Aula 3 — Integrações e batch](modulo-02-erp-aplicado-supply-chain/aula-03-integracoes-batch.md) — **Status pós-revisão:** revisada (CAP, IDocs ORDERS05/DESADV01/INVOIC02, Kafka, SAP Event Mesh, EDI Proceda/X12, Outbox+CDC, contingência NF-e)

## Módulo 3 — WMS

- [x] [Aula 1 — Sinal físico e evento WMS](modulo-03-wms/aula-01-sinal-fisico-evento-wms.md) — **Status pós-revisão:** revisada (EWM /SCWM/T331, /SCWM/HU_HDR, /SCWM/WHO; Manhattan/BY/Körber comparados; embedded vs decentralized; IDoc DELVRY07/WMSCID)
- [x] [Aula 2 — Recebimento e put-away](modulo-03-wms/aula-02-recebimento-putaway.md) — **Status pós-revisão:** revisada (ASN→IBD→GR→HU→PUT, EWM PUTWAY strategies, QM quarentena, NF-e devolução, mvmt 101/103/105/124/122)
- [x] [Aula 3 — Onda, picking e expedição](modulo-03-wms/aula-03-onda-picking-expedicao.md) — **Status pós-revisão:** revisada (wave management vendor compare, picking strategies GTP/voice/vision, cross-dock, SSCC+NF-e+CT-e+MDF-e+PGI)

## Módulo 4 — TMS

- [x] [Aula 1 — Pedido de transporte e carrier](modulo-04-tms/aula-01-pedido-transporte-carrier.md) — **Status pós-revisão:** revisada (planning vs execution, rate shopping, /SCMTMS/D_TOR_ROOT, ANTT/RNTRC/CIOT/vale-pedágio, RCTR-C/SASSMAQ, GR Buonny/Sascar)
- [x] [Aula 2 — Execução, rastreio e POD](modulo-04-tms/aula-02-execucao-rastreio-pod.md) — **Status pós-revisão:** revisada (eventos canônicos + EDI 214, FourKites/project44/Shippeo/NeoGrid, POD digital LGPD, MDF-e lifecycle, Sascar/Trakto/Onixsat)
- [x] [Aula 3 — Faturação e auditoria de frete](modulo-04-tms/aula-03-faturacao-auditoria-frete.md) — **Status pós-revisão:** revisada (match 3-way, FAP providers nVision/A3/Cass/Trax/TGM, CT-e XML detalhado + refNFe, Reforma Tributária IBS/CBS)

## Módulo 5 — SAP (MM / SD / WM)

- [x] [Aula 1 — Mapa MM, SD e WM na cadeia](modulo-05-sap-logistica-mm-sd-wm/aula-01-mapa-mm-sd-wm-cadeia.md) — **Status pós-revisão:** revisada (BUKRS/WERKS/LGORT/VKORG, mapa t-codes por módulo, ECC vs S/4HANA tabela comparativa, EWM embedded/decentralized/3rd party)
- [x] [Aula 2 — MM e stock na logística](modulo-05-sap-logistica-mm-sd-wm/aula-02-mm-stock-logistica.md) — **Status pós-revisão:** revisada (MARD/MCHB/MARM/MBEW/MSKA/MSKU/MSLB, BWART catálogo completo, MIGO anatomia, MI31/MI04/MI07/MI20, S/4 MATDOC e Material Ledger)
- [x] [Aula 3 — SD, expedição e integração WMS](modulo-05-sap-logistica-mm-sd-wm/aula-03-sd-expedicao-wms.md) — **Status pós-revisão:** revisada (VBAK/VBAP/LIKP/LIPS/VBRK/VBRP/VBFA, sequência SD↔WMS↔TMS↔FI↔SEFAZ, aATP PAL/BoP/RBA, GRC NF-e fluxo, OTIF dicionário)

## Critérios transversais (pós-revisão)

- [x] Mermaid onde reduzir carga cognitiva — diagramas de sequência, estado, flowchart em todas as aulas
- [x] Exercício + gabarito pedagógico — preservados e expandidos
- [x] Referências nomeadas — SAP Help, GS1, ICC, Receita Federal, Gartner, CSCMP, ASCM, etc.
- [x] Sem bloco «Trilha / Público / Duração» no topo das aulas
- [x] Especificidades BR (NF-e/CT-e/MDF-e/SEFAZ/SPED/LGPD/Reforma Tributária)
- [x] T-codes SAP reais e tabelas (`MARA`, `VBAK`, `LIPS`, `MATDOC`, `/SCWM/*`, `/SCMTMS/*`)
- [x] ECC vs S/4HANA explicitado onde relevante
- [x] Comparativo de fornecedores (WMS Manhattan/BY/Körber/SAP EWM; TMS Manhattan/BY/OTM/MercuryGate/NeoGrid; ERP nacionais Totvs/Sankhya/Senior)
- [x] Pontes para outras trilhas em cada aula
