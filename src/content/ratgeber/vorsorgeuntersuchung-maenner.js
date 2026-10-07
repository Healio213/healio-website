/**
 * Ratgeber-Serie, Feld Vorsorge (group 'vorsorge'), Seite:
 * Vorsorgeuntersuchungen für Männer. Hauptbegriff "vorsorgeuntersuchungen
 * männer", Angebotspfad /ambulant.
 *
 * SPERRLISTEN-KANDIDAT (Krebsvorsorge, Entscheidung der Marktanalyse-Sitzung
 * 07.10.2026): Der Pfad /ratgeber/vorsorgeuntersuchung-maenner gehört in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js) und
 * ANALYTICS_EXCLUDED_PATHS (src/lib/analytics.js).
 *
 * Faktenprüfung 07.10.2026 (PRÜFBERICHT-brille-vorsorge.md): Darmkrebs gilt
 * für Frauen und Männer gleich seit 01.04.2025 (G-BA-Meldung), nicht erst mit
 * der oKFE-Fassung vom 02.10.2026. PSA-Preis von 2017 ersetzt durch
 * gesundheitsinformation.de (IQWiG, aktualisiert 21.01.2026). Keine Prognose
 * zum PSA-Beratungsverfahren mehr. Statusangabe wie Zahn-Welle 1.
 *
 * Quellen (Belege: vorsorgeuntersuchung-maenner.belege.md, Abruf 07.10.2026):
 * G-BA Krebsfrüherkennungs-Richtlinie (§§ 1, 2, 25, 29, 37 bis 39; in Kraft
 * seit 12.03.2026), oKFE-Richtlinie (Darmkrebs § 3, zuletzt geändert
 * 20.08.2026, in Kraft seit 02.10.2026), Gesundheitsuntersuchungs-Richtlinie
 * (Check-up, Hepatitis B/C, Bauchaorta), G-BA-Pressemitteilungen
 * (Lungenkrebs 13.03.2026, Prostata 16.10.2025), gesund.bund.de, VZ NRW (PSA,
 * 27.05.2025), IGeL-Monitor (PSA, Seitenstand 06.04.2017), Deutsche
 * Gesellschaft für Urologie (05.12.2024). Tarifaussagen wortgleich mit
 * ambulant.json (vorsorgeBaustein) und der Töpfe-Anzeige auf /ambulant.
 *
 * Bewusste Grenzen:
 *   - Alter, Abstand und Leistung nur nach Richtlinien und gesund.bund.de.
 *     Die Themenliste nennt "ab 30, 45 und 50", die Richtlinie kennt für
 *     Männer aber 35 (Haut, Check-up alle drei Jahre), 45 (Prostata) und 50
 *     (Darm); die Seite folgt der Richtlinie.
 *   - Der PSA-Test steht ausdrücklich als IGeL, mit den Bewertungen beider
 *     Seiten (IGeL-Monitor "tendenziell negativ", Urologen-Gesellschaft
 *     hält das für veraltet). Kein Nutzenversprechen, keine Empfehlung.
 *   - Der Baustein wird nur genannt, weil die Produktseite PSA-Test und
 *     Co. als erstattungsfähige Beispiele aufführt. Ob eine Untersuchung
 *     sinnvoll ist, sagt die Seite nicht.
 *   - Keine Diagnose, keine Fragen zum Gesundheitszustand.
 */

export const article = {
  slug: 'vorsorgeuntersuchung-maenner',
  kind: 'ratgeber',
  group: 'vorsorge',

  metaTitle: 'Vorsorgeuntersuchungen Männer: Alter und Leistung | Healio',
  metaDescription:
    'Vorsorgeuntersuchungen für Männer: Check-up und Hautkrebs ab 35, Prostata ab 45, Darm ab 50. Mit Abstand, Quelle, PSA-Test als Selbstzahlerleistung.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Vorsorgeuntersuchungen für Männer: was ab 35, 45 und 50 zusteht',
  listTeaser:
    'Check-up, Hautkrebs, Prostata, Darm, Lunge und Bauchaorta mit Alter, Abstand und Quelle, dazu der PSA-Test als Selbstzahlerleistung.',

  headline: 'Vorsorgeuntersuchungen Männer: was ab 35, 45 und 50 zusteht',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'prevention',
    tone: 'mint',
    facts: [
      { value: 'ab 35 Jahren', label: 'Check-up alle drei Jahre und Hautkrebsscreening alle zwei Jahre' },
      { value: 'ab 45 Jahren', label: 'jährlich die Untersuchung von Prostata und äußerem Genitale' },
      { value: 'ab 50 Jahren', label: 'Darmkrebs-Früherkennung, Stuhltest oder Darmspiegelung' },
    ],
    text: 'Der PSA-Test gehört nicht dazu, er ist eine Selbstzahlerleistung mit umstrittenem Nutzen. Die Untersuchungen in der Tabelle zahlt die Kasse nach der Richtlinie.',
    path: { to: '/ambulant', text: 'Mehr Vorsorge als die Kasse zahlt? Tarif ansehen', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Die gesetzliche Vorsorge für Männer beginnt mit dem Check-up ab 18 und der Krebsfrüherkennung ab 35. Mit 45 kommt die jährliche Untersuchung von Prostata und äußerem Genitale dazu, mit 50 die Darmkrebs-Früherkennung, zwischen 50 und 75 bei starkem Zigarettenkonsum die Lungenkrebs-Früherkennung. Unten steht jede Untersuchung mit Alter, Abstand und Quelle, getrennt von dem, was nur privat angeboten wird.',

  sections: [
    {
      id: 'uebersicht',
      heading: 'Welche Vorsorgeuntersuchungen zahlt die Kasse Männern?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Richtlinien des Gemeinsamen Bundesausschusses (G-BA) legen fest, wer in welchem Alter und in welchem Abstand Anspruch hat. Die Kosten gesetzlich geregelter Untersuchungen tragen laut gesund.bund.de die gesetzlichen und in aller Regel auch die privaten Kassen. Die Teilnahme ist freiwillig.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Gesetzliche Vorsorge und Früherkennung für Männer: Untersuchung, Alter, Abstand, Quelle',
          head: ['Untersuchung', 'Ab wann', 'Wie oft', 'Quelle'],
          rows: [
            ['Gesundheits-Check-up, ab 35 mit einmaligem Hepatitis-B- und Hepatitis-C-Test', 'ab 18 Jahren, bis 34 einmalig', 'ab 35 alle drei Jahre', 'G-BA, Gesundheitsuntersuchungs-Richtlinie, § 2'],
            ['Hautkrebsscreening', 'ab 35 Jahren', 'alle zwei Jahre', 'G-BA, KFE-Richtlinie, § 29'],
            ['Prostata, äußeres Genitale, Lymphknoten: Abtasten', 'ab 45 Jahren', 'jährlich', 'G-BA, KFE-Richtlinie, §§ 1, 2 und 25'],
            ['Darmkrebs: Stuhltest oder Darmspiegelung', 'ab 50 Jahren', 'Stuhltest alle zwei Jahre, Darmspiegelung höchstens zweimal im Abstand von zehn Jahren', 'G-BA, oKFE-Richtlinie, § 3'],
            ['Lungenkrebs: Niedrigdosis-CT bei starkem Zigarettenkonsum', '50 bis 75 Jahre', 'alle 12 Monate', 'G-BA, KFE-Richtlinie, § 38'],
            ['Ultraschall der Bauchaorta', 'ab 65 Jahren', 'einmalig', 'G-BA, Gesundheitsuntersuchungs-Richtlinie, Abschnitt Bauchaortenaneurysma, § 2'],
          ],
          note: 'Stand der Richtlinien: KFE-RL in Kraft seit 12.03.2026, oKFE-RL in Kraft seit 02.10.2026, Gesundheitsuntersuchungs-Richtlinie in Kraft seit 12.02.2021, Abruf am 07.10.2026. Die Lungenkrebs-Früherkennung ist seit April 2026 Kassenleistung, die Regeln zur Darmkrebs-Früherkennung gelten seit dem 1. April 2025 für Männer und Frauen gleich.',
        },
      ],
    },
    {
      id: 'ab-40',
      heading: 'Welche Vorsorge steht Männern ab 40 zu?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mit 40 gelten der Check-up alle drei Jahre und das Hautkrebsscreening alle zwei Jahre, beides gilt seit dem 35. Geburtstag. Die jährliche Untersuchung der Prostata beginnt erst mit 45, die Darmkrebs-Früherkennung mit 50. Vor 35 gibt es für Männer in der Krebsfrüherkennungs-Richtlinie keine Untersuchung, nur den einmaligen Check-up ab 18.',
        },
        {
          type: 'paragraph',
          text: 'Der Check-up soll Risiken für Herz-Kreislauf-Erkrankungen und Typ-2-Diabetes erkennen. Dazu gehören Gespräch, körperliche Untersuchung, Blutdruck, Blutfette und Blutzucker. Ab 35 gehört außerdem einmalig ein Screening auf Hepatitis B und C dazu, ein Hepatitis-B-Test entfällt laut gesund.bund.de, wenn du schon gegen Hepatitis B geimpft bist. Zum Termin kommst du nüchtern und möglichst mit Impfpass.',
        },
      ],
    },
    {
      id: 'prostata',
      heading: 'Was gehört zur Prostata-Früherkennung und zahlt die Kasse den PSA-Test?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Zur gesetzlichen Früherkennung ab 45 gehören laut Richtlinie ein gezieltes Gespräch, die Inspektion und das Abtasten des äußeren Genitales samt Hautarealen, das Abtasten der Prostata vom After aus, das Abtasten der Lymphknoten, die Mitteilung des Befunds und eine Beratung. Der PSA-Test ist nicht Teil davon. Der G-BA schreibt selbst, die PSA-Wert-Bestimmung im Blut sei aktuell keine Früherkennungsuntersuchung.',
        },
        {
          type: 'paragraph',
          text: 'Zur Kassenleistung wird der PSA-Test bei konkretem Krebsverdacht und zur Verlaufskontrolle bei einer Krebsbehandlung (Verbraucherzentrale NRW, Stand 27.05.2025). Als reine Früherkennung ist er eine individuelle Gesundheitsleistung (IGeL), die du selbst zahlst.',
        },
        {
          type: 'paragraph',
          text: 'Über den Nutzen wird gestritten. Der IGeL-Monitor des Medizinischen Dienstes Bund bewertet den PSA-Test zur Früherkennung als tendenziell negativ, seine Seite stammt von 2012 und wurde zuletzt 2017 aktualisiert. Die Deutsche Gesellschaft für Urologie hält die Bewertung für veraltet und verweist auf die S3-Leitlinie, nach der Männern ab 45, die nach einer Aufklärung eine Früherkennung wünschen, der PSA-Test angeboten werden soll (Pressemitteilung vom 05.12.2024). Die Verbraucherzentrale nennt als Größenordnung, dass von 1.000 Männern mit PSA-Test 1 bis 2 vor dem Tod durch Prostatakrebs bewahrt werden und rund 30 eine Überdiagnose erhalten.',
        },
        {
          type: 'paragraph',
          text: 'Der G-BA berät seit dem 16.10.2025 über ein risikoabhängiges Angebot mit PSA-Wert und MRT. Beschlossen ist dazu nichts, es gilt die bisherige Regel.',
        },
      ],
    },
    {
      id: 'darm',
      heading: 'Ab wann zahlt die Kasse die Darmspiegelung bei Männern?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ab 50 Jahren. Du kannst zwischen einem Stuhltest auf verborgenes Blut, der alle zwei Jahre gemacht wird, und einer Darmspiegelung wählen. Wer eine Darmspiegelung macht, braucht in den neun folgenden Kalenderjahren keine weitere Methode. Danach kommen Stuhltest oder eine zweite Darmspiegelung wieder infrage. Höchstens zwei Darmspiegelungen sind als Früherkennung vorgesehen, eine Darmspiegelung ab 65 zählt als die zweite.',
        },
        {
          type: 'paragraph',
          text: 'Die Kassen laden dich schriftlich ein, wenn du 50, 55, 60 und 65 Jahre alt wirst. Du kannst die Untersuchung auch ohne Einladung nutzen, sobald du das Alter erreicht hast. Seit dem 1. April 2025 gelten für Männer und Frauen dieselben Regeln (G-BA).',
        },
      ],
    },
    {
      id: 'lunge',
      heading: 'Zahlt die Kasse eine Lungenkrebs-Früherkennung für Raucher?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, seit April 2026, aber nur für aktive und ehemalige starke Raucher zwischen 50 und 75 Jahren. Alle 12 Monate ist eine Untersuchung mit einer Niedrigdosis-Computertomographie möglich. Teilnehmen kann, wer über mindestens 25 Jahre und mit mindestens 15 Packungsjahren stark geraucht hat. Ein Packungsjahr entspricht 20 Zigaretten pro Tag über ein Jahr, so der G-BA.',
        },
        {
          type: 'paragraph',
          text: 'Den Anfang macht eine allgemeinmedizinische oder internistische Praxis, die sich beteiligt. Diese Praxis klärt die Berechtigung, informiert über Nutzen und Schaden und überweist an eine Radiologie-Praxis mit Genehmigung. Der G-BA weist darauf hin, dass es noch dauert, bis das Angebot überall genutzt werden kann. Auch die Möglichkeiten zur Tabakentwöhnung gehören zur Information.',
        },
      ],
    },
    {
      id: 'extras',
      heading: 'Was ist mit anderen Untersuchungen, die nur privat angeboten werden?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Früherkennung, die nicht in der Tabelle oben steht, wird meist als individuelle Gesundheitsleistung (IGeL) angeboten, die gesetzlichen Kassen bezahlen sie nicht. Gesund.bund.de schreibt dazu, für den Nutzen vieler dieser Maßnahmen lägen keine ausreichenden Belege vor oder sie seien noch nicht bewertet worden. Der PSA-Test ist ein Beispiel. Er kostet laut gesundheitsinformation.de, dem Portal des IQWiG, zwischen 25 und 35 EUR, mit aufklärendem Gespräch und ergänzenden Untersuchungen etwa 60 EUR (Stand 21.01.2026).',
        },
        {
          type: 'paragraph',
          text: 'Auf healio.de/ambulant stehen zwei Wege für zusätzliche ärztliche Vorsorge. Im ambulanten Tarif der SDK hat jede Stufe einen eigenen Vorsorge-Topf, in Ambulant 100 bis zu 500 EUR in zwei Jahren. Der Vorsorge-Baustein der UKV zahlt laut UKV ärztliche Vorsorge auch dann, wenn die Krankenkasse sie in deinem Alter oder in diesem Abstand nicht übernimmt. Als Beispiele nennt die Seite unter anderem Krebsvorsorge wie Darmspiegelung, PSA- oder HPV-Test, einen allgemeinen Check-up und ein großes Blutbild mit Vitamin D und Schilddrüsenwert.',
        },
        {
          type: 'paragraph',
          text: 'Die ärztliche Vorsorge ist dort zu 100 % versichert, bis 500 EUR pro Jahr. Im 1. Kalenderjahr sind es bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR. Der Baustein kostet ab 20 Jahren 13,45 EUR im Monat. Erstattet wird die Untersuchung beim Arzt mit Rechnung nach GOÄ. Rechnungen vom Heilpraktiker, Pauschalrechnungen und Quittungen zählen nicht. Bei begründetem Krankheitsverdacht ist es Behandlung und keine Vorsorge.',
        },
        {
          type: 'costCard',
          title: 'Vorsorge für Männer: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit dem Vorsorge-Baustein der UKV: ärztliche Vorsorge zu 100 %, bis 500 EUR pro Jahr, im 1. Kalenderjahr bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR, Rechnung nach GOÄ. Der PSA-Preis stammt von gesundheitsinformation.de (IQWiG), Stand 21.01.2026.',
          caption: 'Kostenkarte: Vorsorge für Männer ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Check-up, Hautkrebsscreening, Prostata-Tasten, Darmkrebs-Früherkennung nach Richtlinie', 'die Untersuchung, wenn Alter und Abstand passen', 'nichts', 'nichts, es ist Kassenleistung'],
            ['PSA-Test zur Früherkennung ohne Verdacht', 'nichts', '25 bis 35 EUR für den Test, mit Gespräch und ergänzenden Untersuchungen etwa 60 EUR (IQWiG, 21.01.2026)', 'Der Baustein erstattet ärztliche Vorsorge mit GOÄ-Rechnung bis zu den genannten Grenzen'],
            ['Zusätzlicher Check-up oder Untersuchung außerhalb des Abstands', 'nichts', 'die Rechnung nach GOÄ, Preis je Praxis', 'Der Baustein erstattet ärztliche Vorsorge mit GOÄ-Rechnung bis zu den genannten Grenzen'],
          ],
          note: 'Keine Preisangabe für Untersuchungen außer dem PSA-Test, deren Preis je Praxis verschieden ist. Quelle der Kassenregeln: G-BA und gesund.bund.de, Quelle der Tarifangaben: Unterlagen auf healio.de/ambulant (UKV-Beiträge gültig ab 01.05.2026). Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'prevention',
          text: 'Du willst Vorsorge über das Kassenangebot hinaus prüfen? Der Tarifrechner zeigt dir den Beitrag, bevor du etwas beantragst.',
          label: 'Ambulanten Tarif ansehen',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Der PSA-Test ist kein Teil der Kassenvorsorge.', text: 'Die Kasse zahlt das Abtasten ab 45, den PSA-Test nur bei Verdacht und zur Verlaufskontrolle. Ob du ihn als Früherkennung machst, entscheidest du nach einem Gespräch mit deiner Ärztin oder deinem Arzt. Diese Seite empfiehlt weder dafür noch dagegen.' },
            { lead: 'Zusätzliche Untersuchungen sind nicht automatisch sinnvoll.', text: 'Der Baustein erstattet Rechnungen für ärztliche Vorsorge, er sagt nicht, ob eine Untersuchung bei dir etwas bringt. Gesund.bund.de weist darauf hin, dass der Nutzen vieler Selbstzahlerleistungen unklar ist.' },
            { lead: 'Frühe Beschwerden gehören zur Untersuchung, nicht in die Vorsorge.', text: 'Bei Beschwerden oder einem Krankheitsverdacht hast du Anspruch auf Untersuchung und Behandlung, in jedem Alter und unabhängig vom Abstand. Dieser Ratgeber stellt keine Diagnose.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Viele Bonusprogramme belohnen Vorsorge ausdrücklich. Nach § 65a SGB V bestimmt die Kasse in ihrer Satzung, unter welchen Voraussetzungen Versicherte einen Bonus bekommen, die Früherkennung oder Schutzimpfungen in Anspruch nehmen. Wie das bei deiner Kasse aussieht, steht auf der Seite Vorsorgeuntersuchungen und in den Ratgebern zu den Bonusprogrammen.',
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'prevention',
              tone: 'mint',
              title: 'Vorsorgeuntersuchungen: was die Kasse in welchem Alter zahlt',
              text: 'Alle Untersuchungen für Männer, Frauen und Kinder in einer Tabelle.',
              to: '/ratgeber/vorsorgeuntersuchung',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'pregnancy',
              tone: 'coral',
              title: 'Vorsorgeuntersuchungen für Frauen',
              text: 'Was ab 20, 30 und 50 zusteht und wie oft.',
              to: '/ratgeber/vorsorgeuntersuchung-frauen',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'advisor',
              tone: 'sky',
              title: 'Hautkrebsscreening',
              text: 'Ab 35 alle zwei Jahre, mit Dermatoskop, und was unter 35 privat anfällt.',
              to: '/ratgeber/hautkrebsscreening',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'Kassenbonus und Zusatzversicherung',
              text: 'Wie der Bonus der Kasse den Beitrag mittragen kann.',
              to: '/ratgeber/krankenkassen-bonus-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Vorsorge zeigt Healio den ambulanten Tarif der SDK mit eigenem Vorsorge-Topf und als kleine Zusatzoption den Vorsorge-Baustein der UKV. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Welche Vorsorgeuntersuchungen zahlt die Krankenkasse Männern?',
      answer:
        'Den Check-up ab 18 (bis 34 einmalig, ab 35 alle drei Jahre), das Hautkrebsscreening ab 35 alle zwei Jahre, die Untersuchung von Prostata und äußerem Genitale ab 45 jährlich, die Darmkrebs-Früherkennung ab 50 und bei starkem Zigarettenkonsum die Lungenkrebs-Früherkennung von 50 bis 75. Ab 65 gibt es einmalig den Ultraschall der Bauchaorta.',
    },
    {
      question: 'Ab wann zahlt die Kasse die Prostata-Vorsorge?',
      answer:
        'Ab 45 Jahren, jährlich. Zur Untersuchung gehören Gespräch, Abtasten von äußerem Genitale, Prostata und Lymphknoten sowie Beratung. Der PSA-Test gehört nicht dazu.',
    },
    {
      question: 'Zahlt die Krankenkasse den PSA-Test?',
      answer:
        'Nur bei konkretem Krebsverdacht und zur Verlaufskontrolle einer Krebsbehandlung. Als Früherkennung ist er eine Selbstzahlerleistung. Der Test kostet laut gesundheitsinformation.de 25 bis 35 EUR, mit Gespräch und ergänzenden Untersuchungen etwa 60 EUR (Stand 21.01.2026). Der Nutzen ist umstritten.',
    },
    {
      question: 'Ab wann zahlt die Kasse die Darmspiegelung für Männer?',
      answer:
        'Ab 50 Jahren. Du wählst zwischen einem Stuhltest alle zwei Jahre und einer Darmspiegelung. Höchstens zwei Darmspiegelungen sind als Früherkennung vorgesehen, die zweite frühestens nach zehn Jahren.',
    },
    {
      question: 'Welche Vorsorgeuntersuchung steht Männern ab 40 zu?',
      answer:
        'Der Check-up alle drei Jahre und das Hautkrebsscreening alle zwei Jahre, beide gelten seit 35. Die Prostata-Untersuchung beginnt mit 45, die Darmkrebs-Früherkennung mit 50.',
    },
    {
      question: 'Wie oft darf ich zum Check-up?',
      answer:
        'Ab 35 alle drei Jahre. Wurde ein Check-up gemacht, ist in den zwei folgenden Kalenderjahren keiner vorgesehen. Von 18 bis 34 Jahren gibt es einen Check-up einmalig.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Sprich in deiner Praxis über die Untersuchungen, die für dein Alter vorgesehen sind. Die Übersicht für alle Altersgruppen steht auf der Seite ' },
      { text: 'Vorsorgeuntersuchungen', to: '/ratgeber/vorsorgeuntersuchung' },
      { text: ', den ambulanten Tarif mit Vorsorge-Topf findest du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Alter, Abstand und Leistung stammen aus den Richtlinien des G-BA und gesund.bund.de, die Einschätzung des PSA-Tests aus Verbraucherzentrale, IGeL-Monitor und Fachgesellschaft.',
    items: [
      {
        label: 'Krebsfrüherkennungs-Richtlinie (KFE-RL), §§ 1, 2, 25, 29 und 37 bis 39',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4074/KFE-RL_2025-12-18_iK-2026-03-12.pdf',
        stand: 'geändert 18.12.2025, in Kraft seit 12.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Richtlinie für organisierte Krebsfrüherkennungsprogramme (oKFE-RL), Darmkrebs § 3 und § 4',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4233/oKFE-RL-2026-08-20-iK-2026-10-02.pdf',
        stand: 'geändert 20.08.2026, in Kraft seit 02.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheitsuntersuchungs-Richtlinie (Check-up, Hepatitis-Screening, Bauchaortenaneurysma)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-2383/GU-RL_2020-11-20_iK-2021-02-12.pdf',
        stand: 'geändert 20.11.2020, in Kraft seit 12.02.2021',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Darmkrebs-Vorsorge: Darmspiegelung jetzt auch für Frauen ab 50 Jahren möglich',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Meldung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1248/',
        stand: '01.04.2025, Inkrafttreten der gleichen Regeln für Frauen und Männer ab 50',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Lungenkrebs-Früherkennung für Raucherinnen und Raucher kommt ab April in die Versorgung',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1316/',
        stand: '13.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Früherkennung von Prostatakrebs: G-BA prüft risikoabhängiges Angebot',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1290/',
        stand: '16.10.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Informationen zu Krebsfrüherkennung',
        publisher: 'gesund.bund.de (Bundesministerium für Gesundheit)',
        href: 'https://gesund.bund.de/krebsfrueherkennung',
        stand: '25.03.2025, vor der Einführung der Lungenkrebs-Früherkennung',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheits-Check-up für Erwachsene',
        publisher: 'gesund.bund.de (Bundesministerium für Gesundheit)',
        href: 'https://gesund.bund.de/gesundheits-check-up-fuer-erwachsene',
        stand: '06.10.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'PSA-Test zur Prostatakrebs-Früherkennung',
        publisher: 'Verbraucherzentrale NRW',
        href: 'https://www.verbraucherzentrale.nrw/node/33867',
        stand: '27.05.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'PSA-Test zur Früherkennung von Prostatakrebs',
        publisher: 'IGeL-Monitor (Medizinischer Dienst Bund)',
        href: 'https://www.igel-monitor.de/igel-a-z/igel/show/psa-test-zur-frueherkennung-von-prostatakrebs.html',
        stand: 'Seite erstellt 16.01.2012, zuletzt aktualisiert 06.04.2017',
        accessedAt: '07.10.2026',
        note: 'Alte Seite: Die Bewertung stammt von 2017',
      },
      {
        label: 'Der PSA-Test zur Früherkennung von Prostatakrebs',
        publisher: 'gesundheitsinformation.de (Institut für Qualität und Wirtschaftlichkeit im Gesundheitswesen, IQWiG)',
        href: 'https://www.gesundheitsinformation.de/der-psa-test-zur-frueherkennung-von-prostatakrebs.html',
        stand: 'aktualisiert 21.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Pauschale Verurteilung individueller Gesundheitsleistungen: DGU e.V. kritisiert IGeL-Report 2024',
        publisher: 'Deutsche Gesellschaft für Urologie (über idw)',
        href: 'https://idw-online.de/de/news844338',
        stand: '05.12.2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 65a Bonus für gesundheitsbewusstes Verhalten',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__65a.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen SDK Ambulant und UKV Vorsorge-Baustein, wie auf healio.de/ambulant',
        publisher: 'SDK und UKV',
        stand: '07.10.2026',
        note: 'Beiträge der UKV gültig ab 01.05.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Dieser Ratgeber ersetzt keine ärztliche Beratung. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
