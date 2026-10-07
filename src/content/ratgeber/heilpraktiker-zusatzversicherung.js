/**
 * Ambulant-Ratgeber Welle A: Heilpraktiker-Zusatzversicherung, Kriterien ohne
 * Sieger, Gesundheitsfragen im Antrag und der Stand "was schon läuft, zählt
 * nicht".
 *
 * Quellen (Abruf 07.10.2026, Belege in heilpraktiker-zusatzversicherung.belege.md):
 * SDK AVB Teil II AP-Tarife 1.753a (Stand 01.01.2023), SDK AVB Teil I
 * Allgemeiner Teil 1.751 (Stand 01.01.2022), Verbraucherzentrale
 * (Zusatzversicherungen, Stand 19.08.2025), § 19 VVG, § 15 SGB V.
 * Tarifaussagen wortgleich mit dem Inhalt von /ambulant (Vier Töpfe,
 * Ambulant 50, 70, 90 und 100, Beitrag Altersgruppe 21 bis 30 aus
 * src/data/sdkAmbulantBeitraege.js, Stand 29.09.2026).
 *
 * Bewusste Grenzen:
 *   - Keine Rangliste, kein Anbietervergleich: Die Seite nennt Kriterien und
 *     zeigt als Beispiel nur den Tarif, den Healio auf /ambulant vermittelt.
 *   - Keine Zahl zu Risikozuschlägen. Die Bedingungen nennen sie nur als
 *     Möglichkeit (Zuschlag oder Ausschluss), eine Höhe steht dort nicht.
 *   - Das Rechenbeispiel arbeitet mit angenommenen Preisen und ist als eigene
 *     Rechnung gekennzeichnet. Eine neutrale Durchschnittsangabe für
 *     Heilpraktikerrechnungen gibt es nicht.
 *   - Keine Aussage zur Wirkung einer Behandlung und keine Behandlungsempfehlung.
 *   - Die Gesundheitsfragen stehen ohne Sperrformulierung als das, was sie
 *     sind: ein Teil des Antrags, der wahrheitsgemäß zu beantworten ist.
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): Status in Faktenkasten und
 * Fußzeile wie Zahn-Welle 1; Tarifaussagen gegen healio.de/ambulant, die Dateien
 * im Serien-Worktree und die SDK-AVB gelesen.
 *   - Einbau 07.10.2026: H1 gekürzt (vorher "... und wo ihre Grenzen liegen"),
 *     damit der Kurzantwort-Weg bei 390 px im ersten Bildschirm liegt (vorher
 *     872 px Unterkante).
 */

export const article = {
  slug: 'heilpraktiker-zusatzversicherung',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Heilpraktiker Zusatzversicherung: worauf es ankommt | Healio',
  metaDescription:
    'Heilpraktiker Zusatzversicherung im Check: Kriterien statt Rangliste, was die Bedingungen erstatten, Gesundheitsfragen im Antrag und was schon läuft.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Heilpraktiker-Zusatzversicherung: Kriterien, Grenzen und ein Rechenbeispiel',
  listTeaser:
    'Was eine Heilpraktiker-Zusatzversicherung erstattet, woran du sie prüfst und was ehrlich zu den Gesundheitsfragen im Antrag und zu bestehenden Beschwerden gehört.',

  headline: 'Heilpraktiker Zusatzversicherung: worauf es ankommt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'naturopathy',
    facts: [
      { value: 'bis zu 1.000 EUR', label: 'für Naturheilverfahren in zwei Jahren (Ambulant 100)' },
      { value: 'Gesundheitsfragen', label: 'gehören zum Antrag und müssen vollständig stimmen' },
      { value: 'Was läuft, zählt nicht', label: 'Behandlungen vor Versicherungsbeginn sind nicht versichert' },
    ],
    text: 'Die gesetzliche Kasse zahlt Heilpraktiker in der Regel nicht. Ein Zusatztarif erstattet nach seinen Bedingungen, mit Höchstbetrag, Erstattungssatz und Regeln zu bestehenden Beschwerden.',
    path: { to: '/ambulant', text: 'Heilpraktiker, Brille, Vorsorge?', label: 'Tarifstufen und Beitrag ansehen' },
  },

  lead:
    'Eine Heilpraktiker-Zusatzversicherung erstattet nach ihren Bedingungen einen Teil deiner Heilpraktikerrechnung, denn die gesetzliche Kasse zahlt sie in der Regel nicht. Wie viel das ist, wofür und ab wann, regeln die Tarifbedingungen. Eine Rangliste mit einem Sieger gibt es hier nicht, weil sie bei diesem Thema in die Irre führt. Du bekommst stattdessen Kriterien, ein Rechenbeispiel und die Grenzen, die du vor dem Antrag kennen solltest.',

  sections: [
    {
      id: 'was-zahlt',
      heading: 'Was zahlt eine Heilpraktiker-Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Tarif zahlt einen Teil der Rechnung, den die Bedingungen als erstattungsfähig einstufen. Die gesetzliche Krankenkasse übernimmt Heilpraktikerbehandlungen dagegen in der Regel nicht. Ärztliche Behandlung wird nach § 15 SGB V von Ärzten erbracht, und die Verbraucherzentrale schreibt etwa zur Akupunktur, dass Sitzungen beim Heilpraktiker aus eigener Tasche zu zahlen sind. Einzelne Kassen zahlen nach ihrer Satzung Zuschüsse in angrenzenden Bereichen, etwa für Osteopathie oder für naturheilkundliche Arzneimittel auf ärztliches Privatrezept.',
        },
        {
          type: 'paragraph',
          text: 'Wie ein Zusatztarif das ausgestaltet, zeigt der ambulante Tarif der SDK, den Healio auf der Seite Ambulant vermittelt. Er versichert Naturheilverfahren und Behandlungen durch Heilpraktiker, wenn die Heilpraktikerin oder der Heilpraktiker die Anforderungen des Heilpraktikergesetzes erfüllt und nach dem Gebührenverzeichnis für Heilpraktiker (GebüH) abrechnet. Erstattet werden alle Leistungen, die im aktuellen GebüH stehen. Als Naturheilverfahren gelten die Verfahren nach dem Hufelandverzeichnis in der jeweils gültigen Fassung. Ausgenommen ist Psychotherapie durch Heilpraktiker.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Topf Naturheilverfahren der SDK-Tarife AP5 bis AP1 und Beitrag der Altersgruppe 21 bis 30',
          head: ['Stufe', 'Erstattung', 'Naturheilverfahren in zwei Kalenderjahren', 'Beitrag im Monat, 21 bis 30 Jahre'],
          rows: [
            ['Ambulant 50 (AP5)', '50 Prozent', 'bis 500 EUR', '10,36 EUR'],
            ['Ambulant 70 (AP7)', '70 Prozent', 'bis 700 EUR', '15,82 EUR'],
            ['Ambulant 90 (AP9)', '90 Prozent', 'bis 900 EUR', '27,44 EUR'],
            ['Ambulant 100 (AP1)', '100 Prozent', 'bis 1.000 EUR', '31,64 EUR'],
          ],
          note: 'Quelle: SDK, Allgemeine Versicherungsbedingungen Teil II, Tarife AP5, AP7, AP9 und AP1, Stand 01.01.2023, Abschnitt I.5. Die Zeiträume zählen ab Versicherungsbeginn. Die Beiträge hängen vom Alter ab, die Tabelle zeigt die Gruppe 21 bis 30 Jahre. Beiträge der SDK-Tarife, Stand 29.09.2026, wortgleich mit healio.de/ambulant. Die Beiträge ersetzen kein persönliches Angebot, deinen Beitrag siehst du im Tarifrechner auf der Seite Ambulant.',
        },
        {
          type: 'paragraph',
          text: 'Der Topf für Naturheilverfahren ist einer von vier. In der höchsten Stufe kommen Sehhilfen (bis 500 EUR), Vorsorge (bis 500 EUR) und gesetzliche Zuzahlungen (bis 1.000 EUR) hinzu, zusammen bis zu 3.000 EUR in zwei Jahren. Mehr als die Rechnung zahlt der Tarif nie.',
        },
      ],
    },
    {
      id: 'kriterien',
      heading: 'Woran erkennst du eine passende Heilpraktiker-Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nicht an einem Preis allein und nicht an einer „besten“ Liste. Zwei Tarife mit gleichem Erstattungssatz können sehr unterschiedlich zahlen, wenn Höchstbetrag, Behandlerkreis und Annahmeregeln abweichen. Die Verbraucherzentrale nennt unter anderem Wartezeiten, begrenzte Leistungen in den ersten Versicherungsjahren und dauerhafte Höchstbeträge als Punkte, auf die du achten solltest. Prüf deshalb diese Kriterien, eines nach dem anderen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Kriterien für eine Heilpraktiker-Zusatzversicherung und was bei den SDK-Bedingungen dazu steht',
          head: ['Kriterium', 'Was du in den Bedingungen suchst', 'So sieht es bei den SDK-Tarifen aus'],
          rows: [
            ['Behandler und Verfahren', 'Welche Heilpraktiker, welche Methoden, welche Ausnahmen', 'Heilpraktiker nach Heilpraktikergesetz, Abrechnung nach GebüH, Verfahren nach Hufelandverzeichnis, Psychotherapie ausgenommen'],
            ['Erstattungssatz', 'Prozent wovon: von der Rechnung oder nur vom erstattungsfähigen Teil', '50 bis 100 Prozent der erstattungsfähigen Kosten, je nach Stufe'],
            ['Höchstbetrag und Zeitraum', 'Euro je Jahr oder je zwei Jahre, gemeinsamer Topf oder je Leistung', '500 bis 1.000 EUR je zwei Kalenderjahre ab Versicherungsbeginn'],
            ['Anlaufstaffel', 'Gilt in den ersten Jahren eine niedrigere Grenze', 'Für Naturheilverfahren nennen die Bedingungen keine Staffel, die Zwei-Jahres-Zeiträume zählen ab Versicherungsbeginn'],
            ['Wartezeit', 'Ab wann der Tarif zahlt', 'Die Tarifbedingungen sehen keine Wartezeiten vor'],
            ['Mehrere Kostenträger', 'Wie Kassenzuschuss oder andere Versicherungen angerechnet werden', 'Die gesamte Erstattung darf nicht höher sein als die gesamten Kosten'],
            ['Annahme', 'Gesundheitsfragen, Zuschlag, Ausschluss', 'Gesundheitsprüfung vor Vertragsbeginn, Risikozuschlag oder Leistungsausschluss möglich'],
            ['Laufzeit und Beitrag', 'Kündigungsfrist, Beitragsanpassung, Beitrag nach Alter', 'Versicherungsjahr 1. Juli bis 30. Juni, Kündigung mit 3 Monaten Frist zum Ende des Versicherungsjahres, Beitrag nach erreichtem Alter, Anpassungen möglich'],
          ],
          note: 'Quellen: SDK, Allgemeine Versicherungsbedingungen Teil I (Stand 01.01.2022), Abschnitte A.4, A.8 und D.1, und Teil II (Stand 01.01.2023), Abschnitte I.5, II und III. Die Spalte zu den SDK-Tarifen ist ein Beispiel für die Prüfung, kein Vergleich mit anderen Anbietern.',
        },
        {
          type: 'paragraph',
          text: 'Lies außerdem, wie der Versicherer den Begriff Naturheilverfahren abgrenzt. Die SDK trennt im Glossar zwischen klassischen Naturheilverfahren und sogenannten Außenseiterverfahren, die sie als wissenschaftlich nicht anerkannt beschreibt. Ob deine Methode erstattet wird, entscheidet am Ende der Versicherer nach seinen Bedingungen.',
        },
      ],
    },
    {
      id: 'gesundheitsfragen',
      heading: 'Warum sind die Gesundheitsfragen im Antrag so wichtig?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Antrag enthält Gesundheitsfragen, und du beantwortest sie vollständig und wahrheitsgemäß. Das ist keine Formalie: Nach § 19 VVG musst du gefahrerhebliche Umstände anzeigen, nach denen der Versicherer in Textform gefragt hat. Wer das verletzt, riskiert Rücktritt oder Kündigung, und im schlimmsten Fall steht die Leistung später infrage.',
        },
        {
          type: 'paragraph',
          text: 'Was nach den Antworten passiert, regeln die Bedingungen. Die SDK führt vor Vertragsbeginn eine Gesundheitsprüfung durch. Laut den Angaben auf der Seite Ambulant wirst du grundsätzlich nicht abgelehnt, auch nicht mit Vorerkrankungen. Je nach Angaben kann aber ein Risikozuschlag auf den Beitrag dazukommen, in Einzelfällen auch ein Leistungsausschluss für eine bestimmte Erkrankung. Einen Leistungsausschluss vereinbart die SDK nach ihrer Definition zum Beispiel dann, wenn erhebliche Erkrankungen schon vor Versicherungsbeginn bestehen.',
        },
        {
          type: 'paragraph',
          text: 'Für dich heißt das: Dein Gesundheitszustand entscheidet mit darüber, was du zahlst und was versichert ist. Was bei Versicherungsbeginn schon behandelt wird oder angeraten ist, bleibt laut der Seite Ambulant ausgenommen. Für genau diese Beschwerde hilft ein neuer Vertrag also nicht weiter.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'naturopathy',
          text: 'Du siehst die Tarifstufen und deinen Beitrag, bevor du irgendetwas beantragst.',
          label: 'Tarifstufen ansehen',
        },
      ],
    },
    {
      id: 'bestehende-beschwerden',
      heading: 'Ist eine bestehende Beschwerde automatisch mitversichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Nach den Allgemeinen Bedingungen der SDK leistet der Versicherer nicht für Versicherungsfälle, die vor Beginn des Versicherungsschutzes eingetreten sind. Für Versicherungsfälle nach Vertragsabschluss zahlt er die Kosten, die ab dem Versicherungsbeginn entstanden sind.',
        },
        {
          type: 'paragraph',
          text: 'Ein Versicherungsfall ist die medizinisch notwendige Heilbehandlung wegen einer Krankheit oder der Folgen eines Unfalls. Er beginnt mit der Heilbehandlung und endet, wenn nach medizinischem Befund keine Behandlungsbedürftigkeit mehr besteht. Eine Behandlung, die schon vor dem Vertrag lief und weiterläuft, beginnt deshalb nicht neu. Auf der Seite Ambulant heißt es entsprechend, dass Behandlungen, die vor Beginn schon laufen oder angeraten sind, ausgenommen bleiben. Im Einzelfall entscheidet der Versicherer, frag deshalb vor dem Abschluss nach.',
        },
        {
          type: 'list',
          items: [
            'Eine neue Beschwerde, die erst nach dem Versicherungsbeginn auftritt, kann versichert sein.',
            'Eine Behandlung, die vor dem Beginn schon lief oder angeraten war, ist nicht versichert, auch wenn du sie später fortsetzt.',
            'Bei erheblichen Erkrankungen vor dem Beginn kann der Versicherer die Leistung dafür ausschließen.',
            'Der Abschluss gehört deshalb vor die Behandlung, nicht mittendrin.',
          ],
        },
      ],
    },
    {
      id: 'lohnt-sich',
      heading: 'Lohnt sich eine Heilpraktiker-Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt davon ab, wie viel du tatsächlich beim Heilpraktiker ausgibst, was die übrigen drei Töpfe für dich bedeuten und wie viel von deinem Beitrag ein Kassenbonus tragen kann. Die Karte unten rechnet ein Beispiel durch, damit du die Größenordnung siehst. Die Preise sind angenommen, deine Praxis nennt dir ihre eigenen.',
        },
        {
          type: 'costCard',
          title: 'Heilpraktikerrechnung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: Heilpraktikerrechnung mit und ohne Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['8 Sitzungen, angenommen 80 EUR je Sitzung (640 EUR)', 'meist nichts', '640 EUR', 'Der Tarif erstattet bis zu 640 EUR, soweit die Rechnung erstattungsfähig ist'],
            ['Längere Serie, angenommen 1.400 EUR', 'meist nichts', '1.400 EUR', 'Höchstens 1.000 EUR in zwei Kalenderjahren, die übrigen 400 EUR trägst du'],
            ['Beitrag Ambulant 100 über zwei Jahre, 21 bis 30 Jahre (31,64 EUR im Monat)', 'nicht betroffen', 'nichts', '759,36 EUR Beitrag, den ein Kassenbonus teilweise mittragen kann'],
            ['Behandlung schon vor dem Versicherungsbeginn gestartet', 'meist nichts', 'die ganze Rechnung', 'Nicht versichert, wenn der Versicherungsfall vor dem Beginn eingetreten ist'],
          ],
          note: 'Rechenbeispiel mit angenommenen Preisen, keine Preisangabe und kein Durchschnitt. Eigene Rechnung: 31,64 EUR mal 12 Monate mal 2 Jahre ergibt 759,36 EUR. Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant (Stand 29.09.2026). Was erstattungsfähig ist, steht in den Bedingungen, verbindlich ist die Entscheidung des Versicherers.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Das Beispiel zeigt etwas, das in vielen Vergleichen fehlt: Wenn du nur Heilpraktikerkosten im Blick hast, kann der Beitrag über zwei Jahre höher liegen als das, was der Topf zurückgibt. Anders sieht die Rechnung aus, wenn du auch Brille, Vorsorge oder gesetzliche Zuzahlungen nutzt und ein Bonus einen Teil des Beitrags trägt. Dann gehört alles zusammen auf den Tisch.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Eine Rangliste würde dich in die Irre führen.', text: 'Ob ein Tarif passt, hängt an Behandlern, Höchstbeträgen, Annahme und deinem Alter. Darum stehen hier Kriterien statt eines Siegers.' },
            { lead: 'Die Gesundheitsfragen sind Teil des Vertrags.', text: 'Falsche oder unvollständige Antworten können Rücktritt oder Kündigung nach sich ziehen. Wer ehrlich antwortet, kann einen Zuschlag oder Ausschluss bekommen, aber eine verlässliche Grundlage.' },
            { lead: 'Was vorher lief, zählt nicht.', text: 'Behandlungen vor dem Versicherungsbeginn sind nicht versichert, und erhebliche Vorerkrankungen kann der Versicherer ausschließen.' },
            { lead: 'Der Versicherer prüft die Methode.', text: 'Er leistet für Methoden, die von der Schulmedizin überwiegend anerkannt sind. Dazu kommen Methoden, die sich in der Praxis als ebenso erfolgversprechend bewährt haben oder angewandt werden, weil es keine schulmedizinische gibt. Bei den bewährten darf er auf den Betrag kürzen, der bei schulmedizinischer Behandlung angefallen wäre. Dieser Ratgeber sagt nichts zur Wirkung einer Behandlung.' },
          ],
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft die Erstattung ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du zahlst die Rechnung zunächst selbst und reichst sie danach ein. Der Versicherer leistet erst, wenn die geforderten Nachweise vorliegen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zur Erstattung',
          items: [
            {
              title: 'Rechnung nach GebüH',
              text: 'Die Rechnung nennt deinen Namen, die Krankheit, die erbrachten Leistungen mit den Nummern des Gebührenverzeichnisses und das Behandlungsdatum.',
            },
            {
              title: 'Rechnung einreichen',
              text: 'Du schickst die Rechnung im Original ein, auch in elektronischer Form. Hat schon ein anderer Kostenträger gezahlt, reicht eine Kopie mit dessen Erstattungsnachweis.',
            },
            {
              title: 'Versicherer prüft und zahlt',
              text: 'Er stellt fest, ob und in welcher Höhe er leisten muss. Er erstattet nach Erstattungssatz und bis zum Höchstbetrag des Topfs.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wie die Rechnung aufgebaut ist und was das Gebührenverzeichnis überhaupt ist, erklärt der Ratgeber zur Gebührenordnung für Heilpraktiker.',
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
              text: 'Alle Bereiche auf einer Seite: Heilpraktiker, Osteopathie, Akupunktur und mehr.',
              to: '/ratgeber/heilpraktiker-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'Gebührenordnung für Heilpraktiker',
              text: 'Warum das GebüH kein Preisgesetz ist und was auf der Rechnung steht.',
              to: '/ratgeber/gebuehrenordnung-heilpraktiker',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'ambulant',
              tone: 'sky',
              title: 'Ambulante Zusatzversicherung',
              text: 'Was die vier Töpfe zusammen leisten und für wen sie sich eignen.',
              to: '/ratgeber/ambulante-zusatzversicherung',
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
      question: 'Was zahlt eine Heilpraktiker-Zusatzversicherung?',
      answer:
        'Eine Heilpraktiker-Zusatzversicherung erstattet einen Teil der Heilpraktikerrechnung nach ihren Bedingungen. Bei den ambulanten SDK-Tarifen sind das 50 bis 100 Prozent der erstattungsfähigen Kosten für Naturheilverfahren, höchstens 500 bis 1.000 EUR in zwei Kalenderjahren, je nach Stufe. Heilpraktiker müssen nach dem GebüH abrechnen, Psychotherapie ist ausgenommen.',
    },
    {
      question: 'Welche Heilpraktiker-Zusatzversicherung ist die beste?',
      answer:
        'Eine allgemeingültig beste gibt es nicht. Entscheidend sind Behandlerkreis, Erstattungssatz, Höchstbetrag und Zeitraum, Wartezeit, Annahmeregeln und Beitrag. Vergleiche diese Punkte mit deiner geplanten Nutzung und prüfe, was nach den Bedingungen erstattungsfähig ist.',
    },
    {
      question: 'Muss ich Gesundheitsfragen beantworten?',
      answer:
        'Ja. Der Antrag enthält Gesundheitsfragen, die du vollständig und wahrheitsgemäß beantwortest (§ 19 VVG). Bei der SDK wirst du laut Angaben auf der Seite Ambulant grundsätzlich nicht abgelehnt, je nach Angaben kann aber ein Risikozuschlag oder ein Leistungsausschluss für eine Erkrankung dazukommen.',
    },
    {
      question: 'Ist eine laufende Behandlung beim Heilpraktiker versichert?',
      answer:
        'Nein, nicht für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind. Der Versicherer zahlt für neue Versicherungsfälle die Kosten ab dem Versicherungsbeginn. Wenn du schon in Behandlung bist, frag vor dem Abschluss nach, wie dein Fall eingeordnet wird.',
    },
    {
      question: 'Gibt es eine Wartezeit?',
      answer:
        'Bei den ambulanten SDK-Tarifen sehen die Bedingungen keine Wartezeiten vor. Das ist nicht überall so. Die Verbraucherzentrale nennt drei Monate als übliche Wartezeit bei Zusatzversicherungen, bei Zahnersatz in der Regel acht Monate.',
    },
    {
      question: 'Zahlt der Tarif auch Psychotherapie beim Heilpraktiker?',
      answer:
        'Nein. Die Bedingungen der ambulanten SDK-Tarife nehmen Psychotherapie durch Heilpraktiker ausdrücklich von der Erstattung aus.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Sieh dir die Tarifstufen und deinen Beitrag auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ' an, bevor du einen Antrag stellst. Wie das Gebührenverzeichnis und die Rechnung zusammenhängen, steht im Ratgeber ' },
      { text: 'Gebührenordnung für Heilpraktiker', to: '/ratgeber/gebuehrenordnung-heilpraktiker' },
      { text: '. Einen Überblick über alle Kostenfragen rund um Heilpraktiker gibt die Seite ' },
      { text: 'Heilpraktiker Kosten', to: '/ratgeber/heilpraktiker-kosten' },
      { text: ', und welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Tarifaussagen stammen aus den Bedingungen der SDK, die Rechtslage aus den Gesetzen, die Hinweise zu Wartezeiten und Leistungsgrenzen von der Verbraucherzentrale.',
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
        label: 'Akupunktur: Wann zahlt die Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/akupunktur-wann-zahlt-die-krankenkasse-12462',
        stand: '04.06.2024',
        accessedAt: '07.10.2026',
        note: 'Hinweis, dass Akupunktursitzungen beim Heilpraktiker selbst zu zahlen sind',
      },
      {
        label: 'VVG § 19 Anzeigepflicht',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 15 Ärztliche Behandlung, elektronische Gesundheitskarte',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__15.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Beitragstabelle und Tarifstufen der ambulanten SDK-Tarife, wie auf healio.de/ambulant',
        publisher: 'SDK und Healio',
        stand: '29.09.2026',
        note: 'Leistungen wortgleich mit der Seite healio.de/ambulant',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen nach dem Stand der genannten Bedingungen vom 7. Oktober 2026. Maßgeblich sind immer dein Antrag, der Versicherungsschein und die Bedingungen des Versicherers.',
};

export default article;
