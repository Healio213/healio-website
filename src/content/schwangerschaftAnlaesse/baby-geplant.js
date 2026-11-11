/**
 * Inhalt der Seite /schwangerschaft/baby-geplant. Alle Texte wortgleich aus
 * Healio/Schwangerschaft-Mikroseiten/SEITENPLAN-BABY-GEPLANT.md (Abschnitt 2 bis 5).
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 *
 * Frage 7 des Plans (früherer Beginn) bleibt draußen, bis Offener Punkt 3
 * geklärt ist (Plan 3.7, Bauhinweis).
 */

const inhalt = {
  slug: 'baby-geplant',

  seo: {
    title: 'Baby geplant: Stichtag für Klinikschutz berechnen | Healio',
    description: 'Baby geplant? Rechne aus, ab welchem Tag Entbindung und Familienzimmer im Klinik-Tarif versichert sind. Bayerische nach 8 Monaten, SDK ohne Wartezeit.',
    ogImageAlt: 'Healio: Stichtag für den Klinikschutz rund um die Geburt ausrechnen',
  },

  hero: {
    brotkrume: 'Baby geplant',
    eyebrow: 'Klinikschutz rund um die Geburt',
    h1: 'Baby geplant? Rechne aus, ab wann die Geburt im Klinikschutz mitversichert ist.',
    unterzeile: 'Wer den Klinikschutz abschließt, bevor ein Baby unterwegs ist, kann bei der Geburt Chefarzt, eigenes Zimmer und Familienzimmer mitversichern. Wähl den Monat, in dem dein Vertrag beginnen soll. Der Rechner zeigt dir für beide Tarife, ab welchem Tag die Entbindung und dein Kind versichert sind.',
    knopfRechner: 'Stichtag ausrechnen',
    knopfAbschluss: 'Gleich online abschließen',
    fussnote: 'Für beide Tarife gilt: Schließ ab, solange keine Schwangerschaft besteht oder bekannt ist.',
    vertrauenszeile: 'Bedingungen der Versicherer verlinkt · Rechner ohne Anmeldung, nichts wird gespeichert · Healio ist Versicherungsmakler',
    // Geplantes neues Kopfbild (Plan 7): Alt-Text "Ein Paar sitzt zu Hause am Tisch und plant mit einem Kalender". Erst setzen, wenn das Bild da ist.
    bildAlt: 'Eine junge Familie mit ihrem Baby',
    karte: {
      titel: 'Klinikschutz vor dem Baby auf einen Blick',
      kacheln: [
        { key: 'jahr', wert: '8 Monate', text: 'Wartezeit für die Entbindung bei der Bayerischen. Die SDK hat im SP1 keine.' },
        { key: 'partner', wert: '2 Monate', text: 'Zeit nach der Geburt, um dein Baby ohne Gesundheitsprüfung anzumelden, wenn ein Elternteil versichert ist, bei der Bayerischen seit mindestens drei Monaten.' },
        { key: 'beitrag', wert: '13,40 EUR', text: 'im Monat für das Prestige der Bayerischen mit 21 bis 30 Jahren (Stand 08.2025)' },
      ],
      hinweis: 'Das Familienzimmer bei der Entbindung zahlen das Prestige der Bayerischen und SP1 der SDK, das Komfort bis zur Höhe des Zweibettzimmers. Versichert sein muss dafür die Mutter.',
    },
  },

  rechner: {
    ueberschrift: 'Rechne deinen Stichtag aus',
    intro: 'Wähl, wann dein Klinikschutz beginnen soll. Du siehst sofort, ab welchem Tag die Entbindung und dein Baby versichert sind. Deine Auswahl bleibt auf deinem Gerät.',
    feld: {
      label: 'Wann soll dein Klinikschutz beginnen?',
      hilfe: 'Der Vertrag beginnt immer am Ersten eines Monats. Welcher Tag gilt, steht später in deinem Versicherungsschein.',
    },
    ergebnis: {
      bayerische: {
        kopf: 'Bayerische Komfort und Prestige',
        wartezeit: 'Wartezeit für die Entbindung bis',
        entbindung: 'Entbindung mitversichert ab',
        baby: 'Baby ohne Gesundheitsprüfung, wenn es geboren wird ab',
        familienzimmer: 'Familienzimmer: im Prestige ohne festen Höchstbetrag, im Komfort bis zur Höhe des Zweibettzimmers.',
        beitrag: 'Prestige 13,40 EUR, Komfort 10,20 EUR im Monat mit 21 bis 30 Jahren. Mit 31 bis 45 Jahren 17,60 EUR und 13,90 EUR (Stand 08.2025).',
        knopf: 'Bei der Bayerischen online abschließen',
      },
      sdk: {
        kopf: 'SDK Klinik 1-Bett (SP1)',
        wartezeit: 'Wartezeit für die Entbindung',
        wartezeitWert: 'keine',
        entbindung: 'Entbindung mitversichert ab',
        baby: 'Baby ohne Gesundheitsprüfung, wenn es geboren wird ab',
        familienzimmer: 'Familienzimmer: Bei einer Entbindung zahlt SP1 auch das Familienzimmer.',
        beitrag: 'Den Beitrag für dein Alter zeigt dir der Rechner der SDK.',
        knopf: 'Bei der SDK online abschließen',
      },
      hinweisKnoepfe: 'Du landest im Rechner des Versicherers. Dort wählst du Tarif und Beginn.',
    },
    planung: {
      ueberschrift: 'Was das für eure Planung heißt',
      text: 'Beginnt dein Vertrag am {B}, ist bei der Bayerischen jede Entbindung ab dem {E_BAY} mitversichert. Kommt ein Kind vorher zur Welt, auch zu früh, zahlt sie diese Entbindung nicht. Im SP1 der SDK gibt es diese Frist nicht. Für beide gilt: Beim Abschluss und bei Vertragsbeginn darf noch keine Schwangerschaft bestehen oder bekannt sein. Je früher der Vertrag beginnt, desto mehr Zeit liegt zwischen Beginn und Geburt.',
    },
    pflichtsaetze: {
      p1: 'Das ist eine Beispielrechnung mit dem Beginn, den du gewählt hast. Ob du angenommen wirst und was erstattet wird, entscheidet der Versicherer nach deinem Antrag.',
      p2: 'Die Kasse zahlt die Entbindung selbst. Der Klinik-Tarif zahlt dazu Wahlleistungen wie Zimmer, Chefarzt und Familienzimmer.',
      p3: 'Der Schutz beginnt mit dem Datum in deinem Versicherungsschein, aber nicht, bevor der Versicherer deinen Antrag angenommen hat.',
      p4: 'Ohne Gesundheitsprüfung nimmt der Versicherer dein Baby nur auf, wenn du es spätestens zwei Monate nach der Geburt anmeldest. Sein Schutz ist höchstens so umfassend wie der des versicherten Elternteils.',
    },
    abschluss: {
      rueckrufLink: 'Lieber zurückrufen lassen',
      terminLink: 'oder einen Termin buchen',
    },
  },

  tarife: {
    ueberschrift: 'Zwei Wege zum Klinikschutz vor dem Baby',
    intro: 'Beide Tarife zahlen bei der Geburt Wahlleistungen in der Klinik. Sie unterscheiden sich vor allem darin, ab wann.',
    kopfBayerische: 'Bayerische Komfort und Prestige',
    kopfSdk: 'SDK Klinik 1-Bett (SP1)',
    zeilen: [
      { label: 'Wartezeit für die Entbindung', bayerische: '8 Monate ab Versicherungsbeginn', sdk: 'keine' },
      { label: 'Familienzimmer bei der Entbindung', bayerische: 'Prestige ohne festen Höchstbetrag, Komfort bis zur Höhe des Zweibettzimmers', sdk: 'ja' },
      { label: 'Zimmer', bayerische: 'Prestige Ein- oder Zweibettzimmer, Komfort Zweibettzimmer', sdk: 'Ein- oder Zweibettzimmer' },
      { label: 'Privatärztliche Behandlung', bayerische: '100 %, nicht auf die Höchstsätze der Gebührenordnung begrenzt', sdk: '100 %, auch mit Honorarvereinbarung' },
      { label: 'Dein Baby ohne Gesundheitsprüfung', bayerische: 'wenn ein Elternteil am Tag der Geburt seit mindestens drei Monaten versichert ist und du es binnen zwei Monaten anmeldest', sdk: 'wenn ein Elternteil am Tag der Geburt versichert ist und du es binnen zwei Monaten anmeldest' },
      { label: 'Elternteil beim Kind im Krankenhaus', bayerische: '100 % für Unterkunft und Verpflegung bei Kindern unter 16, soweit die Kasse sie nicht trägt', sdk: 'Unterkunft und Verpflegung bei Kindern unter 16' },
      { label: 'Antrag', bayerische: 'zwei Gesundheitsfragen', sdk: 'mit Gesundheitsfragen' },
      { label: 'Laufzeit', bayerische: 'zunächst 24 Monate, danach jährlich kündbar', sdk: 'Versicherungsjahr bis 30. Juni, danach jährlich, Kündigung drei Monate vorher' },
      { label: 'Beitrag im Monat', bayerische: '21 bis 30 Jahre: Prestige 13,40 EUR, Komfort 10,20 EUR. 31 bis 45 Jahre: Prestige 17,60 EUR, Komfort 13,90 EUR (Stand 08.2025)', sdk: 'nach Alter, im Rechner der SDK' },
    ],
    aufklapper: 'Beide Tarife im Vergleich ansehen',
    knopfBayerische: 'Bei der Bayerischen online abschließen',
    knopfSdk: 'Bei der SDK online abschließen',
    kleingedruckt: 'Ob du angenommen wirst und was erstattet wird, entscheidet der Versicherer nach deinem Antrag.',
  },

  ablauf: {
    ueberschrift: 'In vier Schritten zum Klinikschutz vor dem Baby',
    schritte: [
      { nr: 1, motiv: 'calendar', titel: 'Beginn wählen', text: 'Such dir oben den Monat aus, in dem dein Vertrag starten soll, und schau, welcher Zeitplan zu euch passt.' },
      { nr: 2, motiv: 'choice', titel: 'Online abschließen', text: 'Im Rechner des Versicherers gibst du Beginn und Geburtsdatum ein. Die Gesundheitsfragen im Antrag beantwortest du vollständig und so, wie es ist.' },
      { nr: 3, motiv: 'document', titel: 'Versicherungsschein ablegen', text: 'Darin steht dein Versicherungsbeginn. Von diesem Tag an zählt bei der Bayerischen die Wartezeit.' },
      { nr: 4, motiv: 'family', titel: 'Baby anmelden', text: 'Ist euer Kind da, meldest du es spätestens zwei Monate nach der Geburt beim Versicherer an. Dann ist es rückwirkend ab der Geburt versichert.' },
    ],
    knopf: 'Tarife nebeneinander ansehen',
  },

  passt: {
    passtTitel: 'Das passt zu dir, wenn',
    passtItems: [
      'ihr ein Baby plant und noch keine Schwangerschaft besteht oder bekannt ist,',
      'du gesetzlich versichert bist und in Deutschland wohnst,',
      'dir bei der Geburt Chefarzt, ein eigenes Zimmer oder ein Familienzimmer wichtig sind,',
      'euer Kind vom ersten Tag an im Klinikschutz versichert sein soll,',
      'du den Klinikschutz auch für dich selbst willst, bei jedem Krankenhausaufenthalt, der medizinisch nötig ist.',
    ],
    passtNichtTitel: 'Das passt nicht, wenn',
    passtNichtItems: [
      'du schon schwanger bist, auch nach einem positiven Test. Diese Geburt lässt sich dann nicht mehr mitversichern,',
      'ihr eine Hausgeburt oder eine Geburt im Geburtshaus plant. Die Tarife zahlen nur in der Klinik,',
      'nur der Partner versichert werden soll. Entbindung und Familienzimmer laufen über den Vertrag der Mutter,',
      'du einen Tarif suchst, der nicht nach deiner Gesundheit fragt. Beide Versicherer tun das im Antrag.',
    ],
    anderer: { to: '/schwangerschaft', label: 'Schon schwanger? Hier steht, was jetzt noch geht' },
  },

  fakten: {
    ueberschrift: 'Was in den Bedingungen steht',
    intro: 'Diese Regeln entscheiden, ab wann und wofür die Tarife zahlen. Unter jeder Karte findest du die Stelle zum Nachlesen.',
    karten: [
      {
        wert: '8 Monate',
        titel: 'Wartezeit für die Entbindung bei der Bayerischen',
        text: 'Die Frist läuft ab dem Versicherungsbeginn in deinem Versicherungsschein. Eine allgemeine Wartezeit gibt es im Klinik-Tarif nicht.',
        quelle: [{ id: 'avb', stelle: '§ 2 Abs. 1, § 3' }],
      },
      {
        wert: 'keine Wartezeit',
        titel: 'im SDK-Tarif SP1',
        text: 'War die Schwangerschaft beim Antrag schon ärztlich festgestellt, zahlt SP1 diese Entbindung und Komplikationen dabei nicht.',
        quelle: [{ id: 'sdkSp1', stelle: 'Abschnitt II und Nr. 10' }],
      },
      {
        wert: 'Familienzimmer',
        titel: 'bei der Entbindung in der Klinik',
        text: 'Prestige und SP1 zahlen es mit, Komfort bis zur Höhe des Zweibettzimmers. Versichert sein muss die Mutter, weil die Entbindung ihr Versicherungsfall ist.',
        quelle: [
          { id: 'tbPrestige', stelle: 'Ziffer 2.1' },
          { id: 'tbKomfort', stelle: 'Ziffer 2.1' },
          { id: 'sdkSp1', stelle: 'Nr. 1' },
        ],
      },
      {
        wert: '2 Monate',
        titel: 'Frist für die Anmeldung deines Babys',
        text: 'Meldest du dein Kind rechtzeitig an, ist es ab der Geburt versichert, ohne Gesundheitsprüfung und ohne Wartezeit, auch bei angeborenen Krankheiten. Bei der Bayerischen muss ein Elternteil dafür am Tag der Geburt seit mindestens drei Monaten versichert sein.',
        quelle: [
          { id: 'avb', stelle: '§ 2 Abs. 2' },
          { id: 'sdkI', stelle: 'A.5' },
          { id: 'vvg198', stelle: '' },
        ],
      },
      {
        wert: 'unter 16',
        titel: 'Elternteil beim Kind im Krankenhaus',
        text: 'Liegt dein versichertes Kind im Krankenhaus, zahlen Komfort, Prestige und SP1 Unterkunft und Verpflegung für einen Elternteil, bei der Bayerischen soweit die Kasse sie nicht trägt.',
        quelle: [
          { id: 'tbPrestige', stelle: 'Ziffer 2.3' },
          { id: 'sdkSp1', stelle: 'Nr. 8' },
        ],
      },
    ],
  },

  faq: [
    {
      question: 'Ab wann zählt die Wartezeit von acht Monaten?',
      answer: 'Ab dem Versicherungsbeginn, der in deinem Versicherungsschein steht. Beginnt dein Vertrag am 1. Dezember 2026, endet die Wartezeit am 31. Juli 2027. Ab dem 1. August 2027 ist die Entbindung bei der Bayerischen mitversichert. Der Tag, an dem du den Antrag stellst, zählt dafür nicht.',
    },
    {
      question: 'Was passiert, wenn unser Baby früher kommt?',
      answer: 'Bei der Bayerischen kommt es auf den Tag der Geburt an. Liegt er vor dem Ende der Wartezeit, zahlt der Tarif die Entbindung nicht, auch nicht bei einer Frühgeburt. Dein Kind kannst du trotzdem anmelden, wenn ein Elternteil seit mindestens drei Monaten versichert ist. Im SP1 der SDK gibt es keine Wartezeit.',
    },
    {
      question: 'Ich bin schon schwanger. Hilft mir der Rechner noch?',
      answer: 'Für diese Geburt nicht. Besteht die Schwangerschaft beim Abschluss schon oder ist sie bekannt, ist die Entbindung nicht mitversichert. Was in der Schwangerschaft noch möglich ist, steht auf der Seite zur Schwangerschaft.',
    },
    {
      question: 'Reicht es, wenn mein Partner versichert ist?',
      answer: 'Für euer Baby ja. Es genügt, dass ein Elternteil versichert ist, bei der Bayerischen seit mindestens drei Monaten. Für die Entbindung und das Familienzimmer zählt aber der Vertrag der Mutter.',
    },
    {
      question: 'Was zahlt die Kasse bei der Geburt und was der Tarif?',
      answer: 'Die Kasse zahlt die Entbindung in der Klinik mit Unterkunft, Pflege und Verpflegung für dich und dein Neugeborenes. Der Klinik-Tarif zahlt, was die Klinik zusätzlich berechnet: das Ein- oder Zweibettzimmer, die privatärztliche Behandlung und je nach Tarif das Familienzimmer.',
    },
    {
      question: 'Welche Fragen stellt der Versicherer im Antrag?',
      answer: 'Die Bayerische stellt zwei: ob in den letzten fünf Jahren bestimmte Erkrankungen bestanden und ob eine anerkannte Behinderung besteht. Auch die SDK fragt nach deiner Gesundheit. Beantworte alle Fragen vollständig und so, wie es ist. Das verlangt das Gesetz.',
    },
  ],

  abschlussKnopf: 'Stichtag ausrechnen',

  quellenUeberschrift: 'Quellen dieser Seite',
  quellen: [
    { id: 'avb', wofuer: 'Wartezeit, Beginn, Neugeborene' },
    { id: 'tbPrestige', wofuer: 'Familienzimmer, Zimmer, Begleitperson' },
    { id: 'tbKomfort', wofuer: 'Familienzimmer im Komfort' },
    { id: 'steckbrief', wofuer: 'Beiträge und Gesundheitsfragen' },
    { id: 'auskunft', wofuer: 'Familienzimmer über den Vertrag der Mutter' },
    { id: 'sdkSp1', wofuer: 'Leistungen und Ausschluss im SP1' },
    { id: 'sdkI', wofuer: 'Neugeborene und Beginn bei der SDK' },
    { id: 'vvg198', wofuer: 'Kind ab Geburt' },
    { id: 'vvg19', wofuer: 'Fragen im Antrag' },
    { id: 'sgb24f', wofuer: 'Leistung der Kasse' },
  ],

  rueckruf: {
    ueberschrift: 'Lieber kurz sprechen?',
    text: 'Schick uns Vorname und Telefonnummer. Wir rufen dich an und gehen mit dir durch, welcher Tarif zu euch passt.',
  },

  weiterlesenTitel: 'Weiterlesen im Ratgeber',
  weiterlesen: [
    'baby-geplant-zusatzversicherung',
    'familienzimmer-krankenhaus',
    'neugeborenes-versichern',
    'krankenhauszusatzversicherung-kinder',
  ],

  andereWege: {
    ueberschrift: 'Ihr seid schon weiter?',
    text: 'Bist du schon schwanger oder ist euer Baby da, findest du auf der Seite zur Schwangerschaft die passenden Wege.',
    knopf: 'Zur Seite Schwangerschaft',
    to: '/schwangerschaft',
  },

  fussHinweis: 'Healio GmbH ist Versicherungsmakler. Alle Angaben folgen den Bedingungen der Bayerischen und der SDK, die oben verlinkt sind. Ob du angenommen wirst und was erstattet wird, entscheidet der Versicherer nach deinem Antrag.',
};

export default inhalt;
