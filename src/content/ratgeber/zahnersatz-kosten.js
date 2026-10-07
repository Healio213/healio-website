/**
 * Zahn-Ratgeber Welle 1, Z0: Bereichsseite "Zahnersatz Kosten".
 *
 * Zweck: Alle Zahnkosten auf einer Seite, mit Wegweiser zu jedem Zahn-Ratgeber
 * und Weg-Karten zum Zahn-Check auf /zahn.
 *
 * Quellen: Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abschnitte
 * B1 (Zahnsteinentfernung, PZR-Kosten), B2 (Implantat, Verbraucherzentrale),
 * B3 (Wurzelbehandlung, nur "vierstelliger Bereich"), B4 (Festzuschüsse 2026
 * in Euro), B5 (Prozentsätze bis 2026 und ab 2027, Härtefall), B6
 * (Heil- und Kostenplan, Fristen). Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen: keine Euro-Zahl für Verblend- und Vollkeramikkronen
 * (nicht belegt), keine Euro-Beträge des Festzuschusses für 2027 (der G-BA
 * hat sie noch nicht festgesetzt, der Rechner rechnet mit den Beträgen 2026
 * und sagt das), kein BSG-Urteil, keine Behandlungsempfehlung.
 *
 * Faktenprüfung 06.10.2026: Healio/Ratgeber/zahn-ratgeber-belege/PRUEFBERICHT-WELLE1.md
 * Einbau Serie Stapel 1 (07.10.2026): Härtefallgrenze auf den Wert 2026 korrigiert
 * (1.582,00 EUR, Verbraucherzentrale 27.01.2026 und KZBV, vorher 1.498 EUR = 2025),
 * Wegweiser um die Serienseiten der Gruppe Zähne ergänzt (Bereichsseite listet alle).
 */
export const article = {
  slug: 'zahnersatz-kosten',
  kind: 'ratgeber',

  metaTitle: 'Zahnersatz Kosten: was die Kasse zahlt, was du zahlst | Healio',
  metaDescription:
    'Zahnersatz, Krone, Implantat, Zahnreinigung: was die Krankenkasse 2026 zahlt, was ab 2027 gilt, wie das Bonusheft hilft und wo dein Eigenanteil bleibt.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  updatedAt: '2026-10-07',
  updatedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 13,

  listTitle: 'Zahnersatz Kosten: was die Kasse zahlt und was du selbst zahlst',
  listTeaser:
    'Alle Zahnkosten auf einer Seite: Festzuschuss, Bonusheft, typische Eigenanteile und der Weg zu jedem Zahn-Ratgeber.',

  headline: 'Zahnersatz Kosten: was die Kasse zahlt und was du selbst zahlst',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '60 Prozent', label: 'der Regelversorgung zahlt die Kasse als Festzuschuss' },
      { value: '70 oder 75 Prozent', label: 'mit 5 oder 10 Jahren lückenlosem Bonusheft' },
      { value: '50 Prozent', label: 'ohne Bonusheft, wenn die Kasse ab 01.01.2027 bewilligt' },
    ],
    text: 'Die Kasse zahlt beim Zahnersatz einen festen Betrag je Befund, nicht einen Anteil deiner Rechnung. Was darüber liegt, ist dein Eigenanteil.',
    path: { to: '/zahn#zahn-check', text: 'Behandlung geplant oder Zahn verloren?', label: 'Zahn-Check starten' },
  },

  lead:
    'Was Zahnersatz dich kostet, hängt am Festzuschuss deiner Kasse. Bewilligt sie ihn bis Ende 2026, zahlt sie 60 Prozent der Regelversorgung, mit lückenlosem Bonusheft 70 oder 75 Prozent. Alles darüber ist dein Eigenanteil. Unten findest du die Beträge für 2026, die Änderung ab 2027, die Kosten der einzelnen Behandlungen und den passenden Ratgeber zu jedem Thema.',

  sections: [
    {
      id: 'kasse-zahlt',
      heading: 'Wie zahlt die Krankenkasse beim Zahnarzt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Deine Kasse beteiligt sich auf zwei Arten. Bei der Behandlung, die zur vertragszahnärztlichen Versorgung gehört, bekommst du die Kassenleistung als Sachleistung. Dazu zählen zum Beispiel die Zahnsteinentfernung einmal im Kalenderjahr und eine Wurzelbehandlung, wenn die Richtlinie des Gemeinsamen Bundesausschusses (G-BA) sie vorsieht.',
        },
        {
          type: 'paragraph',
          text: 'Beim Zahnersatz läuft es anders. Die Kasse zahlt keinen Anteil an deiner Rechnung, sondern einen befundbezogenen Festzuschuss (§ 55 SGB V). Der G-BA legt fest, welche Befunde es gibt und welche Regelversorgung dazu gehört, bei einem stark zerstörten hinteren Backenzahn zum Beispiel eine metallische Vollkrone. Von den Kosten dieser Regelversorgung zahlt die Kasse ohne Bonusheft 60 Prozent, wenn sie bis Ende 2026 bewilligt.',
        },
        {
          type: 'paragraph',
          text: 'Wählst du eine aufwendigere Versorgung, etwa eine Vollkeramikkrone, bleibt der Festzuschuss gleich. Die Mehrkosten trägst du selbst (§ 55 Abs. 4 SGB V).',
        },
      ],
    },
    {
      id: 'festzuschuss-2026',
      heading: 'Wie viel Festzuschuss zahlt die Kasse beim Zahnersatz 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Beträge unten gelten für Festzuschüsse, die bis zum 31.12.2026 bewilligt werden, und stammen aus der Festzuschuss-Richtlinie des G-BA. Die Stufen hängen von deinem Bonusheft ab: 60 Prozent ohne, 70 Prozent mit fünf und 75 Prozent mit zehn Jahren lückenlosen Kontrollen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss 2026 in Euro je Befund, Festzuschuss-Richtlinie des G-BA, gültig ab 01.01.2026',
          head: ['Befund', 'Ohne Bonusheft (60 Prozent)', 'Bonusheft 5 Jahre (70 Prozent)', 'Bonusheft 10 Jahre (75 Prozent)'],
          rows: [
            ['1.1 Krone, metallische Vollkrone, je Zahn', '239,03 EUR', '278,87 EUR', '298,79 EUR'],
            ['1.2 Teilkrone, je Zahn', '274,36 EUR', '320,09 EUR', '342,95 EUR'],
            ['1.3 Verblendung (Zähne 15 bis 25 und 34 bis 44), je Verblendung', '80,66 EUR', '94,11 EUR', '100,83 EUR'],
            ['2.1 Brücke, Lücke mit einem fehlenden Zahn, je Lücke', '552,96 EUR', '645,12 EUR', '691,20 EUR'],
          ],
          note: 'Quelle: G-BA, Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026, gegengeprüft mit dem Festzuschuss-Kompendium der KZBV. Ohne Begleitleistungen wie Betäubung oder Röntgen, die gesondert abgerechnet werden.',
        },
        {
          type: 'paragraph',
          text: 'Bei unzumutbarer Belastung zahlt die Kasse zusätzlich 40 Prozent der Regelversorgung, höchstens die tatsächlichen Kosten. Zusammen sind das 100 Prozent, bei einer Krone nach Befund 1.1 also 398,39 EUR und bei einer Brücke nach Befund 2.1 921,60 EUR. Ob dieser Härtefall für dich gilt, hängt vom Einkommen ab. 2026 liegt die Grenze für Alleinstehende bei 1.582,00 EUR Bruttoeinnahmen im Monat, mit einem Angehörigen bei 2.175,25 EUR und für jeden weiteren Angehörigen 395,50 EUR höher. Das sind 40 Prozent der Bezugsgröße von 3.955 EUR (§ 55 Abs. 2 SGB V). Außerdem zählt etwa der Bezug von Bürgergeld.',
        },
      ],
    },
    {
      id: 'ab-2027',
      heading: 'Was ändert sich beim Festzuschuss ab 2027?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228) senkt die Prozentsätze für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden. Für alle vor dem 01.01.2027 bewilligten Festzuschüsse gelten die bisherigen Sätze. Maßgeblich ist laut Gesetzestext das Datum der Bewilligung, nicht der Behandlungsbeginn.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss in Prozent der Regelversorgung, § 55 SGB V bis 31.12.2026 und in der Fassung des Beitragssatzstabilisierungsgesetzes ab 01.01.2027',
          head: ['Stufe', 'Bis 31.12.2026', 'Ab 01.01.2027'],
          rows: [
            ['Ohne Bonusheft', '60 Prozent', '50 Prozent'],
            ['Bonusheft 5 Jahre', '70 Prozent', '60 Prozent'],
            ['Bonusheft 10 Jahre', '75 Prozent', '65 Prozent'],
            ['Härtefall', '100 Prozent (40 Prozent Zusatzbetrag)', '100 Prozent (50 Prozent Zusatzbetrag)'],
          ],
          note: 'Die Euro-Beträge macht der G-BA nach § 56 Abs. 4 SGB V jeweils bis zum 30. November eines Jahres bekannt. Der Rechner unten nimmt für 2027 als Annahme die Beträge von 2026 mit den neuen Prozentsätzen.',
        },
      ],
    },
    {
      id: 'uebersicht',
      heading: 'Was kostet welche Zahnbehandlung und was trägt die Kasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Alle Behandlungen dieses Bereichs auf einer Karte. Deine eigene Rechnung hängt von Praxis, Material, Labor und Gebührensatz ab.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zahnkosten auf einen Blick: Kassenleistung und typische Kosten laut Quelle',
          head: ['Behandlung', 'Das trägt die Kasse', 'Typische Kosten laut Quelle', 'Ratgeber'],
          rows: [
            [
              'Zahnreinigung',
              'Zahnsteinentfernung einmal im Kalenderjahr, die professionelle Zahnreinigung ist keine Regelleistung',
              '80 bis 120 EUR je Sitzung bei durchschnittlichem Aufwand laut KZBV, meist 100 bis 200 EUR laut IQWiG',
              'Zahnreinigung Kosten',
            ],
            [
              'Wurzelbehandlung',
              'Kassenleistung, wenn die G-BA-Richtlinie sie vorsieht, Zusatzleistungen wie die elektronische Längenmessung zahlst du meist selbst',
              'Komplett privat je nach Aufwand im vierstelligen Bereich möglich, laut Verbraucherzentrale',
              'Wurzelbehandlung Kosten',
            ],
            [
              'Krone',
              'Festzuschuss 239,03 EUR für die Metallkrone, Befund 1.1, ohne Bonusheft',
              'Regelversorgung 398,39 EUR laut G-BA 2026, aufwendigere Kronen stehen im Heil- und Kostenplan',
              'Zahnkrone Kosten',
            ],
            [
              'Brücke',
              'Festzuschuss 552,96 EUR, Befund 2.1, ohne Bonusheft',
              'Regelversorgung 921,60 EUR laut G-BA 2026',
              'Fehlender Zahn',
            ],
            [
              'Implantat',
              'Festzuschuss des Befunds vor dem Implantat, bei einem fehlenden Zahn 552,96 EUR ohne Bonusheft, für das Implantat selbst nichts',
              '1.500 bis 3.500 EUR für ein Einzelzahn-Implantat inklusive Zahnersatz laut Verbraucherzentrale',
              'Zahnimplantat Kosten',
            ],
          ],
          note: 'Stand der Quellen: KZBV Mai 2025, IQWiG August 2023, Verbraucherzentrale Juli 2024 und Oktober 2025, G-BA Januar 2026.',
        },
      ],
    },
    {
      id: 'situation',
      heading: 'Wo fängst du an, wenn beim Zahnarzt etwas ansteht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Je nach Lage hilft dir ein anderer Ratgeber weiter.',
        },
        {
          type: 'cards',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'calendar',
              tone: 'coral',
              eyebrow: 'Behandlung steht an',
              title: 'Dein Zahnarzt hat etwas angeraten',
              text: 'Was in den letzten 2 Jahren angeraten wurde, zahlt ein normaler Zahntarif nicht.',
              to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit',
              linkLabel: 'Ohne Wartezeit versichern',
            },
            {
              icon: 'dental',
              tone: 'butter',
              eyebrow: 'Zahn fehlt',
              title: 'Eine Lücke ist schon da',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor.',
              to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn',
              linkLabel: 'Fehlender Zahn',
            },
            {
              icon: 'prevention',
              tone: 'mint',
              eyebrow: 'Vorsorge und Reinigung',
              title: 'Zahnreinigung und Kontrolle',
              text: 'Zahnsteinentfernung einmal im Kalenderjahr, die professionelle Zahnreinigung nicht als Regelleistung.',
              to: '/ratgeber/professionelle-zahnreinigung-kosten',
              linkLabel: 'Zahnreinigung Kosten',
            },
            {
              icon: 'document',
              tone: 'sky',
              eyebrow: 'Bonusheft',
              title: 'Dein Heft zählt mit',
              text: 'Bis Ende 2026 gibt es 70 oder 75 statt 60 Prozent Festzuschuss, wenn du fünf oder zehn Jahre lückenlos zur Kontrolle warst.',
              to: '/ratgeber/bonusheft-zahnarzt',
              linkLabel: 'Bonusheft erklärt',
            },
          ],
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft Zahnersatz bei der Kasse ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bevor etwas gemacht wird, schreibt die Praxis einen Heil- und Kostenplan. Darin stehen der Befund, die Regelversorgung und die tatsächlich geplante Versorgung samt Kosten (§ 87 SGB V). Für das Erstellen des Plans darf die Praxis keine Gebühr berechnen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zum Eigenanteil',
          items: [
            {
              title: 'Heil- und Kostenplan',
              text: 'Die Praxis klärt dich über Befund, Alternativen und voraussichtliche Kosten auf und übermittelt den Plan an deine Kasse.',
            },
            {
              title: 'Kasse genehmigt',
              text: 'Die Kasse prüft den Plan und bewilligt die Festzuschüsse. Mit der Behandlung soll erst begonnen werden, wenn die Genehmigung da ist.',
            },
            {
              title: 'Tarif erstattet',
              text: 'Deine Zahnzusatzversicherung erstattet nach ihren Bedingungen, bei ZahnPRIVAT 100 zum Beispiel 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Über den Plan muss die Kasse nach § 13 Abs. 3a SGB V innerhalb von drei Wochen entscheiden, bei einem eingeholten Gutachten innerhalb von fünf Wochen und im zahnärztlichen Gutachterverfahren innerhalb von sechs Wochen. Die Festzuschüsse werden gezahlt, wenn der Zahnersatz in der bewilligten Form innerhalb von 6 Monaten eingegliedert wird.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei einer Krone an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Angenommen, dein Zahnarzt plant eine Krone auf einem hinteren Backenzahn, Regelversorgung aus Metall. Das Beispiel zeigt, wie stark das Bonusheft den Eigenanteil bewegt.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Metallkrone auf einem hinteren Backenzahn, 398,39 EUR',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Regelversorgung 2026 und einer UKV ZahnPRIVAT 100 im ersten Kalenderjahr. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, die Zahnstaffel begrenzt das erste Jahr auf bis zu 1.000 EUR.',
          caption: 'Eigenanteil bei einer Metallkrone nach Befund 1.1, Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Ohne Bonusheft (60 Prozent)', '239,03 EUR', '159,36 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['Bonusheft 5 Jahre (70 Prozent)', '278,87 EUR', '119,52 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['Bonusheft 10 Jahre (75 Prozent)', '298,79 EUR', '99,60 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
          ],
          note: 'Beispielrechnung. Quelle: Festzuschuss-Richtlinie des G-BA, Beträge ab 01.01.2026 (Regelversorgung 398,39 EUR ohne Begleitleistungen). Annahmen: Die Rechnung entspricht genau der Regelversorgung, die Behandlung war bei Vertragsbeginn weder angeraten noch geplant, es fehlte kein Zahn, kein Härtefall. Verbindlich sind der Bescheid deiner Kasse und die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'calculator',
          id: 'zahnkosten-rechner',
          preset: 'krone-metall',
          heading: 'Rechne dein Beispiel durch',
          intro: 'Wähle Behandlung, Bonusheft und Zeitpunkt. Hast du schon einen Heil- und Kostenplan, trägst du deinen Betrag selbst ein.',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was kann eine Zahnzusatzversicherung und was nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Healio zeigt dir zwei Wege, je nach Lage. Wurde in den letzten 2 Jahren nichts empfohlen und läuft nichts, ist die UKV ZahnPRIVAT der Weg, mit drei Leistungsstufen ohne Wartezeiten. ZahnPRIVAT 100 erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Dort sind Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig.',
        },
        {
          type: 'paragraph',
          text: 'Wurde dir in den letzten 2 Jahren eine Behandlung angeraten oder läuft sie schon, gibt es den Baustein ZAHN Sofort der Bayerischen. Bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Er ist nur zusammen mit einem neuen Zahntarif der Bayerischen wählbar und endet nach 24 Monaten, der Zahntarif läuft weiter. Der Abschluss muss vor der Rechnung erfolgen, die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein. Voraussetzung: Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
            {
              lead: 'Fehlende Zähne haben Grenzen.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Mehr dazu, was bei einer Lücke noch geht, steht im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '. Wie viel Bonus deine Kasse als Zuschuss zum Beitrag zahlt, regelt ihre Satzung. Ein Beispiel rechnet der ' },
            { text: 'Ratgeber zum IKK-Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', und ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ' vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.' },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Vier kurze Fragen, keine Kontaktdaten: Der Zahn-Check zeigt, welcher der beiden Wege bei dir offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Zahn-Ratgeber hilft dir weiter?',
      blocks: [
        {
          type: 'cards',
          heading: 'Kosten beim Zahnarzt',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'prevention',
              tone: 'mint',
              title: 'Zahnreinigung Kosten',
              text: 'Was eine professionelle Zahnreinigung kostet und welche Kasse etwas dazugibt.',
              to: '/ratgeber/professionelle-zahnreinigung-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'prevention',
              tone: 'sky',
              title: 'Zahnreinigung bei der DAK',
              text: 'Bis zu 60 EUR im Kalenderjahr laut Satzung, die Frist und der Bonus als Zuschuss.',
              to: '/ratgeber/dak-zahnreinigung',
              linkLabel: 'Lesen',
            },
            {
              icon: 'dental',
              tone: 'lavender',
              title: 'Zahnimplantat Kosten',
              text: 'Warum die Kasse nur einen Festzuschuss zahlt und was für dich übrig bleibt.',
              to: '/ratgeber/zahnimplantat-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'hospital',
              tone: 'sky',
              title: 'Wurzelbehandlung Kosten',
              text: 'Was die Kasse zahlt, was privat berechnet wird und wo die Grenzen liegen.',
              to: '/ratgeber/wurzelbehandlung-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'protection',
              tone: 'butter',
              title: 'Zahnkrone Kosten',
              text: 'Metall, verblendet oder Vollkeramik: Festzuschuss und Eigenanteil.',
              to: '/ratgeber/zahnkrone-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'document',
              tone: 'coral',
              title: 'Bonusheft beim Zahnarzt',
              text: 'Fünf oder zehn Jahre lückenlos: so viel mehr zahlt die Kasse.',
              to: '/ratgeber/bonusheft-zahnarzt',
              linkLabel: 'Lesen',
            },
          ],
        },
        {
          type: 'cards',
          heading: 'Zahnzusatzversicherung, Tarife und Kasse',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'calculator',
              tone: 'butter',
              title: 'Lohnt sich eine Zahnzusatzversicherung?',
              text: 'Krone, Brücke und Implantat durchgerechnet, mit Prüfpunkten und Grenzen.',
              to: '/ratgeber/zahnzusatzversicherung-lohnt-sich',
              linkLabel: 'Lesen',
            },
            {
              icon: 'calendar',
              tone: 'mint',
              title: 'Zahnzusatz ohne Wartezeit',
              text: 'Was ab Tag eins gilt und was trotzdem nicht versichert ist.',
              to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit',
              linkLabel: 'Lesen',
            },
            {
              icon: 'weighing',
              tone: 'lavender',
              title: 'Fehlender Zahn und Zusatzversicherung',
              text: 'Was bei einer Zahnlücke noch geht und was nicht.',
              to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn',
              linkLabel: 'Lesen',
            },
            {
              icon: 'dental',
              tone: 'sky',
              title: 'UKV ZahnPRIVAT im Überblick',
              text: 'Drei Stufen ohne Wartezeit, die Zahnstaffel und was nicht versichert ist.',
              to: '/ratgeber/ukv-zahnzusatzversicherung',
              linkLabel: 'Lesen',
            },
            {
              icon: 'switch',
              tone: 'coral',
              title: 'Bayerische mit ZAHN Sofort',
              text: 'Für schon empfohlene oder begonnene Behandlungen, die weder abgeschlossen noch abgerechnet sind.',
              to: '/ratgeber/bayerische-zahnzusatzversicherung',
              linkLabel: 'Lesen',
            },
            {
              icon: 'region',
              tone: 'butter',
              title: 'AOK und Zähne',
              text: 'Was die elf AOKs beim Zahnersatz und bei der Zahnreinigung zahlen.',
              to: '/ratgeber/aok-zahnzusatzversicherung',
              linkLabel: 'Lesen',
            },
          ],
        },
        {
          type: 'cards',
          heading: 'Zahnersatz, Füllung und Zahnfleisch',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'comparison',
              tone: 'lavender',
              title: 'Zahnersatz Möglichkeiten',
              text: 'Krone, Brücke, Implantat und Prothese im Vergleich, mit Festzuschuss und Eigenanteil.',
              to: '/ratgeber/zahnersatz-moeglichkeiten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'dental',
              tone: 'mint',
              title: 'Zahnbrücke Kosten',
              text: 'Welche Brücke die Kasse bezuschusst und was nach dem Festzuschuss an dir hängen bleibt.',
              to: '/ratgeber/zahnbruecke-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'dental',
              tone: 'sky',
              title: 'Zahnprothese Kosten',
              text: 'Teilprothese, Vollprothese und Teleskopprothese: was die Kasse zahlt und was privat bleibt.',
              to: '/ratgeber/zahnprothese-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'Härtefall beim Zahnersatz',
              text: 'Wann die Kasse mehr übernimmt, wie die Einkommensgrenze aussieht und wie der Antrag läuft.',
              to: '/ratgeber/zahnersatz-haertefall',
              linkLabel: 'Lesen',
            },
            {
              icon: 'dental',
              tone: 'coral',
              title: 'Zahnfüllung Kosten',
              text: 'Was die Kasse seit dem Amalgamverbot zahlt und was ein Inlay darüber hinaus kostet.',
              to: '/ratgeber/zahnfuellung-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'prevention',
              tone: 'mint',
              title: 'Parodontitis-Behandlung Kosten',
              text: 'Wie die Behandlung bei der Kasse abläuft und welche Leistungen privat bleiben.',
              to: '/ratgeber/parodontitis-behandlung-kosten',
              linkLabel: 'Lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie viel zahlt die Krankenkasse bei Zahnersatz?',
      answer:
        'Die Kasse zahlt einen befundbezogenen Festzuschuss. Bei Bewilligung bis Ende 2026 sind das 60 Prozent der Kosten der Regelversorgung, mit lückenlosem Bonusheft 70 oder 75 Prozent. Bei einer Metallkrone nach Befund 1.1 sind das 2026 zwischen 239,03 und 298,79 EUR. Was die gewählte Versorgung darüber hinaus kostet, trägst du selbst.',
    },
    {
      question: 'Was ist die Regelversorgung?',
      answer:
        'Die Regelversorgung legt der G-BA je Befund fest. Bei einem stark zerstörten hinteren Backenzahn ist das eine metallische Vollkrone aus Nichtedelmetall. Auf ihr beruht der Festzuschuss, auch wenn du dich für eine andere Versorgung entscheidest.',
    },
    {
      question: 'Was ändert sich beim Zahnersatz 2027?',
      answer:
        'Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, sinken die Prozentsätze auf 50, mit Bonusheft auf 60 oder 65 Prozent. Für vor dem 01.01.2027 bewilligte Festzuschüsse gelten die bisherigen 60, 70 oder 75 Prozent. Der Härtefall bleibt bei 100 Prozent der Regelversorgung.',
    },
    {
      question: 'Zahlt die Krankenkasse ein Implantat?',
      answer:
        'Nein, in der Regel nicht. Ein Implantat darf laut KZBV grundsätzlich nicht von der Kasse übernommen werden. Nur in seltenen, besonders schweren Fällen gibt es eine Ausnahme. Für den Zahnersatz auf dem Implantat gibt es den Festzuschuss des Befunds, der vor dem Implantat bestand.',
    },
    {
      question: 'Kostet der Heil- und Kostenplan etwas?',
      answer:
        'Nein, für das Erstellen darf die Praxis keine Gebühr berechnen. Der Plan enthält Befund, Regelversorgung und die geplante Versorgung mit Kosten. Deine Kasse prüft ihn, bevor die Behandlung beginnt.',
    },
    {
      question: 'Wie lange hat die Kasse Zeit, den Plan zu genehmigen?',
      answer:
        'Nach § 13 Abs. 3a SGB V entscheidet die Kasse innerhalb von drei Wochen, bei einem eingeholten Gutachten innerhalb von fünf Wochen und im zahnärztlichen Gutachterverfahren innerhalb von sechs Wochen. Kann sie die Frist nicht einhalten, muss sie das rechtzeitig mit Gründen mitteilen.',
    },
    {
      question: 'Kann ich Zahnersatz noch versichern, wenn er schon angeraten ist?',
      answer:
        'Das hängt vom Zeitpunkt ab. Wurde die Behandlung in den letzten 2 Jahren angeraten oder geplant oder läuft sie schon, ist sie bei einem normalen Zahntarif nicht versichert. Dafür gibt es den Baustein ZAHN Sofort der Bayerischen, wenn der Abschluss vor der Rechnung erfolgt. Liegt die Empfehlung länger als 2 Jahre zurück, ist sie bei der UKV wieder versichert.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir oben den Ratgeber zu deiner Behandlung aus und lass dir vom Zahnarzt den Heil- und Kostenplan geben. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Wie dein Kassenbonus den Beitrag mittragen kann, steht im ' },
      { text: 'Ratgeber zum IKK-Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Festzuschüsse, Prozentsätze und Fristen stammen aus Gesetz und Richtlinien, die Kosten aus den Patienteninformationen von KZBV, IQWiG und Verbraucherzentrale.',
    items: [
      {
        label: 'Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '06.10.2026',
      },
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
        label: 'Zahnersatz: Wie viel übernimmt die gesetzliche Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnersatz-wie-viel-uebernimmt-die-gesetzliche-krankenkasse-12884',
        stand: '26.01.2026',
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
        label: 'Implantate (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/implantate/',
        stand: 'April 2022, Seite geändert 09.02.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Professionelle Zahnreinigung (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/',
        stand: 'Mai 2025, Seite geändert 27.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Welche Vor- und Nachteile hat die professionelle Zahnreinigung?',
        publisher: 'IQWiG (gesundheitsinformation.de)',
        href: 'https://www.gesundheitsinformation.de/welche-vor-und-nachteile-hat-die-professionelle-zahnreinigung.html',
        stand: 'aktualisiert 23.08.2023',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Wurzelbehandlung: So läuft sie ab und das zahlt die Krankenkasse',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/wurzelbehandlung-so-laeuft-sie-ab-und-das-zahlt-die-krankenkasse-111087',
        stand: '22.10.2025',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Behandlungsrichtlinie, Abschnitt B.III (Wurzelbehandlung)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-2784/RL-Z_Behandlung_2021-12-16_iK-2022-03-09.pdf',
        stand: 'geändert 16.12.2021, in Kraft 09.03.2022',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Härtefallregelung beim Zahnersatz: Wer hat Anspruch?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/haertefallregelung-beim-zahnersatz-wer-hat-anspruch-12887',
        stand: '27.01.2026',
        accessedAt: '07.10.2026',
        note: 'Einkommensgrenzen für den Härtefall 2026',
      },
      {
        label: 'Festzuschuss und Eigenanteil (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/patient-und-krankenkasse/zahnersatz/festzuschuesse-zum-zahnersatz/',
        stand: '01.01.2026',
        accessedAt: '07.10.2026',
        note: 'Einkommensgrenzen für den Härtefall 2026',
      },
      {
        label: 'Bundesmantelvertrag Zahnärzte, Anlage 2 (Heil- und Kostenplan) und SGB V § 87 Abs. 1a',
        publisher: 'KZBV und GKV-Spitzenverband, gesetze-im-internet.de',
        href: 'https://www.kzbv.de/wp-content/uploads/bmv-z-2026-04-01_gesamtausgabe.pdf',
        stand: 'Gesamtausgabe Stand 01.04.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 13 Absatz 3a (Genehmigungsfristen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__13.html',
        stand: 'Abruf 06.10.2026',
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
