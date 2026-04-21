
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PlayCircle, AlertCircle, Smile, Leaf, Clock, HeartHandshake as Handshake, Package, TrendingUp, Stethoscope, Brain, Flower2, Activity, Glasses, Baby, Euro, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useToast } from '@/components/ui/use-toast';
import PartnerTrustBar from '@/components/sections/partner/PartnerTrustBar';
import PartnerTestimonials from '@/components/sections/partner/PartnerTestimonials';
import PartnerFAQ from '@/components/sections/partner/PartnerFAQ';
import HighlightText from '@/components/ui/HighlightText';

const PartnerPage = () => {
  const { t } = useTranslation('partner');
  const { t: tSeo } = useTranslation('seo');
  const [scriptError, setScriptError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Prevent multiple script injections
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      if (window.Calendly) {
        initCalendly();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    script.onload = () => {
      initCalendly();
    };

    script.onerror = () => {
      setScriptError(true);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initCalendly = () => {
    const container = document.getElementById('calendly-embed');
    if (window.Calendly && container) {
      // Clear container first to prevent duplicates if re-initialized
      container.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=25c990',
        parentElement: container,
      });
    }
  };

  const schemaMarkup = createWebPageSchema(
    tSeo('partner.title'),
    tSeo('partner.description')
  );

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showMiaPrompt, setShowMiaPrompt] = useState(false);
  const [miaPromptDismissed, setMiaPromptDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!miaPromptDismissed) {
        setShowMiaPrompt(true);
      }
    }, 60000);
    return () => clearTimeout(timer);
  }, [miaPromptDismissed]);

  const handleMiaClick = () => {
    setShowMiaPrompt(false);
    setMiaPromptDismissed(true);
    // ElevenLabs Widget aktivieren
    const widget = document.querySelector('elevenlabs-convai');
    if (widget && widget.shadowRoot) {
      const btn = widget.shadowRoot.querySelector('button');
      if (btn) btn.click();
    }
  };

  const handleMiaDismiss = () => {
    setShowMiaPrompt(false);
    setMiaPromptDismissed(true);
  };
  const videoRef = React.useRef(null);
  const videoMilestonesRef = React.useRef(new Set());

  const trackVideoEvent = (action, label, value) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: 'video',
        event_label: label || 'erklaervideo-partner',
        value: value || 0,
      });
    }
  };

  const handleVideoPlay = () => {
    trackVideoEvent('video_play', 'erklaervideo-partner');
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const pct = Math.floor((video.currentTime / video.duration) * 100);
    [25, 50, 75, 100].forEach((milestone) => {
      if (pct >= milestone && !videoMilestonesRef.current.has(milestone)) {
        videoMilestonesRef.current.add(milestone);
        trackVideoEvent('video_progress', `erklaervideo-partner_${milestone}%`, milestone);
      }
    });
  };

  const handleVideoEnded = () => {
    trackVideoEvent('video_complete', 'erklaervideo-partner', 100);
  };

  const partnerTypes = [
    { icon: Stethoscope, title: t('partners.heilpraktiker'), text: t('partners.heilpraktikerDesc') },
    { icon: Activity, title: t('partners.osteopath'), text: t('partners.osteopathDesc') },
    { icon: Flower2, title: t('partners.tcm'), text: t('partners.tcmDesc') },
    { icon: Brain, title: t('partners.chiropraktiker'), text: t('partners.chiropraktikerDesc') },
    { icon: Glasses, title: t('partners.brillenladen'), text: t('partners.brillenladenDesc') },
    { icon: Baby, title: t('partners.hebamme'), text: t('partners.hebammeDesc') },
  ];

  return (
    <>
      <SEOHead
        title={tSeo('partner.title')}
        description={tSeo('partner.description')}
        canonicalUrl="https://www.healio.de/partner"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* SECTION 1: HERO */}
        <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0">
            {/* Mobile Image */}
            <img
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/4f016c2da039efb25e0e023c7adf970d.png"
              alt="Two women in professional consultation with natural window light"
              className="w-full h-full object-cover object-center md:hidden"
            />
            {/* Desktop Image */}
            <img
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/66ea53b24c418ef3f92004d9368a889c.png"
              alt="Warm, welcoming therapy session with a smiling therapist in a bright wellness room"
              className="w-full h-full object-cover object-center hidden md:block"
            />
            {/* Lighter Overlay for desktop, stronger for mobile to ensure text readability */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/25 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent md:bg-gradient-to-r md:from-slate-900/80 md:via-slate-900/40 md:to-transparent z-10" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  <HighlightText text={t('hero.title')} />
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-8 sm:mb-10 leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-xl mx-auto">
                  <HighlightText text={t('hero.subtitle')} />
                </p>
                <Button
                  size="lg"
                  className="bg-[#25c990] hover:bg-[#1fb37e] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg"
                  onClick={() => document.getElementById('calendly-embed')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.cta')}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative"
              >
                {!isVideoPlaying ? (
                  <div
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-full h-full rounded-2xl flex items-center justify-center group cursor-pointer relative overflow-hidden"
                  >
                    <img src="/images/video-partner-thumb.jpg" alt="Erklärvideo Vorschau" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25c990] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,201,144,0.5)] group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className="w-full h-full rounded-2xl"
                    controls
                    autoPlay
                    playsInline
                    onPlay={handleVideoPlay}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onEnded={handleVideoEnded}
                  >
                    <source src="/erklaervideo-partner.mp4" type="video/mp4" />
                    {t('hero.videoFallback')}
                  </video>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <PartnerTrustBar />

        {/* QUALITÄTSSIEGEL: SDK + IKK */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Unsere Partner: SDK Süddeutsche Krankenversicherung & IKK classic</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
              <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/ikk/schwangere-test.webp" alt="Krankenkassentest für Schwangere und junge Eltern Note 1,7 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/ikk/familien-test.webp" alt="Krankenkassentest für Familien Note 1,6 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
            </div>
          </div>
        </section>

        {/* TEASER: Heilberufe-Vorsorge für HPs und Osteopathen als Direktkunden */}
        <section className="relative py-16 bg-gradient-to-br from-[#25c990] via-[#1fb37f] to-[#0b4d4a] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white/95 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  Neu: Vorsorge für Heilberufe
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Und wer sichert eigentlich dich ab?
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-2">
                  Berufshaftpflicht, Praxisausfall, Berufsunfähigkeit, Rürup. Gebündelt, digital, mit Konditionen, die du allein nicht bekommst.
                </p>
                <p className="text-sm text-white/75">
                  Exklusive Rahmenverträge, nur über Healio. Bis zu 30 Prozent günstiger als Einzelverträge.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="bg-white text-[#0b4d4a] hover:bg-white/90 text-base font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <a href="/heilberufe-vorsorge">
                    Zur Heilberufe-Vorsorge
                  </a>
                </Button>
                <p className="text-xs text-white/70 text-center">
                  30 Sekunden Check, unverbindlich
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PROBLEM AWARENESS */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 sm:mb-8">
                <HighlightText text={t('problem.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                <HighlightText text={t('problem.text')} />
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: BUDGET OVERVIEW */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('budget.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                <HighlightText text={t('budget.subtitle')} />
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Total Budget - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-gradient-to-br from-[#25c990] to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl"
              >
                <Heart className="w-10 h-10 mx-auto mb-4 opacity-90" />
                <p className="text-sm uppercase tracking-widest opacity-80 mb-2">{t('budget.total')}</p>
                <p className="text-4xl sm:text-5xl font-extrabold mb-2">{t('budget.totalAmount')}</p>
                <p className="text-base opacity-90">{t('budget.totalDesc')}</p>
              </motion.div>

              {/* Naturheilkunde */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-[#25c990]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25c990]/10 flex items-center justify-center mb-4">
                  <Stethoscope className="w-7 h-7 text-[#25c990]" />
                </div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{t('budget.naturheilkunde')}</p>
                <p className="text-3xl font-extrabold text-slate-800 mb-2">{t('budget.naturheilkundeAmount')}</p>
                <p className="text-sm text-slate-600">{t('budget.naturheilkundeDesc')}</p>
              </motion.div>

              {/* Sehhilfen */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-xl hover:border-[#25c990]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25c990]/10 flex items-center justify-center mb-4">
                  <Glasses className="w-7 h-7 text-[#25c990]" />
                </div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{t('budget.sehhilfen')}</p>
                <p className="text-3xl font-extrabold text-slate-800 mb-2">{t('budget.sehhilfenAmount')}</p>
                <p className="text-sm text-slate-600">{t('budget.sehhilfenDesc')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FÜR WEN? (Partner Types) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('partners.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                <HighlightText text={t('partners.subtitle')} />
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {partnerTypes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#25c990]/10 flex items-center justify-center mb-5 text-[#25c990]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: SO EINFACH FUNKTIONIERT ES (Benefits + Steps) */}
        <section className="py-16 sm:py-20 lg:py-24 pb-24 lg:pb-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                <HighlightText text={t('solution.title')} />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {[
                {
                  icon: Handshake,
                  title: t('steps.step1Title'),
                  text: t('steps.step1Desc'),
                  step: '1'
                },
                {
                  icon: Package,
                  title: t('steps.step2Title'),
                  text: t('steps.step2Desc'),
                  step: '2'
                },
                {
                  icon: TrendingUp,
                  title: t('steps.step3Title'),
                  text: t('steps.step3Desc'),
                  step: '3'
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative"
                >
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#25c990] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#25c990]/10 flex items-center justify-center mb-6 text-[#25c990]">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">{item.text}</p>
                </motion.div>
              )})}
            </div>

            {/* Benefits below steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mt-12">
              {[
                { icon: Smile, title: t('solution.relaxedPatients'), text: t('solution.relaxedPatientsDesc') },
                { icon: Leaf, title: t('solution.sustainableTherapy'), text: t('solution.sustainableTherapyDesc') },
                { icon: Shield, title: t('solution.protectedTime'), text: t('solution.protectedTimeDesc') },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4 text-[#25c990]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2"><HighlightText text={item.title} /></h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <PartnerTestimonials />

        {/* FAQ */}
        <PartnerFAQ />

        {/* SECTION: BOOKING */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                <HighlightText text={t('cta.title')} />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                <HighlightText text={t('cta.subtitle')} />
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-2 sm:p-4 md:p-6 rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col items-center w-full"
              >
                {scriptError ? (
                  <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-slate-50 rounded-xl border border-slate-200">
                    <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mb-4" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">{t('cta.calendarError')}</h3>
                    <p className="text-sm sm:text-base text-slate-600">{t('cta.calendarErrorDesc')}</p>
                  </div>
                ) : (
                  <div
                    id="calendly-embed"
                    className="w-full"
                    style={{ minHeight: '700px' }}
                  >
                    {/* Calendly will be injected here via initInlineWidget */}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER BANNER */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#25c990] to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                <HighlightText text={t('footer.title')} className="text-white underline decoration-white/70 decoration-4 underline-offset-4" />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8">
                {t('footer.subtitle')}
              </p>
              <Button
                size="lg"
                className="bg-white text-[#25c990] hover:bg-slate-100 font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg"
                onClick={() => document.getElementById('calendly-embed')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('footer.cta')}
              </Button>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Proaktive Mia-Sprechblase */}
      {showMiaPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-20 z-[9998] max-w-xs"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 relative">
            <button
              onClick={handleMiaDismiss}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
              aria-label="Schließen"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25c990] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">💬</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Mia von Healio</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hallo! Soll ich dir kurz erklären, wie das Healio Partnernetzwerk für deine Praxis funktioniert?
                </p>
                <button
                  onClick={handleMiaClick}
                  className="mt-3 text-sm font-medium text-white bg-[#25c990] hover:bg-[#1fb37e] px-4 py-2 rounded-lg transition-colors"
                >
                  Ja, gerne!
                </button>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45" />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PartnerPage;
