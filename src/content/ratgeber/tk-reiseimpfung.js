/**
 * Ratgeber-Serie, Feld Vorsorge (group 'vorsorge'), Seite: TK Reiseimpfungen.
 * Hauptbegriff "tk reiseimpfungen", Angebotspfad /ambulant.
 *
 * Sperrlisten: KEIN Kandidat (Entscheidung der Marktanalyse-Sitzung
 * 07.10.2026). /ratgeber/tk-reiseimpfung kommt nicht in
 * GOOGLE_ADS_EXCLUDED_PATHS und ANALYTICS_EXCLUDED_PATHS.
 *
 * Faktenprüfung 07.10.2026 (PRÜFBERICHT-brille-vorsorge.md): tk.de-Seiten
 * (22.01., 06.02., 19.03., 27.07.2026) und § 20i SGB V nachgelesen. Zuzahlung
 * heute 10 Prozent, mindestens 5, höchstens 10 EUR; die TK verweist auf die
 * gesetzliche Zuzahlung (Satzung § 19 Abs. 2, § 31 Abs. 3 SGB V), ab
 * 01.01.2027 gilt der neue § 61 SGB V mit mindestens 7,50 und höchstens
 * 15 EUR (BGBl. 2026 I Nr. 228, Art. 1 Nr. 23, Art. 8 Abs. 2). TK-Bonus:
 * Schutzimpfung 1.000 Punkte (KassenBoost tk-bonus-2026.server.ts, Anlage 3).
 * Statusangabe wie Zahn-Welle 1.
 *
 * Quellen (Belege: tk-reiseimpfung.belege.md, Abruf 07.10.2026):
 * TK-Satzung Stand 17.04.2026 (§ 19 Abs. 1 und 2, selbst gelesen), tk.de
 * (Voraussetzungen 22.01.2026, Kosten 27.07.2026, Rechnung einreichen
 * 19.03.2026, Zuzahlung 06.02.2026), SGB V § 20i Abs. 1 und 2 (Pflichtleistung
 * nur bei beruflich oder durch Ausbildung bedingtem Aufenthalt, private
 * Reisen als Satzungsleistung). Tarifaussagen wortgleich mit ambulant.json
 * (vorsorgeBaustein, Abschnitt "Immer mit drin" und "Passt gut für").
 *
 * Bewusste Grenzen:
 *   - Nur die TK. Andere Kassen regeln Reiseimpfungen in ihrer eigenen
 *     Satzung; die Seite sagt das und vergleicht nicht.
 *   - Keine Impfempfehlung je Reiseland, keine Aussage, welche Impfung du
 *     brauchst. Das entscheidet die Ärztin oder der Arzt, die STIKO empfiehlt.
 *   - Die Beispielrechnung zur Zuzahlung nutzt angenommene Impfstoffpreise
 *     (30, 80, 150 EUR) und ist als eigene Rechnung gekennzeichnet.
 *   - Beratung zu Klima und Ernährung im Reiseland zahlt die TK nicht, steht
 *     so auf tk.de.
 */

export const article = {
  slug: 'tk-reiseimpfung',
  kind: 'ratgeber',
  group: 'vorsorge',

  metaTitle: 'TK Reiseimpfungen: Kostenerstattung und Einreichen | Healio',
  metaDescription:
    'TK Reiseimpfungen: Die Techniker erstattet STIKO-empfohlene Impfungen für private Reisen. Mit Zuzahlung, Liste der Impfungen und Weg zum Einreichen der Rechnung.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 8,

  listTitle: 'TK und Reiseimpfungen: Kostenerstattung und Einreichen',
  listTeaser:
    'Welche Reiseimpfungen die Techniker erstattet, was du zuzahlst und welche Unterlagen du einreichst, mit Fundstelle in der Satzung.',

  headline: 'TK Reiseimpfungen: was die Techniker erstattet und wie du die Rechnung einreichst',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'prevention',
    tone: 'sky',
    facts: [
      { value: 'private Auslandsreise', label: 'und STIKO-Empfehlung sind die Voraussetzung' },
      { value: 'Impfleistung voll', label: 'erstattet die TK, beim Impfstoff zahlst du 2026 noch 5 bis 10 EUR' },
      { value: 'Meine TK oder App', label: 'für Rezept, Impfstoff- und Arztrechnung' },
    ],
    text: 'Reiseimpfungen für private Reisen sind keine gesetzliche Pflichtleistung. Die TK zahlt sie freiwillig über ihre Satzung.',
    path: { to: '/ambulant', text: 'Impfungen im Tarif mitversichern? Mehr erfahren', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Die TK erstattet Reiseimpfungen, wenn du sie für eine private Auslandsreise brauchst, die Ständige Impfkommission (STIKO) sie empfiehlt und die Impfung in einer kassenärztlichen Praxis oder beim Gesundheitsamt stattfindet. Die ärztliche Leistung zahlt die TK vollständig, beim Impfstoff bleibt die gesetzliche Zuzahlung. Die beträgt 2026 noch 5 bis 10 EUR, ab 2027 dann 7,50 bis 15 EUR. Unten steht, welche Impfungen dazugehören, wie du abrechnest und was ein Tarif zusätzlich leisten kann.',

  sections: [
    {
      id: 'zahlt',
      heading: 'Zahlt die TK Reiseimpfungen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, unter drei Bedingungen. Die TK übernimmt die Kosten, wenn du die Impfung für eine private Auslandsreise brauchst und die STIKO sie empfiehlt. Außerdem muss die Impfung bei einer kassenärztlichen Praxis oder dem Gesundheitsamt stattfinden (tk.de, Stand 22.01.2026).',
        },
        {
          type: 'paragraph',
          text: 'Rechtlich ist das eine freiwillige Leistung der Kasse. Nach § 20i Abs. 1 SGB V sind Reiseimpfungen nur dann Pflichtleistung, wenn der Auslandsaufenthalt beruflich oder durch eine Ausbildung bedingt ist oder ein besonderes öffentliches Interesse besteht. Für private Reisen kann die Krankenkasse in ihrer Satzung weitere Schutzimpfungen vorsehen (§ 20i Abs. 2 SGB V). Die TK tut das in § 19 ihrer Satzung und übernimmt die Kosten empfohlener Schutzimpfungen auch gegen Krankheiten, die wegen eines nicht beruflich bedingten Auslandsaufenthalts indiziert sind.',
        },
        {
          type: 'paragraph',
          text: 'Andere Kassen regeln das in ihrer eigenen Satzung, die Bedingungen und Beträge unterscheiden sich. Diese Seite beschreibt nur die TK.',
        },
      ],
    },
    {
      id: 'welche',
      heading: 'Welche Reiseimpfungen erstattet die TK?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die TK nennt auf tk.de diese Impfungen. Deine Ärztin oder dein Arzt entscheidet, ob sie in deinem Fall medizinisch notwendig sind.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Reiseschutzimpfungen und Malariaprophylaxe, die die TK nach eigener Angabe übernimmt',
          head: ['Impfung oder Maßnahme', 'Hinweis der TK'],
          rows: [
            ['Cholera, Diphtherie, Tetanus, Poliomyelitis (Kinderlähmung)', 'bei privater Auslandsreise, wenn die STIKO die Impfung empfiehlt'],
            ['FSME (Zecken-Hirnhautentzündung), Meningokokken-Meningitis', 'wie oben'],
            ['Gelbfieber, Japanische Enzephalitis, Typhus, Tollwut', 'wie oben'],
            ['Hepatitis A und Hepatitis B', 'wie oben'],
            ['Malariaprophylaxe (Tabletten)', 'die TK zahlt die Tabletten zur Vorbeugung, zum Beispiel Atovaquon, Proguanil oder Chloroquin (nur in Gebieten ohne Chloroquin-Resistenz); Stand-by-Notfall-Medikamente nicht'],
          ],
          note: 'Quelle: tk.de, Wann übernimmt die TK die Kosten für Reiseimpfungen (22.01.2026) und Kostenübernahme Malariaprophylaxe (Antwort auf der Seite Welche Impfungen zahlt die TK, 18.05.2026). Diese Seite empfiehlt keine Impfung für ein bestimmtes Reiseland. Aktuelle Empfehlungen bekommst du auch über das TK-ReiseTelefon.',
        },
        {
          type: 'paragraph',
          text: 'Gehört die erste Impfung einer Serie zu einer privaten Auslandsreise, übernimmt die TK die komplette Impfserie bis zur Grundimmunisierung, auch wenn die letzten Impfungen nach der Reise erfolgen. Auffrischungen zahlt sie, wenn sie für einen privaten Auslandsaufenthalt nötig sind.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Wie viel zahlt die TK und was bleibt bei dir?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die ärztliche Impfleistung erstattet die TK vollständig. Dazu zählen Impfanamnese, Impfberatung, die Impfung selbst und der Eintrag in den Impfausweis. Beim Impfstoff zahlst du die gesetzliche Zuzahlung von 10 Prozent der Kosten, mindestens 5 und höchstens 10 EUR. Die Zuzahlung gilt ab dem 18. Geburtstag und wird direkt von der Erstattung abgezogen (tk.de, Stand 27.07.2026 und 06.02.2026). Ab dem 1. Januar 2027 steigt die gesetzliche Zuzahlung auf mindestens 7,50 und höchstens 15 EUR (neuer § 61 SGB V, BGBl. 2026 I Nr. 228).',
        },
        {
          type: 'paragraph',
          text: 'Beratungen zu reisemedizinischen Fragen, etwa zum Klima oder zur Ernährung im Reiseland, zahlst du selbst. Die Satzung der TK verweist für Arzneimittel auf die gesetzliche Zuzahlung nach § 31 Abs. 3 SGB V (§ 19 Abs. 2), deren Höhe in § 61 SGB V steht.',
        },
        {
          type: 'costCard',
          title: 'Reiseimpfung bei der TK: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Zuzahlung 2026 von 10 Prozent, mindestens 5 und höchstens 10 EUR, und mit dem Vorsorge-Baustein der UKV: Impfungen auch Reiseimpfungen und Malariaprophylaxe, 100 % bis 300 EUR in zwei Kalenderjahren. Die Impfstoffpreise sind angenommen.',
          caption: 'Kostenkarte: Impfstoff bei einer Reiseimpfung mit und ohne Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Impfstoff für 30 EUR (angenommen), ärztliche Leistung nach Rechnung', 'die ärztliche Leistung ganz, vom Impfstoff 25 EUR', '5 EUR Zuzahlung (Mindestbetrag)', 'Der Baustein erstattet Impfungen laut UKV zu 100 % bis 300 EUR in zwei Kalenderjahren, zusammen mit der Kasse nie mehr als die Rechnung'],
            ['Impfstoff für 80 EUR (angenommen)', 'die ärztliche Leistung ganz, vom Impfstoff 72 EUR', '8 EUR Zuzahlung (10 Prozent)', 'wie in der Zeile davor'],
            ['Impfstoff für 150 EUR (angenommen)', 'die ärztliche Leistung ganz, vom Impfstoff 140 EUR', '10 EUR Zuzahlung (Höchstbetrag)', 'wie in der Zeile davor'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe: Die Impfstoffpreise sind angenommen, die Zuzahlung ist nach der TK-Regel 2026 gerechnet (10 Prozent, mindestens 5, höchstens 10 EUR). Ab dem 1. Januar 2027 gelten mindestens 7,50 und höchstens 15 EUR, in den drei Beispielen wären es dann 7,50, 8 und 15 EUR (eigene Rechnung). Voraussetzung ist eine private Auslandsreise mit STIKO-Empfehlung. Wie der Baustein die Zuzahlung behandelt, steht in den Tarifbedingungen. Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'einreichen',
      heading: 'Wie reichst du die Reiseimpfung bei der TK ein?',
      blocks: [
        {
          type: 'paragraph',
          text: 'In Westfalen-Lippe, Nordrhein und Sachsen rechnen die Praxen die Kosten über die Versichertenkarte mit der TK ab. Sprich deine Ärztin oder deinen Arzt vor der Impfung darauf an. Überall sonst bekommst du eine Privatrechnung für das ärztliche Honorar und eine Apothekenrechnung für den Impfstoff, dann erstattet dir die TK ihren Kostenanteil (tk.de, Stand 27.07.2026).',
        },
        {
          type: 'steps',
          heading: 'Der Weg zur Erstattung',
          items: [
            { title: 'Unterlagen sammeln', text: 'Du brauchst die ärztliche Verordnung als Papierrezept oder E-Rezept, die Rechnung für den Impfstoff und die Rechnung über das ärztliche Honorar.' },
            { title: 'Online einreichen', text: 'Am schnellsten geht es über Meine TK oder die TK-App: fotografieren, hochladen, abschicken. So sparst du Zeit und Porto.' },
            { title: 'Oder per Post', text: 'Schick die Originale mit deiner Bankverbindung an die zentrale Großkundenanschrift: Techniker Krankenkasse, 20905 Hamburg. Eine Straße und Hausnummer sind nicht nötig.' },
            { title: 'Reise und Land nennen', text: 'Gib unbedingt an, dass es sich um Impfungen für eine private Auslandsreise handelt und in welches Land du reist.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Deine Zuzahlung zieht die TK direkt von der Erstattung ab. Die ärztliche Beratung im Zusammenhang mit der Reiseimpfung zahlt die TK mit, Fragen zu Klima oder Ernährung im Reiseland gehören nicht dazu.',
        },
      ],
    },
    {
      id: 'beruf',
      heading: 'Was gilt bei Beruf, Studium oder Auslandssemester?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hier gelten andere Regeln, weil die Impfung nicht für eine private Reise gebraucht wird. Für Schutzimpfungen aus beruflichen Gründen übernimmt laut TK in der Regel der Arbeitgeber die Kosten. Ist ein Auslandsaufenthalt im Studium verpflichtend, rechnet die Praxis die Kosten direkt über die TK-Gesundheitskarte ab, wenn du eine Kopie der Studien- oder Prüfungsordnung mit der Verpflichtung vorlegst.',
        },
        {
          type: 'paragraph',
          text: 'Das Gesetz sieht Reiseimpfungen als Pflichtleistung vor, wenn der Auslandsaufenthalt beruflich oder durch eine Ausbildung bedingt ist (§ 20i Abs. 1 SGB V). Wie das in deinem Fall zu beurteilen ist, klärst du vor der Impfung mit der TK.',
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Bringt ein Tarif bei Reiseimpfungen etwas?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auf healio.de/ambulant steht der Vorsorge-Baustein der UKV. Zu den Leistungen, die immer mit drin sind, nennt die Seite Impfungen, auch Reiseimpfungen und Malariaprophylaxe, zu 100 % bis 300 EUR in zwei Kalenderjahren. Der Baustein passt laut Seite unter anderem für Fernreisen mit Impfungen. Er kostet ab 20 Jahren 13,45 EUR im Monat, bis 19 Jahre 8,80 EUR. Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'prevention',
          text: 'Du willst wissen, was der Baustein im Monat kostet und was er neben Impfungen erstattet?',
          label: 'Ambulanten Tarif ansehen',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Für die Reiseimpfung allein lohnt sich der Baustein nicht.', text: 'Die TK erstattet bis auf die Zuzahlung je Impfstoff, die 2026 noch 5 bis 10 EUR und ab 2027 dann 7,50 bis 15 EUR beträgt. Der Baustein kostet in 24 Monaten 322,80 EUR (24 mal 13,45 EUR, eigene Rechnung). Das rechnet sich nur, wenn du die übrigen Leistungen nutzt.' },
            { lead: 'Die Voraussetzungen gelten immer.', text: 'Die TK zahlt nur bei privater Auslandsreise, STIKO-Empfehlung und kassenärztlicher Praxis oder Gesundheitsamt. Beratung zu Klima und Ernährung im Reiseland zahlst du selbst.' },
            { lead: 'Welche Impfung du brauchst, sagt dir die Ärztin oder der Arzt.', text: 'Diese Seite empfiehlt keine Impfung für ein Reiseland und stellt keine Diagnose. Die Entscheidung über die medizinische Notwendigkeit trifft die Praxis.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Im Bonusprogramm der TK bringen Schutzimpfungen Punkte, je Immunisierung 1.000 (Satzung, Anlage 3). Wie das Bonusprogramm funktioniert und wie du die Punkte nutzt, steht im Ratgeber zum TK-Bonusprogramm.',
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'prevention',
              tone: 'mint',
              title: 'Vorsorgeuntersuchungen: was die Kasse in welchem Alter zahlt',
              text: 'Alle Untersuchungen für Männer, Frauen und Kinder in einer Tabelle.',
              to: '/ratgeber/vorsorgeuntersuchung',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'TK-Bonusprogramm 2026',
              text: 'Wie Impfungen und Vorsorge bei der TK Punkte bringen.',
              to: '/ratgeber/tk-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'advisor',
              tone: 'sky',
              title: 'Vorsorgeuntersuchungen für Männer',
              text: 'Was ab 35, 45 und 50 zusteht und was IGeL ist.',
              to: '/ratgeber/vorsorgeuntersuchung-maenner',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'coral',
              title: 'Vorsorgeuntersuchungen für Frauen',
              text: 'Was ab 20, 30 und 50 zusteht und wie oft.',
              to: '/ratgeber/vorsorgeuntersuchung-frauen',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Vorsorge zeigt Healio den ambulanten Tarif der SDK mit eigenem Vorsorge-Topf und als kleine Zusatzoption den Vorsorge-Baustein der UKV, in dem Impfungen einschließlich Reiseimpfungen enthalten sind. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Zahlt die TK Reiseimpfungen?',
      answer:
        'Ja, wenn du die Impfung für eine private Auslandsreise brauchst, die STIKO sie empfiehlt und sie bei einer kassenärztlichen Praxis oder dem Gesundheitsamt erfolgt. Grundlage ist § 19 der TK-Satzung auf Basis von § 20i Abs. 2 SGB V.',
    },
    {
      question: 'Welche Reiseimpfungen zahlt die TK?',
      answer:
        'Nach tk.de Cholera, Diphtherie, FSME, Gelbfieber, Hepatitis A und B, Japanische Enzephalitis, Meningokokken-Meningitis, Poliomyelitis, Tetanus, Tollwut und Typhus, dazu Tabletten zur Malariaprophylaxe. Ob eine Impfung für dich notwendig ist, entscheidet deine Ärztin oder dein Arzt.',
    },
    {
      question: 'Wie viel muss ich bei der TK für eine Reiseimpfung zuzahlen?',
      answer:
        'Die ärztliche Impfleistung erstattet die TK vollständig. Für den Impfstoff zahlst du ab 18 Jahren 10 Prozent der Kosten, 2026 mindestens 5 und höchstens 10 EUR. Ab dem 1. Januar 2027 sind es mindestens 7,50 und höchstens 15 EUR. Die Zuzahlung zieht die TK von der Erstattung ab.',
    },
    {
      question: 'Wie reiche ich die Reiseimpfung bei der TK ein?',
      answer:
        'Mit der ärztlichen Verordnung (Papier- oder E-Rezept), der Rechnung für den Impfstoff und der Rechnung über das ärztliche Honorar, am schnellsten über Meine TK oder die TK-App. Per Post gehen die Originale mit Bankverbindung an die Techniker Krankenkasse, 20905 Hamburg. Nenne dabei die private Auslandsreise und das Reiseland.',
    },
    {
      question: 'Zahlt die TK die Malariaprophylaxe?',
      answer:
        'Ja, die Tabletten zur Vorbeugung, zum Beispiel Atovaquon, Proguanil oder Chloroquin (nur in Gebieten ohne Chloroquin-Resistenz). Stand-by-Notfall-Medikamente bezahlt die TK nicht.',
    },
    {
      question: 'Zahlt die TK Auffrischungen und Folgeimpfungen?',
      answer:
        'Ja. Hängt mindestens die erste Impfung einer Serie mit einer privaten Auslandsreise zusammen, übernimmt die TK die komplette Serie bis zur Grundimmunisierung. Eine Auffrischung zahlt sie, wenn sie für einen privaten Auslandsaufenthalt nötig ist.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Sprich vor der Reise mit deiner Ärztin oder deinem Arzt über die nötigen Impfungen und reiche die Unterlagen über Meine TK ein. Die Übersicht über alle Vorsorgeleistungen steht auf der Seite ' },
      { text: 'Vorsorgeuntersuchungen', to: '/ratgeber/vorsorgeuntersuchung' },
      { text: ', den Vorsorge-Baustein mit Impfungen findest du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Voraussetzungen, Zuzahlung und Weg der Erstattung stammen von der TK selbst und aus ihrer Satzung, die Rechtsgrundlage aus dem Gesetz.',
    items: [
      {
        label: 'Wann übernimmt die TK die Kosten für Reiseimpfungen?',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/techniker/service/leistungen-und-mitgliedschaft/leistungen/praevention/impfungen/reiseimpfungen/voraussetzungen-kostenuebernahme-reiseschutzimpfung-2007720',
        stand: '22.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Welche Kosten übernimmt die TK bei Reiseschutzimpfungen?',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/praevention/impfungen/kostenerstattung-reiseimpfung-reiseschutzimpfung-2007724',
        stand: '27.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wie reiche ich die Rechnungen für Impfungen ein?',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/praevention/impfungen/rechnung-zusenden-anschrift-kostenerstattung-reise-schutzimpfung-2009652',
        stand: '19.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Was muss ich bei Impfungen selbst bezahlen?',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/praevention/impfungen/zuzahlungen-impfungen-2007706',
        stand: '06.02.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Welche Impfungen zahlt die TK? (Fragen zu Beruf, Studium, Malariaprophylaxe, Serie)',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/techniker/leistungen-und-mitgliedschaft/informationen-versicherte/leistungen/weitere-leistungen/praevention/impfungen/kostenuebernahme-kostenerstattung-impfungen-2007702',
        stand: '18.05.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der Techniker Krankenkasse, § 19 (Schutzimpfungen und andere Maßnahmen der spezifischen Prophylaxe) und Anlage 3',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/tk/unternehmen-und-karriere/ueber-die-tk/satzung-der-tk/149038',
        stand: 'Stand 17.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 20i Leistungen zur Verhütung übertragbarer Krankheiten, Absätze 1 und 2',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__20i.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz vom 24.07.2026, Artikel 1 Nr. 23 (neuer § 61 SGB V, Zuzahlungen) und Artikel 8 Abs. 2 (Inkrafttreten)',
        publisher: 'Bundesgesetzblatt (BGBl. 2026 I Nr. 228)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'verkündet 29.07.2026, die neuen Zuzahlungsbeträge gelten ab 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV Vorsorge-Baustein, wie auf healio.de/ambulant',
        publisher: 'UKV',
        stand: '07.10.2026',
        note: 'Beiträge der UKV gültig ab 01.05.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Dieser Ratgeber ersetzt keine ärztliche Beratung. Maßgeblich sind immer die Entscheidung der TK und die Bedingungen des Versicherers.',
};

export default article;
