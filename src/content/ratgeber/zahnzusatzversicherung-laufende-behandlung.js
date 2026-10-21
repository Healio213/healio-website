/**
 * Welle B, Feld Zahn.
 * Live healio.de/zahn mit dentalContent.js read-only abgeglichen. Nur gemeinsam belegbarer Sofortweg: 750 EUR je Kalenderjahr, insgesamt 1.500 EUR, 24 Monate, neuer Zahntarif, Abschluss vor Rechnung, noch nicht abgeschlossen oder abgerechnet. Keine Annahme- oder Erstattungszusage.
 * Quellen und Belege: zahnzusatzversicherung-laufende-behandlung.belege.md, Abruf 07.10.2026.
 *
 * Zusammenlegung 14.10.2026 (SEO Thema B, Semrush-Analyse 4a/4c): Der Blogartikel
 * /blog/zahnzusatzversicherung-trotz-angeratener-behandlung ist hier aufgegangen
 * und leitet per 301 (vercel.json) auf diese Seite. Übernommen wurde nur, was
 * primärquellig belegt ist, jetzt direkt mit den Unterlagen der Bayerischen statt
 * mit dem Verweis auf die eigene Zahnseite:
 *   - Besondere Bedingungen ZAHN Sofort B 261005 (08.23): Rückwärtsversicherung,
 *     "Als abgeschlossen gilt eine Behandlung, die bereits in Rechnung gestellt
 *     wurde", 1.500 EUR davon höchstens 750 EUR je Kalenderjahr, Erstattungshöhe
 *     nach dem Trägertarif, keine Wartezeiten, Beitrag altersunabhängig ohne
 *     Anpassung, 24 Monate, endet automatisch, keine Verlängerung.
 *   - Highlightblatt Zahn B 333551 (07.2026): pauschal 29,90 EUR pro Monat.
 *   - Highlightblatt ZAHN Sofort B 333549 (Stand März 2024): Leistungsbeispiele
 *     Inlays und Implantat (Beträge der Bayerischen, keine eigenen Preise).
 *   - Annahmerichtlinien Zahn B 333546 (11.2025): "angeraten" = Behandler hat
 *     konkreten Handlungsbedarf angemeldet, Zeitraum 2 Jahre; Baustein nur mit
 *     Trägertarif und nur beim erstmaligen Vertragsbeginn.
 * Nicht übernommen: Testurteil (Sperrwort), IKK-Refinanzierung "bis zu 100 Prozent"
 * (ohne Primärquelle), Wertungen wie "Schande".
 *
 * SEO-Ausbau 21.10.2026 (Auftrag seo-zv-3, Hauptbegriff "zahnzusatzversicherung
 * bei laufender behandlung" plus "angeratene behandlung" und "nach befund").
 * Rollenverteilung im Zahnfeld, damit die drei Seiten sich nicht gegenseitig
 * Suchbegriffe wegnehmen: diese Seite = angeraten, begonnen, laufend, nach
 * Befund, trotz Behandlung; zahnzusatzversicherung-sofort-2026 = sofort,
 * Sofortschutz, Sofortleistung (Ankertext von hier: "Zahnzusatzversicherung mit
 * Sofortschutz"); zahnzusatzversicherung-ohne-wartezeit = Wartezeit (Ankertext
 * "Zahnzusatzversicherung ohne Wartezeit"). Das Wort "Sofortschutz" steht hier
 * deshalb nur im Ankertext.
 * Alle Unterlagen am 21.10.2026 frisch abgerufen und gelesen:
 *   - BB ZAHN Sofort B 261005 (08.23, Stand 09/2023), unverändert: Vorwort
 *     (Zahnbehandlung, Zahnersatz, Prophylaxe, bei Beginn bekannt oder
 *     angeraten), 2 Erstattung nach Abschnitt B des Trägertarifs, 3.1
 *     1.500 EUR, davon höchstens 750 EUR je Kalenderjahr, keine Anrechnung auf
 *     die Staffel, 3.2 Kieferorthopädie von vorher ausgenommen außer Unfall.
 *   - Highlightblatt Zahn B 333551 (07.2026), unverändert: 29,90 EUR pro
 *     Monat, 1.500 EUR und max. 750 EUR je Kalenderjahr, Erstattungssätze
 *     Smart/Komfort/Prestige, "sogar bei Aufbissschienen", Abzug bei Ärzten
 *     ohne Kassenzulassung pauschal 40 %, Jahresbeitrag 33-Jährige 152,40 /
 *     321,60 / 529,20 EUR. Summen mit ZAHN Sofort sind eigene Rechnung.
 *   - Annahmerichtlinien Zahn B 333546 (11.2025), Datei identisch mit der
 *     Ablage Healio/Zahnzusatz-Unterlagen: Abschluss bis 70 ohne Anfrage,
 *     24 Monate Mindestlaufzeit, Kündigung ein Monat vor Ablauf, fehlender Zahn
 *     = kein Abschluss, Weisheitszähne nicht als fehlend angeben, Abrasionen
 *     und Schlifffacetten zählen als Zahnschmelzdefekt, in Behandlung
 *     versicherbar außer Parodontose, Parodontitis, Zahnschmelzdefekt.
 *   - IKK classic Satzung Stand 01.08.2026 § 34 Abs. 8 (Zuschuss für Beiträge
 *     zu Krankenzusatzversicherungen, dreifacher Wert, höchstens tatsächliche
 *     Kosten); Krankenkassenliste GKV-Spitzenverband vom 21.10.2026: IKK
 *     classic 3,85 %. 810/1.155 EUR und 400 bis 700 EUR wortgleich mit
 *     bonusheft-zahnarzt und dentalContent.js (Franks Satzungsregel).
 * Zahn-Check-Logik (DentalZahnCheck.jsx): Zahnziehen, auch Weisheitszahn,
 * führt nie zum Sofortweg, sondern zur persönlichen Klärung.
 */
export const article = {
  updatedAtLabel: "21. Oktober 2026",
  updatedAt: "2026-10-21",
  "slug": "zahnzusatzversicherung-laufende-behandlung",
  "kind": "ratgeber",
  "group": "zaehne",
  "metaTitle": "Zahnzusatzversicherung bei laufender oder angeratener Behandlung",
  "metaDescription": "Zahnzusatzversicherung bei laufender Behandlung, nach Befund oder schon angeraten: wer noch zahlt, warum die Rechnung die Grenze ist und wann es zu spät ist.",
  "publishedAt": "2026-10-07",
  "publishedAtLabel": "7. Oktober 2026",
  "readingTimeMinutes": 14,
  "listTitle": "Zahnzusatzversicherung bei laufender Behandlung: Was geht?",
  "listTeaser": "Angeraten, begonnen oder schon abgerechnet? Welche Zahnzusatzversicherung bei laufender Behandlung noch zahlt und wo die Grenze liegt.",
  "headline": "Zahnzusatzversicherung bei laufender Behandlung: Was geht?",
  "author": "frank-steinfurt",
  "toc": "auto",
  "faqStyle": "accordion",
  "quickAnswer": {
    "title": "Das Wichtigste in Kürze",
    "icon": "comparison",
    "facts": [
      {
        "value": "1.500 EUR",
        "label": "aus ZAHN Sofort: 750 EUR je Kalenderjahr, insgesamt 1.500 EUR"
      },
      {
        "value": "vor der Rechnung",
        "label": "abschließen, denn was in Rechnung gestellt ist, gilt als abgeschlossen"
      },
      {
        "value": "29,90 EUR",
        "label": "im Monat für den Baustein, 24 Monate lang, plus Zahntarif"
      }
    ],
    "text": "Ja, auch bei laufender oder angeratener Behandlung geht noch etwas, aber nur bis zur Rechnung. Ein normaler Zahntarif zahlt nicht für das, was beim Abschluss schon angeraten ist oder läuft. Der Baustein ZAHN Sofort der Bayerischen ist die Ausnahme, mit festem Deckel.",
    "path": {
      "to": "/zahn",
      "text": "Angeraten oder begonnen? Deinen Weg prüfen",
      "label": "Zahn-Check bei Healio öffnen"
    }
  },
  "lead": "Der Zahnarzt hat nach dem Befund eine Krone, ein Inlay oder ein Implantat angeraten, und jetzt heißt es überall: zu spät für eine Zahnzusatzversicherung. Für einen normalen Tarif stimmt das. Mit dem Baustein ZAHN Sofort der Bayerischen ist eine angeratene oder schon begonnene Behandlung trotzdem versicherbar, mit bis zu 750 EUR je Kalenderjahr und insgesamt 1.500 EUR. Die Bedingung, an der alles hängt: Der Vertrag muss beginnen, bevor die Praxis die Rechnung stellt. Wer das verpasst, zahlt seinen Eigenanteil allein.",
  "sections": [
    {
      "id": "status",
      "heading": "Was heißt angeraten, begonnen oder nach Befund?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Angeraten ist eine Behandlung nach den Annahmerichtlinien der Bayerischen, wenn der Behandler konkreten Handlungsbedarf angemeldet hat. Ein Heil- und Kostenplan ist dafür nicht nötig, ein Eintrag in deiner Patientenakte reicht. Die Bayerische schaut dabei auf die letzten 2 Jahre. Wer nach einem Befund sucht, also nachdem der Zahnarzt etwas festgestellt hat, steckt genau in dieser Lage."
        },
        {
          "type": "paragraph",
          "text": "Begonnen ist eine Behandlung, die schon angefangen hat. Abgeschlossen ist sie nach den Bedingungen von ZAHN Sofort, sobald sie in Rechnung gestellt wurde. Ob du die Rechnung schon bezahlt hast, spielt dafür keine Rolle. Diese drei Zustände entscheiden darüber, welcher Weg überhaupt noch offen ist."
        },
        {
          "type": "paragraph",
          "text": "Wenn dir ein Datum oder ein Eintrag unklar ist, lass ihn in der Praxis erklären. Du kannst Einsicht in deine Behandlungsakte verlangen (§ 630g BGB). Eine Erinnerung wie „das wurde nur kurz erwähnt“ ersetzt den dokumentierten Verlauf nicht, und deine Angaben im Antrag müssen vollständig und richtig sein."
        }
      ]
    },
    {
      "id": "standard",
      "heading": "Warum zahlt ein normaler Zahntarif bei laufender Behandlung nicht?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Weil der Versicherer nur für Fälle leistet, die nach Vertragsbeginn entstehen. Die Bayerische schreibt für ihre Tarife ZAHN Smart, Komfort und Prestige ausdrücklich: Für Behandlungen, die bei Vertragsabschluss bereits begonnen oder angeraten sind, besteht kein Versicherungsschutz. Die Verbraucherzentrale nennt bekannte Schäden und angekündigte Behandlungen ebenfalls als typische Grenze."
        },
        {
          "type": "paragraph",
          "text": "Ein Tarif ohne Wartezeit ändert daran nichts. Keine Wartezeit heißt nur, dass neue Fälle sofort zählen. Der Fall, der schon in deiner Akte steht, bleibt draußen. Und eine hohe Erstattungsquote im Prospekt sagt nichts darüber, ob genau deine laufende Behandlung dazugehört."
        },
        {
          "type": "segments",
          "segments": [
            {
              "text": "Was ab dem ersten Tag gilt und wo die Leistungsstaffel bremst, steht im Ratgeber "
            },
            {
              "text": "Zahnzusatzversicherung ohne Wartezeit",
              "to": "/ratgeber/zahnzusatzversicherung-ohne-wartezeit"
            },
            {
              "text": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "Hast du schon eine Zahnzusatzversicherung, prüfst du zuerst diesen Vertrag und seinen damaligen Beginn. Ein Neuabschluss macht eine alte Behandlung nicht rückwirkend versichert."
        }
      ]
    },
    {
      "id": "sofort",
      "heading": "Was zahlt ZAHN Sofort bei angeratener oder laufender Behandlung?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "ZAHN Sofort ist ein Ergänzungsbaustein der Bayerischen zu den Zahntarifen Smart, Komfort und Prestige. Nach den Besonderen Bedingungen leistet er auch für Behandlungen, die vor dem Vertragsbeginn angeraten oder schon begonnen wurden, aber noch nicht abgeschlossen sind. Wartezeiten entfallen. Erstattet wird nach den Prozentsätzen deines Zahntarifs, aus ZAHN Sofort höchstens 750 EUR je Kalenderjahr und insgesamt 1.500 EUR."
        },
        {
          "type": "list",
          "items": [
            {
              "lead": "Beitrag:",
              "text": "pauschal 29,90 EUR im Monat, für alle Altersgruppen gleich und während der Laufzeit ohne Beitragsanpassung. Dazu kommt der Beitrag für den Zahntarif."
            },
            {
              "lead": "Laufzeit:",
              "text": "24 Monate. Danach endet der Baustein automatisch, ohne Kündigung. Verlängern lässt er sich nicht. Der Zahntarif läuft weiter und gilt für alles, was nach Vertragsbeginn neu beginnt."
            },
            {
              "lead": "Nur beim ersten Abschluss:",
              "text": "Der Baustein geht nur zusammen mit einem Zahntarif und nur beim erstmaligen Vertragsbeginn. In einen bestehenden Vertrag lässt er sich nicht einschließen."
            },
            {
              "lead": "Kein Übertrag:",
              "text": "Was du in einem Kalenderjahr nicht ausschöpfst, verfällt. Ins nächste Jahr wandert es nicht."
            },
            {
              "lead": "Keine laufende Zahnspange:",
              "text": "Eine Kieferorthopädie, die vor dem Versicherungsbeginn begonnen oder erstmals angeraten wurde, ist im Baustein ausgenommen. Das gilt nicht, wenn sie nachweislich auf einen Unfall zurückgeht."
            },
            {
              "lead": "Staffel bleibt unberührt:",
              "text": "Was ZAHN Sofort zahlt, wird nach Ziffer 3.1 der Bedingungen nicht auf die Leistungsstaffel deines Zahntarifs angerechnet."
            }
          ]
        },
        {
          "type": "segments",
          "segments": [
            {
              "text": "Wie Staffel und Baustein im ersten Kalenderjahr zusammenspielen und was „sofort“ sonst bei Zahntarifen heißt, erklärt der Ratgeber "
            },
            {
              "text": "Zahnzusatzversicherung mit Sofortschutz",
              "to": "/ratgeber/zahnzusatzversicherung-sofort-2026"
            },
            {
              "text": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "Die Kalenderjahre kannst du nutzen. Verteilen sich Rechnungen einer größeren Behandlung auf zwei Kalenderjahre, kann der Jahreshöchstbetrag zweimal greifen. Plane die Termine mit deiner Praxis, aber nur so, wie es medizinisch passt."
        },
        {
          "type": "table",
          "mobile": "cards",
          "caption": "Laufende Behandlung: Welcher Weg ist noch offen?",
          "head": [
            "Situation",
            "Möglicher Weg",
            "Worauf es ankommt"
          ],
          "rows": [
            [
              "Angeraten in den letzten 2 Jahren, noch nicht begonnen",
              "Zahntarif mit ZAHN Sofort",
              "Vertragsbeginn vor der Rechnung, Annahme nach den Gesundheitsfragen"
            ],
            [
              "Begonnen, noch nicht in Rechnung gestellt",
              "Zahntarif mit ZAHN Sofort",
              "Die Rechnung darf erst nach Vertragsbeginn kommen"
            ],
            [
              "Schon in Rechnung gestellt",
              "Kein Weg über einen neuen Vertrag",
              "Eine noch offene Zahlung ändert nichts, die Behandlung gilt als abgeschlossen"
            ],
            [
              "Nichts angeraten in den letzten 2 Jahren",
              "Normaler Zahntarif ohne Sofortbaustein",
              "Neue Fälle nach den Tarifbedingungen, Staffel und Ausschlüsse beachten"
            ]
          ],
          "note": "Nach den Besonderen Bedingungen ZAHN Sofort B 261005 (08.23) und den Annahmerichtlinien Zahn B 333546 (11.2025) der Bayerischen. Keine Leistungszusage für deinen Einzelfall, verbindlich sind Antrag, Versicherungsschein und Bedingungen."
        }
      ]
    },
    {
      "id": "tarifwahl",
      "heading": "Welcher Zahntarif gehört zu ZAHN Sofort?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Den Baustein gibt es nur zusammen mit ZAHN Smart, Komfort oder Prestige. Welchen du wählst, entscheidet mit darüber, wie viel von deiner angeratenen Behandlung erstattet wird. Nach Ziffer 2 der Bedingungen zahlt ZAHN Sofort nach den Prozentsätzen des Zahntarifs, aus dem Baustein höchstens 750 EUR je Kalenderjahr und insgesamt 1.500 EUR."
        },
        {
          "type": "table",
          "mobile": "cards",
          "caption": "Erstattung und Beitrag der drei Zahntarife, jeweils mit ZAHN Sofort",
          "head": [
            "Laut Bayerischer",
            "ZAHN Smart",
            "ZAHN Komfort",
            "ZAHN Prestige"
          ],
          "rows": [
            [
              "Zahnbehandlung",
              "75 %",
              "100 %",
              "100 %"
            ],
            [
              "Zahnersatz bis zur Regelversorgung",
              "75 %",
              "100 %",
              "100 %"
            ],
            [
              "Zahnersatz über der Regelversorgung",
              "75 %",
              "80 bis 90 %",
              "100 %"
            ],
            [
              "Jahresbeitrag Zahntarif, Beispiel 33 Jahre",
              "152,40 EUR",
              "321,60 EUR",
              "529,20 EUR"
            ],
            [
              "Mit ZAHN Sofort (12 mal 29,90 EUR) im ersten Jahr",
              "511,20 EUR",
              "680,40 EUR",
              "888,00 EUR"
            ]
          ],
          "note": "Quelle: die Bayerische, Highlightblatt Zahn B 333551, Stand 07.2026. Die Summen mit ZAHN Sofort sind eigene Rechnung. Bei Komfort und Prestige hängt der Beitrag auch von der Regionalklasse ab, verbindlich ist der Beitrag im Antrag."
        },
        {
          "type": "paragraph",
          "text": "Spürbar wird der Satz bei teurem Zahnersatz. Im Beispiel der Bayerischen kostet eine Krone 1.040 EUR, mit Smart bleiben davon 260 EUR bei dir, ein Viertel der Rechnung. Komfort und Prestige erstatten Zahnbehandlungen zu 100 %, kosten dafür mehr im Monat. Und wenn der Baustein nach 24 Monaten endet, bleibt der Zahntarif für jede neue Behandlung."
        },
        {
          "type": "path",
          "to": "/zahn#zahn-check",
          "icon": "dental",
          "text": "Im Zahn-Check siehst du, ob ZAHN Sofort für dich offen ist, und rechnest deinen Beitrag direkt aus.",
          "label": "Zahn-Check starten"
        }
      ]
    },
    {
      "id": "rechnung",
      "heading": "Warum ist die Rechnung die entscheidende Grenze?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Weil die Bedingungen es so festlegen. ZAHN Sofort übernimmt Kosten nur für Behandlungen, die vor dem Vertragsbeginn noch nicht abgeschlossen sind, und als abgeschlossen gilt eine Behandlung, die bereits in Rechnung gestellt wurde. Eine Sechs-Monats-Frist ab Heil- und Kostenplan steht dort nicht. Maßgeblich ist der Zeitpunkt der Rechnung."
        },
        {
          "type": "paragraph",
          "text": "Für dich heißt das: erst der Vertrag, dann die Rechnung. Sprich mit deiner Praxis, wann sie abrechnet, bevor du den nächsten Termin machst. Ist die Rechnung einmal geschrieben, ist es für diese Behandlung zu spät, auch wenn du sie noch nicht bezahlt hast."
        }
      ]
    },
    {
      "id": "kosten",
      "heading": "Wie viel bleibt bei dir? Zwei Beispiele der Bayerischen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Bayerische rechnet in ihrem Highlightblatt zu ZAHN Sofort zwei Fälle vor. Die Beispiele zeigen, wofür der Baustein reicht und wofür nicht: Eine kleinere Versorgung kann er fast ganz tragen, bei einem Implantat bleibt der größte Teil bei dir."
        },
        {
          "type": "costCard",
          "title": "Zwei Leistungsbeispiele zu ZAHN Sofort",
          "icon": "dental",
          "tariffLabel": "Beispiele der Bayerischen aus dem Highlightblatt B 333549 (Stand März 2024): Inlays mit Prestige und Sofortbaustein, Implantat mit Komfort und Sofortbaustein. Beträge laut Bayerischer, keine Preisangabe von Healio.",
          "caption": "Kostenkarte: angeratene Inlays und begonnenes Implantat mit Sofortbaustein",
          "head": [
            "Beispiel",
            "Kasse zahlt",
            "Du ohne Tarif",
            "Du mit Tarif"
          ],
          "rows": [
            [
              "Inlays aus Keramik, angeraten vor Vertragsbeginn, ca. 750 EUR",
              "50 EUR",
              "700 EUR",
              "nichts mehr, der Versicherer übernimmt die restlichen 700 EUR"
            ],
            [
              "Implantat mit Metall-Keramik-Krone, vor Vertragsbeginn begonnen, ca. 3.950 EUR",
              "472 EUR Festzuschuss",
              "3.478 EUR",
              "2.728 EUR, der Versicherer zahlt 750 EUR im ersten Kalenderjahr"
            ]
          ],
          "note": "Quelle: die Bayerische, Highlightblatt Baustein ZAHN Sofort (B 333549, Stand März 2024), Beispiele 1 und 2. „Du ohne Tarif“ ist eigene Rechnung (Kosten minus Kassenanteil). Wie viel in deinem Fall erstattet wird, hängt von Zahntarif, Rechnung und Annahme ab.",
          "bonusNote": "Den Beitrag für Zahntarif und Baustein kann ein Kassenbonus mittragen, wenn deine Kasse ihn als Zuschuss zu einer Zusatzversicherung zahlt. Wie viel, hängt von Kasse und Aktivitäten ab."
        },
        {
          "type": "paragraph",
          "text": "Rechne den Beitrag mit. Der Baustein kostet über 24 Monate 717,60 EUR (24 mal 29,90 EUR, eigene Rechnung), dazu kommt der Zahntarif. Bei einer einzelnen kleinen Behandlung liegt der Vorteil deshalb vor allem darin, dass der Zahntarif danach weiterläuft. Bei mehreren angeratenen Behandlungen über zwei Kalenderjahre rechnet sich der Baustein eher."
        }
      ]
    },
    {
      "id": "annahme",
      "heading": "Wann passt ZAHN Sofort nicht?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Auch mit Sofortbaustein beantwortest du Gesundheitsfragen, und die Bayerische nimmt nicht jeden an. Im Zahn-Check auf healio.de/zahn passt der Sofortweg nur, wenn dir keine Zähne fehlen, kein Zahn gezogen werden soll und keine Vorgeschichte wie Parodontitis in den letzten 3 Jahren, eine herausnehmbare Prothese oder alter Zahnersatz besteht."
        },
        {
          "type": "paragraph",
          "text": "Fehlen dir schon Zähne oder gibt es eine Zahn-Vorgeschichte, ist ZAHN Sofort nicht dein Weg, auch nicht für eine Brücke, die eine bestehende Lücke schließen soll. Nach den Annahmerichtlinien der Bayerischen ist bei einem fehlenden Zahn kein Abschluss möglich. Die laufende Behandlung selbst ist dagegen kein Ausschlussgrund. Wer gerade in Behandlung ist, kann sich dort versichern, außer die Diagnose lautet Parodontose, Parodontitis oder Zahnschmelzdefekt."
        },
        {
          "type": "paragraph",
          "text": "Wurde in den letzten 2 Jahren nichts angeraten, brauchst du den Baustein nicht. Dann zeigt dir der Zahn-Check einen normalen Zahntarif, auch wenn dir 1 bis 3 Zähne fehlen. Passt keiner der beiden Wege, etwa bei fehlenden Zähnen zusammen mit einer angeratenen Behandlung, klären wir das persönlich mit dir unter 040 89755705."
        },
        {
          "type": "path",
          "to": "/zahn",
          "icon": "comparison",
          "text": "In bis zu vier Fragen siehst du, ob der Sofortweg für dich offen ist oder ein anderer Tarif passt.",
          "label": "Zahn-Check bei Healio öffnen"
        },
        {
          "type": "honest",
          "heading": "Ehrlich gesagt",
          "items": [
            {
              "lead": "Das ist ein Zuschuss mit Deckel, keine volle Übernahme.",
              "text": "Aus ZAHN Sofort kommen höchstens 750 EUR je Kalenderjahr und insgesamt 1.500 EUR. Bei einem Implantat bleibt der größte Teil bei dir."
            },
            {
              "lead": "Die Rechnung entscheidet, nicht die Zahlung.",
              "text": "Was schon in Rechnung gestellt ist, gilt als abgeschlossen. Eine noch offene Zahlung rettet die Behandlung nicht."
            },
            {
              "lead": "Der Zahntarif läuft weiter und kostet weiter.",
              "text": "Bewerte den ganzen Vertrag mit seinen Beiträgen, nicht nur den möglichen Zuschuss für den laufenden Fall."
            }
          ]
        }
      ]
    },
    {
      "id": "unterlagen",
      "heading": "Welche Unterlagen helfen dir vor dem Abschluss?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Halte den Behandlungsplan, einen vorhandenen Heil- und Kostenplan und die bekannten Termine bereit. Notiere, ob die Praxis schon etwas abgerechnet hat und ob die Behandlung abgeschlossen ist. Den Heil- und Kostenplan reichst du zuerst bei deiner Krankenkasse ein, damit ihr Festzuschuss feststeht."
        },
        {
          "type": "paragraph",
          "text": "Speichere Antrag und Versicherungsschein, damit du den späteren Leistungsfall auf die richtige Fassung beziehen kannst. Die Antworten im Zahn-Check sind eine Orientierung, keine Annahme. Verbindlich entscheidet der Versicherer im Antrag."
        }
      ]
    },
    {
      "id": "kassenbonus",
      "heading": "Kann dein Kassenbonus den Beitrag mittragen?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Erst kommt der Schutz für die Behandlung, dann der Geheimtipp. Manche Krankenkassen zahlen ihren Bonus auf Wunsch als Zuschuss zum Beitrag einer Zusatzversicherung. Die IKK classic regelt das in § 34 ihrer Satzung: Der Zuschuss ist dreimal so hoch wie der normale Bonus, erstattet werden höchstens deine nachgewiesenen Kosten."
        },
        {
          "type": "paragraph",
          "text": "Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, beides theoretische Höchstwerte. In der breiten Masse sind es 400 bis 700 EUR, das ist unsere Einschätzung aus der Beratung. Gegenzurechnen ist der Zusatzbeitrag der IKK classic von 3,85 Prozent."
        },
        {
          "type": "paragraph",
          "text": "Zum Vergleich: Komfort mit ZAHN Sofort kostet im Beispiel oben mit 33 Jahren im ersten Jahr 680,40 EUR. Ein Zuschuss von 400 bis 700 EUR im Jahr trägt davon einen großen Teil. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus."
        },
        {
          "type": "segments",
          "segments": [
            {
              "text": "Welche Kasse zu deinem Zahntarif passt, vergleichst du quellenbelegt auf "
            },
            {
              "text": "kassenboost.de",
              "href": "https://kassenboost.de/"
            },
            {
              "text": "."
            }
          ]
        }
      ]
    },
    {
      "id": "weiterlesen",
      "heading": "Welche Ratgeber helfen dir beim nächsten Schritt?",
      "blocks": [
        {
          "type": "cards",
          "heading": "Das passt dazu",
          "items": [
            {
              "title": "Zahnersatz und Kassenleistungen im Überblick",
              "text": "Welche Kosten bei Zahnersatz und Behandlung zählen.",
              "to": "/ratgeber/zahnersatz-kosten",
              "icon": "bonus",
              "linkLabel": "Zur Übersicht"
            },
            {
              "title": "Heil- und Kostenplan verstehen",
              "text": "Was im Plan steht und warum er zuerst zur Kasse geht.",
              "to": "/ratgeber/heil-und-kostenplan",
              "icon": "document",
              "linkLabel": "Ratgeber lesen"
            },
            {
              "title": "Zahnzusatzversicherung Kosten",
              "text": "Beitrag und Leistungen über den gesamten Vertrag beurteilen.",
              "to": "/ratgeber/zahnzusatzversicherung-kosten",
              "icon": "document",
              "linkLabel": "Ratgeber lesen"
            },
            {
              "title": "Zahnzusatz ohne Wartezeit",
              "text": "Warum keine Wartezeit nicht jede Behandlung einschließt.",
              "to": "/ratgeber/zahnzusatzversicherung-ohne-wartezeit",
              "icon": "document",
              "linkLabel": "Ratgeber lesen"
            },
            {
              "title": "Zahnzusatzversicherung sofort 2026",
              "text": "Was ab Tag eins zahlt und wie Staffel und Sofortbaustein zusammenspielen.",
              "to": "/ratgeber/zahnzusatzversicherung-sofort-2026",
              "icon": "dental",
              "linkLabel": "Ratgeber lesen"
            }
          ]
        }
      ]
    }
  ],
  "factNugget": "Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Bei einer angeratenen oder begonnenen Zahnbehandlung kann der Baustein ZAHN Sofort der Bayerischen leisten, wenn der Vertrag vor der Rechnung beginnt: aus dem Baustein höchstens 750 EUR je Kalenderjahr und insgesamt 1.500 EUR, für 29,90 EUR im Monat über 24 Monate. Was schon in Rechnung gestellt ist, gilt als abgeschlossen.",
  "faqs": [
    {
      "question": "Welche Zahnzusatzversicherung zahlt bei laufender Behandlung?",
      "answer": "Normale Zahntarife zahlen nicht für Behandlungen, die beim Abschluss schon angeraten oder begonnen sind. Die Bayerische bietet dafür den Baustein ZAHN Sofort zu ihren Tarifen Smart, Komfort und Prestige an. Er leistet auch für laufende Behandlungen, solange sie noch nicht in Rechnung gestellt sind: aus dem Baustein höchstens 750 EUR je Kalenderjahr und insgesamt 1.500 EUR."
    },
    {
      "question": "Kann ich nach dem Befund noch eine Zahnzusatzversicherung abschließen?",
      "answer": "Abschließen ja, aber ein normaler Tarif zahlt dann nicht für die angeratene Behandlung. Mit dem Baustein ZAHN Sofort ist sie versicherbar, wenn der Vertrag vor der Rechnung beginnt und die Gesundheitsfragen passen. Die Bayerische schaut bei angeratenen Behandlungen auf die letzten 2 Jahre."
    },
    {
      "question": "Reicht es, wenn ich die Zahnarztrechnung noch nicht bezahlt habe?",
      "answer": "Nein. Nach den Bedingungen gilt eine Behandlung als abgeschlossen, sobald sie in Rechnung gestellt wurde. Ob du schon bezahlt hast, ändert daran nichts."
    },
    {
      "question": "Was kostet ZAHN Sofort?",
      "answer": "Pauschal 29,90 EUR im Monat, unabhängig vom Alter, dazu der Beitrag für den Zahntarif. Der Baustein läuft 24 Monate und endet dann automatisch. Über die ganze Laufzeit sind das 717,60 EUR für den Baustein (eigene Rechnung)."
    },
    {
      "question": "Was passiert nach den 24 Monaten?",
      "answer": "Der Baustein endet automatisch und lässt sich nicht verlängern. Der Zahntarif läuft weiter und leistet nach seinen Bedingungen für Behandlungen, die nach Vertragsbeginn neu beginnen."
    },
    {
      "question": "Kann ich ZAHN Sofort in meinen bestehenden Vertrag aufnehmen?",
      "answer": "Nein. Den Baustein gibt es nur zusammen mit einem Zahntarif der Bayerischen und nur beim erstmaligen Vertragsbeginn."
    },
    {
      "question": "Wann ist es für eine Zahnzusatzversicherung zu spät?",
      "answer": "Für die laufende Behandlung in dem Moment, in dem die Praxis sie in Rechnung stellt. Dann gilt sie nach den Bedingungen von ZAHN Sofort als abgeschlossen, und auch der Baustein zahlt nicht mehr dafür. Bis dahin ist er noch möglich, wenn die Annahme passt. Für künftige Behandlungen kannst du einen Zahntarif der Bayerischen bis zu einem Alter von 70 Jahren ohne gesonderte Anfrage beantragen, darüber nur auf Anfrage beim Versicherer."
    },
    {
      "question": "Zahlt ZAHN Sofort eine schon angeratene Wurzelbehandlung?",
      "answer": "Das kann er. Nach seinen Bedingungen deckt der Baustein Zahnbehandlungen, Zahnersatz und Prophylaxe, die beim Vertragsbeginn schon bekannt oder angeraten sind, und eine Wurzelbehandlung ist eine Zahnbehandlung. Erstattet wird nach dem Satz deines Zahntarifs für Zahnbehandlung, laut Bayerischer 75 % in Smart und 100 % in Komfort und Prestige, aus ZAHN Sofort höchstens 750 EUR je Kalenderjahr und insgesamt 1.500 EUR. Die Rechnung darf erst nach Vertragsbeginn kommen, und die Annahme muss passen."
    },
    {
      "question": "Bekomme ich eine Zahnzusatzversicherung trotz CMD?",
      "answer": "CMD steht in den Annahmerichtlinien der Bayerischen nicht unter den Gründen, die einen Abschluss ausschließen. Genau hinschauen musst du bei Abrasionen und Schlifffacetten: Die gibst du dort als Zahnschmelzdefekt an, und wurde ein Zahnschmelzdefekt in den letzten 3 Jahren festgestellt, nimmt die Bayerische dich nicht an. Frag deine Praxis vor dem Antrag, was in deiner Akte steht. Aufbissschienen nennt die Bayerische ausdrücklich als Leistung ihrer Zahntarife. Ist eine Schiene schon angeraten, kann ZAHN Sofort nach den Prozentsätzen deines Zahntarifs dafür leisten."
    },
    {
      "question": "Was gilt bei Weisheitszähnen?",
      "answer": "Fehlende Weisheitszähne musst du bei der Bayerischen im Antrag nicht als fehlende Zähne angeben, so steht es in ihren Annahmerichtlinien. Anders ist es, wenn ein Zahn gezogen werden soll, auch ein Weisheitszahn. Dann zeigt dir der Zahn-Check auf healio.de/zahn den Sofortweg nicht an, und wir klären deine Lage persönlich mit dir."
    },
    {
      "question": "Darf ich nach dem Befund den Zahnarzt wechseln?",
      "answer": "Welche Praxis dich behandelt, entscheidest du. Für die Versicherung ändert der Wechsel aber nichts. Angeraten ist eine Behandlung nach den Annahmerichtlinien der Bayerischen, sobald ein Behandler konkreten Handlungsbedarf angemeldet hat, und dafür gilt ein Zeitraum von 2 Jahren. Die Empfehlung der ersten Praxis zählt also weiter, auch wenn du inzwischen woanders in Behandlung bist. Achte bei der neuen Praxis auf die Kassenzulassung: Für Zahnärzte ohne Kassenzulassung nennt die Bayerische einen pauschalen Abzug von 40 %."
    },
    {
      "question": "Kann ich den Zahntarif nach der Behandlung wieder kündigen?",
      "answer": "Nicht sofort. Der Zahntarif der Bayerischen läuft zunächst 24 Monate und verlängert sich dann jeweils um ein Jahr, wenn du nicht spätestens einen Monat vor Ablauf in Textform kündigst. ZAHN Sofort endet nach 24 Monaten von selbst."
    }
  ],
  "onward": {
    "heading": "So gehst du weiter vor",
    "segments": [
      {
        "text": "Kläre mit deiner Praxis, ob schon abgerechnet wurde und wann die nächste Rechnung kommt. Welcher Weg für dich offen ist, siehst du im "
      },
      {
        "text": "Zahn-Check bei Healio",
        "to": "/zahn"
      },
      {
        "text": ". Was dein Kassenbonus zum Beitrag beitragen kann, vergleichst du auf "
      },
      {
        "text": "kassenboost.de",
        "href": "https://kassenboost.de/"
      },
      {
        "text": "."
      }
    ]
  },
  "sources": {
    "checkedAt": "2026-10-21",
    "checkedAtLabel": "21. Oktober 2026",
    "intro": "Leistungen, Grenzen, Annahme und Beitrag von ZAHN Sofort stammen aus den Unterlagen der Bayerischen, der Kassenbonus aus der Satzung der IKK classic, die allgemeinen Regeln von der Verbraucherzentrale und aus dem BGB. Eigene Rechnungen sind im Text gekennzeichnet.",
    "items": [
      {
        "label": "Besondere Bedingungen für den Ergänzungsbaustein ZAHN Sofort (B 261005)",
        "publisher": "die Bayerische",
        "href": "https://www.diebayerische.de/dam/jcr:a4c467fb-8060-4ed2-afea-6d44757e1970/261005_besondere_bedignungen_zahn_sofort_2023.pdf",
        "stand": "08.23",
        "accessedAt": "21.10.2026"
      },
      {
        "label": "Highlightblatt Zahnzusatzversicherung mit Ergänzungsbaustein Zahn Sofort (B 333551), Erstattungssätze, Beiträge, Abzug ohne Kassenzulassung",
        "publisher": "die Bayerische",
        "href": "https://www.diebayerische.de/dam/jcr:65e23042-960a-4478-90c7-a249e0b5f628/B%20333551%20Highlightblatt%20allgemein%20Stadt_Zahn.PDF",
        "stand": "07.2026",
        "accessedAt": "21.10.2026"
      },
      {
        "label": "Highlightblatt Baustein ZAHN Sofort mit Leistungsbeispielen (B 333549)",
        "publisher": "die Bayerische",
        "href": "https://www.diebayerische.de/dam/jcr:b29de137-b763-4efa-bcc0-9e51a33a5da7/333549_highlightblatt_zahn-sofort_endkunden.pdf",
        "stand": "März 2024",
        "accessedAt": "21.10.2026"
      },
      {
        "label": "Annahmerichtlinien Zahn, Definition „angeraten“, Annahme, Weisheitszähne, Zahnschmelzdefekt, Laufzeit und Regeln zum Baustein (B 333546)",
        "publisher": "die Bayerische",
        "href": "https://www.diebayerische.de/dam/jcr:0b42be21-a714-4ccb-a134-c3a848d472d7/333546_annahmerichtlinien_zahn.pdf",
        "stand": "11.2025",
        "accessedAt": "21.10.2026"
      },
      {
        "label": "Satzung der IKK classic, § 34 Bonus für gesundheitsbewusstes Verhalten, Zuschuss zu Zusatzversicherungen",
        "publisher": "IKK classic",
        "href": "https://cdn.ikk-classic.de/exporter/19885-satzung-kv-incl-sana-78-80-20260801.pdf",
        "stand": "Satzung Stand 01.08.2026",
        "accessedAt": "21.10.2026"
      },
      {
        "label": "Krankenkassenliste mit Zusatzbeiträgen",
        "publisher": "GKV-Spitzenverband",
        "href": "https://www.gkv-spitzenverband.de/krankenkassenliste.pdf",
        "stand": "Kassenliste vom 21.10.2026",
        "accessedAt": "21.10.2026"
      },
      {
        "label": "Bekannte Schäden und angekündigte Behandlungen",
        "publisher": "Verbraucherzentrale",
        "href": "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/weitere-versicherungen/zahnzusatzversicherungen-lohnt-sich-ein-abschluss-12943",
        "stand": "21. Februar 2024",
        "accessedAt": "07.10.2026"
      },
      {
        "label": "Bereits notwendige Behandlungen und korrekte Angaben",
        "publisher": "Verbraucherzentrale",
        "href": "https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293",
        "stand": "23. Juli 2026",
        "accessedAt": "07.10.2026"
      },
      {
        "label": "Einsicht in die Patientenakte, § 630g BGB",
        "publisher": "Gesetze im Internet",
        "href": "https://www.gesetze-im-internet.de/bgb/__630g.html",
        "stand": "Abruf 7. Oktober 2026",
        "accessedAt": "07.10.2026"
      }
    ]
  },
  "footnote": "Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu ZAHN Sofort nach den Unterlagen der Bayerischen, Abruf 21. Oktober 2026. Maßgeblich sind die zahnärztliche Einordnung, die Kassenleistung sowie Antrag, Versicherungsschein und Bedingungen des Versicherers."
};

export default article;
