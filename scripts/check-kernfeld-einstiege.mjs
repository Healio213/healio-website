// Einstiegskarten auf /zahn, /schwangerschaft und /ambulant zu den Anlassseiten:
// Karte im gerenderten HTML, Link stimmt, Zähler nimmt den Klick an, englische
// Hauptseiten bleiben ohne Karte. Der Teil mit dem gerenderten HTML läuft nur,
// wenn dist/ gebaut ist.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { baueZaehlerEintrag } from '../shared/anonyme-zaehler.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

const KARTEN = [
  { feld: 'zahn', von: '/zahn', ziel: '/zahn/behandlung-steht-an', titel: 'Behandlung steht an' },
  { feld: 'schwangerschaft', von: '/schwangerschaft', ziel: '/schwangerschaft/baby-geplant', titel: 'Baby geplant' },
  { feld: 'ambulant', von: '/ambulant', ziel: '/ambulant/osteopathie', titel: 'Osteopathie: Kasse plus Tarif' },
];

for (const k of KARTEN) {
  const eintrag = baueZaehlerEintrag('leistungsweg_klick', { vonPfad: k.von, ziel: k.ziel }, 'mobil');
  check(eintrag && eintrag.von_pfad === k.von && eintrag.ziel === k.ziel && Object.keys(eintrag).length === 4,
    `Zähler: Klick ${k.von} -> ${k.ziel} muss als leistungsweg_klick mit vier Feldern gezählt werden.`);
}

const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  const read = (route) => fs.readFileSync(path.join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8');
  for (const k of KARTEN) {
    const html = read(k.von);
    const treffer = html.match(new RegExp(`<section[^>]*data-kernfeld-anlass-karte="${k.feld}"[^>]*>[\\s\\S]*?</section>`));
    check(Boolean(treffer), `${k.von}: Einstiegskarte fehlt im gerenderten HTML.`);
    if (treffer) {
      check(treffer[0].includes(`href="${k.ziel}"`), `${k.von}: Link der Karte muss auf ${k.ziel} führen.`);
      check(treffer[0].includes(k.titel), `${k.von}: Kartentitel „${k.titel}“ fehlt.`);
      check(!/<h[1-6]/.test(treffer[0]), `${k.von}: Die Karte bringt keine eigene Überschrift mit.`);
    }
    check((html.match(/data-kernfeld-anlass-karte=/g) || []).length === 1, `${k.von}: genau eine Einstiegskarte.`);
  }
  for (const route of ['/en/dental', '/en/outpatient']) {
    const file = path.join(dist, route.replace(/^\//, ''), 'index.html');
    if (fs.existsSync(file)) check(!fs.readFileSync(file, 'utf8').includes('data-kernfeld-anlass-karte'), `${route}: englische Hauptseite bekommt keine Karte.`);
  }
}

if (failures.length) {
  console.error(failures.map((f) => `- ${f}`).join('\n'));
  process.exit(1);
}
console.log(`Kernfeld-Einstiege: 3 Karten, Zähler-Einträge${fs.existsSync(dist) ? ' und gerendertes HTML' : ''} geprüft.`);
