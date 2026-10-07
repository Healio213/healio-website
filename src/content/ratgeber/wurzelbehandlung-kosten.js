/**
 * Zahn-Ratgeber Welle 1, Seite Z3: Wurzelbehandlung, wann die Kasse zahlt und
 * was privat kostet.
 *
 * Quellen (Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abruf
 * 06.10.2026): B3 (G-BA-Behandlungsrichtlinie B.III Nr. 9 und 10 mit den drei
 * Backenzahn-Bedingungen wörtlich, Gemeinsame Erklärung KZBV und
 * GKV-Spitzenverband, Verbraucherzentrale, Patientenportal der Hamburger
 * Zahnärzte, GOZ-Punktzahlen) und B1 (GOZ-Punktwert, § 5 GOZ). Tarifaussagen
 * wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne für private Wurzelbehandlungen: Die neutralen Quellen
 *     nennen keine, nur "im vierstelligen Bereich" für eine komplett private
 *     Behandlung (Verbraucherzentrale). Die Kostenkarte zeigt deshalb, wer was
 *     trägt, und rechnet nur einzelne GOZ-Positionen aus Punktzahl, Punktwert
 *     5,62421 Cent und Faktor (eigene Rechnung, so gekennzeichnet). Die
 *     früheren Beispielbeträge 300 und 1.200 EUR sind seit der Faktenprüfung
 *     vom 06.10.2026 entfernt (PRUEFBERICHT-WELLE1.md).
 *   - Der Begriff Mehrkostenvereinbarung steht nicht in den Belegen, die Seite
 *     spricht von privat vereinbarten Zusatzleistungen.
 *   - Revision: Die Richtlinie sieht sie unter Bedingungen als angezeigt vor,
 *     die Verbraucherzentrale nennt sie fast immer privat. Beides steht dort,
 *     nie "nie Kassenleistung".
 *   - Keine Behandlungsempfehlung, keine Beitragsangabe für ZAHN Sofort.
 *   - Der Rechner-Block fehlt bewusst (Briefing Abschnitt 5, Z3).
 */

export const article = {
  slug: 'wurzelbehandlung-kosten',
  kind: 'ratgeber',

  metaTitle: 'Wurzelbehandlung Kosten: wann die Kasse zahlt | Healio',
  metaDescription:
    'Wurzelbehandlung beim Zahnarzt: wann sie Kassenleistung ist, welche Zusatzleistungen privat kosten und was eine Zahnzusatzversicherung davon erstattet.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Wurzelbehandlung: wann die Kasse zahlt und was privat kostet',
  listTeaser:
    'Wann die Wurzelbehandlung Kassenleistung ist, welche Extras privat kosten und was ein Tarif davon trägt, mit den Regeln der Richtlinie im Wortlaut.',

  headline: 'Wurzelbehandlung: wann die Kasse zahlt und was privat kostet',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: 'Kassenleistung', label: 'bei einem Zahn, der als erhaltungswürdig gilt' },
      { value: 'vierstellig', label: 'kann eine ganz private Behandlung werden (Verbraucherzentrale)' },
    ],
    text: 'Die Kasse zahlt die Wurzelbehandlung eines erhaltungswürdigen Zahns. Extras wie Operationsmikroskop oder elektronische Längenmessung zahlst du meist selbst.',
    path: { to: '/zahn#zahn-check', text: 'Wurzelbehandlung angeraten oder geplant?', label: 'Zahn-Check starten' },
  },

  lead: 'Eine Wurzelbehandlung ist Kassenleistung, wenn dein Zahn nach der Behandlungsrichtlinie des Gemeinsamen Bundesausschusses (G-BA) erhaltungswürdig ist. Für Molaren, die großen Backenzähne, nennt die Richtlinie dafür drei Regelbeispiele. Privat wird es bei Zusatzleistungen und bei Backenzähnen, die keine Kassenbedingung erfüllen.',

  sections: [
    {
      id: 'zahlt-die-kasse',
      heading: 'Zahlt die Krankenkasse die Wurzelbehandlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, wenn der Zahn als erhaltungswürdig eingestuft wird, so fasst es die Verbraucherzentrale zusammen (Stand 22.10.2025). Die Grundlage ist die Behandlungsrichtlinie des G-BA. Danach können Zähne mit Erkrankungen oder traumatischen Schädigungen der Pulpa und Zähne mit abgestorbenem Zahnmark in der Regel durch eine Wurzelbehandlung erhalten werden.',
        },
        {
          type: 'paragraph',
          text: 'Für jede Wurzelbehandlung auf Kassenkosten gilt eine Bedingung. Der Wurzelkanal muss sich aufbereiten und bis oder bis nahe an die Wurzelspitze füllen lassen. Medikamentöse Einlagen sind grundsätzlich auf drei Sitzungen beschränkt.',
        },
      ],
    },
    {
      id: 'backenzahn',
      heading: 'Wann zahlt die Kasse die Wurzelbehandlung bei Backenzähnen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für Molaren, die großen Backenzähne, wird die Richtlinie genauer. Danach ist die Wurzelkanalbehandlung von Molaren in der Regel angezeigt, wenn',
        },
        {
          type: 'list',
          items: [
            'damit eine geschlossene Zahnreihe erhalten werden kann,',
            'eine einseitige Freiendsituation vermieden wird,',
            'der Erhalt von funktionstüchtigem Zahnersatz möglich wird.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Einseitige Freiendsituation heißt, dass die Zahnreihe auf einer Seite hinten frei endet, weil dort Zähne fehlen. Laut einer gemeinsamen Erklärung von KZBV und GKV-Spitzenverband sind diese drei Fälle Regelbeispiele, die nicht abschließend sind. Auch bei Molaren ist demnach zu prüfen, ob andere Gründe für die Erhaltungswürdigkeit sprechen.',
        },
        {
          type: 'paragraph',
          text: 'Erfüllt ein Backenzahn keine der Bedingungen, ist die Wurzelbehandlung nach Angabe der Verbraucherzentrale keine Kassenleistung. Dann ist sie vollständig Privatleistung, und die Kosten können je nach Aufwand im vierstelligen Bereich liegen.',
        },
      ],
    },
    {
      id: 'privat',
      heading: 'Was wird bei der Wurzelbehandlung privat berechnet?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Neben der Kassenbehandlung gibt es Leistungen, die du mit der Praxis privat vereinbarst. Die Verbraucherzentrale nennt das Operationsmikroskop, die elektronische Längenmessung und spezielle Desinfektionsmethoden als meist selbst zu zahlende Zusatzleistungen. Das Patientenportal der Hamburger Zahnärzte nennt außerdem die physikalisch-chemische Kanalaufbereitung und die Laser-Sterilisation: Die gesetzlichen Krankenversicherungen übernehmen sie nicht, sie können aber privat vereinbart werden.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Privat abgerechnete Leistungen der Wurzelbehandlung nach der Gebührenordnung für Zahnärzte (GOZ)',
          head: ['GOZ-Nummer', 'Leistung', 'Punkte'],
          rows: [
            ['2400', 'Elektrometrische Längenbestimmung eines Wurzelkanals', '70, höchstens zweimal je Kanal und Sitzung'],
            ['2410', 'Aufbereitung eines Wurzelkanals, je Kanal', '392'],
            ['2420', 'Zusätzliche elektrophysikalisch-chemische Methoden, je Kanal', '70'],
            ['2440', 'Füllung eines Wurzelkanals', '258'],
            ['0110', 'Zuschlag Operationsmikroskop', '400, je Behandlungstag nur einmal und nur mit dem einfachen Gebührensatz'],
          ],
          note: 'Die Rechnung ergibt sich aus Punktzahl mal Punktwert (5,62421 Cent) mal Faktor, der Faktor liegt zwischen dem Einfachen und dem Dreieinhalbfachen (§ 5 GOZ). Einmal verwendbare Nickel-Titan-Instrumente zur Aufbereitung darf die Praxis gesondert berechnen.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine Wurzelbehandlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die private Rechnung setzt sich aus einzelnen Positionen der Gebührenordnung zusammen, viele davon je Kanal, mit einem Faktor zwischen dem Einfachen und dem Dreieinhalbfachen. Wird ein Backenzahn komplett privat behandelt, können die Kosten laut Verbraucherzentrale je nach Aufwand im vierstelligen Bereich liegen.',
        },
        {
          type: 'paragraph',
          text: 'Was bei dir anfällt, hängt davon ab, wie viele Kanäle behandelt werden, welche Zusatzleistungen du vereinbarst und mit welchem Faktor die Praxis abrechnet. Du kannst deine Praxis bitten, die privaten Leistungen vorab mit Preis aufzulisten.',
        },
      ],
    },
    {
      id: 'revision',
      heading: 'Zahlt die Kasse auch eine Revision der Wurzelfüllung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei einer Revision wird eine ältere Wurzelfüllung erneut behandelt. Die Richtlinie sieht sie bei nicht randständigen oder undichten Wurzelkanalfüllungen in der Regel als angezeigt, wenn dieselben drei Bedingungen wie bei Backenzähnen vorliegen. Bei Zähnen mit Wurzelfüllung und Veränderung an der Wurzelspitze nennt sie primär chirurgische Maßnahmen. Die Verbraucherzentrale nennt die Revision fast immer eine Privatleistung. Wie deine Praxis deinen Fall einordnet, fragst du am besten dort.',
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Was erstattet eine Zahnzusatzversicherung bei der Wurzelbehandlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine private Rechnung kann ein Zahntarif tragen, wenn die Behandlung versichert ist. Die UKV ZahnPRIVAT hat drei Leistungsstufen ohne Wartezeiten. In ZahnPRIVAT 100 erstattet der Tarif 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. In ZahnPRIVAT 75 sind es 75 % der erstattungsfähigen Kosten, ebenfalls nach Abzug der Kassenleistung.',
        },
        {
          type: 'paragraph',
          text: 'In den ersten Jahren begrenzt eine Staffel die Erstattung. In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
        },
        {
          type: 'paragraph',
          text: 'Entscheidend ist der Zeitpunkt. Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Läuft die Behandlung schon, zählt das immer. Wurde dir eine Wurzelbehandlung in den letzten 2 Jahren schon empfohlen, zahlt ein normaler Zahntarif sie also nicht.',
        },
      ],
    },
    {
      id: 'schon-angeraten',
      heading: 'Was ist, wenn die Wurzelbehandlung schon angeraten wurde?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für diesen Fall gibt es den Baustein ZAHN Sofort der Bayerischen. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Dafür gelten feste Bedingungen.',
        },
        {
          type: 'list',
          items: [
            'Der Baustein ist nur zusammen mit einem neuen Zahntarif der Bayerischen wählbar.',
            'Der Baustein endet nach 24 Monaten, der Zahntarif läuft weiter.',
            'Der Abschluss muss vor der Rechnung erfolgen. Die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein.',
            'Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Wartezeiten hängen bei der Bayerischen am gewählten Zahntarif, sie stehen im Antrag und im Versicherungsschein. Die Annahme und der genaue Leistungsumfang werden verbindlich im Antrag geprüft.',
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Ist die Behandlung schon angeraten oder läuft sie? Der Zahn-Check zeigt dir den Weg, der heute noch offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'kostenkarte',
      heading: 'Was bleibt an dir hängen, mit und ohne Tarif?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Karte zeigt, wer welchen Teil trägt. Die Euro-Beträge der Zusatzleistungen sind aus der Gebührenordnung gerechnet, deine Praxis nennt dir ihre eigenen.',
        },
        {
          type: 'costCard',
          title: 'Wurzelbehandlung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100 im ersten Kalenderjahr: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR. Der Vertrag besteht schon, bevor die Behandlung angeraten wird, außer in der letzten Zeile.',
          caption: 'Kostenkarte: Wurzelbehandlung mit und ohne Zahntarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Zahn erhaltungswürdig, Behandlung als Kassenleistung', 'die Wurzelbehandlung nach der G-BA-Richtlinie', 'nur, was du privat dazu vereinbarst', 'Der Tarif erstattet die privat vereinbarten Leistungen, soweit erstattungsfähig'],
            ['Elektronische Längenmessung, GOZ 2400 (70 Punkte), je Messung', 'meist nicht', '9,05 EUR beim 2,3-fachen Satz, je nach Faktor 3,94 bis 13,78 EUR', 'Der Tarif erstattet den erstattungsfähigen Betrag'],
            ['Zuschlag Operationsmikroskop, GOZ 0110 (400 Punkte), je Behandlungstag', 'meist nicht', '22,50 EUR, nur mit dem einfachen Satz', 'Der Tarif erstattet den erstattungsfähigen Betrag'],
            ['Backenzahn ohne Kassenbedingung, komplett privat', 'keine Kassenleistung', 'je nach Aufwand im vierstelligen Bereich möglich', 'Der Tarif erstattet im ersten Kalenderjahr bis zu 1.000 EUR, den Rest trägst du'],
            ['Wie die Zeile davor, aber in den letzten 2 Jahren vor Abschluss angeraten', 'keine Kassenleistung', 'je nach Aufwand im vierstelligen Bereich möglich', 'Nicht versichert. ZAHN Sofort nur vor der Rechnung prüfen'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Die Euro-Beträge sind eigene Rechnung nach der Gebührenordnung für Zahnärzte: Punktzahl mal Punktwert 5,62421 Cent mal Faktor (§ 5 GOZ, Gebührenverzeichnis zuletzt geändert 05.12.2011), auf volle Cent gerundet. Vierstelliger Bereich laut Verbraucherzentrale, Stand 22.10.2025. Was erstattungsfähig ist, steht in den Tarifbedingungen, bei Unfall gilt keine Zahnstaffel. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ob dein Zahn erhaltungswürdig ist, entscheidet deine Praxis.', text: 'Welche Bedingungen bei dir erfüllt sind, steht nicht auf dieser Seite, sondern in deinem Befund. Dieser Ratgeber gibt keine Behandlungsempfehlung.' },
            { lead: 'Deine Rechnung entsteht in deiner Praxis.', text: 'Wie viele Kanäle, welche Zusatzleistungen und welcher Faktor, das bestimmt den Betrag. Darum stehen hier Rechenweg und Punktzahlen statt eines Pauschalpreises.' },
            { lead: 'Ein Zahntarif zahlt nicht, was schon angeraten wurde.', text: 'Was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft, ist nicht versichert. Im ersten Kalenderjahr erstattet der Tarif außerdem höchstens 1.000 EUR, außer bei Unfall.' },
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
              title: 'Zahnkrone: Arten, Kosten und Festzuschuss',
              text: 'Wenn nach der Wurzelbehandlung eine Krone ansteht.',
              to: '/ratgeber/zahnkrone-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'butter',
              title: 'Zahnzusatzversicherung ohne Wartezeit',
              text: 'Was ab dem ersten Tag gilt und wo die Staffel greift.',
              to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'prevention',
              tone: 'lavender',
              title: 'Professionelle Zahnreinigung',
              text: 'Was sie kostet und was deine Kasse dazugibt.',
              to: '/ratgeber/professionelle-zahnreinigung-kosten',
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
      question: 'Ist eine Wurzelbehandlung Kassenleistung?',
      answer:
        'Ja, wenn der Zahn erhaltungswürdig ist und sich der Wurzelkanal bis nahe an die Wurzelspitze aufbereiten und füllen lässt. Das folgt aus der Behandlungsrichtlinie des G-BA. Die Praxis beurteilt das nach deinem Befund.',
    },
    {
      question: 'Zahlt die Krankenkasse die Wurzelbehandlung bei Backenzähnen?',
      answer:
        'Für Molaren, die großen Backenzähne, nennt die Richtlinie drei Fälle, nämlich den Erhalt einer geschlossenen Zahnreihe, die Vermeidung einer einseitigen Freiendsituation und den Erhalt von funktionstüchtigem Zahnersatz. Laut KZBV und GKV-Spitzenverband sind sie nicht abschließend. Erfüllt ein Backenzahn keine der Bedingungen, ist die Behandlung nach der Verbraucherzentrale keine Kassenleistung.',
    },
    {
      question: 'Was kostet eine Wurzelbehandlung?',
      answer:
        'Das hängt vom Aufwand ab. Ist der Zahn erhaltungswürdig, zahlt die Kasse die Behandlung, privat kommen nur vereinbarte Zusatzleistungen dazu. Wird ein Backenzahn komplett privat behandelt, können die Kosten laut Verbraucherzentrale im vierstelligen Bereich liegen. Abgerechnet wird nach GOZ-Punkten, Punktwert und Faktor.',
    },
    {
      question: 'Welche Zusatzleistungen muss ich selbst zahlen?',
      answer:
        'Meist selbst zu zahlen sind laut Verbraucherzentrale das Operationsmikroskop, die elektronische Längenmessung und spezielle Desinfektionsmethoden. Du vereinbarst sie privat mit deiner Praxis.',
    },
    {
      question: 'Zahlt meine Zahnzusatzversicherung eine schon angeratene Wurzelbehandlung?',
      answer:
        'Nein, nicht bei der UKV: Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Für diesen Fall gibt es den Baustein ZAHN Sofort der Bayerischen, der vor der Rechnung abgeschlossen sein muss.',
    },
    {
      question: 'Zahlt die Kasse eine Revision der Wurzelfüllung?',
      answer:
        'Die Richtlinie sieht die Revision unter denselben drei Bedingungen wie bei Backenzähnen in der Regel als angezeigt vor. Die Verbraucherzentrale nennt sie fast immer eine Privatleistung. Frag deine Praxis, wie sie deinen Fall einordnet.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Ob eine Zahnzusatzversicherung zu deiner Situation passt, siehst du in einer Minute im Zahn-Check auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse bei Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Die Regeln der Kasse, die privaten Leistungen und die Punktzahlen stammen aus diesen Quellen.',
    items: [
      {
        label: 'Behandlungsrichtlinie, Abschnitt B.III Nr. 9 und 10',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-2784/RL-Z_Behandlung_2021-12-16_iK-2022-03-09.pdf',
        stand: 'geändert 16.12.2021, in Kraft seit 09.03.2022',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Gemeinsame Erklärung zu Wurzelkanalbehandlungen von Molaren',
        publisher: 'KZBV und GKV-Spitzenverband (über KZV Berlin)',
        href: 'https://www.kzv-berlin.de/fileadmin/user_upload_kzv/Praxis-Service/1_Abrechnung/1_Kons.-Chirurgie/Erklaerung_Molaren_KZBV_GKVSV.pdf',
        stand: 'ohne Datum',
        accessedAt: '06.10.2026',
        note: 'Das Dokument bezieht sich auf die Richtlinie in der Fassung von 2004',
      },
      {
        label: 'Wurzelbehandlung: So läuft sie ab und das zahlt die Krankenkasse',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/wurzelbehandlung-so-laeuft-sie-ab-und-das-zahlt-die-krankenkasse-111087',
        stand: '22.10.2025',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Wurzelkanalbehandlung (Patientenportal)',
        publisher: 'Zahnärztekammer und KZV Hamburg',
        href: 'https://www.zahnaerzte-hh.de/patientenportal-der-hamburger-zahnaerzte/wissen/fachinformationen-von-a-z/wurzelkanalbehandlung',
        stand: 'ohne Datum',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GOZ, Anlage 1 (Gebührenverzeichnis), Nr. 0110, 2400 bis 2440',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/goz_1987/anlage_1.html',
        stand: '05.12.2011',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GOZ § 5 (Punktwert und Gebührenrahmen)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/goz_1987/__5.html',
        stand: '05.12.2011',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        stand: '05.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 6. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
