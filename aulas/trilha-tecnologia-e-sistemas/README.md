# Trilha — Tecnologia e sistemas

Material curricular da **Logistikon Academy** para a secção «Tecnologia e sistemas» em [`aulas/trilhas.md`](../trilhas.md): **cadastro**, **ERP**, **WMS**, **TMS** e aprofundamento **SAP** — com foco em **o que o sistema regista**, **como os módulos conversam** e **onde o dado quebra a operação**, não em «tour de menus» sem decisão de negócio.

---

## Para quem é

Coordenadores de logística, analistas de supply chain que cruzam com **ERP/WMS/TMS**, implementadores júnior e **TI de negócio** que precisam de linguagem comum com operações.

**Pré-requisitos sugeridos:** trilha [Fundamentos e estratégia](../trilha-fundamentos-e-estrategia/README.md); recomenda-se também [Dados e analytics](../trilha-dados-analytics-logistica/README.md) antes de **Master Data** (qualidade, *grain*, KPIs).

---

## Ordem sugerida de estudo (vs. tabela do catálogo)

A tabela em `trilhas.md` lista os módulos numa ordem; **para aprendizagem**, recomenda-se:

1. **Master Data para Logística** — tudo o resto herda erro de cadastro.  
2. **ERP aplicado à Supply Chain** — documentos e estados (visão agnóstica).  
3. **WMS** e **TMS** — em qualquer ordem entre si (armazém *vs.* transporte).  
4. **SAP para Logística (MM / SD / WM)** — **por último**: especialização num fornecedor, após mapa mental agnóstico.

Esta ordem alinha-se à nota editorial em [`discovery/adequacao-posicionamento-fase1-menos-sap.md`](../../discovery/adequacao-posicionamento-fase1-menos-sap.md): **menos ênfase em SAP na fase 1** até haver pacote validado (marca, QA, jurídico). O módulo SAP existe no repositório como **conteúdo conceptual** com avisos explícitos; **labs** e certificação não fazem parte desta fase.

---

## Módulos e pastas (ordem sugerida)

| Ordem de estudo | Pasta no repositório | Foco |
|------------------|----------------------|------|
| 1 | [`modulo-01-master-data-para-logistica/`](modulo-01-master-data-para-logistica/README.md) | Golden record, material, parceiros, vigência |
| 2 | [`modulo-02-erp-aplicado-supply-chain/`](modulo-02-erp-aplicado-supply-chain/README.md) | Pedido, stock, integrações, ATP em alto nível |
| 3 | [`modulo-03-wms/`](modulo-03-wms/README.md) | Eventos de armazém, ondas, fronteira ERP–WMS |
| 4 | [`modulo-04-tms/`](modulo-04-tms/README.md) | Transporte, POD, auditoria de frete, Incoterms (visão) |
| 5 | [`modulo-05-sap-logistica-mm-sd-wm/`](modulo-05-sap-logistica-mm-sd-wm/README.md) | MM, SD, WM/EWM — fluxos e riscos (com disclaimers) |

Cada módulo tem **três aulas** em Markdown (15 no total).

**Checklist:** [CHECKLIST-AULAS.md](CHECKLIST-AULAS.md)

---

## Projeto integrador (opcional)

Diagrama **fim a fim** (pedido → entrega → faturação) + lista de **20 objetos mestre** com dono + **5 riscos** se o cadastro estiver errado (ligação WMS/TMS/ERP).

---

## Licença de uso

Uso interno da Logistikon Academy; **SAP** é marca de terceiros — não implica endosso; ajustar exemplos antes de uso comercial.
