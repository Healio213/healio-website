/**
 * Serie Zähne, Stapel zahn-kasse-partner, Seite zahnzusatzversicherung-lohnt-sich
 * (Welle A, Hauptbegriff "zahnzusatzversicherung lohnt es sich").
 *
 * Quellen (Abruf 07.10.2026, Belege je Aussage in
 * zahnzusatzversicherung-lohnt-sich.belege.md):
 *   - Verbraucherzentrale, "Zahnzusatzversicherung, Risiken und Vorteile" (Stand
 *     23.07.2026): Wann sie sich lohnt und wann nicht, Prüfpunkte für Tarife.
 *   - G-BA Festzuschuss-Richtlinie (Beträge ab 01.01.2026), SGB V § 55,
 *     Verbraucherzentrale "Brücke, Krone, Implantat" (Einzelzahn-Implantat
 *     1.500 bis 3.500 EUR, Stand 01.07.2024).
 *   - Tarifaussagen NUR aus dentalContent.js und /zahn (UKV ZahnPRIVAT 75, 90,
 *     100, Zahnstaffel, Zwei-Jahres-Regel, ZAHN Sofort).
 *
 * Bewusste Grenzen:
 *   - Entscheidungshilfe, keine Empfehlung: Die Seite kürt keinen Tarif und
 *     nennt keine Test- oder Siegelnote. Die Prüfpunkte der Verbraucherzentrale
 *     stehen neben dem, was in den Healio-Tarifunterlagen steht; wo dort nichts
 *     steht (2,3- und 3,5-facher GOZ-Satz, Jahreshöchstgrenze), verweist die
 *     Tabelle auf die Tarifbedingungen im Antrag.
 *   - Keine Tarifbeiträge. Die Beitragstabelle rechnet nur mit angenommenen
 *     Monatsbeiträgen (10 bis 40 EUR) und ist als reine Rechnung gekennzeichnet.
 *   - Kein Rest von null bei "mit Tarif": "Der Tarif erstattet den
 *     erstattungsfähigen Rest" beziehungsweise erstes Kalenderjahr mit Zahnstaffel.
 *   - Der Kassenbonus bleibt allgemein ("viele Kassen ... je nach Kasse"), keine
 *     Euro-Zahl, kein IKK-Satzungswert (damit entfällt die 810-EUR-Pflichtformel).
 *   - Prüfpunkt "Bezug des Prozentsatzes": Die Kassenleistung ist im Satz der
 *     UKV enthalten (Satz mal Rechnung minus Kassenleistung, wie im
 *     Zahnkosten-Rechner src/lib/zahnkostenRechner.js; die UKV schreibt das auf
 *     ihrer Zahn-Seite, Abruf 07.10.2026). Bei der Prüfung am 07.10.2026
 *     korrigiert, vorher stand dort die umgekehrte Lesart.
 *   - Zwei Wege offen gezeigt: UKV ZahnPRIVAT und die Bayerische mit ZAHN Sofort,
 *     ohne Beitrag für ZAHN Sofort.
 *
 * Faktenprüfung 07.10.2026: PRUEFBERICHT-zahn-kasse-partner.md.
 */

export const article = {
  slug: 'zahnzusatzversicherung-lohnt-sich',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Lohnt sich eine Zahnzusatzversicherung? Die Rechnung | Healio',
  metaDescription:
    'Lohnt sich eine Zahnzusatzversicherung? Rechenbeispiele zu Krone, Brücke und Implantat, Prüfpunkte, Zahnstaffel, Zwei-Jahres-Regel und die zwei Wege bei Healio.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Lohnt sich eine Zahnzusatzversicherung? Rechnung statt Bauchgefühl',
  listTeaser:
    'Wann sie sich rechnet und wann nicht, mit Beispielen zu Krone, Brücke und Implantat, den Prüfpunkten der Verbraucherzentrale und den Grenzen.',

  headline: 'Lohnt sich eine Zahnzusatzversicherung? Rechnung statt Bauchgefühl',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'weighing',
    facts: [
      { value: '60 Prozent', label: 'Festzuschuss der Kasse, bei Bewilligung bis Ende 2026' },
      { value: 'bis 1.000 EUR', label: 'erstattet die UKV im ersten Kalenderjahr (Zahnstaffel)' },
      { value: '2 Jahre', label: 'zurück zählt, was angeraten oder geplant wurde' },
    ],
    text: 'Reicht dir die Regelversorgung, lohnt sich der Tarif laut Verbraucherzentrale in der Regel nicht. Bei teurem Zahnersatz kann er sich rechnen, wenn du abschließt, bevor etwas angeraten ist.',
    path: { to: '/zahn#zahn-check', text: 'Welcher Weg passt zu dir?', label: 'Zahn-Check starten' },
  },

  lead: 'Eine Zahnzusatzversicherung lohnt sich vor allem, wenn du mehr willst als die Regelversorgung und den Tarif abschließt, bevor ein Zahnarzt etwas anrät. Reicht dir eine einfache Metallkrone, rechnet sie sich laut Verbraucherzentrale in der Regel nicht. Dazwischen entscheidet die Rechnung: Beiträge über die Jahre gegen die Erstattung im Ernstfall, begrenzt durch Zahnstaffel und Zwei-Jahres-Regel. Diese Seite rechnet drei Fälle durch und zeigt beide Wege, die Healio anbietet.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was ist eine Zahnzusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine Zahnzusatzversicherung zahlt einen Teil dessen, was bei Zahnbehandlungen nach der Kasse an dir hängen bleibt. Die gesetzlichen Kassen übernehmen beim Zahnersatz nur einen relativ geringen Teil der Kosten, sie zahlen Zuschüsse dazu. Bis Ende 2026 bewilligte Festzuschüsse betragen 60 Prozent der Regelversorgung, mit lückenlosem Bonusheft 70 oder 75 Prozent. Ab dem 01.01.2027 gelten für neu bewilligte Zuschüsse 50, 60 und 65 Prozent.',
        },
        {
          type: 'paragraph',
          text: 'Die Zusatzversicherung setzt dort an. Laut Verbraucherzentrale bezieht sie sich in der Hauptsache auf hochwertigen Zahnersatz, vor allem Implantate, Brücken und Kronen. Dazu kommen je nach Tarif Leistungen wie die professionelle Zahnreinigung oder Kunststofffüllungen.',
        },
      ],
    },
    {
      id: 'wann-lohnt-sie-sich',
      heading: 'Wann lohnt sich eine Zahnzusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wenn du hochwertigen Zahnersatz wünschst und der Tarif die Kosten wirklich trägt. Die Verbraucherzentrale sagt es so: Nur wer derartige Leistungen wünscht, sollte den Abschluss erwägen. Dann lohnt sich ein genauer Blick auf Leistung und Preis.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Du rechnest mit Implantat, Brücke oder Verblendung.', text: 'Dort liegt die Rechnung oft deutlich über dem Festzuschuss. Ein Einzelzahn-Implantat kostet inklusive Zahnersatz in der Regel 1.500 bis 3.500 EUR (Verbraucherzentrale, Stand 01.07.2024).' },
            { lead: 'Du schließt ab, bevor etwas angeraten ist.', text: 'Bei der UKV ist genau die Behandlung nicht versichert, die in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft.' },
            { lead: 'Du kannst die Beiträge über Jahre tragen.', text: 'Die volle Leistung gibt es laut Verbraucherzentrale erst einige Jahre nach Vertragsabschluss, und der Beitrag bleibt nicht stabil.' },
          ],
        },
      ],
    },
    {
      id: 'nicht-lohnt',
      heading: 'Wann lohnt sich eine Zahnzusatzversicherung nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wenn dir die Regelversorgung reicht, etwa eine Metallkrone ohne Verblendung. Dann lohnt sich der Preis der Versicherung laut Verbraucherzentrale in der Regel nicht. Für junge Menschen ist sie nach derselben Quelle eher nicht zu empfehlen, weil statistisch erst ab Mitte 30 bis Anfang 40 Zahnersatz nötig wird.',
        },
        {
          type: 'paragraph',
          text: 'Auch bei schon notwendigen Behandlungen hilft ein normaler Tarif nicht. Die Verbraucherzentrale schreibt, dass Behandlungen, die bereits notwendig sind, in der Regel nicht in den Vertrag einbezogen werden. Für diesen Fall gibt es einen eigenen Weg mit eigenen Grenzen, den Baustein ZAHN Sofort der Bayerischen. Ob er passt, zeigt der Überblick weiter unten.',
        },
      ],
    },
    {
      id: 'rechenbeispiele',
      heading: 'Was bleibt bei Krone, Brücke und Implantat mit und ohne Tarif an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Drei Fälle mit den Werten der Festzuschuss-Richtlinie für 2026. Die Krone und die Brücke sind Regelversorgung (398,39 und 921,60 EUR). Beim Implantat rechnet die Karte mit 2.500 EUR, der Mitte der Spanne der Verbraucherzentrale. Die Kasse zahlt dort den Festzuschuss für die Lücke, die vor dem Implantat bestand.',
        },
        {
          type: 'costCard',
          title: 'Krone, Brücke und Implantat: Eigenanteil mit und ohne Zahntarif',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100 im ersten Kalenderjahr: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR. Der Zahn ging erst nach Vertragsbeginn verloren, bei Vertragsbeginn war nichts angeraten oder geplant, außer in der letzten Zeile.',
          caption: 'Kostenkarte: drei Fälle ohne Bonusheft, Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Metallkrone, Regelversorgung (398,39 EUR)', '239,03 EUR', '159,36 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Brücke für einen fehlenden Zahn, Regelversorgung (921,60 EUR)', '552,96 EUR', '368,64 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Einzelzahn-Implantat für 2.500 EUR', '552,96 EUR', '1.947,04 EUR', '947,04 EUR, der Tarif erstattet im ersten Kalenderjahr 1.000 EUR (Zahnstaffel)'],
            ['Krone in den letzten 2 Jahren vor Abschluss angeraten', '239,03 EUR', '159,36 EUR', 'Nicht versichert, 159,36 EUR bleiben bei dir'],
          ],
          note: 'Beispiel, keine Preisangabe. Regelversorgung und Festzuschuss: G-BA, Festzuschuss-Richtlinie, Beträge ab 01.01.2026, Befunde 1.1 und 2.1, 60 Prozent. Implantatkosten: Mitte der Spanne 1.500 bis 3.500 EUR (Verbraucherzentrale, Stand 01.07.2024), ohne Knochenaufbau. Eigenanteil ist eigene Rechnung. Annahmen: Rechnung gleich Regelversorgung, alle Kosten erstattungsfähig, kein Bonusheft, kein Härtefall. Tarif nach den Unterlagen auf healio.de/zahn, verbindlich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Bei der Krone bleiben 159,36 EUR, bei der Brücke 368,64 EUR, beim Implantat knapp 1.950 EUR. Das ist der Betrag, den ein Tarif dir höchstens abnehmen kann. Er steht den Beiträgen gegenüber, die du bis dahin zahlst.',
        },
      ],
    },
    {
      id: 'beitragsrechnung',
      heading: 'Wie rechne ich, ob sich der Beitrag lohnt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Multipliziere deinen Monatsbeitrag mit 12 und mit den Jahren, bis du Zahnersatz brauchst. Das Ergebnis vergleichst du mit dem Eigenanteil aus der Kostenkarte, den der Tarif tragen würde. Die Tabelle zeigt nur die Rechnung, die Beiträge darin sind angenommen und keine Tarifpreise.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Summe der Beiträge nach 5 und 10 Jahren bei angenommenem Monatsbeitrag, reine Rechnung',
          head: ['Angenommener Monatsbeitrag', 'Nach 5 Jahren', 'Nach 10 Jahren'],
          rows: [
            ['10 EUR', '600 EUR', '1.200 EUR'],
            ['20 EUR', '1.200 EUR', '2.400 EUR'],
            ['30 EUR', '1.800 EUR', '3.600 EUR'],
            ['40 EUR', '2.400 EUR', '4.800 EUR'],
          ],
          note: 'Keine Tarifpreise. Der Beitrag hängt unter anderem von Alter, Tarif und Leistungsstufe ab und kann sich ändern. Deinen konkreten Beitrag siehst du im Tarifrechner, bevor du den Antrag abschickst.',
        },
        {
          type: 'paragraph',
          text: 'Zwei Dinge verschieben das Ergebnis. Der Beitrag bleibt laut Verbraucherzentrale nicht stabil: Er wird erhöht, wenn die Ausgaben der Versicherung steigen, und zahlreiche Tarife sehen vor, dass er mit dem Alter steigt. Und die Zahnstaffel bremst die Erstattung in den ersten Jahren, wie das Implantat in der Kostenkarte zeigt. Wer erst abschließt, wenn der Zahnersatz schon angeraten ist, hat für genau diese Behandlung nichts davon, denn dann greift die Zwei-Jahres-Regel.',
        },
      ],
    },
    {
      id: 'pruefpunkte',
      heading: 'Worauf kommt es bei einem Zahntarif an?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale nennt Prüfpunkte, an denen sich gute Verträge erkennen lassen. Die Tabelle stellt sie dem gegenüber, was in den Healio-Tarifunterlagen zur UKV ZahnPRIVAT steht. Wo dort nichts steht, findest du die Antwort in den Tarifbedingungen, die du vor dem Abschluss bekommst.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Prüfpunkte der Verbraucherzentrale (Stand 23.07.2026) und die UKV ZahnPRIVAT nach den Unterlagen auf healio.de/zahn',
          head: ['Prüfpunkt', 'Verbraucherzentrale', 'UKV ZahnPRIVAT'],
          rows: [
            ['Bezug des Prozentsatzes', 'Rechnet der Versicherer die Kassenleistung mit ein, bleibt ein größerer Eigenanteil. Beispiel: 80 Prozent inklusive Kasse bedeuten 20 Prozent Eigenanteil', 'Die Kassenleistung ist im Satz enthalten: Der Tarif rechnet seinen Satz von der erstattungsfähigen Rechnung und zieht ab, was die Kasse zahlt. In ZahnPRIVAT 100 sind das 100 %, in ZahnPRIVAT 75 trägst du bis zu 25 % der erstattungsfähigen Rechnung selbst'],
            ['GOZ-Satz', 'Die Erstattung sollte über den 2,3-fachen Satz hinausgehen, bis zum 3,5-fachen ist ausreichend', 'Steht in den Tarifbedingungen'],
            ['Jährliche Höchstgrenze', 'Verträge sollten keine Begrenzung bei der jährlichen Erstattung vorsehen', 'Steht in den Tarifbedingungen'],
            ['Wartezeit und Staffel', 'Bei zahlreichen Verträgen acht Monate Wartezeit und Zahnstaffeln über drei bis fünf Jahre', 'Keine Wartezeiten, Zahnstaffel in den ersten drei Kalenderjahren'],
            ['Implantate', 'Auch der Knochenaufbau sollte erstattet werden', 'ZahnPRIVAT 100: Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig. ZahnPRIVAT 75: Implantate, Brücken und Prothesen erstattungsfähig'],
            ['Zahnreinigung', 'Meist gedeckelt, zum Beispiel auf 100 EUR im Kalenderjahr, und kein entscheidendes Argument', 'ZahnPRIVAT 100: professionelle Zahnreinigung ohne Jahresdeckel'],
          ],
          note: 'Verbraucherzentrale: Zahnzusatzversicherung, Risiken und Vorteile. Tarifangaben wortgleich mit den Unterlagen auf healio.de/zahn. Verbindlich sind die Tarifbedingungen.',
        },
        {
          type: 'paragraph',
          text: 'Die Zahnstaffel der UKV lautet in ZahnPRIVAT 90 und 100: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
        },
      ],
    },
    {
      id: 'zwei-wege',
      heading: 'Welche zwei Wege zeigt Healio?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Zuerst zählt eine Frage: Wurde in den letzten 2 Jahren etwas empfohlen oder geplant, oder läuft eine Behandlung schon? Wenn nein, ist es die UKV ZahnPRIVAT mit drei Leistungsstufen ohne Wartezeiten, bei 1 bis 3 fehlenden Zähnen mit Zuschlag je Zahn. Wenn ja, kommt der Baustein ZAHN Sofort der Bayerischen in Frage, sofern dir keine Zähne fehlen und es keine Zahn-Vorgeschichte gibt. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Der Baustein ist nur zusammen mit einem neuen Zahntarif wählbar, und der Abschluss muss vor der Rechnung erfolgen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Beide Wege mit allen Bedingungen stehen in den Überblicken ' },
            { text: 'UKV Zahnzusatzversicherung', to: '/ratgeber/ukv-zahnzusatzversicherung' },
            { text: ' und ' },
            { text: 'Bayerische Zahnzusatzversicherung', to: '/ratgeber/bayerische-zahnzusatzversicherung' },
            { text: '. Was ab dem ersten Tag gilt, erklärt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
            { text: ', die Kosten eines Implantats ' },
            { text: 'Zahnimplantat Kosten', to: '/ratgeber/zahnimplantat-kosten' },
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
      ],
    },
    {
      id: 'ehrlich',
      heading: 'Wo hat diese Rechnung Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Diese Seite kürt keinen besten Tarif.', text: 'Die Seite zeigt, worauf es ankommt, und zwei Wege, die Healio anbietet. Welcher Tarif zu dir passt, hängt von deinen Zähnen, deinem Alter und deinem Budget ab.' },
            { lead: 'Die Beispiele sind keine Preisangaben.', text: 'Die Beiträge in der Tabelle sind angenommen, der Eigenanteil bei Krone, Brücke und Implantat ist gerechnet. Deine Rechnung entsteht in deiner Praxis, und ein Tarif erstattet nur den erstattungsfähigen Teil.' },
            { lead: 'Ein Tarif ist für künftige Kosten da.', text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung.' },
            { lead: 'Beitrag und Leistung können sich ändern.', text: 'Laut Verbraucherzentrale bleibt der Beitrag nicht stabil. Verbindlich entscheidet der Versicherer im Antrag über Annahme und Leistung.' },
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
              icon: 'dental',
              tone: 'sky',
              title: 'UKV ZahnPRIVAT im Überblick',
              text: 'Drei Stufen ohne Wartezeit und ihre Grenzen.',
              to: '/ratgeber/ukv-zahnzusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'butter',
              title: 'Zahnimplantat Kosten',
              text: 'Was ein Implantat kostet und wie die Staffel wirkt.',
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
      question: 'Was ist eine Zahnzusatzversicherung?',
      answer:
        'Eine private Versicherung, die einen Teil der Zahnkosten übernimmt, die nach dem Zuschuss der Kasse bei dir bleiben. Laut Verbraucherzentrale bezieht sie sich in der Hauptsache auf hochwertigen Zahnersatz wie Implantate, Brücken und Kronen.',
    },
    {
      question: 'Lohnt sich eine Zahnzusatzversicherung für junge Menschen?',
      answer:
        'Laut Verbraucherzentrale eher nicht: Statistisch wird Zahnersatz erst ab Mitte 30 bis Anfang 40 nötig. Auch Ältere sollten abwägen, welche Leistungen der Tarif im Vergleich zum Preis bietet.',
    },
    {
      question: 'Lohnt sich eine Zahnzusatzversicherung, wenn schon etwas angeraten wurde?',
      answer:
        'Ein normaler Tarif zahlt genau diese Behandlung nicht. Bei der UKV gilt: Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist sie nicht versichert, liegt das länger zurück, ist sie wieder versichert. Für Behandlungen der letzten 2 Jahre gibt es den Baustein ZAHN Sofort der Bayerischen, der vor der Rechnung abgeschlossen sein muss.',
    },
    {
      question: 'Wie rechne ich, ob sich eine Zahnzusatzversicherung lohnt?',
      answer:
        'Monatsbeitrag mal 12 mal die Jahre bis zum Zahnersatz, verglichen mit dem Eigenanteil, den der Tarif erstattet. Beitragserhöhungen und die Zahnstaffel der ersten Jahre gehören in die Rechnung. Deinen Beitrag zeigt der Tarifrechner vor dem Antrag.',
    },
    {
      question: 'Was ist eine Zahnstaffel?',
      answer:
        'Eine Grenze für die Erstattung in den ersten Jahren. In ZahnPRIVAT 90 und 100 gilt sie in den ersten drei Kalenderjahren: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel.',
    },
    {
      question: 'Bleibt der Beitrag einer Zahnzusatzversicherung gleich?',
      answer:
        'Laut Verbraucherzentrale nicht: Er wird erhöht, wenn die Ausgaben der Versicherung steigen, und zahlreiche Tarife sehen vor, dass er mit dem Alter steigt.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Frag deine Praxis nach dem, was bei dir ansteht, und schreib dir die Zahlen auf. Welcher Weg bei deiner Situation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse beim Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Ob dein Kassenbonus den Beitrag mittragen kann, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Einordnung und Prüfpunkte stammen von der Verbraucherzentrale, Zuschüsse und Beträge aus Gesetz und G-BA-Richtlinie, Tarifaussagen aus den Unterlagen auf healio.de/zahn.',
    items: [
      {
        label: 'Zahnzusatzversicherung, Risiken und Vorteile',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293',
        stand: '23.07.2026',
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
        label: 'Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026, Befunde 1.1 und 2.1',
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
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz (Verkündung)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zahn-Check und Tarifübersicht UKV ZahnPRIVAT und ZAHN Sofort',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/zahn',
        stand: '05.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        stand: '05.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Annahmeregeln nach dem Stand der genannten Unterlagen, maßgeblich sind immer die Bedingungen des Versicherers.',
};

export default article;
