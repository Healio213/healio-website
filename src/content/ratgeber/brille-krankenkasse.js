/**
 * Ratgeber-Serie, Feld Brille (group 'brille'), Bereichsseite:
 * Zahlt die Krankenkasse eine Brille? (Slug brille-krankenkasse).
 * Hauptbegriff "zahlt die krankenkasse eine brille", Angebotspfad /ambulant.
 *
 * Quellen (Belege: brille-krankenkasse.belege.md, Abruf 07.10.2026):
 * SGB V § 33 (Anspruch, Gestell, Kontaktlinsen, Neuversorgung ab 14,
 * Zuzahlung), G-BA Hilfsmittel-Richtlinie Abschnitt B (§§ 12 bis 15:
 * Verordnungsfähigkeit, Visus- und Dioptrien-Werte, Kunststoffgläser bei
 * Kindern, nicht verordnungsfähige Posten, Kontaktlinsen-Indikationen),
 * Verbraucherzentrale (Stand 11.06.2025), GKV-Spitzenverband (Festbeträge
 * aufgehoben zum 01.03.2025), Satzungen der Kassen (Fundstellen in der
 * Tabelle, Datei GKV-Vergleichskampagne/website/app/satzungs-leistungen.server.ts)
 * und TK-Satzung Stand 17.04.2026 (selbst gelesen). Tarifaussagen wortgleich
 * mit ambulantFaqs.js und der Produktseite /ambulant.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Betrage der Kassen für Gläser: Die Verträge mit den Optikern
 *     sind laut Verbraucherzentrale nicht öffentlich, Festbeträge gibt es seit
 *     dem 01.03.2025 nicht mehr. Die Seite sagt, wovon der Betrag abhängt.
 *   - Satzungszuschüsse nur als Beispiele mit Fundstelle, keine Aussage über
 *     alle Kassen. Maßgeblich ist die Satzung der eigenen Kasse.
 *   - 680 EUR sind eine gekennzeichnete Rechenannahme, keine Aussage der
 *     Produktseite (Entscheidung Marktanalyse-Sitzung 07.10.2026), die Summen
 *     sind eigene Rechnung.
 *   - Satzungstabelle gegen KassenBoost geprüft (satzungs-leistungen.server.ts,
 *     erhoben 26.08.2026: 4 von 39 Kassen mit Zuschuss, 35 ohne); im Text
 *     "Satzungen ausgewertet im August 2026". Stichprobe kkh.de (Sportbrille
 *     50 EUR einmalig ab 18) am 07.10.2026 deckungsgleich.
 *   - Zuzahlung heute 10 Prozent, mindestens 5, höchstens 10 EUR; ab
 *     01.01.2027 mindestens 7,50 und höchstens 15 EUR (BGBl. 2026 I Nr. 228,
 *     Art. 1 Nr. 23, Art. 8 Abs. 2), im Text angekündigt.
 *   - Faktenprüfung 07.10.2026: PRÜFBERICHT-brille-vorsorge.md.
 *   - Keine Behandlungsempfehlung, kein Urteil, ob ein Kind eine Brille
 *     braucht. Keine Krebsvorsorge, kein Eintrag in die Ausschlusslisten.
 */

export const article = {
  slug: 'brille-krankenkasse',
  kind: 'ratgeber',
  group: 'brille',

  metaTitle: 'Zahlt die Krankenkasse eine Brille? Dioptrien und Kinder | Healio',
  metaDescription:
    'Zahlt die Krankenkasse eine Brille? Bei Kindern meist ja, bei Erwachsenen nur ab 6,25 Dioptrien. Mit Richtlinie, Kinderbrille, Gestell und Satzungsbeispielen.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Zahlt die Krankenkasse eine Brille? Wann die Kasse zahlt und wie viel',
  listTeaser:
    'Anspruch für Kinder und Erwachsene mit den Dioptrien-Grenzen der Richtlinie, Kinderbrille, Gestell, Kontaktlinsen und Zuschüsse der Kassen im Überblick.',

  headline: 'Zahlt die Krankenkasse eine Brille? Wann die Kasse zahlt und wie viel',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'glasses',
    tone: 'sky',
    facts: [
      { value: 'bis 18 Jahre', label: 'haben Kinder und Jugendliche Anspruch auf Sehhilfen' },
      { value: 'ab 6,25 Dioptrien', label: 'Erwachsene bei Kurz- oder Weitsichtigkeit, Astigmatismus ab 4,25' },
      { value: 'Gestell nie', label: 'die Fassung gehört nicht zum Anspruch auf Sehhilfen' },
    ],
    text: 'Die Kasse zahlt Gläser, nicht die Fassung. Bei Erwachsenen nur bei starker Fehlsichtigkeit, bei Kindern und Jugendlichen in der Regel immer.',
    path: { to: '/ambulant', text: 'Brille, Heilpraktiker, Vorsorge im Tarif prüfen?', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Ob die Krankenkasse eine Brille zahlt, hängt vom Alter und von deinen Werten ab. Kinder und Jugendliche haben bis zur Vollendung des 18. Lebensjahres Anspruch auf Sehhilfen. Erwachsene bekommen Gläser nur bei einer schweren Sehbeeinträchtigung oder ab einem verordneten Fernwert von 6,25 Dioptrien bei Kurz- oder Weitsichtigkeit beziehungsweise 4,25 bei Astigmatismus. Das Gestell zahlt die Kasse nie.',

  sections: [
    {
      id: 'kurz',
      heading: 'Zahlt die Krankenkasse eine Brille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Meist nur für Kinder und bei starker Fehlsichtigkeit. Die Verbraucherzentrale fasst es so zusammen: Die Krankenkassen übernehmen Kosten für Brillengläser selten, die Kasse zahlt nur, wenn die Sehstärke stark beeinträchtigt ist, und bei Minderjährigen ist die Brille meist Kassenleistung (Stand 11.06.2025).',
        },
        {
          type: 'paragraph',
          text: 'Die Regeln stehen in § 33 SGB V und in der Hilfsmittel-Richtlinie des Gemeinsamen Bundesausschusses (G-BA). Das Gesetz sagt, wer Anspruch hat. Die Richtlinie legt fest, mit welchen Messwerten, in welchen Abständen und für welche Gläser.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Wer Anspruch auf Gläser hat, nach SGB V § 33 und Hilfsmittel-Richtlinie',
          head: ['Wer', 'Voraussetzung', 'Fundstelle'],
          rows: [
            ['Kinder und Jugendliche bis zur Vollendung des 18. Lebensjahres', 'Sehhilfe ist im Einzelfall erforderlich, keine Dioptrien-Grenze', '§ 33 Abs. 2 Satz 1 SGB V, Richtlinie § 12 Abs. 1 Nr. 1'],
            ['Erwachsene mit Sehbeeinträchtigung', 'mindestens Stufe 1 bei bestmöglicher Brillenkorrektur auf beiden Augen: Sehschärfe auf dem besseren Auge höchstens 0,3 oder beidäugiges Gesichtsfeld höchstens 10 Grad', '§ 33 Abs. 2 Nr. 1 SGB V, Richtlinie § 12 Abs. 1 Nr. 2'],
            ['Erwachsene mit Kurz- oder Weitsichtigkeit', 'verordneter Fernwert ab 6,25 Dioptrien auf mindestens einem Auge', '§ 33 Abs. 2 Nr. 2 SGB V, Richtlinie § 12 Abs. 1 Nr. 3'],
            ['Erwachsene mit Astigmatismus (Hornhautverkrümmung)', 'verordneter Fernwert ab 4,25 Dioptrien auf mindestens einem Auge', '§ 33 Abs. 2 Nr. 2 SGB V, Richtlinie § 12 Abs. 1 Nr. 3'],
          ],
          note: 'Das Gesetz schreibt „mehr als 6“ und „mehr als 4“ Dioptrien, die Richtlinie rechnet das auf 6,25 und 4,25 um. Quelle: SGB V § 33, abgerufen am 07.10.2026, und Hilfsmittel-Richtlinie, geändert 20.02.2025, in Kraft seit 16.05.2025.',
        },
      ],
    },
    {
      id: 'dioptrien',
      heading: 'Ab wie vielen Dioptrien zahlt die Krankenkasse eine Brille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei Erwachsenen ab 6,25 Dioptrien bei Kurz- oder Weitsichtigkeit und ab 4,25 Dioptrien bei Astigmatismus. Es genügt, dass ein Auge den Wert erreicht. Grundlage ist der verordnete Fernwert im stärksten Hauptschnitt, so steht es in der Richtlinie. Auch bei Kontaktlinsenverordnungen zählt die benötigte Fernrefraktion mit Brille.',
        },
        {
          type: 'paragraph',
          text: 'Entscheidend ist der Fernwert, nicht eine Nahzugabe. Wer nur für eine Lese- oder Gleitsichtbrille zur Augenärztin geht, erfüllt die Schwelle also nicht allein dadurch. Den Wert bestimmt die Augenärztin oder der Augenarzt, diese Seite kennt deine Werte nicht.',
        },
        {
          type: 'paragraph',
          text: 'Die zweite Tür für Erwachsene ist die Sehbeeinträchtigung. Nach der Richtlinie liegt sie vor, wenn die Sehschärfe auf dem besseren Auge bei bestmöglicher Korrektur höchstens 0,3 beträgt oder das beidäugige Gesichtsfeld höchstens 10 Grad bei zentraler Fixation. Die Verbraucherzentrale beschreibt das als eine Sehfähigkeit von maximal 30 Prozent trotz Brille oder Kontaktlinsen.',
        },
      ],
    },
    {
      id: 'kinder',
      heading: 'Zahlt die Krankenkasse eine Kinderbrille?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, für die Gläser. Kinder und Jugendliche haben bis zur Vollendung des 18. Lebensjahres Anspruch auf Sehhilfen, ohne Dioptrien-Grenze. Das Brillengestell gehört auch hier nicht zum Anspruch, es zahlen die Eltern. Die erste Verordnung kommt von der Augenärztin oder dem Augenarzt.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Kinder und Jugendliche: was die Hilfsmittel-Richtlinie für Gläser vorsieht',
          head: ['Thema', 'Regel', 'Fundstelle'],
          rows: [
            ['Kunststoffgläser', 'bei Kindern bis zur Vollendung des 14. Lebensjahres verordnungsfähig, unabhängig von der Gläserstärke', 'Richtlinie § 14 Abs. 3 Nr. 1'],
            ['Schulsport', 'Kunststoffgläser für den Schulsport sind bis zur Vollendung der allgemeinen Schulpflicht zusätzlich möglich', 'Richtlinie § 14 Abs. 3 Nr. 2'],
            ['Neue Gläser', 'nach dem 14. Geburtstag nur, wenn sich die Refraktionswerte um mindestens 0,5 Dioptrien geändert haben', 'Richtlinie § 12 Abs. 4, § 33 Abs. 4 SGB V'],
            ['Verlust oder Bruch', 'innerhalb von drei Monaten nach einer Verordnung ohne neue ärztliche Verordnung möglich, bei Kindern bis 14', 'Richtlinie § 12 Abs. 3'],
            ['Zuzahlung', 'entfällt unter 18 Jahren, die Zuzahlung gilt erst ab Vollendung des 18. Lebensjahres', '§ 33 Abs. 8 SGB V'],
          ],
          note: 'Quelle: Hilfsmittel-Richtlinie des G-BA (Fassung in Kraft seit 16.05.2025) und SGB V § 33, abgerufen am 07.10.2026. Die Verbraucherzentrale nennt dieselben Punkte (Stand 11.06.2025). Das Gestell zahlst du in jedem Fall selbst.',
        },
        {
          type: 'paragraph',
          text: 'Einzelne Kassen zahlen über ihre Satzung etwas zu einer Sportbrille, bei der BKK24 zum Beispiel bis 150 EUR in zwei Kalenderjahren, aber nur bis zum 18. Geburtstag. Die Beispiele stehen weiter unten.',
        },
      ],
    },
    {
      id: 'nicht-gezahlt',
      heading: 'Was zahlt die Kasse nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Neben dem Gestell nennt die Richtlinie eine ganze Reihe von Posten, die nicht verordnungsfähig sind. Das gilt auch dann, wenn die Kasse die Gläser grundsätzlich zahlt.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Nicht verordnungsfähige Posten und Kontaktlinsen nach der Hilfsmittel-Richtlinie',
          head: ['Posten', 'Regel', 'Fundstelle'],
          rows: [
            ['Brillenfassung', 'nicht Teil des Anspruchs', '§ 33 Abs. 2 SGB V, Richtlinie § 14 Abs. 5 Nr. 13'],
            ['Entspiegelte, fototrope und polarisierende Gläser', 'nicht verordnungsfähig', 'Richtlinie § 14 Abs. 5 Nr. 1, 5 und 6'],
            ['Zweitbrille oder Reservebrille mit denselben Werten', 'nicht verordnungsfähig', 'Richtlinie § 14 Abs. 5 Nr. 12'],
            ['Brille für Arbeitsplatz, Unfallschutz oder Freizeit, Sportbrille', 'nicht verordnungsfähig, Schulsport ausgenommen', 'Richtlinie § 14 Abs. 5 Nr. 10 und 11'],
            ['Kontaktlinsen', 'nur in medizinisch zwingend erforderlichen Ausnahmefällen, etwa bei Kurz- oder Weitsichtigkeit ab 8,0 Dioptrien', '§ 33 Abs. 3 SGB V, Richtlinie § 15 Abs. 3'],
            ['Pflegemittel für Kontaktlinsen', 'nicht erstattungsfähig', '§ 33 Abs. 3 SGB V, Richtlinie § 15 Abs. 6'],
          ],
          note: 'Weitere Kontaktlinsen-Indikationen der Richtlinie sind unter anderem Astigmatismus rectus und inversus ab 3,0 Dioptrien, Astigmatismus obliquus ab 2,0, Keratokonus, Aphakie, Aniseikonie über 7 Prozent und Anisometropie ab 2,0 Dioptrien. Wählst du statt einer erforderlichen Brille Kontaktlinsen, zahlt die Kasse höchstens den Betrag, den sie für die Brille aufwenden müsste (§ 33 Abs. 3 Satz 3 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Arbeitsplatz- und Bildschirmbrillen dienen laut Verbraucherzentrale dem Arbeitsschutz. Hier lohnt die Frage an den Arbeitgeber nach einem Zuschuss.',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft es ab und was bleibt als Zuzahlung?',
      blocks: [
        {
          type: 'steps',
          heading: 'In vier Schritten zur Kassenbrille',
          items: [
            { title: 'Erstverordnung', text: 'Die erstmalige Abgabe setzt eine Verordnung durch eine Augenärztin oder einen Augenarzt voraus. Bei einer Folgeversorgung reicht oft die Messung beim Optiker. Eine neue ärztliche Verordnung braucht es, wenn eine neue Diagnose nötig ist, nach der Richtlinie insbesondere bei Kindern und Jugendlichen bis 14 und bei einer Sehbeeinträchtigung.' },
            { title: 'Vertragsoptiker wählen', text: 'Die Kassen haben Verträge mit Optikern, die direkt mit ihnen abrechnen. Wer dein Vertragspartner ist, sagt dir deine Kasse.' },
            { title: 'Kassenbetrag klären', text: 'Die Kasse übernimmt die vertraglich vereinbarten Preise. Die Festbeträge für Sehhilfen hat der GKV-Spitzenverband zum 1. März 2025 aufgehoben, die Verträge sind nicht öffentlich. Frag vor dem Kauf nach dem Betrag.' },
            { title: 'Zuzahlung leisten', text: 'Ab 18 Jahren zahlst du 10 Prozent der Kosten, mindestens 5 und höchstens 10 EUR (Stand 2026). Ab dem 1. Januar 2027 sind es mindestens 7,50 und höchstens 15 EUR (BGBl. 2026 I Nr. 228). Das Gestell und alles über das Notwendige hinaus bezahlst du selbst.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Optiker und Krankenkassen müssen dich laut Verbraucherzentrale beraten, ob du Anspruch auf Kassenleistungen hast. Der Optiker muss Mehrkosten außerdem klar herausstellen.',
        },
      ],
    },
    {
      id: 'satzung',
      heading: 'Gibt es einen Zuschuss der Kasse zur Brille über die Satzung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei wenigen Kassen und dann meist nur für die Sportbrille. Satzungsleistungen sind freiwillige Mehrleistungen, die jede Kasse selbst festlegt. Von 39 Kassensatzungen, die kassenboost.de im August 2026 ausgewertet hat, sehen vier einen Zuschuss zur Sehhilfe vor. Bei der TK, der BARMER, der DAK-Gesundheit, der IKK classic und der hkk steht keiner in der Satzung.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Satzungszuschüsse zur Brille, Satzungen ausgewertet im August 2026',
          head: ['Kasse', 'Zuschuss laut Satzung', 'Bedingungen', 'Fundstelle'],
          rows: [
            ['BKK24', '100 Prozent bis zu 150 EUR innerhalb von zwei Kalenderjahren', 'nur bis zur Vollendung des 18. Lebensjahres, nur für Sehhilfen, die beim Sport getragen werden können', '§ 11 Abschnitt VII Nr. 6 „Sehhilfen“'],
            ['BKK GILDEMEISTER SEIDENSTICKER', 'einmalig 100 EUR, höchstens die nachgewiesenen Kosten', 'Sportbrille bis 18 Jahre mit augenärztlicher Verordnung, ab 18 nur bei Sehbeeinträchtigung Stufe 1 oder mehr als 6 beziehungsweise 4 Dioptrien', '§ 12d Abs. 7, Stand 11.08.2026'],
            ['KKH', 'einmalig 50 EUR für eine Sportbrille', 'ab 18 Jahren, Sehbeeinträchtigung Stufe 1 oder mehr als 6 beziehungsweise 4 Dioptrien', '§ 29n Abs. 1 bis 3'],
            ['HEK', 'einmalig 20 EUR zu einer Sportbrille, höchstens die tatsächlichen Kosten', 'ab 18 Jahren, Sehbeeinträchtigung Stufe 1 oder mehr als 6 beziehungsweise 4 Dioptrien', '§ 24g Abs. 1 bis 3, Stand 31.07.2026'],
          ],
          note: 'Zuschüsse sind Höchstbeträge und nie mehr als deine Rechnung. Für die Alltagsbrille gibt es in diesen Satzungen nichts, bei KKH und HEK läuft sie nur über den Bonus-Katalog. Satzungen ausgewertet im August 2026, Stand der einzelnen Satzung laut Fundstelle. Maßgeblich ist die Satzung deiner Kasse.',
        },
        {
          type: 'paragraph',
          text: 'Eine zweite Tür ist der Bonus. Bei der TK gehören Brillengläser und Kontaktlinsen zur Verbesserung der Sehstärke und der Sehtest zum Katalog der Gesundheitsdividende (Satzung, Anlage 4, Stand 17.04.2026). Wie das Bonusprogramm funktioniert, erklärt der Ratgeber zur TK, und der Bonus kann auch den Beitrag einer Zusatzversicherung mittragen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Das Prinzip steht im ' },
            { text: 'Ratgeber zum TK-Bonusprogramm 2026', to: '/ratgeber/tk-bonusprogramm-2026' },
            { text: ', die Übersicht über Bonus und Zusatzversicherung im ' },
            { text: 'Ratgeber Kassenbonus und Zusatzversicherung', to: '/ratgeber/krankenkassen-bonus-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Was erstattet ein Tarif, wenn die Kasse nichts zahlt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Im ambulanten Tarif ist die Sehhilfe einer von vier Töpfen. Dafür gibt es in jeder Tarifstufe einen eigenen Sehhilfen-Topf von 200 bis 500 EUR je zwei Kalenderjahre. Brille und Kontaktlinsen erstattet der Tarif in jeder Stufe zu 100 %, bis die Grenze des Topfs erreicht ist. In Ambulant 100 sind es bis zu 500 EUR alle zwei Jahre.',
        },
        {
          type: 'costCard',
          title: 'Wer trägt was bei der Brille?',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit Ambulant 100: Sehhilfen bis zu 500 EUR alle zwei Jahre, Beitrag 31,64 EUR im Monat für 21 bis 30 Jahre. Die Kassenbeträge für Gläser legt der Vertrag deiner Kasse fest und werden hier nicht beziffert.',
          caption: 'Kostenkarte: Brille ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Kind unter 18 Jahren, Gläser nach Verordnung', 'die Gläser nach dem Vertrag der Kasse, keine Zuzahlung', 'das Brillengestell', 'Der Tarif erstattet Rechnungsteile für Sehhilfen bis zur Grenze des Topfs'],
            ['Erwachsene mit Fernwert ab 6,25 Dioptrien', 'die Gläser nach dem Vertrag der Kasse, nicht die Fassung', 'Fassung, Zuzahlung von 5 bis 10 EUR (ab 2027 7,50 bis 15 EUR) und Aufpreise für Entspiegelung', 'Der Tarif erstattet Rechnungsteile für Sehhilfen bis zur Grenze des Topfs'],
            ['Erwachsene ohne Anspruch, Brille für angenommene 680 EUR', 'nichts', '680 EUR', 'Ambulant 100 erstattet bis zu 500 EUR, du zahlst 180 EUR'],
            ['Beitrag Ambulant 100 in 24 Monaten, 31,64 EUR im Monat', 'entfällt', 'entfällt', '759,36 EUR, zusammen mit der dritten Zeile 939,36 EUR'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe: Die 680 EUR sind eine Annahme, Beitrag mal 24 Monate plus Eigenanteil ist eigene Rechnung. Beitrag laut healio.de/ambulant (SDK-Beiträge, Stand 29.09.2026), Zuzahlung nach § 61 SGB V, Stand 2026. Allein für die Brille rechnet sich der Tarif in diesem Beispiel nicht, die Details stehen im Ratgeber zur Brillenversicherung. Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
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
            { lead: 'Für die meisten Erwachsenen zahlt die Kasse keine Brille.', text: 'Die Schwelle liegt bei einem verordneten Fernwert von 6,25 Dioptrien oder einer Sehbeeinträchtigung der Stufe 1. Wer eine Gleitsichtbrille braucht, zahlt höherwertige Gläser und die Fassung nach der Verbraucherzentrale in der Regel selbst.' },
            { lead: 'Wie viel die Kasse für Gläser zahlt, steht nirgends öffentlich.', text: 'Die Festbeträge gibt es seit dem 1. März 2025 nicht mehr. Die Verträge mit den Optikern sind nicht öffentlich. Darum nennen wir keinen Betrag. Deine Kasse und dein Optiker sagen dir vorab, was sie übernehmen.' },
            { lead: 'Der ambulante Tarif ist keine reine Brillenversicherung.', text: 'Die Brille ist einer von vier Töpfen. Nur für die Brille lohnt sich der Tarif selten. Er lohnt sich, wenn mehrere Leistungen zusammenkommen, etwa Heilpraktiker, Vorsorge und Sehhilfen, in Ambulant 100 mit bis zu 3.000 EUR in zwei Jahren.' },
          ],
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Brillen-Ratgeber hilft dir weiter?',
      blocks: [
        {
          type: 'cards',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'comparison',
              tone: 'mint',
              title: 'Brillenversicherung: lohnt sie sich?',
              text: 'Drei Arten von Policen, Beitrag und Erstattung gegen Selbstzahlen gerechnet.',
              to: '/ratgeber/brillenversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'glasses',
              tone: 'sky',
              title: 'Gleitsichtbrille: Kosten und Erstattung',
              text: 'Wovon der Preis abhängt und was die Kasse nie zahlt.',
              to: '/ratgeber/gleitsichtbrille-kosten',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Brille, Heilpraktiker und Vorsorge zeigt Healio den ambulanten Tarif der SDK. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Zahlt die Krankenkasse eine Brille?',
      answer:
        'Kindern und Jugendlichen bis zur Vollendung des 18. Lebensjahres ja, für die Gläser, nicht für das Gestell. Erwachsenen nur bei einer schweren Sehbeeinträchtigung mindestens der Stufe 1 oder bei einem verordneten Fernwert von 6,25 Dioptrien bei Kurz- oder Weitsichtigkeit oder 4,25 Dioptrien bei Astigmatismus.',
    },
    {
      question: 'Ab wie vielen Dioptrien zahlt die Krankenkasse eine Brille?',
      answer:
        'Das Gesetz nennt mehr als 6 Dioptrien bei Kurz- oder Weitsichtigkeit und mehr als 4 bei Astigmatismus. Die Hilfsmittel-Richtlinie rechnet das auf 6,25 und 4,25 um und stellt auf den verordneten Fernwert im stärksten Hauptschnitt ab. Ein Auge genügt.',
    },
    {
      question: 'Zahlt die Krankenkasse eine Kinderbrille?',
      answer:
        'Die Gläser ja, bis zur Vollendung des 18. Lebensjahres und ohne Dioptrien-Grenze, auf Verordnung der Augenärztin oder des Augenarztes. Bei Kindern bis 14 gehören Kunststoffgläser dazu. Das Gestell zahlen die Eltern.',
    },
    {
      question: 'Zahlt die Krankenkasse das Brillengestell?',
      answer:
        'Nein. Nach § 33 Abs. 2 SGB V umfasst der Anspruch auf Sehhilfen nicht die Kosten des Brillengestells, die Richtlinie führt Brillenfassungen unter den nicht verordnungsfähigen Posten.',
    },
    {
      question: 'Wie oft zahlt die Kasse neue Gläser?',
      answer:
        'Ab dem 14. Geburtstag nur, wenn sich die Refraktionswerte um mindestens 0,5 Dioptrien geändert haben. Bei Verlust oder Bruch innerhalb von drei Monaten nach einer Verordnung ist für Kinder bis 14 keine neue ärztliche Verordnung nötig.',
    },
    {
      question: 'Zahlt die Krankenkasse Kontaktlinsen?',
      answer:
        'Nur in medizinisch zwingend erforderlichen Ausnahmefällen, etwa bei Kurz- oder Weitsichtigkeit ab 8,0 Dioptrien oder bei Keratokonus. Pflegemittel zahlt die Kasse nicht. Wer Kontaktlinsen statt einer erforderlichen Brille wählt, bekommt höchstens den Betrag, den die Brille gekostet hätte.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass bei der Augenärztin oder dem Augenarzt klären, ob dein Wert die Schwelle erreicht, und frag deine Kasse nach dem Betrag für Gläser. Was eine Versicherung für die Brille bringt, rechnet der Ratgeber ' },
      { text: 'Brillenversicherung', to: '/ratgeber/brillenversicherung' },
      { text: ' durch, was eine Gleitsichtbrille kostet, steht im Ratgeber ' },
      { text: 'Gleitsichtbrille Kosten', to: '/ratgeber/gleitsichtbrille-kosten' },
      { text: '. Den ambulanten Tarif mit Sehhilfen-Topf findest du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Anspruch, Messwerte und nicht erstattungsfähige Posten stammen aus Gesetz und Richtlinie, Verfahren und Zuzahlung aus der Verbraucherzentrale, die Zuschüsse aus den Satzungen der Kassen.',
    items: [
      {
        label: 'SGB V § 33 Hilfsmittel, Absätze 1 bis 8',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__33.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Hilfsmittel-Richtlinie, Abschnitt B Sehhilfen, §§ 12 bis 15',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-3815/HilfsM-RL_2025-02-20_iK-2025-05-16.pdf',
        stand: 'geändert 20.02.2025, in Kraft seit 16.05.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Beschluss zur Änderung der Hilfsmittel-Richtlinie: Sehhilfen für Erwachsene (Werte 6,25 und 4,25 Dioptrien)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/40-268-5833/2017-07-20_HilfsM-RL_Sehhilfen-Erwachsene.pdf',
        stand: 'Beschluss vom 20.07.2017',
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
        label: 'Festbeträge für Sehhilfen, Aufhebung zum 1. März 2025',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/krankenversicherung/hilfsmittel/festbetraege_3/festbetraege.jsp',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der Techniker Krankenkasse, § 27 ff. und Anlage 4 (Leistungskatalog der TK-Gesundheitsdividende)',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/tk/unternehmen-und-karriere/ueber-die-tk/satzung-der-tk/149038',
        stand: 'Stand 17.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzungen von BKK24, BKK GILDEMEISTER SEIDENSTICKER, KKH, HEK, BARMER, DAK-Gesundheit, IKK classic und hkk, Fundstellen in der Tabelle',
        publisher: 'Krankenkassen',
        stand: 'Satzungen ausgewertet im August 2026, Stand der einzelnen Satzung laut Fundstelle',
        note: 'Es gilt immer die aktuelle Satzung deiner Kasse',
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
