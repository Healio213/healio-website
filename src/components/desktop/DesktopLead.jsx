import React from 'react';
import UrgencyNote from '@/components/UrgencyNote';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import { trackEvent } from '@/lib/analytics';
import { trackMetaRechnerStart } from '@/lib/meta-pixel';
import { scrollToZahnCheck } from '@/components/sections/dental/zahnCheckScroll';
import { useLanguage } from '@/hooks/useLanguage';
import { getDesktopLeadContent } from './desktopLeadContent';
import HighlightText from '@/components/ui/HighlightText';
import SceneHero, { sceneAccentClass, sceneBelow, scenePrimaryButtonClass } from './SceneHero';
import { GUIDED_CALLBACK_ENABLED } from '@/lib/guided-callback';
import GuidedCallbackButton from '@/components/guided/GuidedCallbackButton';
import { getGuidedHomeContent } from '@/components/home/guidedHomeContent';
import DentalEntryActions from '@/components/sections/dental/DentalEntryActions';

const destinations = { ambulant: '#budget-kompass', zahn: '#zahn-check', stationaer: '#tarife' };

// Das Angebot unter der Szene, ohne Kasten: dieselben Inhalte wie vorher.
const OfferList = ({ copy, surface }) => (
  <div className="min-w-0">
    <h2 className={sceneBelow.listTitle}>{copy.panelTitle}</h2>
    {copy.panelText && <p className={sceneBelow.listIntro}>{copy.panelText}</p>}
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
    {surface === 'home' ? (
      <details className="group mt-5 rounded-2xl border border-white/20 bg-white/[0.06] px-5 py-1" data-home-know="">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] [&::-webkit-details-marker]:hidden">
          {copy.knowTitle}
          <ChevronDown className="h-5 w-5 shrink-0 text-[#5ee0b1] transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-2 pb-4 text-sm leading-6 text-[#c9d8de]">
          {copy.knowItems.map((item) => <p key={item}>{item}</p>)}
          <p>{copy.panelNote}</p>
        </div>
      </details>
    ) : (
      <p className="mt-4 text-sm leading-6 text-[#bfced6]">{copy.panelNote}</p>
    )}
  </div>
);

const DesktopLead = ({ surface = 'home', language = 'de', fromBonusTopic = false }) => {
  const copy = getDesktopLeadContent(surface, language, fromBonusTopic);
  const { getPath } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isHome = surface === 'home';
  const guidedCallbackEnabled = GUIDED_CALLBACK_ENABLED && ['home', 'ambulant', 'zahn', 'stationaer'].includes(surface);
  const guidedCopy = getGuidedHomeContent(language);
  // Besuchertest 11.10.2026: Auf /zahn und /stationaer steht dieselbe Auswahl (zwei Zahn-Wege,
  // vier Klinik-Tarife) weiter unten ausführlich; die Kurzliste im Kopfbereich entfällt.
  const showOffer = surface !== 'zahn' && surface !== 'stationaer' && !(guidedCallbackEnabled && isHome);
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
      subtitle={isHome ? (
        <>
          {copy.description}{' '}
          {!guidedCallbackEnabled && <Link to={getPath('ambulant')} className="whitespace-nowrap font-bold text-[#5ee0b1] underline decoration-[#5ee0b1]/60 underline-offset-4 hover:text-white" onClick={() => trackEvent('home_budget_link', { placement: 'desktop-hero' })}>{copy.budgetLink}</Link>}
        </>
      ) : surface === 'zahn' ? copy.description : undefined}
      actionHint={guidedCallbackEnabled && surface === 'zahn'
        ? (language === 'en' ? 'About one minute to find your route: UKV ZahnPRIVAT or ZAHN Sofort from die Bayerische. You can also discuss your questions with us first.' : 'In ca. 1 Minute zu deinem Tarifweg: UKV ZahnPRIVAT oder ZAHN Sofort von der Bayerischen. Du kannst deine Fragen auch zuerst mit uns klären.')
        : guidedCallbackEnabled ? guidedCopy.hint : isHome ? copy.hint : undefined}
      urgency={isHome || surface === 'zahn' || (fromBonusTopic && surface === 'ambulant') ? undefined : <UrgencyNote surface={surface} />}
      actions={(
        <>
          {guidedCallbackEnabled && surface === 'zahn' ? <DentalEntryActions desktop /> : guidedCallbackEnabled ? (
            <>
              <GuidedCallbackButton data-desktop-primary product={isHome ? 'any' : surface} className={scenePrimaryButtonClass}>
                {guidedCopy.cta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </GuidedCallbackButton>
              {isHome && (
                <a href="#desktop-home-products" className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#5ee0b1] underline underline-offset-4">
                  {copy.discoverCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </>
          ) : <a
            data-desktop-primary
            href={action}
            {...(isHome ? { target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': `desktop-${surface}-external` } : {})}
            onClick={handleAction}
            className={scenePrimaryButtonClass}
          >
            {copy.cta}
            {isHome ? <ArrowUpRight className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </a>}
          {surface === 'stationaer' && (
            <>
              <a href="#einzelzimmer-kosten" className="inline-flex min-h-11 items-center font-semibold text-[#5ee0b1] underline underline-offset-4">
                {language === 'en' ? 'Understand single-room costs' : 'Einzelzimmerkosten verstehen'}
              </a>
              <a href="#familie" className="inline-flex min-h-11 items-center font-semibold text-[#5ee0b1] underline underline-offset-4">
                {language === 'en' ? 'Planning a family? See cover for children' : 'Familie geplant? Schutz für Kinder ansehen'}
              </a>
            </>
          )}
          {isHome && !guidedCallbackEnabled && <span id={`desktop-${surface}-external`} className="sr-only">{copy.externalHint}</span>}
        </>
      )}
    >
      <div className={showOffer && !isHome ? sceneBelow.grid : 'grid grid-cols-1 gap-6'}>
        <div className={isHome ? 'hidden' : 'min-w-0'}>
          {/* Frank 15.10.2026: „Unser Geheimtipp“ im Ambulant-Text hervorheben (<highlight>). */}
          {!isHome && surface !== 'zahn' && <p className={sceneBelow.lead}><HighlightText text={copy.description} className="font-bold text-[#5ee0b1]" /></p>}
          {!isHome && <p className={sceneBelow.note}>{copy.condition}</p>}
          {!isHome && !guidedCallbackEnabled && <p className="mt-2 max-w-[62ch] text-sm leading-6 text-[#bfced6]">{copy.hint}</p>}
        </div>
        {showOffer && (isHome ? <div className="max-w-2xl"><OfferList copy={copy} surface={surface} /></div> : <OfferList copy={copy} surface={surface} />)}
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
