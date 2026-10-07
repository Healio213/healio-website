/**
 * Ambulant-Ratgeber Welle A: Ambulante Zusatzversicherung, was sie zahlt und
 * für wen sie passt. Der Ratgeber erklärt, die Produktseite /ambulant verkauft.
 *
 * Quellen (Abruf 07.10.2026, Belege in ambulante-zusatzversicherung.belege.md):
 * SDK AVB Teil II AP-Tarife 1.753a (Stand 01.01.2023), SDK AVB Teil I
 * Allgemeiner Teil 1.751 (Stand 01.01.2022), Verbraucherzentrale
 * (Zusatzversicherungen, Stand 19.08.2025), § 61 SGB V. Töpfe, Stufen und
 * Beiträge wortgleich mit /ambulant (AmbulantConversionFlow.jsx TIERS,
 * src/data/sdkAmbulantBeitraege.js, Stand 29.09.2026).
 *
 * Bewusste Grenzen:
 *   - Die Frage "ambulante Zusatzversicherung Privatpatient" wird ehrlich
 *     beantwortet: Die Tarife, die Healio vermittelt, sind Budgettarife für
 *     vier Leistungsbereiche und machen niemanden zum Privatpatienten.
 *   - Budget nur als "bis zu 3.000 EUR in zwei Jahren" und nur für die höchste
 *     Stufe. Augenlasern und Auslandsreiseschutz stehen getrennt, sie gehören
 *     nicht zu den 3.000 EUR.
 *   - Keine Angabe, was die Kasse für Brillen zahlt (eigene Seite des Feldes
 *     Brille), das Brillenbeispiel rechnet nur den Tarifanteil.
 *   - Die Rechenbeispiele arbeiten mit angenommenen Preisen und sind als eigene
 *     Rechnung gekennzeichnet.
 *   - Kein Anbietervergleich, keine Aussage zu anderen Versicherern.
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): Status in Faktenkasten und
 * Fußzeile wie Zahn-Welle 1; Tarifaussagen gegen healio.de/ambulant, die Dateien
 * im Serien-Worktree und die SDK-AVB gelesen.
 */

export const article = {
  slug: 'ambulante-zusatzversicherung',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Ambulante Zusatzversicherung: Leistungen und Grenzen | Healio',
  metaDescription:
    'Ambulante Zusatzversicherung erklärt: vier Töpfe mit bis zu 3.000 EUR in zwei Jahren, Beiträge nach Alter, wer sie braucht und was sie nicht leistet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Ambulante Zusatzversicherung: was sie zahlt, was sie kostet und für wen sie passt',
  listTeaser:
    'Vier Leistungstöpfe, Beiträge nach Alter und eine ehrliche Antwort auf die Frage, ob eine ambulante Zusatzversicherung dich zum Privatpatienten macht.',

  headline: 'Ambulante Zusatzversicherung: was sie zahlt, was sie kostet und für wen sie passt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'ambulant',
    facts: [
      { value: 'bis zu 3.000 EUR', label: 'in zwei Jahren aus vier Töpfen (Ambulant 100)' },
      { value: '31,64 EUR im Monat', label: 'Ambulant 100 mit 21 bis 30 Jahren, mit dem Alter steigend' },
      { value: 'Keine Wartezeit', label: 'laut Bedingungen der SDK-Tarife AP5 bis AP1' },
    ],
    text: 'Die ambulante Zusatzversicherung ist ein Budget für vier festgelegte Bereiche. Der Tarif macht dich nicht zum Privatpatienten, du bleibst gesetzlich versichert.',
    path: { to: '/ambulant', text: 'Welche Stufe passt zu deinem Alltag?', label: 'Beitrag berechnen' },
  },

  lead:
    'Eine ambulante Zusatzversicherung zahlt Leistungen, die deine gesetzliche Krankenkasse nicht oder nur zum Teil übernimmt. Bei dem Tarif, den Healio auf der Seite Ambulant vermittelt, sind das vier Bereiche: Sehhilfen, Naturheilverfahren, Vorsorge und gesetzliche Zuzahlungen. Hier erfährst du, was die Töpfe genau erstatten, was sie kosten, für wen sich das lohnen kann und wo der Tarif ausdrücklich nicht hilft.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was ist eine ambulante Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine ambulante Zusatzversicherung ergänzt die gesetzliche Krankenversicherung bei der ambulanten Behandlung, also bei allem, was nicht im Krankenhaus stattfindet. Welche Leistungen genau dazugehören, bestimmt jeder Tarif selbst. Die Verbraucherzentrale beschreibt ambulante Zusatzversicherungen als Policen, die gesetzlich Versicherten unter anderem eine privatärztliche Behandlung ermöglichen können, und nennt als Gegenargument die teureren Tarife.',
        },
        {
          type: 'paragraph',
          text: 'Der ambulante Tarif der SDK, den Healio vermittelt, ist anders gebaut. Er funktioniert als Budget mit vier getrennten Töpfen, jeder mit eigenem Höchstbetrag. Voraussetzung ist, dass du gesetzlich krankenversichert bist oder Anspruch auf Familienversicherung oder Heilfürsorge hast. Fällt das weg, endet auch der Tarif.',
        },
      ],
    },
    {
      id: 'was-zahlt',
      heading: 'Was zahlt die ambulante Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Jede der vier Stufen hat die gleichen vier Töpfe, nur mit anderen Erstattungssätzen und Höchstbeträgen. Die Zeiträume zählen jeweils zwei Kalenderjahre ab Versicherungsbeginn. Mit der höchsten Stufe, Ambulant 100, ergeben die Töpfe zusammen bis zu 3.000 EUR in zwei Jahren.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Die vier Töpfe der SDK-Tarife AP5 bis AP1: Erstattungssatz und Höchstbetrag je zwei Kalenderjahre',
          head: ['Topf', 'Ambulant 50 (AP5)', 'Ambulant 70 (AP7)', 'Ambulant 90 (AP9)', 'Ambulant 100 (AP1)'],
          rows: [
            ['Sehhilfen: Brillengläser, Gestelle, Kontaktlinsen, Reparaturen', '100 % bis 200 EUR', '100 % bis 300 EUR', '100 % bis 400 EUR', '100 % bis 500 EUR'],
            ['Naturheilverfahren und Heilpraktiker', '50 % bis 500 EUR', '70 % bis 700 EUR', '90 % bis 900 EUR', '100 % bis 1.000 EUR'],
            ['Vorsorge, Schutzimpfungen, Präventionskurse', '50 % bis 200 EUR', '70 % bis 300 EUR', '90 % bis 400 EUR', '100 % bis 500 EUR'],
            ['Hilfsmittel und gesetzliche Zuzahlungen', '50 % bis 500 EUR', '70 % bis 700 EUR', '90 % bis 900 EUR', '100 % bis 1.000 EUR'],
            ['Alle vier Töpfe zusammen', 'bis zu 1.400 EUR', 'bis zu 2.000 EUR', 'bis zu 2.600 EUR', 'bis zu 3.000 EUR in zwei Jahren'],
          ],
          note: 'Quelle: SDK, Allgemeine Versicherungsbedingungen Teil II, Tarife AP5, AP7, AP9 und AP1, Stand 01.01.2023, Leistungsübersicht und Abschnitt I.1, I.3, I.5 und I.6. Die Summen sind eigene Addition der vier Höchstbeträge. Erstattet werden nur erstattungsfähige Kosten, verbindlich sind die Bedingungen.',
        },
        {
          type: 'paragraph',
          text: 'Daneben nennen die Bedingungen noch zwei Leistungen außerhalb der vier Töpfe, die nicht zu den 3.000 EUR in zwei Jahren zählen. Für Augenlasern erstattet der Tarif je Auge bis zu 500 bis 1.000 EUR, je nach Stufe, in den ersten vier Kalenderjahren allerdings nur die Hälfte. Der Auslandsreiseschutz erstattet bei Reisen bis zu 56 Tagen 100 Prozent der erstattungsfähigen Kosten, wenn unterwegs eine Krankheit oder Unfallfolge akut eintritt.',
        },
        {
          type: 'paragraph',
          text: 'Wie die Töpfe im Alltag aussehen, hängt von der Rechnung ab. Beim Heilpraktiker rechnen die Praxen nach dem Gebührenverzeichnis ab, bei Zuzahlungen gilt die ärztliche Verordnung mit Beleg, bei Sehhilfen zählt die Rechnung des Optikers. Mehr zu den einzelnen Bereichen findest du in den Ratgebern zu Heilpraktiker, Physiotherapie und Akupunktur.',
        },
      ],
    },
    {
      id: 'zielgruppe',
      heading: 'Für wen passt eine ambulante Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für Menschen, die mindestens einen der vier Bereiche regelmäßig nutzen und die Kosten bisher selbst tragen. Der Tarif lohnt sich nicht, weil er existiert, sondern wenn sich seine Töpfe füllen. Du solltest ehrlich überschlagen, wie viel du in zwei Jahren in jedem Bereich ausgibst.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Du gehst zum Heilpraktiker oder Osteopathen.', text: 'Der Topf für Naturheilverfahren erstattet in der höchsten Stufe bis 1.000 EUR in zwei Jahren, wenn Heilpraktiker oder Ärzte behandeln.' },
            { lead: 'Du trägst eine Brille oder Kontaktlinsen.', text: 'Sehhilfen erstattet jede Stufe zu 100 Prozent, bis der Topf von 200 bis 500 EUR aufgebraucht ist.' },
            { lead: 'Du nutzt Vorsorge, die über das Kassenangebot hinausgeht.', text: 'Der Topf nennt zum Beispiel Vorsorgeuntersuchungen, Schutzimpfungen und Präventionskurse.' },
            { lead: 'Du zahlst oft Zuzahlungen.', text: 'Gesetzliche Zuzahlungen für Arznei-, Verband-, Heil- und Hilfsmittel sind versichert, etwa bei Physiotherapie.' },
          ],
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'ambulant',
          text: 'Du siehst die vier Stufen, den Beitrag für dein Alter und kannst vor dem Antrag in Ruhe rechnen.',
          label: 'Tarif und Beitrag ansehen',
        },
      ],
    },
    {
      id: 'privatpatient',
      heading: 'Macht eine ambulante Zusatzversicherung zum Privatpatienten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Du bleibst gesetzlich versichert, und deine Kasse bleibt für deine Arztbesuche zuständig. Der Tarif setzt sogar voraus, dass du in der gesetzlichen Krankenversicherung bist. Die Bedingungen nennen als Leistungen Sehhilfen, Augenlasern, Vorsorge, Impfungen und Präventionskurse, einen Beratungsservice, Naturheilverfahren, Hilfsmittel und Zuzahlungen sowie den Auslandsreiseschutz. Eine privatärztliche Behandlung als eigenen Leistungsbereich nennen sie nicht.',
        },
        {
          type: 'paragraph',
          text: 'Suchst du eine Versicherung, die dir Chefarzt oder Privatärztin im ambulanten Bereich bezahlt, prüf die Leistungsbeschreibung jedes Tarifs genau. Die Verbraucherzentrale beschreibt, dass es solche ambulanten Zusatzversicherungen gibt, und weist auf die höheren Beiträge hin. Mit dem Budget-Tarif auf der Seite Ambulant hat das nichts zu tun, und er ersetzt auch keine private Krankenvollversicherung.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine ambulante Zusatzversicherung im Monat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Beitrag richtet sich nach dem erreichten Alter, also nach dem laufenden Kalenderjahr minus deinem Geburtsjahr. Im Kalenderjahr nach deinem 20., 30., 40., 50., 60. und 70. Geburtstag rutschst du in die nächste Gruppe. Kinder zahlen bis zum Ende des Kalenderjahres, in dem sie 20 werden, den Kinderbeitrag. Alterungsrückstellungen bildet der Tarif nicht, und der Versicherer kann die Beiträge anpassen, wenn seine Aufwendungen steigen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Monatsbeiträge der SDK-Tarife AP5 bis AP1 nach Altersgruppe in EUR, Stand 29.09.2026',
          head: ['Altersgruppe', 'Ambulant 50', 'Ambulant 70', 'Ambulant 90', 'Ambulant 100'],
          rows: [
            ['0 bis 20 Jahre', '6,79', '10,13', '18,08', '20,76'],
            ['21 bis 30 Jahre', '10,36', '15,82', '27,44', '31,64'],
            ['31 bis 40 Jahre', '12,29', '18,71', '33,84', '39,19'],
            ['41 bis 50 Jahre', '14,14', '23,10', '37,95', '44,13'],
            ['51 bis 60 Jahre', '16,05', '25,71', '39,98', '46,62'],
            ['61 bis 70 Jahre', '18,87', '28,97', '43,29', '50,34'],
            ['ab 71 Jahren', '21,00', '33,13', '43,91', '50,76'],
          ],
          note: 'Beiträge der SDK-Tarife, Stand 29.09.2026, wortgleich mit der Tabelle auf healio.de/ambulant; Altersgruppen nach den SDK-Bedingungen Teil II, Abschnitt III. Die Beiträge ersetzen kein persönliches Angebot. Deinen verbindlichen Beitrag siehst du vor dem Antrag im Tarifrechner, bei Vorerkrankungen kann ein Risikozuschlag dazukommen.',
        },
        {
          type: 'paragraph',
          text: 'Ob sich der Beitrag rechnet, zeigt die Gegenüberstellung mit deinen eigenen Rechnungen. Die Karte unten nimmt drei Beispiele aus den Töpfen, jeweils mit angenommenen Preisen.',
        },
        {
          type: 'costCard',
          title: 'Ambulant 100: Beitrag und Erstattung im Beispiel',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1), Altersgruppe 21 bis 30 Jahre, 31,64 EUR im Monat. Erstattung zu 100 Prozent der erstattungsfähigen Kosten bis zum Höchstbetrag des jeweiligen Topfs. Der Vertrag besteht schon, bevor die Rechnungen entstehen.',
          caption: 'Kostenkarte: Ambulant 100, drei Beispiele und der Beitrag über zwei Jahre',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Heilpraktiker: 8 Sitzungen, angenommen 80 EUR je Sitzung (640 EUR)', 'meist nichts', '640 EUR', 'Bis zu 640 EUR erstattet, soweit die Rechnung erstattungsfähig ist'],
            ['Brille, angenommen 680 EUR', 'hier nicht gerechnet, das hängt von der Sehschwäche ab', '680 EUR', 'Bis zu 500 EUR in zwei Kalenderjahren, die übrigen 180 EUR trägst du'],
            ['Zuzahlung Physiotherapie, 28 EUR (Beispiel im Ratgeber Zuzahlung Physiotherapie)', 'die Behandlung, du zahlst 10 Prozent plus 10 EUR je Verordnung', '28 EUR', 'Erstattet gegen ärztliche Verordnung und Beleg über die Zuzahlung'],
            ['Beitrag über zwei Jahre (31,64 EUR im Monat)', 'nicht betroffen', 'nichts', '759,36 EUR Beitrag, den ein Kassenbonus teilweise mittragen kann'],
          ],
          note: 'Rechenbeispiel mit angenommenen Preisen, keine Preisangabe. Eigene Rechnung: 31,64 EUR mal 12 mal 2 ergibt 759,36 EUR; 640 EUR plus 500 EUR plus 28 EUR ergeben 1.168 EUR. Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Beitrag nach der Beitragstabelle (Stand 29.09.2026). Zuzahlung nach § 61 Satz 3 SGB V.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Treten alle drei Fälle innerhalb von zwei Jahren ein, liegt die Erstattung im Beispiel bei 1.168 EUR und damit über dem Beitrag von 759,36 EUR. Fällt nur einer an, geht die Rechnung nicht auf. Das ist die ehrliche Antwort auf die Frage, ob sich der Tarif lohnt: Er lohnt sich, wenn du die Töpfe tatsächlich nutzt.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Das ist kein Privatpatientenschutz.', text: 'Die Töpfe haben feste Bereiche und Höchstbeträge. Eine Behandlung außerhalb der vier Bereiche zahlt der Tarif nicht.' },
            { lead: 'Gesundheitsfragen gehören zum Antrag.', text: 'Du beantwortest sie vollständig und wahrheitsgemäß. Laut den Angaben auf der Seite Ambulant wirst du grundsätzlich nicht abgelehnt, je nach Angaben kann aber ein Risikozuschlag oder ein Leistungsausschluss dazukommen.' },
            { lead: 'Was schon läuft, zählt nicht.', text: 'Für Versicherungsfälle, die vor dem Beginn des Versicherungsschutzes eingetreten sind, leistet der Versicherer nicht.' },
            { lead: 'Mehr als die Rechnung gibt es nie.', text: 'Zahlen mehrere Kostenträger, darf die gesamte Erstattung nicht höher sein als die gesamten Kosten. Auch ein Kassenbonus wird nur bis zu den nachgewiesenen Kosten gezahlt.' },
            { lead: 'Der Beitrag bleibt nicht für immer gleich.', text: 'Er steigt mit der Altersgruppe, und der Versicherer kann ihn anpassen.' },
          ],
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie schließt du eine ambulante Zusatzversicherung ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du brauchst für den Zusatzschutz weder einen Kassenwechsel noch einen Pflichttermin. Zusatzversicherung und gesetzliche Krankenkasse sind zwei getrennte Entscheidungen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zum Antrag',
          items: [
            {
              title: 'Beitrag berechnen',
              text: 'Im Tarifrechner gibst du dein Alter ein, vergleichst die vier Stufen und siehst den persönlichen Beitrag, bevor du einen Antrag stellst.',
            },
            {
              title: 'Antrag mit Gesundheitsfragen',
              text: 'Du beantwortest die Gesundheitsfragen vollständig und wahrheitsgemäß. Der Versicherer entscheidet über Annahme, Zuschlag oder Ausschluss.',
            },
            {
              title: 'Rechnungen einreichen',
              text: 'Du zahlst die Rechnung, reichst sie mit den geforderten Nachweisen ein und bekommst nach Prüfung die Erstattung bis zum Höchstbetrag.',
            },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'naturopathy',
              tone: 'mint',
              title: 'Heilpraktiker Kosten: wer zahlt was',
              text: 'Alle Bereiche der Naturheilkunde auf einer Seite.',
              to: '/ratgeber/heilpraktiker-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'Heilpraktiker-Zusatzversicherung',
              text: 'Kriterien statt Rangliste, Gesundheitsfragen und Grenzen.',
              to: '/ratgeber/heilpraktiker-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'medication',
              tone: 'sky',
              title: 'Zuzahlung Physiotherapie',
              text: 'Was du bei Heilmitteln selbst zahlst und was der Tarif erstattet.',
              to: '/ratgeber/physiotherapie-zuzahlung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'comparison',
              tone: 'lavender',
              title: 'Akupunktur Kosten',
              text: 'Wann die Kasse zahlt und was die Sitzung privat kostet.',
              to: '/ratgeber/akupunktur-kosten',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Heilpraktiker und Osteopathie, Brille, Vorsorge und gesetzliche Zuzahlungen vermittelt Healio die ambulanten Tarife der SDK, in der höchsten Stufe mit bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was zahlt die ambulante Zusatzversicherung?',
      answer:
        'Bei den ambulanten SDK-Tarifen sind es vier Töpfe: Sehhilfen, Naturheilverfahren und Heilpraktiker, Vorsorge mit Impfungen und Präventionskursen sowie gesetzliche Zuzahlungen und Hilfsmittel. In der höchsten Stufe ergeben sie zusammen bis zu 3.000 EUR in zwei Jahren. Dazu kommen Augenlasern und der Auslandsreiseschutz.',
    },
    {
      question: 'Macht mich die ambulante Zusatzversicherung zum Privatpatienten?',
      answer:
        'Nein. Du bleibst gesetzlich versichert, der Tarif setzt das sogar voraus. Eine privatärztliche Behandlung ist in den Bedingungen dieser Tarife nicht als eigener Leistungsbereich aufgeführt. Andere ambulante Zusatzversicherungen können das anders regeln, dort entscheidet die Leistungsbeschreibung.',
    },
    {
      question: 'Was kostet eine ambulante Zusatzversicherung im Monat?',
      answer:
        'Bei den ambulanten SDK-Tarifen liegt der Beitrag je nach Stufe und Altersgruppe zwischen 6,79 und 50,76 EUR im Monat. Mit 21 bis 30 Jahren kostet Ambulant 100 zum Beispiel 31,64 EUR. Der Beitrag steigt mit dem erreichten Alter und kann angepasst werden. Dein persönlicher Beitrag steht im Tarifrechner.',
    },
    {
      question: 'Muss ich Gesundheitsfragen beantworten?',
      answer:
        'Ja, im Antrag beantwortest du Gesundheitsfragen vollständig und wahrheitsgemäß. Laut den Angaben auf der Seite Ambulant wirst du grundsätzlich nicht abgelehnt, auch nicht mit Vorerkrankungen. Je nach Angaben kann ein Risikozuschlag dazukommen, in Einzelfällen ein Ausschluss für eine bestimmte Erkrankung.',
    },
    {
      question: 'Gibt es eine Wartezeit?',
      answer:
        'Nein, die Bedingungen der ambulanten SDK-Tarife sehen keine Wartezeiten vor. Behandlungen, die vor Beginn schon laufen oder angeraten sind, bleiben aber ausgenommen.',
    },
    {
      question: 'Muss ich für die ambulante Zusatzversicherung die Krankenkasse wechseln?',
      answer:
        'Nein. Zusatzversicherung und gesetzliche Krankenkasse sind zwei getrennte Entscheidungen. Du kannst zuerst den Schutz wählen und danach prüfen, ob eine andere Kasse mit ihrem Bonusprogramm finanziell besser zu deinem Tarif passt.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Rechne auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ' deinen Beitrag aus und überschlag, wie viel du in zwei Jahren in den vier Bereichen ausgibst. Wer vor allem Heilpraktikerkosten hat, liest den Ratgeber ' },
      { text: 'Heilpraktiker-Zusatzversicherung', to: '/ratgeber/heilpraktiker-zusatzversicherung' },
      { text: '. Wie ein Kassenbonus den Beitrag mittragen kann, steht im Ratgeber ' },
      { text: 'Krankenkassen-Bonus und Zusatzversicherung', to: '/ratgeber/krankenkassen-bonus-zusatzversicherung' },
      { text: ', und welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Leistungen, Höchstbeträge und Vertragsregeln stammen aus den Bedingungen der SDK, die Einordnung ambulanter Zusatzversicherungen von der Verbraucherzentrale.',
    items: [
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil II: Tarife AP5, AP7, AP9 und AP1 (1.753a/01.23)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil I: Allgemeiner Teil (1.751)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://gesundwerker.sdk.de/downloads/Bedingungen/1-751.pdf',
        stand: '01.01.2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung: Sinnvoll oder nicht?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425',
        stand: '19.08.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 61 Zuzahlungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__61.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Beitragstabelle, Tarifstufen und Töpfe der ambulanten SDK-Tarife, wie auf healio.de/ambulant',
        publisher: 'SDK und Healio',
        stand: '29.09.2026',
        note: 'Leistungen und Beiträge wortgleich mit der Seite healio.de/ambulant',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Beiträgen nach dem Stand der genannten Unterlagen vom 7. Oktober 2026. Maßgeblich sind immer dein Antrag, der Versicherungsschein und die Bedingungen des Versicherers.',
};

export default article;
