// Bildmotive der Altersvorsorge-Seiten: Schritt-Karten im Zuschuss-Check und
// Zahlenkacheln der Angebotskarte unter dem Hero. Alle Motive stammen aus dem
// verbindlichen Bildsatz der Website (docs/FRIENDLY_ICON_STANDARD.md).
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

// Zahlenkacheln der Angebotskarte: Schlüssel der Kachel (kachel.key im Content) → Motiv.
// Je Seite stehen so verschiedene Motive nebeneinander.
export const KACHEL_MOTIVE = {
  grundzulage: 'budget',
  kinderzulage: 'family',
  startbonus: 'bonus',
  neu: 'switch',
  beitrag: 'money',
  steuer: 'calculator',
  alt: 'comparison',
  kosten: 'switch',
  partner: 'family',
  nachweis: 'document',
  jahr: 'calendar',
  rueckforderung: 'bonus',
  wege: 'choice',
};

// Figur, die in der Angebotskarte hinter den Kacheln hervorschaut und auf die Überschrift zeigt.
export const KARTEN_FIGUR = 'advisor';

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
  switch: { b: 311, h: 315, l: 0.183, o: 0.016, r: 0.106, u: 0.146 },
};

const rund = (wert) => Math.round(wert * 1000) / 1000;

/**
 * Größe und Lage eines Motivs auf seiner Bühne als Inline-Stil (rem).
 * breite/hoehe: größter sichtbarer Bildinhalt, fuss: Höhe des Fußpunkts über dem Bühnenboden.
 * Das Bild selbst braucht dazu `absolute left-1/2 max-w-none`.
 */
export const motivSitzStil = (sitz, { breite, hoehe, fuss }) => {
  const inhaltBreite = (1 - sitz.l - sitz.r) * sitz.b;
  const inhaltHoehe = (1 - sitz.o - sitz.u) * sitz.h;
  const faktor = Math.min(breite / inhaltBreite, hoehe / inhaltHoehe);
  const bildBreite = sitz.b * faktor;
  const bildHoehe = sitz.h * faktor;
  return {
    width: `${rund(bildBreite)}rem`,
    height: `${rund(bildHoehe)}rem`,
    marginLeft: `${rund(-(sitz.l + (1 - sitz.l - sitz.r) / 2) * bildBreite)}rem`,
    bottom: `${rund(fuss - sitz.u * bildHoehe)}rem`,
  };
};

// Einstiegskarten und die Liste „Passende Seiten“: Seite (slug) → Motiv und Farbton.
export const EINGANG_MOTIVE = {
  eltern: { kind: 'family', ton: 'lavender' },
  selbststaendige: { kind: 'calculator', ton: 'mint' },
  riester: { kind: 'switch', ton: 'butter' },
  'unter-25': { kind: 'bonus', ton: 'sky' },
  ehepartner: { kind: 'budget', ton: 'coral' },
  elternzeit: { kind: 'money', ton: 'butter' },
  'kindergeld-endet': { kind: 'calendar', ton: 'lavender' },
  'riester-kuendigen': { kind: 'thinking', ton: 'sky' },
};

// Abschnitt Begleitung: Schlüssel der Rolle (rolle.icon) → Motiv und Farbton.
export const ROLLEN_MOTIVE = {
  webinar: { kind: 'advisor', ton: 'mint' },
  check: { kind: 'document', ton: 'sky' },
};

// Ratgeber-Übersicht: Themenbereich (cluster.id) → Motiv und Farbton.
export const RATGEBER_MOTIVE = {
  grundlagen: { kind: 'bonus', ton: 'mint' },
  riester: { kind: 'switch', ton: 'butter' },
  familien: { kind: 'family', ton: 'lavender' },
  selbststaendige: { kind: 'calculator', ton: 'sky' },
  entscheidung: { kind: 'comparison', ton: 'coral' },
};
