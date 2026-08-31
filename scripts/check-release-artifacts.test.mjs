import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { validateReleaseArtifacts } from './check-release-artifacts.mjs';

function fixture() {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'healio-release-artifacts-'));
  fs.mkdirSync(path.join(rootDir, 'dist', 'kassenboost'), { recursive: true });

  fs.writeFileSync(path.join(rootDir, 'dist', 'index.html'), `
    <html><head>
      <link rel="canonical" href="https://healio.de">
      <meta name="robots" content="index, follow">
    </head><body><div id="root"><h1>Healio</h1><p>${'Vertrauenswürdiger Inhalt '.repeat(20)}</p></div></body></html>
  `);
  fs.writeFileSync(path.join(rootDir, 'dist', 'kassenboost', 'index.html'), `
    <html><head>
      <link rel="canonical" href="https://healio.de/kassenboost">
      <meta name="robots" content="index, follow">
    </head><body><div id="root"><h1>KassenBoost</h1><p>${'Verständlicher Vergleich '.repeat(20)}</p></div></body></html>
  `);
  fs.writeFileSync(path.join(rootDir, 'dist', 'robots.txt'), [
    'User-agent: *',
    'Allow: /',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    'User-agent: ChatGPT-User',
    'Allow: /',
    'User-agent: PerplexityBot',
    'Allow: /',
    'Sitemap: https://healio.de/sitemap.xml',
  ].join('\n'));
  fs.writeFileSync(path.join(rootDir, 'dist', 'sitemap.xml'), [
    '<urlset>',
    '<url><loc>https://healio.de/</loc><lastmod>2026-08-30</lastmod></url>',
    '<url><loc>https://healio.de/kassenboost</loc><lastmod>2026-08-30</lastmod></url>',
    '</urlset>',
  ].join(''));
  fs.writeFileSync(path.join(rootDir, 'dist', 'llms.txt'), [
    '# HEALIO GmbH',
    `Healio erklärt Gesundheitsbudget und Kassenbonus. ${'Klare, belegte Einordnung für Kunden und Suchsysteme. '.repeat(12)}`,
    '- [Startseite](https://healio.de/)',
    '- [KassenBoost](https://healio.de/kassenboost)',
  ].join('\n'));
  fs.writeFileSync(path.join(rootDir, 'dist', 'release.json'), JSON.stringify({
    site: 'healio.de',
    source: 'github.com/Healio213/healio-website',
    commitSha: 'a'.repeat(40),
    branch: 'main',
    environment: 'test',
    builtAt: '2026-08-31T12:00:00.000Z',
  }));

  return rootDir;
}

test('Release-Artefakte binden kritische Seiten, Sitemap und KI-Suchcrawler zusammen', () => {
  const rootDir = fixture();
  try {
    const result = validateReleaseArtifacts({
      rootDir,
      routes: [
        { path: '/', canonical: 'https://healio.de' },
        { path: '/kassenboost', canonical: 'https://healio.de/kassenboost' },
      ],
    });
    assert.deepEqual(result.errors, []);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test('Release-Artefakte scheitern ohne eindeutigen Quellen- und Commit-Nachweis', () => {
  const rootDir = fixture();
  try {
    fs.rmSync(path.join(rootDir, 'dist', 'release.json'));
    const result = validateReleaseArtifacts({
      rootDir,
      routes: [{ path: '/', canonical: 'https://healio.de' }],
    });
    assert.match(result.errors.join('\n'), /Release-Nachweis/);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test('Release-Artefakte scheitern bei falschem Canonical oder fehlendem OAI-SearchBot', () => {
  const rootDir = fixture();
  try {
    const page = path.join(rootDir, 'dist', 'kassenboost', 'index.html');
    fs.writeFileSync(page, fs.readFileSync(page, 'utf8').replace(
      'https://healio.de/kassenboost',
      'https://healio.de/ambulant',
    ));
    const robots = path.join(rootDir, 'dist', 'robots.txt');
    fs.writeFileSync(robots, fs.readFileSync(robots, 'utf8').replace(
      'User-agent: OAI-SearchBot\nAllow: /\n',
      '',
    ));

    const result = validateReleaseArtifacts({
      rootDir,
      routes: [
        { path: '/', canonical: 'https://healio.de' },
        { path: '/kassenboost', canonical: 'https://healio.de/kassenboost' },
      ],
    });
    assert.match(result.errors.join('\n'), /Canonical/);
    assert.match(result.errors.join('\n'), /OAI-SearchBot/);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});
