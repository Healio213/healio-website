/**
 * AUTOMATISCH ERZEUGT von scripts/build-ratgeber-registry.mjs. Nicht von Hand
 * bearbeiten: Quelle sind die Inhaltsdateien und gliederung.js (Ablauf für
 * neue Artikel dort im Kopfkommentar).
 *
 * Genau das, was die Übersicht /ratgeber zeigt: alle Einzelartikel und je
 * Themengruppe die Bereichsseite plus die nächsten
 * RATGEBER_OVERVIEW_PER_GROUP (6) Artikel. total ist die Zahl aller Artikel
 * der Gruppe; ist sie größer als entries, zeigt die Übersicht „Alle anzeigen“.
 */

export const RATGEBER_OVERVIEW = {
  "single": [
    {
      "slug": "ikk-classic-bonusprogramm-2026",
      "kind": "ratgeber",
      "listTitle": "IKK classic Bonusprogramm 2026: Bonusheft, alle Positionen, Nachweise und Fristen",
      "listTeaser": "Jede bonusfähige Position mit Betrag, die Regeln für den dreifachen Zuschuss und die Gegenrechnung mit dem Zusatzbeitrag.",
      "readingTimeMinutes": 8
    },
    {
      "slug": "mkk-bonusprogramm-2026",
      "kind": "ratgeber",
      "listTitle": "mkk Bonusprogramm 2026: alle Maßnahmen, Zuschuss zur Zusatzversicherung und Fristen",
      "listTeaser": "Was die mkk laut Satzung je Maßnahme zahlt, wann der Vollständigkeitsbonus greift und wie bis zu 100 EUR Zuschuss in eine Zusatzversicherung fließen können.",
      "readingTimeMinutes": 8
    },
    {
      "slug": "aok-bonusprogramm-2026",
      "kind": "ratgeber",
      "listTitle": "AOK Bonusprogramm 2026: alle elf AOKs mit Beträgen, Bonusheft und Fristen",
      "listTeaser": "Welche AOK für dich zuständig ist, was sie je Maßnahme zahlt, bis wann du einreichst und wo der Bonus als Zuschuss in eine Zusatzversicherung fließen kann.",
      "readingTimeMinutes": 18
    },
    {
      "slug": "tk-bonusprogramm-2026",
      "kind": "ratgeber",
      "listTitle": "TK Bonusprogramm 2026: Punkte, Gesundheitsdividende, Nachweise und Fristen",
      "listTeaser": "Was jede Maßnahme laut Satzung an Punkten bringt, wofür du die doppelte Gesundheitsdividende einlösen kannst und wie sie den Beitrag einer Zusatzversicherung mittragen kann.",
      "readingTimeMinutes": 9
    },
    {
      "slug": "barmer-bonusprogramm-2026",
      "kind": "ratgeber",
      "listTitle": "BARMER Bonusprogramm 2026: Maßnahmen, Punkte, Nachweise und Fristen",
      "listTeaser": "Was die BARMER laut Satzung je Maßnahme an Punkten gibt, wie der doppelte Zuschuss funktioniert und wie er den Beitrag einer Zusatzversicherung mitfinanzieren kann.",
      "readingTimeMinutes": 10
    },
    {
      "slug": "schwanger-zusatzversicherung",
      "kind": "ratgeber",
      "listTitle": "Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt",
      "listTeaser": "Die Trennlinie verläuft zwischen Vorsorge und Entbindung. Was ambulant noch möglich ist, was stationär nicht mehr, und was fürs Kind gilt.",
      "readingTimeMinutes": 6
    },
    {
      "slug": "schwangerschaft-worauf-achten",
      "kind": "ratgeber",
      "listTitle": "Schwanger: worauf du jetzt achten solltest",
      "listTeaser": "Der Alltag und das Geld in einem Text: Mutterpass, Hebamme, Selbstzahlerleistungen, Mutterschutz, Anträge und der Bonus, der jetzt am höchsten ist.",
      "readingTimeMinutes": 8
    },
    {
      "slug": "schwangerschaft-was-steht-mir-zu",
      "kind": "ratgeber",
      "listTitle": "Was steht mir in der Schwangerschaft zu? Leistungen, Extras und Fristen",
      "listTeaser": "Pflichtleistungen jeder Kasse, Haushaltshilfe, Hebamme, Mutterschaftsgeld, die Extras der großen Kassen und eine Checkliste mit allen Fristen bis zum ersten Geburtstag.",
      "readingTimeMinutes": 15
    },
    {
      "slug": "hebamme-kosten-krankenkasse",
      "kind": "ratgeber",
      "listTitle": "Hebamme: was die Krankenkasse zahlt und wo du selbst zahlst",
      "listTeaser": "Vorsorge zu Hause, Wochenbett, Rückbildung: was die Hebamme in jeder Phase macht, eine Beispielrechnung mit den Kassensätzen und die Stellen, an denen doch Kosten bleiben.",
      "readingTimeMinutes": 10
    },
    {
      "slug": "krankenkassen-bonus-zusatzversicherung",
      "kind": "advertorial",
      "listTitle": "Krankenkassen-Bonus: das Geld, mit dem sich Zusatzschutz finanzieren lässt",
      "listTeaser": "Warum ein Blick in die Satzung der eigenen Krankenkasse oft mehr bringt als jeder Tarifwechsel."
    }
  ],
  "groups": [
    {
      "id": "zaehne",
      "title": "Zähne",
      "intro": "Was die Kasse beim Zahnarzt zahlt, was an dir hängen bleibt und wann eine Zahnzusatzversicherung hilft. Mit Kosten, Quellen und den Grenzen.",
      "icon": "dental",
      "hubSlug": "zahnersatz-kosten",
      "total": 8,
      "entries": [
        {
          "slug": "zahnersatz-kosten",
          "kind": "ratgeber",
          "listTitle": "Zahnersatz Kosten: was die Kasse zahlt und was du selbst zahlst",
          "listTeaser": "Alle Zahnkosten auf einer Seite: Festzuschuss, Bonusheft, typische Eigenanteile und der Weg zu jedem Zahn-Ratgeber.",
          "readingTimeMinutes": 13
        },
        {
          "slug": "professionelle-zahnreinigung-kosten",
          "kind": "ratgeber",
          "listTitle": "Professionelle Zahnreinigung: Kosten und was deine Kasse dazugibt",
          "listTeaser": "Was eine Zahnreinigung kostet und was 27 Krankenkassen laut Satzung dazugeben, alle elf AOKs eingeschlossen, mit Fundstelle und Stand.",
          "readingTimeMinutes": 11
        },
        {
          "slug": "zahnimplantat-kosten",
          "kind": "ratgeber",
          "listTitle": "Zahnimplantat: Kosten, Kassenanteil und Eigenanteil",
          "listTeaser": "Warum die Kasse beim Implantat nur einen Festzuschuss zahlt, was übrig bleibt und wo die Zahnstaffel greift.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "wurzelbehandlung-kosten",
          "kind": "ratgeber",
          "listTitle": "Wurzelbehandlung: wann die Kasse zahlt und was privat kostet",
          "listTeaser": "Wann die Wurzelbehandlung Kassenleistung ist, welche Extras privat kosten und was ein Tarif davon trägt, mit den Regeln der Richtlinie im Wortlaut.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "zahnkrone-kosten",
          "kind": "ratgeber",
          "listTitle": "Zahnkrone: Arten, Kosten und Festzuschuss",
          "listTeaser": "Welche Krone die Kasse als Regelversorgung sieht, was die anderen kosten und wie Bonusheft und Tarif den Eigenanteil senken.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "bonusheft-zahnarzt",
          "kind": "ratgeber",
          "listTitle": "Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse",
          "listTeaser": "Fünf oder zehn Jahre lückenlos: was das Bonusheft beim Zahnersatz bringt, heute und ab 2027.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "zahnzusatzversicherung-ohne-wartezeit",
          "kind": "ratgeber",
          "listTitle": "Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag gilt",
          "listTeaser": "Ohne Wartezeit heißt nicht ohne Grenzen: was sofort gilt, was die Zahnstaffel begrenzt und wofür es den Sofortbaustein gibt.",
          "readingTimeMinutes": 10
        }
      ]
    }
  ]
};
