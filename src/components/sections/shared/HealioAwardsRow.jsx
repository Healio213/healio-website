import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Gemeinsame Siegelzeile für Startseite, /ambulant, /zahn, /stationaer und
 * /partner.
 *
 * Die Zeile zeigt ausschliesslich bereits freigegebene Siegel der
 * Produktpartner. Kein neuer Anspruch, keine neue Zahl, keine neue Quelle.
 * Für /zahn und /stationaer gelten die produktpassenden Sätze aus der
 * früheren Qualitätssektion (Alt-Texte aus deren i18n-Schlüsseln), damit auf
 * der Zahnseite keine Siegel fremder Produkte stehen.
 */
export const HEALIO_AWARDS = [
  { src: '/siegel/sdk/stiftung-warentest.png', alt: 'Stiftung Warentest SEHR GUT (0,9)' },
  { src: '/siegel/sdk/fairnesspreis.png', alt: 'Deutscher Fairnesspreis 2025' },
  { src: '/siegel/sdk/morgen-morgen.png', alt: 'Morgen und Morgen Ausgezeichnet' },
  { src: '/siegel/ikk/schwangere-test.webp', alt: 'Krankenkassentest für Schwangere und junge Eltern Note 1,7 Gut' },
  { src: '/siegel/ikk/familien-test.webp', alt: 'Krankenkassentest für Familien Note 1,6 Gut' },
];

const PRODUCT_AWARD_SETS = {
  zahn: [
    { src: '/siegel/bayerische/warentest-zahn-prestige-2025.jpg', altKey: 'siegel.awards.warentest' },
    { src: '/siegel/ukv/franke-bornberg-zahnprivat100-2025.svg', altKey: 'siegel.awards.frankeBornberg' },
    // LKH-Warentest-Siegel vorerst nicht: Die Bilddatei ist abgeschnitten
    // (nur ein Rest links sichtbar). Ersatz braucht Franks Freigabe der Ausgabe.
    { src: '/siegel/ikk/krankenkasseninfo-leistungen.png', altKey: 'siegel.ikkAwards.performance' },
    { src: '/siegel/ikk/familien-test.webp', altKey: 'siegel.ikkAwards.family' },
  ],
  stationaer: [
    { src: '/siegel/sdk/stiftung-warentest.png', altKey: 'siegel.awards.warentest' },
    { src: '/siegel/sdk/fairnesspreis.png', altKey: 'siegel.awards.fairness' },
    { src: '/siegel/sdk/morgen-morgen.png', altKey: 'siegel.awards.morgenMorgen' },
    { src: '/siegel/ikk/familien-test.webp', altKey: 'siegel.ikkAwards.family' },
    { src: '/siegel/ikk/schwangere-test.webp', altKey: 'siegel.ikkAwards.parents' },
  ],
};

const toneClasses = {
  light: 'bg-white border-gray-100',
  ice: 'bg-home-ice border-emerald-900/10',
  transparent: 'bg-transparent border-transparent',
};

// large: Siegelband direkt unter dem Hero (/partner). Die Quelldateien sind
// 240 bis 250 px breit, deshalb höchstens 112 px Anzeigehöhe.
const sizeClasses = {
  compact: { section: 'py-6', caption: 'text-xs text-slate-400', gap: 'gap-5 md:gap-8', image: 'h-12 w-auto md:h-14' },
  regular: { section: 'py-8', caption: 'text-xs text-slate-400', gap: 'gap-6 md:gap-10', image: 'h-16 w-auto md:h-20' },
  large: { section: 'py-10 md:py-12', caption: 'text-xs sm:text-sm text-slate-500', gap: 'gap-x-8 gap-y-6 sm:gap-x-10 lg:gap-x-14', image: 'h-20 w-auto sm:h-24 lg:h-28' },
};

const HealioAwardsRow = ({
  label,
  compact = false,
  size,
  tone = 'light',
  bordered = true,
  className = '',
  productSet,
}) => {
  const { t } = useTranslation(['common', 'zahn', 'stationaer']);
  const caption = label || t('awards.label');
  const productAwards = PRODUCT_AWARD_SETS[productSet];
  const awards = productAwards
    ? productAwards.map((award) => ({ src: award.src, alt: t(award.altKey, { ns: productSet }) }))
    : HEALIO_AWARDS;
  const styles = sizeClasses[size] || (compact ? sizeClasses.compact : sizeClasses.regular);

  return (
    <section
      className={`${toneClasses[tone] || toneClasses.light} ${bordered ? 'border-b' : ''} ${styles.section} ${className}`}
      aria-label={caption}
    >
      <div className="container mx-auto px-4">
        <p className={`text-center font-medium uppercase tracking-wider ${styles.caption}`}>{caption}</p>
        <div
          className={`mx-auto mt-4 flex max-w-6xl flex-wrap items-center justify-center ${styles.gap}`}
        >
          {awards.map((award) => (
            <img
              key={award.src}
              src={award.src}
              alt={award.alt}
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealioAwardsRow;
