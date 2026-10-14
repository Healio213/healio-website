import React from 'react';
import UrgencyNote from '@/components/UrgencyNote';
import MobileScene from '@/components/desktop/MobileScene';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import MobileDetails from '@/components/ui/MobileDetails';
import { useLanguage } from '@/hooks/useLanguage';
import useDesktopLayout from '@/hooks/useDesktopLayout';
import { getAmbulantHeroBudget } from '@/components/sections/ambulant/AmbulantConversionFlow';

// Jede Topf-Karte bekommt ihre eigene Figur und einen warmen Farbton
// (Frank 07.10.2026: „liebevoller und sympathischer“ statt Farbpunkt).
const potStyles = {
  vision: { icon: '/images/friendly-icons/vision-glasses.webp', tone: 'sky', card: 'from-[#f5faff] to-[#e6f1fb] ring-[#d3e3f2]' },
  natural: { icon: '/images/friendly-icons/naturopathy.webp', tone: 'mint', card: 'from-[#f4fbf7] to-[#e2f4eb] ring-[#cde8dc]' },
  prevention: { icon: '/images/friendly-icons/prevention-vaccination.webp', tone: 'lavender', card: 'from-[#f9f7ff] to-[#ece8fb] ring-[#dcd6f1]' },
  copay: { icon: '/images/friendly-icons/medication-copay.webp', tone: 'butter', card: 'from-[#fffcf2] to-[#fcf0cf] ring-[#efe0b2]' },
};

// Experiment Handy-Conversion 10/2026: mobil ist der Budget-Kompass ohne Höhe
// (er wiederholt die vier Themen dieser Kacheln und nennt keine Beträge). Der
// href bleibt überall '#budget-kompass'; mobil liegt dieser Anker direkt vor der
// Tarifwahl und funktioniert auch vor dem Laden des Skripts. Nur die
// Sehhilfen-Kachel springt unter md zusätzlich zur Brillen-Karte. Die Abfrage
// läuft erst beim Klick, das gerenderte HTML ist am Handy und am Desktop gleich.
const MOBILE_QUERY = '(max-width: 767px)';
const jumpOnMobile = (targetId) => (event) => {
  if (!window.matchMedia(MOBILE_QUERY).matches) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
};

// Hero wie auf /stationaer (Frank 30.09.2026): dunkler Grund, links Text und
// Budget-Button, rechts die Karte mit dem Budget der höchsten Stufe und ihren
// vier Töpfen. Beträge kommen aus denselben Tarifdaten wie die Tarifwahl.
const AmbulantHero = ({ fromBonusTopic = false, className = '' }) => {
  const HeroHeading = useDesktopLayout() ? motion.h2 : motion.h1;
  const { t } = useTranslation('ambulant');
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const budget = getAmbulantHeroBudget(language);
  const euro = new Intl.NumberFormat(language === 'en' ? 'en-GB' : 'de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });

  return (
    <section className={`relative isolate overflow-hidden bg-[#071726] text-white ${className}`} aria-labelledby="hero-heading">
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#25c990]/16 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-home-mint-active/14 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pb-10 pt-24 sm:px-6 sm:pb-12 md:gap-12 md:pb-20 md:pt-28 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 lg:px-8">
        <MobileScene surface="ambulant" className="-mb-2" />
        <div className="min-w-0 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-4 hidden font-display text-sm font-extrabold uppercase tracking-[0.16em] text-[#5ee0b1] md:mb-5 md:block md:tracking-[0.24em]"
          >
            {t('hero.eyebrow')}
          </motion.p>
          <HeroHeading
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            id="hero-heading"
            className={`mb-5 max-w-[21ch] font-display ${fromBonusTopic ? 'text-4xl sm:text-5xl' : 'text-[clamp(1.75rem,9vw,2.25rem)] sm:text-[clamp(2.25rem,4.2vw,3.75rem)]'} font-extrabold leading-[1.04] tracking-[-0.035em] text-white [text-wrap:balance] md:mb-7`}
          >
            <span className="md:hidden">{fromBonusTopic ? 'Leistungen und Beitrag. Klar im Blick.' : language === 'en' ? <>Up to EUR 3,000 <span className="text-[#5ee0b1]">for your health.</span></> : <>Bis zu 3.000 EUR <span className="text-[#5ee0b1]">für deine Gesundheit.</span></>}</span>
            <span className="hidden md:inline"><HighlightText text={fromBonusTopic ? 'Leistungen und Beitrag. Klar im Blick.' : t('hero.title')} className="text-[#5ee0b1]" /></span>
          </HeroHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 max-w-2xl text-base font-medium leading-7 text-slate-200 sm:text-lg sm:leading-relaxed md:mb-8 md:text-xl"
          >
            <span className="md:hidden">{fromBonusTopic ? 'Vergleiche deinen Zusatzschutz. Ohne Kassenwechsel oder Pflichttermin.' : language === 'en' ? 'Four reimbursement pots for natural therapies, glasses, prevention and co-payments. Per two calendar years.' : 'Vier Erstattungstöpfe für Heilpraktiker, Brille, Vorsorge und Zuzahlungen. Je zwei Kalenderjahre.'}</span>
            <span className="hidden md:inline">{fromBonusTopic ? 'Vergleiche den Zusatzschutz, der zu deinem Bedarf passt. Ohne Kassenwechsel und ohne Pflichttermin.' : t('hero.subtitle')}</span>
          </motion.p>
          {fromBonusTopic && (
            <p role="note" className="mb-8 max-w-2xl text-base leading-7 text-slate-200 md:mb-10">
              Bereits angeratene oder begonnene Untersuchungen und Behandlungen sind nicht automatisch abgedeckt. Entscheidend sind Versicherungsbeginn, Gesundheitsangaben und Tarifbedingungen.
            </p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-start justify-center gap-3"
          >
            <a
              href={fromBonusTopic ? '#tarifwahl' : '#budget-kompass'}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.3)] transition hover:-translate-y-0.5 hover:bg-home-mint-active hover:shadow-[0_20px_50px_rgba(37,201,144,0.36)] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 focus-visible:ring-offset-[#071726] motion-reduce:transform-none"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              {fromBonusTopic ? 'Leistungen und Beitrag ansehen' : t('hero.ctaCalculate')}
            </a>
            {!fromBonusTopic && <UrgencyNote surface="ambulant" className="!mt-0" />}
            <p className="max-w-xl text-left text-base leading-7 text-slate-300">
              <span className="md:hidden">{fromBonusTopic ? 'Abschluss und persönliche Hilfe bleiben freiwillig.' : language === 'en' ? 'Personal premium in the calculator. Your bonus may help pay it.' : 'Persönlicher Beitrag im Rechner. Dein Bonus kann mitzahlen.'}</span>
              <span className="hidden md:inline">{fromBonusTopic ? 'Du vergleichst zuerst. Ein Abschluss und persönliche Hilfe bleiben freiwillig.' : t('hero.ctaHint')}</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative mx-auto min-w-0 w-full max-w-[35rem] lg:mx-0"
          aria-label={t('hero.offerAria')}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-5 text-[#071726] shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:rounded-[2.2rem] sm:p-7">
            <div className="flex items-center gap-4">
              <img
                src="/images/friendly-icons/health-wallet.webp"
                alt=""
                width="311"
                height="315"
                loading="eager"
                decoding="async"
                className="hidden w-20 shrink-0 drop-shadow-[0_12px_18px_rgba(7,23,38,0.12)] md:block sm:w-24"
              />
              <div className="min-w-0">
                <p className="hidden font-display text-xl font-extrabold leading-tight text-[#0b6048] sm:text-2xl md:block">
                  {t('hero.offerTitle', { amount: euro.format(budget.budget) })}
                </p>
                <p className="text-sm font-semibold text-slate-600 md:mt-1 md:text-base">
                  {t('hero.offerTier', { code: budget.code, refund: budget.refund })}
                </p>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 md:hidden">
              {budget.pots.map((pot) => (
                <li key={pot.key}>
                  <a href={fromBonusTopic ? '#tarifwahl' : '#budget-kompass'} onClick={fromBonusTopic || pot.key !== 'vision' ? undefined : jumpOnMobile('ambulant-brille')} className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint">
                    <span className="block text-sm font-semibold leading-5 text-slate-600">{pot.label}</span>
                    <strong className="mt-1 block font-display text-lg font-extrabold text-[#0b6048]">{t('hero.offerUpTo', { amount: euro.format(pot.amount) })}</strong>
                  </a>
                </li>
              ))}
            </ul>
            {/* Experiment 06.10.2026: mobil eine Wischreihe statt vier gestapelter
                Karten, ab md das bisherige Zwei-Spalten-Raster. Jede Karte führt
                weiterhin in den Budget-Kompass bzw. die Tarifwahl. */}
            <MobileSwipeRow
              label={t('hero.offerAria')}
              className="mt-4 hidden md:mt-5 md:block"
              desktopClassName="-mx-5 scroll-pl-5 px-5 sm:-mx-7 sm:scroll-pl-7 sm:px-7 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-3"
              mobileItemWidth="w-[74%]"
              bleed={false}
            >
              {budget.pots.map((pot) => {
                const style = potStyles[pot.key] || potStyles.natural;
                return (
                  <a
                    key={pot.key}
                    href={fromBonusTopic ? '#tarifwahl' : '#budget-kompass'}
                    onClick={fromBonusTopic || pot.key !== 'vision' ? undefined : jumpOnMobile('ambulant-brille')}
                    className={`group block h-full rounded-[1.4rem] bg-gradient-to-br p-4 ring-1 transition md:hover:-translate-y-0.5 md:hover:shadow-[0_16px_36px_rgba(39,63,72,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint motion-reduce:transform-none ${style.card}`}
                  >
                    <span className="flex items-center gap-3">
                      <FriendlyIcon src={style.icon} tone={style.tone} size="sm" />
                      <span className="min-w-0">
                        <span className="block font-display text-lg font-extrabold leading-tight text-[#071726]">{pot.label}</span>
                        <span className="mt-1 inline-flex rounded-full bg-white/85 px-2.5 py-0.5 font-display text-base font-extrabold text-[#0b6048] shadow-[0_1px_2px_rgba(39,63,72,0.08)]">
                          {t('hero.offerUpTo', { amount: euro.format(pot.amount) })}
                        </span>
                      </span>
                    </span>
                    <span className="mt-3 block text-base leading-snug text-slate-600">{pot.detail}</span>
                  </a>
                );
              })}
            </MobileSwipeRow>
            <p className="mt-4 text-sm leading-5 text-slate-600 md:hidden">{language === 'en' ? 'Reimbursement of eligible invoices. No freely available cash.' : 'Erstattung versicherter Rechnungen. Kein frei verfügbares Guthaben.'}</p>
            <MobileDetails summary={language === 'en' ? 'How the budgets apply' : 'So gelten die Budgets'} className="mt-3 md:mt-4">
              <p className="text-sm leading-6 text-slate-500 md:mt-4">{budget.disclosure}</p>
            </MobileDetails>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantHero;
