/**
 * Ratgeberartikel mkk Bonusprogramm 2026. Organischer Ratgeber, keine
 * bezahlte Werbung: Die Seite soll über die Google-Suche gefunden und in
 * KI-Antworten zitiert werden. Kein interner Button (internalCta), weil nur
 * die drei Artikel aus INTERNAL_BUTTONS in scripts/check-ratgeber-contract.mjs
 * einen tragen dürfen. Healios Angebot steht nur als Textlinks am Ende des
 * Abschnitts "zusatzversicherung".
 *
 * Quelle (einzige Faktenquelle): KassenBoost-Belegkette
 * GKV-Vergleichskampagne/website/app/mkk-bonus-2026.server.ts, erstellt
 * 26.08.2026, geprüft 26.08.2026. Rechenquelle dort ist die Satzung der mkk
 * vom 01.01.2020, Stand 38. Satzungsnachtrag, Genehmigungsbescheid
 * 17.12.2025 ("Stand 01/2026"). Fundstellen: § 15 Abs. 1 (Einzelboni 5 EUR,
 * Vollständigkeitsbonus mit Varianten 70 / bis 100 / bis 210 EUR,
 * Wahlklausel Nr. 7, Nachweis Nr. 8, Frist Nr. 9), § 15 Abs. 2 (PrävBonus
 * 10 EUR), § 15 Abs. 3 (Babybonus 190 EUR), § 15b (Arbeitnehmerbonus
 * 50 EUR), § 13 Abs. 11 (Gesamtansprüche 500 und 600 EUR), Anlage zu § 15 (1)
 * (Katalog der Bonusvariante 2 mit privaten Krankenzusatzversicherungen).
 *
 * Stand des Artikels: 05.10.2026.
 *
 * Suchbegriffe (Semrush DE, 05.10.2026): "mkk bonusprogramm" 140 im Monat,
 * dazu "mkk bonusprogramm 2025/2026" und "mkk formulare" ohne Volumenangabe.
 * Kernpunkt für Healio: Der Zuschuss der Bonusvariante 2 ist laut Anlage zu
 * § 15 (1) ausdrücklich auf private Krankenzusatzversicherungen anwendbar,
 * bis zu 100 EUR im Jahr, gedeckelt auf die nachgewiesenen Kosten, nur bei
 * Vollständigkeit nach § 15 Abs. 1 Nr. 5.
 *
 * Bewusste Festlegungen, alle aus der Belegkette übernommen:
 *   - Zahnkontrolle: Die Satzung zahlt "je nachgewiesener Untersuchung",
 *     verweist für Erwachsene aber auf die eine jährliche Untersuchung nach
 *     § 55 SGB V. Der Text rät deshalb, mit 5 EUR im Jahr zu rechnen (N1).
 *   - Schutzimpfung: Die Anrechnungsklausel nennt nur Nr. 1 bis 3. Der Text
 *     gibt den Wortlaut wieder und rechnet die Impfung neben der Variante (N3).
 *   - Babybonus: nur Betrag und Doppelverwertungssperre, weil die Belegkette
 *     die Voraussetzungen nicht wiedergibt (N6).
 *   - Variante 3: nur Betrag, Gerätebezug und Dreijahresregel (N7).
 *   - § 15b: keine Frist genannt, weil die Belegkette die Frist nur für § 15
 *     Abs. 1 und Abs. 2 aus der Satzung zitiert.
 *   - § 13-Leistungen stehen getrennt und nie in der Bonusrechnung (N9).
 *   - Zusatzbeitrag, Steuerfragen und Bezugswege für Bonusheft oder App
 *     stehen nicht in der Belegkette und sind deshalb weggelassen.
 *
 * 05.10.2026: Abschnitt tipp-ikk-classic (Unser Tipp mit Gegenrechnung des
 * Zusatzbeitrags) vor den Fristen. Beleg: KassenBoost-Prüfung IKK classic gegen
 * den Markt, Zusatzbeiträge aus website/app/funds.ts, Stand 05.10.2026. Frank
 * 05.10.2026: kein Hinweis auf eine Zusammenarbeit mit der IKK classic.
 */

export const article = {
  slug: 'mkk-bonusprogramm-2026',
  kind: 'ratgeber',

  metaTitle: 'mkk Bonusprogramm 2026: Beträge, Zuschuss, Formulare | Healio',
  metaDescription:
    'mkk Bonus 2026 laut Satzung: 5 EUR je Vorsorge, 70 EUR Geld oder bis zu 100 EUR Zuschuss zur Zusatzversicherung, Nachweise und Frist 30.04.2027.',

  publishedAt: '2026-10-05',
  publishedAtLabel: '5. Oktober 2026',
  updatedAt: "2026-10-08",
  updatedAtLabel: "8. Oktober 2026",
  readingTimeMinutes: 8,

  listTitle: 'mkk Bonusprogramm 2026: alle Maßnahmen, Zuschuss zur Zusatzversicherung und Fristen',
  listTeaser:
    'Was die mkk laut Satzung je Maßnahme zahlt, wann der Vollständigkeitsbonus greift und wie bis zu 100 EUR Zuschuss in eine Zusatzversicherung fließen können.',

  headline:
    'mkk Bonusprogramm 2026: alle Maßnahmen, Beträge und wie der Zuschuss eine Zusatzversicherung mitfinanzieren kann',
  lead:
    'Die mkk zahlt laut Satzung 5 EUR für jede nachgewiesene Vorsorgeuntersuchung, für die Zahnkontrolle und für jede Schutzimpfung. Wer im Jahr alle für sein Alter vorgesehenen Vorsorge- und Früherkennungsuntersuchungen samt Zahnkontrolle nachweist, wählt unter anderem zwischen 70 EUR Geldbonus und einem Zuschuss von bis zu 100 EUR. Diesen Zuschuss gibt es ausdrücklich auch auf den Beitrag einer privaten Krankenzusatzversicherung, höchstens bis zur Höhe deiner nachgewiesenen Kosten. Wie viel am Ende zusammenkommt, hängt von deinen Maßnahmen ab.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Einzelboni ab der ersten Maßnahme.',
              text: 'Je 5 EUR gibt es für Check-up, Krebsfrüherkennung, Kinderuntersuchungen, die Zahnkontrolle und jede Schutzimpfung.',
            },
            {
              lead: 'Vollständigkeitsbonus statt Einzelboni.',
              text: 'Wer alle für sein Alter vorgesehenen Untersuchungen samt Zahnkontrolle schafft, bekommt wahlweise 70 EUR Geld, bis zu 100 EUR Zuschuss oder einmalig bis zu 210 EUR in drei Jahren für technische Geräte. Bereits gewährte Einzelboni für Vorsorge und Zahnkontrolle werden angerechnet.',
            },
            {
              lead: 'Zuschuss für die Zusatzversicherung.',
              text: 'Private Krankenzusatzversicherungen stehen im Katalog der zuschussfähigen Leistungen. Die mkk zahlt bis zu 100 EUR, nie mehr als deine nachgewiesenen Kosten.',
            },
            {
              lead: 'Zwei Boni laufen daneben.',
              text: 'Der PrävBonus bringt 10 EUR für eine Präventionsmaßnahme im Jahr, der Arbeitnehmerbonus 50 EUR für ein zertifiziertes Gesundheitsangebot deines Arbeitgebers. Sportverein und Fitnessstudio bringen bei der mkk keinen Bonus.',
            },
            {
              lead: 'Frist 30.04.2027.',
              text: 'Bis dahin reichst du die Nachweise für 2026 ein, für das Bonusprogramm wie für den PrävBonus. Alle Maßnahmen müssen 2026 stattfinden, Voraussetzung ist die Teilnahme am Bonusprogramm. Wie viel du bekommst, hängt von deinen Maßnahmen ab.',
            },
          ],
        },
      ],
    },
    {
      id: 'funktionsweise',
      heading: 'Wie funktioniert das mkk Bonusprogramm 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Bonusprogramm der mkk (meine krankenkasse) steht in § 15 der Satzung und ist zweistufig aufgebaut. In der ersten Stufe bekommst du für jede nachgewiesene Vorsorge- oder Früherkennungsuntersuchung, jede zahnärztliche Untersuchung und jede Schutzimpfung 5 EUR. Eine Mindestzahl gibt es nicht, schon die erste Maßnahme zählt.',
        },
        {
          type: 'paragraph',
          text: 'In der zweiten Stufe steht der Vollständigkeitsbonus. Wer im Kalenderjahr alle Vorsorge- und Früherkennungsuntersuchungen wahrnimmt, die für sein Alter vorgesehen sind (geregelt in den §§ 25, 25a und 26 SGB V), und dazu zur Zahnkontrolle geht, wählt eine von drei Bonusvarianten: 70 EUR Geld, einen Zuschuss von bis zu 100 EUR zu bestimmten Kosten oder einmalig bis zu 210 EUR für technische Geräte innerhalb von drei Kalenderjahren. Welche Untersuchungen für dich vorgesehen sind, hängt von Alter und Geschlecht ab.',
        },
        {
          type: 'paragraph',
          text: 'Entscheidend ist die Anrechnung. Bereits für dasselbe Jahr gewährte Einzelboni für Vorsorge, Früherkennung und Zahnkontrolle rechnet die mkk auf die gewählte Variante an. Der Vollständigkeitsbonus ersetzt diese Einzelboni also, er kommt nicht obendrauf. Die Schutzimpfung nennt die Anrechnungsklausel nicht. Und du darfst nur eine der drei Varianten wählen.',
        },
      ],
    },
    {
      id: 'massnahmen',
      heading: 'Welche Maßnahmen zählen beim mkk Bonus und was bringen sie?',
      blocks: [
        {
          type: 'table',
          caption: 'Bonusfähige Maßnahmen der mkk 2026 laut Satzung',
          head: ['Maßnahme (Satzung)', 'Betrag', 'Hinweis'],
          rows: [
            ['Gesundheits-Check-up (§ 15 Abs. 1 Nr. 1 und 2)', '5 EUR', 'ab 18 Jahren; von 18 bis 34 einmal, ab 35 alle drei Jahre vorgesehen'],
            ['Krebsfrüherkennung und Screenings: Frauen ab 20, Männer ab 45, Hautkrebs ab 35, Gebärmutterhalskrebs-Programm ab 35, Darmkrebs ab 50, Mammographie von 50 bis 75, Bauchaorta bei Männern ab 65 (Nr. 1 und 2)', 'je 5 EUR', 'je nachgewiesener Untersuchung'],
            ['Kinder- und Jugenduntersuchungen U1 bis U9 mit U7a, U10, U11, J1, J2 (Nr. 1 und 2)', 'je 5 EUR', 'im jeweils vorgesehenen Alter'],
            ['Zahnärztliche Untersuchung (Nr. 3)', '5 EUR', 'ab 6 Jahren; für Erwachsene verweist die Satzung auf die jährliche Untersuchung'],
            ['Schutzimpfung nach § 20i SGB V (Nr. 4)', 'je 5 EUR', 'jede Impfung zählt einzeln; in der Anrechnungsklausel nicht genannt'],
            ['Vollständigkeitsbonus (Nr. 5 und 6)', '70 EUR Geld, bis zu 100 EUR Zuschuss oder einmalig bis zu 210 EUR in drei Jahren', 'ersetzt die Einzelboni für Vorsorge und Zahnkontrolle; nur eine Variante'],
            ['PrävBonus: Gesundheitsaktion mit mindestens zwei Terminen, Angebot zur digitalen Gesundheitskompetenz oder Präventionskurs mit mindestens 80 Prozent Teilnahme (Abs. 2)', '10 EUR', 'eine Maßnahme pro Jahr; Gesundheitsaktionen der betrieblichen Gesundheitsförderung zählen hier nicht'],
            ['Arbeitnehmerbonus für ein zertifiziertes Angebot der betrieblichen Gesundheitsförderung deines Arbeitgebers (§ 15b)', '50 EUR', 'Bewegung, Ernährung, Suchtprävention oder Stressbewältigung; ungekündigte Versicherung bei Antragstellung'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Eine Mitgliedschaft im Sportverein oder Fitnessstudio kennt keines der drei Bonusprogramme der mkk, sie bringt also keinen Bonus. Bewegung zählt im PrävBonus nur als Gesundheitsaktion mit mindestens zwei Terminen, etwa der mkk, einer Schule oder Hochschule oder eines eingetragenen Vereins, oder als Präventionskurs und bringt dann 10 EUR im Jahr. Bietet dein Arbeitgeber ein zertifiziertes Bewegungsangebot an, kann die Teilnahme daran den Arbeitnehmerbonus von 50 EUR bringen.',
        },
        {
          type: 'paragraph',
          text: 'Bei der Zahnkontrolle zahlt die Satzung 5 EUR je nachgewiesener Untersuchung, verweist für Erwachsene aber auf die eine jährliche Untersuchung für das Bonusheft. Rechne deshalb vorsichtig mit 5 EUR im Jahr, auch wenn du zweimal zur Kontrolle gehst.',
        },
        {
          type: 'paragraph',
          text: 'Außerdem regelt § 15 Abs. 3 der Satzung einen eigenen Babybonus von 190 EUR. Nachweise, die du dafür einreichst, kannst du nicht zusätzlich im Bonusprogramm nach Abs. 1 verwenden, und gleichzeitig an beiden Programmen teilzunehmen, schließt die Satzung aus.',
        },
      ],
    },
    {
      id: 'einreichen',
      heading: 'Wie reiche ich den mkk Bonus ein und welche Formulare brauche ich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Voraussetzung für die Boni aus § 15 ist, dass du am Bonusprogramm der mkk teilnimmst; eine Anmeldefrist nennt die Satzung nicht. Für den Arbeitnehmerbonus nach § 15b verlangt sie diese Teilnahme nicht. Deine Maßnahmen weist du auf einem von drei Wegen nach:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Bonusblatt.',
              text: 'Ärztin, Arzt oder Leistungserbringer bestätigen die Maßnahme auf dem Blatt.',
            },
            {
              lead: 'Bonusheft.',
              text: 'Dieselbe Bestätigung, gesammelt im Heft.',
            },
            {
              lead: 'Bonus-App.',
              text: 'Die Bestätigung kommt in elektronischer Form.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Für den PrävBonus gelten dieselben drei Wege. Wählst du beim Vollständigkeitsbonus den Zuschuss, legst du zusätzlich die Rechnungen und Quittungen über deine Kosten vor. Für Bonusblatt, Bonusheft oder den Zugang zur Bonus-App wendest du dich an die mkk; die Satzung regelt, was darin bestätigt sein muss.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Kann der mkk Bonus meine Zusatzversicherung mitfinanzieren?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, über die Bonusvariante 2. Die Anlage zu § 15 der Satzung nennt genau drei zuschussfähige Leistungen, und die erste davon sind private Zusatzversicherungen, genauer Krankenzusatzversicherungen. Die beiden anderen sind individuelle Gesundheitsleistungen und die einmalige Erstellung einer Online-Patientenverfügung.',
        },
        {
          type: 'paragraph',
          text: 'Damit der Zuschuss in deinen Beitrag fließt, müssen diese Bedingungen zusammenkommen:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Vollständigkeit.',
              text: 'Du hast im Kalenderjahr alle für dein Alter vorgesehenen Vorsorge- und Früherkennungsuntersuchungen und die zahnärztliche Untersuchung wahrgenommen.',
            },
            {
              lead: 'Wahl der Variante 2.',
              text: 'Du entscheidest dich für den Zuschuss und damit gegen die 70 EUR Geld und gegen die Gerätevariante. Mehrere Varianten zugleich gehen nicht.',
            },
            {
              lead: 'Bis zu 100 EUR, gedeckelt auf deine Kosten.',
              text: 'Die mkk zahlt insgesamt bis zu 100 EUR, aber nie mehr als die tatsächlich entstandenen und nachgewiesenen Kosten. Bereits gewährte Einzelboni für Vorsorge und Zahnkontrolle werden angerechnet.',
            },
            {
              lead: 'Nachweis per Rechnung.',
              text: 'Du reichst die Rechnungen und Quittungen über deine Kosten bis zum 30.04.2027 ein.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Für alle drei Leistungen gilt außerdem: Der Zuschuss greift nur, soweit kein anderer Leistungsanspruch nach § 13 der Satzung besteht. Rechnerisch bringt der Zuschuss mehr als der Geldbonus, sobald deine nachgewiesenen Kosten aus dem Katalog über 70 EUR liegen; die vollen 100 EUR gibt es ab 100 EUR Kosten.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Bevor du dich zwischen Geld und Zuschuss entscheidest, lohnt der Blick auf den Beitrag, in den der Zuschuss fließen soll. Dafür haben wir bei Healio ein Angebot zusammengestellt: Wählst du den Zuschuss, kann er mit höchstens 100 EUR im Jahr den Beitrag einer Zusatzversicherung mitfinanzieren, ob ',
            },
            { text: 'ambulant für Heilpraktiker, Osteopathie, Brille und Vorsorge', to: '/ambulant' },
            { text: ', ' },
            { text: 'für die Zähne', to: '/zahn' },
            { text: ' oder ' },
            { text: 'fürs Krankenhaus', to: '/stationaer' },
            { text: '. Der ambulante Tarif selbst bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Zuschuss hilft beim Beitrag, meist nur zu einem Teil. Wie viel dein Bonus beiträgt, hängt von deinen Maßnahmen und deinen eigenen Kosten ab; das rechnest du auf der jeweiligen Seite individuell durch.' },
          ],
        },
      ],
    },
    {
      id: 'realistisch',
      heading: 'Wie viel mkk Bonus ist realistisch drin?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Beträge der mkk sind überschaubar, den Unterschied macht die Vollständigkeit. Durchgerechnet mit den Beträgen der Satzung, jeweils für eine erwachsene Versicherte:',
        },
        {
          type: 'table',
          caption: 'Durchgerechnete Bonusszenarien mkk 2026',
          head: ['Szenario', 'Geldbonus', 'Zuschuss'],
          rows: [
            ['Einstieg: Check-up, eine Zahnkontrolle, eine Schutzimpfung', '15 EUR', 'kein Zuschuss'],
            ['Aktiv, aber nicht vollständig: zwei Zahnkontrollen, Check-up, eine Impfung, Präventionskurs, Sportverein', '25 EUR', 'kein Zuschuss'],
            ['Vollständig mit Variante 1: alle vorgesehenen Untersuchungen, eine Impfung, Präventionskurs', '85 EUR', 'kein Zuschuss'],
            ['Vollständig mit Variante 2: wie oben, Zuschuss statt Geld', '15 EUR', 'bis zu 100 EUR'],
            ['Dazu, wenn dein Arbeitgeber ein zertifiziertes Angebot hat', 'plus 50 EUR', 'unverändert'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Im aktiven Szenario zählen die zwei Zahnkontrollen einmal, der Sportverein gar nicht. Impfung und Präventionskurs laufen neben dem Vollständigkeitsbonus weiter, deshalb bleiben auch bei Variante 2 die 15 EUR Geld stehen; jede weitere Schutzimpfung bringt 5 EUR mehr. Wie viel du tatsächlich bekommst, hängt von deinen Maßnahmen und bei der Variante 2 von deinen nachgewiesenen Kosten ab.',
        },
        {
          type: 'paragraph',
          text: 'Die Extras aus § 13 der Satzung, etwa für Osteopathie oder professionelle Zahnreinigung, gehören nicht in diese Rechnung. Das sind keine Boni, sondern Zuschüsse zu einzelnen Leistungen.',
        },
      ],
    },
    {
      id: 'satzungsleistungen',
      heading: 'Was zahlt die mkk außerhalb des Bonusprogramms?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Neben dem Bonus kennt die Satzung in § 13 Zuschüsse zu einzelnen Leistungen, jeweils mit eigener medizinischer Voraussetzung und eigenem Höchstbetrag. Dazu gehören:',
        },
        {
          type: 'list',
          items: [
            'Osteopathie mit 60 EUR je Sitzung, bis 240 EUR',
            'professionelle Zahnreinigung zweimal mit je 40 EUR',
            'nicht verschreibungspflichtige Arzneimittel bis 100 EUR',
            'sportmedizinische Untersuchung bis 80 EUR',
            'Glattflächenversiegelung bis 100 EUR, Retainer bis 150 EUR, Abformverfahren bis 150 EUR',
            'Brustkrebs-Tastuntersuchung',
          ],
        },
        {
          type: 'paragraph',
          text: 'Zusammen sind diese Leistungen auf 500 EUR pro Kalenderjahr begrenzt. Das ist eine Kappungsgrenze, kein Guthaben: Du bekommst nur, was du für eine Leistung mit erfüllter Voraussetzung nachweist. Für Leistungen in der Schwangerschaft regelt § 13 einen eigenen Gesamtanspruch von 600 EUR.',
        },
      ],
    },
    {
      id: 'tipp-ikk-classic',
      heading: 'Unser Tipp: Die IKK classic gegen die mkk rechnen',
      blocks: [
        {
          type: 'paragraph',
          text: 'Unsere Einschätzung bei Healio: Wenn du Bonus und Zusatzschutz verbinden willst, ist die IKK classic für uns ein besonders starker Weg. Unter den von kassenboost.de geprüften Satzungen ist sie die einzige Kasse, die ihren gesamten Bonus wahlweise in dreifacher Höhe und ohne Höchstbetrag als Zuschuss zahlt, auch für den Jahresbeitrag einer privaten Zusatzversicherung; ausgezahlt wird dabei höchstens der Beitrag, den du tatsächlich gezahlt hast.',
        },
        {
          type: 'paragraph',
          text: 'Dagegen steht der Zusatzbeitrag: 3,85 Prozent bei der IKK classic, 3,50 Prozent bei der mkk (Stand 05.10.2026), also 0,35 Prozentpunkte mehr, und diesen Mehrbeitrag musst du gegen den Zuschuss rechnen. Die mkk zahlt den Zuschuss nur beim Vollständigkeitsbonus, mit höchstens 100 EUR statt 70 EUR Geld, während die IKK classic beim Zuschuss jede Bonusmaßnahme verdreifacht; ein höherer Faktor ist aber nicht dasselbe wie ein höherer Euro-Betrag.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die Rechnung steht im Ratgeber ' },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', den Vergleich der Satzungen findest du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ', und du kannst genauso bei der mkk bleiben, denn ein Wechsel lohnt sich nicht für jeden.' },
          ],
        },
      ],
    },
    {
      id: 'fristen',
      heading: 'Welche Fristen gelten für den mkk Bonus 2026?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: '01.01. bis 31.12.2026.',
              text: 'In diesem Kalenderjahr müssen alle Maßnahmen stattfinden, die Satzung rechnet die Boni ausdrücklich je Kalenderjahr.',
            },
            {
              lead: '30.04.2027.',
              text: 'Bis spätestens zu diesem Tag muss dein Antrag für 2026 samt Nachweisen bei der mkk sein, für das Bonusprogramm wie für den PrävBonus.',
            },
            {
              lead: 'Keine Anmeldefrist,',
              text: 'aber eine Auszahlung gibt es nur bei Teilnahme am Bonusprogramm.',
            },
            {
              lead: 'Drei Kalenderjahre bei Variante 3.',
              text: 'Wer die Gerätevariante wählt, bekommt einmalig bis zu 210 EUR und darf in diesen drei Jahren keine andere Variante nutzen.',
            },
            {
              lead: 'Arbeitnehmerbonus.',
              text: 'Bei Antragstellung muss deine Versicherung bei der mkk ungekündigt bestehen.',
            },
          ],
        },
      ],
    },

{
  "id": "ratgeber-weiterlesen",
  "heading": "Welche Ratgeber helfen dir weiter?",
  "blocks": [
    {
      "type": "cards",
      "heading": "Zum Weiterlesen",
      "items": [
        {
          "icon": "bonus",
          "tone": "mint",
          "title": "Krankenkasse und Bonus: Bonusprogramme und Zuschüsse im Überblick",
          "text": "Was ein Bonusprogramm ist, wie die Kassen auszahlen, wann der Bonus als Zuschuss den Beitrag einer Zusatzversicherung mitträgt und welcher Ratgeber zu deiner Kasse passt.",
          "to": "/ratgeber/bonusprogramm-krankenkasse",
          "linkLabel": "Ratgeber lesen"
        }
      ]
    }
  ]
},
],

  factNugget:
    'Healio verbindet Kassenbonusprogramme mit Zusatzversicherungen: Der ambulante Tarif bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Kassenbonus kann je nach Kasse beim Beitrag helfen. Bei der mkk kann der zweckgebundene Zuschuss der Bonusvariante 2 von bis zu 100 EUR im Jahr in den Beitrag einer privaten Krankenzusatzversicherung fließen; je nach nachgewiesenen Maßnahmen und eigenen Kosten finanziert er den Beitrag mit, mehr als die nachgewiesenen Kosten zahlt die mkk nie. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Bis wann muss ich den mkk Bonus 2026 einreichen?',
      answer:
        'Bis spätestens 30.04.2027. Alle Maßnahmen müssen im Kalenderjahr 2026 stattgefunden haben.',
    },
    {
      question: 'Gibt die mkk einen Zuschuss zur Zusatzversicherung?',
      answer:
        'Ja. Private Krankenzusatzversicherungen stehen im Katalog der Bonusvariante 2. Wer im Jahr alle für sein Alter vorgesehenen Vorsorge- und Früherkennungsuntersuchungen samt Zahnkontrolle nachweist und den Zuschuss wählt, bekommt bis zu 100 EUR, höchstens aber die nachgewiesenen Kosten.',
    },
    {
      question: 'Welche Formulare brauche ich für das mkk Bonusprogramm?',
      answer:
        'Die Satzung nennt drei Wege: Bonusblatt, Bonusheft oder Bonus-App. Ärztin, Arzt oder Leistungserbringer bestätigen darin die Maßnahme. Für den Zuschuss kommen Rechnungen und Quittungen über deine Kosten dazu.',
    },
    {
      question: 'Gibt es bei der mkk einen Bonus für Fitnessstudio oder Sportverein?',
      answer:
        'Nein. Keines der drei Bonusprogramme der mkk nennt eine Vereins- oder Studiomitgliedschaft. Ein Präventionskurs mit mindestens 80 Prozent Teilnahme oder eine Gesundheitsaktion mit mindestens zwei Terminen bringt über den PrävBonus 10 EUR im Jahr, ein zertifiziertes Bewegungsangebot deines Arbeitgebers den Arbeitnehmerbonus von 50 EUR.',
    },
    {
      question: 'Kann ich Geldbonus und Zuschuss kombinieren?',
      answer:
        'Nein. Du wählst genau eine der drei Bonusvarianten. Bereits gewährte Einzelboni für Vorsorge und Zahnkontrolle werden auf die gewählte Variante angerechnet. PrävBonus und Arbeitnehmerbonus sind eigene Programme.',
    },
    {
      question: 'Gilt das auch für andere Krankenkassen?',
      answer:
        'Nein. Jede Kasse hat ein eigenes Bonusprogramm mit eigenen Beträgen und Regeln. Dieser Ratgeber gilt nur für die mkk; andere Kassen vergleichst du auf kassenboost.de.',
    },
  ],

  // Bewusst kein internalCta: Nur die drei Artikel aus INTERNAL_BUTTONS im
  // Vertragstest dürfen einen Button tragen.

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      {
        text: 'Ob die mkk mit ihrem Bonusprogramm zu dir passt, hängt an deinen Maßnahmen und an dem, was andere Kassen bieten. Auf ',
      },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' vergleichst du Bonusprogramme quellenbelegt anhand der Satzungen, auf ',
      },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' rechnest du durch, wie viel Beitrag nach dem individuell anrechenbaren Zuschuss selbst zu tragen bleibt.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach der Satzung der mkk vom 01.01.2020 in der Fassung des 38. Satzungsnachtrags, Genehmigungsbescheid vom 17.12.2025 (Stand 01/2026), maßgeblich sind immer die Originaldokumente der Kasse.',
};

export default article;
