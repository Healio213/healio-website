import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const icons = [
  { icon: 'independent-guidance', tone: 'mint' },
  { icon: 'clear-comparison', tone: 'sky' },
  { icon: 'personal-support', tone: 'lavender' },
  { icon: 'ongoing-service', tone: 'butter' },
];

const HomeTrust = () => {
  const { t } = useTranslation('home');
  const items = t('trust.items', { returnObjects: true });

  return (
    <section className="home-section bg-white" aria-labelledby="home-trust-title">
      <div className="healio-container">
        <div className="max-w-3xl">
          <p className="home-eyebrow text-emerald-700">{t('trust.eyebrow')}</p>
          <h2 id="home-trust-title" className="mt-4 max-w-[17ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-home-midnight sm:text-5xl">
            {t('trust.title')}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{t('trust.description')}</p>
        </div>

        <div className="mt-12 grid border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const icon = icons[index];
            return (
              <article
                key={item.title}
                className="border-b border-slate-200 py-8 sm:px-7 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <FriendlyIcon icon={icon.icon} tone={icon.tone} size="sm" />
                <h3 className="mt-6 font-display text-lg font-extrabold text-home-midnight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeTrust;
