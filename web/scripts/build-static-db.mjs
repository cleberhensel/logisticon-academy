#!/usr/bin/env node
// Substitui o antigo seed-db.mjs.
// Lê mock-api/seed/* + assets/aulas/index.json (gerado por sync-aulas.mjs)
// e escreve projects/logistikon-web/src/assets/api/db.json,
// que é o snapshot consumido pelo BFF in-browser (`StaticBffStore`).

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const SEED_DIR = path.join(ROOT, 'mock-api', 'seed');
const ASSETS_API_DIR = path.join(ROOT, 'projects', 'logistikon-web', 'src', 'assets', 'api');
const DB_PATH = path.join(ASSETS_API_DIR, 'db.json');
const INDEX_PATH = path.join(ROOT, 'projects', 'logistikon-web', 'src', 'assets', 'aulas', 'index.json');

async function readJson(p, fallback) {
  try {
    return JSON.parse(await fs.readFile(p, 'utf8'));
  } catch {
    return fallback;
  }
}

function trailIdFromSlug(slug) {
  return 'trl_' + slug.replace(/^trilha-/, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function moduleIdFromSlug(slug) {
  return 'mod_' + slug.replace(/^modulo-/, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function lessonIdFromSlug(slug) {
  return 'les_' + slug.replace(/^aula-/, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

async function main() {
  const users = await readJson(path.join(SEED_DIR, 'users.json'), []);
  const prices = await readJson(path.join(SEED_DIR, 'prices.json'), []);
  const quizBank = await readJson(
    path.join(SEED_DIR, 'quiz-bank.json'),
    { _default: { questions: [], minScore: 70, maxAttempts: 3 } }
  );
  const aulasIndex = await readJson(INDEX_PATH, { trails: [] });

  if (!aulasIndex.trails || aulasIndex.trails.length === 0) {
    console.warn('[build-static-db] AVISO: assets/aulas/index.json vazio. Execute primeiro `npm run sync:aulas`.');
  }

  const priceBySlug = Object.fromEntries(prices.map((p) => [p.trailSlug, p]));

  const trails = aulasIndex.trails.map((t) => {
    const trailId = trailIdFromSlug(t.slug);
    const price = priceBySlug[t.slug];
    return {
      id: trailId,
      slug: t.slug,
      title: t.title,
      summary: t.summary || '',
      level: t.level,
      language: t.language,
      durationHours: t.durationHours,
      status: 'published',
      stripePriceId: price ? price.id : null,
      modules: t.modules.map((m) => ({
        id: moduleIdFromSlug(m.slug),
        slug: m.slug,
        order: m.order,
        title: m.title,
        readmePath: m.readmePath || null,
        lessons: m.lessons.map((l) => ({
          id: lessonIdFromSlug(l.slug),
          slug: l.slug,
          order: l.order,
          title: l.title,
          durationMin: l.durationMin,
          mdPath: l.mdPath
        }))
      }))
    };
  });

  const db = {
    users,
    trails,
    prices,
    orders: [],
    enrollments: [],
    progress: [],
    quiz_attempts: [],
    quiz_bank: quizBank,
    certificates: [],
    checkout_sessions: [],
    email_log: []
  };

  await fs.mkdir(ASSETS_API_DIR, { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(
    `[build-static-db] OK — ${trails.length} trilhas, ${users.length} utilizadores escritos em ${path.relative(ROOT, DB_PATH)}`
  );
}

main().catch((err) => {
  console.error('[build-static-db] FAIL', err);
  process.exit(1);
});
