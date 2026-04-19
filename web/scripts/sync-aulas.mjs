#!/usr/bin/env node
// Sincroniza /aulas (origem) -> projects/logistikon-web/src/assets/aulas (destino)
// e gera assets/aulas/index.json com a árvore de trilhas/módulos/aulas.
// Não escreve em /aulas. Idempotente: limpa o destino antes de copiar.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(ROOT, 'aulas');
const DEST = path.resolve(__dirname, '..', 'projects', 'logistikon-web', 'src', 'assets', 'aulas');

const TRAIL_PREFIX = 'trilha-';
const MODULE_PREFIX = 'modulo-';
const LESSON_PREFIX = 'aula-';

const TRAIL_TITLE_OVERRIDES = {
  'trilha-fundamentos-e-estrategia': 'Fundamentos e Estratégia',
  'trilha-dados-analytics-logistica': 'Dados e Analytics aplicados à Logística',
  'trilha-tecnologia-e-sistemas': 'Tecnologia e Sistemas',
  'trilha-operacoes-logisticas': 'Operações Logísticas',
  'trilha-melhoria-continua-e-processos': 'Melhoria Contínua e Processos',
  'trilha-logistica-estrategica': 'Logística Estratégica',
  'trilha-automacao-e-digitalizacao': 'Automação e Digitalização'
};

const TRAIL_SUMMARIES = {
  'trilha-fundamentos-e-estrategia': 'Supply chain, transporte, armazenagem, planejamento e custos logísticos com trade-offs explícitos.',
  'trilha-dados-analytics-logistica': 'Dados, Excel avançado, Power BI e KPIs aplicados à supply chain.',
  'trilha-tecnologia-e-sistemas': 'ERP, WMS, TMS, SAP e master data — pilares digitais da operação.',
  'trilha-operacoes-logisticas': 'Estoques, armazenagem, transporte, distribuição e logística internacional.',
  'trilha-melhoria-continua-e-processos': 'Lean, Six Sigma, melhoria contínua e gestão de projetos logísticos.',
  'trilha-logistica-estrategica': 'Network design, procurement, SRM e Logística 4.0.',
  'trilha-automacao-e-digitalizacao': 'RPA, Python, IA e transformação digital aplicada à supply chain.'
};

const TRAIL_LEVELS = {
  'trilha-fundamentos-e-estrategia': 'Foundation',
  'trilha-dados-analytics-logistica': 'Practitioner',
  'trilha-tecnologia-e-sistemas': 'Practitioner',
  'trilha-operacoes-logisticas': 'Practitioner',
  'trilha-melhoria-continua-e-processos': 'Practitioner',
  'trilha-logistica-estrategica': 'Specialist',
  'trilha-automacao-e-digitalizacao': 'Specialist'
};

async function rmrf(target) {
  await fs.rm(target, { recursive: true, force: true });
}

async function ensureDir(target) {
  await fs.mkdir(target, { recursive: true });
}

async function listDirs(parent, prefix) {
  try {
    const entries = await fs.readdir(parent, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && e.name.startsWith(prefix))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

async function listFiles(parent, prefix, ext) {
  try {
    const entries = await fs.readdir(parent, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.startsWith(prefix) && e.name.endsWith(ext))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

async function readMaybe(filepath) {
  try {
    return await fs.readFile(filepath, 'utf8');
  } catch {
    return null;
  }
}

function extractH1Title(md) {
  if (!md) return null;
  const lines = md.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^#\s+(.+?)\s*$/);
    if (m) return m[1].replace(/^Módulo\s+\d+\s*[—-]\s*/i, '').replace(/^Aula\s+\d+\s*[—-]\s*/i, '').trim();
  }
  return null;
}

function extractModuleOrder(slug) {
  const m = slug.match(/modulo-(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

function extractLessonOrder(slug) {
  const m = slug.match(/aula-(\d+)/i);
  return m ? parseInt(m[1], 10) : 0;
}

function extractDurationMap(moduleReadme) {
  // Procura tabela markdown com colunas Aula | Arquivo | Duração sugerida
  const map = {};
  if (!moduleReadme) return map;
  const rows = moduleReadme.split(/\r?\n/).filter((l) => /^\|/.test(l));
  for (const row of rows) {
    const m = row.match(/\|\s*\d+\s*\|\s*\[([^\]]+\.md)\]\([^)]+\)\s*\|\s*(\d+)\s*min/i);
    if (m) {
      map[m[1]] = parseInt(m[2], 10);
    }
  }
  return map;
}

async function copyFile(src, dst) {
  await ensureDir(path.dirname(dst));
  await fs.copyFile(src, dst);
}

async function main() {
  console.log(`[sync-aulas] origem: ${SRC}`);
  console.log(`[sync-aulas] destino: ${DEST}`);

  await rmrf(DEST);
  await ensureDir(DEST);

  const trailSlugs = await listDirs(SRC, TRAIL_PREFIX);
  const trails = [];
  let totalLessons = 0;

  for (const trailSlug of trailSlugs) {
    const trailDir = path.join(SRC, trailSlug);
    const trailReadme = await readMaybe(path.join(trailDir, 'README.md'));
    const trailTitle =
      TRAIL_TITLE_OVERRIDES[trailSlug] ||
      extractH1Title(trailReadme) ||
      trailSlug.replace(TRAIL_PREFIX, '').replace(/-/g, ' ');

    const moduleSlugs = await listDirs(trailDir, MODULE_PREFIX);
    const modules = [];

    for (const moduleSlug of moduleSlugs) {
      const moduleDir = path.join(trailDir, moduleSlug);
      const moduleReadme = await readMaybe(path.join(moduleDir, 'README.md'));
      const moduleTitle =
        extractH1Title(moduleReadme) ||
        moduleSlug.replace(MODULE_PREFIX, '').replace(/^\d+-/, '').replace(/-/g, ' ');
      const order = extractModuleOrder(moduleSlug);
      const durations = extractDurationMap(moduleReadme);

      const lessonFiles = await listFiles(moduleDir, LESSON_PREFIX, '.md');
      const lessons = [];

      for (const lessonFile of lessonFiles) {
        const lessonOrder = extractLessonOrder(lessonFile);
        const srcPath = path.join(moduleDir, lessonFile);
        const md = await readMaybe(srcPath);
        const title = extractH1Title(md) || lessonFile.replace(/\.md$/, '').replace(/^aula-\d+-/, '').replace(/-/g, ' ');
        const slug = lessonFile.replace(/\.md$/, '');
        const relMd = path.posix.join(trailSlug, moduleSlug, lessonFile);

        await copyFile(srcPath, path.join(DEST, relMd));

        lessons.push({
          slug,
          order: lessonOrder,
          title,
          durationMin: durations[lessonFile] ?? 50,
          mdPath: relMd
        });
        totalLessons++;
      }

      // Copia também o README do módulo (não é aula, mas pode ser útil para "intro")
      const moduleReadmeRel = path.posix.join(trailSlug, moduleSlug, 'README.md');
      if (moduleReadme !== null) {
        await copyFile(path.join(moduleDir, 'README.md'), path.join(DEST, moduleReadmeRel));
      }

      modules.push({
        slug: moduleSlug,
        order,
        title: moduleTitle,
        readmePath: moduleReadme !== null ? moduleReadmeRel : null,
        lessons
      });
    }

    trails.push({
      slug: trailSlug,
      title: trailTitle,
      summary: TRAIL_SUMMARIES[trailSlug] || '',
      level: TRAIL_LEVELS[trailSlug] || 'Practitioner',
      language: 'pt-PT',
      durationHours: Math.max(1, Math.round(modules.reduce((acc, m) => acc + m.lessons.reduce((a, l) => a + l.durationMin, 0), 0) / 60)),
      modules
    });
  }

  const index = {
    generatedAt: new Date().toISOString(),
    totalTrails: trails.length,
    totalLessons,
    trails
  };

  await fs.writeFile(path.join(DEST, 'index.json'), JSON.stringify(index, null, 2), 'utf8');

  console.log(`[sync-aulas] OK — ${trails.length} trilhas, ${totalLessons} aulas.`);
}

main().catch((err) => {
  console.error('[sync-aulas] FAIL', err);
  process.exit(1);
});
