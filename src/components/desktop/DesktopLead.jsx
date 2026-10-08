import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import { trackEvent } from '@/lib/analytics';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { scrollToZahnCheck } from '@/components/sections/dental/zahnCheckScroll';
import { useLanguage } from '@/hooks/useLanguage';
import { getDesktopLeadContent } from './desktopLeadContent';
import SceneHero, { sceneAccentClass, sceneBelow, scenePrimaryButtonClass } from './SceneHero';

const destinations = { ambulant: '#budget-kompass', zahn: '#zahn-check', stationaer: '#tarife' };

// Das Angebot unter der Szene, ohne Kasten: dieselben Inhalte wie vorher.
const OfferList = ({ copy, surface }) => (
  <div className="min-w-0">
    <h2 className={sceneBelow.listTitle}>{copy.panelTitle}</h2>
    <p className={sceneBelow.listIntro}>{copy.panelText}</p>
    {copy.calculation ? (
      <ol className={sceneBelow.list}>
        {copy.calculation.map((row) => (
          <li key={row.label} className="grid grid-cols-[1.5rem_1fr] gap-3 py-4">
            <span className="font-display text-2xl font-bold leading-6 text-[#5ee0b1]" aria-hidden="true">{row.sign}</span>
            <div>
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display text-lg font-bold leading-6">{row.label}</h3>
                {row.value && (
                  <span className={`shrink-0 font-display font-extrabold tabular-nums ${row.sign === '=' ? 'text-2xl text-[#5ee0b1]' : 'text-lg text-white'}`}>{row.value}</span>
                )}
              </div>
              <p className="mt-1 text-sm leading-6 text-[#c9d8de]">{row.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    ) : (
      <dl className={sceneBelow.list}>
        {copy.benefits.map((benefit) => (
          <div key={benefit.label} className="py-3.5">
            <div className={`flex justify-between gap-6 ${surface === 'zahn' ? 'flex-col gap-1' : 'items-baseline'}`}>
              <dt className="font-display text-base font-bold leading-6 text-white">{benefit.label}</dt>
              <dd className="shrink-0 font-display text-lg font-extrabold leading-6 text-[#5ee0b1]">{benefit.value}</dd>
            </div>
            {benefit.detail && <p className="mt-1.5 text-sm leading-6 text-[#c9d8de]">{benefit.detail}</p>}
          </div>
        ))}
      </dl>
    )}
    <p className="mt-4 text-sm leading-6 text-[#bfced6]">{copy.panelNote}</p>
  </div>
);

const DesktopLead = ({ surface = 'home', language = 'de', fromBonusTopic = false }) => {
  const copy = getDesktopLeadContent(surface, language, fromBonusTopic);
  const { getPath } = useLanguage();
  const reduceMotion = useReducedMotion();
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

  // Frank 07.10.2026: im Bild nur Überschrift und Knopf. Erklärung, Angebot und
  // Hinweise stehen direkt darunter, damit die Ecke nicht voll Text ist.
  return (
    <SceneHero
      surface={surface}
      headingId={headingId}
      dataAttributes={{ 'data-desktop-lead': surface }}
      heading={(
        <>
          <span className="block">{copy.titleLead}</span>{' '}
          <span className={sceneAccentClass}>{copy.titleAccent}</span>
        </>
      )}
      subtitle={isHome || surface === 'zahn' ? copy.description : undefined}
      actionHint={isHome ? copy.hint : undefined}
      actions={(
        <>
          <a
            data-desktop-primary
            href={action}
            {...(isHome ? { target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': `desktop-${surface}-external` } : {})}
            onClick={handleAction}
            className={scenePrimaryButtonClass}
          >
            {copy.cta}
            {isHome ? <ArrowUpRight className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </a>
          {isHome && <span id={`desktop-${surface}-external`} className="sr-only">{copy.externalHint}</span>}
        </>
      )}
    >
      <div className={sceneBelow.grid}>
        <div className="min-w-0">
          {!isHome && surface !== 'zahn' && <p className={sceneBelow.lead}>{copy.description}</p>}
          <p className={sceneBelow.note}>{copy.condition}</p>
          {!isHome && <p className="mt-2 max-w-[62ch] text-sm leading-6 text-[#bfced6]">{copy.hint}</p>}
        </div>
        <OfferList copy={copy} surface={surface} />
      </div>

      <ul className={sceneBelow.trust}>
        {copy.trust.map((item, index) => (
          <li key={item} className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
            {index === 0 ? (
              <Link to={getPath('erstinformation')} title={copy.registration} className="inline-flex min-h-11 items-center rounded-sm underline decoration-[#799d91] underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{item}</Link>
            ) : item}
          </li>
        ))}
      </ul>
    </SceneHero>
  );
};

export default DesktopLead;
