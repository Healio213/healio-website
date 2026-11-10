// Bildmotive für die drei Schritt-Karten im Zuschuss-Check (Altersvorsorgedepot).
// Eigene Datei ohne JSX, damit auch die Prüfskripte sie lesen können.

// Motiv je Schritt aus dem verbindlichen Bildsatz der Website (docs/FRIENDLY_ICON_STANDARD.md).
// Der Schlüssel steht im Content (karte.icon), das Motiv kommt aus der zentralen Zuordnung.
export const SCHRITT_MOTIVE = {
  rechnung: 'calculator',
  vorabcheck: 'advisor',
  januarstart: 'calendar',
  kinder: 'family',
  beitrag: 'money',
  voraussetzungen: 'document',
  jahresbeitrag: 'budget',
  vertragsvergleich: 'comparison',
  weg: 'choice',
  berechtigung: 'protection',
  kleinstart: 'bonus',
  paar: 'family',
  abstimmen: 'comparison',
  nachweise: 'document',
  auszeit: 'money',
  uebergang: 'calendar',
  ausbildung: 'family',
  unterlagen: 'document',
  entscheiden: 'thinking',
};

// Die Bilddateien bringen unterschiedlich viel leeren Rand mit. Damit jedes Motiv mittig
// und mit dem Fuß auf dem Podest steht, steht hier je Motiv die Dateigröße (b, h) und der
// leere Rand links, oben, rechts, unten als Anteil. Bei einem neuen Bild neu ausmessen.
export const MOTIV_SITZ = {
  calculator: { b: 311, h: 315, l: 0.151, o: 0.162, r: 0.119, u: 0.029 },
  advisor: { b: 512, h: 512, l: 0.135, o: 0.033, r: 0.023, u: 0.018 },
  calendar: { b: 512, h: 512, l: 0.113, o: 0.113, r: 0.115, u: 0.139 },
  family: { b: 311, h: 315, l: 0.106, o: 0.063, r: 0.045, u: 0.029 },
  money: { b: 311, h: 315, l: 0.116, o: 0.216, r: 0.019, u: 0.127 },
  document: { b: 311, h: 315, l: 0.196, o: 0.121, r: 0.051, u: 0.095 },
  budget: { b: 311, h: 315, l: 0.151, o: 0.13, r: 0.113, u: 0.019 },
  comparison: { b: 311, h: 315, l: 0.035, o: 0.086, r: 0.029, u: 0.178 },
  choice: { b: 512, h: 512, l: 0.061, o: 0.023, r: 0.1, u: 0.02 },
  protection: { b: 311, h: 315, l: 0.119, o: 0.035, r: 0.135, u: 0.178 },
  bonus: { b: 311, h: 315, l: 0.122, o: 0.165, r: 0.058, u: 0.06 },
  thinking: { b: 512, h: 512, l: 0.166, o: 0.021, r: 0.133, u: 0.025 },
};
