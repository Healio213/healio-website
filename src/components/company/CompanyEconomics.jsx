import React from 'react';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const factMeta = {
  expense: {
    kind: 'document',
    tone: 'sky',
    href: 'https://www.gesetze-im-internet.de/estg/__4.html',
  },
  pension: {
    kind: 'money',
    tone: 'butter',
    href: 'https://www.gesetze-im-internet.de/estg/__3.html',
  },
  health: {
    kind: 'budget',
    tone: 'coral',
    href: 'https://www.bundesfinanzhof.de/de/entscheidung/entscheidungen-online/detail/STRE201810155/',
  },
  prevention: {
    kind: 'prevention',
    tone: 'mint',
    href: 'https://www.bundesgesundheitsministerium.de/themen/praevention/betriebliche-gesundheitsfoerderung/steuerliche-vorteile/',
  },
};

const CompanyEconomics = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const facts = t('economics.facts', { returnObjects: true });

  return (
    <section className="bg-[#07161f] py-14 text-white lg:py-20" aria-labelledby="company-economics-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">{t('economics.eyebrow')}</p>
            <h2
              id="company-economics-title"
              className="mt-4 max-w-[13ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl"
            >
              {t('economics.title')}
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-slate-300">{t('economics.description')}</p>
            <Link
              to={getPath('potenzialanalyse')}
              className="mt-7 inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#8ee7ca] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07161f]"
            >
              {t('economics.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-white sm:text-3xl">{t('economics.summaryTitle')}</p>
            <p className="mt-4 text-base leading-7 text-slate-300">{t('economics.summaryText')}</p>
          </div>

          <details className="group mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#0b202a]">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-display text-sm font-extrabold text-[#8ee7ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-inset sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="group-open:hidden">{t('economics.detailsShow')}</span>
                <span className="hidden group-open:inline">{t('economics.detailsHide')}</span>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
            </summary>

            <div className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-2">
              {facts.map((fact) => {
                const meta = factMeta[fact.key];
                return (
                  <article key={fact.key} className="bg-[#0b202a] p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <FriendlyIcon kind={meta.kind} tone={meta.tone} size="sm" />
                      <div>
                        <h3 className="font-display text-lg font-extrabold tracking-[-0.02em] text-white">{fact.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{fact.description}</p>
                        <a
                          href={meta.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#8ee7ca] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca]"
                        >
                          {t('economics.sourceLabel')}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="border-t border-white/10 px-5 py-5 text-xs leading-5 text-slate-400 sm:px-6">{t('economics.disclaimer')}</p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default CompanyEconomics;
