/**
 * Welle B, Feld Zahn. Direkte Quellenprüfung 07.10.2026. Keine individuelle Behandlungsempfehlung und keine erfundenen Behandlungspreise.
 * Grenzen und Einzelbelege: barmer-zahnzusatzversicherung.belege.md.
 *
 * Ausbau SEO 21.10.2026 (Hauptbegriff "barmer zahnzusatzversicherung", H1 unverändert):
 *   - Partnertarif: Barmer-Seite zur Zahnzusatzversicherung, Abruf 21.10.2026
 *     (letzte Aktualisierung der Seite 09.11.2022). Wörtlich dort: Partner
 *     HUK-COBURG, "drei Tarifen", "Kostenerstattung bis zu 100 Prozent je nach
 *     Tarif für Zahnersatz", "verringerten Beitrag", "altersabhängig
 *     kalkuliert", Erhöhung "bis zu zwei Mal", "keine Wartezeiten". Nur
 *     genannt, nicht beworben; keine weiteren Tarifdetails des Partners.
 *   - Vermittlung: Satzung der Barmer § 40 (Stand 15.10.2026, 39. und 40.
 *     Nachtrag, PDF am 21.10.2026 geladen und gegen den 38. Nachtrag
 *     abgeglichen: § 37 und Anlage zu § 37 inhaltlich unverändert).
 *   - UKV ZahnPRIVAT und Bayerische ZAHN Sofort: Formulierungen wortgleich
 *     aus src/components/sections/dental/dentalContent.js übernommen
 *     (Erstattung 75/100 einschließlich Kassenleistung, Zahnstaffel, keine
 *     Wartezeiten, Zuschläge 6,10/9,00/10,90 EUR, 2-Jahres-Regel, ZAHN Sofort
 *     750 EUR je Kalenderjahr, insgesamt 1.500 EUR, 29,90 EUR monatlich für 24
 *     Monate, Abschluss vor der Rechnung, keine fehlenden Zähne). /zahn nennt
 *     keine Beiträge nach Alter; die Beitragstabelle stammt deshalb aus der
 *     Primärquelle UKV "Unsere Produkte im Überblick", gültig ab 1. Mai 2026,
 *     S. 22 bis 25 (Materialnummer 322611, Abruf 10.10.2026, SHA-256
 *     4450c411..., Kopie unter Healio/SEO-Semrush-Workflow/2026-10-09/quellen/
 *     ukv-sdk-2026-10-10/). Ebenfalls von dort: Zahnreinigung 75 bis 100 EUR je
 *     Kalenderjahr, Zahnreinigung außerhalb der Zahnstaffel, Zielgruppe
 *     "in einer deutschen gesetzlichen Krankenkasse versichert".
 *   - Krone Befund 1.1: G-BA Festzuschuss-Richtlinie 2026, 398,39 EUR; 60/70/75
 *     Prozent = 239,03/278,87/298,79 EUR, wie in src/lib/zahnkostenRechner.js
 *     und den Ratgebern ukv- und aok-zahnzusatzversicherung.
 *   - Barmer-Bonus (Prüfauftrag 21.10.2026): § 37 Abs. 3 Zuschuss = doppelter
 *     Geldbonus, höchstens bis 1.000 Punkte (200 EUR), Nachweis "Abschluss des
 *     Versicherungsvertrages, bezahlte Beitragsrechnung". Anlage Teil 4 nennt
 *     "private Krankenzusatzversicherung im Sinne des § 194 Absatz 1a SGB V".
 *     Weder Satzung noch Bonusseite (Stand 07.09.2026) beschränken das auf
 *     Verträge eines bestimmten Versicherers oder auf über die Barmer
 *     vermittelte Verträge; die Bonusseite listet "private
 *     Krankenzusatzversicherung" ohne Zusatz. Der Verweis auf § 194 Abs. 1a
 *     (Vermittlungsnorm) lässt eine engere Lesart offen; deshalb im Text nur:
 *     kein Versicherer genannt, Anerkennung entscheidet die Barmer. Schriftliche
 *     Bestätigung der Barmer steht aus (intern, nicht auf der Seite).
 *     Punkte: Zahnvorsorge 100 je Leistung (2x), PZR 100 (1x), Schutzimpfung
 *     100, Sportverein 150; 550 Punkte = 55 EUR Geld oder 110 EUR Zuschuss.
 *   - Zusatzbeitrag: GKV-Spitzenverband, Listenstand 13.10.2026 (BARMER 3,29 %,
 *     IKK classic 3,85 %). IKK-Hinweis nur mit Satzungswert 810 EUR, breiter
 *     Masse 400 bis 700 EUR, Zusatzbeitrag und Wahlfreiheit.
 */

export const article = {
  updatedAtLabel: "21. Oktober 2026",
  updatedAt: "2026-10-21",
  "slug": "barmer-zahnzusatzversicherung",
  "kind": "ratgeber",
  "group": "zaehne",
  "metaTitle": "Barmer Zahnzusatzversicherung 2026: Tarife und Beiträge | Healio",
  "metaDescription": "Barmer Zahnzusatzversicherung 2026: Festzuschuss 60, 70 oder 75 Prozent, Partnertarif oder freie Wahl, Beiträge nach Alter und Zahn-Check in einer Minute.",
  "publishedAt": "2026-10-07",
  "publishedAtLabel": "7. Oktober 2026",
  "readingTimeMinutes": 14,
  "listTitle": "Barmer Zahnzusatzversicherung: Was zahlt die Kasse, was ein Tarif?",
  "listTeaser": "Eine Barmer Zahnzusatzversicherung ist privater Zusatzschutz und gehört nicht automatisch zu deiner gesetzlichen Mitgliedschaft. Was die Barmer beim Zahnersatz zahlt, welchen Partnertarif sie vermittelt und wie du freie Tarife nach Leistung und Beitrag vergleichst.",
  "headline": "Barmer Zahnzusatzversicherung: Was zahlt die Kasse, was ein Tarif?",
  "author": "frank-steinfurt",
  "toc": "auto",
  "faqStyle": "accordion",
  "quickAnswer": {
    "title": "Das Wichtigste in Kürze",
    "icon": "document",
    "facts": [
      {
        "value": "60 Prozent",
        "label": "Festzuschuss zur Regelversorgung bei Zahnersatz 2026"
      },
      {
        "value": "70 oder 75 Prozent",
        "label": "bei erfüllten Voraussetzungen für das Zahnbonusheft"
      },
      {
        "value": "bis zu 100 %",
        "label": "der erstattungsfähigen Kosten in ZahnPRIVAT 100, samt Kassenleistung"
      }
    ],
    "text": "Die Barmer ist selbst kein Zahnzusatzversicherer. Beim Zahnersatz zahlt sie 2026 den gesetzlichen Festzuschuss zur Regelversorgung, für privaten Zusatzschutz vermittelt sie Tarife ihres Partners HUK-COBURG. Als Barmer-Mitglied kannst du aber jeden Zahntarif wählen.",
    "path": {
      "to": "/zahn#zahn-check",
      "text": "Welcher Zahntarif passt zu deiner Situation?",
      "label": "Zahn-Check starten"
    }
  },
  "lead": "Eine Barmer Zahnzusatzversicherung ist privater Zusatzschutz und gehört nicht automatisch zu deiner gesetzlichen Mitgliedschaft. Bei Zahnersatz zahlt die Barmer 2026 den gesetzlichen Festzuschuss zur Regelversorgung; zusätzliche Tarifleistungen ergeben sich aus einem gesonderten Vertrag. Die Barmer vermittelt dafür Tarife der HUK-COBURG, du kannst aber genauso jeden anderen Tarif wählen. Hier siehst du, wie sich Partnertarif, UKV ZahnPRIVAT und die Bayerische mit ZAHN Sofort unterscheiden, was ein Tarif nach Alter kostet und wie dein Barmer-Bonus den Beitrag mittragen kann.",
  "sections": [
    {
      "id": "trennung",
      "heading": "Ist die Zahnzusatzversicherung Teil der Barmer-Mitgliedschaft?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Nein. Die gesetzliche Krankenversicherung und ein privater Zahntarif haben unterschiedliche Grundlagen. Die Barmer vermittelt nach § 40 ihrer Satzung private Zusatzversicherungen und nennt für die Zähne ihren Kooperationspartner HUK-COBURG. Daraus folgt keine allgemeine Erweiterung deiner gesetzlichen Mitgliedschaft. Entscheidend ist, ob du tatsächlich einen Zusatzvertrag abgeschlossen hast, mit welchem Leistungsumfang und ab welchem Beginn. Ein Hinweis im Mitgliederportal ist noch kein Versicherungsvertrag."
        },
        {
          "type": "paragraph",
          "text": "Für die konkrete Zahnrechnung ordnest du deshalb zuerst zu, welcher Anteil gesetzlich übernommen wird. Danach prüfst du, welche verbleibenden Kosten dein bestehender oder ein künftig gewählter Zusatzvertrag erfasst. Die Namen der Kasse und der Versicherung müssen nicht übereinstimmen. Den Partnertarif empfehlen wir hier weder, noch raten wir von ihm ab. Am Ende zählen deine Wahl und die Bedingungen des Vertrags, den du tatsächlich abschließt."
        }
      ]
    },
    {
      "id": "vergleich",
      "heading": "Kooperationstarif der Barmer oder freier Tarif: Was vergleichst du?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Auf ihrer Seite zur Zahnzusatzversicherung stellt die Barmer drei Tarife der HUK-COBURG vor. Genannt werden eine Kostenerstattung bis zu 100 Prozent je nach Tarif für Zahnersatz, ein verringerter Beitrag für Mitglieder und keine Wartezeiten. Die Beiträge sind laut Barmer altersabhängig kalkuliert und erhöhen sich während der Vertragslaufzeit bis zu zweimal. Eurobeträge stehen dort nicht. Die Barmer verweist auf den Tarifrechner des Partners."
        },
        {
          "type": "paragraph",
          "text": "An diesen Weg bist du nicht gebunden. Ein privater Zahntarif setzt eine gesetzliche Krankenversicherung voraus, aber keine bestimmte Kasse. Für UKV ZahnPRIVAT nennt die UKV als Zielgruppe Personen, die in einer deutschen gesetzlichen Krankenkasse versichert sind. Leg deshalb an jedes Angebot dieselben Punkte an, egal wer es vermittelt."
        },
        {
          "type": "table",
          "mobile": "cards",
          "caption": "UKV ZahnPRIVAT, Bayerische mit ZAHN Sofort und Partnertarif der Barmer nach denselben Kriterien, Stand 21. Oktober 2026",
          "head": [
            "Kriterium",
            "UKV",
            "Bayerische",
            "Partnertarif"
          ],
          "rows": [
            ["Erstattung Zahnersatz", "75, 90 oder 100 % inkl. Kasse", "Sofortbaustein bis 1.500 EUR", "Bis 100 % je nach Tarif"],
            ["Staffel am Anfang", "In den ersten 3 Kalenderjahren", "In den ersten 4 Kalenderjahren", "In den Bedingungen prüfen"],
            ["Zahnreinigung", "90 und 100 ohne Jahresdeckel", "Je nach Zahntarif", "Zuschuss, Höhe laut Tarif"],
            ["Wartezeit", "Keine", "Keine", "Laut Barmer keine"],
            ["Behandlung schon angeraten", "Nicht versichert", "Mit ZAHN Sofort möglich", "In den Bedingungen prüfen"],
            ["Fehlende Zähne", "1 bis 3 mit Zuschlag je Zahn", "Keine Aufnahme", "Im Antrag prüfen"],
            ["Beitrag", "Nach Alter, Tabelle unten", "29,90 EUR im Monat plus Zahntarif", "Nach Alter, für Mitglieder verringert"]
          ],
          "note": "Kurzfassung, die Einzelheiten stehen unter der Tabelle. UKV und Bayerische: Tarifangaben wie auf healio.de/zahn, Zahnreinigung und Staffel in Stufe 75 laut UKV-Produktübersicht, gültig ab 1. Mai 2026. Staffel und Wartezeit der Bayerischen laut Highlightblatt Zahn B 333551 (07.2026), Annahme laut Annahmerichtlinien Zahn B 333546 (11.2025). Partnertarif: Angaben der Barmer-Seite zur Zahnzusatzversicherung, zuletzt aktualisiert am 09.11.2022. Verbindlich sind die jeweiligen Tarifbedingungen."
        },
        {
          "type": "paragraph",
          "text": "Bei UKV ZahnPRIVAT 90 und 100 gilt eine Zahnstaffel: bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Kalenderjahren. In Stufe 75 sind es 1.000, 2.000 und 3.000 EUR. Danach gelten allein die Erstattungssätze des Tarifs, bei Unfall gilt keine Staffel. Die Zahnreinigung zählt nicht zur Staffel, in Stufe 75 ist sie auf 100 EUR je Kalenderjahr begrenzt."
        },
        {
          "type": "paragraph",
          "text": "Eine Behandlung, die in den letzten 2 Jahren empfohlen wurde, aktuell beabsichtigt ist oder schon läuft, ist bei der UKV nicht versichert. Bei 1 bis 3 fehlenden Zähnen nimmt die UKV mit Risikozuschlag je Zahn auf, ab 4 fehlenden Zähnen ist keine Aufnahme möglich. ZAHN Sofort der Bayerischen leistet bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR, auch für eine schon angeratene Behandlung. Dafür muss der Abschluss vor der Rechnung liegen, die Behandlung darf weder abgeschlossen noch abgerechnet sein, und es dürfen keine Zähne fehlen. Wartezeiten gibt es laut Bayerischer in keinem ihrer drei Zahntarife. Dafür begrenzt eine Leistungsstaffel die Erstattung des Zahntarifs in den ersten vier Kalenderjahren. Was ZAHN Sofort zahlt, wird darauf nicht angerechnet."
        },
        {
          "type": "paragraph",
          "text": "Was heißt das für dich? Wurde in den letzten 2 Jahren nichts empfohlen und läuft nichts, legst du freie Tarife wie UKV ZahnPRIVAT direkt neben den Partnertarif. Steht schon eine Behandlung an, zahlt ein normaler Zahntarif genau diese Behandlung nicht. Dann bleibt der Sofortweg, solange noch keine Rechnung gestellt ist. Fehlen dir 1 bis 3 Zähne, kommt der UKV-Weg mit Zuschlag je Zahn in Frage."
        },
        {
          "type": "segments",
          "segments": [
            { "text": "Wann ZAHN Sofort noch passt und wann es zu spät ist, erklärt der Ratgeber " },
            { "text": "Zahnzusatzversicherung bei laufender Behandlung", "to": "/ratgeber/zahnzusatzversicherung-laufende-behandlung" },
            { "text": "." }
          ]
        },
        {
          "type": "path",
          "to": "/zahn#zahn-check",
          "icon": "dental",
          "text": "Vier kurze Fragen, keine Kontaktdaten: Der Zahn-Check zeigt, welcher Weg bei deiner Zahnsituation offen ist.",
          "label": "Zahn-Check starten"
        }
      ]
    },
    {
      "id": "beitrag",
      "heading": "Was kostet eine Zahnzusatzversicherung als Barmer-Mitglied?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Für einen freien Tarif zahlst du als Barmer-Mitglied denselben Beitrag wie Versicherte jeder anderen Kasse. Bei UKV ZahnPRIVAT richtet er sich nach Altersstufe, Tarifstufe und gegebenenfalls dem Zuschlag für fehlende Zähne. Deine Kasse spielt dafür keine Rolle. Einen Nachlass für Mitglieder nennt die Barmer nur für den Tarif ihres Partners. So sehen die Monatsbeiträge der UKV aus:"
        },
        {
          "type": "table",
          "mobile": "cards",
          "caption": "Monatsbeitrag UKV ZahnPRIVAT nach Altersstufe, gültig ab 1. Mai 2026",
          "head": [
            "Altersstufe",
            "ZahnPRIVAT 75",
            "ZahnPRIVAT 90",
            "ZahnPRIVAT 100"
          ],
          "rows": [
            ["0 bis 19 Jahre", "0,99 EUR", "17,16 EUR", "20,73 EUR"],
            ["20 bis 29 Jahre", "8,00 EUR", "16,94 EUR", "21,55 EUR"],
            ["30 bis 39 Jahre", "11,70 EUR", "22,77 EUR", "30,05 EUR"],
            ["40 bis 49 Jahre", "16,91 EUR", "34,46 EUR", "45,69 EUR"],
            ["50 bis 59 Jahre", "25,23 EUR", "45,89 EUR", "59,31 EUR"],
            ["ab 60 Jahren", "35,37 EUR", "66,91 EUR", "84,14 EUR"]
          ],
          "note": "Quelle: UKV, Unsere Produkte im Überblick, gültig ab 1. Mai 2026, Seite 25. Die Beiträge sind ohne Alterungsrückstellung kalkuliert: Ab Beginn des Kalenderjahres, in dem du 20, 30, 40, 50 oder 60 wirst, gilt die nächste Altersstufe. Bei 1 bis 3 fehlenden Zähnen kommt ein Zuschlag je Zahn und Monat dazu: 6,10 EUR in Stufe 75, 9,00 EUR in 90, 10,90 EUR in 100."
        },
        {
          "type": "paragraph",
          "text": "Ein Beispiel: Mit 35 Jahren kostet ZahnPRIVAT 100 im Monat 30,05 EUR, im Jahr also 360,60 EUR. Ab dem Kalenderjahr, in dem du 40 wirst, sind es 45,69 EUR. Den verbindlichen Beitrag zeigt dir der Antrag, die Tabelle ersetzt ihn nicht."
        },
        {
          "type": "paragraph",
          "text": "Für den Sofortweg rechnest du anders. ZAHN Sofort kostet zusätzlich 29,90 EUR monatlich für 24 Monate, zuzüglich des Beitrags für den regulären Zahntarif der Bayerischen. Den Beitrag des Zahntarifs zeigt der Rechner der Bayerischen."
        }
      ]
    },
    {
      "id": "festzuschuss",
      "heading": "Was zahlt die Barmer für Krone, Brücke oder Prothese?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Bei medizinisch notwendigem Zahnersatz gilt der befundbezogene Festzuschuss nach § 55 SGB V. Er beträgt 2026 grundsätzlich 60 Prozent des für die Regelversorgung festgelegten Betrags. Mit den gesetzlich erforderlichen Vorsorgenachweisen steigt er nach fünf Jahren auf 70 Prozent und nach zehn Jahren auf 75 Prozent. Die Quote betrifft die Regelversorgung, keine beliebige private Gesamtrechnung."
        },
        {
          "type": "paragraph",
          "text": "Eine aufwendigere Versorgung kann deshalb einen höheren Eigenanteil haben, obwohl der Zuschuss derselbe bleibt. Die Barmer nennt etwa zusätzliche Material- und Verblendungskosten als mögliche Mehrkosten. Lass dir im Heil- und Kostenplan zeigen, welche Regelversorgung zum Befund gehört und was deine gewählte Versorgung darüber hinaus kostet. Die Praxisauswahl ersetzt diese Prüfung nicht. Der Kostenplan macht sichtbar, wo eine gesetzliche Zuschussgrundlage endet und eine zusätzliche private Leistung beginnt."
        },
        {
          "type": "paragraph",
          "text": "Bei einer besonderen finanziellen Belastung kann die gesetzliche Härtefallregelung relevant sein. Stelle diese Frage direkt an die Barmer, bevor du den privaten Tarif als einzigen Lösungsweg betrachtest. Der Festzuschuss hängt dann von weiteren Voraussetzungen ab. Dieser Artikel nennt keine individuelle Einkommensgrenze und berechnet keine Härtefallleistung. Außerdem gelten die hier genannten Prozentsätze ausdrücklich für 2026; sie werden nicht als Zusage für spätere Jahre dargestellt."
        },
        {
          "type": "paragraph",
          "text": "Ab 1. Januar 2027 gelten nach dem verkündeten Gesetz grundsätzlich 50 Prozent, mit dem passenden Vorsorgenachweis 60 oder 65 Prozent. Für Festzuschüsse, die vor diesem Datum bewilligt wurden, gelten die bisherigen Regeln der Absätze 1 und 2 weiter. Maßgeblich ist dafür das Bewilligungsdatum, nicht allein der Behandlungstermin. Die Härtefallregelung bleibt bestehen."
        }
      ]
    },
    {
      "id": "fuellung",
      "heading": "Zahlt die Barmer auch eine Zahnfüllung?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die gesetzliche Kasse übernimmt eine ausreichende und zweckmäßige Füllungsversorgung. § 28 SGB V unterscheidet diese Leistung von einer darüber hinaus gewählten Versorgung. Für zusätzliche Leistungen kann eine Mehrkostenvereinbarung nötig sein. In einem solchen Fall wird die vergleichbare preisgünstigste plastische Füllung als Sachleistung berücksichtigt; die darüber hinausgehenden Mehrkosten trägst du selbst, soweit kein anderer Erstattungsanspruch besteht."
        },
        {
          "type": "paragraph",
          "text": "Die Mehrkosten müssen vor Behandlungsbeginn schriftlich vereinbart werden. Frage deshalb konkret, welche Füllung als gesetzliche Leistung möglich ist und welche zusätzliche Eigenschaft privat berechnet wird. Nicht jede hochwertige Materialbezeichnung sagt, ob die Rechnung vollständig privat oder nur mit einem Mehrkostenanteil verbunden ist. Der Austausch einer intakten plastischen Füllung folgt nach dem Gesetz zudem nicht einfach dieser normalen Mehrkostenregel. Die Einordnung übernimmt deine Praxis anhand der konkreten Leistung."
        }
      ]
    },
    {
      "id": "kosten",
      "heading": "Welche Zahnkosten gehören zu welchem Erstattungsweg?",
      "blocks": [
        {
          "type": "table",
          "mobile": "cards",
          "caption": "Barmer-Leistung und Zusatzvertrag getrennt vergleichen, Stand 2026",
          "head": [
            "Ausgabe",
            "Gesetzlicher Weg",
            "Prüfung eines Zusatzvertrags"
          ],
          "rows": [
            [
              "Notwendiger Zahnersatz",
              "Befundbezogener Festzuschuss nach § 55",
              "Erstattungsfähige Restkosten und Anrechnung der Kasse"
            ],
            [
              "Aufwendigere Versorgung als Regelversorgung",
              "Zuschussgrundlage wird nicht zur gesamten Privatrechnung",
              "Material, Labor und Gebühren müssen zum Tarif passen"
            ],
            [
              "Zahnfüllung mit vereinbarten Mehrkosten",
              "Vergleichbare Kassenfüllung wird berücksichtigt",
              "Ob zusätzliche Füllungsleistungen enthalten sind"
            ],
            [
              "Professionelle Zahnreinigung",
              "Keine regelhafte gesetzliche Pflichtleistung",
              "Eigene Tarifleistung und Höchstbeträge prüfen"
            ],
            [
              "Bereits bekannte Behandlung",
              "Gesetzlichen Anspruch separat prüfen",
              "Beginn, Ausschlüsse und besondere Vertragsbedingungen"
            ]
          ],
          "note": "Quellen: §§ 28 und 55 SGB V, Barmer, KZBV zur PZR und Verbraucherzentrale. Keine Preisannahme und keine fremde Tarifempfehlung."
        },
        {
          "type": "paragraph",
          "text": "Die Tabelle erklärt die Kostenarten. Für eine persönliche Rechnung benötigst du den genehmigten Kassenanteil und den privaten Leistungsumfang. Addiere einen beworbenen Erstattungssatz nicht ungeprüft zum Festzuschuss. Die Verbraucherzentrale weist darauf hin, dass Versicherer die Kassenleistung häufig bereits in ihre Prozentangabe einbeziehen. Sonst entsteht auf dem Papier eine höhere Erstattung, als der Vertrag tatsächlich vorsieht."
        },
        {
          "type": "paragraph",
          "text": "Wie das in Euro aussieht, zeigt eine Krone aus Metall als Regelversorgung. Der G-BA setzt dafür 2026 insgesamt 398,39 EUR an. Den Rest nach dem Festzuschuss trägst du, ein Zahntarif kann ihn erstatten."
        },
        {
          "type": "costCard",
          "title": "Krone bei der Barmer: Festzuschuss und Eigenanteil",
          "icon": "calculator",
          "tariffLabel": "Gerechnet mit UKV ZahnPRIVAT 100 im ersten Kalenderjahr: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR. Bei Vertragsbeginn war nichts angeraten oder geplant, außer in der letzten Zeile.",
          "caption": "Kostenkarte: Metallkrone als Regelversorgung (Befund 1.1), Festzuschuss bei Bewilligung bis 31.12.2026",
          "head": [
            "Beispiel",
            "Kasse zahlt",
            "Du ohne Tarif",
            "Du mit Tarif"
          ],
          "rows": [
            [
              "Ohne Bonusheft (60 Prozent)",
              "239,03 EUR",
              "159,36 EUR",
              "Der Tarif erstattet den erstattungsfähigen Rest"
            ],
            [
              "Bonusheft 5 Jahre (70 Prozent)",
              "278,87 EUR",
              "119,52 EUR",
              "Der Tarif erstattet den erstattungsfähigen Rest"
            ],
            [
              "Bonusheft 10 Jahre (75 Prozent)",
              "298,79 EUR",
              "99,60 EUR",
              "Der Tarif erstattet den erstattungsfähigen Rest"
            ],
            [
              "Krone in den letzten 2 Jahren angeraten, Rechnung noch offen, ohne Bonusheft",
              "239,03 EUR",
              "159,36 EUR",
              "Bei der UKV nicht versichert. Mit ZAHN Sofort der Bayerischen ist der Weg offen, wenn der Abschluss vor der Rechnung liegt"
            ]
          ],
          "note": "Beispiel, keine Preisangabe. Regelversorgung und Festzuschuss: G-BA, Festzuschuss-Richtlinie, Beträge ab 01.01.2026, Befund 1.1 (398,39 EUR); der Eigenanteil ist eigene Rechnung. Annahmen: Die Rechnung entspricht genau der Regelversorgung, alle Kosten sind erstattungsfähig, kein Härtefall. Für Festzuschüsse, die ab 01.01.2027 bewilligt werden, gelten 50, 60 und 65 Prozent. Tarif nach den Unterlagen auf healio.de/zahn, verbindlich sind die Tarifbedingungen.",
          "bonusNote": "Dein Kassenbonus kann den Beitrag mittragen. Bei der Barmer gibt es ihn wahlweise als doppelt so hohen Zuschuss, höchstens 200 EUR im Jahr. Wie viel, hängt von deinen Aktivitäten ab."
        }
      ]
    },
    {
      "id": "antrag",
      "heading": "Welche Unterlagen brauchst du vor einer Zahnersatzbehandlung?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Barmer beschreibt einen elektronischen Heil- und Kostenplan, der vor der Behandlung von der Praxis an die Kasse übermittelt wird. Du erhältst daneben eine Patienteninformation. Prüfe darin den Befund, die geplante Versorgung, den voraussichtlichen Zuschuss und deinen Anteil. Das Bonusheft betrifft den gesetzlichen Zahnersatzbonus. Es ist weder eine private Zusatzversicherung noch eine Rechnung über bereits erworbene Tarifleistungen."
        },
        {
          "type": "paragraph",
          "text": "Für einen bestehenden Zusatzvertrag kannst du die geplanten Kosten gesondert einreichen und nach dem voraussichtlichen tariflichen Anteil fragen. Bewahre Kassenentscheidung, Kostenplan und spätere Rechnung gemeinsam auf. Ändert sich die Versorgung, muss der Versicherer die Änderung ebenfalls nachvollziehen können. Die gesetzliche Genehmigung ist keine verbindliche Leistungszusage der privaten Versicherung. Auch umgekehrt ersetzt ein privater Vertrag nicht die erforderliche Prüfung des gesetzlichen Zuschusses."
        }
      ]
    },
    {
      "id": "auswahl",
      "heading": "Wie vergleichst du einen Zahnzusatztarif als Barmer-Mitglied?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Beginne mit Leistungen, die dir langfristig wichtig sind: Zahnersatz, Füllungsmehrkosten und gegebenenfalls Vorsorge. Vergleiche anschließend die Berechnungsgrundlage, anfängliche Erstattungsgrenzen, Leistungsbeginn und persönlichen Beitrag. Die Verbraucherzentrale beschreibt sowohl Zahnstaffeln als auch tarifliche Höchstbeträge. Ein guter Vergleich zeigt diese Grenzen neben dem Prozentsatz, damit ein günstiger Einstiegsbeitrag nicht die einzige Entscheidungsgrundlage bleibt."
        },
        {
          "type": "paragraph",
          "text": "Die Healio-Zahnseite bietet dir eine erste Einordnung nach deiner Zahnsituation und dem gewünschten Leistungsweg. UKV ZahnPRIVAT ist dort als Weg für Leistung, Familie, Vorsorge und Zahnlücken mit drei Stufen dargestellt, die Bayerische mit ZAHN Sofort als Weg für eine schon angeratene Behandlung. Welcher Vertrag angenommen wird und was er konkret leistet, wird verbindlich im Antrag geprüft. Die Beiträge oben sind Tarifbeiträge laut UKV, keine Zusage für deinen Antrag und keine Zusage für eine bekannte Behandlung."
        },
        {
          "type": "honest",
          "heading": "Ehrlich gesagt",
          "items": [
            {
              "lead": "Der Festzuschuss ist keine Quote deiner Wunschrechnung.",
              "text": "60, 70 oder 75 Prozent beziehen sich auf die Regelversorgung."
            },
            {
              "lead": "Mitgliedschaft bedeutet nicht Zusatzvertrag.",
              "text": "Privater Zahnschutz braucht einen eigenen Abschluss und eigene Bedingungen."
            },
            {
              "lead": "Die Grenzen gehören zum Vergleich.",
              "text": "Kassenanrechnung, Anfangsstaffel und bekannte Behandlungen können den Eigenanteil beeinflussen."
            },
            {
              "lead": "Der Partnertarif ist ein Angebot unter mehreren.",
              "text": "Die Barmer vermittelt ihn, die Wahl des Tarifs bleibt bei dir."
            }
          ]
        },
        {
          "type": "path",
          "to": "/zahn",
          "icon": "document",
          "text": "Gesetzlichen Kassenanteil verstehen und danach deinen Zahnweg vergleichen.",
          "label": "Zahnweg bei Healio prüfen"
        }
      ]
    },
    {
      "id": "bonus",
      "heading": "Kann der Barmer-Bonus deinen Zahnschutz mitfinanzieren?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ja, über den Zuschuss. Nach § 37 Abs. 3 der Satzung kannst du deine Punkte statt als Auszahlung als Zuschuss zu Kosten aus dem Katalog in Teil 4 der Anlage einlösen. Der Zuschuss ist doppelt so viel wert wie die Auszahlung, je Kalenderjahr höchstens 200 EUR für 1.000 Punkte. In diesem Katalog steht die private Krankenzusatzversicherung im Sinne des § 194 Abs. 1a SGB V, ohne dass die Satzung einen bestimmten Versicherer nennt. Als Nachweis reicht der Abschluss des Versicherungsvertrags oder die bezahlte Beitragsrechnung."
        },
        {
          "type": "paragraph",
          "text": "Ein Beispiel: Zwei Zahnkontrollen bringen 200 Punkte, die professionelle Zahnreinigung 100, eine Schutzimpfung 100 und die aktive Mitgliedschaft im Sportverein 150. Das sind 550 Punkte und als Zuschuss 110 EUR, doppelt so viel wie bei einer Auszahlung. Kostet dein Tarif 140,40 EUR im Jahr, wie ZahnPRIVAT 75 mit 30 bis 39 Jahren, trägt der Bonus davon 110 EUR. Mehr als die nachgewiesenen Kosten zahlt die Barmer nicht, und jede Rechnung zählt nur einmal."
        },
        {
          "type": "paragraph",
          "text": "Ob die Barmer deinen Tarif anerkennt, entscheidet sie bei der Erstattung. Statt für den Beitrag kannst du den Zuschuss auch für die Rechnung der Zahnreinigung einsetzen. Den Antrag stellst du spätestens bis zum 31. Dezember des Folgejahres. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus."
        },
        {
          "type": "segments",
          "segments": [
            { "text": "Alle Maßnahmen und Punkte stehen im Ratgeber " },
            { "text": "Barmer Bonusprogramm 2026", "to": "/ratgeber/barmer-bonusprogramm-2026" },
            { "text": ", was die Barmer zur Zahnreinigung zahlt, im Ratgeber " },
            { "text": "Barmer Zahnreinigung", "to": "/ratgeber/barmer-zahnreinigung" },
            { "text": "." }
          ]
        },
        {
          "type": "paragraph",
          "text": "Willst du Bonus und Zahnschutz gezielt verbinden, rechne die IKK classic dagegen. Die IKK classic zahlt ihren Bonus laut Satzung wahlweise in dreifacher Höhe als Zuschuss, bis zu 810 EUR Zuschusswert im Jahr, in der Schwangerschaft bis zu 1.155 EUR. In der breiten Masse sind es 400 bis 700 EUR, jeweils höchstens bis zu den nachgewiesenen Kosten. Gegenzurechnen ist der Zusatzbeitrag: 3,85 Prozent bei der IKK classic, 3,29 Prozent bei der Barmer, Listenstand 13.10.2026."
        },
        {
          "type": "segments",
          "segments": [
            { "text": "Die Rechnung steht im Ratgeber " },
            { "text": "IKK classic Bonusprogramm 2026", "to": "/ratgeber/ikk-classic-bonusprogramm-2026" },
            { "text": ", einen Vergleich nach Satzungen bietet " },
            { "text": "kassenboost.de", "href": "https://kassenboost.de/" },
            { "text": ". Du kannst genauso bei der Barmer bleiben, denn ein Wechsel lohnt sich nicht für jeden." }
          ]
        }
      ]
    },
    {
      "id": "weiterlesen",
      "heading": "Welche Zahnratgeber helfen dir weiter?",
      "blocks": [
        {
          "type": "cards",
          "items": [
            {
              "icon": "document",
              "title": "Zahnersatz und Kosten im Überblick",
              "text": "Die gesetzlichen Zuschüsse und mögliche Eigenanteile verstehen.",
              "to": "/ratgeber/zahnersatz-kosten",
              "linkLabel": "Ratgeber lesen"
            },
            {
              "icon": "document",
              "title": "Behandlung schon angeraten",
              "text": "Wann ZAHN Sofort noch passt und wann die Rechnung zu spät kommt.",
              "to": "/ratgeber/zahnzusatzversicherung-laufende-behandlung",
              "linkLabel": "Ratgeber lesen"
            },
            {
              "icon": "document",
              "title": "Das Zahnbonusheft",
              "text": "Vorsorgenachweise und Festzuschuss verstehen.",
              "to": "/ratgeber/bonusheft-zahnarzt",
              "linkLabel": "Ratgeber lesen"
            },
            {
              "icon": "document",
              "title": "Tarife sinnvoll vergleichen",
              "text": "Die Berechnungsgrundlage hinter Prozentangaben prüfen.",
              "to": "/ratgeber/zahnzusatzversicherung-vergleich",
              "linkLabel": "Ratgeber lesen"
            }
          ]
        }
      ]
    }
  ],
  "faqs": [
    {
      "question": "Kann ich als Barmer-Mitglied eine andere Zahnzusatzversicherung wählen?",
      "answer": "Ja. Deine gesetzliche Mitgliedschaft macht einen privaten Partnervertrag nicht automatisch verbindlich. Du vergleichst und entscheidest über einen separaten Zusatzvertrag; dessen Annahme und Leistungen richten sich nach seinen Bedingungen. Für einen freien Tarif wie UKV ZahnPRIVAT zählt nur, dass du gesetzlich versichert bist."
    },
    {
      "question": "Mit welcher Versicherung arbeitet die Barmer bei der Zahnzusatzversicherung zusammen?",
      "answer": "Mit der HUK-COBURG. Die Barmer stellt auf ihrer Seite drei Tarife des Partners vor und nennt einen verringerten Beitrag für Mitglieder. Versicherer ist die HUK-COBURG, die Barmer vermittelt den Vertrag nur."
    },
    {
      "question": "Was kostet eine Zahnzusatzversicherung als Barmer-Mitglied?",
      "answer": "Bei einem freien Tarif hängt der Beitrag nicht von deiner Kasse ab. UKV ZahnPRIVAT kostet mit 30 bis 39 Jahren zum Beispiel 11,70 EUR im Monat in Stufe 75, 22,77 EUR in Stufe 90 und 30,05 EUR in Stufe 100, laut UKV gültig ab 1. Mai 2026. Den verbindlichen Beitrag zeigt der Antrag."
    },
    {
      "question": "Gibt es für Barmer-Mitglieder eine Zahnzusatzversicherung mit Sofortleistung?",
      "answer": "Für eine schon angeratene oder begonnene Behandlung gibt es den Baustein ZAHN Sofort der Bayerischen, wählbar zu einem neuen Zahntarif. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Der Abschluss muss vor der Rechnung erfolgen, und es dürfen keine Zähne fehlen. Der Baustein kostet zusätzlich 29,90 EUR monatlich für 24 Monate. Deine Kasse spielt dafür keine Rolle."
    },
    {
      "question": "Zahlt die Barmer die professionelle Zahnreinigung?",
      "answer": "Einen allgemeinen Satzungszuschuss für Erwachsene außerhalb der Schwangerschaft gibt es nicht. Im Bonusprogramm bringt die Zahnreinigung 100 Punkte, und die Rechnung kann aus deinen Punkten bezuschusst werden, höchstens mit 200 EUR im Jahr. Wer im Erfolgsbonus Erfolge bei vier Gesundheitsfaktoren nachweist, bekommt nach § 38 Abs. 11 bis zu 300 EUR für zwei Kalenderjahre, unter anderem für die Zahnreinigung. UKV ZahnPRIVAT 90 und 100 erstatten sie ohne Jahresdeckel."
    },
    {
      "question": "Kann ich den Barmer-Bonus für die Zahnzusatzversicherung nutzen?",
      "answer": "Ja, über den Zuschuss aus dem Bonusprogramm. Die Satzung führt die private Krankenzusatzversicherung im Zuschusskatalog, ohne einen Versicherer zu nennen. Als Zuschuss sind deine Punkte doppelt so viel wert wie bei einer Auszahlung, höchstens 200 EUR im Jahr und nie mehr als dein nachgewiesener Beitrag. Ob die Barmer deinen Tarif anerkennt, entscheidet sie bei der Erstattung."
    },
    {
      "question": "Zahlt die Barmer 75 Prozent meiner Keramikkrone?",
      "answer": "Nicht automatisch. 75 Prozent ist 2026 der erhöhte Festzuschuss zur maßgeblichen Regelversorgung bei erfülltem zehnjährigem Vorsorgenachweis. Die tatsächliche Keramikrechnung kann höher sein."
    },
    {
      "question": "Brauche ich für eine Kassenfüllung eine Zusatzversicherung?",
      "answer": "Für die ausreichende und zweckmäßige gesetzliche Versorgung ist ein privater Zahntarif keine Voraussetzung. Zusätzliche, schriftlich vereinbarte Füllungsmehrkosten sind davon zu unterscheiden."
    },
    {
      "question": "Übernimmt ein neuer Tarif eine schon empfohlene Behandlung?",
      "answer": "Das hängt von Beginn, Behandlungssituation und Tarifbedingungen ab. Die Verbraucherzentrale nennt bestehende Schäden und angekündigte Behandlungen als häufig nicht gedeckt. Eine Zusage für deinen Einzelfall lässt sich daraus nicht ableiten. Für genau diesen Fall gibt es den Sofortweg über ZAHN Sofort, solange noch keine Rechnung gestellt ist."
    },
    {
      "question": "Sind Zahnbonusheft und Kassenbonus dasselbe?",
      "answer": "Nein. Das Zahnbonusheft betrifft den gesetzlichen Festzuschuss für Zahnersatz. Das Bonusprogramm der Barmer nach § 37 der Satzung ist ein eigener Weg mit Punkten, als Zuschuss höchstens 200 EUR im Jahr. Beides kannst du nebeneinander nutzen."
    }
  ],
  "factNugget": "Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Die Barmer zahlt den gesetzlichen Kassenanteil und vermittelt Zahntarife der HUK-COBURG; als Barmer-Mitglied kannst du jeden Zahntarif wählen. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Beim Vergleich zählen Regelversorgung, Restkosten, Kassenanrechnung und Tarifgrenzen.",
  "onward": {
    "heading": "So gehst du weiter vor",
    "segments": [
      { "text": "Kläre zuerst, ob in den letzten 2 Jahren eine Behandlung empfohlen wurde oder gerade eine läuft. Welcher Zahnweg dann offen ist, siehst du in einer Minute auf " },
      { "text": "healio.de/zahn", "to": "/zahn" },
      { "text": ". Was die Kasse beim Zahnersatz zahlt, steht auf der Bereichsseite " },
      { "text": "Zahnersatz Kosten", "to": "/ratgeber/zahnersatz-kosten" },
      { "text": "." }
    ]
  },
  "sources": {
    "checkedAt": "2026-10-21",
    "checkedAtLabel": "21. Oktober 2026",
    "intro": "Originalquellen und Leistungsregeln direkt gelesen. Tarifangaben stammen aus den Unterlagen der Versicherer und von healio.de/zahn, eigene Rechenbeispiele sind als Beispiel gekennzeichnet.",
    "items": [
      {
        "label": "Zahnersatz und elektronischer Kostenplan",
        "publisher": "Barmer",
        "href": "https://www.barmer.de/unsere-leistungen/leistungen-a-z/zahngesundheit/zahnersatz-1003174",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Zahnzusatzversicherung mit dem Partner HUK-COBURG",
        "publisher": "Barmer",
        "href": "https://www.barmer.de/unsere-leistungen/beitraege-tarife/zusatzversicherungen/zahnzusatzversicherung",
        "accessedAt": "2026-10-21",
        "note": "Seite zuletzt aktualisiert am 09.11.2022"
      },
      {
        "label": "Satzung der Barmer: § 37 mit Anlage Teile 1 bis 4, § 38 Abs. 11 und § 40",
        "publisher": "Barmer",
        "href": "https://www.barmer.de/resource/blob/1022552/b2c26cec88be1e70caad268f9961fd09/barmer-satzung-der-barmer-barrierefrei-19-data.pdf",
        "stand": "Stand 15.10.2026, Fassung des 39. und 40. Nachtrages",
        "accessedAt": "2026-10-21",
        "note": ""
      },
      {
        "label": "Barmer Bonus: Zuschuss bis zu 200 Euro, auch für private Krankenzusatzversicherung",
        "publisher": "Barmer",
        "href": "https://www.barmer.de/unsere-leistungen/leistungen-a-z/barmer-bonus",
        "stand": "Seite zuletzt aktualisiert am 07.09.2026",
        "accessedAt": "2026-10-21",
        "note": ""
      },
      {
        "label": "Unsere Produkte im Überblick: ZahnPRIVAT 100, 90 und 75 mit Leistungen, Staffel und Beiträgen",
        "publisher": "Union Krankenversicherung (UKV)",
        "href": "https://mein-premiumservice.vkb.de/service2/rest/api/material-service/public/v1/material/322611",
        "stand": "gültig ab 1. Mai 2026, Seiten 22 bis 25",
        "accessedAt": "2026-10-10",
        "note": ""
      },
      {
        "label": "§ 55: Festzuschuss und Zahnbonus",
        "publisher": "Gesetze im Internet",
        "href": "https://www.gesetze-im-internet.de/sgb_5/__55.html",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026, Befund 1.1",
        "publisher": "Gemeinsamer Bundesausschuss (G-BA)",
        "href": "https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf",
        "stand": "geändert 05.12.2025, in Kraft 01.01.2026",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "§ 28: Füllung und Mehrkostenvereinbarung",
        "publisher": "Gesetze im Internet",
        "href": "https://www.gesetze-im-internet.de/sgb_5/__28.html",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Professionelle Zahnreinigung als Privatleistung",
        "publisher": "KZBV",
        "href": "https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Tarifvergleich und Leistungsgrenzen",
        "publisher": "Verbraucherzentrale",
        "href": "https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Bestehende Schäden und angekündigte Behandlungen",
        "publisher": "Verbraucherzentrale",
        "href": "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/weitere-versicherungen/zahnzusatzversicherungen-lohnt-sich-ein-abschluss-12943",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Krankenkassenliste mit Zusatzbeiträgen",
        "publisher": "GKV-Spitzenverband",
        "href": "https://www.gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp",
        "stand": "Listenstand 13.10.2026",
        "accessedAt": "2026-10-13",
        "note": ""
      },
      {
        "label": "Satzung der IKK classic, Bonus als Zuschuss",
        "publisher": "IKK classic",
        "href": "https://cdn.ikk-classic.de/exporter/19885-satzung-kv-incl-sana-78-80-20260801.pdf",
        "stand": "Stand 01.08.2026",
        "accessedAt": "2026-10-07",
        "note": ""
      },
      {
        "label": "Highlightblatt Zahnzusatzversicherung mit Ergänzungsbaustein Zahn Sofort (B 333551): Leistungsstaffel, keine Wartezeit",
        "publisher": "die Bayerische",
        "href": "https://www.diebayerische.de/dam/jcr:65e23042-960a-4478-90c7-a249e0b5f628/B%20333551%20Highlightblatt%20allgemein%20Stadt_Zahn.PDF",
        "stand": "07.2026",
        "accessedAt": "2026-10-21",
        "note": ""
      },
      {
        "label": "Annahmerichtlinien Zahn (B 333546): kein Abschluss bei fehlendem Zahn",
        "publisher": "die Bayerische",
        "href": "https://www.diebayerische.de/dam/jcr:0b42be21-a714-4ccb-a134-c3a848d472d7/333546_annahmerichtlinien_zahn.pdf",
        "stand": "11.2025",
        "accessedAt": "2026-10-21",
        "note": ""
      },
      {
        "label": "Zahnwege, Tarifangaben UKV ZahnPRIVAT und ZAHN Sofort, Antragsprüfung",
        "publisher": "Healio",
        "href": "https://healio.de/zahn",
        "accessedAt": "2026-10-21",
        "note": ""
      },
      {
        "label": "Festzuschüsse ab 2027 und Übergang für vorherige Bewilligungen",
        "publisher": "Bundesgesetzblatt 2026 I Nr. 228",
        "href": "https://www.recht.bund.de/bgbl/1/2026/228/regelungstext.pdf?__blob=publicationFile&v=1",
        "accessedAt": "2026-10-07",
        "note": "Art. 1 Nr. 22 und Art. 8 Abs. 2; PDF-Seiten 9, 10 und 45"
      }
    ]
  },
  "footnote": "Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen, zuletzt geprüft am 21. Oktober 2026. Maßgeblich sind die gesetzlichen Voraussetzungen, die aktuelle Kassensatzung und bei privaten Verträgen die vereinbarten Bedingungen."
};
