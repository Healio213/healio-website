/**
 * Texte der Meta-Zielseiten /check/naturheilkunde und /check/schwangerschaft.
 *
 * Leitplanken (Rote Linie B2C, Kampagnendateien vom 18.10.2026):
 * - Kopfzeile wörtlich wie die Anzeige.
 * - Erstattung immer „je nach Tarif 50 bis 100 %“, Leistungen erst ab
 *   Versicherungsbeginn, nie „laufende Behandlungen“ oder „Soforttarif“.
 * - Kassenbonus mit Pflicht-Zusatz in Sichtnähe, Dreiklang laut Satzung.
 * - Keine Gesundheitsangaben abfragen: weder Behandlung noch Schwangerschaft,
 *   Befunde oder Termine. Gefragt werden nur Interesse und Krankenkasse.
 */

export const KRANKENKASSEN = [
  { value: 'tk', label: 'TK' },
  { value: 'barmer', label: 'Barmer' },
  { value: 'dak', label: 'DAK' },
  { value: 'aok', label: 'AOK' },
  { value: 'ikk-classic', label: 'IKK classic' },
  { value: 'andere', label: 'Andere' },
];

const KASSE_STEP = {
  id: 'kasse',
  question: 'Bei welcher Krankenkasse bist du?',
  hint: 'Damit wir sehen, wie viel Bonus deine Kasse laut Satzung dazugibt.',
  options: KRANKENKASSEN,
  grid: true,
};

const BONUS_ZUSATZ = 'Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus.';

export const META_CHECKS = {
  naturheilkunde: {
    key: 'naturheilkunde',
    path: '/check/naturheilkunde',
    thankYouPath: '/check/naturheilkunde/danke',
    pageSource: 'Meta-Check Naturheilkunde',
    // Darf nur ein fester Seitenschlüssel aus META_PAGE_KEYS sein.
    metaContentName: 'ambulant',
    seoTitle: 'Kurzcheck Osteopathie und Heilpraktiker | Healio',
    seoDescription: 'Prüfe in 45 Sekunden, was eine ambulante Zusatzversicherung bei Osteopathie und Heilpraktiker erstattet und wie dein Kassenbonus den Beitrag mitzahlen kann.',
    badge: 'Osteopathie · Heilpraktiker',
    title: 'Schon wieder 360 € selbst gezahlt?',
    lead: 'Prüfe in 45 Sekunden, was eine ambulante Zusatzversicherung bei Osteopathie und Heilpraktiker erstattet und wie dein Kassenbonus den Beitrag mitzahlen kann.',
    bullets: ['Ohne Wartezeit', 'Je nach Tarif 50 bis 100 %', 'Mit Berechnung deines Kassenbonus'],
    steps: [
      {
        id: 'thema',
        question: 'Was ist dir wichtig?',
        hint: 'Tipp einfach an, was am besten passt.',
        options: [
          { value: 'osteopathie', label: 'Osteopathie' },
          { value: 'heilpraktiker', label: 'Heilpraktiker' },
          { value: 'akupunktur-tcm', label: 'Akupunktur und TCM' },
          { value: 'alles', label: 'Alles zusammen' },
        ],
      },
      KASSE_STEP,
    ],
    footnotes: [
      'Rechenbeispiel: 4 × 90 € Osteopathie = 360 €. Erstattet wird je nach Tarif 50 bis 100 % im Rahmen der Höchstbeträge, für Behandlungen ab Versicherungsbeginn.',
      BONUS_ZUSATZ,
    ],
    thankYou: {
      text: 'Wir rechnen jetzt aus, was ein passender Zusatzschutz bei Osteopathie und Heilpraktiker erstattet und wie viel dein Kassenbonus zum Beitrag beisteuert. Danach melden wir uns bei dir, so wie du es angegeben hast.',
      termin: 'Erstattet werden Behandlungen ab Versicherungsbeginn. Wenn du schneller starten möchtest, such dir direkt einen Gesprächstermin aus.',
    },
  },
  schwangerschaft: {
    key: 'schwangerschaft',
    path: '/check/schwangerschaft',
    thankYouPath: '/check/schwangerschaft/danke',
    pageSource: 'Meta-Check Schwangerschaft',
    // Diese Strecke misst nichts an Meta, Google oder Analyse (wie /schwangerschaft).
    metaContentName: null,
    seoTitle: 'Kurzcheck Vorsorge in der Schwangerschaft | Healio',
    seoDescription: 'Prüfe in 45 Sekunden, welcher Zusatzschutz Feinultraschall, Toxoplasmose und Streptokokken erstattet und wie viel dein Kassenbonus zum Beitrag beisteuert.',
    badge: 'Vorsorge-Extras · Kurzcheck',
    title: 'Feinultraschall und Bluttests selbst zahlen?',
    lead: 'Zusatzschutz für diese Vorsorge gibt es auch, wenn du schon schwanger bist. Den Beitrag kann dein Kassenbonus mitzahlen: laut Satzung der IKK classic bis zu 810 € im Jahr, für Schwangere bis zu 1.155 €, in der Regel 400 bis 700 €.',
    bullets: ['Vorsorge ohne Wartezeit', 'Je nach Tarif 50 bis 100 %', 'Mit Berechnung deines Kassenbonus'],
    steps: [
      {
        id: 'thema',
        question: 'Was interessiert dich?',
        hint: 'Tipp einfach an, was am besten passt.',
        options: [
          { value: 'vorsorge', label: 'Vorsorge in der Schwangerschaft' },
          { value: 'klinikschutz-kind', label: 'Klinikschutz fürs Kind' },
          { value: 'beides', label: 'Beides' },
        ],
      },
      KASSE_STEP,
    ],
    footnotes: [
      'Der Vorsorge-Topf erstattet Selbstzahlerleistungen wie Feinultraschall, Toxoplasmose und Streptokokken, je nach Tarif 50 bis 100 %. Eine bestehende Schwangerschaft gehört in die Gesundheitsfragen, der Versicherer prüft den Antrag. Schon angeratene Untersuchungen sind nicht automatisch mitversichert.',
      `Kassenbonus: Rechenbeispiel IKK classic laut Satzung, als Zuschuss für deinen Zusatzschutz, höchstens bis zur Höhe deines Beitrags. ${BONUS_ZUSATZ}`,
    ],
    thankYou: {
      text: 'Wir rechnen jetzt aus, welcher Zusatzschutz zu dir passt und wie viel deine Krankenkasse laut Satzung zum Beitrag beisteuert. Danach melden wir uns bei dir, so wie du es angegeben hast.',
      termin: 'Erstattet wird erst ab Versicherungsbeginn. Wenn du schneller starten möchtest, such dir direkt einen Gesprächstermin aus.',
    },
  },
};
