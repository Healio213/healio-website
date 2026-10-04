import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Testsiegel der Krankenkasse IKK classic (krankenkasseninfo.de, Stand 09/2026).
 *
 * Stand 03.10.2026: Die Siegel stehen nur dort, wo es um die IKK classic geht
 * (IKK-Block auf /ambulant, /stationaer, /zahn und den EN-Seiten, /hebammen,
 * IKK-Bonus auf /schwangerschaft), nicht mehr in der allgemeinen Siegelzeile.
 * Bewertet wird die Krankenkasse, nicht die Zusatzversicherung; das steht
 * deshalb immer direkt darunter. Die IKK classic hat die Fassung 09/2026 am
 * 01.10.2026 geschickt, Nutzung bis zu neuen Testergebnissen. Die alten
 * Dateien (Stand 03/2026) bleiben im Ordner, werden aber nicht verwendet.
 *
 * Nur eigene Bilddateien, nichts von Dritten (wichtig für /schwangerschaft).
 */
const SEALS = {
  family: { src: '/siegel/ikk/krankenkasseninfo-familien-2026-09.webp', altKey: 'awards.items.ikkFamily' },
  parents: { src: '/siegel/ikk/krankenkasseninfo-schwangere-2026-09.webp', altKey: 'awards.items.ikkParents' },
};

const ORDER = {
  family: ['family', 'parents'],
  parents: ['parents', 'family'],
};

// Quelldateien 500 x 403 px, also auch bei 112 px Anzeigehöhe noch scharf.
const SIZES = {
  regular: { image: 'h-20 w-auto md:h-24', gap: 'gap-6 md:gap-8', note: 'text-xs sm:text-sm' },
  large: { image: 'h-20 w-auto sm:h-24 md:h-28', gap: 'gap-8 md:gap-12', note: 'text-xs sm:text-sm' },
};

const IkkKassenSiegel = ({ order = 'family', size = 'regular', align = 'center', className = '' }) => {
  const { t } = useTranslation('common');
  const label = t('awards.groups.ikk');
  const styles = SIZES[size] || SIZES.regular;
  const keys = ORDER[order] || ORDER.family;
  const isStart = align === 'start';

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex flex-col ${isStart ? 'items-start' : 'items-center'} ${className}`}
    >
      <p className={`${isStart ? 'text-left' : 'text-center'} text-sm font-semibold text-slate-600`}>{label}</p>
      <div className={`mt-3 flex flex-wrap items-center ${isStart ? 'justify-start' : 'justify-center'} ${styles.gap}`}>
        {keys.map((key) => (
          <img
            key={key}
            src={SEALS[key].src}
            alt={t(SEALS[key].altKey)}
            width="500"
            height="403"
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <p className={`mt-3 max-w-sm ${isStart ? 'text-left' : 'text-center'} ${styles.note} leading-relaxed text-slate-500`}>
        {t('awards.groups.ikkNote')}
      </p>
    </div>
  );
};

export default IkkKassenSiegel;
