import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const HomeFinalCTA = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('finalCta.items', { returnObjects: true });

  return (
    <section className="bg-white px-4 pb-6 sm:px-6 sm:pb-8" aria-labelledby="home-final-cta-title">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-home-midnight px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="home-eyebrow text-home-mint">{t('finalCta.eyebrow')}</p>
          <h2 id="home-final-cta-title" className="mx-auto mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
            {t('finalCta.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{t('finalCta.description')}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {items.map((item) => (
              <Link
                key={item.routeKey}
                to={getPath(item.routeKey)}
                className="home-focus group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 font-display text-sm font-bold transition hover:border-home-mint/60 hover:bg-home-mint/10"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <Link
            to={getPath('terminvereinbarung')}
            className="home-focus mt-8 inline-flex items-center gap-2 rounded-full bg-home-mint px-7 py-4 font-display text-sm font-extrabold text-home-midnight transition hover:bg-home-mint-active"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t('finalCta.consultation')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCTA;
