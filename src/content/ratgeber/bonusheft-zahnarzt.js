/**
 * Zahn-Ratgeber Welle 1, Z5: "Bonusheft beim Zahnarzt".
 *
 * Quellen: Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abschnitt B5
 * (§ 55 Abs. 1 und 2 SGB V bis 31.12.2026, Neufassung ab 01.01.2027 nach
 * BGBl. 2026 I Nr. 228, § 22 Abs. 1 SGB V, KZBV zum verlorenen Heft), B4
 * (Festzuschüsse 2026 in Euro für Befund 1.1 und 2.1). IKK-Zahlen
 * (laut Satzung bis zu 810 EUR, breite Masse 400 bis 700 EUR) wie im
 * Faktenkasten des Ratgebers zum fehlenden Zahn. Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen: das BSG-Urteil vom 28.05.2026 steht nicht im Text (nur
 * über die KZBV-Angabe bekannt, im Original nicht geprüft). Was gilt, wenn die
 * frühere Praxis keine Unterlagen mehr hat, steht nicht in den Quellen, der
 * Text verweist dafür nur auf die Krankenkasse. Keine Euro-Beträge für 2027.
 * Die Kassen-Ratgeber IKK classic, AOK, TK, BARMER und mkk sind verlinkt; sie
 * zählen im Vertragstest nicht als Zahn-Nachbarn.
 *
 * Faktenprüfung 06.10.2026: Healio/Ratgeber/zahn-ratgeber-belege/PRUEFBERICHT-WELLE1.md
 */
export const article = {
  slug: 'bonusheft-zahnarzt',
  kind: 'ratgeber',

  metaTitle: 'Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse | Healio',
  metaDescription:
    'Bonusheft beim Zahnarzt: 70 oder 75 statt 60 Prozent Festzuschuss, ab 2027 60 oder 65 statt 50. Regeln, verlorenes Heft und der Unterschied zum Kassenbonus.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse',
  listTeaser:
    'Fünf oder zehn Jahre lückenlos: was das Bonusheft beim Zahnersatz bringt, heute und ab 2027.',

  headline: 'Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'document',
    facts: [
      { value: '70 oder 75 Prozent', label: 'Festzuschuss mit 5 oder 10 Jahren Bonusheft statt 60' },
      { value: '60 oder 65 Prozent', label: 'statt 50, wenn die Kasse ab 01.01.2027 bewilligt' },
      { value: '59,76 EUR', label: 'mehr für eine Metallkrone mit 10 Jahren Bonusheft (2026)' },
    ],
    text: 'Das Bonusheft belegt deine Kontrollen beim Zahnarzt. Je länger es lückenlos ist, desto höher ist der Festzuschuss beim Zahnersatz.',
    path: { to: '/zahn#zahn-check', text: 'Was bleibt nach dem Festzuschuss?', label: 'Zahn-Check starten' },
  },

  lead:
    'Das Bonusheft beim Zahnarzt erhöht deinen Festzuschuss beim Zahnersatz. Mit fünf Jahren lückenlosen Kontrollen zahlt die Kasse 70 statt 60 Prozent der Regelversorgung, mit zehn Jahren 75 Prozent. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 60 und 65 statt 50 Prozent. Unten stehen die Regeln, was bei einem verlorenen Heft hilft und worin sich das Heft vom Bonusprogramm deiner Kasse unterscheidet.',

  sections: [
    {
      id: 'wirkung',
      heading: 'Was bringt das Bonusheft beim Zahnarzt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Bonusheft belegt, dass du regelmäßig zur Kontrolluntersuchung warst. Die Kasse zieht es heran, wenn sie den Festzuschuss für Zahnersatz festlegt, etwa für Kronen oder Brücken. Je länger du lückenlos zur Untersuchung gegangen bist, desto höher ist der Prozentsatz der Regelversorgung, den die Kasse zahlt.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss in Prozent der Regelversorgung, § 55 SGB V bis 31.12.2026 und in der Fassung des Beitragssatzstabilisierungsgesetzes ab 01.01.2027',
          head: ['Stufe', 'Voraussetzung', 'Bis 31.12.2026', 'Ab 01.01.2027'],
          rows: [
            ['Ohne Bonusheft', 'Keine lückenlosen Kontrollen nachweisbar', '60 Prozent', '50 Prozent'],
            ['Bonus 1', 'Eigene Bemühungen um gesunde Zähne, belegt über die letzten 5 Jahre', '70 Prozent', '60 Prozent'],
            ['Bonus 2', 'Kontrollen in den letzten 10 Kalenderjahren ohne Unterbrechung', '75 Prozent', '65 Prozent'],
            ['Härtefall', 'Unzumutbare Belastung, zum Beispiel bei geringem Einkommen', '100 Prozent (40 Prozent Zusatzbetrag)', '100 Prozent (50 Prozent Zusatzbetrag)'],
          ],
          note: 'Quelle: § 55 SGB V in der Fassung bis 31.12.2026 und nach dem GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228). Für alle vor dem 01.01.2027 bewilligten Festzuschüsse gelten die bisherigen Sätze.',
        },
        {
          type: 'paragraph',
          text: 'Nach dem Gesetz entfällt die Erhöhung auf 70 Prozent nur, wenn dein Gebisszustand regelmäßige Zahnpflege nicht erkennen lässt und du in den letzten fünf Jahren vor Behandlungsbeginn die Untersuchungen nicht regelmäßig wahrgenommen hast. Für die 75 Prozent musst du in den letzten zehn Kalenderjahren vor Behandlungsbeginn die Untersuchungen ohne Unterbrechung in Anspruch genommen haben.',
        },
      ],
    },
    {
      id: 'regeln',
      heading: 'Welche Regeln gelten für das Bonusheft?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Erwachsene gehen einmal je Kalenderjahr.',
              text: 'Nach dem 18. Geburtstag zählt eine zahnärztliche Untersuchung wenigstens einmal in jedem Kalenderjahr.',
            },
            {
              lead: 'Kinder und Jugendliche gehen einmal je Kalenderhalbjahr.',
              text: 'Ab dem sechsten bis zum 18. Geburtstag gilt die Untersuchung einmal in jedem Kalenderhalbjahr (§ 22 SGB V).',
            },
            {
              lead: 'Das Jahr 2020 zählt nicht gegen dich.',
              text: 'Die Erhöhung entfällt nicht, weil du Untersuchungen im Kalenderjahr 2020 nicht in Anspruch genommen hast.',
            },
            {
              lead: 'Eine einmalige Unterbrechung kann unschädlich sein.',
              text: 'In begründeten Ausnahmefällen kann deine Kasse den Festzuschuss auf 75 Prozent erhöhen, wenn du deine Zähne regelmäßig gepflegt und in den letzten zehn Jahren die Untersuchungen nur mit einer einmaligen Unterbrechung wahrgenommen hast. Das ist eine Kann-Regel, die Entscheidung trifft deine Kasse, und du musst die Lücke begründen. Ab 2027 heißt es dort entsprechend 65 Prozent.',
            },
          ],
        },
      ],
    },
    {
      id: 'verloren',
      heading: 'Was tun, wenn das Bonusheft verloren ist?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV nennt einen einfachen Weg: Dein Zahnarzt kann ein neues Heft ausfüllen, denn anhand der Patientenkartei lässt sich nachvollziehen, wann du zur Untersuchung oder Prophylaxe warst. Fehlende Stempel kann die Praxis nachtragen, wenn die Untersuchung im fraglichen Zeitraum stattfand und in der Patientenkartei dokumentiert ist.',
        },
        {
          type: 'paragraph',
          text: 'Hast du die Praxis gewechselt, legst du bei einer vorgesehenen prothetischen Behandlung der Kasse das alte Heft zusammen mit dem zweiten Heft vor. Gibt es eine frühere Praxis nicht mehr oder liegen dort keine Unterlagen vor, klärst du am besten mit deiner Krankenkasse, welche Nachweise sie anerkennt.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel Unterschied macht das Bonusheft in Euro?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nimm eine Krone auf einem hinteren Backenzahn, Regelversorgung aus Metall nach Befund 1.1 (398,39 EUR). Zwischen einem Heft ohne und einem Heft mit zehn Jahren liegen 59,76 EUR. Bei einer Brücke für eine Lücke mit einem fehlenden Zahn nach Befund 2.1 sind es 138,24 EUR (691,20 statt 552,96 EUR). Beides ist eine eigene Rechnung aus den Werten der Festzuschuss-Richtlinie des G-BA für 2026.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: dieselbe Krone mit und ohne Bonusheft',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Regelversorgung 2026 (398,39 EUR) und einer UKV ZahnPRIVAT 100 im ersten Kalenderjahr: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR.',
          caption: 'Eigenanteil bei einer Metallkrone nach Befund 1.1, Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Ohne Bonusheft (60 Prozent)', '239,03 EUR', '159,36 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['Bonusheft 5 Jahre (70 Prozent)', '278,87 EUR', '119,52 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['Bonusheft 10 Jahre (75 Prozent)', '298,79 EUR', '99,60 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
          ],
          note: 'Beispielrechnung. Quelle: Festzuschuss-Richtlinie des G-BA, Beträge ab 01.01.2026 (Regelversorgung ohne Begleitleistungen). Annahmen: Die Rechnung entspricht genau der Regelversorgung, die Behandlung war bei Vertragsbeginn weder angeraten noch geplant, es fehlte kein Zahn, kein Härtefall. Verbindlich sind der Bescheid deiner Kasse und die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'calculator',
          id: 'zahnkosten-rechner',
          preset: 'krone-metall',
          heading: 'Rechne dein Beispiel durch',
          intro: 'Stell dein Bonusheft und den Zeitpunkt der Bewilligung ein und sieh, wie sich der Festzuschuss ändert. Mit einem Heil- und Kostenplan trägst du deinen Betrag selbst ein.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie sich das bei einer einzelnen Krone auswirkt, zeigt der Ratgeber ' },
            { text: 'Zahnkrone Kosten', to: '/ratgeber/zahnkrone-kosten' },
            { text: ', bei einem Implantat der Ratgeber ' },
            { text: 'Zahnimplantat Kosten', to: '/ratgeber/zahnimplantat-kosten' },
            { text: '. Alle Zahnkosten auf einen Blick findest du auf der Seite ' },
            { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'bonusprogramm',
      heading: 'Was ist der Unterschied zwischen Bonusheft und Bonusprogramm der Kasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Bonusheft ist gesetzlich geregelt (§ 55 SGB V) und wirkt nur auf den Festzuschuss beim Zahnersatz. Das Bonusprogramm deiner Krankenkasse ist etwas anderes. Viele Kassen belohnen darin nach ihrer Satzung Vorsorge, Impfungen und Sport. Der Bonus kann als Zuschuss zum Beitrag einer Zusatzversicherung fließen, erstattet wird höchstens, was du an Kosten nachweist.',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel ist die IKK classic. Dort sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der breiten Masse sind es 400 bis 700 EUR, jeweils als Zuschuss zum Beitrag deiner Zusatzversicherung. Gegenzurechnen ist der Zusatzbeitrag der IKK classic von 3,85 Prozent. Du kannst jede Kasse frei wählen, entscheidend ist, was unterm Strich für dich bleibt.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die Programme einzelner Kassen erklären eigene Ratgeber: ' },
            { text: 'IKK classic', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', ' },
            { text: 'AOK', to: '/ratgeber/aok-bonusprogramm-2026' },
            { text: ', ' },
            { text: 'TK', to: '/ratgeber/tk-bonusprogramm-2026' },
            { text: ', ' },
            { text: 'BARMER', to: '/ratgeber/barmer-bonusprogramm-2026' },
            { text: ' und ' },
            { text: 'mkk', to: '/ratgeber/mkk-bonusprogramm-2026' },
            { text: '. Auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ' vergleichst du Bonusprogramme quellenbelegt anhand der Satzungen.' },
          ],
        },
      ],
    },
    {
      id: 'grenzen',
      heading: 'Wo hat das Bonusheft Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Das Bonusheft wirkt nur beim Zahnersatz.',
              text: 'Für Zahnreinigung, Füllungen oder eine Wurzelbehandlung bringt es keinen höheren Zuschuss. Bei Kronen, Brücken und der Versorgung auf einem Implantat erhöht es den Festzuschuss.',
            },
            {
              lead: 'Ab 2027 sinken die Sätze.',
              text: 'Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50, 60 und 65 Prozent. Maßgeblich ist das Datum der Bewilligung durch die Kasse. Die Euro-Beträge für 2027 setzt der G-BA neu fest.',
            },
            {
              lead: 'Ein Zahntarif ersetzt das Bonusheft nicht.',
              text: 'Der Tarif erstattet erst nach Abzug der Kassenleistung. Und bei der UKV gilt: Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert.',
            },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Vier kurze Fragen, keine Kontaktdaten: Der Zahn-Check zeigt, welcher Weg bei deiner Zahnsituation offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie viel mehr zahlt die Kasse mit Bonusheft?',
      answer:
        'Bis 31.12.2026 bewilligte Festzuschüsse betragen 60 Prozent der Regelversorgung, mit lückenlosem Bonusheft über 5 Jahre 70 und über 10 Jahre 75 Prozent. Bei einer Metallkrone nach Befund 1.1 sind das 2026 239,03, 278,87 und 298,79 EUR.',
    },
    {
      question: 'Wie oft muss ich zum Zahnarzt, damit das Bonusheft zählt?',
      answer:
        'Erwachsene lassen sich wenigstens einmal in jedem Kalenderjahr zahnärztlich untersuchen. Für Kinder und Jugendliche ab dem sechsten bis zum 18. Geburtstag gilt die Untersuchung einmal in jedem Kalenderhalbjahr (§ 22 SGB V).',
    },
    {
      question: 'Was passiert, wenn ich ein Jahr vergessen habe?',
      answer:
        'Das Jahr 2020 zählt nicht gegen dich. Bei einer sonstigen einmaligen Unterbrechung innerhalb von zehn Jahren kann deine Kasse in einem begründeten Ausnahmefall trotzdem 75 Prozent zahlen. Das ist eine Kann-Regel, und du musst die Lücke begründen.',
    },
    {
      question: 'Mein Bonusheft ist verloren. Was nun?',
      answer:
        'Nach der KZBV kann dein Zahnarzt ein neues Heft ausfüllen und fehlende Stempel nachtragen, wenn die Untersuchung in der Patientenkartei dokumentiert ist. Nach einem Praxiswechsel legst du das alte Heft zusammen mit dem zweiten Heft vor.',
    },
    {
      question: 'Was ändert sich beim Bonusheft 2027?',
      answer:
        'Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50 Prozent, mit Bonusheft 60 oder 65 Prozent. Für vor dem 01.01.2027 bewilligte Festzuschüsse gelten die bisherigen 60, 70 und 75 Prozent. Der Härtefall bleibt bei 100 Prozent der Regelversorgung.',
    },
    {
      question: 'Ist das Bonusheft dasselbe wie das Bonusprogramm meiner Kasse?',
      answer:
        'Nein. Das Bonusheft ist gesetzlich geregelt und erhöht nur den Festzuschuss beim Zahnersatz. Das Bonusprogramm ist eine Leistung deiner Kasse nach ihrer Satzung, die Vorsorge und gesunde Lebensweise belohnt. Beides lässt sich nutzen, es sind zwei getrennte Wege.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Hol dein Bonusheft heraus und zähle, wie viele Jahre lückenlos eingetragen sind. Danach hilft der Rechner oben bei deinem Beispiel. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Alle Zahnkosten auf einen Blick findest du im Ratgeber ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Stufen und Regeln stammen aus dem Gesetz, die Beträge aus der Festzuschuss-Richtlinie, der Umgang mit dem verlorenen Heft aus der Patienteninformation der KZBV.',
    items: [
      {
        label: 'SGB V § 55 Leistungsanspruch auf Festzuschüsse beim Zahnersatz',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: 'Fassung bis 31.12.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz (Verkündung)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 22 Verhütung von Zahnerkrankungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__22.html',
        stand: 'Abruf 06.10.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Bonusheft (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/patient-und-krankenkasse/bonusheft/',
        stand: 'Seite geändert 02.06.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Bonusprogramm der IKK classic',
        publisher: 'IKK classic',
        href: 'https://www.ikk-classic.de/pk/rv/produkte/bonusprogramm',
        stand: 'Satzung 2026',
        accessedAt: '06.10.2026',
        note: 'Zuschusswert laut Satzung und Zusatzbeitrag wie im Ratgeber zum IKK-Bonusprogramm 2026 ausgewertet.',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/zahn.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Annahmeregeln nach dem Stand der genannten Unterlagen, maßgeblich sind immer der Bescheid deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
