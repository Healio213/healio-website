# Lead-Erfassung vor externen Anträgen

Stand: 08.10.2026. Die Serverstrecke ist implementiert und mit simulierten Empfängern geprüft. Noch kein produktiver Empfangsendpunkt konfiguriert und keine echten Leads oder E-Mails für diese Prüfung versendet.

Franks Entscheidung: Leads sollen in einem eigenen CMS auf dem Healio-Server ankommen. Deshalb enthält die API keine fest verdrahtete SaaS-, ManyChat- oder Brevo-Anbindung. Der Patientenleitfaden liegt als eigener vierseitiger PDF-Kandidat im Healio-Design vor; seine Veröffentlichung und Zustellabnahme stehen noch aus. Die bestehende Praxis-Leitfaden-Tabelle und das pseudonyme Empfehlungs-Tracking werden nicht mit diesen Patientenanfragen vermischt.

## Serverkonfiguration

Die folgenden Werte ausschließlich in der Serverumgebung des Website-Deployments hinterlegen:

| Variable | Funktion |
| --- | --- |
| `LEAD_CAPTURE_WEBHOOK_URL` | Vollständige HTTPS-Adresse des eigenen Empfangsendpunkts. Pflicht für eine erfolgreiche Erfassung. |
| `LEAD_CAPTURE_WEBHOOK_SECRET` | Gemeinsames Geheimnis; für das eigene Healio-CMS Pflicht. Wird ausschließlich als `Authorization: Bearer …` an den konfigurierten Empfänger gesendet. |

Keinen dieser Werte unter einem `VITE_`-Namen hinterlegen oder ins Frontend übernehmen. Die Function liest sie nur serverseitig. URL und Geheimnis werden weder in Antworten noch in Logs ausgegeben. Ohne gültige HTTPS-Konfiguration antwortet die Function mit `503`; es wird keine erfolgreiche Erfassung vorgetäuscht.

Der Empfangsendpunkt muss die Daten dauerhaft im eigenen CMS sichern und den Auftrag zum einmaligen Leitfadenversand annehmen, bevor er mit einem HTTP-Status aus dem Bereich `200–299` antwortet. Der Browser wird erst danach zum Rechner freigegeben. Eine rein flüchtige Annahme ohne gesicherte Speicherung genügt operativ nicht.

Das CMS sollte den Header `Idempotency-Key` dauerhaft deduplizieren. Die Website-Function verhindert Doppelzustellung mit derselben ID innerhalb einer laufenden Instanz für zehn Minuten. Bei mehreren Serverinstanzen oder Neustarts übernimmt das CMS diese Aufgabe. Die Function speichert keine Lead-Daten dauerhaft.

## Anfrage

`POST /api/lead-capture` mit `Content-Type: application/json` und optional `X-Idempotency-Key: <UUID-v4>`.

```json
{
  "firstName": "Test",
  "email": "test@example.test",
  "targetUrl": "<bestehende freigegebene Antrags-URL>",
  "timestamp": "2026-10-08T12:00:00.000Z",
  "sourcePage": "/ambulant",
  "trackingCategory": "sdk-ambulant"
}
```

Vorname und E-Mail werden auf Format und Länge geprüft. `trackingCategory` ist freiwillig und muss ein neutraler Token aus Kleinbuchstaben, Ziffern, Unterstrich oder Bindestrich sein. Freie Zusatzfelder werden zurückgewiesen. Bei einem Retry bleiben UUID und gesamte Payload einschließlich Zeitstempel identisch; nach einer Änderung der Eingaben beginnt eine neue Anfrage mit neuer UUID.

`sourcePage` wird auf einen der vier deutschen oder englischen Seitenpfade begrenzt. Query, Hash und Antworten aus den Tarifchecks werden entfernt. Von IP-Adresse, User-Agent, Cookies und Referrer gehen keine weiteren Felder an das CMS. Eine IP wird nur als kurzlebiger Prüfwert im Arbeitsspeicher für die Begrenzung verwendet.

Die gemeinsame Funktion `validateApplicationUrl(value)` in `shared/lead-capture.js` prüft die vorhandenen SDK-/UKV-Level-Nine- und Bayerische-Adressen mit ihren Vermittlerparametern. Sie erhält einen zulässigen SDK-Empfehlungscode; freie Eingabedaten im Base64-Feld werden verworfen. Nicht freigegebene Anbieter, geänderte Vermittlerzuordnungen, zusätzliche Parameter, HTTP, Zugangsdaten oder Fragment sind unzulässig. Die API fragt die übergebene Antrags-URL niemals selbst ab; sie wird nur als JSON-Wert an den fest konfigurierten CMS-Endpunkt übergeben.

## Antworten und Fehler

Alle Antworten tragen `Cache-Control: no-store` und enthalten keine Kontaktdaten.

| Status | Bedeutung |
| --- | --- |
| `200` / `{ "ok": true }` | CMS-Endpunkt hat mit einem Erfolgsstatus bestätigt. |
| `400` | Defektes JSON, unzulässige Felder oder ungültige Werte. |
| `403` | Herkunft nicht freigegeben. |
| `405` | Andere Methode als POST. |
| `408` | Der Request-Body wurde nicht rechtzeitig vollständig übertragen. |
| `409` | Dieselbe Idempotency-ID wurde mit anderer Payload wiederverwendet. |
| `413` | Body größer als 8.192 Bytes. |
| `415` | Content-Type ist kein JSON. |
| `429` | Mehr als fünf neue Lieferungen derselben IP in zehn Minuten oder Kapazitätsgrenze. |
| `502` | CMS-Endpunkt lehnt ab, Umleitung oder Netzwerkfehler. |
| `503` | Empfangsendpunkt fehlt oder ist ungültig konfiguriert. |
| `504` | CMS-Endpunkt antwortet nicht innerhalb von fünf Sekunden. |

Die API folgt keinen Weiterleitungen des CMS, damit das optionale Geheimnis nicht an andere Hosts gelangt. Fehlgeschlagene Lieferungen können mit derselben Idempotency-ID erneut versucht werden. Die Ratenbegrenzung gilt je Function-Instanz und ersetzt keinen zentralen Missbrauchsschutz des CMS.

Freigegebene Produktionsherkünfte sind `https://healio.de` und `https://www.healio.de`. Für Previews werden ausschließlich die Adressen des eigenen Deployments aus `VERCEL_URL` und `VERCEL_BRANCH_URL` akzeptiert. In lokaler Entwicklung sind gleichnamige Loopback-Adressen zulässig; der Vite-Server stellt Vercel-Functions nicht selbst bereit.

## Prüfung und Aktivierung

Die Integration folgt den tatsächlich gerenderten Routen und ihren globalen Layouts: Auf `/ambulant` sind die beiden SDK-Knöpfe in `AmbulantConversionFlow`, der SDK-Knopf im Bonusrechner, der UKV-Vorsorgebaustein und beide SDK-Knöpfe im Desktop-/Mobil-Header geschützt. Auf `/zahn` ist der externe Antrag in `DentalZahnCheck` geschützt; der dortige Bonusrechner führt mit seinem Override nur zum internen Zahn-Check. `/kassenbonus` enthält derzeit KassenBoost-Vergleiche, `/tierkrankenversicherung` eine eigene Angebotsanfrage und einen GOT-Informationslink; beide haben gegenwärtig keinen direkten Versichererantrag. Der globale Footer enthält keine externen Antragslinks. Historische Ambulant-Komponenten ohne Import im aktiven Quellbaum gehören nicht zur gerenderten Strecke. Die entsprechenden englischen Routen verwenden dieselben Komponenten.

Verhaltenstest: `node --test scripts/check-lead-capture-api.mjs`. Alle Webhook-Aufrufe sind Stubs; die Tests senden keine Daten an einen echten Empfänger. Geprüft werden reale Providerlinks, Payloadbereinigung, Erfolgs-/Fehlerfälle, Bodygröße, Herkunft, Timeout, Ratenbegrenzung sowie paralleler Doppelklick und Retry.

Client-Verhaltenstest: `node --test scripts/check-lead-capture-client.mjs`. Der Harness rendert die tatsächlichen React-Komponenten mit Radix-Dialog und Router in jsdom. Nur `fetch` und neue Tabs sind simuliert. Geprüft werden die Reihenfolge leerer Tab → POST → bestätigte Zielzuweisung, Feldvalidierung, Doppelklick, Fehlerschutz, identische UUID und Zeitstempel bei Retry, einsekündiger Ladehinweis, Timeout, neutraler Sitzungsstatus auch bei gesperrtem Storage, manuelle Popup-Ausweichmöglichkeit sowie X, Overlay, Escape, Fokusfalle, Fokusrückgabe und Scrollsperre. Eine verspätete Antwort nach Zielwechsel oder Abort darf weder die neue Anfrage verändern noch den Sitzungsstatus setzen. Bei fortbestehender Popupblockade erfolgen weder Öffnungs-Tracking noch Schließen; erst ein bestätigtes Öffnen gibt beides frei. Die tatsächlich gerenderten SDK-Knöpfe im Desktop- und Mobil-Header werden auf Deutsch und Englisch angeklickt; ihr echtes Statistik-Ereignis darf erst nach bestätigter Zielöffnung entstehen. jsdom lädt dabei keine Analyse-Tags. Nicht beauftragte Routen und KassenBoost-Vergleiche werden weiterhin direkt bedient. Es findet keine Browsersteuerung oder externe Anfrage statt.

Der eigene CMS-Empfang, die dauerhafte Queue und der inaktive n8n-Workflow sind im App-Kandidaten `app-website-leads-20261008` implementiert. Für die produktive Aktivierung fehlen noch deren Veröffentlichung, die öffentliche Bereitstellung des fertigen PDF und der abgenommene Zustellauftrag. Danach Konfiguration nur serverseitig setzen, die Empfänger-Deduplizierung prüfen und die gesamte Strecke mit ausdrücklich gekennzeichneten Testdaten abnehmen. Es gibt keinen automatischen Rückgriff auf gestoppte Brevo-Strecken, Praxis-Optins, Referral-Tabellen oder Werbeplattformen.

Das eigene CMS nimmt `https://app.healio.de/api/website-leads` entgegen. Der Website-Bearer muss mit `WEBSITE_LEADS_API_SECRET` der App übereinstimmen. Die App nutzt getrennte Worker-Konfiguration; siehe `docs/website-leads-2026-10-08/README.md` im App-Kandidaten. Der neue Absatz „Kassenbonus-Leitfaden vor dem Beitragsrechner“ in der Datenschutzerklärung beschreibt diese Datenstrecke auf Deutsch und Englisch. Rechtsquelle für Zweckbindung/Speicherbegrenzung: [DSGVO, Art. 5](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679).
