import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';
import { BAYERISCHE_STATIONAER_URL, trackStationaerBayerischeClick } from '@/components/sections/hospital/hospitalLinks';

// Die Bayerische als zweiter Klinik-Versicherer auf /stationaer (bis 29.08.
// über HospitalConcept eingebunden). Nur belegte Punkte aus AVB B 333500 und
// den Tarifbedingungen Komfort/Prestige (11/2024). Schwangerschaft, Kinder und
// Familienzimmer stehen seit 29.09. in der dritten Familienkarte (#familie).
// Die Hebamme steht bei der Bayerischen nur bei den Mehrkosten einer anderen
// Klinikwahl (TB 2.7), deshalb hier keine Hebammen-Aussage.
const TARIFFS = ['Prestige', 'Komfort', 'Smart'];

const COPY = {
  de: {
    eyebrow: 'Zweiter Klinik-Versicherer',
    title: 'Lieber die Bayerische? Auch das geht.',
    lead: 'Healio bietet dir zwei Klinik-Versicherer an: die SDK mit den drei Tarifen oben und die Bayerische. Du wählst, was besser zu dir passt.',
    tariffsLabel: 'Klinik-Tarife der Bayerischen',
    facts: [
      {
        label: 'Wartezeit',
        text: 'Bei der SDK gibt es keine Wartezeiten. Bei der Bayerischen gilt eine Wartezeit von drei Monaten, nach einem Unfall bist du sofort versichert.',
      },
      {
        label: 'Chefarzt',
        text: 'Im Komfort und im Prestige zahlt die Bayerische privatärztliche Rechnungen auch über den Höchstsätzen der Gebührenordnung für Ärzte.',
      },
      {
        label: 'Beitrag',
        text: 'Mit 21 bis 30 Jahren zahlst du im Komfort 10,20\u00a0EUR und im Prestige 13,40\u00a0EUR im Monat. Der Beitrag richtet sich nach deiner Altersgruppe.',
      },
      {
        label: 'Schwanger oder Kinderwunsch',
        text: 'Für die Entbindung und dein Kind gelten bei der Bayerischen Fristen ab Versicherungsbeginn.',
        link: { href: '#familie', label: 'Wann SDK, wann Bayerische?' },
      },
    ],
    cta: 'Klinik-Tarif der Bayerischen berechnen',
    ctaAria: 'Klinik-Tarif der Bayerischen berechnen (neuer Tab)',
    pregnancyQuestion: 'Du bist schwanger?',
    pregnancyLink: 'Dann lies zuerst, was ein Klinik-Tarif jetzt noch leistet.',
  },
  en: {
    eyebrow: 'Second hospital insurer',
    title: 'Prefer die Bayerische? That works too.',
    lead: 'Healio offers you two hospital insurers: SDK with the three plans above, and die Bayerische. You choose what suits you better.',
    tariffsLabel: 'Hospital plans from die Bayerische',
    facts: [
      {
        label: 'Waiting period',
        text: 'SDK has no waiting periods. Die Bayerische has a three-month waiting period; after an accident, you are covered straight away.',
      },
      {
        label: 'Head physician',
        text: 'In Komfort and Prestige, die Bayerische pays private medical bills even above the maximum rates of the German medical fee schedule (GOÄ).',
      },
      {
        label: 'Premium',
        text: 'At 21 to 30, you pay EUR\u00a010.20 a month in Komfort and EUR\u00a013.40 in Prestige. The premium depends on your age group.',
      },
      {
        label: 'Pregnancy or planning a family',
        text: 'For the birth and your child, die Bayerische has waiting periods counted from the start of cover.',
        link: { href: '#familie', label: 'When SDK, when die Bayerische?' },
      },
    ],
    cta: 'Calculate the Bayerische hospital plan',
    ctaAria: 'Calculate the Bayerische hospital plan (opens in a new tab)',
  },
};

const StationaerBayerischeAlternative = () => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];

  return (
    <section
      id="bayerische"
      className="scroll-mt-24 bg-[#f5faf8] pb-20 md:pb-24"
      aria-labelledby="stationaer-bayerische-heading"
      data-healio-insurer="bayerische"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="grid overflow-hidden rounded-[1.8rem] border border-[#d6e3f0] bg-white shadow-[0_18px_45px_rgba(29,53,63,0.07)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="bg-[#f4f8fc] p-6 sm:p-8 lg:p-10">
            <FriendlyIcon kind="hospital" tone="sky" size="md" />
            <p className="mt-6 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#2b6497]">
              {copy.eyebrow}
            </p>
            <h2
              id="stationaer-bayerische-heading"
              className="mt-3 max-w-[18ch] font-display text-2xl font-extrabold leading-[1.12] tracking-[-0.03em] text-[#071726] [text-wrap:balance] sm:text-3xl"
            >
              {copy.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 [text-wrap:pretty]">
              {copy.lead}
            </p>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
              {copy.tariffsLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={copy.tariffsLabel}>
              {TARIFFS.map((tariff) => (
                <li
                  key={tariff}
                  className="rounded-full border border-[#cfe0f0] bg-white px-3.5 py-1.5 text-sm font-extrabold text-[#1f4f7a]"
                >
                  {tariff}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href={BAYERISCHE_STATIONAER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.ctaAria}
                onClick={() => trackStationaerBayerischeClick('stationaer-alternative')}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#071726] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#12304a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b6497] motion-reduce:transform-none sm:w-auto"
              >
                {copy.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              {language === 'de' && (
                <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 [text-wrap:pretty]">
                  {copy.pregnancyQuestion}{' '}
                  <Link
                    to="/schwangerschaft"
                    className="font-bold text-[#075f46] underline decoration-[#9fd8c2] underline-offset-4 transition hover:decoration-[#075f46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075f46]"
                  >
                    {copy.pregnancyLink}
                    <ArrowRight className="ml-1 inline h-3.5 w-3.5 align-[-0.125em]" aria-hidden="true" />
                  </Link>
                </p>
              )}
            </div>
          </div>

          <dl className="divide-y divide-slate-100 border-t border-[#e3ecf5] px-6 py-2 sm:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-4">
            {copy.facts.map((fact) => (
              <div key={fact.label} className="py-5 sm:py-6">
                <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2b6497]">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {fact.text}
                  {fact.link && (
                    <>
                      {' '}
                      <a
                        href={fact.link.href}
                        className="font-bold text-[#075f46] underline decoration-[#9fd8c2] underline-offset-4 transition hover:decoration-[#075f46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075f46]"
                      >
                        {fact.link.label}
                        <ArrowDown className="ml-1 inline h-3.5 w-3.5 align-[-0.125em]" aria-hidden="true" />
                      </a>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
};

export default StationaerBayerischeAlternative;
