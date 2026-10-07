/**
 * Ambulant-Ratgeber Welle A: TK und Osteopathie, Zuschuss, Voraussetzungen,
 * Osteopathen finden und Rechnung einreichen.
 *
 * Quellen (Abruf 07.10.2026, Belege in tk-osteopathie.belege.md): tk.de
 * (Wie viel übernimmt die TK bei Osteopathie, Stand 02.03.2026; Voraussetzungen,
 * Stand 02.03.2026; Osteopathen finden, Stand 10.08.2026; Verjährung, Stand
 * 22.01.2026; Kinder, Stand 02.03.2026), TK-Satzung § 27 b Abs. 1 und 2 (laut
 * KassenBoost satzungs-leistungen.server.ts, erhoben 26.08.2026, und
 * Erstattungs-Kompass build.py), VOD (Preisorientierung), SDK AVB Teil I und II.
 *
 * Bewusste Grenzen:
 *   - Werte nur wie in der TK-Satzung und auf tk.de belegt: 40 EUR je Sitzung,
 *     höchstens 3 Sitzungen, höchstens 120 EUR im Kalenderjahr, ärztliche
 *     Bescheinigung vor Beginn.
 *   - Der Sitzungspreis in den Rechenbeispielen ist angenommen. Die Spanne
 *     80 bis 150 EUR nennt der Verband der Osteopathen Deutschland auf seiner
 *     Behandlungsseite als Orientierung, keine Marktpreiserhebung.
 *   - Heilpraktiker mit Osteopathie-Ausbildung: Satzung § 27b (Stand 17.04.2026,
 *     in der Prüfung am 07.10.2026 im PDF gelesen) und tk.de nennen keinen Beruf,
 *     nur Ausbildung (parietal, viszeral, cranial, mit Abschlussprüfung) und
 *     Verband. Der Text nennt genau diese Bedingungen und empfiehlt die Nachfrage.
 *   - Keine Aufnahme in GOOGLE_ADS_EXCLUDED_PATHS und ANALYTICS_EXCLUDED_PATHS
 *     (Entscheidung der Marktanalyse-Sitzung 07.10.2026: Kosten-Seite).
 *   - Keine Aussage zur Wirkung der Osteopathie, keine Behandlungsempfehlung.
 *   - Kein TK-Bonus-Betrag, nur der Verweis auf den bestehenden Ratgeber.
 */

export const article = {
  slug: 'tk-osteopathie',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Techniker Krankenkasse Osteopathie: Zuschuss, Ablauf | Healio',
  metaDescription:
    'TK Osteopathie 2026: 40 EUR je Sitzung, höchstens 3 Sitzungen und 120 EUR im Jahr, ärztliche Bescheinigung vor Beginn, Osteopathen finden und Rechnung einreichen.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 8,

  listTitle: 'TK und Osteopathie: Zuschuss, Voraussetzungen, Osteopathen finden und Einreichen',
  listTeaser:
    'Die TK zahlt 40 EUR je Sitzung, höchstens dreimal im Jahr. Hier steht, was du vorher brauchst, wie du Osteopathen findest und wie du die Rechnung einreichst.',

  headline: 'Techniker Krankenkasse Osteopathie: Zuschuss, Voraussetzungen und Einreichen',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'naturopathy',
    facts: [
      { value: '40 EUR je Sitzung', label: 'TK-Zuschuss, höchstens die tatsächlichen Kosten' },
      { value: '3 Sitzungen im Jahr', label: 'zusammen höchstens 120 EUR je Kalenderjahr' },
      { value: 'Bescheinigung vorher', label: 'ärztliche Bescheinigung vor Beginn der Behandlung' },
    ],
    text: 'Den Rest der Rechnung trägst du selbst oder ein Zusatztarif, der Osteopathie erstattet. Eine zentrale Datenbank aller Osteopathen gibt es laut TK nicht.',
    path: { to: '/ambulant', text: 'Rest der Rechnung selbst tragen?', label: 'Ambulante Tarife ansehen' },
  },

  lead:
    'Die Techniker Krankenkasse bezuschusst Osteopathie mit 40 EUR je Sitzung, für höchstens drei Sitzungen im Kalenderjahr. Das sind höchstens 120 EUR, und mehr als die tatsächlichen Kosten zahlt sie nie. Vorher brauchst du eine ärztliche Bescheinigung. Hier steht, was das für deine Rechnung heißt, wie du passende Osteopathen findest und wie du das Geld erhältst.',

  sections: [
    {
      id: 'zuschuss',
      heading: 'Wie viel zahlt die TK bei Osteopathie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die TK gewährt nach ihrer Leistungsseite höchstens drei osteopathische Behandlungen im Kalenderjahr mit jeweils 40 EUR, jedoch nicht mehr als die tatsächlich entstandenen Kosten. Das entspricht der Satzungsleistung in § 27 b der TK-Satzung. Insgesamt sind das höchstens 120 EUR im Jahr. Für eine vierte Sitzung im selben Jahr zahlt die TK nichts mehr.',
        },
        {
          type: 'paragraph',
          text: 'Was bei dir hängen bleibt, hängt vom Sitzungspreis ab. Eine neutrale Preisliste gibt es nicht. Der Verband der Osteopathen Deutschland nennt auf seiner Behandlungsseite 80 bis 150 EUR für eine Sitzung mit Anamnese, Untersuchung und Behandlung, als Orientierung und nicht als Marktdurchschnitt. Die Tabelle rechnet mit drei angenommenen Preisen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Eigenanteil bei drei Sitzungen im Jahr mit TK-Zuschuss, bei angenommenen Sitzungspreisen',
          head: ['Angenommener Preis je Sitzung', 'TK-Zuschuss je Sitzung', 'Du je Sitzung', 'Du bei drei Sitzungen'],
          rows: [
            ['80 EUR', '40 EUR', '40 EUR', '120 EUR'],
            ['100 EUR', '40 EUR', '60 EUR', '180 EUR'],
            ['150 EUR', '40 EUR', '110 EUR', '330 EUR'],
          ],
          note: 'Eigene Rechnung mit angenommenen Preisen, keine Preisangabe. Zuschuss nach der Leistungsseite der TK (Stand 02.03.2026) und TK-Satzung § 27 b, Abruf 07.10.2026. Die Preisspanne 80 bis 150 EUR nennt der Verband der Osteopathen Deutschland als Orientierung.',
        },
      ],
    },
    {
      id: 'voraussetzungen',
      heading: 'Welche Voraussetzungen stellt die TK für den Osteopathie-Zuschuss?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Es gibt zwei Voraussetzungen. Die Behandlung muss von einer Ärztin oder einem Arzt veranlasst und vor Beginn der Behandlung schriftlich bescheinigt werden, zum Beispiel mit einem Privatrezept. Nach den TK-Seiten reicht eine formlose Bescheinigung je Kalenderjahr, die für bis zu drei Behandlungen gilt. Hol sie deshalb vor dem ersten Termin, nicht danach.',
        },
        {
          type: 'paragraph',
          text: 'Zweitens muss der Osteopath eine umfassende osteopathische Ausbildung haben. Die Satzung verlangt eine Ausbildung in parietaler, viszeraler und cranialer Osteopathie mit erfolgreicher Abschlussprüfung und die Mitgliedschaft in einem Berufsverband der Osteopathen oder die Berechtigung, einem solchen Verband beizutreten. Ohne Verbandsmitgliedschaft reichst du einen Ausbildungsnachweis ein, zum Beispiel ein Zertifikat oder ein Abschlusszeugnis. Das gilt für alle TK-Versicherten, auch für Kinder.',
        },
        {
          type: 'paragraph',
          text: 'Einen bestimmten Beruf verlangen Satzung und TK-Seiten nicht, der Zuschuss hängt an der osteopathischen Ausbildung und am Berufsverband. Heilpraktiker werden dort weder ausdrücklich genannt noch ausgeschlossen. Ist dein Osteopath Heilpraktiker, frag bei der TK nach, bevor du den ersten Termin vereinbarst.',
        },
      ],
    },
    {
      id: 'liste',
      heading: 'Gibt es eine TK-Liste mit Osteopathen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Die TK schreibt, eine zentrale Datenbank mit allen Osteopathen gebe es leider nicht. Stattdessen verlinkt sie Berufsverbände, zum Beispiel den Bundesverband Osteopathie und die Deutsche Ärztegesellschaft für Osteopathie.',
        },
        {
          type: 'list',
          items: [
            'Frag die Praxis vor dem ersten Termin nach der osteopathischen Ausbildung und nach einer Verbandsmitgliedschaft.',
            'Lass dir eine Kopie des Ausbildungsnachweises zeigen, wenn dein Osteopath keinem Verband angehört.',
            'Klär mit der TK vorab, ob die Praxis die Voraussetzungen erfüllt, wenn du unsicher bist.',
          ],
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'naturopathy',
          text: 'Du siehst, wie viel Naturheilverfahren die einzelnen Stufen erstatten.',
          label: 'Tarifstufen ansehen',
        },
      ],
    },
    {
      id: 'einreichen',
      heading: 'Wie reichst du die Osteopathie-Rechnung bei der TK ein?',
      blocks: [
        {
          type: 'steps',
          heading: 'In drei Schritten zum Zuschuss',
          items: [
            {
              title: 'Bescheinigung holen',
              text: 'Lass dir vor der ersten Sitzung ärztlich bescheinigen, dass die osteopathische Behandlung veranlasst ist.',
            },
            {
              title: 'Behandeln lassen und bezahlen',
              text: 'Du zahlst die Rechnung der Praxis zunächst selbst und hebst sie auf.',
            },
            {
              title: 'Hochladen',
              text: 'Rechnung und ärztliche Bescheinigung lädst du über Meine TK oder die TK-App hoch. Fehlt die Verbandsmitgliedschaft, kommt der Ausbildungsnachweis dazu.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Eilig musst du es nicht haben: Ansprüche auf Sozialleistungen verjähren vier Jahre nach Ablauf des Kalenderjahres, in dem sie entstanden sind. Rechnungen aus 2021 hätte die TK nach ihrem Beispiel noch bis zum 31. Dezember 2025 erstattet. Trotzdem lohnt es sich, zeitnah einzureichen, damit du weißt, wie viel von den drei Sitzungen noch offen ist.',
        },
      ],
    },
    {
      id: 'zusatztarif',
      heading: 'Zahlt ein Zusatztarif den Rest der Osteopathie-Rechnung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt vom Tarif und davon, wer dich behandelt. Auf der Seite Ambulant ordnet Healio Osteopathie dem Bereich Heilpraktiker und Naturheilverfahren zu. Bei den ambulanten SDK-Tarifen erstattet dieser Topf 50 bis 100 Prozent der erstattungsfähigen Kosten, bis 500 bis 1.000 EUR in zwei Kalenderjahren, je nach Stufe. Die Bedingungen nennen dafür Heilpraktiker, die nach dem Gebührenverzeichnis abrechnen, und Ärzte, die nach der Gebührenordnung für Ärzte abrechnen. Zahlen mehrere Kostenträger, darf die gesamte Erstattung die Kosten nicht übersteigen.',
        },
        {
          type: 'costCard',
          title: 'Osteopathie: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn, Behandlung durch einen Heilpraktiker oder Arzt. Die TK zahlt 40 EUR je Sitzung für höchstens drei Sitzungen. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: Osteopathie mit TK-Zuschuss und Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['3 Sitzungen, angenommen 100 EUR je Sitzung (300 EUR)', '120 EUR (3 mal 40 EUR)', '180 EUR', 'Der Tarif erstattet bis zu 180 EUR, soweit die Rechnung erstattungsfähig ist'],
            ['5 Sitzungen, angenommen 100 EUR je Sitzung (500 EUR)', '120 EUR, ab der vierten Sitzung nichts mehr', '380 EUR', 'Der Tarif erstattet bis zu 380 EUR, soweit erstattungsfähig'],
            ['Beitrag Ambulant 100 über zwei Jahre, 21 bis 30 Jahre (31,64 EUR im Monat)', 'nicht betroffen', 'nichts', '759,36 EUR Beitrag, den ein Kassenbonus teilweise mittragen kann'],
            ['Behandlung schon vor dem Versicherungsbeginn gestartet', 'bis zu 120 EUR bei erfüllten Voraussetzungen', 'der Rest der Rechnung', 'Nicht versichert, wenn der Versicherungsfall vor dem Beginn eingetreten ist'],
          ],
          note: 'Rechenbeispiel mit angenommenen Preisen, keine Preisangabe. Eigene Rechnung: 300 EUR minus 120 EUR ergibt 180 EUR; 500 EUR minus 120 EUR ergibt 380 EUR; 31,64 EUR mal 12 mal 2 ergibt 759,36 EUR. Zuschuss nach TK-Satzung § 27 b und tk.de, Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Abschnitt I.5, Anrechnung nach Teil I, Stand 01.01.2022, Abschnitt A.8 Abs. 4. Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant (Stand 29.09.2026).',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Bescheinigung kommt vor dem Termin.', text: 'Die TK verlangt sie vor Beginn der Behandlung. Wer sie erst danach holt, riskiert, dass der Zuschuss ausbleibt.' },
            { lead: 'Beim vierten Termin ist der Zuschuss verbraucht.', text: 'Mehr als drei Sitzungen im Kalenderjahr bezuschusst die TK nicht, und nie mehr als die tatsächlichen Kosten.' },
            { lead: 'Heilpraktiker nennt die TK auf ihren Seiten nicht.', text: 'Maßgeblich ist die osteopathische Qualifikation. Frag vorher nach, wenn dein Osteopath Heilpraktiker ist.' },
            { lead: 'Ein Zusatztarif ersetzt den TK-Zuschuss nicht.', text: 'Er erstattet nach seinen Bedingungen, mit Höchstbetrag, Methodenprüfung und der Regel, dass alle Kostenträger zusammen nicht mehr als die Kosten zahlen.' },
            { lead: 'Eine laufende Behandlung ist nicht neu versicherbar.', text: 'Was vor dem Versicherungsbeginn eingetreten ist, bleibt außerhalb. Abschließen gehört vor die Behandlung.' },
            { lead: 'Zur Wirkung sagen wir nichts.', text: 'Wer für Osteopathie in Frage kommt, entscheidet eine Ärztin oder ein Arzt. Dieser Ratgeber gibt keine Behandlungsempfehlung.' },
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
              icon: 'protection',
              tone: 'butter',
              title: 'Heilpraktiker-Zusatzversicherung',
              text: 'Kriterien statt Rangliste, Gesundheitsfragen und Grenzen.',
              to: '/ratgeber/heilpraktiker-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'sky',
              title: 'Chiropraktiker Kosten',
              text: 'Arzt oder Heilpraktiker: wer behandelt und wer zahlt.',
              to: '/ratgeber/chiropraktiker-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'lavender',
              title: 'TK Bonusprogramm 2026',
              text: 'Punkte, Gesundheitsdividende, Nachweise und Fristen.',
              to: '/ratgeber/tk-bonusprogramm-2026',
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
      question: 'Wie viel zahlt die TK bei Osteopathie?',
      answer:
        'Die TK zahlt 40 EUR je Sitzung, jedoch nicht mehr als die tatsächlichen Kosten, für höchstens drei Sitzungen im Kalenderjahr. Das sind höchstens 120 EUR im Jahr (TK-Satzung § 27 b, Leistungsseite Stand 02.03.2026).',
    },
    {
      question: 'Brauche ich für die TK eine ärztliche Bescheinigung?',
      answer:
        'Ja. Die osteopathische Behandlung muss von einer Ärztin oder einem Arzt veranlasst und vor Beginn der Behandlung schriftlich bescheinigt werden, zum Beispiel mit einem Privatrezept. Eine formlose Bescheinigung je Kalenderjahr gilt für bis zu drei Behandlungen.',
    },
    {
      question: 'Gibt es eine TK-Liste mit Osteopathen?',
      answer:
        'Nein. Nach den Angaben der TK gibt es keine zentrale Datenbank aller Osteopathen. Die TK verlinkt stattdessen Berufsverbände wie den Bundesverband Osteopathie und die Deutsche Ärztegesellschaft für Osteopathie.',
    },
    {
      question: 'Zahlt die TK Osteopathie auch für Kinder?',
      answer:
        'Ja. Alle TK-Versicherten erhalten den Zuschuss unter denselben Voraussetzungen, auch Kinder: 40 EUR je Sitzung, höchstens drei Sitzungen im Kalenderjahr, mit ärztlicher Bescheinigung vor Beginn.',
    },
    {
      question: 'Bis wann kann ich die Rechnung bei der TK einreichen?',
      answer:
        'Ansprüche auf Sozialleistungen verjähren vier Jahre nach Ablauf des Kalenderjahres, in dem sie entstanden sind. Die Rechnung lädst du mit der ärztlichen Bescheinigung über Meine TK oder die TK-App hoch.',
    },
    {
      question: 'Zahlt die TK Osteopathie auch beim Heilpraktiker?',
      answer:
        'Satzung und TK-Seiten nennen Heilpraktiker nicht ausdrücklich. Verlangt werden eine Ausbildung in parietaler, viszeraler und cranialer Osteopathie mit Abschlussprüfung und die Mitgliedschaft in einem Berufsverband oder die Berechtigung dazu. Frag vor dem ersten Termin bei der TK nach, ob dein Osteopath die Voraussetzungen erfüllt.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Hol dir die ärztliche Bescheinigung vor dem ersten Termin und lass dir von der Praxis die Qualifikation nennen. Was ein Zusatztarif für Naturheilverfahren erstattet, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Alle Kostenfragen rund um Heilpraktiker sammelt die Seite ' },
      { text: 'Heilpraktiker Kosten', to: '/ratgeber/heilpraktiker-kosten' },
      { text: ', mehr zum Bonus der TK steht im ' },
      { text: 'Ratgeber TK Bonusprogramm 2026', to: '/ratgeber/tk-bonusprogramm-2026' },
      { text: ', und welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Zuschuss und Voraussetzungen stammen von der TK selbst und aus der TK-Satzung, die Preisorientierung vom Verband der Osteopathen, die Tarifregeln aus den SDK-Bedingungen.',
    items: [
      {
        label: 'Wie viel übernimmt die TK bei Osteopathie?',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/alternative-medizin/osteopathie/zuzahlung-osteopathie-2001882',
        stand: '02.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Unter welchen Voraussetzungen beteiligt sich die TK an den Kosten für Osteopathie?',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/alternative-medizin/osteopathie/bedingungen-tk-zuschuss-osteopathie-2001884',
        stand: '02.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Osteopath oder Osteopathin finden',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/alternative-medizin/osteopathie/osteopathen-finden-2001886',
        stand: '10.08.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wie lang kann ich meine Rechnungen zur Kostenerstattung einreichen?',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/alternative-medizin/osteopathie/verjaehrung-leistungen-rechnung-einreichen-2013346',
        stand: '22.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Übernimmt die TK auch Kosten für die osteopathische Therapie bei Kindern?',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/techniker/service/leistungen-und-mitgliedschaft/zuzahlung-und-erstattung/osteopathie/kostenuebernahme-osteopathie-kinder-2001890',
        stand: '02.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Osteopathische Behandlung: Kosten und Dauer',
        publisher: 'Verband der Osteopathen Deutschland (VOD)',
        href: 'https://www.osteopathie.de/behandlung',
        stand: 'ohne Datum',
        accessedAt: '07.10.2026',
        note: 'Preisorientierung des Verbands, keine Marktpreiserhebung',
      },
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
        label: 'Satzung der Techniker Krankenkasse, § 27b Osteopathie',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/resource/blob/2077108/4e7ed5157f5fdbdc74cf14a044c0afdc/tk-satzung-data.pdf',
        stand: '17.04.2026',
        accessedAt: '07.10.2026',
        note: 'Werte deckungsgleich mit tk.de und der KassenBoost-Erhebung vom 26.08.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Bedingungen. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
