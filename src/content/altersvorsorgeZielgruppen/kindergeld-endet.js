// Anlassseite /altersvorsorgedepot/kindergeld-endet. Zahlen: FAKTENBASIS.md
// und Quellenprüfung vom 08.10.2026 (Altersgrenzen Kindergeld, Kinderzulage
// als Jahresleistung, Empfängerwechsel 2027/2028, Startbonus fürs Kind).
export default {
  slug: 'kindergeld-endet',
  seo: {
    title: 'Kindergeld endet: Was aus der Kinderzulage wird | Healio',
    description: 'Endet das Kindergeld, endet die Kinderzulage, die Grundzulage bleibt. So planst du das Übergangsjahr, und so startet dein Kind in Ausbildung selbst mit Bonus.',
    ogImageAlt: 'Healio: Kinderzulage, wenn das Kindergeld endet',
  },
  hero: {
    brotkrume: 'Kindergeld endet',
    eyebrow: 'Wenn die Kinder groß werden',
    h1: 'Kindergeld läuft aus? Deine Grundzulage bleibt, und dein Kind kann selbst einsteigen.',
    unterzeile: 'Mit dem Kindergeld endet auch die Kinderzulage, allerdings nicht automatisch mitten im Jahr und nicht deine eigene Förderung. Ein guter Moment, den Vertrag neu zu ordnen und dem Kind den eigenen Start zu zeigen.',
    fussnote: 'Kinderzulage nur, solange Kindergeld läuft und das Kind dir zugeordnet ist. Startbonus fürs Kind, sofern es eigene Förderansprüche hat und am Anfang des Beitragsjahres noch keine 25 ist.',
    linkInhalt: 'Lesen, wie der Übergang läuft',
    vertrauenszeile: 'Kindergeldregeln laut Familienportal · Kinderzulage als Jahresleistung · Grundzulage bleibt',
    karte: {
      titel: 'Was nach dem Kindergeld bleibt und neu dazukommt',
      kacheln: [
        { key: 'grundzulage', wert: 'bis zu 540 EUR', text: 'Grundzulage, auch ohne Kinderzulage' },
        { key: 'startbonus', wert: '200 EUR', text: 'Startbonus für dein Kind mit eigenem Vertrag' },
        { key: 'jahr', motiv: 'kinderzulage', wert: 'bis 25', text: 'Kindergeld unter Voraussetzungen, etwa in Ausbildung' },
      ],
      hinweis: 'Die volle Grundzulage gibt es ab 150 EUR Monatsbeitrag. Den Startbonus gibt es einmalig für Kinder, die selbst förderberechtigt sind.',
    },
  },
  fakten: {
    ueberschrift: 'Wann die Kinderzulage endet',
    intro: 'Die Kinderzulage hängt am Kindergeld. Diese Regeln bestimmen das letzte Jahr.',
    karten: [
      { wert: '18, 21, 25', titel: 'Altersgrenzen beim Kindergeld', text: 'In der Regel endet das Kindergeld mit 18. Arbeitslos gemeldete Kinder können es unter Voraussetzungen bis 21 bekommen, Kinder in Ausbildung bis 25.', quelle: 'kindergeld' },
      { wert: 'ganzes Jahr', titel: 'Kinderzulage als Jahresleistung', text: 'Endet das Kindergeld im Lauf des Jahres, wird die Kinderzulage dafür nicht automatisch nach Monaten gekürzt.', quelle: 'estg85' },
      { wert: '0 EUR', titel: 'im ersten vollen Jahr ohne Kindergeld', text: 'Gibt es ein ganzes Jahr kein Kindergeld mehr, fällt die Kinderzulage für dieses Kind weg. Wird das Kindergeld vollständig zurückgefordert, entfällt sie auch für das betroffene Jahr.', quelle: 'gesetz' },
      { wert: 'bleibt', titel: 'deine Grundzulage', text: 'Die Grundzulage hängt nur an deinem eigenen Beitrag. Weiter möglich sind bis zu 540 EUR, bei 150 EUR im Monat.', quelle: 'rv84' },
    ],
  },
  beispiele: {
    ueberschrift: 'Vorher und nachher gerechnet',
    labels: { beitrag: 'Einzahlung pro Jahr', zulage: 'Zulage gesamt', quote: '{quote} Förderung auf den Beitrag' },
    karten: [
      { titel: 'Bisher: 25 EUR monatlich mit zwei Kindern', eingabe: { monatsbeitrag: 25, kinder: 2 }, text: 'Solange beide Kinder Kindergeld bekommen, liegt die Zulage weit über dem eigenen Beitrag.' },
      { titel: 'Danach: gleicher Beitrag', eingabe: { monatsbeitrag: 25 }, text: 'Ohne Kinderzulage bleibt nur die Grundzulage auf deine 300 EUR.' },
      { titel: 'Danach: Beitrag angehoben', eingabe: { monatsbeitrag: 150 }, text: 'Wer mehr einzahlt, holt sich mehr Grundzulage zurück, bis 1.800 EUR Jahresbeitrag.' },
    ],
    kleingedruckt: 'Rechnung für einen förderberechtigten Elternteil mit zugeordneten Kindern, vor und nach dem Ende des Kindergelds. Steuern, Kosten und Wertentwicklung fehlen. Ob ein höherer Beitrag zu dir passt, klären wir im Check.',
  },
  vertiefung: {
    ueberschrift: 'So planst du den Übergang',
    intro: 'Das letzte Jahr mit Kinderzulage und das erste ohne lassen sich gut vorbereiten.',
    bloecke: [
      { titel: 'Das Übergangsjahr', text: 'Im Jahr, in dem das Kindergeld endet, zählt die Kinderzulage noch als Jahresleistung. Erst im ersten vollen Jahr ohne Kindergeld fällt sie weg. Plan den Beitrag für dieses Jahr bewusst.' },
      { titel: 'Wenn ein anderer Elternteil das Kindergeld bekommt', text: 'Wechselt der Kindergeldempfänger im Lauf des Jahres, entscheidet 2027 der erste Anspruchszeitraum, wem die Zulage zugeordnet ist. Ab 2028 zählt der letzte.' },
      { titel: 'Ausbildung oder Studium', text: 'Macht dein Kind eine Ausbildung, kann das Kindergeld unter Voraussetzungen bis 25 weiterlaufen und damit auch deine Kinderzulage. Sonderfälle prüfen wir einzeln.' },
      { titel: 'Dein Kind startet selbst', text: 'Azubis gehören zu den Förderberechtigten. Ist dein Kind noch keine 25, wenn das Beitragsjahr beginnt, kommen zu seiner eigenen Grundzulage einmalig 200 EUR Startbonus dazu.', link: { to: '/altersvorsorgedepot/unter-25', label: 'Mehr zum Startbonus' } },
      { titel: 'Deine Grundzulage weiter nutzen', text: 'Ohne Kinderzulage zählt nur noch dein Beitrag. Bis 360 EUR im Jahr legt der Staat die Hälfte drauf, darüber ein Viertel, bis 1.800 EUR. Ob du aufstockst, entscheidest du nach deinem Budget.' },
    ],
  },
  rechner: {
    voreinstellung: { monatsbeitrag: 50, kinder: 0, unter25: false, selbststaendig: false, riester: false },
    felder: ['monatsbeitrag', 'kinder'],
    texte: {
      ueberschrift: 'Was bleibt nach dem Kindergeld?',
      unterzeile: 'Stell deinen künftigen Beitrag ein. Haben jüngere Geschwister noch Kindergeld, zähl sie mit.',
      labels: {
        monatsbeitrag: 'Wie viel willst du künftig im Monat einzahlen?',
        kinder: 'Wie viele dir zugeordnete Kinder bekommen noch Kindergeld?',
      },
      ergebnis: {
        vor: 'Deine Zulage nach dem Kindergeld',
        nach: 'pro Jahr bei diesem Beitrag.',
        monat: 'Monatlich sind das {monat}. Jeder eingezahlte Euro bringt {quote} Zuschuss.',
      },
      tipps: {
        unter25MitKindern: 'Für die jüngeren Geschwister reichen 25 EUR im Monat, damit jedes die volle Kinderzulage bringt.',
        unter30KeineKinder: 'Mit 30 EUR im Monat bekommst du auf die ersten 360 EUR die vollen 50 Prozent.',
        unter150: 'Ohne Kinderzulage lohnt der Blick auf die Grundzulage: Ihr Höchstwert kommt bei 150 EUR im Monat.',
        bei150: 'Damit ist die höchste Grundzulage erreicht.',
      },
      hinweise: {
        immer: 'Im Check schauen wir auf das Übergangsjahr und darauf, ob dein Kind selbst einsteigen kann.',
      },
      teaser: { titel: 'Nach dem Speichern: Modell ohne Kinderzulage', text: 'Alter und Steuersatz kannst du anpassen, die Kinderzulage bleibt dort ohnehin außen vor.' },
      knopfMitBetrag: 'Berechnung speichern & Übergang planen lassen',
      knopfOhneAnspruch: 'Übergang planen lassen',
      kleingedruckt: 'Rechenweg des Gesetzes für die Jahre ab 2027, für Eltern mit eigener Förderberechtigung. Kinder zählen nur mit Kindergeld und Zuordnung. Kosten, Kursverlauf und Steuern bleiben außen vor; was du einzahlst, bleibt für die Rente im Vertrag.',
    },
  },
  check: {
    eyebrow: 'Unverbindlich, für den Übergang',
    ueberschrift: 'Dein Zuschuss-Check, wenn das Kindergeld endet',
    unterzeile: 'Wir sortieren das letzte Jahr mit Kinderzulage und den neuen Plan, für dich und auf Wunsch fürs Kind.',
    karten: [
      { icon: 'zulage', titel: 'Neuen Beitrag festhalten', text: 'Dein künftiger Beitrag geht aus dem Rechner in die Vormerkung. Kontakt per E-Mail reicht, telefonisch nur, wenn du magst.' },
      { icon: 'kinderzulage', titel: 'Übergangsjahr klären', text: 'Im Vorabcheck gehen wir durch, bis wann das Kindergeld läuft und welchem Elternteil die Zulage zuletzt zusteht.' },
      { icon: 'startbonus', titel: 'Kind mitdenken', text: 'Macht dein Kind eine Ausbildung, zeigen wir dir, wie es mit eigenem Vertrag und Startbonus beginnen kann.' },
    ],
    ablaufzeile: 'Healio meldet sich nach deiner Vormerkung und stimmt mit dir einen Termin ab.',
    startzeile: 'Die neuen Verträge laufen ab 2027. Ob für dein Kind ein Bonusjahr ansteht, hängt an seinem Alter zu Beginn des Beitragsjahres.',
    knopfTermin: 'Übergangs-Check vormerken',
    knopfRueckruf: 'Bitte zurückrufen',
  },
  vormerkung: {
    ueberschrift: 'Deinen neuen Plan vormerken',
    intro: 'Nach dem Absenden siehst du dein Modell bis 67. Das Übergangsjahr klären wir im Vorabcheck.',
  },
  startinfo: {
    eyebrow: 'Noch etwas Zeit bis dahin?',
    ueberschrift: 'Bleib informiert, bis der Wechsel ansteht',
    text: 'Trag Vorname und Mailadresse ein. Wir melden uns mit Neuigkeiten zum Start der Verträge, auch für Kinder in Ausbildung. Abmelden kannst du dich über jede einzelne Mail.',
    knopf: 'Neuigkeiten per Mail erhalten',
    fahrplan: 'Fahrplan-PDF herunterladen',
    rechnerLink: 'Nur Neuigkeiten per Mail',
  },
  passt: {
    passtTitel: 'Passt zu dir, wenn',
    passtItems: [
      'dein Kind bald 18 wird oder die Ausbildung beendet,',
      'du die Kinderzulage bisher genutzt hast und neu planen willst,',
      'dein Kind eine Ausbildung beginnt und selbst vorsorgen könnte.',
    ],
    passtNichtTitel: 'Eher nicht, wenn',
    passtNichtItems: [
      'dir das Geld bald fehlen würde, etwa fürs Studium deines Kindes. Was im Vertrag liegt, ist für deine Rente gebunden.',
      'du ein reines Bank- oder Broker-Depot willst. Über Healio gibt es nur Versicherungsvarianten.',
    ],
  },
  faq: [
    { question: 'Endet die Kinderzulage sofort mit dem Kindergeld?', answer: 'Nicht automatisch. Die Kinderzulage ist eine Jahresleistung und wird bei einem Ende im Lauf des Jahres nicht einfach nach Monaten gekürzt. Im ersten vollen Jahr ohne Kindergeld fällt sie weg.' },
    { question: 'Mein Kind studiert. Gibt es die Kinderzulage weiter?', answer: 'Solange Kindergeld fließt. Während einer Ausbildung, wozu auch ein Studium zählen kann, ist das unter Voraussetzungen bis 25 möglich.' },
    { question: 'Was bleibt mir ohne Kinderzulage?', answer: 'Deine Grundzulage: 50 Prozent auf die ersten 360 EUR im Jahr, 25 Prozent auf den Teil bis 1.800 EUR, zusammen höchstens 540 EUR. Dazu kann ein Steuervorteil kommen, den das Finanzamt prüft.' },
    { question: 'Kann mein Kind einen eigenen Vertrag abschließen?', answer: 'Ja, sofern es eigene Förderansprüche hat, etwa als Azubi. Ist es zu Beginn des Beitragsjahres unter 25, gibt es einmalig 200 EUR Startbonus. Der Mindestbeitrag liegt bei 120 EUR im Jahr.' },
    { question: 'Muss ich meinen Beitrag ändern?', answer: 'Nein, dein Vertrag läuft einfach weiter. Ohne Kinderzulage sinkt nur die Förderung. Ob ein höherer Beitrag für dich sinnvoll ist, rechnen wir gemeinsam durch.' },
  ],
  quellen: [
    { id: 'kindergeld', wofuer: 'Bis wann Kindergeld fließt' },
    { id: 'estg85', wofuer: 'Kinderzulage als Jahresleistung' },
    { id: 'gesetz', wofuer: 'Wechsel des Kindergeldempfängers' },
    { id: 'rv84', wofuer: 'Grundzulage und Startbonus fürs Kind' },
    { id: 'zfaFoerderung', wofuer: 'Förderung für Auszubildende' },
  ],
  weiterlesen: ['altersvorsorgedepot-kindergeld-ende', 'altersvorsorgedepot-steuern'],
  weiterlesenTitel: 'Vertiefung im Ratgeber',
  abschlussKnopf: 'Zulage nach dem Kindergeld berechnen',
  verwandt: ['eltern', 'unter-25', 'elternzeit', 'ehepartner', 'selbststaendige', 'riester', 'riester-kuendigen'],
  fussHinweis: 'Zur Orientierung für Eltern, deren Kindergeld ausläuft. Ob und wie lange Kindergeld fließt, entscheidet die Familienkasse. Fonds im Depot können an Wert verlieren.',
};
