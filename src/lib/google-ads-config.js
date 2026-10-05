/**
 * Feste Google-Ads-Kennung für healio.de.
 *
 * Von Claude nach Anlage im Konto 442-477-8921 eintragen:
 * - GOOGLE_ADS_ID: Konto-ID des Google-Tags im Format AW-<Ziffern>
 * - LEAD_LABEL: Conversion-Label der Aktion „Anfrage“
 *   (Kontaktformular abgeschickt, Calendly- oder Google-Kalender-Buchung)
 * - ANTRAG_LABEL: Conversion-Label der Aktion „Antrag geöffnet“
 *   (Klick auf den Abschluss- oder Rechnerlink eines Versicherers)
 *
 * Die Werte sind keine Geheimnisse, sie stehen ohnehin im ausgelieferten
 * Seitenquelltext. Damit funktioniert die Messung ohne Vercel-Variablen.
 * Eine gesetzte Umgebungsvariable (VITE_GOOGLE_ADS_*) hat Vorrang.
 * Solange die Werte leer sind, bleibt die Google-Ads-Messung vollständig still.
 */
export const GOOGLE_ADS_ID = '';
export const LEAD_LABEL = '';
export const ANTRAG_LABEL = '';
