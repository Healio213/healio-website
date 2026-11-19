// Reine Anzeige-Schicht der Antragsmaske (12.11.2026). Kurze Schrittnamen für
// die Schrittleiste, Begrüßung je Produkt und Healio-Beschriftungen für reine
// Eingabefelder ohne rechtliches Gewicht. Regeln, Fragen, Pflichtfelder und
// gesendete Daten kommen unverändert aus der Produktdefinition.

// Kurzname je Abschnittstitel der Definition (Schrittleiste, Handy-Zeile).
const KURZ = {
  'Tarif und Beitrag': 'Tarif',
  'Deine Daten': 'Deine Daten',
  'Deine Unterlagen': 'Unterlagen',
  Erklärungen: 'Erklärungen',
  'Erklärungen und Unterlagen': 'Erklärungen',
  Gesundheitsfragen: 'Gesundheit',
  'Gesundheitsfragen der SDK': 'Gesundheit',
  Zahnfragen: 'Zahnfragen',
  'Dein Beitrag': 'Beitrag',
  'Beratung und Auftrag': 'Auftrag',
  'Anschrift und Kontakt': 'Anschrift',
  Zahlung: 'Zahlung',
  Unterlagen: 'Unterlagen',
  Zusammenfassung: 'Prüfen',
};

export function kurzName(titel) {
  if (KURZ[titel]) return KURZ[titel];
  if (/Gesundheit|Zähne/.test(String(titel))) return 'Gesundheit';
  return titel;
}

// Was der Kunde abschließt, in Healio-Worten (Begrüßung, Karte „Dein Schutz“).
const PRODUKT = {
  zahn: { schutz: 'Dein Zahnschutz', icon: 'dental' },
  ambulant: { schutz: 'Dein ambulanter Schutz', icon: 'ambulant' },
  stationaer: { schutz: 'Dein Klinikschutz', icon: 'hospital' },
};
export const produktAnzeige = (sparte) => PRODUKT[sparte] || { schutz: 'Dein Schutz', icon: 'protection' };

// Healio-Beschriftung reiner Eingabefelder. Die Feldregel bleibt, wie sie ist.
const FELD_LABEL = {
  'Wie lautet Ihre Postleitzahl?': 'Deine Postleitzahl',
};
export const feldLabel = (label) => FELD_LABEL[label] || label;

const FELD_HINWEIS = {
  'Hinweis: Unser Tarif gewährt je nach Wohnort einen günstigeren Beitrag. Bitte geben Sie für die Berechnung des Beitrags die Postleitzahl Ihres Wohnortes an.': 'Der Beitrag hängt bei der Bayerischen von deinem Wohnort ab.',
};
export const feldHinweis = (hinweis) => FELD_HINWEIS[hinweis] ?? hinweis;

// Warum gefragt wird (kurzer Satz über den Gesundheitsfragen).
export const WARUM_GESUNDHEIT = 'Der Versicherer braucht diese Angaben, um deinen Antrag anzunehmen. Antworte so, wie es bei dir ist, dann ist dein Schutz später sicher.';

// Kernleistungen der Bayerischen je Stufe, wortgleich aus der Erfassung der
// Strecke (Healio/Antragsstrecken/originale/bayerische-zahn/daten/
// config-KZV-lesbar.txt, Leistungstabelle). „nicht enthalten“ steht dort als
// included: false, ein leerer Wert als included: true ohne Beschreibung (Haken).
// „keine Wartezeiten“ gilt in allen drei Stufen.
export const NICHT = 'nicht enthalten';
const BAYERISCHE_ZEILEN = {
  SMART: [
    ['Professionelle Zahnreinigung', '80 EUR je Kalenderjahr'],
    ['Zahnbehandlung', '75% Erstattung'],
    ['Zahnersatz', '75%'],
    ['Kieferorthopädie', NICHT],
    ['Bleaching', NICHT],
  ],
  KOMFORT: [
    ['Professionelle Zahnreinigung', '100 EUR je Behandlung; max. 150 EUR je Kalenderjahr'],
    ['Zahnbehandlung', '100% Erstattung'],
    ['Zahnersatz', '80-90% und 100% bei Regelversorgung'],
    ['Kieferorthopädie', '1.500 EUR inkl. GKV-Leistung, 2.000 EUR ohne GKV-Leistung'],
    ['Bleaching', NICHT],
  ],
  PRESTIGE: [
    ['Professionelle Zahnreinigung', '100 EUR je Behandlung; max. 200 EUR je Kalenderjahr'],
    ['Zahnbehandlung', '100% Erstattung'],
    ['Zahnersatz', '100% Erstattung'],
    ['Kieferorthopädie', '1.500 EUR inkl. GKV-Leistung, 2.000 EUR ohne GKV-Leistung'],
    ['Bleaching', ''],
  ],
};
export const anzeigeZeilen = (versicherer, tarifId) => (versicherer === 'bayerische' ? BAYERISCHE_ZEILEN[tarifId] || null : null);
export const ALLE_STUFEN_HINWEIS = { bayerische: 'Alle Stufen: keine Wartezeiten.' };
