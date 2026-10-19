# Kurzcheck Schwangerschaft: EU-Weg und Hinweis an info@

Stand: 19.10.2026. Vorbereitet, nichts davon ist live.

## Wie es läuft

1. Das Formular auf `/check/schwangerschaft` schickt die Anfrage an `api/kurzcheck-lead.js` (Vercel, Region Frankfurt).
2. Die Funktion speichert zuerst in Supabase Frankfurt (`public.kurzcheck_leads`, nur über `submit_kurzcheck_lead` mit Token).
3. Erst danach geht ein Hinweis an den eigenen n8n-Weiterleiter auf dem Hetzner-Server (`https://n8n.healio.de/webhook/healio-kurzcheck-hinweis`). Er prüft die Felder und schickt über den vorhandenen Brevo-Zugang eine Transaktionsmail an info@healio.de: nur Kennung, Fassung der Einwilligung und Eingangszeit. Keine Brevo-Kontakte, keine Listen, kein Kaltversand.
4. Ob der Hinweis ankam, steht je Anfrage in `notified_at` und `notify_failures`. Ein Fehlschlag steht zusätzlich als `kurzcheck_hinweis_fehlgeschlagen` im Vercel-Log, ohne Personendaten.
5. Jeden Morgen (Vercel Cron, 05:00 UTC, im Hobby-Tarif bis 59 Minuten später) prüft `api/kurzcheck-erinnerung.js` die Zählwerte. Gibt es Anfragen ohne Eingangsmail oder seit über 24 Stunden mit Status „neu“, kommt die Mail „Kurzcheck: offene Anfragen“. Scheitert auch sie, ist der Cron-Lauf in Vercel rot und die Anfragen bleiben für den nächsten Morgen offen.
6. Scheitert schon das Speichern, kommt die Mail „Kurzcheck: Anfrage konnte nicht gespeichert werden“ mit Fehlerart und Zeit.

## Was Frank tun muss

Nichts eintragen. Brevo-Zugang, Absender info@healio.de und n8n sind vorhanden (Phase `inspect` hat das am 19.10.2026 bestätigt). Frank gibt nur das Go; vorher entscheidet er über den Vercel-Tarif und die Region Frankfurt für alle Funktionen (siehe Übergabe).

## Reihenfolge beim Livegang (macht Claude nach Franks Go)

1. Migration `docs/supabase/2026-10-19_kurzcheck_leads.sql` einspielen (Supabase-MCP, `apply_migration`).
2. `python3 docs/kurzcheck-hinweis/setup_kurzcheck_hinweis.py prepare`: legt die Header-Credential und den inaktiven Workflow in n8n an.
3. `python3 docs/kurzcheck-hinweis/setup_kurzcheck_hinweis.py activate`: aktiviert den Workflow, prüft drei Negativfälle und legt vier verschlüsselte Production-Variablen in Vercel an:
   - `KURZCHECK_INGEST_TOKEN`
   - `KURZCHECK_NOTIFY_WEBHOOK_URL`
   - `KURZCHECK_NOTIFY_WEBHOOK_SECRET`
   - `CRON_SECRET`
   Danach steht im Checkpoint `Healio/Kurzcheck-Hinweis/checkpoint.json` der SHA-256-Wert `ingest_token_sha256`.
4. Diesen Wert in `private.kurzcheck_ingest_tokens` eintragen (SQL im Kopf der Migration).
5. `python3 docs/kurzcheck-hinweis/setup_kurzcheck_hinweis.py test`: genau eine Testmail „Kurzcheck: Testmail des Hinweiswegs“ an info@healio.de. Erwartet: Ausgabe `"test_mail": {"accepted": true, ...}` und die Mail im Posteingang.
6. Deploy über GitHub `main` (Vercel übernimmt die neuen Variablen erst mit dem Deploy).
7. Echter Durchlauf: einmal `/check/schwangerschaft` mit einer Testangabe absenden. Erwartet: Dankeseite, Mail „Neue Kurzcheck-Anfrage“ mit derselben Kennung wie in `kurzcheck_leads`, dort `notified_at` gesetzt. Testzeile danach löschen (der Nachweis bekommt dabei seine Frist ab Löschung).

## Falls der vorhandene Brevo-Zugang in n8n einmal erneuert werden muss

Neuen Schlüssel in Brevo oben rechts über das Menü am Kontonamen → „SMTP & API“ → Reiter „API-Schlüssel“ → „Neuen API-Schlüssel generieren“ erzeugen und nur in n8n bei der Credential „Brevo API (Auffangnetz)“ eintragen. In Vercel gehört kein Brevo-Schlüssel.

## Prüfungen

- `npm run test:kurzcheck-lead`: Funktion, Erinnerung, Weiterleiter-Code, Migration, Datenschutztexte.
- `python3 -m unittest discover -s docs/kurzcheck-hinweis -p 'test_setup_kurzcheck_hinweis.py' -v`: Einrichtungsskript ohne Netz.
