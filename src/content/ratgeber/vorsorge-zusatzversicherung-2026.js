/**
 * Vorsorge-Zusatzversicherung 2026, zweiter Ratgeber zum Tarifvergleich
 * (Auftrag Frank 15.10.2026). Suchbegriff „vorsorge zusatzversicherung“ 90
 * (Semrush DE, 15.10.2026, KD 18). Geprüft und verworfen: „brillenversicherung
 * vergleich“ (390, kannibalisiert /ratgeber/brillenversicherung, deren Titel
 * seit 14.10. auf Vergleich zielt) und „osteopathie zusatzversicherung
 * vergleich“ (20, kannibalisiert /ratgeber/zusatzversicherung-osteopathie).
 * Bisher gibt es keine Healio-Seite zu privater Vorsorge im Tarifvergleich,
 * die Vorsorge-Gruppe behandelt die Kassenleistung.
 *
 * Tarifdaten nur aus Primärquellen der Versicherer:
 *   - SDK AP-Tarife: AVB 1.753a, Leistungsübersicht (Vorsorge, Impfungen,
 *     Präventionskurse je zwei Kalenderjahre), Broschüre 1.781/07.23,
 *     Beiträge 29.09.2026 (src/data/sdkAmbulantBeitraege.js).
 *   - UKV VorsorgePRIVAT: Tarif 334658, VKB-Produktübersicht 322611 (ab
 *     01.05.2026), Antrag fragt nach Sehhilfe und Gehör (ambulantFaqs.js).
 *   - ARAG V100: Bedingungsheft A842 (4.2026), wie AmbulantAragVorsorge.jsx;
 *     nach Franks Regel nur „keine Ablehnung wegen Vorerkrankungen“.
 *   - Barmenia Mehr Gesundheit 500 D: AVB K 5286 (01.08.2023), Produktseite
 *     mit Beispielen 30 Jahre 9,00 EUR, 50 Jahre 18,00 EUR (Abruf 10.10.2026,
 *     Healio/SEO-Semrush-Workflow/2026-10-09/WEITERE-VORSORGE-PRÜFUNG).
 *   - Münchener Verein 172: Bedingungspaket Tarif 172 (06/2015, AVB 06/2024),
 *     Rechnerbeispiel 32 Jahre 11,56 EUR (10.10.2026). Laut Produktseite ohne
 *     Prüfung der Gesundheit, auf der Seite nach Franks Regel als „keine
 *     Ablehnung wegen Vorerkrankungen“.
 *   - DKV KABN: B 545 (7.26) Nr. 2.7, Beitragsanlage 1.7.2026.
 *   - SIGNAL IDUNA AmbulantPLUSpur: Bedingungen 1344023 (Juli 2026), B4.
 * Datenschutz: keine Gesundheitsdaten, keine Messung im Vergleich.
 */

const ROWS = [
  ['vorsorge', 'Vorsorge'],
  ['staffel', 'Anlaufstaffel'],
  ['wartezeit', 'Wartezeit'],
  ['beitrag', 'Beitrag'],
  ['impfung', 'Impfungen'],
  ['brille', 'Brille'],
  ['annahme', 'Gesundheitsfragen'],
];

const AUSWAHL = [
  { id: 'checks', label: 'Viel für Checks', hint: 'Oben stehen Tarife mit großem Vorsorge-Betrag und wenig Anlaufbremse.' },
  { id: 'rundum', label: 'Vorsorge plus Heilpraktiker', hint: 'Zuerst kommen Tarife, die neben der Vorsorge auch Heilpraktiker und Brille leisten.' },
  { id: 'guenstig', label: 'Kleiner Beitrag', hint: 'Sortiert nach niedrigem Monatsbeitrag. Kleiner Beitrag heißt meist kleinerer Topf.' },
  { id: 'vorerkrankung', label: 'Vorerkrankungen', hint: 'Vorn landen Tarife mit klarer Aussage, dass Vorerkrankungen nicht zur Absage führen.' },
];

const TARIFE = [
  {
    id: 'sdk-ap1',
    name: 'SDK Ambulant 100 (AP1)',
    versicherer: 'Süddeutsche Krankenversicherung',
    healio: 'online',
    vorsorge: '100 % bis 500 EUR je zwei Kalenderjahre, gemeinsam mit Impfungen und Präventionskursen',
    staffel: 'Keine',
    impfung: 'Im Vorsorge-Topf enthalten',
    brille: '100 % bis 500 EUR je zwei Kalenderjahre, eigener Topf',
    wartezeit: 'Keine',
    annahme: 'Gesundheitsfragen ja, keine Ablehnung, Vorerkrankungen per Zuschlag mitversichert',
    beitrag: '31,64 EUR mit 30, 44,13 EUR mit 45 Jahren',
    grenze: 'Kein reiner Vorsorgetarif: Der Beitrag deckt auch Heilpraktiker, Brille und Zuzahlungen.',
    passt: {
      checks: [1, '500 EUR in zwei Jahren ohne Anlaufbremse, aber weniger als die großen Vorsorgetarife.'],
      rundum: [2, 'Vorsorge, Heilpraktiker, Brille und Zuzahlungen in eigenen Töpfen, bis zu 3.000 EUR in zwei Jahren.'],
      guenstig: [0, 'Für Vorsorge allein ist die höchste Stufe teuer.'],
      vorerkrankung: [2, 'Laut SDK keine Ablehnung, Vorerkrankungen per Zuschlag mitversichert.'],
    },
    quelle: { label: 'SDK AVB AP-Tarife 1.753a', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: 'Beiträge Stand 29.09.2026' },
  },
  {
    id: 'ukv-vorsorgeprivat',
    name: 'UKV VorsorgePRIVAT',
    versicherer: 'Union Krankenversicherung',
    healio: 'zusatz',
    vorsorge: '100 % bis 500 EUR je Kalenderjahr beim Arzt nach GOÄ',
    staffel: 'Erstes Kalenderjahr 200 EUR, die ersten zwei zusammen 500 EUR',
    impfung: 'Bis 300 EUR je zwei Kalenderjahre, eigener Betrag',
    brille: '80 % von bis zu 500 EUR Rechnung, also bis 400 EUR je zwei Kalenderjahre',
    wartezeit: 'Keine',
    annahme: 'Der Antrag fragt nach Sehhilfe und Gehör',
    beitrag: '13,45 EUR ab 20 Jahren, mit Sehhilfe 4 EUR mehr',
    grenze: 'Vorsorge nur beim Arzt mit GOÄ-Rechnung, nicht beim Heilpraktiker.',
    passt: {
      checks: [2, 'Ab dem dritten Jahr 500 EUR jedes Jahr, dazu eigener Impfbetrag.'],
      rundum: [1, 'Brille und Augenlasern dabei, Heilpraktiker nicht.'],
      guenstig: [2, 'Ein Beitrag für alle Erwachsenen, ohne weitere Altersstufe.'],
      vorerkrankung: [1, 'Gefragt wird nur nach Sehhilfe und Gehör.'],
    },
    quelle: { label: 'UKV Tarif VorsorgePRIVAT 334658 und Produktübersicht 322611', href: 'https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/322611', stand: 'gültig ab 01.05.2026' },
  },
  {
    id: 'arag-v100',
    name: 'ARAG Vorsorge (Tarif V100)',
    versicherer: 'ARAG Krankenversicherung',
    healio: 'anfrage',
    vorsorge: '100 % der anerkannten Restkosten bis 1.000 EUR je zwei Kalenderjahre, aus einem festen Katalog',
    staffel: 'Keine im Tarif genannt',
    impfung: 'Bis 200 EUR je zwei Kalenderjahre, eigener Betrag',
    brille: 'Nicht enthalten',
    wartezeit: '3 Monate',
    annahme: 'Keine Ablehnung wegen Vorerkrankungen. Kein gleichartiger Schutz bei einem anderen privaten Versicherer erlaubt',
    beitrag: 'Im Angebot nach Alter',
    grenze: 'Nur Untersuchungen aus dem Tarifkatalog, etwa großer Gesundheitscheck, Sonografie oder Krebsfrüherkennung.',
    passt: {
      checks: [2, 'Der größte Vorsorge-Betrag dieser Übersicht für gezielte Checks.'],
      rundum: [0, 'Reiner Vorsorgetarif, ohne Heilpraktiker und Brille.'],
      guenstig: [1, 'Beitrag nach Alter, öffentlich keine Tabelle.'],
      vorerkrankung: [2, 'Keine Ablehnung wegen Vorerkrankungen.'],
    },
    quelle: { label: 'ARAG Bedingungsheft A842, Tarif V100', href: 'https://www.arag.de/krankenzusatzversicherung/vorsorgeversicherung/', stand: 'Stand 4.2026, Abruf 15.10.2026' },
  },
  {
    id: 'muenchener-verein-172',
    name: 'Münchener Verein Ambulant Premium+ (Tarif 172)',
    versicherer: 'Münchener Verein Krankenversicherung',
    healio: 'nein',
    vorsorge: '100 % bis 1.000 EUR je zwei Versicherungsjahre, gemeinsam mit Impfungen',
    staffel: 'Erstes Versicherungsjahr 250 EUR, die ersten zwei zusammen 500 EUR',
    impfung: 'Im Vorsorge-Betrag enthalten',
    brille: 'Nicht in Tarif 172',
    wartezeit: 'Keine',
    annahme: 'Laut Produktseite keine Ablehnung wegen Vorerkrankungen. Fälle vor Beginn bleiben ausgeschlossen',
    beitrag: '11,56 EUR mit 32 Jahren (Rechnerbeispiel)',
    grenze: 'Großer Betrag erst ab dem dritten Versicherungsjahr voll nutzbar.',
    passt: {
      checks: [2, 'Bis 1.000 EUR in zwei Jahren, ausdrücklich auch für Sport- und Fitnesschecks.'],
      rundum: [0, 'Naturmedizin ist ein eigener Baustein, Brille fehlt.'],
      guenstig: [2, 'Niedriger Beitrag im öffentlichen Rechner.'],
      vorerkrankung: [2, 'Laut Produktseite keine Ablehnung wegen Vorerkrankungen.'],
    },
    quelle: { label: 'Münchener Verein, Bedingungen Tarif 172', href: 'https://www.muenchener-verein.de/privatkunden/gesundheit/ambulante-zusatzversicherung/', stand: 'AVB 06/2024, Abruf 10.10.2026' },
  },
  {
    id: 'dkv-kabn',
    name: 'DKV KombiMed Balance (KABN)',
    versicherer: 'DKV Deutsche Krankenversicherung',
    healio: 'nein',
    vorsorge: '100 % bis 600 EUR je Versicherungsjahr, mit Impfungen und zwei Präventionskursen',
    staffel: 'Für Vorsorge keine gefunden',
    impfung: 'Im Vorsorge-Betrag enthalten',
    brille: '100 % bis 300 EUR in 24 Monaten',
    wartezeit: '3 Monate',
    annahme: 'Gesundheitsfragen im Antrag. Keine weitere Zusatzversicherung für dieselben Leistungen erlaubt',
    beitrag: '17,83 EUR mit 30, 26,24 EUR mit 45 Jahren',
    grenze: 'Wer schon einen anderen ambulanten Tarif hat, darf ihn laut Bedingungen nicht daneben führen.',
    passt: {
      checks: [2, '600 EUR jedes Versicherungsjahr ohne Anlaufstaffel für Vorsorge.'],
      rundum: [1, 'Brille und Heilpraktiker dabei, beim Heilpraktiker aber mit dreijähriger Staffel.'],
      guenstig: [1, 'Mittlerer Beitrag mit veröffentlichter Tabelle.'],
      vorerkrankung: [0, 'Keine öffentliche Aussage zur Annahme mit Vorerkrankung.'],
    },
    quelle: { label: 'DKV Bedingungen B 545 mit Beitragsanlage', href: 'https://www.dkv.com/productdb_img/pdf/B545.pdf', stand: 'Stand 7.26, Beiträge 1.7.2026' },
  },
  {
    id: 'signal-iduna-pluspur',
    name: 'SIGNAL IDUNA AmbulantPLUSpur',
    versicherer: 'SIGNAL IDUNA Krankenversicherung',
    healio: 'nein',
    vorsorge: '100 % bis 750 EUR je zwei Kalenderjahre',
    staffel: 'Keine gefunden',
    impfung: 'Reiseimpfungen im Vorsorge-Betrag',
    brille: '100 % bis 375 EUR je zwei Kalenderjahre',
    wartezeit: 'Keine',
    annahme: 'Einige Gesundheitsfragen, bei Vorerkrankungen Beitrag nach Risiko. Aufnahme bis 54 Jahre',
    beitrag: '19,93 EUR mit 32 Jahren (Beispiel der Produktseite)',
    grenze: 'Ab dem Jahr, in dem du 55 wirst, wechselt der Vertrag in AmbulantPLUS mit höherem Beitrag.',
    passt: {
      checks: [1, '750 EUR in zwei Jahren ohne Wartezeit.'],
      rundum: [2, 'Vorsorge, Brille und Heilpraktiker im selben Tarif.'],
      guenstig: [1, 'Öffentliches Beispiel im Mittelfeld.'],
      vorerkrankung: [1, 'Beitrag nach Risiko laut Produktseite, ob abgelehnt werden kann, steht dort nicht.'],
    },
    quelle: { label: 'SIGNAL IDUNA Bedingungen 1344023, Tarif AmbulantPLUS', href: 'https://www.signal-iduna.de/produkte/ambulante-zusatzversicherung/', stand: 'Bedingungen Juli 2026, Abruf 15.10.2026' },
  },
  {
    id: 'barmenia-g500d',
    name: 'Barmenia Mehr Gesundheit 500 D',
    versicherer: 'BarmeniaGothaer',
    healio: 'nein',
    vorsorge: '100 % beim Arzt aus einem gemeinsamen Topf von 500 EUR je Kalenderjahr',
    staffel: 'Keine',
    impfung: 'Im gemeinsamen Topf',
    brille: 'Nicht enthalten',
    wartezeit: 'Für Vorsorge keine, für Naturheilverfahren 3 Monate',
    annahme: 'Gesundheitsfragen im Antrag, der Versicherer entscheidet über die Annahme',
    beitrag: '9,00 EUR mit 30, 18,00 EUR mit 50 Jahren (Beispiele der Produktseite)',
    grenze: 'Zuzahlungen, Heilmittel und Naturheilverfahren zehren vom selben Topf.',
    passt: {
      checks: [1, '500 EUR jedes Jahr, aber gemeinsam mit anderen Leistungen.'],
      rundum: [1, 'Naturheilverfahren mit drin, Brille nicht.'],
      guenstig: [2, 'Der niedrigste öffentliche Beispielbeitrag mit 30 Jahren.'],
      vorerkrankung: [0, 'Ablehnung nach den Gesundheitsfragen möglich.'],
    },
    quelle: { label: 'AVB Mehr Gesundheit 500 D, K 5286', href: 'https://www.barmeniagothaer.de/ambulante-zusatzversicherung/', stand: 'Stand 01.08.2023, Abruf 10.10.2026' },
  },
];

export const article = {
  slug: 'vorsorge-zusatzversicherung-2026',
  kind: 'ratgeber',
  group: 'vorsorge',
  metaTitle: 'Vorsorge Zusatzversicherung 2026: Tarife im Vergleich | Healio',
  metaDescription: 'Vorsorge Zusatzversicherung 2026: was private Tarife für Check-ups, Impfungen und Krebsfrüherkennung zahlen, mit Staffel, Wartezeit und Beitrag nebeneinander.',
  publishedAt: '2026-10-15',
  publishedAtLabel: '15. Oktober 2026',
  readingTimeMinutes: 8,
  listTitle: 'Vorsorge Zusatzversicherung 2026: Tarife im Vergleich',
  listTeaser: 'Was private Tarife für Check-ups und Impfungen zahlen, wo die Anlaufstaffel bremst und welcher Tarif zu deinem Bedarf passt.',
  headline: 'Vorsorge Zusatzversicherung 2026: welcher Tarif Check-ups und Impfungen zahlt',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'prevention',
    facts: [
      { value: '500 bis 1.000 EUR', label: 'für Vorsorge je Jahr oder je zwei Jahre, je nach Tarif' },
      { value: 'Staffel', label: 'viele Tarife zahlen in den ersten Jahren weniger' },
      { value: 'Nur beim Arzt', label: 'Vorsorge läuft meist über eine GOÄ-Rechnung' }
    ],
    text: 'Eine Vorsorge Zusatzversicherung zahlt Untersuchungen, die die Kasse nicht oder nicht so oft übernimmt. Die Tarife unterscheiden sich vor allem beim Betrag, bei der Anlaufstaffel und darin, ob Brille und Heilpraktiker mit drin sind.',
    path: { to: '/ambulant#tarifwahl', text: 'Vorsorge-Topf und Beitrag der SDK ansehen', label: 'Zum ambulanten Rechner' }
  },
  lead: 'Eine Vorsorge Zusatzversicherung lohnt sich, wenn du regelmäßig Untersuchungen willst, die deine Kasse nicht zahlt: großer Check-up, Ultraschall, erweiterte Krebsfrüherkennung oder Reiseimpfungen. Hier liegen bekannte Tarife nebeneinander, jeder Wert aus den Bedingungen des Versicherers mit Stand. Dazu, welcher Tarif zu deinem Schwerpunkt passt und welche du bei Healio online abschließen kannst.',
  sections: [
    {
      id: 'was-zahlt',
      heading: 'Was zahlt eine Vorsorge Zusatzversicherung?',
      blocks: [
        { type: 'paragraph', text: 'Der Tarif erstattet ärztliche Untersuchungen zur Früherkennung, die du sonst selbst zahlst. Die gesetzliche Kasse übernimmt viele Vorsorgen nur in bestimmten Abständen und Altersgruppen. Was darüber hinausgeht, rechnet der Arzt privat nach der Gebührenordnung für Ärzte ab.' },
        { type: 'paragraph', text: 'Typisch sind Ultraschall von Bauch oder Schilddrüse, erweiterte Blutwerte, Belastungs-EKG und Krebsfrüherkennung außerhalb der Kassenintervalle. Viele Tarife zahlen auch Schutzimpfungen und Reiseimpfungen, teils aus demselben Topf, teils mit eigenem Betrag.' },
        { type: 'segments', segments: [
          { text: 'Was die Kasse in welchem Alter zahlt, steht im Ratgeber ' },
          { text: 'Vorsorgeuntersuchung', to: '/ratgeber/vorsorgeuntersuchung' },
          { text: '. Für Frauen und Männer gibt es eigene Übersichten: ' },
          { text: 'Vorsorge für Frauen', to: '/ratgeber/vorsorgeuntersuchung-frauen' },
          { text: ' und ' },
          { text: 'Vorsorge für Männer', to: '/ratgeber/vorsorgeuntersuchung-maenner' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'vergleich',
      heading: 'Welche Vorsorge-Tarife gibt es 2026?',
      blocks: [
        { type: 'paragraph', text: 'Es gibt reine Vorsorgetarife und ambulante Tarife, in denen Vorsorge ein Baustein von mehreren ist. Beide Arten stehen hier zusammen, damit du siehst, was du für deinen Beitrag bekommst.' },
        {
          type: 'tarifvergleich',
          id: 'tarifvergleich',
          heading: 'Vorsorge-Tarife im Vergleich, Stand 15. Oktober 2026',
          intro: 'Wähle deinen Schwerpunkt. Die Karten ordnen sich danach, und zu jedem Tarif steht, warum er passt oder nicht.',
          question: 'Was ist dir am wichtigsten?',
          allHint: 'Alle Tarife in der Reihenfolge: zuerst die, die Healio vermittelt, danach die übrigen. Die Reihenfolge ist keine Wertung.',
          rows: ROWS,
          visibleRows: 4,
          criteria: AUSWAHL,
          tarife: TARIFE,
          note: 'Beitrag: Monatsbeitrag ohne Zuschläge, soweit öffentlich, sonst das öffentliche Beispiel mit Altersangabe. Werte aus den verlinkten Bedingungen und Produktseiten, Abruf 10. und 15. Oktober 2026. Maßgeblich sind allein Antrag und Bedingungen des Versicherers. Die Einstufung „passt“ ist unsere sachliche Lesart, keine Note.'
        }
      ]
    },
    {
      id: 'staffel',
      heading: 'Warum zahlen manche Tarife am Anfang weniger?',
      blocks: [
        { type: 'paragraph', text: 'Weil der Versicherer verhindern will, dass jemand abschließt, alle Checks im ersten Jahr macht und wieder kündigt. Deshalb begrenzen manche Tarife die ersten Jahre. Bei der UKV VorsorgePRIVAT sind es 200 EUR im ersten Kalenderjahr, beim Münchener Verein 250 EUR im ersten Versicherungsjahr.' },
        { type: 'table', mobile: 'cards', caption: 'Was in den ersten zwei Jahren für Vorsorge höchstens bereitsteht',
          head: ['Tarif', 'Erstes Jahr', 'Erste zwei Jahre zusammen'],
          rows: [
            ['SDK AP1', '500 EUR im ersten Zweijahreszeitraum', '500 EUR'],
            ['UKV VorsorgePRIVAT', '200 EUR', '500 EUR'],
            ['Münchener Verein 172', '250 EUR', '500 EUR'],
            ['DKV KABN', '600 EUR', '1.200 EUR'],
            ['ARAG V100', 'nach 3 Monaten Wartezeit, bis 1.000 EUR im Zeitraum', '1.000 EUR']
          ],
          note: 'Eigene Lesart der Bedingungen, Stand Oktober 2026. Bei der SDK zählen zwei Kalenderjahre ab Beginn, bei DKV und Münchener Verein Versicherungsjahre. Bei Barmenia 500 D teilt sich die Vorsorge 500 EUR je Kalenderjahr mit anderen Leistungen.' },
        { type: 'paragraph', text: 'Planst du in den nächsten Monaten einen teuren Check, achte deshalb weniger auf den großen Betrag in der Werbung und mehr auf das erste Jahr.' }
      ]
    },
    {
      id: 'welcher',
      heading: 'Welcher Vorsorge-Tarif passt zu wem?',
      blocks: [
        { type: 'paragraph', text: 'Für gezielte Checks allein sind reine Vorsorgetarife wie ARAG V100 oder Münchener Verein 172 gebaut. Wer sowieso Brille trägt und ab und zu zum Heilpraktiker oder Osteopathen geht, fährt mit einem ambulanten Tarif mit eigenen Töpfen meist besser, weil ein Beitrag mehrere Bereiche abdeckt.' },
        { type: 'paragraph', text: 'Bei Healio heißt das konkret: Die SDK Ambulant 100 hat 500 EUR für Vorsorge in zwei Jahren und daneben eigene Töpfe für Heilpraktiker, Brille und Zuzahlungen. Wer mehr Vorsorge will, kann die UKV VorsorgePRIVAT dazunehmen. Zwei Verträge zusammen dürfen nie mehr erstatten, als die Rechnung kostet.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Für eine einzige Untersuchung lohnt kein Vertrag.', text: 'Rechne die Beiträge über zwei Jahre gegen die Checks, die du wirklich machst.' },
          { lead: 'Der Heilpraktiker zählt bei der Vorsorge nicht.', text: 'Die Vorsorgebausteine zahlen fast immer nur ärztliche Untersuchungen nach GOÄ.' },
          { lead: 'Was vor Beginn schon angeraten ist, bleibt draußen.', text: 'Eine Vorsorge ohne Befund ist versichert, die Abklärung eines bekannten Befunds nicht automatisch.' }
        ] },
        { type: 'path', to: '/ambulant#tarifwahl', icon: 'calculator', text: 'SDK-Stufe wählen, Geburtsjahr eingeben und den Beitrag sehen.', label: 'Zum ambulanten Rechner' }
      ]
    },
    {
      id: 'geheimtipp',
      heading: 'Wie hilft dein Kassenbonus beim Beitrag?',
      blocks: [
        { type: 'paragraph', text: 'Hier liegt der Geheimtipp: Wer Vorsorge macht, sammelt bei vielen Krankenkassen gleichzeitig Bonuspunkte. Viele Kassen zahlen den Bonus auf Wunsch als Zuschuss zu einer privaten Zusatzversicherung. Die Untersuchung, die du ohnehin machst, hilft so beim Beitrag.' },
        { type: 'segments', segments: [
          { text: 'Wie die Kassen das regeln, liest du im Ratgeber ' },
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
        { type: 'paragraph', text: 'Schreib dir auf, welche Untersuchungen du in den nächsten zwei Jahren machen willst und was sie kosten. Dann siehst du schnell, ob ein reiner Vorsorgetarif reicht oder ob ein ambulanter Tarif mit mehreren Töpfen mehr bringt.' },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Vorsorgeuntersuchung', text: 'Was die Kasse in welchem Alter zahlt.', to: '/ratgeber/vorsorgeuntersuchung', icon: 'prevention', linkLabel: 'Zur Übersicht' },
          { title: 'Check-up 35', text: 'Was der Gesundheits-Check der Kasse enthält.', to: '/ratgeber/check-up-35', icon: 'prevention', linkLabel: 'Ratgeber lesen' },
          { title: 'Reiseimpfung und Krankenkasse', text: 'Welche Kasse Reiseimpfungen erstattet.', to: '/ratgeber/reiseimpfung-krankenkasse', icon: 'prevention', linkLabel: 'Ratgeber lesen' },
          { title: 'Heilpraktiker Zusatzversicherung Vergleich', text: 'Ambulante Tarife mit Heilpraktiker und Brille nebeneinander.', to: '/ratgeber/heilpraktiker-zusatzversicherung-vergleich-2026', icon: 'comparison', linkLabel: 'Zum Vergleich' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler. Eine Vorsorge Zusatzversicherung erstattet 2026 je nach Tarif 500 bis 1.000 EUR für ärztliche Vorsorge, je Jahr oder je zwei Jahre. UKV VorsorgePRIVAT und Münchener Verein 172 starten mit einer Anlaufstaffel, ARAG V100 und DKV KABN mit drei Monaten Wartezeit. Die SDK Ambulant 100 hat 500 EUR Vorsorge in zwei Jahren neben eigenen Töpfen für Heilpraktiker, Brille und Zuzahlungen.',
  faqs: [
    { question: 'Was ist eine Vorsorge Zusatzversicherung?', answer: 'Ein privater Tarif, der ärztliche Früherkennung und oft Impfungen erstattet, die die Kasse nicht oder nicht so oft zahlt. Es gibt reine Vorsorgetarife und ambulante Tarife mit Vorsorge als Baustein.' },
    { question: 'Zahlt eine Vorsorge Zusatzversicherung auch Untersuchungen beim Heilpraktiker?', answer: 'In der Regel nicht. Die Vorsorgebausteine zahlen ärztliche Untersuchungen nach der Gebührenordnung für Ärzte. Heilpraktiker laufen in ambulanten Tarifen über einen eigenen Topf für Naturheilverfahren.' },
    { question: 'Ab wann zahlt der Tarif?', answer: 'Je nach Tarif sofort oder nach drei Monaten Wartezeit. UKV VorsorgePRIVAT, SDK, Münchener Verein 172 und SIGNAL IDUNA haben keine Wartezeit, ARAG V100 und DKV KABN drei Monate.' },
    { question: 'Kann ich zwei Vorsorge-Tarife kombinieren?', answer: 'Oft ja, aber nicht immer. Zusammen dürfen sie nie mehr als die Rechnung erstatten. Die DKV erlaubt laut Bedingungen keine weitere Zusatzversicherung für dieselben Leistungen, die ARAG keinen gleichartigen Schutz bei einem anderen Versicherer.' },
    { question: 'Welche Vorsorge-Tarife vermittelt Healio?', answer: 'Online die SDK-Stufen Ambulant 50 bis 100 mit Vorsorge-Topf und als Zusatzbaustein die UKV VorsorgePRIVAT. ARAG V100 auf Anfrage. Die übrigen Tarife schließt du direkt beim Versicherer ab.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Den SDK-Tarif mit Vorsorge-Topf und den Zusatzbaustein siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Was die Kasse selbst zahlt, steht im Ratgeber ' },
      { text: 'Vorsorgeuntersuchung', to: '/ratgeber/vorsorgeuntersuchung' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-15',
    checkedAtLabel: '15. Oktober 2026',
    intro: 'Alle Tarifwerte stammen aus Bedingungen, Produktübersichten und Produktseiten der Versicherer.',
    items: [
      { label: 'AVB Zusatzversicherung AP-Tarife', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: '1.753a, Stand 1. Januar 2023', accessedAt: '15.10.2026' },
      { label: 'Produktübersicht Zusatztarife mit VorsorgePRIVAT', publisher: 'Versicherungskammer Bayern, UKV', href: 'https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/322611', stand: 'Material 322611, gültig ab 1. Mai 2026', accessedAt: '15.10.2026' },
      { label: 'Vorsorgeversicherung V100, Produktseite und Bedingungsheft A842', publisher: 'ARAG', href: 'https://www.arag.de/krankenzusatzversicherung/vorsorgeversicherung/', stand: 'Bedingungen Stand 4.2026', accessedAt: '15.10.2026' },
      { label: 'Ambulante Zusatzversicherung, Tarif 172', publisher: 'Münchener Verein', href: 'https://www.muenchener-verein.de/privatkunden/gesundheit/ambulante-zusatzversicherung/', stand: 'Bedingungen Tarif 172, AVB 06/2024', accessedAt: '10.10.2026' },
      { label: 'Bedingungen KombiMed Balance B 545 mit Beitragsanlage', publisher: 'DKV', href: 'https://www.dkv.com/productdb_img/pdf/B545.pdf', stand: 'Stand 7.26, Beiträge 1. Juli 2026', accessedAt: '15.10.2026' },
      { label: 'Ambulante Zusatzversicherung, Bedingungen 1344023', publisher: 'SIGNAL IDUNA', href: 'https://www.signal-iduna.de/produkte/ambulante-zusatzversicherung/', stand: 'Bedingungen Juli 2026', accessedAt: '15.10.2026' },
      { label: 'Ambulante Zusatzversicherung Mehr Gesundheit, AVB K 5286', publisher: 'BarmeniaGothaer', href: 'https://www.barmeniagothaer.de/ambulante-zusatzversicherung/', stand: 'Stand 1. August 2023', accessedAt: '10.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen, Stand 15. Oktober 2026. Maßgeblich sind der Antrag und die vereinbarten Bedingungen des Versicherers.'
};
