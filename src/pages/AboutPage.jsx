import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/hooks/useLanguage';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import ProductTicker from '@/components/sections/ProductTicker';

const FOUNDER_IMAGE = '/images/frank-steinfurt-gruender-healio.webp';

const audienceIcons = {
  private: { emoji: '🙋', tone: 'butter' },
  practices: { emoji: '🩺', tone: 'mint' },
  companies: { emoji: '🏢', tone: 'sky' },
};

const principleIcons = {
  needs: { emoji: '🧭', tone: 'sky' },
  independent: { emoji: '🛡️', tone: 'mint' },
  clear: { emoji: '💬', tone: 'lavender' },
  personal: { emoji: '🎧', tone: 'butter' },
};

const impactIcons = [
  { emoji: '🩺', tone: 'mint' },
  { emoji: '🦷', tone: 'sky' },
  { emoji: '🏥', tone: 'lavender' },
];

const AboutPage = () => {
  const { t } = useTranslation('about');
  const { t: tSeo } = useTranslation('seo');
  const { lang, getPath } = useLanguage();
  const reduceMotion = useReducedMotion();

  const audiences = t('hero.audiences', { returnObjects: true });
  const storyParagraphs = t('story.paragraphs', { returnObjects: true });
  const principles = t('principles.items', { returnObjects: true });
  const impactItems = t('impact.items', { returnObjects: true });
  const routes = t('routes.items', { returnObjects: true });
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/about' : 'https://healio.de/about';

  const reveal = (delay = 0) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };

  const schemaMarkup = [
    createWebPageSchema(
      tSeo('about.title'),
      tSeo('about.description'),
      canonicalUrl,
      lang === 'en' ? 'en-US' : 'de-DE'
    ),
    createOrganizationSchema(),
  ];

  return (
    <>
      <SEOHead
        title={tSeo('about.title')}
        description={tSeo('about.description')}
        canonicalUrl={canonicalUrl}
        ogUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />

      <main className="w-full overflow-hidden bg-white text-[#07111f] selection:bg-[#25c990] selection:text-[#07111f]">
        <section
          className="relative flex min-h-[92svh] w-full items-center overflow-hidden bg-[#07111f] px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-40"
          aria-labelledby="about-hero-heading"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-[16rem] top-[5%] h-[42rem] w-[42rem] rounded-full border border-white/[0.045]" />
            <div className="absolute -right-[8rem] top-[15%] h-[30rem] w-[30rem] rounded-full border border-[#25c990]/10" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute bottom-[7%] left-[3%] font-display text-[clamp(5rem,18vw,18rem)] font-extrabold leading-none tracking-[-0.08em] text-white/[0.018]">
              HEALIO
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-[#5ee0b1] sm:text-sm">
                {t('hero.eyebrow')}
              </p>
              <h1
                id="about-hero-heading"
                className="mt-6 max-w-[12ch] font-display text-[clamp(2.1rem,7vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.055em] [text-wrap:balance] sm:text-[clamp(2.8rem,7vw,6.4rem)]"
              >
                {t('hero.title')}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:text-xl">
                {t('hero.description')}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#arbeitsweise"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
                >
                  {t('hero.primaryCta')}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to={getPath('kontakt')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ee0b1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:text-base"
                >
                  {t('hero.secondaryCta')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-9 grid max-w-2xl gap-3 border-t border-white/10 pt-6 text-sm text-slate-300 sm:grid-cols-2">
                <p className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
                  <span>{t('hero.brokerProof')}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5ee0b1]" aria-hidden="true" />
                  <span>{t('hero.locationProof')}</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 26 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-7">
                <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#5ee0b1]">
                      {t('hero.networkEyebrow')}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                      {t('hero.networkTitle')}
                    </h2>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#25c990]/35 bg-[#25c990]/10">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5ee0b1] shadow-[0_0_20px_rgba(94,224,177,0.75)]" />
                  </div>
                </div>

                <p className="mt-5 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                  {t('hero.networkDescription')}
                </p>

                <div className="relative mt-6">
                  <div className="absolute bottom-7 left-[1.35rem] top-7 w-px bg-gradient-to-b from-[#5ee0b1]/70 via-white/20 to-[#5ee0b1]/70 sm:left-[1.6rem]" aria-hidden="true" />
                  <ul className="space-y-3" aria-label={t('hero.networkTitle')}>
                    {Array.isArray(audiences) && audiences.map((audience) => {
                      const icon = audienceIcons[audience.key] || { emoji: '✨', tone: 'mint' };
                      return (
                        <li
                          key={audience.key}
                          className="relative grid grid-cols-[2.75rem_1fr] gap-4 rounded-2xl border border-white/[0.08] bg-[#0b1928]/90 p-4 sm:grid-cols-[3.25rem_1fr] sm:p-5"
                        >
                          <FriendlyIcon emoji={icon.emoji} label={audience.label} tone={icon.tone} size="sm" className="relative z-10" />
                          <span>
                            <span className="block font-display text-sm font-bold text-white sm:text-base">{audience.label}</span>
                            <span className="mt-1 block text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">{audience.text}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <ProductTicker variant="about" />

        <section className="w-full bg-[#f4faf7] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-story-heading">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-24">
            <motion.figure {...reveal()} className="order-2 mx-auto w-full max-w-[32rem] lg:order-1 lg:mx-0">
              <div className="relative">
                <div className="absolute -bottom-4 -left-4 h-[78%] w-[78%] rounded-[2rem] border border-[#25c990]/25" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-200 shadow-[0_24px_70px_rgba(7,17,31,0.14)]">
                  <img
                    src={FOUNDER_IMAGE}
                    alt={t('story.founderImageAlt')}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111f]/95 via-[#07111f]/50 to-transparent px-6 pb-6 pt-24 text-white sm:px-8 sm:pb-8">
                    <figcaption>
                      <span className="block font-display text-xl font-bold">{t('story.founder')}</span>
                      <span className="mt-1 block text-sm text-slate-300">{t('story.founderRole')}</span>
                      <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.16em] text-[#5ee0b1]">{t('story.founderLocation')}</span>
                    </figcaption>
                  </div>
                </div>
              </div>
            </motion.figure>

            <motion.div {...reveal(0.08)} className="order-1 lg:order-2">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">{t('story.eyebrow')}</p>
              <h2 id="about-story-heading" className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,5vw,4.7rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('story.title')}
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-[#46515e] sm:text-lg sm:leading-8">
                {Array.isArray(storyParagraphs) && storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-9 max-w-2xl border-l-2 border-[#25c990] pl-5 font-display text-xl font-bold leading-8 text-[#102333] sm:text-2xl sm:leading-9">
                {t('story.conclusion')}
              </p>
            </motion.div>
          </div>
        </section>

        <section id="arbeitsweise" className="w-full scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-principles-heading">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...reveal()} className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">{t('principles.eyebrow')}</p>
                <h2 id="about-principles-heading" className="mt-5 max-w-[15ch] font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                  {t('principles.title')}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[#5a6673] sm:text-lg sm:leading-8 lg:justify-self-end">
                {t('principles.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2">
              {Array.isArray(principles) && principles.map((principle, index) => {
                const icon = principleIcons[principle.key] || { emoji: '✅', tone: 'mint' };
                return (
                  <motion.article
                    key={principle.key}
                    {...reveal(index * 0.05)}
                    className={`border-slate-200 py-9 md:px-8 md:py-12 ${index % 2 === 0 ? 'md:border-r' : ''} ${index < principles.length - 1 ? 'border-b' : ''} ${index < 2 ? 'md:border-b' : 'md:border-b-0'} ${index % 2 === 0 ? 'md:pl-0' : 'md:pr-0'}`}
                  >
                    <div className="flex gap-5 sm:gap-6">
                      <FriendlyIcon emoji={icon.emoji} label={principle.title} tone={icon.tone} size="sm" />
                      <div>
                        <h3 className="font-display text-xl font-bold tracking-[-0.025em] text-[#102333] sm:text-2xl">{principle.title}</h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#5a6673] sm:text-base sm:leading-7">{principle.text}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-[#0b1928] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-impact-heading">
          <div className="pointer-events-none absolute -right-40 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-white/[0.04]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl">
            <motion.div {...reveal()} className="max-w-4xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#5ee0b1] sm:text-sm">{t('impact.eyebrow')}</p>
              <h2 id="about-impact-heading" className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,5vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('impact.title')}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{t('impact.description')}</p>
            </motion.div>

            <dl className="mt-14 grid border-y border-white/10 lg:grid-cols-3">
              {Array.isArray(impactItems) && impactItems.map((item, index) => {
                const icon = impactIcons[index];
                return (
                  <motion.div
                    key={item.category}
                    {...reveal(index * 0.07)}
                    className={`flex flex-col py-8 sm:py-10 lg:px-8 lg:py-12 ${index < impactItems.length - 1 ? 'border-b border-white/10 lg:border-b-0 lg:border-r' : ''} ${index === 0 ? 'lg:pl-0' : ''}`}
                  >
                    <div className="mb-7 flex items-center gap-3">
                      <FriendlyIcon emoji={icon.emoji} tone={icon.tone} size="sm" />
                      <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-slate-300">{item.category}</span>
                    </div>
                    <dt className="order-2 mt-4 max-w-xs font-display text-base font-bold leading-6 text-white sm:text-lg">{item.label}</dt>
                    <dd className="order-1 max-w-full font-display text-[clamp(2.15rem,4.2vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#5ee0b1] [text-wrap:balance]">{item.value}</dd>
                    <dd className="order-3 mt-2 max-w-xs text-sm leading-6 text-slate-400">{item.detail}</dd>
                  </motion.div>
                );
              })}
            </dl>

            <p className="mt-7 max-w-5xl text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
              {t('impact.disclaimer')}
            </p>
          </div>
        </section>

        <section className="w-full bg-[#f4faf7] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32" aria-labelledby="about-routes-heading">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#0c7a5a] sm:text-sm">{t('routes.eyebrow')}</p>
              <h2 id="about-routes-heading" className="mt-5 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
                {t('routes.title')}
              </h2>
              <p className="mt-6 text-base leading-7 text-[#5a6673] sm:text-lg sm:leading-8">{t('routes.description')}</p>
            </motion.div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {Array.isArray(routes) && routes.map((route, index) => {
                const icon = audienceIcons[route.key] || { emoji: '✨', tone: 'mint' };
                return (
                  <motion.article key={route.key} {...reveal(index * 0.06)} className="group flex min-h-full flex-col rounded-[1.6rem] border border-[#dbe8e2] bg-white p-7 shadow-[0_14px_45px_rgba(7,17,31,0.06)] sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <FriendlyIcon emoji={icon.emoji} label={route.title} tone={icon.tone} size="sm" />
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#0c7a5a]">{route.label}</span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.035em] text-[#102333]">{route.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-[#5a6673] sm:text-base sm:leading-7">{route.text}</p>
                    <Link
                      to={getPath(route.routeKey)}
                      className="mt-8 inline-flex items-center gap-2 self-start font-display text-sm font-bold text-[#076046] transition-colors hover:text-[#0c7a5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4"
                    >
                      {route.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
