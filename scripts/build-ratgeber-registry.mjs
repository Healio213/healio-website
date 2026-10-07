/**
 * Ratgeber-Register erzeugen.
 *
 * Liest die Inhaltsdateien unter src/content/ratgeber/ und gliederung.js und
 * schreibt registry.js, registry.overview.js, registry.loaders.js sowie den
 * markierten Ratgeber-Block in public/sitemap.xml. Läuft automatisch vor
 * npm run build und npm run dev; von Hand: npm run ratgeber:register.
 *
 * Mit --check wird nichts geschrieben: Der Aufruf scheitert, wenn eine
 * erzeugte Datei veraltet ist.
 *
 * Ablauf für neue Artikel: siehe Kopfkommentar in src/content/ratgeber/gliederung.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { ratgeberArticles, validateRatgeberSources } from './lib/ratgeber-articles.mjs';
import { PROJECT_ROOT, buildRatgeberRegistryFiles } from './lib/ratgeber-registry.mjs';

const checkOnly = process.argv.includes('--check');

const errors = await validateRatgeberSources();
if (errors.length > 0) {
  console.error(`[ratgeber] Gliederung und Inhaltsdateien passen nicht zusammen (${errors.length}):`);
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
}

const changed = [];
for (const [file, content] of Object.entries(buildRatgeberRegistryFiles())) {
  const target = path.join(PROJECT_ROOT, file);
  if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') === content) continue;
  changed.push(file);
  if (!checkOnly) fs.writeFileSync(target, content);
}

if (checkOnly && changed.length > 0) {
  console.error(`[ratgeber] Veraltet: ${changed.join(', ')}. Bitte npm run ratgeber:register ausführen.`);
  process.exit(1);
}

console.log(
  `[ratgeber] ${ratgeberArticles.length} Artikel im Register; ${
    changed.length > 0 ? `${checkOnly ? 'veraltet' : 'aktualisiert'}: ${changed.join(', ')}` : 'alle erzeugten Dateien aktuell'
  }.`,
);
