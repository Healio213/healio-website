import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SiegelTicker from '@/components/sections/shared/SiegelTicker';
import { IKK_SEALS } from '@/components/sections/shared/IkkKassenSiegel';

/**
 * Gemeinsame Siegelzeile für /ambulant, /zahn, /stationaer und /partner.
 *
 * Stand 03.10.2026: Die Zeile ist in Gruppen geteilt, damit jedes Siegel
 * sichtbar dem zugeordnet ist, was es bewertet.
 * - Produktpartner: nur Auszeichnungen, die zum Versicherer oder genau zum
 *   gezeigten Tarif gehören. Die früheren Siegel der SDK-Vollversicherung
 *   (Stiftung Warentest 0,9 und Morgen & Morgen Beitragsstabilität) gehören
 *   nicht zu unseren Zusatztarifen und sind entfernt.
 * - Die Textangabe „Stiftung Warentest Finanzen 04/2026, SDK SP1 sehr gut
 *   (1,1)“ ist wieder entfernt: Die Note 1,1 war am 03.10.2026 nur bei
 *   procontra zu finden, weder bei der SDK noch frei auf test.de (dort hinter
 *   der Bezahlschranke). Erst wieder aufnehmen, wenn die Note belegt ist.
 * - IKK classic: Die Testsiegel der Krankenkasse stehen nicht mehr hier,
 *   sondern nur im IKK-Zusammenhang (Komponente IkkKassenSiegel).
 *
 * Stand 05.10.2026 (/zahn): Zwei Siegel, je in einer eigenen Gruppe mit dem
 * Versicherer und genau dem Tarif, den das Siegel bewertet. Regel für jedes
 * neue Siegel: genau ein Tarif, den wir auf der Seite anbieten; neueste
 * Ausgabe des Tests; frei und eindeutig belegt; Bilddatei nur von der
 * offiziellen Quelle, unverändert.
 * - UKV ZahnPRIVAT 100: Franke & Bornberg FFF+ hervorragend (0,5), Produkt
 *   12|2024, Rating 08|2026. Quelle: ukv.de/ueber-uns/ratings-auszeichnungen
 *   (Bilddatei dort), Gegenprobe franke-bornberg.de (Rating gkvzahn_neu). Gilt
 *   nur für ZahnPRIVAT 100, nicht für 75 und 90. F&B verlangt für die werbliche
 *   Nutzung einen schriftlichen Nutzungsvertrag: vor dem Livegang schriftlich
 *   über den Maklerbetreuer der Versicherungskammer oder info@franke-bornberg.de
 *   bestätigen lassen (gilt auch für die bisherige Fassung 08|2025).
 * - die Bayerische ZAHN Prestige: Stiftung Warentest SEHR GUT (0,5), Ausgabe
 *   09/2026, 278 Tarife, Lizenznummer 26PM28 (Lizenznehmer ist die Bayerische).
 *   Quelle: diebayerische.de/versicherungen/zahnzusatzversicherung/ (Bilddatei
 *   dort). Gilt nur für ZAHN Prestige, nicht für ZAHN Sofort, Smart oder
 *   Komfort. Kurze schriftliche Unterlizenz über den Maklerbetreuer der
 *   Bayerischen einholen. Das Wording „Testsieger“ nicht übernehmen.
 * - Nicht eingebaut (keine freie offizielle Siegeldatei, Lizenz offen): SDK SP1
 *   und AP1 (Franke & Bornberg), SDK SP2 und AP1 sowie Bayerische Prestige
 *   stationär (FOCUS MONEY 35/2026).
 *
 * Stand 06.10.2026 (Handy, unter md): Statt der hohen Zeile läuft ein
 * schmales Siegel-Band (Komponente SiegelTicker), Logos 48 px hoch, jedes
 * Siegel mit kurzer Beschriftung des Versicherers bzw. Tarifs. Der
 * Pflichthinweis steht ruhend unter dem Band (mindestens 14 px). Die
 * IKK-Siegel (Krankenkasse, nicht Zusatzversicherung) laufen im Band mit, wo
 * die Seite sie auch im IKK-Block zeigt: /zahn, /stationaer, /ambulant. Das
 * steuert withIkk; ohne Angabe entscheidet der Pfad (nur /ambulant und die
 * Heilpraktiker-Landingpage), /partner bleibt bei der SDK. Ab md bleibt die
 * Zeile exakt wie bisher.
 * Das Band gibt es auch einzeln als HealioSiegelBand (für Seiten mit eigener
 * Siegelzeile, z. B. /hebammen: neben der bisherigen Zeile in einem
 * "hidden md:block"-Wrapper, das Band mit "md:hidden").
 */
const FAIRNESS = { src: '/siegel/sdk/fairnesspreis.png', altKey: 'awards.items.fairness' };

// Stand 05.10.2026: Bilddateien unverändert von den offiziellen Quellen
// (siehe Kopfkommentar). Alt-Texte stehen im Namespace zahn (siegel.awards.*).
const UKV_ZAHN_FRANKE_BORNBERG = {
  src: '/siegel/ukv/franke-bornberg-zahnprivat100-2026.svg',
  altKey: 'siegel.awards.frankeBornberg',
  ns: 'zahn',
};
const BAYERISCHE_ZAHN_WARENTEST = {
  src: '/siegel/bayerische/warentest-zahn-prestige-2026-09.jpg',
  altKey: 'siegel.awards.warentest',
  ns: 'zahn',
};

// Bildmaße für das Handy-Band (Quelldateien, damit nichts springt).
const SDK_SIZE = { width: 240, height: 240 };
const UKV_ZAHN_SIZE = { width: 432, height: 216 };
const BAYERISCHE_ZAHN_SIZE = { width: 600, height: 399 };
const IKK_SIZE = { width: 500, height: 403 };

// Kurze Beschriftungen unter den Logos im Handy-Band. Sie fassen nur die
// bestehenden Gruppenzeilen zusammen (Versicherer bzw. Tarif, den das Siegel
// bewertet); Tarif und Prüfinstitut stehen im Alt-Text der Bilder.
const TICKER_CAPTIONS = {
  de: { sdk: 'SDK Fairness-Preis 2025', ukv: 'UKV ZahnPRIVAT 100', bayerische: 'Bayerische ZAHN Prestige', ikk: 'IKK classic, Krankenkasse' },
  en: { sdk: 'SDK Fairness Award 2025', ukv: 'UKV ZahnPRIVAT 100', bayerische: 'Bayerische ZAHN Prestige', ikk: 'IKK classic, health fund' },
};
const TICKER_IMAGE_SIZE = { sdk: SDK_SIZE, ukv: UKV_ZAHN_SIZE, bayerische: BAYERISCHE_ZAHN_SIZE };

// Seiten, auf denen das Band auch die IKK-Siegel zeigt, ohne dass die Seite
// withIkk setzt (wie der IKK-Block auf der Seite selbst).
const IKK_TICKER_PATHS = new Set(['/ambulant', '/en/outpatient', '/heilpraktiker-zusatzversicherung']);

const AWARD_SETS = {
  default: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
  zahn: [
    // Leistungsweg: UKV, drei Stufen. Das Siegel gehört nur zu ZahnPRIVAT 100.
    { id: 'ukv', labelKey: 'awards.groups.ukvZahn', items: [UKV_ZAHN_FRANKE_BORNBERG] },
    // Sofortschutz-Weg: die Bayerische bietet auf /zahn nur ZAHN Sofort an,
    // immer zusammen mit einem Zahntarif der Bayerischen. Das Siegel bewertet
    // den Tarif ZAHN Prestige, nicht den Baustein ZAHN Sofort.
    { id: 'bayerische', labelKey: 'awards.groups.bayerischeZahn', items: [BAYERISCHE_ZAHN_WARENTEST] },
    // Das IKK-Leistungssiegel (Stand 03/2026, Note 1,5) ist abgelaufen:
    // krankenkasseninfo.de hat 09/2026 neue Ergebnisse veröffentlicht. Eine
    // neue Fassung hat die IKK dafür nicht geschickt, deshalb hier nicht mehr.
  ],
  stationaer: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
};

// Hinweis unter der Zeile, wenn ein Siegel nur für einen Teil der angebotenen
// Tarife gilt (Pflichthinweis, deshalb mindestens 14 px).
const AWARD_NOTES = {
  zahn: 'awards.notes.zahn',
};

const toneClasses = {
  light: 'bg-white border-gray-100',
  ice: 'bg-home-ice border-emerald-900/10',
  transparent: 'bg-transparent border-transparent',
};

// large: Siegelband direkt unter dem Hero (/partner). Die Quelldateien sind
// mindestens 240 px breit, deshalb höchstens 112 px Anzeigehöhe.
// Handy (unter md): niedrigere Abstände und Überschrift in 14 px ohne
// Großbuchstaben; ab md die bisherigen Werte.
const sizeClasses = {
  compact: { section: 'py-4 md:py-6', caption: 'text-sm text-slate-500 md:text-xs md:text-slate-400', gap: 'gap-5 md:gap-8', image: 'h-12 w-auto md:h-14' },
  regular: { section: 'py-4 md:py-8', caption: 'text-sm text-slate-500 md:text-xs md:text-slate-400', gap: 'gap-6 md:gap-10', image: 'h-16 w-auto md:h-20' },
  large: { section: 'py-4 md:py-12', caption: 'text-sm text-slate-500', gap: 'gap-x-8 gap-y-6 sm:gap-x-10 lg:gap-x-14', image: 'h-20 w-auto sm:h-24 lg:h-28' },
};

// Siegel-Band fürs Handy als eigener Baustein, damit Seiten mit eigener
// Siegelzeile (z. B. /hebammen) es ohne Umbau der Desktop-Zeile einsetzen
// können: <HealioSiegelBand className="md:hidden" ... /> neben der bisherigen
// Zeile in einem "hidden md:block"-Wrapper.
export const HealioSiegelBand = ({ productSet, withIkk, ikkOrder = 'family', ariaLabel, className = '' }) => {
  const { t, i18n } = useTranslation(['common', 'zahn']);
  const { pathname } = useLocation();
  const groups = AWARD_SETS[productSet] || AWARD_SETS.default;
  const noteKey = AWARD_NOTES[productSet];
  const language = i18n.language?.startsWith('en') ? 'en' : 'de';
  const captions = TICKER_CAPTIONS[language];
  const showIkk = withIkk ?? (productSet === 'zahn' || productSet === 'stationaer' || IKK_TICKER_PATHS.has(pathname));
  const ikkKeys = ikkOrder === 'parents' ? ['parents', 'family'] : ['family', 'parents'];
  const items = [
    ...groups.flatMap((group) => group.items.map((award) => ({
      id: group.id,
      src: award.src,
      alt: t(award.altKey, award.ns ? { ns: award.ns } : undefined),
      caption: captions[group.id],
      ...TICKER_IMAGE_SIZE[group.id],
    }))),
    ...(showIkk ? ikkKeys.map((key) => ({
      id: `ikk-${key}`,
      src: IKK_SEALS[key].src,
      alt: t(IKK_SEALS[key].altKey),
      caption: captions.ikk,
      ...IKK_SIZE,
    })) : []),
  ];
  const notes = [
    ...(noteKey ? [t(noteKey)] : []),
    ...(showIkk ? [t('awards.groups.ikkNote')] : []),
  ];

  return <SiegelTicker className={className} items={items} ariaLabel={ariaLabel || t('awards.label')} notes={notes} />;
};

const HealioAwardsRow = ({
  label,
  compact = false,
  size,
  tone = 'light',
  bordered = true,
  className = '',
  productSet,
  withIkk,
}) => {
  const { t } = useTranslation(['common', 'zahn']);
  const caption = label || t('awards.label');
  const groups = AWARD_SETS[productSet] || AWARD_SETS.default;
  const noteKey = AWARD_NOTES[productSet];
  // Mehrere Gruppen (/zahn): mobil zwei Spalten nebeneinander, damit die Zeile
  // niedrig bleibt; Bilder unten bündig. Eine Gruppe (/partner, /ambulant,
  // /stationaer) bleibt exakt wie bisher.
  const multi = groups.length > 1;
  const styles = sizeClasses[size] || (compact ? sizeClasses.compact : sizeClasses.regular);

  return (
    <section
      className={`${toneClasses[tone] || toneClasses.light} ${bordered ? 'border-b' : ''} ${styles.section} ${className}`}
      aria-label={caption}
    >
      <div className="container mx-auto px-4">
        <p className={`text-center font-medium normal-case tracking-normal md:uppercase md:tracking-wider ${styles.caption}`}>{caption}</p>

        {/* Handy: ruhiges Siegel-Band mit Beschriftung je Siegel */}
        <HealioSiegelBand
          className="mx-auto mt-3 max-w-6xl md:hidden"
          productSet={productSet}
          withIkk={withIkk}
          ariaLabel={caption}
        />

        {/* Ab md: die bisherige Siegelzeile */}
        <div className="hidden md:block">
          <div
            className={`mx-auto mt-5 max-w-6xl ${multi
              ? 'grid grid-cols-2 items-stretch gap-x-4 gap-y-6 md:flex md:flex-wrap md:justify-center md:gap-x-14'
              : 'flex flex-col items-center gap-8 md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-x-14'}`}
          >
            {groups.map((group) => (
              <div key={group.id} className={`flex flex-col items-center ${multi ? 'md:max-w-md' : ''}`}>
                <p className={`text-center font-semibold text-slate-600 ${multi ? 'text-xs leading-5 [text-wrap:balance] sm:text-sm' : 'text-sm'}`}>{t(group.labelKey)}</p>
                <div className={`flex flex-wrap items-center justify-center ${multi ? 'mt-auto pt-3' : 'mt-3'} ${styles.gap}`}>
                  {group.items.map((award) => (
                    <img
                      key={award.src}
                      src={award.src}
                      alt={t(award.altKey, award.ns ? { ns: award.ns } : undefined)}
                      className={`${styles.image} ${multi ? 'max-w-full object-contain' : ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {noteKey && (
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-500">{t(noteKey)}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HealioAwardsRow;
