import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';

const HomeFinalCTA = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();

  return (
    <section className="bg-[#FDFAF6] px-4 pb-8 sm:px-6 sm:pb-10" aria-labelledby="home-final-cta-title">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2.25rem] border border-white/10 bg-home-midnight px-6 py-10 text-white shadow-[0_24px_70px_rgba(7,17,31,0.2)] sm:px-10 sm:py-12 lg:px-14">
        <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-home-mint/15" aria-hidden="true" />
        <div className="relative grid items-center gap-7 text-center lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:text-left">
          <FriendlyIcon kind="weighing" tone="mint" size="xl" className="mx-auto -rotate-2 lg:mx-0" />
          <div>
            <h2 id="home-final-cta-title" className="mx-auto max-w-[23ch] font-friendly text-3xl font-bold leading-[1.06] tracking-[-0.025em] lg:mx-0 sm:text-4xl">
              {t('finalCta.title')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-300 lg:mx-0">{t('finalCta.description')}</p>
            <Link
              to={getPath('kassenboost')}
              className="home-focus mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-home-mint underline decoration-home-mint/40 decoration-2 underline-offset-4 transition hover:text-white"
            >
              {t('finalCta.detailsCta')}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <a
            href={KASSENBOOST_COMPARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="home-focus mx-auto inline-flex min-h-14 items-center gap-2 rounded-full bg-home-mint px-7 py-4 font-display text-sm font-extrabold text-home-midnight shadow-[0_12px_32px_rgba(37,201,144,0.2)] transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none lg:mx-0"
          >
            {t('finalCta.cta')}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCTA;
