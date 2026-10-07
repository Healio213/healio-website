/**
 * Familien-Ratgeber (Serie, Stapel familienplanung), Seite: Neugeborenes
 * versichern, Krankenkasse und Zusatzversicherung ab Geburt.
 *
 * SPERRLISTEN-KANDIDAT: Der Pfad /ratgeber/neugeborenes-versichern gehört in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js), wie alle Schwangerschafts-
 * und Babyseiten, damit auf dieser Seite weder Werbe-Messung noch Remarketing
 * laufen. Die Seite spricht niemanden als schwanger an und stellt keine
 * Gesundheitsfrage an die Leserin.
 *
 * Quellen (Belege je Zahl in neugeborenes-versichern.belege.md, Abruf
 * 07.10.2026): VVG § 198 Abs. 1 bis 4 (Kindernachversicherung); SGB V § 3
 * Satz 3 und § 10 Abs. 1, 3, 5 und 6 (Familienversicherung); AVB B 275000 (Stand
 * 11/2024) § 2 Abs. 2 und 3; Tarifbedingungen Komfort B 275005 und Prestige
 * B 275006 (Stand 11/2024) Ziffer 2.3; Produktsteckbrief B 275010 (08.2025,
 * Kinderbeitrag); Fachauskunft der Bayerischen an Healio vom 05.10.2026;
 * Produktseite healio.de/stationaer (live 07.10.2026, SDK-Aufnahme des
 * Neugeborenen).
 *
 * Bewusste Grenzen:
 *   - § 198 VVG steht immer mit allen Voraussetzungen: Elternteil am Tag der
 *     Geburt versichert, Anmeldung spätestens zwei Monate nach dem Tag der
 *     Geburt, Schutz höchstens so umfassend wie der des Elternteils,
 *     vereinbarte Mindestversicherungsdauer bis drei Monate (Bayerische drei
 *     Monate, SDK keine laut Produktseite), nur Neugeborene und minderjährige
 *     Adoptivkinder.
 *   - Kind ab Geburt "ohne Gesundheitsprüfung" nur mit den Voraussetzungen im
 *     selben Satz (Franks Regel 06.10.2026; § 198 VVG; Bayerische AVB § 2
 *     Abs. 2: Elternteil am Tag der Geburt mindestens drei Monate versichert,
 *     Anmeldung binnen zwei Monaten; SDK AVB Teil I A.5: Elternteil zur Zeit
 *     der Geburt versichert, Anmeldung binnen zwei Monaten, ohne
 *     Risikozuschläge oder Leistungsausschlüsse). Der Vertragstest des
 *     Serienzweigs sperrt die Formel bisher auch im Kind-Zusammenhang; beim
 *     Einbau anpassen wie Commit 5bf4c8c.
 *   - Adoption: Risikozuschlag bis zur einfachen Prämie zulässig (§ 198 Abs. 2
 *     Satz 2 VVG; SDK höchstens 100 Prozent, Bayerische zusätzlich
 *     Leistungsausschluss möglich, AVB § 2 Abs. 3). "Ohne Gesundheitsprüfung"
 *     steht deshalb nur für Neugeborene.
 *   - Franks Ergänzung 07.10.2026 (Abschnitt "Warum lohnt sich der Schutz ab der
 *     Geburt?"): nur, was AVB § 2 Abs. 2, TB Ziffer 2.3, SDK AVB A.5 und SP1/SP2
 *     Nr. 8 tragen; keine pauschale Zusage für alle Geburtskomplikationen.
 *   - Geprüft am 07.10.2026 (Prüfbericht PRÜFBERICHT-familienplanung.md).
 *   - Kinderbeitrag der SDK nennt die Produktseite nicht; die Seite sagt das.
 *     Kinderbeitrag der Bayerischen nur wie im Produktsteckbrief und auf
 *     healio.de/stationaer (bis 15 Jahre Komfort 3,20 EUR, Prestige 4,10 EUR).
 *   - Familienversicherung nach dem Gesetzestext; Einkommensgrenzen und
 *     Zahlenwerte stehen bewusst nicht auf der Seite (ändern sich jährlich).
 *   - Eine bestehende oder bekannte Schwangerschaft ist für die Entbindung
 *     nicht mitversichert; die Seite beschreibt keinen Weg, sie beim Abschluss
 *     zu übergehen. Die Fragen im Antrag werden wahrheitsgemäß beantwortet.
 *   - Kein Kinderwunsch-Wort, kein NIPT, keine Nackenfaltenmessung. Ambulante
 *     Hebammenleistungen der Bayerischen werden nicht erwähnt.
 *   - Kein Hinweis auf Verdienst oder Vergütung, keine Zusage zur
 *     Annahme eines Antrags.
 */

export const article = {
  slug: 'neugeborenes-versichern',
  kind: 'ratgeber',
  group: 'familie',

  metaTitle: 'Neugeborenes versichern: Kasse und Zusatzschutz | Healio',
  metaDescription:
    'Neugeborenes versichern: Familienversicherung bei der Krankenkasse, das Baby nach § 198 VVG in der Zusatzversicherung anmelden und alle Fristen als Checkliste.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Neugeborenes versichern: Kasse, Zusatzversicherung und Fristen',
  listTeaser:
    'Wie dein Baby in die Familienversicherung kommt, wie du es nach § 198 VVG in die Zusatzversicherung bringst und welche Fristen dabei gelten.',

  headline: 'Neugeborenes versichern: Krankenkasse und Zusatzversicherung ab Geburt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'family',
    facts: [
      { value: '2 Monate', label: 'nach der Geburt anmelden, dann gilt der Schutz rückwirkend' },
      { value: 'Mindestens 3 Monate', label: 'Elternteil bei der Bayerischen am Tag der Geburt versichert' },
      { value: 'Familienversicherung', label: 'in der Kasse, für Angehörige werden keine Beiträge erhoben' },
    ],
    text: 'In der Krankenkasse ist dein Baby in der Regel familienversichert. In der Zusatzversicherung meldest du es innerhalb von zwei Monaten an. Der Schutz des Kindes reicht höchstens so weit wie der eines Elternteils.',
    path: { to: '/stationaer#familie', text: 'Baby in den Klinikschutz aufnehmen', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Ein Neugeborenes ist bei der gesetzlichen Krankenkasse in der Regel über die Familienversicherung versichert. In der Zusatzversicherung gilt eine eigene Frist. Ist ein Elternteil am Tag der Geburt beim Zusatzversicherer versichert, bei der Bayerischen seit mindestens drei Monaten, und meldest du dein Baby spätestens zwei Monate nach der Geburt an, nimmt der Versicherer es nach § 198 VVG ohne Gesundheitsprüfung auf, ohne Risikozuschlag und ohne Wartezeit. Hier stehen beide Wege und die Fristen als Checkliste.',

  sections: [
    {
      id: 'krankenkasse',
      heading: 'Wie ist ein Neugeborenes in der Krankenkasse versichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'In der Regel über die Familienversicherung. Kinder von Mitgliedern sind unter den Voraussetzungen des § 10 SGB V mitversichert, bis zur Vollendung des 18. Lebensjahres und in bestimmten Fällen länger. Für versicherte Familienangehörige werden keine Beiträge erhoben (§ 3 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Du musst dein Baby melden. Das Mitglied hat die Angaben, die für die Familienversicherung nötig sind, an die Kasse zu melden (§ 10 Abs. 6 SGB V). Tu das möglichst bald nach der Geburt.',
        },
        {
          type: 'paragraph',
          text: 'Zwei Sonderfälle gibt es. Kommt die Familienversicherung über mehrere Mitglieder in Frage, wählt das Mitglied die Krankenkasse (§ 10 Abs. 5). Und bei verheirateten Eltern oder eingetragenen Lebenspartnern entfällt sie, wenn der andere Elternteil nicht Mitglied einer Krankenkasse ist, etwa weil er privat versichert ist, regelmäßig im Monat mehr als ein Zwölftel der Jahresarbeitsentgeltgrenze verdient und regelmäßig mehr als das Mitglied (§ 10 Abs. 3). Dann braucht dein Kind einen eigenen Schutz, etwa über die private Krankenversicherung.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Welche Kasse rund um Schwangerschaft und Baby Extras zahlt, steht im Ratgeber ' },
            { text: 'Babybonus Krankenkasse 2026', to: '/ratgeber/babybonus-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Wie kommt dein Baby in die Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mit einer Anmeldung innerhalb von zwei Monaten nach der Geburt. Das Gesetz sagt es so: Besteht am Tag der Geburt für mindestens einen Elternteil eine Krankenversicherung, ist der Versicherer verpflichtet, dessen neugeborenes Kind ab Vollendung der Geburt ohne Risikozuschläge und Wartezeiten zu versichern, wenn die Anmeldung zur Versicherung spätestens zwei Monate nach dem Tag der Geburt rückwirkend erfolgt (§ 198 Abs. 1 VVG).',
        },
        {
          type: 'steps',
          heading: 'Die Voraussetzungen im Überblick',
          items: [
            {
              title: 'Ein Elternteil ist am Tag der Geburt versichert',
              text: 'Es reicht ein Elternteil, das kann auch der Vater sein. Der Versicherer darf eine Mindestversicherungsdauer des Elternteils von bis zu drei Monaten vereinbaren (§ 198 Abs. 3 VVG). Die Bayerische tut das: Ein Elternteil muss am Tag der Geburt mindestens drei Monate bei ihr versichert sein. Bei der SDK reicht es, wenn ein Elternteil zur Zeit der Geburt dort versichert ist, eine Vorversicherungszeit gibt es nicht.',
            },
            {
              title: 'Die Anmeldung kommt binnen zwei Monaten',
              text: 'Spätestens zwei Monate nach dem Tag der Geburt muss die Anmeldung beim Versicherer eingehen. Dann gilt der Schutz rückwirkend ab der Geburt. Melde dein Baby früh an und nicht am letzten Tag.',
            },
            {
              title: 'Der Schutz ist nicht größer als beim Elternteil',
              text: 'Der beantragte Schutz darf nicht höher und nicht umfassender sein als der des versicherten Elternteils. Soll dein Baby einen Klinik-Tarif bekommen, braucht ein Elternteil selbst einen Klinik-Tarif beim selben Versicherer. Soll es SP1 der SDK bekommen, braucht ein Elternteil SP1.',
            },
            {
              title: 'Es geht um Neugeborene und minderjährige Adoptivkinder',
              text: 'Der Geburt steht die Adoption gleich, wenn das Kind dabei noch minderjährig ist. Anders als beim Neugeborenen darf der Versicherer bei einer höheren Gefahr einen Risikozuschlag bis zur Höhe des einfachen Beitrags verlangen (§ 198 Abs. 2 VVG), die Bayerische kann zusätzlich Leistungen ausschließen oder einschränken (AVB § 2 Abs. 3). Für ältere Kinder gilt der normale Antrag.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Ist ein Elternteil am Tag der Geburt versichert, bei der Bayerischen seit mindestens drei Monaten, und kommt die Anmeldung binnen zwei Monaten, nehmen beide Versicherer dein neugeborenes Kind ohne Gesundheitsprüfung auf. Bei der Bayerischen beginnt der Schutz ab Vollendung der Geburt ohne Risikozuschläge und ohne Wartezeiten, auch für Geburtsschäden, angeborene Krankheiten und Anomalien (AVB B 275000, § 2 Abs. 2). Die SDK nimmt das Kind ohne Risikozuschlag und ohne Leistungsausschluss auf, auch bei Geburtsschäden oder angeborenen Krankheiten (AVB Teil I, Abschnitt A.5).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Das Baby in der Zusatzversicherung: SDK und Bayerische im Vergleich',
          head: ['Frage', 'SDK', 'Bayerische'],
          rows: [
            [
              'Elternteil am Tag der Geburt',
              'Im Klinik-Tarif versichert, keine Vorversicherungszeit',
              'Seit mindestens 3 Monaten versichert',
            ],
            [
              'Anmeldung',
              'Spätestens 2 Monate nach der Geburt, Schutz rückwirkend ab dem Tag der Geburt',
              'Spätestens 2 Monate nach dem Tag der Geburt, Schutz rückwirkend',
            ],
            [
              'Prüfung, Zuschlag, Wartezeit',
              'Aufnahme ohne Gesundheitsprüfung, ohne Risikozuschlag und ohne Leistungsausschluss, wenn ein Elternteil zur Zeit der Geburt versichert ist und die Anmeldung binnen 2 Monaten kommt, auch bei Geburtsschäden und angeborenen Krankheiten',
              'Aufnahme ohne Gesundheitsprüfung, ohne Risikozuschlag und ohne Wartezeit, wenn ein Elternteil am Tag der Geburt seit 3 Monaten versichert ist und die Anmeldung binnen 2 Monaten kommt, auch bei Geburtsschäden, angeborenen Krankheiten und Anomalien',
            ],
            [
              'Umfang des Schutzes',
              'Höchstens so umfassend wie der des besser versicherten Elternteils',
              'Höchstens so umfassend wie der eines versicherten Elternteils',
            ],
            [
              'Beitrag fürs Kind',
              'Die Produktseite nennt keinen Kinderbeitrag, du siehst ihn im Beitragsrechner',
              'Bis 15 Jahre: Komfort 3,20 EUR, Prestige 4,10 EUR im Monat',
            ],
            [
              'Begleitperson im Krankenhaus',
              'Rooming-in für versicherte Kinder unter 16 Jahren',
              'Unterkunft und Verpflegung eines Elternteils zu 100 %, soweit die Kasse nicht zahlt, für Kinder unter 16',
            ],
          ],
          note: 'Nach § 198 VVG, AVB der Bayerischen B 275000 § 2 Abs. 2, AVB der SDK Teil I Abschnitt A.5, den Tarifbedingungen Komfort und Prestige Ziffer 2.3, dem Produktsteckbrief B 275010 und healio.de/stationaer (live am 7. Oktober 2026). Beiträge hängen vom Alter ab.',
        },
        {
          type: 'path',
          to: '/stationaer#familie',
          icon: 'family',
          text: 'Wie SDK und Bayerische dein Baby aufnehmen und was dein eigener Vertrag dafür braucht, siehst du im Überblick für werdende Eltern.',
          label: 'Klinik-Tarife ansehen',
        },
      ],
    },
    {
      id: 'warum-ab-geburt',
      heading: 'Warum lohnt sich der Schutz ab der Geburt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Niemand weiß vorher, wie eine Geburt verläuft. Mit der Nachversicherung ist dein Kind ab Vollendung der Geburt im Umfang seines Tarifs versichert, auch für Geburtsschäden und angeborene Krankheiten, je nach Tarif mit Chefarzt und Ein- oder Zweibettzimmer. Ohne sie stellt der Versicherer bei einem späteren Antrag fürs Kind Gesundheitsfragen, und ein Befund aus der Zeit der Geburt kann den Abschluss dann erschweren.',
        },
        {
          type: 'paragraph',
          text: 'Muss dein versichertes Kind ins Krankenhaus, kann ein Elternteil bei ihm bleiben. Komfort und Prestige der Bayerischen zahlen Unterkunft und Verpflegung eines Elternteils als Begleitperson zu 100 Prozent, solange das Kind jünger als 16 Jahre ist und soweit die Kasse die Kosten nicht trägt (Ziffer 2.3 der Tarifbedingungen). Bei der SDK heißt das Rooming-in, ebenfalls für versicherte Kinder unter 16. Bei Kindern unter neun Jahren vermutet das Gesetz, dass die Mitaufnahme medizinisch notwendig ist, dann zahlt sie die Kasse (§ 11 Abs. 3 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Direkt nach der Geburt gilt eine Besonderheit. Solange die Mutter wegen der Entbindung selbst stationär liegt, läuft ihre Unterbringung über ihren eigenen Aufenthalt. Bleibt das versicherte Kind nach ihrer Entlassung in der Klinik und wird sie als Begleitperson aufgenommen, kann bei der Bayerischen Ziffer 2.3 greifen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Jede Schwangerschaft ist anders. Wer weitere Kinder plant, hat in der nächsten Schwangerschaft schon den laufenden Vertrag. Wann dann die Entbindung versichert ist, steht im Ratgeber ' },
            { text: 'Baby geplant: Klinikschutz vor der Schwangerschaft abschließen', to: '/ratgeber/baby-geplant-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'fristen',
      heading: 'Welche Fristen gelten, und in welcher Reihenfolge?',
      blocks: [
        {
          type: 'steps',
          heading: 'Die Fristen als Checkliste',
          items: [
            {
              title: 'Vor der Geburt: den Vertrag des Elternteils prüfen',
              text: 'Prüfe, ob ein Elternteil einen Klinik-Tarif bei dem Versicherer hat, bei dem dein Baby mitversichert werden soll. Bei der Bayerischen muss er am Tag der Geburt seit mindestens drei Monaten laufen. Plane Puffer ein, falls das Baby früher kommt als der Termin.',
            },
            {
              title: 'Am Tag der Geburt: der Vertrag muss bestehen',
              text: 'Der Tag der Geburt zählt. An diesem Tag muss der Elternteil versichert sein. Ein Vertrag, der erst danach beginnt, löst die Kindernachversicherung nicht aus.',
            },
            {
              title: 'Möglichst bald: das Baby bei der Krankenkasse melden',
              text: 'Die Familienversicherung meldest du bei deiner Kasse an (§ 10 Abs. 6 SGB V). Bei verheirateten Eltern mit einem privat versicherten Elternteil klärst du vorher, ob die Familienversicherung greift.',
            },
            {
              title: 'Spätestens zwei Monate nach der Geburt: das Baby beim Zusatzversicherer anmelden',
              text: 'Die Frist läuft ab dem Tag der Geburt. Wer rechtzeitig anmeldet, hat Schutz rückwirkend ab der Geburt.',
            },
            {
              title: 'Danach: Umfang und Beitrag prüfen',
              text: 'Der Schutz deines Babys reicht höchstens so weit wie der des Elternteils. Bei der Bayerischen kostet der Komfort für Kinder bis 15 Jahre 3,20 EUR und das Prestige 4,10 EUR im Monat.',
            },
          ],
        },
      ],
    },
    {
      id: 'privat',
      heading: 'Was gilt, wenn ein Elternteil privat versichert ist?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auch dann greift § 198 VVG. Das Gesetz gilt für jede private Krankenversicherung eines Elternteils, also auch für eine private Vollversicherung und nicht nur für eine Zusatzversicherung. Der private Krankenversicherer muss das Neugeborene unter den Voraussetzungen des Gesetzes aufnehmen, höchstens im Umfang des Elternteils. Wie die Anmeldung dort läuft, steht in den Vertragsunterlagen.',
        },
        {
          type: 'paragraph',
          text: 'Bei verheirateten Eltern oder eingetragenen Lebenspartnern kann die gesetzliche Familienversicherung unter den Einkommensvoraussetzungen des § 10 Abs. 3 SGB V entfallen, wenn ein Elternteil nicht Mitglied einer Krankenkasse ist. Für Eltern, die nicht verheiratet sind, nennt das Gesetz diese Einschränkung nicht. Frag im Zweifel deine Kasse.',
        },
      ],
    },
    {
      id: 'grenzen',
      heading: 'Wo liegen die Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Frist von zwei Monaten ist hart.', text: 'Wer sie versäumt, hat keinen Anspruch nach § 198 VVG. Dann läuft der normale Antrag.' },
            { lead: 'Dein Baby bekommt nicht mehr Schutz als dein Vertrag.', text: 'Ohne Klinik-Tarif bei einem Elternteil gibt es auf diesem Weg keinen Klinik-Tarif fürs Baby. Der Unfalltarif SPU der SDK ist kein allgemeiner Klinikschutz für Kinder, er leistet nur nach einem Unfall.' },
            { lead: 'Die Regel gilt nur für Neugeborene und minderjährige Adoptivkinder.', text: 'Bei einer Adoption ist ein Risikozuschlag erlaubt. Für ältere Kinder gilt der normale Antrag, über den der Versicherer entscheidet.' },
            { lead: 'Die Schwangerschaft selbst ist ein anderes Thema.', text: 'Eine beim Abschluss bestehende oder bekannte Schwangerschaft ist für die Entbindung nicht mitversichert. Dein Baby kann nach der Geburt trotzdem angemeldet werden, wenn die Voraussetzungen oben erfüllt sind. Für deinen eigenen Antrag gilt: Die Fragen beantwortest du wahrheitsgemäß und vollständig, über ihn entscheidet der Versicherer.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'family',
              tone: 'mint',
              title: 'Baby geplant: Klinikschutz vor der Schwangerschaft',
              text: 'Die Reihenfolge von der Kasse bis zur Anmeldung des Babys.',
              to: '/ratgeber/baby-geplant-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'hospital',
              tone: 'sky',
              title: 'Familienzimmer im Krankenhaus',
              text: 'Was es kostet, wer zahlt und wie der Klinikschutz es trägt.',
              to: '/ratgeber/familienzimmer-krankenhaus',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'Babybonus Krankenkasse 2026',
              text: 'Was die Kassen rund um Schwangerschaft und Baby zahlen.',
              to: '/ratgeber/babybonus-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'pregnancy',
              tone: 'lavender',
              title: 'Schwanger: welcher Zusatzschutz jetzt noch geht',
              text: 'Was bei einer bestehenden Schwangerschaft noch möglich ist.',
              to: '/ratgeber/schwanger-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK und der Bayerischen. Neugeborene lassen sich nach § 198 VVG ohne Gesundheitsprüfung nachversichern, wenn ein Elternteil am Tag der Geburt beim Versicherer versichert ist, bei der Bayerischen seit mindestens drei Monaten, und die Anmeldung spätestens zwei Monate nach der Geburt erfolgt. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie kann ich ein Neugeborenes versichern?',
      answer:
        'Bei der gesetzlichen Kasse meldest du dein Baby zur Familienversicherung an, für versicherte Familienangehörige werden keine Beiträge erhoben. In der Zusatzversicherung meldest du es spätestens zwei Monate nach der Geburt an, wenn ein Elternteil am Tag der Geburt dort versichert ist (§ 198 VVG).',
    },
    {
      question: 'Wie lange habe ich Zeit, mein Baby in der Zusatzversicherung anzumelden?',
      answer:
        'Spätestens zwei Monate nach dem Tag der Geburt. Dann gilt der Schutz rückwirkend ab der Geburt. Melde dein Baby früh an und nicht am letzten Tag.',
    },
    {
      question: 'Was ist die Kindernachversicherung?',
      answer:
        'So heißt § 198 VVG. Ist am Tag der Geburt ein Elternteil beim Versicherer versichert und kommt die Anmeldung binnen zwei Monaten, muss er das Neugeborene versichern, ohne Gesundheitsprüfung, ohne Risikozuschläge und ohne Wartezeiten. Die Bayerische verlangt, dass der Elternteil seit mindestens drei Monaten bei ihr versichert ist. Der Schutz darf nicht höher oder umfassender sein als der des Elternteils.',
    },
    {
      question: 'Gilt die Aufnahme auch bei Geburtsschäden oder angeborenen Krankheiten?',
      answer:
        'Ja, wenn ein Elternteil am Tag der Geburt versichert ist, bei der Bayerischen seit mindestens drei Monaten, und du dein Baby binnen zwei Monaten anmeldest. Bei der Bayerischen beginnt der Schutz dann auch für Geburtsschäden, angeborene Krankheiten und Anomalien ohne Risikozuschläge und ohne Wartezeiten ab Vollendung der Geburt. Die SDK nimmt das Kind ohne Risikozuschlag und ohne Leistungsausschluss auf, auch bei Geburtsschäden oder angeborenen Krankheiten.',
    },
    {
      question: 'Ist mein Baby in der Krankenkasse automatisch mitversichert?',
      answer:
        'Nach dem Gesetz ja, wenn die Voraussetzungen des § 10 SGB V erfüllt sind. Damit die Kasse davon weiß, muss das Mitglied dein Baby aber melden (§ 10 Abs. 6 SGB V). Melde es deshalb möglichst bald nach der Geburt bei deiner Kasse an.',
    },
    {
      question: 'Was gilt, wenn ein Elternteil privat versichert ist?',
      answer:
        'Auch dann greift § 198 VVG, denn das Gesetz spricht von einer Krankenversicherung eines Elternteils. Bei verheirateten Eltern kann die gesetzliche Familienversicherung unter den Voraussetzungen des § 10 Abs. 3 SGB V entfallen. Frag im Zweifel deine Kasse.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Die Klinik-Tarife von SDK und Bayerischer, bei denen dein Baby mitversichert werden kann, vergleichst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Den Überblick für Familien mit Krankenhaus, Zahn und Brille gibt die Bereichsseite ' },
      { text: 'Zusatzversicherung Kinder: was die Kasse zahlt und welcher Zusatzschutz passt', to: '/ratgeber/zusatzversicherung-kinder' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Fristen, die Voraussetzungen und die Leistungen der Tarife stammen aus diesen Quellen.',
    items: [
      {
        label: 'VVG § 198 (Kindernachversicherung)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__198.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 10 (Familienversicherung), § 3 (Solidarische Finanzierung) und § 11 Abs. 3 (Begleitperson)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__10.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen Krankheitskostenversicherung 2025 (B 275000), § 2 Abs. 2 und 3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:0159d4a8-b666-4f77-a345-9acdb8e95608/275000_allgemeine_versicherungsbedingungen_krankheitskostenversicherung.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Prestige 2025 (B 275006), Ziffer 2.3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:4195af63-fc92-4395-88fc-8db70f6a0d47/275006_besondere_tarifbedingungen_krankenhauszusatzversicherung_2025_prestige.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Komfort 2025 (B 275005), Ziffer 2.3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:d6054602-ee8e-4fe9-ab8a-3f01aec1bdef/275005_besondere_tarifbedingungen-krankenhauszusatzversicherung_2025_komfort.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen Teil I (1.751), Abschnitt A.5, Neugeborene und Adoptivkinder, und Tarife SP1 (1.754a) und SP2 (1.755a), Nr. 8 Rooming In',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        stand: '01.01.2022 und 01.08.2025',
      },
      {
        label: 'Produktsteckbrief Krankenhauszusatzversicherung (B 275010), Beitragstabelle für Kinder, Chefarzt, Unterbringung und Gesundheitsfragen; Annahmerichtlinien (B 275012)',
        publisher: 'die Bayerische',
        stand: '08.2025',
      },
      {
        label: 'Fachauskunft der Bayerischen an Healio zur Aufnahme von Neugeborenen und zur Begleitperson nach der Entbindung',
        publisher: 'die Bayerische',
        stand: '05.10.2026',
      },
      {
        label: 'Klinik-Tarife der SDK und der Bayerischen (Aufnahme des Neugeborenen, Kinderbeitrag)',
        publisher: 'healio.de/stationaer',
        href: 'https://healio.de/stationaer',
        accessedAt: '07.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Gesetz und Kasse nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer die Bedingungen des Versicherers, die Entscheidung deiner Kasse und der Wortlaut des Gesetzes.',
};

export default article;
