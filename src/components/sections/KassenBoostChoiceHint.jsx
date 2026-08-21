import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const KassenBoostChoiceHint = () => {
  const { t } = useTranslation('common');
  const { getPath } = useLanguage();

  return (
    <section className="bg-white py-6 md:py-8" aria-labelledby="kassenboost-choice-heading">
      <div className="healio-container px-4 sm:px-6 md:px-8">
        <aside className="mx-auto flex max-w-5xl flex-col gap-5 rounded-2xl border border-emerald-200/80 bg-[#f3fbf7] px-5 py-5 sm:flex-row sm:items-center md:px-7 md:py-6">
          <FriendlyIcon
            kind="comparison"
            size="sm"
            tone="mint"
            label={t('kassenboostHint.iconLabel')}
            decorative={false}
          />

          <div className="min-w-0 flex-1">
            <h2 id="kassenboost-choice-heading" className="text-lg font-extrabold leading-snug text-slate-900 md:text-xl">
              {t('kassenboostHint.title')}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              {t('kassenboostHint.body')}
            </p>
          </div>

          <Link
            to={getPath('kassenbonus')}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-emerald-700 px-5 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:self-center"
          >
            {t('kassenboostHint.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default KassenBoostChoiceHint;
