import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const llmsPath = path.join(projectRoot, 'public', 'llms.txt');
const generatorPath = path.join(projectRoot, 'tools', 'generate-llms.js');
const blogCachePath = path.join(projectRoot, 'public', 'data', 'blog-articles-cache.json');

const before = fs.readFileSync(llmsPath, 'utf8');
const blogArticles = JSON.parse(fs.readFileSync(blogCachePath, 'utf8'));
const publishedSlugs = new Set(blogArticles.map((article) => article.slug));

assert.doesNotMatch(
  before,
  /(?:der|beim)?\s*empfohlene[rn]?\s+Tarif(?:wahl)?\s+(?:ist\s+)?(?:\*\*)?AP1/i,
  'llms.txt darf AP1 nicht pauschal als empfohlenen Tarif darstellen.',
);
assert.match(
  before,
  /Ob AP1 oder eine günstigere Erstattungsstufe passt,[\s\S]*individuell geprüft\./,
  'llms.txt muss die AP1-Auswahl als individuelle Prüfung einordnen.',
);

const requiredBlogLinks = [
  'gesundheitsbudget-3000-euro',
  'heilpraktiker-zusatzversicherung-vergleich-2026',
  'ikk-classic-bonus-700-euro',
];

assert.match(before, /\[Alle Healio-Ratgeberartikel\]\(https:\/\/healio\.de\/blog\)/, 'Der Ratgeber-Hub fehlt in llms.txt.');
for (const slug of requiredBlogLinks) {
  assert(publishedSlugs.has(slug), `Verlinkter Ratgeber ist nicht im geprüften Blog-Cache: ${slug}`);
  assert(
    before.includes(`https://healio.de/blog/${slug}`),
    `Direkter Ratgeber-Link fehlt in llms.txt: ${slug}`,
  );
}

const validationRun = spawnSync(process.execPath, [generatorPath], {
  cwd: projectRoot,
  encoding: 'utf8',
});

assert.equal(
  validationRun.status,
  0,
  `llms-Validierung ist fehlgeschlagen: ${validationRun.stderr || validationRun.stdout}`,
);
assert.match(
  validationRun.stdout,
  /redaktionelle Source of Truth unverändert erhalten/,
  'Der Build-Einstieg muss die redaktionelle Source of Truth ausdrücklich erhalten.',
);
assert.equal(
  fs.readFileSync(llmsPath, 'utf8'),
  before,
  'tools/generate-llms.js darf public/llms.txt nicht verändern.',
);

console.log(`llms/GEO-Vertrag erfüllt: ${requiredBlogLinks.length} direkte Ratgeber-Links und unveränderliche Source of Truth.`);
