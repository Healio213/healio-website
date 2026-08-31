import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { assertVercelReleaseContext } from './lib/release-safety.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const contractScripts = [
  'test:homepage',
  'test:company',
  'test:friendly-icons',
  'test:potential-analysis',
  'test:potential-analysis-rendered',
  'test:services',
  'test:kassenboost-bridge',
  'test:kassenboost-rendered',
  'test:bav-model',
  'test:bav-calculator',
  'test:bav-calculator-rendered',
  'test:first-information',
  'test:partner',
  'test:dentists',
  'test:blog-cta',
  'test:conversion',
  'test:ambulant-bonus-model',
  'test:ambulant-bonus-rendered',
  'test:privacy',
  'test:seo',
  'test:seo:rendered',
  'test:about',
];

function run(label, command, args) {
  console.log(`\n[release] ${label}`);
  const result = spawnSync(command, args, {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${label} fehlgeschlagen (Exit ${result.status ?? 'unbekannt'}).`);
  }
}

function main() {
  assertVercelReleaseContext(process.env);

  fs.rmSync(path.join(rootDir, 'dist'), { recursive: true, force: true });
  run('llms.txt prüfen/generieren', process.execPath, ['tools/generate-llms.js']);
  run('Lint', 'npm', ['run', 'lint']);
  run('Vite-Build', 'npx', ['vite', 'build']);
  run('SEO-Seiten erzeugen', process.execPath, ['scripts/generate-seo-pages.mjs']);
  run('Seiten vor-rendern', process.execPath, ['scripts/prerender.mjs']);
  run('Prerender-Ausgabe prüfen', process.execPath, ['scripts/check-prerender-output.mjs']);
  run('Schema und Indexierungsvertrag prüfen', process.execPath, ['scripts/check-schema-index-recovery.mjs']);
  run('SEO-/GEO-Release-Artefakte prüfen', process.execPath, ['scripts/check-release-artifacts.mjs']);

  for (const script of contractScripts) {
    run(`Vertrag ${script}`, 'npm', ['run', script]);
  }

  console.log('\n[release] Freigabebuild vollständig bestanden.');
}

try {
  main();
} catch (error) {
  console.error(`\n[release] ABBRUCH: ${error.message}`);
  process.exitCode = 1;
}
