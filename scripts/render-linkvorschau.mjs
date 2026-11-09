// Rendert das Healio-Linkvorschaubild (Open Graph, 1200 × 630) headless mit Puppeteer.
// Logo, Claim und Domain liegen vollständig im mittigen Quadrat (630 × 630), damit
// WhatsApp sowohl den breiten als auch den quadratischen Zuschnitt sauber zeigt.
// Die Datei muss unter 300 KB bleiben, größere Bilder zeigt WhatsApp oft nur klein oder gar nicht.
//
// Aufruf: node scripts/render-linkvorschau.mjs [Zieldatei]
// Dateiendung .jpg schreibt JPEG (Qualität 90), .png schreibt PNG.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.resolve(rootDir, process.argv[2] || 'public/images/healio-linkvorschau-v3.jpg');
const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_WIDTH = 470;
const MAX_BYTES = 300 * 1024;
const JPEG_QUALITY = 90;
const isJpeg = /\.jpe?g$/i.test(outFile);

const logoSvg = fs.readFileSync(path.join(rootDir, 'public', 'healio-logo-white-web.svg'), 'utf8');
const logoPath = logoSvg.match(/<path[^>]*\sd="([^"]+)"/)?.[1];
if (!logoPath) throw new Error('Logo-Pfad in public/healio-logo-white-web.svg nicht gefunden.');
const manrope = fs.readFileSync(path.join(rootDir, 'public', 'fonts', 'manrope-latin.woff2')).toString('base64');

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Manrope';
    font-weight: 200 800;
    src: url(data:font/woff2;base64,${manrope}) format('woff2');
  }
  html, body { margin: 0; padding: 0; }
  body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #07111F; }
  .buehne {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background:
      radial-gradient(circle at 50% 47%, rgba(37, 201, 144, 0.20) 0, rgba(37, 201, 144, 0.07) 200px, rgba(37, 201, 144, 0) 340px),
      radial-gradient(ellipse 780px 540px at 50% 50%, #0E2233 0%, #0A1828 55%, #07111F 100%);
    font-family: 'Manrope', sans-serif;
  }
  .deko { position: absolute; inset: 0; width: ${WIDTH}px; height: ${HEIGHT}px; }
  .inhalt {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logo { display: block; width: ${LOGO_WIDTH}px; }
  .claim {
    margin-top: 40px;
    color: rgba(255, 255, 255, 0.92);
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .domain {
    margin-top: 20px;
    color: #25C990;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
</style>
</head>
<body>
  <div class="buehne">
    <svg class="deko" viewBox="0 0 ${WIDTH} ${HEIGHT}" aria-hidden="true">
      <circle cx="600" cy="315" r="288" fill="none" stroke="#25C990" stroke-opacity="0.32" stroke-width="2" />
      <circle cx="600" cy="315" r="262" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1.5" />
      <circle cx="-40" cy="560" r="300" fill="none" stroke="#25C990" stroke-opacity="0.12" stroke-width="2" />
      <circle cx="1240" cy="70" r="300" fill="none" stroke="#25C990" stroke-opacity="0.12" stroke-width="2" />
    </svg>
    <div class="inhalt">
      <svg class="logo" viewBox="0 0 750 300" role="img" aria-label="Healio">
        <path fill="#FFFFFF" fill-rule="evenodd" d="${logoPath}" />
      </svg>
      <div class="claim">Gesundheit und Vorsorge.</div>
      <div class="domain">healio.de</div>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({
  headless: true,
  executablePath: await puppeteer.executablePath(),
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // Logo auf seine tatsächliche Kontur zuschneiden, damit es optisch exakt mittig sitzt.
  const layout = await page.evaluate((logoWidth) => {
    const svg = document.querySelector('.logo');
    const box = svg.querySelector('path').getBBox();
    svg.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
    svg.style.height = `${(logoWidth * box.height) / box.width}px`;
    const rect = (selector) => {
      const r = document.querySelector(selector).getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom) };
    };
    return {
      manropeGeladen: document.fonts.check('600 34px Manrope'),
      logo: rect('.logo'),
      claim: rect('.claim'),
      domain: rect('.domain'),
    };
  }, LOGO_WIDTH);

  if (!layout.manropeGeladen) throw new Error('Manrope wurde nicht geladen.');

  // Sicherheitszone: mittiges Quadrat (630 × 630) mit 40 px Rand.
  const safe = { left: (WIDTH - HEIGHT) / 2 + 40, right: (WIDTH + HEIGHT) / 2 - 40 };
  for (const [name, box] of Object.entries(layout).filter(([key]) => key !== 'manropeGeladen')) {
    if (box.left < safe.left || box.right > safe.right) {
      throw new Error(`${name} ragt aus dem mittigen Quadrat: ${JSON.stringify(box)}`);
    }
  }

  await page.screenshot({
    path: outFile,
    type: isJpeg ? 'jpeg' : 'png',
    ...(isJpeg ? { quality: JPEG_QUALITY } : {}),
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
  const bytes = fs.statSync(outFile).size;
  console.log(`Linkvorschau geschrieben: ${path.relative(rootDir, outFile)} (${Math.round(bytes / 1024)} KB)`);
  console.log(JSON.stringify(layout));
  if (bytes > MAX_BYTES) throw new Error(`Bild ist ${Math.round(bytes / 1024)} KB groß, erlaubt sind höchstens 300 KB.`);
} finally {
  await browser.close();
}
