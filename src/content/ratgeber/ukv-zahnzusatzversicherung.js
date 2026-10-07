/**
 * Serie Zähne, Stapel zahn-kasse-partner, Seite ukv-zahnzusatzversicherung
 * (Welle A, Partnerseite, Hauptbegriff "ukv zahnzusatzversicherung").
 *
 * Quellen (Abruf 07.10.2026, Belege je Aussage in ukv-zahnzusatzversicherung.belege.md):
 *   - Tarifaussagen NUR aus src/components/sections/dental/dentalContent.js
 *     (deutsche Fassung) und der Live-Seite https://healio.de/zahn: Stufen 75,
 *     90, 100, keine Wartezeiten, Erstattungssätze 75 und 100, Zahnstaffel,
 *     professionelle Zahnreinigung ohne Jahresdeckel, Aufnahme bei 1 bis 3
 *     fehlenden Zähnen mit Zuschlag je Zahn (6,10 / 9,00 / 10,90 EUR je Zahn
 *     und Monat), Zwei-Jahres-Regel, Ausnahme Zahnspange.
 *   - Fremdbelege für das Rechenbeispiel und die Einordnung: G-BA
 *     Festzuschuss-Richtlinie (Befund 1.1, Beträge ab 01.01.2026), SGB V § 55,
 *     Verbraucherzentrale zu Zahnstaffeln.
 *   - Rechenweg des Erstattungssatzes wie im Zahnkosten-Rechner der Website
 *     (src/lib/zahnkostenRechner.js: Satz mal Rechnung minus Kassenleistung);
 *     die UKV schreibt auf ihrer Zahn-Seite, dass die Prozentsätze die
 *     Vorleistung der Kasse enthalten (Abruf 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Kein Erstattungssatz für ZahnPRIVAT 90 (steht nicht in dentalContent),
 *     keine Zuordnung der Zahnreinigung zu 90 (dentalContent sagt "Top-Stufen"
 *     und nennt "ohne Jahresdeckel" nur bei 100).
 *   - Keine Beitragszahl: dentalContent und /zahn nennen keinen Tarifbeitrag
 *     (die Angabe "ab rund 10 EUR mit 30 Jahren" gehört zum Bonusrechner auf
 *     /zahn und nennt keine Stufe). Nur die Zuschläge je fehlendem Zahn, die
 *     dort ausdrücklich stehen.
 *   - Keine Kieferorthopädie-Eurobeträge (stehen nur in der nicht ausgespielten
 *     Altfassung zahn.json), keine Test- oder Siegelnoten (Nutzungsrechte laut
 *     Kommentar in HealioAwardsRow noch offen), kein Vergleich mit anderen
 *     Versicherern.
 *   - Die Beispielrechnung ist eigene Rechnung: Annahme alle Kosten
 *     erstattungsfähig, Rechnung entspricht der Regelversorgung, Zahnstaffel
 *     nicht erreicht. ZahnPRIVAT 90 fehlt dort bewusst. Bei der Prüfung am
 *     07.10.2026 korrigiert: ZahnPRIVAT 75 erstattet 59,76 EUR (75 % der
 *     Rechnung minus Kassenleistung), nicht 75 % des Rests.
 *
 * Faktenprüfung 07.10.2026: PRUEFBERICHT-zahn-kasse-partner.md.
 */

export const article = {
  slug: 'ukv-zahnzusatzversicherung',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'UKV Zahnzusatzversicherung: ZahnPRIVAT im Überblick | Healio',
  metaDescription:
    'UKV Zahnzusatzversicherung: ZahnPRIVAT 75, 90 und 100 ohne Wartezeit, mit Zahnstaffel, Zuschlag bei 1 bis 3 fehlenden Zähnen und klaren Grenzen bei Angeratenem.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'UKV ZahnPRIVAT im Überblick: Stufen, Leistungen, Grenzen',
  listTeaser:
    'Drei Stufen ohne Wartezeit, die Zahnstaffel in den ersten Jahren, Aufnahme mit Zuschlag bei fehlenden Zähnen und was nicht versichert ist.',

  headline: 'UKV Zahnzusatzversicherung: ZahnPRIVAT 75, 90 und 100 im Überblick',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: 'keine Wartezeit', label: 'in allen drei Stufen der UKV ZahnPRIVAT' },
      { value: '100 %', label: 'der erstattungsfähigen Kosten nach Kassenleistung, Stufe 100' },
      { value: 'bis 1.000 EUR', label: 'erstattet der Tarif im ersten Kalenderjahr (Zahnstaffel)' },
    ],
    text: 'Drei Leistungsstufen ohne Wartezeiten. Was in den letzten 2 Jahren angeraten wurde oder schon läuft, ist nicht versichert.',
    path: { to: '/zahn#zahn-check', text: 'Welche Stufe passt zu dir?', label: 'Zahn-Check starten' },
  },

  lead: 'Die UKV ZahnPRIVAT hat drei Leistungsstufen, 75, 90 und 100, und in keiner gibt es Wartezeiten. In den ersten drei Kalenderjahren begrenzt eine Zahnstaffel die Erstattung. Nicht versichert ist, was in den letzten 2 Jahren angeraten wurde oder schon läuft. Bei 1 bis 3 fehlenden Zähnen nimmt die UKV mit einem Zuschlag je Zahn auf. Diese Seite zeigt Stufen, Zahlen und Grenzen so, wie sie auf healio.de/zahn stehen.',

  sections: [
    {
      id: 'was-ist-zahnprivat',
      heading: 'Was ist die UKV ZahnPRIVAT?',
      blocks: [
        {
          type: 'paragraph',
          text: 'ZahnPRIVAT ist die Zahnzusatzversicherung der UKV. Es gibt drei Leistungsstufen mit unterschiedlichem Beitrag, 75, 90 und 100. Je nach Tarif sind Zahnersatz, Zahnbehandlung und Vorsorge versichert.',
        },
        {
          type: 'paragraph',
          text: 'Healio zeigt die ZahnPRIVAT für alle, bei denen in den letzten 2 Jahren nichts empfohlen wurde und nichts läuft. Ältere Empfehlungen zählen nicht mehr, außer bei der Zahnspange. Für Behandlungen, die schon angeraten sind, gibt es einen zweiten Weg, den Baustein ZAHN Sofort der Bayerischen. Beide Wege stehen auf healio.de/zahn nebeneinander.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was der zweite Weg leistet und wo er endet, steht im Überblick ' },
            { text: 'Bayerische Zahnzusatzversicherung mit ZAHN Sofort', to: '/ratgeber/bayerische-zahnzusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'stufen',
      heading: 'Was leistet die UKV ZahnPRIVAT in den drei Stufen?',
      blocks: [
        {
          type: 'table',
          mobile: 'cards',
          caption: 'UKV ZahnPRIVAT 75, 90 und 100 nach den Tarifunterlagen auf healio.de/zahn',
          head: ['Stufe', 'Erstattung', 'Was dazu steht'],
          rows: [
            ['ZahnPRIVAT 75', '75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet', 'Keine Wartezeiten, Implantate, Brücken und Prothesen erstattungsfähig'],
            ['ZahnPRIVAT 90', 'Den Erstattungssatz zeigen die Tarifunterlagen im Antrag', 'Keine Wartezeiten, Zahnstaffel wie in der Stufe 100'],
            ['ZahnPRIVAT 100', '100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet', 'Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig. Keine Wartezeiten, professionelle Zahnreinigung ohne Jahresdeckel'],
          ],
          note: 'Die Annahme und der genaue Leistungsumfang werden erst im Antrag verbindlich geprüft. Der Beitrag hängt unter anderem von Alter, Tarif und Leistungsstufe ab, deshalb steht hier kein Preis.',
        },
        {
          type: 'paragraph',
          text: 'Die professionelle Zahnreinigung gibt es in den Top-Stufen. Kieferorthopädie-Leistungen hängen von der gewählten Stufe ab, die genauen Werte zeigen Tarifrechner und Antrag. Die Einstiegsstufe mit kleinerem Beitrag ist ZahnPRIVAT 75, die höchste Stufe ist ZahnPRIVAT 100. Welche Stufe zu dir passt, hängt von Leistungswunsch und Beitrag ab.',
        },
      ],
    },
    {
      id: 'wartezeit',
      heading: 'Hat die UKV ZahnPRIVAT eine Wartezeit?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein, in allen drei Stufen gibt es keine Wartezeiten. Der Tarif leistet also ab Versicherungsbeginn. Das heißt nicht, dass er jede Behandlung zahlt: Auch ohne klassische Wartezeit können Leistungsstaffeln, Höchstgrenzen und Ausschlüsse gelten, und eine bereits bestehende Behandlung ist dadurch nicht automatisch versichert.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was bei Zahnzusatzversicherungen gesetzlich zu Wartezeiten gilt und wo ab dem ersten Tag trotzdem Grenzen liegen, erklärt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'zahnstaffel',
      heading: 'Was ist die Zahnstaffel der UKV?',
      blocks: [
        {
          type: 'paragraph',
          text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel.',
        },
        {
          type: 'paragraph',
          text: 'In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
        },
        {
          type: 'paragraph',
          text: 'Die Staffel ist keine Wartezeit, aber sie deckelt, wie viel der Tarif in den Anfangsjahren erstattet. Solche Staffeln sind verbreitet. Die Verbraucherzentrale schreibt, dass Zahnstaffeln die Erstattung häufig in den ersten drei bis fünf Versicherungsjahren auf Höchstbeträge begrenzen und dass die volle Leistung erst einige Jahre nach Vertragsabschluss gilt.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Was bleibt bei einer Krone mit und ohne ZahnPRIVAT an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nimm eine Metallkrone als Regelversorgung. Der G-BA setzt dafür 2026 insgesamt 398,39 EUR an (Befund 1.1). Die Kasse zahlt ohne Bonusheft 60 Prozent davon, das sind 239,03 EUR, für Festzuschüsse, die bis zum 31.12.2026 bewilligt werden. Es bleiben 159,36 EUR. Wie viel davon der Tarif erstattet, hängt von der Stufe ab. Der Satz des Tarifs bezieht sich auf die ganze erstattungsfähige Rechnung, davon wird abgezogen, was die Kasse zahlt. In ZahnPRIVAT 75 sind das 75 % von 398,39 EUR, also 298,79 EUR, minus 239,03 EUR Festzuschuss. Der Tarif erstattet damit 59,76 EUR.',
        },
        {
          type: 'costCard',
          title: 'Metallkrone mit und ohne ZahnPRIVAT',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 75 und 100 im ersten Kalenderjahr. Die Zahnstaffel begrenzt die Erstattung dort auf bis zu 1.000 EUR, bei dieser Rechnung wird sie nicht erreicht. Der Vertrag besteht schon, bevor die Behandlung angeraten wird, außer in der letzten Zeile.',
          caption: 'Kostenkarte: Metallkrone als Regelversorgung, ohne Bonusheft',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['ZahnPRIVAT 75', '239,03 EUR', '159,36 EUR', '99,60 EUR, der Tarif erstattet 59,76 EUR (75 % der Rechnung abzüglich Kassenleistung)'],
            ['ZahnPRIVAT 90', '239,03 EUR', '159,36 EUR', 'Der Erstattungssatz steht in den Tarifunterlagen im Antrag'],
            ['ZahnPRIVAT 100', '239,03 EUR', '159,36 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Krone in den letzten 2 Jahren vor Abschluss angeraten', '239,03 EUR', '159,36 EUR', 'Nicht versichert, 159,36 EUR bleiben bei dir. ZAHN Sofort nur vor der Rechnung prüfen'],
          ],
          note: 'Beispiel, keine Preisangabe. Regelversorgung und Festzuschuss: G-BA, Festzuschuss-Richtlinie, Beträge ab 01.01.2026, Befund 1.1 (398,39 EUR, 60 Prozent gleich 239,03 EUR); Eigenanteil und Erstattung bei 75 % sind eigene Rechnung: 75 % von 398,39 EUR sind 298,79 EUR, abzüglich 239,03 EUR Kassenleistung erstattet der Tarif 59,76 EUR. Annahmen: Die Rechnung entspricht genau der Regelversorgung, alle Kosten sind erstattungsfähig, kein Bonusheft, kein Härtefall. Tarif nach den Unterlagen auf healio.de/zahn, verbindlich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'fehlende-zaehne',
      heading: 'Was gilt bei der UKV für fehlende Zähne?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Danach sind die Lückenzähne mitversichert, es gilt die normale Zahnstaffel. Einen eigenen Deckel für die Lücke gibt es nicht, und auch hier fallen keine Wartezeiten an.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschlag je fehlendem Zahn bei der UKV ZahnPRIVAT, wie auf healio.de/zahn',
          head: ['Stufe', 'Zuschlag je fehlendem Zahn und Monat', 'Bei drei Zähnen im Monat'],
          rows: [
            ['ZahnPRIVAT 75', '6,10 EUR', '18,30 EUR'],
            ['ZahnPRIVAT 90', '9,00 EUR', '27,00 EUR'],
            ['ZahnPRIVAT 100', '10,90 EUR', '32,70 EUR'],
          ],
          note: 'Der Zuschlag kommt zum regulären Beitrag dazu. Die Summe für drei Zähne ist eigene Rechnung. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich.',
        },
        {
          type: 'paragraph',
          text: 'Gab es für die Lücke in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde ihre Versorgung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Alles zur Lücke, zum Zuschlag und zu den Sonderfällen findest du im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'nicht-versichert',
      heading: 'Was ist bei der UKV nicht versichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Behandlungen, die in den letzten 2 Jahren angeraten oder geplant wurden oder schon laufen. Die Regel ist einfach: Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung. Wurde für dein Kind schon eine Zahnspange empfohlen oder läuft sie schon, ist Kieferorthopädie nicht versichert, auch wenn die Empfehlung älter als 2 Jahre ist.',
        },
        {
          type: 'paragraph',
          text: 'Auch ein Eintrag in deiner Zahnarzt-Akte aus den letzten 2 Jahren kann zählen. Läuft eine Behandlung schon, zählt das immer. Die Gesundheitsfragen im Antrag entscheiden außerdem über die Annahme. Beantworte sie vollständig und wahrheitsgemäß, die exakten Fragen stehen in der Antragsstrecke.',
        },
        {
          type: 'paragraph',
          text: 'Bei bestimmten Zahn-Vorgeschichten kann die UKV der passendere Prüfweg sein, welche Stufe passt, hängt von deinen Angaben ab. Nichts beschönigen und nichts weglassen: Erst der vollständig beantwortete Antrag schafft Klarheit.',
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Vier kurze Fragen, keine Kontaktdaten: Der Zahn-Check zeigt, welcher Weg bei deiner Zahnsituation offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'abschluss',
      heading: 'Wie läuft der Abschluss der UKV ZahnPRIVAT ab?',
      blocks: [
        {
          type: 'steps',
          heading: 'In drei Schritten zum Antrag',
          items: [
            { title: 'Zahn-Check', text: 'Er dauert etwa eine Minute, braucht keine Kontaktdaten und zeigt den Tarifweg für deine Situation. Deine Antworten werden weder gespeichert noch übertragen.' },
            { title: 'Tarifrechner der UKV', text: 'Du wirst zur ZahnPRIVAT-Abschlussstrecke der UKV weitergeleitet, wählst dort die Stufe und siehst deinen Beitrag, bevor du den Antrag abschickst.' },
            { title: 'Antrag und Gesundheitsfragen', text: 'Erst die UKV entscheidet im Antrag verbindlich über Annahme und Leistung. Mindestlaufzeit und Kündigungsfrist können je nach Tarif unterschiedlich sein, du findest sie vor dem Abschluss in den Verbraucherinformationen.' },
          ],
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ohne Wartezeit heißt nicht ohne Grenzen.', text: 'Die Zahnstaffel begrenzt die Erstattung in den ersten drei Kalenderjahren, bei Unfall gilt sie nicht.' },
            { lead: 'Angeratenes zahlt auch die UKV nicht.', text: 'Was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft, ist nicht versichert. Für solche Fälle gibt es den Baustein ZAHN Sofort der Bayerischen, der vor der Rechnung abgeschlossen sein muss.' },
            { lead: 'Hier steht kein Beitrag.', text: 'Er hängt unter anderem von Alter, Tarif und Leistungsstufe ab. Deinen konkreten Beitrag siehst du im Tarifrechner.' },
            { lead: 'Verbindlich entscheidet die UKV.', text: 'Annahme und Leistungsumfang prüft sie nach den Angaben im Antrag.' },
          ],
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
              icon: 'weighing',
              tone: 'butter',
              title: 'Lohnt sich eine Zahnzusatzversicherung?',
              text: 'Rechnung statt Bauchgefühl, mit Grenzen.',
              to: '/ratgeber/zahnzusatzversicherung-lohnt-sich',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'lavender',
              title: 'Zahnzusatzversicherung ohne Wartezeit',
              text: 'Was ab dem ersten Tag gilt und wo die Staffel greift.',
              to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit',
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
      question: 'Wie viele Stufen hat die UKV ZahnPRIVAT?',
      answer:
        'Drei: ZahnPRIVAT 75, 90 und 100, mit unterschiedlicher Erstattung und unterschiedlichem Beitrag. In ZahnPRIVAT 100 erstattet der Tarif 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, in ZahnPRIVAT 75 sind es 75 %.',
    },
    {
      question: 'Hat die UKV Zahnzusatzversicherung Wartezeiten?',
      answer:
        'Nein, die UKV ZahnPRIVAT hat in allen drei Stufen keine Wartezeiten. Leistungsstaffeln, Höchstgrenzen und Ausschlüsse können trotzdem gelten.',
    },
    {
      question: 'Was ist die Zahnstaffel bei der UKV?',
      answer:
        'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
    },
    {
      question: 'Kann ich mich bei der UKV mit fehlenden Zähnen versichern?',
      answer:
        'Ja, wenn 1 bis 3 Zähne fehlen und noch nicht ersetzt sind. Je fehlendem Zahn kommt ein monatlicher Risikozuschlag dazu: 6,10 EUR in ZahnPRIVAT 75, 9,00 EUR in 90 und 10,90 EUR in 100. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich.',
    },
    {
      question: 'Zahlt die UKV eine schon angeratene Behandlung?',
      answer:
        'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung.',
    },
    {
      question: 'Was kostet die UKV ZahnPRIVAT?',
      answer:
        'Der Beitrag hängt unter anderem von Alter, Tarif und Leistungsstufe ab. Deshalb steht hier kein pauschaler Preis. Im Tarifrechner siehst du deinen konkreten Beitrag, bevor du den Antrag abschickst.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welche Stufe und welcher Weg zu deiner Situation passen, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse bei Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Ob dein Kassenbonus den Beitrag mittragen kann und welche Kasse dafür passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Tarifaussagen stammen aus den Tarifunterlagen, wie sie auf healio.de/zahn stehen. Regelversorgung, Festzuschuss und Zahnstaffeln im Allgemeinen belegen diese Quellen.',
    items: [
      {
        label: 'Zahn-Check und Tarifübersicht UKV ZahnPRIVAT und ZAHN Sofort',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/zahn',
        stand: '05.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026, Befund 1.1',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
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
        label: 'Zahnzusatzversicherung, Risiken und Vorteile',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293',
        stand: '23.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT, wie auf healio.de/zahn',
        publisher: 'UKV',
        stand: '05.10.2026',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/zahn.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Annahmeregeln nach dem Stand der genannten Unterlagen, maßgeblich sind immer die Bedingungen des Versicherers.',
};

export default article;
