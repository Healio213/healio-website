# Blog-Schnappschuss: Bau bei Ausfall der Content-API

Stand: 13.11.2026

Der Bau holt die Blogartikel live von `app.healio.de` (Content-API mit Supabase dahinter). Hängt
diese Schnittstelle, versucht der Bau jeden Abruf bis zu dreimal (je 8 Sekunden Zeitgrenze) und
nimmt danach den Schnappschuss `public/data/blog-articles-cache.json`. Das betrifft die
Artikelseiten (`scripts/generate-seo-pages.mjs`) und die Listen auf `/blog` und `/ratgeber`
beim Vorrendern (`scripts/prerender.mjs`, Logik in `scripts/lib/contentApiFallback.mjs`). Fehlt
der Schnappschuss oder ein benötigter Artikel darin, bricht der Bau ab wie bisher. Im Störfall
dauert der Bau knapp eine Minute länger als sonst (je rund 27 Sekunden Warten beim Erzeugen der
Artikelseiten und einmal vor dem Vorrendern; danach wird nicht mehr gewartet).

**Warnung im Bauprotokoll:** `WARNUNG: SCHNAPPSCHUSS VERWENDET` heißt: Die Seite ging mit dem
Artikelstand aus dem Schnappschuss raus, nicht mit dem Live-Stand. Die Meldung nennt die ersetzten
Abrufe und das Alter des Stands. Sobald die API wieder läuft, einfach neu bauen lassen. Der
Hinweis `Schnappschuss weicht ... vom Live-Stand ab` erscheint im Normalbau und heißt nur: Der
Schnappschuss sollte aufgefrischt werden.

**Auffrischen:** `npm run sync:blog-cache` holt alle veröffentlichten Artikel, prüft sie,
schreibt den Schnappschuss, den Zeitstempel `scripts/data/blog-articles-cache-stand.json` und die
Änderungsdaten in `public/sitemap.xml`. Danach die drei Dateien committen. Ein normaler Bau ändert
keine Dateien. Spätestens nach neuen oder geänderten Artikeln auffrischen; ab 14 Tagen Alter
markiert die Warnung den Stand als alt.

**Störfall lokal nachstellen** (wirkt auf Vercel und in CI nicht):
`HEALIO_BUILD_TEST_CONTENT_API_ORIGIN=http://127.0.0.1:<Port eines nicht antwortenden Servers> npm run build`
