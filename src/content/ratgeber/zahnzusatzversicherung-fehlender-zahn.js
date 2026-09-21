/**
 * Ratgeberartikel 1: Zahnzusatzversicherung bei fehlendem Zahn.
 *
 * Quelle: Healio/Ratgeber/artikel-ratgeber-01-fehlender-zahn.md, Stand
 * 21.09.2026. Die Abschnitte "Belege" und "Offen" der Markdown-Quelle
 * kommen bewusst NICHT auf die Seite, sie bleiben Arbeitsunterlage.
 *
 * Abweichungen von der Quelle, alle bewusst:
 *   - Anrede durchgehend klein (du, dir, dein), die Quelle schreibt Du gross.
 *   - "Sie fragt angeratenen Zahnersatz nicht ab" wurde zu "Die LKH fragt
 *     ...", weil im Ratgeber kein "Sie" stehen darf (Anredeverwechslung).
 *   - "in unserer Belegkette" wurde zu einer Formulierung ohne internes
 *     Vokabular.
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
              text: 'gegen einen monatlichen Zuschlag je Zahn: 6,10 EUR im 75er, 9,00 EUR im 90er, 10,90 EUR im 100er. Ab dem vierten fehlenden Zahn ist eine Aufnahme nicht möglich.',
            },
            {
              lead: 'Bei der Bayerischen beendet schon ein fehlender Zahn den Antrag.',
              text: 'Die Annahmerichtlinien mit Stand 11.2025 bieten dafür ausdrücklich weder Zuschläge noch Leistungsausschlüsse an.',
            },
            {
              lead: 'Weisheitszähne zählen nie als fehlender Zahn.',
              text: 'Ein vollständiger Lückenschluss und eine zahnärztlich bestätigte Freiendsituation ebenfalls nicht.',
            },
            {
              lead: 'Fehlender Zahn und angeratener Ersatz sind zwei verschiedene Fragen.',
              text: 'Ist die Versorgung der Lücke bereits empfohlen, greift bei der UKV die separate Behandlungsfrage, und der Abschluss kommt nicht zustande.',
            },
            {
              lead: 'Der Baustein ZAHN Sofort der Bayerischen',
              text: 'leistet für angeratene und begonnene Behandlungen 750 EUR je Kalenderjahr und höchstens 1.500 EUR insgesamt, kostet 29,90 EUR im Monat zusätzlich zum Trägertarif und endet nach 24 Monaten.',
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
          text: 'Ja, wenn du beim passenden Versicherer landest und die Lücke noch nicht in Behandlung oder angeraten ist. Der UKV-Antrag stellt die Frage schlicht: "Fehlen Zähne, die noch nicht ersetzt sind?" Bei einem Ja trägst du die Anzahl ein. Bis zu drei Zähne führen zu einem Zuschlag, ab dem vierten steht im Antrag: "Eine Aufnahme ist nicht möglich."',
        },
        {
          type: 'paragraph',
          text: 'Wichtig ist, was der Zuschlag bedeutet. Der zuständige Betreuer der UKV hat am 31.07.2026 schriftlich bestätigt, dass die bezuschlagten Zähne voll mitversichert sind und die Zahnstaffel ungekürzt bleibt. Das ist nicht selbstverständlich: Andere Anbieter versichern eine Lücke formal mit, schließen sie aber über die Bedingungen wieder aus.',
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
          caption: 'Zuschläge und Grenzen bei fehlenden Zähnen',
          head: ['Anbieter', 'Fehlende Zähne', 'Zuschlag je Zahn und Monat', 'Grenze'],
          rows: [
            ['UKV ZahnPRIVAT 75', 'bis 3', '6,10 EUR', 'ab dem 4. Zahn keine Aufnahme'],
            ['UKV ZahnPRIVAT 90', 'bis 3', '9,00 EUR', 'ab dem 4. Zahn keine Aufnahme'],
            ['UKV ZahnPRIVAT 100', 'bis 3', '10,90 EUR', 'ab dem 4. Zahn keine Aufnahme'],
            ['die Bayerische ZAHN', 'ab 1', 'kein Zuschlag vorgesehen', 'Antrag nicht möglich'],
            ['LKH ZahnUpgrade', 'bis 3', 'rund 5 EUR (Portalangabe, nicht bestätigt)', 'ab dem 4. Zahn Ablehnung'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Drei fehlende Zähne im UKV-Tarif 100 bedeuten also 32,70 EUR Zuschlag im Monat, zusätzlich zum regulären Beitrag. Die LKH-Angabe von rund 5 EUR je Zahn stammt aus Vergleichsportalen und ist uns nicht über Annahmerichtlinien bestätigt worden. Ob dort bezuschlagte Zähne ebenfalls voll mitversichert sind, ist offen.',
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
              text: 'Fehlende Achter zählen bei beiden Versicherern nicht als fehlender Zahn. Auch Milchzähne bleiben im UKV-Antrag außen vor.',
            },
            {
              lead: 'Lückenschluss.',
              text: 'Ist die Lücke zugewandert, zählt sie nicht mit. Bei der Bayerischen gilt das ausdrücklich auch für einen unvollständigen Lückenschluss, sofern kein Zahnersatz mehr in die Restlücke passt. Dein Zahnarzt muss das bestätigen.',
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
          text: 'Das ist der Punkt, an dem die meisten Anträge scheitern. "Fehlender Zahn versicherbar" bedeutet nicht "geplanter Zahnersatz wird bezahlt".',
        },
        {
          type: 'paragraph',
          text: 'Bei der UKV gibt es neben der Lückenfrage eine zweite, breitere Frage: ob aktuell eine Zahnersatz- oder Zahnbehandlung läuft, beabsichtigt ist oder in den letzten zwei Jahren zahnärztlich empfohlen wurde. Ein Ja dort führt nicht zu einem Zuschlag, sondern zu keinem Abschluss. Die unversorgte Lücke ist also versicherbar, solange der Ersatz für sie noch nicht angeraten ist.',
        },
        {
          type: 'paragraph',
          text: 'Bei der Bayerischen gilt für Anratungen ein Zwei-Jahres-Fenster: Angeraten ist eine Behandlung, wenn der Behandler konkreten Handlungsbedarf angemeldet hat. Ältere Anratungen zählen nicht mehr. Gefragt wird im Antrag nur nach angeratenen Extraktionen; ohne den Sofort-Baustein ist die laufende Baustelle über die Bedingungen ausgeschlossen.',
        },
        {
          type: 'paragraph',
          text: 'Ein dritter Weg ist die LKH. Die LKH fragt angeratenen Zahnersatz nicht ab, der Vertrag kommt also zustande, der laufende Fall bleibt aber über die Bedingungen ausgeschlossen. Du bist damit sofort für alles Künftige versichert, die angeratene Behandlung zahlt aber niemand. Das muss dir vorher klar sein.',
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
          text: 'Und hier schließt sich der Kreis zum fehlenden Zahn: Der Sofortschutz löst das Lückenproblem nicht. Er gehört zur Bayerischen, und die lehnt bei einer unversorgten Lücke ab. Wer eine Lücke und eine angeratene Versorgung gleichzeitig hat, findet in diesem Sortiment derzeit keinen Weg, der beides abdeckt.',
        },
      ],
    },
    {
      id: 'wartezeiten',
      heading: 'Gibt es Wartezeiten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der UKV sind über alle drei Tarifstufen keine Wartezeiten vorgesehen, bei der LKH ebenfalls nicht. Bei der Bayerischen nennen die Annahmerichtlinien für Smart und Komfort sechs Monate für Zahnbehandlung, Zahnersatz und Kieferorthopädie, mit der Möglichkeit eines Verzichts per Hinweis im Antrag und Versicherungsschein; Prestige ist ohne Wartezeit geführt. Einen Wartezeiterlass gegen ärztliches Zeugnis gibt es nicht. Prüfe deshalb, was in deinem konkreten Versicherungsschein steht.',
        },
      ],
    },
    {
      id: 'kassenbonus',
      heading: 'Wie trägt der Kassenbonus den Beitrag mit?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Viele gesetzliche Krankenkassen zahlen einen Bonus für Vorsorge, Impfungen und Sport. Bei der IKK classic kannst du diesen Bonus statt als Geld auch als zweckgebundenen Zuschuss in dreifacher Höhe wählen, und der Jahresbeitrag einer privaten Krankenzusatzversicherung gehört dort zu den zuschussfähigen Leistungen. Ausgezahlt wird höchstens so viel, wie du an eigenen Kosten nachweist, ein Plus entsteht also nie.',
        },
        {
          type: 'paragraph',
          text: 'Die Rechnung lautet: Grundbeitrag plus möglicher Sofortbeitrag minus individuell anrechenbarer Bonus ergibt deine verbleibende Belastung. Wie hoch der Bonus ausfällt, hängt von deiner Kasse, deinen nachgewiesenen Aktivitäten und deinen tatsächlichen Kosten ab. Gegenzurechnen ist immer auch der Zusatzbeitrag der jeweiligen Kasse.',
        },
      ],
    },
  ],

  factNugget:
    'Healio kombiniert Kassenbonusprogramme mit Zusatzversicherungen zu einem Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus ist jährlich; im besten Fall deckt er den Beitrag ganz, in den meisten Fällen zum großen Teil. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie viele fehlende Zähne werden noch versichert?',
      answer:
        'Bei der UKV bis zu drei, jeweils gegen einen Zuschlag; ab dem vierten ist eine Aufnahme nicht möglich. Bei der Bayerischen ist bereits ein fehlender Zahn ein Ausschlussgrund.',
    },
    {
      question: 'Zählt ein fehlender Weisheitszahn?',
      answer:
        'Nein. Fehlende Weisheitszähne zählen bei beiden Versicherern nicht als fehlender Zahn, bei der UKV ebenso wenig Milchzähne.',
    },
    {
      question: 'Ist der bezuschlagte Zahn auch wirklich mitversichert?',
      answer:
        'Bei der UKV ja, nach schriftlicher Bestätigung des Betreuers vom 31.07.2026, und die Zahnstaffel bleibt ungekürzt. Für die LKH liegt uns dazu keine Bestätigung des Versicherers vor.',
    },
    {
      question: 'Zahlt eine Zusatzversicherung den bereits angeratenen Zahnersatz?',
      answer:
        'In der Regel nicht. Nur der Baustein ZAHN Sofort leistet dafür, begrenzt auf 750 EUR je Kalenderjahr und 1.500 EUR insgesamt, und nur solange keine Rechnung gestellt wurde. Voraussetzung bleibt, dass die Bayerische dich annimmt.',
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
      { text: ', wie der Kassenbonus den Beitrag mitträgt, steht im ' },
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
