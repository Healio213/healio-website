/**
 * Ambulant-Ratgeber Welle A: Zuzahlung bei Physiotherapie, gesetzliche
 * Zuzahlung, Belastungsgrenze und Erstattung durch den ambulanten Tarif.
 *
 * Quellen (Abruf 07.10.2026, Belege in physiotherapie-zuzahlung.belege.md):
 * SGB V § 61 Satz 3 und 4, § 32 Abs. 2, § 62 (gesetze-im-internet.de),
 * Verbraucherzentrale (Zuzahlungen zu Medikamenten oder Hilfsmitteln, Stand
 * 26.11.2024), SDK AVB Teil II AP-Tarife 1.753a, Abschnitt I.6, und Teil I 1.751.
 *
 * Bewusste Grenzen:
 *   - Die Zuzahlung ist gesetzlich geregelt und gilt unabhängig vom Jahr: 10
 *     Prozent der Kosten plus 10 EUR je Verordnung. Es gibt keine Jahrestabelle
 *     mit anderen Werten, die Tabelle rechnet mit angenommenen Kosten.
 *   - Keine Euro-Preise je Behandlung: Sie werden nicht im Gesetz festgelegt,
 *     sondern in Verträgen nach § 125 SGB V vereinbart. Alle Gesamtkosten in den
 *     Beispielen sind angenommen.
 *   - Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): §§ 32, 61, 62, 125 SGB V
 *     und Verbraucherzentrale im Original gelesen.
 *   - Die Belastungsgrenze wird nur als Prinzip mit vereinfachtem Beispiel
 *     gerechnet (Freibeträge nach § 62 Abs. 2 bleiben außen vor, das steht im
 *     Text). Das Vollthema liegt auf der Seite Zuzahlungsbefreiung.
 *   - Der ambulante Tarif erstattet laut Bedingungen die im Leistungskatalog der
 *     GKV vorgesehenen Zuzahlungen gegen ärztliche Verordnung und Beleg. Die
 *     Seite behauptet nicht, dass er Behandlungen ohne Verordnung zahlt.
 *   - Einbau 07.10.2026: Die Seite Zuzahlungsbefreiung gibt es noch nicht. Ihre
 *     Weg-Karte, die Karte und der Link im Weiter-Absatz sind bis dahin Text
 *     oder entfallen (serie/NACHZUTRAGEN.md). Dafür steht nach dem Kasten
 *     "Ehrlich gesagt" eine Weg-Karte auf /ambulant (Vertragstest: Weg-Karten
 *     nur auf den Angebotsweg). Später den Ratgeber als Karte oder Textlink
 *     setzen, nicht als Weg-Karte.
 */

export const article = {
  updatedAtLabel: "8. Oktober 2026",
  updatedAt: "2026-10-08",
  slug: 'physiotherapie-zuzahlung',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Zuzahlung Physiotherapie 2026: Tabelle, Rechenbeispiel | Healio',
  metaDescription:
    'Zuzahlung bei Physiotherapie: 10 Prozent der Kosten plus 10 EUR je Verordnung, Tabelle mit Rechenbeispielen, Belastungsgrenze und was ein ambulanter Tarif erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 8,

  listTitle: 'Zuzahlung bei Physiotherapie: Tabelle, Rechenbeispiel und Erstattung',
  listTeaser:
    '10 Prozent der Kosten plus 10 EUR je Verordnung: Hier rechnest du die Zuzahlung nach, siehst die Belastungsgrenze und erfährst, was ein ambulanter Tarif erstattet.',

  headline: 'Zuzahlung Physiotherapie 2026: Tabelle, Rechenbeispiel und Erstattung',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'medication',
    facts: [
      { value: '10 % plus 10 EUR', label: 'der Kosten plus 10 EUR je Verordnung (§ 61 SGB V)' },
      { value: 'ab 18 Jahren', label: 'unter 18 Jahren fällt bei Heilmitteln keine Zuzahlung an' },
      { value: '2 Prozent', label: 'der Bruttoeinnahmen ist die Grenze, chronisch Kranke meist 1 Prozent' },
    ],
    text: 'Die Zuzahlung zur Physiotherapie ist gesetzlich geregelt, die Kasse trägt den Rest der Behandlung. Ein ambulanter Tarif kann die gesetzliche Zuzahlung gegen Verordnung und Beleg erstatten.',
    path: { to: '/ambulant', text: 'Zuzahlungen selbst getragen?', label: 'Ambulante Tarife ansehen' },
  },

  lead:
    'Bei Physiotherapie zahlst du als Erwachsener 10 Prozent der Kosten und zusätzlich 10 EUR je Verordnung. Das steht in § 61 SGB V und gilt für alle gesetzlich Versicherten. Hier rechnest du die Zuzahlung an Beispielen nach, siehst, wann du nichts mehr zuzahlen musst, und erfährst, wie ein ambulanter Tarif die Zuzahlung erstattet.',

  sections: [
    {
      id: 'hoehe',
      heading: 'Wie hoch ist die Zuzahlung bei Physiotherapie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei Heilmitteln, zu denen Physiotherapie gehört, beträgt die Zuzahlung nach § 61 Satz 3 SGB V 10 Prozent der Kosten sowie 10 EUR je Verordnung. Die 10 EUR fallen einmal je Verordnung an, die 10 Prozent beziehen sich auf die gesamten Kosten der verordneten Behandlungen. Die Kasse trägt den Rest.',
        },
        {
          type: 'paragraph',
          text: 'Was eine einzelne Behandlung kostet, legt das Gesetz nicht fest. Die Preise vereinbart der GKV-Spitzenverband in Verträgen mit den Verbänden der Heilmittelerbringer (§ 125 SGB V). Deshalb gibt es hier keine Preisliste je Behandlung, sondern eine Tabelle mit angenommenen Gesamtkosten einer Verordnung.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuzahlung bei Heilmitteln nach § 61 Satz 3 SGB V für angenommene Gesamtkosten einer Verordnung',
          head: ['Angenommene Kosten der Verordnung', '10 Prozent der Kosten', 'Dazu je Verordnung', 'Deine Zuzahlung'],
          rows: [
            ['120 EUR', '12 EUR', '10 EUR', '22 EUR'],
            ['180 EUR', '18 EUR', '10 EUR', '28 EUR'],
            ['240 EUR', '24 EUR', '10 EUR', '34 EUR'],
            ['300 EUR', '30 EUR', '10 EUR', '40 EUR'],
          ],
          note: 'Eigene Rechnung mit angenommenen Kosten, keine Preisangabe. Die Regel steht in § 61 Satz 3 SGB V, gesetze-im-internet.de, Abruf 07.10.2026, ebenso bei der Verbraucherzentrale (Stand 26.11.2024). Die Zuzahlung gilt für Versicherte ab 18 Jahren (§ 32 Abs. 2 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel: Eine Verordnung über sechs Behandlungen kostet angenommen 180 EUR. Du zahlst 18 EUR (10 Prozent) plus 10 EUR, also 28 EUR. Die übrigen 152 EUR trägt die Kasse. Beim nächsten Rezept fallen die 10 EUR je Verordnung erneut an.',
        },
      ],
    },
    {
      id: 'wer-zahlt',
      heading: 'Wer muss die Zuzahlung bei Physiotherapie leisten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Versicherte, die das 18. Lebensjahr vollendet haben. Das regelt § 32 Abs. 2 SGB V. Für Kinder und Jugendliche fällt bei Heilmitteln keine Zuzahlung an. Die Zuzahlung zahlst du direkt bei der Praxis, die dich behandelt, und sie muss dir quittiert werden. Die Verbraucherzentrale rät, alle Zuzahlungsbelege sorgfältig aufzubewahren.',
        },
        {
          type: 'paragraph',
          text: 'Die Belege brauchst du aus zwei Gründen. Mit ihnen belegst du, wie viel du im Jahr schon zugezahlt hast, und eine Zusatzversicherung verlangt sie für die Erstattung.',
        },
      ],
    },
    {
      id: 'belastungsgrenze',
      heading: 'Wann musst du keine Zuzahlung mehr leisten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wenn du die Belastungsgrenze erreichst. Nach § 62 SGB V musst du in einem Kalenderjahr nur Zuzahlungen bis zu dieser Grenze leisten. Die Grenze beträgt 2 Prozent der jährlichen Bruttoeinnahmen zum Lebensunterhalt, für chronisch Kranke in Dauerbehandlung wegen derselben schwerwiegenden Krankheit in der Regel 1 Prozent. Hast du die Grenze erreicht, stellt dir die Kasse eine Bescheinigung aus, dass du für den Rest des Jahres nichts mehr zuzahlen musst.',
        },
        {
  "type": "segments",
  "segments": [
    {
      "text": "Zuzahlungen und Einnahmen von Ehegatten, Lebenspartnern und Kindern im gemeinsamen Haushalt werden zusammengerechnet. Dabei mindern Freibeträge die Einnahmen. Das Beispiel hier lässt sie weg, damit du das Prinzip siehst. Die Einzelheiten stehen im Ratgeber zur "
    },
    {
      "text": "Zuzahlungsbefreiung",
      "to": "/ratgeber/zuzahlungsbefreiung"
    },
    {
      "text": "."
    }
  ]
},
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Vereinfachtes Beispiel zur Belastungsgrenze, ohne Freibeträge',
          head: ['Angenommene Bruttoeinnahmen im Jahr', 'Belastungsgrenze 2 Prozent', 'Belastungsgrenze 1 Prozent (chronisch krank)'],
          rows: [
            ['24.000 EUR', '480 EUR', '240 EUR'],
            ['30.000 EUR', '600 EUR', '300 EUR'],
          ],
          note: 'Eigene Rechnung mit angenommenen Einnahmen, vereinfacht ohne Freibeträge nach § 62 Abs. 2 SGB V. Prozentsätze nach § 62 Abs. 1 SGB V, gesetze-im-internet.de, Abruf 07.10.2026. Wie hoch deine Grenze ist, sagt dir deine Kasse.',
        },
      ],
    },
    {
      id: 'erstattung',
      heading: 'Erstattet eine Zusatzversicherung die Zuzahlung bei Physiotherapie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ein ambulanter Tarif kann das. Die ambulanten SDK-Tarife, die Healio auf der Seite Ambulant vermittelt, versichern die im Leistungskatalog der GKV vorgesehenen Zuzahlungen für Arznei-, Verband-, Heil- und Hilfsmittel. Zur Erstattung legst du eine ärztliche Verordnung und einen Beleg für die Zuzahlung vor. Auf der Seite Ambulant steht der Topf unter Zuzahlungen und gesetzliche Eigenanteile.',
        },
        {
          type: 'paragraph',
          text: 'Wie viel der Tarif erstattet, hängt von der Stufe ab: 50, 70, 90 oder 100 Prozent der erstattungsfähigen Kosten, bis 500, 700, 900 oder 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Eine Behandlung ohne Rezept, die du ganz selbst zahlst, ist keine im Leistungskatalog der GKV vorgesehene Zuzahlung und fällt deshalb nicht in diesen Topf.',
        },
        {
          type: 'costCard',
          title: 'Zuzahlung Physiotherapie: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Zuzahlung, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: Zuzahlung bei Physiotherapie mit und ohne Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Eine Verordnung, 6 Behandlungen, angenommene Kosten 180 EUR', '152 EUR', '28 EUR Zuzahlung', 'Der Tarif erstattet 28 EUR gegen ärztliche Verordnung und Beleg über die Zuzahlung'],
            ['Zwei Verordnungen im Jahr, je 180 EUR angenommen', '304 EUR', '56 EUR Zuzahlung', 'Der Tarif erstattet bis zu 56 EUR, solange der Topf reicht'],
            ['Belastungsgrenze im Jahr erreicht und Bescheinigung der Kasse', 'die Behandlung ohne Zuzahlung', 'nichts mehr zuzahlen', 'Nichts zu erstatten, der Tarif muss nicht einspringen'],
            ['Beitrag Ambulant 100 über zwei Jahre, 21 bis 30 Jahre (31,64 EUR im Monat)', 'nicht betroffen', 'nichts', '759,36 EUR Beitrag, den ein Kassenbonus teilweise mittragen kann'],
          ],
          note: 'Rechenbeispiel mit angenommenen Kosten, keine Preisangabe. Eigene Rechnung: 10 Prozent von 180 EUR sind 18 EUR, dazu 10 EUR ergibt 28 EUR, Kasse 180 EUR minus 28 EUR ergibt 152 EUR; 31,64 EUR mal 12 mal 2 ergibt 759,36 EUR. Zuzahlung nach § 61 Satz 3 SGB V, Tarifwerte und Nachweise nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Abschnitt I.6. Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant (Stand 29.09.2026).',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Das Beispiel zeigt die Größenordnung: Eine einzelne Verordnung bringt 28 EUR Zuzahlung. Dieser Topf allein trägt einen Beitrag von 759,36 EUR in zwei Jahren nicht. Er ist einer der vier Töpfe, die in der höchsten Stufe zusammen bis zu 3.000 EUR in zwei Jahren ergeben, und für sich genommen lohnt er sich nur bei vielen Verordnungen.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Der Tarif erstattet die Zuzahlung, nicht die Behandlung.', text: 'Die Behandlung selbst trägt die Kasse. Der Tarif übernimmt nur den Eigenanteil, den das Gesetz vorsieht, und nur gegen ärztliche Verordnung und Beleg.' },
            { lead: 'Ab der Belastungsgrenze gibt es nichts mehr zu erstatten.', text: 'Dann entfällt die Zuzahlung für den Rest des Jahres. Prüf deshalb, ob sich der Tarif allein dafür lohnt.' },
            { lead: 'Die Preise je Behandlung kennen wir nicht.', text: 'Die Vergütungen sind vereinbart, nicht im Gesetz festgelegt. Alle Kosten in den Beispielen sind angenommen, deine Verordnung zeigt dir die tatsächlichen Beträge.' },
            { lead: 'Was vor dem Versicherungsbeginn eingetreten ist, zählt nicht.', text: 'Für Versicherungsfälle vor dem Beginn leistet der Versicherer nicht. Gesundheitsfragen im Antrag beantwortest du vollständig und wahrheitsgemäß.' },
          ],
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'medication',
          text: 'Du siehst, wie viel die einzelnen Stufen für gesetzliche Zuzahlungen erstatten, und deinen Beitrag.',
          label: 'Tarifstufen ansehen',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie bekommst du die Zuzahlung erstattet?',
      blocks: [
        {
          type: 'steps',
          heading: 'In drei Schritten zur Erstattung',
          items: [
            {
              title: 'Zuzahlung leisten und quittieren lassen',
              text: 'Du zahlst in der Praxis 10 Prozent der Kosten plus 10 EUR je Verordnung und bekommst eine Quittung.',
            },
            {
              title: 'Unterlagen sammeln',
              text: 'Du brauchst die ärztliche Verordnung und den Beleg über die Zuzahlung. Die Rechnung für die Behandlung selbst hat die Kasse bezahlt.',
            },
            {
              title: 'Beim Tarif einreichen',
              text: 'Du reichst beides beim Versicherer ein. Er prüft, ob und in welcher Höhe er leisten muss, und erstattet bis zum Höchstbetrag des Topfs.',
            },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
  {
    "icon": "naturopathy",
    "tone": "mint",
    "title": "Heilpraktiker Kosten: wer zahlt was",
    "text": "Alle Bereiche der Naturheilkunde auf einer Seite.",
    "to": "/ratgeber/heilpraktiker-kosten",
    "linkLabel": "Zur Übersicht"
  },
  {
    "icon": "ambulant",
    "tone": "butter",
    "title": "Ambulante Zusatzversicherung",
    "text": "Die vier Töpfe, Beiträge nach Alter und für wen sie passen.",
    "to": "/ratgeber/ambulante-zusatzversicherung",
    "linkLabel": "Ratgeber lesen"
  },
  {
    "icon": "protection",
    "tone": "sky",
    "title": "Heilpraktiker-Zusatzversicherung",
    "text": "Kriterien statt Rangliste, Gesundheitsfragen und Grenzen.",
    "to": "/ratgeber/heilpraktiker-zusatzversicherung",
    "linkLabel": "Ratgeber lesen"
  },
  {
    "icon": "document",
    "tone": "mint",
    "title": "Zuzahlungsbefreiung",
    "text": "Belastungsgrenze, Belege und Antrag bei der Kasse.",
    "to": "/ratgeber/zuzahlungsbefreiung",
    "linkLabel": "Ratgeber lesen"
  }
],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Heilpraktiker und Osteopathie, Brille, Vorsorge und gesetzliche Zuzahlungen vermittelt Healio die ambulanten Tarife der SDK, in der höchsten Stufe mit bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie hoch ist die Zuzahlung bei Physiotherapie?',
      answer:
        'Bei Heilmitteln beträgt sie 10 Prozent der Kosten plus 10 EUR je Verordnung (§ 61 Satz 3 SGB V). Bei angenommenen Kosten von 180 EUR sind das 28 EUR. Die Kasse trägt den Rest.',
    },
    {
      question: 'Gilt die Zuzahlung je Behandlung oder je Verordnung?',
      answer:
        'Die 10 EUR gelten je Verordnung, nicht je Behandlung. Die 10 Prozent berechnen sich aus den Kosten der verordneten Behandlungen.',
    },
    {
      question: 'Müssen Kinder bei Physiotherapie zuzahlen?',
      answer:
        'Nein. Nach § 32 Abs. 2 SGB V leisten die Zuzahlung zu Heilmitteln Versicherte, die das 18. Lebensjahr vollendet haben.',
    },
    {
      question: 'Wann entfällt die Zuzahlung?',
      answer:
        'Wenn du die Belastungsgrenze erreichst: 2 Prozent der jährlichen Bruttoeinnahmen zum Lebensunterhalt, für chronisch Kranke in Dauerbehandlung in der Regel 1 Prozent. Die Kasse stellt dann eine Bescheinigung aus, dass du im Rest des Kalenderjahres nichts mehr zuzahlst.',
    },
    {
      question: 'Erstattet eine Zusatzversicherung die Zuzahlung bei Physiotherapie?',
      answer:
        'Die ambulanten SDK-Tarife versichern die im Leistungskatalog der GKV vorgesehenen Zuzahlungen für Arznei-, Verband-, Heil- und Hilfsmittel. Du brauchst eine ärztliche Verordnung und einen Beleg über die Zuzahlung. Die Höhe hängt von der Stufe ab, 50 bis 100 Prozent bis 500 bis 1.000 EUR in zwei Kalenderjahren.',
    },
    {
      question: 'Was brauche ich für die Erstattung der Zuzahlung?',
      answer:
        'Die ärztliche Verordnung und den quittierten Beleg über deine Zuzahlung. Die Rechnung für die Behandlung selbst brauchst du nicht, sie hat die Kasse bezahlt.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
  {
    "text": "Heb alle Verordnungen und Zuzahlungsbelege auf und rechne nach, wie viel du im Jahr zuzahlst. Was ein Tarif dafür erstattet, siehst du auf "
  },
  {
    "text": "healio.de/ambulant",
    "to": "/ambulant"
  },
  {
    "text": ". Wann du ganz befreit bist, steht im Ratgeber "
  },
  {
    "text": "Zuzahlungsbefreiung",
    "to": "/ratgeber/zuzahlungsbefreiung"
  },
  {
    "text": ", und alle vier Töpfe erklärt der Ratgeber "
  },
  {
    "text": "Ambulante Zusatzversicherung",
    "to": "/ratgeber/ambulante-zusatzversicherung"
  },
  {
    "text": ". Welche Kasse zu dir passt, vergleichst du auf "
  },
  {
    "text": "kassenboost.de",
    "href": "https://kassenboost.de/"
  },
  {
    "text": "."
  }
],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Zuzahlungsregeln stammen aus dem Gesetz, der Hinweis zu den Belegen von der Verbraucherzentrale, die Erstattungsregeln aus den SDK-Bedingungen.',
    items: [
      {
        label: 'SGB V § 61 Zuzahlungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__61.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 32 Heilmittel',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__32.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 125 Verträge mit Heilmittelerbringern',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__125.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 62 Belastungsgrenze',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__62.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zuzahlungen zu Medikamenten oder Hilfsmitteln',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zuzahlungen-zu-medikamenten-oder-hilfsmitteln-11107',
        stand: '26.11.2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil II: Tarife AP5, AP7, AP9 und AP1 (1.753a/01.23)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil I: Allgemeiner Teil (1.751)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://gesundwerker.sdk.de/downloads/Bedingungen/1-751.pdf',
        stand: '01.01.2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Beitragstabelle und Tarifstufen der ambulanten SDK-Tarife, wie auf healio.de/ambulant',
        publisher: 'SDK und Healio',
        stand: '29.09.2026',
        note: 'Topf Zuzahlungen und Beiträge wortgleich mit der Seite healio.de/ambulant',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur gesetzlichen Zuzahlung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Bedingungen. Maßgeblich sind immer die Auskunft deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
