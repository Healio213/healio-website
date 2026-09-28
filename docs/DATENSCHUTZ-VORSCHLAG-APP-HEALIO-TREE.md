# Vorschlag: Abschnitt zur App Healio Tree in der Datenschutzerklärung

**Status: VORSCHLAG, NICHT EINGEBAUT.** Stand 28.09.2026. Frank entscheidet, ob und wann dieser Abschnitt auf healio.de/datenschutz erscheint.

## Anlass

Die Datenschutzerklärung auf healio.de erwähnt die App Healio Tree bisher nicht. Der neue Abschnitt „Anfragen zu Geldanlage und Kapitalanlage, Weitergabe an Kooperationspartner“ (eingebaut, `src/i18n/locales/de/legal.json`, Schlüssel `anlage*`) nennt die App nur als Beispiel für den Anfrageweg.

## Vorgeschlagener Text (Sie-Form, Platz: direkt vor dem Abschnitt zu Geldanlage und Kapitalanlage)

**App Healio Tree**

Die App Healio Tree rechnet auf Ihrem Gerät. Ihre Angaben, Szenarien und Einstellungen bleiben dort und werden nicht an Healio übertragen. Eine Anfrage erreicht uns erst, wenn Sie sie selbst absenden, derzeit per E-Mail oder WhatsApp aus der App heraus. Welche Angaben eine Anfrage zu Geldanlage oder Kapitalanlage enthält und wie wir sie verarbeiten, steht im folgenden Abschnitt.

## Grundlage und Grenzen

- Quelle: `Steuerlogik-App/server/DATENSCHUTZ.md` Abschnitt 1 („Was bleibt auf deinem Gerät?“), `app/src/healio/anfrage.ts` (Anfrage wird lokal gespeichert, Versand per WhatsApp oder E-Mail mit vorausgefülltem Text), `app/src/inhalt/themenTexte.ts` („Das Absenden direkt aus der App kommt später.“).
- Der Satz „bleiben dort“ gilt nur, solange der Erklär-Chat im Beispielmodus läuft (Fassung `chat-2026-09-25` nicht freigegeben) und die App nicht selbst an den Server sendet. Sobald Chat oder Direktversand live gehen, braucht die Erklärung eigene Abschnitte dafür (Entwurf in `server/DATENSCHUTZ.md`: Supabase Frankfurt, Anthropic USA, Tageszähler, Protokolle).
- Allgemeine Anfragen aus der App zu Vorsorge und Absicherung (Einwilligung `anfrage-2026-09-25`) deckt die Erklärung noch nicht eigens ab.
