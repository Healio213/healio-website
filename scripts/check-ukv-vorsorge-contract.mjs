import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { build } from 'esbuild';

// UKV-Vorsorge-Baustein auf /ambulant und /en/outpatient (Frank 05.10.2026).
// Festgeschrieben wird:
// - Der Baustein ist eine kompakte Zusatzoption unter der SDK-Tarifwahl, nur auf
//   /ambulant und /en/outpatient, nicht auf der Heilpraktiker-Adresse, nicht auf
//   dem neutralen Themen-Anschluss und ohne eigenen Hauptknopf. Sichtbar sind
//   nur Nutzen, drei Beispiele, Leistung und Beitrag, zwei Pflichtangaben, der
//   Knopf und der SDK-Verweis; alles Weitere steht im Aufklapper „Alle Details“.
// - Nur die freigegebenen UKV-Zahlen (Beiträge gültig ab 01.05.2026), DE und EN
//   synchron, keine Formulierungen aus der Sperrliste der Recherche. Die SDK-
//   Stufen werden richtig beschrieben: Jede hat eigene Töpfe für Vorsorge und
//   Sehhilfen (200 bis 500 EUR in zwei Jahren).
// - Der Abschlusslink ist Franks gefilterter UKV-Link: dieselbe Rohadresse wie
//   der Zahn-Link, nur tarifftypes=Ambulant und tariffs=UKVVorsorgePRIVAT@,
//   Agent-Nummern und alle übrigen Parameter identisch. Der Zahn-Link bleibt
//   auf tarifftypes=Zahn. Der Klick zählt als „Antrag geöffnet“ ohne Daten.
// - Franks Entscheidung 05.10.2026: Auf der Website und im Nita-Wissen steht
//   NUR der Vorsorge-Baustein. NaturPRIVAT wird nirgends genannt; für den
//   umfassenden ambulanten Schutz bleibt ausschließlich die SDK.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readJson = (file) => JSON.parse(read(file));

const flow = read('src/components/sections/ambulant/AmbulantConversionFlow.jsx');
const page = read('src/pages/AmbulantPage.jsx');
const component = read('src/components/sections/ambulant/AmbulantVorsorgeBaustein.jsx');
const links = read('src/components/sections/ambulant/ukvAmbulantLinks.js');
const dentalLinks = read('src/components/sections/dental/dentalLinks.js');
const de = readJson('src/i18n/locales/de/ambulant.json').vorsorgeBaustein;
const en = readJson('src/i18n/locales/en/ambulant.json').vorsorgeBaustein;
const knowledge = read('public/mia-knowledge-base.txt');

assert(de && en, 'Der Vorsorge-Baustein braucht Texte in DE und EN.');

// 1. DE und EN haben dieselbe Struktur.
const shape = (value) => {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]));
  return typeof value;
};
assert.deepEqual(shape(en), shape(de), 'DE und EN des Vorsorge-Bausteins müssen dieselben Schlüssel und Listenlängen haben.');

// 2. Platzierung: unter der SDK-Tarifwahl, vor der IKK-Wechsel-Strecke, nur auf
//    /ambulant und /en/outpatient.
const tarifStart = flow.indexOf('id="tarifwahl"');
const bausteinAt = flow.indexOf('<AmbulantVorsorgeBaustein />');
const overviewAt = flow.indexOf('{copy.tiers.overviewTitle}');
const ikkAt = flow.indexOf('<AmbulantIKKWechsel variant="ambulant" />');
assert(tarifStart > -1 && overviewAt > tarifStart && bausteinAt > overviewAt, 'Der Vorsorge-Baustein steht unter der SDK-Tarifübersicht.');
assert(bausteinAt < ikkAt, 'Die IKK-Wechsel-Strecke bleibt direkt nach dem Tarifwahl-Abschnitt.');
assert.equal((flow.match(/<AmbulantVorsorgeBaustein \/>/g) || []).length, 1, 'Der Vorsorge-Baustein erscheint genau einmal.');
assert(/\{showVorsorgeBaustein && <AmbulantVorsorgeBaustein \/>\}/.test(flow), 'Der Baustein erscheint nur mit der Routen-Freigabe.');
assert(/const showVorsorgeBaustein = !fromBonusTopic\s*&& \(vorsorgePath === '\/ambulant' \|\| vorsorgePath === '\/en\/outpatient'\);/.test(flow), 'Der Baustein gilt nur für /ambulant und /en/outpatient, nie auf dem Themen-Anschluss.');
assert(/const vorsorgePath = pathname\.replace\(\/\\\/\+\$\/, ''\);/.test(flow) && /const \{ pathname \} = useLocation\(\);/.test(flow), 'Die Freigabe richtet sich nach der aktuellen Adresse.');
assert(!/heilpraktiker-zusatzversicherung/.test(flow), 'Auf der Heilpraktiker-Adresse erscheint der Baustein nicht.');
assert(/<AmbulantConversionFlow\s+fromBonusTopic=\{fromBonusTopic\}\s*\/>/.test(page), 'AmbulantPage bleibt unverändert.');

// 3. Knopf und Abschlusslink. Die Module werden echt gebündelt und ausgeführt.
assert(!/https?:\/\//.test(links), 'ukvAmbulantLinks.js enthält keine eigene Adresse, der Link kommt aus dentalLinks.js.');
assert(/import \{ UKV_AMBULANT_URL \} from '@\/components\/sections\/dental\/dentalLinks';/.test(links), 'Der Vorsorge-Link kommt aus derselben Rohadresse wie der Zahn-Link.');
assert(/export const UKV_AMBULANT_URL = requireSafeProviderUrl\(UKV_AMBULANT_RAW_URL, PROVIDER_RULES\.ukvAmbulant, /.test(dentalLinks), 'Der Vorsorge-Link läuft durch requireSafeProviderUrl.');
assert(/tarifftypes=Zahn&/.test(dentalLinks) && /tarifftypes: 'Zahn'/.test(dentalLinks), 'Die Rohadresse und die Zahn-Regel bleiben auf tarifftypes=Zahn.');

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ukv-vorsorge-'));
const outFile = path.join(outDir, 'links.mjs');
await build({
  stdin: {
    contents: `export { UKV_URL } from '@/components/sections/dental/dentalLinks';
export { getUkvAmbulantUrl } from '@/components/sections/ambulant/ukvAmbulantLinks';`,
    resolveDir: root,
    loader: 'js',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  alias: { '@': path.join(root, 'src') },
  outfile: outFile,
  logLevel: 'silent',
});
const mod = await import(pathToFileURL(outFile).href);
fs.rmSync(outDir, { recursive: true, force: true });

const zahnUrl = mod.UKV_URL;
const vorsorgeUrl = mod.getUkvAmbulantUrl();
assert(typeof vorsorgeUrl === 'string' && vorsorgeUrl.startsWith('https://insurances-online.levelnine.biz/?'), 'Der Vorsorge-Link ist gesetzt und zeigt auf die UKV-Strecke.');
const zahn = new URL(zahnUrl).searchParams;
const vorsorge = new URL(vorsorgeUrl).searchParams;
assert.equal(zahn.get('tarifftypes'), 'Zahn', 'Der Zahn-Link bleibt auf tarifftypes=Zahn.');
assert.equal(zahn.get('tariffs'), '', 'Der Zahn-Link bleibt ohne Tarifvorauswahl.');
assert.equal(vorsorge.get('tarifftypes'), 'Ambulant', 'Der Vorsorge-Link filtert auf tarifftypes=Ambulant.');
assert.equal(vorsorge.get('tariffs'), 'UKVVorsorgePRIVAT@', 'Der Vorsorge-Link wählt nur VorsorgePRIVAT vor.');
assert.equal(vorsorge.get('insurers'), '37', 'insurers bleibt 37.');
assert.deepEqual([...vorsorge.keys()], [...zahn.keys()], 'Der Vorsorge-Link hat dieselben Parameter in derselben Reihenfolge wie der Zahn-Link.');
for (const [key, value] of zahn.entries()) {
  if (key === 'tarifftypes' || key === 'tariffs') continue;
  assert.equal(vorsorge.get(key), value, `Parameter ${key} muss beim Vorsorge-Link gleich dem Zahn-Link sein (Agent-Nummern nie ändern).`);
}
assert.equal(
  vorsorgeUrl,
  zahnUrl.replace('&tarifftypes=Zahn&', '&tarifftypes=Ambulant&').replace('&tariffs=&', '&tariffs=UKVVorsorgePRIVAT@&'),
  'Außer tarifftypes und tariffs bleibt der Link Zeichen für Zeichen gleich.',
);

assert(/href=\{ukvUrl\}\s*target="_blank"\s*rel="noopener noreferrer"\s*onClick=\{\(\) => trackUkvAmbulantAntrag\(\)\}/.test(component), 'Der Abschlusslink öffnet neu und zählt ohne Argumente als „Antrag geöffnet“.');
assert.equal((component.match(/trackUkvAmbulantAntrag\(\)/g) || []).length, 1, 'Nur der externe Abschlusslink zählt als Antrag.');
assert(/to=\{getPath\('kontakt'\)\}/.test(component), 'Ohne gültigen Link bleibt der Kontaktweg als Rückfall.');
assert(!/bg-home-mint px-7/.test(component), 'Der Baustein bekommt keinen zweiten mintfarbenen Hauptknopf neben der SDK.');
assert(!/<input|<select|<textarea|<form/i.test(component), 'Der Baustein fragt nichts ab und misst keine Antworten.');
assert.equal(de.ctaLink, 'Vorsorge-Baustein berechnen');
assert.equal(de.ctaLinkHint, 'Der Rechner zeigt dir direkt den Vorsorge-Baustein.');
assert(/^The calculator shows you the prevention add-on directly\./.test(en.ctaLinkHint), 'EN-Hinweis zum Rechner fehlt.');

// 4. Kompakt: sichtbar nur das Nötigste, alles Weitere im Aufklapper.
const detailsStart = component.indexOf('<details');
const detailsEnd = component.indexOf('</details>');
assert(detailsStart > -1 && detailsEnd > detailsStart, 'Der Baustein braucht den Aufklapper „Alle Details“.');
assert.equal((component.match(/<details/g) || []).length, 1, 'Es gibt genau einen gemeinsamen Aufklapper.');
const visiblePart = component.slice(0, detailsStart);
const detailsPart = component.slice(detailsStart, detailsEnd);
for (const key of ['lead', 'preventionValue', 'preventionStart', 'priceValue', 'priceGlassesShort', 'ctaLink', 'sdkTitle', 'pregnancyNote']) {
  assert(visiblePart.includes(`'${key}'`), `${key} gehört in den sichtbaren Teil.`);
}
assert(/list\('examplesShort'\)/.test(visiblePart) && /list\('facts'\)/.test(visiblePart), 'Kurzbeispiele und Pflichtangaben stehen sichtbar.');
for (const key of ['preventionStaffel', 'preventionRule', 'questionsNote', 'sdkText', 'priceGlasses', 'priceAgeRule', 'disclosure']) {
  assert(detailsPart.includes(`text('${key}')`), `${key} gehört in „Alle Details“.`);
  assert(!visiblePart.includes(`text('${key}')`), `${key} darf nicht im sichtbaren Teil stehen.`);
}
for (const key of ['examples', 'included', 'fit']) {
  assert(detailsPart.includes(`list('${key}')`) && !visiblePart.includes(`list('${key}')`), `${key} gehört in „Alle Details“.`);
}
assert.equal(de.examplesShort.length, 3, 'Sichtbar sind genau drei kurze Beispiele.');
assert.deepEqual(de.facts, ['Keine Wartezeit', 'Keine Fragen zu Vorerkrankungen'], 'Sichtbare Pflichtangaben in einer Zeile.');
assert.equal(de.detailsTitle, 'Alle Details');

// 5. Belegte Zahlen sind vollständig und korrekt gestaffelt.
const deText = JSON.stringify(de);
const enText = JSON.stringify(en);
for (const fact of ['Laut UKV', '13,45 €', '8,80 €', '4 € mehr', '17,45 €', '12,80 €', 'bis 500 EUR pro Jahr', 'Im 1. Kalenderjahr bis 200 EUR', 'GOÄ', 'Keine Wartezeit', 'Kein Höchstaufnahmealter', 'Keine Fragen zu Vorerkrankungen', 'Sehhilfe', 'Schwerhörigkeit', '300 EUR in zwei Kalenderjahren', 'bis 400 EUR in zwei Kalenderjahren', '1.500 EUR', 'bis 800 EUR in fünf Kalenderjahren', 'bis zu 3.000 EUR in zwei Jahren', '01.05.2026', 'Danach gibt es keine weitere Altersstufe, Beitragsanpassungen bleiben möglich.']) {
  assert(deText.includes(fact), `DE fehlt die belegte Angabe „${fact}“.`);
}
for (const fact of ['According to UKV', '€13.45', '€8.80', '€4 more', '€17.45', '€12.80', 'EUR 500 a year', 'EUR 200 in the first calendar year', 'GOÄ', 'No waiting period', 'No maximum entry age', 'EUR 3,000 in two years', 'The form is in German', 'premium adjustments remain possible']) {
  assert(enText.includes(fact), `EN fehlt die belegte Angabe „${fact}“.`);
}
assert(/^Laut UKV zahlt der Vorsorgetarif/.test(de.lead) && /^According to UKV, the prevention plan pays/.test(en.lead), 'Die Leistungsaussage wird der UKV zugeschrieben.');

// 5b. SDK richtig beschreiben: Jede Stufe hat Vorsorge- und Brillen-Töpfe.
assert(/SDK-Gesundheitsbudget/.test(de.sdkTitle) && /bis zu 3\.000 EUR in zwei Jahren/.test(de.sdkTitle), 'Der Baustein verweist für mehr als Vorsorge auf das SDK-Gesundheitsbudget.');
assert(/Jede SDK-Stufe hat schon einen Topf für Vorsorge und einen für Brille/.test(de.sdkText) && /200 bis 500 EUR in zwei Jahren/.test(de.sdkText), 'DE nennt die SDK-Töpfe für Vorsorge und Brille.');
assert(/Every SDK level already has one pot for prevention and one for glasses/.test(en.sdkText) && /EUR 200 to 500/.test(en.sdkText), 'EN nennt die SDK-Töpfe für Vorsorge und Brille.');
const wrongSdk = /brauchst du den Vorsorge-Baustein|meist nicht|do not need the prevention add-on|usually do not need|Ambulant (?:50|70|90|100)|AP[1579]/i;
assert(!wrongSdk.test(deText) && !wrongSdk.test(enText), 'Keine Aussage, dass eine SDK-Stufe den Baustein nicht braucht oder keine Vorsorge hat.');

// 5c. Nur der Vorsorge-Baustein: kein zweiter ambulanter UKV-Tarif, nirgends.
const naturPattern = /NaturPRIVAT|Natur\s*PRIVAT|Naturheiltarif|natural[- ]medicine plan|ukv-naturprivat|\bnatur(?:Summary|Text|Staffel|Price|Conditions|Recommendation)\b|28,10|35,63|45,80|9,89|28\.10|35\.63|45\.80|9\.89/i;
const naturSources = {
  'AmbulantVorsorgeBaustein.jsx': component,
  'ukvAmbulantLinks.js': links,
  'dentalLinks.js': dentalLinks,
  'AmbulantConversionFlow.jsx': flow,
  'de/ambulant.json': read('src/i18n/locales/de/ambulant.json'),
  'en/ambulant.json': read('src/i18n/locales/en/ambulant.json'),
  'mia-knowledge-base.txt': knowledge,
  'llms.txt': read('public/llms.txt'),
};
for (const [file, source] of Object.entries(naturSources)) {
  assert(!naturPattern.test(source), `${file} darf den UKV-Naturheiltarif nicht nennen (nur Vorsorge-Baustein, Frank 05.10.2026).`);
}

// 5d. Schwangere gehören in den SDK-Vorsorge-Topf (Gegenprüfung 05.10.2026):
//     Eine schon bestehende Schwangerschaft gilt bei der UKV wahrscheinlich als
//     Versicherungsfall vor Beginn. Der Satz steht deshalb sichtbar im Baustein,
//     vor dem Antragslink, nicht im Aufklapper. Er ist die einzige Stelle, an der
//     „Schwangerschaft“ im Baustein vorkommen darf.
const pregnancyNoteDe = 'Für eine schon festgestellte Schwangerschaft ist der Vorsorge-Topf der SDK der richtige Weg.';
const pregnancyNoteEn = 'For a pregnancy that has already been confirmed, the SDK prevention pot is the right route.';
assert.equal(de.pregnancyNote, pregnancyNoteDe, 'DE braucht den Hinweis auf den SDK-Vorsorge-Topf für eine festgestellte Schwangerschaft.');
assert.equal(en.pregnancyNote, pregnancyNoteEn, 'EN braucht den Hinweis auf den SDK-Vorsorge-Topf für eine festgestellte Schwangerschaft.');
assert(visiblePart.indexOf("text('pregnancyNote')") > visiblePart.indexOf("list('facts')") && visiblePart.indexOf("text('pregnancyNote')") < visiblePart.indexOf("data-healio-ambulant=\"vorsorge-cta\""), 'Der Schwangerschafts-Hinweis steht sichtbar zwischen den Pflichtangaben und dem Antragslink.');
assert(!/<details[\s\S]*pregnancyNote/.test(component.slice(detailsStart, detailsEnd)), 'Der Schwangerschafts-Hinweis darf nicht im Aufklapper versteckt sein.');

// 6. Sperrliste aus der Recherche und Rote Linie, für UI-Texte in DE und EN.
//    Der Schwangerschafts-Hinweis aus 5d ist die einzige erlaubte Ausnahme.
const uiText = `${deText}\n${enText}`.split(pregnancyNoteDe).join('').split(pregnancyNoteEn).join('').replace(/"pregnancyNote":"",?/g, '');
assert.equal(uiText.length < `${deText}\n${enText}`.length, true, 'Der Schwangerschafts-Hinweis wurde aus der Sperrlistenprüfung herausgenommen.');
const forbidden = [
  [/13 Euro in jedem Alter|13 EUR in jedem Alter/i, '„13 Euro in jedem Alter“'],
  [/konstant|constant|bleibt gleich|stays the same/i, 'konstanter Beitrag'],
  [/garantiert|guarantee/i, 'garantierte Annahme'],
  [/ohne Gesundheitsfragen|keine Gesundheitsfragen|no health questions|without health questions/i, '„ganz ohne Gesundheitsfragen“'],
  [/BMI|29,99/i, 'BMI-Grenze'],
  [/Courtage|Provision|commission/i, 'Courtage'],
  [/schwanger|pregnan/i, 'Schwangerschaftsvorsorge'],
  [/kostenlos|gratis|free of charge|for free/i, '„kostenlos“'],
  [/(?<![\d.,])0\s?(?:€|EUR)|€\s?0(?![\d.,])/, '„0 €“'],
  [/[–—]/, 'Gedankenstrich'],
  [/\bSie\b|\bIhr(?:e|en|er)?\b/, 'Sie-Form'],
  [/wählst du VorsorgePRIVAT|choose VorsorgePRIVAT/i, 'Auswahlhinweis, obwohl der Link vorauswählt'],
];
for (const [pattern, label] of forbidden) {
  assert(!pattern.test(uiText), `Der Vorsorge-Baustein darf ${label} nicht enthalten.`);
}

// 7. Nita kennt dieselben Fakten.
const kbStart = knowledge.indexOf('## Zusatzoption Vorsorge: UKV VorsorgePRIVAT');
assert(kbStart > -1, 'Nita braucht den Abschnitt zum UKV-Vorsorge-Baustein.');
const kb = knowledge.slice(kbStart, knowledge.indexOf('\n## ', kbStart + 5));
for (const fact of ['13,45 Euro', '8,80 Euro', '4 Euro mehr', 'bis 500 Euro pro Kalenderjahr', 'Im 1. Kalenderjahr bis 200 Euro', 'GOÄ', 'Beitragsanpassungen', 'AP5 je 200 Euro, AP7 je 300 Euro, AP9 je 400 Euro, AP1 je 500 Euro in zwei Jahren', 'Vorsorge-Baustein berechnen', 'ausschließlich die SDK']) {
  assert(kb.includes(fact), `Nita fehlt die Angabe „${fact}“.`);
}
assert(!/Zu AP1 empfiehlt Nita den Baustein normalerweise nicht|Ergänzung zu AP5 oder AP7/.test(kb), 'Nita sagt nicht, dass eine SDK-Stufe den Baustein nicht braucht.');
// „schwanger“ ist im Nita-Abschnitt nur in genau diesem Satz erlaubt.
const pregnancySentence = 'Schwangere bleiben für Vorsorge bei der SDK: Eine bestehende Schwangerschaft ist im UKV-Vorsorgetarif nicht sinnvoll abgedeckt, die SDK deckt Vorsorge auch in einer laufenden Schwangerschaft.';
assert.equal(kb.split(pregnancySentence).length - 1, 1, 'Nita braucht den Satz, dass Schwangere für Vorsorge bei der SDK bleiben.');
const kbWithoutPregnancy = kb.replace(pregnancySentence, '');
assert(!/BMI|29,99|Courtage|schwanger/i.test(kbWithoutPregnancy), 'Der Nita-Abschnitt enthält keine internen oder unbelegten Angaben.');

console.log('UKV-Vorsorge-Contract erfüllt: kompakter Vorsorge-Baustein nur auf /ambulant und /en/outpatient, gefilterter UKV-Link, belegte Zahlen, DE und EN synchron.');
