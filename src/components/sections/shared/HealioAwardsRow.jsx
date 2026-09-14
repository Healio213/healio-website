import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Gemeinsame Siegelzeile für Startseite, /ambulant, /zahn und /partner.
 *
 * Die Zeile zeigt ausschliesslich bereits freigegebene Siegel der
 * Produktpartner. Kein neuer Anspruch, keine neue Zahl, keine neue Quelle.
 */
export const HEALIO_AWARDS = [
  { src: '/siegel/sdk/stiftung-warentest.png', alt: 'Stiftung Warentest SEHR GUT (0,9)' },
  { src: '/siegel/sdk/fairnesspreis.png', alt: 'Deutscher Fairnesspreis 2025' },
  { src: '/siegel/sdk/morgen-morgen.png', alt: 'Morgen und Morgen Ausgezeichnet' },
  { src: '/siegel/ikk/schwangere-test.webp', alt: 'Krankenkassentest für Schwangere und junge Eltern Note 1,7 Gut' },
  { src: '/siegel/ikk/familien-test.webp', alt: 'Krankenkassentest für Familien Note 1,6 Gut' },
];

const toneClasses = {
  light: 'bg-white border-gray-100',
  ice: 'bg-home-ice border-emerald-900/10',
  transparent: 'bg-transparent border-transparent',
};

const HealioAwardsRow = ({
  label,
  compact = false,
  tone = 'light',
  bordered = true,
  className = '',
}) => {
  const { t } = useTranslation('common');
  const caption = label || t('awards.label');

  return (
    <section
      className={`${toneClasses[tone] || toneClasses.light} ${bordered ? 'border-b' : ''} ${compact ? 'py-6' : 'py-8'} ${className}`}
      aria-label={caption}
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-400">{caption}</p>
        <div
          className={`mx-auto mt-4 flex max-w-6xl flex-wrap items-center justify-center ${compact ? 'gap-5 md:gap-8' : 'gap-6 md:gap-10'}`}
        >
          {HEALIO_AWARDS.map((award) => (
            <img
              key={award.src}
              src={award.src}
              alt={award.alt}
              className={compact ? 'h-12 w-auto md:h-14' : 'h-16 w-auto md:h-20'}
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
