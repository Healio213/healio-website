/**
 * Ratgeber-Serie, Feld Vorsorge (group 'vorsorge'), Bereichsseite:
 * Vorsorgeuntersuchungen, was die Kasse in welchem Alter zahlt.
 * Hauptbegriff "vorsorgeuntersuchung", Angebotspfad /ambulant.
 *
 * SPERRLISTEN-KANDIDAT (gemischte Seite mit Krebsfrüherkennung, Entscheidung
 * der Marktanalyse-Sitzung 07.10.2026): /ratgeber/vorsorgeuntersuchung gehört
 * in GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js) und
 * ANALYTICS_EXCLUDED_PATHS (src/lib/analytics.js).
 *
 * Faktenprüfung 07.10.2026 (PRÜFBERICHT-brille-vorsorge.md): Darmkrebs gleich
 * für Frauen und Männer seit 01.04.2025; U10 am 20.08.2026 beschlossen, noch
 * nicht in Kraft (G-BA-Beschluss 7982); Mammographie ab 45 und PSA neutral
 * als Beratung ohne Prognose. Statusangabe wie Zahn-Welle 1.
 *
 * Quellen (Belege: vorsorgeuntersuchung.belege.md, Abruf 07.10.2026):
 * G-BA Krebsfrüherkennungs-Richtlinie (in Kraft seit 12.03.2026), oKFE-
 * Richtlinie (in Kraft seit 02.10.2026), Gesundheitsuntersuchungs-Richtlinie,
 * Kinder-Richtlinie (in Kraft seit 01.01.2026), Jugendgesundheitsuntersuchungs-
 * Richtlinie (in Kraft seit 01.01.2017), G-BA-Pressemitteilungen (Lungenkrebs
 * 13.03.2026, Mammographie ab 45 am 16.04.2026), gesund.bund.de, SGB V § 65a
 * (Bonus), Verbraucherzentrale (IGeL, Stand 15.07.2025), bestehende
 * Kassen-Ratgeber im Repo (IKK classic, TK, AOK, mkk, BARMER).
 * Tarifaussagen wortgleich mit ambulant.json (vorsorgeBaustein) und /ambulant.
 *
 * Bewusste Grenzen:
 *   - Alter, Abstand und Leistung nur nach G-BA-Richtlinien und gesund.bund.de.
 *   - Mammographie ab 45 ist NICHT beschlossen (Beratung seit 16.04.2026,
 *     Stellungnahmeverfahren seit 23.07.2026). Vor Veröffentlichung erneut auf
 *     g-ba.de prüfen.
 *   - Keine Bonus-Euro-Beträge: Die Seite sagt nur, dass Vorsorge zählt, und
 *     verlinkt auf die Kassen-Ratgeber, die die Satzungswerte tragen.
 *   - Schwangerschaft nur mit Verweis auf den bestehenden Ratgeber, kein
 *     Kinderwunsch, kein NIPT. U10, U11 und J2 nur als Satzungsleistung
 *     genannt, nicht als Richtlinie.
 *   - Keine Diagnose, keine Fragen zum Gesundheitszustand. Der PDF-Wunsch
 *     der Themenliste (druckbare Liste) ist hier als Tabelle erfüllt; ein
 *     PDF liegt nicht bei.
 */

export const article = {
  slug: 'vorsorgeuntersuchung',
  kind: 'ratgeber',
  group: 'vorsorge',

  metaTitle: 'Vorsorgeuntersuchung: Alter, Abstand, Kassenleistung | Healio',
  metaDescription:
    'Vorsorgeuntersuchung: Alle Untersuchungen für Kinder, Frauen und Männer mit Alter, Abstand und Quelle. Dazu, was privat bleibt und wie Vorsorge im Bonus zählt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 12,

  listTitle: 'Vorsorgeuntersuchungen: was die Kasse in welchem Alter zahlt',
  listTeaser:
    'Alle Untersuchungen für Kinder, Frauen und Männer mit Alter, Abstand und Quelle, dazu was privat bleibt und wie Vorsorge im Kassenbonus zählt.',

  headline: 'Vorsorgeuntersuchungen: was die Kasse in welchem Alter zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'prevention',
    tone: 'mint',
    facts: [
      { value: 'ab 18 Jahren', label: 'Check-up einmalig, ab 35 alle drei Jahre' },
      { value: 'ab 35 Jahren', label: 'Hautkrebsscreening alle zwei Jahre' },
      { value: 'ab 50 Jahren', label: 'Darmkrebs-Früherkennung, für Frauen auch Mammographie' },
    ],
    text: 'Dazu kommen Untersuchungen nach Geschlecht und für Kinder. Vorsorge zählt bei vielen Kassen im Bonusprogramm, den Satzungswert findest du im Ratgeber deiner Kasse.',
    path: { to: '/ambulant', text: 'Mehr Vorsorge als die Kasse zahlt? Tarif ansehen', label: 'Ambulanten Tarif ansehen' },
  },

  lead: 'Welche Vorsorgeuntersuchungen die gesetzliche Krankenkasse zahlt, legt der Gemeinsame Bundesausschuss (G-BA) in Richtlinien fest. Die Tabellen unten zeigen jede Untersuchung mit Alter, Abstand und Quelle: für Kinder und Jugendliche, für alle Erwachsenen, für Frauen und für Männer. Was darüber hinausgeht, ist eine Selbstzahlerleistung. Dein Kassenbonus kann die Vorsorge zusätzlich belohnen.',

  sections: [
    {
      id: 'uebersicht',
      heading: 'Welche Vorsorgeuntersuchungen gibt es und was zahlt die Kasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gesund.bund.de unterscheidet zwei Begriffe. Früherkennung soll Krankheiten finden, bevor sie Beschwerden machen. Vorsorge im engeren Sinn erkennt Vorstufen, zum Beispiel bei Darmkrebs und Gebärmutterhalskrebs. Beides zahlen gesetzliche und in aller Regel auch private Krankenkassen, wenn die Untersuchung gesetzlich geregelt ist. Die Teilnahme ist freiwillig.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Vorsorge für Kinder und Jugendliche: Untersuchung, Alter, Abstand, Quelle',
          head: ['Untersuchung', 'Alter', 'Abstand', 'Quelle'],
          rows: [
            ['Früherkennungsuntersuchungen U1 bis U9, zehn Untersuchungen in den ersten sechs Lebensjahren (U2, U3 und U7a gehören dazu)', 'von der Geburt bis zum Alter von rund fünf Jahren, die U9 im 60. bis 64. Lebensmonat', 'je Untersuchung in festen Zeiträumen, zum Beispiel U2 am 3. bis 10. Lebenstag, U6 im 10. bis 12. Lebensmonat', 'G-BA, Kinder-Richtlinie, § 2, in Kraft seit 01.01.2026'],
            ['Jugendgesundheitsuntersuchung J1', 'zwischen dem vollendeten 13. und 14. Lebensjahr', 'einmalig, mit zwölf Monaten Toleranz davor und danach', 'G-BA, Jugendgesundheitsuntersuchungs-Richtlinie, Nr. 2'],
          ],
          note: 'Die geltende Kinder-Richtlinie nennt U1 bis U9. Eine neue U10 für Kinder von 9 bis 10 Jahren hat der G-BA am 20.08.2026 beschlossen. In Kraft ist sie noch nicht, anbieten können die Praxen sie erst, wenn auch die ärztliche Vergütung festgelegt ist. U10, U11 und J2 zahlen einige Kassen bisher über ihre Satzung, die IKK classic zum Beispiel einmalig 61 EUR je Untersuchung (Satzung Stand 01.08.2026, §§ 34o bis 34r, ausgewertet im August 2026).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Vorsorge für alle Erwachsenen: Untersuchung, Alter, Abstand, Quelle',
          head: ['Untersuchung', 'Alter', 'Abstand', 'Quelle'],
          rows: [
            ['Gesundheits-Check-up, ab 35 mit einmaligem Hepatitis-B- und Hepatitis-C-Test', 'ab 18 Jahren, bis 34 einmalig', 'ab 35 alle drei Jahre', 'G-BA, Gesundheitsuntersuchungs-Richtlinie, § 2'],
            ['Hautkrebsscreening', 'ab 35 Jahren', 'alle zwei Jahre', 'G-BA, KFE-Richtlinie, § 29'],
            ['Darmkrebs: Stuhltest oder Darmspiegelung', 'ab 50 Jahren', 'Stuhltest alle zwei Jahre, Darmspiegelung höchstens zweimal im Abstand von zehn Jahren', 'G-BA, oKFE-Richtlinie, Darm § 3'],
            ['Lungenkrebs: Niedrigdosis-CT bei starkem Zigarettenkonsum', '50 bis 75 Jahre', 'alle 12 Monate', 'G-BA, KFE-Richtlinie, § 38'],
          ],
          note: 'Stand der Richtlinien: KFE-RL in Kraft seit 12.03.2026, oKFE-RL in Kraft seit 02.10.2026, Gesundheitsuntersuchungs-Richtlinie in Kraft seit 12.02.2021, Abruf am 07.10.2026. Die Lungenkrebs-Früherkennung ist seit April 2026 Kassenleistung, die Darmkrebs-Regeln gelten seit dem 1. April 2025 für Frauen und Männer gleich.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Vorsorge für Frauen: Untersuchung, Alter, Abstand, Quelle',
          head: ['Untersuchung', 'Alter', 'Abstand', 'Quelle'],
          rows: [
            ['Untersuchung der Geschlechtsorgane', 'ab 20 Jahren', 'jährlich', 'G-BA, KFE-Richtlinie, § 6 Abs. 1 a'],
            ['Abstrich vom Gebärmutterhals', '20 bis 34 Jahre', 'jährlich', 'G-BA, oKFE-Richtlinie, Zervix § 3'],
            ['Abstrich und HPV-Test zusammen', 'ab 35 Jahren', 'alle drei Jahre', 'G-BA, oKFE-Richtlinie, Zervix § 3'],
            ['Abtasten von Brust und Lymphknoten', 'ab 30 Jahren', 'jährlich', 'G-BA, KFE-Richtlinie, § 6 Abs. 1 b'],
            ['Mammographie-Screening', '50 bis 75 Jahre', 'alle 24 Monate', 'G-BA, KFE-Richtlinie, § 10'],
            ['Test auf Chlamydien-Infektion', 'bis 25 Jahre', 'einmal jährlich', 'gesund.bund.de, Check-up'],
          ],
          note: 'Über eine Absenkung der Mammographie-Altersgrenze auf 45 Jahre berät der G-BA (Pressemitteilung 16.04.2026, Stellungnahmeverfahren seit 23.07.2026). Beschlossen ist sie nicht, es gilt 50 bis 75. Für die Schwangerschaft gelten die Regeln der Mutterschaftsvorsorge.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Vorsorge für Männer: Untersuchung, Alter, Abstand, Quelle',
          head: ['Untersuchung', 'Alter', 'Abstand', 'Quelle'],
          rows: [
            ['Prostata, äußeres Genitale und Lymphknoten abtasten', 'ab 45 Jahren', 'jährlich', 'G-BA, KFE-Richtlinie, §§ 1, 2 und 25'],
            ['Ultraschall der Bauchaorta', 'ab 65 Jahren', 'einmalig', 'G-BA, Gesundheitsuntersuchungs-Richtlinie, Abschnitt Bauchaortenaneurysma, § 2'],
          ],
          note: 'Der PSA-Test zur Früherkennung gehört nicht zum gesetzlichen Angebot. Der G-BA berät seit dem 16.10.2025 über ein risikoabhängiges Angebot mit PSA-Wert und MRT, beschlossen ist dazu nichts.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die Einzelheiten stehen auf den Seiten ' },
            { text: 'Vorsorgeuntersuchungen für Männer', to: '/ratgeber/vorsorgeuntersuchung-maenner' },
            { text: ', ' },
            { text: 'Vorsorgeuntersuchung für Frauen', to: '/ratgeber/vorsorgeuntersuchung-frauen' },
            { text: ' und ' },
            { text: 'Hautkrebsscreening', to: '/ratgeber/hautkrebsscreening' },
            { text: '. Was in der Schwangerschaft zusteht, erklärt der Ratgeber ' },
            { text: 'Schwangerschaft: was steht mir zu', to: '/ratgeber/schwangerschaft-was-steht-mir-zu' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'ab-35',
      heading: 'Welche Vorsorgeuntersuchung steht ab 35, ab 40 und ab 50 zu?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mit 35 beginnt die Vorsorge für Erwachsene richtig. Der Check-up wechselt von einmalig auf alle drei Jahre, das Hautkrebsscreening kommt dazu, und Frauen bekommen statt des jährlichen Abstrichs den Ko-Test mit HPV-Test alle drei Jahre. Mit 40 kommt nichts Neues dazu, die Untersuchungen ab 35 laufen weiter, bei Frauen außerdem das jährliche Abtasten der Brust, das seit 30 gilt.',
        },
        {
          type: 'paragraph',
          text: 'Mit 45 beginnt für Männer die jährliche Untersuchung von Prostata und äußerem Genitale. Mit 50 starten die Darmkrebs-Früherkennung für alle und das Mammographie-Screening für Frauen, bei starkem Zigarettenkonsum außerdem die Lungenkrebs-Früherkennung. Männer ab 65 haben einmalig Anspruch auf den Ultraschall der Bauchaorta.',
        },
      ],
    },
    {
      id: 'hausarzt',
      heading: 'Wer macht die Vorsorgeuntersuchung, der Hausarzt oder der Facharzt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt von der Untersuchung ab. Den Check-up führen nach der Richtlinie Allgemeinärztinnen und Allgemeinärzte, Internistinnen und Internisten sowie Ärztinnen und Ärzte ohne Gebietsbezeichnung durch. Das Hautkrebsscreening darf eine Hausärztin oder ein Hausarzt mit Genehmigung der Kassenärztlichen Vereinigung und Fortbildung ebenso durchführen wie ein Hautarzt. Beim Darmkrebs berät jede Ärztin und jeder Arzt, die oder der Früherkennung oder Gesundheitsuntersuchungen anbietet. Für die Lungenkrebs-Früherkennung beginnt der Weg bei einer beteiligten allgemeinmedizinischen oder internistischen Praxis, die an eine Radiologie-Praxis überweist.',
        },
        {
          type: 'paragraph',
          text: 'Frag bei der Terminvergabe, ob die Praxis die Kassenleistung anbietet. Nicht jede Praxis macht jede Untersuchung, das gilt zum Beispiel für das Hautkrebsscreening.',
        },
      ],
    },
    {
      id: 'bonus',
      heading: 'Zählt die Vorsorge im Bonusprogramm der Krankenkasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, bei vielen Kassen. Nach § 65a SGB V bestimmt die Kasse in ihrer Satzung, unter welchen Voraussetzungen Versicherte einen Bonus bekommen, die Früherkennung oder Schutzimpfungen in Anspruch nehmen. Was genau zählt und wie viel es wert ist, steht in der Satzung jeder Kasse. Die Ratgeber unten zeigen es für fünf Kassen.',
        },
        {
          type: 'cards',
          heading: 'Wie dein Bonusprogramm Vorsorge zählt',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'bonus',
              tone: 'mint',
              title: 'IKK classic',
              text: 'Du sammelst Vorsorgeuntersuchungen, Impfungen und sportliche Aktivitäten und weist sie nach.',
              to: '/ratgeber/ikk-classic-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'sky',
              title: 'TK',
              text: 'Punkte für Vorsorgeuntersuchungen, Zahnkontrollen, Impfungen und sportliche Aktivitäten.',
              to: '/ratgeber/tk-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'butter',
              title: 'AOK',
              text: 'Je nach regionaler AOK zählen etwa Check-up, Krebsfrüherkennung, Hautkrebsscreening und Schutzimpfung.',
              to: '/ratgeber/aok-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'lavender',
              title: 'BARMER',
              text: 'Bonuspunkte für Vorsorge, Impfungen, Zahnkontrollen und Sport.',
              to: '/ratgeber/barmer-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'coral',
              title: 'mkk',
              text: 'Jede nachgewiesene Vorsorgeuntersuchung, die Zahnkontrolle und jede Schutzimpfung zählen.',
              to: '/ratgeber/mkk-bonusprogramm-2026',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wie sich Kassen vergleichen lassen, zeigt kassenboost.de anhand der Satzungen.',
        },
      ],
    },
    {
      id: 'igel',
      heading: 'Was ist der Unterschied zwischen Kassenvorsorge und IGeL?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Alles, was nicht in den Richtlinien steht, ist eine individuelle Gesundheitsleistung, kurz IGeL. Gesetzliche Kassen bezahlen sie nicht, du zahlst selbst. Gesund.bund.de schreibt dazu, dass es für den Nutzen vieler solcher Maßnahmen keine ausreichenden Belege gibt oder sie noch nicht bewertet wurden. Beispiele sind der Ultraschall der Eierstöcke oder der Prostata und die Bestimmung mancher Laborwerte.',
        },
        {
          type: 'paragraph',
          text: 'Der IGeL-Monitor des Medizinischen Dienstes Bund hat bis Juli 2025 68 Leistungen eingeschätzt. Die große Mehrzahl der Bewertungen lautet „unklar“ oder „tendenziell negativ“, keine Leistung erhielt „positiv“ (Verbraucherzentrale, Stand 15.07.2025). Das heißt nicht, dass jede Zusatzuntersuchung überflüssig ist. Es heißt, dass du nach Nutzen und Risiken fragen darfst, bevor du bezahlst.',
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Was erstattet ein Tarif bei Vorsorge über die Kasse hinaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auf healio.de/ambulant stehen zwei Wege für zusätzliche ärztliche Vorsorge, und beide sind kein Ersatz für die Kassenleistung. Im ambulanten Tarif der SDK hat jede Stufe einen eigenen Vorsorge-Topf, in Ambulant 100 bis zu 500 EUR in zwei Jahren, daneben Töpfe für Sehhilfen, Naturheilverfahren und Zuzahlungen. Wer nur Vorsorge will, kann den Vorsorge-Baustein der UKV wählen.',
        },
        {
          type: 'paragraph',
          text: 'Laut UKV zahlt der Vorsorgetarif ärztliche Vorsorge auch dann, wenn deine Krankenkasse sie in deinem Alter oder in diesem Abstand nicht übernimmt. Die Seite nennt als Beispiele Hautkrebs-Screening mit Auflichtmikroskopie, Krebsvorsorge wie Darmspiegelung, Mammografie, Ultraschall der Brust, PSA- oder HPV-Test, einen allgemeinen Check-up sowie ein großes Blutbild mit Vitamin D und Schilddrüsenwert. Für Kinder nennt sie U10, U11, J2 und Augen- und Hör-Check.',
        },
        {
          type: 'paragraph',
          text: 'Die ärztliche Vorsorge ist dort zu 100 % versichert, bis 500 EUR pro Jahr. Im 1. Kalenderjahr sind es bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR. Der Baustein kostet ab 20 Jahren 13,45 EUR im Monat, bis 19 Jahre 8,80 EUR. Erstattet wird die Untersuchung beim Arzt mit Rechnung nach GOÄ. Rechnungen vom Heilpraktiker, Pauschalrechnungen und Quittungen zählen nicht. Bei begründetem Krankheitsverdacht ist es Behandlung und keine Vorsorge.',
        },
        {
          type: 'costCard',
          title: 'Vorsorge: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit dem Vorsorge-Baustein der UKV: ärztliche Vorsorge zu 100 %, bis 500 EUR pro Jahr, im 1. Kalenderjahr bis 200 EUR, in den ersten beiden Kalenderjahren zusammen bis 500 EUR, Rechnung nach GOÄ. Euro-Beträge für einzelne Untersuchungen nennen wir nicht, weil sie je Praxis verschieden sind.',
          caption: 'Kostenkarte: Vorsorge ohne und mit Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Untersuchung nach Richtlinie, wenn Alter und Abstand passen', 'die Untersuchung', 'nichts', 'nichts, es ist Kassenleistung'],
            ['Untersuchung außerhalb von Alter oder Abstand, ohne Verdacht', 'nichts, außer die Satzung deiner Kasse sieht einen Zuschuss vor', 'die Rechnung nach GOÄ, Preis je Praxis', 'Der Baustein erstattet ärztliche Vorsorge mit GOÄ-Rechnung bis zu den genannten Grenzen'],
            ['Untersuchung wegen Beschwerden oder Verdacht', 'die Untersuchung als Krankenbehandlung, in jedem Alter', 'nichts', 'nichts, kein Fall für den Baustein'],
          ],
          note: 'Keine Preisangabe. Quelle der Kassenregeln: G-BA und gesund.bund.de, Quelle der Tarifangaben: Unterlagen auf healio.de/ambulant (UKV-Beiträge gültig ab 01.05.2026). Zusammen mit Krankenkasse und anderen Versicherungen wird nie mehr als der Rechnungsbetrag erstattet. Maßgeblich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'prevention',
          text: 'Du willst Vorsorge über das Kassenangebot hinaus prüfen? Der Tarifrechner zeigt dir den Beitrag, bevor du etwas beantragst.',
          label: 'Ambulanten Tarif ansehen',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Mehr Untersuchungen sind nicht automatisch bessere Vorsorge.', text: 'Gesund.bund.de weist darauf hin, dass Früherkennung auch Nachteile haben kann: falsch positive und falsch negative Befunde und Überdiagnosen. Diese Seite empfiehlt keine Untersuchung und keinen Verzicht. Das klärst du mit deiner Ärztin oder deinem Arzt.' },
            { lead: 'Der Baustein erstattet Rechnungen, er bewertet keine Untersuchung.', text: 'Er zahlt ärztliche Vorsorge mit GOÄ-Rechnung bis zu den Grenzen. Ob eine Untersuchung bei dir sinnvoll ist, sagt er nicht.' },
            { lead: 'Beschwerden gehören zur Untersuchung, nicht in die Vorsorge.', text: 'Bei Beschwerden oder einem Krankheitsverdacht hast du Anspruch auf Untersuchung und Behandlung, in jedem Alter und unabhängig vom Abstand. Dieser Ratgeber stellt keine Diagnose.' },
          ],
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Vorsorge-Ratgeber hilft dir weiter?',
      blocks: [
        {
          type: 'cards',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'advisor',
              tone: 'sky',
              title: 'Vorsorgeuntersuchungen für Männer',
              text: 'Was ab 35, 45 und 50 zusteht, der PSA-Test und der Darm.',
              to: '/ratgeber/vorsorgeuntersuchung-maenner',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'coral',
              title: 'Vorsorgeuntersuchung für Frauen',
              text: 'Was ab 20, 30 und 50 zusteht, Mammographie und Abstrich.',
              to: '/ratgeber/vorsorgeuntersuchung-frauen',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'prevention',
              tone: 'mint',
              title: 'Hautkrebsscreening',
              text: 'Ab 35 alle zwei Jahre, mit Dermatoskop, und was unter 35 anfällt.',
              to: '/ratgeber/hautkrebsscreening',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'TK Reiseimpfungen',
              text: 'Was die Techniker erstattet und wie du die Rechnung einreichst.',
              to: '/ratgeber/tk-reiseimpfung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Vorsorge zeigt Healio den ambulanten Tarif der SDK mit eigenem Vorsorge-Topf und als kleine Zusatzoption den Vorsorge-Baustein der UKV. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Welche Vorsorgeuntersuchungen gibt es?',
      answer:
        'Für Kinder die Untersuchungen U1 bis U9 und die J1 mit 13 bis 14 Jahren, für Erwachsene den Check-up ab 18 (ab 35 alle drei Jahre), das Hautkrebsscreening ab 35, die Darmkrebs-Früherkennung ab 50 und bei starkem Zigarettenkonsum die Lungenkrebs-Früherkennung von 50 bis 75. Frauen haben zusätzlich Untersuchung der Geschlechtsorgane ab 20, Abstrich bis 34 beziehungsweise Ko-Test ab 35, Brust ab 30 und Mammographie von 50 bis 75. Männer haben ab 45 die Untersuchung von Prostata und äußerem Genitale und ab 65 einmalig den Ultraschall der Bauchaorta.',
    },
    {
      question: 'Welche Vorsorgeuntersuchungen zahlt die Kasse ab 40?',
      answer:
        'Der Check-up alle drei Jahre und das Hautkrebsscreening alle zwei Jahre, beides gilt seit 35. Frauen haben außerdem die jährliche Untersuchung der Geschlechtsorgane, den Ko-Test alle drei Jahre und das jährliche Abtasten der Brust. Für Männer beginnt die Prostata-Untersuchung mit 45.',
    },
    {
      question: 'Welche Vorsorgeuntersuchungen zahlt die Kasse ab 50?',
      answer:
        'Zusätzlich die Darmkrebs-Früherkennung mit Stuhltest alle zwei Jahre oder Darmspiegelung, für Frauen das Mammographie-Screening alle zwei Jahre bis 75 und bei starkem Zigarettenkonsum die Lungenkrebs-Früherkennung alle 12 Monate von 50 bis 75. Alle Untersuchungen ab 35 laufen weiter.',
    },
    {
      question: 'Wie oft darf ich zur Vorsorgeuntersuchung?',
      answer:
        'Das legt die Richtlinie je Untersuchung fest. Der Check-up ist ab 35 alle drei Jahre vorgesehen, das Hautkrebsscreening alle zwei Jahre, die Untersuchung von Prostata oder Geschlechtsorganen jährlich, die Mammographie alle 24 Monate. Gezählt wird nach Kalenderjahren.',
    },
    {
      question: 'Zählt die Vorsorge im Bonusprogramm meiner Kasse?',
      answer:
        'Bei vielen Kassen ja. Nach § 65a SGB V bestimmt jede Kasse in ihrer Satzung, unter welchen Voraussetzungen Früherkennung und Schutzimpfungen einen Bonus bringen. Die Ratgeber zu IKK classic, TK, AOK, BARMER und mkk zeigen, wie das aussieht.',
    },
    {
      question: 'Zahlt die Kasse die Vorsorgeuntersuchung beim Hausarzt?',
      answer:
        'Ja, den Check-up, den Allgemeinärztinnen und Allgemeinärzte, Internistinnen und Internisten sowie Ärztinnen und Ärzte ohne Gebietsbezeichnung durchführen. Auch das Hautkrebsscreening zahlt die Kasse beim Hausarzt, wenn die Praxis dafür qualifiziert ist. Zur Darmkrebs-Früherkennung berät jede Ärztin und jeder Arzt, die oder der Früherkennung anbietet. Frag bei der Terminvergabe, ob die Praxis die Leistung anbietet.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir in den Tabellen die Untersuchungen für dein Alter heraus und frag in deiner Praxis nach einem Termin. Zu Männern, Frauen und Haut gibt es eigene Seiten, den Vorsorge-Topf des ambulanten Tarifs findest du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Alter, Abstand und Leistung stammen aus den Richtlinien des G-BA und gesund.bund.de, die Einordnung der Selbstzahlerleistungen aus der Verbraucherzentrale, der Bonus aus dem Gesetz und den Kassen-Ratgebern.',
    items: [
      {
        label: 'Krebsfrüherkennungs-Richtlinie (KFE-RL)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4074/KFE-RL_2025-12-18_iK-2026-03-12.pdf',
        stand: 'geändert 18.12.2025, in Kraft seit 12.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Richtlinie für organisierte Krebsfrüherkennungsprogramme (oKFE-RL)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4233/oKFE-RL-2026-08-20-iK-2026-10-02.pdf',
        stand: 'geändert 20.08.2026, in Kraft seit 02.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheitsuntersuchungs-Richtlinie (Check-up, Hepatitis-Screening, Bauchaortenaneurysma)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-2383/GU-RL_2020-11-20_iK-2021-02-12.pdf',
        stand: 'geändert 20.11.2020, in Kraft seit 12.02.2021',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Kinder-Richtlinie (U1 bis U9)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-3998/Kinder-RL_2025-05-15_iK-2026-01-01.pdf',
        stand: 'geändert 15.05.2025, in Kraft seit 01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Früherkennung bei Kindern und Jugendlichen: G-BA führt neue U10 ein',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1350/',
        stand: '20.08.2026, Beschluss noch nicht in Kraft',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Jugendgesundheitsuntersuchungs-Richtlinie (J1)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-1270/RL-JUG_2016-07-21_iK-2017-01-01.pdf',
        stand: 'geändert 21.07.2016, in Kraft seit 01.01.2017',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Darmkrebs-Vorsorge: Darmspiegelung jetzt auch für Frauen ab 50 Jahren möglich',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Meldung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1248/',
        stand: '01.04.2025, Inkrafttreten der gleichen Regeln für Frauen und Männer ab 50',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Lungenkrebs-Früherkennung für Raucherinnen und Raucher kommt ab April in die Versorgung',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1316/',
        stand: '13.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Mammographie-Screening zur Früherkennung von Brustkrebs: GBA berät über Absenkung der Altersgrenze auf 45 Jahre',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1324/',
        stand: '16.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Einleitung des Stellungnahmeverfahrens: Erweiterung der unteren Altersgrenze im Mammographie-Screening',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Beschluss',
        href: 'https://www.g-ba.de/beschluesse/7918/',
        stand: '23.07.2026, Stellungnahmeverfahren eingeleitet, kein Endbeschluss',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Früherkennung von Prostatakrebs: G-BA prüft risikoabhängiges Angebot',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA), Pressemitteilung',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1290/',
        stand: '16.10.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Informationen zu Krebsfrüherkennung',
        publisher: 'gesund.bund.de (Bundesministerium für Gesundheit)',
        href: 'https://gesund.bund.de/krebsfrueherkennung',
        stand: '25.03.2025, vor der Einführung der Lungenkrebs-Früherkennung',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheits-Check-up für Erwachsene',
        publisher: 'gesund.bund.de (Bundesministerium für Gesundheit)',
        href: 'https://gesund.bund.de/gesundheits-check-up-fuer-erwachsene',
        stand: '06.10.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wissenschaftliche Bewertung von individuellen Gesundheitsleistungen',
        publisher: 'Verbraucherzentrale (zum IGeL-Monitor des Medizinischen Dienstes Bund)',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/wissenschaftliche-bewertung-von-individuellen-gesundheitsleistungen-34224',
        stand: '15.07.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 65a Bonus für gesundheitsbewusstes Verhalten',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__65a.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der Techniker Krankenkasse, Anlage 3 (Bonus) und § 19; Satzung der IKK classic, Stand 01.08.2026, §§ 34o bis 34r',
        publisher: 'Techniker Krankenkasse, IKK classic',
        href: 'https://www.tk.de/tk/unternehmen-und-karriere/ueber-die-tk/satzung-der-tk/149038',
        stand: 'TK-Satzung Stand 17.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen SDK Ambulant und UKV Vorsorge-Baustein, wie auf healio.de/ambulant',
        publisher: 'SDK und UKV',
        stand: '07.10.2026',
        note: 'Beiträge der UKV gültig ab 01.05.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Dieser Ratgeber ersetzt keine ärztliche Beratung. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
