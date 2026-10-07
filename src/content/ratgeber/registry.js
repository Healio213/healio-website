/**
 * AUTOMATISCH ERZEUGT von scripts/build-ratgeber-registry.mjs. Nicht von Hand
 * bearbeiten: Quelle sind die Inhaltsdateien und gliederung.js (Ablauf für
 * neue Artikel dort im Kopfkommentar).
 *
 * Schlanke Metadaten aller veröffentlichten Ratgeberartikel in
 * Registerreihenfolge (Einzelartikel, dann die Gruppen), ohne Artikeltext.
 * Für Links, Gruppen, Weiterlesen-Listen und Prüfungen. Die Übersicht lädt
 * registry.overview.js, eine Artikelseite registry.loaders.js; diese Datei
 * gehört in keine der beiden, damit sie mit neuen Artikeln nicht wachsen.
 */

export { RATGEBER_GROUPS } from './gliederung.js';
export { RATGEBER_BASE_PATH, getRatgeberPath } from './paths.js';

export const RATGEBER_ENTRIES = [
  {
    "slug": "ikk-classic-bonusprogramm-2026",
    "kind": "ratgeber",
    "listTitle": "IKK classic Bonusprogramm 2026: Bonusheft, alle Positionen, Nachweise und Fristen",
    "listTeaser": "Jede bonusfähige Position mit Betrag, die Regeln für den dreifachen Zuschuss und die Gegenrechnung mit dem Zusatzbeitrag.",
    "readingTimeMinutes": 8,
    "metaTitle": "IKK classic Bonusprogramm 2026: Bonusheft, Beträge | Healio",
    "metaDescription": "IKK classic Bonus 2026: Bonusheft oder App, alle Positionen mit Beträgen, Frist 31.03.2027 und wie der dreifache Zuschuss deinen Beitrag senkt.",
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "mkk-bonusprogramm-2026",
    "kind": "ratgeber",
    "listTitle": "mkk Bonusprogramm 2026: alle Maßnahmen, Zuschuss zur Zusatzversicherung und Fristen",
    "listTeaser": "Was die mkk laut Satzung je Maßnahme zahlt, wann der Vollständigkeitsbonus greift und wie bis zu 100 EUR Zuschuss in eine Zusatzversicherung fließen können.",
    "readingTimeMinutes": 8,
    "metaTitle": "mkk Bonusprogramm 2026: Beträge, Zuschuss, Formulare | Healio",
    "metaDescription": "mkk Bonus 2026 laut Satzung: 5 EUR je Vorsorge, 70 EUR Geld oder bis zu 100 EUR Zuschuss zur Zusatzversicherung, Nachweise und Frist 30.04.2027.",
    "publishedAt": "2026-10-05",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "aok-bonusprogramm-2026",
    "kind": "ratgeber",
    "listTitle": "AOK Bonusprogramm 2026: alle elf AOKs mit Beträgen, Bonusheft und Fristen",
    "listTeaser": "Welche AOK für dich zuständig ist, was sie je Maßnahme zahlt, bis wann du einreichst und wo der Bonus als Zuschuss in eine Zusatzversicherung fließen kann.",
    "readingTimeMinutes": 18,
    "metaTitle": "AOK Bonusprogramm 2026: alle 11 AOKs im Vergleich | Healio",
    "metaDescription": "AOK Bonus 2026: Jede der elf AOKs hat ein eigenes Programm. Beträge, Bonusheft, Fristen und wo der Bonus eine Zusatzversicherung mitfinanzieren kann.",
    "publishedAt": "2026-10-05",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "tk-bonusprogramm-2026",
    "kind": "ratgeber",
    "listTitle": "TK Bonusprogramm 2026: Punkte, Gesundheitsdividende, Nachweise und Fristen",
    "listTeaser": "Was jede Maßnahme laut Satzung an Punkten bringt, wofür du die doppelte Gesundheitsdividende einlösen kannst und wie sie den Beitrag einer Zusatzversicherung mittragen kann.",
    "readingTimeMinutes": 9,
    "metaTitle": "TK Bonusprogramm 2026: Punkte, Gesundheitsdividende | Healio",
    "metaDescription": "TK Bonus 2026 laut Satzung: 100 Punkte sind 1 EUR, die Gesundheitsdividende doppelt so viel. Wofür du sie einlöst, Fristen und der Weg zur Zusatzversicherung.",
    "publishedAt": "2026-10-05",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "barmer-bonusprogramm-2026",
    "kind": "ratgeber",
    "listTitle": "BARMER Bonusprogramm 2026: Maßnahmen, Punkte, Nachweise und Fristen",
    "listTeaser": "Was die BARMER laut Satzung je Maßnahme an Punkten gibt, wie der doppelte Zuschuss funktioniert und wie er den Beitrag einer Zusatzversicherung mitfinanzieren kann.",
    "readingTimeMinutes": 10,
    "metaTitle": "BARMER Bonusprogramm 2026: Punkte, Maßnahmen, Frist | Healio",
    "metaDescription": "BARMER Bonus 2026 laut Satzung: Punkte je Maßnahme, je nach Aktivität bis zu 100 EUR Geld oder 200 EUR Zuschuss, auch für die Zusatzversicherung, Fristen.",
    "publishedAt": "2026-10-05",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "schwangerschaft-worauf-achten",
    "kind": "ratgeber",
    "listTitle": "Schwanger: worauf du jetzt achten solltest",
    "listTeaser": "Der Alltag und das Geld in einem Text: Mutterpass, Hebamme, Selbstzahlerleistungen, Mutterschutz, Anträge und der Bonus, der jetzt am höchsten ist.",
    "readingTimeMinutes": 8,
    "metaTitle": "Schwanger: worauf du jetzt achten solltest | Healio",
    "metaDescription": "Vorsorge, Mutterpass, Mutterschutz und das Geld: was die Kasse zahlt, was du selbst trägst und warum der Kassenbonus jetzt am höchsten ist.",
    "publishedAt": "2026-09-28"
  },
  {
    "slug": "krankenkassen-bonus-zusatzversicherung",
    "kind": "advertorial",
    "listTitle": "Krankenkassen-Bonus: das Geld, mit dem sich Zusatzschutz finanzieren lässt",
    "listTeaser": "Warum ein Blick in die Satzung der eigenen Krankenkasse oft mehr bringt als jeder Tarifwechsel.",
    "metaTitle": "Krankenkassen-Bonus nutzen und Zusatzschutz finanzieren | Healio",
    "metaDescription": "Wie das Bonusprogramm der eigenen gesetzlichen Krankenkasse den größten Teil einer ambulanten Zusatzversicherung trägt. Erst prüfen, dann entscheiden."
  },
  {
    "slug": "zahnersatz-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnersatz Kosten: was die Kasse zahlt und was du selbst zahlst",
    "listTeaser": "Alle Zahnkosten auf einer Seite: Festzuschuss, Bonusheft, typische Eigenanteile und der Weg zu jedem Zahn-Ratgeber.",
    "readingTimeMinutes": 13,
    "metaTitle": "Zahnersatz Kosten: was die Kasse zahlt, was du zahlst | Healio",
    "metaDescription": "Zahnersatz, Krone, Implantat, Zahnreinigung: was die Krankenkasse 2026 zahlt, was ab 2027 gilt, wie das Bonusheft hilft und wo dein Eigenanteil bleibt.",
    "publishedAt": "2026-10-06",
    "updatedAt": "2026-10-07"
  },
  {
    "slug": "professionelle-zahnreinigung-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Professionelle Zahnreinigung: Kosten und was deine Kasse dazugibt",
    "listTeaser": "Was eine Zahnreinigung kostet und was 27 Krankenkassen laut Satzung dazugeben, alle elf AOKs eingeschlossen, mit Fundstelle und Stand.",
    "readingTimeMinutes": 11,
    "metaTitle": "Professionelle Zahnreinigung: Kosten und Kassenzuschuss | Healio",
    "metaDescription": "Was eine professionelle Zahnreinigung kostet und welche Krankenkasse wie viel dazugibt: AOK, TK, BARMER, DAK, IKK classic und weitere, mit Satzungsfundstelle.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "zahnimplantat-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnimplantat: Kosten, Kassenanteil und Eigenanteil",
    "listTeaser": "Warum die Kasse beim Implantat nur einen Festzuschuss zahlt, was übrig bleibt und wo die Zahnstaffel greift.",
    "readingTimeMinutes": 10,
    "metaTitle": "Zahnimplantat Kosten: Kassenanteil und Eigenanteil | Healio",
    "metaDescription": "Was ein Zahnimplantat kostet, welchen Festzuschuss die Kasse zahlt, was mit Bonusheft gilt und was eine Zahnzusatzversicherung im ersten Jahr erstattet.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "wurzelbehandlung-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Wurzelbehandlung: wann die Kasse zahlt und was privat kostet",
    "listTeaser": "Wann die Wurzelbehandlung Kassenleistung ist, welche Extras privat kosten und was ein Tarif davon trägt, mit den Regeln der Richtlinie im Wortlaut.",
    "readingTimeMinutes": 9,
    "metaTitle": "Wurzelbehandlung Kosten: wann die Kasse zahlt | Healio",
    "metaDescription": "Wurzelbehandlung beim Zahnarzt: wann sie Kassenleistung ist, welche Zusatzleistungen privat kosten und was eine Zahnzusatzversicherung davon erstattet.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "zahnkrone-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnkrone: Arten, Kosten und Festzuschuss",
    "listTeaser": "Welche Krone die Kasse als Regelversorgung sieht, was die anderen kosten und wie Bonusheft und Tarif den Eigenanteil senken.",
    "readingTimeMinutes": 10,
    "metaTitle": "Zahnkrone Kosten: Arten, Festzuschuss, Eigenanteil | Healio",
    "metaDescription": "Metall, verblendet oder Vollkeramik: was eine Zahnkrone kostet, welchen Festzuschuss die Kasse 2026 und ab 2027 zahlt und was am Ende für dich bleibt.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "bonusheft-zahnarzt",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse",
    "listTeaser": "Fünf oder zehn Jahre lückenlos: was das Bonusheft beim Zahnersatz bringt, heute und ab 2027.",
    "readingTimeMinutes": 9,
    "metaTitle": "Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse | Healio",
    "metaDescription": "Bonusheft beim Zahnarzt: 70 oder 75 statt 60 Prozent Festzuschuss, ab 2027 60 oder 65 statt 50. Regeln, verlorenes Heft und der Unterschied zum Kassenbonus.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "zahnzusatzversicherung-ohne-wartezeit",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag gilt",
    "listTeaser": "Ohne Wartezeit heißt nicht ohne Grenzen: was sofort gilt, was die Zahnstaffel begrenzt und wofür es den Sofortbaustein gibt.",
    "readingTimeMinutes": 10,
    "metaTitle": "Zahnzusatzversicherung ohne Wartezeit: was gilt | Healio",
    "metaDescription": "Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag versichert ist, wo die Zahnstaffel greift und warum Angeratenes nur ein Sofortbaustein abdeckt.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "zahnzusatzversicherung-fehlender-zahn",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnzusatzversicherung bei fehlendem Zahn: was noch geht und was nicht",
    "listTeaser": "Ein Versicherer nimmt bis zu drei Lücken an, ein anderer lehnt schon bei einer ab. Und angeratener Ersatz ist noch einmal eine ganz andere Frage.",
    "readingTimeMinutes": 6,
    "metaTitle": "Zahnzusatzversicherung bei fehlendem Zahn | Healio",
    "metaDescription": "Fehlender Zahn und Zahnzusatzversicherung: welcher Versicherer bis zu drei Lücken annimmt, was ein Zuschlag kostet und wo der Sofortschutz endet.",
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "zahnzusatzversicherung-lohnt-sich",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Lohnt sich eine Zahnzusatzversicherung? Rechnung statt Bauchgefühl",
    "listTeaser": "Wann sie sich rechnet und wann nicht, mit Beispielen zu Krone, Brücke und Implantat, den Prüfpunkten der Verbraucherzentrale und den Grenzen.",
    "readingTimeMinutes": 11,
    "metaTitle": "Lohnt sich eine Zahnzusatzversicherung? Die Rechnung | Healio",
    "metaDescription": "Lohnt sich eine Zahnzusatzversicherung? Rechenbeispiele zu Krone, Brücke und Implantat, Prüfpunkte, Zahnstaffel, Zwei-Jahres-Regel und die zwei Wege bei Healio.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "ukv-zahnzusatzversicherung",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "UKV ZahnPRIVAT im Überblick: Stufen, Leistungen, Grenzen",
    "listTeaser": "Drei Stufen ohne Wartezeit, die Zahnstaffel in den ersten Jahren, Aufnahme mit Zuschlag bei fehlenden Zähnen und was nicht versichert ist.",
    "readingTimeMinutes": 10,
    "metaTitle": "UKV Zahnzusatzversicherung: ZahnPRIVAT im Überblick | Healio",
    "metaDescription": "UKV Zahnzusatzversicherung: ZahnPRIVAT 75, 90 und 100 ohne Wartezeit, mit Zahnstaffel, Zuschlag bei 1 bis 3 fehlenden Zähnen und klaren Grenzen bei Angeratenem.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "bayerische-zahnzusatzversicherung",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Bayerische Zahnzusatzversicherung mit ZAHN Sofort im Überblick",
    "listTeaser": "Für Behandlungen, die schon empfohlen oder begonnen sind: wie ZAHN Sofort funktioniert, wann er wählbar ist und wo er endet.",
    "readingTimeMinutes": 9,
    "metaTitle": "Bayerische Zahnzusatzversicherung mit ZAHN Sofort | Healio",
    "metaDescription": "Bayerische Zahnzusatzversicherung: ZAHN Sofort für schon empfohlene oder begonnene Behandlungen, bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "aok-zahnzusatzversicherung",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "AOK und Zähne: was die AOK beim Zahnersatz zahlt und welche Zusatzversicherung passt",
    "listTeaser": "Festzuschuss, Zahnreinigung und Bonusheft bei den elf AOKs, und welche AOK den Bonus als Zuschuss für eine Zahnzusatzversicherung vorsieht.",
    "readingTimeMinutes": 13,
    "metaTitle": "AOK Zahnzusatzversicherung: was die AOK beim Zahn zahlt | Healio",
    "metaDescription": "AOK Zahnzusatzversicherung: Was die AOK beim Zahnersatz zahlt, welche Zuschüsse es zur Zahnreinigung gibt und welche AOK den Bonus für einen Zahntarif nutzt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "dak-zahnreinigung",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "DAK und Zahnreinigung: was die DAK erstattet",
    "listTeaser": "Bis zu 60 EUR im Jahr laut Satzung, Rechnung bis 31. März des Folgejahres, dazu der Bonus als Zuschuss und was ein Zahntarif übernimmt.",
    "readingTimeMinutes": 9,
    "metaTitle": "Zahnreinigung DAK: bis zu 60 EUR im Jahr | Healio",
    "metaDescription": "Zahnreinigung DAK: Die DAK-Gesundheit gibt laut Satzung bis zu 60 EUR im Kalenderjahr dazu. Mit Frist, Bonus-Zuschuss und dem, was ein Zahntarif übernimmt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zahnbruecke-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnbrücke: Kosten, Festzuschuss und Eigenanteil",
    "listTeaser": "Was die Regelversorgung bei einem, zwei, drei oder vier fehlenden Zähnen kostet, wie viel die Kasse davon trägt und was bei dir bleibt.",
    "readingTimeMinutes": 12,
    "metaTitle": "Zahnbrücke Kosten: Festzuschuss und Eigenanteil | Healio",
    "metaDescription": "Was eine Zahnbrücke kostet, wie viel Festzuschuss die Kasse 2026 zahlt, was das Bonusheft bringt und was bei dir bleibt. Mit Rechenbeispiel und Rechner.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zahnprothese-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnprothese: Arten, Kosten und Eigenanteil",
    "listTeaser": "Was Teilprothese, Vollprothese und Teleskop kosten, wie viel die Kasse je Kiefer als Festzuschuss zahlt und was für dich übrig bleibt.",
    "readingTimeMinutes": 11,
    "metaTitle": "Zahnprothese Kosten: Festzuschuss und Eigenanteil | Healio",
    "metaDescription": "Was eine Zahnprothese kostet, wie viel Festzuschuss die Kasse 2026 für Teilprothese, Vollprothese und Teleskop zahlt und was bei dir bleibt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zahnfuellung-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnfüllung: Kosten, Material und was die Kasse zahlt",
    "listTeaser": "Was seit dem Amalgamverbot 2025 Kassenleistung ist, welche Füllungen privat bleiben und wie sich der Preis eines Inlays zusammensetzt.",
    "readingTimeMinutes": 11,
    "metaTitle": "Zahnfüllung Kosten: Kassenfüllung, Zement und Inlay | Healio",
    "metaDescription": "Zahnfüllung seit dem Amalgamverbot: was die Kasse ohne Zuzahlung zahlt, welche Füllung privat ist und was ein Inlay über die Kassenfüllung hinaus kostet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "parodontitis-behandlung-kosten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Parodontitis-Behandlung: Ablauf, Kosten und was die Kasse zahlt",
    "listTeaser": "Was die PAR-Richtlinie als Kassenleistung vorsieht, wie lange Behandlung und Nachsorge dauern und was du für Zusatzleistungen selbst zahlst.",
    "readingTimeMinutes": 10,
    "metaTitle": "Parodontitis Behandlung Kosten: was die Kasse zahlt | Healio",
    "metaDescription": "Parodontitis-Behandlung: Wie sie abläuft, wie lange sie dauert, was die Kasse nach der PAR-Richtlinie zahlt und was du für Zusatzleistungen privat trägst.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zahnersatz-moeglichkeiten",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Zahnersatz: welche Möglichkeiten es gibt und was sie kosten",
    "listTeaser": "Krone, Brücke, Implantat und Prothese nebeneinander: Regelversorgung, Festzuschuss, Material und der Eigenanteil, der bei dir bleibt.",
    "readingTimeMinutes": 11,
    "metaTitle": "Zahnersatz Möglichkeiten: Arten und Kosten im Vergleich | Healio",
    "metaDescription": "Krone, Brücke, Implantat oder Prothese: Welche Möglichkeiten es beim Zahnersatz gibt, was die Kasse 2026 als Festzuschuss zahlt und was bei dir bleibt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zahnersatz-haertefall",
    "kind": "ratgeber",
    "group": "zaehne",
    "listTitle": "Härtefall beim Zahnersatz: Einkommensgrenze, Antrag, Rechenbeispiel",
    "listTeaser": "Wann die Kasse die Regelversorgung ganz zahlt, wie hoch die Einkommensgrenze 2026 ist, was doppelter Festzuschuss heißt und wie der Antrag läuft.",
    "readingTimeMinutes": 11,
    "metaTitle": "Härtefall Zahnersatz: Einkommensgrenze 2026 und Antrag | Healio",
    "metaDescription": "Härtefall beim Zahnersatz: Einkommensgrenze 2026, wer Anspruch hat, was doppelter Festzuschuss heißt, wie du den Antrag stellst und was sich 2027 ändert.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "heilpraktiker-kosten",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Heilpraktiker Kosten: was es kostet und wer zahlt",
    "listTeaser": "Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie auf einer Seite: was die Kasse zahlt, was bei dir bleibt und was ein Zusatztarif erstattet.",
    "readingTimeMinutes": 9,
    "metaTitle": "Heilpraktiker Kosten: wer zahlt was, Übersicht | Healio",
    "metaDescription": "Heilpraktiker Kosten im Überblick: Honorar, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie, was die Kasse zahlt und was ein Zusatztarif erstattet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "heilpraktiker-zusatzversicherung",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Heilpraktiker-Zusatzversicherung: Kriterien, Grenzen und ein Rechenbeispiel",
    "listTeaser": "Was eine Heilpraktiker-Zusatzversicherung erstattet, woran du sie prüfst und was ehrlich zu den Gesundheitsfragen im Antrag und zu bestehenden Beschwerden gehört.",
    "readingTimeMinutes": 10,
    "metaTitle": "Heilpraktiker Zusatzversicherung: worauf es ankommt | Healio",
    "metaDescription": "Heilpraktiker Zusatzversicherung im Check: Kriterien statt Rangliste, was die Bedingungen erstatten, Gesundheitsfragen im Antrag und was schon läuft.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "ambulante-zusatzversicherung",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Ambulante Zusatzversicherung: was sie zahlt, was sie kostet und für wen sie passt",
    "listTeaser": "Vier Leistungstöpfe, Beiträge nach Alter und eine ehrliche Antwort auf die Frage, ob eine ambulante Zusatzversicherung dich zum Privatpatienten macht.",
    "readingTimeMinutes": 10,
    "metaTitle": "Ambulante Zusatzversicherung: Leistungen und Grenzen | Healio",
    "metaDescription": "Ambulante Zusatzversicherung erklärt: vier Töpfe mit bis zu 3.000 EUR in zwei Jahren, Beiträge nach Alter, wer sie braucht und was sie nicht leistet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "akupunktur-kosten",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Akupunktur Kosten: wann die Kasse zahlt, was privat bleibt und was ein Tarif erstattet",
    "listTeaser": "Die Kasse zahlt Akupunktur nur bei chronischen Schmerzen der Lendenwirbelsäule und des Knies. Hier siehst du die Regeln, die Kosten und was ein Zusatztarif übernimmt.",
    "readingTimeMinutes": 9,
    "metaTitle": "Akupunktur Kosten: wann die Kasse zahlt, sonst privat | Healio",
    "metaDescription": "Akupunktur Kosten: Kassenleistung bei chronischen Schmerzen der Lendenwirbelsäule oder im Knie laut G-BA, Abrechnung privat und was ein Tarif erstattet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "tk-osteopathie",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "TK und Osteopathie: Zuschuss, Voraussetzungen, Osteopathen finden und Einreichen",
    "listTeaser": "Die TK zahlt 40 EUR je Sitzung, höchstens dreimal im Jahr. Hier steht, was du vorher brauchst, wie du Osteopathen findest und wie du die Rechnung einreichst.",
    "readingTimeMinutes": 8,
    "metaTitle": "Techniker Krankenkasse Osteopathie: Zuschuss, Ablauf | Healio",
    "metaDescription": "TK Osteopathie 2026: 40 EUR je Sitzung, höchstens 3 Sitzungen und 120 EUR im Jahr, ärztliche Bescheinigung vor Beginn, Osteopathen finden und Rechnung einreichen.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "chiropraktiker-kosten",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Chiropraktiker Kosten: wer behandelt, wer zahlt und was bei dir bleibt",
    "listTeaser": "Beim Vertragsarzt mit Zusatzbezeichnung zahlt die Kasse, beim Heilpraktiker meist nicht. Hier siehst du den Unterschied, Satzungsbeispiele und was ein Tarif erstattet.",
    "readingTimeMinutes": 9,
    "metaTitle": "Chiropraktiker Kosten: wer behandelt und wer zahlt | Healio",
    "metaDescription": "Chiropraktiker Kosten: wann die Kasse beim Arzt zahlt, warum der Heilpraktiker meist privat ist, was Satzungen bezuschussen und was ein Zusatztarif erstattet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "physiotherapie-zuzahlung",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Zuzahlung bei Physiotherapie: Tabelle, Rechenbeispiel und Erstattung",
    "listTeaser": "10 Prozent der Kosten plus 10 EUR je Verordnung: Hier rechnest du die Zuzahlung nach, siehst die Belastungsgrenze und erfährst, was ein ambulanter Tarif erstattet.",
    "readingTimeMinutes": 8,
    "metaTitle": "Zuzahlung Physiotherapie 2026: Tabelle, Rechenbeispiel | Healio",
    "metaDescription": "Zuzahlung bei Physiotherapie: 10 Prozent der Kosten plus 10 EUR je Verordnung, Tabelle mit Rechenbeispielen, Belastungsgrenze und was ein ambulanter Tarif erstattet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "gebuehrenordnung-heilpraktiker",
    "kind": "ratgeber",
    "group": "ambulant",
    "listTitle": "Gebührenordnung für Heilpraktiker (GebüH): was sie regelt und was erstattet wird",
    "listTeaser": "Das GebüH ist keine verbindliche Gebührenordnung, sondern eine Berechnungshilfe. Hier siehst du, was das für deine Rechnung und die Erstattung bedeutet.",
    "readingTimeMinutes": 9,
    "metaTitle": "Gebührenordnung Heilpraktiker (GebüH) erklärt | Healio",
    "metaDescription": "Gebührenordnung für Heilpraktiker: Warum das GebüH nur eine Berechnungshilfe ist, wie Rechnungen entstehen und was eine Zusatzversicherung danach erstattet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "stationaere-zusatzversicherung",
    "kind": "ratgeber",
    "group": "krankenhaus",
    "listTitle": "Stationäre Zusatzversicherung: was die Kasse im Krankenhaus zahlt und was du selbst zahlst",
    "listTeaser": "Der Überblick zum Krankenhaus: Kassenleistung, Zuzahlung, Wahlleistungen, Klinik-Tarife und der Weg zu jedem Krankenhaus-Ratgeber.",
    "readingTimeMinutes": 10,
    "metaTitle": "Stationäre Zusatzversicherung: Krankenhaus-Ratgeber | Healio",
    "metaDescription": "Was die Kasse im Krankenhaus zahlt, was Wahlleistungen kosten und was eine stationäre Zusatzversicherung ergänzt, mit Wegweiser zu allen Krankenhaus-Ratgebern.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "einzelzimmer-krankenhaus-kosten",
    "kind": "ratgeber",
    "group": "krankenhaus",
    "listTitle": "Einzelzimmer im Krankenhaus: Kosten pro Tag und wer zahlt",
    "listTeaser": "Was das Einbettzimmer im Krankenhaus pro Tag kostet, mit Beispielen aus sechs Preislisten, wer es zahlt und wann sich der Selbstkauf oder ein Tarif eher lohnt.",
    "readingTimeMinutes": 9,
    "metaTitle": "Einzelzimmer Krankenhaus Kosten: Preis je Tag, wer zahlt | Healio",
    "metaDescription": "Was kostet ein Einzelzimmer im Krankenhaus pro Tag? Beispiele aus sechs Preislisten, wer das Zimmer zahlt und wann sich eine Zusatzversicherung lohnt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zusatzversicherung-einzelzimmer",
    "kind": "ratgeber",
    "group": "krankenhaus",
    "listTitle": "Zusatzversicherung Krankenhaus Einzelzimmer: was sie leistet und kostet",
    "listTeaser": "Was eine Zusatzversicherung fürs Einzelzimmer im Krankenhaus leistet, welche Tarife es gibt, was sie im Monat kosten und wo ihre Grenzen liegen.",
    "readingTimeMinutes": 9,
    "metaTitle": "Zusatzversicherung Krankenhaus Einzelzimmer: Leistungen | Healio",
    "metaDescription": "Zusatzversicherung fürs Einzelzimmer im Krankenhaus: Was SDK SP1, SP2 und SPU leisten, was sie im Monat kosten und worauf du bei Wartezeit und Klinikwahl achtest.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "krankenhaustagegeld",
    "kind": "ratgeber",
    "group": "krankenhaus",
    "listTitle": "Krankenhaustagegeld: wie hoch, wie lange, auch bei Reha?",
    "listTeaser": "Was ein Krankenhaustagegeld ist, wie hoch es sein kann, was bei Reha gilt und wie es zur gesetzlichen Zuzahlung im Krankenhaus passt.",
    "readingTimeMinutes": 8,
    "metaTitle": "Krankenhaustagegeld: wie hoch, wie lange, auch bei Reha? | Healio",
    "metaDescription": "Krankenhaustagegeld einfach erklärt: wie hoch der Tagessatz ist, wie lange er gezahlt wird, was bei Reha gilt und was ein Klinik-Tarif der SDK dazu leistet.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "reha-zuzahlung",
    "kind": "ratgeber",
    "group": "krankenhaus",
    "listTitle": "Zuzahlung Reha: 10 Euro am Tag, Befreiung und Höchstdauer",
    "listTeaser": "Was du bei der Reha zuzahlst, getrennt nach Rentenversicherung und Krankenkasse, wann die Zuzahlung entfällt und wie die Belastungsgrenze wirkt.",
    "readingTimeMinutes": 9,
    "metaTitle": "Zuzahlung Reha: 10 Euro am Tag, Befreiung und Dauer | Healio",
    "metaDescription": "Zuzahlung bei der Reha: 10 EUR je Tag, wie lange du zahlst, wann sie entfällt und was bei Rentenversicherung und Krankenkasse unterschiedlich gilt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "zusatzversicherung-kinder",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Zusatzversicherung für Kinder: was die Kasse zahlt und welcher Zusatzschutz passt",
    "listTeaser": "Der Überblick für Familien: Kassenleistung bei Krankenhaus, Zahn und Brille, Kinder nachversichern mit allen Voraussetzungen und der Weg zu jedem Familien-Ratgeber.",
    "readingTimeMinutes": 11,
    "metaTitle": "Zusatzversicherung Kinder: Kasse und Zusatzschutz | Healio",
    "metaDescription": "Zusatzversicherung für Kinder: was die Kasse bei Krankenhaus, Zahn und Brille zahlt, wie du Neugeborene nachversicherst und welche Voraussetzungen dafür gelten.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "baby-geplant-zusatzversicherung",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Baby geplant: Klinikschutz vor der Schwangerschaft abschließen",
    "listTeaser": "Warum die Zusatzversicherung vor der Schwangerschaft stehen muss, was nach 8 Monaten gilt und die Checkliste von der Krankenkasse bis zur Anmeldung des Babys.",
    "readingTimeMinutes": 13,
    "metaTitle": "Zusatzversicherung vor der Schwangerschaft abschließen | Healio",
    "metaDescription": "Baby geplant? Warum der Klinikschutz vor der Schwangerschaft stehen muss, was die Wartezeit von 8 Monaten bedeutet und die Checkliste in der richtigen Reihenfolge.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "neugeborenes-versichern",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Neugeborenes versichern: Kasse, Zusatzversicherung und Fristen",
    "listTeaser": "Wie dein Baby in die Familienversicherung kommt, wie du es nach § 198 VVG in die Zusatzversicherung bringst und welche Fristen dabei gelten.",
    "readingTimeMinutes": 11,
    "metaTitle": "Neugeborenes versichern: Kasse und Zusatzschutz | Healio",
    "metaDescription": "Neugeborenes versichern: Familienversicherung bei der Krankenkasse, das Baby nach § 198 VVG in der Zusatzversicherung anmelden und alle Fristen als Checkliste.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "familienzimmer-krankenhaus",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Familienzimmer im Krankenhaus: Kosten und wer zahlt",
    "listTeaser": "Was ein Familienzimmer nach der Geburt kostet, was die Kasse dazu zahlt und wie der Klinikschutz es trägt, mit Preislisten aus 2026.",
    "readingTimeMinutes": 10,
    "metaTitle": "Familienzimmer Krankenhaus: Kosten und wer zahlt | Healio",
    "metaDescription": "Was ein Familienzimmer nach der Geburt kostet, mit vier Preislisten von 2026, was die Krankenkasse zahlt und wann ein Klinikschutz es trägt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "babybonus-krankenkasse",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Babybonus Krankenkasse 2026: wer zahlt was",
    "listTeaser": "Was Krankenkassen rund um Schwangerschaft und Baby zahlen, mit Fundstelle in der Satzung, Musterrechnung und der Gegenrechnung mit dem Zusatzbeitrag.",
    "readingTimeMinutes": 11,
    "metaTitle": "Babybonus Krankenkasse 2026: wer zahlt was | Healio",
    "metaDescription": "Babybonus der Krankenkassen 2026: Was IKK classic, TK, Barmer, DAK, mkk und AOKs zahlen, mit Fundstelle in der Satzung, Musterrechnung und Rechenweg.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "schwanger-zusatzversicherung",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt",
    "listTeaser": "Die Trennlinie verläuft zwischen Vorsorge und Entbindung. Was ambulant noch möglich ist, was stationär nicht mehr, und was fürs Kind gilt.",
    "readingTimeMinutes": 6,
    "metaTitle": "Schwanger: welcher Zusatzschutz jetzt noch geht | Healio",
    "metaDescription": "Schwanger ohne Zusatzschutz? Was der ambulante Vorsorge-Topf jetzt noch zahlt, warum die Geburt stationär zu spät ist und was fürs Kind gilt.",
    "publishedAt": "2026-09-28",
    "updatedAt": "2026-10-05"
  },
  {
    "slug": "schwangerschaft-was-steht-mir-zu",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Was steht mir in der Schwangerschaft zu? Leistungen, Extras und Fristen",
    "listTeaser": "Pflichtleistungen jeder Kasse, Haushaltshilfe, Hebamme, Mutterschaftsgeld, die Extras der großen Kassen und eine Checkliste mit allen Fristen bis zum ersten Geburtstag.",
    "readingTimeMinutes": 15,
    "metaTitle": "Was steht mir in der Schwangerschaft zu? Leistungen | Healio",
    "metaDescription": "Was steht dir in der Schwangerschaft zu? Kassenleistungen, Extras von AOK, TK, Barmer, IKK classic und mkk, dazu die Fristen.",
    "publishedAt": "2026-10-06"
  },
  {
    "slug": "hebamme-kosten-krankenkasse",
    "kind": "ratgeber",
    "group": "familie",
    "listTitle": "Hebamme: was die Krankenkasse zahlt und wo du selbst zahlst",
    "listTeaser": "Vorsorge zu Hause, Wochenbett, Rückbildung: was die Hebamme in jeder Phase macht, eine Beispielrechnung mit den Kassensätzen und die Stellen, an denen doch Kosten bleiben.",
    "readingTimeMinutes": 10,
    "metaTitle": "Hebamme Kosten: was die Krankenkasse zahlt | Healio",
    "metaDescription": "Vorsorge, Wochenbett, Rückbildung: was die Hebamme macht, was die Krankenkasse zahlt und wo du selbst zahlst, etwa bei der Rufbereitschaft. Mit Rechnung.",
    "publishedAt": "2026-10-05"
  },
  {
    "slug": "vorsorgeuntersuchung",
    "kind": "ratgeber",
    "group": "vorsorge",
    "listTitle": "Vorsorgeuntersuchungen: was die Kasse in welchem Alter zahlt",
    "listTeaser": "Alle Untersuchungen für Kinder, Frauen und Männer mit Alter, Abstand und Quelle, dazu was privat bleibt und wie Vorsorge im Kassenbonus zählt.",
    "readingTimeMinutes": 12,
    "metaTitle": "Vorsorgeuntersuchung: Alter, Abstand, Kassenleistung | Healio",
    "metaDescription": "Vorsorgeuntersuchung: Alle Untersuchungen für Kinder, Frauen und Männer mit Alter, Abstand und Quelle. Dazu, was privat bleibt und wie Vorsorge im Bonus zählt.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "vorsorgeuntersuchung-frauen",
    "kind": "ratgeber",
    "group": "vorsorge",
    "listTitle": "Vorsorgeuntersuchungen für Frauen: was ab 20, 30 und 50 zusteht",
    "listTeaser": "Frauenarzt, Abstrich, Brust, Mammographie, Haut, Darm und Check-up mit Alter, Abstand und Quelle, getrennt von den Selbstzahlerleistungen.",
    "readingTimeMinutes": 10,
    "metaTitle": "Vorsorgeuntersuchung Frauen: Alter und Leistung | Healio",
    "metaDescription": "Vorsorgeuntersuchung für Frauen: Untersuchung ab 20, Brust ab 30, Mammographie von 50 bis 75, Darm ab 50. Mit Abstand, Quelle und Selbstzahlerleistungen.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "vorsorgeuntersuchung-maenner",
    "kind": "ratgeber",
    "group": "vorsorge",
    "listTitle": "Vorsorgeuntersuchungen für Männer: was ab 35, 45 und 50 zusteht",
    "listTeaser": "Check-up, Hautkrebs, Prostata, Darm, Lunge und Bauchaorta mit Alter, Abstand und Quelle, dazu der PSA-Test als Selbstzahlerleistung.",
    "readingTimeMinutes": 10,
    "metaTitle": "Vorsorgeuntersuchungen Männer: Alter und Leistung | Healio",
    "metaDescription": "Vorsorgeuntersuchungen für Männer: Check-up und Hautkrebs ab 35, Prostata ab 45, Darm ab 50. Mit Abstand, Quelle, PSA-Test als Selbstzahlerleistung.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "hautkrebsscreening",
    "kind": "ratgeber",
    "group": "vorsorge",
    "listTitle": "Hautkrebsscreening: ab wann die Kasse zahlt und was es privat kostet",
    "listTeaser": "Anspruch ab 35 alle zwei Jahre, Ablauf, Dermatoskop, was unter 35 privat anfällt und welche Zuschüsse Kassen laut Satzung zahlen.",
    "readingTimeMinutes": 8,
    "metaTitle": "Hautkrebsscreening: ab wann die Kasse zahlt, Kosten | Healio",
    "metaDescription": "Hautkrebsscreening: Die Kasse zahlt es ab 35 alle zwei Jahre, auch mit Dermatoskop. Was unter 35 privat kostet, was Kassen dazugeben und wie es abläuft.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "tk-reiseimpfung",
    "kind": "ratgeber",
    "group": "vorsorge",
    "listTitle": "TK und Reiseimpfungen: Kostenerstattung und Einreichen",
    "listTeaser": "Welche Reiseimpfungen die Techniker erstattet, was du zuzahlst und welche Unterlagen du einreichst, mit Fundstelle in der Satzung.",
    "readingTimeMinutes": 8,
    "metaTitle": "TK Reiseimpfungen: Kostenerstattung und Einreichen | Healio",
    "metaDescription": "TK Reiseimpfungen: Die Techniker erstattet STIKO-empfohlene Impfungen für private Reisen. Mit Zuzahlung, Liste der Impfungen und Weg zum Einreichen der Rechnung.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "brille-krankenkasse",
    "kind": "ratgeber",
    "group": "brille",
    "listTitle": "Zahlt die Krankenkasse eine Brille? Wann die Kasse zahlt und wie viel",
    "listTeaser": "Anspruch für Kinder und Erwachsene mit den Dioptrien-Grenzen der Richtlinie, Kinderbrille, Gestell, Kontaktlinsen und Zuschüsse der Kassen im Überblick.",
    "readingTimeMinutes": 10,
    "metaTitle": "Zahlt die Krankenkasse eine Brille? Dioptrien und Kinder | Healio",
    "metaDescription": "Zahlt die Krankenkasse eine Brille? Bei Kindern meist ja, bei Erwachsenen nur ab 6,25 Dioptrien. Mit Richtlinie, Kinderbrille, Gestell und Satzungsbeispielen.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "brillenversicherung",
    "kind": "ratgeber",
    "group": "brille",
    "listTitle": "Brillenversicherung: lohnt sie sich? Beitrag, Erstattung und Selbstzahlung",
    "listTeaser": "Welche Arten von Brillenversicherung es gibt, was der ambulante Tarif bei der Brille erstattet und wann Selbstzahlen die günstigere Rechnung ist.",
    "readingTimeMinutes": 7,
    "metaTitle": "Brillenversicherung: lohnt sie sich? Rechenbeispiel | Healio",
    "metaDescription": "Brillenversicherung vom Optiker, Zuschuss-Police oder ambulanter Tarif: was sie erstatten, was sie im Monat kosten und wann Selbstzahlen günstiger ist.",
    "publishedAt": "2026-10-07"
  },
  {
    "slug": "gleitsichtbrille-kosten",
    "kind": "ratgeber",
    "group": "brille",
    "listTitle": "Gleitsichtbrille: Kosten, Kassenanteil und Erstattung",
    "listTeaser": "Wovon der Preis einer Gleitsichtbrille abhängt, was die Kasse nie zahlt und wie ein Beispiel mit 680 EUR mit und ohne Tarif ausgeht.",
    "readingTimeMinutes": 8,
    "metaTitle": "Gleitsichtbrille Kosten: Preis, Kassenanteil, Erstattung | Healio",
    "metaDescription": "Gleitsichtbrille Kosten: wovon der Preis abhängt, was die Krankenkasse bei Gleitsichtgläsern zahlt und was ein ambulanter Tarif mit Sehhilfen-Topf erstattet.",
    "publishedAt": "2026-10-07"
  }
];

const ENTRIES_BY_SLUG = new Map(RATGEBER_ENTRIES.map((entry) => [entry.slug, entry]));

export const getRatgeberEntry = (slug) => ENTRIES_BY_SLUG.get(slug) || null;
