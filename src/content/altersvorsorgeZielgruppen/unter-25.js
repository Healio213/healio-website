// Anfrageseite /altersvorsorgedepot/unter-25 (Startbonus). Zahlen:
// FAKTENBASIS.md und Quellenprüfung vom 08.10.2026. Öffentliche
// Bonusformel laut Quellenprüfung: „unter 25 zu Beginn des Beitragsjahres“.
export default {
  slug: 'unter-25',
  seo: {
    title: 'Altersvorsorgedepot unter 25: 200 EUR Startbonus | Healio',
    description: 'Unter 25 zu Beginn des Beitragsjahres und förderberechtigt? Dann gibt es 200 EUR Startbonus plus Grundzulage, schon ab 10 EUR im Monat. Rechne es hier aus.',
    ogImageAlt: 'Healio: 200 EUR Startbonus im Altersvorsorgedepot unter 25',
  },
  hero: {
    brotkrume: 'Unter 25',
    eyebrow: 'Für Azubis und Berufseinsteiger unter 25',
    h1: 'Unter 25? Dann legt der Staat einmal 200 EUR extra drauf.',
    unterzeile: 'Zum Startbonus kommt jedes Jahr die Grundzulage: Bis 360 EUR Eigenbeitrag gibt es auf jeden Euro 50 Cent dazu. Anfangen kannst du mit 10 EUR im Monat.',
    fussnote: 'Den Startbonus gibt es einmal, wenn du zu Beginn des Beitragsjahres jünger als 25 und selbst förderberechtigt bist.',
    linkInhalt: 'So funktioniert der Startbonus',
    vertrauenszeile: 'Berufseinsteigerbonus nach § 84 EStG · neue Verträge ab 2027 · kein Konto zum Rechnen nötig',
    karte: {
      titel: 'Was du als Einsteiger bekommen kannst',
      kacheln: [
        { key: 'startbonus', wert: '200 EUR', text: 'Startbonus, einmalig' },
        { key: 'grundzulage', wert: '50 Cent', text: 'auf jeden Euro bis 360 EUR im Jahr' },
        { key: 'beitrag', motiv: 'zulage', wert: '10 EUR', text: 'im Monat reichen für den Anfang' },
      ],
      hinweis: 'Mindestbeitrag 120 EUR im Jahr. Das Geld ist grundsätzlich bis zur Rente gebunden.',
    },
  },
  fakten: {
    ueberschrift: 'So funktioniert der Startbonus',
    intro: 'Im Gesetz heißt er Berufseinsteigerbonus. Damit er bei dir ankommt, müssen vier Dinge stimmen.',
    karten: [
      { wert: 'unter 25', titel: 'zu Beginn des Beitragsjahres', text: 'Es zählt dein Alter am Anfang des Jahres, für das du einzahlst. Wirst du erst im Lauf von 2027 25, bist du für 2027 noch dabei.', quelle: 'rv84' },
      { wert: 'unmittelbar', titel: 'selbst förderberechtigt', text: 'Azubis und alle, die rentenversicherungspflichtig arbeiten, gehören dazu. Wer nur über den Ehepartner mittelbar gefördert wird, bekommt den Bonus nicht.', quelle: 'zfaFoerderung' },
      { wert: '120 EUR', titel: 'Mindestbeitrag im Jahr', text: 'Für Zulage und Bonus brauchst du mindestens 120 EUR Eigenbeitrag im Beitragsjahr, also 10 EUR im Monat.', quelle: 'gesetz' },
      { wert: 'einmal', titel: 'statt jedes Jahr', text: 'Den Bonus gibt es ein einziges Mal. Die Grundzulage kommt dagegen in jedem Jahr, in dem du einzahlst.', quelle: 'rv84' },
    ],
  },
  beispiele: {
    ueberschrift: 'Drei Einstiege mit Startbonus',
    labels: { beitrag: 'Du sparst im Jahr', zulage: 'Grundzulage jedes Jahr' },
    karten: [
      { titel: 'Einstieg mit 10 EUR', eingabe: { monatsbeitrag: 10, unter25: true }, text: 'Der kleinste Beitrag, der gefördert wird.' },
      { titel: 'Einstieg mit 15 EUR', eingabe: { monatsbeitrag: 15, unter25: true }, text: 'Fünf Euro mehr im Monat bringen 30 EUR mehr Zulage im Jahr.' },
      { titel: 'Einstieg mit 30 EUR', eingabe: { monatsbeitrag: 30, unter25: true }, text: 'So nutzt du die 50-Prozent-Stufe ganz aus.' },
    ],
    kleingedruckt: 'Gerechnet für alle, die zu Beginn des Beitragsjahres jünger als 25 und unmittelbar förderberechtigt sind. Der Startbonus kommt einmal dazu. Kosten, Steuerwirkung und Kursverlauf sind nicht berücksichtigt.',
  },
  vertiefung: {
    ueberschrift: 'Was du vor dem Start wissen solltest',
    intro: 'Der Bonus ist ein guter Anlass. Entscheiden solltest du aber mit Blick auf die ganze Laufzeit.',
    bloecke: [
      { titel: 'Das Geld ist für später', text: 'Was du einzahlst, ist grundsätzlich bis zur Rente gebunden. Ausgezahlt wird in der Regel ab einem Alter zwischen 65 und 70. Für Führerschein, Auto oder die erste Wohnung brauchst du ein anderes Polster.' },
      { titel: 'Vorher rausnehmen kostet', text: 'Kündigst du und lässt dir das Geld auszahlen, ist die Förderung weg, den Startbonus eingeschlossen.' },
      { titel: 'Klein starten ist erlaubt', text: 'Mit 150 EUR musst du nicht anfangen. Wichtig ist, dass jedes Jahr mindestens der Mindestbeitrag fließt, denn ein Jahr ohne Einzahlung bringt auch keine Zulage.' },
      { titel: 'Depot heißt Schwankung', text: 'Im Depot steckt dein Geld in Fonds oder ETFs. Kurse gehen hoch und runter, auch Verluste sind möglich. Willst du lieber eine Garantie, gibt es Verträge, die 80 oder 100 Prozent deiner Beiträge samt Zulagen zum Rentenbeginn zusagen.' },
      { titel: 'Du wirst 2027 25?', text: 'Dann ist 2027 dein Bonusjahr, sofern du förderberechtigt bist und im Jahr 2027 einzahlst. Ab dem Jahr, zu dessen Beginn du schon 25 bist, gibt es den Bonus nicht mehr.' },
    ],
  },
  rechner: {
    voreinstellung: { monatsbeitrag: 30, kinder: 0, unter25: true, selbststaendig: false, riester: false },
    felder: ['monatsbeitrag', 'unter25'],
    texte: {
      ueberschrift: 'Wie viel bringt dein Beitrag mit Startbonus?',
      unterzeile: 'Stell ein, was du im Monat zurücklegen willst. Der Bonus erscheint, wenn du zu Beginn des Beitragsjahres unter 25 bist.',
      labels: {
        monatsbeitrag: 'Was kannst du im Monat zur Seite legen?',
        unter25: 'Bist du am Anfang des Beitragsjahres jünger als 25?',
      },
      ergebnis: {
        vor: 'Deine Grundzulage pro Jahr',
        nach: 'als Einsteiger, ohne den einmaligen Bonus.',
        monat: 'Auf den Monat gerechnet {monat}. Zu jedem Euro von dir legt der Staat {quote} dazu.',
      },
      tipps: {
        unter25MitKindern: 'Mit Kind reichen 25 EUR im Monat für die volle Kinderzulage.',
        unter30KeineKinder: 'Mit 30 EUR im Monat nimmst du die 50-Prozent-Stufe voll mit.',
        unter150: 'Über 30 EUR hinaus steigt die Grundzulage langsamer, bis 150 EUR im Monat.',
        bei150: 'Höher geht die Grundzulage nicht.',
      },
      hinweise: {
        immer: 'Ob du förderberechtigt bist, hängt von deiner Ausbildung oder deinem Job ab. Das klären wir kurz im Vorabcheck.',
      },
      teaser: { titel: 'Nach dem Speichern: dein Langfristmodell', text: 'Mit deinem Alter, als Beispiel ohne Renditezusage.' },
      knopfMitBetrag: 'Berechnung speichern & Startbonus prüfen lassen',
      knopfOhneAnspruch: 'Start mit Bonus vormerken',
      kleingedruckt: 'Beispielwerte nach dem Gesetz für 2027. Den Startbonus gibt es nur ein Mal. Vertragskosten und Kurse sind nicht eingerechnet, und das Geld wird erst zur Rente ausgezahlt.',
    },
  },
  check: {
    eyebrow: 'Unverbindlich, für deinen Einstieg',
    ueberschrift: 'Dein Zuschuss-Check für den Start',
    unterzeile: 'Ein kurzer Check, damit Bonus und Zulage bei dir ankommen und der Beitrag in dein Budget passt.',
    karten: [
      { icon: 'zulage', titel: 'Startbetrag merken', text: 'Was du im Rechner eingestellt hast, nehmen wir in deine Vormerkung. Wir fragen nur nach Vorname und Mail.' },
      { icon: 'startbonus', titel: 'Berechtigung klären', text: 'In einem kurzen Telefonat klären wir, ob du über Ausbildung oder Job selbst förderberechtigt bist.' },
      { icon: 'startplan', titel: 'Klein anfangen', text: 'Wir finden einen Beitrag, der auch mit Ausbildungsgehalt dauerhaft klappt, und sagen dir offen, wie lange das Geld gebunden ist.' },
    ],
    ablaufzeile: 'Nach deiner Vormerkung meldet sich Healio für ein kurzes Gespräch.',
    startzeile: 'Abschließen kannst du ab Januar 2027. Dein Bonusjahr richtet sich nach deinem Alter zu Beginn des jeweiligen Beitragsjahres.',
    knopfTermin: 'Bonus prüfen lassen',
    knopfRueckruf: 'Ruf mich an',
  },
  vormerkung: {
    ueberschrift: 'Deinen Start vormerken',
    intro: 'Nach dem Absenden siehst du ein Modell bis 67. Deine Berechtigung klären wir danach im Vorabcheck.',
  },
  startinfo: {
    eyebrow: 'Erst mal nur merken?',
    ueberschrift: 'Wir schreiben dir, wenn es losgeht',
    text: 'Vorname und Mailadresse reichen. Sobald du abschließen kannst, bekommst du Bescheid, zusammen mit den wichtigsten Infos zum Startbonus. Kein Interesse mehr? Dann genügt ein Klick auf den Abmeldelink.',
    knopf: 'Bescheid geben lassen',
    fahrplan: 'PDF mit dem Fahrplan holen',
    rechnerLink: 'Erst mal nur Bescheid',
  },
  passt: {
    passtTitel: 'Für dich gemacht, wenn',
    passtItems: [
      'du eine Ausbildung machst oder rentenversicherungspflichtig arbeitest,',
      'du zu Beginn des Beitragsjahres noch nicht 25 bist,',
      'du langfristig etwas für später zurücklegen willst, auch mit kleinem Betrag.',
    ],
    passtNichtTitel: 'Passt nicht, wenn',
    passtNichtItems: [
      'du für etwas sparst, das in den nächsten Jahren ansteht. Das Geld ist bis zur Rente gebunden.',
      'du gerade weder in Ausbildung noch rentenversicherungspflichtig beschäftigt bist. Dann fehlt meist die eigene Förderberechtigung.',
      'du ein reines Broker-Depot suchst. Über Healio bekommst du nur Versicherungsvarianten.',
    ],
  },
  faq: [
    { question: 'Wie kommt der Startbonus zu mir?', answer: 'Er erhöht einmalig die Zulage für ein Beitragsjahr und fließt wie die Zulage in deinen Vertrag, nicht auf dein Girokonto.' },
    { question: 'Ich werde 2027 25. Bekomme ich den Bonus noch?', answer: 'Ja, für das Beitragsjahr 2027, wenn du zu Beginn des Jahres noch 24 warst, förderberechtigt bist und im Jahr 2027 mindestens 120 EUR einzahlst.' },
    { question: 'Wie viel muss ich mindestens einzahlen?', answer: '120 EUR im Jahr, also 10 EUR im Monat. Das bringt 60 EUR Grundzulage, im Bonusjahr kommen 200 EUR dazu.' },
    { question: 'Was ist, wenn ich das Geld doch früher brauche?', answer: 'Dann wird es teuer, denn wer kündigt und sich auszahlen lässt, verliert Zulagen und Steuervorteile. Für gesetzliche Sonderfälle gelten eigene Regeln. Zahl deshalb nur Geld ein, das du bis zur Rente nicht brauchst.' },
    { question: 'Kann ich später mehr einzahlen?', answer: 'Ja, sofern dein Vertrag das vorsieht. Neue Verträge erlauben bis 6.840 EUR eigene Beiträge im Jahr. Die Grundzulage wächst aber nur bis 1.800 EUR Jahresbeitrag mit.' },
  ],
  quellen: [
    { id: 'rv84', wofuer: 'Startbonus und Grundzulage' },
    { id: 'gesetz', wofuer: 'Mindestbeitrag und Einzahlungsgrenze' },
    { id: 'zfaFoerderung', wofuer: 'Azubis als Förderberechtigte' },
    { id: 'regierung', wofuer: 'Start der neuen Verträge' },
    { id: 'zfa', wofuer: 'Bindung bis zur Rente' },
  ],
  weiterlesen: ['altersvorsorgedepot-foerderung', 'altersvorsorgedepot-wer-ist-berechtigt', 'altersvorsorgedepot-etf-sparplan'],
  weiterlesenTitel: 'Grundlagen im Ratgeber',
  abschlussKnopf: 'Meinen Startbonus ausrechnen',
  verwandt: ['eltern', 'kindergeld-endet', 'selbststaendige', 'elternzeit', 'riester', 'ehepartner', 'riester-kuendigen'],
  fussHinweis: 'Infos für Einsteiger unter 25, ohne Anlageberatung. Fonds und ETFs schwanken, auch Verluste kommen vor.',
};
