// Schalter der Antragsmaske je Sparte und Herkunft über den Link zur Maske
// (19.11.2026). Ohne Browser und ohne Netz: echte Module, per esbuild mit dem
// Alias @ gebündelt; Fenster und Adresse sind Attrappen.
//
// Aufruf: node --test scripts/check-antrag-schalter.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const ENTRY = `
export * from '@/config/contactChannels';
export { adresseMitHerkunft, herkunftAusAdresse, sammleHerkunft, HERKUNFT_PARAMETER } from '@/lib/antragsmaske/herkunft';
export { bereinigeHerkunft, leseHerkunft } from '@/lib/herkunftSpeicher';
export { storeReferrer } from '@/lib/referrer';
`;

// env: Ersatz für import.meta.env (Entwicklungsmodus nur mit DEV: true). Jeder Aufruf lädt frisch (eigene Adresse).
let lauf = 0;
async function lade(env = {}) {
  const ergebnis = await build({
    stdin: { contents: ENTRY, resolveDir: SRC, loader: 'js' },
    bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
    alias: { '@': SRC },
    define: { 'import.meta.env': JSON.stringify(env) },
  });
  const url = `data:text/javascript;base64,${Buffer.from(ergebnis.outputFiles[0].text).toString('base64')}`;
  lauf += 1;
  return import(`${url}#lauf-${lauf}`);
}

function fenster({ pfad = '/ambulant', suche = '', verweis = '' } = {}) {
  const karte = (m) => ({ getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) });
  const sitzung = new Map();
  globalThis.window = {
    location: { pathname: pfad, search: suche, origin: 'https://healio.de', href: `https://healio.de${pfad}${suche}` },
    sessionStorage: karte(sitzung), localStorage: karte(new Map()),
    addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => true,
  };
  globalThis.document = { referrer: verweis, cookie: '' };
  return sitzung;
}
function aufraeumen() { delete globalThis.window; delete globalThis.document; }

// Seit 19.11.2026 (Franks Ja) Stationär, seit 21.11.2026 (Franks Ja „Ambulant an“) auch Ambulant mit Maske und Wahl an,
// ohne Telefonweg; Zahn und alles andere aus.
test('Vorgabe: genau Stationär und Ambulant an (Maske und Wahl, kein Telefonweg), auch im Build mit gesetzten VITE-Werten', async () => {
  fenster();
  for (const env of [{}, { DEV: false, VITE_ANTRAGSMASKE: '1', VITE_ANTRAGSWAHL: '1', VITE_ANTRAG_TELEFON: '1' }]) {
    const m = await lade(env);
    for (const sparte of ['ambulant', 'zahn', 'stationaer']) {
      const an = sparte === 'stationaer' || sparte === 'ambulant';
      assert.equal(m.antragsmaskeAktiv(sparte), an, `Maske ${sparte}`);
      assert.equal(m.antragswahlAktiv(sparte), an, `Wahl ${sparte}`);
      assert.equal(m.antragTelefonAktiv(sparte), false, `Telefon ${sparte}`);
    }
    assert.equal(m.HEALIO_ANTRAG_IRGENDEINE_SPARTE_AKTIV, true);
    assert.equal(m.antragsmaskeAktiv('zahn-ukv'), false, 'unbekannte Sparte bleibt aus');
    assert.equal(m.HEALIO_ANTRAG_GESPRAECH_AKTIV, true, 'Antragsgespräch ambulant (heute versteckt live) unverändert an');
  }
  aufraeumen();
});

test('Freigabe im Quelltext: genau Stationär und Ambulant bei Maske und Wahl, Zahn aus, Telefonweg überall aus', () => {
  const text = fs.readFileSync(path.join(SRC, 'config/contactChannels.js'), 'utf8');
  for (const name of ['ANTRAGSMASKE_FREIGABE', 'ANTRAGSWAHL_FREIGABE']) {
    assert.match(text, new RegExp(`const ${name} = \\{ ambulant: true, zahn: false, stationaer: true \\};`), name);
  }
  assert.match(text, /const ANTRAG_TELEFON_FREIGABE = \{ ambulant: false, zahn: false, stationaer: false \};/);
  assert.match(text, /const ANTRAGSMASKE_UKV_ZAHN_FREIGABE = false;/);
  // Kein alter Gesamtschalter mehr, der alle Sparten auf einmal einschaltet.
  const alle = fs.readdirSync(SRC, { recursive: true }).filter((f) => /\.(jsx?|tsx?)$/.test(f));
  const alt = alle.filter((f) => /HEALIO_ANTRAGSMASKE_AKTIV|HEALIO_ANTRAGSWAHL_AKTIV/.test(fs.readFileSync(path.join(SRC, f), 'utf8')));
  assert.deepEqual(alt, [], 'keine Verwendung der alten Gesamtschalter');
});

test('schalterJeSparte: 1 alle an, 0 alle aus, Liste genau diese, sonst Freigabe', async () => {
  fenster();
  const { schalterJeSparte } = await lade();
  const aus = { ambulant: false, zahn: false, stationaer: false };
  assert.deepEqual({ ...schalterJeSparte(aus, '1') }, { ambulant: true, zahn: true, stationaer: true });
  assert.deepEqual({ ...schalterJeSparte({ ambulant: true }, '0') }, aus);
  assert.deepEqual({ ...schalterJeSparte(aus, 'stationaer, zahn') }, { ambulant: false, zahn: true, stationaer: true });
  assert.deepEqual({ ...schalterJeSparte({ zahn: true, ukv: true }, undefined) }, { ambulant: false, zahn: true, stationaer: false });
  assert.deepEqual({ ...schalterJeSparte({ zahn: 'ja' }, undefined) }, aus, 'nur true zählt');
  aufraeumen();
});

test('Entwicklungsmodus: je Sparte getrennt; Telefonweg braucht eigenen Schalter', async () => {
  fenster();
  const m = await lade({ DEV: true, VITE_ANTRAGSMASKE: 'stationaer', VITE_ANTRAGSWAHL: 'ambulant,stationaer', VITE_ANTRAG_TELEFON: 'ambulant' });
  assert.deepEqual(['ambulant', 'zahn', 'stationaer'].map(m.antragsmaskeAktiv), [false, false, true]);
  assert.deepEqual(['ambulant', 'zahn', 'stationaer'].map(m.antragswahlAktiv), [true, false, true]);
  assert.deepEqual(['ambulant', 'zahn', 'stationaer'].map(m.antragTelefonAktiv), [true, false, false]);
  assert.equal(m.HEALIO_ANTRAG_IRGENDEINE_SPARTE_AKTIV, true);
  aufraeumen();
});

test('Herkunft: neue Felder letzteSeite (Pfad ≤ 200) und verweiser (Hostname ≤ 100), Unsauberes fällt weg', async () => {
  fenster();
  const { bereinigeHerkunft } = await lade();
  const gut = bereinigeHerkunft({ letzteSeite: '/Ambulant/Osteopathie', verweiser: 'WWW.Google.com' });
  assert.equal(gut.letzteSeite, '/ambulant/osteopathie');
  assert.equal(gut.verweiser, 'www.google.com');
  assert.equal(bereinigeHerkunft({ letzteSeite: `/${'a'.repeat(199)}` }).letzteSeite, `/${'a'.repeat(199)}`);
  assert.equal(bereinigeHerkunft({ letzteSeite: `/${'a'.repeat(200)}` }).letzteSeite, null, 'über 200 Zeichen');
  assert.equal(bereinigeHerkunft({ letzteSeite: '/ambulant?mail=a@b.de' }).letzteSeite, '/ambulant', 'Suchteil wird abgeschnitten');
  assert.equal(bereinigeHerkunft({ letzteSeite: '/ratgeber/ikk_bonus' }).letzteSeite, '/ratgeber/ikk_bonus', 'Unterstrich erlaubt');
  for (const schlecht of ['//evil.de', '/a//b', '/llms.txt', '/a%20b', 'ambulant']) {
    assert.equal(bereinigeHerkunft({ letzteSeite: schlecht }).letzteSeite, null, schlecht);
  }
  assert.equal(bereinigeHerkunft({ verweiser: `${'a'.repeat(97)}.com` }).verweiser, null, 'über 100 Zeichen');
  assert.equal(bereinigeHerkunft({ verweiser: `${'a'.repeat(96)}.com` }).verweiser, `${'a'.repeat(96)}.com`, 'genau 100 Zeichen');
  for (const schlecht of ['https://www.google.com/', 'google.com/suche', 'a b.de', 'x@y.de', '-x.de', 'x..de', '192.168.1.1', 'google.com:443']) {
    assert.equal(bereinigeHerkunft({ verweiser: schlecht }).verweiser, null, schlecht);
  }
  assert.deepEqual(Object.keys(bereinigeHerkunft({ gclid: 'x', fbclid: 'y', email: 'a@b.de' })).sort(), ['einstiegsseite', 'letzteSeite', 'ref', 'sparte', 'utm', 'verweiser', 'weg']);
  aufraeumen();
});

test('Wahl → Maske: Herkunft in der Adresse ohne Zustimmung und ohne Gerätespeicher, ohne Klick-Kennungen', async () => {
  // Zielseite /ambulant, aufgerufen mit ?ref=TEST1&utm_source=… und gclid, kommend von google.
  const sitzung = fenster({ pfad: '/ambulant', suche: '?ref=TEST1&utm_source=newsletter&utm_campaign=herbst&gclid=abc&fbclid=def', verweis: 'https://www.google.com/search?q=x' });
  const m = await lade();
  m.storeReferrer('TEST1'); // wie useReferrer beim Laden
  const herkunft = m.sammleHerkunft({ sparte: 'ambulant', weg: 'allein', letzteSeite: '/ambulant' });
  assert.deepEqual(herkunft, {
    ref: 'TEST1', utm: { utm_source: 'newsletter', utm_campaign: 'herbst' }, einstiegsseite: '/ambulant', sparte: 'ambulant', weg: 'allein', letzteSeite: '/ambulant', verweiser: 'www.google.com',
  });
  const link = m.adresseMitHerkunft('/antrag/ambulant', herkunft);
  assert.equal(link, '/antrag/ambulant?ref=TEST1&utm_source=newsletter&utm_campaign=herbst&einstiegsseite=%2Fambulant&letzteSeite=%2Fambulant&verweiser=www.google.com');
  assert.ok(!/gclid|fbclid|sparte|weg=/.test(link), 'keine Klick-Kennungen, Sparte und Weg nicht in der Adresse');
  assert.equal(sitzung.size, 0, 'ohne Zustimmung nichts im Sitzungsspeicher');
  assert.equal(m.adresseMitHerkunft('/antrag/aufnehmen?sparte=zahn', { ref: 'TEST1' }), '/antrag/aufnehmen?sparte=zahn&ref=TEST1');
  assert.equal(m.adresseMitHerkunft('/antrag/zahn', {}), '/antrag/zahn', 'ohne Herkunft keine Parameter');
  aufraeumen();

  // Neue Seite /antrag/ambulant (volles Neuladen, eigener Verweis healio.de zählt nicht): Herkunft aus der Adresse.
  fenster({ pfad: '/antrag/ambulant', suche: link.slice(link.indexOf('?')), verweis: 'https://healio.de/ambulant' });
  const maske = await lade();
  assert.deepEqual(maske.herkunftAusAdresse(), {
    ref: 'TEST1', utm: { utm_source: 'newsletter', utm_campaign: 'herbst' }, einstiegsseite: '/ambulant', letzteSeite: '/ambulant', verweiser: 'www.google.com',
  });
  assert.deepEqual(maske.sammleHerkunft({ sparte: 'ambulant', weg: 'allein' }), {
    ref: 'TEST1', utm: { utm_source: 'newsletter', utm_campaign: 'herbst' }, einstiegsseite: '/ambulant', sparte: 'ambulant', weg: 'allein', letzteSeite: '/ambulant', verweiser: 'www.google.com',
  }, 'Einstiegsseite bleibt /ambulant, nicht /antrag/ambulant');
  aufraeumen();

  // Maske direkt aufgerufen, ohne Kennzeichen: nur die eigene Einstiegsseite, kein Verweiser, keine letzte Seite.
  fenster({ pfad: '/antrag/zahn', suche: '?verweiser=http%3A%2F%2Fx&letzteSeite=%2Fa.b', verweis: '' });
  const direkt = await lade();
  assert.equal(direkt.herkunftAusAdresse(), null, 'unsaubere Werte in der Adresse fallen weg');
  assert.deepEqual(direkt.sammleHerkunft({ sparte: 'zahn', weg: 'allein' }), {
    ref: null, utm: {}, einstiegsseite: '/antrag/zahn', sparte: 'zahn', weg: 'allein', letzteSeite: null, verweiser: null,
  });
  aufraeumen();
});

test('Quelltext: Wahl, Maske und Gespräch lesen die Schalter je Sparte', () => {
  const lies = (datei) => fs.readFileSync(path.join(SRC, datei), 'utf8');
  assert.match(lies('components/LeadCaptureProvider.jsx'), /antragswahlAktiv\(link\.sparte\)/);
  const wahl = lies('components/antragsmaske/WegeWahl.jsx');
  assert.match(wahl, /antragsmaskeAktiv\(sparte\)/);
  assert.match(wahl, /antragTelefonAktiv\(sparte\)/);
  assert.match(wahl, /adresseMitHerkunft\(`\/antrag\/\$\{eigene\.pfad\}`/);
  assert.match(lies('pages/AntragsmaskePage.jsx'), /antragsmaskeAktiv\(definition\.sparte\)/);
  assert.match(lies('pages/AntragAufnehmenPage.jsx'), /!antragswahlAktiv\(sparte\) \|\| !antragTelefonAktiv\(sparte\)/);
  for (const datei of ['components/antragsmaske/rahmen.jsx', 'components/antragsmaske/teile.jsx', 'components/antragsmaske/ZahnStrecke.jsx', 'components/antragsmaske/SchrittFrage.jsx']) {
    assert.doesNotMatch(lies(datei), /HEALIO_ANTRAG_GESPRAECH_AKTIV/, `${datei}: Telefonweg nur über antragTelefonAktiv`);
  }
});

// Nachbesserung 22.11.2026: Die FAQ auf /ambulant zum Klick auf den Rechner hängt am Schalter (wie direkteMaske),
// das Geburtsjahr geht vom Kopfknopf (/ambulant) und von den Knöpfen auf /ambulant/osteopathie an die Maske.
test('Quelltext: FAQ /ambulant am Schalter, Geburtsjahr vom Kopfknopf und von osteopathie', async () => {
  const lies = (datei) => fs.readFileSync(path.join(SRC, datei), 'utf8');
  const faqs = lies('components/sections/ambulant/ambulantFaqs.js');
  assert.match(faqs, /antragsmaskeAktiv\('ambulant'\) && antragswahlAktiv\('ambulant'\) && !antragTelefonAktiv\('ambulant'\)/);
  assert.match(faqs, /a: AMBULANT_DIREKT\s*\?/);
  const { AMBULANT_FAQS } = await import('../src/components/sections/ambulant/ambulantFaqs.js');
  const antwort = AMBULANT_FAQS.de.find((eintrag) => eintrag.q === 'Was passiert nach dem Klick auf den Rechner?').a;
  assert.match(antwort, /^Du kommst direkt in unseren Online-Antrag/, 'Ambulant an: FAQ nennt den direkten Antrag');
  const kopf = lies('components/Header.jsx');
  assert.match(kopf, /vorbelegung=\{selfServiceVorbelegung\}/);
  assert.match(lies('pages/AmbulantPage.jsx'), /setAmbulantGeburtsjahr\(parseGeburtsjahr\(geburtsjahrEingabe\)\)/);
  assert.match(lies('pages/AmbulantAnlassPage.jsx'), /'data-vorbelegung-geburtsjahr': geburtsjahrRechner/);
  assert.match(lies('components/LeadCaptureProvider.jsx'), /getAttribute\('data-vorbelegung-geburtsjahr'\)/);
});
