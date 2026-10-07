/**
 * Serie Zähne, Stapel zahn-kasse-partner, Seite bayerische-zahnzusatzversicherung
 * (Welle A, Partnerseite, Hauptbegriff "die bayerische zahnzusatzversicherung").
 *
 * Quellen (Abruf 07.10.2026, Belege je Aussage in
 * bayerische-zahnzusatzversicherung.belege.md):
 *   - Tarifaussagen NUR aus src/components/sections/dental/dentalContent.js
 *     (deutsche Fassung) und der Live-Seite https://healio.de/zahn: ZAHN Sofort
 *     als Zusatzbaustein zu einem neuen Zahntarif der Bayerischen, bis zu 750 EUR
 *     je Kalenderjahr, insgesamt bis zu 1.500 EUR, Ende nach 24 Monaten, Abschluss
 *     vor der Rechnung, Voraussetzung "keine Zähne fehlen, keine Zahn-Vorgeschichte".
 *   - Fremdbelege: G-BA Festzuschuss-Richtlinie (Beispiel Metallkrone), SGB V § 55
 *     und § 87 Abs. 1a (Heil- und Kostenplan vor Behandlungsbeginn),
 *     Verbraucherzentrale (bereits notwendige Behandlungen werden in der Regel
 *     nicht einbezogen).
 *
 * Bewusste Grenzen:
 *   - Healio zeigt die Bayerische nur für den Sofortschutz-Weg. Die Seite sagt
 *     das offen und stellt keinen allgemeinen Tarifüberblick der Bayerischen
 *     (Tarifnamen, Stufen, Leistungsbeträge) vor, weil dentalContent und /zahn
 *     dazu nichts enthalten.
 *   - Kein Beitrag für ZAHN Sofort oder den Zahntarif (steht nicht in den
 *     Quellen; der Beitrag steht im Rechner der Bayerischen).
 *   - Keine Wartezeitangabe außer dem erlaubten Satz: Wartezeiten hängen bei der
 *     Bayerischen am gewählten Zahntarif, sie stehen im Antrag und im
 *     Versicherungsschein.
 *   - Keine Test- oder Siegelnoten (Nutzungsrechte laut Kommentar in
 *     HealioAwardsRow offen, Bewertung gilt dort nur für den Tarif ZAHN Prestige,
 *     nicht für ZAHN Sofort), keine Aussagen aus Annahmerichtlinien oder dem
 *     Highlightblatt über /zahn hinaus (etwa Beitrag 29,90 EUR im Ratgeber zum
 *     fehlenden Zahn).
 *   - Die Kostenkarte nennt keinen Betrag, den der Baustein im Einzelfall
 *     erstattet: Welche Kosten er in welcher Höhe trägt, steht nicht in den
 *     Quellen. Sie zeigt, wann er wählbar ist und wann nicht.
 *   - "Vor der Rechnung" heißt laut dentalContent: Die Behandlung darf weder
 *     abgeschlossen noch abgerechnet sein (bei der Prüfung am 07.10.2026 an
 *     zwei Stellen ergänzt, vorher hieß es nur "bis zur Rechnung").
 *
 * Faktenprüfung 07.10.2026: PRUEFBERICHT-zahn-kasse-partner.md.
 */

export const article = {
  slug: 'bayerische-zahnzusatzversicherung',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Bayerische Zahnzusatzversicherung mit ZAHN Sofort | Healio',
  metaDescription:
    'Bayerische Zahnzusatzversicherung: ZAHN Sofort für schon empfohlene oder begonnene Behandlungen, bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Bayerische Zahnzusatzversicherung mit ZAHN Sofort im Überblick',
  listTeaser:
    'Für Behandlungen, die schon empfohlen oder begonnen sind: wie ZAHN Sofort funktioniert, wann er wählbar ist und wo er endet.',

  headline: 'Bayerische Zahnzusatzversicherung mit ZAHN Sofort im Überblick',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: 'bis 1.500 EUR', label: 'insgesamt möglich, bis zu 750 EUR je Kalenderjahr' },
      { value: '24 Monate', label: 'Laufzeit des Bausteins, der Zahntarif läuft weiter' },
      { value: 'vor der Rechnung', label: 'muss der Abschluss erfolgen' },
    ],
    text: 'ZAHN Sofort ist für Behandlungen gedacht, die ein normaler Zahntarif nicht zahlt, weil sie schon empfohlen oder begonnen sind.',
    path: { to: '/zahn#zahn-check', text: 'Behandlung steht an? Weg prüfen', label: 'Zahn-Check starten' },
  },

  lead: 'Bei der Bayerischen zeigt Healio einen einzigen Weg, den Baustein ZAHN Sofort. Er ist für Behandlungen da, die in den letzten 2 Jahren empfohlen oder geplant wurden oder schon laufen. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR, wenn Abschluss und Rechnung zeitlich richtig liegen. Er braucht einen neuen Zahntarif der Bayerischen, endet nach 24 Monaten und verlangt, dass keine Zähne fehlen. Alle anderen Situationen laufen über die UKV.',

  sections: [
    {
      id: 'welcher-weg',
      heading: 'Welche Zahnzusatzversicherung der Bayerischen zeigt Healio?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nur den Sofortschutz. Auf healio.de/zahn gibt es zwei Wege, und die Bayerische steht für den zweiten: für Behandlungen, die in den letzten 2 Jahren empfohlen oder geplant wurden oder schon laufen. Ein normaler Zahntarif zahlt genau diese Behandlung nicht, dafür gibt es den Sofortschutz.',
        },
        {
          type: 'paragraph',
          text: 'Wer nichts empfohlen bekommen hat und bei wem nichts läuft, landet bei der UKV ZahnPRIVAT. Das gilt auch bei 1 bis 3 fehlenden Zähnen, die die UKV mit Zuschlag je Zahn aufnimmt. Einen allgemeinen Tarifüberblick der Bayerischen findest du hier deshalb nicht. Diese Seite sagt dir, was der Sofortschutz kann und wo er endet.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Den anderen Weg, mit drei Leistungsstufen und ohne Wartezeiten, zeigt der Überblick ' },
            { text: 'UKV Zahnzusatzversicherung', to: '/ratgeber/ukv-zahnzusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'zahn-sofort',
      heading: 'Was ist ZAHN Sofort?',
      blocks: [
        {
          type: 'paragraph',
          text: 'ZAHN Sofort ist ein Zusatzbaustein zu einem neuen Zahntarif der Bayerischen. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Der Baustein endet nach 24 Monaten, der Zahntarif läuft weiter.',
        },
        {
          type: 'paragraph',
          text: 'Zwei Dinge fallen auf. Zu einem bestehenden Vertrag lässt sich der Baustein nicht nachträglich wählen, nur bei einem Neuabschluss. Und die Beträge sind Höchstwerte: Bis zu 1.500 EUR können möglich sein, wenn Abschluss und Rechnung zeitlich richtig liegen.',
        },
      ],
    },
    {
      id: 'voraussetzungen',
      heading: 'Welche Voraussetzungen hat ZAHN Sofort?',
      blocks: [
        {
          type: 'list',
          items: [
            { lead: 'Neuer Zahntarif.', text: 'Der Baustein ist nur zusammen mit einem neuen Zahntarif der Bayerischen wählbar.' },
            { lead: 'Abschluss vor der Rechnung.', text: 'Die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein.' },
            { lead: 'Es fehlen keine Zähne.', text: 'Fehlt dir schon ein Zahn, passt dieser Weg nicht.' },
            { lead: 'Keine Zahn-Vorgeschichte.', text: 'Der Zahn-Check fragt zum Beispiel nach Parodontitis in den letzten 3 Jahren, einer herausnehmbaren Prothese oder Zahnersatz, der älter als 10 Jahre ist.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Auch die Annahme ist keine Formsache. Die Annahme und der genaue Leistungsumfang werden verbindlich im Antrag geprüft, und die Gesundheitsfragen beantwortest du vollständig und wahrheitsgemäß. Die Verbraucherzentrale sagt dazu allgemein, dass Behandlungen, die bereits notwendig sind, in der Regel nicht in den Vertrag einbezogen werden. ZAHN Sofort ist die Ausnahme für diesen Fall, mit den Bedingungen oben.',
        },
      ],
    },
    {
      id: 'vor-der-rechnung',
      heading: 'Was heißt vor der Rechnung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Abschluss muss erfolgen, bevor die Praxis die Behandlung abrechnet. Eine bereits abgeschlossene oder abgerechnete Behandlung ist nicht umfasst. Für Zahnersatz hilft dir der Ablauf: Die Praxis erstellt vor Beginn der Behandlung einen Heil- und Kostenplan, und die Kasse prüft ihn vor Beginn (§ 87 Abs. 1a SGB V). Zwischen Plan und Rechnung liegen die Prüfung der Kasse und die Behandlung selbst. Solange die Behandlung weder abgeschlossen noch abgerechnet ist, kannst du den Baustein noch beantragen, danach nicht mehr.',
        },
        {
          type: 'steps',
          heading: 'So gehst du vor',
          items: [
            { title: 'Zahn-Check', text: 'Er dauert etwa eine Minute und braucht keine Kontaktdaten. Frage 1 trennt, ob in den letzten 2 Jahren etwas empfohlen wurde oder schon läuft.' },
            { title: 'Sofortschutz berechnen', text: 'Ergibt der Check den Weg ZAHN Sofort, rechnest du den Baustein samt Zahntarif durch und siehst deinen Beitrag, bevor du den Antrag abschickst.' },
            { title: 'Antrag vor der Rechnung', text: 'Schließe ab, solange die Behandlung weder abgeschlossen noch abgerechnet ist. Die Bayerische entscheidet im Antrag verbindlich über Annahme und Leistungsumfang.' },
          ],
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wann ist ZAHN Sofort wählbar und wann nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nimm eine Metallkrone als Regelversorgung. Der G-BA setzt dafür 2026 insgesamt 398,39 EUR an (Befund 1.1). Die Kasse zahlt ohne Bonusheft 60 Prozent davon, das sind 239,03 EUR, für Festzuschüsse, die bis zum 31.12.2026 bewilligt werden. Ohne Tarif bleiben 159,36 EUR bei dir. Was ein Baustein im Einzelfall erstattet, steht in den Bedingungen im Antrag. Die Karte zeigt deshalb, wann der Weg offen ist.',
        },
        {
          type: 'costCard',
          title: 'Metallkrone: wann ZAHN Sofort offen ist',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit dem Baustein ZAHN Sofort der Bayerischen: bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR, nur zusammen mit einem neuen Zahntarif der Bayerischen. Welche Kosten er in welcher Höhe trägt, regeln die Bedingungen im Antrag.',
          caption: 'Kostenkarte: Metallkrone als Regelversorgung, ohne Bonusheft',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Krone angeraten, Heil- und Kostenplan liegt vor, Rechnung noch nicht gestellt', '239,03 EUR', '159,36 EUR', 'Der Weg ZAHN Sofort ist offen, wenn Abschluss und Rechnung zeitlich richtig liegen'],
            ['Krone schon abgerechnet', '239,03 EUR', '159,36 EUR', 'Nicht umfasst, die Behandlung ist abgerechnet'],
            ['Behandlung läuft schon, ist aber weder abgeschlossen noch abgerechnet', '239,03 EUR', '159,36 EUR', 'Der Abschluss vor der Rechnung ist noch möglich'],
            ['Ein Zahn fehlt schon und Ersatz ist angeraten', 'Festzuschuss laut Befund', 'Rest laut Heil- und Kostenplan', 'ZAHN Sofort passt nicht, weil keine Zähne fehlen dürfen'],
          ],
          note: 'Beispiel, keine Preisangabe und keine Erstattungszusage. Regelversorgung und Festzuschuss: G-BA, Festzuschuss-Richtlinie, Beträge ab 01.01.2026, Befund 1.1 (398,39 EUR, 60 Prozent gleich 239,03 EUR); Eigenanteil ist eigene Rechnung. Annahmen: Die Rechnung entspricht der Regelversorgung, kein Bonusheft, kein Härtefall. Baustein nach den Unterlagen auf healio.de/zahn, verbindlich sind die Bedingungen im Antrag.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'wartezeit',
      heading: 'Gibt es bei der Bayerischen Wartezeiten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wartezeiten hängen bei der Bayerischen am gewählten Zahntarif, sie stehen im Antrag und im Versicherungsschein. Auch ohne klassische Wartezeit können Leistungsstaffeln, Höchstgrenzen und Ausschlüsse gelten, und eine bereits bestehende Behandlung ist dadurch nicht automatisch versichert. Schau deshalb vor dem Abschluss auf die Bedingungen deines Zahntarifs.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie lang Wartezeiten in der Krankheitskostenversicherung gesetzlich höchstens sein dürfen und was eine Zahnstaffel ist, erklärt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'welcher-weg-passt',
      heading: 'Bayerische oder UKV: welcher Weg passt zu welcher Situation?',
      blocks: [
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Situation, Weg und was gilt, nach den Tarifunterlagen auf healio.de/zahn',
          head: ['Situation', 'Weg', 'Was gilt'],
          rows: [
            ['In den letzten 2 Jahren empfohlen oder geplant, oder Behandlung läuft', 'Bayerische mit ZAHN Sofort', 'Bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR möglich, Abschluss vor der Rechnung, keine fehlenden Zähne, keine Zahn-Vorgeschichte'],
            ['Nichts empfohlen, nichts geplant, nichts läuft', 'UKV ZahnPRIVAT 75, 90 oder 100', 'Keine Wartezeiten, in den ersten drei Kalenderjahren die Zahnstaffel'],
            ['Vor mehr als 2 Jahren empfohlen, seitdem nichts geplant', 'UKV ZahnPRIVAT', 'Die Behandlung ist wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung.'],
            ['1 bis 3 Zähne fehlen, noch nicht ersetzt', 'UKV ZahnPRIVAT mit Zuschlag je Zahn', 'Aufnahme mit Risikozuschlag je Zahn, ab 4 fehlenden Zähnen keine Aufnahme'],
          ],
          note: 'Die Annahme und der genaue Leistungsumfang werden im Antrag verbindlich geprüft.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Mehr zu Lücken, Zuschlägen und dem Unterschied zwischen fehlendem Zahn und angeratenem Ersatz steht im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '. Wie die Kasse bei einer Wurzelbehandlung zahlt, die schon angeraten ist, zeigt ' },
            { text: 'Wurzelbehandlung Kosten', to: '/ratgeber/wurzelbehandlung-kosten' },
            { text: '.' },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Wurde bei dir in den letzten 2 Jahren etwas empfohlen? Der Zahn-Check zeigt dir den Weg, der heute offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'ehrlich',
      heading: 'Wo hat ZAHN Sofort Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Beträge sind Höchstwerte.', text: 'Bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR sind möglich, nicht zugesagt. Der Baustein endet nach 24 Monaten.' },
            { lead: 'Zu spät ist zu spät.', text: 'Wer erst nach der Rechnung abschließt, hat für diese Behandlung keinen Weg mehr. Der Abschluss muss vor der Rechnung erfolgen.' },
            { lead: 'Ein fehlender Zahn oder eine Zahn-Vorgeschichte schließt den Weg aus.', text: 'Kommt das mit einer angeratenen Behandlung zusammen, klärst du am besten persönlich mit Healio, welche Wege noch prüfbar sind.' },
            { lead: 'Hier steht kein Beitrag.', text: 'Er hängt vom Zahntarif ab und steht im Rechner, bevor du den Antrag abschickst. Verbindlich entscheidet die Bayerische im Antrag.' },
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
              icon: 'calendar',
              tone: 'butter',
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
      question: 'Was ist ZAHN Sofort der Bayerischen?',
      answer:
        'ZAHN Sofort ist ein Zusatzbaustein zu einem neuen Zahntarif der Bayerischen. Bis zu 750 EUR je Kalenderjahr und insgesamt bis zu 1.500 EUR können möglich sein. Der Baustein endet nach 24 Monaten, der Zahntarif läuft weiter.',
    },
    {
      question: 'Bis wann muss ich ZAHN Sofort abschließen?',
      answer:
        'Der Abschluss muss vor der Rechnung erfolgen. Eine bereits abgeschlossene oder abgerechnete Behandlung ist nicht umfasst.',
    },
    {
      question: 'Gilt ZAHN Sofort auch, wenn mir Zähne fehlen?',
      answer:
        'Nein. Voraussetzung ist, dass keine Zähne fehlen und keine Zahn-Vorgeschichte besteht, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese. Bei 1 bis 3 fehlenden Zähnen nimmt die UKV mit Zuschlag je Zahn auf.',
    },
    {
      question: 'Kann ich ZAHN Sofort zu meinem bestehenden Vertrag dazubuchen?',
      answer:
        'Nein, der Baustein ist nur bei einem Neuabschluss wählbar, zusammen mit einem neuen Zahntarif der Bayerischen.',
    },
    {
      question: 'Gibt es bei der Bayerischen Wartezeiten?',
      answer:
        'Wartezeiten hängen bei der Bayerischen am gewählten Zahntarif, sie stehen im Antrag und im Versicherungsschein. Auch ohne klassische Wartezeit können Leistungsstaffeln, Höchstgrenzen und Ausschlüsse gelten.',
    },
    {
      question: 'Welcher Weg passt zu mir, die Bayerische oder die UKV?',
      answer:
        'Zuerst zählt eine Frage: Wurde in den letzten 2 Jahren eine Behandlung empfohlen oder geplant, oder läuft sie schon? Wenn nein, ist es die UKV ZahnPRIVAT. Wenn ja, ist die Bayerische mit ZAHN Sofort der Weg, sofern dir keine Zähne fehlen und es keine Zahn-Vorgeschichte gibt.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Ob bei dir etwas empfohlen wurde und welcher Weg offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse bei Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt und ob ihr Bonus den Beitrag mittragen kann, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Bedingungen von ZAHN Sofort stammen aus den Unterlagen, wie sie auf healio.de/zahn stehen. Regelversorgung, Heil- und Kostenplan und Einordnung belegen diese Quellen.',
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
        label: 'SGB V § 87 Abs. 1a (Heil- und Kostenplan vor Behandlungsbeginn)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__87.html',
        stand: 'Abruf 07.10.2026',
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
