/**
 * Ambulant-Ratgeber Welle A, Bereichsseite: Heilpraktiker Kosten, wer zahlt was
 * bei Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie.
 * Zugleich Antwort auf die Suche "heilpraktiker kosten". Wegweiser zu allen
 * Seiten des Feldes Ambulant aus Welle A und zu den bestehenden Blogartikeln.
 *
 * Quellen: Alle Zahlen stammen aus den Belegen der Einzelseiten
 * (heilpraktiker-zusatzversicherung, ambulante-zusatzversicherung,
 * gebuehrenordnung-heilpraktiker, chiropraktiker-kosten, tk-osteopathie,
 * physiotherapie-zuzahlung, akupunktur-kosten, jeweils *.belege.md im selben
 * Ordner), Abruf 07.10.2026. Hier nur Zusammenfassung ohne neue Zahl.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Angabe "pro Stunde" und kein Durchschnittspreis: Es gibt
 *     keine neutrale Quelle. Der Text sagt das und zeigt, wovon der Preis
 *     abhängt. Als Orientierung stehen nur gekennzeichnete Werte (Beihilfe-
 *     Höchstbeträge, GOÄ im einfachen Satz, Verbandsangabe zur Osteopathie).
 *   - Die Bereichsseite verlinkt die bestehenden Blogartikel
 *     heilpraktiker-kosten-guide-2026 und osteopathie-krankenkasse-2026
 *     (Osteopathie-Tabelle seit 07.10.2026 nach Satzung korrigiert). Der
 *     Blogartikel naturheilkunde-krankenkasse-2026 ist bewusst nicht verlinkt,
 *     weil er noch auf den Ersatztext der Codex-Prüfung wartet.
 *   - Keine Aussage zur Wirkung, keine Behandlungsempfehlung, keine
 *     Anbietervergleiche.
 *   - Rechenbeispiele arbeiten mit angenommenen Preisen.
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): Status in Faktenkasten und
 * Fußzeile wie Zahn-Welle 1; Tarifaussagen gegen healio.de/ambulant, die Dateien
 * im Serien-Worktree und die SDK-AVB gelesen.
 */

export const article = {
  slug: 'heilpraktiker-kosten',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Heilpraktiker Kosten: wer zahlt was, Übersicht | Healio',
  metaDescription:
    'Heilpraktiker Kosten im Überblick: Honorar, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie, was die Kasse zahlt und was ein Zusatztarif erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Heilpraktiker Kosten: was es kostet und wer zahlt',
  listTeaser:
    'Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie auf einer Seite: was die Kasse zahlt, was bei dir bleibt und was ein Zusatztarif erstattet.',

  headline: 'Heilpraktiker Kosten: was es kostet und wer zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'naturopathy',
    facts: [
      { value: 'Meist selbst zahlen', label: 'Heilpraktiker bezahlt die gesetzliche Kasse in der Regel nicht' },
      { value: 'frei vereinbart', label: 'Das Honorar regelt die Absprache, das GebüH hilft beim Rechnen' },
      { value: 'bis zu 1.000 EUR', label: 'Naturheilverfahren in zwei Jahren (Ambulant 100)' },
    ],
    text: 'Was ein Heilpraktiker kostet, sagt dir keine Preisliste, sondern deine Praxis. Ob etwas zurückkommt, hängt an Behandlung, Behandler, Satzung deiner Kasse und deinem Tarif.',
    path: { to: '/ambulant', text: 'Heilpraktikerkosten selbst getragen?', label: 'Ambulante Tarife ansehen' },
  },

  lead:
    'Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie haben eines gemeinsam: Wer zahlt, hängt von der Behandlung und von der Person ab, die behandelt. Die gesetzliche Kasse zahlt Heilpraktiker in der Regel nicht, beim Arzt gelten andere Regeln, und einzelne Kassen bezuschussen Teile in der Satzung. Dazu kommt, was ein ambulanter Tarif erstattet. Diese Seite sortiert das und führt dich zur passenden Antwort.',

  sections: [
    {
      id: 'was-kostet',
      heading: 'Was kostet ein Heilpraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das lässt sich nicht pauschal sagen, und eine neutrale Preisliste gibt es nicht. Das Honorar vereinbarst du mit der Praxis (§ 611 BGB). Das Gebührenverzeichnis für Heilpraktiker (GebüH) hilft nur beim Rechnen, verbindlich ist es nicht. Der Preis hängt davon ab, wer behandelt, wie lange eine Sitzung dauert, welches Verfahren die Praxis anbietet und wie oft du kommst. Auch eine Angabe pro Stunde taugt deshalb nicht als Maßstab.',
        },
        {
          type: 'paragraph',
          text: 'Was es gibt, sind Orientierungswerte aus neutralen Quellen. Diese Werte sind keine Preise, helfen aber bei der Größenordnung. Die Tabelle zeigt sie zusammen mit der Frage, wer in der Regel zahlt.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Wer zahlt was: Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie im Überblick',
          head: ['Behandlung', 'Wer zahlt in der Regel', 'Zahl aus neutraler Quelle', 'Mehr dazu'],
          rows: [
            ['Heilpraktiker allgemein, zum Beispiel Beratung', 'Du, die gesetzliche Kasse zahlt in der Regel nicht', 'Beihilfe-Höchstbetrag für eine eingehende Beratung von mindestens 15 Minuten: 18,50 EUR (Anlage 2 BBhV Nr. 4), kein Preis', 'Gebührenordnung für Heilpraktiker'],
            ['Akupunktur', 'Die Kasse bei chronischen Schmerzen der Lendenwirbelsäule oder des Knies durch Gonarthrose, seit mindestens 6 Monaten, beim qualifizierten Vertragsarzt. Sonst du', 'GOÄ Nr. 269a im einfachen Satz rund 20,40 EUR (eigene Rechnung)', 'Akupunktur Kosten'],
            ['Chiropraktik', 'Die Kasse beim Vertragsarzt mit Zusatzbezeichnung Chirotherapie. Beim Heilpraktiker du, einzelne Satzungen bezuschussen', 'Beihilfe-Höchstbeträge 4,00 und 17,00 EUR (Anlage 2 BBhV Nr. 34.1 und 34.2), keine Preise', 'Chiropraktiker Kosten'],
            ['Osteopathie', 'Du, mit Zuschuss je nach Kasse. Die TK zahlt 40 EUR je Sitzung, höchstens dreimal im Jahr', 'Sitzung 80 bis 150 EUR laut Verband der Osteopathen Deutschland, als Orientierung', 'TK und Osteopathie'],
            ['Physiotherapie auf Rezept', 'Die Kasse, du zahlst ab 18 Jahren 10 Prozent der Kosten plus 10 EUR je Verordnung', 'Bei angenommenen 180 EUR Kosten: 28 EUR Zuzahlung (eigene Rechnung)', 'Zuzahlung Physiotherapie'],
          ],
          note: 'Quellen und Rechenwege stehen in den verlinkten Einzelseiten, Abruf 07.10.2026: BBhV Anlage 2, GOÄ, G-BA Methoden-Richtlinie, TK-Leistungsseite, VOD (Behandlungsseite), SGB V § 61. Beihilfe-Höchstbeträge und Verbandsangaben sind keine Preislisten. Was deine Praxis berechnet, kann abweichen.',
        },
      ],
    },
    {
      id: 'kasse-zahlt',
      heading: 'Zahlt die Krankenkasse den Heilpraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'In der Regel nicht. Ärztliche Behandlung wird nach § 15 SGB V von Ärzten erbracht, und die Verbraucherzentrale schreibt etwa zur Akupunktur, dass Sitzungen beim Heilpraktiker aus eigener Tasche zu zahlen sind. Das heißt nicht, dass bei Naturheilverfahren nie etwas von der Kasse kommt. Drei Wege gibt es.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Kassenleistung beim Arzt.', text: 'Akupunktur zahlt die Kasse bei chronischen Schmerzen der Lendenwirbelsäule oder des Knies durch Gonarthrose, wenn ein Vertragsarzt mit der geforderten Qualifikation behandelt. Chirotherapie ist Kassenleistung beim Vertragsarzt mit der Zusatzbezeichnung.' },
            { lead: 'Satzungsleistung deiner Kasse.', text: 'Nach § 11 Abs. 6 SGB V kann jede Kasse zusätzliche Leistungen anbieten. Die TK zahlt zum Beispiel 40 EUR je Osteopathie-Sitzung, höchstens dreimal im Jahr. Andere Kassen bezuschussen etwa Chiropraktik oder Akupunktur, in den Beispielen dieses Bereichs mit Jahresdeckel.' },
            { lead: 'Bonusprogramm.', text: 'Ein Bonus ist keine Erstattung einer Rechnung. Er kann aber als Zuschuss zum Beitrag einer Zusatzversicherung helfen, bis zu den nachgewiesenen Kosten.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Was bei deiner Kasse gilt, steht in ihrer Satzung. KassenBoost vergleicht Bonusprogramme quellenbelegt anhand der Satzungen, wenn du Kassen nebeneinander sehen willst.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Was erstattet eine Zusatzversicherung bei Heilpraktikerkosten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt vom Tarif. Bei den ambulanten Tarifen der SDK, die Healio auf der Seite Ambulant vermittelt, versichert ein Topf Naturheilverfahren und Behandlungen durch Heilpraktiker. Erstattet werden alle Leistungen, die im aktuellen GebüH stehen. Heilpraktiker müssen danach abrechnen, bei Ärzten gilt die Gebührenordnung für Ärzte. Dazu kommen drei weitere Töpfe für Sehhilfen, Vorsorge und gesetzliche Zuzahlungen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Topf Naturheilverfahren und Summe der vier Töpfe in den SDK-Tarifen AP5 bis AP1, je zwei Kalenderjahre',
          head: ['Stufe', 'Erstattung Naturheilverfahren', 'Höchstbetrag Naturheilverfahren', 'Alle vier Töpfe zusammen'],
          rows: [
            ['Ambulant 50 (AP5)', '50 Prozent', 'bis 500 EUR', 'bis zu 1.400 EUR'],
            ['Ambulant 70 (AP7)', '70 Prozent', 'bis 700 EUR', 'bis zu 2.000 EUR'],
            ['Ambulant 90 (AP9)', '90 Prozent', 'bis 900 EUR', 'bis zu 2.600 EUR'],
            ['Ambulant 100 (AP1)', '100 Prozent', 'bis 1.000 EUR', 'bis zu 3.000 EUR in zwei Jahren'],
          ],
          note: 'Quelle: SDK, Allgemeine Versicherungsbedingungen Teil II, Tarife AP5, AP7, AP9 und AP1, Stand 01.01.2023, Leistungsübersicht und Abschnitt I.5. Die Summen sind die Addition der vier Höchstbeträge. Erstattet werden nur erstattungsfähige Kosten, verbindlich sind die Bedingungen.',
        },
        {
          type: 'paragraph',
          text: 'Wie der Tarif Heilpraktikerrechnungen behandelt, erklärt der Ratgeber zur Heilpraktiker-Zusatzversicherung. Er zeigt Kriterien statt einer Rangliste und sagt ehrlich, was zu den Gesundheitsfragen im Antrag und zu bestehenden Beschwerden gehört. Was die vier Töpfe zusammen leisten und für wen sie passen, steht im Ratgeber zur ambulanten Zusatzversicherung.',
        },
        {
          type: 'costCard',
          title: 'Fünf Fälle im Überblick: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten bis zum Höchstbetrag des jeweiligen Topfs, zwei Kalenderjahre ab Versicherungsbeginn. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: fünf Beispiele aus dem Bereich Heilpraktiker und Naturheilkunde',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Heilpraktiker, 8 Sitzungen, angenommen 80 EUR je Sitzung (640 EUR)', 'meist nichts', '640 EUR', 'Bis zu 640 EUR erstattet, soweit die Rechnung erstattungsfähig ist'],
            ['Osteopathie, 3 Sitzungen, angenommen 100 EUR je Sitzung (300 EUR), bei der TK', '120 EUR (3 mal 40 EUR)', '180 EUR', 'Bis zu 180 EUR erstattet, wenn ein Heilpraktiker oder Arzt behandelt und die Rechnung erstattungsfähig ist'],
            ['Akupunktur beim qualifizierten Vertragsarzt bei chronischen Schmerzen der Lendenwirbelsäule', 'die Akupunktur als Kassenleistung', 'nichts für die Behandlung selbst', 'Nichts zu erstatten'],
            ['Physiotherapie, eine Verordnung, angenommene Kosten 180 EUR', '152 EUR', '28 EUR Zuzahlung', 'Erstattet 28 EUR gegen ärztliche Verordnung und Beleg'],
            ['Beitrag Ambulant 100 über zwei Jahre, 21 bis 30 Jahre (31,64 EUR im Monat)', 'nicht betroffen', 'nichts', '759,36 EUR Beitrag, den ein Kassenbonus teilweise mittragen kann'],
          ],
          note: 'Rechenbeispiel mit angenommenen Preisen, keine Preisangabe. Eigene Rechnung: 640 EUR plus 180 EUR plus 28 EUR ergeben 848 EUR Erstattung, 31,64 EUR mal 12 mal 2 ergeben 759,36 EUR Beitrag; die Erstattungen aus Heilpraktiker und Osteopathie bleiben unter dem Höchstbetrag von 1.000 EUR des Topfs Naturheilverfahren. Kassenleistungen nach den Einzelseiten dieses Bereichs, Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant (Stand 29.09.2026).',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Im Beispiel liegen die Erstattungen mit 848 EUR über dem Beitrag von 759,36 EUR. Fällt nur einer der Fälle an, geht die Rechnung nicht auf. Rechne deshalb mit deinen eigenen Zahlen.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Einen Preis pro Stunde nennen wir nicht.', text: 'Es gibt dafür keine neutrale Quelle. Die Zahlen oben sind Orientierung, keine Preise, und die Beispiele rechnen mit angenommenen Beträgen.' },
            { lead: 'Wer behandelt, entscheidet über die Kasse.', text: 'Beim Vertragsarzt mit Qualifikation kann die Kasse zahlen, beim Heilpraktiker in der Regel nicht. Einzelne Satzungen machen Ausnahmen, in den Beispielen dieses Bereichs mit Verordnung und Jahresdeckel.' },
            { lead: 'Gesundheitsfragen gehören zum Antrag.', text: 'Du beantwortest sie vollständig und wahrheitsgemäß. Laut den Angaben auf der Seite Ambulant wirst du grundsätzlich nicht abgelehnt, je nach Angaben kann ein Risikozuschlag oder ein Leistungsausschluss dazukommen.' },
            { lead: 'Was schon läuft, zählt nicht.', text: 'Für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind, leistet der Versicherer nicht. Abschließen gehört vor die Behandlung.' },
            { lead: 'Zur Wirkung sagen wir nichts.', text: 'Welche Behandlung zu dir passt, entscheidet eine Ärztin, ein Arzt oder du mit deiner Praxis. Diese Seite gibt keine Behandlungsempfehlung.' },
          ],
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'naturopathy',
          text: 'Du siehst die vier Stufen, den Beitrag für dein Alter und kannst vor dem Antrag in Ruhe rechnen.',
          label: 'Tarifstufen und Beitrag ansehen',
        },
      ],
    },
    {
      id: 'vorher-klaeren',
      heading: 'Wie planst du die Kosten, bevor die Behandlung beginnt?',
      blocks: [
        {
          type: 'steps',
          heading: 'In vier Schritten zur geklärten Kostenfrage',
          items: [
            {
              title: 'Behandler und Verfahren klären',
              text: 'Arzt mit Zusatzbezeichnung oder Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik: Davon hängt die Kostenübernahme ab.',
            },
            {
              title: 'Honorar vorab erfragen',
              text: 'Frag, wie abgerechnet wird und was die Serie voraussichtlich kostet. Bei längeren Serien hilft eine schriftliche Absprache.',
            },
            {
              title: 'Kasse nach der Satzung fragen',
              text: 'Frag, ob sie das Verfahren bezuschusst und was sie vorher verlangt, etwa eine ärztliche Bescheinigung vor dem ersten Termin.',
            },
            {
              title: 'Tarif prüfen und früh abschließen',
              text: 'Prüf, was dein Tarif erstattet. Der Abschluss gehört vor die Behandlung, Rechnungen reichst du mit den Nummern des Gebührenverzeichnisses ein.',
            },
          ],
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Ratgeber hilft dir bei deiner Frage weiter?',
      blocks: [
        {
          type: 'cards',
          heading: 'Alle Ratgeber dieses Bereichs',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'protection',
              tone: 'mint',
              title: 'Heilpraktiker-Zusatzversicherung',
              text: 'Kriterien statt Rangliste, Gesundheitsfragen im Antrag und bestehende Beschwerden.',
              to: '/ratgeber/heilpraktiker-zusatzversicherung',
              linkLabel: 'Lesen',
            },
            {
              icon: 'ambulant',
              tone: 'sky',
              title: 'Ambulante Zusatzversicherung',
              text: 'Vier Töpfe, Beiträge nach Alter und die Frage nach dem Privatpatienten.',
              to: '/ratgeber/ambulante-zusatzversicherung',
              linkLabel: 'Lesen',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'Gebührenordnung für Heilpraktiker',
              text: 'Warum das GebüH nur eine Berechnungshilfe ist und was auf der Rechnung steht.',
              to: '/ratgeber/gebuehrenordnung-heilpraktiker',
              linkLabel: 'Lesen',
            },
            {
              icon: 'weighing',
              tone: 'lavender',
              title: 'Chiropraktiker Kosten',
              text: 'Arzt oder Heilpraktiker: wer behandelt und wer zahlt.',
              to: '/ratgeber/chiropraktiker-kosten',
              linkLabel: 'Lesen',
            },
            {
              icon: 'comparison',
              tone: 'coral',
              title: 'TK und Osteopathie',
              text: '40 EUR je Sitzung, ärztliche Bescheinigung vorher, Rechnung einreichen.',
              to: '/ratgeber/tk-osteopathie',
              linkLabel: 'Lesen',
            },
            {
              icon: 'medication',
              tone: 'mint',
              title: 'Zuzahlung Physiotherapie',
              text: '10 Prozent plus 10 EUR je Verordnung, Belastungsgrenze und Erstattung.',
              to: '/ratgeber/physiotherapie-zuzahlung',
              linkLabel: 'Lesen',
            },
            {
              icon: 'naturopathy',
              tone: 'sky',
              title: 'Akupunktur Kosten',
              text: 'Wann die Kasse zahlt und was die Sitzung privat kostet.',
              to: '/ratgeber/akupunktur-kosten',
              linkLabel: 'Lesen',
            },
          ],
        },
        {
          type: 'cards',
          heading: 'Weiterlesen im Healio-Blog',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'calculator',
              tone: 'butter',
              title: 'Heilpraktiker Kosten: wer zahlt was, der Guide 2026',
              text: 'Der ausführliche Blogartikel zu Kosten, Kasse und Zusatzschutz.',
              to: '/blog/heilpraktiker-kosten-guide-2026',
              linkLabel: 'Artikel lesen',
            },
            {
              icon: 'comparison',
              tone: 'lavender',
              title: 'Osteopathie: welche Krankenkasse zahlt 2026',
              text: 'Welche Kassen Osteopathie bezuschussen, im Überblick.',
              to: '/blog/osteopathie-krankenkasse-2026',
              linkLabel: 'Artikel lesen',
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
      question: 'Was kostet ein Heilpraktiker pro Stunde?',
      answer:
        'Dafür gibt es keine neutrale Euro-Angabe. Das Honorar ist frei vereinbar, das Gebührenverzeichnis für Heilpraktiker (GebüH) ist nur eine Berechnungshilfe. Der Preis hängt von Behandler, Dauer, Verfahren und Zahl der Sitzungen ab. Frag deine Praxis vorab nach dem Honorar.',
    },
    {
      question: 'Zahlt die Krankenkasse den Heilpraktiker?',
      answer:
        'In der Regel nicht. Ärztliche Behandlung wird nach § 15 SGB V von Ärzten erbracht. Ausnahmen sind Kassenleistungen beim qualifizierten Vertragsarzt, etwa Akupunktur bei chronischen Schmerzen der Lendenwirbelsäule oder des Knies, und Satzungsleistungen einzelner Kassen, zum Beispiel für Osteopathie.',
    },
    {
      question: 'Was erstattet eine Zusatzversicherung bei Heilpraktikerkosten?',
      answer:
        'Nach den Bedingungen der Tarife. Bei den ambulanten SDK-Tarifen sind es 50 bis 100 Prozent der erstattungsfähigen Kosten für Naturheilverfahren, höchstens 500 bis 1.000 EUR je zwei Kalenderjahre, je nach Stufe. Heilpraktiker müssen nach dem GebüH abrechnen, Psychotherapie ist ausgenommen.',
    },
    {
      question: 'Zahlt die Kasse Osteopathie, Akupunktur oder Chiropraktik?',
      answer:
        'Das hängt vom Verfahren und vom Behandler. Akupunktur ist bei zwei Indikationen Kassenleistung, Chirotherapie beim Vertragsarzt mit Zusatzbezeichnung. Für Osteopathie und für Chiropraktik beim Heilpraktiker zahlen einzelne Kassen Zuschüsse nach ihrer Satzung, die TK zum Beispiel Osteopathie mit 40 EUR je Sitzung, höchstens dreimal im Jahr.',
    },
    {
      question: 'Was ist das GebüH und muss die Praxis danach abrechnen?',
      answer:
        'Das GebüH ist ein Verzeichnis üblicher Vergütungen und nach Beschreibung des Fachverbands Deutscher Heilpraktiker eine Berechnungshilfe, keine Gebührentaxe. Rechtlich muss keine Praxis danach abrechnen. Manche Zusatztarife machen die Abrechnung nach GebüH aber zur Voraussetzung der Erstattung.',
    },
    {
      question: 'Was klärst du vor dem ersten Termin?',
      answer:
        'Wer behandelt und nach welchem Verzeichnis abgerechnet wird, was die Serie voraussichtlich kostet und ob deine Kasse etwas bezuschusst, zum Beispiel mit einer ärztlichen Bescheinigung vor dem Beginn. Einen Zusatztarif schließt du vor der Behandlung ab, denn was vor dem Versicherungsbeginn eingetreten ist, zahlt der Versicherer nicht.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir oben den Ratgeber zu deiner Behandlung aus und klär vor dem ersten Termin Honorar und Kassenzuschuss. Was ein Tarif für Naturheilverfahren erstattet, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Mehr zum Kassenbonus steht im ' },
      { text: 'Ratgeber Krankenkassen-Bonus und Zusatzversicherung', to: '/ratgeber/krankenkassen-bonus-zusatzversicherung' },
      { text: ', und welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Zahlen dieser Übersicht stammen aus den Einzelseiten dieses Bereichs. Dort steht jeder Rechenweg mit Quelle, hier die wichtigsten Grundlagen.',
    items: [
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil II: Tarife AP5, AP7, AP9 und AP1 (1.753a/01.23)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
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
      },
      {
        label: 'Richtlinie Methoden vertragsärztliche Versorgung, Anlage I Nr. 12 (Körperakupunktur)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4212/MVV-RL_2026-06-18_iK-2026-09-09.pdf',
        stand: 'in Kraft seit 09.09.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gebührenverzeichnis für Heilpraktiker (GebüH)',
        publisher: 'Fachverband Deutscher Heilpraktiker',
        href: 'https://www.heilpraktiker.org/gebuehrenverzeichnis-fuer-heilpraktiker',
        stand: 'ohne Datum',
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
        label: 'Wie viel übernimmt die TK bei Osteopathie?',
        publisher: 'Techniker Krankenkasse (TK)',
        href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/weitere-leistungen/alternative-medizin/osteopathie/zuzahlung-osteopathie-2001882',
        stand: '02.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Chirotherapie: Wir tragen die Kosten',
        publisher: 'DAK-Gesundheit',
        href: 'https://www.dak.de/dak/leistungen/alternative-heilmethoden/chirotherapie-wir-tragen-die-kosten_10722',
        stand: '01.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Osteopathische Behandlung: Kosten und Dauer',
        publisher: 'Verband der Osteopathen Deutschland (VOD)',
        href: 'https://www.osteopathie.de/behandlung',
        stand: 'ohne Datum',
        accessedAt: '07.10.2026',
        note: 'Preisorientierung des Verbands, keine Marktpreiserhebung',
      },
      {
        label: 'SGB V § 61 Zuzahlungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__61.html',
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
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Bedingungen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
