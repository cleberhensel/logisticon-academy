# 02 — Stack e dependências

## Versões alvo

| Item | Versão |
|------|--------|
| Node | 20 LTS ou superior |
| npm | 10+ |
| Angular | 18.x (standalone, novo control flow) |
| TypeScript | alinhado ao Angular |

## Dependências de runtime

| Pacote | Função | Notas |
|--------|--------|-------|
| `@angular/*` | Framework | core, router, common, forms, platform-browser |
| `rxjs` | Streams | já vem com Angular |
| `carbon-components-angular` | Componentes Carbon para Angular | base de UI |
| `@carbon/styles` | SCSS oficial Carbon (tokens, grid) | importar em `styles.scss` |
| `marked` | Parser Markdown | renderiza aulas |
| `dompurify` | Sanitização HTML | aplicar sobre saída do `marked` |
| `@stripe/stripe-js` | Loader Stripe.js | só no checkout |

## Dependências de desenvolvimento

| Pacote | Função |
|--------|--------|
| `@angular/cli` + `@angular-devkit/*` | CLI Angular |
| `typescript` | TS |
| `json-server` | Mock REST |
| `nodemon` | Reiniciar `mock-api/server.js` em mudança |
| `concurrently` | Correr múltiplos processos no `npm start` |
| `chokidar-cli` | Watcher para o script de aulas |
| `gray-matter` | Parse de front-matter / cabeçalhos das aulas (no script) |
| `glob` | Listar ficheiros no script |
| `@types/dompurify`, `@types/marked` | tipagens |
| `eslint` + `@angular-eslint/*` | Lint |
| `prettier` | Format |

## `package.json` proposto

```json
{
  "name": "logistikon-web",
  "private": true,
  "type": "module",
  "scripts": {
    "ng": "ng",
    "sync:aulas": "node scripts/sync-aulas.mjs",
    "sync:aulas:watch": "chokidar '../aulas/**/*.md' -c 'node scripts/sync-aulas.mjs'",
    "seed:db": "node scripts/seed-db.mjs",
    "mock": "nodemon --watch mock-api --ext js,json mock-api/server.js",
    "ng:serve": "ng serve --project logistikon-web",
    "prestart": "npm run sync:aulas && npm run seed:db",
    "start": "concurrently -n WEB,MOCK,SYNC -c blue,magenta,green \"npm:ng:serve\" \"npm:mock\" \"npm:sync:aulas:watch\"",
    "build": "npm run sync:aulas && ng build --project logistikon-web",
    "lint": "ng lint",
    "test": "ng test --watch=false"
  }
}
```

## Comandos chave

| Comando | Efeito |
|---------|--------|
| `npm install` | Instala tudo |
| `npm start` | Levanta Angular (4200), mock-api (4300), watcher de aulas |
| `npm run sync:aulas` | Sincroniza aulas uma vez |
| `npm run seed:db` | Reset do `mock-api/db.json` para os seeds |

## Portas

| Serviço | Porta |
|---------|-------|
| Angular dev server | 4200 |
| json-server / mock | 4300 |

`environment.development.ts` aponta `apiBaseUrl = 'http://localhost:4300'`.

## Variáveis de ambiente

| Nome | Onde |
|------|------|
| `STRIPE_PUBLISHABLE_KEY` | em `environment.ts` (chave de **teste**, prefixo `pk_test_`) |
| `STRIPE_PRICE_<TRAIL_ID>` | em `mock-api/seed/prices.json` (ids `price_test_*`) |

A chave secreta Stripe **nunca** entra no POC.
