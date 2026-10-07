/**
 * Zahn-Ratgeber Welle 1, Z4: "Zahnkrone Kosten".
 *
 * Quellen: Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abschnitt B4
 * (Befunde 1.1, 1.2, 1.3, Festzuschüsse 2026 in Euro, Kronenarten laut KZBV,
 * Verbraucherzentrale rund 366 EUR für 2024, Mehrkosten nach § 55 Abs. 4
 * SGB V), B5 (Prozentsätze bis 2026 und ab 2027, Härtefall), B6 (Heil- und
 * Kostenplan, 6-Monats-Frist). Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen: keine Euro-Zahl für Verblend-, Vollkeramik- und
 * Teilkronen (nicht belegt, die Seite zeigt nur die Festzuschuss-Logik und
 * verweist auf den eigenen Heil- und Kostenplan und den Rechner mit eigenem
 * Betrag). Die Summe 319,69 EUR (Befund 1.1 plus 1.3) ist eine eigene
 * Rechnung und im Text so gekennzeichnet. Keine Euro-Beträge für 2027, keine
 * Behandlungsempfehlung. Für die metallische Teilkrone steht seit der
 * Faktenprüfung der G-BA-Betrag der Regelversorgung 2026 (Befund 1.2,
 * 457,27 EUR, BELEGE B4), nicht ein Privatpreis.
 *
 * Faktenprüfung 06.10.2026: Healio/Ratgeber/zahn-ratgeber-belege/PRUEFBERICHT-WELLE1.md
 */
export const article = {
  slug: 'zahnkrone-kosten',
  kind: 'ratgeber',

  metaTitle: 'Zahnkrone Kosten: Arten, Festzuschuss, Eigenanteil | Healio',
  metaDescription:
    'Metall, verblendet oder Vollkeramik: was eine Zahnkrone kostet, welchen Festzuschuss die Kasse 2026 und ab 2027 zahlt und was am Ende für dich bleibt.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Zahnkrone: Arten, Kosten und Festzuschuss',
  listTeaser:
    'Welche Krone die Kasse als Regelversorgung sieht, was die anderen kosten und wie Bonusheft und Tarif den Eigenanteil senken.',

  headline: 'Zahnkrone: Arten, Kosten und Festzuschuss',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '398,39 EUR', label: 'Regelversorgung Metallkrone 2026 laut G-BA' },
      { value: '239,03 EUR', label: 'Festzuschuss dafür ohne Bonusheft (60 Prozent)' },
      { value: '298,79 EUR', label: 'mit 10 Jahren lückenlosem Bonusheft (75 Prozent)' },
    ],
    text: 'Was über die Regelversorgung hinausgeht, etwa eine Vollkeramikkrone, zahlst du selbst. Den Betrag nennt dein Heil- und Kostenplan.',
    path: { to: '/zahn#zahn-check', text: 'Krone angeraten oder geplant?', label: 'Zahn-Check starten' },
  },

  lead:
    'Eine Zahnkrone gehört zum Zahnersatz, deshalb gibt die Kasse dafür einen Festzuschuss. Er richtet sich nach der Regelversorgung für deinen Befund, bei einem hinteren Backenzahn einer Metallkrone aus Nichtedelmetall, und nicht nach der Krone, die du wählst. Wie viel das 2026 ist, was eine Verblend- oder Vollkeramikkrone für dich ändert und was ein Zahntarif übernimmt, steht unten.',

  sections: [
    {
      id: 'arten',
      heading: 'Welche Arten von Zahnkronen gibt es?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV unterscheidet vor allem drei Kronenarten. Vollgusskronen bestehen aus Nichtedelmetall oder Gold, und Vollgusskronen aus Nichtedelmetall gehören zur regelhaften Versorgung der gesetzlichen Krankenversicherung. Die Verblendkrone ist laut KZBV die am häufigsten verwendete Kronenart, die Vollkeramikkrone die ästhetischste, aber zugleich kostenaufwändigste.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Kronenarten im Überblick, Quellen: KZBV, Verbraucherzentrale, G-BA',
          head: ['Kronenart', 'Material und Einsatz', 'Kosten laut Quelle', 'Festzuschuss'],
          rows: [
            [
              'Metallische Vollkrone',
              'Nichtedelmetall, Regelversorgung, im Seitenzahnbereich üblich',
              '398,39 EUR laut G-BA 2026, rund 366 EUR laut Verbraucherzentrale 2024',
              'Befund 1.1',
            ],
            [
              'Verblendkrone',
              'Krone mit Verblendung an der Außenseite, laut KZBV am häufigsten verwendet',
              'Steht im Heil- und Kostenplan',
              'Befund 1.1 plus 1.3 im Verblendbereich',
            ],
            [
              'Vollkeramikkrone',
              'Keramik, laut KZBV die ästhetischste Kronenart',
              'Laut KZBV die kostenaufwändigste, steht im Heil- und Kostenplan',
              'Festzuschuss der Regelversorgung, Mehrkosten trägst du',
            ],
            [
              'Teilkrone',
              'Metall, bei großen Substanzdefekten mit erhaltener Zahnsubstanz außen oder innen',
              'Metallische Teilkrone als Regelversorgung 457,27 EUR laut G-BA 2026, andere Materialien laut Heil- und Kostenplan',
              'Befund 1.2',
            ],
          ],
          note: 'Die Beträge für Verblend- und Vollkeramikkronen und für Teilkronen aus anderem Material als Metall hängen von Material, Labor und Gebührensatz ab. Verbindlich ist der Heil- und Kostenplan deiner Praxis.',
        },
      ],
    },
    {
      id: 'festzuschuss',
      heading: 'Wie viel Festzuschuss gibt es für eine Zahnkrone?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Festzuschuss richtet sich nach dem Befund, nicht nach der Krone, die du wählst. Bei einem erhaltungswürdigen Zahn mit weitgehend zerstörter Krone oder unzureichendem Halt ist das der Befund 1.1, die Regelversorgung ist die metallische Vollkrone. Liegt der Zahn im Verblendbereich, kommt für die Verblendung der Befund 1.3 dazu. Das Gesetz legt fest, dass die Regelversorgung im Oberkiefer Verblendungen bis einschließlich Zahn fünf und im Unterkiefer bis einschließlich Zahn vier umfasst (§ 56 Abs. 2 SGB V).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss 2026 für Kronen in Euro je Zahn, Festzuschuss-Richtlinie des G-BA, gültig ab 01.01.2026',
          head: ['Befund', 'Ohne Bonusheft (60 Prozent)', 'Bonusheft 5 Jahre (70 Prozent)', 'Bonusheft 10 Jahre (75 Prozent)'],
          rows: [
            ['1.1 Metallische Vollkrone', '239,03 EUR', '278,87 EUR', '298,79 EUR'],
            ['1.2 Teilkrone', '274,36 EUR', '320,09 EUR', '342,95 EUR'],
            ['1.3 Verblendung (Zähne 15 bis 25 und 34 bis 44)', '80,66 EUR', '94,11 EUR', '100,83 EUR'],
          ],
          note: 'Quelle: G-BA, Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026, gegengeprüft mit dem Festzuschuss-Kompendium der KZBV. Ohne Begleitleistungen wie Betäubung oder Röntgen, die gesondert abgerechnet werden.',
        },
        {
          type: 'paragraph',
          text: 'Im Härtefall zahlt die Kasse zusätzlich 40 Prozent der Regelversorgung, höchstens die tatsächlichen Kosten. Bei Befund 1.1 sind das zusammen 398,39 EUR. Ob du darunter fällst, hängt unter anderem von deinem Einkommen oder dem Bezug bestimmter Sozialleistungen ab.',
        },
      ],
    },
    {
      id: 'mehrkosten',
      heading: 'Wer zahlt die Mehrkosten bei Verblend- oder Vollkeramikkrone?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du. Geht der Zahnersatz über die Regelversorgung hinaus, trägst du die Mehrkosten selbst (§ 55 Abs. 4 SGB V). Die Praxis rechnet sie nach der Gebührenordnung für Zahnärzte ab. Der Festzuschuss richtet sich weiter nach der Regelversorgung des Befunds, nicht nach dem Material, das du wählst.',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel für 2026 ohne Bonusheft: Im Verblendbereich ist die Verblendkrone Regelversorgung, der Festzuschuss besteht dort aus Befund 1.1 und Befund 1.3, also 239,03 EUR plus 80,66 EUR gleich 319,69 EUR (eigene Rechnung aus den Werten der Tabelle). Was dein Zahnarzt für die Krone ansetzt, abzüglich dieses Betrags, ist dein Eigenanteil.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Soll statt einer Krone ein Implantat die Lücke schließen, gilt eine andere Logik, die der Ratgeber ' },
            { text: 'Zahnimplantat Kosten', to: '/ratgeber/zahnimplantat-kosten' },
            { text: ' erklärt.' },
          ],
        },
      ],
    },
    {
      id: 'bonusheft',
      heading: 'Was bringt das Bonusheft bei einer Zahnkrone?',
      blocks: [
        {
          type: 'segments',
          segments: [
            { text: 'Mit lückenlosem Bonusheft steigt der Festzuschuss. Bei einer Metallkrone sind das 39,84 EUR mehr nach fünf Jahren (278,87 statt 239,03 EUR) und 59,76 EUR mehr nach zehn Jahren (298,79 EUR), eigene Rechnung aus den Werten der Tabelle. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50, 60 und 65 Prozent. Die Regeln für das Heft stehen im Ratgeber ' },
            { text: 'Bonusheft beim Zahnarzt', to: '/ratgeber/bonusheft-zahnarzt' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei einer Zahnkrone an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Beispiel zeigt eine Metallkrone auf einem hinteren Backenzahn mit und ohne Bonusheft und eine Verblendkrone im Verblendbereich. Bei der Verblendkrone zeigt das Beispiel nur den Festzuschuss, den Gesamtbetrag nennt dein Heil- und Kostenplan.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Zahnkrone mit und ohne Tarif',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100 im ersten Kalenderjahr: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR.',
          caption: 'Eigenanteil bei einer Krone, Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Metallkrone, 398,39 EUR, ohne Bonusheft', '239,03 EUR', '159,36 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['Metallkrone, 398,39 EUR, Bonusheft 10 Jahre', '298,79 EUR', '99,60 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['Verblendkrone im Verblendbereich, Kosten laut deinem Plan, ohne Bonusheft', '319,69 EUR', 'Plankosten minus 319,69 EUR', 'Tarif erstattet den erstattungsfähigen Rest, im ersten Kalenderjahr bis 1.000 EUR'],
          ],
          note: 'Beispielrechnung, Festzuschuss 2026 nach der Festzuschuss-Richtlinie des G-BA (Regelversorgung 398,39 EUR ohne Begleitleistungen, Verblendkrone als Summe der Befunde 1.1 und 1.3, eigene Rechnung). Annahmen: Die Rechnung der Metallkrone entspricht genau der Regelversorgung, die Behandlung war bei Vertragsbeginn weder angeraten noch geplant, es fehlte kein Zahn, kein Härtefall. Verbindlich sind der Bescheid deiner Kasse und die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'calculator',
          id: 'zahnkosten-rechner',
          preset: 'krone-metall',
          heading: 'Rechne dein Beispiel durch',
          intro: 'Hast du schon einen Heil- und Kostenplan, trägst du deinen Betrag selbst ein. Ohne eigenen Betrag rechnet der Rechner mit der Metallkrone der Regelversorgung.',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft eine Krone mit Heil- und Kostenplan ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Vor Beginn schreibt die Praxis einen Heil- und Kostenplan mit Befund, Regelversorgung und geplanter Versorgung samt Kosten (§ 87 SGB V). Für das Erstellen darf sie keine Gebühr berechnen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zum Eigenanteil',
          items: [
            {
              title: 'Heil- und Kostenplan',
              text: 'Die Praxis nennt Befund, Regelversorgung und die Kosten der geplanten Krone.',
            },
            {
              title: 'Kasse genehmigt',
              text: 'Die Kasse bewilligt die Festzuschüsse, gezahlt werden sie, wenn die Krone in der bewilligten Form innerhalb von 6 Monaten eingegliedert wird.',
            },
            {
              title: 'Tarif erstattet',
              text: 'Dein Zahntarif erstattet nach seinen Bedingungen, bei ZahnPRIVAT 100 zum Beispiel 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung.',
            },
          ],
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung bei einer Krone?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die UKV ZahnPRIVAT gibt es in drei Leistungsstufen ohne Wartezeiten. ZahnPRIVAT 100 erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. ZahnPRIVAT 75 erstattet 75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Was zu den erstattungsfähigen Kosten zählt, steht in den Tarifbedingungen.',
        },
        {
          type: 'paragraph',
          text: 'Wurde dir die Krone in den letzten 2 Jahren angeraten oder geplant, zahlt ein normaler Zahntarif sie nicht. Dann gibt es den Baustein ZAHN Sofort der Bayerischen. Bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Er ist nur zusammen mit einem neuen Zahntarif der Bayerischen wählbar und endet nach 24 Monaten, der Zahntarif läuft weiter. Der Abschluss muss vor der Rechnung erfolgen, die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein. Voraussetzung: Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Angeratenes ist bei der UKV nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
            {
              lead: 'Der Tarif erstattet nach seinen Bedingungen.',
              text: 'Was sie nicht als erstattungsfähig nennen, zahlst du selbst.',
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
        {
          type: 'segments',
          segments: [
            { text: 'Was ab Tag eins gilt und was trotz fehlender Wartezeit nicht versichert ist, zeigt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
            { text: '.' },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet eine Zahnkrone?',
      answer:
        'Die Regelversorgung, eine Metallkrone aus Nichtedelmetall, hat 2026 laut G-BA einen Betrag von 398,39 EUR, ohne Begleitleistungen wie Betäubung oder Röntgen. Die Verbraucherzentrale nannte 2024 rund 366 EUR. Für Verblend- und Vollkeramikkronen nennt der Heil- und Kostenplan deiner Praxis den Betrag, er hängt von Material, Labor und Gebührensatz ab.',
    },
    {
      question: 'Wie viel zahlt die Krankenkasse für eine Krone?',
      answer:
        'Bei Bewilligung bis Ende 2026 zahlt die Kasse einen Festzuschuss von 60 Prozent der Regelversorgung, mit lückenlosem Bonusheft 70 oder 75 Prozent. Für eine Metallkrone nach Befund 1.1 sind das 2026 zwischen 239,03 und 298,79 EUR. Im Verblendbereich kommt für die Verblendung der Befund 1.3 dazu.',
    },
    {
      question: 'Warum zahlt die Kasse bei Vollkeramik nicht mehr?',
      answer:
        'Der Festzuschuss richtet sich nach der Regelversorgung des Befunds, nicht nach dem gewählten Material. Geht dein Zahnersatz darüber hinaus, trägst du die Mehrkosten selbst (§ 55 Abs. 4 SGB V). Die Praxis rechnet sie nach der Gebührenordnung für Zahnärzte ab.',
    },
    {
      question: 'Was ist der Unterschied zwischen Krone und Teilkrone?',
      answer:
        'Eine Teilkrone kommt nach der Festzuschuss-Richtlinie bei einem Zahn mit großen Substanzdefekten in Frage, bei dem Zahnsubstanz außen oder innen erhalten ist. Dafür gilt der Befund 1.2. Der Festzuschuss beträgt 2026 ohne Bonusheft 274,36 EUR. Welche Versorgung bei dir passt, entscheidet dein Zahnarzt.',
    },
    {
      question: 'Was ändert sich bei Kronen 2027?',
      answer:
        'Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, sinken die Prozentsätze auf 50, mit Bonusheft auf 60 oder 65 Prozent. Für vor dem 01.01.2027 bewilligte Festzuschüsse gelten die bisherigen 60, 70 oder 75 Prozent. Die Euro-Beträge für 2027 setzt der G-BA neu fest.',
    },
    {
      question: 'Zahlt die Zahnzusatzversicherung eine Krone, die schon angeraten ist?',
      answer:
        'Wurde sie in den letzten 2 Jahren angeraten oder geplant oder läuft sie schon, ist sie bei einem normalen Zahntarif nicht versichert. Dafür gibt es den Baustein ZAHN Sofort der Bayerischen, wenn der Abschluss vor der Rechnung erfolgt. Liegt die Empfehlung länger als 2 Jahre zurück, ist sie bei der UKV wieder versichert.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir vom Zahnarzt einen Heil- und Kostenplan geben und rechne ihn im Rechner oben durch. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Alle Zahnkosten auf einen Blick findest du im Ratgeber ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Festzuschüsse, Befunde und Fristen stammen aus Gesetz und Richtlinien, die Kronenarten und Kosten aus den Patienteninformationen von KZBV und Verbraucherzentrale.',
    items: [
      {
        label: 'Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Festzuschuss-Kompendium Schwere Kost für leichteres Arbeiten',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/wp-content/uploads/KZBV_FZ-Kompendium_2026-01-01.pdf',
        stand: 'aktualisiert zum 01.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Kronen (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/kronen/',
        stand: 'April 2022, Seite geändert 09.02.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Brücke, Krone, Implantat: Welche Unterschiede gibt es beim Zahnersatz?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/bruecke-krone-implantat-welche-unterschiede-gibt-es-beim-zahnersatz-7925',
        stand: '01.07.2024',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 55 und § 56 Festzuschüsse, Regelversorgung und Mehrkosten',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: '§ 55 in der Fassung bis 31.12.2026',
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
        label: 'Bundesmantelvertrag Zahnärzte, Anlage 2 (Heil- und Kostenplan) und SGB V § 87 Abs. 1a',
        publisher: 'KZBV und GKV-Spitzenverband, gesetze-im-internet.de',
        href: 'https://www.kzbv.de/wp-content/uploads/bmv-z-2026-04-01_gesamtausgabe.pdf',
        stand: 'Gesamtausgabe Stand 01.04.2026',
        accessedAt: '06.10.2026',
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
