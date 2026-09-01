import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const checksum = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');

const app = read('src/App.jsx');
const header = read('src/components/Header.jsx');
const page = read('src/pages/ZahnaerztePraxisChecklistePage.jsx');
const privacy = read('src/pages/DatenschutzPage.jsx');
const seoRoutes = read('scripts/seo-routes.mjs');
const seoContract = read('scripts/check-site-seo.mjs');
const sitemap = read('public/sitemap.xml');
const publicPdfPath = path.join(root, 'public/downloads/praxis-checkliste-zahnaerzte-2026-08.pdf');
const sourcePdfPath = path.resolve(root, '../../Healio/Marketing/leadgen-ads/HEALIO-LEITFADEN-zahnaerzte.pdf');
const publicPdf = fs.readFileSync(publicPdfPath);

const checks = [
  ['React page is lazy-loaded', app.includes("import('@/pages/ZahnaerztePraxisChecklistePage')")],
  ['German checklist route exists', app.includes('path="zahnaerzte/praxis-checkliste" element={<ZahnaerztePraxisChecklistePage />}')],
  ['Header is solid on the checklist route', header.includes("'/zahnaerzte/praxis-checkliste'")],
  ['Page is noindex and nofollow', page.includes('robots="noindex, nofollow"')],
  ['Static SEO route is noindex and nofollow', /path: '\/zahnaerzte\/praxis-checkliste'[\s\S]*?robots: 'noindex, nofollow'/.test(seoRoutes)],
  ['SEO contract knows the route is noindex', seoContract.includes("'/zahnaerzte/praxis-checkliste'")],
  ['Noindex page is absent from sitemap', !sitemap.includes('https://healio.de/zahnaerzte/praxis-checkliste')],
  ['Download is one click and same-origin', page.includes("href={DOWNLOAD_PATH}") && page.includes('download="Healio-Praxis-Checkliste-Zahnaerzte-2026-08.pdf"')],
  ['Download has no patient or practice tracking parameter', !/[?&](?:ref|utm_|practice|praxis)/i.test(page.match(/const DOWNLOAD_PATH[^;]+/)?.[0] || '')],
  ['B2B status and chamber gate are explicit', page.includes('B2B-Arbeitsunterlage') && page.includes('zuständigen Landeszahnärztekammer') && page.includes('schriftliche berufsrechtliche Einschätzung')],
  ['Patient-facing and advisory exclusions are explicit', page.includes('keine Patienteninformation') && page.includes('keine Rechtsberatung') && page.includes('keine Versicherungsberatung')],
  ['Imprint, privacy and initial information are linked', page.includes('to="/impressum"') && page.includes('to="/datenschutz"') && page.includes('to="/erstinformation"')],
  ['Inactive LinkedIn lead form is not described publicly', !privacy.includes('LinkedIn Lead Gen Formulare') && !privacy.includes('Operativer Prüfhinweis')],
  ['Public download is a non-trivial PDF', publicPdf.subarray(0, 5).toString('ascii') === '%PDF-' && publicPdf.length > 100_000],
];

if (fs.existsSync(sourcePdfPath)) {
  const sourcePdf = fs.readFileSync(sourcePdfPath);
  checks.push(['Published download matches the current marketing source PDF', checksum(publicPdf) === checksum(sourcePdf)]);
}

const failed = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} Zahnärzte-checklist contract check(s) failed.`);
  process.exit(1);
}

console.log(`\n${checks.length} Zahnärzte-checklist contract checks passed.`);
