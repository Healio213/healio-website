/**
 * AUTOMATISCH ERZEUGT von scripts/build-ratgeber-registry.mjs. Nicht von Hand
 * bearbeiten: Quelle sind die Inhaltsdateien und gliederung.js (Ablauf für
 * neue Artikel dort im Kopfkommentar).
 * Nur die Titel der Altersvorsorge-Ratgeber für ihre Querverweise, ohne
 * Volltexte oder das vollständige Website-Register.
 */

const TITLES = new Map([
  [
    "altersvorsorgedepot-was-ist-das",
    "Was ist das Altersvorsorgedepot und wie funktioniert es?"
  ],
  [
    "altersvorsorgedepot-ab-wann",
    "Altersvorsorgedepot: Ab wann kannst du anfangen?"
  ],
  [
    "altersvorsorgedepot-foerderung",
    "Altersvorsorgedepot: Wie viel Förderung bekommst du?"
  ],
  [
    "altersvorsorgedepot-wer-ist-berechtigt",
    "Wer ist beim Altersvorsorgedepot förderberechtigt?"
  ],
  [
    "riester-altersvorsorgedepot-wechsel",
    "Riester ins Altersvorsorgedepot wechseln: Was bedeutet das?"
  ],
  [
    "riester-kuendigen-oder-behalten",
    "Riester kündigen oder behalten: Welche Entscheidung passt?"
  ],
  [
    "riester-jahresmitteilung-checkliste",
    "Riester-Jahresmitteilung prüfen: Eine praktische Checkliste"
  ],
  [
    "riester-alte-oder-neue-foerderung",
    "Riester: Ist die alte oder die neue Förderung günstiger?"
  ],
  [
    "altersvorsorgedepot-kinderzulage",
    "Kinderzulage im Altersvorsorgedepot: Was bekommen Eltern ab 2027?"
  ],
  [
    "altersvorsorgedepot-kinderzulage-elternteil",
    "Welcher Elternteil bekommt die Kinderzulage im Altersvorsorgedepot?"
  ],
  [
    "altersvorsorgedepot-teilzeit-elternzeit",
    "Altersvorsorgedepot in Teilzeit oder Elternzeit: Worauf kommt es an?"
  ],
  [
    "altersvorsorgedepot-kindergeld-ende",
    "Kindergeld endet: Was ändert sich bei der Förderung deiner Altersvorsorge?"
  ],
  [
    "altersvorsorgedepot-selbststaendige",
    "Altersvorsorgedepot für Selbstständige: Wer bekommt ab 2027 eine Zulage?"
  ],
  [
    "altersvorsorgedepot-schwankendes-einkommen",
    "Schwankendes Einkommen: Wie planst du den Beitrag fürs Altersvorsorgedepot?"
  ],
  [
    "altersvorsorgedepot-heilpraktiker",
    "Altersvorsorgedepot für Heilpraktiker: Was passt neben die Praxis?"
  ],
  [
    "altersvorsorgedepot-oder-ruerup",
    "Altersvorsorgedepot oder Rürup-Rente: Wie vergleichst du die beiden Wege?"
  ],
  [
    "altersvorsorgedepot-kosten",
    "Altersvorsorgedepot: Welche Kosten du vor dem Abschluss prüfen solltest"
  ],
  [
    "altersvorsorgedepot-garantie",
    "Altersvorsorgedepot mit oder ohne Garantie: Was der Unterschied für dich bedeutet"
  ],
  [
    "altersvorsorgedepot-etf-sparplan",
    "Altersvorsorgedepot oder ETF-Sparplan: Erst das Ziel, dann der Vertrag"
  ],
  [
    "altersvorsorgedepot-steuern",
    "Altersvorsorgedepot und Steuern: Was beim Sparen und bei der Auszahlung gilt"
  ],
  [
    "altersvorsorgedepot-geld-entnehmen",
    "Altersvorsorgedepot: Was gilt, wenn du vor der Rente an dein Geld musst?"
  ],
  [
    "altersvorsorgedepot-auszahlung",
    "Altersvorsorgedepot auszahlen: Lebenslange Rente oder Auszahlplan?"
  ],
  [
    "altersvorsorgedepot-anbieterwechsel",
    "Altersvorsorgedepot wechseln: Welche Regeln und Kosten du prüfen musst"
  ],
  [
    "altersvorsorgedepot-passt-das-zu-mir",
    "Passt das Altersvorsorgedepot zu mir? Fünf Fragen vor deiner Entscheidung"
  ]
]);

export const getAltersvorsorgeRelatedTitle = (slug) => TITLES.get(slug) || null;
