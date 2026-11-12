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

// Dauer der Strecke: grob eine halbe Minute je Bildschirm, gerundet auf
// volle Minuten, nur als „etwa“. Zahn (16 Bildschirme) etwa 8 Minuten.
export function dauerMinuten(anzahlBildschirme) {
  return Math.max(3, Math.round(anzahlBildschirme * 0.5));
}

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
