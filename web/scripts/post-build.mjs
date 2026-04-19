#!/usr/bin/env node
// Pós-build para GitHub Pages:
// - Copia index.html -> 404.html (deep links com client-side routing)
// - Garante .nojekyll na raiz da dist (alguns assets ficariam ocultos sem isto)

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'logistikon-web', 'browser');

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(DIST))) {
    throw new Error(`[post-build] não encontrei a dist em ${DIST}`);
  }
  const indexHtml = path.join(DIST, 'index.html');
  if (!(await exists(indexHtml))) {
    throw new Error(`[post-build] sem index.html em ${DIST}`);
  }
  await fs.copyFile(indexHtml, path.join(DIST, '404.html'));
  await fs.writeFile(path.join(DIST, '.nojekyll'), '', 'utf8');
  console.log(`[post-build] OK — 404.html e .nojekyll criados em ${path.relative(ROOT, DIST)}`);
}

main().catch((err) => {
  console.error('[post-build] FAIL', err);
  process.exit(1);
});
