/**
 * Rechenmodell und Texte des Zahnkosten-Beispielrechners (Ratgeber-Vorlage,
 * 06.10.2026).
 *
 * Belege: Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md (abgerufen
 * 06.10.2026). Tarifwerte wortgleich mit src/components/sections/dental/
 * dentalContent.js (UKV ZahnPRIVAT 75 und 100, Zahnstaffel). Festzuschuss in
 * Prozent nach § 55 Abs. 1 SGB V bis 31.12.2026 und in der Fassung des
 * GKV-Beitragssatzstabilisierungsgesetzes (BGBl. 2026 I Nr. 228) ab
 * 01.01.2027.
 *
 * Das Modell ist eine Beispielrechnung mit offen genannten Annahmen, keine
 * Zusage. Es kennt keine Person, speichert nichts und sendet nichts.
 */

// Euro-Betrag der Regelversorgung (100 Prozent) je Befund, Festzuschüsse 2026
// laut KZBV-Tabelle. Ab 2027 setzt die Selbstverwaltung neue Euro-Beträge
// fest; der Rechner nimmt für 2027 die Beträge 2026 mit den neuen
// Prozentsätzen und sagt das in den Annahmen.
export const FESTZUSCHUSS_STAND = Object.freeze({
  quelle: 'Festzuschuss-Richtlinie des G-BA, Beträge gültig ab 1. Januar 2026 (BAnz AT 04.02.2026 B3)',
  url: 'https://www.g-ba.de/richtlinien/29/',
});

// regelversorgung100: zahnärztlicher plus zahntechnischer Betrag der
// Regelversorgung 2026 (100-Prozent-Spalte der Festzuschuss-Richtlinie).
// Befund 1.1: 201,93 + 196,46 = 398,39 EUR; Befund 2.1: 452,17 + 469,43 =
// 921,60 EUR. Die Festzuschüsse 60/70/75 % (239,03 / 278,87 / 298,79 EUR und
// 552,96 / 645,12 / 691,20 EUR) ergeben sich daraus und stimmen mit der
// Tabelle überein (BELEGE-WELLE1.md B4).
export const ZAHN_BEHANDLUNGEN = Object.freeze([
  {
    id: 'krone-metall',
    label: 'Krone auf einem Backenzahn',
    kurz: 'eine Krone auf einem Backenzahn',
    befund: '1.1',
    regelversorgung100: 398.39,
    beispielKosten: 398.39,
    kostenQuelle: 'Ohne eigenen Betrag rechnet das Beispiel mit der Regelversorgung, einer Krone aus Metall, in Höhe der Beträge 2026 der Festzuschuss-Richtlinie (398,39 EUR, ohne Begleitleistungen wie Röntgen oder Betäubung).',
  },
  {
    id: 'bruecke',
    label: 'Brücke für einen fehlenden Zahn',
    kurz: 'eine Brücke für einen fehlenden Zahn',
    befund: '2.1',
    regelversorgung100: 921.6,
    beispielKosten: 921.6,
    kostenQuelle: 'Ohne eigenen Betrag rechnet das Beispiel mit der Regelversorgung, einer Brücke aus Metall, in Höhe der Beträge 2026 der Festzuschuss-Richtlinie (921,60 EUR, ohne Begleitleistungen).',
  },
  {
    id: 'implantat',
    label: 'Implantat mit Krone',
    kurz: 'ein Einzelzahnimplantat mit Krone',
    befund: '2.1',
    regelversorgung100: 921.6,
    beispielKosten: 2500,
    kostenQuelle: 'Ohne eigenen Betrag rechnet das Beispiel mit 2.500 EUR, der Mitte der Spanne der Verbraucherzentrale (Einzelzahnimplantat inklusive Zahnersatz in der Regel 1.500 bis 3.500 EUR, Stand 01.07.2024). Die Kasse zahlt den Festzuschuss der Brücke, die als Regelversorgung gilt.',
  },
]);

export const ZAHN_BONUSHEFT = Object.freeze([
  { id: 'ohne', label: 'Kein lückenloses Bonusheft', p2026: 0.6, p2027: 0.5 },
  { id: 'fuenf', label: '5 Jahre lückenlos', p2026: 0.7, p2027: 0.6 },
  { id: 'zehn', label: '10 Jahre lückenlos', p2026: 0.75, p2027: 0.65 },
]);

export const ZAHN_ZEITPUNKT = Object.freeze([
  { id: '2026', label: 'Kasse bewilligt bis 31.12.2026' },
  { id: '2027', label: 'Kasse bewilligt ab 01.01.2027' },
]);

// Zahnstaffel laut dentalContent.js: im ersten Kalenderjahr bis 1.000 EUR
// (ZahnPRIVAT 75, 90 und 100); danach steigende Grenzen, ab dem vierten
// Kalenderjahr gelten allein die Erstattungssätze.
export const ZAHN_VERTRAGSJAHR = Object.freeze([
  { id: 'jahr1', label: 'Erstes Kalenderjahr im Tarif', grenze: 1000 },
  { id: 'nachStaffel', label: 'Ab dem vierten Kalenderjahr', grenze: null },
]);

export const ZAHN_TARIFE = Object.freeze([
  { id: 'zp100', label: 'UKV ZahnPRIVAT 100', satz: 1 },
  { id: 'zp75', label: 'UKV ZahnPRIVAT 75', satz: 0.75 },
]);

const roundEuro = (value) => Math.round(value * 100) / 100;

export const formatEuro = (value) => `${new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: Number.isInteger(roundEuro(value)) ? 0 : 2,
  maximumFractionDigits: 2,
}).format(roundEuro(value))} EUR`;

const byId = (list, id) => list.find((entry) => entry.id === id) || list[0];

/**
 * Kasse zahlt den Festzuschuss (Prozent der Regelversorgung), höchstens die
 * Kosten. Der Tarif erstattet seinen Satz der Rechnung abzüglich der
 * Kassenleistung (dentalContent.js: "nach Abzug der Kassenleistung"),
 * im ersten Kalenderjahr höchstens bis zur Zahnstaffel.
 */
// Eigener Betrag aus dem Heil- und Kostenplan: nur Zahlen bis 50.000 EUR,
// sonst gilt das Beispiel. Der Wert bleibt im Zustand der Komponente.
export const parseEigenerBetrag = (value) => {
  const raw = String(value ?? '').replace(/\s|EUR|€/g, '');
  // 398.39 als Dezimalpunkt, sonst deutsche Schreibweise 1.200,50.
  const normalized = /^\d+\.\d{1,2}$/.test(raw) ? raw : raw.replace(/\./g, '').replace(',', '.');
  if (!/^\d{1,5}(?:\.\d{1,2})?$/.test(normalized)) return null;
  const amount = Number(normalized);
  return amount > 0 && amount <= 50000 ? amount : null;
};

export const berechneZahnkosten = ({ behandlung, bonusheft, zeitpunkt, vertragsjahr, eigenerBetrag = null }) => {
  const b = byId(ZAHN_BEHANDLUNGEN, behandlung);
  const heft = byId(ZAHN_BONUSHEFT, bonusheft);
  const zeit = byId(ZAHN_ZEITPUNKT, zeitpunkt);
  const jahr = byId(ZAHN_VERTRAGSJAHR, vertragsjahr);

  const prozent = zeit.id === '2027' ? heft.p2027 : heft.p2026;
  const kosten = eigenerBetrag || b.beispielKosten;
  const kasse = roundEuro(Math.min(kosten, b.regelversorgung100 * prozent));
  const ohneTarif = roundEuro(kosten - kasse);

  const tarife = {};
  for (const tarif of ZAHN_TARIFE) {
    const ungedeckelt = Math.max(0, tarif.satz * kosten - kasse);
    const erstattung = roundEuro(jahr.grenze == null ? ungedeckelt : Math.min(ungedeckelt, jahr.grenze));
    tarife[tarif.id] = {
      erstattung,
      rest: roundEuro(Math.max(0, kosten - kasse - erstattung)),
      staffelGreift: jahr.grenze != null && ungedeckelt > jahr.grenze,
    };
  }

  return {
    behandlung: b,
    bonusheft: heft,
    zeitpunkt: zeit,
    vertragsjahr: jahr,
    prozent,
    kosten,
    eigenerBetrag: Boolean(eigenerBetrag),
    kasse,
    ohneTarif,
    tarife,
  };
};

const prozentText = (value) => `${Math.round(value * 100)} Prozent`;

export const RECHNER_TEXTE = Object.freeze({
  frageBehandlung: 'Welche Behandlung steht im Beispiel an?',
  frageBonusheft: 'Wie lange ist dein Bonusheft lückenlos?',
  frageZeitpunkt: 'Wann bewilligt die Kasse den Heil- und Kostenplan?',
  frageVertragsjahr: 'In welchem Jahr deines Zahntarifs?',
  frageEigenerBetrag: 'Eigener Betrag aus deinem Heil- und Kostenplan (freiwillig)',
  hinweisEigenerBetrag: 'Gesamtkosten in Euro, zum Beispiel 1.200. Leer lassen für das Beispiel.',
  kasseZahlt: 'Kasse zahlt',
  ohneTarif: 'Du ohne Tarif',
  mitTarif: 'Du mit Tarif',
  keinRest: 'nur, was nicht erstattungsfähig ist',
  ergebnisVorspann: (e) => `Beispiel: ${e.behandlung.kurz} für ${formatEuro(e.kosten)}. Die Kasse zahlt ${prozentText(e.prozent)} der Regelversorgung als Festzuschuss.`,
  kasseDetail: (e) => `Festzuschuss Befund ${e.behandlung.befund}, ${prozentText(e.prozent)}`,
  tarifDetail: (zeile) => (zeile.staffelGreift
    ? `Tarif erstattet ${formatEuro(zeile.erstattung)}, die Zahnstaffel begrenzt das erste Jahr`
    : `Tarif erstattet ${formatEuro(zeile.erstattung)}`),
  annahmenTitel: 'Annahmen und Quellen',
  annahmen: (e) => [
    e.eigenerBetrag
      ? 'Die Kosten sind dein eigener Betrag. Für den Festzuschuss nimmt das Beispiel den Befund der gewählten Behandlung an; welcher Befund bei dir gilt, steht im Heil- und Kostenplan.'
      : `Die Kosten sind ein Beispiel. ${e.behandlung.kostenQuelle} Deine Rechnung hängt von Praxis, Material, Labor und Gebührensatz ab.`,
    `Festzuschuss: ${FESTZUSCHUSS_STAND.quelle} für Befund ${e.behandlung.befund}. Bis 31.12.2026 zahlt die Kasse 60, 70 oder 75 Prozent der Regelversorgung, ab 01.01.2027 50, 60 oder 65 Prozent (§ 55 SGB V, BGBl. 2026 I Nr. 228). Für 2027 rechnet das Beispiel mit den Euro-Beträgen von 2026.`,
    'Tarif: UKV ZahnPRIVAT 100 erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, ZahnPRIVAT 75 entsprechend 75 %. Das Beispiel nimmt an, dass die ganze Rechnung erstattungsfähig ist.',
    'Zahnstaffel: Im ersten Kalenderjahr erstattet der Tarif bis 1.000 EUR, danach steigen die Grenzen, ab dem vierten Kalenderjahr gelten allein die Erstattungssätze. Das Beispiel nimmt an, dass im selben Jahr nichts anderes erstattet wurde.',
    'Die Behandlung war bei Vertragsbeginn weder angeraten noch geplant, und es fehlte kein Zahn. Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert.',
    'Kein Härtefall. Verbindlich sind der Bescheid deiner Kasse und die Bedingungen des Versicherers.',
  ],
  datenschutz: 'Deine Auswahl bleibt in diesem Browserfenster, wird nicht gespeichert und an niemanden gesendet, auch nicht an Werbe- oder Analysedienste.',
});
