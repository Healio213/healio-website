/**
 * Ratgeber-Serie, Feld Vorsorge (group 'vorsorge'), Seite: Hautkrebsscreening.
 * Hauptbegriff "hautkrebsscreening", Angebotspfad /ambulant.
 *
 * SPERRLISTEN-KANDIDAT (Krebsvorsorge, Entscheidung der Marktanalyse-Sitzung
 * 07.10.2026): Der Pfad /ratgeber/hautkrebsscreening gehört in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js) und
 * ANALYTICS_EXCLUDED_PATHS (src/lib/analytics.js).
 *
 * Faktenprüfung 07.10.2026 (PRÜFBERICHT-brille-vorsorge.md): Satzungstabelle
 * gegen KassenBoost geprüft (satzungs-leistungen.server.ts, erhoben
 * 26.08.2026), im Text "Satzungen ausgewertet im August 2026"; Stichproben
 * dak.de (01.10.2026: 17 bis 34 Jahre, Satzung laut KassenBoost 18 bis 34,
 * Satzung maßgeblich), hkk.de und sbk.org deckungsgleich. IKK classic:
 * Hautkrebs ist § 34q. Statusangabe wie Zahn-Welle 1.
 *
 * Quellen (Belege: hautkrebsscreening.belege.md, Abruf 07.10.2026):
 * G-BA Krebsfrüherkennungs-Richtlinie (§§ 28 bis 31, § 2; zuletzt geändert
 * 18.12.2025, in Kraft seit 12.03.2026), gesund.bund.de (Krebsfrüherkennung,
 * Stand 25.03.2025; Check-up, Stand 06.10.2025), Verbraucherzentrale (Stand
 * 09.06.2026: Dermatoskop seit April 2020, privat unter 35, Nutzen unklar),
 * IGeL-Monitor (Dermatoskopie, Stand 07.12.2020), Satzungen der Kassen
 * (Fundstellen in der Tabelle; TK-Satzung Stand 17.04.2026 selbst gelesen).
 * Tarifaussagen wortgleich mit src/i18n/locales/de/ambulant.json
 * (vorsorgeBaustein) und der Töpfe-Anzeige auf /ambulant.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Angabe für die private Untersuchung: Neutral belegt ist nur,
 *     dass sie nach der GOÄ abgerechnet wird und je Praxis verschieden ist.
 *   - Kein Nutzenversprechen. Der Nutzen ist laut Verbraucherzentrale nicht
 *     ausreichend untersucht, die Seite sagt das und empfiehlt weder
 *     Teilnahme noch Verzicht.
 *   - Zusatzleistungen (Satzung, Baustein) getrennt von der Kassenleistung.
 *     Der Baustein erstattet nur Rechnungen für ärztliche Vorsorge, nie
 *     Behandlung bei Verdacht.
 *   - Keine Behandlungsempfehlung, keine Diagnose, keine Fragen zum
 *     Gesundheitszustand.
 */

export const article = {
  slug: 'hautkrebsscreening',
  kind: 'ratgeber',
  group: 'vorsorge',

  metaTitle: 'Hautkrebsscreening: ab wann die Kasse zahlt, Kosten | Healio',
  metaDescription:
    'Hautkrebsscreening: Die Kasse zahlt es ab 35 alle zwei Jahre, auch mit Dermatoskop. Was unter 35 privat kostet, was Kassen dazugeben und wie es abläuft.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 8,

  listTitle: 'Hautkrebsscreening: ab wann die Kasse zahlt und was es privat kostet',
  listTeaser:
    'Anspruch ab 35 alle zwei Jahre, Ablauf, Dermatoskop, was unter 35 privat anfällt und welche Zuschüsse Kassen laut Satzung zahlen.',

  headline: 'Hautkrebsscreening: ab wann die Kasse zahlt und was es privat kostet',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'prevention',
    tone: 'mint',
    facts: [
      { value: 'ab 35 Jahren', label: 'zahlt die Kasse das Screening, alle zwei Jahre' },
      { value: 'Hausarzt oder Hautarzt', label: 'führen es durch, wenn sie dafür qualifiziert sind' },
      { value: 'unter 35: privat', label: 'oder mit Zuschuss laut Satzung, oft nur bei Risikofaktoren' },
    ],
    text: 'Die gesetzliche Früherkennung ist ein Angebot, keine Pflicht. Ob sie dir persönlich nützt, ist wissenschaftlich nicht ausreichend geklärt.',
    path: { to: '/ambulant', text: 'Vorsorge über die Kasse hinaus? Tarif ansehen', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Gesetzlich Versicherte haben ab 35 Jahren jedes zweite Jahr Anspruch auf das Hautkrebsscreening, eine Untersuchung der gesamten Haut. Seit April 2020 gehört auch die Untersuchung mit dem Dermatoskop dazu. Privat wird es unter 35 und bei häufigeren Terminen. Unten steht, was die Richtlinie vorsieht, was Kassen darüber hinaus zahlen und wie ein Tarif für Vorsorge getrennt davon zu bewerten ist.',

  sections: [
    {
      id: 'ab-wann',
      heading: 'Ab wann zahlt die Krankenkasse das Hautkrebsscreening?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ab 35 Jahren, alle zwei Jahre. So steht es in der Krebsfrüherkennungs-Richtlinie des Gemeinsamen Bundesausschusses (G-BA): Versicherte haben ab dem Alter von 35 Jahren jedes zweite Jahr Anspruch auf die ärztlichen Maßnahmen zur Früherkennung von Hautkrebs. Die Kosten gesetzlich geregelter Untersuchungen tragen laut gesund.bund.de die gesetzlichen und in aller Regel auch die privaten Krankenkassen.',
        },
        {
          type: 'paragraph',
          text: 'Gezählt wird nach Kalenderjahren. Eine erneute Untersuchung ist erst nach Ablauf des Kalenderjahres möglich, das auf die vorangegangene Untersuchung folgt. Warst du im Juni 2026 dran, ist der nächste Termin ab Januar 2028 möglich (eigene Folgerung aus der Regel). Die Teilnahme ist freiwillig.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Hautkrebsscreening: was Kasse und was du zahlst',
          head: ['Fall', 'Wer zahlt', 'Quelle'],
          rows: [
            ['Ab 35 Jahren, alle zwei Jahre, Ganzkörperuntersuchung der Haut', 'Kasse', 'G-BA, Krebsfrüherkennungs-Richtlinie § 29'],
            ['Dermatoskop im Screening ab 35, alle zwei Jahre', 'Kasse, seit April 2020, ohne Zuzahlung', 'Verbraucherzentrale, 09.06.2026, IGeL-Monitor'],
            ['Untersuchung unter 35 Jahren', 'du, nach GOÄ, außer deine Kasse zahlt laut Satzung etwas dazu', 'Verbraucherzentrale, 09.06.2026'],
            ['Häufiger als alle zwei Jahre', 'du, nach GOÄ', 'Verbraucherzentrale, 09.06.2026'],
            ['Videodokumentation der Hautuntersuchung', 'du, in jedem Fall', 'Verbraucherzentrale, 09.06.2026'],
            ['Entfernung kosmetisch störender Muttermale oder Alterswarzen', 'in der Regel du', 'Verbraucherzentrale, 09.06.2026'],
          ],
          note: 'GOÄ ist die Gebührenordnung für Ärzte. Die Untersuchung wegen Beschwerden oder eines Verdachts ist kein Screening und eine normale Kassenleistung, auch vor 35.',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft das Hautkrebsscreening ab und wer macht es?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Richtlinie nennt als Ziel, Malignes Melanom, Basalzellkarzinom und Spinozelluläres Karzinom frühzeitig zu entdecken. Durchführen dürfen es Ärztinnen und Ärzte mit Genehmigung ihrer Kassenärztlichen Vereinigung: Hausärzte (Allgemeinmedizin, hausärztlich tätige Internisten, Praktische Ärzte) und Hautärzte, jeweils nach einer Fortbildung für das Screening.',
        },
        {
          type: 'steps',
          heading: 'Was zur Untersuchung gehört',
          items: [
            { title: 'Gespräch', text: 'Die Ärztin oder der Arzt fragt gezielt nach Vorerkrankungen und möglichen Risikofaktoren.' },
            { title: 'Ganzkörperinspektion', text: 'Untersucht wird die gesamte Haut, auch der behaarte Kopf und alle Hautfalten. Die Verbraucherzentrale nennt außerdem Ohren, Mundschleimhaut, äußere Genitalbereiche und Zehenzwischenräume.' },
            { title: 'Befund und Beratung', text: 'Du bekommst das Ergebnis mitgeteilt und eine Beratung. Bei einem Verdacht klärt eine Fachärztin oder ein Facharzt für Haut- und Geschlechtskrankheiten weiter ab, gegebenenfalls mit einer Gewebeprobe.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Das Screening kann nach gesund.bund.de zusammen mit dem Gesundheits-Check-up stattfinden, wenn die Ärztin oder der Arzt dafür qualifiziert ist. Nicht jede Hautarztpraxis bietet es automatisch an. Frag vor dem Termin nach, ob die Praxis das Kassenscreening macht.',
        },
      ],
    },
    {
      id: 'dermatoskop',
      heading: 'Zahlt die Kasse das Hautkrebsscreening mit Dermatoskop?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, ab 35 Jahren alle zwei Jahre. Die Untersuchung mit dem Dermatoskop, auch Auflichtmikroskop genannt, ist seit April 2020 Bestandteil der Hautkrebsfrüherkennung. Grundlage war eine Änderung des Einheitlichen Bewertungsmaßstabs, vorher wurde sie nur zur gezielten Untersuchung einer verdächtigen Stelle bezahlt.',
        },
        {
          type: 'paragraph',
          text: 'Eine individuelle Gesundheitsleistung (IGeL) ist sie nur noch, wenn sie ohne Krebsverdacht bei Versicherten unter 35 Jahren oder häufiger als alle zwei Jahre erfolgt. Ärztinnen und Ärzte dürfen keine Zuzahlung verlangen, wenn sie im Rahmen der gesetzlichen Früherkennung ein Dermatoskop einsetzen, so die Verbraucherzentrale.',
        },
      ],
    },
    {
      id: 'privat',
      heading: 'Was kostet ein Hautkrebsscreening privat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine feste Summe gibt es nicht. Privat wird nach der Gebührenordnung für Ärzte (GOÄ) abgerechnet, der Betrag unterscheidet sich je Praxis und danach, was gemacht wird. Die Verbraucherzentrale rät, bei mehreren Ärztinnen und Ärzten die voraussichtlichen Preise zu vergleichen. Lass dir den Preis vor dem Termin nennen.',
        },
        {
          type: 'paragraph',
          text: 'Wer jünger als 35 ist, kann bei der eigenen Kasse nachsehen, ob die Satzung etwas zuschießt. Die Verbraucherzentrale schreibt, die meisten Kassen böten ihren Versicherten Zusatzleistungen an, manche finanzierten die Früherkennung auch vor dem 35. Lebensjahr oder jährlich. Für einen zusätzlichen Nutzen gebe es aber keine Hinweise.',
        },
      ],
    },
    {
      id: 'satzung',
      heading: 'Zahlt meine Kasse etwas dazu, wenn ich unter 35 bin?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei vielen Kassen ja, aber meist nur mit belegten Risikofaktoren und mit festen Höchstbeträgen. Die Tabelle zeigt Beispiele aus den Satzungen, die kassenboost.de im August 2026 ausgewertet hat.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschuss zur Hautkrebsuntersuchung vor dem 35. Lebensjahr laut Satzung, Satzungen ausgewertet im August 2026',
          head: ['Kasse', 'Zuschuss laut Satzung', 'Bedingungen', 'Fundstelle'],
          rows: [
            ['TK', 'tatsächliche Kosten, höchstens 30 EUR, von 15 bis 34 Jahren alle zwei Jahre', 'erhöhtes Risiko, etwa Hauttyp I und II, aktinische Keratose, Immunsuppression oder viele beziehungsweise atypische Pigmentmale, spezifizierte Rechnung', '§ 27n, Stand 17.04.2026'],
            ['DAK-Gesundheit', '60 EUR alle zwei Kalenderjahre, von 18 bis 34 Jahren', 'belegte Risikofaktoren, zum Beispiel Hauttyp 1, mehr als 50 Leberflecken oder Immunsuppression', '§ 19 Abs. 3'],
            ['IKK classic', '30 EUR, einmal in zwei Kalenderjahren', 'belegte Risikofaktoren, nur bis zum vollendeten 35. Lebensjahr und nur beim Hautfacharzt', '§ 34q, Stand 01.08.2026'],
            ['KKH', '50 EUR alle zwei Jahre, von 18 bis 34 Jahren', 'ärztlich bestätigte Risikofaktoren, etwa heller Hauttyp I, Melanom bei Verwandten ersten Grades oder untypische Leberflecke', '§ 29r'],
            ['SBK', '50 EUR je Untersuchung, frühestens nach zwei Jahren erneut', 'Risikofaktoren wie auffällige Muttermale oder erbliche Veranlagung, nur beim Hautfacharzt, nur zwischen Volljährigkeit und 35 Jahren', '§ 22b, § 22f und § 22g, Stand 19.03.2026'],
            ['hkk', 'bis zu 100 EUR je Versichertem in zwei Kalenderjahren, nach dem 18. und vor dem 35. Lebensjahr', 'bereits bestehende Risikofaktoren, zum Beispiel familiäre Vorerkrankungen', '§ 25b Abs. 3, 4, 6 und 7, Stand 27.05.2026'],
          ],
          note: 'Zuschüsse sind Höchstbeträge und nie mehr als deine Rechnung. Satzungen ausgewertet im August 2026, Stand der einzelnen Satzung laut Fundstelle. Nicht aufgeführte Kassen haben eigene Regeln. Maßgeblich ist die Satzung deiner Kasse.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Viele Kassen zählen das Hautkrebsscreening außerdem in ihrem Bonusprogramm mit, so in den Programmen der ' },
            { text: 'AOK', to: '/ratgeber/aok-bonusprogramm-2026' },
            { text: ' und der ' },
            { text: 'mkk', to: '/ratgeber/mkk-bonusprogramm-2026' },
            { text: '. Wie Vorsorge im Bonus zählt, erklärt die Seite ' },
            { text: 'Vorsorgeuntersuchungen', to: '/ratgeber/vorsorgeuntersuchung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Was erstattet ein Tarif bei Vorsorge über die Kasse hinaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auf healio.de/ambulant gibt es zwei Wege, und beide sind kein Ersatz für die Kassenleistung. Im ambulanten Tarif der SDK hat jede Stufe einen eigenen Vorsorge-Topf, in Ambulant 100 bis zu 500 EUR in zwei Jahren, daneben Töpfe für Sehhilfen, Naturheilverfahren und Zuzahlungen. Wer nur Vorsorge will, kann den Vorsorge-Baustein der UKV wählen.',
        },
        {
          type: 'paragraph',
          text: 'Laut UKV zahlt der Vorsorgetarif ärztliche Vorsorge auch dann, wenn deine Krankenkasse sie in deinem Alter oder in diesem Abstand nicht übernimmt. Als Beispiel nennt die Seite das Hautkrebs-Screening mit Auflichtmikroskopie. Die ärztliche Vorsorge ist zu 100 % versichert, bis 500 EUR pro Jahr. Im 1. Kalenderjahr sind es bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR. Der Baustein kostet ab 20 Jahren 13,45 EUR im Monat, bis 19 Jahre 8,80 EUR.',
        },
        {
          type: 'paragraph',
          text: 'Erstattet wird die Untersuchung beim Arzt mit Rechnung nach GOÄ. Rechnungen vom Heilpraktiker, Pauschalrechnungen und Quittungen zählen hier nicht. Bei begründetem Krankheitsverdacht ist es Behandlung und keine Vorsorge. Da das Dermatoskop ab 35 zum Kassenscreening gehört, spielt der Baustein bei diesem Beispiel vor allem unter 35 oder bei häufigeren Terminen eine Rolle.',
        },
        {
          type: 'costCard',
          title: 'Hautkrebsscreening: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit dem Vorsorge-Baustein der UKV: ärztliche Vorsorge zu 100 %, bis 500 EUR pro Jahr, im 1. Kalenderjahr bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR, Rechnung nach GOÄ. Euro-Beträge für die Untersuchung nennen wir nicht, weil sie je Praxis verschieden sind.',
          caption: 'Kostenkarte: Hautkrebsscreening ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Screening ab 35, alle zwei Jahre, auch mit Dermatoskop', 'das Screening, ohne Zuzahlung', 'nichts', 'nichts, es ist Kassenleistung'],
            ['Untersuchung unter 35 Jahren, ohne Verdacht', 'nichts, außer die Satzung deiner Kasse sieht etwas vor', 'die Rechnung nach GOÄ, Preis je Praxis', 'Der Baustein erstattet ärztliche Vorsorge bis zu den genannten Grenzen'],
            ['Zusätzliche Untersuchung, häufiger als alle zwei Jahre', 'nichts', 'die Rechnung nach GOÄ, Preis je Praxis', 'Der Baustein erstattet ärztliche Vorsorge bis zu den genannten Grenzen'],
          ],
          note: 'Keine Preisangabe. Quelle der Kassenregeln: G-BA und Verbraucherzentrale, Quelle der Tarifangaben: Unterlagen auf healio.de/ambulant (UKV-Beiträge gültig ab 01.05.2026). Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet. Maßgeblich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'prevention',
          text: 'Du willst Vorsorge über das Kassenangebot hinaus prüfen? Der Tarifrechner zeigt dir den Beitrag, bevor du etwas beantragst.',
          label: 'Ambulanten Tarif ansehen',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ob dir das Screening nützt, ist nicht ausreichend geklärt.', text: 'Die Verbraucherzentrale schreibt, dass Daten fehlen, die den Nutzen eindeutig belegen. Mögliche Nachteile sind falsch negative und falsch positive Ergebnisse sowie Überdiagnosen. Die Teilnahme ist freiwillig. Diese Seite empfiehlt weder die Teilnahme noch den Verzicht.' },
            { lead: 'Auffälligkeiten sind kein Fall fürs Screening.', text: 'Wenn eine Hautstelle juckt, blutet oder sich verändert, gehört sie in eine Untersuchung wegen Beschwerden. Die zahlt die Kasse in jedem Alter, sobald sie nötig ist. Dieser Ratgeber stellt keine Diagnose.' },
            { lead: 'Zusätzliche Untersuchungen sind eine eigene Entscheidung.', text: 'Der Baustein erstattet Rechnungen, er sagt nichts darüber, ob eine zusätzliche Untersuchung bei dir sinnvoll ist. Das klärst du mit deiner Ärztin oder deinem Arzt.' },
          ],
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
              text: 'Alle Untersuchungen mit Alter, Abstand und Quelle in einer Tabelle.',
              to: '/ratgeber/vorsorgeuntersuchung',
              linkLabel: 'Zur Übersicht',
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
              icon: 'pregnancy',
              tone: 'coral',
              title: 'Vorsorgeuntersuchungen für Frauen',
              text: 'Was ab 20, 30 und 50 zusteht und wie oft.',
              to: '/ratgeber/vorsorgeuntersuchung-frauen',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'AOK-Bonusprogramm 2026',
              text: 'Wie Vorsorge und Hautkrebsscreening im Bonus zählen.',
              to: '/ratgeber/aok-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Vorsorge zeigt Healio den ambulanten Tarif der SDK mit eigenem Vorsorge-Topf und als kleine Zusatzoption den Vorsorge-Baustein der UKV. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Ab wann zahlt die Krankenkasse das Hautkrebsscreening?',
      answer:
        'Ab 35 Jahren, alle zwei Jahre. Das legt die Krebsfrüherkennungs-Richtlinie des G-BA fest. Die Kosten tragen die gesetzlichen und in aller Regel auch die privaten Kassen. Unter 35 zahlst du es selbst, außer deine Kasse sieht in der Satzung einen Zuschuss vor.',
    },
    {
      question: 'Wie oft zahlt die Kasse das Hautkrebsscreening?',
      answer:
        'Jedes zweite Jahr. Eine erneute Untersuchung ist erst nach Ablauf des Kalenderjahres möglich, das auf die vorangegangene Untersuchung folgt. Wer häufiger geht, zahlt die zusätzliche Untersuchung privat nach der GOÄ.',
    },
    {
      question: 'Was kostet ein Hautkrebsscreening privat?',
      answer:
        'Privat wird nach der Gebührenordnung für Ärzte abgerechnet, der Preis unterscheidet sich je Praxis. Eine einheitliche Summe nennt keine neutrale Quelle. Die Verbraucherzentrale rät, die voraussichtlichen Preise bei verschiedenen Praxen zu vergleichen.',
    },
    {
      question: 'Zahlt die Kasse das Screening mit Dermatoskop?',
      answer:
        'Ja, seit April 2020 gehört das Dermatoskop (Auflichtmikroskop) zur Hautkrebsfrüherkennung ab 35, alle zwei Jahre. Eine Zuzahlung darf die Praxis dafür nicht verlangen. Unter 35 oder häufiger als alle zwei Jahre ist es eine Selbstzahlerleistung.',
    },
    {
      question: 'Muss ich mich beim Hautkrebsscreening ganz ausziehen?',
      answer:
        'Untersucht wird die gesamte Haut, auch versteckte Bereiche wie die Kopfhaut, die Ohren, die Mundschleimhaut, die äußeren Genitalbereiche und die Zehenzwischenräume. Du kannst vorab in der Praxis fragen, wie die Untersuchung abläuft und wer sie macht.',
    },
    {
      question: 'Wer führt das Hautkrebsscreening durch?',
      answer:
        'Hautärztinnen und Hautärzte sowie Hausärztinnen und Hausärzte, die dafür eine Genehmigung der Kassenärztlichen Vereinigung und die vorgeschriebene Fortbildung haben. Nicht jede Praxis bietet das Kassenscreening an, frag vorher nach.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Frag in deiner Praxis nach einem Termin für das Kassenscreening und schau in die Satzung deiner Kasse, falls du jünger als 35 bist. Alle Untersuchungen nach Alter findest du auf der Seite ' },
      { text: 'Vorsorgeuntersuchungen', to: '/ratgeber/vorsorgeuntersuchung' },
      { text: '. Den ambulanten Tarif mit Vorsorge-Topf siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Alter, Abstand und Inhalt stammen aus der Richtlinie des G-BA und gesund.bund.de, Privatleistung und Nutzen aus der Verbraucherzentrale, die Zuschüsse aus den Satzungen.',
    items: [
      {
        label: 'Krebsfrüherkennungs-Richtlinie (KFE-RL), §§ 2 und 28 bis 31',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4074/KFE-RL_2025-12-18_iK-2026-03-12.pdf',
        stand: 'geändert 18.12.2025, in Kraft seit 12.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Informationen zu Krebsfrüherkennung',
        publisher: 'gesund.bund.de (Bundesministerium für Gesundheit)',
        href: 'https://gesund.bund.de/krebsfrueherkennung',
        stand: '25.03.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheits-Check-up für Erwachsene',
        publisher: 'gesund.bund.de (Bundesministerium für Gesundheit)',
        href: 'https://gesund.bund.de/gesundheits-check-up-fuer-erwachsene',
        stand: '06.10.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Hautkrebs-Früherkennung: Welchen Nutzen hat sie?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerzte-und-kliniken/hautkrebsfrueherkennung-welchen-nutzen-hat-sie-11988',
        stand: '09.06.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Dermatoskopie zur Früherkennung von Hautkrebs',
        publisher: 'IGeL-Monitor (Medizinischer Dienst Bund)',
        href: 'https://www.igel-monitor.de/igel-a-z/igel/show/dermatoskopie-zur-frueherkennung-von-hautkrebs.html',
        stand: '07.12.2020',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der Techniker Krankenkasse, § 27n (Erweiterte Vorsorgeleistungen bei Risikofaktoren)',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/tk/unternehmen-und-karriere/ueber-die-tk/satzung-der-tk/149038',
        stand: 'Stand 17.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzungen von DAK-Gesundheit, IKK classic, KKH, SBK und hkk, Fundstellen in der Tabelle',
        publisher: 'Krankenkassen',
        stand: 'Satzungen ausgewertet im August 2026, Stand der einzelnen Satzung laut Fundstelle',
        note: 'Es gilt immer die aktuelle Satzung deiner Kasse',
      },
      {
        label: 'Tarifunterlagen SDK Ambulant und UKV Vorsorge-Baustein, wie auf healio.de/ambulant',
        publisher: 'SDK und UKV',
        stand: '07.10.2026',
        note: 'Beiträge der UKV gültig ab 01.05.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Dieser Ratgeber ersetzt keine ärztliche Beratung. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
