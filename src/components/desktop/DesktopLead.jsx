import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import { trackEvent } from '@/lib/analytics';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { scrollToZahnCheck } from '@/components/sections/dental/zahnCheckScroll';
import { useLanguage } from '@/hooks/useLanguage';
import useDesktopLayout from '@/hooks/useDesktopLayout';
import { getDesktopLeadContent } from './desktopLeadContent';

const destinations = { ambulant: '#budget-kompass', zahn: '#zahn-check', stationaer: '#tarife' };

const DesktopLead = ({ surface = 'home', language = 'de', fromBonusTopic = false }) => {
  const copy = getDesktopLeadContent(surface, language, fromBonusTopic);
  const { getPath } = useLanguage();
  const reduceMotion = useReducedMotion();
  const Heading = useDesktopLayout() ? 'h1' : 'h2';
  const isHome = surface === 'home';
  const headingId = `desktop-${surface}-heading`;
  const action = isHome ? KASSENBOOST_COMPARE_URL : fromBonusTopic && surface === 'ambulant' ? '#tarifwahl' : destinations[surface];

  const handleAction = (event) => {
    if (isHome) trackEvent('home_kassenboost_link', { placement: 'desktop-hero' });
    if (surface === 'zahn') {
      event.preventDefault();
      trackMetaRechnerStart();
      scrollToZahnCheck(reduceMotion);
    }
  };

  return (
    <section
      data-desktop-lead={surface}
      className="hidden w-full bg-[#071726] pb-9 pt-32 text-white lg:block xl:pt-36"
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] items-start gap-12 xl:gap-16">
          <div className="min-w-0">
            <Heading id={headingId} className="font-display text-[clamp(2.5rem,3.65vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">
              <span className="block">{copy.titleLead}</span>
              <span className="mt-2 block text-[#5ee0b1]">{copy.titleAccent}</span>
            </Heading>
            <p className="mt-5 max-w-[62ch] text-lg leading-7 text-[#e1ebef]">{copy.description}</p>
            <p className="mt-3 max-w-[68ch] text-sm leading-6 text-[#bfced6]">{copy.condition}</p>
            <a
              data-desktop-primary
              href={action}
              {...(isHome ? { target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': `desktop-${surface}-external` } : {})}
              onClick={handleAction}
              className="mt-5 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25c990] px-7 py-4 font-display text-base font-extrabold text-[#071726] transition-colors hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {copy.cta}
              {isHome ? <ArrowUpRight className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
            </a>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#bfced6]">{copy.hint}</p>
            {isHome && <span id={`desktop-${surface}-external`} className="sr-only">{copy.externalHint}</span>}
          </div>

          <div className="min-w-0 rounded-2xl bg-[#eff8f4] p-7 text-[#071726] xl:p-8">
            <h2 className="max-w-[27ch] font-display text-[1.8rem] font-extrabold leading-[1.15] tracking-[-0.02em] [text-wrap:balance]">{copy.panelTitle}</h2>
            <p className="mt-3 text-base leading-7 text-[#37554a]">{copy.panelText}</p>
            {copy.calculation ? (
              <ol className="mt-6 divide-y divide-[#bad4c7] border-y border-[#bad4c7]">
                {copy.calculation.map((row) => (
                  <li key={row.label} className="grid grid-cols-[1.5rem_1fr] gap-3 py-5">
                    <span className="font-display text-2xl font-bold text-[#075f46]" aria-hidden="true">{row.sign}</span>
                    <div>
                      <h3 className="font-display text-lg font-extrabold leading-6">{row.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#37554a]">{row.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <dl className="mt-6 divide-y divide-[#bad4c7] border-y border-[#bad4c7]">
                {copy.benefits.map((benefit) => (
                  <div key={benefit.label} className="py-4">
                    <div className={`flex justify-between gap-4 ${surface === 'zahn' ? 'flex-col gap-1' : 'items-center'}`}>
                      <dt className="max-w-[27ch] font-display text-base font-bold leading-6">{benefit.label}</dt>
                      <dd className="shrink-0 font-display text-lg font-extrabold text-[#075f46]">{benefit.value}</dd>
                    </div>
                    {benefit.detail && <p className="mt-2 text-sm leading-6 text-[#37554a]">{benefit.detail}</p>}
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-5 text-sm leading-6 text-[#37554a]">{copy.panelNote}</p>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#425c6c] pt-5 text-sm text-[#d4e1e5]">
          {copy.trust.map((item, index) => (
            <li key={item} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
              {index === 0 ? (
                <Link to={getPath('erstinformation')} title={copy.registration} className="inline-flex min-h-11 items-center rounded-sm underline decoration-[#799d91] underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{item}</Link>
              ) : item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DesktopLead;
