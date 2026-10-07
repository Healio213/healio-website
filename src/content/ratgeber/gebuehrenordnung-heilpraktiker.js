/**
 * Ambulant-Ratgeber Welle A: Gebührenordnung für Heilpraktiker (GebüH), was
 * sie ist, was sie nicht ist und was eine Zusatzversicherung danach erstattet.
 *
 * Quellen (Abruf 07.10.2026, Belege in gebuehrenordnung-heilpraktiker.belege.md):
 * Fachverband Deutscher Heilpraktiker (Beschreibung des GebüH), § 611 BGB,
 * § 1 Heilpraktikergesetz, § 5 GOÄ, Anlage 2 BBhV (Höchstbeträge für
 * Heilpraktikerleistungen), SDK AVB Teil I (1.751, Stand 01.01.2022) und Teil II
 * (1.753a, Stand 01.01.2023).
 *
 * Bewusste Grenzen:
 *   - Das GebüH selbst wird nicht abgedruckt, und es werden keine GebüH-Preise
 *     genannt. Die neutrale, amtliche Zahlenquelle sind die Höchstbeträge der
 *     Anlage 2 BBhV. Sie sind als Beihilfe-Höchstbeträge gekennzeichnet und
 *     nicht als Marktpreis oder GebüH-Satz. Die Nummern der Anlage 2 werden
 *     nicht mit GebüH-Ziffern gleichgesetzt.
 *   - Erstattung bis Höchstsatz nur wie belegt: Für ärztliche Abrechnungen
 *     nennen die SDK-Bedingungen die GOÄ-Höchstsätze, für Heilpraktiker nur
 *     die Abrechnung nach GebüH und das Recht, bei unangemessen hoher Vergütung
 *     auf einen angemessenen Betrag zu kürzen. Eine Aussage "bis zum Höchstsatz
 *     des GebüH" steht dort nicht und wird nicht gemacht.
 *   - Die Rechenkarte arbeitet mit angenommenen Beträgen.
 *   - Keine Behandlungsempfehlung und keine Aussage zur Wirkung.
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): Status in Faktenkasten und
 * Fußzeile wie Zahn-Welle 1; Tarifaussagen gegen healio.de/ambulant, die Dateien
 * im Serien-Worktree und die SDK-AVB gelesen.
 */

export const article = {
  slug: 'gebuehrenordnung-heilpraktiker',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Gebührenordnung Heilpraktiker (GebüH) erklärt | Healio',
  metaDescription:
    'Gebührenordnung für Heilpraktiker: Warum das GebüH nur eine Berechnungshilfe ist, wie Rechnungen entstehen und was eine Zusatzversicherung danach erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Gebührenordnung für Heilpraktiker (GebüH): was sie regelt und was erstattet wird',
  listTeaser:
    'Das GebüH ist keine verbindliche Gebührenordnung, sondern eine Berechnungshilfe. Hier siehst du, was das für deine Rechnung und die Erstattung bedeutet.',

  headline: 'Gebührenordnung Heilpraktiker (GebüH): was sie regelt und was erstattet wird',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'document',
    facts: [
      { value: 'unverbindlich', label: 'Das GebüH ist eine Berechnungshilfe, kein Preisgesetz' },
      { value: 'frei vereinbart', label: 'Die Vergütung regelt die Absprache mit der Praxis' },
      { value: 'Tarif entscheidet', label: 'Erstattet wird nach den Bedingungen deiner Versicherung' },
    ],
    text: 'Anders als die Gebührenordnung für Ärzte hat das Gebührenverzeichnis für Heilpraktiker keine rechtliche Bindungskraft. Deine Rechnung kann davon abweichen, und eine Zusatzversicherung erstattet nur, was ihre Bedingungen vorsehen.',
    path: { to: '/ambulant', text: 'Wie weit trägt ein Tarif die Rechnung?', label: 'Ambulante Tarife ansehen' },
  },

  lead:
    'Das Gebührenverzeichnis für Heilpraktiker, kurz GebüH, ist keine Gebührenordnung im rechtlichen Sinn. Es listet übliche Vergütungen für Leistungen von Heilpraktikern auf und dient als Hilfe, wenn eine Rechnung entsteht. Verbindlich ist es nicht. Was du am Ende zahlst, hängt an der Vereinbarung mit deiner Praxis, und was dir davon erstattet wird, an den Bedingungen deiner Versicherung.',

  sections: [
    {
      id: 'was-ist-gebueh',
      heading: 'Was ist das Gebührenverzeichnis für Heilpraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das GebüH ist ein Verzeichnis von Leistungen mit Vergütungsangaben, das der Fachverband Deutscher Heilpraktiker beschreibt und bereitstellt. Er nennt es ein Verzeichnis der durchschnittlich üblichen Vergütungen, das als Berechnungshilfe bei der Rechnungserstellung dient. Das Wort Gebührenordnung steht deshalb oft in Suchanfragen, trifft die Sache aber nicht ganz.',
        },
        {
          type: 'paragraph',
          text: 'Heilpraktikerin oder Heilpraktiker ist nach § 1 Heilpraktikergesetz, wer die Heilkunde ausübt, ohne Arzt zu sein, und dafür die Erlaubnis hat. Die Tätigkeit beruht auf einem Vertrag mit dir. Beim Dienstvertrag ist die Vergütung nach § 611 BGB die vereinbarte. Es gibt für Heilpraktiker keine staatliche Gebührenordnung, die Preise vorschreibt.',
        },
      ],
    },
    {
      id: 'verbindlich',
      heading: 'Ist die Gebührenordnung für Heilpraktiker verbindlich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Der Fachverband selbst beschreibt das GebüH als keine Gebührentaxe. Eine Praxis darf also mehr oder weniger berechnen, wenn sie das mit dir vereinbart. Ist vorher nichts ausdrücklich vereinbart, kannst du laut Fachverband davon ausgehen, dass sich das Honorar im Rahmen der Beträge des GebüH bewegt. Verbindliche Gebührenordnungen kennst du von Ärzten und Zahnärzten: Die Gebührenordnung für Ärzte (GOÄ) legt mit Punktzahl, Punktwert und Steigerungsfaktor fest, wie Ärzte privat abrechnen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Regelwerke rund um die Heilpraktikerrechnung im Vergleich',
          head: ['Regelwerk', 'Wer steht dahinter', 'Verbindlich für den Preis?', 'Wofür du es brauchst'],
          rows: [
            ['GebüH', 'Fachverband Deutscher Heilpraktiker', 'Nein, Berechnungshilfe. Die Vergütung ist frei vereinbar (§ 611 BGB)', 'Orientierung für die Rechnung; manche Zusatztarife setzen die Abrechnung danach voraus, etwa die SDK'],
            ['GOÄ', 'Bund, Verordnung', 'Ja für Ärzte: Einfacher bis 3,5facher Satz, in der Regel bis 2,3fach (§ 5 GOÄ)', 'Rechnungen von Ärzten, auch bei Naturheilverfahren durch Ärzte'],
            ['Anlage 2 BBhV', 'Bund, Beihilfe für Bundesbeamte', 'Höchstbeträge für die Beihilfe, kein Preis für Patienten', 'Zeigt, was die Beihilfe als angemessen anerkennt'],
            ['Tarifbedingungen', 'Dein Versicherer', 'Bestimmen, was erstattet wird', 'Zeigen, wie viel von der Rechnung bei dir ankommt'],
          ],
          note: 'Quellen: Fachverband Deutscher Heilpraktiker, Seite zum Gebührenverzeichnis; § 611 BGB; § 5 GOÄ; Anlage 2 zu § 6 Abs. 5 BBhV; SDK-Bedingungen. Abruf 07.10.2026.',
        },
      ],
    },
    {
      id: 'ziffern',
      heading: 'Welche Ziffern und Beträge stehen im Heilpraktiker-Gebührenverzeichnis?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Verzeichnis ordnet Leistungen Nummern zu, die auf der Rechnung stehen, etwa für Beratung, Untersuchung, Akupunktur oder Massage. Die Beträge des GebüH druckt dieser Ratgeber nicht ab. Das Verzeichnis liegt beim Fachverband, und eine neutrale, verbindliche Preisliste gibt es dafür nicht.',
        },
        {
          type: 'paragraph',
          text: 'Als amtliche Zahlenquelle taugen die Höchstbeträge der Bundesbeihilfeverordnung. Die Anlage 2 legt fest, bis zu welcher Höhe die Beihilfe des Bundes Aufwendungen für Heilpraktikerleistungen als angemessen anerkennt. Ein paar Beispiele zeigen, wie die Nummern aussehen und in welcher Größenordnung die Beihilfe rechnet.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Beispiele aus Anlage 2 BBhV: Höchstbeträge für Heilpraktikerleistungen',
          head: ['Nummer', 'Leistung laut Anlage 2', 'Höchstbetrag'],
          rows: [
            ['1', 'Für die eingehende, das gewöhnliche Maß übersteigende Untersuchung', '12,50 EUR'],
            ['4', 'Eingehende Beratung, die das gewöhnliche Maß übersteigt, von mindestens 15 Minuten Dauer, gegebenenfalls einschließlich einer Untersuchung', '18,50 EUR'],
            ['21.1', 'Akupunktur einschließlich Pulsdiagnose', '23,00 EUR'],
            ['34.1', 'Chiropraktische Behandlung', '4,00 EUR'],
            ['34.2', 'Gezielter chiropraktischer Eingriff an der Wirbelsäule', '17,00 EUR'],
            ['35.2', 'Osteopathische Behandlung des Schultergelenkes und der Wirbelsäule', '21,00 EUR'],
          ],
          note: 'Quelle: Anlage 2 zu § 6 Abs. 5 Satz 4 BBhV, Höchstbeträge für die Angemessenheit der Aufwendungen für Heilpraktikerleistungen (BGBl. I 2012, 1947 bis 1952, mit späteren Änderungen), gesetze-im-internet.de, Abruf 07.10.2026. Das sind Beihilfe-Höchstbeträge, keine Preisliste und keine GebüH-Sätze. Was deine Praxis berechnet, kann darüber oder darunter liegen.',
        },
      ],
    },
    {
      id: 'erstattung',
      heading: 'Was erstattet eine Zusatzversicherung nach dem GebüH?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt am Tarif. Bei den ambulanten Tarifen der SDK, die Healio auf der Seite Ambulant vermittelt, müssen Heilpraktiker nach dem gültigen GebüH abrechnen. Der Versicherer erstattet alle Leistungen, die im aktuellen GebüH enthalten sind, nach Erstattungssatz und bis zum Höchstbetrag des Topfs Naturheilverfahren, bis 1.000 EUR in zwei Kalenderjahren in der höchsten Stufe. Psychotherapie durch Heilpraktiker ist ausgenommen.',
        },
        {
          type: 'paragraph',
          text: 'Eine Aussage, die du oft liest, steht in diesen Bedingungen nicht: dass der Tarif bis zum Höchstsatz des GebüH erstattet. Für ärztliche Abrechnungen nennen sie die Höchstsätze der GOÄ. Für Heilpraktiker verlangen sie die Abrechnung nach dem GebüH und behalten dem Versicherer das Recht vor, bei einer unangemessen hohen Vergütung die Leistung auf einen angemessenen Betrag zu senken. Verlass dich also nicht darauf, dass jede Rechnung vollständig ankommt.',
        },
        {
          type: 'costCard',
          title: 'Heilpraktikerrechnung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: Rechnung nach GebüH mit und ohne Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Rechnung nach GebüH mit Nummern, angenommen 120 EUR', 'meist nichts', '120 EUR', 'Bis zu 120 EUR erstattet, soweit die Positionen erstattungsfähig sind'],
            ['Praxis berechnet mehr, als der Versicherer als angemessen ansieht', 'meist nichts', 'die ganze Rechnung', 'Der Versicherer kann auf einen angemessenen Betrag kürzen, die Differenz trägst du'],
            ['Rechnung ohne die geforderten Angaben, etwa ohne Nummern des Gebührenverzeichnisses', 'meist nichts', 'die ganze Rechnung', 'Der Versicherer muss nur leisten, wenn die geforderten Nachweise vorliegen'],
            ['Psychotherapie durch Heilpraktiker', 'meist nichts', 'die ganze Rechnung', 'Von der Erstattung ausgenommen'],
          ],
          note: 'Rechenbeispiel mit angenommenem Betrag, keine Preisangabe. Tarifwerte und Regeln nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Abschnitt I.5, und Teil I, Stand 01.01.2022, Abschnitte A.8 und A.9. Verbindlich ist die Entscheidung des Versicherers nach den Bedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Das GebüH ist keine Preisgarantie.', text: 'Es ist eine Berechnungshilfe. Wie viel deine Praxis verlangt, sagt dir die Honorarabsprache, nicht das Verzeichnis.' },
            { lead: 'Eine Erstattung bis zum Höchstsatz des GebüH steht in den SDK-Bedingungen nicht.', text: 'Dort steht die Abrechnung nach GebüH als Voraussetzung und das Recht auf Kürzung bei unangemessen hoher Vergütung.' },
            { lead: 'Die Beihilfe-Beträge sind kein Preis.', text: 'Die Höchstbeträge der Anlage 2 BBhV zeigen, was die Beihilfe des Bundes anerkennt. Die Beträge sagen nichts über Preise in deiner Praxis.' },
            { lead: 'Der Abschluss gehört vor die Behandlung.', text: 'Wer erst in Behandlung ist und dann einen Tarif abschließt, hat für den bereits eingetretenen Versicherungsfall keinen Anspruch.' },
          ],
        },
      ],
    },
    {
      id: 'rechnung-lesen',
      heading: 'Wie liest du eine Heilpraktikerrechnung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine Rechnung, die du einreichen willst, braucht bestimmte Angaben. Nach den Bedingungen der SDK gehören dazu dein Name, die Bezeichnung der Krankheit, die erbrachten Leistungen mit den Nummern des Gebührenverzeichnisses und das Behandlungsdatum. Fehlt etwas, muss der Versicherer nicht leisten, bis die Nachweise vollständig sind.',
        },
        {
          type: 'steps',
          heading: 'Vor und nach der Behandlung',
          items: [
            {
              title: 'Honorar vorher erfragen',
              text: 'Frag deine Praxis, wie sie abrechnet und was die Behandlung voraussichtlich kostet. Bei längeren Serien hilft eine schriftliche Absprache.',
            },
            {
              title: 'Rechnung prüfen',
              text: 'Auf der Rechnung stehen Leistungen mit Nummern, Datum, deine Angaben und der Betrag. Unklare Positionen klärst du mit der Praxis, bevor du einreichst.',
            },
            {
              title: 'Einreichen und abgleichen',
              text: 'Du reichst die Rechnung im Original ein, auch elektronisch. Prüf die Erstattung gegen die Bedingungen und plane erst danach mit weiteren Erstattungen.',
            },
          ],
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'document',
          text: 'Du siehst, wie viel Naturheilverfahren die einzelnen Stufen erstatten.',
          label: 'Tarifstufen ansehen',
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
              icon: 'comparison',
              tone: 'sky',
              title: 'Akupunktur Kosten',
              text: 'Wann die Kasse zahlt und was die Sitzung privat kostet.',
              to: '/ratgeber/akupunktur-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'lavender',
              title: 'Chiropraktiker Kosten',
              text: 'Arzt oder Heilpraktiker: wer behandelt und wer zahlt.',
              to: '/ratgeber/chiropraktiker-kosten',
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
      question: 'Gibt es eine verbindliche Gebührenordnung für Heilpraktiker?',
      answer:
        'Nein. Das Gebührenverzeichnis für Heilpraktiker (GebüH) ist nach der Beschreibung des Fachverbands Deutscher Heilpraktiker keine Gebührentaxe, sondern ein Verzeichnis üblicher Vergütungen und eine Berechnungshilfe. Die Vergütung ist frei vereinbar.',
    },
    {
      question: 'Was bedeutet GebüH?',
      answer:
        'GebüH steht für Gebührenverzeichnis für Heilpraktiker. Es ordnet Leistungen Nummern und Vergütungsangaben zu und dient Praxen als Hilfe bei der Rechnung.',
    },
    {
      question: 'Muss ein Heilpraktiker nach dem GebüH abrechnen?',
      answer:
        'Rechtlich nicht, die Vergütung ist frei vereinbar. Manche Zusatzversicherungen machen die Abrechnung nach GebüH aber zur Voraussetzung der Erstattung, so auch die ambulanten Tarife der SDK.',
    },
    {
      question: 'Erstattet meine Zusatzversicherung die ganze Heilpraktikerrechnung?',
      answer:
        'Nicht automatisch. Es zählt, was die Bedingungen als erstattungsfähig einstufen, dazu Erstattungssatz und Höchstbetrag. Bei den ambulanten SDK-Tarifen kann der Versicherer außerdem bei unangemessen hoher Vergütung auf einen angemessenen Betrag senken.',
    },
    {
      question: 'Gibt es Höchstbeträge für Heilpraktikerleistungen?',
      answer:
        'Für die Beihilfe des Bundes ja: Anlage 2 der Bundesbeihilfeverordnung nennt Höchstbeträge, etwa 23,00 EUR für Akupunktur einschließlich Pulsdiagnose. Das sind Grenzen der Beihilfe, keine Preise, die für deine Praxis gelten.',
    },
    {
      question: 'Was gehört auf eine Heilpraktikerrechnung?',
      answer:
        'Nach den Bedingungen der SDK der Name der behandelten Person, die Bezeichnung der Krankheit, die erbrachten Leistungen mit den Nummern des Gebührenverzeichnisses und das Behandlungsdatum. Ohne diese Angaben muss der Versicherer nicht leisten.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir vor der Behandlung das Honorar nennen und schau auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', wie viel die einzelnen Tarifstufen für Naturheilverfahren erstatten. Welche Kriterien einen Zusatztarif ausmachen, steht im Ratgeber ' },
      { text: 'Heilpraktiker-Zusatzversicherung', to: '/ratgeber/heilpraktiker-zusatzversicherung' },
      { text: ', und alle Kostenfragen rund um Heilpraktiker sammelt die Seite ' },
      { text: 'Heilpraktiker Kosten', to: '/ratgeber/heilpraktiker-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Der Charakter des GebüH stammt vom Fachverband selbst und aus dem BGB, die Beträge aus der Bundesbeihilfeverordnung, die Erstattungsregeln aus den SDK-Bedingungen.',
    items: [
      {
        label: 'Gebührenverzeichnis für Heilpraktiker (GebüH)',
        publisher: 'Fachverband Deutscher Heilpraktiker',
        href: 'https://www.heilpraktiker.org/gebuehrenverzeichnis-fuer-heilpraktiker',
        stand: 'ohne Datum',
        accessedAt: '07.10.2026',
      },
      {
        label: 'BGB § 611 Vertragstypische Pflichten beim Dienstvertrag',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/bgb/__611.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Heilpraktikergesetz § 1',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/heilprg/__1.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOÄ § 5 Bemessung der Gebühren für Leistungen des Gebührenverzeichnisses',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/go__1982/__5.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'BBhV Anlage 2: Höchstbeträge für die Angemessenheit der Aufwendungen für Heilpraktikerleistungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/bbhv/anlage_2.html',
        stand: 'BGBl. I 2012, 1947 bis 1952, mit späteren Änderungen',
        accessedAt: '07.10.2026',
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
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen nach dem Stand der genannten Bedingungen vom 7. Oktober 2026. Maßgeblich sind immer deine Honorarabsprache, der Versicherungsschein und die Bedingungen des Versicherers.',
};

export default article;
