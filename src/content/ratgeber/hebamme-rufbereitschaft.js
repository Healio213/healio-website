/**
 * Familien-Ratgeber (Serie, Auftrag Frank 08.10.2026): Rufbereitschaft der
 * Hebamme, was die Rufbereitschaftspauschale ist und welche Kassen sie laut
 * Satzung erstatten.
 *
 * SCHWANGERSCHAFTSSEITE: Der Pfad /ratgeber/hebamme-rufbereitschaft steht in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js) und in den Meta-Sperrlisten
 * (src/lib/meta-pixel.js, api/meta-events.js) wie die übrigen
 * Schwangerschaftsseiten. Kein Kinderwunsch, kein NIPT, keine Nackenfalte.
 *
 * Quellen und Belege je Zahl: Healio/Marktanalyse-2026-10/serie/familie/
 * PRÜFBERICHT-hebamme-rufbereitschaft.md. Kassenwerte aus KassenBoost
 * (GKV-Vergleichskampagne/website/app/satzungs-leistungen.server.ts, erhoben
 * 26.08.2026) und gegen die Satzungstexte gelesen (Abzug vom 07.10.2026 in
 * serie-codex/_arbeit/ambulant-b-1/*.txt), Kassenseiten TK, DAK, KKH und Mobil
 * am 08.10.2026 stichprobenartig gegengelesen, ohne Abweichung.
 *
 * Bewusste Grenzen:
 *   - Keine Aussage, dass eine Zusatzversicherung die Rufbereitschaft zahlt.
 *     Die ambulante Hebammenleistung der Bayerischen steht nicht in den
 *     Bedingungen und wird nicht genannt (Recherche 05.10.2026).
 *   - Die Tabelle zeigt 15 Kassen, kein Marktquerschnitt.
 *   - Semrush: Im Ordner Marktanalyse-2026-10/semrush gibt es keinen Export
 *     mit Rufbereitschaft. Zielbegriffe ohne gemessenes Volumen: hebamme
 *     rufbereitschaft, rufbereitschaftspauschale hebamme, rufbereitschaft
 *     hebamme krankenkasse.
 */

export const article = {
  slug: 'hebamme-rufbereitschaft',
  kind: 'ratgeber',
  group: 'familie',

  metaTitle: 'Hebamme Rufbereitschaft: welche Kasse zahlt wie viel | Healio',
  metaDescription:
    'Rufbereitschaftspauschale der Hebamme: warum die Kasse sie nicht regulär zahlt und welche Kassen laut Satzung bis 500 EUR erstatten. Mit Tabelle.',

  publishedAt: '2026-10-08',
  publishedAtLabel: '8. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Rufbereitschaft der Hebamme: was die Kasse zahlt',
  listTeaser:
    'Was die Rufbereitschaftspauschale ist, warum die Kasse sie nicht regulär zahlt und welche Kassen laut Satzung etwas erstatten, mit Betrag und Fundstelle.',

  headline: 'Rufbereitschaft der Hebamme: was die Krankenkasse zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'pregnancy',
    facts: [
      { value: 'Keine Regelleistung', label: 'Erstattung gibt es nur als Satzungsleistung einzelner Kassen' },
      { value: 'Meist bis 250 EUR', label: 'TK, IKK classic, KKH und AOK Bayern je Schwangerschaft' },
      { value: 'Bis 500 EUR', label: 'DAK, der höchste Betrag in unserer Tabelle' },
    ],
    text: 'Die Pauschale stellt dir die Hebamme privat in Rechnung. Viele Kassen erstatten einen Teil, wenn du Rechnung und Bedingungen erfüllst. Was deine Kasse zahlt, steht in ihrer Satzung.',
    path: { to: '/stationaer#familie', text: 'Für dein Baby ab dem Tag der Geburt', label: 'Klinikschutz fürs Kind ansehen' },
  },

  lead: 'Wer mit der eigenen Hebamme zu Hause, im Geburtshaus oder als Beleggeburt in der Klinik entbinden will, bekommt meist eine Rechnung über die Rufbereitschaft. Die gesetzliche Kasse zahlt sie nicht als Regelleistung, viele Kassen geben aber laut Satzung etwas dazu. Hier siehst du, wofür die Pauschale steht, welche 15 Kassen wie viel erstatten, worauf du bei Rechnung und Fristen achtest und was ein Kassenwechsel in der Schwangerschaft dafür bedeutet.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was ist die Rufbereitschaftspauschale der Hebamme?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mit der Pauschale bezahlst du dafür, dass deine Hebamme in den letzten Wochen vor der Geburt Tag und Nacht für dich erreichbar ist und sofort losfahren kann. Die Satzungen beschreiben das fast gleich: 24 Stunden Erreichbarkeit und die sofortige Bereitschaft zu mehrstündiger Geburtshilfe. Die Geburt selbst ist damit noch nicht bezahlt, die rechnet die Hebamme getrennt mit deiner Kasse ab.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Hausgeburt und Geburtshaus.', text: 'Hier ist die Pauschale üblich. Der GKV-Spitzenverband schreibt, dass viele Geburtshäuser und freiberufliche Hausgeburtshebammen sie in Rechnung stellen.' },
            { lead: 'Beleggeburt in der Klinik.', text: 'Begleitet dich deine eigene Hebamme in die Klinik, verlangt sie meist ebenfalls eine Rufbereitschaft.' },
            { lead: 'Normale Klinikgeburt.', text: 'Entbindest du mit den Hebammen des Kreißsaals, fällt keine Rufbereitschaft an.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wie teuer das wird, legt die Hebamme selbst fest. Laut GKV-Spitzenverband belaufen sich Rufbereitschaftspauschalen regelmäßig auf mehrere Hundert Euro, in seinem Rechenbeispiel für eine Geburtshausgeburt setzt er 500 EUR an. Eine Hamburger Beleghebammen-Praxis nimmt 1.000 EUR, ab 1. November 2026 sind es 1.250 EUR, dafür ist das Team ab 15 Wochen vor dem Termin in Rufbereitschaft.',
        },
      ],
    },
    {
      id: 'warum-nicht',
      heading: 'Warum zahlt die gesetzliche Kasse die Rufbereitschaft nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Weil sie nicht zu den Pflichtleistungen der Hebammenhilfe gehört. Du hast in der Schwangerschaft, bei der Geburt und im Wochenbett Anspruch auf Hebammenhilfe (§ 24d SGB V). Was die Hebamme dafür von der Kasse bekommt, steht im Hebammenhilfevertrag, den der GKV-Spitzenverband mit den Hebammenverbänden schließt (§ 134a SGB V). Die Bereitschaft rund um die Uhr vor der Geburt stellt die Hebamme dir privat in Rechnung, so beschreibt es der GKV-Spitzenverband.',
        },
        {
          type: 'paragraph',
          text: 'Erstatten darf eine Kasse trotzdem: Das Gesetz erlaubt ihr, in der Satzung zusätzliche Leistungen vorzusehen, ausdrücklich auch bei Leistungen von Hebammen in Schwangerschaft und Mutterschaft (§ 11 Abs. 6 SGB V). Genau daraus kommen die Zuschüsse in der Tabelle unten. Weil jede Kasse ihre Satzung selbst schreibt, unterscheiden sich Betrag, Zeitraum und Bedingungen deutlich.',
        },
      ],
    },
    {
      id: 'tabelle',
      heading: 'Welche Krankenkassen erstatten die Rufbereitschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Tabelle zeigt 15 Kassen mit Betrag, wichtigster Bedingung und Fundstelle in der Satzung. Grundlage sind die Satzungsbelege von KassenBoost, die wir gegen die Satzungstexte gelesen haben, dazu Stichproben auf den Seiten von TK, DAK, KKH und Mobil Krankenkasse. Eine Rangliste ist das nicht, und vollständig ist sie auch nicht.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Erstattung der Hebammen-Rufbereitschaft bei 15 Krankenkassen mit Betrag, Bedingung und Fundstelle in der Satzung',
          head: ['Krankenkasse', 'Betrag laut Satzung', 'Wichtigste Bedingung', 'Fundstelle und Stand'],
          rows: [
            ['DAK-Gesundheit', 'bis 500 EUR je Schwangerschaft', 'Hebamme in der Schwangerschaft und bei der Geburt, entfällt, wenn die DAK die Rufbereitschaft als Sachleistung stellen kann', '§ 19a Abs. 3, Satzung Stand 01.09.2026'],
            ['VIACTIV', 'bis 350 EUR einmal je Schwangerschaft', 'nur für die 34. bis 42. Schwangerschaftswoche', '§ 12h, 18. Nachtrag, gültig ab 01.01.2026'],
            ['AOK Nordost', 'bis 270 EUR je Schwangerschaft', 'Erstattungen aus anderen Satzungsleistungen im selben Kalenderjahr werden angerechnet', '§ 19d, § 19 Abs. 3, 52. Nachtrag'],
            ['TK', 'bis 250 EUR einmal je Schwangerschaft', 'Hebamme in der Schwangerschaft und bei der Geburt, nur eine Hebamme', '§ 27g, Satzung Stand 17.04.2026'],
            ['IKK classic', 'bis 250 EUR je Schwangerschaft', 'in der Regel 37. bis 42. Woche, Hebamme in Schwangerschaft und Geburt', '§ 34h, Satzung Stand 01.08.2026'],
            ['KKH', 'bis 250 EUR je Schwangerschaft', 'ab der 37. Woche, Rechnung bis 31. März des Folgejahres', '§ 29s, Satzung Stand Mai 2026'],
            ['AOK Bayern', '100 Prozent, höchstens 250 EUR je Schwangerschaft', 'Vertragshebamme nach § 134a SGB V, nur eine Hebamme', '§ 10m, 71. Nachtrag, Stand 27.02.2026'],
            ['AOK Rheinland/Hamburg', 'bis 250 EUR je Schwangerschaft für Rufbereitschaft und weitere Vorsorge der Hebamme', 'du bist als Schwangere bei der AOK Rheinland/Hamburg versichert', '§ 12c Abs. 2, 18. Nachtrag vom 07.07.2026'],
            ['AOK PLUS', 'höchstens 250 EUR, aus dem Budget von 500 EUR je Schwangerschaft', 'alle Posten des Pakets zehren am selben Budget', '§ 11a Abs. 1 und 2'],
            ['Mobil Krankenkasse', 'bis 250 EUR je Geburt', 'nur bei außerklinischer Geburt oder Beleggeburt mit 1:1 Betreuung', '§ 10b Abs. 2 Nr. 1, Stand 01.01.2026'],
            ['SBK', 'Teil von zusammen höchstens 300 EUR je Schwangerschaft', 'ab der 37. Woche, nur eine Hebamme', '§ 22d, Satzung Stand 19.03.2026'],
            ['hkk', '80 Prozent, mit weiteren Leistungen zusammen höchstens 300 EUR im Kalenderjahr', 'in der Regel 38. bis 42. Woche', '§ 25a, Satzung Stand 27.05.2026'],
            ['Barmer', 'Teil von zusammen höchstens 200 EUR je Schwangerschaft', 'nur die letzten fünf Wochen vor dem tatsächlichen Entbindungstermin', '§ 28d Abs. 1 und 3, Satzung Stand 21.07.2026'],
            ['Knappschaft', 'Teil von zusammen höchstens 200 EUR je Schwangerschaft', 'höchstens sechs Wochen vor dem mutmaßlichen Entbindungstermin', '§ 57j Abs. 1 und 2, Satzung Stand 21.08.2026'],
            ['mkk', 'Teil von bis zu 600 EUR je Kalenderjahr für mehrere Schwangerschaftsleistungen', 'letzte Wochen der Schwangerschaft, einmal je Schwangerschaft', '§ 13 Abs. 11 Nr. 3 und Abs. 21, 38. Nachtrag'],
          ],
          note: 'Quellen: KassenBoost (Satzungsbelege mit Fundstelle, erhoben am 26.08.2026), Satzungstexte der Kassen, abgerufen am 07.10.2026, und die Seiten von TK, DAK, KKH und Mobil Krankenkasse, abgerufen am 08.10.2026. Fast überall gilt zusätzlich: Die Hebamme ist nach § 134a Abs. 2 oder § 13 Abs. 4 SGB V zugelassen, 24 Stunden erreichbar, und erstattet wird höchstens die Rechnung. Satzungen ändern sich, maßgeblich ist die Fassung deiner Kasse.',
        },
        {
          type: 'paragraph',
          text: 'Drei Dinge fallen beim Vergleich auf. Erstens ist 250 EUR der häufigste Betrag. Zweitens zahlen manche Kassen aus einem gemeinsamen Topf: Bei Barmer, Knappschaft, SBK, hkk und mkk teilt sich die Rufbereitschaft den Betrag mit Kursen, Tests oder Arzneimitteln. Drittens zählt der Zeitraum. Die Barmer erstattet nur die letzten fünf Wochen vor der Geburt, die VIACTIV schon ab der 34. Woche. Bei der Mobil Krankenkasse gibt es den Zuschuss nur bei außerklinischer Geburt oder Beleggeburt mit 1:1 Betreuung.',
        },
      ],
    },
    {
      id: 'bedingungen',
      heading: 'Was musst du tun, damit deine Kasse erstattet?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Erstattet wird nur, was nachgewiesen ist, und meist erst nach der Rechnung. So gehst du vor:',
        },
        {
          type: 'steps',
          heading: 'Von der Vereinbarung bis zur Erstattung',
          items: [
            { title: 'Satzung prüfen', text: 'Lies nach, ab welcher Woche, bis zu welchem Betrag und aus welchem Topf deine Kasse zahlt.' },
            { title: 'Hebamme mit Zulassung wählen', text: 'Frag, ob sie mit den Kassen abrechnet. Die Satzungen verlangen eine nach § 134a SGB V zugelassene Hebamme.' },
            { title: 'Rechnung einreichen', text: 'Reich die Rechnung der Rufbereitschaft ein, bei der DAK zusätzlich den Betreuungsvertrag. Barmer und KKH setzen dafür den 31. März des Folgejahres.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Achte außerdem darauf, dass dieselbe Hebamme dich in der Schwangerschaft und bei der Geburt betreut. TK, DAK und IKK classic setzen das ausdrücklich voraus. Und die Rufbereitschaft einer zweiten Hebamme zahlen die meisten Kassen der Tabelle nicht. Klär das, bevor du den Vertrag mit der Hebamme unterschreibst.',
        },
      ],
    },
    {
      id: 'wechsel',
      heading: 'Lohnt sich ein Kassenwechsel in der Schwangerschaft wegen der Rufbereitschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Erlaubt ist er. Die neue Kasse darf dich nicht ablehnen, auch nicht in der Schwangerschaft (§ 175 Abs. 1 SGB V). Nach einer Bindung von mindestens zwölf Monaten kannst du zum Ablauf des übernächsten Kalendermonats kündigen (§ 175 Abs. 4 SGB V). Leistungen der neuen Kasse gibt es erst ab dem ersten Tag der Mitgliedschaft dort. Da die Rufbereitschaft am Ende der Schwangerschaft entsteht, kann ein früher Wechsel zeitlich passen. Frag die neue Kasse vorher, ob sie Kosten erstattet, die in deiner Zeit bei ihr anfallen.',
        },
        {
          type: 'paragraph',
          text: 'Ehrlich gerechnet ist der Unterschied überschaubar. Zwischen DAK und TK liegen bei der Rufbereitschaft bis zu 250 EUR, einmal. Dagegen steht der Zusatzbeitrag, den du jedes Jahr zahlst: laut amtlicher Liste des GKV-Spitzenverbands, Stand 05.10.2026, bei der TK 2,69 Prozent und bei der DAK 3,20 Prozent. Bei 3.500 EUR Monatsbrutto sind das 42.000 mal 0,51 Prozent geteilt durch zwei, also 107,10 EUR Mehrbeitrag im Jahr für dich als Angestellte. Ob sich ein Wechsel für dich lohnt, hängt auch am Zusatzbeitrag der neuen Kasse und an den übrigen Leistungen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Ob du bleibst oder wechselst, entscheidest du. Wenn du Beitrag, Bonus und Satzungsleistungen deiner Kasse mit anderen vergleichen willst, rechnet das ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ' quellenbelegt aus. Was die Kassen rund ums Baby sonst noch zahlen, steht im Ratgeber ' },
            { text: 'Babybonus Krankenkasse', to: '/ratgeber/babybonus-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'zusatzschutz',
      heading: 'Zahlt eine Zusatzversicherung die Rufbereitschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Darauf solltest du nicht bauen. Die Klinik-Tarife auf healio.de/stationaer nennen die Rufbereitschaft nicht als Leistung, und ist die Schwangerschaft beim Antrag schon festgestellt, zahlt dort kein Tarif diese Entbindung. Für die Rufbereitschaft bleiben also deine Kasse und dein eigenes Budget.',
        },
        {
          type: 'paragraph',
          text: 'Sinnvoll wird Zusatzschutz für dein Baby. Ist am Tag der Geburt ein Elternteil beim Versicherer versichert und meldest du das Kind spätestens zwei Monate nach der Geburt an, nimmt der Versicherer es rückwirkend auf, ohne Risikozuschläge und Wartezeiten. Das Kind bekommt höchstens den Schutz des Elternteils, und der Versicherer darf eine Mindestversicherungsdauer des Elternteils von bis zu drei Monaten verlangen (§ 198 VVG).',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Kasse zahlt meist nur einen Teil.', text: 'Bei Pauschalen von mehreren Hundert bis über 1.000 EUR bleibt auch mit 250 oder 500 EUR Zuschuss ein Rest bei dir.' },
            { lead: 'Gemeinsame Töpfe schrumpfen schnell.', text: 'Bei Barmer, Knappschaft, SBK, hkk und mkk kann die Rufbereitschaft allein den Topf aufbrauchen, dann bleibt für Kurse oder Tests nichts.' },
            { lead: 'Die Tabelle ersetzt nicht deine Satzung.', text: 'Wir haben 15 Kassen geprüft. Satzungen ändern sich, und nur die Fassung deiner Kasse zählt.' },
            { lead: 'Für die Rufbereitschaft gibt es keinen Zusatztarif bei uns.', text: 'Was wir dir anbieten können, hilft beim Klinikschutz und beim Baby, nicht bei dieser Rechnung.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer#familie',
          icon: 'family',
          text: 'Wie dein Kind ab Geburt im Klinik-Tarif mitversichert werden kann und was dein eigener Beitrag kostet.',
          label: 'Klinikschutz fürs Kind ansehen',
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'family',
              tone: 'mint',
              title: 'Zusatzversicherung für Kinder',
              text: 'Kinder nachversichern, Krankenhaus, Zahn und Brille im Überblick.',
              to: '/ratgeber/zusatzversicherung-kinder',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'support',
              tone: 'sky',
              title: 'Hebamme: was die Krankenkasse zahlt',
              text: 'Vorsorge, Wochenbett, Rückbildung und wo du selbst zahlst.',
              to: '/ratgeber/hebamme-kosten-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'Babybonus der Krankenkassen',
              text: 'Was Kassen rund um Schwangerschaft und Baby zahlen, mit Fundstelle.',
              to: '/ratgeber/babybonus-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'pregnancy',
              tone: 'coral',
              title: 'Baby geplant: Zusatzschutz vorher',
              text: 'Was du vor der Schwangerschaft regeln kannst und was später zu spät kommt.',
              to: '/ratgeber/baby-geplant-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. Die Rufbereitschaft der Hebamme ist keine Regelleistung der gesetzlichen Kasse; viele Kassen erstatten laut Satzung einen Teil, meist bis 250 EUR je Schwangerschaft, die DAK bis 500 EUR. kassenboost.de vergleicht Kassenleistungen quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet die Rufbereitschaft einer Hebamme?',
      answer:
        'Das legt die Hebamme selbst fest. Laut GKV-Spitzenverband sind es regelmäßig mehrere Hundert Euro, in seinem Rechenbeispiel für eine Geburtshausgeburt 500 EUR. Eine Hamburger Beleghebammen-Praxis nimmt 1.000 EUR, ab 1. November 2026 1.250 EUR.',
    },
    {
      question: 'Welche Krankenkasse zahlt am meisten für die Rufbereitschaft?',
      answer:
        'Unter den 15 Kassen unserer Tabelle die DAK mit bis zu 500 EUR je Schwangerschaft, danach die VIACTIV mit bis zu 350 EUR und die AOK Nordost mit bis zu 270 EUR. Die meisten anderen erstatten bis 250 EUR. Gegenzurechnen ist immer der Zusatzbeitrag.',
    },
    {
      question: 'Zahlt die Kasse die Rufbereitschaft auch bei einer Geburt in der Klinik?',
      answer:
        'Bei einer Beleggeburt mit deiner eigenen Hebamme erstatten viele Kassen den Zuschuss. Die Mobil Krankenkasse zahlt nur bei außerklinischer Geburt oder Beleggeburt mit 1:1 Betreuung. Entbindest du mit den Hebammen des Kreißsaals, fällt keine Rufbereitschaft an.',
    },
    {
      question: 'Darf ich in der Schwangerschaft die Krankenkasse wechseln?',
      answer:
        'Ja, die neue Kasse darf dich nicht ablehnen. Nach mindestens zwölf Monaten Bindung kannst du zum Ablauf des übernächsten Kalendermonats kündigen. Die Leistungen der neuen Kasse gelten erst ab dem ersten Tag dort.',
    },
    {
      question: 'Wann und wie reiche ich die Rechnung ein?',
      answer:
        'Nach der Rechnung deiner Hebamme, meist nach der Geburt. Die DAK will zusätzlich eine Kopie des Betreuungsvertrags, Barmer und KKH setzen als Frist den 31. März des Folgejahres. Reich die Rechnung so ein, wie deine Kasse es vorgibt, etwa über ihre App.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir deine Kasse in der Tabelle und lies die Satzung nach, bevor du den Vertrag mit der Hebamme unterschreibst. Was die Kasse sonst für die Hebamme zahlt, steht im Ratgeber ' },
      { text: 'Hebamme: was die Krankenkasse zahlt', to: '/ratgeber/hebamme-kosten-krankenkasse' },
      { text: '. Wie du dein Baby ab Geburt versicherst, liest du im Ratgeber ' },
      { text: 'Zusatzversicherung für Kinder', to: '/ratgeber/zusatzversicherung-kinder' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-08',
    checkedAtLabel: '8. Oktober 2026',
    intro: 'Beträge und Fundstellen stammen aus den Satzungen der Kassen, wie KassenBoost sie belegt, gegen die Satzungstexte gelesen und auf Kassenseiten stichprobenartig geprüft.',
    items: [
      {
        label: 'Satzungsbelege der Krankenkassen mit Fundstelle',
        publisher: 'KassenBoost',
        href: 'https://kassenboost.de/',
        stand: 'Satzungsleistungen erhoben am 26.08.2026',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Zahlen, Daten, Fakten zu freiberuflichen Hebammen, Seite 3',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/media/dokumente/krankenversicherung_1/ambulante_leistungen/hebammen/25-10-31_ZDF_Hebammen.pdf',
        stand: '31.10.2025',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Satzung der Techniker Krankenkasse, § 27g',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/resource/blob/2077108/5892771f11e082ade44439e64bbda68c/tk-satzung-data.pdf',
        stand: '17.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Übernimmt die TK die Kosten für die Hebammen-Rufbereitschaft?',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/techniker/service/leistungen-und-mitgliedschaft/geburt-und-familie/leistungen-in-der-schwangerschaft/kostenuebernahme-hebammen-rufbereitschaft-2007806',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Satzung der DAK-Gesundheit, § 19a Abs. 3',
        publisher: 'DAK-Gesundheit',
        href: 'https://caas.content.dak.de/caas/v1/media/227064/data/a7fdcf5826965a284c8e25e049c6dfbf/satzung-der-dak-gesundheit-vom-01-07-2016-in-der-fassung-67-nachtrag-stand-01-09-2026.pdf',
        stand: '01.09.2026, 67. Nachtrag',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Hebamme: Infos, Kosten und Leistungen',
        publisher: 'DAK-Gesundheit',
        href: 'https://www.dak.de/dak/leistungen/schwangerschaft-geburt/hebamme-alle-infos_10846',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Satzung der IKK classic, § 34h',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/19885-satzung-kv-incl-sana-78-80-20260801.pdf',
        stand: '01.08.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Hebammen und Hebammenrufbereitschaft',
        publisher: 'KKH',
        href: 'https://www.kkh.de/leistungen/familie-kind/schwangerschaft-geburt/hebammen',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Hebammenbetreuung',
        publisher: 'Mobil Krankenkasse',
        href: 'https://mobil-krankenkasse.de/unsere-leistungen/schwangerschaft/hebammenbetreuung.html',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Kosten der Rufbereitschaft, Beleghebammen-Praxis in Hamburg',
        publisher: 'Hebammenpraxis Am Alsterlauf',
        href: 'https://alsterhebammen.de/geburt-und-wochenbett',
        stand: 'Anbieterangabe',
        accessedAt: '08.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 6 (Satzungsleistungen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        accessedAt: '08.10.2026',
      },
      {
        label: 'SGB V § 24d Ärztliche Betreuung und Hebammenhilfe',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__24d.html',
        accessedAt: '08.10.2026',
      },
      {
        label: 'SGB V § 134a Versorgung mit Hebammenhilfe',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__134a.html',
        accessedAt: '08.10.2026',
      },
      {
        label: 'SGB V § 175 Ausübung des Wahlrechts',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__175.html',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Krankenkassenliste mit Zusatzbeiträgen',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp',
        stand: '05.10.2026',
        accessedAt: '07.10.2026',
        note: 'Abzug der Liste in KassenBoost',
      },
      {
        label: 'VVG § 198 Kindernachversicherung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__198.html',
        accessedAt: '08.10.2026',
      },
      {
        label: 'Klinik-Tarife SDK und Bayerische, Produktseite von Healio',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/stationaer',
        stand: '08.10.2026',
        accessedAt: '08.10.2026',
        note: 'Entbindung bei bestehender Schwangerschaft wie auf der Seite',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den Satzungen, ausgewertet im August 2026 und gegengelesen am 8. Oktober 2026, Satzungen ändern sich. Maßgeblich sind immer die Satzung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
