/**
 * Ratgeber-Serie, Feld Brille (group 'brille'), Seite: Brillenversicherung.
 * Hauptbegriff "brillenversicherung", Angebotspfad /ambulant.
 *
 * Quellen (Belege: brillenversicherung.belege.md, Abruf 07.10.2026):
 * Stiftung Warentest (Artikel Brillenversicherung vom 31.08.2023, Tabelle
 * Private Zusatzversicherungen, Artikel vom 17.03.2018), ZVA-Presseinformation
 * 01/2026 (Durchschnittspreis), SGB V § 33 und Hilfsmittel-Richtlinie des G-BA
 * (Anspruch Erwachsene und Kinder), Verbraucherzentrale (Stand 11.06.2025),
 * TK-Satzung Stand 17.04.2026 (Anlage 4). Tarifaussagen wortgleich mit
 * src/components/sections/ambulant/ambulantFaqs.js, ambulant.json
 * (vorsorgeBaustein) und AmbulantConversionFlow.jsx (Töpfe je Stufe);
 * Beiträge nach src/data/sdkAmbulantBeitraege.js (Stand 29.09.2026), am
 * 07.10.2026 mit healio.de/ambulant abgeglichen (31,64 EUR für 21 bis 30,
 * 39,19 EUR für 31 bis 40 Jahre). Die 680 EUR sind eine gekennzeichnete
 * Rechenannahme und keine Aussage der Produktseite (Entscheidung der
 * Marktanalyse-Sitzung 07.10.2026); neutrale Einordnung: ZVA, rund 550 EUR
 * für eine komplette Brille, 16.01.2026.
 *
 * Faktenprüfung 07.10.2026 (PRÜFBERICHT-brille-vorsorge.md): Gesamtbild des
 * Tarifs ergänzt (lohnt sich, wenn mehrere Leistungen zusammenkommen, bis zu
 * 3.000 EUR in zwei Jahren als Tarifleistung), Stiftung Warentest mit
 * Jahreszahl 2018, Statusangabe in Faktenkasten und Fußzeile wie Zahn-Welle 1.
 *
 * Bewusste Grenzen:
 *   - Optiker-Policen und Zuschuss-Policen nur als Typ, ohne Anbieter, ohne
 *     Beitragszahl (neutral belegt ist keine allgemeine Euro-Angabe).
 *   - Die Rechnung mit 680 EUR, 24 Monaten und den Beiträgen ist eigene
 *     Rechnung und so gekennzeichnet. Sie zeigt ehrlich, dass sich weder der
 *     ambulante Tarif noch der Vorsorge-Baustein allein für die Brille rechnet.
 *   - Kein Nutzenversprechen für den Bonus, keine Aussage, ob Healio
 *     verdient, kein Anbietervergleich.
 *   - Keine Krebsvorsorge, deshalb kein Eintrag in die Ausschlusslisten.
 */

export const article = {
  slug: 'brillenversicherung',
  kind: 'ratgeber',
  group: 'brille',

  metaTitle: 'Brillenversicherung: lohnt sie sich? Rechenbeispiel | Healio',
  metaDescription:
    'Brillenversicherung vom Optiker, Zuschuss-Police oder ambulanter Tarif: was sie erstatten, was sie im Monat kosten und wann Selbstzahlen günstiger ist.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 7,

  listTitle: 'Brillenversicherung: lohnt sie sich? Beitrag, Erstattung und Selbstzahlung',
  listTeaser:
    'Welche Arten von Brillenversicherung es gibt, was der ambulante Tarif bei der Brille erstattet und wann Selbstzahlen die günstigere Rechnung ist.',

  headline: 'Brillenversicherung: lohnt sie sich? Beitrag, Erstattung und Selbstzahlung im Vergleich',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'glasses',
    tone: 'sky',
    facts: [
      { value: 'rund 550 EUR', label: 'kostet eine komplette Brille im Schnitt laut ZVA, Januar 2026' },
      { value: 'bis zu 500 EUR', label: 'alle zwei Jahre für Sehhilfen im Tarif Ambulant 100' },
      { value: '759,36 EUR', label: 'Beitrag in 24 Monaten, Ambulant 100, 21 bis 30 Jahre (gerechnet)' },
    ],
    text: 'Eine Versicherung nur für die Brille lohnt sich selten. Ein Tarif mit mehreren Töpfen kann passen, wenn du die anderen Leistungen auch nutzt.',
    path: { to: '/ambulant', text: 'Brille, Heilpraktiker, Vorsorge zusammen prüfen?', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Eine Versicherung nur für die Brille rechnet sich selten. Die Stiftung Warentest hielt sie 2018 für nicht lohnend und riet, das Geld lieber selbst anzusparen. Hier siehst du, welche Arten von Brillenversicherung es gibt, was der ambulante Tarif bei Sehhilfen erstattet und wie die Rechnung mit einem angenommenen Brillenpreis von 680 EUR ausgeht. Außerdem steht hier, wann sich ein Tarif trotzdem lohnt, nämlich wenn mehrere Leistungen zusammenkommen.',

  sections: [
    {
      id: 'arten',
      heading: 'Was ist eine Brillenversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Unter dem Namen laufen drei verschiedene Dinge. Optiker bieten beim Kauf Policen an, die Schäden an der Brille zumindest teilweise ausgleichen, etwa nach Bruch, Verlust oder Diebstahl. Bei einigen greift der Schutz auch, wenn sich die Sehstärke um mehr als 0,5 Dioptrien verändert. So beschreibt es die Stiftung Warentest (31.08.2023).',
        },
        {
          type: 'paragraph',
          text: 'Daneben gibt es Zuschuss-Policen für Brille oder Kontaktlinsen. Diese übernehmen laut Stiftung Warentest in der Regel einen Prozentsatz der Rechnung bis zu einem Höchstbetrag je Jahr. Und es gibt ambulante Zusatzversicherungen, bei denen die Sehhilfe eine Leistung unter mehreren ist, neben Heilpraktiker, Vorsorge und Zuzahlungen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Drei Arten von Brillenversicherung im Überblick',
          head: ['Art', 'Was sie zahlt', 'Worauf du achtest'],
          rows: [
            ['Schadenspolice vom Optiker', 'Schäden an der Brille, bei einigen auch bei einer Änderung der Sehstärke um mehr als 0,5 Dioptrien', 'Welche Schäden gedeckt sind und in welcher Höhe, steht in den Bedingungen'],
            ['Zuschuss-Police für Brille oder Kontaktlinsen', 'einen Prozentsatz der Rechnung bis zu einem Höchstbetrag je Jahr', 'Beitrag mal Laufzeit gegen den Höchstbetrag rechnen'],
            ['Ambulanter Tarif mit Sehhilfen-Topf', 'Brille und Kontaktlinsen bis zur Grenze des Topfs, daneben weitere Leistungen', 'Ob du die anderen Töpfe nutzt, entscheidet über die Rechnung'],
          ],
          note: 'Quelle: Stiftung Warentest, Brillenversicherung (31.08.2023) und Übersicht Private Zusatzversicherungen (Artikel vom 17.03.2018). Die Angebote unterscheiden sich laut Stiftung Warentest stark und sollten gut abgewogen werden.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Zahlt die Krankenkasse nicht schon etwas zur Brille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei Erwachsenen nur in Ausnahmen. Nach § 33 Abs. 2 SGB V besteht der Anspruch ab 18 Jahren bei einer schweren Sehbeeinträchtigung mindestens der Stufe 1 oder bei einem verordneten Fern-Korrekturausgleich von mehr als 6 Dioptrien bei Kurz- oder Weitsichtigkeit oder mehr als 4 Dioptrien bei Astigmatismus. Die Hilfsmittel-Richtlinie des G-BA nennt dafür die Werte 6,25 und 4,25 Dioptrien.',
        },
        {
          type: 'paragraph',
          text: 'Bis zur Vollendung des 18. Lebensjahres haben Versicherte Anspruch auf Sehhilfen. Das Brillengestell gehört nach dem Gesetz nie dazu. Alle Regeln mit Quellen stehen auf der Seite Brille und Krankenkasse.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Welche Gläser wann Kassenleistung sind, erklärt der Ratgeber ' },
            { text: 'Zahlt die Krankenkasse eine Brille?', to: '/ratgeber/brille-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'lohnt',
      heading: 'Lohnt sich eine Brillenversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für eine reine Brillenversicherung sagt die Stiftung Warentest in ihrer Übersicht von 2018 nein. Wer nur Brille oder Kontaktlinsen versichern will, sollte das Geld danach besser selbst für eine neue Brille ansparen. Der Grund: Das finanzielle Risiko ist in den meisten Fällen überschaubar.',
        },
        {
          type: 'paragraph',
          text: 'Die Rechnung dahinter ist einfach. Du nimmst den Beitrag mal Monate und stellst ihn der Erstattung gegenüber, dazu kommt dein Eigenanteil. Bei Schadenspolicen hängt es laut Stiftung Warentest vom Einzelfall ab, ob sie sich lohnen. Eine allgemeine Euro-Angabe für Beiträge gibt es in den neutralen Quellen nicht, sie unterscheiden sich je nach Police.',
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Was erstattet der ambulante Tarif bei der Brille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Im ambulanten Tarif ist die Sehhilfe einer von vier Töpfen. Dafür gibt es in jeder Tarifstufe einen eigenen Sehhilfen-Topf von 200 bis 500 EUR je zwei Kalenderjahre. Brille und Kontaktlinsen erstattet der Tarif in jeder Stufe zu 100 %, bis die Grenze des Topfs erreicht ist. In Ambulant 100 sind das bis zu 500 EUR alle zwei Jahre.',
        },
        {
          type: 'paragraph',
          text: 'Die anderen drei Töpfe in Ambulant 100 sind Naturheilverfahren mit 1.000 EUR, Vorsorge mit 500 EUR und gesetzliche Zuzahlungen mit 1.000 EUR, zusammen bis zu 3.000 EUR in zwei Jahren. Wie viel tatsächlich erstattet wird, hängt vom gewählten Tarif, den eingereichten Rechnungen und den Tarifbedingungen ab. Eine allgemeine Wartezeit gibt es nicht.',
        },
        {
          type: 'paragraph',
          text: 'Wer nur Vorsorge will, kann den Vorsorge-Baustein der UKV wählen. Brille und Kontaktlinsen sind dort ohne Verordnung mit drin, zu 80 % von bis zu 500 EUR, also bis 400 EUR in zwei Kalenderjahren. Der Baustein kostet ab 20 Jahren 13,45 EUR im Monat, wer eine Brille oder Kontaktlinsen trägt oder braucht, zahlt 4 EUR mehr, also 17,45 EUR. Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet.',
        },
      ],
    },
    {
      id: 'rechnung',
      heading: 'Wie rechnet sich das gegen Selbstzahlen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für das Beispiel nehmen wir eine Gleitsichtbrille für 680 EUR an. Das ist eine Rechenannahme, kein Durchschnittspreis. Der ZVA nennt für eine komplette Brille im Schnitt rund 550 EUR (16.01.2026), individuell gefertigte Gleitsichtbrillen liegen laut ZVA im höheren Preisbereich. Als Erwachsener ohne Anspruch auf eine Kassenleistung zahlst du die Brille allein. Der Tarif Ambulant 100 übernimmt bis zu 500 EUR. Dazu kommt der Beitrag über zwei Jahre, und genau den übersehen viele.',
        },
        {
          type: 'costCard',
          title: 'Brille für 680 EUR: Selbstzahlen oder Tarif?',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit Ambulant 100 (Sehhilfen bis zu 500 EUR alle zwei Jahre, Beitrag 31,64 EUR im Monat für 21 bis 30 Jahre) und mit dem Vorsorge-Baustein der UKV (Brille bis 400 EUR in zwei Kalenderjahren, 17,45 EUR im Monat ab 20 Jahren). Zeitraum 24 Monate, Brille einmal gekauft.',
          caption: 'Kostenkarte: Brille für 680 EUR ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Brille für 680 EUR, Erwachsene ohne Kassenanspruch', 'nichts', '680 EUR', 'Ambulant 100 erstattet bis zu 500 EUR, du zahlst 180 EUR'],
            ['Beitrag Ambulant 100 in 24 Monaten, 31,64 EUR im Monat', 'entfällt', 'entfällt', '759,36 EUR'],
            ['Insgesamt in zwei Jahren mit Ambulant 100', 'nichts', '680 EUR', '939,36 EUR'],
            ['Zum Vergleich: Vorsorge-Baustein mit Brille, 17,45 EUR im Monat', 'nichts', '680 EUR', '698,80 EUR, davon 418,80 EUR Beitrag und 280 EUR Eigenanteil'],
          ],
          note: 'Eigene Rechnung, keine Preisangabe: Die 680 EUR sind angenommen, gerechnet wird Beitrag mal 24 Monate plus Eigenanteil. SDK-Beitrag laut healio.de/ambulant (Stand 29.09.2026), UKV-Beitrag laut derselben Seite (gültig ab 01.05.2026), Erstattungsgrenzen nach den Tarifunterlagen. Wer die anderen Töpfe nutzt, rechnet anders, denn der Beitrag verteilt sich dann auf mehr Leistungen. Maßgeblich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Allein für die Brille gerechnet, kostet der Tarif in diesem Beispiel mehr als das Selbstzahlen. Mit Ambulant 100 sind es 259,36 EUR mehr, mit dem Baustein 18,80 EUR mehr (eigene Rechnung). Das ist die ehrliche Antwort auf die Frage der Überschrift.',
        },
      ],
    },
    {
      id: 'wann-doch',
      heading: 'Wann passt ein Tarif trotzdem?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wenn die Brille nur ein Posten unter mehreren ist. Der ambulante Tarif lohnt sich, wenn mehrere Leistungen zusammenkommen, also Heilpraktiker, Vorsorge und Sehhilfen, dazu gesetzliche Zuzahlungen. Ambulant 100 erstattet dafür bis zu 3.000 EUR in zwei Jahren, verteilt auf vier Töpfe. Dem steht für 21 bis 30 Jahre ein Beitrag von 759,36 EUR in 24 Monaten gegenüber (eigene Rechnung, 24 mal 31,64 EUR). Erstattet dir der Tarif in zwei Jahren mehr als diesen Betrag, hast du mehr zurückbekommen, als du an Beitrag gezahlt hast. Beginnt dein Vertrag im Laufe des Jahres, ist der erste Zeitraum der Töpfe kürzer.',
        },
        {
          type: 'paragraph',
          text: 'Alle Beiträge sind altersabhängig, für 31 bis 40 Jahre sind es in Ambulant 100 39,19 EUR im Monat (SDK-Beiträge, Stand 29.09.2026). Ein Kassenbonus kann den Beitrag ganz oder teilweise ausgleichen. Entscheidend sind deine Krankenkasse, deine nachgewiesenen Aktivitäten, der gewählte Tarif und die Bonusbedingungen. Bei der TK stehen Brillengläser und Kontaktlinsen im Katalog der Gesundheitsdividende (Satzung, Anlage 4, Stand 17.04.2026).',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'glasses',
          text: 'Du willst wissen, was der ambulante Tarif für dein Alter im Monat kostet und was er bei Brille, Heilpraktiker und Vorsorge erstattet?',
          label: 'Ambulanten Tarif ansehen',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Nur für die Brille lohnt sich der Tarif selten.', text: 'Das sagte die Stiftung Warentest 2018 für reine Brillenversicherungen, und die Karte oben zeigt es auch: Mit Ambulant 100 liegen Beitrag und Eigenanteil über dem Selbstzahlen, beim Vorsorge-Baustein ist der Abstand klein.' },
            { lead: 'Die Brille ist hier ein Topf unter vier.', text: 'Der ambulante Tarif ist keine Brillenversicherung. Er erstattet Rechnungen für Sehhilfen bis zur Grenze des Topfs, daneben Naturheilverfahren, Vorsorge und Zuzahlungen. Er lohnt sich, wenn mehrere Leistungen zusammenkommen, etwa Heilpraktiker, Vorsorge und Sehhilfen. In Ambulant 100 sind es zusammen bis zu 3.000 EUR in zwei Jahren als Tarifleistung.' },
            { lead: 'Dein Alter bestimmt den Beitrag.', text: 'Die Beispielbeträge gelten für die genannten Altersgruppen. Bei Vorerkrankungen kann ein Risikozuschlag dazukommen. Deinen Beitrag siehst du im Tarifrechner, bevor du einen Antrag stellst.' },
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
              text: 'Wann die Kasse Gläser zahlt, ab wie vielen Dioptrien und was für Kinder gilt.',
              to: '/ratgeber/brille-krankenkasse',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'comparison',
              tone: 'mint',
              title: 'Gleitsichtbrille: Kosten und Erstattung',
              text: 'Wovon der Preis abhängt und was davon bei dir bleibt.',
              to: '/ratgeber/gleitsichtbrille-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'prevention',
              tone: 'lavender',
              title: 'Vorsorgeuntersuchungen',
              text: 'Was die Kasse in welchem Alter zahlt, auch für den Vorsorge-Baustein wichtig.',
              to: '/ratgeber/vorsorgeuntersuchung',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'Kassenbonus und Zusatzversicherung',
              text: 'Wie der Bonus der Kasse den Beitrag mittragen kann.',
              to: '/ratgeber/krankenkassen-bonus-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Brille, Heilpraktiker und Vorsorge zeigt Healio den ambulanten Tarif der SDK und als kleine Zusatzoption den Vorsorge-Baustein der UKV. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Lohnt sich eine Brillenversicherung?',
      answer:
        'Für eine Versicherung nur für Brille oder Kontaktlinsen sagte die Stiftung Warentest 2018 nein und riet, das Geld selbst anzusparen. Bei Schadenspolicen vom Optiker hängt es laut Stiftung Warentest vom Einzelfall ab. Ein ambulanter Tarif lohnt sich, wenn mehrere Leistungen zusammenkommen, etwa Heilpraktiker, Vorsorge und Brille. Ambulant 100 erstattet dafür bis zu 3.000 EUR in zwei Jahren.',
    },
    {
      question: 'Was kostet eine Brillenversicherung im Monat?',
      answer:
        'Eine neutrale Preisangabe für alle Brillenversicherungen gibt es nicht, die Beiträge unterscheiden sich je nach Police. Rechne Beitrag mal Monate gegen die Leistung. Zum Vergleich: Ambulant 100 kostet laut healio.de/ambulant für 21 bis 30 Jahre 31,64 EUR im Monat (Stand 29.09.2026), der Vorsorge-Baustein der UKV mit Brille 17,45 EUR ab 20 Jahren.',
    },
    {
      question: 'Was erstattet der ambulante Tarif bei der Brille?',
      answer:
        'Jede Tarifstufe hat einen eigenen Sehhilfen-Topf von 200 bis 500 EUR je zwei Kalenderjahre. Brille und Kontaktlinsen erstattet der Tarif in jeder Stufe zu 100 %, bis die Grenze des Topfs erreicht ist. In Ambulant 100 sind es bis zu 500 EUR.',
    },
    {
      question: 'Gibt es eine Wartezeit?',
      answer:
        'Im ambulanten Tarif gibt es keine allgemeine Wartezeit. Versicherungsschutz besteht für neue Versicherungsfälle ab dem vereinbarten Beginn im Rahmen der Tarifbedingungen. Behandlungen, die vor Beginn schon laufen oder angeraten sind, bleiben ausgenommen.',
    },
    {
      question: 'Kann ich meine Brille mit dem Kassenbonus mitfinanzieren?',
      answer:
        'Das regelt die Satzung deiner Kasse. Bei der TK stehen Brillengläser und Kontaktlinsen im Katalog der Gesundheitsdividende (Satzung, Anlage 4). Bei anderen Kassen schaust du in die Bonusbedingungen. Gezahlt wird höchstens bis zur Höhe deiner nachgewiesenen Kosten.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Wie viel die Kasse bei der Brille zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahlt die Krankenkasse eine Brille?', to: '/ratgeber/brille-krankenkasse' },
      { text: '. Was ein ambulanter Tarif für dich im Monat kostet und was er bei Brille, Heilpraktiker und Vorsorge erstattet, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Aussagen zu Policen, Kassenanspruch und Preisen stammen aus diesen Quellen, die Tarifangaben aus den Unterlagen auf healio.de/ambulant.',
    items: [
      {
        label: 'Brillenversicherung: Policen der Optikerketten, braucht man die?',
        publisher: 'Stiftung Warentest',
        href: 'https://www.test.de/Brillenversicherung-6030065-0/',
        stand: '31.08.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Private Zusatzversicherungen: Was sie zahlen, wer sie braucht, wie wichtig sie sind',
        publisher: 'Stiftung Warentest',
        href: 'https://www.test.de/Zusatzversicherungen-Sinnvoll-ist-nur-die-Haelfte-5294645-5294652/',
        stand: 'Artikel vom 17.03.2018',
        accessedAt: '07.10.2026',
        note: 'Älterer Stand, die Aussage zur reinen Brillenversicherung ist grundsätzlicher Art',
      },
      {
        label: 'Augenoptikbranche 2025/2026: Verhaltene Entwicklung (Presseinformation 01/2026)',
        publisher: 'Zentralverband der Augenoptiker und Optometristen (ZVA)',
        href: 'https://www.zva.de/wp-content/uploads/01-26_Branchenentwicklung-Augenoptik-2025-26_Opti.pdf',
        stand: '16.01.2026',
        accessedAt: '07.10.2026',
        note: 'Branchenverband, Durchschnittswert über alle kompletten Korrektionsbrillen',
      },
      {
        label: 'SGB V § 33 Hilfsmittel, Absatz 2 (Sehhilfen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__33.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Hilfsmittel-Richtlinie, Abschnitt B Sehhilfen, § 12',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-3815/HilfsM-RL_2025-02-20_iK-2025-05-16.pdf',
        stand: 'geändert 20.02.2025, in Kraft seit 16.05.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Neue Brille? Krankenkasse zahlt nur in Ausnahmefällen',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/neue-brille-krankenkasse-zahlt-nur-in-ausnahmefaellen-13686',
        stand: '11.06.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der Techniker Krankenkasse, Anlage 4 (Leistungskatalog der TK-Gesundheitsdividende)',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/tk/unternehmen-und-karriere/ueber-die-tk/satzung-der-tk/149038',
        stand: 'Stand 17.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen SDK Ambulant und UKV Vorsorge-Baustein, wie auf healio.de/ambulant',
        publisher: 'SDK und UKV',
        stand: '07.10.2026',
        note: 'Beiträge der SDK nach der Beitragstabelle vom 29.09.2026, Beiträge der UKV gültig ab 01.05.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
