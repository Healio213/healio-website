/**
 * Ratgeber-Serie, Feld Brille (group 'brille'), Seite: Gleitsichtbrille Kosten.
 * Hauptbegriff "gleitsichtbrille kosten", Angebotspfad /ambulant.
 *
 * Quellen (Belege: gleitsichtbrille-kosten.belege.md, Abruf 07.10.2026):
 * ZVA-Presseinformation 01/2026 (Durchschnittspreis 550 EUR, Spannbreite,
 * Aufpreise), Verbraucherzentrale (Stand 11.06.2025: Gläser zahlt die Kasse,
 * Fassung und höherwertige Gläser wie Gleitsicht in der Regel selbst,
 * Zuzahlung, Eingewöhnung, Rückgabe vereinbaren), G-BA Hilfsmittel-Richtlinie
 * §§ 12 und 14 (Mehrstärkengläser, nicht verordnungsfähige Gläser und
 * Fassungen), SGB V § 33 (Mehrkosten, Anspruch), GKV-Spitzenverband
 * (Festbeträge für Sehhilfen aufgehoben zum 01.03.2025). Tarifaussagen
 * wortgleich mit ambulantFaqs.js und der Produktseite (Sehhilfen bis 500 EUR,
 * Töpfe je Stufe). Die 680 EUR sind eine gekennzeichnete Rechenannahme und
 * keine Aussage der Produktseite (Entscheidung der Marktanalyse-Sitzung
 * 07.10.2026); neutrale Einordnung: ZVA-Durchschnitt rund 550 EUR, 16.01.2026.
 * Zuzahlung: heute 10 Prozent, mindestens 5, höchstens 10 EUR (§ 61 SGB V);
 * ab 01.01.2027 mindestens 7,50 und höchstens 15 EUR (GKV-Beitrags-
 * satzstabilisierungsgesetz, BGBl. 2026 I Nr. 228, Art. 1 Nr. 23, Art. 8 Abs. 2).
 *
 * Faktenprüfung 07.10.2026 (PRÜFBERICHT-brille-vorsorge.md): Zuzahlung 2027
 * angekündigt, Gesamtbild des Tarifs ergänzt, Statusangabe wie Zahn-Welle 1.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne für Gleitsichtbrillen: Neutral belegt ist nur der
 *     Durchschnitt über alle kompletten Brillen (ZVA, rund 550 EUR). Eine
 *     Leserkommentar-Zahl auf test.de (150 bis 700 EUR Gläser) wurde bewusst
 *     NICHT verwendet, weil sie kein Beitrag der Stiftung Warentest ist.
 *   - Das Beispiel mit 680 EUR ist eine Annahme; alle Summen daraus sind
 *     eigene Rechnung und gekennzeichnet.
 *   - Keine Empfehlung für oder gegen ein Glas, einen Optiker oder eine
 *     Qualitätsstufe. Keine Krebsvorsorge, kein Eintrag in die Ausschlusslisten.
 */

export const article = {
  updatedAtLabel: "8. Oktober 2026",
  updatedAt: "2026-10-08",
  slug: 'gleitsichtbrille-kosten',
  kind: 'ratgeber',
  group: 'brille',

  metaTitle: 'Gleitsichtbrille Kosten: Preis, Kassenanteil, Erstattung | Healio',
  metaDescription:
    'Gleitsichtbrille Kosten: wovon der Preis abhängt, was die Krankenkasse bei Gleitsichtgläsern zahlt und was ein ambulanter Tarif mit Sehhilfen-Topf erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 8,

  listTitle: 'Gleitsichtbrille: Kosten, Kassenanteil und Erstattung',
  listTeaser:
    'Wovon der Preis einer Gleitsichtbrille abhängt, was die Kasse nie zahlt und wie ein Beispiel mit 680 EUR mit und ohne Tarif ausgeht.',

  headline: 'Gleitsichtbrille Kosten: was sie kostet, was die Kasse zahlt und was bei dir bleibt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'glasses',
    tone: 'sky',
    facts: [
      { value: 'rund 550 EUR', label: 'im Schnitt für eine komplette Brille laut ZVA, Januar 2026' },
      { value: 'in der Regel selbst', label: 'Fassung und Gleitsichtgläser zahlen Erwachsene meist allein' },
      { value: 'bis zu 500 EUR', label: 'im Tarif Ambulant 100 alle zwei Jahre für Sehhilfen' },
    ],
    text: 'Einen festen Preis für Gleitsichtbrillen gibt es nicht. Er hängt von Gläsern, Fassung und Veredelung ab, und die Kasse zahlt Erwachsenen nur in Ausnahmen etwas.',
    path: { to: '/ambulant', text: 'Gleitsichtbrille geplant? Den Tarif prüfen', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Der ZVA nennt für eine komplette Korrektionsbrille einen Durchschnitt von rund 550 EUR (16.01.2026). Eine eigene Durchschnittszahl für Gleitsichtbrillen nennt er nicht, der Preis hängt von Glas, Fassung und Optiker ab. Die Kasse zahlt Erwachsenen die Gläser nur bei starker Fehlsichtigkeit, die Fassung nie. Unten siehst du, was in den Preis hineinspielt, was nicht erstattungsfähig ist und wie ein Rechenbeispiel mit angenommenen 680 EUR mit und ohne Tarif ausgeht.',

  sections: [
    {
      id: 'kosten',
      heading: 'Was kostet eine Gleitsichtbrille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der durchschnittliche Verkaufspreis einer kompletten Korrektionsbrille liegt laut ZVA bei rund 550 EUR (Presseinformation vom 16.01.2026). Der Verband weist selbst darauf hin, dass diese Zahl die Marktrealität nur bedingt zeigt. Die Preisspanne reicht von einfachen Einstärkenbrillen bis zu individuell gefertigten, hochwertigen Gleitsichtbrillen.',
        },
        {
          type: 'paragraph',
          text: 'Eine feste Preisliste für Gleitsichtbrillen gibt es deshalb nicht. Was bei dir anfällt, hängt an mehreren Stellen, und der Optiker legt die Preise fest. Du kannst dir jeden Posten einzeln nennen lassen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Wovon der Preis einer Gleitsichtbrille abhängt',
          head: ['Posten', 'Was den Preis bewegt', 'Quelle'],
          rows: [
            ['Gläser', 'von einfachen bis zu individuell gefertigten Gleitsichtgläsern reicht die Spanne', 'ZVA, 16.01.2026'],
            ['Fassung', 'zwischen günstigeren und hochpreisigen Marken ist der Unterschied erheblich', 'ZVA, 16.01.2026'],
            ['Aufpreise für die Gläser', 'etwa für eine Superentspiegelung oder spezielle Filter', 'ZVA, 16.01.2026'],
          ],
          note: 'Der ZVA ist der Branchenverband der Augenoptiker, die Zahl ist ein Durchschnitt über alle kompletten Brillen und kein Gleitsicht-Preis.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Zahlt die Krankenkasse eine Gleitsichtbrille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Erwachsenen in der Regel nicht. Die Verbraucherzentrale schreibt, dass Versicherte die Fassung und die Kosten für höherwertige Gläser, etwa eine Gleitsichtbrille, in der Regel selbst übernehmen müssen (Stand 11.06.2025). Das Gesetz sagt dazu: Wer Hilfsmittel wählt, die über das Maß des Notwendigen hinausgehen, trägt die Mehrkosten selbst (§ 33 Abs. 1 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Anspruch auf Sehhilfen haben Erwachsene nur bei einer schweren Sehbeeinträchtigung mindestens der Stufe 1 oder bei einem verordneten Fern-Korrekturausgleich von mehr als 6 Dioptrien bei Kurz- oder Weitsichtigkeit oder mehr als 4 Dioptrien bei Astigmatismus (§ 33 Abs. 2 SGB V). Die Richtlinie des G-BA nennt dafür 6,25 und 4,25 Dioptrien und stellt klar: Grundlage ist der verordnete Fernwert im stärksten Hauptschnitt. Die Nahzugabe einer Lesehilfe zählt dafür nicht.',
        },
        {
          type: 'paragraph',
          text: 'Besteht der Anspruch und sind Fern- und Nahkorrektur nötig, können nach der Richtlinie wahlweise Mehrstärkengläser verordnet werden, wenn das ständige Tragen der Brille es erforderlich macht (§ 14 Abs. 1). Die Kasse übernimmt dann die mit ihr vertraglich vereinbarten Preise, bei Versicherten ab 18 Jahren abzüglich der gesetzlichen Zuzahlung. Die beträgt 2026 10 Prozent, mindestens 5 und höchstens 10 EUR, aber nie mehr als die Kosten. Ab dem 1. Januar 2027 sind es mindestens 7,50 und höchstens 15 EUR, so steht es im GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I Nr. 228). Die Festbeträge für Sehhilfen hat der GKV-Spitzenverband zum 1. März 2025 aufgehoben, die Verträge mit den Optikern bestehen weiter und sind nicht öffentlich.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Alle Regeln für Erwachsene und Kinder mit Quellen stehen im Ratgeber ' },
            { text: 'Zahlt die Krankenkasse eine Brille?', to: '/ratgeber/brille-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'nicht-gezahlt',
      heading: 'Was zahlt die Kasse nicht, auch wenn sie Gläser bezahlt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Selbst bei bestehendem Anspruch bleiben Teile der Rechnung bei dir. Die Hilfsmittel-Richtlinie führt in § 14 Abs. 5 auf, was nicht verordnungsfähig ist. Für eine Gleitsichtbrille sind vor allem diese Punkte wichtig.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Nicht verordnungsfähig nach der Hilfsmittel-Richtlinie, Abschnitt B § 14 Absatz 5',
          head: ['Posten', 'Kassenleistung?', 'Fundstelle'],
          rows: [
            ['Brillenfassung', 'nein', '§ 14 Abs. 5 Nr. 13 und § 33 Abs. 2 SGB V'],
            ['Entspiegelte Gläser', 'nein', '§ 14 Abs. 5 Nr. 5'],
            ['Fototrope (farbveränderliche) Gläser', 'nein', '§ 14 Abs. 5 Nr. 1'],
            ['Polarisierende Gläser', 'nein', '§ 14 Abs. 5 Nr. 6'],
            ['Zweitbrille mit denselben Korrektionsstärken', 'nein', '§ 14 Abs. 5 Nr. 12'],
            ['Brille für den Arbeitsplatz oder die Freizeit', 'nein', '§ 14 Abs. 5 Nr. 10'],
          ],
          note: 'Quelle: Hilfsmittel-Richtlinie des G-BA, geändert 20.02.2025, in Kraft seit 16.05.2025. Das Brillengestell ist außerdem nach § 33 Abs. 2 SGB V nicht Teil des Anspruchs.',
        },
        {
          type: 'paragraph',
          text: 'Arbeitsplatzbrillen und Bildschirmbrillen sind laut Verbraucherzentrale keine Leistung der Krankenkassen, sie dienen dem Arbeitsschutz. Hier kannst du beim Arbeitgeber nach einem Zuschuss fragen.',
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Was erstattet ein Tarif bei der Gleitsichtbrille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für das Rechenbeispiel nehmen wir eine Gleitsichtbrille für 680 EUR an. Das ist eine Annahme, kein Durchschnittspreis. Im Tarif Ambulant 100 gibt es dafür einen Sehhilfen-Topf von bis zu 500 EUR alle zwei Jahre. Allgemein hat jede Tarifstufe einen eigenen Sehhilfen-Topf von 200 bis 500 EUR je zwei Kalenderjahre. Brille und Kontaktlinsen erstattet der Tarif in jeder Stufe zu 100 %, bis die Grenze des Topfs erreicht ist.',
        },
        {
          type: 'costCard',
          title: 'Gleitsichtbrille für 680 EUR: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit Ambulant 100: Sehhilfen bis zu 500 EUR alle zwei Jahre, Beitrag 31,64 EUR im Monat für 21 bis 30 Jahre. Zeitraum 24 Monate, Brille einmal gekauft, keine anderen Töpfe genutzt.',
          caption: 'Kostenkarte: Gleitsichtbrille für 680 EUR ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Brille für 680 EUR, Erwachsene ohne Kassenanspruch', 'nichts', '680 EUR', 'Ambulant 100 erstattet bis zu 500 EUR, du zahlst 180 EUR'],
            ['Brille mit Kassenanspruch (Fernwert ab 6,25 Dioptrien)', 'die Gläser nach dem Vertrag deiner Kasse, nicht die Fassung', 'Fassung, Zuzahlung von 5 bis 10 EUR (ab 2027 7,50 bis 15 EUR) und Aufpreise für Entspiegelung', 'Der Tarif erstattet Rechnungsteile für Sehhilfen bis zur Grenze des Topfs'],
            ['Beitrag Ambulant 100 in 24 Monaten, 31,64 EUR im Monat', 'entfällt', 'entfällt', '759,36 EUR'],
            ['Insgesamt in zwei Jahren, Brille ohne Kassenanspruch', 'nichts', '680 EUR', '939,36 EUR'],
          ],
          note: 'Eigene Rechnung, keine Preisangabe: Beitrag mal 24 Monate plus Eigenanteil. Die 680 EUR sind eine Annahme für das Beispiel. Beitrag laut healio.de/ambulant (SDK-Beiträge, Stand 29.09.2026). Zuzahlung nach § 61 SGB V, Stand 2026. Die Erstattung in der zweiten Zeile hängt von den Rechnungsposten und den Tarifbedingungen ab. Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Allein für die Gleitsichtbrille gerechnet, kostet der Tarif in diesem Beispiel 259,36 EUR mehr als das Selbstzahlen (eigene Rechnung). Lohnen kann er sich, wenn mehrere Leistungen zusammenkommen, also neben der Brille auch Heilpraktiker und Vorsorge. Mit allen vier Töpfen erstattet Ambulant 100 bis zu 3.000 EUR in zwei Jahren, dem stehen für 21 bis 30 Jahre 759,36 EUR Beitrag gegenüber (eigene Rechnung). Wie viel tatsächlich erstattet wird, hängt vom gewählten Tarif, den eingereichten Rechnungen und den Tarifbedingungen ab.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'glasses',
          text: 'Du planst eine neue Brille und nutzt auch Heilpraktiker oder Vorsorge? Dann lohnt der Blick auf alle vier Töpfe.',
          label: 'Ambulanten Tarif ansehen',
        },
      ],
    },
    {
      id: 'vor-dem-kauf',
      heading: 'Worauf achtest du vor dem Kauf einer Gleitsichtbrille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gleitsichtbrillen haben einen gleitenden Übergang zwischen Fern- und Nahteil. Das macht häufig eine Eingewöhnungszeit nötig, die unterschiedlich lange dauert. Nicht jeder kommt mit der Brille zurecht, und die Gläser sind teuer. Aus diesen Gründen rät die Verbraucherzentrale, vorab zu vereinbaren, dass die Gläser nach einer Anpassungsfrist zurückgegeben werden können.',
        },
        {
          type: 'steps',
          heading: 'Vier Schritte vor dem Kauf',
          items: [
            { title: 'Anspruch klären', text: 'Frag deine Augenärztin oder deinen Augenarzt, ob dein Fernwert die Schwelle erreicht. Die Erstverordnung kommt von dort, was die Kasse dann zahlt, sagt dir die Kasse.' },
            { title: 'Vertragsoptiker erfragen', text: 'Die Kasse nennt dir, mit welchen Optikern sie Verträge hat und welchen Betrag sie für die Gläser übernimmt.' },
            { title: 'Posten einzeln erfragen', text: 'Lass dir Gläser, Fassung und Aufpreise getrennt nennen. Optiker und Händler müssen Mehrkosten klar herausstellen.' },
            { title: 'Rückgabe vereinbaren', text: 'Halte schriftlich fest, bis wann du die Gläser zurückgeben kannst, wenn du dich nicht eingewöhnst.' },
          ],
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Einen festen Preis für die Gleitsichtbrille gibt es nicht.', text: 'Die 550 EUR des ZVA sind ein Durchschnitt über alle kompletten Brillen. Dein Preis hängt von Gläsern, Fassung und Veredelung ab, und der Optiker legt ihn fest.' },
            { lead: 'Allein für die Brille rechnet sich der Tarif selten.', text: 'Im Beispiel oben liegst du mit Ambulant 100 bei 939,36 EUR gegen 680 EUR beim Selbstzahlen. Er lohnt sich, wenn mehrere Leistungen zusammenkommen, etwa Heilpraktiker, Vorsorge und Sehhilfen.' },
            { lead: 'Ob du Anspruch auf die Kassenleistung hast, entscheidet die Augenärztin oder der Augenarzt.', text: 'Die Schwelle bezieht sich auf den verordneten Fernwert, nicht auf die Lesehilfe. Diese Seite gibt keine Behandlungsempfehlung und kennt deine Werte nicht.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'glasses',
              tone: 'sky',
              title: 'Zahlt die Krankenkasse eine Brille?',
              text: 'Anspruch, Dioptrien-Grenzen, Kinderbrille und Gestell auf einer Seite.',
              to: '/ratgeber/brille-krankenkasse',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'comparison',
              tone: 'mint',
              title: 'Brillenversicherung: lohnt sie sich?',
              text: 'Drei Arten von Policen und die Rechnung gegen Selbstzahlen.',
              to: '/ratgeber/brillenversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'Kassenbonus und Zusatzversicherung',
              text: 'Wie der Bonus der Kasse den Beitrag mittragen kann.',
              to: '/ratgeber/krankenkassen-bonus-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'document',
              tone: 'lavender',
              title: 'TK-Bonusprogramm 2026',
              text: 'Was die TK-Gesundheitsdividende für Brillengläser einlösen lässt.',
              to: '/ratgeber/tk-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
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
          "icon": "document",
          "tone": "mint",
          "title": "Brillenkosten: Angebot und Eigenanteil verstehen",
          "text": "Was deine Brille kostet, ergibt sich aus dem konkreten Angebot für Gläser, Fassung und gewählte Ausführung; einen pauschalen Marktpreis kannst du daraus nicht ableiten. Deinen Eigenanteil kennst du erst, wenn eine mögliche Kassenbeteiligung und eine bestehende private Erstattung für dieses Angebot geklärt sind.",
          "to": "/ratgeber/brillenkosten",
          "linkLabel": "Ratgeber lesen"
        }
      ]
    }
  ]
},
],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Brille, Heilpraktiker und Vorsorge zeigt Healio den ambulanten Tarif der SDK. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet eine Gleitsichtbrille?',
      answer:
        'Eine feste Preisliste gibt es nicht. Der ZVA nennt für eine komplette Korrektionsbrille im Durchschnitt rund 550 EUR (Januar 2026) und weist auf eine große Spanne hin, bis zu individuell gefertigten Gleitsichtbrillen. Der Preis hängt von Gläsern, Fassung und Aufpreisen etwa für Superentspiegelung oder Filter ab.',
    },
    {
      question: 'Zahlt die Krankenkasse eine Gleitsichtbrille?',
      answer:
        'Bei Erwachsenen nur in Ausnahmen, nämlich bei schwerer Sehbeeinträchtigung mindestens der Stufe 1 oder einem verordneten Fernwert von mehr als 6 Dioptrien bei Kurz- oder Weitsichtigkeit oder mehr als 4 Dioptrien bei Astigmatismus. Die Fassung zahlst du immer selbst, höherwertige Gläser in der Regel auch.',
    },
    {
      question: 'Zahlt die Kasse die Entspiegelung bei Gleitsichtgläsern?',
      answer:
        'Nein. Entspiegelte Gläser sind nach der Hilfsmittel-Richtlinie nicht verordnungsfähig, ebenso fototrope und polarisierende Gläser sowie Brillenfassungen. Das gilt auch, wenn die Kasse die Gläser grundsätzlich zahlt.',
    },
    {
      question: 'Was erstattet ein Tarif bei der Gleitsichtbrille?',
      answer:
        'Im Tarif Ambulant 100 sind es bis zu 500 EUR für Sehhilfen alle zwei Jahre. Bei einer Gleitsichtbrille für angenommene 680 EUR blieben damit 180 EUR bei dir (eigene Rechnung). Jede Tarifstufe hat einen eigenen Sehhilfen-Topf von 200 bis 500 EUR je zwei Kalenderjahre, der Tarif erstattet zu 100 %, bis die Grenze des Topfs erreicht ist.',
    },
    {
      question: 'Kann ich die Gleitsichtbrille zurückgeben, wenn ich nicht damit zurechtkomme?',
      answer:
        'Das musst du mit dem Optiker vorab vereinbaren. Die Verbraucherzentrale rät dazu, weil die Gläser teuer sind und eine Eingewöhnung manchmal nicht gelingt. Halte die Frist am besten schriftlich fest.',
    },
    {
      question: 'Gibt es noch Festbeträge für Brillengläser?',
      answer:
        'Nein. Der GKV-Spitzenverband hat die Festbeträge für Sehhilfen zum 1. März 2025 aufgehoben. Die Kassen übernehmen seitdem die mit den Optikern vertraglich vereinbarten Beträge. Frag deine Kasse, bei welchem Optiker du wie viel zurückbekommst.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Ob die Kasse bei dir etwas zu den Gläsern zahlt, klärst du mit deinem Augenarzt und deiner Kasse. Die Regeln dazu stehen im Ratgeber ' },
      { text: 'Zahlt die Krankenkasse eine Brille?', to: '/ratgeber/brille-krankenkasse' },
      { text: '. Was ein ambulanter Tarif bei der Brille erstattet, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Preise, Kassenanspruch und nicht erstattungsfähige Posten stammen aus diesen Quellen, die Tarifangaben aus den Unterlagen auf healio.de/ambulant.',
    items: [
      {
        label: 'Augenoptikbranche 2025/2026: Verhaltene Entwicklung (Presseinformation 01/2026)',
        publisher: 'Zentralverband der Augenoptiker und Optometristen (ZVA)',
        href: 'https://www.zva.de/wp-content/uploads/01-26_Branchenentwicklung-Augenoptik-2025-26_Opti.pdf',
        stand: '16.01.2026',
        accessedAt: '07.10.2026',
        note: 'Branchenverband, Durchschnittswert über alle kompletten Korrektionsbrillen',
      },
      {
        label: 'Neue Brille? Krankenkasse zahlt nur in Ausnahmefällen',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/neue-brille-krankenkasse-zahlt-nur-in-ausnahmefaellen-13686',
        stand: '11.06.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Hilfsmittel-Richtlinie, Abschnitt B Sehhilfen, §§ 12 und 14',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-3815/HilfsM-RL_2025-02-20_iK-2025-05-16.pdf',
        stand: 'geändert 20.02.2025, in Kraft seit 16.05.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 33 Hilfsmittel, Absätze 1 und 2',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__33.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Festbeträge für Sehhilfen, Aufhebung zum 1. März 2025',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/krankenversicherung/hilfsmittel/festbetraege_3/festbetraege.jsp',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz vom 24.07.2026, Artikel 1 Nr. 23 (neuer § 61 SGB V, Zuzahlungen) und Artikel 8 Abs. 2 (Inkrafttreten)',
        publisher: 'Bundesgesetzblatt (BGBl. 2026 I Nr. 228)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'verkündet 29.07.2026, die neuen Zuzahlungsbeträge gelten ab 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen SDK Ambulant, wie auf healio.de/ambulant',
        publisher: 'SDK',
        stand: '07.10.2026',
        note: 'Beitrag nach der SDK-Beitragstabelle vom 29.09.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
