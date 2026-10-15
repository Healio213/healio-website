/**
 * Tarifvergleich Heilpraktiker-Zusatzversicherung 2026 (Auftrag Frank
 * 15.10.2026, Hintergrund Healio/Marktanalyse-2026-10/KONKURRENZ-
 * SPEZIALMAKLER-2026-10-15.md: Spezialmakler vergleichen viele Tarife, Healio
 * wirkte mit einem Tarif wie ein Vertreter).
 *
 * Suchbegriffe (Semrush DE, 15.10.2026): „heilpraktiker zusatzversicherung
 * vergleich“ 90 (KD 21), „heilpraktikerversicherung vergleich“ 40,
 * „ambulante zusatzversicherung vergleich“ 210 (KD 21; bewusst hier
 * mitbedient statt eigener Seite, damit sich zwei Vergleichsseiten nicht
 * gegenseitig Konkurrenz machen).
 *
 * Reihenfolge nach Franks Regel vom 15.10.2026 (feedback_nutzen_zuerst_
 * bonus_geheimtipp): zuerst Leistung und Vergleich, der Kassenbonus erst am
 * Ende als Geheimtipp zur Finanzierung.
 *
 * Tarifdaten nur aus Primärquellen der Versicherer, abgelegt unter
 * Healio/Marktanalyse-2026-10/tarifvergleich-ambulant-2026-10-15/quellen/:
 *   - SDK: AVB Teil II AP-Tarife 1.753a (01.01.2023), Broschüre 1.781/07.23
 *     (Vorerkrankungen per Zuschlag, keine Ablehnung, kein Ausschluss),
 *     Beiträge nach erreichtem Alter aus src/data/sdkAmbulantBeitraege.js
 *     (Stand 29.09.2026, wie healio.de/ambulant).
 *   - UKV NaturPRIVAT: VKB-Produktübersicht 322611 (gültig ab 01.05.2026),
 *     S. 19: 80 %, GebüH und Hufeland inklusive Osteopathie, Staffel
 *     500/1.000/1.000 EUR je Kalenderjahr ab dem dritten, keine Wartezeit,
 *     Beitrag 20 bis 49 Jahre 28,10 EUR. Healio bietet NaturPRIVAT nicht an
 *     (Franks Entscheidung 05.10.2026).
 *   - HanseMerkur EST: Verbraucherinformation kk-373 (01.2026), Tarif EST,
 *     A.2 und A.5, MB/KK § 3; Preisbeispiel 30 Jahre 22,88 EUR laut
 *     hansemerkur.de/ambulante-zusatzversicherung (Abruf 15.10.2026).
 *   - ARAG 483 (Premium): Bedingungsheft A842 (4.2026) S. 34 bis 36;
 *     Berechnungsbeispiel 30 Jahre 40,20 EUR laut Produktseite. Osteopathie
 *     nur in der FAQ der Produktseite genannt.
 *   - Barmenia Mehr Gesundheit 2.000 D (G2000D): AVB K 5288 (Stand
 *     01.08.2023), gemeinsamer Jahrestopf, Sehhilfen ausgeschlossen,
 *     Naturheilverfahren drei Monate Wartezeit, Beitragstabelle 21 bis 30
 *     23,20 EUR, 41 bis 50 46,80 EUR; drei Gesundheitsfragen im Rechner.
 *   - SIGNAL IDUNA AmbulantPLUSpur: Bedingungen 1344023 (Juli 2026), Tarif
 *     AmbulantPLUS 09.2017 B1, B4, B5, A2, E2; Beispiel 32 Jahre 19,93 EUR.
 *   - DKV KABN: B 545 (7.26) Nr. 2.1, 2.2, 2.5, 2.7, Teil 2 Nr. 2.4 und 7,
 *     Beitragsanlage 1.7.2026 (30 bis 39: 17,83, 40 bis 49: 26,24 EUR).
 *   - Continentale CEK-PLUS: keine öffentlichen Beiträge und Annahmeregeln,
 *     deshalb nicht aufgenommen.
 *   - Gothaer MediNatura/Medi Ambulant: für gesetzlich Versicherte beim
 *     Versicherer nicht mehr auffindbar (Weiterleitung auf Mehr Gesundheit),
 *     deshalb nicht in der Tabelle.
 *
 * Bewusst: keine Rangliste, keine Note, kein Testurteil. Die Auswahlhilfe
 * ordnet nur nach dem gewählten Schwerpunkt und sagt je Tarif, warum.
 */

const AUSWAHL = [
  { id: 'heilpraktiker', label: 'Heilpraktiker und Osteopathie', hint: 'Oben stehen Tarife mit hohem Erstattungssatz und viel Geld für Naturheilverfahren, ohne lange Anlaufphase.' },
  { id: 'brille', label: 'Brille dazu', hint: 'Zuerst kommen Tarife, die Heilpraktiker und Sehhilfen im selben Vertrag erstatten.' },
  { id: 'guenstig', label: 'Kleiner Beitrag', hint: 'Sortiert nach niedrigem Monatsbeitrag. Weniger Beitrag heißt fast immer weniger Erstattung oder kleinere Töpfe.' },
  { id: 'vorerkrankung', label: 'Vorerkrankungen', hint: 'Vorn landen Tarife, bei denen Bedingungen oder Versicherer klar sagen, was mit einer Vorerkrankung passiert.' },
];

const TARIFE = [
  {
    id: 'sdk-ap1',
    name: 'SDK Ambulant 100 (AP1)',
    versicherer: 'Süddeutsche Krankenversicherung',
    healio: 'online',
    heilpraktiker: '100 % nach Gebührenverzeichnis für Heilpraktiker (GebüH)',
    budget: 'Naturheilverfahren 1.000 EUR je zwei Kalenderjahre, eigener Topf. Insgesamt bis zu 3.000 EUR in zwei Jahren über vier Töpfe',
    wartezeit: 'Keine',
    osteopathie: 'Über den Topf Naturheilverfahren, Abrechnung nach GebüH oder Hufeland-Verzeichnis',
    brille: '100 % bis 500 EUR je zwei Kalenderjahre, eigener Topf',
    vorsorge: '100 % bis 500 EUR je zwei Kalenderjahre, eigener Topf',
    annahme: 'Gesundheitsfragen ja, keine Ablehnung. Vorerkrankungen per festem Zuschlag voll mitversichert, kein Leistungsausschluss',
    beitrag: '31,64 EUR / 44,13 EUR im Monat',
    grenze: 'Der Topf gilt je zwei Kalenderjahre ab Beginn. Wer im Herbst startet, hat einen kurzen ersten Zeitraum.',
    passt: {
      heilpraktiker: [2, '100 % ohne Wartezeit und ohne Anlaufstaffel, 1.000 EUR in zwei Jahren nur für Naturheilverfahren.'],
      brille: [2, 'Brille mit eigenem Topf bis 500 EUR, der den Heilpraktiker-Topf nicht schmälert.'],
      guenstig: [0, 'Die höchste Stufe kostet mehr. Günstiger sind die Stufen 50 bis 90 der SDK.'],
      vorerkrankung: [2, 'Laut SDK keine Ablehnung und kein Ausschluss, Vorerkrankungen über Zuschlag mitversichert.'],
    },
    quelle: { label: 'SDK AVB AP-Tarife 1.753a und Broschüre 1.781', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: 'Beiträge Stand 29.09.2026' },
  },
  {
    id: 'sdk-ap5-ap9',
    name: 'SDK Ambulant 50, 70 und 90 (AP5, AP7, AP9)',
    versicherer: 'Süddeutsche Krankenversicherung',
    healio: 'online',
    heilpraktiker: '50 %, 70 % oder 90 % nach GebüH',
    budget: 'Naturheilverfahren 500, 700 oder 900 EUR je zwei Kalenderjahre, eigener Topf',
    wartezeit: 'Keine',
    osteopathie: 'Über den Topf Naturheilverfahren, wie bei AP1',
    brille: '100 % bis 200, 300 oder 400 EUR je zwei Kalenderjahre',
    vorsorge: '50 bis 90 % bis 200, 300 oder 400 EUR je zwei Kalenderjahre',
    annahme: 'Wie AP1: Gesundheitsfragen ja, keine Ablehnung, Zuschlag statt Ausschluss',
    beitrag: 'AP5 10,36 / 14,14 EUR, AP7 15,82 / 23,10 EUR, AP9 27,44 / 37,95 EUR',
    grenze: 'Beim Heilpraktiker trägst du je nach Stufe 10 bis 50 % der Rechnung selbst.',
    passt: {
      heilpraktiker: [1, 'Ohne Wartezeit, aber mit Eigenanteil von 10 bis 50 % und kleinerem Topf.'],
      brille: [2, 'Sehhilfen zu 100 % mit eigenem Topf, auch in der kleinsten Stufe.'],
      guenstig: [2, 'AP5 ab 10,36 EUR mit 30 Jahren, mit allen vier Töpfen.'],
      vorerkrankung: [2, 'Gleiche Annahmeregel wie AP1: keine Ablehnung, Zuschlag statt Ausschluss.'],
    },
    quelle: { label: 'SDK AVB AP-Tarife 1.753a, Leistungsübersicht', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: 'Beiträge Stand 29.09.2026' },
  },
  {
    id: 'barmenia-g2000d',
    name: 'Barmenia Mehr Gesundheit 2.000 D',
    versicherer: 'BarmeniaGothaer',
    healio: 'nein',
    heilpraktiker: '80 % bis zum Höchstsatz der GebüH',
    budget: '2.000 EUR je Kalenderjahr, ein gemeinsamer Topf mit Heil- und Hilfsmitteln, Arzneimitteln, Zuzahlungen, Vorsorge und Impfungen',
    wartezeit: 'Für Heilpraktiker und Naturheilverfahren 3 Monate, sonst keine',
    osteopathie: 'Ausdrücklich genannt, beim Arzt oder Heilpraktiker',
    brille: 'Nicht enthalten, eigener Brillentarif nötig',
    vorsorge: '100 % beim Arzt, aus dem gemeinsamen Topf',
    annahme: 'Drei Gesundheitsfragen. Bei einem Ja prüft der Versicherer, eine Ablehnung ist möglich',
    beitrag: '23,20 EUR / 46,80 EUR im Monat',
    grenze: 'Großer Jahrestopf, aber alle Leistungen zehren davon. Ohne Brille.',
    passt: {
      heilpraktiker: [2, 'Viel Geld je Jahr und Osteopathie ausdrücklich genannt. Dafür 80 % und drei Monate Wartezeit.'],
      brille: [0, 'Sehhilfen sind laut Bedingungen nicht versichert.'],
      guenstig: [1, 'Mit 30 im Mittelfeld, mit 45 deutlich teurer. Die Stufe 1.000 D kostet 12,90 EUR mit 30.'],
      vorerkrankung: [0, 'Eine Frage betrifft Naturheilbehandlungen der letzten zwei Jahre. Wer schon behandelt wird, muss mit Prüfung oder Ablehnung rechnen.'],
    },
    quelle: { label: 'AVB Mehr Gesundheit 2.000 D, K 5288', href: 'https://cdn.barmeniagothaer.de/barmeniagothaer/media/gesundheit_pflege/gesundheit/ambulante_zusatzversicherung/avb-ambulante-zusatzversicherung-2-000d-k5288.pdf', stand: 'Stand 01.08.2023, Abruf 15.10.2026' },
  },
  {
    id: 'arag-483',
    name: 'ARAG Heilpraktiker Premium (Tarif 483)',
    versicherer: 'ARAG Krankenversicherung',
    healio: 'nein',
    heilpraktiker: '90 % nach GebüH bis zum Höchstsatz',
    budget: '90 % von bis zu 2.500 EUR Rechnungsbetrag je zwei Kalenderjahre, ein Topf für Heilpraktiker und Naturheilverfahren beim Arzt',
    wartezeit: '3 Monate',
    osteopathie: 'Laut Produktseite beim Heilpraktiker über den Tarif, in den Tarifbedingungen nicht eigens genannt',
    brille: '100 % bis 330 EUR, neuer Anspruch frühestens nach 36 Monaten',
    vorsorge: 'Nicht enthalten, eigener Vorsorgetarif V100',
    annahme: 'Gesundheitsfragen im Antrag. Zahl und Annahmeregeln nicht öffentlich beschrieben',
    beitrag: '40,20 EUR mit 30 Jahren, mit 45 nicht öffentlich',
    grenze: 'Erst nach drei Monaten Leistung. Ohne Leistung im Jahr zahlt ARAG 50 EUR zurück.',
    passt: {
      heilpraktiker: [2, 'Hoher Satz und großer Zweijahrestopf. Dafür drei Monate Wartezeit.'],
      brille: [1, 'Brille enthalten, aber nur alle 36 Monate neu.'],
      guenstig: [0, 'Mit 30 Jahren der teuerste öffentliche Beispielbeitrag in dieser Übersicht.'],
      vorerkrankung: [0, 'Keine öffentliche Aussage zur Annahme mit Vorerkrankung.'],
    },
    quelle: { label: 'ARAG Bedingungsheft A842, Tarif 483', href: 'https://www.arag.de/krankenzusatzversicherung/heilpraktiker-zusatzversicherung/', stand: 'Bedingungen Stand 4.2026, Abruf 15.10.2026' },
  },
  {
    id: 'hansemerkur-est',
    name: 'HanseMerkur Ambulant Premium (Tarif EST)',
    versicherer: 'HanseMerkur Krankenversicherung',
    healio: 'nein',
    heilpraktiker: '80 % nach GebüH',
    budget: '80 % von bis zu 1.000 EUR Rechnungsbetrag je Versicherungsjahr, also bis 800 EUR',
    wartezeit: '3 Monate',
    osteopathie: 'Auf der Produktseite genannt, in den Bedingungen über GebüH oder Hufeland',
    brille: '100 % bis 200 EUR je Kalenderjahr',
    vorsorge: 'Nicht enthalten, nur im Zusatztarif EVHS',
    annahme: 'Annahmeregeln nicht öffentlich beschrieben',
    beitrag: '22,88 EUR mit 30 Jahren, mit 45 nicht öffentlich',
    grenze: 'Anlaufstaffel beim Heilpraktiker: im ersten Jahr nur 100 EUR, im zweiten 200 EUR Rechnungsbetrag.',
    passt: {
      heilpraktiker: [0, 'In den ersten zwei Jahren sehr kleine Grenzen, danach bis 800 EUR je Jahr.'],
      brille: [2, 'Brille jedes Kalenderjahr bis 200 EUR, neben dem Heilpraktiker-Baustein.'],
      guenstig: [1, 'Mit 30 im Mittelfeld der öffentlichen Beispiele.'],
      vorerkrankung: [0, 'Keine öffentliche Aussage zur Annahme mit Vorerkrankung.'],
    },
    quelle: { label: 'HanseMerkur Verbraucherinformation kk-373, Tarif EST', href: 'https://www.hansemerkur.de/ambulante-zusatzversicherung', stand: 'Januar 2026, Abruf 15.10.2026' },
  },
  {
    id: 'signal-iduna-pluspur',
    name: 'SIGNAL IDUNA AmbulantPLUSpur',
    versicherer: 'SIGNAL IDUNA Krankenversicherung',
    healio: 'nein',
    heilpraktiker: '80 % nach GebüH, nur Heilpraktiker mit voller Erlaubnis',
    budget: '750 EUR je Kalenderjahr, gemeinsam mit verordneten Arzneimitteln',
    wartezeit: 'Keine',
    osteopathie: 'Ausdrücklich genannt, im Heilpraktiker-Topf',
    brille: '100 % bis 375 EUR je zwei Kalenderjahre',
    vorsorge: '100 % bis 750 EUR je zwei Kalenderjahre, mit Reiseimpfungen',
    annahme: 'Einige Gesundheitsfragen. Bei Vorerkrankungen richtet sich der Beitrag laut Produktseite nach dem Risiko. Aufnahme bis 54 Jahre',
    beitrag: '19,93 EUR mit 32 Jahren (Beispiel der Produktseite), Tabelle nicht öffentlich',
    grenze: 'Ab dem Jahr, in dem du 55 wirst, wechselt der Vertrag in AmbulantPLUS mit höherem Beitrag.',
    passt: {
      heilpraktiker: [1, 'Ohne Wartezeit und ohne Staffel, aber 80 % und 750 EUR je Jahr.'],
      brille: [2, 'Brille und Vorsorge mit eigenen Grenzen neben dem Heilpraktiker.'],
      guenstig: [1, 'Öffentliches Beispiel im Mittelfeld, eine Tabelle nennt der Versicherer nicht.'],
      vorerkrankung: [1, 'Laut Produktseite Beitrag nach Risiko statt pauschaler Absage. Ob abgelehnt werden kann, steht dort nicht.'],
    },
    quelle: { label: 'SIGNAL IDUNA Bedingungen 1344023, Tarif AmbulantPLUS', href: 'https://www.signal-iduna.de/produkte/ambulante-zusatzversicherung/', stand: 'Bedingungen Juli 2026, Abruf 15.10.2026' },
  },
  {
    id: 'dkv-kabn',
    name: 'DKV KombiMed Balance (KABN)',
    versicherer: 'DKV Deutsche Krankenversicherung',
    healio: 'nein',
    heilpraktiker: '80 % höchstens bis zu den Beträgen des GebüH',
    budget: 'Ab dem vierten Versicherungsjahr 600 EUR je Jahr',
    wartezeit: '3 Monate',
    osteopathie: 'Nur als verordnetes Heilmittel durch einen anerkannten Therapieberuf, eigener Topf 600 EUR je Jahr',
    brille: '100 % bis 300 EUR in 24 Monaten',
    vorsorge: '100 % bis 600 EUR je Versicherungsjahr, mit Impfungen und zwei Präventionskursen',
    annahme: 'Gesundheitsfragen im Antrag. Daneben darf keine weitere Zusatzversicherung für dieselben Leistungen bestehen',
    beitrag: '17,83 EUR / 26,24 EUR im Monat',
    grenze: 'Anlaufstaffel beim Heilpraktiker: 100, 200 und 300 EUR in den ersten drei Jahren.',
    passt: {
      heilpraktiker: [0, 'Drei Jahre Anlaufstaffel und drei Monate Wartezeit, danach 600 EUR je Jahr.'],
      brille: [2, 'Brille bis 300 EUR in 24 Monaten neben dem Heilpraktiker.'],
      guenstig: [2, 'Mit 30 und 45 vergleichsweise günstig, mit veröffentlichter Beitragstabelle.'],
      vorerkrankung: [0, 'Keine öffentliche Aussage zur Annahme mit Vorerkrankung.'],
    },
    quelle: { label: 'DKV Bedingungen B 545 mit Beitragsanlage', href: 'https://www.dkv.com/productdb_img/pdf/B545.pdf', stand: 'Stand 7.26, Beiträge 1.7.2026' },
  },
  {
    id: 'ukv-naturprivat',
    name: 'UKV NaturPRIVAT',
    versicherer: 'Union Krankenversicherung',
    healio: 'nein',
    heilpraktiker: '80 % nach GebüH und Hufeland-Verzeichnis, ohne Psychotherapie',
    budget: 'Bis 1.000 EUR je Kalenderjahr ab dem dritten Jahr. Im ersten Jahr bis 500 EUR, in den ersten zwei zusammen bis 1.000 EUR',
    wartezeit: 'Keine',
    osteopathie: 'Ausdrücklich genannt, beim Arzt oder Heilpraktiker',
    brille: 'Nicht enthalten, nur im Schwestertarif VorsorgePRIVAT',
    vorsorge: 'Nicht enthalten, nur im Schwestertarif VorsorgePRIVAT',
    annahme: 'Der Antrag fragt nach Größe, Gewicht und Behandlungen der letzten drei Jahre, etwa wegen Rücken, Allergien oder Migräne',
    beitrag: '28,10 EUR / 28,10 EUR im Monat (20 bis 49 Jahre)',
    grenze: 'Die Gesundheitsfragen treffen genau die typischen Gründe für den Heilpraktiker.',
    passt: {
      heilpraktiker: [1, 'Ohne Wartezeit und ab dem dritten Jahr viel Geld je Jahr, aber 80 % und Anlaufstaffel.'],
      brille: [0, 'Brille nur mit zweitem Vertrag.'],
      guenstig: [1, 'Gleicher Beitrag von 20 bis 49 Jahren, mit 45 vergleichsweise günstig.'],
      vorerkrankung: [0, 'Fragen nach Rücken, Allergien, Migräne und psychischen Erkrankungen der letzten drei Jahre.'],
    },
    quelle: { label: 'VKB Produktübersicht 322611, NaturPRIVAT', href: 'https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/322611', stand: 'gültig ab 01.05.2026' },
  },
];

export const article = {
  slug: 'heilpraktiker-zusatzversicherung-vergleich-2026',
  kind: 'ratgeber',
  group: 'ambulant',
  metaTitle: 'Heilpraktiker Zusatzversicherung Vergleich 2026 | Healio',
  metaDescription: 'Heilpraktiker Zusatzversicherung Vergleich 2026: acht ambulante Tarife mit Erstattung, Höchstbetrag, Wartezeit, Brille und Annahme, jeder Wert mit Quelle.',
  publishedAt: '2026-10-15',
  publishedAtLabel: '15. Oktober 2026',
  readingTimeMinutes: 9,
  listTitle: 'Heilpraktiker Zusatzversicherung Vergleich 2026',
  listTeaser: 'Bekannte ambulante Tarife nebeneinander, mit Quelle zu jedem Wert und einer Auswahlhilfe nach deinem Schwerpunkt.',
  headline: 'Heilpraktiker Zusatzversicherung Vergleich 2026: bekannte Tarife mit Quelle nebeneinander',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'comparison',
    facts: [
      { value: '80 bis 100 %', label: 'Erstattung beim Heilpraktiker in den verglichenen Tarifen' },
      { value: '0 oder 3 Monate', label: 'Wartezeit, je nach Tarif' },
      { value: 'Brille', label: 'steckt nicht in jedem Heilpraktiker-Tarif' }
    ],
    text: 'Den einen besten Tarif für alle gibt es nicht. Entscheidend sind Erstattungssatz, Höchstbetrag samt Anlaufstaffel, Wartezeit und ob du mit deiner Vorgeschichte angenommen wirst. Unten stehen alle Werte mit Quelle, die Auswahlhilfe sortiert nach deinem Schwerpunkt.',
    path: { to: '/ambulant#tarifwahl', text: 'SDK-Beitrag nach Alter und Stufe ausrechnen', label: 'Zum ambulanten Rechner' }
  },
  lead: 'Ein Heilpraktiker Zusatzversicherung Vergleich bringt dir nur etwas, wenn er die Bedingungen nebeneinanderlegt und nicht nur Preise. Hier stehen bekannte ambulante Tarife mit Heilpraktiker-Leistung, jeder Wert aus den Bedingungen oder von der Produktseite des Versicherers, mit Stand. Das hilft auch beim ambulante Zusatzversicherung Vergleich, denn Brille und Vorsorge stehen gleich mit dabei. Healio ist Makler und sagt offen, welche Tarife du bei uns online abschließen kannst und welche nicht.',
  sections: [
    {
      id: 'kriterien',
      heading: 'Worauf kommt es beim Vergleich an?',
      blocks: [
        { type: 'paragraph', text: 'Der Erstattungssatz allein sagt wenig. 100 Prozent nützen dir nichts, wenn der Topf nach zwei Sitzungen leer ist, und 80 Prozent können mehr bringen, wenn der Höchstbetrag groß ist. Vergleiche deshalb immer diese fünf Punkte zusammen.' },
        { type: 'steps', heading: 'Die fünf Vergleichspunkte', items: [
          { title: 'Erstattungssatz', text: 'Wie viel Prozent der Rechnung, und bis zu welchem Satz der Gebührenordnung.' },
          { title: 'Höchstbetrag und Zeitraum', text: 'Euro je Jahr oder je zwei Jahre, eigener Topf oder gemeinsam mit Brille, Vorsorge und Zuzahlungen.' },
          { title: 'Anlaufstaffel', text: 'Manche Tarife zahlen in den ersten Jahren nur einen Bruchteil.' },
          { title: 'Wartezeit', text: 'Null oder drei Monate. In der Wartezeit zahlt der Tarif nicht.' },
          { title: 'Annahme', text: 'Welche Gesundheitsfragen gestellt werden und was bei einer Vorerkrankung passiert.' }
        ] },
        { type: 'paragraph', text: 'Ein Punkt gilt für alle Tarife gleich: Was vor Versicherungsbeginn schon behandelt wird oder angeraten ist, zahlt kein neuer Vertrag. Auch ohne Wartezeit wirkt der Schutz nicht zurück.' }
      ]
    },
    {
      id: 'vergleich',
      heading: 'Welche Heilpraktiker-Tarife stehen im Vergleich?',
      blocks: [
        { type: 'paragraph', text: 'Ausgewählt haben wir bekannte Tarife, die gesetzlich Versicherte heute direkt abschließen können und die beim Heilpraktiker leisten. Die Beiträge sind Beispiele für 30 und 45 Jahre, soweit der Versicherer sie veröffentlicht. Dein Beitrag hängt vom Alter und bei manchen Tarifen von deinen Gesundheitsangaben ab.' },
        {
          type: 'tarifvergleich',
          id: 'tarifvergleich',
          heading: 'Ambulante Tarife mit Heilpraktiker-Leistung, Stand 15. Oktober 2026',
          intro: 'Wähle deinen Schwerpunkt. Die Karten ordnen sich danach, und zu jedem Tarif steht, warum er passt oder nicht.',
          question: 'Was ist dir am wichtigsten?',
          allHint: 'Alle Tarife in der Reihenfolge: zuerst die, die Healio online vermittelt, danach die übrigen. Die Reihenfolge ist keine Wertung.',
          criteria: AUSWAHL,
          tarife: TARIFE,
          note: 'Beitrag: Monatsbeitrag mit 30 und mit 45 Jahren ohne Zuschläge, soweit öffentlich. SDK nach erreichtem Alter (Kalenderjahr minus Geburtsjahr). Werte aus den verlinkten Bedingungen und Produktseiten, Abruf 15. Oktober 2026. Maßgeblich sind allein Antrag und Bedingungen des Versicherers. Die Einstufung „passt“ ist unsere sachliche Lesart der Bedingungen, keine Note.'
        },
        { type: 'paragraph', text: 'Gothaer MediNatura und Medi Ambulant fehlen bewusst. Für gesetzlich Versicherte führt der Versicherer heute nur noch die Tarife Mehr Gesundheit, deshalb steht der Tarif 2.000 D in der Übersicht.' }
      ]
    },
    {
      id: 'unterschiede',
      heading: 'Wo liegen die größten Unterschiede?',
      blocks: [
        { type: 'paragraph', text: 'Drei Unterschiede fallen beim Lesen der Bedingungen sofort auf. Diese wiegen oft schwerer als ein paar Euro Beitrag.' },
        { type: 'table', mobile: 'cards', caption: 'Die drei größten Unterschiede zwischen den Tarifen',
          head: ['Punkt', 'Ohne Bremse', 'Mit Bremse'],
          rows: [
            ['Wartezeit', 'SDK, SIGNAL IDUNA PLUSpur und UKV NaturPRIVAT: keine', 'ARAG 483, HanseMerkur EST, DKV KABN: 3 Monate allgemein. Barmenia 2.000 D: 3 Monate für Heilpraktiker'],
            ['Anlaufstaffel', 'SDK, ARAG 483, Barmenia 2.000 D, SIGNAL IDUNA PLUSpur: keine in den Tarifbedingungen gefunden', 'HanseMerkur EST: 100 und 200 EUR in den ersten zwei Jahren. DKV KABN: 100, 200 und 300 EUR in den ersten drei. UKV NaturPRIVAT: 500 EUR im ersten Jahr'],
            ['Brille im selben Vertrag', 'SDK (eigener Topf), ARAG 483, HanseMerkur EST, SIGNAL IDUNA PLUSpur, DKV KABN', 'Barmenia 2.000 D und UKV NaturPRIVAT: nur mit zweitem Tarif']
          ],
          note: 'Quellen wie in der Übersicht oben, Abruf 15. Oktober 2026.' },
        { type: 'paragraph', text: 'Dazu kommt die Frage, wie der Topf gebaut ist. Bei der SDK hat der Heilpraktiker einen eigenen Topf, Brille und Vorsorge zehren nicht davon. Bei Barmenia teilen sich alle Leistungen einen Jahresbetrag. Das ist flexibel, aber eine teure Einlage schmälert, was für den Heilpraktiker übrig bleibt.' }
      ]
    },
    {
      id: 'vorerkrankung',
      heading: 'Was gilt bei Vorerkrankungen?',
      blocks: [
        { type: 'paragraph', text: 'Hier unterscheiden sich die Tarife am stärksten, und die Versicherer sagen öffentlich sehr unterschiedlich viel dazu. Gesundheitsfragen stellen alle Tarife in dieser Übersicht.' },
        { type: 'paragraph', text: 'Die SDK schreibt in ihrer Broschüre zur ambulanten Zusatzversicherung: Vorerkrankungen werden über feste Zuschläge mitversichert, ohne Ablehnung und ohne Leistungsausschluss. Bei Barmenia ist ein sofortiger Abschluss im Rechner nur möglich, wenn du alle drei Fragen verneinst. Sonst prüft der Versicherer und kann ablehnen. Die UKV fragt nach Behandlungen der letzten drei Jahre wegen Rücken, Allergien, Migräne und weiterer Erkrankungen. SIGNAL IDUNA nennt bei Vorerkrankungen einen Beitrag nach Risiko. ARAG, DKV und HanseMerkur beschreiben ihre Annahmeregeln nicht öffentlich.' },
        { type: 'segments', segments: [
          { text: 'Mehr dazu, wie der Antrag mit Vorgeschichte abläuft, liest du im Ratgeber ' },
          { text: 'Zusatzversicherung trotz Vorerkrankung', to: '/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'healio',
      heading: 'Welche Tarife vermittelt Healio?',
      blocks: [
        { type: 'paragraph', text: 'Online vermittelt Healio für Heilpraktiker und Osteopathie die SDK-Stufen Ambulant 50 bis 100. Dazu kommt als Zusatzbaustein für Vorsorge und Brille die UKV VorsorgePRIVAT. Die übrigen Tarife in der Übersicht kannst du bei Healio nicht online abschließen.' },
        { type: 'paragraph', text: 'Warum die SDK? Weil sie drei Dinge zusammenbringt, die bei anderen Tarifen auseinanderfallen: keine Wartezeit, eigene Töpfe für Heilpraktiker, Brille, Vorsorge und Zuzahlungen, und eine klare Annahmeregel für Menschen mit Vorgeschichte. Wer schon wegen Rücken oder Migräne beim Heilpraktiker war, scheitert bei vielen Tarifen an den Gesundheitsfragen. Bei der SDK zahlt er einen Zuschlag und ist versichert.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Wer nur zum Heilpraktiker geht und gesund ist,', text: 'bekommt bei Barmenia 2.000 D mehr Geld je Jahr, wartet aber drei Monate und zahlt keine Brille.' },
          { lead: 'Wer in den ersten zwei Jahren viel braucht,', text: 'fährt mit Staffeln wie bei HanseMerkur EST schlecht.' },
          { lead: 'Die höchste SDK-Stufe ist nicht die günstigste.', text: 'Bei kleinem Budget sind AP5 oder AP7 ehrlicher als ein großer Tarif, den du kaum nutzt.' }
        ] },
        { type: 'path', to: '/ambulant#tarifwahl', icon: 'calculator', text: 'Stufe wählen, Geburtsjahr eingeben und den Beitrag sehen. Die Gesundheitsfragen folgen im Antrag.', label: 'Zum ambulanten Rechner' }
      ]
    },
    {
      id: 'geheimtipp',
      heading: 'Wie bezahlst du den Beitrag mit deinem Kassenbonus?',
      blocks: [
        { type: 'paragraph', text: 'Jetzt der Geheimtipp, den die meisten Vergleiche nicht kennen. Viele gesetzliche Krankenkassen zahlen ihren Bonus auf Wunsch als Zuschuss zu einer privaten Zusatzversicherung. Wer Vorsorge, Impfungen und Sport sammelt, holt sich so einen Teil des Beitrags zurück.' },
        { type: 'paragraph', text: 'Wie viel das ist, hängt von deiner Kasse und deinen Aktivitäten ab. Rechne deshalb zuerst mit dem vollen Beitrag. Kommt der Bonus dazu, ist er ein Plus und nicht die Grundlage der Entscheidung.' },
        { type: 'segments', segments: [
          { text: 'Welche Kassen das wie regeln, steht im Ratgeber ' },
          { text: 'Kassenbonus für die Zusatzversicherung', to: '/ratgeber/krankenkassen-bonus-zusatzversicherung' },
          { text: '. Den Kassenvergleich mit Bonus findest du auf ' },
          { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'weiter',
      heading: 'Wie gehst du jetzt vor?',
      blocks: [
        { type: 'paragraph', text: 'Leg fest, wofür du den Tarif brauchst, und prüfe dann nur noch zwei oder drei Tarife genauer. Willst du die SDK abschließen, rechnest du deinen Beitrag auf healio.de/ambulant aus. Für einen anderen Tarif gehst du direkt zum Versicherer, die Quellen sind oben verlinkt.' },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Heilpraktiker Kosten', text: 'Was Behandlungen kosten und wer was zahlt.', to: '/ratgeber/heilpraktiker-kosten', icon: 'money', linkLabel: 'Zur Übersicht' },
          { title: 'Heilpraktiker-Zusatzversicherung', text: 'Kriterien, Grenzen und ein Rechenbeispiel.', to: '/ratgeber/heilpraktiker-zusatzversicherung', icon: 'naturopathy', linkLabel: 'Ratgeber lesen' },
          { title: 'Ohne Wartezeit', text: 'Ab wann der Schutz für neue Fälle gilt.', to: '/ratgeber/heilpraktiker-zusatzversicherung-ohne-wartezeit', icon: 'calendar', linkLabel: 'Ratgeber lesen' },
          { title: 'Osteopathie Zusatzversicherung', text: 'Kassenzuschuss, Behandler und Tarifgrenzen.', to: '/ratgeber/zusatzversicherung-osteopathie', icon: 'naturopathy', linkLabel: 'Ratgeber lesen' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler. Im Heilpraktiker Zusatzversicherung Vergleich 2026 erstatten die verglichenen Tarife 80 bis 100 Prozent beim Heilpraktiker. Die SDK-Tarife AP5 bis AP1 haben keine Wartezeit, eigene Töpfe und nehmen Vorerkrankungen laut SDK per Zuschlag ohne Ablehnung an. ARAG 483 und HanseMerkur EST haben drei Monate Wartezeit, Barmenia 2.000 D drei Monate für Heilpraktiker und keine Brille.',
  faqs: [
    { question: 'Welche Heilpraktiker-Zusatzversicherung ist die beste?', answer: 'Das hängt von deinem Bedarf ab. Für viel Heilpraktiker ohne Wartezeit und mit Vorgeschichte passt die SDK, für einen großen Jahrestopf ohne Brille Barmenia 2.000 D. Eine allgemeine Bestnote vergeben wir nicht.' },
    { question: 'Welche Heilpraktiker-Tarife haben keine Wartezeit?', answer: 'In dieser Übersicht die SDK-Tarife AP5 bis AP1, SIGNAL IDUNA AmbulantPLUSpur und UKV NaturPRIVAT. ARAG 483, DKV KABN und HanseMerkur EST haben drei Monate, Barmenia 2.000 D drei Monate für Heilpraktiker und Naturheilverfahren.' },
    { question: 'Zahlt eine Heilpraktiker-Zusatzversicherung auch die Brille?', answer: 'Nicht immer. Die SDK hat einen eigenen Sehhilfen-Topf, ARAG 483, DKV KABN, HanseMerkur EST und SIGNAL IDUNA PLUSpur zahlen ebenfalls Brillen. Barmenia Mehr Gesundheit und UKV NaturPRIVAT schließen Sehhilfen aus.' },
    { question: 'Kann ich mit Vorerkrankung eine Heilpraktiker-Zusatzversicherung abschließen?', answer: 'Bei der SDK ja: Vorerkrankungen werden laut SDK per festem Zuschlag mitversichert, ohne Ablehnung und ohne Leistungsausschluss. Bei anderen Tarifen entscheidet der Versicherer nach den Gesundheitsfragen, eine Ablehnung ist möglich.' },
    { question: 'Kann ich jeden Tarif aus dem Vergleich bei Healio abschließen?', answer: 'Nein. Online vermittelt Healio die SDK-Stufen und als Zusatz die UKV VorsorgePRIVAT. Die anderen Tarife schließt du direkt beim Versicherer ab.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Den SDK-Tarif und deinen Beitrag siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Die Kriterien im Detail stehen im Ratgeber ' },
      { text: 'Heilpraktiker-Zusatzversicherung', to: '/ratgeber/heilpraktiker-zusatzversicherung' },
      { text: '. Welche Kasse den Beitrag mit ihrem Bonus mitträgt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-15',
    checkedAtLabel: '15. Oktober 2026',
    intro: 'Alle Tarifwerte stammen aus Bedingungen, Produktübersichten und Produktseiten der Versicherer.',
    items: [
      { label: 'AVB Zusatzversicherung AP-Tarife', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: '1.753a, Stand 1. Januar 2023', accessedAt: '15.10.2026' },
      { label: 'Broschüre Ambulante Zusatzversicherung, Annahme mit Vorerkrankungen', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Broschueren/Broschuere-Ambulante-Zusatzversicherung-1.781.pdf', stand: '1.781/07.23', accessedAt: '15.10.2026' },
      { label: 'Ambulanter Schutz und SDK-Beiträge nach Alter', publisher: 'Healio', href: 'https://healio.de/ambulant', stand: 'Beiträge Stand 29. September 2026', accessedAt: '15.10.2026' },
      { label: 'AVB Mehr Gesundheit 2.000 D (K 5288)', publisher: 'BarmeniaGothaer', href: 'https://cdn.barmeniagothaer.de/barmeniagothaer/media/gesundheit_pflege/gesundheit/ambulante_zusatzversicherung/avb-ambulante-zusatzversicherung-2-000d-k5288.pdf', stand: 'Stand 1. August 2023', accessedAt: '15.10.2026' },
      { label: 'Ambulante Zusatzversicherung, Produktseite und Rechner', publisher: 'BarmeniaGothaer', href: 'https://www.barmeniagothaer.de/ambulante-zusatzversicherung/', stand: 'Abruf 15. Oktober 2026', accessedAt: '15.10.2026' },
      { label: 'Heilpraktiker-Zusatzversicherung, Produktseite mit Berechnungsbeispiel', publisher: 'ARAG', href: 'https://www.arag.de/krankenzusatzversicherung/heilpraktiker-zusatzversicherung/', stand: 'Bedingungsheft A842, Stand 4.2026', accessedAt: '15.10.2026' },
      { label: 'Ambulante Zusatzversicherung, Produktseite mit Preisbeispiel und Verbraucherinformation kk-373', publisher: 'HanseMerkur', href: 'https://www.hansemerkur.de/ambulante-zusatzversicherung', stand: 'Verbraucherinformation Januar 2026', accessedAt: '15.10.2026' },
      { label: 'Bedingungen 1344023 mit Tarif AmbulantPLUS und Produktseite', publisher: 'SIGNAL IDUNA', href: 'https://www.signal-iduna.de/produkte/ambulante-zusatzversicherung/', stand: 'Bedingungen Juli 2026', accessedAt: '15.10.2026' },
      { label: 'Bedingungen KombiMed Balance B 545 mit Beitragsanlage', publisher: 'DKV', href: 'https://www.dkv.com/productdb_img/pdf/B545.pdf', stand: 'Stand 7.26, Beiträge 1. Juli 2026', accessedAt: '15.10.2026' },
      { label: 'Produktübersicht Zusatztarife mit NaturPRIVAT und VorsorgePRIVAT', publisher: 'Versicherungskammer Bayern, UKV', href: 'https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/322611', stand: 'Material 322611, gültig ab 1. Mai 2026', accessedAt: '15.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen vom 15. Oktober 2026. Maßgeblich sind der Antrag und die vereinbarten Bedingungen des Versicherers.'
};
