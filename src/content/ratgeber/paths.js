/**
 * Adressen des Ratgebers. Eigene kleine Datei, damit Seiten den Pfad bauen
 * können, ohne Gliederung oder Metadaten aller Artikel mitzuladen.
 */
export const RATGEBER_BASE_PATH = '/ratgeber';

export const getRatgeberPath = (slug) => `${RATGEBER_BASE_PATH}/${slug}`;
