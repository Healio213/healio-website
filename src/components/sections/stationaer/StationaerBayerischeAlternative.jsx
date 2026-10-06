import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { useLanguage } from '@/hooks/useLanguage';
import { BAYERISCHE_STATIONAER_URL, trackStationaerBayerischeClick } from '@/components/sections/hospital/hospitalLinks';

// Die Bayerische als zweiter Klinik-Versicherer auf /stationaer (bis 29.08.
// über HospitalConcept eingebunden). Nur belegte Punkte aus AVB B 275000
// (Stand 11/2024) und den Tarifbedingungen Komfort/Prestige (11/2024).
// Wartezeit (05.10.2026): keine allgemeine Wartezeit, nur besondere acht Monate
// für Entbindung und Psychotherapie, bei Unfall keine (AVB B 275000 § 3,
// Annahmerichtlinien B 275012 Stand 12/2024, Auskunft der Bayerischen vom 05.10.2026).
// Die drei Monate aus der alten AVB 333500 gelten für die KH-Tarife 2025 nicht.
// Schwangerschaft, Kinder und Familienzimmer stehen in der Familienkarte
// (#familie). Hebammen-Aussage der Bayerischen laut Produktunterlagen
// (Highlightblatt B 275008, Produktsteckbrief B 275010), Freigabe Frank
// 29.09.2026, bestätigt 06.10.2026; nicht in den Tarifbedingungen, schriftliche
// Bestätigung beim Versicherer angefragt. Sie steht im Hebammen-Block der
// Familien-Sektion (#hebamme).
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
        text: 'Bei der SDK gibt es keine Wartezeiten. Bei der Bayerischen gibt es keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie acht Monate. Nach einem Unfall entfallen auch diese.',
      },
      {
        label: 'Chefarzt',
        text: 'Im Komfort und im Prestige zahlt die Bayerische im Krankenhaus die Rechnungen von Chef- und Privatärzten auch über den Höchstsätzen der Gebührenordnung für Ärzte.',
      },
      {
        label: 'Beitrag',
        text: 'Mit 21 bis 30 Jahren zahlst du im Komfort 10,20\u00a0EUR und im Prestige 13,40\u00a0EUR im Monat (Stand 09/2026). Der Beitrag steigt, wenn du in die nächste Altersgruppe kommst.',
      },
      {
        label: 'Schwangerschaft und Geburt',
        text: 'Bist du beim Antrag schon schwanger, zahlen beide Versicherer diese Entbindung nicht. Bei der Bayerischen gelten zusätzlich Fristen für Entbindung und Neugeborene.',
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
        text: 'SDK has no waiting periods. Die Bayerische has no general waiting period, only eight months for childbirth and psychotherapy. After an accident, these fall away too.',
      },
      {
        label: 'Head physician',
        text: 'In Komfort and Prestige, die Bayerische pays head and private physician bills in hospital even above the maximum rates of the German medical fee schedule (GOÄ).',
      },
      {
        label: 'Premium',
        text: 'At 21 to 30, you pay EUR\u00a010.20 a month in Komfort and EUR\u00a013.40 in Prestige (as of 09/2026). The premium rises when you move into the next age group.',
      },
      {
        label: 'Pregnancy and birth',
        text: 'If you are already pregnant when you apply, neither insurer pays for that birth. Die Bayerische also has time limits for childbirth and newborn cover.',
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
      className="scroll-mt-24 bg-[#f5faf8] pb-12 md:pb-24"
      aria-labelledby="stationaer-bayerische-heading"
      data-healio-insurer="bayerische"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[1.8rem] border border-[#d6e3f0] bg-white shadow-[0_18px_45px_rgba(29,53,63,0.07)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="bg-[#f4f8fc] p-6 sm:p-8 lg:p-10">
            <FriendlyIcon kind="hospital" tone="sky" size="md" className="!h-12 !w-12 md:!h-16 md:!w-16" />
            <p className="mt-4 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[#2b6497] md:mt-6 md:text-xs md:tracking-[0.18em]">
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

            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500 md:mt-6 md:text-xs md:tracking-[0.16em]">
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

            <div className="mt-6 md:mt-8">
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
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 [text-wrap:pretty] md:text-sm md:leading-relaxed">
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

          {/* Mobil sind die vier Angaben eine Wischreihe aus kleinen Karten;
              ab md bleibt es die bisherige Liste mit Trennlinien. */}
          <div className="border-t border-[#e3ecf5] px-6 py-5 sm:px-8 md:py-2 lg:border-l lg:border-t-0 lg:px-10 lg:py-4">
            <MobileSwipeRow
              label={copy.title}
              className="min-w-0"
              desktopClassName="-mx-6 scroll-pl-6 px-6 sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:block md:divide-y md:divide-slate-100 md:px-0"
              mobileItemWidth="w-[calc(100%-2rem)]"
              bleed={false}
            >
              {copy.facts.map((fact) => (
                <dl
                  key={fact.label}
                  className="h-full rounded-2xl border border-[#e3ecf5] bg-[#f8fbfe] p-5 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-6"
                >
                  <dt className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#2b6497] md:text-xs md:tracking-[0.16em]">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-slate-700 md:leading-6">
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
                </dl>
              ))}
            </MobileSwipeRow>
          </div>
        </article>
      </div>
    </section>
  );
};

export default StationaerBayerischeAlternative;
