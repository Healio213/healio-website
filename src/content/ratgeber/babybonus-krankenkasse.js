/**
 * Familien-Ratgeber (Serie, Stapel krankenhaus-familie), Seite: Babybonus der
 * Krankenkassen 2026, wer zahlt was.
 *
 * SCHWANGERSCHAFTSSEITE, SPERRLISTEN-KANDIDAT (Google Ads, Entscheidung der
 * Marktanalyse-Sitzung 07.10.2026): Der Pfad /ratgeber/babybonus-krankenkasse gehört in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js), damit auf dieser Seite
 * weder Werbe-Messung noch Remarketing laufen. Die Seite nennt weder
 * Kinderwunsch noch NIPT noch die Nackenfaltenmessung.
 *
 * Quellen (Belege je Zahl in babybonus-krankenkasse.belege.md, Abruf 07.10.2026):
 * KassenBoost (GKV-Vergleichskampagne/website/app, Satzungsbelege mit Fundstelle:
 * satzungs-leistungen.server.ts, erhoben 26.08.2026, und die Kassenmodule
 * *-bonus-2026.server.ts), Kassenseiten (mkk, AOK Rheinland/Hamburg, AOK Hessen,
 * AOK PLUS, IKK classic), SGB V § 11 Abs. 6, § 65a, § 175, GKV-Spitzenverband
 * Krankenkassenliste (Zusatzbeitrag, Stand 05.10.2026), VVG § 198. Tarifaussagen
 * nur wie auf healio.de/stationaer (live 07.10.2026).
 *
 * Prüflauf 07.10.2026: alle zwölf Kassenwerte gegen satzungs-leistungen.server.ts
 * und die *-bonus-2026.server.ts geprüft (ohne Abweichung), Stichprobe auf den
 * Kassenseiten mkk, AOK Rheinland/Hamburg, AOK Hessen, AOK PLUS und IKK classic
 * ohne Abweichung. Im Text steht der Stand "Satzungen ausgewertet im August 2026".
 *
 * Bewusste Grenzen:
 *   - Die Tabelle zeigt zwölf Kassen mit belegten Werten und Fundstelle. Sie ist
 *     kein Marktquerschnitt. Die sechs weiteren AOKs und andere Kassen stehen
 *     nicht darin, weil sie hier nicht geprüft wurden.
 *   - IKK classic: laut Satzung bis zu 810 EUR Zuschusswert im Jahr, in der
 *     Schwangerschaft bis zu 1.155 EUR, beides theoretisch; "realistisch 400 bis
 *     700 EUR" ist Einschätzung aus der Beratung und keine Belegzahl (wie im
 *     IKK-Ratgeber). Die Gegenrechnung mit dem Zusatzbeitrag steht im selben
 *     Absatz.
 *   - 10 Vorsorgeuntersuchungen im Rechenbeispiel sind Annahme; die Satzung
 *     nennt keine Höchstzahl.
 *   - Der Bonus wird nie als Geld versprochen, sondern als zweckgebundener
 *     Zuschuss zum Beitrag einer Zusatzversicherung, höchstens bis zur Höhe der
 *     nachgewiesenen Beiträge.
 *   - Aus den Satzungstexten der AOK Rheinland/Hamburg werden die dort
 *     aufgezählten Einzeluntersuchungen nicht übernommen (Regel: keine
 *     Nackenfalte, kein NIPT).
 *   - Keine Aussage, ob Healio am Kassenwechsel verdient. Keine 3.000 EUR (für
 *     Schwangere zählt nur der Vorsorge-Topf, der hier nicht Thema ist).
 *   - Angebotspfad laut Themenliste war kassenboost.de. Beim Einbau
 *     (07.10.2026) auf /stationaer umgestellt, weil Kurzantwort und Weg-Karten
 *     nach dem Vertragstest einen internen Pfad brauchen (PRODUKTION-RATGEBER.md
 *     Abschnitt 10, Schritt 5); kassenboost.de bleibt als Textlink im Abschnitt
 *     Zusatzschutz und im Weiter-Absatz. /stationaer passt zum Abschnitt
 *     Zusatzschutz (Zuschuss zum Beitrag, Nachversicherung des Babys).
 */

export const article = {
  slug: 'babybonus-krankenkasse',
  kind: 'ratgeber',
  group: 'familie',

  metaTitle: 'Babybonus Krankenkasse 2026: wer zahlt was | Healio',
  metaDescription:
    'Babybonus der Krankenkassen 2026: Was IKK classic, TK, Barmer, DAK, mkk und AOKs zahlen, mit Fundstelle in der Satzung, Musterrechnung und Rechenweg.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Babybonus Krankenkasse 2026: wer zahlt was',
  listTeaser:
    'Was Krankenkassen rund um Schwangerschaft und Baby zahlen, mit Fundstelle in der Satzung, Musterrechnung und der Gegenrechnung mit dem Zusatzbeitrag.',

  headline: 'Babybonus Krankenkasse 2026: wer zahlt was',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'bonus',
    facts: [
      { value: 'Je Kasse anders', label: 'Einen Babybonus zahlt nicht jede Kasse, die Satzung entscheidet' },
      { value: '190 EUR einmalig', label: 'Babybonus der mkk nach § 15 Abs. 3 ihrer Satzung' },
      { value: '400 bis 700 EUR', label: 'IKK classic, realistischer Zuschusswert im Jahr, aus der Beratung' },
    ],
    text: 'Ein Babybonus ist eine freiwillige Leistung der Kasse und steht in ihrer Satzung. In der Tabelle reichen die Beträge von einmalig 50 EUR bis zu Budgets von 500 EUR je Schwangerschaft. Wie viel für dich zusammenkommt, hängt von Kasse und Bedingungen ab.',
    path: { to: '/stationaer', text: 'Wie der Bonus beim Zusatzschutz helfen kann', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Einen Babybonus zahlt nicht jede Krankenkasse. Er ist keine gesetzliche Pflicht, sondern eine freiwillige Leistung, die in der Satzung der Kasse steht, oft mit Bedingungen wie vollständiger Vorsorge in der Schwangerschaft oder den U-Untersuchungen des Kindes. Hier siehst du zwölf Kassen mit Betrag und Fundstelle in der Satzung, eine Musterrechnung, den Rechenweg für den Kassenwechsel und wie der Bonus beim Zusatzschutz für dich und dein Baby helfen kann.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was ist der Babybonus der Krankenkasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Begriff meint bei jeder Kasse etwas anderes. Die mkk beschreibt ihren Babybonus als freiwillige Satzungsleistung und weist darauf hin, dass nicht alle Krankenkassen einen Babybonus zahlen, weil die Leistung nicht gesetzlich vorgeschrieben ist. Die Rechtsgrundlage ist breit gefasst: Eine Kasse kann in ihrer Satzung zusätzliche Leistungen vorsehen, unter anderem bei den Leistungen von Hebammen bei Schwangerschaft und Mutterschaft, und muss dann Art, Dauer und Umfang bestimmen (§ 11 Abs. 6 SGB V).',
        },
        {
          type: 'list',
          items: [
            { lead: 'Bonus für Vorsorge und U-Untersuchungen.', text: 'Eine Kasse belohnt die vollständige Vorsorge in der Schwangerschaft oder die U-Untersuchungen des Kindes mit einem Betrag. Beispiele sind mkk, BKK Salzgitter, BKK VDN und BKK Melitta HMR. Das Gesetz erlaubt Boni für gesundheitsbewusstes Verhalten und überlässt die Bedingungen der Satzung (§ 65a SGB V).' },
            { lead: 'Budget für Zusatzleistungen.', text: 'Die AOK Rheinland/Hamburg nennt ihr Budget Baby-Bonus: 250 EUR je Schwangerschaft, von denen sie 80 Prozent der nachgewiesenen Kosten bezuschusst. Die AOK PLUS hält 500 EUR je Schwangerschaft bereit.' },
            { lead: 'Bonus je Vorsorge im großen Programm.', text: 'IKK classic, TK, Barmer und DAK zahlen im Bonusprogramm einen Wert für die gesetzliche Mutterschaftsvorsorge, ohne ihn Babybonus zu nennen. Daneben stehen Satzungsleistungen wie die Rufbereitschaft der Hebamme.' },
          ],
        },
      ],
    },
    {
      id: 'tabelle',
      heading: 'Welche Krankenkasse zahlt welchen Babybonus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Tabelle zeigt zwölf Kassen mit belegtem Betrag und der Fundstelle in der Satzung, wie sie KassenBoost ausweist. Stand: Satzungen ausgewertet im August 2026. Eine Rangliste ist das nicht, und vollständig ist sie auch nicht.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Babybonus und Zusatzleistungen rund um Schwangerschaft und Baby bei zwölf Krankenkassen mit Fundstelle in der Satzung',
          head: ['Krankenkasse', 'Was die Satzung vorsieht', 'Fundstelle laut KassenBoost'],
          rows: [
            ['IKK classic', 'Bonus je gesetzlicher Mutterschaftsvorsorge 10 EUR, als Zuschuss zu einer Zusatzversicherung 30 EUR. Dazu Hebammen-Rufbereitschaft bis 250 EUR je Schwangerschaft und Zusatztests bis 100 EUR je Schwangerschaft.', 'Satzung Stand 01.08.2026, § 34 Abs. 2 Nr. 1 b, §§ 34c, 34g, 34h'],
            ['TK', 'Vollständige Vorsorge 5.000 Punkte, das sind 50 EUR, als Gesundheitsdividende 100 EUR bis zur Höhe nachgewiesener Kosten. Rufbereitschaft bis 250 EUR, Partnerkurs 80 Prozent bis 100 EUR.', 'Anlage 3 (Seite 34), Anlage 2 Ziffer 2 (Dividende), § 27g Abs. 2, § 27l'],
            ['Barmer', 'Vollständige Vorsorge 100 Punkte, das sind 10 EUR, als Zuschuss 20 EUR. Barmer Familie Plus bis 200 EUR je Schwangerschaft für alle Leistungen zusammen.', 'Anlage zu § 37 Teil 2, § 37 Abs. 3 Satz 2, § 28d Abs. 1 bis 3'],
            ['DAK', 'Vollständige Vorsorge 15 Punkte, ein Punkt entspricht 1 EUR. Rufbereitschaft bis 500 EUR je Schwangerschaft.', 'Anlage zu § 25, § 25 Abs. 3, § 19a Abs. 1 bis 10 (Betrag in Abs. 3)'],
            ['mkk', 'Babybonus 190 EUR einmalig, wenn Mutter und Kind bei der mkk versichert sind, alle Vorsorgen, U1 bis U6 und die Impfungen im ersten Lebensjahr nachgewiesen sind und der Antrag bis zum 14. Lebensmonat vorliegt. Dazu bis 600 EUR je Kalenderjahr für Rufbereitschaft, Tests, Arzneimittel und Partnerkurs.', '§ 15 Abs. 3 (Seite 41), § 13 Abs. 11 Nr. 3 mit Abs. 20 bis 23'],
            ['AOK Rheinland/Hamburg', 'Baby-Bonus: Budget 250 EUR je Schwangerschaft, 80 Prozent der nachgewiesenen Kosten, 100 Prozent bei erreichter Belastungsgrenze. Dazu Rufbereitschaft bis 250 EUR.', '§ 12a, § 12c Abs. 2'],
            ['AOK Hessen', 'Baby-Bonus: Kostenerstattung bis 150 EUR für Babykurse im ersten Lebensjahr, gebunden an vollständige U1 bis U6 und eine Impfung. Das Schwangerschaftspaket zahlt bis zu 400 EUR je Schwangerschaft.', '§ 32 (Satzungsseite 37), Paket laut Seite der AOK Hessen'],
            ['AOK PLUS', 'SchwangerschaftPLUS: Budget bis 500 EUR je Schwangerschaft, darin die Rufbereitschaft mit höchstens 250 EUR.', '§ 11a Abs. 1 und 2 (Seiten 16 und 17)'],
            ['AOK Bayern', 'Einzelzuschüsse je Schwangerschaft: Rufbereitschaft bis 250 EUR, Partnerkurs bis 75 EUR, Folsäure, Magnesium und Eisen bis 100 EUR.', '§ 10e Abs. 1 bis 8'],
            ['BKK Salzgitter', 'Babybonus 100 EUR für die Mutter bei allen Vorsorgeuntersuchungen, 100 EUR für das Kind bei U1 und U2 in den ersten 10 Lebenstagen.', 'Anlage III 1.2 (Seite 38)'],
            ['BKK VDN', 'Babybonus 150 EUR bei vollständigen U1 bis U6 und Schutzimpfungen im ersten Lebensjahr, nur einmal.', '§ 16b Abs. V (Seite 31)'],
            ['BKK Melitta HMR', 'Baby-Bonus 50 EUR einmal je Geburt bei vollständiger Vorsorge nach dem Mutterpass, nur für weibliche Versicherte.', '§ 14d'],
          ],
          note: 'Quellen: KassenBoost (Satzungsbelege mit Fundstelle, Satzungen ausgewertet im August 2026) und die Seiten der Kassen, abgerufen am 07.10.2026. Beträge in EUR je Schwangerschaft oder Geburt, wo nicht anders genannt. Bedingungen und Nachweise stehen in der jeweiligen Satzung, Satzungen ändern sich. Die Tabelle ist kein Marktquerschnitt, weitere Kassen und die übrigen AOKs sind nicht aufgeführt.',
        },
      ],
    },
    {
      id: 'ikk',
      heading: 'Wie viel bringt der Bonus der IKK classic in der Schwangerschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, weil jede gesetzliche Vorsorge einzeln zählt, beides theoretische Werte. In der breiten Masse sind realistisch 400 bis 700 EUR zu erwarten, das ist unsere Einschätzung aus der Beratung und ausdrücklich keine Belegzahl. Dagegen steht der Zusatzbeitrag von 3,85 Prozent, den die IKK classic 2026 verlangt, und wer wechselt, rechnet beides gegeneinander.',
        },
        {
          type: 'paragraph',
          text: 'Je gesetzlicher Mutterschaftsvorsorge nennt die Satzung 10 EUR, als Zuschuss zu einer Zusatzversicherung dreifach, also 30 EUR. Eine Höchstzahl von Untersuchungen nennt die Satzung nicht, die Zahl richtet sich nach dem Verlauf der Schwangerschaft. Der Zuschuss wird höchstens bis zur Höhe der nachgewiesenen Beiträge gezahlt.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Alle Positionen, Nachweise und Fristen stehen im Ratgeber ' },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'rechnung',
      heading: 'Was bleibt bei dir hängen, mit und ohne Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Musterrechnung zeigt, was eine Schwangere bei der IKK classic mit zehn Vorsorgeuntersuchungen erreicht und was daraus für den Zusatzschutz werden kann.',
        },
        {
          type: 'costCard',
          title: 'Musterrechnung: Schwangerschaft bei der IKK classic',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der IKK classic nach Satzung Stand 01.08.2026: 10 EUR je gesetzlicher Vorsorge, als Zuschuss zum Beitrag einer Zusatzversicherung 30 EUR. Für das Kind zählt sein eigener Bonus, je U-Untersuchung ebenfalls 10 EUR, als Zuschuss 30 EUR. Annahme: zehn Vorsorgeuntersuchungen, die Satzung nennt keine Höchstzahl. Der Zuschuss wird höchstens bis zur Höhe der nachgewiesenen Beiträge gezahlt.',
          caption: 'Kostenkarte: Bonus in der Schwangerschaft mit und ohne Zusatzversicherung',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Vorsorge in der Schwangerschaft, zehn Untersuchungen (Annahme)', 'die Untersuchungen nach den Mutterschaftsrichtlinien', 'einfacher Bonuswert 100 EUR (10 mal 10 EUR), der dreifache Zuschuss bleibt ungenutzt', 'Zuschusswert 300 EUR (10 mal 30 EUR) für den Beitrag deiner Zusatzversicherung, höchstens bis zum nachgewiesenen Beitrag'],
            ['Klinik-Tarif fürs Kind nach der Geburt, Bayerische Komfort bis 15 Jahre, 3,20 EUR im Monat', 'keine Kassenleistung', '38,40 EUR im Jahr trägst du selbst', 'Der eigene Bonus des Kindes kann den Beitrag tragen: Schon U1 und U2 ergeben rechnerisch 60 EUR Zuschusswert, gezahlt wird höchstens der nachgewiesene Beitrag'],
            ['Hebamme in der Rufbereitschaft', 'bis 250 EUR je Schwangerschaft laut Satzung', 'der Rest der Rechnung', 'Für diese Schwangerschaft zahlt kein Klinik-Tarif auf healio.de/stationaer zusätzlich, wenn du beim Antrag schon schwanger bist'],
            ['Entbindung im Krankenhaus', 'die medizinisch notwendige Versorgung', 'was über die Kassenleistung hinausgeht', 'Der Tarif zahlt diese Entbindung nicht, wenn du beim Antrag schon schwanger bist'],
          ],
          note: 'Musterrechnung, keine Preisangabe und kein Versprechen. Eigene Rechnung: 10 mal 10 EUR, 10 mal 30 EUR, 2 mal 30 EUR, 3,20 EUR mal 12 Monate. Bonus und Rufbereitschaft nach der Satzung der IKK classic, Stand 01.08.2026, Infoblatt Kennziffer 09 und §§ 34c, 34g, 34h, Werte der U-Untersuchungen nach KassenBoost. Der Beitrag fürs Kind nach healio.de/stationaer, Stand 09/2026, Altersgruppe bis 15 Jahre. Welche Beiträge die Kasse als zuschussfähig anerkennt, regelt ihre Satzung. Annahmen: gesetzlich versichert, Tarif vor dem Versicherungsfall abgeschlossen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'wechsel',
      heading: 'Lohnt sich ein Kassenwechsel wegen des Babybonus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ein Wechsel ist in der Schwangerschaft erlaubt: Die neue Kasse darf die Mitgliedschaft nicht ablehnen (§ 175 Abs. 1 SGB V). Nach einer Bindung von mindestens zwölf Monaten ist die Kündigung zum Ablauf des übernächsten Kalendermonats möglich (§ 175 Abs. 4 SGB V). Bonus und Extras der neuen Kasse gelten erst ab dem ersten Tag der Mitgliedschaft dort. Wer in der Mitte der Schwangerschaft wechselt, bringt einen Teil der Vorsorgen nicht mehr mit.',
        },
        {
          type: 'paragraph',
          text: 'Entscheidend ist die Gegenrechnung mit dem Zusatzbeitrag. Er beträgt laut amtlicher Liste des GKV-Spitzenverbands, Stand 05.10.2026, bei der TK 2,69 Prozent, bei der AOK Hessen 2,98 Prozent, bei der AOK PLUS 3,10 Prozent, bei der DAK 3,20 Prozent, bei der Barmer und der AOK Rheinland/Hamburg 3,29 Prozent, bei der mkk 3,50 Prozent und bei der IKK classic 3,85 Prozent.',
        },
        {
          type: 'paragraph',
          text: 'Die Formel für pflichtversicherte Angestellte: beitragspflichtiges Bruttojahresentgelt, höchstens bis zur Beitragsbemessungsgrenze, mal Differenz in Prozentpunkten, geteilt durch zwei, weil Arbeitgeber und Arbeitnehmer den Zusatzbeitrag je zur Hälfte tragen. Ein Rechenbeispiel mit 3.500 EUR Monatsbrutto gegenüber der TK: 42.000 mal 1,16 Prozent geteilt durch zwei ergibt 243,60 EUR Mehrkosten im Jahr bei der IKK classic. Das setzt du dem Zuschusswert gegenüber, der bei dir realistisch zusammenkommt. Selbstständige tragen den Zusatzbeitrag allein.',
        },
        {
          type: 'paragraph',
          text: 'Eine eigene Rechnung für deine Lage macht KassenBoost, mit Beitrag, erreichbarem Bonus und Leistungen nach den Satzungen der Kassen.',
        },
      ],
    },
    {
      id: 'zusatzschutz',
      heading: 'Wie kann der Bonus beim Zusatzschutz für dich und dein Baby helfen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Bonus ist als Hilfe beim Beitrag gedacht, nicht als Einnahme. Bei vielen Kassen kannst du ihn als zweckgebundenen Zuschuss zum Beitrag einer Zusatzversicherung nehmen, höchstens bis zur Höhe deiner nachgewiesenen Beiträge. Auf healio.de/stationaer steht dazu: Den Beitrag zahlst du ganz normal jeden Monat, den Zuschuss beantragst du nach Ende des Bonusjahres bei deiner Krankenkasse. Wie viel du persönlich erreichst, hängt von Kasse, Aktivitäten, Nachweisen und Bonusbedingungen ab.',
        },
        {
          type: 'paragraph',
          text: 'Für dein Baby zählt der Tag der Geburt. In eine private Zusatzversicherung lässt sich ein Neugeborenes nur unter Bedingungen nachversichern: Ist am Tag der Geburt ein Elternteil beim Versicherer versichert und erfolgt die Anmeldung spätestens zwei Monate nach der Geburt, nimmt der Versicherer das Kind rückwirkend auf, ohne Risikozuschläge und Wartezeiten. Das Kind bekommt höchstens den Schutz des Elternteils, und der Versicherer darf eine Mindestversicherungsdauer des Elternteils von bis zu drei Monaten verlangen (§ 198 VVG).',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Bei der SDK gibt es laut Produktseite keine Vorversicherungszeit, bei der Bayerischen muss ein Elternteil am Tag der Geburt schon mindestens drei Monate dort versichert sein. Alle Voraussetzungen für Kinder stehen im Ratgeber ' },
            { text: 'Zusatzversicherung für Kinder', to: '/ratgeber/zusatzversicherung-kinder' },
            { text: '.' },
          ],
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ein Babybonus ist keine Pflichtleistung.', text: 'Manche Kasse zahlt einen, manche nicht. Was bei dir gilt, steht in der Satzung deiner Kasse, nicht auf dieser Seite.' },
            { lead: 'Die Werte sind Satzungswerte, keine Zusage.', text: 'Bei der IKK classic sind die 1.155 EUR in der Schwangerschaft ein theoretischer Rechenwert, realistisch 400 bis 700 EUR im Jahr, und das ist eine Einschätzung aus der Beratung.' },
            { lead: 'Manche Satzungen sperren die Doppelnutzung.', text: 'Bei der mkk können Nachweise für den Babybonus laut § 15 Abs. 3 ihrer Satzung nicht zusätzlich beim Bonusprogramm eingereicht werden. Prüf das vor der Anmeldung.' },
            { lead: 'Eine Entbindung zahlt kein Klinik-Tarif, wenn du beim Antrag schon schwanger bist.', text: 'Das steht für beide Versicherer auf healio.de/stationaer. Für das Baby gilt die Nachversicherung mit den genannten Fristen.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'family',
          text: 'Du siehst die Klinik-Tarife für dich und dein Kind, wie die Nachversicherung des Babys läuft und wie der Bonus beim Beitrag hilft.',
          label: 'Klinik-Tarife ansehen',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Welche Kasse für deine Lage am meisten bringt, rechnet ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ' mit Beitrag und Bonus.' },
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
              title: 'Zusatzversicherung für Kinder',
              text: 'Kinder nachversichern, Krankenhaus, Zahn und Brille im Überblick.',
              to: '/ratgeber/zusatzversicherung-kinder',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'pregnancy',
              tone: 'coral',
              title: 'Was steht mir in der Schwangerschaft zu?',
              text: 'Kassenleistungen, Extras und Fristen im Überblick.',
              to: '/ratgeber/schwangerschaft-was-steht-mir-zu',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'support',
              tone: 'sky',
              title: 'Hebamme: was die Krankenkasse zahlt',
              text: 'Hebammenhilfe, Rufbereitschaft und was du selbst zahlst.',
              to: '/ratgeber/hebamme-kosten-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'butter',
              title: 'Schwanger: welcher Zusatzschutz noch geht',
              text: 'Was bei bestehender Schwangerschaft noch möglich ist und was zu spät kommt.',
              to: '/ratgeber/schwanger-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, beides theoretische Werte; in der breiten Masse sind realistisch 400 bis 700 EUR zu erwarten, das ist eine Einschätzung aus der Beratung, und gegengerechnet wird der Zusatzbeitrag der Kasse. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Welche Krankenkasse zahlt einen Babybonus?',
      answer:
        'Das ist je Kasse verschieden, weil der Babybonus keine gesetzliche Pflichtleistung ist. In der Tabelle dieser Seite zahlen zum Beispiel die mkk 190 EUR einmalig, die BKK Salzgitter 100 EUR für Mutter und 100 EUR fürs Kind, die BKK VDN 150 EUR und die BKK Melitta HMR 50 EUR. Die AOK Rheinland/Hamburg hat ein Baby-Bonus-Budget von 250 EUR je Schwangerschaft.',
    },
    {
      question: 'Wie viel Bonus gibt es bei der IKK classic in der Schwangerschaft?',
      answer:
        'Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, beides theoretische Werte. In der breiten Masse sind realistisch 400 bis 700 EUR zu erwarten, so unsere Einschätzung aus der Beratung, keine Belegzahl. Je gesetzlicher Vorsorge nennt die Satzung 10 EUR, als Zuschuss 30 EUR. Gegenzurechnen ist der Zusatzbeitrag von 3,85 Prozent.',
    },
    {
      question: 'Kann der Bonus beim Zusatzschutz helfen?',
      answer:
        'Ja, bei vielen Kassen. Du nimmst ihn dann als zweckgebundenen Zuschuss zum Beitrag einer Zusatzversicherung, höchstens bis zur Höhe der nachgewiesenen Beiträge. Bei der IKK classic ist der Zuschuss dreimal so hoch wie der einfache Bonus. Was deine Kasse vorsieht, steht in ihrer Satzung.',
    },
    {
      question: 'Darf ich in der Schwangerschaft die Krankenkasse wechseln?',
      answer:
        'Ja, die neue Kasse darf die Mitgliedschaft nicht ablehnen. Du bist mindestens zwölf Monate an deine Kasse gebunden, danach ist die Kündigung zum Ablauf des übernächsten Kalendermonats möglich. Bonus und Extras der neuen Kasse gelten erst ab dem ersten Tag dort.',
    },
    {
      question: 'Wann muss ich mein Baby bei einer Zusatzversicherung anmelden?',
      answer:
        'Spätestens zwei Monate nach der Geburt, dann nimmt der Versicherer das Kind rückwirkend ab Geburt auf, ohne Risikozuschläge und Wartezeiten. Voraussetzung ist, dass am Tag der Geburt ein Elternteil beim Versicherer versichert ist. Das Kind bekommt höchstens den Schutz des Elternteils.',
    },
    {
      question: 'Zahlt ein Klinik-Tarif meine Entbindung, wenn ich schon schwanger bin?',
      answer:
        'Nein. Ist die Schwangerschaft beim Antrag schon festgestellt, zahlt kein Klinik-Tarif auf healio.de/stationaer diese Entbindung, weder bei der SDK noch bei der Bayerischen. Für spätere Entbindungen gelten bei der Bayerischen im Komfort und im Prestige acht Monate Wartezeit.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir in der Tabelle deine Kasse und lies in der Satzung nach, was dort gilt. Welche Kasse für deine Lage am meisten bringt, rechnest du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '. Was dir sonst in der Schwangerschaft zusteht, steht im Ratgeber ' },
      { text: 'Was steht mir in der Schwangerschaft zu?', to: '/ratgeber/schwangerschaft-was-steht-mir-zu' },
      { text: ', den Zusatzschutz für dein Kind im Ratgeber ' },
      { text: 'Zusatzversicherung für Kinder', to: '/ratgeber/zusatzversicherung-kinder' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Beträge und Fundstellen stammen aus den Satzungen, wie KassenBoost sie belegt, und von den Seiten der Kassen, die Rechenregeln aus dem Gesetz und der amtlichen Kassenliste.',
    items: [
      {
        label: 'Satzungsbelege und Bonusmodule der Krankenkassen mit Fundstelle',
        publisher: 'KassenBoost',
        href: 'https://kassenboost.de/',
        stand: 'Satzungen ausgewertet im August 2026 (Satzungsleistungen am 26.08.2026), Kassenmodule 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Babybonus: 190 Euro für eure Gesundheit',
        publisher: 'mkk meine krankenkasse',
        href: 'https://www.meine-krankenkasse.de/leistungen/unsere-leistungen/leistungen-von-a-bis-z/babybonus',
        stand: 'Seite abgerufen 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'AOK-Baby-Bonus',
        publisher: 'AOK Rheinland/Hamburg',
        href: 'https://www.aok.de/pk/rh/baby-bonus/',
        stand: 'Seite abgerufen 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Schwangerschaftspaket',
        publisher: 'AOK Hessen',
        href: 'https://www.aok.de/pk/hessen/schwangerschaftspaket/',
        stand: 'Seite abgerufen 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: '500 Euro für die Vorsorge in der Schwangerschaft (SchwangerschaftPLUS)',
        publisher: 'AOK PLUS',
        href: 'https://www.aok.de/pk/plus/schwangerschaftplus-paket/',
        stand: 'Seite abgerufen 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Vorsorge in der Schwangerschaft',
        publisher: 'IKK classic',
        href: 'https://www.ikk-classic.de/pk/leistungen/schwangerschaft-geburt/vorsorge-schwangerschaft',
        stand: 'Seite abgerufen 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 6 (Satzungsleistungen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        stand: 'Abruf 07.10.2026',
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
        label: 'SGB V § 175 Ausübung des Wahlrechts',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__175.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Krankenkassenliste mit Zusatzbeiträgen',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp',
        stand: '05.10.2026',
        accessedAt: '07.10.2026',
        note: 'Abzug der Liste in KassenBoost, Stand der Seite 05.10.2026',
      },
      {
        label: 'VVG § 198 Kindernachversicherung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__198.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Klinik-Tarife SDK und Bayerische, Produktseite von Healio',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/stationaer',
        stand: '07.10.2026',
        accessedAt: '07.10.2026',
        note: 'Beitrag fürs Kind, Nachversicherung, Entbindung wortgleich mit der Seite healio.de/stationaer',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Kassenleistungen nach den Satzungen, ausgewertet im August 2026, und den genannten Quellen vom 7. Oktober 2026, Satzungen ändern sich. Maßgeblich sind immer die Satzung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
