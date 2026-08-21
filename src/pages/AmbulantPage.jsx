
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { createFAQSchema, createServiceSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';
import { FadeInUp } from '@/components/ui/ScrollAnimation';
import { ChevronDown } from 'lucide-react';
import AmbulantHero from '@/components/sections/ambulant/AmbulantHero';
import ProductTicker from '@/components/sections/ProductTicker';
import AmbulantConversionNudge from '@/components/sections/ambulant/AmbulantConversionNudge';
import ErklaervideoSection from '@/components/sections/ErklaervideoSection';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import AmbulantBenefits from '@/components/sections/ambulant/AmbulantBenefits';
import AmbulantBeispielrechnung from '@/components/sections/ambulant/AmbulantBeispielrechnung';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import AmbulantTarifTabelle from '@/components/sections/ambulant/AmbulantTarifTabelle';
import AmbulantConceptAccordion from '@/components/sections/ambulant/AmbulantConceptAccordion';
import AmbulantIKKWechsel from '@/components/sections/ambulant/AmbulantIKKWechsel';
import AmbulantIKKServices from '@/components/sections/ambulant/AmbulantIKKServices';
import AmbulantUmwelt from '@/components/sections/ambulant/AmbulantUmwelt';
import AmbulantTestimonials from '@/components/sections/ambulant/AmbulantTestimonials';
import AmbulantFAQ from '@/components/sections/ambulant/AmbulantFAQ';
import AmbulantFinalCTA from '@/components/sections/ambulant/AmbulantFinalCTA';
import KassenBoostChoiceHint from '@/components/sections/KassenBoostChoiceHint';
import StickyCalculatorButton from '@/components/sections/ambulant/StickyCalculatorButton';
import AmbulantMiaPrompt from '@/components/sections/ambulant/AmbulantMiaPrompt';

const faqCategoryKeys = ['kosten', 'leistungen', 'ablauf', 'vertrauen'];

const ikkKrankenkasseninfoSeals = [
  {
    src: '/siegel/ikk/krankenkasseninfo-gesamt.png',
    alt: 'Krankenkasseninfo IKK classic Gesamttest Note 1,3 Sehr Gut, Stand 03/2026'
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-leistungen.png',
    alt: 'Krankenkasseninfo IKK classic Leistungstest Note 1,5 Sehr Gut, Stand 03/2026'
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-selbststaendige.png',
    alt: 'Krankenkasseninfo IKK classic Selbstständige Krankenkassentest Note 1,5 Sehr Gut, Stand 03/2026'
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-senioren.png',
    alt: 'Krankenkasseninfo IKK classic Krankenkassentest für Senioren Note 1,6 Gut, Stand 03/2026'
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-studenten.png',
    alt: 'Krankenkasseninfo IKK classic Studenten Krankenkassentest Note 1,4 Sehr Gut, Stand 03/2026'
  }
];

const AmbulantPage = () => {
  const { t } = useTranslation('seo');
  const { t: tFaq } = useTranslation('ambulant-faq');
  const { t: tAmbulant } = useTranslation('ambulant');
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const referrer = useReferrer();
  const videoSdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });
  const isHeilpraktikerLanding = pathname === '/heilpraktiker-zusatzversicherung';
  const seoTitle = isHeilpraktikerLanding
    ? 'Heilpraktiker Zusatzversicherung – 3.000 € Budget | Vergleich 2026 | Healio'
    : t('ambulant.title');
  const seoDescription = isHeilpraktikerLanding
    ? 'Heilpraktiker Zusatzversicherung im Vergleich 2026: Bis zu 3.000 € Gesundheitsbudget durch IKK Bonus + SDK Zusatzversicherung. Ohne Wartezeit starten.'
    : t('ambulant.description');
  const canonicalPath = isHeilpraktikerLanding
    ? '/heilpraktiker-zusatzversicherung'
    : lang === 'en' ? '/en/outpatient' : '/ambulant';
  const canonicalUrl = `https://healio.de${canonicalPath}`;
  const faqItems = faqCategoryKeys.flatMap((key) => {
    const items = tFaq(`categories.${key}.items`, { returnObjects: true });
    return Array.isArray(items) ? items : [];
  });
  const schemaMarkup = [
    createWebPageSchema(seoTitle, seoDescription, canonicalUrl, lang === 'en' ? 'en-US' : 'de-DE'),
    createServiceSchema({
      serviceType: lang === 'en' ? 'Outpatient supplementary insurance and health budget' : 'Ambulante Zusatzversicherung und Gesundheitsbudget',
      name: lang === 'en' ? 'Healio health budget for naturopathy, osteopathy and preventive care' : 'Healio Gesundheitsbudget für Heilpraktiker, Osteopathie und Naturheilkunde',
      description: seoDescription,
      url: canonicalUrl,
      availableChannel: {
        serviceUrl: canonicalUrl
      },
      offers: {
        description: lang === 'en' ? 'Free guidance and calculation of the possible health budget' : 'Kostenlose Beratung und Berechnung des möglichen Gesundheitsbudgets'
      }
    }),
    createFAQSchema(faqItems.map((faq) => ({
      question: faq.q,
      answer: faq.a
    })))
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <main className="min-h-screen bg-white relative">
        <AmbulantHero />

        <ProductTicker variant="ambulant" />

        {/* Qualitätssiegel: SDK + IKK classic */}
        <FadeInUp>
          <section className="bg-white py-10 md:py-12 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm md:text-base text-slate-500 mb-7 font-semibold uppercase tracking-[0.18em]">{tAmbulant('trust.partners')}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 max-w-7xl mx-auto">
                <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/sdk/assekuranz-award-nachhaltigkeit-kranken.png" alt="Assekuranz Award Gewinner 2024/2025 Nachhaltigkeit Kranken" className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain" loading="lazy" />
                <img src="/siegel/ikk/schwangere-test.webp" alt="Krankenkassentest für Schwangere & junge Eltern, Note 1,7 Gut" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
                <img src="/siegel/ikk/familien-test.webp" alt="Krankenkassentest für Familien, Note 1,6 Gut" className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain" loading="lazy" />
              </div>
              <div className="mt-8 md:mt-10 max-w-4xl mx-auto rounded-lg border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 px-5 py-5 md:px-8 md:py-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
                  <p className="text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                    {tAmbulant('trust.cooperation')}
                  </p>
                  <img
                    src="/logos/ikk-classic.svg"
                    alt="IKK classic Logo"
                    className="h-14 sm:h-16 md:h-20 w-auto max-w-[240px] object-contain"
                    loading="lazy"
                  />
                  <p className="max-w-sm text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                    {tAmbulant('trust.cooperationText')}
                  </p>
                </div>
              </div>
              <details className="group mx-auto mt-7 max-w-6xl md:mt-8">
                <summary className="mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center justify-center gap-2 rounded-lg px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 md:text-sm [&::-webkit-details-marker]:hidden">
                  {tAmbulant('trust.moreAwards')}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
                  {ikkKrankenkasseninfoSeals.map((seal) => (
                    <img
                      key={seal.src}
                      src={seal.src}
                      alt={seal.alt}
                      className="w-[132px] sm:w-[150px] md:w-[168px] lg:w-[180px] h-auto rounded-md shadow-sm ring-1 ring-slate-100"
                      loading="lazy"
                    />
                  ))}
                </div>
              </details>
            </div>
          </section>
        </FadeInUp>

        {/* Entscheidungsimpuls: Selbstzahler-Problem direkt greifbar machen */}
        <AmbulantConversionNudge />

        {/* Erklärvideo: was du bekommst und wie du es umsetzt */}
        {lang === 'de' && (
          <FadeInUp>
            <ErklaervideoSection
              video="/erklaervideo-ambulant.mp4"
              poster="/images/erklaervideo-ambulant-poster.jpg"
              titel={tAmbulant('explanationVideo.title')}
              untertitel={tAmbulant('explanationVideo.subtitle')}
              dauer={tAmbulant('explanationVideo.duration')}
              trackingLabel="erklaervideo-ambulant"
              sectionId="ambulant-erklaervideo"
              cta={{
                label: 'Beitrag berechnen und Antrag starten',
                href: videoSdkUrl,
                external: true,
                onClick: () => trackSdkClick('ambulant-video'),
              }}
            />
          </FadeInUp>
        )}

        {/* Tarifstufen zuerst: der direkte Weg zum Beitrag und Antrag */}
        <FadeInUp>
          <AmbulantTarifTabelle />
        </FadeInUp>

        {/* Optionaler Bonus-Rechner zur Einordnung der effektiven Kosten */}
        <FadeInUp>
          <AmbulantBonusCalculator />
        </FadeInUp>

        {/* Beispielrechnung — konkrete Einordnung nach dem Bonus-Rechner */}
        <FadeInUp>
          <AmbulantBeispielrechnung />
        </FadeInUp>

        {/* 4 Highlight-Leistungskarten + Akkordeon */}
        <FadeInUp>
          <AmbulantBenefits />
        </FadeInUp>

        {/* Zwischen-CTA (Conversion-Paket 2): zwischen Rechner und Seitenende
            gab es vorher 16 Sektionen ohne einen einzigen Abschlussweg */}
        <FadeInUp>
          <section className="py-8 md:py-10">
            <div className="container mx-auto px-4 text-center">
              <p className="mb-4 text-lg font-semibold text-healio-dark">{tAmbulant('inlineCta.title')}</p>
              <a
                href={videoSdkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSdkClick('ambulant-inline-benefits')}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-healio-primary px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {tAmbulant('inlineCta.label')}
              </a>
            </div>
          </section>
        </FadeInUp>

        {/* Konzept: SDK-Tarif und Healio-System erklären */}
        <FadeInUp>
          <AmbulantConceptAccordion />
        </FadeInUp>

        {/* IKK classic Wechsel — Bonus als Verstärker und Refinanzierung erklären */}
        <FadeInUp>
          <AmbulantIKKWechsel variant="ambulant" />
        </FadeInUp>

        <FadeInUp>
          <KassenBoostChoiceHint />
        </FadeInUp>

        {/* TeleClinic + BetterDoc */}
        <FadeInUp>
          <AmbulantIKKServices />
        </FadeInUp>

        {/* 10 % für die Umwelt */}
        <FadeInUp>
          <AmbulantUmwelt />
        </FadeInUp>

        {/* Testimonials */}
        <FadeInUp>
          <AmbulantTestimonials />
        </FadeInUp>

        {/* FAQ */}
        <FadeInUp>
          <AmbulantFAQ />
        </FadeInUp>

        {/* Zwischen-CTA nach dem FAQ: Wer bis hier liest, ist kaufbereit */}
        <FadeInUp>
          <section className="py-8 md:py-10">
            <div className="container mx-auto px-4 text-center">
              <p className="mb-4 text-lg font-semibold text-healio-dark">{tAmbulant('inlineCta.title')}</p>
              <a
                href={videoSdkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSdkClick('ambulant-inline-faq')}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-healio-primary px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {tAmbulant('inlineCta.label')}
              </a>
            </div>
          </section>
        </FadeInUp>

        {/* Closing CTA + Footer */}
        <FadeInUp>
          <AmbulantFinalCTA />
        </FadeInUp>

        <StickyCalculatorButton />
        <AmbulantMiaPrompt />
      </main>
    </>
  );
};

export default AmbulantPage;
