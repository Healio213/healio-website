/**
 * Zahn-Ratgeber Serie, Stapel "zahnkosten", Welle A: "Zahnprothese Kosten".
 *
 * Quellen (Belege je Zahl in zahnprothese-kosten.belege.md, Abruf 07.10.2026):
 * Festzuschuss-Richtlinie des G-BA (Befunde 3.1, 3.2, 4.1 bis 4.4, 6.1 bis 6.3,
 * 6.6 und 6.7, Beträge ab 01.01.2026, Teil A Nr. 6, 7 und 8), SGB V § 55 und
 * § 56, GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228), KZBV
 * (Teilprothesen, Vollprothesen, Festzuschuss und Eigenanteil), Verbraucherzentrale
 * (Zahnersatz 26.01.2026), Bundesmantelvertrag Zahnärzte Anlage 2, SGB V § 13.
 * Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne für Teleskop-, Geschiebe- oder implantatgestützte
 *     Prothesen: Es gibt dafür keine neutrale Preisangabe. Die Seite zeigt die
 *     Regelversorgung nach G-BA und sagt, wovon der Rest abhängt. Die frühere
 *     Angabe "rund 800 Euro" der Verbraucherzentrale (Stand 2024) steht nicht
 *     im Text, sie ist durch die G-BA-Beträge 2026 überholt.
 *   - Die Euro-Beträge für 2027 setzt der G-BA erst noch fest. Die Seite nennt
 *     für 2027 nur die Prozentsätze.
 *   - Ab 4 fehlenden Zähnen ist laut /zahn keine Aufnahme möglich, und eine
 *     herausnehmbare Prothese zählt dort zur Zahn-Vorgeschichte. Die Seite
 *     sagt das offen und zeigt den Tarif nur für den Fall, dass der Vertrag
 *     vor dem Zahnverlust besteht. Keine Zuschlagsbeträge, kein Beitrag für
 *     ZAHN Sofort.
 *   - Teleskop: Indikation und Regel nur mit Beleg aus der Zahnersatz-Richtlinie
 *     des G-BA (Richtlinie 26, Nr. 35), dazu § 56 Abs. 2 SGB V und die
 *     Befundbeschreibung 3.2 der Festzuschuss-Richtlinie (Richtlinie 27).
 *   - ZAHN Sofort: Voraussetzung wörtlich aus dentalContent.js (paths.cards).
 *   - Keine Behandlungsempfehlung: Welche Prothese in Frage kommt, entscheidet
 *     die Praxis nach dem Befund.
 *
 * Faktenprüfung 07.10.2026: serie/zahn/PRÜFBERICHT-zahnkosten.md
 */
export const article = {
  slug: 'zahnprothese-kosten',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Zahnprothese Kosten: Festzuschuss und Eigenanteil | Healio',
  metaDescription:
    'Was eine Zahnprothese kostet, wie viel Festzuschuss die Kasse 2026 für Teilprothese, Vollprothese und Teleskop zahlt und was bei dir bleibt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Zahnprothese: Arten, Kosten und Eigenanteil',
  listTeaser:
    'Was Teilprothese, Vollprothese und Teleskop kosten, wie viel die Kasse je Kiefer als Festzuschuss zahlt und was für dich übrig bleibt.',

  headline: 'Zahnprothese: Arten, Kosten und Eigenanteil',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '952,15 EUR', label: 'Regelversorgung 2026 einer Teilprothese je Kiefer' },
      { value: '571,29 EUR', label: 'Festzuschuss dafür 2026, ohne Bonusheft' },
      { value: '380,86 EUR', label: 'bleiben bei der Regelversorgung ohne Bonusheft (eigene Rechnung)' },
    ],
    text: 'Die Kasse zahlt bei einer Zahnprothese einen festen Betrag für den Befund, getrennt für Ober- und Unterkiefer. Was die gewählte Prothese darüber hinaus kostet, trägst du selbst.',
    path: { to: '/zahn#zahn-check', text: 'Prothese geplant oder Zähne fehlen?', label: 'Zahn-Check starten' },
  },

  lead: 'Eine Zahnprothese ist herausnehmbarer Zahnersatz, und die gesetzliche Krankenkasse beteiligt sich mit einem Festzuschuss je Kiefer. Für eine Teilprothese setzt der Gemeinsame Bundesausschuss (G-BA) die Regelversorgung 2026 mit 952,15 EUR an, davon zahlt die Kasse ohne Bonusheft 571,29 EUR, wenn sie den Festzuschuss bis Ende 2026 bewilligt. Eine Prothese mit Teleskopen oder auf Implantaten kostet mehr, der Zuschuss bleibt gleich.',

  sections: [
    {
      id: 'kosten',
      heading: 'Was kostet eine Zahnprothese?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt von der Art der Prothese ab. Der G-BA nennt für die Regelversorgung 2026 Beträge je Befund. Eine Teilprothese für Lücken, die nicht zu den Brücken-Befunden passen, oder für eine Freiendsituation ist mit 952,15 EUR je Kiefer angesetzt (Befund 3.1). Eine Vollprothese für den zahnlosen Oberkiefer kostet in der Regelversorgung 960,74 EUR (Befund 4.2), für den zahnlosen Unterkiefer 1.029,54 EUR (Befund 4.4). In den Beträgen stecken die zahnärztlichen und die zahntechnischen Leistungen.',
        },
        {
          type: 'paragraph',
          text: 'Teleskop- und Geschiebeprothesen kosten laut KZBV mehr als eine Klammerprothese, eine Euro-Spanne nennt sie nicht. Bei Zahnersatz machen Material und Labor nach der KZBV 60 bis 70 Prozent der Gesamtrechnung aus. Was deine Prothese kostet, steht deshalb in deinem Heil- und Kostenplan.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Wie viel zahlt die Krankenkasse bei einer Zahnprothese?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Kasse zahlt keinen Anteil an deiner Rechnung, sondern einen befundbezogenen Festzuschuss (§ 55 SGB V). Deine Praxis stellt den Befund für Ober- und Unterkiefer getrennt fest. Der Zuschuss bleibt gleich, auch wenn du eine höherwertige Prothese wählst. Die Mehrkosten trägst du selbst (§ 55 Abs. 4 SGB V).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Regelversorgung und Festzuschuss 2026 für Prothesen, Festzuschuss-Richtlinie des G-BA',
          head: ['Befund', 'Regelversorgung', 'Festzuschuss ohne Bonusheft', 'Festzuschuss mit 10 Jahren Bonusheft'],
          rows: [
            ['Lücken, die nicht zu den Brücken-Befunden passen, oder Freiendsituation (Zahnreihe endet hinten frei), je Kiefer, Befund 3.1', '952,15 EUR', '571,29 EUR', '714,11 EUR'],
            ['Restzahnbestand bis zu 3 Zähnen im Oberkiefer, Befund 4.1', '994,80 EUR', '596,88 EUR', '746,10 EUR'],
            ['Zahnloser Oberkiefer, Befund 4.2', '960,74 EUR', '576,44 EUR', '720,56 EUR'],
            ['Restzahnbestand bis zu 3 Zähnen im Unterkiefer, Befund 4.3', '1.027,99 EUR', '616,79 EUR', '770,99 EUR'],
            ['Zahnloser Unterkiefer, Befund 4.4', '1.029,54 EUR', '617,72 EUR', '772,16 EUR'],
          ],
          note: 'Quelle: G-BA, Festzuschuss-Richtlinie, Teil B, Beträge gültig ab 1. Januar 2026. Die Regelversorgung ist die 100-Prozent-Spalte der Richtlinie. Ohne Begleitleistungen wie Betäubung oder Röntgen, die als Kassenleistung gesondert abgerechnet werden.',
        },
        {
          type: 'paragraph',
          text: 'Mit lückenlosem Bonusheft steigt der Festzuschuss von 60 auf 70 Prozent nach fünf und auf 75 Prozent nach zehn Jahren. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50 Prozent, mit Bonusheft 60 oder 65 Prozent. Maßgeblich ist laut Gesetzestext das Datum der Bewilligung, nicht der Beginn der Behandlung. Bei unzumutbarer Belastung zahlt die Kasse die Regelversorgung ganz, also 100 Prozent. Die Euro-Beträge für 2027 setzt der G-BA noch fest.',
        },
      ],
    },
    {
      id: 'arten',
      heading: 'Welche Zahnprothesen gibt es und worin unterscheiden sie sich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV beschreibt Teilprothesen für Menschen, die so viele Zähne verloren haben, dass festsitzender Zahnersatz nicht mehr verankert werden kann. Meist fehlen dann schon mehr als vier Zähne in einem Kiefer. Welche Art für dich in Frage kommt, entscheidet deine Praxis nach dem Befund.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Prothesenarten nach den Patienteninformationen der KZBV und ihre Einordnung bei der Kasse',
          head: ['Prothesenart', 'Wie sie hält', 'Besonderheit laut KZBV', 'Kasse'],
          rows: [
            ['Klammerteilprothese', 'Metallgerüst mit Klammern an den Restzähnen', 'kostengünstig, leicht zu pflegen, Klammern teils sichtbar, wartungsintensiv', 'Regelversorgung bei Befund 3.1'],
            ['Teleskop- oder Geschiebeprothese', 'Teleskopkronen oder Geschiebe an überkronten Zähnen', 'fester Halt, keine Klammern, höhere Kosten, Ankerzähne werden stärker beschliffen', 'Teleskope gehören in bestimmten Fällen zur Regelversorgung (Befund 3.2), sonst gilt der Festzuschuss des Befunds'],
            ['Vollprothese', 'Unterdruck, im Oberkiefer zusätzlich Saugwirkung am Gaumen', 'üblicherweise aus Kunststoff, bei Zahnlosigkeit eines oder beider Kiefer', 'Regelversorgung bei Befund 4.2 und 4.4'],
            ['Implantatgestützte Vollprothese', 'Halt auf zwei bis vier Implantaten im Unterkiefer, vier bis sechs im Oberkiefer', 'nach Möglichkeit gaumenfrei gestaltet', 'Festzuschuss des Befunds vor dem Implantat, für die Implantate selbst keiner'],
          ],
          note: 'Quellen: KZBV Patienteninformationen Teilprothesen und Vollprothesen (Stand April 2022), G-BA Festzuschuss-Richtlinie Teil A Nr. 6 und 7.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was ein Implantat kostet und warum die Kasse dafür in der Regel nichts zahlt, steht im Ratgeber ' },
            { text: 'Zahnimplantat Kosten', to: '/ratgeber/zahnimplantat-kosten' },
            { text: '. Wenn für eine kleine Lücke eine Brücke in Frage kommt, hilft der Ratgeber ' },
            { text: 'Zahnbrücke Kosten', to: '/ratgeber/zahnbruecke-kosten' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'teleskop',
      heading: 'Zahlt die Kasse eine Teleskopprothese?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Teilweise ja, aber nur als Festzuschuss. Eine Teleskopprothese ist eine Kombinationsversorgung. Die Zahnersatz-Richtlinie des G-BA hält solche Versorgungen für angezeigt, wenn sie die Restzähne statisch und funktionell günstiger belasten und besser halten als andere Zahnersatzformen. Zur Regelversorgung gehören dabei als Verbindungselemente nur Teleskopkronen auf Eckzähnen und den ersten Prämolaren (Nr. 35 der Richtlinie). Das Gesetz begrenzt die Regelversorgung bei Kombinationsversorgungen auf zwei Verbindungselemente je Kiefer, bei höchstens drei Restzähnen je Kiefer auf drei (§ 56 Abs. 2 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'In der Festzuschuss-Richtlinie steht das als Befund 3.2. Er beschreibt verkürzte oder unterbrochene Zahnreihen, für die die Regelversorgung eine Kombinationsversorgung vorsieht, und lässt sich zweimal je Kiefer ansetzen, je Eckzahn oder erstem Prämolar. Ob dein Befund dazu gehört, stellt deine Praxis fest.',
        },
        {
          type: 'paragraph',
          text: 'Beim Befund 3.2 beträgt die Regelversorgung 667,91 EUR je Eckzahn oder erstem Prämolar. Der Festzuschuss liegt bei 400,75 EUR ohne Bonusheft und bei 500,93 EUR mit zehn Jahren Bonusheft. Wählst du eine Teleskopprothese, obwohl die Richtlinie für deinen Befund eine andere Prothese vorsieht, ist das nach der KZBV eine andersartige Versorgung. Die Kasse zahlt den Festzuschuss des Befunds, die Praxis rechnet die Leistung nach der Gebührenordnung für Zahnärzte ab, und die Mehrkosten trägst du.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei einer Zahnprothese an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Beispiel rechnet mit der Regelversorgung einer Teilprothese, 952,15 EUR, und in der vierten Zeile mit einem zahnlosen Oberkiefer. Die letzte Zeile zeigt, was passiert, wenn bei Vertragsabschluss schon vier oder mehr Zähne fehlen.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Teilprothese in der Regelversorgung',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung auf bis zu 1.000 EUR, die Beträge der Karte liegen darunter. Der Vertrag besteht schon, bevor die Zähne verloren gehen und bevor die Prothese angeraten wird, außer in der letzten Zeile.',
          caption: 'Eigenanteil bei einer Zahnprothese, Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Teilprothese 952,15 EUR, ohne Bonusheft', '571,29 EUR', '380,86 EUR', 'Der Tarif erstattet bis zu 380,86 EUR'],
            ['Teilprothese 952,15 EUR, Bonusheft 5 Jahre', '666,51 EUR', '285,64 EUR', 'Der Tarif erstattet bis zu 285,64 EUR'],
            ['Teilprothese 952,15 EUR, Bonusheft 10 Jahre', '714,11 EUR', '238,04 EUR', 'Der Tarif erstattet bis zu 238,04 EUR'],
            ['Zahnloser Oberkiefer 960,74 EUR, ohne Bonusheft', '576,44 EUR', '384,30 EUR', 'Der Tarif erstattet bis zu 384,30 EUR'],
            ['Teilprothese wie oben, bei Abschluss fehlten schon 4 oder mehr Zähne', '571,29 EUR', '380,86 EUR', 'Ab 4 fehlenden Zähnen ist keine Aufnahme möglich, der Rest bleibt bei dir'],
          ],
          note: 'Beispielrechnung, keine Preisangabe. Quellen: G-BA Festzuschuss-Richtlinie, Beträge ab 01.01.2026 (Befund 3.1 und 4.2). Der Betrag unter Du ohne Tarif ist eigene Rechnung aus Regelversorgung minus Festzuschuss. Annahmen: Die Rechnung entspricht genau der Regelversorgung, bei Vertragsbeginn war nichts angeraten oder geplant, es wurde im selben Jahr nichts anderes erstattet, kein Härtefall. Was erstattungsfähig ist, steht in den Tarifbedingungen. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'reparatur',
      heading: 'Was kosten Reparatur und Unterfütterung einer Prothese?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Herausnehmbarer Zahnersatz ist wartungsintensiver als festsitzender. Nach der KZBV ist im Durchschnitt alle zwei Jahre eine mehr oder weniger aufwendige Reparatur nötig. Auch dafür gibt es Befunde mit Festzuschuss. Welcher bei dir gilt, legt deine Praxis im Heil- und Kostenplan fest.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss 2026 für Wiederherstellung und Unterfütterung von Prothesen, Festzuschuss-Richtlinie des G-BA',
          head: ['Maßnahme', 'Regelversorgung', 'Festzuschuss ohne Bonusheft', 'Festzuschuss mit 10 Jahren Bonusheft'],
          rows: [
            ['Wiederherstellung ohne Abformung, je Prothese, Befund 6.1', '96,73 EUR', '58,04 EUR', '72,55 EUR'],
            ['Wiederherstellung mit Abformung im Kunststoffbereich, je Prothese, Befund 6.2', '158,36 EUR', '95,02 EUR', '118,77 EUR'],
            ['Wiederherstellung im gegossenen Metallbereich, je Prothese, Befund 6.3', '223,52 EUR', '134,11 EUR', '167,64 EUR'],
            ['Verändertes Prothesenlager bei Teil-Zahnersatz (Unterfütterung), je Prothese, Befund 6.6', '180,13 EUR', '108,08 EUR', '135,10 EUR'],
            ['Verändertes Prothesenlager bei totalem Zahnersatz, je Kiefer, Befund 6.7', '216,92 EUR', '130,15 EUR', '162,69 EUR'],
          ],
          note: 'Quelle: G-BA, Festzuschuss-Richtlinie, Teil B Befund 6.1 bis 6.3, 6.6 und 6.7, Beträge gültig ab 1. Januar 2026. Die Befunde beschreiben die Regelversorgung, weitere Befunde 6.x gibt es für Erweiterungen.',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung bei der Zahnprothese?',
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
              lead: 'Wer viele Zähne vermisst, kommt über den Standardweg nicht in den Tarif.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht. Bei einer Teilprothese fehlen nach der KZBV meist schon mehr als vier Zähne in einem Kiefer. Der Tarif hilft deshalb vor allem denen, die vor dem Zahnverlust abschließen.',
            },
            {
              lead: 'Eine schon getragene Prothese zählt zur Zahn-Vorgeschichte.',
              text: 'Auf healio.de/zahn zählen dazu zum Beispiel eine herausnehmbare Prothese, Zahnersatz, der älter als 10 Jahre ist, und Parodontitis in den letzten 3 Jahren. Welcher Weg dann offen ist, zeigt der Zahn-Check, über die Annahme entscheidet der Versicherer im Antrag. Für den Baustein ZAHN Sofort der Bayerischen gilt als Voraussetzung: Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese.',
            },
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
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
            { text: '. Prothese, Brücke, Krone und Implantat nebeneinander vergleicht der Ratgeber ' },
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
              title: 'Zahnbrücke: Kosten, Festzuschuss und Eigenanteil',
              text: 'Wenn eine Lücke noch mit festsitzendem Zahnersatz zu schließen ist.',
              to: '/ratgeber/zahnbruecke-kosten',
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
              icon: 'protection',
              tone: 'sky',
              title: 'Zahnimplantat Kosten',
              text: 'Auch eine Prothese kann auf Implantaten halten.',
              to: '/ratgeber/zahnimplantat-kosten',
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
      question: 'Was kostet eine Zahnprothese?',
      answer:
        'Der G-BA setzt für die Regelversorgung 2026 eine Teilprothese mit 952,15 EUR je Kiefer an, eine Vollprothese für den zahnlosen Oberkiefer mit 960,74 EUR und für den zahnlosen Unterkiefer mit 1.029,54 EUR. Teleskop-, Geschiebe- und implantatgestützte Prothesen kosten mehr, den Betrag nennt dein Heil- und Kostenplan.',
    },
    {
      question: 'Was zahlt die Krankenkasse bei einer Teilprothese?',
      answer:
        'Einen Festzuschuss. Beim Befund 3.1 sind das 2026 ohne Bonusheft 571,29 EUR je Kiefer, mit fünf Jahren Bonusheft 666,51 EUR und mit zehn Jahren 714,11 EUR, wenn die Kasse bis Ende 2026 bewilligt. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50 Prozent, mit Bonusheft 60 oder 65 Prozent.',
    },
    {
      question: 'Was kostet eine Zahnprothese im Oberkiefer?',
      answer:
        'Für einen zahnlosen Oberkiefer setzt der G-BA 2026 die Regelversorgung mit 960,74 EUR an. Der Festzuschuss beträgt ohne Bonusheft 576,44 EUR und mit zehn Jahren Bonusheft 720,56 EUR. Bei der Regelversorgung bleiben dir ohne Bonusheft 384,30 EUR.',
    },
    {
      question: 'Zahlt die Kasse Teleskopzahnersatz?',
      answer:
        'Nur als Festzuschuss. In den Fällen des Befunds 3.2 gehören Teleskopkronen zur Regelversorgung, dort sind es 2026 ohne Bonusheft 400,75 EUR je Eckzahn oder erstem Prämolar. Wählst du Teleskope in einem anderen Fall, bekommst du den Festzuschuss des Befunds und trägst die Mehrkosten selbst.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung die Prothese?',
      answer:
        'In ZahnPRIVAT 75 und 100 der UKV sind Prothesen erstattungsfähig. Nicht versichert ist, was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich, eine herausnehmbare Prothese zählt auf healio.de/zahn zur Zahn-Vorgeschichte.',
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
        label: 'Festzuschuss-Richtlinie, Teil B Befunde 3.1, 3.2, 4.1 bis 4.4, 6.1 bis 6.3, 6.6 und 6.7, Teil A Nr. 6 bis 9',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/richtlinien/27/',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zahnersatz-Richtlinie, Nr. 35 (Kombinationsversorgung, Teleskopkronen)',
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
        label: 'Teilprothesen (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/teilprothesen/',
        stand: 'April 2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Vollprothesen (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/vollprothesen/',
        stand: 'April 2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Festzuschuss und Eigenanteil (Patienteninformation)',
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
