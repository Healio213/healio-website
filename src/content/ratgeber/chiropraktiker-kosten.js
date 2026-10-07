/**
 * Ambulant-Ratgeber Welle A: Chiropraktiker Kosten, wer behandelt, wer zahlt
 * und was ein Tarif erstattet.
 *
 * Quellen (Abruf 07.10.2026, Belege in chiropraktiker-kosten.belege.md):
 * DAK (Chirotherapie, Stand 01.10.2026), Bundesärztekammer (Muster-Kursbuch
 * Manuelle Medizin), Satzung AOK Rheinland/Hamburg (18. Nachtrag, § 12 b),
 * BAHN-BKK (Broschüre Alternative Heilmethoden, Stand Juli 2024; Satzung § 22 b
 * laut KassenBoost-Erhebung 26.08.2026), GOÄ Anlage und § 5, Anlage 2 BBhV,
 * SDK AVB Teil I und Teil II.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Angabe pro Sitzung beim Heilpraktiker: Es gibt dafür keine
 *     neutrale Quelle. Der Text sagt das und nennt als Orientierung nur die
 *     Beihilfe-Höchstbeträge der Anlage 2 BBhV (als solche gekennzeichnet) und
 *     die GOÄ-Rechnung für Ärzte (eigene Rechnung).
 *   - "Chiropraktiker" wird nicht als geschützte oder ungeschützte
 *     Berufsbezeichnung bewertet. Belegt ist nur der Hinweis der DAK, dass viele
 *     Chiropraktiker keine Ärzte sind, sondern zum Beispiel Heilpraktiker.
 *   - Die Satzungsbeispiele (AOK Rheinland/Hamburg, BAHN-BKK) sind Beispiele,
 *     keine Kassenübersicht. Andere Kassen regeln es anders oder gar nicht.
 *   - Keine Aussage zur Wirkung der Chiropraktik, keine Behandlungsempfehlung.
 *   - Das Rechenbeispiel arbeitet mit angenommenen Preisen.
 *   - Keine Aufnahme in GOOGLE_ADS_EXCLUDED_PATHS und ANALYTICS_EXCLUDED_PATHS
 *     (Entscheidung der Marktanalyse-Sitzung 07.10.2026: Kosten-Seite, keine
 *     Krankheitsbilder über die Kassenbedingungen hinaus).
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): § 12 b AOK Rheinland/Hamburg
 * im Satzungs-PDF gelesen (gemeinsamer Deckel auch mit rezeptfreien Arzneimitteln,
 * private Krankenversicherung wird vorrangig angerechnet); DAK, GOÄ, BBhV, BÄK
 * und GebüH-Register (Chiropraktik Nr. 34.1 bis 34.2) im Original geprüft.
 */

export const article = {
  slug: 'chiropraktiker-kosten',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Chiropraktiker Kosten: wer behandelt und wer zahlt | Healio',
  metaDescription:
    'Chiropraktiker Kosten: wann die Kasse beim Arzt zahlt, warum der Heilpraktiker meist privat ist, was Satzungen bezuschussen und was ein Zusatztarif erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Chiropraktiker Kosten: wer behandelt, wer zahlt und was bei dir bleibt',
  listTeaser:
    'Beim Vertragsarzt mit Zusatzbezeichnung zahlt die Kasse, beim Heilpraktiker meist nicht. Hier siehst du den Unterschied, Satzungsbeispiele und was ein Tarif erstattet.',

  headline: 'Chiropraktiker Kosten: wer behandelt, wer zahlt und was bei dir bleibt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'ambulant',
    facts: [
      { value: 'Vertragsarzt', label: 'mit Zusatzbezeichnung Chirotherapie: Kassenleistung' },
      { value: 'Heilpraktiker', label: 'bezahlt die Kasse in der Regel nicht' },
      { value: 'bis zu 1.000 EUR', label: 'in zwei Jahren im Topf Naturheilverfahren (Ambulant 100)' },
    ],
    text: 'Ob die Kasse zahlt, hängt weniger vom Wort Chiropraktik ab als davon, wer behandelt. Einzelne Kassen bezuschussen in ihrer Satzung auch Heilpraktiker, etwa mit Jahresdeckel und ärztlicher Verordnung.',
    path: { to: '/ambulant', text: 'Rechnung selbst getragen?', label: 'Tarifstufen und Beitrag ansehen' },
  },

  lead:
    'Wer chiropraktisch behandelt wird, zahlt je nach Behandler sehr Unterschiedliches. Bei einem Vertragsarzt mit der Zusatzbezeichnung Chirotherapie übernimmt die Kasse die Behandlung. Viele Chiropraktiker sind aber keine Ärzte, sondern zum Beispiel Heilpraktiker, und dann zahlen die meisten Kassen nicht. Hier erfährst du, worauf der Unterschied beruht, was Satzungen bezuschussen und was ein ambulanter Tarif erstattet.',

  sections: [
    {
      id: 'wer-behandelt',
      heading: 'Wer behandelt eigentlich als Chiropraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das kann eine Ärztin oder ein Arzt sein, aber auch ein Heilpraktiker oder ein Physiotherapeut mit Zusatzausbildung. Bei Ärzten gibt es die Zusatz-Weiterbildung Manuelle Medizin, früher Manuelle Medizin/Chirotherapie. Die Bundesärztekammer führt dafür ein Muster-Kursbuch, zuletzt mit Stand März 2026. Die DAK spricht von der Zusatzbezeichnung Chirotherapie.',
        },
        {
          type: 'paragraph',
          text: 'Viele Chiropraktiker sind laut DAK keine ausgebildeten Ärzte, sondern zum Beispiel Heilpraktiker. Welche Abrechnung und welche Kostenübernahme gelten, hängt deshalb schon an dieser Frage. Frag vor dem ersten Termin, wer dich behandelt und mit welcher Qualifikation.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Zahlt die Krankenkasse beim Chiropraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Beim Vertragsarzt mit der Zusatzbezeichnung Chirotherapie ja: Die DAK schreibt, sie trage die Kosten der Behandlung, wenn ein Vertragsarzt die Zusatzbezeichnung Chirotherapie führt. Bei Heilpraktikern zahlt sie nach eigener Aussage nicht. Das passt zur Grundregel in § 15 SGB V, nach der ärztliche Behandlung von Ärzten erbracht wird. Ob deine Kasse eine Ausnahme macht, steht in ihrer Satzung.',
        },
        {
          type: 'paragraph',
          text: 'Solche Ausnahmen sind möglich. Nach § 11 Abs. 6 SGB V kann eine Kasse in der Satzung zusätzliche Leistungen vorsehen, auch mit Heilmitteln und von nicht zugelassenen Leistungserbringern. Zwei Beispiele zeigen, wie unterschiedlich das aussieht.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zwei Satzungsbeispiele für chiropraktische Leistungen',
          head: ['Kasse und Fundstelle', 'Was die Satzung vorsieht', 'Wichtige Bedingungen'],
          rows: [
            ['AOK Rheinland/Hamburg, § 12 b', 'Chiropraktische Leistungen, auch durch Heilpraktiker, bis zu 200 EUR im Kalenderjahr, gemeinsamer Deckel mit rezeptfreien Arzneimitteln, Osteopathie, Shiatsu und weiteren Massagen', 'Verordnung durch einen Vertragsarzt; Zugang nur, wenn im Vorjahr überwiegend Kostenerstattung gewählt und höchstens in einem Quartal ambulante ärztliche Versorgung genutzt wurde; Behandler mit Verbandsmitgliedschaft oder Heilpraktikererlaubnis; Leistungen privater Krankenversicherungen werden vorrangig angerechnet'],
            ['BAHN-BKK, § 22 b', '80 Prozent der Kosten für Osteopathie, Chiropraktik und kinesiologisches Taping zusammen, höchstens 200 EUR im Jahr', 'Ärztliche Verordnung, 20 Prozent Eigenanteil bleiben; Heilpraktiker sind für Chiropraktik ausdrücklich genannt'],
          ],
          note: 'Quellen: Satzung der AOK Rheinland/Hamburg in der Fassung des 18. Nachtrags vom 07.07.2026, § 12 b Abs. 1 und 2 (Inkrafttreten 01.07.2026); BAHN-BKK, Broschüre Alternative Heilmethoden (Stand Juli 2024) und Satzung § 22 b laut Erhebung von KassenBoost vom 26.08.2026. Beispiele, keine Kassenübersicht: Andere Kassen sehen in ihrer Satzung gar nichts dafür vor.',
        },
        {
          type: 'paragraph',
          text: 'Bei beiden Beispielen kommt Chiropraktik aus einem Topf, den sie sich mit anderen Leistungen teilt. Wer zusätzlich Osteopathie nutzt, hat für die Chiropraktik entsprechend weniger übrig. Bei der AOK Rheinland/Hamburg kommt hinzu, dass Leistungen privater Krankenversicherungen vorrangig angerechnet werden. Zahlt dein Zusatztarif, bleibt für den Kassenzuschuss nur der Rest.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet ein Chiropraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine neutrale Euro-Angabe pro Sitzung gibt es nicht. Beim Heilpraktiker ist das Honorar frei vereinbar, das Gebührenverzeichnis ist nur eine Berechnungshilfe. Ein Arzt rechnet privat nach der Gebührenordnung für Ärzte ab, mit Punktzahl, Punktwert und einem Faktor zwischen dem Einfachen und dem 3,5fachen, in der Regel bis zum 2,3fachen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Chirotherapeutische Positionen der GOÄ im einfachen Satz, eigene Rechnung nach § 5 GOÄ',
          head: ['GOÄ-Nummer', 'Leistung', 'Punkte', 'Einfacher Satz'],
          rows: [
            ['3305', 'Chiropraktische Wirbelsäulenmobilisierung', '37', 'rund 2,16 EUR'],
            ['3306', 'Chirotherapeutischer Eingriff an der Wirbelsäule', '148', 'rund 8,63 EUR'],
          ],
          note: 'Eigene Rechnung: Punktzahl mal Punktwert 5,82873 Cent, auf volle Cent gerundet. Die Praxis multipliziert den einfachen Satz mit einem Faktor, der in der Regel zwischen 1 und 2,3 liegt. Punktzahlen nach der Anlage zur GOÄ (Gebührenverzeichnis), Punktwert und Faktor nach § 5 GOÄ, gesetze-im-internet.de, Abruf 07.10.2026. Die Rechnung einer Praxis enthält meist weitere Positionen, etwa Beratung oder Untersuchung.',
        },
        {
          type: 'paragraph',
          text: 'Für Heilpraktiker nennt die Beihilfe des Bundes in Anlage 2 der Bundesbeihilfeverordnung Höchstbeträge, bis zu denen sie Aufwendungen als angemessen anerkennt: 4,00 EUR für eine chiropraktische Behandlung (Nr. 34.1) und 17,00 EUR für einen gezielten chiropraktischen Eingriff an der Wirbelsäule (Nr. 34.2). Das sind Grenzen der Beihilfe, keine Preise. Was deine Praxis berechnet, kann darüber oder darunter liegen, frag danach vor dem Termin.',
        },
        {
          type: 'costCard',
          title: 'Chiropraktische Behandlung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Die Gesamterstattung aller Kostenträger darf die Kosten nicht übersteigen. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: chiropraktische Behandlung mit und ohne Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Heilpraktiker, 5 Sitzungen, angenommen 60 EUR je Sitzung (300 EUR), Kasse ohne Satzungsleistung', 'nichts', '300 EUR', 'Der Tarif erstattet bis zu 300 EUR, soweit die Rechnung erstattungsfähig ist'],
            ['Dieselbe Serie, Kasse mit Satzungsleistung von 200 EUR im Jahr und erfüllten Bedingungen', 'bis zu 200 EUR', '100 EUR', 'Kasse und Tarif zahlen zusammen höchstens die 300 EUR, im Beispiel bleibt nichts bei dir. Wer zuerst zahlt, regelt die Satzung'],
            ['Behandlung durch einen Vertragsarzt mit Zusatzbezeichnung Chirotherapie', 'die Behandlung als Kassenleistung', 'nur, was die Praxis privat dazu berechnet', 'Privat berechnete Naturheilverfahren nach GOÄ aus dem Topf Naturheilverfahren, soweit erstattungsfähig'],
            ['Behandlung schon vor dem Versicherungsbeginn gestartet', 'meist nichts', 'die ganze Rechnung', 'Nicht versichert, wenn der Versicherungsfall vor dem Beginn eingetreten ist'],
          ],
          note: 'Rechenbeispiel mit angenommenen Preisen, keine Preisangabe. Die 200 EUR entsprechen dem Jahresdeckel der Beispiele aus den Satzungen oben, deine Kasse kann anders regeln. Bei der AOK Rheinland/Hamburg werden Leistungen privater Krankenversicherungen vorrangig angerechnet (§ 12 b Abs. 2). Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Abschnitt I.5, Anrechnung nach Teil I, Stand 01.01.2022, Abschnitt A.8 Abs. 4.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Zahlt eine Zusatzversicherung den Chiropraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt vom Tarif. Bei den ambulanten SDK-Tarifen, die Healio auf der Seite Ambulant vermittelt, gehört Chiropraktik zum Bereich Heilpraktiker und Naturheilverfahren, mit dem Topf Naturheilverfahren von 500 bis 1.000 EUR je zwei Kalenderjahre, je nach Stufe. Erstattet werden alle Leistungen, die im aktuellen Gebührenverzeichnis für Heilpraktiker stehen, und Chiropraktik ist dort aufgeführt. Heilpraktiker müssen dafür nach dem Gebührenverzeichnis abrechnen, bei Ärzten gilt die Gebührenordnung für Ärzte. Ärztliche Abrechnungen erstattet der Tarif bis zu den GOÄ-Höchstsätzen.',
        },
        {
          type: 'paragraph',
          text: 'Wichtig bleibt die Methodenprüfung. Nach den Bedingungen leistet der Versicherer für Methoden, die von der Schulmedizin überwiegend anerkannt sind, und für solche, die sich in der Praxis als ebenso erfolgversprechend bewährt haben. Bei den bewährten darf er auf den Betrag kürzen, der bei einer schulmedizinischen Behandlung angefallen wäre. Welche Beschwerden sich chiropraktisch behandeln lassen, ist eine ärztliche Frage, dazu macht dieser Ratgeber keine Aussage.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'ambulant',
          text: 'Du siehst, wie viel Naturheilverfahren die einzelnen Stufen erstatten.',
          label: 'Tarifstufen ansehen',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Der Name sagt nicht, wer zahlt.', text: 'Entscheidend ist, ob ein Vertragsarzt mit Zusatzbezeichnung oder ein Heilpraktiker behandelt. Frag vorher, bei Heilpraktikern zahlt die Kasse in der Regel nicht.' },
            { lead: 'Satzungen sind Ausnahmen.', text: 'Die Beispiele oben zeigen zwei Kassen. Andere sehen in ihrer Satzung gar nichts dafür vor, und in beiden Beispielen hängt der Zuschuss an Verordnung, Jahresdeckel und geteiltem Topf.' },
            { lead: 'Einen Durchschnittspreis nennen wir nicht.', text: 'Es gibt keine neutrale Quelle dafür. Die Beihilfe-Höchstbeträge sind keine Preise.' },
            { lead: 'Eine laufende Behandlung ist nicht neu versicherbar.', text: 'Was vor dem Versicherungsbeginn eingetreten ist, bleibt außerhalb. Abschließen gehört vor die Behandlung.' },
            { lead: 'Zur Wirkung sagen wir nichts.', text: 'Wer geeignet ist, entscheidet eine Ärztin oder ein Arzt. Dieser Ratgeber gibt keine Behandlungsempfehlung.' },
          ],
        },
      ],
    },
    {
      id: 'vor-dem-termin',
      heading: 'Was klärst du vor dem ersten Termin?',
      blocks: [
        {
          type: 'steps',
          heading: 'In drei Schritten zur geklärten Kostenfrage',
          items: [
            {
              title: 'Behandler und Abrechnung klären',
              text: 'Arzt mit Zusatzbezeichnung oder Heilpraktiker? Frag nach dem Honorar und danach, nach welchem Verzeichnis abgerechnet wird.',
            },
            {
              title: 'Kasse nach der Satzung fragen',
              text: 'Frag deine Kasse, ob sie Chiropraktik bezuschusst und was sie dafür verlangt, etwa eine Verordnung vor dem Beginn.',
            },
            {
              title: 'Zusatztarif prüfen',
              text: 'Prüf, was dein Tarif für Naturheilverfahren erstattet, und reich die Rechnung mit Nummern des Gebührenverzeichnisses ein.',
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
              title: 'Gebührenordnung für Heilpraktiker',
              text: 'Warum das GebüH nur eine Berechnungshilfe ist.',
              to: '/ratgeber/gebuehrenordnung-heilpraktiker',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'sky',
              title: 'Heilpraktiker-Zusatzversicherung',
              text: 'Kriterien statt Rangliste, Gesundheitsfragen und Grenzen.',
              to: '/ratgeber/heilpraktiker-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'comparison',
              tone: 'lavender',
              title: 'TK und Osteopathie',
              text: 'Was die Techniker bei Osteopathie zuschießt.',
              to: '/ratgeber/tk-osteopathie',
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
      question: 'Zahlt die Krankenkasse den Chiropraktiker?',
      answer:
        'Beim Vertragsarzt mit der Zusatzbezeichnung Chirotherapie ja, sagt zum Beispiel die DAK. Beim Heilpraktiker zahlt sie in der Regel nicht. Einzelne Kassen bezuschussen Chiropraktik in der Satzung, in den Beispielen hier mit Jahresdeckel und ärztlicher Verordnung.',
    },
    {
      question: 'Was kostet ein Chiropraktiker pro Sitzung?',
      answer:
        'Dafür gibt es keine neutrale Euro-Angabe. Beim Heilpraktiker ist das Honorar frei vereinbar, beim Arzt gilt die GOÄ mit Punktzahl, Punktwert und Faktor. Als Beispiel: Eine chirotherapeutische Position wie GOÄ Nr. 3306 kommt auf rund 8,63 EUR im einfachen Satz. Frag deine Praxis vorab nach dem Honorar.',
    },
    {
      question: 'Was ist der Unterschied zwischen Chiropraktiker und Chirotherapeut?',
      answer:
        'Chirotherapeuten sind Ärzte mit der Zusatzbezeichnung. Chiropraktiker können Ärzte sein, sind aber laut DAK oft keine Ärzte, sondern zum Beispiel Heilpraktiker. Für Abrechnung und Kostenübernahme ist das der entscheidende Unterschied.',
    },
    {
      question: 'Welche Kassen bezuschussen Chiropraktik?',
      answer:
        'Das regelt jede Kasse in ihrer Satzung. Beispiele sind die AOK Rheinland/Hamburg mit bis zu 200 EUR im Kalenderjahr im gemeinsamen Deckel und die BAHN-BKK mit 80 Prozent der Kosten bis 200 EUR im Jahr. Andere Kassen sehen dafür gar nichts vor.',
    },
    {
      question: 'Erstattet eine Zusatzversicherung die Chiropraktik?',
      answer:
        'Je nach Tarif. Bei den ambulanten SDK-Tarifen gehört Chiropraktik zum Bereich Heilpraktiker und Naturheilverfahren mit 500 bis 1.000 EUR je zwei Kalenderjahre. Heilpraktiker müssen nach dem Gebührenverzeichnis abrechnen. Der Versicherer prüft zudem die Methode.',
    },
    {
      question: 'Ist eine schon laufende Chiropraktik-Behandlung versichert?',
      answer:
        'Nein, nicht für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind. Schließe einen Tarif deshalb vor der Behandlung ab und frag vorher nach, wie dein Fall eingeordnet wird.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Klär vor dem ersten Termin, wer dich behandelt und wie abgerechnet wird. Was ein Tarif für Naturheilverfahren erstattet, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Wie das Gebührenverzeichnis zu lesen ist, erklärt der Ratgeber ' },
      { text: 'Gebührenordnung für Heilpraktiker', to: '/ratgeber/gebuehrenordnung-heilpraktiker' },
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
    intro: 'Die Aussagen zur Kassenleistung stammen von der DAK und aus den Satzungen, die Gebührenrechnung aus der GOÄ und der Bundesbeihilfeverordnung, die Tarifregeln aus den SDK-Bedingungen.',
    items: [
      {
        label: 'Chirotherapie: Wir tragen die Kosten',
        publisher: 'DAK-Gesundheit',
        href: 'https://www.dak.de/dak/leistungen/alternative-heilmethoden/chirotherapie-wir-tragen-die-kosten_10722',
        stand: '01.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: '(Muster-)Kursbuch Manuelle Medizin',
        publisher: 'Bundesärztekammer',
        href: 'https://www.bundesaerztekammer.de/themen/aerzte/aus-fort-und-weiterbildung/weiterbildung/muster-kursbuecher',
        stand: '12./13.03.2026, 3. Auflage',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der AOK Rheinland/Hamburg, § 12 b Mehrleistungen zu Arznei- und Heilmitteln',
        publisher: 'AOK Rheinland/Hamburg',
        href: 'https://www.aok.de/pk/fileadmin/user_upload/AOK-Rheinland-Hamburg/05-Content-PDF/satzung_kk_aokrhh.pdf',
        stand: '18. Nachtrag vom 07.07.2026, in Kraft seit 01.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Alternative Heilmethoden (Broschüre)',
        publisher: 'BAHN-BKK',
        href: 'https://bahn-bkk.de/_Resources/Persistent/0bb294b48034c815d914e98d8100a00afb26c62f/422074_Broschuere%20AlternativeHeilmethoden.pdf',
        stand: 'Juli 2024',
        accessedAt: '07.10.2026',
        note: 'Die Satzungsfundstelle § 22 b stammt aus der KassenBoost-Erhebung vom 26.08.2026',
      },
      {
        label: 'Gebührenverzeichnis für Heilpraktiker (GebüH), Register: Chiropraktik Nr. 34.1 bis 34.2',
        publisher: 'Fachverband Deutscher Heilpraktiker',
        href: 'https://www.heilpraktiker.org/gebuehrenverzeichnis-fuer-heilpraktiker',
        stand: 'GebüH 85, Fassung 2002',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOÄ, Anlage Gebührenverzeichnis, Nummern 3305 und 3306',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/go__1982/anlage.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOÄ § 5 Bemessung der Gebühren',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/go__1982/__5.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'BBhV Anlage 2: Höchstbeträge für Heilpraktikerleistungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/bbhv/anlage_2.html',
        stand: 'BGBl. I 2012, 1947 bis 1952, mit späteren Änderungen',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 6',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 15 Ärztliche Behandlung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__15.html',
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
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Bedingungen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
