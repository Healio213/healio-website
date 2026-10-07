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
      "slug": "schwangerschaft-worauf-achten",
      "kind": "ratgeber",
      "listTitle": "Schwanger: worauf du jetzt achten solltest",
      "listTeaser": "Der Alltag und das Geld in einem Text: Mutterpass, Hebamme, Selbstzahlerleistungen, Mutterschutz, Anträge und der Bonus, der jetzt am höchsten ist.",
      "readingTimeMinutes": 8
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
      "total": 19,
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
    },
    {
      "id": "ambulant",
      "title": "Heilpraktiker und Naturheilkunde",
      "intro": "Was Heilpraktiker, Osteopathie, Akupunktur und Physiotherapie kosten, was die Kasse dazugibt und wann ein ambulanter Tarif hilft. Mit Kosten, Quellen und den Grenzen.",
      "icon": "naturopathy",
      "hubSlug": "heilpraktiker-kosten",
      "total": 8,
      "entries": [
        {
          "slug": "heilpraktiker-kosten",
          "kind": "ratgeber",
          "listTitle": "Heilpraktiker Kosten: was es kostet und wer zahlt",
          "listTeaser": "Heilpraktiker, Osteopathie, Akupunktur, Chiropraktik und Physiotherapie auf einer Seite: was die Kasse zahlt, was bei dir bleibt und was ein Zusatztarif erstattet.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "heilpraktiker-zusatzversicherung",
          "kind": "ratgeber",
          "listTitle": "Heilpraktiker-Zusatzversicherung: Kriterien, Grenzen und ein Rechenbeispiel",
          "listTeaser": "Was eine Heilpraktiker-Zusatzversicherung erstattet, woran du sie prüfst und was ehrlich zu den Gesundheitsfragen im Antrag und zu bestehenden Beschwerden gehört.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "ambulante-zusatzversicherung",
          "kind": "ratgeber",
          "listTitle": "Ambulante Zusatzversicherung: was sie zahlt, was sie kostet und für wen sie passt",
          "listTeaser": "Vier Leistungstöpfe, Beiträge nach Alter und eine ehrliche Antwort auf die Frage, ob eine ambulante Zusatzversicherung dich zum Privatpatienten macht.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "akupunktur-kosten",
          "kind": "ratgeber",
          "listTitle": "Akupunktur Kosten: wann die Kasse zahlt, was privat bleibt und was ein Tarif erstattet",
          "listTeaser": "Die Kasse zahlt Akupunktur nur bei chronischen Schmerzen der Lendenwirbelsäule und des Knies. Hier siehst du die Regeln, die Kosten und was ein Zusatztarif übernimmt.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "tk-osteopathie",
          "kind": "ratgeber",
          "listTitle": "TK und Osteopathie: Zuschuss, Voraussetzungen, Osteopathen finden und Einreichen",
          "listTeaser": "Die TK zahlt 40 EUR je Sitzung, höchstens dreimal im Jahr. Hier steht, was du vorher brauchst, wie du Osteopathen findest und wie du die Rechnung einreichst.",
          "readingTimeMinutes": 8
        },
        {
          "slug": "chiropraktiker-kosten",
          "kind": "ratgeber",
          "listTitle": "Chiropraktiker Kosten: wer behandelt, wer zahlt und was bei dir bleibt",
          "listTeaser": "Beim Vertragsarzt mit Zusatzbezeichnung zahlt die Kasse, beim Heilpraktiker meist nicht. Hier siehst du den Unterschied, Satzungsbeispiele und was ein Tarif erstattet.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "physiotherapie-zuzahlung",
          "kind": "ratgeber",
          "listTitle": "Zuzahlung bei Physiotherapie: Tabelle, Rechenbeispiel und Erstattung",
          "listTeaser": "10 Prozent der Kosten plus 10 EUR je Verordnung: Hier rechnest du die Zuzahlung nach, siehst die Belastungsgrenze und erfährst, was ein ambulanter Tarif erstattet.",
          "readingTimeMinutes": 8
        }
      ]
    },
    {
      "id": "krankenhaus",
      "title": "Krankenhaus",
      "intro": "Was die Kasse im Krankenhaus zahlt, was Zuzahlung, Einbettzimmer und Reha kosten und wann eine stationäre Zusatzversicherung hilft. Mit Quellen und den Grenzen.",
      "icon": "hospital",
      "hubSlug": "stationaere-zusatzversicherung",
      "total": 5,
      "entries": [
        {
          "slug": "stationaere-zusatzversicherung",
          "kind": "ratgeber",
          "listTitle": "Stationäre Zusatzversicherung: was die Kasse im Krankenhaus zahlt und was du selbst zahlst",
          "listTeaser": "Der Überblick zum Krankenhaus: Kassenleistung, Zuzahlung, Wahlleistungen, Klinik-Tarife und der Weg zu jedem Krankenhaus-Ratgeber.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "einzelzimmer-krankenhaus-kosten",
          "kind": "ratgeber",
          "listTitle": "Einzelzimmer im Krankenhaus: Kosten pro Tag und wer zahlt",
          "listTeaser": "Was das Einbettzimmer im Krankenhaus pro Tag kostet, mit Beispielen aus sechs Preislisten, wer es zahlt und wann sich der Selbstkauf oder ein Tarif eher lohnt.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "zusatzversicherung-einzelzimmer",
          "kind": "ratgeber",
          "listTitle": "Zusatzversicherung Krankenhaus Einzelzimmer: was sie leistet und kostet",
          "listTeaser": "Was eine Zusatzversicherung fürs Einzelzimmer im Krankenhaus leistet, welche Tarife es gibt, was sie im Monat kosten und wo ihre Grenzen liegen.",
          "readingTimeMinutes": 9
        },
        {
          "slug": "krankenhaustagegeld",
          "kind": "ratgeber",
          "listTitle": "Krankenhaustagegeld: wie hoch, wie lange, auch bei Reha?",
          "listTeaser": "Was ein Krankenhaustagegeld ist, wie hoch es sein kann, was bei Reha gilt und wie es zur gesetzlichen Zuzahlung im Krankenhaus passt.",
          "readingTimeMinutes": 8
        },
        {
          "slug": "reha-zuzahlung",
          "kind": "ratgeber",
          "listTitle": "Zuzahlung Reha: 10 Euro am Tag, Befreiung und Höchstdauer",
          "listTeaser": "Was du bei der Reha zuzahlst, getrennt nach Rentenversicherung und Krankenkasse, wann die Zuzahlung entfällt und wie die Belastungsgrenze wirkt.",
          "readingTimeMinutes": 9
        }
      ]
    },
    {
      "id": "familie",
      "title": "Schwangerschaft und Familie",
      "intro": "Was Kasse und Zusatzschutz rund um Schwangerschaft, Baby und Kinder leisten, wie ein Babybonus funktioniert und worauf es beim Nachversichern ankommt.",
      "icon": "family",
      "hubSlug": "zusatzversicherung-kinder",
      "total": 8,
      "entries": [
        {
          "slug": "zusatzversicherung-kinder",
          "kind": "ratgeber",
          "listTitle": "Zusatzversicherung für Kinder: was die Kasse zahlt und welcher Zusatzschutz passt",
          "listTeaser": "Der Überblick für Familien: Kassenleistung bei Krankenhaus, Zahn und Brille, Kinder nachversichern mit allen Voraussetzungen und der Weg zu jedem Familien-Ratgeber.",
          "readingTimeMinutes": 11
        },
        {
          "slug": "baby-geplant-zusatzversicherung",
          "kind": "ratgeber",
          "listTitle": "Baby geplant: Klinikschutz vor der Schwangerschaft abschließen",
          "listTeaser": "Warum die Zusatzversicherung vor der Schwangerschaft stehen muss, was nach 8 Monaten gilt und die Checkliste von der Krankenkasse bis zur Anmeldung des Babys.",
          "readingTimeMinutes": 13
        },
        {
          "slug": "neugeborenes-versichern",
          "kind": "ratgeber",
          "listTitle": "Neugeborenes versichern: Kasse, Zusatzversicherung und Fristen",
          "listTeaser": "Wie dein Baby in die Familienversicherung kommt, wie du es nach § 198 VVG in die Zusatzversicherung bringst und welche Fristen dabei gelten.",
          "readingTimeMinutes": 11
        },
        {
          "slug": "familienzimmer-krankenhaus",
          "kind": "ratgeber",
          "listTitle": "Familienzimmer im Krankenhaus: Kosten und wer zahlt",
          "listTeaser": "Was ein Familienzimmer nach der Geburt kostet, was die Kasse dazu zahlt und wie der Klinikschutz es trägt, mit Preislisten aus 2026.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "babybonus-krankenkasse",
          "kind": "ratgeber",
          "listTitle": "Babybonus Krankenkasse 2026: wer zahlt was",
          "listTeaser": "Was Krankenkassen rund um Schwangerschaft und Baby zahlen, mit Fundstelle in der Satzung, Musterrechnung und der Gegenrechnung mit dem Zusatzbeitrag.",
          "readingTimeMinutes": 11
        },
        {
          "slug": "schwanger-zusatzversicherung",
          "kind": "ratgeber",
          "listTitle": "Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt",
          "listTeaser": "Die Trennlinie verläuft zwischen Vorsorge und Entbindung. Was ambulant noch möglich ist, was stationär nicht mehr, und was fürs Kind gilt.",
          "readingTimeMinutes": 6
        },
        {
          "slug": "schwangerschaft-was-steht-mir-zu",
          "kind": "ratgeber",
          "listTitle": "Was steht mir in der Schwangerschaft zu? Leistungen, Extras und Fristen",
          "listTeaser": "Pflichtleistungen jeder Kasse, Haushaltshilfe, Hebamme, Mutterschaftsgeld, die Extras der großen Kassen und eine Checkliste mit allen Fristen bis zum ersten Geburtstag.",
          "readingTimeMinutes": 15
        }
      ]
    },
    {
      "id": "vorsorge",
      "title": "Vorsorge",
      "intro": "Welche Vorsorgeuntersuchungen die Kasse in welchem Alter zahlt, was privat bleibt und wann Satzungsleistungen oder ein ambulanter Tarif helfen. Mit Quellen und Stand.",
      "icon": "prevention",
      "hubSlug": "vorsorgeuntersuchung",
      "total": 5,
      "entries": [
        {
          "slug": "vorsorgeuntersuchung",
          "kind": "ratgeber",
          "listTitle": "Vorsorgeuntersuchungen: was die Kasse in welchem Alter zahlt",
          "listTeaser": "Alle Untersuchungen für Kinder, Frauen und Männer mit Alter, Abstand und Quelle, dazu was privat bleibt und wie Vorsorge im Kassenbonus zählt.",
          "readingTimeMinutes": 12
        },
        {
          "slug": "vorsorgeuntersuchung-frauen",
          "kind": "ratgeber",
          "listTitle": "Vorsorgeuntersuchungen für Frauen: was ab 20, 30 und 50 zusteht",
          "listTeaser": "Frauenarzt, Abstrich, Brust, Mammographie, Haut, Darm und Check-up mit Alter, Abstand und Quelle, getrennt von den Selbstzahlerleistungen.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "vorsorgeuntersuchung-maenner",
          "kind": "ratgeber",
          "listTitle": "Vorsorgeuntersuchungen für Männer: was ab 35, 45 und 50 zusteht",
          "listTeaser": "Check-up, Hautkrebs, Prostata, Darm, Lunge und Bauchaorta mit Alter, Abstand und Quelle, dazu der PSA-Test als Selbstzahlerleistung.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "hautkrebsscreening",
          "kind": "ratgeber",
          "listTitle": "Hautkrebsscreening: ab wann die Kasse zahlt und was es privat kostet",
          "listTeaser": "Anspruch ab 35 alle zwei Jahre, Ablauf, Dermatoskop, was unter 35 privat anfällt und welche Zuschüsse Kassen laut Satzung zahlen.",
          "readingTimeMinutes": 8
        },
        {
          "slug": "tk-reiseimpfung",
          "kind": "ratgeber",
          "listTitle": "TK und Reiseimpfungen: Kostenerstattung und Einreichen",
          "listTeaser": "Welche Reiseimpfungen die Techniker erstattet, was du zuzahlst und welche Unterlagen du einreichst, mit Fundstelle in der Satzung.",
          "readingTimeMinutes": 8
        }
      ]
    },
    {
      "id": "brille",
      "title": "Brille",
      "intro": "Wann die Kasse bei der Brille zahlt, was Gläser und Gleitsicht kosten und wann sich ein Tarif für Sehhilfen lohnt. Mit Rechenbeispielen und Quellen.",
      "icon": "glasses",
      "hubSlug": "brille-krankenkasse",
      "total": 3,
      "entries": [
        {
          "slug": "brille-krankenkasse",
          "kind": "ratgeber",
          "listTitle": "Zahlt die Krankenkasse eine Brille? Wann die Kasse zahlt und wie viel",
          "listTeaser": "Anspruch für Kinder und Erwachsene mit den Dioptrien-Grenzen der Richtlinie, Kinderbrille, Gestell, Kontaktlinsen und Zuschüsse der Kassen im Überblick.",
          "readingTimeMinutes": 10
        },
        {
          "slug": "brillenversicherung",
          "kind": "ratgeber",
          "listTitle": "Brillenversicherung: lohnt sie sich? Beitrag, Erstattung und Selbstzahlung",
          "listTeaser": "Welche Arten von Brillenversicherung es gibt, was der ambulante Tarif bei der Brille erstattet und wann Selbstzahlen die günstigere Rechnung ist.",
          "readingTimeMinutes": 7
        },
        {
          "slug": "gleitsichtbrille-kosten",
          "kind": "ratgeber",
          "listTitle": "Gleitsichtbrille: Kosten, Kassenanteil und Erstattung",
          "listTeaser": "Wovon der Preis einer Gleitsichtbrille abhängt, was die Kasse nie zahlt und wie ein Beispiel mit 680 EUR mit und ohne Tarif ausgeht.",
          "readingTimeMinutes": 8
        }
      ]
    }
  ]
};
