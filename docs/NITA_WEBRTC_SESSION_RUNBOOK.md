# Nita WebRTC Session Runbook

Stand: 02.09.2026

Der Browser ruft ausschließlich den Same-Origin-Endpunkt `POST /api/nita-session` auf. Der Endpunkt akzeptiert nur ein WebRTC-SDP-Angebot und den vierfeldrigen, fest validierten Nita-Seitenkontext. Er erstellt serverseitig eine OpenAI-Realtime-Session und gibt ausschließlich die geprüfte SDP-Antwort zurück.

Fest gebunden sind:

- Modell `gpt-realtime-2.1`
- Reasoning `low`
- höchstens 512 Outputtokens je Antwort
- Stimme `marin` und Semantic VAD
- keine Werkzeuge und keine Browser-Funktionsaufrufe
- freigegebene Nita-Wissensbasis `2026-08-31.1` aus `server/nita/approvedKnowledge.js`
- deutsche Selbstbezeichnung ausschließlich als „digitale Assistenz“ und klares Hochdeutsch

## Erforderliche Vercel-Konfiguration

Alle vier Variablen sind serverseitig zu setzen. Keine davon darf mit `VITE_` beginnen oder im Browser ausgeliefert werden.

- `OPENAI_API_KEY`: bestehender, für den Pilot freigegebener OpenAI-Projektschlüssel.
- `NITA_WEB_VOICE_ENABLED`: nur für einen beaufsichtigten Pilot exakt auf `true` setzen. Fehlend, anders geschrieben oder `false` bedeutet `503` und damit geschlossen.
- `NITA_WEB_VOICE_ALLOWED_ORIGINS`: kommaseparierte, exakte HTTPS-Origins, zum Beispiel `https://healio.de,https://www.healio.de`. Jede Preview-Origin muss bewusst einzeln ergänzt werden. Ungültige Einträge schließen den Endpunkt vollständig.
- `NITA_WEB_VOICE_ADMISSION_SECRET`: zufälliger serverseitiger Wert mit mindestens 32 Zeichen. Er dient nur zur nicht rückrechenbaren HMAC-Pseudonymisierung der vom Hosting übergebenen Client-IP und darf nicht geloggt werden.

Optional kann `VITE_NITA_WEBRTC_SESSION_ENDPOINT` auf einen HTTPS-Endpunkt derselben Origin gesetzt werden. Ohne Variable verwendet das Frontend `/api/nita-session`. Eine Cross-Origin-URL wird vom Browsercode verworfen.

## Gesprächslebenszyklus im Browser

1. Ohne separate OpenAI-Einwilligung wird weder Mikrofonzugriff noch Session-Erstellung gestartet.
2. Nach dem Start öffnet der Browser den DataChannel `oai-events` und fordert den Initialgruß einmalig mit `response.create` an.
3. Nach jeder fertigen Antwort startet ein 30-Sekunden-Silence-Timer. Erkannte Nutzersprache (`input_audio_buffer.speech_started`) löscht ihn. Längere Stille schließt DataChannel, Peer-Verbindung, Mikrofontracks und Audioausgabe.
4. Unabhängig vom Gesprächsverlauf schließt der Browser die gesamte Verbindung spätestens 150 Sekunden nach dem Startversuch.
5. Schließen des Panels, Entzug der Einwilligung, ein Providerfehler oder ein Abbruch beendet ebenfalls alle lokalen Medienressourcen.

Die 150 Sekunden sind eine UI-Hardstop-Sicherung, aber kein nicht umgehbares Providerlimit: Ein veränderter Browserclient kann lokalen JavaScript-Code umgehen. Vor öffentlicher Skalierung ist deshalb zusätzlich eine provider- oder edge-seitige Sitzungs-/Kostenbegrenzung erforderlich.

## Serverseitige Pilot-Admission-Control

Ohne externe Datenbank begrenzt jede warme Vercel-Funktionsinstanz die Erstellung neuer Sessions auf:

- 2 Sessions je pseudonymisiertem Client innerhalb von 10 Minuten
- 10 Sessions global innerhalb einer Stunde
- 30 Sessions global innerhalb von 24 Stunden
- höchstens 512 aktive Client-Buckets im Arbeitsspeicher; bei erschöpfter Kapazität wird geschlossen

Fehlender oder ungültiger Hosting-IP-Header, zu kurzes Admission-Secret, ungültige Origin-Konfiguration und ungültige Serverzeit werden fail-closed abgewiesen. Bei einem erreichten Limit antwortet der Endpunkt mit `429` und einem begrenzten `Retry-After`. Ein zugelassener Versuch zählt bereits vor dem OpenAI-Aufruf; damit führt ein Providerfehler nicht zu kostenlosen Wiederholungsschleifen.

### Ehrliche Architekturgrenze

Die In-Memory-Zähler sind nur innerhalb einer warmen Vercel-Funktionsinstanz wirksam. Cold Starts, parallele Instanzen und horizontale Skalierung besitzen getrennte Zähler. Auch ein `Origin`-Header ist außerhalb eines unveränderten Browsers kein Authentisierungsnachweis. Diese Admission-Control ist deshalb ausschließlich eine begrenzte Pilot-Sicherung, kein global atomarer Missbrauchs- oder Kostenschutz.

Vor nennenswertem oder unbeaufsichtigtem Traffic müssen mindestens Vercel Firewall/WAF beziehungsweise ein vergleichbares Edge-Limit, providerseitige Usage-Warnungen und ein operativer Kill-Switch aktiv sein. Für belastbare globale Tages- und Clientlimits wird zusätzlich ein zentraler atomarer Store benötigt. Ein entwendeter OpenAI-Schlüssel wird durch diese Anwendungslimits nicht geschützt.

## Fail-closed und Not-Aus

- Sofortiger Not-Aus: `NITA_WEB_VOICE_ENABLED=false` setzen und die neue Vercel-Konfiguration ausrollen.
- Bei auffälligem Verbrauch zusätzlich den betroffenen OpenAI-Projektschlüssel providerseitig sperren oder rotieren.
- Responses bleiben `no-store`; Fehler geben weder Upstream-Details noch Schlüsselwerte aus.
- Der Endpunkt protokolliert keine Anfrage-, IP-, Gesprächs-, SDP- oder Schlüsseldaten.
- Andere Methoden, nicht freigegebene Origins, nicht-JSON-Anfragen, zu große Bodies, ungültiges SDP und nicht exakt erlaubte Kontextwerte werden abgewiesen.

## Prüfungen vor einer Freigabe

```text
npm run test:nita-session
npm run test:nita-admission
npm run test:contact-ui
npm run test:privacy
npm run test:security
npm run build
```

Danach auf der exakten freigegebenen HTTPS-Origin mit Mikrofon prüfen:

1. Einwilligung ist standardmäßig aus und lässt sich wieder entziehen.
2. Nita begrüßt einmalig natürlich und nennt sich „digitale Assistenz“.
3. Rückfrage, Unterbrechung und Antwortende funktionieren über den DataChannel.
4. 30 Sekunden Stille nach einer Antwort beenden die Verbindung sichtbar.
5. Spätestens nach 2:30 Minuten endet die Verbindung sichtbar und Mikrofonzugriff ist aus.
6. Der dritte Start desselben Clients innerhalb von 10 Minuten erhält `429`.
7. Mit deaktiviertem Master-Schalter ist keine neue Session möglich.

Kein Livegang allein aufgrund grüner Unit-/Vertragstests: Providerbudget, Firewall/WAF und die richtige Vercel-Environment-Zuordnung müssen im jeweiligen Projekt separat bestätigt werden.
