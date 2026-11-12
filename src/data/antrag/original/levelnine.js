// Erzeugt von scripts/erzeuge-originale-levelnine.mjs, nicht von Hand ändern.
// Quelle: Healio/Antragsstrecken/originale/levelnine/ (Erfassung 2026-11-12).
/* eslint-disable */
const LEVELNINE = {
 "stand": "2026-11-12",
 "hinweis": "Erzeugt von scripts/erzeuge-originale-levelnine.mjs, nicht von Hand ändern.",
 "sdkStationaer": {
  "link": "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Station%C3%A4r&agentId1=901334&agentId2=&insurers=36&tariffs=&customValues=e30%3D&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDQwODk3NTU3MDUiLCJlbWFpbCI6ImluZm9AaGVhbGlvLmRlIn0%3D&remarks=IkJlaSBSw7xja2ZyYWdlbiBzaW5kIHdpciBnZXJuZSBmw7xyIFNpZSBkYS4i&defaultContact=false&employeeInsurance=NOT_BKV",
  "tarifkennungen": {
   "SP1": "SDKSP1#",
   "SP2": "SDKSP2#",
   "SPU": "SDKSPU#",
   "nicht angezeigt": [
    "SDKSG1O#",
    "SDKSG2O#"
   ]
  },
  "leistungstexte": {
   "SDKSP2#": "stationäre Zusatzversicherung für GKV-Versicherte (oder FHF)\nTarif Klinik 2-Bett (SP2)\n\n2-Bettzimmer\nprivatärztliche Behandlung (\"Chefarzt\", Belegarzt), auch über GOÄ-Höchstsätze hinaus\nambulante stationsersetzende OP\nfreie Krankenhauswahl (auch Privatkliniken)\nReha-Maßnahmen (keine Entwöhnungsbehandlungen)\nambulante Vor-/Abschlussuntersuchung (jeweils eine)\nRooming-in\nFahrt- und Transportkosten (bei Geh-/ Sehunfähigkeit, Fahruntüchtigkeit - bis 250,- p. a.)\nOptionsrecht auf Wechsel in Tarif SP1 ab dem 30. Geburtstag - alle 5 Jahre bis einschl. Alter 65\n\nAVB KV ZV: Teil I (Allgemeiner Teil)_1.751/01.22 + Teil II (Tarif SP2)_1.755a/06.20",
   "SDKSP1#": "stationäre Zusatzversicherung für GKV-Versicherte (oder FHF)\nTarif Klinik 1-Bett (SP1)\n\n1- o. 2-Bettzimmer\nprivatärztliche Behandlung (\"Chefarzt\", Belegarzt), auch über GOÄ-Höchstsätze hinaus\nambulante stationsersetzende OP\nfreie Krankenhauswahl (auch Privatkliniken)\nReha-Maßnahmen (keine Entwöhnungsbehandlungen)\n10,- KHT für akutstationäre Behandlungen/Reha-Maßnahmen (im Rahmen vollstationärer Behandlung)\nambulante Vor-/Abschlussuntersuchung (jeweils eine)\nRooming-in\nFahrt- und Transportkosten (bei Geh-/ Sehunfähigkeit, Fahruntüchtigkeit - bis 250,- p. a.)\nOptionsrecht/Höherstufung innerhalb der Tariflinie SP (SP1 ist aktuell der höchste Tarif)\n\nAVB KV ZV: Teil I (Allgemeiner Teil)_1.751/01.22 + Teil II (Tarif SP1)_1.754a/06.20",
   "SDKSPU#": "stationäre Zusatzversicherung für GKV-Versicherte (oder FHF)\nTarif Klinik bei Unfall (SPU)\n\n1- o. 2-Bettzimmer\nprivatärztliche Behandlung (\"Chefarzt\", Belegarzt), auch über GOÄ-Höchstsätze hinaus\nambulante stationsersetzende OP\nfreie Krankenhauswahl (auch Privatkliniken)\nReha-Maßnahmen\n10,- KHT für akutstationäre Behandlungen/Reha-Maßnahmen (im Rahmen vollstationärer Behandlung)\nambulante Vor-/Abschlussuntersuchung (jeweils eine)\nRooming-in\nFahrt- und Transportkosten (bei Geh-/ Sehunfähigkeit, Fahruntüchtigkeit - bis 250,- p. a.)\n\nALLE tariflichen Leistungen nur im Rahmen einer unfallbedingten Behandlung!\n\nAVB KV ZV: Teil I (Allgemeiner Teil)_1.751/01.22 + Teil II (Tarif SPU)_1.756a/06.20"
  },
  "beginnRegeln": "Vorbelegt ist der nächste Monatserste. Laut Code gilt (Hinweistext bei falscher Eingabe): „Bis einschließlich zum 15. eines Monats kann der Versicherungsbeginn zum Monatsersten des aktuellen Monats gewählt werden, ab dem 16. eines Monats zum Monatsersten des Folgemonats. Zusätzlich sind maximal 5 weitere Monate in der Zukunft zulässig.“ Welche der drei Datumskomponenten im Code für mandant=sdk greift, ist nicht sicher abgelesen (siehe Bericht).",
  "schritte": [
   {
    "schritt": 1,
    "titel": "Beitrag (Startseite, Stepper „Beitrag“)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "beginn",
      "wortlaut": "Beginn der Versicherung",
      "art": "Datum TT.MM.JJJJ",
      "pflicht": true,
      "vorbelegt": "01.12.2026 (am 12.11.2026, nächster Monatserster)"
     },
     {
      "id": "geburtsdatum",
      "wortlaut": "Persönliche Daten der zu versichernden Person / Geburtsdatum",
      "art": "Datum TT.MM.JJJJ",
      "pflicht": true
     },
     {
      "id": "geschlecht",
      "wortlaut": "Geschlecht",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "MALE",
        "anzeige": "Männlich"
       },
       {
        "wert": "FEMALE",
        "anzeige": "Weiblich"
       }
      ]
     },
     {
      "id": "tarife_anzeigen",
      "wortlaut": "TARIFE ANZEIGEN",
      "art": "Knopf"
     },
     {
      "id": "tarifwahl",
      "wortlaut": "Tarif ankreuzen (Karte „Süddeutsche Krankenversicherung AG / <Tarifname> / <Beitrag> EUR / Monat“)",
      "art": "Ankreuzfeld je Tarif",
      "pflicht": true
     },
     {
      "id": "summe",
      "wortlaut": "Beitrag ausgewählte(r) Tarif(e): <x> EUR / Monat · Beitrag Person 1: <x> EUR / Monat",
      "art": "Anzeige"
     },
     {
      "id": "beantragung_starten",
      "wortlaut": "BEANTRAGUNG STARTEN",
      "art": "Knopf"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 2,
    "titel": "Persönliche Daten (Stepper „Antragsdaten“)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "Gender Radio",
      "wortlaut": "Männlich / Weiblich",
      "art": "Auswahl (Radio)",
      "nur_lesen": true
     },
     {
      "id": "firstName",
      "wortlaut": "Vorname",
      "art": "Text",
      "pflicht": true,
      "fehlertext": "Eingabe erforderlich."
     },
     {
      "id": "lastName",
      "wortlaut": "Nachname",
      "art": "Text",
      "pflicht": true,
      "fehlertext": "Eingabe erforderlich."
     },
     {
      "id": "geburtsdatum",
      "wortlaut": "Geburtsdatum",
      "art": "Datum",
      "nur_lesen": true
     },
     {
      "id": "acknowledge",
      "wortlaut": "Ich bestätige, die \"Informationen zur Verwendung Ihrer Daten\" gelesen zu haben und erkläre mich damit einverstanden und bestätige, dass ich bei einem Träger der gesetzlichen Krankenversicherung (GKV) versichert bin bzw. dort ein Anspruch auf Familienversicherung besteht oder Anspruch auf freie Heilfürsorge besteht.",
      "art": "Ankreuzfeld",
      "pflicht": true,
      "fehlertext": "Bitte bestätigen.",
      "link": {
       "text": "\"Informationen zur Verwendung Ihrer Daten\"",
       "url": "https://www.sdk.de/downloads/Datenschutz-Compliance/0.024e-Informationen-zur-Verwendung-Ihrer-Daten.pdf"
      }
     },
     {
      "id": "beantragung_starten",
      "wortlaut": "BEANTRAGUNG STARTEN",
      "art": "Knopf"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 3,
    "titel": "Ihre Vertragsunterlagen",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "labelDocuments",
      "wortlaut": "Ihre Vertragsunterlagen Speichern Sie bitte vor dem Online-Abschluss die Allgemeinen Vertragsunterlagen (Verbraucherinformationen, Widerrufsbelehrung und weitere Hinweise), die Tarifunterlagen (Allgemeine Versicherungsbedingungen und Produktinformationsblatt), die Übersicht der Gesundheitsfragen und der Angaben zum Versicherungsstatus, sowie die Einwilligungs-und Schweigepflichtentbindungserklärung (Datenschutzrechtliche Einwilligungserklärung zu Ihren Gesundheitsdaten und sonstigen nach § 203 StGB geschützten Daten) oder drucken Sie diese aus. Diese Unterlagen sind - neben dem Antrag, dem Versicherungsschein und etwaigen Nachträgen - Grundlage Ihres Versicherungsvertrags.",
      "art": "Hinweistext",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "downloadLnDocument_15445",
      "wortlaut": "Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 15445,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26.pdf"
      }
     },
     {
      "id": "downloadLnDocument_15449",
      "wortlaut": "Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 15449,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/1.671i_Gesetzliche_Kundeninformation_SP_10.26.pdf"
      }
     },
     {
      "id": "downloadLnDocument_15452",
      "wortlaut": "Tarifbedingungen: 1.671h_Informationsblatt_Gesundheitsfragen_SP2_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 15452,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/1.671h_Informationsblatt_Gesundheitsfragen_SP2_10.26.pdf"
      }
     },
     {
      "id": "downloadLnDocument_12764",
      "wortlaut": "Tarifbedingungen: SP2_1-755a_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 12764,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/SP2_1-755a_10.26.pdf"
      }
     },
     {
      "id": "downloadLnDocument_12289",
      "wortlaut": "AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 12289,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/AVB/AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22.pdf"
      }
     },
     {
      "id": "lnTaaDownloadDocuments",
      "wortlaut": "",
      "art": "Zahl",
      "pflicht": false
     }
    ],
    "hinweise": null,
    "regel": "Alle Dokumente müssen heruntergeladen sein (je „DOKUMENT HERUNTERLADEN“ oder „ALLE DOKUMENTE HERUNTERLADEN“), sonst bleibt WEITER gesperrt; Fehlertext „Laden Sie die Datei bitte runter!“"
   },
   {
    "schritt": 4,
    "titel": "Erklärungen",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "firstName",
      "wortlaut": "Vorname:",
      "art": "Text",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "familyName",
      "wortlaut": "Nachname:",
      "art": "Text",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "policyHolderIsEqualInsuredPerson",
      "wortlaut": "Ist die versicherte Person auch der Inhaber der Versicherung (Versicherungsnehmer)?:",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "policyHolderGender",
        "wortlaut": "Anrede (VN):",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "2",
          "anzeige": "Frau"
         },
         {
          "wert": "1",
          "anzeige": "Herr"
         }
        ],
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderFirstName",
        "wortlaut": "Vorname (VN):",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderFamilyName",
        "wortlaut": "Nachname (VN):",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderBirthday",
        "wortlaut": "Geburtsdatum (VN):",
        "art": "Datum",
        "pflicht": true,
        "fehlertext": "Geben Sie hier das Geburtsdatum des Versicherungsnehmers im Format TT.MM.JJJJ (z.B.: 28.02.1971) ein oder wählen Sie ein Datum durch Klicken auf das Kalendarsymbol aus."
       }
      ]
     },
     {
      "id": "saveConfirmationtext",
      "wortlaut": "Bitte beantworten Sie die Fragen wahrheitsgemäß und vollständig. Die Verletzung der vorvertraglichen Anzeigepflicht kann den Versicherer berechtigen, je nach Verschulden vom Vertrag zurückzutreten, ihn zu kündigen oder anzupassen, was zur Leistungsfreiheit des Versicherers (auch für bereits eingetretene Versicherungsfälle) führen kann. Ausführliche Hinweise zu den Anzeigepflichten und zu den Folgen einer Anzeigepflichtverletzung entnehmen Sie bitte den Wichtigen Informationen für den Antragssteller.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "declarationOfConsentTermsOfContract",
      "wortlaut": "Ich habe die Allgemeinen Vertragsunterlagen und die Tarifunterlagen gelesen, abgespeichert bzw. ausdruckt und erkläre mich mit den Vertragsbedingungen einverstanden. Ich stimme zu, dass der Versicherungsschutz ggf. schon vor Ablauf der Widerrufsfrist beginnt.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "declarationOfConsentAndReleaseFromConfidentiality",
      "wortlaut": "Ich bestätige als Antragsteller, dass ich und alle in diesem Vertrag zu versichernden Personen sämtliche in der „Datenschutz- und Schweigepflichtentbindungserklärung” enthaltenen Einwilligungs- und Schweigepflichtentbindungserklärungen, einschließlich des Hinweises diese nicht abzugeben oder jederzeit später mit Wirkung für die Zukunft zu widerrufen, vollständig gelesen habe und mit diesen Erklärungen vorbehaltlos einverstanden sind. Soweit versicherten Personen die erforderliche Einsichtsfähigkeit fehlt (insbesondere, wenn Sie das 16. Lebensjahr noch nicht vollendet haben) bestätige ich, dass für diese deren gesetzliche Vertreter die entsprechenden Einwilligungs- und Schweigepflichtentbindungserklärungen abgegeben haben. Die Erklärungen werden zum Inhalt des Antrags.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "declarationOfConsentAdvertising",
      "wortlaut": "Ich bin damit einverstanden, von meinem Versicherer der SDK-Versicherungsgruppe oder einem von meinem Versicherer hierzu beauftragtem Unternehmen zu Versicherungsprodukten der SDK-Versicherungsgruppe sowie zum Angebot von kooperierenden gesetzlichen Krankenversicherungen, per Telefon, Post, E-Mail oder Social Media, informiert zu werden. Hierzu willige ich ein, dass der Außendienst der SDK sowie die von meinem Versicherer beauftragten Unternehmen über diesen Versicherungsvertrag in Kenntnis gesetzt werden und meine nach § 203 StGB geschützten Daten an diese zu Beratungszwecken und zur Produktinformation übermittelt werden und entbinde die Mitarbeiter der SDK insoweit von ihrer Schweigepflicht. Diese Einwilligung kann ich jederzeit - ohne Einfluss auf das Vertragsverhältnis - widerrufen.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "confirmDataProtection",
      "wortlaut": "Bestätigung zum Datenschutz:",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ],
      "fehlertext": "Bitte die Bestätigung zum Datenschutz zustimmen!",
      "hilfetext": "Innerhalb dieses Onlineangebots der ObjectiveIT GmbH besteht die Möglichkeit zur Eingabe personenbezogener Daten (z.B. Namen, Anschrift etc.) Hiermit versichere ich, dass mit der von der Datenverarbeitung betroffenen Person ein wirksam abgeschlossener Vermittlervertrag vorliegt. Liegt ein solcher Vermittlervertrag nicht vor, versichere ich, dass die von der Datenverarbeitung betroffene Person, in die Speicherung, Nutzung und Verwendung ihrer personenbezogenen Daten vollumfänglich wirksam einwilligt hat. Ich versichere zudem, dass mir eine wirksame Einwilligung für die Nutzung der Daten für sonstige Finanzdienstleistungen vorliegt. Die personenbezogenen Daten werden auf den von ObjectiveIT GmbH zur Nutzung zur Verfügung gestellten Systemen nach den gesetzlichen Vorschriften verarbeitet und nach praktizierten Standards gesichert. Ich erkläre mich mit den hier genannten Bestimmungen einverstanden."
     }
    ],
    "hinweise": [
     "policyHolderIsEqualInsuredPerson ist mit „Ja“ vorbelegt und gesperrt; die Folgefragen für einen abweichenden Versicherungsnehmer stehen unter folgefragen (nicht angezeigt).",
     "confirmDataProtection wird von der Seite ohne Anzeige mit „true“ beantwortet (feste Vorbelegung im Code für SDK).",
     "Link im Text „Wichtigen Informationen für den Antragssteller“: https://www.sdk.de/downloads/online-absatz/0.155a.pdf"
    ],
    "regel": null
   },
   {
    "schritt": 5,
    "titel": "Gesundheitsfragen (nur SP1 und SP2; bei SPU entfällt dieser Schritt)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "G0A",
      "wortlaut": "Körpergröße cm",
      "art": "Zahl",
      "pflicht": true,
      "fehlertext": "Körpergröße cm"
     },
     {
      "id": "G0B",
      "wortlaut": "Körpergewicht kg",
      "art": "Zahl",
      "pflicht": true,
      "fehlertext": "Körpergewicht kg"
     },
     {
      "id": "G10",
      "wortlaut": "Werden oder wurden in den letzten 5 Jahren Drogen oder Betäubungsmittel konsumiert?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G10.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        }
       },
       {
        "id": "G10.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        }
       },
       {
        "id": "G10.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        }
       },
       {
        "id": "G10.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        }
       },
       {
        "id": "G10.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        }
       },
       {
        "id": "G10.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G10.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G10.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G10.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G10",
         "antwort": "true"
        }
       },
       {
        "id": "G10.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G10.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G10.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          }
         },
         {
          "id": "G10.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          }
         },
         {
          "id": "G10.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          }
         },
         {
          "id": "G10.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          }
         },
         {
          "id": "G10.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          }
         },
         {
          "id": "G10.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G10.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G10.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G10.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G10.1",
           "antwort": "true"
          }
         },
         {
          "id": "G10.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G10.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G11",
      "wortlaut": "Wurde eine HIV-Infektion oder Hepatitis festgestellt oder steht ein Testergebnis noch aus?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G11.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        }
       },
       {
        "id": "G11.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        }
       },
       {
        "id": "G11.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        }
       },
       {
        "id": "G11.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        }
       },
       {
        "id": "G11.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        }
       },
       {
        "id": "G11.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G11.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G11.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G11.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G11",
         "antwort": "true"
        }
       },
       {
        "id": "G11.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G11.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G11.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          }
         },
         {
          "id": "G11.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          }
         },
         {
          "id": "G11.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          }
         },
         {
          "id": "G11.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          }
         },
         {
          "id": "G11.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          }
         },
         {
          "id": "G11.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G11.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G11.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G11.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G11.1",
           "antwort": "true"
          }
         },
         {
          "id": "G11.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G11.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G17",
      "wortlaut": "Fanden in den letzten 5 Jahren Beobachtungen, Untersuchungen oder Behandlungen in einem Krankenhaus, Sanatorium, einer Reha- oder Kurklinik statt und/oder sind solche angeraten oder beabsichtigt?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G17.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        }
       },
       {
        "id": "G17.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        }
       },
       {
        "id": "G17.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        }
       },
       {
        "id": "G17.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        }
       },
       {
        "id": "G17.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        }
       },
       {
        "id": "G17.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G17.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G17.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G17.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G17",
         "antwort": "true"
        }
       },
       {
        "id": "G17.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G17.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G17.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          }
         },
         {
          "id": "G17.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          }
         },
         {
          "id": "G17.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          }
         },
         {
          "id": "G17.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          }
         },
         {
          "id": "G17.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          }
         },
         {
          "id": "G17.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G17.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G17.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G17.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G17.1",
           "antwort": "true"
          }
         },
         {
          "id": "G17.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G17.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G18",
      "wortlaut": "Werden oder wurden in letzten 3 Jahren ambulante Beratungen, Behandlungen oder Untersuchungen (auch Vorsorgeuntersuchungen und Kontrolluntersuchungen aufgrund Vorerkrankungen) durch Ärzte, Heilpraktiker, Zahnärzte, Kieferorthopäden, Psychologen, Physio-, Ergotherapeuten, Logopäden oder sonstigen Therapeuten durchgeführt und/oder sind solche angeraten oder beabsichtigt?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G18.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        }
       },
       {
        "id": "G18.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        }
       },
       {
        "id": "G18.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        }
       },
       {
        "id": "G18.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        }
       },
       {
        "id": "G18.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        }
       },
       {
        "id": "G18.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G18.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G18.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G18.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G18",
         "antwort": "true"
        }
       },
       {
        "id": "G18.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G18.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G18.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          }
         },
         {
          "id": "G18.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          }
         },
         {
          "id": "G18.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          }
         },
         {
          "id": "G18.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          }
         },
         {
          "id": "G18.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          }
         },
         {
          "id": "G18.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G18.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G18.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G18.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G18.1",
           "antwort": "true"
          }
         },
         {
          "id": "G18.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G18.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G19",
      "wortlaut": "Bestehen chronische Krankheiten (z.B. Multiple Sklerose, Morbus Crohn, Colitis Ulcerosa) Allergien, organische/körperliche Fehler (z.B. fehlende Organe, fehlende Gliedmaßen, Schwerhörigkeit), Körperimplantate/ Prothesen (z.B. Kniegelenkersatz, Brustimplantate), andauernde oder wiederkehrende Beschwerden (z.B. Schmerzen, Schwindel, Bewegungseinschränkungen), die in den oben abgefragten Zeiträumen nicht behandelt oder untersucht wurden?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G19.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        }
       },
       {
        "id": "G19.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        }
       },
       {
        "id": "G19.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        }
       },
       {
        "id": "G19.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        }
       },
       {
        "id": "G19.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        }
       },
       {
        "id": "G19.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G19.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G19.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G19.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G19",
         "antwort": "true"
        }
       },
       {
        "id": "G19.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G19.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G19.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          }
         },
         {
          "id": "G19.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          }
         },
         {
          "id": "G19.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          }
         },
         {
          "id": "G19.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          }
         },
         {
          "id": "G19.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          }
         },
         {
          "id": "G19.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G19.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G19.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G19.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G19.1",
           "antwort": "true"
          }
         },
         {
          "id": "G19.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G19.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G20",
      "wortlaut": "Werden oder wurden in den letzten 3 Jahren regelmäßig oder wiederholt Medikamente eingenommen, angewendet (z.B. Tabletten, Tropfen, Inhalation, Spritzen, Salben) oder wurden Medikamente ärztlich angeraten?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G20.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        }
       },
       {
        "id": "G20.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        }
       },
       {
        "id": "G20.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        }
       },
       {
        "id": "G20.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        }
       },
       {
        "id": "G20.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        }
       },
       {
        "id": "G20.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G20.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G20.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G20.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G20",
         "antwort": "true"
        }
       },
       {
        "id": "G20.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G20.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G20.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          }
         },
         {
          "id": "G20.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          }
         },
         {
          "id": "G20.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          }
         },
         {
          "id": "G20.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          }
         },
         {
          "id": "G20.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          }
         },
         {
          "id": "G20.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G20.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G20.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G20.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G20.1",
           "antwort": "true"
          }
         },
         {
          "id": "G20.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G20.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G21",
      "wortlaut": "Bestanden in den letzten 3 Jahren Erwerbsunfähigkeit, Berufsunfähigkeit oder mehr als 2 Wochen zusammenhängend Arbeitsunfähigkeiten?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G21.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        }
       },
       {
        "id": "G21.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        }
       },
       {
        "id": "G21.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        }
       },
       {
        "id": "G21.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        }
       },
       {
        "id": "G21.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        }
       },
       {
        "id": "G21.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G21.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G21.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G21.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G21",
         "antwort": "true"
        }
       },
       {
        "id": "G21.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G21.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G21.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          }
         },
         {
          "id": "G21.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          }
         },
         {
          "id": "G21.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          }
         },
         {
          "id": "G21.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          }
         },
         {
          "id": "G21.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          }
         },
         {
          "id": "G21.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G21.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G21.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G21.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G21.1",
           "antwort": "true"
          }
         },
         {
          "id": "G21.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G21.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G3",
      "wortlaut": "Fanden in den letzten 5 Jahren ambulante Operationen statt?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G3.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        }
       },
       {
        "id": "G3.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        }
       },
       {
        "id": "G3.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        }
       },
       {
        "id": "G3.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        }
       },
       {
        "id": "G3.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        }
       },
       {
        "id": "G3.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G3.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G3.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G3.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G3",
         "antwort": "true"
        }
       },
       {
        "id": "G3.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G3.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G3.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          }
         },
         {
          "id": "G3.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          }
         },
         {
          "id": "G3.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          }
         },
         {
          "id": "G3.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          }
         },
         {
          "id": "G3.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          }
         },
         {
          "id": "G3.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G3.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G3.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G3.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G3.1",
           "antwort": "true"
          }
         },
         {
          "id": "G3.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G3.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     },
     {
      "id": "G35",
      "wortlaut": "Besteht oder bestand in den letzten 10 Jahren eine Suchterkrankung (z.B. Alkohol-, Drogen-, Medikamentenabhängigkeit) oder Essstörung?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "G35.C",
        "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        }
       },
       {
        "id": "G35.D",
        "wortlaut": "Von wann",
        "art": "Datum",
        "pflicht": true,
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        }
       },
       {
        "id": "G35.E",
        "wortlaut": "Bis wann",
        "art": "Datum",
        "pflicht": false,
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        }
       },
       {
        "id": "G35.F",
        "wortlaut": "Operation?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        }
       },
       {
        "id": "G35.G",
        "wortlaut": "Arbeitsunfähigkeitstage gesamt",
        "art": "Zahl",
        "pflicht": true,
        "fehlertext": "Arbeitsunfähigkeitstage gesamt",
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        }
       },
       {
        "id": "G35.H",
        "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        },
        "folgefragen": [
         {
          "id": "G35.J",
          "wortlaut": "Seit (Monat/Jahr)",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G35.H",
           "antwort": "true"
          }
         }
        ]
       },
       {
        "id": "G35.K",
        "wortlaut": "Name und Anschrift des behandelnden Arztes",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "G35",
         "antwort": "true"
        }
       },
       {
        "id": "G35.1",
        "wortlaut": "Weitere Angaben",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "true",
          "anzeige": "Ja"
         },
         {
          "wert": "false",
          "anzeige": "Nein"
         }
        ],
        "bedingung": {
         "frage": "G35.C",
         "antwort": ""
        },
        "folgefragen": [
         {
          "id": "G35.C.1",
          "wortlaut": "Art der Erkrankung, Beschwerden, Gesundheitsstörung, Behandlung, Untersuchung, Kur etc., Art der körperlichen, seelischen bzw. psychischen Störung, Arzneimitteleinnahme und Dosierung",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          }
         },
         {
          "id": "G35.D.1",
          "wortlaut": "Von wann",
          "art": "Datum",
          "pflicht": true,
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          }
         },
         {
          "id": "G35.E.1",
          "wortlaut": "Bis wann",
          "art": "Datum",
          "pflicht": false,
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          }
         },
         {
          "id": "G35.F.1",
          "wortlaut": "Operation?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          }
         },
         {
          "id": "G35.G.1",
          "wortlaut": "Arbeitsunfähigkeitstage gesamt",
          "art": "Zahl",
          "pflicht": true,
          "fehlertext": "Arbeitsunfähigkeitstage gesamt",
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          }
         },
         {
          "id": "G35.H.1",
          "wortlaut": "Sind Sie behandlungs- und beschwerdefrei und liegt Ausheilung vor?",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          },
          "folgefragen": [
           {
            "id": "G35.J.1",
            "wortlaut": "Seit (Monat/Jahr)",
            "art": "Datum",
            "pflicht": true,
            "bedingung": {
             "frage": "G35.H.1",
             "antwort": "true"
            }
           }
          ]
         },
         {
          "id": "G35.K.1",
          "wortlaut": "Name und Anschrift des behandelnden Arztes",
          "art": "Text",
          "pflicht": true,
          "bedingung": {
           "frage": "G35.1",
           "antwort": "true"
          }
         },
         {
          "id": "G35.2",
          "wortlaut": "Weitere Angaben",
          "art": "Auswahl (Radio)",
          "pflicht": true,
          "werte": [
           {
            "wert": "true",
            "anzeige": "Ja"
           },
           {
            "wert": "false",
            "anzeige": "Nein"
           }
          ],
          "bedingung": {
           "frage": "G35.C.1",
           "antwort": ""
          }
         }
        ]
       }
      ]
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 6,
    "titel": "Beratung und Beratungsverzicht",
    "quelle": "selbst gesehen (Text aus dem Programmcode der Seite, nicht vom Server)",
    "gesehen": true,
    "felder": [
     {
      "id": "hinweis_beratung",
      "wortlaut": "Beratung: Möchten Sie sich beraten lassen? Gerne beraten wir Sie online, telefonisch oder persönlich. Sie erreichen uns unter diesen Kontaktdaten",
      "art": "Hinweistext",
      "link": "„diesen Kontaktdaten“ öffnet den Kontaktkasten (Daten aus contactInformation)"
     },
     {
      "id": "avoidAdvice",
      "wortlaut": "Beratungsverzicht: Im Zuge des Onlineantrages verzichte ich auf die angebotene fachliche Beratung und deren Dokumentation. Mir ist bewusst, welche Bedeutung einer Beratung in Versicherungsfragen zukommt und, dass sich der Verzicht nachteilig darauf auswirken kann, zu einem späteren Zeitpunkt Schadensersatzansprüche gegen den Versicherer geltend zu machen.",
      "art": "Ankreuzfeld „Zugestimmt“",
      "pflicht": true,
      "fehlertext": "Bitte dem Beratungsverzicht zustimmen!"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 7,
    "titel": "Antragsdaten: Anschrift, Kontakt, Bankverbindung, SEPA",
    "quelle": "Felder selbst gesehen, Bankfelder nicht ausgefüllt",
    "gesehen": true,
    "felder": [
     {
      "id": "orderStreet",
      "wortlaut": "Straße:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderHouseNumber",
      "wortlaut": "Hausnr.:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderZip",
      "wortlaut": "PLZ:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderCity",
      "wortlaut": "Ort:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderLand",
      "wortlaut": "Land:",
      "art": "Text",
      "pflicht": true,
      "nur_lesen": true
     },
     {
      "id": "eMail",
      "wortlaut": "E-Mail:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "mobilNumber",
      "wortlaut": "Mobil:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderIbanName",
      "wortlaut": "Bankverbindung Kontoinhaber(in):",
      "art": "Text",
      "pflicht": true,
      "hilfetext": "Hinweis: Die Person, die den Vertrag abschließt, muss auch der Kontoinhaber sein!",
      "nur_lesen": true
     },
     {
      "id": "orderIban",
      "wortlaut": "Bankverbindung IBAN:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderBankName",
      "wortlaut": "Bankname:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "sepaMandatConfirmation",
      "wortlaut": "SEPA-Lastschriftmandat Durch das SEPA-Lastschriftmandat erteilen Sie sowohl der SDK-Krankenversicherung als auch Ihrem Kreditinstitut die Zustimmung, Zahlungen vom oben angegebenen Konto einzuziehen bzw. einzulösen. Die SDK Krankenversicherung wird spätestens 5 Kalendertage vor Fälligkeit der Zahlung den Lastschrifteinzug ankündigen. Bei wiederkehrenden Lastschriften mit gleichen bzw. feststehenden Lastschriftbeträgen genügt eine einmalige Unterrichtung vor dem ersten Lastschrifteinzug und die Angabe der Fälligkeitstermine. Innerhalb von 8 Wochen beginnend mit dem Belastungsdatum, können Sie die Erstattung des belasteten Betrags verlangen. Es gelten dabei die mit Ihrem Kreditinstitut vereinbarten Bedingungen. Die Gläubiger-Identifikationsnummer der SDK lautet: DE62SDK00000062000 Hiermit erteile ich das SEPA-Mandat für das Lastschriftverfahren und bestätige, dass ich berechtigt bin, über das genannte Konto auch alleine zu verfügen.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     }
    ],
    "hinweise": [
     "orderLand ist mit „Deutschland“ vorbelegt und gesperrt.",
     "orderIbanName (Kontoinhaber) wird aus Vor- und Nachname gebildet und ist gesperrt.",
     "orderBankName ist trotz readonly-Kennung bearbeitbar (Code nimmt es ausdrücklich aus).",
     "IBAN-Prüfung im Code zusätzlich mit Länderlänge und Prüfziffer (Modulo 97)."
    ],
    "regel": null
   },
   {
    "schritt": 8,
    "titel": "Zusammenfassung (Stepper „Zusammenfassung“)",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen (erscheint erst nach vollständigen Bankdaten, Status ORDER_DATA_COMPLETED / ORDER_WAITING_SUBMIT)",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Bitte überprüfen Sie die nachfolgenden von Ihnen gemachten Angaben auf Vollständigkeit und Korrektheit.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Ihre gemachten Angaben:",
      "art": "Liste aller Antworten (nur lesen)"
     },
     {
      "wortlaut": "IGBCE Gewerkschaftsmitgliedsnummer:",
      "art": "Text",
      "bedingung": "nur wenn Link-Parameter askForGewerkschaft=true"
     },
     {
      "wortlaut": "Hinweis: Wenn Sie kostenpflichtig beantragen, erhalten Sie einen Versicherungsantrag / einen Antrag / eine Versicherungsbestätigung als PDF zum Speichern oder Ausdrucken. Der Versicherer speichert Ihre Antragsunterlagen ab.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "KOSTENPFLICHTIG BEANTRAGEN",
      "art": "Knopf (öffnet Bestätigungsdialog)"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 9,
    "titel": "Bestätigungsdialog",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Kostenpflichtig Beantragen",
      "art": "Überschrift"
     },
     {
      "wortlaut": "Hiermit bestätige ich, dass alle gemachten Angaben korrekt und vollständig sind. Mir ist bewusst, dass durch einen Klick auf „Kostenpflichtig Beantragen“ ein verbindlicher Antrag beim Versicherer eingereicht wird.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Beantragung abbrechen",
      "art": "Knopf"
     },
     {
      "wortlaut": "KOSTENPFLICHTIG BEANTRAGEN",
      "art": "Knopf"
     },
     {
      "wortlaut": "Leichte Sprache (Barrierefreiheitsmodus): „Ich bestätige: Alles, was ich in meinem Antrag und zu meiner Gesundheit gesagt habe, stimmt. Es ist alles richtig und nichts fehlt.“ / „Ich bin einverstanden: Mein Antrag wird per Computer an die SDK Krankenversicherung geschickt. Der Antrag ist verbindlich. Das heißt, ich muss das dann so machen.“ / „Ich weiß, dass für mich Kosten entstehen, wenn die Versicherung meinen Antrag annimmt. Die Kosten sind der Versicherungs-Beitrag, der einmal in jedem Monat zu bezahlen ist.“",
      "art": "Hinweistexte"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 10,
    "titel": "Ergebnisseite",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Vielen Dank für das Vertrauen / Der Antrag ist erfolgreich beim Versicherer eingegangen.",
      "art": "Hinweistext",
      "bedingung": "alle Tarife Status ORDER_ACCEPTED"
     },
     {
      "wortlaut": "Der Versicherer hat Ihren verbindlichen Antrag mit der Antragsnummer <referenceId> erhalten.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Ihre Dokumente: <Name> · Dokument herunterladen",
      "art": "Liste mit Knöpfen"
     },
     {
      "wortlaut": "Beim Abschluss des Vertrages ist es zu einem Fehler gekommen / Bitte die Angaben überprüfen und erneut versenden.",
      "art": "Hinweistext",
      "bedingung": "Fehlerfall"
     },
     {
      "wortlaut": "Für Rückfragen bitte kontaktieren: <Kontakt aus contactInformation> <remarks>",
      "art": "Kontaktkasten"
     }
    ],
    "hinweise": null,
    "regel": null
   }
  ]
 },
 "sdkAmbulant": {
  "link": "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant&agentId1=901334&agentId2=&insurers=36&tariffs=SDKAP1%40&customValues=e30%3D&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDQwODk3NTU3MDUiLCJlbWFpbCI6ImluZm9AaGVhbGlvLmRlIn0%3D&remarks=IkJlaSBSw7xja2ZyYWdlbiBzaW5kIHdpciBnZXJuZSBmw7xyIFNpZSBkYS4i&defaultContact=false&employeeInsurance=NOT_BKV",
  "abweichungen": [
   {
    "bereich": "Aufbau Frage 1a",
    "regelwerk": "eine Ja/Nein-Frage 1a, bei „ja“ Ankreuzliste der 15 Erkrankungen (je Kreuz 40 %)",
    "strecke": "15 einzelne Ja/Nein-Fragen (G42 bis G53) unter der Überschrift G40, jede Pflicht",
    "wirkung_gleich": true,
    "beleg": "G42+G43 = Ja ergibt +80 % (39,19 -> 70,54)"
   },
   {
    "bereich": "BMI-Zuschlag Grenzen",
    "regelwerk": "abschneiden auf ganze Zahl (unter 17 / unter 30 / unter 36)",
    "strecke": "auf eine Nachkommastelle runden: unter 17,0 = 20 %, 17,0 bis 29,9 = 0 %, 30,0 bis 35,9 = 20 %, ab 36,0 = 40 %",
    "beleg": "191/62 (16,995) 0 %; 189/107 (29,954) 20 %; 170/104 (35,986) 40 %"
   },
   {
    "bereich": "Wortlaut G40 (Frage 1)",
    "regelwerk": "… (auch Kontrolluntersuchungen aufgrund Vorerkrankungen) …",
    "strecke": "… (auch Kontrollunter-suchungen aufgrund Vorerkrankungen) …",
    "art": "Trennstrich im Wort"
   },
   {
    "bereich": "Wortlaut G43",
    "regelwerk": "Amyotrophe Lateralsklerose (ALS), …",
    "strecke": "Amyothrophe Lateralsklerose (ALS), progressive Muskelatrophie, Bulbärparalyse",
    "art": "Schreibweise (Strecke mit h)"
   },
   {
    "bereich": "Wortlaut G48",
    "regelwerk": "Hörschädigung/​Schwerhörigkeit (exkl. akuter Hörsturz) (mit unsichtbarem Trennzeichen und Leerzeichen)",
    "strecke": "Hörschädigung/Schwerhörigkeit(exkl. akuter Hörsturz)",
    "art": "Leerzeichen vor Klammer fehlt in der Strecke"
   },
   {
    "bereich": "Wortlaut G62 (1j)",
    "regelwerk": "Chronische Erkrankungen der Nebenhöhlen (Abzess, …",
    "strecke": "Chronische Erkrankungen der Nebenhöhlen (Abszess, …",
    "art": "Schreibweise (Regelwerk „Abzess“)"
   },
   {
    "bereich": "Frage 2",
    "regelwerk": "FRAGE_2_TEXT „Körpergröße und Körpergewicht“, Grenzen 120 bis 230 cm, 30 bis 300 kg",
    "strecke": "zwei Zahlenfelder „Körpergröße cm“ und „Körpergewicht kg“ am Ende der Seite; keine Grenzen im Fragebogen; Kommazahlen beim Gewicht (z. B. 85.3) ließen WEITER nicht zu"
   },
   {
    "bereich": "Vorspann",
    "regelwerk": "SDK_VORSPANN_ABSAETZE aus Papierantrag 1.770aai (u. a. Zuschlagserklärung „Wird mindestens eine Frage von 1a) bis 1k) mit „ja“ beantwortet …“)",
    "strecke": "kein solcher Vorspann; stattdessen auf dem Erklärungsschritt saveConfirmationtext „Bitte beantworten Sie die Fragen wahrheitsgemäß und vollständig. Die Verletzung der vorvertraglichen Anzeigepflicht … den Wichtigen Informationen für den Antragssteller.“ mit Link https://www.sdk.de/downloads/online-absatz/0.155a.pdf"
   },
   {
    "bereich": "Mitteilung § 19 Abs. 5 VVG",
    "regelwerk": "VVG_19_PLATZHALTER",
    "strecke": "Link „Wichtigen Informationen für den Antragssteller“ = https://www.sdk.de/downloads/online-absatz/0.155a.pdf, dazu Pflicht-Download „Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26“"
   },
   {
    "bereich": "Beratungsverzicht SDK",
    "regelwerk": "TEXT_9_SDK_PLATZHALTER",
    "strecke": "Wortlaut jetzt bekannt (siehe schritte, avoidAdvice), eigener Schritt nach den Gesundheitsfragen"
   },
   {
    "bereich": "Schweigepflichtentbindung",
    "regelwerk": "SDK_SCHWEIGEPFLICHT_PLATZHALTER mit Wahl Möglichkeit I / II",
    "strecke": "keine Wahl; ein Pflichthaken declarationOfConsentAndReleaseFromConfidentiality („Ich bestätige als Antragsteller, dass ich und alle … vorbehaltlos einverstanden sind …“)"
   },
   {
    "bereich": "Bonitätseinwilligung",
    "regelwerk": "SDK_BONITAET (Papierantrag)",
    "strecke": "nicht vorhanden"
   },
   {
    "bereich": "Werbeeinwilligung",
    "regelwerk": "nicht vorhanden",
    "strecke": "declarationOfConsentAdvertising Ja/Nein, Pflicht (Antwort freiwillig, aber zu wählen)"
   },
   {
    "bereich": "Schlusserklärung",
    "regelwerk": "SDK_SCHLUSSERKLAERUNG (Papierantrag, 2 Absätze)",
    "strecke": "keine; statt dessen declarationOfConsentTermsOfContract („Ich habe die Allgemeinen Vertragsunterlagen … Ich stimme zu, dass der Versicherungsschutz ggf. schon vor Ablauf der Widerrufsfrist beginnt.“) und vor dem Absenden der Bestätigungsdialog (aus dem Code)"
   },
   {
    "bereich": "SEPA",
    "regelwerk": "SDK_SEPA_MANDAT aus Papierantrag („Ich ermächtige / Wir ermächtigen Sie …“, Empfänger, Mandatsreferenz)",
    "strecke": "anderer Wortlaut: „SEPA-Lastschriftmandat Durch das SEPA-Lastschriftmandat erteilen Sie sowohl der SDK-Krankenversicherung …“ (siehe schritte), Pflichthaken „Zugestimmt“; Gläubiger-ID gleich DE62SDK00000062000"
   },
   {
    "bereich": "GKV-Bestätigung",
    "regelwerk": "GKV_BESTAETIGUNG „Ich bin gesetzlich krankenversichert (auch familienversichert) und wohne in Deutschland.“",
    "strecke": "acknowledge auf Schritt 2 mit Datenverwendung kombiniert (Wortlaut siehe schritte); Wohnsitz Deutschland nur als Infotext beim Land"
   },
   {
    "bereich": "Unterlagen",
    "regelwerk": "UNTERLAGEN_SDK (6 allgemeine Namen, PDFs folgen)",
    "strecke": "5 Pflicht-Downloads: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22 · Informationsblatt_Gesundheitsfragen_Beitragstabelle_AP_1.671d_10.26 · AP5, AP7, AP9, AP1 der amb. ZV_1.753a_01.23 · Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26 · 1.671e_Gesetzliche_Kundeninformation_AP_10.26"
   },
   {
    "bereich": "Zahlweise",
    "regelwerk": "Monatlich / Jährlich (1 % Skonto)",
    "strecke": "keine Zahlweise-Auswahl gesehen; Beiträge nur „EUR / Monat“"
   },
   {
    "bereich": "Anrede",
    "regelwerk": "Frau / Herr / Divers",
    "strecke": "nur Männlich / Weiblich (Startseite), gender 1/2 an den Server"
   },
   {
    "bereich": "Versicherungsnehmer",
    "regelwerk": "nicht abgefragt",
    "strecke": "policyHolderIsEqualInsuredPerson mit „Ja“ vorbelegt und gesperrt"
   },
   {
    "bereich": "Versicherungsbeginn",
    "regelwerk": "nächster Monatserster plus 6 weitere Monate (BEGINN_MONATE_NACH_NAECHSTMOEGLICH = 6)",
    "strecke": "bis zum 15. auch der laufende Monatserste (12.11.2026: 01.11.2026 zulässig), sonst nächster Monatserster, plus höchstens 5 weitere Monate (01.05.2027 zulässig, 01.06.2027 gesperrt); nur Monatserste"
   },
   {
    "bereich": "Kontaktdaten",
    "regelwerk": "–",
    "strecke": "Pflicht: Straße, Hausnr. (Regex), PLZ (Regex, nicht 01000/99999), Ort, E-Mail (Regex), Mobil (Regex, deutsche Nummer), IBAN (Regex + Prüfziffer im Code), Bankname, SEPA-Haken"
   }
  ],
  "schritte": [
   {
    "schritt": 1,
    "titel": "Beitrag (Startseite, Stepper „Beitrag“)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "beginn",
      "wortlaut": "Beginn der Versicherung",
      "art": "Datum TT.MM.JJJJ",
      "pflicht": true,
      "vorbelegt": "01.12.2026 (am 12.11.2026, nächster Monatserster)"
     },
     {
      "id": "geburtsdatum",
      "wortlaut": "Persönliche Daten der zu versichernden Person / Geburtsdatum",
      "art": "Datum TT.MM.JJJJ",
      "pflicht": true
     },
     {
      "id": "geschlecht",
      "wortlaut": "Geschlecht",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "MALE",
        "anzeige": "Männlich"
       },
       {
        "wert": "FEMALE",
        "anzeige": "Weiblich"
       }
      ]
     },
     {
      "id": "tarife_anzeigen",
      "wortlaut": "TARIFE ANZEIGEN",
      "art": "Knopf"
     },
     {
      "id": "tarifwahl",
      "wortlaut": "Tarif ankreuzen (Karte „Süddeutsche Krankenversicherung AG / <Tarifname> / <Beitrag> EUR / Monat“)",
      "art": "Ankreuzfeld je Tarif",
      "pflicht": true
     },
     {
      "id": "summe",
      "wortlaut": "Beitrag ausgewählte(r) Tarif(e): <x> EUR / Monat · Beitrag Person 1: <x> EUR / Monat",
      "art": "Anzeige"
     },
     {
      "id": "beantragung_starten",
      "wortlaut": "BEANTRAGUNG STARTEN",
      "art": "Knopf"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 2,
    "titel": "Persönliche Daten (Stepper „Antragsdaten“)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "Gender Radio",
      "wortlaut": "Männlich / Weiblich",
      "art": "Auswahl (Radio)",
      "nur_lesen": true
     },
     {
      "id": "firstName",
      "wortlaut": "Vorname",
      "art": "Text",
      "pflicht": true,
      "fehlertext": "Eingabe erforderlich."
     },
     {
      "id": "lastName",
      "wortlaut": "Nachname",
      "art": "Text",
      "pflicht": true,
      "fehlertext": "Eingabe erforderlich."
     },
     {
      "id": "geburtsdatum",
      "wortlaut": "Geburtsdatum",
      "art": "Datum",
      "nur_lesen": true
     },
     {
      "id": "acknowledge",
      "wortlaut": "Ich bestätige, die \"Informationen zur Verwendung Ihrer Daten\" gelesen zu haben und erkläre mich damit einverstanden und bestätige, dass ich bei einem Träger der gesetzlichen Krankenversicherung (GKV) versichert bin bzw. dort ein Anspruch auf Familienversicherung besteht oder Anspruch auf freie Heilfürsorge besteht.",
      "art": "Ankreuzfeld",
      "pflicht": true,
      "fehlertext": "Bitte bestätigen.",
      "link": {
       "text": "\"Informationen zur Verwendung Ihrer Daten\"",
       "url": "https://www.sdk.de/downloads/Datenschutz-Compliance/0.024e-Informationen-zur-Verwendung-Ihrer-Daten.pdf"
      }
     },
     {
      "id": "beantragung_starten",
      "wortlaut": "BEANTRAGUNG STARTEN",
      "art": "Knopf"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 3,
    "titel": "Ihre Vertragsunterlagen",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "labelDocuments",
      "wortlaut": "Ihre Vertragsunterlagen Speichern Sie bitte vor dem Online-Abschluss die Allgemeinen Vertragsunterlagen (Verbraucherinformationen, Widerrufsbelehrung und weitere Hinweise), die Tarifunterlagen (Allgemeine Versicherungsbedingungen und Produktinformationsblatt), die Übersicht der Gesundheitsfragen und der Angaben zum Versicherungsstatus, sowie die Einwilligungs-und Schweigepflichtentbindungserklärung (Datenschutzrechtliche Einwilligungserklärung zu Ihren Gesundheitsdaten und sonstigen nach § 203 StGB geschützten Daten) oder drucken Sie diese aus. Diese Unterlagen sind - neben dem Antrag, dem Versicherungsschein und etwaigen Nachträgen - Grundlage Ihres Versicherungsvertrags.",
      "art": "Hinweistext",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "downloadLnDocument_12289",
      "wortlaut": "AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 12289,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/AVB/AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22.pdf"
      }
     },
     {
      "id": "downloadLnDocument_15447",
      "wortlaut": "Tarifbedingungen: Informationsblatt_Gesundheitsfragen_Beitragstabelle_AP_1.671d_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 15447,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/Informationsblatt_Gesundheitsfragen_Beitragstabelle_AP_1.671d_10.26.pdf"
      }
     },
     {
      "id": "downloadLnDocument_13158",
      "wortlaut": "Tarifbedingungen: AP5, AP7, AP9, AP1 der amb. ZV_1.753a_01.23",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 13158,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/AP5, AP7, AP9, AP1 der amb. ZV_1.753a_01.23.pdf"
      }
     },
     {
      "id": "downloadLnDocument_15445",
      "wortlaut": "Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 15445,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26.pdf"
      }
     },
     {
      "id": "downloadLnDocument_15733",
      "wortlaut": "Tarifbedingungen: 1.671e_Gesetzliche_Kundeninformation_AP_10.26",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Datei herunterladen... "
       }
      ],
      "fehlertext": "Laden Sie die Datei bitte runter!",
      "dokument": {
       "id": 15733,
       "pfad": "Versicherer/Süddeutsche SDK/Bedingungen/TB/1.671e_Gesetzliche_Kundeninformation_AP_10.26.pdf"
      }
     },
     {
      "id": "lnTaaDownloadDocuments",
      "wortlaut": "",
      "art": "Zahl",
      "pflicht": false
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 4,
    "titel": "Erklärungen",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "firstName",
      "wortlaut": "Vorname:",
      "art": "Text",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "familyName",
      "wortlaut": "Nachname:",
      "art": "Text",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "policyHolderIsEqualInsuredPerson",
      "wortlaut": "Ist die versicherte Person auch der Inhaber der Versicherung (Versicherungsnehmer)?:",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "policyHolderGender",
        "wortlaut": "Anrede (VN):",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "2",
          "anzeige": "Frau"
         },
         {
          "wert": "1",
          "anzeige": "Herr"
         }
        ],
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderFirstName",
        "wortlaut": "Vorname (VN):",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderFamilyName",
        "wortlaut": "Nachname (VN):",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderBirthday",
        "wortlaut": "Geburtsdatum (VN):",
        "art": "Datum",
        "pflicht": true,
        "fehlertext": "Geben Sie hier das Geburtsdatum des Versicherungsnehmers im Format TT.MM.JJJJ (z.B.: 28.02.1971) ein oder wählen Sie ein Datum durch Klicken auf das Kalendarsymbol aus."
       }
      ]
     },
     {
      "id": "saveConfirmationtext",
      "wortlaut": "Bitte beantworten Sie die Fragen wahrheitsgemäß und vollständig. Die Verletzung der vorvertraglichen Anzeigepflicht kann den Versicherer berechtigen, je nach Verschulden vom Vertrag zurückzutreten, ihn zu kündigen oder anzupassen, was zur Leistungsfreiheit des Versicherers (auch für bereits eingetretene Versicherungsfälle) führen kann. Ausführliche Hinweise zu den Anzeigepflichten und zu den Folgen einer Anzeigepflichtverletzung entnehmen Sie bitte den Wichtigen Informationen für den Antragssteller.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "declarationOfConsentTermsOfContract",
      "wortlaut": "Ich habe die Allgemeinen Vertragsunterlagen und die Tarifunterlagen gelesen, abgespeichert bzw. ausdruckt und erkläre mich mit den Vertragsbedingungen einverstanden. Ich stimme zu, dass der Versicherungsschutz ggf. schon vor Ablauf der Widerrufsfrist beginnt.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "declarationOfConsentAndReleaseFromConfidentiality",
      "wortlaut": "Ich bestätige als Antragsteller, dass ich und alle in diesem Vertrag zu versichernden Personen sämtliche in der „Datenschutz- und Schweigepflichtentbindungserklärung” enthaltenen Einwilligungs- und Schweigepflichtentbindungserklärungen, einschließlich des Hinweises diese nicht abzugeben oder jederzeit später mit Wirkung für die Zukunft zu widerrufen, vollständig gelesen habe und mit diesen Erklärungen vorbehaltlos einverstanden sind. Soweit versicherten Personen die erforderliche Einsichtsfähigkeit fehlt (insbesondere, wenn Sie das 16. Lebensjahr noch nicht vollendet haben) bestätige ich, dass für diese deren gesetzliche Vertreter die entsprechenden Einwilligungs- und Schweigepflichtentbindungserklärungen abgegeben haben. Die Erklärungen werden zum Inhalt des Antrags.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "declarationOfConsentAdvertising",
      "wortlaut": "Ich bin damit einverstanden, von meinem Versicherer der SDK-Versicherungsgruppe oder einem von meinem Versicherer hierzu beauftragtem Unternehmen zu Versicherungsprodukten der SDK-Versicherungsgruppe sowie zum Angebot von kooperierenden gesetzlichen Krankenversicherungen, per Telefon, Post, E-Mail oder Social Media, informiert zu werden. Hierzu willige ich ein, dass der Außendienst der SDK sowie die von meinem Versicherer beauftragten Unternehmen über diesen Versicherungsvertrag in Kenntnis gesetzt werden und meine nach § 203 StGB geschützten Daten an diese zu Beratungszwecken und zur Produktinformation übermittelt werden und entbinde die Mitarbeiter der SDK insoweit von ihrer Schweigepflicht. Diese Einwilligung kann ich jederzeit - ohne Einfluss auf das Vertragsverhältnis - widerrufen.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "confirmDataProtection",
      "wortlaut": "Bestätigung zum Datenschutz:",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ],
      "fehlertext": "Bitte die Bestätigung zum Datenschutz zustimmen!",
      "hilfetext": "Innerhalb dieses Onlineangebots der ObjectiveIT GmbH besteht die Möglichkeit zur Eingabe personenbezogener Daten (z.B. Namen, Anschrift etc.) Hiermit versichere ich, dass mit der von der Datenverarbeitung betroffenen Person ein wirksam abgeschlossener Vermittlervertrag vorliegt. Liegt ein solcher Vermittlervertrag nicht vor, versichere ich, dass die von der Datenverarbeitung betroffene Person, in die Speicherung, Nutzung und Verwendung ihrer personenbezogenen Daten vollumfänglich wirksam einwilligt hat. Ich versichere zudem, dass mir eine wirksame Einwilligung für die Nutzung der Daten für sonstige Finanzdienstleistungen vorliegt. Die personenbezogenen Daten werden auf den von ObjectiveIT GmbH zur Nutzung zur Verfügung gestellten Systemen nach den gesetzlichen Vorschriften verarbeitet und nach praktizierten Standards gesichert. Ich erkläre mich mit den hier genannten Bestimmungen einverstanden."
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 5,
    "titel": "Gesundheitsfragen",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "G40",
      "wortlaut": "Werden oder wurden in den letzten 3 Jahren Beratungen, Behandlungen oder Untersuchungen (auch Kontrollunter-suchungen aufgrund Vorerkrankungen) hinsichtlich einer der nachfolgend aufgeführten Erkrankungen durch Ärzte, Heilpraktiker oder sonstigen Therapeuten durchgeführt bzw. sind solche angeraten oder beabsichtigt?",
      "art": "Hinweistext",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "G42",
      "wortlaut": "AIDS/HIV Infektion, Hepatitis B/C",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G43",
      "wortlaut": "Amyothrophe Lateralsklerose (ALS), progressive Muskelatrophie, Bulbärparalyse",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G43A",
      "wortlaut": "Weichteilrheumatismus",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G43B",
      "wortlaut": "Chorea Huntington",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G44",
      "wortlaut": "Chronische Niereninsuffizienz bzw. Nierenentzündung",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G45",
      "wortlaut": "Colitis ulcerosa, Morbus Crohn",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G46",
      "wortlaut": "Diabetes mellitus",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G47",
      "wortlaut": "Fehlende Gliedmaßen",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G47A",
      "wortlaut": "Fertilitätsstörungen",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G48",
      "wortlaut": "Hörschädigung/Schwerhörigkeit(exkl. akuter Hörsturz)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G49",
      "wortlaut": "Krebserkrankungen",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G50",
      "wortlaut": "Lungenemphysem, Mukoviszidose",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G50A",
      "wortlaut": "Lymphödem",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G51",
      "wortlaut": "Multiple Sklerose (MS)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G53",
      "wortlaut": "Osteoporose",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G54",
      "wortlaut": "Atemwegserkrankungen (Asthma, Bronchiektasen, chronische Bronchitis, chronisch obstruktive Lungenerkrankung (COPD)) und Allergien (Heuschnupfen, Hausstaubmilbenallergie, Tierhaarallergie)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G55",
      "wortlaut": "Psychische Erkrankungen (Alkohol-, Drogen- und Medikamentenabhängigkeit, Angststörungen, Depressionen, Entwicklungsstörungen, Erschöpfungssyndrom, Schlafstörungen, Zwangsstörungen)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G56",
      "wortlaut": "Erkrankungen des Herzens und des Kreislaufsystems (Arteriosklerose, Bluthochdruck, Herzinfarkt, Herzinsuffizienz, Herzrhythmusstörungen, Hirnblutungen, Schlaganfall)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G57",
      "wortlaut": "Erkrankungen der Muskeln, der Sehnen, der Nerven, der Gelenke und der Wirbelsäule (Arthritis, Arthrose, Bandscheibenvorfall/-prolaps, Bursitis, Chondromalazie, Dystonie, Epicondylitis, Gelenksteife, Impingement-Syndrom, Knorpelschäden, Kyphose, Lordose, Morbus Bechterew, Muskelschwäche, Muskelverspannungen, Neuralgie, Osteochondrose, Parese, Parkinson-Syndrom, Plegie, Polyneuropathie, Skoliose, Spinalstenose, Spondylose, Tendinitis)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G58",
      "wortlaut": "Erkrankungen des Magens, der Speiseröhre und des Darms (Magenschleimhautentzündung, Magengeschwür, Darmdivertikel, Refluxkrankheit (Sodbrennen), Reizmagen, Reizdarm)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G59",
      "wortlaut": "Erkrankungen der Haut (Akne, Dermatitis, Ekzem, Neurodermitis, Schuppenflechte, Parästhesie der Haut) und Pilzerkrankungen (Fuß-, Haut-, Nagelpilz)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G60",
      "wortlaut": "Stoffwechselerkrankungen (Schilddrüsenunter/-überfunktion, Fettstoffwechselstörung, Hyperurikämie) und Mangelerscheinungen (Vitamin- und Eisenmangel)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G61",
      "wortlaut": "Kopfschmerzen (nicht durch eine andere Krankheit verursacht), Migräne",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G62",
      "wortlaut": "Chronische Erkrankungen der Nebenhöhlen (Abszess, chronische Sinusitis, Furunkel, Hypertrophie der Nasenmuscheln, Karbunkel, Mukozele der Nase oder Nasennebenhöhle, Nasenpolypen, Zyste)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G63",
      "wortlaut": "Chronischer Schwindel, Hörsturz, Morbus Menière, Gleichgewichtsstörungen, Tinnitus",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "G0A",
      "wortlaut": "Körpergröße cm",
      "art": "Zahl",
      "pflicht": true,
      "fehlertext": "Körpergröße cm"
     },
     {
      "id": "G0B",
      "wortlaut": "Körpergewicht kg",
      "art": "Zahl",
      "pflicht": true,
      "fehlertext": "Körpergewicht kg"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 6,
    "titel": "Beratung und Beratungsverzicht",
    "quelle": "selbst gesehen (Text aus dem Programmcode der Seite, nicht vom Server)",
    "gesehen": true,
    "felder": [
     {
      "id": "hinweis_beratung",
      "wortlaut": "Beratung: Möchten Sie sich beraten lassen? Gerne beraten wir Sie online, telefonisch oder persönlich. Sie erreichen uns unter diesen Kontaktdaten",
      "art": "Hinweistext",
      "link": "„diesen Kontaktdaten“ öffnet den Kontaktkasten (Daten aus contactInformation)"
     },
     {
      "id": "avoidAdvice",
      "wortlaut": "Beratungsverzicht: Im Zuge des Onlineantrages verzichte ich auf die angebotene fachliche Beratung und deren Dokumentation. Mir ist bewusst, welche Bedeutung einer Beratung in Versicherungsfragen zukommt und, dass sich der Verzicht nachteilig darauf auswirken kann, zu einem späteren Zeitpunkt Schadensersatzansprüche gegen den Versicherer geltend zu machen.",
      "art": "Ankreuzfeld „Zugestimmt“",
      "pflicht": true,
      "fehlertext": "Bitte dem Beratungsverzicht zustimmen!"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 7,
    "titel": "Antragsdaten: Anschrift, Kontakt, Bankverbindung, SEPA",
    "quelle": "Felder selbst gesehen, Bankfelder nicht ausgefüllt",
    "gesehen": true,
    "felder": [
     {
      "id": "orderStreet",
      "wortlaut": "Straße:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderHouseNumber",
      "wortlaut": "Hausnr.:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderZip",
      "wortlaut": "PLZ:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderCity",
      "wortlaut": "Ort:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderLand",
      "wortlaut": "Land:",
      "art": "Text",
      "pflicht": true,
      "nur_lesen": true
     },
     {
      "id": "eMail",
      "wortlaut": "E-Mail:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "mobilNumber",
      "wortlaut": "Mobil:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderIbanName",
      "wortlaut": "Bankverbindung Kontoinhaber(in):",
      "art": "Text",
      "pflicht": true,
      "hilfetext": "Hinweis: Die Person, die den Vertrag abschließt, muss auch der Kontoinhaber sein!",
      "nur_lesen": true
     },
     {
      "id": "orderIban",
      "wortlaut": "Bankverbindung IBAN:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderBankName",
      "wortlaut": "Bankname:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "sepaMandatConfirmation",
      "wortlaut": "SEPA-Lastschriftmandat Durch das SEPA-Lastschriftmandat erteilen Sie sowohl der SDK-Krankenversicherung als auch Ihrem Kreditinstitut die Zustimmung, Zahlungen vom oben angegebenen Konto einzuziehen bzw. einzulösen. Die SDK Krankenversicherung wird spätestens 5 Kalendertage vor Fälligkeit der Zahlung den Lastschrifteinzug ankündigen. Bei wiederkehrenden Lastschriften mit gleichen bzw. feststehenden Lastschriftbeträgen genügt eine einmalige Unterrichtung vor dem ersten Lastschrifteinzug und die Angabe der Fälligkeitstermine. Innerhalb von 8 Wochen beginnend mit dem Belastungsdatum, können Sie die Erstattung des belasteten Betrags verlangen. Es gelten dabei die mit Ihrem Kreditinstitut vereinbarten Bedingungen. Die Gläubiger-Identifikationsnummer der SDK lautet: DE62SDK00000062000 Hiermit erteile ich das SEPA-Mandat für das Lastschriftverfahren und bestätige, dass ich berechtigt bin, über das genannte Konto auch alleine zu verfügen.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 8,
    "titel": "Zusammenfassung (Stepper „Zusammenfassung“)",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen (erscheint erst nach vollständigen Bankdaten, Status ORDER_DATA_COMPLETED / ORDER_WAITING_SUBMIT)",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Bitte überprüfen Sie die nachfolgenden von Ihnen gemachten Angaben auf Vollständigkeit und Korrektheit.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Ihre gemachten Angaben:",
      "art": "Liste aller Antworten (nur lesen)"
     },
     {
      "wortlaut": "IGBCE Gewerkschaftsmitgliedsnummer:",
      "art": "Text",
      "bedingung": "nur wenn Link-Parameter askForGewerkschaft=true"
     },
     {
      "wortlaut": "Hinweis: Wenn Sie kostenpflichtig beantragen, erhalten Sie einen Versicherungsantrag / einen Antrag / eine Versicherungsbestätigung als PDF zum Speichern oder Ausdrucken. Der Versicherer speichert Ihre Antragsunterlagen ab.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "KOSTENPFLICHTIG BEANTRAGEN",
      "art": "Knopf (öffnet Bestätigungsdialog)"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 9,
    "titel": "Bestätigungsdialog",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Kostenpflichtig Beantragen",
      "art": "Überschrift"
     },
     {
      "wortlaut": "Hiermit bestätige ich, dass alle gemachten Angaben korrekt und vollständig sind. Mir ist bewusst, dass durch einen Klick auf „Kostenpflichtig Beantragen“ ein verbindlicher Antrag beim Versicherer eingereicht wird.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Beantragung abbrechen",
      "art": "Knopf"
     },
     {
      "wortlaut": "KOSTENPFLICHTIG BEANTRAGEN",
      "art": "Knopf"
     },
     {
      "wortlaut": "Leichte Sprache (Barrierefreiheitsmodus): „Ich bestätige: Alles, was ich in meinem Antrag und zu meiner Gesundheit gesagt habe, stimmt. Es ist alles richtig und nichts fehlt.“ / „Ich bin einverstanden: Mein Antrag wird per Computer an die SDK Krankenversicherung geschickt. Der Antrag ist verbindlich. Das heißt, ich muss das dann so machen.“ / „Ich weiß, dass für mich Kosten entstehen, wenn die Versicherung meinen Antrag annimmt. Die Kosten sind der Versicherungs-Beitrag, der einmal in jedem Monat zu bezahlen ist.“",
      "art": "Hinweistexte"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 10,
    "titel": "Ergebnisseite",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Vielen Dank für das Vertrauen / Der Antrag ist erfolgreich beim Versicherer eingegangen.",
      "art": "Hinweistext",
      "bedingung": "alle Tarife Status ORDER_ACCEPTED"
     },
     {
      "wortlaut": "Der Versicherer hat Ihren verbindlichen Antrag mit der Antragsnummer <referenceId> erhalten.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Ihre Dokumente: <Name> · Dokument herunterladen",
      "art": "Liste mit Knöpfen"
     },
     {
      "wortlaut": "Beim Abschluss des Vertrages ist es zu einem Fehler gekommen / Bitte die Angaben überprüfen und erneut versenden.",
      "art": "Hinweistext",
      "bedingung": "Fehlerfall"
     },
     {
      "wortlaut": "Für Rückfragen bitte kontaktieren: <Kontakt aus contactInformation> <remarks>",
      "art": "Kontaktkasten"
     }
    ],
    "hinweise": null,
    "regel": null
   }
  ]
 },
 "ukvZahn": {
  "link": "https://insurances-online.levelnine.biz/?mandant=vmk&tarifftypes=Zahn&agentId1=180188803&agentId2=226487&insurers=37&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJVS1YiLCJsYXN0TmFtZSI6IlVuaW9uIEtyYW5rZW52ZXJzaWNoZXJ1bmcgQUciLCJjb21wYW55IjoiIiwic3RyZWV0IjoiUGV0ZXItWmltbWVyLVN0ci4gMiIsInppcGNvZGUiOiI2NjEyMyIsImNpdHkiOiJTYWFyYnL8Y2tlbiIsIm1vYmlsZSI6IiIsImVtYWlsIjoia3JhbmtlbkBmb25kc2ZpbmFuei5kZSJ9&remarks=IiI=&defaultContact=false",
  "tarifkennungen": {
   "ZahnPRIVAT 100": "UKVZahnPRIVAT100#",
   "ZahnPRIVAT 90": "UKVZahnPRIVAT90#",
   "ZahnPRIVAT 75": "UKVZahnPRIVAT75#",
   "parallel, ausgeblendet": [
    "BAYZahnPRIVAT100#",
    "BAYZahnPRIVAT90#",
    "BAYZahnPRIVAT75#",
    "BAYOptionPRIVAT#"
   ]
  },
  "leistungstexte": {
   "UKVZahnPRIVAT90#": "Zahnzusatzversicherung für GKV-Versicherte\n\n90% inkl. GKV:\n- Zahnersatz* **, Zahnbehandlung*\n- schmerzstillende Maßnahmen\n- Prophylaxe/PZR\n- Zahnaufhellung: bis 180 EUR alle 2 Jahre \n- KFO, bis Alter 18 (bei Behandlungsbeginn): bis 5.000 EUR (über gesamte Tariflaufzeit)\n- KFO, ab Alter 19 (unfall- oder krankheitsbedingt): bis 5.000 EUR (über gesamte Tariflaufzeit)\n\n* u. a. Parodontose-/Wurzelbehandlung, Kunststofffüllungen, Aufbissbehelfe, Schienen, Inlays, Onlays, Implantate\n** 100% inkl. GKV im Rahmen Regelversorgung\n\nTarif ohne Alterungsrückstellungen\nplanmäßige Beitragserhöhung zum 1.1. des Kalenderjahres, in dem das 20., 30., 40., 50 oder 60. Lebensjahr vollendet wird\n\nTeil I_AVB/ZV, Teil I_Stand: 01.02.2023, SAP-Nr.: 342743, 02.2023\nTeil II_Tarife ZahnPRIVAT 100, ZahnPRIVAT 90, ZahnPRIVAT 75_Stand: 01.08.2024, SAP-Nr.: 348124, 06.2024",
   "UKVZahnPRIVAT75#": "Zahnzusatzversicherung für GKV-Versicherte\n\n75% inkl. GKV:\n- Zahnersatz (ZE)* **, Zahnbehandlung*\n- schmerzstillende Maßnahmen\n- Prophylaxe/PZR: bis 100 EUR p. a.\n- KFO, ab Alter 19 (unfall- oder krankheitsbedingt): bis 5.000 EUR (über gesamte Tariflaufzeit)\n\n* u. a. Parodontose-/Wurzelbehandlung, Kunststofffüllungen, Aufbissbehelfe, Schienen, Inlays, Onlays, Implantate\n** 100% inkl. GKV im Rahmen Regelversorgung\n\nTarif ohne Alterungsrückstellungen\nplanmäßige Beitragserhöhung zum 1.1. des Kalenderjahres, in dem das 20., 30., 40., 50 oder 60. Lebensjahr vollendet wird\n\nTeil I_AVB/ZV, Teil I_Stand: 01.02.2023, SAP-Nr.: 342743, 02.2023\nTeil II_Tarife ZahnPRIVAT 100, ZahnPRIVAT 90, ZahnPRIVAT 75_Stand: 01.08.2024, SAP-Nr.: 348124, 06.2024",
   "UKVZahnPRIVAT100#": "Zahnzusatzversicherung für GKV-Versicherte\n\n100% inkl. GKV:\n- Zahnersatz*, Zahnbehandlung*\n- schmerzstillende Maßnahmen\n- Prophylaxe/PZR\n- Zahnaufhellung: bis 200 EUR alle 2 Jahre\n- KFO, bis Alter 18 (bei Behandlungsbeginn): bis 5.000 EUR (über gesamte Tariflaufzeit)\n- KFO, ab Alter 19 (unfall- oder krankheitsbedingt): bis 5.000 EUR (über gesamte Tariflaufzeit)\n\n* u. a. Parodontose-/Wurzelbehandlung, Kunststofffüllungen, Aufbissbehelfe, Schienen, Inlays, Onlays, Implantate\n\nTarif ohne Alterungsrückstellungen\nplanmäßige Beitragserhöhung zum 1.1. des Kalenderjahres, in dem das 20., 30., 40., 50 oder 60. Lebensjahr vollendet wird\n\nTeil I_AVB/ZV, Teil I_Stand: 01.02.2023, SAP-Nr.: 342743, 02.2023\nTeil II_Tarife ZahnPRIVAT 100, ZahnPRIVAT 90, ZahnPRIVAT 75_Stand: 01.08.2024, SAP-Nr.: 348124, 06.2024"
  },
  "unterlagen": "Die UKV-Strecke hat bis zur Bankseite KEINEN Pflicht-Download und keinen Unterlagenschritt; die Bedingungen (Teil I AVB/ZV Stand 01.02.2023, Teil II Tarife ZahnPRIVAT Stand 01.08.2024) sind nur im Leistungstext genannt. Die Mitteilung nach § 19 Abs. 5 VVG wird im Text erwähnt, aber nicht verlinkt; die verdeckte Antwort AF_AD_0002 erklärt, die Vertragsbedingungen seien vor Unterschrift übergeben worden.",
  "schritte": [
   {
    "schritt": 1,
    "titel": "Beitrag (Startseite, Stepper „Beitrag“)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "beginn",
      "wortlaut": "Beginn der Versicherung",
      "art": "Datum TT.MM.JJJJ",
      "pflicht": true,
      "vorbelegt": "01.12.2026 (am 12.11.2026, nächster Monatserster)"
     },
     {
      "id": "geburtsdatum",
      "wortlaut": "Persönliche Daten der zu versichernden Person / Geburtsdatum",
      "art": "Datum TT.MM.JJJJ",
      "pflicht": true
     },
     {
      "id": "geschlecht",
      "wortlaut": "Geschlecht",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "MALE",
        "anzeige": "Männlich"
       },
       {
        "wert": "FEMALE",
        "anzeige": "Weiblich"
       }
      ]
     },
     {
      "id": "tarife_anzeigen",
      "wortlaut": "TARIFE ANZEIGEN",
      "art": "Knopf"
     },
     {
      "id": "tarifwahl",
      "wortlaut": "Tarif ankreuzen (Karte „Süddeutsche Krankenversicherung AG / <Tarifname> / <Beitrag> EUR / Monat“)",
      "art": "Ankreuzfeld je Tarif",
      "pflicht": true
     },
     {
      "id": "summe",
      "wortlaut": "Beitrag ausgewählte(r) Tarif(e): <x> EUR / Monat · Beitrag Person 1: <x> EUR / Monat",
      "art": "Anzeige"
     },
     {
      "id": "beantragung_starten",
      "wortlaut": "BEANTRAGUNG STARTEN",
      "art": "Knopf"
     },
     {
      "id": "weitere_person",
      "wortlaut": "Weitere Person versichern",
      "art": "Knopf"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 2,
    "titel": "Persönliche Daten (Stepper „Antragsdaten“)",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "Gender Radio",
      "wortlaut": "Männlich / Weiblich",
      "art": "Auswahl (Radio)",
      "nur_lesen": true
     },
     {
      "id": "firstName",
      "wortlaut": "Vorname",
      "art": "Text",
      "pflicht": true,
      "fehlertext": "Eingabe erforderlich."
     },
     {
      "id": "lastName",
      "wortlaut": "Nachname",
      "art": "Text",
      "pflicht": true,
      "fehlertext": "Eingabe erforderlich."
     },
     {
      "id": "geburtsdatum",
      "wortlaut": "Geburtsdatum",
      "art": "Datum",
      "nur_lesen": true
     },
     {
      "id": "beantragung_starten",
      "wortlaut": "BEANTRAGUNG STARTEN",
      "art": "Knopf"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 3,
    "titel": "Versicherungsnehmer und vorvertragliche Anzeigepflicht",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "firstName",
      "wortlaut": "Vorname:",
      "art": "Text",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "familyName",
      "wortlaut": "Nachname:",
      "art": "Text",
      "pflicht": false,
      "nur_lesen": true
     },
     {
      "id": "policyHolderIsEqualInsuredPerson",
      "wortlaut": "Ist die versicherte Person auch der Inhaber der Versicherung (Versicherungsnehmer/VN)?:",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ],
      "folgefragen": [
       {
        "id": "policyHolderGender",
        "wortlaut": "Anrede (VN):",
        "art": "Auswahl (Radio)",
        "pflicht": true,
        "werte": [
         {
          "wert": "2",
          "anzeige": "Frau"
         },
         {
          "wert": "1",
          "anzeige": "Herr"
         }
        ],
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderFirstName",
        "wortlaut": "Vorname (VN):",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderFamilyName",
        "wortlaut": "Nachname (VN):",
        "art": "Text",
        "pflicht": true,
        "bedingung": {
         "frage": "policyHolderIsEqualInsuredPerson",
         "antwort": "false"
        }
       },
       {
        "id": "policyHolderBirthday",
        "wortlaut": "Geburtsdatum (VN):",
        "art": "Datum",
        "pflicht": true,
        "fehlertext": "Geben Sie hier das Geburtsdatum des Versicherungsnehmers im Format TT.MM.JJJJ (z.B.: 28.02.1971) ein oder wählen Sie ein Datum durch Klicken auf das Kalendarsymbol aus."
       }
      ],
      "nur_lesen": true
     },
     {
      "id": "agentConfirmation",
      "wortlaut": "Der TAA Antrag kann nur durch den Makler abgewickelt werden. Bitte bestätigen Sie, dass sie ein Makler sind",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     },
     {
      "id": "AT_AD_0001",
      "wortlaut": "Vorvertragliche Anzeigepflicht Die in diesem Antrag gestellten Fragen sind nach bestem Wissen wahrheitsgemäß und vollständig zu beantworten; dabei sind auch für unwesentlich gehaltene Erkrankungen und Beschwerden anzugeben. Die Verletzung der vorvertraglichen Anzeigepflicht kann den Versicherer berechtigen, (je nach Verschulden) vom Vertrag zurückzutreten, ihn zu kündigen, anzupassen oder anzufechten, was unter Umständen zur Leistungsfreiheit des Versicherers (auch für bereits eingetretene Versicherungsfälle) führen kann - Einzelheiten siehe \"Mitteilung nach § 19 Absatz 5 Versicherungsvertragsgesetz (VVG)\". Prüfen Sie bitte nochmals die bisher gemachten Angaben und korrigieren Sie diese bei Bedarf. Auch diese Angaben (z. B. Beruf) sind für den Vertragsabschluss wesentlich und unterliegen der vorvertraglichen Anzeigepflicht. Erläuterung zu den parallel geführten Tarifen Die Union Krankenversicherung AG (UKV) und die Bayerische Beamtenkrankenkasse AG (BK) bieten auch Tarife parallel an. Parallel bedeutet, dass jeweils derselbe Tarif (gleiche Versicherungsleistungen zu gleichen Bedingungen und zum gleichen Beitrag) von beiden Versicherern rechtlich selbständig angeboten wird. Soweit der Versicherungsbeginn schon vor Ablauf der Widerrufsfrist liegt, erkläre ich hiermit mein ausdrückliches Einverständnis, dass der beantragte Versicherungsschutz schon vor diesem Zeitpunkt gewährt wird.",
      "art": "Hinweistext",
      "pflicht": false,
      "nur_lesen": true
     }
    ],
    "hinweise": [
     "agentConfirmation („Der TAA Antrag kann nur durch den Makler abgewickelt werden. Bitte bestätigen Sie, dass sie ein Makler sind“) wird von der Seite ohne Anzeige mit „true“ beantwortet.",
     "policyHolderIsEqualInsuredPerson ist mit „Ja“ vorbelegt und gesperrt.",
     "Der Server legt verdeckt policyHolderBirthday 1989-07-01, occupationDescription „Kaufmann/-frau Bank“, occupationStatus „A“ als Werte an (Platzhalter des Servers, Herkunft nicht ermittelbar)."
    ],
    "regel": null
   },
   {
    "schritt": 4,
    "titel": "Zahnfragen und Angaben zur Versicherung",
    "quelle": "selbst gesehen",
    "gesehen": true,
    "felder": [
     {
      "id": "TF0021",
      "wortlaut": "Fehlen Zähne, die noch nicht ersetzt sind? Nicht anzugeben sind: Milch- und Weisheitszähne sowie vollständiger Lückenschluss.",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "0",
        "anzeige": "0"
       },
       {
        "wert": "1",
        "anzeige": "1"
       },
       {
        "wert": "2",
        "anzeige": "2"
       },
       {
        "wert": "3",
        "anzeige": "3"
       },
       {
        "wert": ">3",
        "anzeige": ">3"
       }
      ],
      "fehlertext": "Fehlen Zähne, die noch nicht ersetzt sind? Nicht anzugeben sind: Milch- und Weisheitszähne sowie vollständiger Lückenschluss."
     },
     {
      "id": "GF0073",
      "wortlaut": "Wird aktuell eine Zahnersatz- oder Zahnbehandlung durchgeführt, ist eine beabsichtigt bzw. wurde diese in den letzten zwei Jahren zahnärztlich empfohlen? Zahnersatzmaßnahmen sind Anfertigung oder Erneuerung von Kronen, Brücken, Prothesen, Implantaten, In- bzw. Onlays. Zahnbehandlungen sind Wurzelbehandlung einschließlich Wurzelspitzenresektion, Entfernung eines Zahnes, Zahnfüllungen, Anbringen von Veneers, Aufbissbehelfe und Schienen, Behandlungen von Kreidezähnen.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "GF0074",
      "wortlaut": "Wurde in den letzten zwei Jahren eine Parodontose / Parodontitis zahnärztlich festgestellt, behandelt bzw. ist eine Behandlung angeraten? Wird die Frage mit \"ja\" beantwortet, gilt: Ich bin damit einverstanden, dass für Parodontosebehandlungen kein Versicherungsschutz besteht.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "VP0004",
      "wortlaut": "Beziehung zum Versicherungsnehmer:",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "Versicherungsnehmer selbst",
        "anzeige": "Versicherungsnehmer selbst"
       }
      ],
      "fehlertext": "Beziehung zum Versicherungsnehmer:"
     },
     {
      "id": "AF0010",
      "wortlaut": "Besteht bei einer anderen privaten Krankenversicherung (PKV) eine Zusatzversicherung für Zahnersatz?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "AF_AD_0001",
      "wortlaut": "Entscheidet sich der Kunde für die Einzelfallentbindung?",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "Einzelfallentbindung",
        "anzeige": "Ja"
       }
      ]
     },
     {
      "id": "AF_AD_0002",
      "wortlaut": "Übergabe der Vertragsbedingungen (§7 VVG)",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "vor Unterschrift des Antrags gewünscht",
        "anzeige": "vor Unterschrift des Antrags gewünscht"
       }
      ],
      "fehlertext": "Übergabe der Vertragsbedingungen (§7 VVG)"
     },
     {
      "id": "AF_AD_0003",
      "wortlaut": "Schriftliche Beratungsdokumentation",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "wird vom Kunden gewünscht",
        "anzeige": "wird vom Kunden gewünscht"
       }
      ],
      "fehlertext": "Schriftliche Beratungsdokumentation"
     },
     {
      "id": "AF_AD_0004",
      "wortlaut": "Erklärung des Maklers Ich bestätige, dass der Antragsteller (VN) sowie ggf. die zu versichernden Personen (VP) mich zur Aufnahme des Antrages mit entsprechender Maklervollmacht beauftragt haben. Ich habe dem VN und VP´s nachfolgendes vor Abgabe der Vertragserklärung in Textform mitgeteilt: - Alle Antrags- und Gesundheitsfragen - Belehrung zur vorvertraglichen Anzeigepflicht - Informationspflichten gemäß § 7 VVG Ich habe den VN und die VP´s über die Folgen einer Anzeigepflichtverletzung belehrt, die Fragen bei Antragsaufnahme wörtlich dem VN bzw. den VP´s vorgelesen und ihre Antworten vollständig in den Antrag übernommen. Ich bin bevollmächtigt, im Namen des VN und der VP´s, die \"Einwilligung in die Erhebung und Verwendung von Gesundheitsdaten und Schweigepflichtentbindungserklärung (Einwilligungs- / Schweigepflichtentbindungserklärung)\" abzugeben sowie das SEPA-Mandat zu erteilen.",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Ja"
       },
       {
        "wert": "false",
        "anzeige": "Nein"
       }
      ]
     },
     {
      "id": "AF_AD_0005",
      "wortlaut": "Wie ist die versicherte Person krankenversichert?",
      "art": "Auswahlliste",
      "pflicht": true,
      "werte": [
       {
        "wert": "freiwillig gesetzlich versichert in deutscher GKV",
        "anzeige": "freiwillig gesetzlich versichert in deutscher GKV"
       },
       {
        "wert": "pflichtversichert in deutscher GKV",
        "anzeige": "pflichtversichert in deutscher GKV"
       },
       {
        "wert": "private Krankenversicherung/Heilfürsorge",
        "anzeige": "private Krankenversicherung/Heilfürsorge"
       }
      ],
      "fehlertext": "Wie ist die versicherte Person krankenversichert?"
     }
    ],
    "hinweise": [
     "AF_AD_0002 („Übergabe der Vertragsbedingungen (§7 VVG)“ = „vor Unterschrift des Antrags gewünscht“), AF_AD_0003 („Schriftliche Beratungsdokumentation“ = „wird vom Kunden gewünscht“) und AF_AD_0004 („Erklärung des Maklers …“ = „Ja“) beantwortet die Seite ohne Anzeige (feste Vorbelegung im Code für UKV und Bayerische Beamtenkrankenkasse).",
     "AF_AD_0001 hat nur den Wert „Ja“ (Einzelfallentbindung) und ist Pflicht.",
     "VP0004 hat nur „Versicherungsnehmer selbst“."
    ],
    "regel": null
   },
   {
    "schritt": 5,
    "titel": "Antragsdaten: Anschrift, E-Mail, Bankverbindung, SEPA",
    "quelle": "Felder selbst gesehen, Bankfelder nicht ausgefüllt",
    "gesehen": true,
    "felder": [
     {
      "id": "orderStreet",
      "wortlaut": "Straße Hausnr.:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderZip",
      "wortlaut": "PLZ:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderCity",
      "wortlaut": "Ort:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "eMail",
      "wortlaut": "E-Mail:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "orderIbanName",
      "wortlaut": "Bankverbindung Kontoinhaber(in):",
      "art": "Text",
      "pflicht": true,
      "hilfetext": "Hinweis: Die Person, die den Vertrag abschließt, muss auch der Kontoinhaber sein!",
      "nur_lesen": true
     },
     {
      "id": "orderIban",
      "wortlaut": "Bankverbindung IBAN:",
      "art": "Text",
      "pflicht": true
     },
     {
      "id": "sepaMandatConfirmation",
      "wortlaut": "SEPA-Lastschriftmandat Ich ermächtige die Union Krankenversicherung AG (Gläubiger-ID: DE69UKV00000157419), die Beiträge von meinem Konto mittels SEPA-Lastschrift einzuziehen. Auf dieses Konto sollen auch die Versicherungsleistungen überwiesen werden. Zugleich weise ich meinen im Antrag genannten Zahlungsdienstleister an, die von der Union Krankenversicherung AG auf mein Konto gezogenen SEPA-Lastschriften einzulösen. (siehe auch Hinweise zum SEPA-Lastschriftmandat in den „Weiteren Vertragsgrundlagen und Zusatzerklärungen des Antragstellers und der zu versichernden Personen“)",
      "art": "Auswahl (Radio)",
      "pflicht": true,
      "werte": [
       {
        "wert": "true",
        "anzeige": "Zugestimmt"
       }
      ]
     }
    ],
    "hinweise": [
     "Kein Telefonfeld, kein Bankname, Straße und Hausnummer in einem Feld.",
     "Kein eigener Beratungsverzicht-Schritt (bei UKV übernimmt das die verdeckte Antwort AF_AD_0003).",
     "Kein Schritt „Vertragsunterlagen herunterladen“ vor den Fragen gesehen; ob die Zusammenfassung Unterlagen anbietet, ist nicht ermittelbar."
    ],
    "regel": null
   },
   {
    "schritt": 6,
    "titel": "Zusammenfassung (Stepper „Zusammenfassung“)",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen (erscheint erst nach vollständigen Bankdaten, Status ORDER_DATA_COMPLETED / ORDER_WAITING_SUBMIT)",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Bitte überprüfen Sie die nachfolgenden von Ihnen gemachten Angaben auf Vollständigkeit und Korrektheit.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Ihre gemachten Angaben:",
      "art": "Liste aller Antworten (nur lesen)"
     },
     {
      "wortlaut": "IGBCE Gewerkschaftsmitgliedsnummer:",
      "art": "Text",
      "bedingung": "nur wenn Link-Parameter askForGewerkschaft=true"
     },
     {
      "wortlaut": "Hinweis: Wenn Sie kostenpflichtig beantragen, erhalten Sie einen Versicherungsantrag / einen Antrag / eine Versicherungsbestätigung als PDF zum Speichern oder Ausdrucken. Der Versicherer speichert Ihre Antragsunterlagen ab.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "KOSTENPFLICHTIG BEANTRAGEN",
      "art": "Knopf (öffnet Bestätigungsdialog)"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 7,
    "titel": "Bestätigungsdialog",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Kostenpflichtig Beantragen",
      "art": "Überschrift"
     },
     {
      "wortlaut": "Hiermit bestätige ich, dass alle gemachten Angaben korrekt und vollständig sind. Mir ist bewusst, dass durch einen Klick auf „Kostenpflichtig Beantragen“ ein verbindlicher Antrag beim Versicherer eingereicht wird.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Beantragung abbrechen",
      "art": "Knopf"
     },
     {
      "wortlaut": "KOSTENPFLICHTIG BEANTRAGEN",
      "art": "Knopf"
     },
     {
      "wortlaut": "Leichte Sprache (Barrierefreiheitsmodus): „Ich bestätige: Alles, was ich in meinem Antrag und zu meiner Gesundheit gesagt habe, stimmt. Es ist alles richtig und nichts fehlt.“ / „Ich bin einverstanden: Mein Antrag wird per Computer an die Krankenversicherung (Text fest „SDK“ im Code) geschickt. Der Antrag ist verbindlich. Das heißt, ich muss das dann so machen.“ / „Ich weiß, dass für mich Kosten entstehen, wenn die Versicherung meinen Antrag annimmt. Die Kosten sind der Versicherungs-Beitrag, der einmal in jedem Monat zu bezahlen ist.“",
      "art": "Hinweistexte"
     }
    ],
    "hinweise": null,
    "regel": null
   },
   {
    "schritt": 8,
    "titel": "Ergebnisseite",
    "quelle": "nicht selbst gesehen, aus dem Code gelesen",
    "gesehen": false,
    "felder": [
     {
      "wortlaut": "Vielen Dank für das Vertrauen / Der Antrag ist erfolgreich beim Versicherer eingegangen.",
      "art": "Hinweistext",
      "bedingung": "alle Tarife Status ORDER_ACCEPTED"
     },
     {
      "wortlaut": "Der Versicherer hat Ihren verbindlichen Antrag mit der Antragsnummer <referenceId> erhalten.",
      "art": "Hinweistext"
     },
     {
      "wortlaut": "Ihre Dokumente: <Name> · Dokument herunterladen",
      "art": "Liste mit Knöpfen"
     },
     {
      "wortlaut": "Beim Abschluss des Vertrages ist es zu einem Fehler gekommen / Bitte die Angaben überprüfen und erneut versenden.",
      "art": "Hinweistext",
      "bedingung": "Fehlerfall"
     },
     {
      "wortlaut": "Für Rückfragen bitte kontaktieren: <Kontakt aus contactInformation> <remarks>",
      "art": "Kontaktkasten"
     }
    ],
    "hinweise": null,
    "regel": null
   }
  ]
 },
 "beitraege": {
  "sdkStationaer": {
   "0": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "1": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "2": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "3": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "4": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "5": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "6": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "7": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "8": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "9": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "10": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "11": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "12": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "13": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "14": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "15": {
    "SDKSP2": 3.37,
    "SDKSP1": 5.6,
    "SDKSPU": 0.75
   },
   "16": {
    "SDKSP2": 6.61,
    "SDKSP1": 13.27,
    "SDKSPU": 1.78
   },
   "17": {
    "SDKSP2": 6.61,
    "SDKSP1": 13.27,
    "SDKSPU": 1.78
   },
   "18": {
    "SDKSP2": 6.61,
    "SDKSP1": 13.27,
    "SDKSPU": 1.78
   },
   "19": {
    "SDKSP2": 6.61,
    "SDKSP1": 13.27,
    "SDKSPU": 1.78
   },
   "20": {
    "SDKSP2": 6.61,
    "SDKSP1": 13.27,
    "SDKSPU": 1.78
   },
   "21": {
    "SDKSP2": 27.5,
    "SDKSP1": 41.94,
    "SDKSPU": 5.67
   },
   "22": {
    "SDKSP2": 28.06,
    "SDKSP1": 42.74,
    "SDKSPU": 5.78
   },
   "23": {
    "SDKSP2": 28.64,
    "SDKSP1": 43.58,
    "SDKSPU": 5.89
   },
   "24": {
    "SDKSP2": 29.24,
    "SDKSP1": 44.44,
    "SDKSPU": 6.01
   },
   "25": {
    "SDKSP2": 29.84,
    "SDKSP1": 45.31,
    "SDKSPU": 6.14
   },
   "26": {
    "SDKSP2": 30.43,
    "SDKSP1": 46.18,
    "SDKSPU": 6.27
   },
   "27": {
    "SDKSP2": 31.03,
    "SDKSP1": 47.07,
    "SDKSPU": 6.4
   },
   "28": {
    "SDKSP2": 31.63,
    "SDKSP1": 47.96,
    "SDKSPU": 6.54
   },
   "29": {
    "SDKSP2": 32.22,
    "SDKSP1": 48.86,
    "SDKSPU": 6.69
   },
   "30": {
    "SDKSP2": 32.82,
    "SDKSP1": 49.78,
    "SDKSPU": 6.84
   },
   "31": {
    "SDKSP2": 33.41,
    "SDKSP1": 50.72,
    "SDKSPU": 7
   },
   "32": {
    "SDKSP2": 34.01,
    "SDKSP1": 51.67,
    "SDKSPU": 7.17
   },
   "33": {
    "SDKSP2": 34.61,
    "SDKSP1": 52.64,
    "SDKSPU": 7.34
   },
   "34": {
    "SDKSP2": 35.22,
    "SDKSP1": 53.64,
    "SDKSPU": 7.52
   },
   "35": {
    "SDKSP2": 35.85,
    "SDKSP1": 54.68,
    "SDKSPU": 7.72
   },
   "36": {
    "SDKSP2": 36.5,
    "SDKSP1": 55.77,
    "SDKSPU": 7.92
   },
   "37": {
    "SDKSP2": 37.18,
    "SDKSP1": 56.91,
    "SDKSPU": 8.13
   },
   "38": {
    "SDKSP2": 37.88,
    "SDKSP1": 58.1,
    "SDKSPU": 8.35
   },
   "39": {
    "SDKSP2": 38.61,
    "SDKSP1": 59.34,
    "SDKSPU": 8.58
   },
   "40": {
    "SDKSP2": 39.38,
    "SDKSP1": 60.64,
    "SDKSPU": 8.82
   },
   "41": {
    "SDKSP2": 40.2,
    "SDKSP1": 62,
    "SDKSPU": 9.07
   },
   "42": {
    "SDKSP2": 41.05,
    "SDKSP1": 63.42,
    "SDKSPU": 9.33
   },
   "43": {
    "SDKSP2": 41.95,
    "SDKSP1": 64.91,
    "SDKSPU": 9.6
   },
   "44": {
    "SDKSP2": 42.9,
    "SDKSP1": 66.47,
    "SDKSPU": 9.89
   },
   "45": {
    "SDKSP2": 43.88,
    "SDKSP1": 68.08,
    "SDKSPU": 10.18
   },
   "46": {
    "SDKSP2": 44.91,
    "SDKSP1": 69.74,
    "SDKSPU": 10.49
   },
   "47": {
    "SDKSP2": 45.97,
    "SDKSP1": 71.46,
    "SDKSPU": 10.81
   },
   "48": {
    "SDKSP2": 47.08,
    "SDKSP1": 73.24,
    "SDKSPU": 11.15
   },
   "49": {
    "SDKSP2": 48.23,
    "SDKSP1": 75.1,
    "SDKSPU": 11.49
   },
   "50": {
    "SDKSP2": 49.42,
    "SDKSP1": 77,
    "SDKSPU": 11.86
   },
   "51": {
    "SDKSP2": 50.65,
    "SDKSP1": 78.95,
    "SDKSPU": 12.23
   },
   "52": {
    "SDKSP2": 51.91,
    "SDKSP1": 80.95,
    "SDKSPU": 12.62
   },
   "53": {
    "SDKSP2": 53.22,
    "SDKSP1": 83.03,
    "SDKSPU": 13.03
   },
   "54": {
    "SDKSP2": 54.57,
    "SDKSP1": 85.17,
    "SDKSPU": 13.46
   },
   "55": {
    "SDKSP2": 55.95,
    "SDKSP1": 87.36,
    "SDKSPU": 13.9
   },
   "56": {
    "SDKSP2": 57.38,
    "SDKSP1": 89.6,
    "SDKSPU": 14.36
   },
   "57": {
    "SDKSP2": 58.84,
    "SDKSP1": 91.9,
    "SDKSPU": 14.84
   },
   "58": {
    "SDKSP2": 60.35,
    "SDKSP1": 94.27,
    "SDKSPU": 15.34
   },
   "59": {
    "SDKSP2": 61.92,
    "SDKSP1": 96.7,
    "SDKSPU": 15.87
   },
   "60": {
    "SDKSP2": 63.51,
    "SDKSP1": 99.17,
    "SDKSPU": 16.42
   },
   "61": {
    "SDKSP2": 65.14,
    "SDKSP1": 101.68,
    "SDKSPU": 17
   },
   "62": {
    "SDKSP2": 66.8,
    "SDKSP1": 104.24,
    "SDKSPU": 17.6
   },
   "63": {
    "SDKSP2": 68.5,
    "SDKSP1": 106.84,
    "SDKSPU": 18.24
   },
   "64": {
    "SDKSP2": 70.25,
    "SDKSP1": 109.51,
    "SDKSPU": 18.91
   },
   "65": {
    "SDKSP2": 71.22,
    "SDKSP1": 111.01,
    "SDKSPU": 19.45
   },
   "66": {
    "SDKSP2": 72.97,
    "SDKSP1": 113.64,
    "SDKSPU": 20.18
   },
   "67": {
    "SDKSP2": 74.72,
    "SDKSP1": 116.25,
    "SDKSPU": 20.94
   },
   "68": {
    "SDKSP2": 76.48,
    "SDKSP1": 118.85,
    "SDKSPU": 21.74
   },
   "69": {
    "SDKSP2": 78.24,
    "SDKSP1": 121.43,
    "SDKSPU": 22.59
   },
   "70": {
    "SDKSP2": 79.97,
    "SDKSP1": 123.96,
    "SDKSPU": 23.47
   },
   "71": {
    "SDKSP2": 81.67,
    "SDKSP1": 126.42,
    "SDKSPU": 24.38
   },
   "72": {
    "SDKSP2": 83.34,
    "SDKSP1": 128.82,
    "SDKSPU": 25.34
   },
   "73": {
    "SDKSP2": 84.97,
    "SDKSP1": 131.15,
    "SDKSPU": 26.34
   },
   "74": {
    "SDKSP2": 86.56,
    "SDKSP1": 133.39,
    "SDKSPU": 27.4
   },
   "75": {
    "SDKSP2": 88.13,
    "SDKSP1": 135.53,
    "SDKSPU": 28.49
   },
   "76": {
    "SDKSP2": 89.69,
    "SDKSP1": 137.56,
    "SDKSPU": 29.61
   },
   "77": {
    "SDKSP2": 91.22,
    "SDKSP1": 139.45,
    "SDKSPU": 30.77
   },
   "78": {
    "SDKSP2": 92.72,
    "SDKSP1": 141.18,
    "SDKSPU": 31.98
   },
   "79": {
    "SDKSP2": 94.19,
    "SDKSP1": 141.51,
    "SDKSPU": 33.25
   },
   "80": {
    "SDKSP2": 95.66,
    "SDKSP1": 141.51,
    "SDKSPU": 34.51
   }
  },
  "ukvZahn": {
   "0": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "1": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "2": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "3": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "4": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "5": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "6": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "7": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "8": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "9": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "10": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "11": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "12": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "13": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "14": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "15": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "16": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "17": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "18": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "19": {
    "UKVZahnPRIVAT90": 17.16,
    "UKVZahnPRIVAT75": 0.99,
    "UKVZahnPRIVAT100": 20.73
   },
   "20": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "21": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "22": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "23": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "24": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "25": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "26": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "27": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "28": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "29": {
    "UKVZahnPRIVAT90": 16.94,
    "UKVZahnPRIVAT75": 8,
    "UKVZahnPRIVAT100": 21.55
   },
   "30": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "31": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "32": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "33": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "34": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "35": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "36": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "37": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "38": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "39": {
    "UKVZahnPRIVAT90": 22.77,
    "UKVZahnPRIVAT75": 11.7,
    "UKVZahnPRIVAT100": 30.05
   },
   "40": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "41": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "42": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "43": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "44": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "45": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "46": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "47": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "48": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "49": {
    "UKVZahnPRIVAT90": 34.46,
    "UKVZahnPRIVAT75": 16.91,
    "UKVZahnPRIVAT100": 45.69
   },
   "50": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "51": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "52": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "53": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "54": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "55": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "56": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "57": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "58": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "59": {
    "UKVZahnPRIVAT90": 45.89,
    "UKVZahnPRIVAT75": 25.23,
    "UKVZahnPRIVAT100": 59.31
   },
   "60": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "61": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "62": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "63": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "64": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "65": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "66": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "67": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "68": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "69": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "70": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "71": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "72": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "73": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "74": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "75": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "76": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "77": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "78": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "79": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   },
   "80": {
    "UKVZahnPRIVAT90": 66.91,
    "UKVZahnPRIVAT75": 35.37,
    "UKVZahnPRIVAT100": 84.14
   }
  }
 },
 "sdkUnterlagen": {
  "SP2": [
   [
    15445,
    "Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26"
   ],
   [
    15449,
    "Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26"
   ],
   [
    15452,
    "Tarifbedingungen: 1.671h_Informationsblatt_Gesundheitsfragen_SP2_10.26"
   ],
   [
    12764,
    "Tarifbedingungen: SP2_1-755a_10.26"
   ],
   [
    12289,
    "AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22"
   ]
  ],
  "SP1": [
   [
    15445,
    "Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26"
   ],
   [
    15449,
    "Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26"
   ],
   [
    null,
    "Tarifbedingungen: 1.671g_Informationsblatt_Gesundheitsfragen_SP1_10.26"
   ],
   [
    null,
    "Tarifbedingungen: SP1_1-754a_10.26"
   ],
   [
    12289,
    "AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22"
   ]
  ],
  "SPU": [
   [
    15445,
    "Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26"
   ],
   [
    15449,
    "Tarifbedingungen: 1.671i_Gesetzliche_Kundeninformation_SP_10.26"
   ],
   [
    null,
    "Tarifbedingungen: SPU_1-756a_10.26"
   ],
   [
    null,
    "Tarifbedingungen: 1.671f_Informationsblatt_SPU_10.26"
   ],
   [
    12289,
    "AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22"
   ]
  ],
  "AP": [
   [
    12289,
    "AVB: AVB KV ZV Teil I (Allgemeiner Teil)_1-751_01.22"
   ],
   [
    15447,
    "Tarifbedingungen: Informationsblatt_Gesundheitsfragen_Beitragstabelle_AP_1.671d_10.26"
   ],
   [
    13158,
    "Tarifbedingungen: AP5, AP7, AP9, AP1 der amb. ZV_1.753a_01.23"
   ],
   [
    15445,
    "Tarifbedingungen: Vorvertragliche_Anzeigepflicht_Widerrufsbelehrung_Datenschutz_1.671c_10.26"
   ],
   [
    15733,
    "Tarifbedingungen: 1.671e_Gesetzliche_Kundeninformation_AP_10.26"
   ]
  ]
 }
};
export default LEVELNINE;
