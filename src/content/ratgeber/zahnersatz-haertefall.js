/**
 * Zahn-Ratgeber Serie, Stapel "zahnkosten", Welle A: "Härtefall Zahnersatz".
 *
 * Quellen (Belege je Zahl in zahnersatz-haertefall.belege.md, Abruf
 * 07.10.2026): SGB V § 55 Abs. 2 und 3 (Fassung bis 31.12.2026),
 * GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228, Artikel 1
 * Nr. 22, Artikel 8 Abs. 2), Festzuschuss-Richtlinie des G-BA (Richtlinie 27,
 * Teil A Nr. 4 und 5, Befunde
 * 1.1, 2.1 und 3.1), Verbraucherzentrale "Härtefallregelung beim Zahnersatz:
 * Wer hat Anspruch?" (Stand 27.01.2026), KZBV (Festzuschuss und Eigenanteil,
 * Stand 1. Januar 2026), KZV Land Brandenburg "ZE-Härtefallregelung 2026"
 * (Stand 24.11.2025), Sozialversicherungsrechengrößen 2026 (DRV
 * Knappschaft-Bahn-See, 02.01.2026). Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Einkommensgrenze 2026: 1.582,00 EUR (40 Prozent der Bezugsgröße 3.955
 *     EUR). Die Seite "Krone, Brücke oder Implantat? Hohe Kosten beim
 *     Zahnersatz vermeiden" der Verbraucherzentrale (Stand 13.04.2026) nennt
 *     noch 1.498 EUR, das ist der Wert für 2025 (40 Prozent von 3.745 EUR).
 *     Er steht nicht im Text. Die Zahnersatz-Bereichsseite der Welle 1 ist im
 *     Serienzweig bereits auf 1.582,00 EUR korrigiert (Stand 07.10.2026).
 *   - Der Anlass-Ratgeber zahnersatz-festzuschuss-2027 ist noch nicht gebaut.
 *     Die Seite erklärt den Festzuschuss 2027 knapp und nur mit dem
 *     Gesetzestext (BGBl. 2026 I Nr. 228, Artikel 1 Nr. 22 und Artikel 8
 *     Abs. 2) und verlinkt nicht darauf, bis der Anlass-Ratgeber steht.
 *   - Die Einkommensgrenze für 2027 steht noch nicht fest (sie folgt der
 *     Bezugsgröße 2027), die Euro-Festzuschüsse 2027 setzt der G-BA erst noch
 *     fest. Die Seite nennt dafür nur das Gesetz.
 *   - Keine Rechtsberatung im Einzelfall: Ob ein Härtefall vorliegt, prüft die
 *     Krankenkasse. Rechenbeispiele sind als eigene Rechnung gekennzeichnet.
 *
 * Faktenprüfung 07.10.2026: serie/zahn/PRÜFBERICHT-zahnkosten.md
 */
export const article = {
  slug: 'zahnersatz-haertefall',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Härtefall Zahnersatz: Einkommensgrenze 2026 und Antrag | Healio',
  metaDescription:
    'Härtefall beim Zahnersatz: Einkommensgrenze 2026, wer Anspruch hat, was doppelter Festzuschuss heißt, wie du den Antrag stellst und was sich 2027 ändert.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Härtefall beim Zahnersatz: Einkommensgrenze, Antrag, Rechenbeispiel',
  listTeaser:
    'Wann die Kasse die Regelversorgung ganz zahlt, wie hoch die Einkommensgrenze 2026 ist, was doppelter Festzuschuss heißt und wie der Antrag läuft.',

  headline: 'Härtefall beim Zahnersatz: Einkommensgrenze, Antrag und Rechenbeispiel',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '1.582,00 EUR', label: 'Einkommensgrenze 2026 je Monat für Alleinstehende (brutto)' },
      { value: '2.175,25 EUR', label: 'Grenze mit einem Angehörigen, je weiterem plus 395,50 EUR' },
      { value: '100 Prozent', label: 'der Regelversorgung zahlt die Kasse im Härtefall' },
    ],
    text: 'Du stellst den Antrag, die Kasse prüft ihn vor der Behandlung. Höherwertigen Zahnersatz zahlst du auch im Härtefall zu.',
    path: { to: '/zahn#zahn-check', text: 'Zahnersatz geplant oder Zahn verloren?', label: 'Zahn-Check starten' },
  },

  lead: 'Im Härtefall beim Zahnersatz bezahlt die Krankenkasse die Regelversorgung ganz, bei einem fehlenden Zahn mit Brücke 2026 also 921,60 EUR statt 552,96 EUR. Die Einkommensgrenze liegt 2026 bei 1.582,00 EUR brutto im Monat für Alleinstehende und steigt mit jedem Angehörigen im Haushalt. Unabhängig vom Einkommen haben auch Menschen Anspruch, die bestimmte Sozialleistungen beziehen. Für Zahnersatz, der über die Regelversorgung hinausgeht, zahlst du die Mehrkosten auch im Härtefall selbst.',

  sections: [
    {
      id: 'anspruch',
      heading: 'Wer hat Anspruch auf die Härtefallregelung beim Zahnersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Anspruch hat, wer sonst unzumutbar belastet würde. Das Gesetz nennt drei Fälle (§ 55 Abs. 2 SGB V). Erstens liegen die monatlichen Bruttoeinnahmen zum Lebensunterhalt bei höchstens 40 Prozent der monatlichen Bezugsgröße. Zweitens beziehst du bestimmte Sozialleistungen, zum Beispiel Hilfe zum Lebensunterhalt nach dem Zwölften Buch, Leistungen nach dem Zweiten Buch Sozialgesetzbuch, Leistungen der bedarfsorientierten Grundsicherung oder Ausbildungsförderung nach dem BAföG. Drittens trägt ein Träger der Sozialhilfe, der Sozialen Entschädigung oder der Soldatenentschädigung die Kosten deiner Heimunterbringung.',
        },
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale nennt als Anspruchsberechtigte Beziehende von Bürgergeld, BAföG, Sozialhilfe, Kriegsopferfürsorge und Grundsicherung im Alter sowie Heimbewohnerinnen und Heimbewohner, deren Unterbringung die Sozialhilfe oder die Kriegsopferfürsorge trägt. Bei den Einnahmen zählen auch die Einnahmen der anderen Angehörigen, die mit dir im gemeinsamen Haushalt leben.',
        },
      ],
    },
    {
      id: 'einkommensgrenze',
      heading: 'Wie hoch ist die Einkommensgrenze beim Härtefall 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für 2026 liegt die Grenze der monatlichen Bruttoeinnahmen bei 1.582,00 EUR, mit einem Angehörigen bei 2.175,25 EUR und für jeden weiteren Angehörigen im Haushalt um 395,50 EUR höher. Angehörige im Sinne der Regelung sind laut Verbraucherzentrale Eheleute, eingetragene Lebenspartnerinnen und Lebenspartner sowie familienversicherte Kinder. Die Zahlen folgen aus dem Gesetz: 40 Prozent der Bezugsgröße von 3.955 EUR im Monat, für den ersten Angehörigen 15 Prozent und für jeden weiteren 10 Prozent der Bezugsgröße obendrauf.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Einkommensgrenzen für die Härtefallregelung beim Zahnersatz 2026, monatliche Bruttoeinnahmen des Haushalts',
          head: ['Haushalt', 'Grenze je Monat 2026', 'Berechnung'],
          rows: [
            ['Ohne Angehörige', '1.582,00 EUR', '40 Prozent von 3.955 EUR'],
            ['Mit 1 Angehörigen', '2.175,25 EUR', 'plus 15 Prozent von 3.955 EUR (593,25 EUR)'],
            ['Mit 2 Angehörigen', '2.570,75 EUR', 'plus 10 Prozent von 3.955 EUR (395,50 EUR)'],
            ['Mit 3 Angehörigen', '2.966,25 EUR', 'plus weitere 395,50 EUR'],
            ['Jeder weitere Angehörige', 'plus 395,50 EUR', '10 Prozent von 3.955 EUR'],
          ],
          note: 'Quellen: SGB V § 55 Abs. 2 (Fassung bis 31.12.2026), Bezugsgröße 2026 laut Sozialversicherungsrechengrößen-Verordnung 2026 (3.955 EUR im Monat), KZV Land Brandenburg und Verbraucherzentrale für die Beträge. Die Spalte Berechnung ist eigene Rechnung aus Gesetz und Bezugsgröße.',
        },
        {
          type: 'paragraph',
          text: 'Die Grenze folgt der Bezugsgröße und wird deshalb jedes Jahr neu berechnet. Ob du darunter liegst, prüft deine Krankenkasse auf deinen Antrag.',
        },
      ],
    },
    {
      id: 'doppelt',
      heading: 'Was bedeutet doppelter Festzuschuss?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale spricht vom doppelten Festzuschuss und meint damit die volle Übernahme der Regelversorgung. Nach dem Gesetzestext zahlt die Kasse zusätzlich zum Festzuschuss einen Betrag von 40 Prozent der Regelversorgung, angepasst an die tatsächlichen Kosten und höchstens in Höhe der tatsächlich entstandenen Kosten. Der Festzuschuss beträgt 2026 60 Prozent, zusammen sind es 100 Prozent. Die Kasse zahlt also die Regelversorgung, aber nie mehr als deine Rechnung.',
        },
        {
          type: 'paragraph',
          text: 'Wählst du im Härtefall einen Zahnersatz, der über die Regelversorgung hinausgeht, zum Beispiel ein Implantat statt der Brücke, bekommst du nur den Festzuschuss und den Zusatzbetrag, zusammen wieder 100 Prozent der Regelversorgung. Die Mehrkosten zahlst du selbst (§ 55 Abs. 2 SGB V, Festzuschuss-Richtlinie Teil A Nr. 5).',
        },
      ],
    },
    {
      id: 'antrag',
      heading: 'Wie beantragst du die Härtefallregelung beim Zahnersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du musst den Härtefall beantragen. Das Formular gibt es bei deiner Krankenkasse oder in deiner Zahnarztpraxis. Eingetragen wird, welche Hilfe du bekommst, wie hoch dein Einkommen ist und wie viele Personen im Haushalt leben. Einkommensnachweise legst du in Kopie bei. Lehnt die Kasse ab, kannst du Widerspruch einlegen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zum Härtefall',
          items: [
            {
              title: 'Antrag stellen',
              text: 'Formular ausfüllen, Einkommensnachweise in Kopie beilegen, Haushaltsgröße und erhaltene Hilfen angeben.',
            },
            {
              title: 'Kasse prüft',
              text: 'Die KZBV schreibt, die Krankenkasse prüfe vor Beginn der Behandlung, ob ein Härtefall vorliegt. Mit der Behandlung soll erst begonnen werden, wenn sie den Heil- und Kostenplan genehmigt hat.',
            },
            {
              title: 'Behandlung und Abrechnung',
              text: 'Die Kasse übernimmt die Regelversorgung, höchstens deine tatsächlichen Kosten. Wer knapp über der Grenze liegt, reicht die Rechnung ein.',
            },
          ],
        },
      ],
    },
    {
      id: 'gleitend',
      heading: 'Was gilt, wenn dein Einkommen knapp über der Grenze liegt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dann gibt es die gleitende Härtefallregelung (§ 55 Abs. 3 SGB V). Die Kasse zahlt auf Antrag nach Vorlage der Rechnung einen zusätzlichen Betrag. Er ergibt sich so: Die Differenz zwischen deinen Bruttoeinnahmen und der Grenze wird mit drei multipliziert und vom Festzuschuss ohne Bonus abgezogen, bei einer Bewilligung bis Ende 2026 also von 60 Prozent der Regelversorgung. Bleibt ein positiver Betrag, zahlt ihn die Kasse zusätzlich. Insgesamt beteiligt sie sich höchstens in Höhe der Regelversorgung und nicht über deine tatsächlichen Kosten hinaus. Für diesen Antrag zählen nach der Verbraucherzentrale grundsätzlich die Bruttoeinnahmen in dem Monat vor der Eingliederung des Zahnersatzes.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Rechenbeispiel gleitende Härtefallregelung, Alleinstehende, Brücke für einen fehlenden Zahn, eigene Rechnung',
          head: ['Rechenschritt', 'Betrag'],
          rows: [
            ['Bruttoeinnahmen im Monat (Annahme)', '1.650,00 EUR'],
            ['Grenze 2026 für Alleinstehende', '1.582,00 EUR'],
            ['Differenz', '68,00 EUR'],
            ['Dreifaches der Differenz', '204,00 EUR'],
            ['Festzuschuss ohne Bonusheft, Befund 2.1', '552,96 EUR'],
            ['Zusätzlicher Betrag der Kasse', '348,96 EUR'],
          ],
          note: 'Eigene Rechnung nach § 55 Abs. 3 SGB V und der Beschreibung der KZV Land Brandenburg. Die Einnahmen von 1.650 EUR sind eine Annahme. Der Festzuschuss von 552,96 EUR ist der Betrag 2026 für einen fehlenden Zahn ohne Bonusheft, die Regelversorgung liegt bei 921,60 EUR. Ob und wie viel du bekommst, entscheidet deine Kasse.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt im Härtefall an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Beispiel stellt dieselbe Behandlung mit und ohne Härtefall nebeneinander, immer ohne Bonusheft. Die letzte Zeile zeigt ein Implantat im Härtefall.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Krone, Brücke und Implantat mit und ohne Härtefall',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung auf bis zu 1.000 EUR. Der Vertrag besteht schon, bevor der Zahn fehlt und die Behandlung angeraten wird.',
          caption: 'Eigenanteil mit und ohne Härtefall, Festzuschuss 2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Metallkrone, Regelversorgung 398,39 EUR, kein Härtefall', '239,03 EUR', '159,36 EUR', 'Der Tarif erstattet bis zu 159,36 EUR'],
            ['Dieselbe Krone im Härtefall', '398,39 EUR', 'nichts dazu', 'Nichts zu erstatten'],
            ['Metallbrücke, Regelversorgung 921,60 EUR, kein Härtefall', '552,96 EUR', '368,64 EUR', 'Der Tarif erstattet bis zu 368,64 EUR'],
            ['Dieselbe Brücke im Härtefall', '921,60 EUR', 'nichts dazu', 'Nichts zu erstatten'],
            ['Einzelzahn-Implantat mit Krone, 2.500 EUR, im Härtefall, erstes Kalenderjahr', '921,60 EUR', '1.578,40 EUR', '578,40 EUR bleiben, die Zahnstaffel greift'],
          ],
          note: 'Beispielrechnung, keine Preisangabe. Quellen: G-BA Festzuschuss-Richtlinie, Beträge ab 01.01.2026 (Befund 1.1 und 2.1, 100-Prozent-Spalte für den Härtefall), Verbraucherzentrale für die Implantat-Spanne von 1.500 bis 3.500 EUR (Stand 01.07.2024, Mitte gewählt, ohne Knochenaufbau). Die Beträge unter Du ohne Tarif und die Zeile mit Zahnstaffel sind eigene Rechnung. Annahmen: Die Rechnung entspricht genau der Regelversorgung, bei Vertragsbeginn war nichts angeraten oder geplant. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'ab-2027',
      heading: 'Was ändert sich beim Härtefall ab 2027?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228, Artikel 1 Nr. 22, in Kraft am 01.01.2027 nach Artikel 8 Abs. 2) senkt die Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, auf 50 Prozent der Regelversorgung. Mit lückenlosem Bonusheft sind es 60 oder 65 Prozent. Der Zusatzbetrag im Härtefall steigt dafür von 40 auf 50 Prozent. Damit zahlt die Kasse im Härtefall weiter 100 Prozent der Regelversorgung. Die Bonusstufen gelten für Versicherte mit Härtefallanspruch dann nicht mehr.',
        },
        {
          type: 'paragraph',
          text: 'Es zählt das Datum der Bewilligung, nicht der Behandlungsbeginn: Für alle vor dem 01.01.2027 bewilligten Festzuschüsse gilt die bisherige Fassung. An der Einkommensgrenze von 40 Prozent der Bezugsgröße ändert das Gesetz nichts, sie wird mit der Bezugsgröße des jeweiligen Jahres berechnet. Die Euro-Beträge der Regelversorgung für 2027 macht der G-BA bis zum 30. November bekannt (§ 56 Abs. 4 SGB V).',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Hilft eine Zahnzusatzversicherung im Härtefall?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Regelversorgung zahlt im Härtefall die Kasse. Ein Zahntarif kommt nur für das ins Spiel, was darüber hinausgeht. Bei der UKV ZahnPRIVAT 100 sind Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. ZahnPRIVAT 75 erstattet 75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Beide kommen ohne Wartezeiten aus. Eine pauschale Preiszusage gibt es nicht, der Beitrag hängt unter anderem vom Alter ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Die volle Übernahme gilt nur für die Regelversorgung.',
              text: 'Wünschst du Zahnersatz, der darüber hinausgeht, zahlst du auch als Härtefall selbst zu. Ob sich dafür ein Tarif rechnet, zeigt der Vergleich mit deinem Heil- und Kostenplan.',
            },
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
            {
              lead: 'Fehlen schon Zähne, gelten die Regeln von healio.de/zahn.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht.',
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
              icon: 'dental',
              tone: 'lavender',
              title: 'Zahnbrücke: Kosten, Festzuschuss und Eigenanteil',
              text: 'Die Regelversorgung bei einem fehlenden Zahn mit allen Beträgen.',
              to: '/ratgeber/zahnbruecke-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'family',
              tone: 'coral',
              title: 'Zahnprothese: Arten, Kosten und Eigenanteil',
              text: 'Teilprothese und Vollprothese mit den Beträgen je Kiefer.',
              to: '/ratgeber/zahnprothese-kosten',
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
      question: 'Wer hat Anspruch auf die Härtefallregelung beim Zahnersatz?',
      answer:
        'Anspruch hat, wer unzumutbar belastet würde: bei Bruttoeinnahmen bis 40 Prozent der Bezugsgröße, bei bestimmten Sozialleistungen wie Bürgergeld, BAföG oder Grundsicherung und bei Heimunterbringung auf Kosten von Sozialhilfe oder Sozialer Entschädigung. Die Kasse prüft das auf deinen Antrag.',
    },
    {
      question: 'Wie hoch ist die Einkommensgrenze beim Härtefall 2026?',
      answer:
        'Für Alleinstehende 1.582,00 EUR brutto im Monat, mit einem Angehörigen 2.175,25 EUR und für jeden weiteren Angehörigen im Haushalt 395,50 EUR mehr. Die Grenze entspricht 40 Prozent der Bezugsgröße 2026 von 3.955 EUR, plus 15 Prozent für den ersten und 10 Prozent für jeden weiteren Angehörigen.',
    },
    {
      question: 'Was bedeutet doppelter Festzuschuss?',
      answer:
        'Gemeint ist die volle Übernahme der Regelversorgung. Zusätzlich zum Festzuschuss von 60 Prozent zahlt die Kasse 2026 einen Betrag von 40 Prozent, höchstens aber die tatsächlichen Kosten. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, sind es 50 plus 50 Prozent.',
    },
    {
      question: 'Wie stelle ich den Härtefallantrag für den Zahnersatz?',
      answer:
        'Das Formular bekommst du bei deiner Krankenkasse oder in der Zahnarztpraxis. Du trägst ein, welche Hilfe du erhältst, wie hoch dein Einkommen ist und wie viele Personen im Haushalt leben, und legst Einkommensnachweise in Kopie bei. Die Kasse prüft den Antrag, bei Ablehnung kannst du Widerspruch einlegen.',
    },
    {
      question: 'Zahlt die Kasse im Härtefall auch ein Implantat?',
      answer:
        'Nur bis zur Regelversorgung. Festzuschuss und Zusatzbetrag ergeben zusammen 100 Prozent der Regelversorgung des Befunds, bei einem fehlenden Zahn 2026 921,60 EUR. Für das Implantat selbst zahlt die Kasse nur in seltenen Ausnahmefällen. Alles über die Regelversorgung hinaus zahlst du selbst.',
    },
    {
      question: 'Was ändert sich 2027 beim Härtefall?',
      answer:
        'Der Zusatzbetrag steigt von 40 auf 50 Prozent, der Festzuschuss sinkt auf 50 Prozent, zusammen bleiben es 100 Prozent der Regelversorgung. Es zählt das Datum der Bewilligung. Die Einkommensgrenze bleibt bei 40 Prozent der Bezugsgröße.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Frag deine Krankenkasse oder deine Praxis nach dem Antrag auf die Härtefallregelung, bevor die Behandlung beginnt, und leg die Einkommensnachweise bereit. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
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
    intro: 'Voraussetzungen und Prozentsätze stammen aus dem Gesetz, die Einkommensgrenzen aus der Bezugsgröße und den Auskünften von Verbraucherzentrale und KZV.',
    items: [
      {
        label: 'SGB V § 55 Leistungsanspruch auf Festzuschüsse beim Zahnersatz, Absätze 2 und 3',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: 'Fassung bis 31.12.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228, Artikel 1 Nr. 22 und Artikel 8 Abs. 2',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz (Verkündung)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026, ausgegeben 29.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Härtefallregelung beim Zahnersatz: Wer hat Anspruch?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerzte-und-kliniken/haertefallregelung-beim-zahnersatz-wer-hat-anspruch-12887',
        stand: '27.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'ZE-Härtefallregelung / Einkommensgrenzen 2026',
        publisher: 'Kassenzahnärztliche Vereinigung Land Brandenburg',
        href: 'https://www.kzvlb.de/fileadmin/user_upload/Seiteninhalte/Service/Downloadcenter/Uebersichten/2026/ZE-H%C3%A4rtefallregelung_2026.pdf',
        stand: '24.11.2025',
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
        label: 'Festzuschuss-Richtlinie, Teil A Nr. 4 und 5, Teil B Befunde 1.1 und 2.1',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/richtlinien/27/',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Die Sozialversicherungsrechengrößen 2026 (Bezugsgröße 3.955 EUR im Monat)',
        publisher: 'Deutsche Rentenversicherung Knappschaft-Bahn-See',
        href: 'https://www.deutsche-rentenversicherung.de/KnappschaftBahnSee/DE/Aktuelles/Meldungen/2026/2026_01_02_Sozialversicherungsrechengroessen2026.html',
        stand: '02.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Brücke, Krone, Implantat: Welche Unterschiede gibt es beim Zahnersatz?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/bruecke-krone-implantat-welche-unterschiede-gibt-es-beim-zahnersatz-7925',
        stand: '01.07.2024',
        accessedAt: '07.10.2026',
        note: 'Spanne für das Einzelzahn-Implantat',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/zahn.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Härtefallregelung nach den genannten Quellen vom 7. Oktober 2026. Ob ein Härtefall vorliegt, prüft deine Krankenkasse, maßgeblich sind immer ihr Bescheid und die Bedingungen des Versicherers.',
};

export default article;
