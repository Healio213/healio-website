#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// public/llms.txt ist bewusst redaktionell gepflegt. Vite kopiert die Datei
// unverändert nach dist/. Dieser historische Build-Einstieg validiert nur noch
// die Source of Truth und darf sie niemals aus React-Routen neu erzeugen.
const CURATED_LLMS_PATH = path.join(process.cwd(), 'public', 'llms.txt');
const REQUIRED_SIGNALS = [
  '# HEALIO GmbH',
  '3.000 EUR',
  'https://healio.de/blog',
];

export function validateCuratedLlmsFile(filePath = CURATED_LLMS_PATH) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`[llms] Gepflegte Source of Truth fehlt: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');

  if (content.trim().length < 1_000) {
    throw new Error('[llms] Die gepflegte llms.txt ist unerwartet kurz.');
  }

  for (const signal of REQUIRED_SIGNALS) {
    if (!content.includes(signal)) {
      throw new Error(`[llms] Pflichtsignal fehlt in public/llms.txt: ${signal}`);
    }
  }

  return content;
}

function main() {
  validateCuratedLlmsFile();
  console.log('[llms] public/llms.txt validiert und als redaktionelle Source of Truth unverändert erhalten.');
}

const isMainModule =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  main();
}
