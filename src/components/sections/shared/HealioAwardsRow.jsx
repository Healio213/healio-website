import React from 'react';
import { useTranslation } from 'react-i18next';

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
 */
const FAIRNESS = { src: '/siegel/sdk/fairnesspreis.png', altKey: 'awards.items.fairness' };

const AWARD_SETS = {
  default: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
  zahn: [
    {
      id: 'zahn',
      labelKey: 'awards.groups.zahn',
      items: [
        { src: '/siegel/bayerische/warentest-zahn-prestige-2025.jpg', altKey: 'siegel.awards.warentest', ns: 'zahn' },
        { src: '/siegel/ukv/franke-bornberg-zahnprivat100-2025.svg', altKey: 'siegel.awards.frankeBornberg', ns: 'zahn' },
        // LKH-Warentest-Siegel vorerst nicht: Die Bilddatei ist abgeschnitten
        // (nur ein Rest links sichtbar). Ersatz braucht Franks Freigabe der Ausgabe.
      ],
    },
    // Das IKK-Leistungssiegel (Stand 03/2026, Note 1,5) ist abgelaufen:
    // krankenkasseninfo.de hat 09/2026 neue Ergebnisse veröffentlicht. Eine
    // neue Fassung hat die IKK dafür nicht geschickt, deshalb hier nicht mehr.
  ],
  stationaer: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
};

const toneClasses = {
  light: 'bg-white border-gray-100',
  ice: 'bg-home-ice border-emerald-900/10',
  transparent: 'bg-transparent border-transparent',
};

// large: Siegelband direkt unter dem Hero (/partner). Die Quelldateien sind
// mindestens 240 px breit, deshalb höchstens 112 px Anzeigehöhe.
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
  const { t } = useTranslation(['common', 'zahn']);
  const caption = label || t('awards.label');
  const groups = AWARD_SETS[productSet] || AWARD_SETS.default;
  const styles = sizeClasses[size] || (compact ? sizeClasses.compact : sizeClasses.regular);

  return (
    <section
      className={`${toneClasses[tone] || toneClasses.light} ${bordered ? 'border-b' : ''} ${styles.section} ${className}`}
      aria-label={caption}
    >
      <div className="container mx-auto px-4">
        <p className={`text-center font-medium uppercase tracking-wider ${styles.caption}`}>{caption}</p>
        <div className="mx-auto mt-5 flex max-w-6xl flex-col items-center gap-8 md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-x-14">
          {groups.map((group) => (
            <div key={group.id} className="flex flex-col items-center">
              <p className="text-center text-sm font-semibold text-slate-600">{t(group.labelKey)}</p>
              <div className={`mt-3 flex flex-wrap items-center justify-center ${styles.gap}`}>
                {group.items.map((award) => (
                  <img
                    key={award.src}
                    src={award.src}
                    alt={t(award.altKey, award.ns ? { ns: award.ns } : undefined)}
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealioAwardsRow;
