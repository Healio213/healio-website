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
 *   - Zusammenlegung 14.10.2026 (Semrush-Analyse, Kannibalisierung): Die
 *     Blogartikel heilpraktiker-kosten-guide-2026,
 *     heilpraktiker-kosten-bonus-finanziert und
 *     heilpraktiker-kosten-gkv-erstattung-healio leiten per 301 hierher
 *     (vercel.json). Übernommen ist nur Belegtes: das Bonus-Beispiel (mit
 *     IKK-Satzungswerten neu gerechnet, ohne Hautkrebs-Screening, das erst ab
 *     35 gilt) und die Frage nach dem Kassenwechsel. Die Preisspannen der
 *     Blogartikel ohne Quelle sind bewusst nicht übernommen. Der Blogartikel
 *     osteopathie-krankenkasse-2026 ist in /ratgeber/osteopathie-krankenkasse
 *     aufgegangen; die alten Blog-Karten zeigen jetzt auf Ratgeber.
 *   - Keine Aussage zur Wirkung, keine Behandlungsempfehlung, keine
 *     Anbietervergleiche.
 *   - Rechenbeispiele arbeiten mit angenommenen Preisen.
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): Status in Faktenkasten und
 * Fußzeile wie Zahn-Welle 1; Tarifaussagen gegen healio.de/ambulant, die Dateien
 * im Serien-Worktree und die SDK-AVB gelesen.
 *
 * Ausbau 21.10.2026 (SEO, Hauptbegriff "heilpraktiker kosten"; Rolle:
 * Zubringer zur Kaufseite heilpraktiker-zusatzversicherung, deshalb keine
 * weiteren Zusatz-Begriffe hier). Neu, alle Quellen am 21.10.2026 im Original
 * gelesen, sofern nicht anders vermerkt:
 *   - GebüH-Rahmen je Sitzung: Gebührenverzeichnis für Heilpraktiker,
 *     GebüH 85 in der Fassung 2002, PDF des Fachverbands Deutscher
 *     Heilpraktiker (SHA-256 7a8acd2108e1a1f8...). Ziffer 1 12,30 bis 20,50;
 *     Ziffer 4 16,40 bis 22,00 (mindestens 10 Minuten); Ziffer 5 8,20 bis
 *     20,50; 21.1 10,30 bis 26,00; 34.2 15,40 bis 19,00; 35.1 bis 35.6 je
 *     Region 5,20 bis 26,00 (35.2 15,40 bis 26,00). 1 plus 4 = 28,70 bis
 *     42,50 EUR ist eigene Addition; laut GebüH-Anmerkung wird Ziffer 4 mit
 *     Ziffer 1 erstattet. Gezeigt als Rahmen des Verzeichnisses, nicht als
 *     heutiger Durchschnitts- oder Marktpreis.
 *   - BBhV Anlage 2 Nr. 2a: homöopathische Erstanamnese ab einer Stunde,
 *     Beihilfe-Höchstbetrag 80,00 EUR (gesetze-im-internet.de).
 *   - Satzungswege: DAK Anlage zu § 25 (Fassung 07/2026, 65. Nachtrag),
 *     Kategorie A "Naturheilverfahren, durch Ärzte oder Heilpraktiker
 *     erbracht", Faktor 1,2, höchstens 500 EUR im Jahr; BARMER § 37 Abs. 3 mit
 *     Anlage Teil 1 und 4 (39./40. Nachtrag, Stand 15.10.2026), Osteopathie und
 *     Akupunktur, Zuschuss doppelt, höchstens 200 EUR je Kalenderjahr;
 *     AOK NordWest § 8c (Stand 16.12.2025, Beleg aok-heilpraktiker.belege.md,
 *     Abruf 07.10.2026; am 21.10.2026 war aok.de in Wartung).
 *   - SDK AVB Teil II, Abschnitt II: "Es bestehen keine Wartezeiten."
 *   - IKK classic Satzung Stand 15.10.2026 (81. Nachtrag), § 34: Zuschuss in
 *     dreifacher Höhe, auch für Krankenzusatzversicherungen. 810 EUR und
 *     1.155 EUR als Satzungs-Höchstwerte wie im Ratgeber
 *     ikk-classic-bonusprogramm-2026; 400 bis 700 EUR als Einschätzung aus der
 *     Beratung gekennzeichnet.
 */

export const article = {
  updatedAt: "2026-10-21",
  updatedAtLabel: "21. Oktober 2026",
  slug: 'heilpraktiker-kosten',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Heilpraktiker Kosten 2026: Preise je Sitzung, wer zahlt | Healio',
  metaDescription:
    'Heilpraktiker Kosten 2026: Rahmen je Sitzung laut GebüH, welche Krankenkasse etwas dazugibt und was ein ambulanter Tarif bei Heilpraktikerrechnungen erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 12,

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
      { value: '28,70 bis 42,50 EUR', label: 'Erster Termin im GebüH-Rahmen (Ziffern 1 und 4, Fassung 2002)' },
      { value: 'bis zu 1.000 EUR', label: 'Naturheilverfahren in zwei Jahren (Ambulant 100)' },
    ],
    text: 'Das Honorar vereinbarst du frei mit deiner Praxis. Das GebüH liefert nur einen Rahmen, und der stammt von 2002. Ob etwas zurückkommt, hängt an Behandlung, Behandler, Satzung deiner Kasse und deinem Tarif.',
    path: { to: '/ambulant', text: 'Heilpraktikerkosten selbst getragen?', label: 'Ambulante Tarife ansehen' },
  },

  lead:
    'Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie haben eines gemeinsam: Wer zahlt, hängt von der Behandlung und von der Person ab, die behandelt. Die gesetzliche Kasse zahlt Heilpraktiker in der Regel nicht, beim Arzt gelten andere Regeln, und einzelne Kassen bezuschussen Teile in der Satzung. Dazu kommt, was ein ambulanter Tarif erstattet. Diese Seite sortiert, was es kostet und wer zahlt. Suchst du schon einen Tarif für deine Heilpraktikerrechnungen, hilft dir der Ratgeber zur Heilpraktiker-Zusatzversicherung weiter.',

  sections: [
    {
      id: 'was-kostet',
      heading: 'Was kostet ein Heilpraktiker?',
      blocks: [
        {
          type: 'segments',
          segments: [
            { text: 'Einen festen Preis gibt es nicht, und eine neutrale Preisliste auch nicht. Das Honorar vereinbarst du mit der Praxis (§ 611 BGB). Das Gebührenverzeichnis für Heilpraktiker (GebüH) hilft nur beim Rechnen, verbindlich ist es nicht. Der Preis hängt davon ab, wer behandelt, wie lange eine Sitzung dauert, welches Verfahren die Praxis anbietet und wie oft du kommst. Auch eine Angabe pro Stunde taugt deshalb nicht als Maßstab. Ob ein Tarif solche Rechnungen künftig erstattet und worauf du beim Abschluss achtest, klärt der ' },
            { text: 'Ratgeber zur Heilpraktiker-Zusatzversicherung', to: '/ratgeber/heilpraktiker-zusatzversicherung' },
            { text: '.' },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Einen Rahmen gibt es trotzdem. Das GebüH nennt für die meisten Leistungen eine Spanne mit Mindest- und Höchstbetrag. Ist vorher nichts anderes vereinbart, kannst du laut Fachverband Deutscher Heilpraktiker davon ausgehen, dass sich das Honorar darin bewegt. Habt ihr ein anderes Honorar abgesprochen, gilt die Absprache. Eine staatliche Gebührenordnung für Heilpraktiker gibt es auch 2026 nicht; der Fachverband stellt das Verzeichnis in der Fassung von 2002 bereit. Was darin steht und wie ein Zusatztarif danach erstattet, erklärt der Ratgeber zum ' },
            { text: 'GebüH 2026', to: '/ratgeber/gebuehrenordnung-heilpraktiker' },
            { text: '.' },
          ],
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Heilpraktiker Kosten je Sitzung: Rahmen laut GebüH, Fassung 2002',
          head: ['Sitzung', 'Ziffern im GebüH', 'Rahmen laut GebüH'],
          rows: [
            ['Erster Termin mit Untersuchung und Beratung', 'Ziffer 1, eingehende Untersuchung (12,30 bis 20,50 EUR), dazu Ziffer 4, eingehende Beratung ab 10 Minuten (16,40 bis 22,00 EUR)', '28,70 bis 42,50 EUR'],
            ['Folgetermin, nur Beratung', 'Ziffer 5, Beratung, gegebenenfalls mit kurzer Untersuchung', '8,20 bis 20,50 EUR'],
            ['Folgetermin mit Akupunktur', 'Ziffer 21.1, Akupunktur einschließlich Pulsdiagnose', '10,30 bis 26,00 EUR'],
            ['Folgetermin mit Chiropraktik', 'Ziffer 34.2, gezielter chiropraktischer Eingriff an der Wirbelsäule', '15,40 bis 19,00 EUR'],
            ['Folgetermin mit Osteopathie', 'Ziffern 35.1 bis 35.6, eine je behandelter Körperregion', '5,20 bis 26,00 EUR je Region, für die Schultergelenke (35.2) 15,40 bis 26,00 EUR'],
          ],
          note: 'Quelle: Fachverband Deutscher Heilpraktiker, Gebührenverzeichnis für Heilpraktiker (GebüH 85, Fassung 2002), Abruf 21.10.2026. Das sind Spannen aus dem Verzeichnis, kein heutiger Durchschnittspreis und keine Preisliste. Die Summe in der ersten Zeile ist eigene Addition. Eine Sitzung kann mehrere Ziffern enthalten, Auslagen wie Arzneimittel können gesondert dazukommen. Was du zahlst, regelt die Absprache mit deiner Praxis.',
        },
        {
          type: 'paragraph',
          text: 'Daneben gibt es Orientierungswerte aus neutralen Quellen. Diese Werte sind keine Preise, helfen aber bei der Größenordnung. Die nächste Tabelle zeigt sie zusammen mit der Frage, wer in der Regel zahlt.',
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
            { lead: 'Bonusprogramm.', text: 'Manche Kassen tauschen Bonuspunkte in einen zweckgebundenen Zuschuss zu bestimmten Behandlungen, Beispiele stehen in der Tabelle unten. Bei vielen Kassen kann der Bonus außerdem als Zuschuss zum Beitrag einer Zusatzversicherung helfen, bis zu den nachgewiesenen Kosten.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Welche Krankenkasse zahlt also beim Heilpraktiker? Als Kassenleistung in der Regel keine. Über Satzung oder Bonusprogramm geben einzelne Kassen aber etwas dazu, immer mit Grenzen. Drei Beispiele mit Fundstelle:',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Welche Krankenkasse beim Heilpraktiker etwas dazugibt: drei Satzungswege mit Fundstelle',
          head: ['Kasse', 'Weg', 'Was bezuschusst wird', 'Grenze'],
          rows: [
            ['DAK-Gesundheit', 'Bonusprogramm: Punkte werden in einen zweckgebundenen Zuschuss getauscht (Anlage zu § 25 der Satzung)', 'In Kategorie A ausdrücklich Naturheilverfahren, durch Ärzte oder Heilpraktiker erbracht, dazu Osteopathie', 'Punkte zählen beim Tausch 1,2fach, zusammen höchstens 500 EUR im Jahr, nur wenn keine andere Leistungspflicht besteht'],
            ['Barmer', 'Bonusprogramm: Zuschuss statt Auszahlung (§ 37 Abs. 3 mit Anlage Teil 4)', 'Osteopathie und Akupunktur als Leistung außerhalb der Kassenleistung. Heilpraktiker allgemein stehen nicht in der Liste', 'Zuschuss doppelt so hoch wie die Auszahlung, höchstens 200 EUR je Kalenderjahr (1.000 Bonuspunkte)'],
            ['AOK NordWest', 'Satzungsleistung Osteopathie (§ 8c)', 'Osteopathie mit ärztlicher Bescheinigung, auch bei Heilpraktikern mit der Osteopathie-Ausbildung, die die Satzung verlangt', 'bis 50 EUR je Behandlung, höchstens sechs im Kalenderjahr, aus einem gemeinsamen Topf von 500 EUR für mehrere Extras'],
          ],
          note: 'Quellen: DAK-Gesundheit, Anlage zu § 25 der Satzung, Fassung 07/2026 (65. Nachtrag), Abruf 21.10.2026; BARMER, Satzung in der Fassung des 39. und 40. Nachtrags, Stand 15.10.2026, § 37 Abs. 3 und Anlage Teil 1 und 4, Abruf 21.10.2026; AOK NordWest, Satzung Stand 16.12.2025, § 8c und § 8 Abs. 3, Abruf 07.10.2026. Jede Kasse regelt das selbst, andere AOKs und Kassen haben eigene Regeln. Gezahlt wird nur gegen Rechnung und die geforderten Nachweise.',
        },
        {
          type: 'paragraph',
          text: 'Was Satzung und Bonus offenlassen, zahlst du selbst. Diesen Rest trägt ein ambulanter Tarif: Er erstattet Heilpraktikerrechnungen aus seinem Topf für Naturheilverfahren, je nach Stufe 50 bis 100 Prozent bis zum Höchstbetrag, für Behandlungsfälle nach Versicherungsbeginn. Der Bonus kann dabei mithelfen: DAK und Barmer nennen in ihren Zuschusskatalogen auch die private Krankenzusatzversicherung. Wie das geht, steht im letzten Abschnitt.',
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
          type: 'segments',
          segments: [
            { text: 'Wer den Heilpraktiker heute selbst zahlt, muss nicht lange warten: Eine Wartezeit haben diese Tarife nicht, so steht es in Abschnitt II der Bedingungen. Tritt ein neuer Behandlungsfall nach Versicherungsbeginn ein, erstattet der Tarif im Rahmen der Bedingungen bereits die erste Rechnung dazu. Was vorher lief oder angeraten war, bleibt ausgenommen. Wo diese Grenze genau liegt, zeigt der Ratgeber ' },
            { text: 'Heilpraktiker-Zusatzversicherung ohne Wartezeit', to: '/ratgeber/heilpraktiker-zusatzversicherung-ohne-wartezeit' },
            { text: '.' },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie der Tarif Heilpraktikerrechnungen behandelt, ' },
            { text: 'erklärt der Ratgeber zur Heilpraktiker-Zusatzversicherung', to: '/ratgeber/heilpraktiker-zusatzversicherung' },
            { text: '. Er zeigt Kriterien statt einer Rangliste und sagt ehrlich, was zu den Gesundheitsfragen im Antrag und zu bestehenden Beschwerden gehört. Was die vier Töpfe zusammen leisten und für wen sie passen, steht im ' },
            { text: 'Ratgeber zur ambulanten Zusatzversicherung', to: '/ratgeber/ambulante-zusatzversicherung' },
            { text: '. Tarife anderer Versicherer mit Quelle nebeneinander findest du im ' },
            { text: 'Heilpraktiker Zusatzversicherung Vergleich 2026', to: '/ratgeber/heilpraktiker-zusatzversicherung-vergleich-2026' },
            { text: '.' },
          ],
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
            { lead: 'Einen Preis pro Stunde nennen wir nicht.', text: 'Es gibt dafür keine neutrale Quelle. Die Zahlen oben sind Rahmen und Orientierung, keine Preise, und die Beispiele rechnen mit angenommenen Beträgen.' },
            { lead: 'Der GebüH-Rahmen ist von 2002.', text: 'Er greift nur, wenn nichts anderes vereinbart ist. Frag deshalb vor dem ersten Termin nach dem Honorar und danach, nach welchen Ziffern die Praxis abrechnet.' },
            { lead: 'Wer behandelt, entscheidet über die Kasse.', text: 'Beim Vertragsarzt mit Qualifikation kann die Kasse zahlen, beim Heilpraktiker in der Regel nicht. Einzelne Satzungen machen Ausnahmen, in den Beispielen dieses Bereichs mit Verordnung und Jahresdeckel.' },
            { lead: 'Gesundheitsfragen gehören zum Antrag.', text: 'Du beantwortest sie vollständig und wahrheitsgemäß. Laut den Angaben auf der Seite Ambulant wirst du nicht abgelehnt. Vorerkrankungen versichert die SDK über einen Risikozuschlag mit, ohne Leistungsausschluss.' },
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
      id: 'bonus-traegt-beitrag',
      heading: 'Kann dein Kassenbonus den Beitrag für den Heilpraktiker-Tarif tragen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Er kann, und genau hier liegt für viele der Unterschied. Gemeint ist diesmal kein Zuschuss zur einzelnen Rechnung, sondern zum Beitrag: Bei vielen Kassen kannst du den Bonus als zweckgebundenen Zuschuss zum Beitrag einer privaten Zusatzversicherung nehmen. Dann bezahlt die Kasse über den Bonus einen Teil deines Beitrags, und der Tarif erstattet die Rechnungen. Beides läuft getrennt und wird nie addiert.',
        },
        {
          type: 'paragraph',
          text: 'Das ist der Geheimtipp dieser Seite. Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR; das sind theoretische Höchstwerte. In der breiten Masse kommen nach unserer Einschätzung aus der Beratung 400 bis 700 EUR zusammen. Ausgezahlt wird höchstens, was du tatsächlich an Beitrag gezahlt hast, und gegenzurechnen ist der Zusatzbeitrag der Kasse. Wie viel es bei dir ist, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Beispiel: Zuschuss der IKK classic und Beitrag Ambulant 100, Altersgruppe 21 bis 30',
          head: ['Position', 'Betrag im Jahr'],
          rows: [
            ['Check-up, Krebsfrüherkennung, zwei Zahnkontrollen, eine Impfung', '105 EUR Zuschuss'],
            ['Fitnessstudio, Sportverein, BMI und Blutdruck im Normbereich', '300 EUR Zuschuss'],
            ['Zuschuss zusammen', '405 EUR'],
            ['Beitrag Ambulant 100 (31,64 EUR mal 12)', '379,68 EUR'],
            ['Erstattet wird höchstens der gezahlte Beitrag', '379,68 EUR'],
          ],
          note: 'Zuschusswerte nach Satzung und Infoblatt der IKK classic zum Bonusjahr 2026 (Zuschuss in dreifacher Höhe des Bonus, höchstens die nachgewiesenen Kosten). Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant, Stand 29.09.2026. Modellbeispiel, kein Versprechen: Was du erreichst, hängt von deinen Maßnahmen und Nachweisen ab.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Zwei Dinge gehören ehrlich dazu. Der Zuschuss kommt erst nach dem Antrag im Folgejahr, den Beitrag zahlst du bis dahin selbst. Und bei der IKK classic ist der Zusatzbeitrag von 3,85 Prozent gegenzurechnen. Wie das Bonusprogramm im Detail funktioniert, steht im Ratgeber ' },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '. Für die Zusatzversicherung musst du die Kasse übrigens nicht wechseln: Der Tarif ist ein eigener Vertrag und läuft neben jeder gesetzlichen Kasse. Auch DAK und Barmer nennen die private Krankenzusatzversicherung in ihren Zuschusskatalogen (DAK Anlage zu § 25, Barmer Anlage zu § 37 Teil 4).' },
          ],
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Ratgeber hilft dir bei deiner Frage weiter?',
      blocks: [
  {
    "type": "cards",
    "heading": "Ambulanter Ergänzungsweg und Behandlungen, Kosten und Kassenleistungen",
    "hint": "Wähle den Ratgeber, der zu deiner Frage passt.",
    "items": [
      {
        "icon": "protection",
        "tone": "mint",
        "title": "Heilpraktiker-Zusatzversicherung",
        "text": "Kriterien statt Rangliste, Gesundheitsfragen im Antrag und bestehende Beschwerden.",
        "to": "/ratgeber/heilpraktiker-zusatzversicherung",
        "linkLabel": "Lesen"
      },
      {
        "icon": "ambulant",
        "tone": "sky",
        "title": "Ambulante Zusatzversicherung",
        "text": "Vier Töpfe, Beiträge nach Alter und die Frage nach dem Privatpatienten.",
        "to": "/ratgeber/ambulante-zusatzversicherung",
        "linkLabel": "Lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Heilpraktiker-Zusatzversicherung ohne Wartezeit",
        "text": "Was ab Vertragsbeginn möglich ist und warum vorherige Fälle eine eigene Prüfung brauchen.",
        "to": "/ratgeber/heilpraktiker-zusatzversicherung-ohne-wartezeit",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "comparison",
        "tone": "mint",
        "title": "Heilpraktiker Zusatzversicherung Vergleich 2026",
        "text": "Bekannte ambulante Tarife nebeneinander, jeder Wert mit Quelle.",
        "to": "/ratgeber/heilpraktiker-zusatzversicherung-vergleich-2026",
        "linkLabel": "Zum Vergleich"
      },
      {
        "icon": "naturopathy",
        "tone": "sky",
        "title": "Akupunktur Kosten",
        "text": "Wann die Kasse zahlt und was die Sitzung privat kostet.",
        "to": "/ratgeber/akupunktur-kosten",
        "linkLabel": "Lesen"
      },
      {
        "icon": "weighing",
        "tone": "lavender",
        "title": "Chiropraktiker Kosten",
        "text": "Arzt oder Heilpraktiker: wer behandelt und wer zahlt.",
        "to": "/ratgeber/chiropraktiker-kosten",
        "linkLabel": "Lesen"
      },
      {
        "icon": "medication",
        "tone": "mint",
        "title": "Zuzahlung Physiotherapie",
        "text": "10 Prozent plus 10 EUR je Verordnung, Belastungsgrenze und Erstattung.",
        "to": "/ratgeber/physiotherapie-zuzahlung",
        "linkLabel": "Lesen"
      },
      {
        "icon": "document",
        "tone": "butter",
        "title": "Gebührenordnung für Heilpraktiker",
        "text": "Warum das GebüH nur eine Berechnungshilfe ist und was auf der Rechnung steht.",
        "to": "/ratgeber/gebuehrenordnung-heilpraktiker",
        "linkLabel": "Lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Naturheilkunde: Verfahren, Behandler und Kosten",
        "text": "Naturheilkunde verständlich erklärt: Arzt und Heilpraktiker unterscheiden, Kosten klären und Kassenleistungen sowie Tarifgrenzen prüfen.",
        "to": "/ratgeber/naturheilkunde",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "document",
        "tone": "mint",
        "title": "Zusatzversicherung trotz Vorerkrankung",
        "text": "Wo du mit Vorgeschichte angenommen wirst und wo nicht.",
        "to": "/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026",
        "linkLabel": "Ratgeber lesen"
      }
    ]
  },
  {
    "type": "cards",
    "heading": "Behandlungen, Kosten und Kassenleistungen und Osteopathie und Kassenbedingungen",
    "hint": "Wähle den Ratgeber, der zu deiner Frage passt.",
    "items": [
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Physiotherapie: Kosten mit und ohne Rezept",
        "text": "Was du mit Kassenrezept selbst zahlst, welche Behandlungspreise 2026 gelten und was du bei einer Privatbehandlung vorher klären solltest.",
        "to": "/ratgeber/physiotherapie-kosten",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Akupunktur auf Krankenkasse: wann die Kasse zahlt",
        "text": "Die gesetzliche Krankenkasse übernimmt Körperakupunktur bei chronischen Schmerzen der Lendenwirbelsäule oder bei chronischen Kniegelenkschmerzen durch Gonarthrose, wenn die Beschwerden seit mindestens sechs Monaten bestehen. Dafür muss ein entsprechend qualifizierter Vertragsarzt behandeln; außerdem gelten Grenzen für Sitzungen und Behandlungszeiträume. Bei anderen Beschwerden oder einer Heilpraktikerrechnung brauchst du einen gesondert bestätigten Zuschuss oder eine passende private Vertragsleistung. Hier erfährst du, welche Voraussetzungen du vor dem Termin prüfen solltest.",
        "to": "/ratgeber/akupunktur-krankenkasse",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "TCM: Ärzte, Kliniken und Krankenkasse",
        "text": "Welche Behandlung über die Kasse laufen kann und was die Zulassung einer TCM-Praxis oder Klinik tatsächlich bedeutet.",
        "to": "/ratgeber/tcm-krankenkasse",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Homöopathie ab 2027: Krankenkasse und Zusatzschutz",
        "text": "Seit Juli 2026 nicht mehr auf Kassenrezept, ab Januar 2027 auch keine Satzungsleistung mehr. Was eine Zusatzversicherung bei Globuli, Bluttest und TCM erstattet.",
        "to": "/ratgeber/homoeopathie-krankenkasse-2027",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "AOK und Heilpraktiker: Leistungen richtig prüfen",
        "text": "Regionale Kassenextras, private Ergänzungsverträge und konkrete Rechnungen auseinanderhalten.",
        "to": "/ratgeber/aok-heilpraktiker",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "TK und Heilpraktiker: Kostenübernahme getrennt prüfen",
        "text": "Die TK übernimmt Heilpraktikerkosten nicht pauschal; du musst die konkrete Behandlung mit einer Satzungsleistung oder dem zweckgebundenen Bonuskatalog abgleichen. Für weitere versicherte Naturheilverfahren kommt ein eigenständiger privater Zusatzvertrag infrage, dessen Leistungen und Behandleranforderungen du gesondert prüfst.",
        "to": "/ratgeber/tk-heilpraktiker",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "comparison",
        "tone": "coral",
        "title": "TK und Osteopathie",
        "text": "40 EUR je Sitzung, ärztliche Bescheinigung vorher, Rechnung einreichen.",
        "to": "/ratgeber/tk-osteopathie",
        "linkLabel": "Lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Osteopathie: Was kostet eine Behandlung und wer zahlt?",
        "text": "Die Kosten deiner Osteopathie-Behandlung hängen von der vereinbarten Leistung und der Vergütung deiner Praxis ab. Dein Eigenanteil ergibt sich aus der tatsächlichen Rechnung abzüglich der Erstattung, die deine Krankenkasse oder dein privater Tarif unter den jeweiligen Voraussetzungen anerkennt.",
        "to": "/ratgeber/osteopathie-kosten",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Osteopathie: Welche Krankenkasse übernimmt welche Kosten?",
        "text": "Viele Krankenkassen bezuschussen Osteopathie nach ihrer Satzung: Die TK nennt bis 40 EUR für höchstens drei Sitzungen im Kalenderjahr, die KKH bis 60 EUR für höchstens vier Sitzungen. Ob du einen Zuschuss erhältst, hängt außerdem von ärztlichem Nachweis, Behandlerqualifikation, möglichen Altersgrenzen und einem noch verfügbaren gemeinsamen Budget ab.",
        "to": "/ratgeber/osteopathie-krankenkasse",
        "linkLabel": "Ratgeber lesen"
      }
    ]
  },
  {
    "type": "cards",
    "heading": "Osteopathie und Kassenbedingungen",
    "hint": "Wähle den Ratgeber, der zu deiner Frage passt.",
    "items": [
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "AOK und Osteopathie: regionale Zuschüsse prüfen",
        "text": "Die AOK-Erstattung für Osteopathie hängt von deiner regionalen AOK und ihren konkreten Satzungsbedingungen ab. Kläre vor dem Termin Betrag, ärztlichen Nachweis, Behandlerqualifikation und ein möglicherweise bereits genutztes gemeinsames Budget.",
        "to": "/ratgeber/aok-osteopathie",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Zusatzversicherung für Osteopathie prüfen",
        "text": "Eine Zusatzversicherung für Osteopathie kann versicherte Behandlungskosten nach den Bedingungen des gewählten Tarifs ergänzen. Prüfe zuerst den Zuschuss deiner gesetzlichen Kasse und vergleiche danach Behandleranforderungen, Erstattungsumfang und verfügbares Teilbudget des privaten Vertrags.",
        "to": "/ratgeber/zusatzversicherung-osteopathie",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Barmer und Osteopathie: passende Erstattungswege",
        "text": "Die Barmer-Satzung sieht besondere Osteopathiewege für Säuglinge und während der Schwangerschaft vor; einen pauschalen Zuschuss für sämtliche Erwachsenen belegen diese Regeln nicht. Daneben kannst du einen zweckgebundenen Bonuszuschuss prüfen, für den eigene Teilnahme-, Nachweis- und Kostenbedingungen gelten.",
        "to": "/ratgeber/barmer-osteopathie",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "naturopathy",
        "tone": "mint",
        "title": "Mobil Krankenkasse und Osteopathie",
        "text": "Sitzungsgrenze, gemeinsamer Topf und benötigte Nachweise vor dem Termin prüfen.",
        "to": "/ratgeber/mobil-krankenkasse-osteopathie",
        "linkLabel": "Ratgeber lesen"
      }
    ]
  },
  {
    "type": "cards",
    "heading": "Weitere passende Themen",
    "items": [
      {
        "icon": "calculator",
        "tone": "butter",
        "title": "IKK classic Bonusprogramm 2026",
        "text": "Alle Positionen, der dreifache Zuschuss und wie er den Beitrag einer Zusatzversicherung tragen kann.",
        "to": "/ratgeber/ikk-classic-bonusprogramm-2026",
        "linkLabel": "Ratgeber lesen"
      },
      {
        "icon": "comparison",
        "tone": "lavender",
        "title": "Krankenkassen-Bonus und Zusatzversicherung",
        "text": "Wie der Bonus deiner Kasse als Zuschuss beim Beitrag hilft und wo die Grenzen liegen.",
        "to": "/ratgeber/krankenkassen-bonus-zusatzversicherung",
        "linkLabel": "Ratgeber lesen"
      }
    ]
  }
],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Heilpraktiker und Osteopathie, Brille, Vorsorge und gesetzliche Zuzahlungen vermittelt Healio die ambulanten Tarife der SDK, in der höchsten Stufe mit bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet ein Heilpraktiker oder eine Heilpraktikerin pro Sitzung?',
      answer:
        'Das legt die Praxis mit dir fest. Als Rahmen nennt das Gebührenverzeichnis für Heilpraktiker (GebüH, Fassung 2002) für einen ersten Termin mit eingehender Untersuchung und Beratung 28,70 bis 42,50 EUR, für eine Akupunktur einschließlich Pulsdiagnose 10,30 bis 26,00 EUR. Eine Sitzung kann mehrere Ziffern enthalten. Habt ihr vorher ein anderes Honorar vereinbart, gilt die Absprache.',
    },
    {
      question: 'Was kostet ein Heilpraktiker pro Stunde?',
      answer:
        'Dafür gibt es keine neutrale Euro-Angabe. Das Honorar ist frei vereinbar, das Gebührenverzeichnis für Heilpraktiker (GebüH) ist nur eine Berechnungshilfe und rechnet nach einzelnen Leistungen, nicht nach Zeit. Einen Anhaltspunkt gibt die Beihilfe des Bundes: Für eine homöopathische Erstanamnese von mindestens einer Stunde erkennt sie höchstens 80,00 EUR an (Anlage 2 BBhV Nr. 2a). Das ist ein Höchstbetrag, kein Preis. Frag deine Praxis vorab nach dem Honorar.',
    },
    {
      question: 'Zahlt die Krankenkasse den Heilpraktiker?',
      answer:
        'In der Regel nicht. Ärztliche Behandlung wird nach § 15 SGB V von Ärzten erbracht. Ausnahmen sind Kassenleistungen beim qualifizierten Vertragsarzt, etwa Akupunktur bei chronischen Schmerzen der Lendenwirbelsäule oder des Knies, und Satzungsleistungen einzelner Kassen, zum Beispiel für Osteopathie.',
    },
    {
      question: 'Welche Krankenkasse zahlt Heilpraktiker?',
      answer:
        'Als Kassenleistung in der Regel keine, aber einzelne Kassen geben über Satzung oder Bonus etwas dazu. Die DAK nennt in ihrem Bonuskatalog ausdrücklich Naturheilverfahren durch Ärzte oder Heilpraktiker, der Zuschuss ist auf 500 EUR im Jahr begrenzt. Die Barmer bezuschusst über ihr Bonusprogramm Osteopathie und Akupunktur mit höchstens 200 EUR je Kalenderjahr. Was offen bleibt, erstattet ein ambulanter Tarif aus seinem Topf für Naturheilverfahren.',
    },
    {
      question: 'Übernimmt die AOK oder die Barmer den Heilpraktiker?',
      answer:
        'Nicht pauschal. Jede AOK hat eine eigene Satzung: Die AOK NordWest zahlt zum Beispiel bis zu sechs Osteopathie-Behandlungen im Kalenderjahr mit je bis zu 50 EUR, auch bei Heilpraktikern mit der verlangten Osteopathie-Ausbildung und mit ärztlicher Bescheinigung. Die Barmer gibt über ihr Bonusprogramm einen Zuschuss zu Osteopathie und Akupunktur, Heilpraktikerleistungen allgemein stehen dort nicht. Für alles andere brauchst du eine eigene Regel in der Satzung deiner Kasse oder einen privaten Tarif.',
    },
    {
      question: 'Gibt es eine neue Gebührenordnung für Heilpraktiker 2026?',
      answer:
        'Eine staatliche Gebührenordnung für Heilpraktiker gibt es auch 2026 nicht. Der Fachverband Deutscher Heilpraktiker stellt das Gebührenverzeichnis (GebüH) in der Fassung von 2002 bereit, abgerufen am 21.10.2026. Es ist eine Berechnungshilfe: Ohne andere Absprache kannst du davon ausgehen, dass sich das Honorar in seinem Rahmen bewegt.',
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
      question: 'Kann mein Kassenbonus die Zusatzversicherung bezahlen?',
      answer:
        'Teilweise oder ganz, je nach Kasse, Maßnahmen und Beitrag. Viele Kassen zahlen den Bonus auf Wunsch als Zuschuss zum Beitrag einer Zusatzversicherung, höchstens bis zu deinen nachgewiesenen Kosten. Bei der IKK classic ergeben zum Beispiel Vorsorge, Studio, Verein, BMI und Blutdruck 405 EUR Zuschuss im Jahr, mehr als der Jahresbeitrag von Ambulant 100 mit 21 bis 30 Jahren. Gegenzurechnen ist der Zusatzbeitrag der Kasse.',
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
    checkedAt: '2026-10-21',
    checkedAtLabel: '21. Oktober 2026',
    intro: 'Die meisten Zahlen dieser Übersicht stammen aus den Einzelseiten dieses Bereichs, dort steht jeder Rechenweg mit Quelle. GebüH-Rahmen, Kassenbeispiele und Wartezeit haben wir am 21. Oktober 2026 direkt im Verzeichnis, in den Satzungen und in den Bedingungen nachgelesen.',
    items: [
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil II: Tarife AP5, AP7, AP9 und AP1 (1.753a/01.23)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
        accessedAt: '21.10.2026',
        note: 'Töpfe und Erstattung (Abschnitt I.5), keine Wartezeiten (Abschnitt II)',
      },
      {
        label: 'Gebührenverzeichnis für Heilpraktiker (GebüH 85), Leistungsübersicht',
        publisher: 'Fachverband Deutscher Heilpraktiker',
        href: 'https://www.heilpraktiker.org/files/seiteninhalt/inhaltsseiten/c_fuer_heilpraktiker/cf-fuer-mitglieder-intern/cf-02-versicherungsfragen/cf-02-01-01-gebueh-85-2002-final.pdf',
        stand: 'Fassung 2002',
        accessedAt: '21.10.2026',
        note: 'Spannen der Ziffern 1, 4, 5, 21.1, 34.2 und 35.1 bis 35.6',
      },
      {
        label: 'Anlage zu § 25 der Satzung: Bonusprogramm und Katalog der Gesundheitsleistungen',
        publisher: 'DAK-Gesundheit',
        href: 'https://caas.content.dak.de/caas/v1/media/224230/data/b3363239bea3a9d0e92d2b5cb2110299/anlage-zu-25-der-satzung-dak-g-bonusprogramm-stand-25-07-2026.pdf',
        stand: '07/2026, zuletzt geändert mit dem 65. Nachtrag',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Satzung der BARMER, § 37 Bonus für gesundheitsbewusstes Verhalten und Anlage zu § 37',
        publisher: 'BARMER',
        href: 'https://www.barmer.de/resource/blob/1022552/b2c26cec88be1e70caad268f9961fd09/barmer-satzung-der-barmer-barrierefrei-19-data.pdf',
        stand: '15.10.2026, Fassung des 39. und 40. Nachtrags',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Satzung der AOK NordWest, § 8c Osteopathie',
        publisher: 'AOK NordWest',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/nordwest/pdf/satzung.pdf',
        stand: '16.12.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der IKK classic, § 34 Bonus für gesundheitsbewusstes Verhalten',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/20152-satzung-kv-incl-sana-81-2026-10-15.pdf',
        stand: '15.10.2026, 81. Nachtrag',
        accessedAt: '21.10.2026',
        note: 'Zuschuss in dreifacher Höhe, auch zum Beitrag einer Krankenzusatzversicherung',
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
        accessedAt: '21.10.2026',
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
        label: 'Infoblatt zum IKK Bonus 2026',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/19125-infoblatt-ikkbonus.pdf',
        stand: '04/2026',
        accessedAt: '14.10.2026',
        note: 'Zuschusswerte des Bonus-Beispiels',
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
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. und 21. Oktober 2026, zu Tarifen nach dem Stand der Bedingungen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
