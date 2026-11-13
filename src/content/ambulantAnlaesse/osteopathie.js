/**
 * Inhalt der Seite /ambulant/osteopathie. Alle Texte wortgleich aus
 * Healio/Ambulant-Mikroseiten/SEITENPLAN-OSTEOPATHIE.md (Abschnitt 2 bis 5).
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 *
 * Platzhalter in geschweiften Klammern setzt die Oberfläche ein ({n}, {P}, {R},
 * {Kasse}, {fundstelle}, {stand}, {s}, {prozent}, {topf}, {E1}, {E2}, {T2},
 * {topfRest}, {monat}, {jahr}, {min}, {max}).
 */

const inhalt = {
  slug: 'osteopathie',

  seo: {
    title: 'Osteopathie: Kasse plus Tarif ausrechnen | Healio',
    description: 'Was zahlt deine Kasse für Osteopathie, was die SDK im Tarif Ambulant und was bleibt bei dir? Rechne es mit deiner Kasse aus und schließ online ab.',
    ogImageAlt: 'Healio: Osteopathie mit Kassenzuschuss und Zusatzversicherung ausrechnen',
  },

  hero: {
    brotkrume: 'Osteopathie',
    eyebrow: 'Osteopathie mit Kasse und Zusatzversicherung',
    h1: 'Osteopathie: Rechne aus, was Kasse und Tarif zusammen zahlen.',
    unterzeile: 'Viele Kassen geben zur Osteopathie etwas dazu, meist für wenige Sitzungen im Jahr. Den Rest kann der ambulante Tarif der SDK übernehmen, wenn dich ein Heilpraktiker behandelt. Wähl deine Kasse, deinen Preis und die Zahl der Sitzungen. Du siehst sofort, was bei dir bleibt.',
    knopfRechner: 'Jetzt ausrechnen',
    knopfAbschluss: 'Gleich online abschließen',
    fussnote: 'Neue Behandlungen ab Versicherungsbeginn sind versichert. Was schon vorher läuft, bleibt draußen.',
    vertrauenszeile: 'Bedingungen der SDK verlinkt · Rechner ohne Anmeldung, nichts wird gespeichert · Healio ist Versicherungsmakler',
    bildAlt: 'Ein Behandler legt einer liegenden Patientin in einem ruhigen Behandlungsraum die Hände an den Kopf',
    karte: {
      titel: 'Osteopathie im Tarif Ambulant auf einen Blick',
      kacheln: [
        { key: 'nachweis', wert: 'bis zu 1.000 EUR', text: 'für Naturheilverfahren in zwei Kalenderjahren im Tarif Ambulant 100, Osteopathie beim Heilpraktiker eingeschlossen' },
        { key: 'jahr', wert: 'keine Wartezeit', text: 'Der Schutz gilt ab dem Versicherungsbeginn in deinem Versicherungsschein.' },
        { key: 'beitrag', wert: '31,64 EUR', text: 'im Monat für Ambulant 100 mit 21 bis 30 Jahren (Stand 29.09.2026)' },
      ],
      hinweis: 'Ambulant 50, 70 und 90 erstatten 50, 70 oder 90 Prozent, bis zu 500, 700 oder 900 EUR in zwei Kalenderjahren.',
    },
  },

  rechner: {
    ueberschrift: 'Kasse plus Tarif: dein Jahr in Zahlen',
    intro: 'Gib ein, was du über deine Behandlung weißt. Deine Angaben bleiben auf deinem Gerät und werden nicht gespeichert.',
    hinweisErwachsene: 'Der Rechner nutzt die Werte für Erwachsene. Für Kinder gelten bei manchen Kassen eigene Regeln.',
    kassenlisteAusgeblendet: 'Die Werte der Kassen werden gerade neu geprüft. Gib den Zuschuss deiner Kasse bitte selbst ein.',
    felder: {
      kasse: {
        label: 'Bei welcher Kasse bist du?',
        hilfe: 'Die Werte stammen aus der Satzung der Kasse.',
        platzhalter: 'Kasse wählen',
        eigen: 'Meine Kasse steht nicht dabei',
      },
      eigenZuschuss: { label: 'Zuschuss deiner Kasse je Sitzung', hilfe: 'Steht in der Satzung deiner Kasse.' },
      eigenSitzungen: { label: 'Für wie viele Sitzungen im Jahr?' },
      behandler: {
        label: 'Wer behandelt dich?',
        optionen: [
          { wert: 'heilpraktiker', text: 'Heilpraktiker' },
          { wert: 'arzt', text: 'Ärztin oder Arzt' },
          { wert: 'physio', text: 'Physiotherapeut' },
        ],
      },
      preis: { label: 'Preis je Sitzung', hilfe: 'Meist 60 bis 150 EUR, je nach Praxis und Region.' },
      sitzungen: { label: 'Sitzungen im Jahr', weniger: 'Eine Sitzung weniger', mehr: 'Eine Sitzung mehr' },
      stufe: {
        label: 'Welche Stufe willst du rechnen?',
        optionen: [
          { wert: 50, text: 'Ambulant 50' },
          { wert: 70, text: 'Ambulant 70' },
          { wert: 90, text: 'Ambulant 90' },
          { wert: 100, text: 'Ambulant 100' },
        ],
      },
      geburtsjahr: { label: 'Dein Geburtsjahr (für den Beitrag)', hilfe: 'Ohne Angabe zeigen wir den Beitrag mit 21 bis 30 Jahren.' },
    },
    fehler: 'Bitte gib eine Zahl zwischen {min} und {max} ein.',
    ergebnis: {
      kopf: 'Bei {n} Sitzungen zu je {P} kostet dich Osteopathie {R} im Jahr.',
      kasse: {
        titel: 'Das gibt deine Kasse dazu',
        betrag: 'bis zu {Kc}',
        keineKasse: 'Wähl oben deine Kasse, dann rechnen wir ihren Zuschuss ein.',
        eigen: 'nach deinen eigenen Angaben',
        satzung: '{Kasse} laut Satzung ({fundstelle}, {stand}).',
      },
      tarif: {
        titel: 'Das übernimmt der Tarif Ambulant {s}',
        betrag: 'bis zu {T1}',
        heilpraktiker: '{prozent} Prozent vom Rest, aus dem Topf für Naturheilverfahren von {topf} in zwei Kalenderjahren.',
        physio: 'Der Tarif nennt Physiotherapeuten nicht als Behandler. Ist dein Physiotherapeut auch Heilpraktiker, wähl oben „Heilpraktiker“.',
        arzt: 'Beim Arzt zahlt der Tarif Naturheilverfahren nach der Gebührenordnung für Ärzte. Für Osteopathie beim Arzt rechnet der Rechner den Tarif nicht mit.',
      },
      eigenanteil: { titel: 'Das bleibt bei dir' },
      zweitesJahr: {
        titel: 'Und im zweiten Kalenderjahr?',
        gleich: 'Mit gleich vielen Sitzungen übernimmt der Tarif auch im zweiten Jahr bis zu {T2}. Bei dir bleiben dann {E2}.',
        weniger: 'Im Topf bleiben nach dem ersten Jahr noch {topfRest}. Mit gleich vielen Sitzungen übernimmt der Tarif im zweiten Jahr deshalb bis zu {T2}, bei dir bleiben {E2}. Danach steht der Topf wieder voll zur Verfügung.',
      },
      beitrag: 'Beitrag für Ambulant {s}: {monat} im Monat, {jahr} im Jahr',
      knopf: 'Ambulant {s} online abschließen',
    },
    abschluss: {
      rueckrufLink: 'Lieber zurückrufen lassen',
      terminLink: 'oder einen Termin buchen',
    },
    pflichtsaetze: {
      p1: 'Das ist eine Beispielrechnung mit deinen Angaben. Über deinen Antrag und die Erstattung entscheidet die SDK.',
      p2: 'Kasse und Tarif erstatten zusammen nie mehr als die Rechnung. Der Rechner zieht den Zuschuss der Kasse deshalb zuerst ab.',
      p3: 'Erstattet wird, was die Praxis nach dem Gebührenverzeichnis für Heilpraktiker abrechnet und was erstattungsfähig ist.',
      p4: 'Der Topf für Naturheilverfahren gilt für das Jahr deines Vertragsbeginns und das folgende, gemeinsam für alle Naturheilverfahren. Beginnt dein Vertrag spät im Jahr, fallen in das erste Jahr weniger Sitzungen.',
      p5: 'Versichert sind neue Behandlungen ab Versicherungsbeginn. Was vorher schon läuft, zahlt der Tarif nicht.',
    },
  },

  zusammenspiel: {
    ueberschrift: 'Erst die Kasse, dann der Tarif',
    intro: 'Kasse und Zusatzversicherung zahlen aus zwei Töpfen. Zusammen erstatten sie nie mehr als deine Rechnung.',
    schritte: [
      { nr: 1, motiv: 'document', titel: 'Bescheinigung holen', text: 'Verlangt deine Kasse eine ärztliche Bescheinigung, lass sie dir vor der ersten Sitzung ausstellen.' },
      { nr: 2, motiv: 'ambulant', titel: 'Behandeln lassen', text: 'Frag die Praxis vorher nach ihrer Ausbildung, wenn deine Kasse eine bestimmte Qualifikation verlangt.' },
      { nr: 3, motiv: 'money', titel: 'Bei der Kasse einreichen', text: 'Reich die Rechnung zuerst bei deiner Kasse ein. Sie zahlt ihren Zuschuss für die Sitzungen, die ihre Satzung vorsieht.' },
      { nr: 4, motiv: 'budget', titel: 'Rest bei der SDK einreichen', text: 'Schick der SDK die Rechnung mit dem Nachweis, was die Kasse gezahlt hat. Der Tarif erstattet je nach Stufe vom Rest, bis der Topf für Naturheilverfahren aufgebraucht ist.' },
    ],
    knopf: 'Mit deinen Zahlen ausrechnen',
  },

  stufen: {
    ueberschrift: 'Wähl deine Stufe und schließ online ab',
    intro: 'Alle Stufen zahlen Osteopathie beim Heilpraktiker aus demselben Topf für Naturheilverfahren. Sie unterscheiden sich darin, wie viel Prozent sie erstatten und wie groß der Topf ist.',
    kopf: ['Stufe', 'Erstattung', 'Topf Naturheilverfahren in zwei Kalenderjahren', 'Beitrag im Monat mit 21 bis 30 Jahren'],
    aufklapper: 'Alle vier Stufen im Vergleich ansehen',
    zeilen: [
      { stufe: 50, name: 'Ambulant 50 (AP5)', erstattung: '50 %', topf: 'bis zu 500 EUR', beitrag: '10,36 EUR' },
      { stufe: 70, name: 'Ambulant 70 (AP7)', erstattung: '70 %', topf: 'bis zu 700 EUR', beitrag: '15,82 EUR' },
      { stufe: 90, name: 'Ambulant 90 (AP9)', erstattung: '90 %', topf: 'bis zu 900 EUR', beitrag: '27,44 EUR' },
      { stufe: 100, name: 'Ambulant 100 (AP1)', erstattung: '100 %', topf: 'bis zu 1.000 EUR', beitrag: '31,64 EUR' },
    ],
    kleingedruckt: 'Beiträge nach Altersgruppe, Stand 29.09.2026. Daneben hat jede Stufe eigene Töpfe für Brille, Vorsorge, Hilfsmittel und Zuzahlungen.',
    knopf: 'Ambulant {s} online abschließen',
    hinweisSdk: 'Du landest im Rechner der SDK. Dort siehst du deinen Beitrag und stellst den Antrag.',
    hinweisGesundheit: 'Im Antrag gibt es Gesundheitsfragen. Wegen der Antworten lehnt die SDK niemanden ab, Vorerkrankungen versichert sie mit einem Zuschlag mit.',
  },

  passt: {
    passtTitel: 'Das passt zu dir, wenn',
    passtItems: [
      'du zur Osteopathie gehst oder eine neue Behandlung planst,',
      'dich ein Heilpraktiker mit osteopathischer Ausbildung behandelt,',
      'deine Kasse nur wenige Sitzungen bezuschusst oder gar keine,',
      'du gesetzlich versichert bist und in Deutschland wohnst,',
      'du neben der Osteopathie auch Brille, Vorsorge und Zuzahlungen mit absichern willst.',
    ],
    passtNichtTitel: 'Das passt nicht, wenn',
    passtNichtItems: [
      'deine Behandlung schon vor dem Versicherungsbeginn läuft. Diese Behandlung zahlt der Tarif nicht,',
      'dich nur ein Physiotherapeut ohne Heilpraktikererlaubnis behandelt. Ihn nennt der Tarif nicht,',
      'du einen Topf nur für Osteopathie erwartest. Alle Naturheilverfahren teilen sich einen Topf,',
      'du privat krankenversichert bist. Der Tarif ergänzt die gesetzliche Kasse.',
    ],
    anderer: { to: '/ambulant', label: 'Alle Leistungen des Tarifs Ambulant ansehen' },
  },

  fakten: {
    ueberschrift: 'Was in den Bedingungen steht',
    intro: 'Diese Regeln entscheiden, wann und wie viel die SDK bei Osteopathie erstattet. Unter jeder Karte steht die Stelle zum Nachlesen.',
    karten: [
      {
        wert: 'GebüH 35',
        titel: 'Osteopathie beim Heilpraktiker',
        text: 'Der Tarif erstattet alle Leistungen aus dem Gebührenverzeichnis für Heilpraktiker. Osteopathie steht dort unter Ziffer 35.',
        quelle: [{ id: 'ap', stelle: 'I.5' }, { id: 'gebueh', stelle: 'Ziffer 35' }],
      },
      {
        wert: '2 Kalenderjahre',
        titel: 'So lange gilt ein Topf',
        text: 'Der Topf für Naturheilverfahren gilt für das Jahr deines Vertragsbeginns und das Jahr danach. Dann steht er dir wieder voll zur Verfügung.',
        quelle: [{ id: 'ap', stelle: 'I.1, I.5' }],
      },
      {
        wert: 'keine Wartezeit',
        titel: 'Ab dem ersten Tag',
        text: 'Versichert sind Behandlungen, die nach dem Versicherungsbeginn anfangen. Für eine Behandlung, die vorher begonnen hat, zahlt die SDK nicht.',
        quelle: [{ id: 'ap', stelle: 'II' }, { id: 'avb1', stelle: 'A.4' }],
      },
      {
        wert: 'höchstens die Rechnung',
        titel: 'Kasse und Tarif zusammen',
        text: 'Zahlen Kasse und SDK für dieselbe Behandlung, erstatten sie zusammen nie mehr, als die Rechnung kostet.',
        quelle: [{ id: 'avb1', stelle: 'A.8 Abs. 4' }],
      },
      {
        wert: '§ 11 SGB V',
        titel: 'Was die Kasse zahlt',
        text: 'Osteopathie ist eine freiwillige Leistung der Kasse. Wie viel, wie oft und bei wem, steht in ihrer Satzung.',
        quelle: [{ id: 'sgb11', stelle: '' }],
      },
    ],
  },

  faq: [
    {
      question: 'Gibt die SDK etwas dazu, wenn meine Kasse schon zahlt?',
      answer: 'Ja. Du reichst die Rechnung zuerst bei der Kasse ein und schickst sie dann mit deren Erstattungsnachweis an die SDK. Zusammen erstatten beide nie mehr als den Rechnungsbetrag.',
    },
    {
      question: 'Gilt der Topf für Naturheilverfahren jedes Jahr neu?',
      answer: 'Nein, für zwei Kalenderjahre: das Jahr, in dem dein Vertrag beginnt, und das folgende. Danach steht der Topf wieder voll zur Verfügung. Andere Naturheilverfahren wie Akupunktur zahlt die SDK aus demselben Topf.',
    },
    {
      question: 'Zahlt der Tarif auch Osteopathie beim Physiotherapeuten?',
      answer: 'Der Tarif nennt Heilpraktiker und Ärzte als Behandler, Physiotherapeuten nicht. Ist dein Physiotherapeut zugleich Heilpraktiker und rechnet nach dem Gebührenverzeichnis für Heilpraktiker ab, gilt die Regel für Heilpraktiker. Zuzahlungen für Krankengymnastik auf Kassenrezept sind ein eigener Topf.',
    },
    {
      question: 'Wie muss die Rechnung aussehen?',
      answer: 'Sie braucht deinen Namen, die Diagnose, die einzelnen Leistungen mit den Nummern aus dem Gebührenverzeichnis und das Datum jeder Behandlung. Erstattet wird, was danach abgerechnet und erstattungsfähig ist.',
    },
    {
      question: 'Ich bin schon in Behandlung. Hilft mir der Tarif?',
      answer: 'Für diese Behandlung nicht. Neue Behandlungen, die nach dem Versicherungsbeginn anfangen, sind versichert. Eine Wartezeit gibt es nicht.',
    },
    {
      question: 'Werde ich mit Vorerkrankungen angenommen?',
      answer: 'Im Antrag gibt es Gesundheitsfragen, die du vollständig beantwortest. Wegen der Antworten lehnt die SDK niemanden ab. Vorerkrankungen versichert sie mit einem Zuschlag auf den Beitrag mit.',
    },
    {
      question: 'Meine Kasse steht nicht im Rechner. Was nun?',
      answer: 'Wähl „Meine Kasse steht nicht dabei“ und gib ein, wie viel sie je Sitzung zahlt und für wie viele Sitzungen. Was deine Kasse vorsieht, findest du in ihrer Satzung oder in unserer Übersicht zu Osteopathie und Krankenkasse.',
      // Im FAQ-Schema reiner Text, auf der Seite verlinkt (Plan 3.7, Bauhinweis).
      link: { text: 'Übersicht zu Osteopathie und Krankenkasse', to: '/ratgeber/osteopathie-krankenkasse' },
    },
  ],

  abschlussKnopf: 'Jetzt ausrechnen',

  quellenUeberschrift: 'Quellen dieser Seite',
  quellen: [
    { ids: ['ap'], wofuer: 'Leistung, Topf, Wartezeit, Beitragsregel' },
    { ids: ['avb1'], wofuer: 'Beginn, Zusammenspiel mit der Kasse, Rechnung' },
    { ids: ['gebueh'], wofuer: 'Osteopathie im Gebührenverzeichnis' },
    { ids: ['beitrag'], wofuer: 'Beiträge' },
    { ids: ['sgb11'], wofuer: 'Zuschuss der Kassen' },
    { ids: ['kassen'], wofuer: 'Kassenwerte im Rechner' },
    { ids: ['preisAok', 'preisVod'], wofuer: 'Preise je Sitzung' },
    { ids: ['vvg19'], wofuer: 'Fragen im Antrag' },
  ],
  pruefstand: 'Prüfstand 13.11.2026, Kassensatzungen 09.11.2026',

  rueckruf: {
    ueberschrift: 'Lieber kurz sprechen?',
    text: 'Schick uns Vorname und Telefonnummer. Wir rufen dich an und rechnen deinen Fall mit dir durch.',
  },

  weiterlesenTitel: 'Weiterlesen im Ratgeber',
  weiterlesen: [
    'osteopathie-krankenkasse',
    'osteopathie-kosten',
    'zusatzversicherung-osteopathie',
  ],
  praxissuche: {
    vor: 'Suchst du noch eine Praxis? Im Naturheilregister, unserem Verzeichnis für Heilpraktiker, findest du ',
    linkText: 'Heilpraktiker mit Schwerpunkt Osteopathie',
    href: 'https://naturheilregister.de/fachgebiet/osteopathie',
    nach: '.',
  },

  andereWege: {
    ueberschrift: 'Mehr als Osteopathie?',
    text: 'Der Tarif Ambulant zahlt auch Brille, Vorsorge, Hilfsmittel und Zuzahlungen aus eigenen Töpfen.',
    knopf: 'Zum Tarif Ambulant',
    to: '/ambulant',
  },

  fussHinweis: 'Healio GmbH ist Versicherungsmakler. Alle Angaben folgen den Bedingungen der SDK und den Satzungen der genannten Kassen, die oben verlinkt sind. Über deinen Antrag und die Erstattung entscheidet die SDK.',
};

export default inhalt;
