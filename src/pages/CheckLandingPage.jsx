import React from 'react';
import { Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import CampaignShell from '@/components/campaign/CampaignShell';
import KurzCheck from '@/components/campaign/KurzCheck';
import { META_CHECKS } from '@/content/meta-checks';

/**
 * Ablenkungsfreie Zielseite für Meta-Anzeigen: oben der Satz aus der Anzeige,
 * darunter der Kurzcheck. Kein Menü, keine weiterführenden Links.
 */
const CheckLandingPage = ({ variant }) => {
  const config = META_CHECKS[variant];

  return (
    <CampaignShell>
      <SEOHead
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalUrl={`https://healio.de${config.path}`}
        robots="noindex, nofollow"
      />

      <section className="bg-home-midnight pb-16 pt-6 text-white sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="inline-flex rounded-full bg-home-mint/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-home-mint-active sm:text-sm">
            {config.badge}
          </p>
          <h1 className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] [text-wrap:balance] sm:text-5xl">
            {config.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {config.lead}
          </p>
          {config.heroNote ? (
            <p className="mt-3 text-sm leading-6 text-slate-400">{config.heroNote}</p>
          ) : null}
          <ul className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {config.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2.5 text-base font-semibold text-white">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-home-mint text-home-midnight" aria-hidden="true">
                  <Check className="h-4 w-4" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto -mt-8 max-w-2xl px-4 pb-10 sm:-mt-10 sm:px-6 sm:pb-14">
        <KurzCheck config={config} />

        <div className="mt-6 space-y-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
          {config.footnotes.map((note) => <p key={note}>{note}</p>)}
        </div>
      </div>
    </CampaignShell>
  );
};

export default CheckLandingPage;
