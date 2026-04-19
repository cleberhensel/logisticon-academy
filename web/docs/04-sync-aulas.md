# 04 — Sync das aulas (Markdown → SPA)

## Princípios

- A pasta de origem [`aulas/`](../../aulas/) **nunca é alterada**.
- O script copia ficheiros `.md` para `web/projects/logistikon-web/src/assets/aulas/` (gitignored) e gera um **`index.json`** com a árvore de trilhas/módulos/aulas.
- O front consome o `index.json` no `CatalogService` e renderiza o `.md` em runtime via `marked` + `DOMPurify`.

## Origem (estrutura conhecida)

```text
aulas/
└── trilha-<slug>/
    ├── README.md                           opcional, descrição da trilha
    └── modulo-<NN>-<slug>/
        ├── README.md                       título e tabela de aulas com duração
        └── aula-<NN>-<slug>.md             conteúdo da aula
```

Padrão extraído do README de cada módulo (formato observado em [`aulas/trilha-fundamentos-e-estrategia/modulo-01-fundamentos-logistica-empresarial/README.md`](../../aulas/trilha-fundamentos-e-estrategia/modulo-01-fundamentos-logistica-empresarial/README.md)):

```markdown
# Módulo 1 — Fundamentos da Logística Empresarial
...
| Aula | Arquivo | Duração sugerida |
|------|----------|------------------|
| 1 | [aula-01-conceitos-papel-logistica.md](aula-01-conceitos-papel-logistica.md) | 60 min |
```

O script extrai **título do módulo** (linha `# Módulo N — ...`), e para cada aula a **duração** (`60 min`).

## Algoritmo (`scripts/sync-aulas.mjs`)

1. Resolver paths: `SRC = ../aulas`, `DEST = projects/logistikon-web/src/assets/aulas`.
2. `mkdir -p` em `DEST`.
3. Listar trilhas (`trilha-*` em `SRC`).
4. Para cada trilha:
   - Listar módulos (`modulo-*`).
   - Para cada módulo, ler `README.md` e extrair título + tabela de aulas (regex de tabela markdown).
   - Listar `aula-*.md`.
5. **Copiar** cada `.md` para `DEST/<trilha>/<modulo>/<aula>.md` (preservando paths relativos).
6. Gerar `DEST/index.json` no formato:

```jsonc
{
  "generatedAt": "ISO",
  "trails": [
    {
      "slug": "trilha-fundamentos-e-estrategia",
      "title": "Trilha — Fundamentos e Estratégia",
      "modules": [
        {
          "slug": "modulo-01-fundamentos-logistica-empresarial",
          "order": 1,
          "title": "Fundamentos da Logística Empresarial",
          "lessons": [
            {
              "slug": "aula-01-conceitos-papel-logistica",
              "order": 1,
              "title": "Conceitos e papel da logística",
              "durationMin": 60,
              "mdPath": "trilha-fundamentos-e-estrategia/modulo-01-fundamentos-logistica-empresarial/aula-01-conceitos-papel-logistica.md"
            }
          ]
        }
      ]
    }
  ]
}
```

## Decisões de design

| Decisão | Porquê |
|---------|--------|
| Copiar `.md` em vez de `import` ESM | Mantém aulas como ficheiros estáticos servidos por Angular; sem watcher do TS no conteúdo |
| `index.json` em build/sync time | Catálogo carrega 1 ficheiro pequeno em vez de listar dir no cliente |
| Título da aula derivado do **primeiro `# H1`** do `.md` (fallback: nome do ficheiro) | Robusto sem editar conteúdo |
| Duração extraída do README do módulo | Tabela já estandardizada |

## Renderização runtime (cliente)

`LkLessonContent` recebe `mdPath`, faz `HttpClient.get(..., { responseType: 'text' })`, executa `marked.parse(...)` e passa por `DOMPurify.sanitize(...)` antes do `[innerHTML]`.

```ts
// resumo
const html = DOMPurify.sanitize(marked.parse(await firstValueFrom(this.http.get(url, { responseType: 'text' }))));
```

## Hooks

- `prestart`, `prebuild` correm `sync:aulas`.
- `npm run sync:aulas:watch` executa em modo `chokidar` para refresh automático em desenvolvimento.

## Idempotência

- Script limpa `DEST` antes de copiar (`rm -rf` por segurança).
- Sem efeitos fora de `DEST`.
