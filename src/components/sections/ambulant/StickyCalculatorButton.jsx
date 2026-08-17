
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyCalculatorButton = () => {
  const { t } = useTranslation('ambulant');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 md:inset-x-auto md:bottom-6 md:right-6">
      <a
        href={sdkUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackSdkClick('ambulant-sticky', referrer)}
        className="flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-xl bg-healio-primary px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-auto md:max-w-[calc(100vw-2rem)] md:rounded-lg md:px-6"
      >
        <Calculator className="mr-2 h-4 w-4" />
        {t('stickyButton.ctaCalculate')}
      </a>
    </div>
  );
};

export default StickyCalculatorButton;
