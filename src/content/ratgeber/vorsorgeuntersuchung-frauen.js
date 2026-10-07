/**
 * Ratgeber-Serie, Feld Vorsorge (group 'vorsorge'), Seite:
 * Vorsorgeuntersuchung Frauen. Hauptbegriff "vorsorgeuntersuchung frauen",
 * Angebotspfad /ambulant.
 *
 * SPERRLISTEN-KANDIDAT (Krebsvorsorge, Entscheidung der Marktanalyse-Sitzung
 * 07.10.2026): Der Pfad /ratgeber/vorsorgeuntersuchung-frauen gehört in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js) und
 * ANALYTICS_EXCLUDED_PATHS (src/lib/analytics.js).
 *
 * Quellen (Belege: vorsorgeuntersuchung-frauen.belege.md, Abruf 07.10.2026):
 * G-BA Krebsfrüherkennungs-Richtlinie (§§ 1, 2, 6, 10, 13, 29, 38; in Kraft
 * seit 12.03.2026), oKFE-Richtlinie (Zervix § 3, Darm § 3; in Kraft seit
 * 02.10.2026), Gesundheitsuntersuchungs-Richtlinie (Check-up),
 * G-BA-Pressemitteilungen (Mammographie ab 45 in Beratung, 16.04.2026;
 * Lungenkrebs, 13.03.2026), gesund.bund.de (Krebsfrüherkennung, Check-up),
 * Verbraucherzentrale (IGeL-Bewertung, Stand 15.07.2025). Tarifaussagen
 * wortgleich mit ambulant.json (vorsorgeBaustein) und /ambulant.
 *
 * Bewusste Grenzen:
 *   - Alter, Abstand und Leistung nur nach Richtlinien und gesund.bund.de.
 *     Die Themenliste nennt "ab 20, 30 und 50": Die Seite folgt der
 *     Richtlinie (20 Genitale und Abstrich, 30 Brust, 50 Mammographie und
 *     Darm, 35 Haut und Ko-Test).
 *   - Mammographie ab 45 ist NICHT beschlossen: Der G-BA berät
 *     (Pressemitteilung 16.04.2026), Stellungnahmeverfahren seit 23.07.2026
 *     (Beschluss 7918), kein Endbeschluss am 07.10.2026 (KFE-RL-Seite und
 *     Pressemitteilungen geprüft). Die Seite sagt neutral "der G-BA berät",
 *     ohne Termin oder Prognose (Entscheidung Marktanalyse-Sitzung
 *     07.10.2026). Vor Veröffentlichung erneut auf g-ba.de prüfen.
 *   - Darmkrebs gilt für Frauen und Männer gleich seit 01.04.2025.
 *   - Faktenprüfung 07.10.2026: PRÜFBERICHT-brille-vorsorge.md.
 *   - IGeL-Extras (Ultraschall der Eierstöcke) klar getrennt, mit der
 *     Bewertung des IGeL-Monitors, ohne Nutzenversprechen.
 *   - Schwangerschaft nur mit Verweis auf den bestehenden Ratgeber, kein
 *     Kinderwunsch, kein NIPT.
 *   - Keine Diagnose, keine Fragen zum Gesundheitszustand.
 */

export const article = {
  slug: 'vorsorgeuntersuchung-frauen',
  kind: 'ratgeber',
  group: 'vorsorge',

  metaTitle: 'Vorsorgeuntersuchung Frauen: Alter und Leistung | Healio',
  metaDescription:
    'Vorsorgeuntersuchung für Frauen: Untersuchung ab 20, Brust ab 30, Mammographie von 50 bis 75, Darm ab 50. Mit Abstand, Quelle und Selbstzahlerleistungen.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Vorsorgeuntersuchungen für Frauen: was ab 20, 30 und 50 zusteht',
  listTeaser:
    'Frauenarzt, Abstrich, Brust, Mammographie, Haut, Darm und Check-up mit Alter, Abstand und Quelle, getrennt von den Selbstzahlerleistungen.',

  headline: 'Vorsorgeuntersuchung Frauen: was ab 20, 30 und 50 zusteht',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'prevention',
    tone: 'mint',
    facts: [
      { value: 'ab 20 Jahren', label: 'jährlich die Untersuchung der Geschlechtsorgane, bis 34 mit Abstrich' },
      { value: 'ab 30 Jahren', label: 'jährlich das Abtasten von Brust und Lymphknoten' },
      { value: '50 bis 75 Jahre', label: 'Mammographie-Screening alle zwei Jahre' },
    ],
    text: 'Dazu kommen Hautkrebsscreening ab 35, Darmkrebs-Früherkennung ab 50 und der Check-up. Ein Ultraschall der Eierstöcke gehört nicht dazu.',
    path: { to: '/ambulant', text: 'Mehr Vorsorge als die Kasse zahlt? Tarif ansehen', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Die gesetzliche Vorsorge für Frauen beginnt mit 20 Jahren. Ab dann gibt es jährlich die Untersuchung der Geschlechtsorgane, bis 34 mit dem Abstrich vom Gebärmutterhals, danach mit HPV-Test alle drei Jahre. Ab 30 kommt das Abtasten der Brust dazu, von 50 bis 75 das Mammographie-Screening. Unten steht jede Untersuchung mit Alter, Abstand und Quelle, getrennt von dem, was nur privat angeboten wird.',

  sections: [
    {
      id: 'uebersicht',
      heading: 'Welche Vorsorgeuntersuchungen zahlt die Kasse Frauen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Richtlinien des Gemeinsamen Bundesausschusses (G-BA) legen fest, wer in welchem Alter und in welchem Abstand Anspruch hat. Die Kosten gesetzlich geregelter Untersuchungen tragen laut gesund.bund.de die gesetzlichen und in aller Regel auch die privaten Kassen. Die Teilnahme ist freiwillig.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Gesetzliche Vorsorge und Früherkennung für Frauen: Untersuchung, Alter, Abstand, Quelle',
          head: ['Untersuchung', 'Ab wann', 'Wie oft', 'Quelle'],
          rows: [
            ['Untersuchung der Geschlechtsorgane: Gespräch, Inspektion, Tastuntersuchung, Spiegeleinstellung des Gebärmutterhalses, Beratung', 'ab 20 Jahren', 'jährlich', 'G-BA, KFE-Richtlinie, § 6 Abs. 1 a'],
            ['Abstrich vom Gebärmutterhals (Zytologie)', '20 bis 34 Jahre', 'jährlich', 'G-BA, oKFE-Richtlinie, Zervix § 3'],
            ['Abstrich und HPV-Test zusammen (Ko-Test)', 'ab 35 Jahren', 'alle drei Jahre', 'G-BA, oKFE-Richtlinie, Zervix § 3'],
            ['Abtasten von Brustdrüsen und Lymphknoten mit Anleitung zur Selbstuntersuchung', 'ab 30 Jahren', 'jährlich', 'G-BA, KFE-Richtlinie, § 6 Abs. 1 b'],
            ['Mammographie-Screening', '50 bis 75 Jahre', 'alle 24 Monate', 'G-BA, KFE-Richtlinie, § 10'],
            ['Hautkrebsscreening', 'ab 35 Jahren', 'alle zwei Jahre', 'G-BA, KFE-Richtlinie, § 29'],
            ['Darmkrebs: Stuhltest oder Darmspiegelung', 'ab 50 Jahren', 'Stuhltest alle zwei Jahre, Darmspiegelung höchstens zweimal im Abstand von zehn Jahren', 'G-BA, oKFE-Richtlinie, Darm § 3'],
            ['Lungenkrebs: Niedrigdosis-CT bei starkem Zigarettenkonsum', '50 bis 75 Jahre', 'alle 12 Monate', 'G-BA, KFE-Richtlinie, § 38'],
            ['Gesundheits-Check-up', 'ab 18 Jahren, bis 34 einmalig', 'ab 35 alle drei Jahre', 'G-BA, Gesundheitsuntersuchungs-Richtlinie, § 2'],
            ['Test auf Chlamydien-Infektion', 'bis 25 Jahre', 'einmal jährlich', 'gesund.bund.de, Check-up'],
          ],
          note: 'Stand der Richtlinien: KFE-RL in Kraft seit 12.03.2026, oKFE-RL in Kraft seit 02.10.2026, Gesundheitsuntersuchungs-Richtlinie in Kraft seit 12.02.2021, Abruf am 07.10.2026. Für die Schwangerschaft gelten eigene Regeln der Mutterschaftsvorsorge.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was in der Schwangerschaft zusteht, steht im Ratgeber ' },
            { text: 'Schwangerschaft: was steht mir zu', to: '/ratgeber/schwangerschaft-was-steht-mir-zu' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'frauenarzt',
      heading: 'Wie oft zahlt die Kasse die Untersuchung beim Frauenarzt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Untersuchung der Geschlechtsorgane zahlt die Kasse ab 20 Jahren jährlich. Der Abstrich vom Gebärmutterhals gehört bis 34 Jahre ebenfalls jährlich dazu. Ab 35 gibt es stattdessen alle drei Jahre den Ko-Test aus Abstrich und HPV-Test, sofern die Untersuchung keine Hinweise auf Zellveränderungen oder eine HPV-Infektion gibt (gesund.bund.de). Wurde ein Ko-Test gemacht, ist in den zwei folgenden Kalenderjahren keiner als Primärscreening vorgesehen.',
        },
        {
          type: 'paragraph',
          text: 'Ab 30 Jahren kommt jährlich das Abtasten der Brust und der Lymphknoten samt Anleitung zur Selbstuntersuchung hinzu. Die Kassen laden außerdem zur Früherkennung von Gebärmutterhalskrebs und Darmkrebs persönlich und schriftlich ein, die Einladung ist aber keine Voraussetzung, du kannst die Untersuchung nutzen, sobald du das Alter erreicht hast.',
        },
      ],
    },
    {
      id: 'mammographie',
      heading: 'Ab wann zahlt die Kasse die Mammographie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ab 50 Jahren, bis 75, alle zwei Jahre. Jede Frau in dieser Altersgruppe soll von der Zentralen Stelle schriftlich zur Teilnahme eingeladen werden, mit Untersuchungsort und Termin. Der Anspruch besteht nur innerhalb des Früherkennungsprogramms. Wurde in den letzten zwölf Monaten aus anderen Gründen eine Mammographie gemacht, beginnt der Anspruch frühestens zwölf Monate danach.',
        },
        {
          type: 'paragraph',
          text: 'Ob die Altersgrenze sinkt, ist nicht entschieden. Der G-BA berät über eine Absenkung der unteren Altersgrenze auf 45 Jahre (Pressemitteilung vom 16.04.2026) und hat dazu am 23.07.2026 das Stellungnahmeverfahren eingeleitet. Beschlossen ist das nicht, es gilt weiter 50 bis 75.',
        },
      ],
    },
    {
      id: 'ab-50',
      heading: 'Welche Vorsorge steht Frauen ab 40, ab 50 und ab 60 zu?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mit 40 gelten die jährliche Untersuchung der Geschlechtsorgane, das Abtasten der Brust, der Ko-Test alle drei Jahre, das Hautkrebsscreening alle zwei Jahre und der Check-up alle drei Jahre. Mit 50 kommen das Mammographie-Screening und die Darmkrebs-Früherkennung dazu, und bei starkem Zigarettenkonsum die Lungenkrebs-Früherkennung. Das alles läuft mit 60 weiter, die Mammographie bis zum 75. Lebensjahr.',
        },
        {
          type: 'paragraph',
          text: 'Beim Darm kannst du ab 50 zwischen einem Stuhltest alle zwei Jahre und einer Darmspiegelung wählen. Seit dem 1. April 2025 können Frauen wie Männer ab 50 zweimal eine Darmspiegelung machen, die zweite frühestens nach zehn Jahren. Die Kassen laden dich mit 50, 55, 60 und 65 schriftlich ein. Die Lungenkrebs-Früherkennung ist seit April 2026 Kassenleistung, nach G-BA für aktive und ehemalige starke Raucherinnen von 50 bis 75 Jahren mit mindestens 25 Jahren Zigarettenkonsum und mindestens 15 Packungsjahren.',
        },
      ],
    },
    {
      id: 'extras',
      heading: 'Was zahlt die Kasse nicht, zum Beispiel beim Ultraschall der Eierstöcke?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Untersuchungen außerhalb der Tabelle sind individuelle Gesundheitsleistungen (IGeL), die gesetzliche Kassen nicht bezahlen. Gesund.bund.de nennt als Beispiel die Ultraschalluntersuchung der Eierstöcke und schreibt, für den Nutzen vieler dieser Maßnahmen lägen keine ausreichenden Belege vor oder sie seien noch nicht bewertet worden.',
        },
        {
          type: 'paragraph',
          text: 'Der IGeL-Monitor des Medizinischen Dienstes Bund hat 2024 den Ultraschall der Eierstöcke oder der Gebärmutter zur Krebsfrüherkennung als eine der am häufigsten verkauften IGeL genannt. Bei beiden überwiege laut IGeL-Monitor der mögliche Schaden den Nutzen. Die Verbraucherzentrale schreibt, in Studien sei kein Nutzen gezeigt worden, falsch positive Ergebnisse könnten unnötig beunruhigen und im schlimmsten Fall dazu führen, dass gesunde Eierstöcke entfernt werden. Auch der Berufsverband der Frauenärzte rate davon ab (Stand 15.07.2025).',
        },
        {
          type: 'paragraph',
          text: 'Auf healio.de/ambulant stehen zwei Wege für zusätzliche ärztliche Vorsorge. Im ambulanten Tarif der SDK hat jede Stufe einen eigenen Vorsorge-Topf, in Ambulant 100 bis zu 500 EUR in zwei Jahren. Der Vorsorge-Baustein der UKV zahlt laut UKV ärztliche Vorsorge auch dann, wenn die Krankenkasse sie in deinem Alter oder in diesem Abstand nicht übernimmt. Als Beispiele nennt die Seite unter anderem Krebsvorsorge wie Mammografie, Ultraschall der Brust und HPV-Test sowie einen allgemeinen Check-up.',
        },
        {
          type: 'paragraph',
          text: 'Die ärztliche Vorsorge ist dort zu 100 % versichert, bis 500 EUR pro Jahr. Im 1. Kalenderjahr sind es bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR. Der Baustein kostet ab 20 Jahren 13,45 EUR im Monat. Erstattet wird die Untersuchung beim Arzt mit Rechnung nach GOÄ. Rechnungen vom Heilpraktiker, Pauschalrechnungen und Quittungen zählen nicht. Bei begründetem Krankheitsverdacht ist es Behandlung und keine Vorsorge. Für eine schon festgestellte Schwangerschaft ist laut Seite der Vorsorge-Topf der SDK der richtige Weg.',
        },
        {
          type: 'costCard',
          title: 'Vorsorge für Frauen: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit dem Vorsorge-Baustein der UKV: ärztliche Vorsorge zu 100 %, bis 500 EUR pro Jahr, im 1. Kalenderjahr bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR, Rechnung nach GOÄ. Euro-Beträge für einzelne Untersuchungen nennen wir nicht, weil sie je Praxis verschieden sind.',
          caption: 'Kostenkarte: Vorsorge für Frauen ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Untersuchung der Geschlechtsorgane, Abstrich, Brust-Tasten, Mammographie von 50 bis 75, Darm, Haut nach Richtlinie', 'die Untersuchung, wenn Alter und Abstand passen', 'nichts', 'nichts, es ist Kassenleistung'],
            ['Mammografie außerhalb des Programms, etwa vor dem 50. Geburtstag und ohne Verdacht', 'nichts', 'die Rechnung nach GOÄ, Preis je Praxis', 'Der Baustein erstattet ärztliche Vorsorge mit GOÄ-Rechnung bis zu den genannten Grenzen'],
            ['Zusätzliche Untersuchung außerhalb von Alter oder Abstand', 'nichts', 'die Rechnung nach GOÄ, Preis je Praxis', 'Der Baustein erstattet ärztliche Vorsorge mit GOÄ-Rechnung bis zu den genannten Grenzen'],
          ],
          note: 'Keine Preisangabe. Quelle der Kassenregeln: G-BA und gesund.bund.de, Quelle der Tarifangaben: Unterlagen auf healio.de/ambulant (UKV-Beiträge gültig ab 01.05.2026). Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet. Maßgeblich sind die Tarifbedingungen.',
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
            { lead: 'Keine Früherkennung ist hundertprozentig zuverlässig.', text: 'Gesund.bund.de nennt als mögliche Nachteile falsch positive und falsch negative Befunde sowie Überdiagnosen. Wie groß der Vorteil einer Untersuchung ist, hängt laut gesund.bund.de von der Krebsart und der Methode ab. Die Teilnahme ist freiwillig, diese Seite spricht keine Empfehlung aus.' },
            { lead: 'Der Ultraschall der Eierstöcke ist eine Selbstzahlerleistung mit schlechter Bewertung.', text: 'Wenn dir eine Praxis ihn anbietet, darfst du nach Nutzen und Risiken fragen. Der Baustein erstattet Rechnungen für ärztliche Vorsorge, er sagt nicht, ob eine Untersuchung bei dir etwas bringt.' },
            { lead: 'Beschwerden gehören zur Untersuchung, nicht in die Vorsorge.', text: 'Bei Beschwerden oder einem Krankheitsverdacht hast du Anspruch auf Untersuchung und Behandlung, in jedem Alter und unabhängig vom Abstand. Dieser Ratgeber stellt keine Diagnose.' },
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
              icon: 'advisor',
              tone: 'sky',
              title: 'Vorsorgeuntersuchungen für Männer',
              text: 'Was ab 35, 45 und 50 zusteht und was IGeL ist.',
              to: '/ratgeber/vorsorgeuntersuchung-maenner',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'coral',
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
      question: 'Welche Vorsorgeuntersuchungen zahlt die Krankenkasse Frauen?',
      answer:
        'Die Untersuchung der Geschlechtsorgane ab 20 jährlich, den Abstrich bis 34 jährlich und ab 35 den Ko-Test alle drei Jahre, das Abtasten der Brust ab 30 jährlich, das Mammographie-Screening von 50 bis 75 alle zwei Jahre, das Hautkrebsscreening ab 35, die Darmkrebs-Früherkennung ab 50 und den Check-up. Bei starkem Zigarettenkonsum kommt von 50 bis 75 die Lungenkrebs-Früherkennung dazu.',
    },
    {
      question: 'Wie oft zahlt die Kasse die Untersuchung beim Frauenarzt?',
      answer:
        'Jährlich ab 20 Jahren. Der Abstrich vom Gebärmutterhals ist bis 34 jährlich vorgesehen, ab 35 gibt es alle drei Jahre den Ko-Test mit HPV-Test, solange der Befund unauffällig ist.',
    },
    {
      question: 'Ab wann zahlt die Kasse die Mammographie?',
      answer:
        'Ab 50 Jahren, bis 75, alle zwei Jahre im Mammographie-Screening. Über eine Absenkung auf 45 Jahre berät der G-BA, beschlossen ist sie nicht.',
    },
    {
      question: 'Zahlt die Kasse die Brustuntersuchung?',
      answer:
        'Ab 30 Jahren jährlich das Abtasten der Brustdrüsen und der Lymphknoten einschließlich der Anleitung zur Selbstuntersuchung. Die Mammographie folgt im Screening ab 50.',
    },
    {
      question: 'Welche Vorsorge gibt es für Frauen ab 50 und ab 60?',
      answer:
        'Ab 50 die Mammographie alle zwei Jahre bis 75, die Darmkrebs-Früherkennung mit Stuhltest oder Darmspiegelung und bei starkem Zigarettenkonsum die Lungenkrebs-Früherkennung. Dazu laufen Untersuchung der Geschlechtsorgane, Hautkrebsscreening und Check-up weiter.',
    },
    {
      question: 'Zahlt die Kasse den Ultraschall der Eierstöcke zur Krebsfrüherkennung?',
      answer:
        'Nein, er gehört nicht zum gesetzlichen Programm und ist eine Selbstzahlerleistung. Der IGeL-Monitor sieht den möglichen Schaden größer als den Nutzen, und laut Verbraucherzentrale rät auch der Berufsverband der Frauenärzte ab.',
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
    intro: 'Alter, Abstand und Leistung stammen aus den Richtlinien des G-BA und gesund.bund.de, die Bewertung des Ultraschalls der Eierstöcke aus IGeL-Monitor und Verbraucherzentrale.',
    items: [
      {
        label: 'Krebsfrüherkennungs-Richtlinie (KFE-RL), §§ 1, 2, 6, 10, 13, 29 und 38',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4074/KFE-RL_2025-12-18_iK-2026-03-12.pdf',
        stand: 'geändert 18.12.2025, in Kraft seit 12.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Richtlinie für organisierte Krebsfrüherkennungsprogramme (oKFE-RL), Zervixkarzinom § 3 und Darmkrebs §§ 3 und 4',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4233/oKFE-RL-2026-08-20-iK-2026-10-02.pdf',
        stand: 'geändert 20.08.2026, in Kraft seit 02.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheitsuntersuchungs-Richtlinie (Check-up)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-2383/GU-RL_2020-11-20_iK-2021-02-12.pdf',
        stand: 'geändert 20.11.2020, in Kraft seit 12.02.2021',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Mammographie-Screening zur Früherkennung von Brustkrebs: GBA berät über Absenkung der Altersgrenze auf 45 Jahre',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1324/',
        stand: '16.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Einleitung des Stellungnahmeverfahrens: Erweiterung der unteren Altersgrenze im Mammographie-Screening',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Beschluss',
        href: 'https://www.g-ba.de/beschluesse/7918/',
        stand: '23.07.2026, Stellungnahmeverfahren eingeleitet, kein Endbeschluss',
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
        label: 'Wissenschaftliche Bewertung von individuellen Gesundheitsleistungen',
        publisher: 'Verbraucherzentrale (zum IGeL-Monitor des Medizinischen Dienstes Bund)',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/wissenschaftliche-bewertung-von-individuellen-gesundheitsleistungen-34224',
        stand: '15.07.2025',
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
