
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, AlertCircle, Smile, Leaf, Clock, HeartHandshake as Handshake, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { useToast } from '@/components/ui/use-toast';
import PartnerTrustBar from '@/components/sections/partner/PartnerTrustBar';
import PartnerTestimonials from '@/components/sections/partner/PartnerTestimonials';
import PartnerFAQ from '@/components/sections/partner/PartnerFAQ';

const PartnerPage = () => {
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
    'Für Therapeuten & Praxen', 
    'Befreien Sie Ihre Patienten von finanziellen Sorgen. Das Healio Partnernetzwerk für ganzheitliche Therapeuten und Behandler.'
  );

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
      <SEOHead 
        title="Für Therapeuten | Healio Partnernetzwerk" 
        description="Befreien Sie Ihre Patienten von finanziellen Sorgen und ermöglichen Sie Therapien die wirklich bis zum Ende wirken." 
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
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 max-w-2xl order-1 lg:order-1 text-center lg:text-left w-full"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Voller Fokus auf die Heilung. <br className="hidden sm:block" />
                  <span className="text-[#25c990] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Nicht auf die Kosten.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-100 mb-8 sm:mb-10 leading-relaxed font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-xl mx-auto lg:mx-0">
                  Befreien Sie Ihre Patienten von finanziellen Sorgen und ermöglichen Sie Therapien die wirklich bis zum Ende wirken.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center order-2 lg:order-2 w-full max-w-md mx-auto lg:max-w-none mt-4 lg:mt-0"
              >
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
                  {!isVideoPlaying ? (
                    <div
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-full h-full bg-slate-900/60 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group cursor-pointer hover:bg-slate-800/80 transition-all relative"
                    >
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25c990] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,201,144,0.5)] group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 opacity-50 mix-blend-overlay"></div>
                    </div>
                  ) : (
                    <video
                      className="w-full h-full rounded-2xl"
                      controls
                      autoPlay
                      playsInline
                    >
                      <source src="/erklaervideo-partner.mp4" type="video/mp4" />
                      Ihr Browser unterstützt kein Video.
                    </video>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <PartnerTrustBar />

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
                Wenn das Budget die Therapie bestimmt.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                Sie wissen genau welche ganzheitliche Behandlung einem Menschen jetzt helfen würde. 
                Doch der Patient zögert weil die Kosten nicht von der Kasse getragen werden. 
                Das blockiert den Heilungsprozess und frustriert Sie als Behandler weil Sie nicht Ihr volles Potenzial ausschöpfen können.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: THE SOLUTION (BENEFITS) */}
        <section className="py-16 sm:py-20 lg:py-24 pb-24 lg:pb-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                Wir nehmen das Thema Geld <br className="hidden md:block" />
                <span className="text-[#25c990]">aus dem Behandlungsraum.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {[
                {
                  icon: Smile,
                  title: "Entspannte Patienten",
                  text: "Eine hohe Erstattung durch unsere Systeme nimmt den finanziellen Druck. Das fördert die innere Ruhe, die für jede Heilung essenziell ist."
                },
                {
                  icon: Leaf,
                  title: "Nachhaltige Therapien",
                  text: "Patienten brechen wichtige Behandlungen nicht mehr aus Sorge um die Rechnung ab."
                },
                {
                  icon: Clock,
                  title: "Ihre Zeit bleibt geschützt",
                  text: "Sie überreichen lediglich unsere Information. Den gesamten administrativen Prozess übernehmen wir."
                },
                {
                  icon: Handshake,
                  title: "Das kurze Kennenlernen",
                  text: "Wir prüfen in wenigen Minuten ob unsere Philosophie zu Ihrer Praxis passt."
                },
                {
                  icon: Package,
                  title: "Die kostenfreie Ausstattung",
                  text: "Sie erhalten unsere hochwertigen Informationskarten kostenfrei für Ihr Wartezimmer."
                },
                {
                  icon: TrendingUp,
                  title: "Die profitable Zusammenarbeit",
                  text: "Ihre Patienten profitieren sofort. Sie konzentrieren sich auf das, was Sie am besten können."
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
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#25c990]/10 flex items-center justify-center mb-6 text-[#25c990]">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">{item.text}</p>
                </motion.div>
              )})}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <PartnerTestimonials />

        {/* FAQ */}
        <PartnerFAQ />

        {/* SECTION 5: BOOKING */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-emerald-50/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
                Jetzt kostenlos Partnerpraxis werden
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                In nur 5 Minuten zum Healio-Partner. Buchen Sie Ihren Kennenlerntermin.
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
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">Kalender konnte nicht geladen werden</h3>
                    <p className="text-sm sm:text-base text-slate-600">Bitte überprüfen Sie Ihre Internetverbindung oder deaktivieren Sie eventuelle Adblocker.</p>
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

      </main>
    </>
  );
};

export default PartnerPage;
