/**
 * Feste Google-Ads-Kennung für healio.de.
 *
 * Angelegt am 05.10.2026 im Konto 442-477-8921 (Aktionen „Healio Anfrage“ und
 * „Healio Antrag geöffnet“):
 * - GOOGLE_ADS_ID: Konto-ID des Google-Tags im Format AW-<Ziffern>
 * - LEAD_LABEL: Conversion-Label der Aktion „Anfrage“
 *   (CMS-Anfrage bestätigt, Kontaktformular abgeschickt oder Kalenderlink geklickt)
 * - ANTRAG_LABEL: Conversion-Label der Aktion „Antrag geöffnet“
 *   (Klick auf den Abschluss- oder Rechnerlink eines Versicherers)
 *
 * Die Werte sind keine Geheimnisse, sie stehen ohnehin im ausgelieferten
 * Seitenquelltext. Damit funktioniert die Messung ohne Vercel-Variablen.
 * Eine gesetzte Umgebungsvariable (VITE_GOOGLE_ADS_*) hat Vorrang.
 * Solange die Werte leer sind, bleibt die Google-Ads-Messung vollständig still.
 */
export const GOOGLE_ADS_ID = 'AW-18466451887';
export const LEAD_LABEL = '27UQCIu4iZIdEK_jvuVE';
export const ANTRAG_LABEL = 'AshWCI64iZIdEK_jvuVE';
