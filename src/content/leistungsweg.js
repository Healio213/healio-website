/**
 * Leistungsweg: Jeder Ratgeber und jeder Blogartikel führt zur passenden
 * Leistungsseite, mindestens zur Bausteinübersicht /leistungen (Auftrag Frank,
 * 27.10.2026: „Es gilt natürlich für alle Ratgeber“).
 *
 * Diese Datei ist die einzige Stelle für
 *   - die Zuordnung Slug oder Themengruppe -> Leistungsseite (Rückfall
 *     /leistungen, auch für künftige Ratgeber und Blogartikel),
 *   - die Texte des Zwischendurch-Hinweises und des Abschluss-Blocks, je
 *     Ziel einmal formuliert (mit wenigen Varianten je Themenfeld),
 *   - die Planung, wo im Artikel die Hinweise stehen.
 *
 * Gezeigt wird das in src/components/leistungsweg/LeistungsHinweis.jsx
 * (Ratgeber-Vorlage und Blogartikel) und als statisches HTML in
 * scripts/generate-seo-pages.mjs. Geprüft von
 * scripts/check-leistungsweg-contract.mjs (npm run test:leistungsweg).
 *
 * Bewusst ohne Alias-Importe (@/...), damit Node-Skripte die Datei direkt
 * laden können. Sie importiert keine Artikelliste (registry.js,
 * gliederung.js), nur die kleine Hilfe für Wortzahlen und die Rechner-Karte.
 *
 * Texte: Du-Form, echte Umlaute, keine Gedankenstriche, Nutzen zuerst, der
 * Kassenbonus nur als Zusatz danach (er trägt den Beitrag, nie Bargeld).
 * Alle Zahlen stehen wortgleich auf der Zielseite:
 *   - ambulant 50 bis 100 Prozent je Stufe, Sehhilfen in jeder Stufe 100
 *     Prozent bis der Topf ausgeschöpft ist, jeder Topf ab Beginn in voller
 *     Höhe (AmbulantAufEinenBlick.jsx, AmbulantConversionFlow.jsx, SDK-AVB
 *     1.753a),
 *   - Gesundheitsfragen ja, keine Ablehnung (Rote Linie, /ambulant),
 *   - Zahn, stationär, Tier: Formulierungen der Karten auf /leistungen
 *     (src/i18n/locales/de/leistungen.json, paths.items),
 *   - Schwangerschaft: Vorsorge-Topf auch bei festgestellter Schwangerschaft
 *     (src/components/BenefitFunnelPage.jsx).
 *
 * Eine Abschluss-Karte (Frank, 27.10.2026): Am Ende steht genau eine Karte auf
 * eine Healio-Seite, dazu der Textlink „Alle Bausteine ansehen“. Zeigt die
 * Rechner-Karte der Gruppe auf eine andere Seite als der Abschluss-Block,
 * schaltet der Artikel sie mit rechner: false ab (Schwangerschaft) oder das
 * Ziel folgt der Rechner-Karte (familienversicherung-krankenkasse). Externe
 * Karten wie der KassenBoost-Vergleich zählen nicht als Healio-Seite.
 * Knopftexte nennen den Baustein („Baustein … ansehen“, „Zum Baustein …“),
 * nie „Zur Seite …“.
 */

import { collectBlockText } from './ratgeber/articleText.js';
import { resolveRatgeberRechner } from './ratgeber/rechnerWege.js';

export const LEISTUNGEN_PFAD = '/leistungen';

// Ab dieser Wortzahl im Fließtext bekommt eine Seite einen zweiten
// Zwischendurch-Hinweis, sofern dort noch kein gleichwertiger Hinweis steht.
export const ZWEITER_HINWEIS_AB_WOERTERN = 1800;

// Steht im Ratgeber schon ein gleichwertiger Hinweis (Weg-Karte, Karten,
// Tarifvergleich) auf dieselbe Seite in diesem Bereich des Fließtexts, ist er
// der Zwischendurch-Hinweis. Ein neuer Hinweis käme nur doppelt dazu.
export const MITTE_BEREICH = Object.freeze([0.12, 0.7]);
// Mindestabstand eines neuen Hinweises zu einem gleichwertigen Hinweis auf
// dieselbe Seite: ein Fünftel des Fließtexts, mindestens 300 Wörter.
export const MIN_ABSTAND_ANTEIL = 0.2;
export const MIN_ABSTAND_WOERTER = 300;

/* -------------------------------------------------------------------------
 * Ziele und Texte
 * ---------------------------------------------------------------------- */

// mitte: frage (fett), text (ein Satz), label (Knopf)
// ende:  titel, text (ein Satz Nutzen), label (Hauptknopf)
// alleBausteine: Textlink „Alle Bausteine ansehen“ auf /leistungen zeigen.
export const LEISTUNGSZIELE = Object.freeze({
  ambulant: {
    to: '/ambulant',
    icon: 'ambulant',
    alleBausteine: true,
    mitte: {
      frage: 'Heilpraktiker oder Osteopathie selbst bezahlen?',
      text: 'Der Baustein ambulant erstattet je nach Tarif 50 bis 100 Prozent.',
      label: 'Baustein ansehen',
    },
    ende: {
      titel: 'Welcher Baustein passt zu dir?',
      text: 'Ein Tarif für Heilpraktiker, Osteopathie, Brille und Vorsorge, und jeder Topf steht dir ab Beginn in voller Höhe zur Verfügung. Gesundheitsfragen ja, keine Ablehnung.',
      label: 'Zum Baustein ambulant',
    },
    varianten: {
      brille: {
        icon: 'glasses',
        mitte: {
          frage: 'Brille oder Kontaktlinsen selbst bezahlen?',
          text: 'Im Baustein ambulant gibt es für Sehhilfen in jeder Stufe 100 Prozent, bis der Topf ausgeschöpft ist.',
        },
      },
      vorsorge: {
        icon: 'prevention',
        mitte: {
          frage: 'Vorsorge, die deine Kasse nicht zahlt?',
          text: 'Der Baustein ambulant erstattet sie je nach Tarif zu 50 bis 100 Prozent.',
        },
      },
      // Zuzahlungs-Ratgeber: der eigene Topf für gesetzliche Zuzahlungen und
      // verordnete Hilfsmittel (AmbulantConversionFlow.jsx, pots.copay).
      zuzahlung: {
        mitte: {
          frage: 'Zuzahlungen für Medikamente oder Physiotherapie?',
          text: 'Der Baustein ambulant hat einen eigenen Topf für gesetzliche Zuzahlungen und verordnete Hilfsmittel.',
        },
        ende: {
          text: 'Ein Tarif für Heilpraktiker, Osteopathie, Brille, Vorsorge und Zuzahlungen, und jeder Topf steht dir ab Beginn in voller Höhe zur Verfügung. Gesundheitsfragen ja, keine Ablehnung.',
        },
      },
      kasse: {
        mitte: {
          frage: 'Heilpraktiker oder Brille aus eigener Tasche?',
          text: 'Der Baustein ambulant erstattet je nach Tarif 50 bis 100 Prozent. Den Beitrag kann dein Kassenbonus mittragen.',
        },
      },
      praxis: {
        mitte: {
          frage: 'Deine Patienten zahlen die Behandlung selbst?',
          text: 'Der Baustein ambulant erstattet ihnen Heilpraktiker und Osteopathie je nach Tarif zu 50 bis 100 Prozent.',
        },
        ende: {
          titel: 'Welcher Baustein hilft deinen Patienten?',
          text: 'Ein Tarif für Heilpraktiker, Osteopathie, Brille und Vorsorge, und jeder Topf steht ab Beginn in voller Höhe zur Verfügung. Gesundheitsfragen ja, keine Ablehnung.',
        },
      },
    },
  },
  zahn: {
    to: '/zahn',
    icon: 'dental',
    alleBausteine: true,
    mitte: {
      frage: 'Hoher Eigenanteil beim Zahnarzt?',
      text: 'Der Baustein Zahn kann Eigenanteile für Zahnersatz, Behandlung und Prophylaxe planbarer machen.',
      label: 'Baustein ansehen',
    },
    ende: {
      titel: 'Welcher Baustein passt zu dir?',
      text: 'Der Zahn-Check zeigt dir in rund einer Minute deinen Tarifweg, damit du beim Zahnarzt nach Qualität entscheidest und nicht nur nach dem Preis.',
      label: 'Zum Baustein Zahn',
    },
  },
  stationaer: {
    to: '/stationaer',
    icon: 'hospital',
    alleBausteine: true,
    mitte: {
      frage: 'Lieber Chefarzt und Zweibettzimmer?',
      text: 'Im Baustein stationär ist beides je nach Tarif versichert, dazu eine erweiterte Krankenhauswahl.',
      label: 'Baustein ansehen',
    },
    ende: {
      titel: 'Welcher Baustein passt zu dir?',
      text: 'Wichtige Entscheidungen triffst du besser vor der Aufnahme. Je nach Tarif sind Chefarzt, Ein- oder Zweibettzimmer und eine erweiterte Krankenhauswahl versichert.',
      label: 'Zum Baustein stationär',
    },
    varianten: {
      // Familienversicherung: Kinder-Klinikschutz statt Chefarzt für dich.
      // Wortlaut wie auf /schwangerschaft (BenefitFunnelPage.jsx) und
      // /stationaer#familie (SP1 Ein- oder Zweibettzimmer, SP2 Zweibettzimmer).
      // Abschluss ist die Rechner-Karte „Klinikschutz für die Familie“.
      familie: {
        icon: 'family',
        mitte: {
          frage: 'Dein Kind muss ins Krankenhaus?',
          text: 'Im Baustein stationär bekommt es je nach Tarif Chefarzt und ein Ein- oder Zweibettzimmer.',
        },
      },
    },
  },
  schwangerschaft: {
    to: '/schwangerschaft',
    icon: 'pregnancy',
    alleBausteine: true,
    mitte: {
      frage: 'Schon schwanger?',
      text: 'Der Vorsorge-Topf zahlt Selbstzahlerleistungen wie den Feinultraschall, auch bei festgestellter Schwangerschaft.',
      label: 'Was jetzt noch geht',
    },
    ende: {
      titel: 'Welcher Baustein passt zu dir?',
      text: 'Auf der Seite Schwangerschaft siehst du, was jetzt noch geht, von Vorsorge-Extras ohne Wartezeit bis zum Klinikschutz für dein Kind ab Geburt.',
      label: 'Baustein Schwangerschaft ansehen',
    },
    varianten: {
      hebamme: {
        mitte: {
          frage: 'Werdende Eltern fragen dich nach Zuschüssen?',
          text: 'Der Vorsorge-Topf zahlt Selbstzahlerleistungen wie den Feinultraschall, auch bei festgestellter Schwangerschaft.',
        },
        ende: {
          titel: 'Was werdenden Eltern jetzt noch hilft',
          text: 'Die Seite Schwangerschaft zeigt Vorsorge-Extras ohne Wartezeit und den Klinikschutz fürs Kind, verständlich zum Weitergeben.',
        },
      },
    },
  },
  tier: {
    to: '/tierkrankenversicherung',
    icon: 'pet',
    alleBausteine: true,
    mitte: {
      frage: 'Dein Tier muss zum Tierarzt?',
      text: 'Eine Tierkranken- oder OP-Versicherung zahlt je nach Tarif bei Krankheit oder Unfall.',
      label: 'Baustein ansehen',
    },
    ende: {
      titel: 'Welcher Baustein passt zu deinem Tier?',
      text: 'So werden hohe Behandlungskosten nicht zur Belastung, ob mit umfassendem Krankenschutz oder gezieltem OP-Schutz.',
      label: 'Zum Baustein Tier',
    },
  },
  leistungen: {
    to: LEISTUNGEN_PFAD,
    icon: 'protection',
    alleBausteine: false,
    mitte: {
      frage: 'Welche Kosten willst du selbst tragen?',
      text: 'Die Bausteine ambulant, Zahn, stationär und Tier schließen je eine andere Lücke.',
      label: 'Bausteine ansehen',
    },
    ende: {
      titel: 'Welcher Baustein passt zu dir?',
      text: 'Nicht jede Lücke ist deine Lücke. In der Übersicht siehst du, wofür jeder Baustein zahlt, und nimmst nur, was du brauchst.',
      label: 'Alle Bausteine ansehen',
    },
  },
  // Nur für Firmenkunden-Artikel im Blog. /leistungen ist für Privatkunden,
  // deshalb ohne den Textlink auf die Übersicht. Texte ohne Anrede, weil
  // /unternehmen Sie sagt und alle anderen Hinweise Du.
  unternehmen: {
    to: '/unternehmen',
    icon: 'protection',
    alleBausteine: false,
    mitte: {
      frage: 'Gesundheit als Vorteil fürs Team?',
      text: 'Die Seite für Unternehmen zeigt, wie betriebliche Krankenversicherung und Kassenbonus zusammenspielen.',
      label: 'Für Firmen ansehen',
    },
    ende: {
      titel: 'Gesundheitsbausteine fürs Team',
      text: 'Welche Gesundheitsbausteine Firmen ihren Beschäftigten anbieten können, steht übersichtlich auf der Seite für Unternehmen.',
      label: 'Bausteine fürs Team ansehen',
    },
  },
  // Altersvorsorge hat einen eigenen Weg: Artikelcheck nach Abschnitt 2 und
  // Schlussknopf auf /altersvorsorgedepot (check-altersvorsorge-ratgeber.mjs).
  // /leistungen kennt nur Kranken- und Tierbausteine, deshalb kein weiterer
  // Hinweis und kein Textlink auf die Übersicht.
  altersvorsorge: {
    to: '/altersvorsorgedepot',
    icon: 'pension-growth',
    alleBausteine: false,
    eigenerWeg: true,
  },
});

// Kurzname je Ziel für data-leistungsziel und den Vertragstest.
export const LEISTUNGSZIEL_IDS = Object.freeze(Object.keys(LEISTUNGSZIELE));

/* -------------------------------------------------------------------------
 * Zuordnung Ratgeber
 * ---------------------------------------------------------------------- */

// Standard je Themengruppe (gliederung.js). Ein neuer Ratgeber in einer
// Gruppe bekommt dieses Ziel automatisch.
export const RATGEBER_ZIEL_JE_GRUPPE = Object.freeze({
  zaehne: { ziel: 'zahn' },
  ambulant: { ziel: 'ambulant' },
  brille: { ziel: 'ambulant', variante: 'brille' },
  vorsorge: { ziel: 'ambulant', variante: 'vorsorge' },
  krankenhaus: { ziel: 'stationaer' },
  familie: { ziel: 'stationaer' },
  'kasse-bonus': { ziel: 'ambulant', variante: 'kasse' },
  altersvorsorge: { ziel: 'altersvorsorge' },
});

const KASSENWECHSEL_UND_BEITRAG = [
  // Die Ersparnis hängt an keinem Baustein, die Übersicht zeigt die Auswahl.
  'zusatzbeitrag-krankenkasse-2026',
  'krankenkasse-wechseln',
  'zusatzbeitrag-rentner',
  'guenstigste-krankenkasse',
  'mindestbeitrag-krankenkasse',
  'krankenkasse-studenten',
  'krankenkasse-wechseln-nachteile',
  'wechselpraemie-krankenkasse',
  'beitragserhoehung-krankenkasse',
  'krankenversicherung-beitrag-2026',
  'krankenkasse-wechseln-rentner',
  // Vergleicht alle Bausteine.
  'krankenzusatzversicherung-vergleichen',
  // Advertorial (noindex): Franks Ansage 27.10.2026 gilt für alle Ratgeber.
  // Neutral auf die Übersicht, damit der KassenBoost-Weg vorne bleibt.
  'krankenkassen-bonus-zusatzversicherung',
];

const SCHWANGERSCHAFT = [
  // Schwangerschaftsseite mit Bonus-Check, Vorsorge-Extras und Klinikschutz
  // fürs Kind. baby-geplant-zusatzversicherung bleibt bei /stationaer:
  // noch nicht schwanger, und Kinderwunsch ist kein Tarifargument.
  // Die neun Artikel der Gruppe familie schalten die Rechner-Karte
  // „Klinikschutz für die Familie“ ab (rechner: false): ein Abschluss, eine
  // Karte. Den Klinikschutz fürs Kind zeigt /schwangerschaft selbst
  // (#kind, #nachversicherung), der Abschluss-Satz nennt ihn.
  'schwangerschaft-worauf-achten',
  'schwangerschaft-was-steht-mir-zu',
  'hebamme-kosten-krankenkasse',
  'babybonus-krankenkasse',
  'hebamme-rufbereitschaft',
  'schwanger-zusatzversicherung',
  'geburtsvorbereitungskurs',
  'aok-babybonus',
  'geburtsvorbereitungskurs-partner',
  'schwangerschaft-krankenkasse-melden',
  'tk-schwangerschaft',
];

const ZUZAHLUNG = [
  // Gesetzliche Zuzahlungen: Hinweis auf den eigenen Zuzahlungs-Topf statt
  // Heilpraktiker oder Brille. reha-zuzahlung bleibt bei /stationaer.
  'zuzahlung-medikamente',
  'zuzahlungsbefreiung',
  'zuzahlungsbefreiung-chronisch-krank',
  'zuzahlungsbefreiung-rentner',
  'zuzahlungsbefreiung-schwerbehinderung',
  'aok-zuzahlungsbefreiung',
  'barmer-zuzahlungsbefreiung',
  'dak-zuzahlungsbefreiung',
  'ikk-zuzahlungsbefreiung',
  'tk-zuzahlungsbefreiung',
  'physiotherapie-zuzahlung',
];

// Abweichungen je Slug vom Standard der Gruppe.
export const RATGEBER_ZIEL_JE_SLUG = Object.freeze({
  ...Object.fromEntries(KASSENWECHSEL_UND_BEITRAG.map((slug) => [slug, { ziel: 'leistungen' }])),
  ...Object.fromEntries(SCHWANGERSCHAFT.map((slug) => [slug, { ziel: 'schwangerschaft' }])),
  ...Object.fromEntries(ZUZAHLUNG.map((slug) => [slug, { ziel: 'ambulant', variante: 'zuzahlung' }])),
  // Familie (Frank, 27.10.2026): eine Abschluss-Karte auf den Klinikschutz
  // für Kinder (/stationaer#familie, Rechner-Karte der Gruppe) mit Textlink
  // auf alle Bausteine, statt Übersichts-Block plus Rechner-Karte.
  'familienversicherung-krankenkasse': { ziel: 'stationaer', variante: 'familie' },
});

const RUECKFALL = Object.freeze({ ziel: 'leistungen' });

export const resolveRatgeberLeistungsziel = (slug, groupId = null) => {
  const eintrag = (slug && Object.prototype.hasOwnProperty.call(RATGEBER_ZIEL_JE_SLUG, slug) && RATGEBER_ZIEL_JE_SLUG[slug])
    || (groupId && Object.prototype.hasOwnProperty.call(RATGEBER_ZIEL_JE_GRUPPE, groupId) && RATGEBER_ZIEL_JE_GRUPPE[groupId])
    || RUECKFALL;
  return { ziel: eintrag.ziel, variante: eintrag.variante || null };
};

/* -------------------------------------------------------------------------
 * Zuordnung Blog
 * ---------------------------------------------------------------------- */

export const BLOG_ZIEL_JE_SLUG = Object.freeze({
  'gesundheitsbudget-3000-euro': { ziel: 'ambulant', variante: 'kasse' },
  'naturheilkunde-krankenkasse-2026': { ziel: 'ambulant' },
  'kassenbonus-was-ist-drin': { ziel: 'ambulant', variante: 'kasse' },
  'ikk-classic-bonus-schritt-fuer-schritt': { ziel: 'ambulant', variante: 'kasse' },
  'krankenkasse-wechseln-laufende-behandlung': { ziel: 'ambulant', variante: 'kasse' },
  'krankenhauszusatzversicherung-sportverein-best-ager': { ziel: 'stationaer' },
  'zahnersatz-beitrag-vom-bonus': { ziel: 'zahn' },
  'kassenbonus-schwangerschaft-vorsorge': { ziel: 'schwangerschaft' },
  // Fachartikel für Praxen: Der Baustein, der den Patienten hilft.
  'heilpraktiker-patienten-finanzierung-gesundheitsbudget': { ziel: 'ambulant', variante: 'praxis' },
  'digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung': { ziel: 'ambulant', variante: 'praxis' },
  'healio-konzept-fuer-heilpraktiker': { ziel: 'ambulant', variante: 'praxis' },
  'healio-konzept-fuer-tcm-praxen': { ziel: 'ambulant', variante: 'praxis' },
  'healio-konzept-fuer-osteopathen': { ziel: 'ambulant', variante: 'praxis' },
  'healio-konzept-fuer-hebammen': { ziel: 'schwangerschaft', variante: 'hebamme' },
  'hebammen-gesundheitsbudget-erklaeren': { ziel: 'schwangerschaft', variante: 'hebamme' },
  // Firmenkunden bleiben bei /unternehmen.
  'bkv-und-kassenbonus-fuer-arbeitgeber': { ziel: 'unternehmen' },
});

// Künftige Blogartikel ohne eigenen Eintrag: nach Zielgruppe, sonst Übersicht.
export const BLOG_ZIEL_JE_ZIELGRUPPE = Object.freeze({
  heilpraktiker: { ziel: 'ambulant', variante: 'praxis' },
  osteopathen: { ziel: 'ambulant', variante: 'praxis' },
  tcm: { ziel: 'ambulant', variante: 'praxis' },
  physiotherapeut: { ziel: 'ambulant', variante: 'praxis' },
  physiotherapie: { ziel: 'ambulant', variante: 'praxis' },
  hebammen: { ziel: 'schwangerschaft', variante: 'hebamme' },
  arbeitgeber: { ziel: 'unternehmen' },
});

export const resolveBlogLeistungsziel = (slug, targetGroup = '') => {
  const eintrag = (slug && Object.prototype.hasOwnProperty.call(BLOG_ZIEL_JE_SLUG, slug) && BLOG_ZIEL_JE_SLUG[slug])
    || (targetGroup && Object.prototype.hasOwnProperty.call(BLOG_ZIEL_JE_ZIELGRUPPE, targetGroup) && BLOG_ZIEL_JE_ZIELGRUPPE[targetGroup])
    || RUECKFALL;
  return { ziel: eintrag.ziel, variante: eintrag.variante || null };
};

/* -------------------------------------------------------------------------
 * Texte eines Ziels (mit Variante) auflösen
 * ---------------------------------------------------------------------- */

export const getLeistungsziel = (zielId, variante = null) => {
  const basis = LEISTUNGSZIELE[zielId] || LEISTUNGSZIELE.leistungen;
  const abweichung = (variante && basis.varianten?.[variante]) || {};
  return {
    id: LEISTUNGSZIELE[zielId] ? zielId : 'leistungen',
    variante: abweichung === basis.varianten?.[variante] ? variante : null,
    to: basis.to,
    icon: abweichung.icon || basis.icon,
    alleBausteine: basis.alleBausteine,
    eigenerWeg: Boolean(basis.eigenerWeg),
    mitte: basis.mitte ? { ...basis.mitte, ...(abweichung.mitte || {}) } : null,
    ende: basis.ende ? { ...basis.ende, ...(abweichung.ende || {}) } : null,
  };
};

/* -------------------------------------------------------------------------
 * Planung im Ratgeber
 * ---------------------------------------------------------------------- */

export const basisPfad = (to = '') => String(to).split('#')[0].split('?')[0];

const woerter = (parts) => parts
  .filter((part) => typeof part === 'string')
  .join(' ')
  .split(/\s+/)
  .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

const abschnittWoerter = (section) => woerter(collectBlockText(section.blocks, [section.heading]));

// Zeigt ein Block schon klickbar auf dieselbe Leistungsseite?
const zeigtAufZiel = (block, zielPfad) => {
  if (!block) return false;
  if (block.type === 'path') return basisPfad(block.to) === zielPfad;
  if (block.type === 'cards') return (block.items || []).some((card) => basisPfad(card.to) === zielPfad);
  // Der Tarifvergleich ambulant endet mit dem Weg zur Tarifwahl auf /ambulant.
  if (block.type === 'tarifvergleich') return zielPfad === '/ambulant';
  return false;
};

// Wortposition (Ende des Blocks im Fließtext) jedes gleichwertigen Hinweises
// auf dieselbe Seite. Zählt wie abschnittWoerter: Überschrift, dann Blöcke.
export const gleichwertigePositionen = (sections, zielPfad) => {
  const positionen = [];
  let lauf = 0;
  for (const section of sections) {
    lauf += woerter([section.heading]);
    for (const block of section.blocks || []) {
      lauf += woerter(collectBlockText([block], []));
      if (zeigtAufZiel(block, zielPfad)) positionen.push(lauf);
    }
  }
  return positionen;
};

// Große, klickbare Bausteine, neben die kein weiterer Hinweis rückt.
const istKlickblock = (block) => Boolean(block) && (
  block.type === 'path'
  || block.type === 'calculator'
  || block.type === 'tarifvergleich'
  || (block.type === 'cards' && (block.items || []).some((card) => card.to))
);

/**
 * Wo stehen Zwischendurch-Hinweis und Abschluss eines Ratgebers?
 *
 * mitteNach: Indizes der Abschnitte, nach denen ein Hinweis steht. Der erste
 *   sitzt an der Abschnittsgrenze, die einem Drittel des Fließtexts am
 *   nächsten liegt, ab ZWEITER_HINWEIS_AB_WOERTERN ein zweiter bei zwei
 *   Dritteln. Nie direkt vor oder nach einem großen Klickbaustein, nie im
 *   selben oder angrenzenden Abschnitt eines gleichwertigen Hinweises auf
 *   dieselbe Seite und nie näher als MIN_ABSTAND an ihm, nie nach dem letzten
 *   Abschnitt, beim Advertorial nie an der Stelle seines KassenBoost-Knopfs.
 *   Steht ein gleichwertiger Hinweis schon im MITTE_BEREICH, entfällt der
 *   erste neue Hinweis (nichts doppelt); ein zweiter folgt nur bei langen
 *   Artikeln mit Abstand dahinter.
 * mitteVorhanden: Der Artikel hat schon einen gleichwertigen Hinweis im
 *   Textverlauf (Weg-Karte, Karten, Tarifvergleich, Altersvorsorge-Check).
 * ende: 'block'       eigener Abschluss-Block,
 *       'rechner'     die Rechner-Karte zeigt schon auf dieselbe Seite,
 *       'internalCta' der Schlussknopf zeigt schon auf dieselbe Seite,
 *       'eigen'       eigener Weg (Altersvorsorge).
 * alleBausteine: Textlink „Alle Bausteine ansehen“ zeigen (an Block,
 *   Rechner-Karte oder Schlussknopf).
 */
export const planRatgeberLeistungsweg = (article, groupId = null) => {
  const { ziel: zielId, variante } = resolveRatgeberLeistungsziel(article?.slug, groupId);
  const ziel = getLeistungsziel(zielId, variante);
  const sections = article?.sections || [];

  if (ziel.eigenerWeg) {
    return { ziel, mitteNach: [], mitteVorhanden: true, ende: 'eigen', alleBausteine: false };
  }

  const zielPfad = ziel.to;
  const enthaeltZiel = sections.map((section) => (section.blocks || []).some((block) => zeigtAufZiel(block, zielPfad)));
  const mitteVorhanden = enthaeltZiel.some(Boolean);

  const counts = sections.map(abschnittWoerter);
  const gesamt = counts.reduce((sum, count) => sum + count, 0);
  const zielPositionen = gleichwertigePositionen(sections, zielPfad);
  const mindestAbstand = Math.max(MIN_ABSTAND_WOERTER, MIN_ABSTAND_ANTEIL * gesamt);
  const weitGenug = (position) => zielPositionen.every((vorhanden) => Math.abs(vorhanden - position) >= mindestAbstand);
  // Gleichwertige Hinweise mitten im Text zählen als Zwischendurch-Hinweis.
  const vorhandenMitte = gesamt > 0
    ? zielPositionen.map((position) => position / gesamt).filter((anteil) => anteil >= MITTE_BEREICH[0] && anteil <= MITTE_BEREICH[1])
    : [];

  let kumuliert = 0;
  const grenzen = [];
  for (let index = 0; index < sections.length - 1; index += 1) {
    kumuliert += counts[index];
    const davor = sections[index].blocks?.at(-1);
    const danach = sections[index + 1].blocks?.[0];
    const frei = !istKlickblock(davor)
      && !istKlickblock(danach)
      && !enthaeltZiel[index]
      && !enthaeltZiel[index + 1]
      && weitGenug(kumuliert)
      && !(article.kind === 'advertorial' && sections[index].id === article.ctaAfterSectionId);
    if (frei) grenzen.push({ index, anteil: gesamt > 0 ? kumuliert / gesamt : 0 });
  }

  const naechste = (zielAnteil, kandidaten) => kandidaten.reduce(
    (beste, grenze) => (!beste || Math.abs(grenze.anteil - zielAnteil) < Math.abs(beste.anteil - zielAnteil) ? grenze : beste),
    null,
  );

  // Plätze: ein Drittel, bei langen Artikeln auch zwei Drittel. Jeder
  // gleichwertige Hinweis in der Mitte belegt den Platz, dem er am nächsten ist.
  const plaetze = gesamt >= ZWEITER_HINWEIS_AB_WOERTERN ? [1 / 3, 2 / 3] : [1 / 3];
  for (const anteil of vorhandenMitte) {
    if (plaetze.length === 0) break;
    plaetze.sort((a, b) => Math.abs(a - anteil) - Math.abs(b - anteil));
    plaetze.shift();
  }
  plaetze.sort((a, b) => a - b);

  const mitteNach = [];
  const gewaehlt = [];
  for (const platz of plaetze) {
    // Steht davor schon ein Hinweis, kommt ein weiterer nur dazu, wenn danach
    // kein gleichwertiger mehr folgt.
    const davorSchonEiner = (anteil) => mitteNach.length > 0 || vorhandenMitte.some((vorhanden) => vorhanden < anteil);
    const kandidat = naechste(platz, grenzen.filter((grenze) => grenze.anteil <= (platz < 0.5 ? 0.6 : 0.85)
      && mitteNach.every((index) => grenze.index >= index + 2)
      && gewaehlt.every((position) => Math.abs(grenze.anteil * gesamt - position) >= mindestAbstand)
      && !(davorSchonEiner(grenze.anteil) && zielPositionen.some((position) => position > grenze.anteil * gesamt))));
    if (kandidat) {
      mitteNach.push(kandidat.index);
      gewaehlt.push(kandidat.anteil * gesamt);
    }
  }

  const rechner = resolveRatgeberRechner(article, groupId);
  let ende = 'block';
  if (rechner?.to && basisPfad(rechner.to) === zielPfad) ende = 'rechner';
  else if (article?.internalCta && article.topic !== 'altersvorsorge' && basisPfad(article.internalCta.to) === zielPfad) ende = 'internalCta';

  return { ziel, mitteNach, mitteVorhanden, ende, alleBausteine: ziel.alleBausteine };
};

/* -------------------------------------------------------------------------
 * Planung im Blog: Artikeltext an einer H2-Grenze teilen
 * ---------------------------------------------------------------------- */

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const HUELLEN = new Set(['article', 'div', 'section', 'main']);

const textLaenge = (html) => html
  .replace(/<[^>]*>/g, ' ')
  .replace(/&[a-z#0-9]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim().length;

const textWoerter = (html) => html
  .replace(/<[^>]*>/g, ' ')
  .split(/\s+/)
  .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

// H2-Grenzen auf oberster Ebene (oder direkt in einer einzigen Hülle wie
// <article>), mit den dort offenen Elementen.
const findeH2Grenzen = (html) => {
  const tags = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w:-]*)\b[^>]*>/g;
  const offen = [];
  const grenzen = [];
  let treffer;
  while ((treffer = tags.exec(html))) {
    const tag = treffer[0];
    if (tag.startsWith('<!--')) continue;
    const name = treffer[1].toLowerCase();
    if (tag[1] === '/') {
      const index = offen.map((entry) => entry.name).lastIndexOf(name);
      if (index >= 0) offen.length = index;
      continue;
    }
    if (name === 'h2' && (offen.length === 0 || (offen.length === 1 && HUELLEN.has(offen[0].name)))) {
      grenzen.push({ position: treffer.index, offen: offen.map((entry) => ({ ...entry })) });
    }
    if (!VOID_ELEMENTS.has(name) && !tag.endsWith('/>')) offen.push({ name, roh: tag });
  }
  return grenzen;
};

const istFaqUeberschrift = (html, position) => /^<h2\b[^>]*>\s*(?:<[^>]+>\s*)*Häufige Fragen/i.test(html.slice(position, position + 200));

/**
 * Teilt den (schon bereinigten) Artikeltext für den Zwischendurch-Hinweis.
 * Liefert die Teile; zwischen je zwei Teilen steht ein Hinweis. Ohne
 * passende H2-Grenze bleibt der Text ein Teil (kein Hinweis im Text).
 */
export const teileBlogHtml = (html = '') => {
  if (typeof html !== 'string' || !html.trim()) return [html || ''];
  const alle = findeH2Grenzen(html);
  const faqIndex = alle.findIndex((grenze) => istFaqUeberschrift(html, grenze.position));
  const vorFaq = faqIndex === -1 ? alle : alle.slice(0, faqIndex);
  const gesamt = textLaenge(html);
  if (!gesamt) return [html];

  const kandidaten = vorFaq
    .map((grenze) => ({ ...grenze, anteil: textLaenge(html.slice(0, grenze.position)) / gesamt }))
    .filter((grenze) => grenze.anteil >= 0.12 && grenze.anteil <= 0.75);
  const naechste = (zielAnteil, liste) => liste.reduce(
    (beste, grenze) => (!beste || Math.abs(grenze.anteil - zielAnteil) < Math.abs(beste.anteil - zielAnteil) ? grenze : beste),
    null,
  );

  const gewaehlt = [];
  const erste = naechste(1 / 3, kandidaten.filter((grenze) => grenze.anteil <= 0.6));
  if (erste) {
    gewaehlt.push(erste);
    if (textWoerter(html) >= ZWEITER_HINWEIS_AB_WOERTERN) {
      const zweite = naechste(2 / 3, kandidaten.filter((grenze) => grenze.anteil >= erste.anteil + 0.2));
      if (zweite) gewaehlt.push(zweite);
    }
  }
  if (gewaehlt.length === 0) return [html];

  const teile = [];
  let start = 0;
  let wiederOeffnen = '';
  for (const grenze of gewaehlt) {
    const schliessen = [...grenze.offen].reverse().map((entry) => `</${entry.name}>`).join('');
    teile.push(`${wiederOeffnen}${html.slice(start, grenze.position)}${schliessen}`);
    // Die Hülle wird ohne id wieder geöffnet, damit keine id doppelt steht.
    wiederOeffnen = grenze.offen.map((entry) => entry.roh.replace(/\s+id=(?:"[^"]*"|'[^']*'|[^\s>]+)/i, '')).join('');
    start = grenze.position;
  }
  teile.push(`${wiederOeffnen}${html.slice(start)}`);
  return teile;
};

/**
 * Abschluss im Blog: eigener Block oder nur der Textlink im vorhandenen
 * Ziel-Kasten, wenn der schon auf dieselbe Leistungsseite zeigt.
 */
export const planBlogLeistungsweg = ({ slug = '', targetGroup = '', ctaHref = '' } = {}) => {
  const { ziel: zielId, variante } = resolveBlogLeistungsziel(slug, targetGroup);
  const ziel = getLeistungsziel(zielId, variante);
  const ende = basisPfad(ctaHref) === ziel.to ? 'zielkasten' : 'block';
  return { ziel, ende, alleBausteine: ziel.alleBausteine };
};
