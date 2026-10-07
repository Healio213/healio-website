/**
 * Zahn-Ratgeber Serie, Stapel "zahnkosten", Welle A: "Zahnbrücke Kosten".
 *
 * Quellen (Belege je Zahl in zahnbruecke-kosten.belege.md, Abruf 07.10.2026):
 * Festzuschuss-Richtlinie des G-BA (Richtlinie 27, Befunde 2.1 bis 2.4 und
 * 2.7, Beträge ab 01.01.2026, Teil A Nr. 8 und 9), Zahnersatz-Richtlinie des
 * G-BA (Richtlinie 26, Nr. 22 und 24), SGB V § 55 und § 56, GKV-Beitrags-
 * satzstabilisierungsgesetz (BGBl. 2026 I Nr. 228), KZBV (Brücken, Festzuschuss
 * und Eigenanteil mit Beispiel Eckzahn, Stand 1. Januar 2026),
 * Verbraucherzentrale (Zahnersatz 26.01.2026, Brücke, Krone, Implantat
 * 01.07.2024), Bundesmantelvertrag Zahnärzte Anlage 2, SGB V § 87 und § 13.
 * Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne für Keramik-, Zirkon- oder Verblendbrücken: Dafür gibt
 *     es keine neutrale Preisangabe, die Seite zeigt die Regelversorgung nach
 *     G-BA (921,60 EUR bei einem fehlenden Zahn, 1.318,92 EUR beim
 *     Eckzahn-Beispiel der KZBV) und sagt, wovon der Rest abhängt.
 *   - Die frühere Angabe "um die 1.000 Euro je Brücke" der Verbraucherzentrale
 *     (Stand 2024) steht nicht im Text, sie ist durch die G-BA-Beträge 2026
 *     überholt.
 *   - Die Euro-Beträge für 2027 setzt der G-BA erst noch fest (§ 56 Abs. 4
 *     SGB V). Die Seite nennt für 2027 nur die Prozentsätze, der Rechner nimmt
 *     die Beträge 2026 als Annahme.
 *   - ZAHN Sofort: Voraussetzung wörtlich aus dentalContent.js (paths.cards,
 *     "Voraussetzung: Es fehlen keine Zähne und es gibt keine
 *     Zahn-Vorgeschichte"). Daraus folgt der Satz, dass der Baustein bei einer
 *     Brücke für einen schon fehlenden Zahn nicht der Weg ist. Keine
 *     Zuschlagsbeträge für Lückenzähne.
 *   - Klebebrücke: Kasseneinordnung nach Zahnersatz-Richtlinie Nr. 22 und 24
 *     und Protokollnotiz zu Befund 2.2 der Festzuschuss-Richtlinie.
 *   - Keine Behandlungsempfehlung: Welche Brückenart in Frage kommt, entscheidet
 *     die Praxis nach dem Befund.
 *
 * Faktenprüfung 07.10.2026: serie/zahn/PRÜFBERICHT-zahnkosten.md
 */
export const article = {
  slug: 'zahnbruecke-kosten',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Zahnbrücke Kosten: Festzuschuss und Eigenanteil | Healio',
  metaDescription:
    'Was eine Zahnbrücke kostet, wie viel Festzuschuss die Kasse 2026 zahlt, was das Bonusheft bringt und was bei dir bleibt. Mit Rechenbeispiel und Rechner.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 12,

  listTitle: 'Zahnbrücke: Kosten, Festzuschuss und Eigenanteil',
  listTeaser:
    'Was die Regelversorgung bei einem, zwei, drei oder vier fehlenden Zähnen kostet, wie viel die Kasse davon trägt und was bei dir bleibt.',

  headline: 'Zahnbrücke: Kosten, Festzuschuss und Eigenanteil',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '921,60 EUR', label: 'Regelversorgung 2026 bei einem fehlenden Zahn' },
      { value: '552,96 EUR', label: 'Festzuschuss der Kasse 2026, ohne Bonusheft' },
      { value: '368,64 EUR', label: 'bleiben bei der Regelversorgung ohne Bonusheft (eigene Rechnung)' },
    ],
    text: 'Die Kasse zahlt bei einer Zahnbrücke einen festen Betrag für den Befund, nicht einen Anteil deiner Rechnung. Alles, was die gewählte Brücke darüber hinaus kostet, trägst du selbst.',
    path: { to: '/zahn#zahn-check', text: 'Brücke geplant oder Zahn verloren?', label: 'Zahn-Check starten' },
  },

  lead: 'Eine Zahnbrücke ersetzt einen oder mehrere fehlende Zähne mit festsitzendem Zahnersatz, und die gesetzliche Krankenkasse beteiligt sich mit einem Festzuschuss. Bei einem fehlenden Zahn ist die Regelversorgung eine Metallbrücke, die der Gemeinsame Bundesausschuss (G-BA) 2026 mit 921,60 EUR ansetzt. Davon zahlt die Kasse ohne Bonusheft 552,96 EUR, wenn sie den Festzuschuss bis Ende 2026 bewilligt. Brücken aus Keramik oder mit mehr Verblendung kosten mehr, der Zuschuss bleibt gleich.',

  sections: [
    {
      id: 'kosten',
      heading: 'Was kostet eine Zahnbrücke?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für einen fehlenden Zahn rechnen die gesetzlichen Kassen 2026 mit 921,60 EUR für die Regelversorgung. Das ist laut Verbraucherzentrale eine Brücke aus Nichtedelmetall im Seitenzahnbereich ohne zahnfarbene Verblendung (Stand 26.01.2026). Der Betrag steht in der Festzuschuss-Richtlinie des G-BA beim Befund 2.1 und enthält die zahnärztlichen und die zahntechnischen Leistungen.',
        },
        {
          type: 'paragraph',
          text: 'Im sichtbaren Bereich gehört zur Regelversorgung eine zahnfarbene Teilverblendung. Die KZBV rechnet dafür ein Beispiel vor, bei dem im Oberkiefer ein Eckzahn fehlt. Die Regelversorgung, eine Brücke mit Metallkern, der auf der von außen sichtbaren Seite zahnfarben verblendet wird, kostet danach 1.318,92 EUR. Ohne Bonusheft zahlt die Kasse davon 791,34 EUR (Stand 1. Januar 2026).',
        },
        {
          type: 'paragraph',
          text: 'Für Brücken aus Keramik oder Zirkon gibt es keine feste Preisliste. Die KZBV ordnet die Arten nur nach Aufwand. Verblendbrücken sind teurer als Vollguss-Brücken, vollkeramische Brücken sind teurer als Verblendbrücken. Material und Labor machen laut KZBV 60 bis 70 Prozent der Gesamtrechnung aus. Was deine Brücke kostet, steht deshalb in deinem Heil- und Kostenplan.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Wie viel zahlt die Krankenkasse bei einer Zahnbrücke?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Kasse zahlt keinen Anteil an deiner Rechnung, sondern einen befundbezogenen Festzuschuss (§ 55 SGB V). Bei einem fehlenden Zahn mit Nachbarzähnen davor und dahinter ist das der Befund 2.1. Der Zuschuss bleibt gleich, egal welche Brücke du wählst. Die KZBV schreibt dazu, er werde anhand des festgestellten Befundes festgesetzt und nicht nach der gewählten Therapie.',
        },
        {
          type: 'paragraph',
          text: 'Wählst du mehr als die Regelversorgung, etwa eine rundum verblendete Brücke, nennt das Gesetz das gleichartige Versorgung. Die Praxis rechnet die Mehrkosten nach der Gebührenordnung für Zahnärzte ab, und du trägst sie selbst (§ 55 Abs. 4 SGB V). Wählst du etwas ganz anderes, zum Beispiel ein Implantat statt der Brücke, bekommst du den Festzuschuss trotzdem (§ 55 Abs. 5 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Fehlen mehrere Zähne nebeneinander, steigen Regelversorgung und Festzuschuss. Das Gesetz begrenzt die Regelversorgung bei großen Brücken auf bis zu vier fehlende Zähne je Kiefer und bis zu drei je Seitenzahngebiet (§ 56 Abs. 2 SGB V). Passt die Lücke nicht zu den Befunden 2.1 bis 2.5, ist die Regelversorgung eine herausnehmbare Teilprothese (Befund 3.1).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Regelversorgung und Festzuschuss 2026 nach Größe der Lücke, Festzuschuss-Richtlinie des G-BA',
          head: ['Lücke', 'Regelversorgung', 'Festzuschuss ohne Bonusheft', 'Festzuschuss mit 10 Jahren Bonusheft'],
          rows: [
            ['1 fehlender Zahn, Befund 2.1, je Lücke', '921,60 EUR', '552,96 EUR', '691,20 EUR'],
            ['2 nebeneinander fehlende Zähne, Befund 2.2, je Lücke', '1.051,84 EUR', '631,10 EUR', '788,88 EUR'],
            ['3 nebeneinander fehlende Zähne, Befund 2.3, je Kiefer', '1.174,89 EUR', '704,93 EUR', '881,17 EUR'],
            ['4 nebeneinander fehlende Frontzähne, Befund 2.4, je Kiefer', '1.287,90 EUR', '772,74 EUR', '965,93 EUR'],
          ],
          note: 'Quelle: G-BA, Festzuschuss-Richtlinie, Teil B, Beträge gültig ab 1. Januar 2026. Die Regelversorgung ist die 100-Prozent-Spalte der Richtlinie. Ohne zahnfarbene Verblendungen, für die je Verblendung der Festzuschuss nach Befund 2.7 dazukommt (79,46 EUR ohne Bonusheft), und ohne Begleitleistungen wie Betäubung oder Röntgen, die als Kassenleistung gesondert abgerechnet werden.',
        },
      ],
    },
    {
      id: 'arten',
      heading: 'Welche Brückenarten gibt es und worin unterscheiden sie sich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV beschreibt vier Formen. Welche für dich in Frage kommt, entscheidet deine Praxis nach dem Befund. Der Festzuschuss richtet sich nach dem Befund, nicht nach der Art.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Brückenarten nach der Patienteninformation der KZBV und ihre Einordnung bei der Kasse',
          head: ['Brückenart', 'Wo sie üblich ist', 'Besonderheit laut KZBV', 'Kasse'],
          rows: [
            ['Vollguss-Brücke aus Metall', 'nur im Seitenzahnbereich', 'geringere Kosten, Ästhetik durch die Materialfarbe beeinträchtigt', 'Regelversorgung im Seitenzahnbereich'],
            ['Verblendbrücke aus Metall mit Keramik oder Kunststoff', 'Front- und Seitenzähne', 'teurer als Vollguss-Brücken, Verblendung in Handarbeit', 'Teilverblendung im sichtbaren Bereich gehört zur Regelversorgung, mehr zahlst du selbst'],
            ['Vollkeramische Brücke', 'Front- und Seitenzähne', 'teurer als Verblendbrücken, bei Zähneknirschen teils ungeeignet', 'Festzuschuss wie bei der Regelversorgung, Mehrkosten trägst du'],
            ['Klebebrücke (Adhäsivbrücke)', 'in der Regel zum Ersatz fehlender Schneidezähne', 'Zähne werden kaum beschliffen, Nachbarzähne müssen fast frei von Karies und Füllungen sein', 'Mit Metallgerüst kann sie für einen fehlenden Schneidezahn zur Regelversorgung gehören. Fehlen zwei Schneidezähne nebeneinander, gilt das zwischen 14 und 21 Jahren, ab 21 ist sie eine gleichartige Versorgung, die Mehrkosten trägst du'],
          ],
          note: 'Quellen: KZBV (Stand April 2022), Verbraucherzentrale (Stand 26.01.2026), G-BA Zahnersatz-Richtlinie Nr. 22 und 24, G-BA Festzuschuss-Richtlinie (Protokollnotiz zu Befund 2.2).',
        },
      ],
    },
    {
      id: 'bonusheft',
      heading: 'Was bringt das Bonusheft bei einer Zahnbrücke?',
      blocks: [
        {
          type: 'segments',
          segments: [
            { text: 'Der Festzuschuss steigt mit lückenlosem Bonusheft von 60 auf 70 Prozent nach fünf und auf 75 Prozent nach zehn Jahren. Bei einem fehlenden Zahn sind das 92,16 EUR mehr nach fünf und 138,24 EUR mehr nach zehn Jahren, eigene Rechnung aus den Werten der Tabelle unten. Wie das Heft funktioniert und was bei einer Unterbrechung gilt, erklärt der Ratgeber ' },
            { text: 'Bonusheft beim Zahnarzt', to: '/ratgeber/bonusheft-zahnarzt' },
            { text: '.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, sinken die Prozentsätze. Maßgeblich ist laut Gesetzestext das Datum der Bewilligung, nicht der Beginn der Behandlung. Die Euro-Beträge für 2027 setzt der G-BA noch fest.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss in Prozent der Regelversorgung und in Euro bei einem fehlenden Zahn, Befund 2.1',
          head: ['Stufe', 'Bewilligt bis 31.12.2026', 'Bewilligt ab 01.01.2027', 'Festzuschuss 2026 in EUR'],
          rows: [
            ['Ohne Bonusheft', '60 Prozent', '50 Prozent', '552,96 EUR'],
            ['Bonusheft 5 Jahre', '70 Prozent', '60 Prozent', '645,12 EUR'],
            ['Bonusheft 10 Jahre', '75 Prozent', '65 Prozent', '691,20 EUR'],
            ['Härtefall', '100 Prozent', '100 Prozent', '921,60 EUR'],
          ],
          note: 'Quellen: SGB V § 55 in der Fassung bis 31.12.2026, GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228, Artikel 1 Nr. 22, nach Artikel 8 Abs. 2 in Kraft ab 01.01.2027), G-BA Festzuschuss-Richtlinie Befund 2.1. Die Euro-Spalte gilt für 2026.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei einer Zahnbrücke an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Beispiel rechnet mit der Regelversorgung für einen fehlenden Zahn, 921,60 EUR, und in der letzten Zeile mit dem Eckzahn-Beispiel der KZBV. Die Karte zeigt auch, was ein Zahntarif davon erstatten kann.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Metallbrücke für einen fehlenden Zahn',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung auf bis zu 1.000 EUR, die Beträge der Karte liegen darunter. Der Vertrag besteht schon, bevor der Zahn fehlt und die Brücke angeraten wird.',
          caption: 'Eigenanteil bei einer Zahnbrücke, Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Regelversorgung 921,60 EUR, ohne Bonusheft', '552,96 EUR', '368,64 EUR', 'Der Tarif erstattet bis zu 368,64 EUR'],
            ['Regelversorgung 921,60 EUR, Bonusheft 5 Jahre', '645,12 EUR', '276,48 EUR', 'Der Tarif erstattet bis zu 276,48 EUR'],
            ['Regelversorgung 921,60 EUR, Bonusheft 10 Jahre', '691,20 EUR', '230,40 EUR', 'Der Tarif erstattet bis zu 230,40 EUR'],
            ['Eckzahn mit zahnfarbener Verblendung, 1.318,92 EUR, ohne Bonusheft', '791,34 EUR', '527,58 EUR', 'Der Tarif erstattet bis zu 527,58 EUR'],
          ],
          note: 'Beispielrechnung, keine Preisangabe. Quellen: G-BA Festzuschuss-Richtlinie, Beträge ab 01.01.2026 (Befund 2.1), KZBV (Beispiel Eckzahn, Stand 1. Januar 2026). Der Betrag unter Du ohne Tarif ist eigene Rechnung aus Regelversorgung minus Festzuschuss. Annahmen: Die Rechnung entspricht genau der Regelversorgung, der Zahn ging erst nach Vertragsbeginn verloren, bei Vertragsbeginn war nichts angeraten oder geplant, es wurde im selben Jahr nichts anderes erstattet, kein Härtefall. Was erstattungsfähig ist, steht in den Tarifbedingungen. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'calculator',
          id: 'zahnkosten-rechner',
          preset: 'bruecke',
          heading: 'Rechne dein Beispiel durch',
          intro: 'Der Rechner startet mit der Regelversorgung von 921,60 EUR. Hast du einen Heil- und Kostenplan, trägst du deinen Betrag selbst ein.',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft eine Zahnbrücke mit Heil- und Kostenplan ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bevor etwas gemacht wird, schreibt die Praxis einen Heil- und Kostenplan. Darin stehen der Befund, die Regelversorgung und die tatsächlich geplante Versorgung samt Kosten (§ 87 SGB V). Für das Erstellen des Plans darf die Praxis keine Gebühr verlangen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zum Eigenanteil',
          items: [
            {
              title: 'Heil- und Kostenplan',
              text: 'Die Praxis klärt dich über Befund, Alternativen und voraussichtliche Kosten auf und schickt den Plan an deine Kasse.',
            },
            {
              title: 'Kasse genehmigt',
              text: 'Die Kasse prüft den Plan und bewilligt den Festzuschuss. Mit der Behandlung soll erst begonnen werden, wenn die Genehmigung da ist.',
            },
            {
              title: 'Tarif erstattet',
              text: 'Dein Zahntarif erstattet nach seinen Bedingungen, bei ZahnPRIVAT 100 zum Beispiel 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung.',
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
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung bei der Zahnbrücke?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der UKV ZahnPRIVAT 100 sind Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. ZahnPRIVAT 75 erstattet 75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch dort sind Implantate, Brücken und Prothesen erstattungsfähig. Beide Tarife kommen ohne Wartezeiten aus.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Eine Lücke, die schon da ist, hat eigene Regeln.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht. Für den Baustein ZAHN Sofort der Bayerischen nennt healio.de/zahn als Voraussetzung: Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte. Für eine Brücke, die einen schon fehlenden Zahn ersetzt, ist er deshalb nicht der Weg.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was bei einer Zahnlücke genau gilt, steht im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '. Brücke, Krone, Implantat und Prothese nebeneinander vergleicht der Ratgeber ' },
            { text: 'Zahnersatz: welche Möglichkeiten es gibt', to: '/ratgeber/zahnersatz-moeglichkeiten' },
            { text: '.' },
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
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'comparison',
              tone: 'mint',
              title: 'Zahnersatz Kosten',
              text: 'Was die Kasse zahlt und was bei dir bleibt.',
              to: '/ratgeber/zahnersatz-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'dental',
              tone: 'lavender',
              title: 'Zahnimplantat Kosten',
              text: 'Wenn statt der Brücke ein Implantat im Gespräch ist.',
              to: '/ratgeber/zahnimplantat-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'butter',
              title: 'Zahnersatz: welche Möglichkeiten es gibt',
              text: 'Krone, Brücke, Implantat und Prothese im Vergleich.',
              to: '/ratgeber/zahnersatz-moeglichkeiten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'document',
              tone: 'sky',
              title: 'Bonusheft beim Zahnarzt',
              text: 'Fünf oder zehn Jahre lückenlos: so viel mehr zahlt die Kasse.',
              to: '/ratgeber/bonusheft-zahnarzt',
              linkLabel: 'Ratgeber lesen',
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
      question: 'Was kostet eine Zahnbrücke?',
      answer:
        'Für einen fehlenden Zahn setzt der G-BA 2026 die Regelversorgung mit 921,60 EUR an, eine Metallbrücke im Seitenzahnbereich ohne Verblendung. Mit zahnfarbener Verblendung im sichtbaren Bereich ist es mehr, die KZBV rechnet für einen fehlenden Eckzahn im Oberkiefer 1.318,92 EUR. Keramik- oder Zirkonbrücken kosten darüber, den Betrag nennt dein Heil- und Kostenplan.',
    },
    {
      question: 'Was kostet eine Zahnbrücke mit einem Zahn?',
      answer:
        'Die Regelversorgung für einen fehlenden Zahn liegt 2026 bei 921,60 EUR. Davon zahlt die Kasse ohne Bonusheft 552,96 EUR, mit fünf Jahren Bonusheft 645,12 EUR und mit zehn Jahren 691,20 EUR. Bei der Regelversorgung bleiben dir ohne Bonusheft 368,64 EUR.',
    },
    {
      question: 'Was kostet eine Zahnbrücke für drei Zähne?',
      answer:
        'Für drei nebeneinander fehlende Zähne setzt der G-BA 2026 die Regelversorgung mit 1.174,89 EUR an, je Kiefer. Der Festzuschuss beträgt ohne Bonusheft 704,93 EUR, mit zehn Jahren Bonusheft 881,17 EUR. Was eine aufwendigere Brücke kostet, steht im Heil- und Kostenplan.',
    },
    {
      question: 'Zahlt die Krankenkasse eine Zahnbrücke?',
      answer:
        'Ja, als Festzuschuss. Bei einem fehlenden Zahn sind das 2026 ohne Bonusheft 60 Prozent der Regelversorgung, also 552,96 EUR, wenn die Kasse bis Ende 2026 bewilligt. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50 Prozent, mit Bonusheft 60 oder 65 Prozent.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung die Brücke?',
      answer:
        'In ZahnPRIVAT 75 und 100 der UKV sind Brücken erstattungsfähig. Nicht versichert ist, was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft. Bei schon fehlenden Zähnen gelten die Regeln von healio.de/zahn, ab 4 fehlenden Zähnen ist keine Aufnahme möglich.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir vom Zahnarzt einen Heil- und Kostenplan geben und vergleiche ihn mit den Beispielen oben. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Alle Zahnkosten auf einen Blick findest du im Ratgeber ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Beträge und Prozentsätze stammen aus Richtlinie, Gesetz und den Patienteninformationen von KZBV und Verbraucherzentrale.',
    items: [
      {
        label: 'Festzuschuss-Richtlinie, Teil B Befunde 2.1 bis 2.4 und 2.7, Teil A Nr. 8 und 9',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/richtlinien/27/',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zahnersatz-Richtlinie, Nr. 22 und 24 (Adhäsivbrücken)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/richtlinien/26/',
        stand: 'zuletzt geändert 18.02.2016, in Kraft 04.05.2016',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 55 Leistungsanspruch auf Festzuschüsse beim Zahnersatz',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: 'Fassung bis 31.12.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 56 Festsetzung der Regelversorgungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__56.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz (Verkündung)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026, ausgegeben 29.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Brücken (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/bruecken/',
        stand: 'April 2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Festzuschuss und Eigenanteil (Patienteninformation mit Beispiel Eckzahn)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/patient-und-krankenkasse/zahnersatz/festzuschuesse-zum-zahnersatz/',
        stand: '1. Januar 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zahnersatz: Wie viel übernimmt die gesetzliche Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnersatz-wie-viel-uebernimmt-die-gesetzliche-krankenkasse-12884',
        stand: '26.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Bundesmantelvertrag Zahnärzte, Anlage 2 (Heil- und Kostenplan) und SGB V § 87 Abs. 1a',
        publisher: 'KZBV und GKV-Spitzenverband, gesetze-im-internet.de',
        href: 'https://www.kzbv.de/wp-content/uploads/bmv-z-2026-04-01_gesamtausgabe.pdf',
        stand: 'Gesamtausgabe Stand 01.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 13 Absatz 3a (Genehmigungsfristen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__13.html',
        accessedAt: '07.10.2026',
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
