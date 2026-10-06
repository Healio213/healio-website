/**
 * Autoren der Ratgeberartikel (Opt-in über das Feld author im Artikel).
 *
 * Grundlage: Marktanalyse 06.10.2026, Hebel "Person als Absender" (I-1).
 * Frank erscheint als Gründer mit Gesicht (seit 21.09.2026 für Werbung
 * gewollt). Die Berufsbezeichnung wird bewusst NICHT vorangestellt (Franks
 * Regel "kein Makler-Label"): Die Erlaubnis nach § 34d GewO hält die Healio
 * GmbH, deshalb steht sie im Kasten als Angabe zur Firma, mit der
 * Registrierungsnummer aus dem Impressum (src/i18n/locales/de/legal.json).
 *
 * Dieselben Angaben speisen den sichtbaren Kasten und die Person in den
 * strukturierten Daten, damit beide nie auseinanderlaufen.
 */

export const AUTHORS = Object.freeze({
  'frank-steinfurt': Object.freeze({
    id: 'frank-steinfurt',
    name: 'Frank Steinfurt',
    role: 'Gründer und Geschäftsführer der Healio GmbH',
    // Quadratischer Ausschnitt aus /images/frank-steinfurt-gruender-healio.webp
    // (Foto wie auf /about), 240 x 240, rund 7 KB.
    image: '/images/frank-steinfurt-autor-240.webp',
    imageAlt: 'Frank Steinfurt, Gründer und Geschäftsführer der Healio GmbH',
    profilePath: '/about',
    bio: 'Frank hat Healio gegründet, weil viele Menschen Zahnarzt, Vorsorge und Therapie selbst zahlen oder verschieben, obwohl Kasse, Kassenbonus und Zusatzschutz zusammen oft mehr tragen, als man denkt. In seinen Ratgebern rechnet er mit Satzungen, Gesetzestexten und Tarifunterlagen, nicht mit Werbeversprechen.',
    permission: 'Die Healio GmbH hat die Erlaubnis nach § 34d Abs. 1 GewO und ist im Vermittlerregister unter der Registrierungsnummer D-C1LE-OVLQH-98 eingetragen (Registrierungsstelle IHK Hamburg).',
    registerUrl: 'https://www.vermittlerregister.info',
    registerNumber: 'D-C1LE-OVLQH-98',
  }),
});

export const getAuthor = (id) => (id ? AUTHORS[id] || null : null);

/**
 * Person für die Article-Auszeichnung. Bild und Profil als absolute Adressen.
 */
export const authorSchemaFor = (id, siteUrl = 'https://healio.de') => {
  const author = getAuthor(id);
  if (!author) return null;
  return {
    '@type': 'Person',
    // Gleiche Kennung wie der Gründer-Knoten in index.html, damit Google
    // Autor und Gründer als dieselbe Person erkennt.
    '@id': `${siteUrl}/#${author.id.replace(/-/g, '_')}`,
    name: author.name,
    jobTitle: 'Gründer und Geschäftsführer',
    url: `${siteUrl}${author.profilePath}`,
    image: `${siteUrl}${author.image}`,
    worksFor: { '@id': `${siteUrl}/#organization` },
  };
};
