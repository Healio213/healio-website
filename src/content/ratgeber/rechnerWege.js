/**
 * Rechner-Karte am Ende jedes Ratgebers mit Themengruppe (Auftrag Frank,
 * 08.10.2026): ein einheitlicher Einstieg in den passenden Rechner, vor
 * Quellen und Autorenkasten.
 *
 * Gesteuert über die Gruppe aus gliederung.js. Die Artikelseite bekommt die
 * Gruppe aus registry.loaders.js (RATGEBER_GROUP_OF), die Vorlage löst hier
 * die Karte auf. Ein Artikel kann abweichen:
 *   rechner: false              keine Karte
 *   rechner: { to, title, ... } Felder einzeln überschreiben
 * Artikel mit internem Button (internalCta) haben schon einen Schluss-Button
 * und bekommen keine zweite Karte.
 *
 * Interne Ziele behalten den Anker; die Vorlage hängt nur eine gültige
 * Google-Klick-Kennung an (withAdClickIds), wie bei Kurzantwort und Weg-Karten.
 * Die Karte selbst misst nichts. Texte in Du-Form, ohne Gedankenstriche und
 * ohne Sperrwörter (scripts/check-ratgeber-contract.mjs, Abschnitt 9b).
 */

const KASSENBOOST_RECHNER_URL = 'https://kassenboost.de/?utm_source=healio&utm_medium=ratgeber&utm_campaign=ratgeber-rechner#vergleich';

const ZAHN = {
  to: '/zahn#zahn-check',
  icon: 'dental',
  eyebrow: 'Zahn-Check',
  title: 'Welcher Zahntarif passt zu dir?',
  text: 'Vier kurze Fragen, rund eine Minute, keine Kontaktdaten. Danach siehst du, welchen Tarifweg du als Nächstes prüfen solltest.',
  label: 'Zum Zahn-Check',
};

const AMBULANT = {
  to: '/ambulant#tarifwahl',
  icon: 'calculator',
  eyebrow: 'Beitragsrechner',
  title: 'Was kostet dich der ambulante Tarif?',
  text: 'Wähle die Stufe und gib dein Geburtsjahr ein. Du siehst deinen Monatsbeitrag und wie viel in jedem Leistungstopf steckt.',
  label: 'Beitrag berechnen',
};

const KLINIK = {
  to: '/stationaer#tarife',
  icon: 'hospital',
  eyebrow: 'Beitragsrechner',
  title: 'Was kostet dich der Klinik-Tarif?',
  text: 'Wähle zuerst den Leistungsumfang. Danach rechnest du mit Versicherungsbeginn und Geburtsdatum deinen persönlichen Beitrag aus.',
  label: 'Klinikschutz berechnen',
};

const FAMILIE = {
  to: '/stationaer#familie',
  icon: 'family',
  eyebrow: 'Klinikschutz für die Familie',
  title: 'Dein Kind ab Geburt im Klinik-Tarif',
  text: 'Sieh dir an, wie die Nachversicherung fürs Baby funktioniert, und rechne danach deinen eigenen Beitrag aus.',
  label: 'Klinikschutz berechnen',
};

const KASSE = {
  href: KASSENBOOST_RECHNER_URL,
  icon: 'comparison',
  eyebrow: 'KassenBoost-Vergleich',
  title: 'Welche Kasse zahlt dir am meisten?',
  text: 'Vergleiche Bonus, Zusatzbeitrag und Extras der Krankenkassen auf kassenboost.de. Die Wahl der Kasse bleibt deine.',
  label: 'Kassen vergleichen',
};

export const RATGEBER_RECHNER_JE_GRUPPE = Object.freeze({
  zaehne: ZAHN,
  ambulant: AMBULANT,
  brille: AMBULANT,
  vorsorge: AMBULANT,
  krankenhaus: KLINIK,
  familie: FAMILIE,
  'kasse-bonus': KASSE,
});

/**
 * Karte für einen Artikel oder null. groupId kommt aus RATGEBER_GROUP_OF.
 */
export const resolveRatgeberRechner = (article, groupId) => {
  if (!article || article.kind !== 'ratgeber' || article.internalCta) return null;
  if (article.rechner === false) return null;
  const base = RATGEBER_RECHNER_JE_GRUPPE[groupId];
  if (!base) return null;
  const override = article.rechner && typeof article.rechner === 'object' ? article.rechner : {};
  // Ein eigenes internes Ziel ersetzt ein externes und umgekehrt.
  const target = override.to ? { to: override.to, href: undefined } : override.href ? { href: override.href, to: undefined } : {};
  return { ...base, ...override, ...target };
};

export default resolveRatgeberRechner;
