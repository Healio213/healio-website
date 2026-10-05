/**
 * Ratgeberartikel 1: Zahnzusatzversicherung bei fehlendem Zahn.
 *
 * Quelle: Healio/Ratgeber/artikel-ratgeber-01-fehlender-zahn.md, Stand
 * 21.09.2026. Die Abschnitte "Belege" und "Offen" der Markdown-Quelle
 * kommen bewusst NICHT auf die Seite, sie bleiben Arbeitsunterlage.
 *
 * Abweichungen von der Quelle, alle bewusst:
 *   - Anrede durchgehend klein (du, dir, dein), die Quelle schreibt Du gross.
 *   - "in unserer Belegkette" wurde zu einer Formulierung ohne internes
 *     Vokabular.
 *   - Stand 05.10.2026 (Franks Entscheidung): Der frühere dritte Zahn-Weg ist
 *     entfernt. Lücken laufen über die UKV mit Zuschlag je Zahn, die Bayerische
 *     bleibt nur für den Sofortschutz. UKV-Fakten geprüft am 05.10.2026 (Antrag
 *     FNR342759, Ausgabe 06.2026; Tarif Teil II, Stand 01.08.2024). Zur
 *     Behandlungsfrage im Antrag steht bewusst keine Aussage, was die UKV dann
 *     entscheidet, sondern nur der Hinweis, vorher mit uns zu sprechen.
 *
 * Inhaltliche Grenzen: keine Garantien, keine erfundenen Beitraege, keine
 * persoenliche Bonuszahl. Tarifbeitraege stehen bewusst nicht im Text.
 */

export const article = {
  slug: 'zahnzusatzversicherung-fehlender-zahn',
  kind: 'ratgeber',

  metaTitle: 'Zahnzusatzversicherung bei fehlendem Zahn | Healio',
  metaDescription:
    'Fehlender Zahn und Zahnzusatzversicherung: welcher Versicherer bis zu drei Lücken annimmt, was ein Zuschlag kostet und wo der Sofortschutz endet.',

  publishedAt: '2026-09-22',
  publishedAtLabel: '22. September 2026',
  readingTimeMinutes: 6,

  listTitle: 'Zahnzusatzversicherung bei fehlendem Zahn: was noch geht und was nicht',
  listTeaser:
    'Ein Versicherer nimmt bis zu drei Lücken an, ein anderer lehnt schon bei einer ab. Und angeratener Ersatz ist noch einmal eine ganz andere Frage.',

  headline: 'Zahnzusatzversicherung bei fehlendem Zahn: was noch geht und was nicht',
  lead:
    'Mit einer nicht ersetzten Zahnlücke ist eine Zahnzusatzversicherung weiterhin möglich, aber nicht bei jedem Anbieter. Die UKV nimmt laut ihrem Antrag bis zu drei fehlende Zähne gegen einen festen Zuschlag je Zahn an, die Bayerische lehnt nach ihren Annahmerichtlinien mit Stand 11.2025 bereits bei einem einzigen fehlenden Zahn ab. Entscheidend ist dabei eine zweite Frage, die viele übersehen: ob der Ersatz für genau diese Lücke schon zahnärztlich angeraten ist. Dafür gelten andere Regeln als für die Lücke selbst.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'UKV ZahnPRIVAT nimmt bis zu drei fehlende Zähne an,',
              text: 'gegen einen monatlichen Zuschlag je Zahn: 6,10 EUR im 75er, 9,00 EUR im 90er, 10,90 EUR im 100er. Danach sind die Lückenzähne mitversichert, es gilt die normale Zahnstaffel. Ab dem vierten fehlenden Zahn ist eine Aufnahme nicht möglich.',
            },
            {
              lead: 'Bei der Bayerischen beendet schon ein fehlender Zahn den Antrag.',
              text: 'Die Annahmerichtlinien mit Stand 11.2025 bieten dafür ausdrücklich weder Zuschläge noch Leistungsausschlüsse an.',
            },
            {
              lead: 'Weisheitszähne zählen bei UKV und der Bayerischen nicht als fehlender Zahn.',
              text: 'Ein vollständiger Lückenschluss und eine zahnärztlich bestätigte Freiendsituation ebenfalls nicht.',
            },
            {
              lead: 'Fehlender Zahn und angeratener Ersatz sind zwei verschiedene Fragen.',
              text: 'Ist die Versorgung der Lücke schon geplant oder empfohlen, fragt der UKV-Antrag das gesondert ab. Sprich in diesem Fall vor dem Antrag mit uns.',
            },
            {
              lead: 'Der Baustein ZAHN Sofort der Bayerischen',
              text: 'leistet für angeratene und begonnene Behandlungen höchstens 750 EUR je Kalenderjahr und höchstens 1.500 EUR insgesamt, kostet 29,90 EUR im Monat zusätzlich zum Trägertarif und endet nach 24 Monaten.',
            },
          ],
        },
      ],
    },
    {
      id: 'annahme',
      heading: 'Bekomme ich eine Zahnzusatzversicherung mit fehlendem Zahn?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, das ist möglich, wenn du beim passenden Versicherer landest und die Gesundheitsfragen des Antrags passen. Der UKV-Antrag stellt die Frage schlicht: "Fehlen Zähne, die noch nicht ersetzt sind?" Bei einem Ja trägst du die Anzahl ein. Bis zu drei Zähne führen zu einem Zuschlag, ab dem vierten steht im Antrag: "Eine Aufnahme ist nicht möglich."',
        },
        {
          type: 'paragraph',
          text: 'Wichtig ist, was der Zuschlag bedeutet. Nach Auskunft des zuständigen Maklerbetreuers der UKV sind die bezuschlagten Zähne danach mitversichert. Es gilt die normale Zahnstaffel, ein eigener Deckel für die Lücke ist nicht vorgesehen. Maßgeblich bleiben die Versicherungsbedingungen, die dir vor Antragstellung vorliegen. Das ist nicht selbstverständlich: Andere Anbieter versichern eine Lücke formal mit, schließen sie aber über die Bedingungen wieder aus.',
        },
        {
          type: 'paragraph',
          text: 'Bei der Bayerischen ist die Lage eindeutig. Die Annahmerichtlinien B 333546 sagen, dass bei einem fehlenden Zahn ein Abschluss nicht möglich ist. Ältere Ratgeber nennen noch 40 Prozent Zuschlag je Zahn für bis zu drei Zähne. Diese Angabe stammt aus der Fassung 06/2023 und ist überholt.',
        },
      ],
    },
    {
      id: 'zuschlag',
      heading: 'Was kostet ein fehlender Zahn als Zuschlag?',
      blocks: [
        {
          type: 'table',
          caption: 'Zuschläge und Grenzen bei fehlenden Zähnen, UKV-Antrag Ausgabe 06.2026, Annahmerichtlinien der Bayerischen Stand 11.2025',
          head: ['Anbieter', 'Fehlende Zähne', 'Zuschlag je Zahn und Monat', 'Grenze'],
          rows: [
            ['UKV ZahnPRIVAT 75', 'bis 3', '6,10 EUR', 'ab dem 4. Zahn keine Aufnahme'],
            ['UKV ZahnPRIVAT 90', 'bis 3', '9,00 EUR', 'ab dem 4. Zahn keine Aufnahme'],
            ['UKV ZahnPRIVAT 100', 'bis 3', '10,90 EUR', 'ab dem 4. Zahn keine Aufnahme'],
            ['die Bayerische ZAHN', 'ab 1', 'kein Zuschlag vorgesehen', 'Antrag nicht möglich'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Drei fehlende Zähne im UKV-Tarif 100 bedeuten also 32,70 EUR Zuschlag im Monat, zusätzlich zum regulären Beitrag. Die Zuschläge stammen aus dem UKV-Antrag in der Ausgabe 06.2026, deinen aktuellen Beitrag erhältst du vor Antragstellung.',
        },
      ],
    },
    {
      id: 'ausnahmen',
      heading: 'Wann zählt eine Lücke gar nicht als fehlender Zahn?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Drei Ausnahmen entscheiden häufiger über die Annahme als der Zuschlag selbst:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            {
              lead: 'Weisheitszähne.',
              text: 'Fehlende Achter zählen bei der UKV und bei der Bayerischen nicht als fehlender Zahn. Auch Milchzähne bleiben im UKV-Antrag außen vor.',
            },
            {
              lead: 'Lückenschluss.',
              text: 'Ist die Lücke vollständig zugewandert, zählt sie nicht mit. Bei der Bayerischen gilt das ausdrücklich auch für einen unvollständigen Lückenschluss, sofern kein Zahnersatz mehr in die Restlücke passt; die UKV nennt dagegen nur den vollständigen Lückenschluss. Dein Zahnarzt muss das bestätigen.',
            },
            {
              lead: 'Freiendsituation.',
              text: 'Fehlen Zähne ab dem Siebener am Reihenende, bleibt die Bayerische möglich, wenn der Zahnarzt bestätigt, dass diese Zähne nicht ersetzt werden können.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wer mit einer alten Lücke schon aufgegeben hat, sollte also zuerst klären, ob sie im Sinne der Bedingungen überhaupt zählt.',
        },
      ],
    },
    {
      id: 'angeraten',
      heading: 'Was ist der Unterschied zwischen fehlendem Zahn und angeratenem Ersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das ist der Punkt, den viele übersehen. "Fehlender Zahn versicherbar" bedeutet nicht "geplanter Zahnersatz wird bezahlt".',
        },
        {
          type: 'paragraph',
          text: 'Bei der UKV gibt es neben der Lückenfrage eine zweite, breitere Frage: ob aktuell eine Zahnersatz- oder Zahnbehandlung läuft, beabsichtigt ist oder in den letzten zwei Jahren zahnärztlich empfohlen wurde. Ist die Versorgung deiner Lücke schon geplant oder empfohlen, sprich deshalb vor dem Antrag mit uns, damit wir deine Situation gemeinsam einordnen.',
        },
        {
          type: 'paragraph',
          text: 'Bei der Bayerischen gilt für Anratungen ein Zwei-Jahres-Fenster: Angeraten ist eine Behandlung, wenn der Behandler konkreten Handlungsbedarf angemeldet hat. Ältere Anratungen zählen nicht mehr. Gefragt wird im Antrag nur nach angeratenen Extraktionen; ohne den Sofort-Baustein ist die laufende Baustelle über die Bedingungen ausgeschlossen.',
        },
      ],
    },
    {
      id: 'sofortschutz',
      heading: 'Was leistet der Sofortschutz und wo hört er auf?',
      blocks: [
        {
          type: 'paragraph',
          text: 'ZAHN Sofort ist ein Zusatzbaustein der Bayerischen für Behandlungen, die schon angeraten oder begonnen sind. Die Eckdaten aus dem offiziellen Highlightblatt:',
        },
        {
          type: 'list',
          items: [
            '29,90 EUR im Monat, zusätzlich zum Trägertarif, Beitrag für 24 Monate fest',
            'höchstens 750 EUR je Kalenderjahr, höchstens 1.500 EUR insgesamt',
            'kein Übertrag unverbrauchter Beträge ins nächste Jahr',
            'Ende automatisch nach 24 Monaten, der Trägertarif läuft danach weiter',
          ],
        },
        {
          type: 'paragraph',
          text: 'Zwei Grenzen sind wichtiger als die Beträge. Erstens ist die zeitliche Grenze die Rechnungsstellung: Was zum Versicherungsbeginn bereits in Rechnung gestellt wurde, ist raus. Zweitens ist der Baustein nur beim erstmaligen Vertragsbeginn und nur zusammen mit einem Trägertarif wählbar, nicht nachträglich.',
        },
        {
          type: 'paragraph',
          text: 'Und hier schließt sich der Kreis zum fehlenden Zahn: Der Sofortschutz löst das Lückenproblem nicht. Er gehört zur Bayerischen, und die lehnt bei einer unversorgten Lücke ab. Wer eine Lücke und eine angeratene Versorgung gleichzeitig hat, sollte deshalb vor einem Antrag mit uns sprechen.',
        },
      ],
    },
    {
      id: 'wartezeiten',
      heading: 'Gibt es Wartezeiten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der UKV sind über alle drei Tarifstufen keine Wartezeiten vorgesehen. In den ersten drei Kalenderjahren begrenzt dort eine Zahnstaffel die Erstattung: in ZahnPRIVAT 90 und 100 bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, in ZahnPRIVAT 75 entsprechend bis 1.000, 2.000 und 3.000 EUR. Danach ist die Erstattung unbegrenzt, bei Unfall gilt keine Staffel. Bei der Bayerischen nennen die Annahmerichtlinien für Smart und Komfort sechs Monate für Zahnbehandlung, Zahnersatz und Kieferorthopädie, mit der Möglichkeit eines Verzichts per Hinweis im Antrag und Versicherungsschein; Prestige ist ohne Wartezeit geführt. Einen Wartezeiterlass gegen ärztliches Zeugnis sieht die Bayerische nicht vor, die Wartezeiten sind dort an den Tarif gebunden. Prüfe deshalb, was in deinem konkreten Versicherungsschein steht.',
        },
      ],
    },
    {
      id: 'kassenbonus',
      heading: 'Wie trägt der Kassenbonus den Beitrag mit?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Viele gesetzliche Krankenkassen zahlen einen Bonus für Vorsorge, Impfungen und Sport. Bei der IKK classic kannst du diesen Bonus statt als Geld auch als zweckgebundenen Zuschuss in dreifacher Höhe wählen, und der Jahresbeitrag einer privaten Krankenzusatzversicherung gehört dort zu den zuschussfähigen Leistungen. Ausgezahlt wird höchstens so viel, wie du an eigenen Kosten nachweist, ein Plus entsteht also nie. Beantragen musst du den Bonus für 2026 bis zum 31.03.2027, danach verfällt der Anspruch; jedes Familienmitglied stellt einen eigenen Antrag mit eigenem Kostendeckel.',
        },
        {
          type: 'paragraph',
          text: 'Die Rechnung lautet: Grundbeitrag plus möglicher Sofortbeitrag minus individuell anrechenbarer Bonus ergibt deine verbleibende Belastung. Wie hoch der Bonus ausfällt, hängt von deiner Kasse, deinen nachgewiesenen Aktivitäten und deinen tatsächlichen Kosten ab. Gegenzurechnen ist immer auch der Zusatzbeitrag der jeweiligen Kasse.',
        },
      ],
    },
  ],

  factNugget:
    'Healio kombiniert Kassenbonusprogramme mit Zusatzversicherungen zu einem Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren. Der Bonus wird jährlich beantragt und fließt als zweckgebundener Zuschuss in den Zusatzschutz. Bei der IKK classic sind laut Satzung bis zu 1.155 EUR Zuschusswert im Jahr möglich, das ist ein theoretischer Höchstwert; in der breiten Masse kommen 400 bis 700 EUR zusammen, abhängig von Kasse, nachgewiesenen Maßnahmen und tatsächlichen eigenen Kosten. Ausgezahlt wird höchstens in Höhe der nachgewiesenen Kosten, gegenzurechnen ist der Zusatzbeitrag der Kasse. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie viele fehlende Zähne werden noch versichert?',
      answer:
        'Bei der UKV bis zu drei, jeweils gegen einen Zuschlag; ab dem vierten ist eine Aufnahme nicht möglich. Bei der Bayerischen ist bereits ein fehlender Zahn ein Ausschlussgrund.',
    },
    {
      question: 'Zählt ein fehlender Weisheitszahn?',
      answer:
        'Bei der UKV und bei der Bayerischen nein, dort zählen fehlende Weisheitszähne nicht als fehlender Zahn, bei der UKV ebenso wenig Milchzähne. Für andere Anbieter musst du die jeweiligen Annahmerichtlinien prüfen.',
    },
    {
      question: 'Ist der bezuschlagte Zahn auch wirklich mitversichert?',
      answer:
        'Ja. Nach Auskunft des zuständigen Maklerbetreuers der UKV sind die bezuschlagten Zähne mitversichert, es gilt die normale Zahnstaffel ohne eigenen Deckel für die Lücke. Ist der Ersatz für die Lücke schon geplant oder empfohlen, sprich vor dem Antrag mit uns. Maßgeblich sind die Versicherungsbedingungen.',
    },
    {
      question: 'Zahlt eine Zusatzversicherung den bereits angeratenen Zahnersatz?',
      answer:
        'In der Regel nicht. Im Healio-Sortiment leistet dafür allein der Baustein ZAHN Sofort der Bayerischen, begrenzt auf höchstens 750 EUR je Kalenderjahr und höchstens 1.500 EUR insgesamt, und nur solange für die Behandlung noch keine Rechnung gestellt wurde. Am Markt gibt es vergleichbare Sofortbausteine auch bei anderen Anbietern. Voraussetzung bleibt, dass die Bayerische dich annimmt.',
    },
    {
      question: 'Was passiert nach den 24 Monaten Sofortschutz?',
      answer:
        'Der Baustein endet automatisch und sein Beitrag von 29,90 EUR entfällt. Der Trägertarif läuft normal weiter.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      {
        text: 'Welcher Weg bei deiner konkreten Lücke offensteht, klärt sich am schnellsten mit einer Annahmeprüfung vor dem Antrag. Die Tarifweiche dafür findest du auf ',
      },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Ist die Versorgung deiner Lücke schon geplant, sprich vorher über die ' },
      { text: 'Kontaktseite', to: '/kontakt' },
      { text: ' mit uns. Ob dein Kassenbonus den Beitrag mitträgt, rechnest du im ' },
      { text: 'Ratgeber zum IKK-Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
      { text: ', und welche Kasse in deinem Fall am meisten zahlt, vergleichst du quellenbelegt auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Annahmeregeln nach dem Stand der genannten Unterlagen, maßgeblich sind immer die Bedingungen des Versicherers.',
};

export default article;
