/**
 * Welle B, ambulant. Sperrlisten-Kandidat Google Ads und Analytics wegen medizinischer Behandlung.
 * Quellen: geltende SGB-V-Regeln, G-BA-Heilmittel-Richtlinie, amtlich veröffentlichte Vergütungsvereinbarung nach § 125 SGB V, gesund.bund.de, BGB und Healio /ambulant. Abruf 07.10.2026.
 * Grenzen: Kassenvergütung ist kein Privatpreis. Keine erfundenen Selbstzahler- oder Tapepreise, keine Behandlungsempfehlung. Preise und ausgewiesene Zuzahlungen direkt am PDF und dessen Tabellen geprüft. Keine pauschale Rezeptzahl oder Erstattungszusage. Belege: physiotherapie-kosten.belege.md.
 */
export const article = {
  slug: 'physiotherapie-kosten', kind: 'ratgeber', group: 'ambulant',
  metaTitle: 'Physiotherapie: Kosten mit und ohne Rezept | Healio',
  metaDescription: 'Physiotherapiekosten 2026: belegte Kassenpreise für Krankengymnastik, manuelle Therapie und Lymphdrainage. Zuzahlung und Privatkosten unterscheiden.',
  publishedAt: '2026-10-07', publishedAtLabel: '7. Oktober 2026', readingTimeMinutes: 7,
  listTitle: 'Physiotherapie: Kosten mit und ohne Rezept',
  listTeaser: 'Was du mit Kassenrezept selbst zahlst, welche Behandlungspreise 2026 gelten und was du bei einer Privatbehandlung vorher klären solltest.',
  headline: 'Physiotherapie: Was kostet die Behandlung mit und ohne Rezept?',
  author: 'frank-steinfurt', toc: 'auto', faqStyle: 'accordion',
  lead: 'Mit einem gültigen Kassenrezept zahlst du für Physiotherapie ab 18 Jahren grundsätzlich 10 Prozent der Behandlungskosten plus 10 EUR je Verordnung, sofern du nicht befreit bist. Bei einer Privatbehandlung zählt der mit der Praxis vereinbarte Preis; die Kassenvergütung ist dafür keine verbindliche Preisliste.',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze', icon: 'document',
    facts: [
      { value: '10 % plus 10 EUR', label: 'Gesetzliche Zuzahlung je Verordnung ab 18 Jahren' },
      { value: '29,63 EUR', label: 'Kassenvergütung je allgemeiner KG-Einzelbehandlung 2026' },
      { value: 'Privatpreis erfragen', label: 'Kassenpreise sind keine verbindlichen Selbstzahlerpreise' }
    ],
    text: 'Entscheidend sind die verordnete Leistung, die Zahl der tatsächlich erbrachten Einheiten und der Abrechnungsweg.',
    path: { to: '/ambulant', text: 'Gesetzliche Eigenanteile und Tarifbedingungen prüfen.', label: 'Ambulante Leistungen bei Healio' }
  },
  sections: [
    {
      id: 'kassenpreise', heading: 'Welche Physiotherapiepreise gelten für Kassenbehandlungen 2026?',
      blocks: [
        { type: 'paragraph', text: 'Die Vergütungsvereinbarung nach § 125 SGB V enthält unterschiedliche Preise für unterschiedliche physiotherapeutische Leistungen. Allgemeine Krankengymnastik ist deshalb nicht zum selben Betrag abgerechnet wie manuelle Therapie oder eine längere Lymphdrainage. Die folgende Auswahl stammt aus der beim GKV-Spitzenverband veröffentlichten Lesefassung, gültig für Behandlungen ab dem 1. Januar 2026.' },
        {
          type: 'table', mobile: 'cards', caption: 'Auswahl der Kassenvergütung 2026 je Behandlung',
          head: ['Verordnete Leistung', 'Vergütung je Behandlung', 'Ausgewiesene Zuzahlung je Behandlung'],
          rows: [
            ['Allgemeine Krankengymnastik, Einzelbehandlung', '29,63 EUR', '2,96 EUR'],
            ['Manuelle Therapie, Einzelbehandlung', '35,59 EUR', '3,56 EUR'],
            ['Manuelle Lymphdrainage, 30 Minuten', '35,97 EUR', '3,60 EUR'],
            ['Manuelle Lymphdrainage, 45 Minuten', '53,94 EUR', '5,39 EUR'],
            ['Manuelle Lymphdrainage, 60 Minuten', '71,94 EUR', '7,19 EUR'],
            ['Gerätegestützte Krankengymnastik, parallele Einzelbehandlung', '55,81 EUR', '5,58 EUR']
          ],
          note: 'Quelle: Anlage 2 zum Physiotherapievertrag nach § 125 SGB V, gültig ab 01.01.2026, Seiten 2, 3 und 5. Zusätzlich fallen grundsätzlich 10 EUR je Verordnung an. Die Zuzahlungsspalte übernimmt die gerundeten Einzelbeträge der Vereinbarung. Kein Privatpreis und keine persönliche Rechnung.'
        },
        { type: 'paragraph', text: 'Vergütung und Zuzahlung sind zwei verschiedene Beträge. Bei einer anerkannten Kassenbehandlung bezahlst du grundsätzlich den gesetzlichen Eigenanteil, während die Behandlung über den Kassenvertrag abgerechnet wird. Die Tabelle zeigt nur die genannten Positionen. Ergänzende verordnete Leistungen oder ein verordneter Hausbesuch können die Gesamtabrechnung verändern.' },
        { type: 'paragraph', text: 'Die Kosten einer Lymphdrainage hängen in dieser Liste ausdrücklich von der verordneten Dauer ab. Wähle die Behandlung deshalb nicht allein nach der Preiszeile. Welche Maßnahme und welcher Umfang medizinisch erforderlich sind, klärst du mit dem verordnenden Arzt und der behandelnden Praxis.' }
      ]
    },
    {
      id: 'eigenanteil', heading: 'Wie viel zahlst du mit einem Kassenrezept selbst?',
      blocks: [
        { type: 'paragraph', text: '§ 61 SGB V regelt für Heilmittel eine Zuzahlung von 10 Prozent der Kosten plus 10 EUR je Verordnung. Die zusätzliche Pauschale gehört damit zum Rezept, nicht zu jeder einzelnen Sitzung. Die prozentuale Zuzahlung hängt von den tatsächlich erbrachten Leistungen ab. Lass dir die Berechnung von der Praxis aufschlüsseln, wenn mehrere Maßnahmen auf einer Verordnung stehen.' },
        { type: 'paragraph', text: 'Ab dem vollendeten 18. Lebensjahr musst du diese Heilmittelzuzahlung grundsätzlich leisten. Für Kinder und Jugendliche unter 18 Jahren fällt sie nach § 32 SGB V nicht an. Eine gültige Befreiung ist ein weiterer Grund, weshalb die übliche Zuzahlung nicht berechnet werden darf. Zeige den Befreiungsnachweis der Praxis und prüfe, für welchen Zeitraum er gilt.' },
        { type: 'paragraph', text: 'Eine frühzeitig beendete Verordnung darf nach der Vergütungsvereinbarung nur im tatsächlich erbrachten Umfang abgerechnet werden. Frage bei einer Änderung des Behandlungsplans nach der abschließenden Zuzahlung. Für geleistete gesetzliche Zuzahlungen musst du eine Quittung erhalten. Hebe diese zusammen mit der Verordnung auf, damit du spätere Rückfragen nachvollziehen kannst.' }
      ]
    },
    {
      id: 'rezept', heading: 'Wann übernimmt die gesetzliche Krankenkasse Physiotherapie?',
      blocks: [
        { type: 'paragraph', text: 'Für die reguläre Kassenversorgung muss die Behandlung medizinisch notwendig und im Rahmen der Heilmittel-Richtlinie verordnet sein. Ein Termin in einer Physiotherapiepraxis allein begründet noch keinen Leistungsanspruch. Die G-BA-Richtlinie und der Heilmittelkatalog legen fest, unter welchen Voraussetzungen welche Leistungen verordnet werden können.' },
        { type: 'paragraph', text: 'Vereinbare den ersten Termin rechtzeitig. Nach § 15 der Heilmittel-Richtlinie muss die Behandlung grundsätzlich innerhalb von 28 Kalendertagen nach der Verordnung beginnen. Bei auf dem Rezept kenntlich gemachtem dringlichem Behandlungsbedarf gelten spätestens 14 Kalendertage. Kann der Beginn in dieser Frist nicht erfolgen, verliert die Verordnung ihre Gültigkeit. Kläre ein Terminproblem daher mit Praxis und Arzt, statt von einer späteren Kassenabrechnung auszugehen.' },
        { type: 'paragraph', text: 'Es gibt keine für jeden Patienten gleiche Zahl notwendiger Sitzungen. Diagnose, Funktionsbeeinträchtigung, Heilmittel und Verordnungsrahmen gehören zusammen. Auch eine Folgeverordnung muss medizinisch begründet sein. Eine größere Behandlungsliste ist keine Zusage, dass jede dort genannte Maßnahme in deinem Fall von der Krankenkasse getragen wird.' }
      ]
    },
    {
      id: 'privat', heading: 'Was kostet Physiotherapie ohne Kassenrezept?',
      blocks: [
        { type: 'paragraph', text: 'Wenn du eine Behandlung privat vereinbarst, brauchst du eine konkrete Kosteninformation der Praxis. Die Tabelle zur Kassenvergütung legt deinen Privatpreis nicht fest. Frage nach der Leistung, der vorgesehenen Dauer, dem Preis pro Termin und möglichen zusätzlichen Positionen. Kläre außerdem, welche Verordnung oder andere Voraussetzung für die gewünschte Behandlung erforderlich ist.' },
        { type: 'paragraph', text: 'Bei einem Behandlungsvertrag zählt die vereinbarte Vergütung, soweit kein Dritter zur Zahlung verpflichtet ist. Kennt der Behandler Anhaltspunkte dafür, dass ein Dritter die Kosten nicht vollständig übernimmt, verlangt § 630c BGB grundsätzlich eine Information über die voraussichtlichen Kosten vor Beginn in Textform. Das Gesetz kennt Ausnahmen, etwa bei unaufschiebbarer Behandlung. Eine allgemeine Preisangabe im Internet ersetzt deine konkrete Kostenklärung nicht.' },
        { type: 'paragraph', text: 'Auch ein Privatrezept bedeutet nicht, dass deine gesetzliche Kasse die Rechnung nachträglich übernimmt. Falls du eine private Versicherung hast, richtet sich eine mögliche Erstattung nach deinem Vertrag. Lass vor der Behandlung prüfen, ob Leistung, Behandler und Nachweise anerkannt werden. Der Praxispreis und die erstattungsfähige Summe können unterschiedlich sein.' }
      ]
    },
    {
      id: 'extras', heading: 'Wie prüfst du zusätzliche Kosten für Tape oder andere Extras?',
      blocks: [
        { type: 'paragraph', text: 'Wenn dir die Praxis zusätzliches Tapen oder eine andere Leistung anbietet, frage vorab nach der Abrechnung. Geh nicht allein aufgrund deines Kassenrezepts davon aus, dass jede Ergänzung mitbezahlt wird. Lass dir erklären, ob die Leistung Teil der verordneten Behandlung ist oder gesondert privat vereinbart werden soll.' },
        { type: 'paragraph', text: 'Für einen gesonderten privaten Betrag brauchst du eine klare Kosteninformation. Frage außerdem nach dem erwarteten Nutzen, möglichen Risiken und Alternativen. Ein höherer Gesamtpreis sagt allein nichts darüber aus, ob eine zusätzliche Maßnahme für dich sinnvoll ist. Dieser Ratgeber setzt deshalb keinen pauschalen Tapepreis an und empfiehlt keine bestimmte Behandlung.' }
      ]
    },
    {
      id: 'entlastung', heading: 'Welche Wege können deine gesetzlichen Eigenanteile verringern?',
      blocks: [
        { type: 'paragraph', text: 'Prüfe zuerst die gesetzliche Zuzahlungsbefreiung. Die Belastungsgrenze liegt grundsätzlich bei 2 Prozent der jährlichen Bruttoeinnahmen zum Lebensunterhalt. Bei einer schwerwiegenden chronischen Erkrankung mit den gesetzlichen Voraussetzungen beträgt sie 1 Prozent. Die Kasse berücksichtigt die maßgeblichen Haushaltsregeln und Freibeträge. Private Zusatzleistungen zählen nicht allein deshalb zu dieser Grenze, weil du sie selbst bezahlt hast.' },
        { type: 'paragraph', text: 'Ein ambulanter Zusatzvertrag ist ein gesonderter Weg. Auf der Healio-Produktseite ist bei SDK Ambulant 100, AP1, ein eigener Topf für gesetzliche Zuzahlungen bis zu 1.000 EUR je zwei Kalenderjahre ab Versicherungsbeginn beschrieben. Er ist Teil der vier getrennten Bereiche, die zusammen ein Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren ergeben. Beginnt der Vertrag im laufenden Kalenderjahr, ist der erste Zeitraum kürzer. Das Gesamtbudget steht nicht vollständig für Physiotherapie zur Verfügung.' },
        { type: 'paragraph', text: 'Prüfe für deine konkrete Zuzahlung die erstattungsfähige Leistung, den Beginn und die nötigen Nachweise. Für gesetzliche Heilmittelzuzahlungen verlangen die Bedingungen eine ärztliche Verordnung und den Zuzahlungsbeleg. Weitere Erstattungen aus demselben Tarifbereich können den verbleibenden Höchstbetrag verringern. Eine privat vereinbarte Behandlung ist nicht automatisch eine gesetzliche Zuzahlung. Stelle dem möglichen Erstattungsbedarf den laufenden persönlichen Beitrag gegenüber und beziehe eine bestehende Zuzahlungsbefreiung ein. Allein ein kleiner Eigenanteil ist kein ausreichender Grund, den gesamten Vertrag zu wählen.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Kassenpreise sind keine Privatpreise.', text: 'Die Tabelle zeigt die vereinbarte Kassenvergütung 2026. Für eine Privatbehandlung brauchst du das Angebot deiner Praxis.' },
          { lead: 'Nicht jede Rechnung ist eine gesetzliche Zuzahlung.', text: 'Private Extras und vollständige Selbstzahlerkosten haben einen anderen Abrechnungsweg.' },
          { lead: 'Eine Zusatzleistung braucht einen passenden Vertrag.', text: 'Leistungsbeginn, Umfang und Nachweise zählen. Die vier Teilbudgets sind getrennt und haben jeweils eigene Grenzen.' }
        ] },
        { type: 'path', to: '/ambulant', icon: 'document', text: 'Gesetzliche Eigenanteile und deinen Bedarf einordnen.', label: 'Ambulante Tarife bei Healio prüfen' }
      ]
    },
    {
      id: 'weiterlesen', heading: 'Welche Ratgeber helfen dir bei Rezept, Kosten und Erstattung?',
      blocks: [{ type: 'cards', heading: 'Das passt dazu', items: [
        { title: 'Heilpraktikerkosten im Überblick', text: 'Den allgemeinen Kosten- und Erstattungsrahmen unterscheiden.', to: '/ratgeber/heilpraktiker-kosten', icon: 'document', linkLabel: 'Zur Übersicht' },
        { title: 'Physiotherapie-Zuzahlung', text: 'Die gesetzlichen Eigenanteile und mögliche Erstattung vertiefen.', to: '/ratgeber/physiotherapie-zuzahlung', icon: 'document', linkLabel: 'Ratgeber lesen' },
        { title: 'Ambulante Zusatzversicherung', text: 'Vier getrennte Leistungsbereiche und Beiträge prüfen.', to: '/ratgeber/ambulante-zusatzversicherung', icon: 'comparison', linkLabel: 'Ratgeber lesen' },
        { title: 'Osteopathiekosten', text: 'Den anderen Behandlungs- und Erstattungsweg kennenlernen.', to: '/ratgeber/osteopathie-kosten', icon: 'document', linkLabel: 'Ratgeber lesen' }
      ] }]
    }
  ],
  factNugget: "Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Die Kassenvergütung für allgemeine Krankengymnastik als Einzelbehandlung beträgt 2026 laut Vergütungsvereinbarung 29,63 EUR. Die dort ausgewiesene Zuzahlung je Behandlung beträgt 2,96 EUR. Zusätzlich gelten grundsätzlich 10 EUR je Verordnung. Diese Liste legt keinen Preis für eine privat vereinbarte Behandlung fest.",
  faqs: [
    { question: 'Was kostet eine Krankengymnastik mit Kassenrezept 2026?', answer: 'Die Vergütungsvereinbarung nennt für allgemeine Krankengymnastik als Einzelbehandlung 29,63 EUR und eine ausgewiesene Zuzahlung von 2,96 EUR je Behandlung. Zusätzlich fallen grundsätzlich 10 EUR je Verordnung an. Alter, Befreiung und weitere verordnete Leistungen sind zu beachten.' },
    { question: 'Sind die zusätzlichen 10 EUR bei jedem Termin fällig?', answer: 'Nein. § 61 SGB V ordnet die Pauschale von 10 EUR der Verordnung zu. Hinzu kommt der prozentuale Anteil an den Behandlungskosten. Eine neue Verordnung ist dabei ein eigener Abrechnungsfall.' },
    { question: 'Müssen Kinder Physiotherapie zuzahlen?', answer: 'Die gesetzliche Heilmittelzuzahlung nach § 32 SGB V gilt ab dem vollendeten 18. Lebensjahr. Kinder und Jugendliche unter 18 Jahren leisten sie nicht. Privat vereinbarte Zusatzleistungen sind getrennt zu betrachten.' },
    { question: 'Gilt die Kassenpreisliste auch ohne Kassenrezept?', answer: 'Die Vergütungsvereinbarung ist keine verbindliche Privatpreisliste. Kläre vor einer privat vereinbarten Behandlung die konkrete Leistung, ihren Preis und die erforderlichen Behandlungsvoraussetzungen mit der Praxis.' },
    { question: 'Was kostet eine manuelle Lymphdrainage auf Kassenrezept?', answer: 'Die Vergütungsvereinbarung nennt 2026 je Behandlung 35,97 EUR für 30 Minuten, 53,94 EUR für 45 Minuten und 71,94 EUR für 60 Minuten. Das sind Kassenvergütungen. Dein gesetzlicher Eigenanteil und die zusätzliche Rezeptpauschale werden getrennt berechnet.' },
    { question: 'Erstattet der Naturheilverfahren-Topf jede Physiotherapie?', answer: 'Daraus folgt kein allgemeiner Anspruch. Gesetzliche Heilmittelzuzahlungen, privat vereinbarte Physiotherapie und Naturheilverfahren sind unterschiedliche Kostenwege. Prüfe die konkrete Leistung im vereinbarten Vertrag, bevor du mit einer Erstattung rechnest.' }
  ],
  onward: { heading: 'So gehst du weiter vor', segments: [
    { text: 'Lass dir die verordnete Leistung und die Zuzahlung erläutern. Bei privaten Extras klärst du den Preis vorher. Den ergänzenden Kostenweg kannst du bei ' },
    { text: 'Healio Ambulant', to: '/ambulant' }, { text: ' anhand deines persönlichen Bedarfs prüfen.' }
  ] },
  sources: {
    checkedAt: '2026-10-07', checkedAtLabel: '7. Oktober 2026',
    intro: 'Kassenvergütung, Eigenanteile und Verordnungsregeln wurden direkt an diesen Originalquellen geprüft.',
    items: [
      {"label": "SDK: Originalbedingungen der AP-Tarife", "publisher": "SDK", "href": "https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf", "stand": "01.01.2023; aktuell sichtbarer Zeitraum mit Healio abgeglichen", "accessedAt": "07.10.2026"},
      { label: 'Physiotherapie-Vergütung ab 01.01.2026', publisher: 'GKV-Spitzenverband', href: 'https://www.gkv-spitzenverband.de/media/dokumente/krankenversicherung_1/ambulante_leistungen/heilmittel/vertraege_125abs1/physiotherapie/20251201_Physiotherapie_Vertrag_125_Anlage_2_barrierefrei.pdf', stand: 'Gültig ab 1. Januar 2026', accessedAt: '07.10.2026' },
      { label: 'Heilmittel und Zuzahlungsalter', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/sgb_5/__32.html', stand: 'Geltende Fassung', accessedAt: '07.10.2026' },
      { label: 'Gesetzliche Zuzahlung und Quittung', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/sgb_5/__61.html', stand: 'Geltende Fassung', accessedAt: '07.10.2026' },
      { label: 'Belastungsgrenze und Haushaltsregeln', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/sgb_5/__62.html', stand: 'Geltende Fassung', accessedAt: '07.10.2026' },
      { label: 'Heilmittel-Richtlinie, §§ 3 und 15', publisher: 'Gemeinsamer Bundesausschuss', href: 'https://www.g-ba.de/downloads/62-492-3865/HeilM-RL_2025-05-15_iK-2025-08-05.pdf', stand: 'In Kraft seit 5. August 2025', accessedAt: '07.10.2026' },
      { label: 'Physiotherapie und Kostenübernahme', publisher: 'gesund.bund.de', href: 'https://gesund.bund.de/physiotherapie', stand: '6. August 2024', accessedAt: '07.10.2026' },
      { label: 'Behandlungsvertrag und Kosteninformation, §§ 630a und 630c', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/bgb/BJNR001950896.html', stand: 'Geltende Fassung', accessedAt: '07.10.2026' },
      { label: 'Ambulante Tarifbereiche und Leistungsgrenzen', publisher: 'Healio', href: 'https://healio.de/ambulant', stand: 'Live-Abruf 7. Oktober 2026', accessedAt: '07.10.2026' }
    ]
  },
  "footnote": "Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen vom 7. Oktober 2026. Maßgeblich sind die gesetzlichen Voraussetzungen, die aktuelle Kassensatzung und bei privaten Verträgen die vereinbarten Bedingungen."
};
