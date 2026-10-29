import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAmbulantStufe } from '@/lib/ambulant-stufe';
import CompactBonusFeature from '@/components/sections/shared/CompactBonusFeature';
import { getAmbulantBonusFeatureProps } from '@/components/sections/ambulant/AmbulantConversionFlow';

const AmbulantBonusFeature = ({ geburtsjahrEingabe = '', fromBonusTopic = false }) => {
  const { lang } = useLanguage();
  const selectedTier = useAmbulantStufe();
  const language = lang === 'en' ? 'en' : 'de';

  // Besucher aus einem Bonuscheck sollen direkt bei Leistungen und Beitrag
  // weitermachen können; der zusätzliche Rechner bleibt dort ausgeblendet.
  if (fromBonusTopic) return null;

  return (
    <>
      <CompactBonusFeature
        className="order-1 bg-home-ice md:order-none"
        mobileSwipe
        {...getAmbulantBonusFeatureProps(language, fromBonusTopic, selectedTier, geburtsjahrEingabe)}
      />
      {language !== 'en' && <p className="order-1 bg-home-ice px-4 pb-8 text-center md:hidden"><Link to="/ratgeber/ikk-classic-bonusprogramm-2026" className="home-focus inline-flex min-h-11 items-center text-sm font-semibold text-emerald-900 underline underline-offset-4">Bonus-Leitfaden: Aktivitäten & Fristen</Link></p>}
    </>
  );
};

export default AmbulantBonusFeature;
