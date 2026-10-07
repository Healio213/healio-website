/**
 * Zahn-Ratgeber Serie, Stapel "zahnkosten", Welle A: "Zahnersatz Möglichkeiten".
 *
 * Vergleichsseite zu Krone, Brücke, Implantat und Prothese. Sie zeigt die
 * Beträge der Regelversorgung und des Festzuschusses nebeneinander und
 * verweist auf die Einzelseiten (zahnkrone-kosten, zahnbruecke-kosten,
 * zahnimplantat-kosten, zahnprothese-kosten) und die Bereichsseite.
 *
 * Quellen (Belege je Zahl in zahnersatz-moeglichkeiten.belege.md, Abruf
 * 07.10.2026): Festzuschuss-Richtlinie des G-BA (Richtlinie 27, Befunde 1.1, 2.1, 3.1, 4.2,
 * Beträge ab 01.01.2026, Teil A Nr. 6 und 7), SGB V § 55, § 56 und § 87
 * Abs. 1a, GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228), KZBV
 * (Kronen, Brücken, Implantate, Teilprothesen, Festzuschuss und Eigenanteil),
 * Verbraucherzentrale (Zahnersatz 26.01.2026, Brücke, Krone, Implantat
 * 01.07.2024). Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne für Keramik-, Zirkon- und Verblendzahnersatz sowie für
 *     Teleskop- und Geschiebeprothesen: Es gibt dafür keine neutrale
 *     Preisangabe. Die einzige Spanne ist die der Verbraucherzentrale für das
 *     Einzelzahn-Implantat (1.500 bis 3.500 EUR inklusive Zahnersatz, Stand
 *     01.07.2024), ohne Knochenaufbau.
 *   - Die Euro-Beträge für 2027 setzt der G-BA erst noch fest. Die Seite nennt
 *     für 2027 nur die Prozentsätze.
 *   - Keine Behandlungsempfehlung und keine Rangfolge der Möglichkeiten: Die
 *     Vor- und Nachteile stehen nur als Aussagen der KZBV, welche Möglichkeit
 *     passt, entscheidet die Praxis nach dem Befund.
 *   - Tarifaussagen nur wortgleich mit /zahn: ab 4 fehlenden Zähnen keine
 *     Aufnahme, Angeratenes nicht versichert, Zahnstaffel, ZAHN Sofort nur
 *     mit seinen Voraussetzungen. Keine Zuschlagsbeträge, kein Beitrag.
 *
 * Faktenprüfung 07.10.2026: serie/zahn/PRÜFBERICHT-zahnkosten.md
 */
export const article = {
  slug: 'zahnersatz-moeglichkeiten',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Zahnersatz Möglichkeiten: Arten und Kosten im Vergleich | Healio',
  metaDescription:
    'Krone, Brücke, Implantat oder Prothese: Welche Möglichkeiten es beim Zahnersatz gibt, was die Kasse 2026 als Festzuschuss zahlt und was bei dir bleibt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Zahnersatz: welche Möglichkeiten es gibt und was sie kosten',
  listTeaser:
    'Krone, Brücke, Implantat und Prothese nebeneinander: Regelversorgung, Festzuschuss, Material und der Eigenanteil, der bei dir bleibt.',

  headline: 'Zahnersatz Möglichkeiten: Krone, Brücke, Implantat und Prothese im Vergleich',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: 'Festzuschuss', label: 'richtet sich nach dem Befund, nicht nach der gewählten Versorgung' },
      { value: '921,60 EUR', label: 'Regelversorgung Metallbrücke bei einem fehlenden Zahn 2026' },
      { value: '1.500 bis 3.500 EUR', label: 'Einzelzahn-Implantat inklusive Zahnersatz (Verbraucherzentrale)' },
    ],
    text: 'Welche Möglichkeit die Kasse als Regelversorgung ansetzt, hängt vom Befund ab. Der Festzuschuss bleibt gleich, auch wenn du eine andere wählst.',
    path: { to: '/zahn#zahn-check', text: 'Zahnersatz geplant oder Zahn verloren?', label: 'Zahn-Check starten' },
  },

  lead: 'Beim Zahnersatz gibt es vier Wege: die Krone für einen Zahn, der noch da ist, Brücke und Implantat für fehlende Zähne und die Prothese, wenn viele Zähne fehlen. Was davon Regelversorgung ist, legt der Befund fest, und die Kasse zahlt dafür einen Festzuschuss, 2026 ohne Bonusheft 60 Prozent der Regelversorgung. Wählst du etwas anderes, bleibt der Zuschuss gleich, und die Mehrkosten trägst du selbst.',

  sections: [
    {
      id: 'ueberblick',
      heading: 'Welche Möglichkeiten gibt es beim Zahnersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV unterscheidet Kronen, Brücken, Implantate sowie Teil- und Vollprothesen. Eine Krone überkront einen Zahn, von dem große Teile zerstört sind, der Rest des Zahns bleibt darunter erhalten. Brücke und Implantat ersetzen fehlende Zähne. Teilprothesen kommen zum Einsatz, wenn so viele Zähne fehlen, dass festsitzender Zahnersatz nicht mehr verankert werden kann. Krone, Brücke und die Krone auf einem Implantat sitzen fest, eine Prothese lässt sich herausnehmen. Bei kleinen Lücken geht das Gesetz von festsitzendem Zahnersatz als Regelversorgung aus (§ 56 Abs. 2 SGB V).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Die vier Möglichkeiten im Vergleich: Regelversorgung und Festzuschuss 2026, Festzuschuss-Richtlinie des G-BA',
          head: ['Möglichkeit', 'Regelversorgung 2026', 'Festzuschuss ohne Bonusheft', 'Darüber hinaus'],
          rows: [
            ['Krone, Befund 1.1, je Zahn', '398,39 EUR, metallische Vollkrone', '239,03 EUR', 'Verblend- und Vollkeramikkronen kosten mehr, Vollkeramik ist laut KZBV die kostenaufwendigste Kronenart'],
            ['Brücke, Befund 2.1, ein fehlender Zahn', '921,60 EUR, Metallbrücke', '552,96 EUR', 'Verblend- und vollkeramische Brücken kosten mehr'],
            ['Implantat mit Krone, ein fehlender Zahn', 'keine, ein Implantat ist in der Regel keine Kassenleistung', '552,96 EUR, der Zuschuss des Befunds 2.1 vor dem Implantat', '1.500 bis 3.500 EUR für ein Einzelzahn-Implantat inklusive Zahnersatz laut Verbraucherzentrale'],
            ['Teilprothese, Befund 3.1, je Kiefer', '952,15 EUR', '571,29 EUR', 'Teleskop- und Geschiebeprothesen kosten mehr als eine Klammerprothese'],
            ['Vollprothese Oberkiefer, Befund 4.2', '960,74 EUR', '576,44 EUR', 'Eine Prothese auf Implantaten kostet mehr'],
          ],
          note: 'Quellen: G-BA Festzuschuss-Richtlinie, Teil B, Beträge gültig ab 1. Januar 2026 (die Regelversorgung ist die 100-Prozent-Spalte, ohne Begleitleistungen wie Betäubung oder Röntgen, die als Kassenleistung gesondert abgerechnet werden), KZBV Patienteninformationen, Verbraucherzentrale (Stand 01.07.2024). Beim Implantat kommt der Festzuschuss des Befunds vor dem Implantat, für Implantate, Aufbauten und Verbindungselemente gibt es keinen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Zu jeder Möglichkeit gibt es einen eigenen Ratgeber: ' },
            { text: 'Zahnkrone Kosten', to: '/ratgeber/zahnkrone-kosten' },
            { text: ', ' },
            { text: 'Zahnbrücke Kosten', to: '/ratgeber/zahnbruecke-kosten' },
            { text: ', ' },
            { text: 'Zahnimplantat Kosten', to: '/ratgeber/zahnimplantat-kosten' },
            { text: ' und ' },
            { text: 'Zahnprothese Kosten', to: '/ratgeber/zahnprothese-kosten' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'regelversorgung',
      heading: 'Was ist die Regelversorgung und wer legt sie fest?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Regelversorgung legt der G-BA für jeden Befund fest, und sie muss ausreichend, zweckmäßig und wirtschaftlich sein (§ 56 Abs. 2 SGB V). Auf ihr beruht der Festzuschuss. Bis Ende 2026 sind das ohne Bonusheft 60 Prozent ihrer Beträge, mit fünf oder zehn Jahren lückenlosem Bonusheft 70 oder 75 Prozent. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50, 60 und 65 Prozent, maßgeblich ist das Datum der Bewilligung. Die Euro-Beträge für 2027 setzt der G-BA noch fest.',
        },
        {
          type: 'paragraph',
          text: 'Wählst du mehr als die Regelversorgung, etwa eine Keramikbrücke statt einer Metallbrücke, nennt die KZBV das gleichartige Versorgung. Wählst du eine andere Art, etwa ein Implantat statt der Brücke, nennt sie das andersartig. In beiden Fällen zahlt die Kasse den Festzuschuss des Befunds, die Mehrkosten trägst du selbst (§ 55 Abs. 4 und 5 SGB V). Die Kosten stehen vorab in deinem Heil- und Kostenplan, der Befund, Regelversorgung und geplante Versorgung nach Art, Umfang und Kosten enthält (§ 87 Abs. 1a SGB V). Welche Möglichkeit für dich in Frage kommt, entscheidet deine Praxis nach dem Befund. Dieser Ratgeber gibt keine Behandlungsempfehlung.',
        },
      ],
    },
    {
      id: 'material',
      heading: 'Welches Material gibt es für Zahnersatz, auch Zirkon?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei Kronen und Brücken beschreibt die KZBV drei Gruppen. Zirkonoxid gehört zur Vollkeramik: Die KZBV nennt es als festen, zahnfarbenen Kern von Vollkeramikkronen und als Material vollkeramischer Brücken im Seitenzahnbereich.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Materialien für Kronen und Brücken nach den Patienteninformationen der KZBV und ihre Einordnung bei der Kasse',
          head: ['Material', 'Wo es üblich ist', 'Kosten laut KZBV', 'Kasse'],
          rows: [
            ['Metall: Vollguss aus Nichtedelmetall oder Gold', 'hauptsächlich im nicht sichtbaren Seitenzahnbereich', 'bei Brücken geringere Kosten', 'Nichtedelmetall ist im Seitenzahnbereich Regelversorgung'],
            ['Metall mit Verblendung aus Keramik oder Kunststoff', 'Front- und Seitenzähne, bei Kronen die am häufigsten verwendete Art', 'teurer als Vollguss', 'Teilverblendung im sichtbaren Bereich gehört zur Regelversorgung, mehr zahlst du selbst'],
            ['Vollkeramik, auch aus Zirkonoxid', 'Front- und Seitenzähne', 'die ästhetischste und kostenaufwendigste Kronenart, bei Brücken teurer als Verblendbrücken', 'Festzuschuss wie bei der Regelversorgung, Mehrkosten trägst du'],
          ],
          note: 'Quellen: KZBV Patienteninformationen Kronen und Brücken (Stand April 2022), Verbraucherzentrale (Stand 26.01.2026).',
        },
      ],
    },
    {
      id: 'implantat-bruecke',
      heading: 'Worin unterscheiden sich Brücke und Implantat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV stellt das Implantat der Brücke gegenüber. Zu den Vorteilen des Implantats zählt sie den Ersatz von Zahn und Wurzel, die Möglichkeit einzeln stehender Zähne und den Strukturerhalt des Knochens. Als Nachteile nennt sie einen chirurgischen Eingriff, eventuell eine längere Behandlungszeit und höhere Kosten. Bei der Brücke müssen die beiden Nachbarzähne präpariert und mit einer Krone versehen werden.',
        },
        {
          type: 'paragraph',
          text: 'Bei den Kosten liegt der Unterschied am Festzuschuss. Für die Brücke zahlt die Kasse 2026 ohne Bonusheft 552,96 EUR bei einer Regelversorgung von 921,60 EUR. Für ein Implantat zahlt sie denselben Festzuschuss, aber das Implantat selbst nicht. Ein Einzelzahn-Implantat kostet inklusive Zahnersatz in der Regel 1.500 bis 3.500 EUR, bei mehreren Implantaten werden die Kosten laut Verbraucherzentrale schnell fünfstellig.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei welcher Möglichkeit an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Beispiel rechnet mit einem fehlenden Zahn und einem Festzuschuss ohne Bonusheft. Die Implantat-Zeilen nehmen drei Kosten aus der Spanne der Verbraucherzentrale, ohne Knochenaufbau. Die letzte Zeile zeigt eine Teilprothese zum Vergleich.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Brücke, Implantat und Teilprothese',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung auf bis zu 1.000 EUR. Der Vertrag besteht schon, bevor der Zahn fehlt und die Behandlung angeraten wird.',
          caption: 'Eigenanteil bei einem fehlenden Zahn, Festzuschuss 2026 ohne Bonusheft',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Brücke, Regelversorgung 921,60 EUR', '552,96 EUR', '368,64 EUR', 'Der Tarif erstattet bis zu 368,64 EUR'],
            ['Einzelzahn-Implantat mit Krone, 1.500 EUR, erstes Kalenderjahr', '552,96 EUR', '947,04 EUR', 'Der Tarif erstattet bis zu 947,04 EUR'],
            ['Einzelzahn-Implantat mit Krone, 2.500 EUR, erstes Kalenderjahr', '552,96 EUR', '1.947,04 EUR', '947,04 EUR bleiben, die Zahnstaffel greift'],
            ['Einzelzahn-Implantat mit Krone, 3.500 EUR, erstes Kalenderjahr', '552,96 EUR', '2.947,04 EUR', '1.947,04 EUR bleiben, die Zahnstaffel greift'],
            ['Teilprothese, Regelversorgung 952,15 EUR, je Kiefer', '571,29 EUR', '380,86 EUR', 'Der Tarif erstattet bis zu 380,86 EUR'],
          ],
          note: 'Beispielrechnung, keine Preisangabe. Quellen: G-BA Festzuschuss-Richtlinie, Beträge ab 01.01.2026 (Befund 2.1 und 3.1), Verbraucherzentrale für die Spanne des Implantats (Stand 01.07.2024). Die Beträge unter Du ohne Tarif und die Zeilen mit Zahnstaffel sind eigene Rechnung: Kosten minus Festzuschuss, im ersten Kalenderjahr höchstens 1.000 EUR Erstattung. Annahmen: Die Brücke und die Teilprothese entsprechen genau der Regelversorgung, der Zahn ging erst nach Vertragsbeginn verloren, bei Vertragsbeginn war nichts angeraten oder geplant, kein Härtefall. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung beim Zahnersatz?',
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
              lead: 'Wer schon Zähne vermisst, hat eigene Regeln.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht. Für den Baustein ZAHN Sofort der Bayerischen gilt als Voraussetzung: Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
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
              icon: 'protection',
              tone: 'butter',
              title: 'Zahnkrone: Arten, Kosten und Festzuschuss',
              text: 'Metall, verblendet oder Vollkeramik im Vergleich.',
              to: '/ratgeber/zahnkrone-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'dental',
              tone: 'lavender',
              title: 'Zahnbrücke: Kosten, Festzuschuss und Eigenanteil',
              text: 'Wenn eine Lücke mit festsitzendem Zahnersatz zu schließen ist.',
              to: '/ratgeber/zahnbruecke-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'sky',
              title: 'Zahnimplantat: Kosten, Kassenanteil und Eigenanteil',
              text: 'Warum die Kasse nur den Festzuschuss zahlt.',
              to: '/ratgeber/zahnimplantat-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'family',
              tone: 'coral',
              title: 'Zahnprothese: Arten, Kosten und Eigenanteil',
              text: 'Teilprothese, Vollprothese und Teleskop mit den Beträgen je Kiefer.',
              to: '/ratgeber/zahnprothese-kosten',
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
      question: 'Welche Möglichkeiten gibt es beim Zahnersatz?',
      answer:
        'Krone, Brücke, Implantat und Prothese. Eine Krone überkront einen stark zerstörten Zahn, Brücke und Implantat ersetzen fehlende Zähne, eine Teil- oder Vollprothese kommt zum Einsatz, wenn viele oder alle Zähne fehlen. Welche Möglichkeit für dich in Frage kommt, entscheidet deine Praxis nach dem Befund.',
    },
    {
      question: 'Was ist festsitzender Zahnersatz, auch ohne Implantate?',
      answer:
        'Festsitzend sind Krone, Brücke und die Krone auf einem Implantat. Ohne Implantate bleiben Krone und Brücke. Klebebrücken dienen nach der KZBV in der Regel nur dem Ersatz fehlender Schneidezähne. Prothesen lassen sich dagegen herausnehmen. Bei kleinen Lücken geht das Gesetz von festsitzendem Zahnersatz als Regelversorgung aus.',
    },
    {
      question: 'Was kostet Zahnersatz aus Zirkon?',
      answer:
        'Dafür gibt es keine feste Preisliste. Zirkonoxid gehört nach der KZBV zur Vollkeramik, der ästhetischsten und kostenaufwendigsten Kronenart, bei Brücken ist Vollkeramik teurer als eine Verblendbrücke. Der Festzuschuss bleibt gleich, die Mehrkosten trägst du. Deinen Betrag nennt der Heil- und Kostenplan.',
    },
    {
      question: 'Welches Material zahlt die Kasse beim Zahnersatz?',
      answer:
        'Die Regelversorgung im Seitenzahnbereich ist Nichtedelmetall, im sichtbaren Bereich gehört eine zahnfarbene Teilverblendung dazu. Für Keramik zahlst du die Mehrkosten, den Festzuschuss bekommst du trotzdem.',
    },
    {
      question: 'Was zahlt die Kasse, wenn ich ein Implantat statt einer Brücke wähle?',
      answer:
        'Den Festzuschuss des Befunds, der vor dem Implantat bestand, bei einem fehlenden Zahn 2026 ohne Bonusheft 552,96 EUR. Das Implantat selbst, die Aufbauten und die Verbindungselemente zahlt die Kasse in der Regel nicht, nur in seltenen Ausnahmefällen.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung den Zahnersatz?',
      answer:
        'In ZahnPRIVAT 75 und 100 der UKV sind Implantate, Brücken und Prothesen erstattungsfähig. Nicht versichert ist, was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich, im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir vom Zahnarzt einen Heil- und Kostenplan geben und frag nach den Kosten der Regelversorgung und der Alternativen. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
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
    intro: 'Beträge und Prozentsätze stammen aus Richtlinie und Gesetz, die Beschreibungen der Möglichkeiten aus den Patienteninformationen von KZBV und Verbraucherzentrale.',
    items: [
      {
        label: 'Festzuschuss-Richtlinie, Teil B Befunde 1.1, 2.1, 3.1 und 4.2, Teil A Nr. 6 und 7',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/richtlinien/27/',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
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
        label: 'SGB V § 87 Absatz 1a (Heil- und Kostenplan)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__87.html',
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
        label: 'Kronen (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/kronen/',
        stand: 'April 2022',
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
        label: 'Implantate (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/implantate/',
        stand: 'April 2022',
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
        label: 'Zahnersatz: Wie viel übernimmt die gesetzliche Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnersatz-wie-viel-uebernimmt-die-gesetzliche-krankenkasse-12884',
        stand: '26.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Brücke, Krone, Implantat: Welche Unterschiede gibt es beim Zahnersatz?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/bruecke-krone-implantat-welche-unterschiede-gibt-es-beim-zahnersatz-7925',
        stand: '01.07.2024',
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
