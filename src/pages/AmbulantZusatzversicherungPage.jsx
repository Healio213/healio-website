import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { 
  ShieldCheck, Zap, Sparkles, Star, ChevronDown, CheckCircle2, 
  ArrowRight, Leaf, Eye, Stethoscope, Hand, Gift, Plane 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Contact from '@/components/sections/Contact';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const BenefitItem = ({ icon: Icon, title, desc }) => (
  <GlassCard className="hover:scale-[1.02] transition-transform duration-300">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-healio-primary to-healio-mint flex items-center justify-center mb-4 text-white shadow-lg">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </GlassCard>
);

const AmbulantZusatzversicherungPage = () => {
  return (
    <>
      <SEOHead
        title="Ambulante Zusatzversicherung | Premium Schutz | Healio"
        description="Sichern Sie sich Privatpatienten-Status mit der ambulanten Zusatzversicherung von Healio. Heilpraktiker, Sehhilfen & mehr. Jetzt informieren!"
        canonicalUrl="https://www.healio.de/ambulante-zusatzversicherung"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Ambulante Zusatzversicherung",
          "description": "Sichern Sie sich Privatpatienten-Status mit der ambulanten Zusatzversicherung von Healio.",
          "url": "https://www.healio.de/ambulante-zusatzversicherung",
          "publisher": { "@type": "Organization", "name": "HEALIO GmbH" }
        }}
      />

      <main className="bg-slate-50 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
          {/* Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 z-0" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-healio-mint/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 z-0" />

          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-healio-primary/20 text-healio-primary text-sm font-semibold mb-8 shadow-sm">
                  <Sparkles size={16} />
                  <span>Das Upgrade für deine Gesundheit</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                  Privatpatienten-Status. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-healio-primary to-teal-400">
                    Ohne die Kosten.
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Sichere dir bis zu 2.500 € Gesundheits-Budget pro Jahr für Heilpraktiker, Brillen, Fachärzte und mehr. Effektiv für 0 € durch den IKK-Bonus.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="h-14 px-8 text-lg rounded-full bg-healio-primary hover:bg-healio-primary-dark shadow-lg hover:shadow-healio-primary/25 transition-all">
                    Jetzt Tarif prüfen
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-slate-200 hover:bg-white/50 backdrop-blur-sm text-slate-700">
                    Mehr erfahren
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 relative">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Deine Vorteile</h2>
              <p className="text-xl text-slate-600">Alles was die gesetzliche Kasse nicht zahlt.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BenefitItem 
                icon={Leaf} 
                title="Naturheilverfahren" 
                desc="100% Erstattung für Heilpraktiker, Osteopathie und alternative Methoden bis 1.000€." 
              />
              <BenefitItem 
                icon={Eye} 
                title="Sehhilfen" 
                desc="Bis zu 500€ Zuschuss für Brillen und Kontaktlinsen alle 2 Jahre." 
              />
              <BenefitItem 
                icon={Stethoscope} 
                title="Facharzt-Status" 
                desc="Privatärztliche Behandlungen und Vorsorgeuntersuchungen inklusive." 
              />
              <BenefitItem 
                icon={Plane} 
                title="Weltweiter Schutz" 
                desc="Auslandsreisekrankenversicherung für alle Reisen bis 8 Wochen." 
              />
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section className="py-24 bg-white/50 backdrop-blur-sm">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Das Healio Prinzip: <br />
                  <span className="text-healio-primary">Mehr Leistung, weniger Kosten.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Lücken schließen</h3>
                      <p className="text-slate-600 mt-1">Wir analysieren wo die GKV spart und füllen diese Lücken mit Premium-Leistungen auf.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Beitrag neutralisieren</h3>
                      <p className="text-slate-600 mt-1">Durch den Wechsel zur IKK classic und Nutzung des Bonusprogramms refinanzierst du die Kosten.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Digital & Einfach</h3>
                      <p className="text-slate-600 mt-1">Alles in einer App. Rechnungen scannen, hochladen, Geld zurückbekommen.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-healio-primary to-cyan-400 rounded-3xl rotate-3 opacity-20 blur-xl" />
                <GlassCard className="relative">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-bold">Wie funktioniert die Erstattung?</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        Du gehst zum Arzt oder Heilpraktiker, bezahlst die Rechnung und reichst sie per App ein. Die Erstattung erfolgt meist innerhalb weniger Tage auf dein Konto.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-lg font-bold">Ist der IKK Wechsel Pflicht?</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        Nein, aber sehr empfehlenswert. Nur durch den IKK-Bonus wird das Healio-Konzept für dich kostenneutral. Die Leistungen erhältst du aber auch ohne Wechsel.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-lg font-bold">Gibt es Wartezeiten?</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        Nein. Dein Versicherungsschutz beginnt sofort ab dem vereinbarten Versicherungsbeginn. Keine Wartezeiten für Behandlungen.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute w-96 h-96 bg-healio-primary/20 rounded-full blur-[100px] -top-20 -left-20" />
            <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] bottom-0 right-0" />
          </div>
          
          <div className="container relative z-10 px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Das sagen unsere Kunden</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah K.", role: "Nutzt Osteopathie", text: "Endlich kann ich mir regelmäßige Osteopathie leisten. Die App ist super einfach!" },
                { name: "Michael B.", role: "Brillenträger", text: "500€ für meine neue Gleitsichtbrille dazu bekommen. Der Wechsel hat sich sofort gelohnt." },
                { name: "Lisa M.", role: "Familienmutter", text: "Wir sparen als Familie fast 800€ im Jahr durch den Bonus. Absolute Empfehlung." }
              ].map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-lg text-slate-200 mb-6 italic">"{t.text}"</p>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-slate-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50">
          <div className="container px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Häufige Fragen</h2>
            <div className="space-y-4">
              <GlassCard>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1" className="border-b-0">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      Kann ich meinen Arzt frei wählen?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      Ja, du hast freie Arztwahl. Die Zusatzversicherung leistet bei allen zugelassenen Ärzten und Heilpraktikern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </GlassCard>
              <GlassCard>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-2" className="border-b-0">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      Wie hoch ist der monatliche Beitrag?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      Der Beitrag richtet sich nach deinem Alter und dem gewählten Tarif. Er startet oft schon bei ca. 20-30€ pro Monat.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </GlassCard>
              <GlassCard>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-3" className="border-b-0">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      Wer kann die Versicherung abschließen?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      Jeder gesetzlich Versicherte kann die Zusatzversicherung abschließen. Es gibt eine kurze Gesundheitsprüfung.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="bg-white">
          <Contact />
        </div>

      </main>
    </>
  );
};

export default AmbulantZusatzversicherungPage;