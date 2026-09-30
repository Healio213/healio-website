# Abschnitt zur App Healio Tree in der Datenschutzerklärung

**Status: EINGEBAUT im Zweig `release/datenschutz-healio-tree`, nicht veröffentlicht.** Stand 30.09.2026. Veröffentlicht wird nur über `main` (DEPLOY.md), und nur mit Franks Freigabe.

## Was eingebaut ist

Neuer Abschnitt „App Healio Tree“ (Anker `#healio-tree`) nach „Eingesetzte Dienste und Drittanbieter“ und vor „3. Benutzerrechte“, Texte in `src/i18n/locales/de/legal.json` und `en/legal.json` (Schlüssel `app*`, `anlage*`, `kanzlei*`, `mailboxTitle`), Aufbau in `src/pages/DatenschutzPage.jsx`:

- App: rechnet und speichert nur auf dem Gerät, kein Server, kein Konto, kein Tracking, Chat aus, App-Stores, Links.
- `#anfragen-app`: Anfragen nur als E-Mail an info@healio.de, die die Person selbst abschickt, nicht über WhatsApp.
- `#anfragen-versicherung`: Healios eigene Themen (Fassung `anfrage-2026-09-29`).
- `#anfragen-geldanlage`: Geldanlage und Kapitalanlage, Weitergabe an Kooperationspartner nur nach Zustimmung (Fassung `anlage-2026-09-29`).
- `#anfragen-kanzlei`: „Steuerberater gesucht“ (Fassung `kanzlei-2026-09-30`).
- `#aufbewahrung-anfragen`: Postfach bei Google Workspace, Anfrage bis erledigt und höchstens 180 Tage, Nachweis fünf Jahre (Label `Healio Tree/Anfragen` und `Healio Tree/Nachweise`).
- `#widerruf-app`: Widerruf per E-Mail und über die vorbereitete E-Mail in der App.

## Grundlage und Grenzen

- Quellen: `Steuerlogik-App/33_Datenschutz_healio_de_Entwurf.md`, `Steuerlogik-App/app/src/online/einwilligungen.json`, `Steuerlogik-App/app/src/healio/anfrage.ts` und `anfrageMail.ts`, `Steuerlogik-App/server/DATENSCHUTZ.md`, `Steuerlogik-App/recht/EINWILLIGUNGEN_UND_NACHWEISE.md` Abschnitt 2 und 3.
- Die Sätze „speichert nur auf Ihrem Gerät“ und „mit keinem Server verbunden“ gelten, solange `extra.online.basisUrl` in `app.json` leer und `extra.funktionen.chat` aus ist. Gehen Chat oder Direktversand über den Server live, braucht die Erklärung vorher eigene Abschnitte (Entwurf in `server/DATENSCHUTZ.md`: Supabase Frankfurt, Anthropic USA, Tageszähler, Protokolle).
- Nicht geprüft: ob der Workspace-Tarif Google Vault hat und wo Google speichert. Die Erklärung sagt deshalb nicht „in Deutschland“.
