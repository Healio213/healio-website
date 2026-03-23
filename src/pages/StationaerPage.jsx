
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { createServiceSchema } from '@/lib/createSchemaMarkup';
import HospitalBenefits from '@/components/sections/HospitalBenefits';
import HospitalConcept from '@/components/sections/HospitalConcept';
import HospitalContactForm from '@/components/sections/HospitalContactForm';
import { Button } from '@/components/ui/button';
import { Calculator, Gift, CheckCircle, ChevronDown, Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const stationaerFaqs = [
  { q: "Was kostet das KlinikUpgrade monatlich?", a: "Das KlinikUpgrade Top (Einbettzimmer) gibt es ab 11,22 Euro im Monat ohne Alterungsrückstellungen. Mit Alterungsrückstellungen ab 33,33 Euro. Das KlinikUpgrade Plus (Zweibettzimmer) startet ab 8,98 Euro. In Kombination mit dem IKK Classic Bonus (über 300 Euro pro Jahr, steuerfrei) finanziert sich die Versicherung effektiv komplett selbst." },
  { q: "Was ist der Unterschied zwischen KlinikUpgrade Plus und Top?", a: "KlinikUpgrade Plus bietet Zweibettzimmer und ein Ersatz-Krankenhaustagegeld von bis zu 80 Euro pro Tag. KlinikUpgrade Top bietet Einbettzimmer, bis zu 100 Euro Tagegeld pro Tag und im Top-Tarif ein Familienzimmer bei stationärer Entbindung (nicht begrenzt auf die Kosten eines Zweibettzimmers). Beide Tarife umfassen Chefarztbehandlung, freie Krankenhauswahl und keine Begrenzung auf die Gebührenordnung." },
  { q: "Gibt es Wartezeiten?", a: "Nein. Es gibt keine allgemeine Wartezeit. Der Versicherungsschutz beginnt sofort ab Tag 1 mit Anspruch auf alle versicherten Leistungen. Einzige Ausnahme: Bei Entbindungen gilt eine Wartezeit von acht Monaten." },
  { q: "Werden auch privatärztliche Leistungen über dem Höchstsatz erstattet?", a: "Ja, das ist ein besonderes Merkmal des KlinikUpgrade. Die Erstattung ist nicht auf den 3,5-fachen Satz der Gebührenordnung für Ärzte (GOÄ) begrenzt. Auch darüber hinausgehende Honorare werden erstattet. Das bedeutet: Kein Eigenanteil bei der Arztwahl." },
  { q: "Wie funktioniert das KlinikUpgrade zusammen mit dem IKK Classic Bonus?", a: "Die Kombination macht die stationäre Zusatzversicherung effektiv kostenlos: Du zahlst 11,22 Euro monatlich (= 135 Euro im Jahr) für das KlinikUpgrade Top. Der IKK Classic Bonus bringt über 300 Euro pro Jahr steuerfrei. Zusätzlich erstattet das IKK Gesundheitskonto bis zu 600 Euro pro Jahr. Der Bonus übersteigt die Beiträge deutlich, sodass du effektiv 0 Euro zahlst und im Krankenhaus trotzdem Privatpatient bist." },
  { q: "Was passiert bei einer Entbindung?", a: "Bei einer stationären Entbindung übernimmt das KlinikUpgrade die privatärztlichen Leistungen und die Unterbringung. Im Top-Tarif bekommst du ein Familienzimmer, in dem du die ersten Tage gemeinsam mit deinem Partner und dem Neugeborenen verbringen kannst. Die Kosten werden nicht auf die Höhe eines Zweibettzimmers begrenzt." },
  { q: "Bekomme ich Geld, wenn ich auf das Einbettzimmer verzichte?", a: "Ja. Wenn du bei einem Krankenhausaufenthalt auf die Unterbringung im Ein- oder Zweibettzimmer oder auf privatärztliche Behandlung verzichtest, erhältst du ein Ersatz-Krankenhaustagegeld: bis zu 100 Euro pro Tag im Top-Tarif und bis zu 80 Euro pro Tag im Plus-Tarif. Für Kinder und Jugendliche bis zum 16. Lebensjahr beträgt das Tagegeld im Top-Tarif bis zu 50 Euro." },
  { q: "Gibt es eine Altersbegrenzung?", a: "Nein, es gibt keine Höchst- oder Mindesteintrittsalter. Der Abschluss ist in jedem Alter möglich. Voraussetzung ist lediglich die Mitgliedschaft in einer gesetzlichen Krankenversicherung. Berechtigte der Heilfürsorge (z.B. Polizisten oder Soldaten) sind ausgeschlossen." },
];

const StationaerFaq = () => {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="space-y-4">
      {stationaerFaqs.map((faq, index) => (
        <article key={index} className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
          <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
            <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.q}</h3>
            <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openFaq === index && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6">
                <p className="pb-6 text-slate-600 leading-relaxed font-medium">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
};

const StationaerPage = () => {
  const calculatorUrl = "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant&agentId1=901235&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJOb2xpIiwiY29tcGfueSI6Ik5vbGkgR21iSCIsInN0cmVldCI6IkFybmR0c3RyLiA2IiwiemlwY29kZSI6IjIyMDg1IiwiY2l0eSI6IkhhbWJ1cmciLCJtb2JpbGUiOiIwMTc2MjQxNTMxODgiLCJlbWFpbCI6ImZyYW5rQG5vbGktdmVyc2ljaGVydW5nLmRlIn0=&remarks=IkJlaSBGcmFnZW4gc2luZCB3aXIgZvxyIFNpZSBkYS4i&defaultContact=true&employeeInsurance=NOT_BKV";
  const ikkLink = "https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V3700025016";

  const schemaMarkup = createServiceSchema();

  return (
    <>
      <SEOHead
        title="Stationäre Zusatzversicherung – Privatpatienten-Status | Healio"
        description="Einzelzimmer. Chefarztbehandlung. Freie Klinikwahl. Sichern Sie sich jetzt die beste Versorgung im Krankenhaus."
        canonicalUrl="https://www.healio.de/stationaer"
        ogTitle="Stationäre Zusatzversicherung – Beste Versorgung im Krankenhaus"
        ogDescription="Einzelzimmer, Chefarzt, freie Klinikwahl. Privatpatienten-Status, ohne privat versichert zu sein."
        ogImage="https://www.healio.de/og-image-stationaer.png"
        ogUrl="https://www.healio.de/stationaer"
        schemaMarkup={schemaMarkup}
      />
      <article>
        {/* Hero Section */}
        <section className="relative min-h-[90svh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden w-full" aria-labelledby="stationaer-hero-heading">
          {/* Background Image & Gradient Overlays */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <OptimizedImage
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/89e53e31c640cfd5da7e6cf86c62466b.png"
              alt="Modernes Krankenhaus Einzelzimmer"
              priority={true}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10" />
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10" aria-hidden="true" />
          </div>

          <div className="healio-container relative z-20 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <h1 id="stationaer-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                  <span className="text-healio-primary">Privatpatient</span> im Krankenhaus. Effektiv für 0 €.
                </h1>

                <p className="mt-4 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                  KlinikUpgrade ab 11 € im Monat. In Kombination mit dem IKK Classic Bonus finanziert sich die stationäre Zusatzversicherung komplett selbst. Franke & Bornberg: FFF+ hervorragend.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-2xl mx-auto shadow-xl text-left"
                >
                  <CheckCircle className="w-8 h-8 sm:w-6 sm:h-6 text-[#25c990] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-white text-base sm:text-lg font-medium drop-shadow-sm text-center sm:text-left">
                    <strong>Effektiv 0 € dank IKK Bonus:</strong> Der IKK Classic Bonus (über 300 € pro Jahr, steuerfrei) deckt die Beiträge vollständig. Einbettzimmer, Chefarzt, freie Klinikwahl – ohne Zuzahlung.
                  </p>
                </motion.div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto">
                  <Button asChild className="bg-[#25c990] hover:bg-[#1db37f] text-white shadow-[0_4px_14px_rgba(37,201,144,0.4)] hover:shadow-[0_6px_20px_rgba(37,201,144,0.6)] text-lg px-8 py-6 h-auto rounded-xl border-none transition-all duration-300 w-full sm:w-auto">
                    <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
                      <Calculator className="w-5 h-5 mr-2" aria-hidden="true" />
                      Tarif berechnen
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md shadow-xl text-lg px-8 py-6 h-auto rounded-xl transition-all duration-300 w-full sm:w-auto">
                    <a href={ikkLink} target="_blank" rel="noopener noreferrer">
                      <Gift className="w-5 h-5 mr-2" aria-hidden="true" />
                      Bonus sichern
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Qualitätssiegel */}
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="healio-container px-4">
            <p className="text-center text-xs text-slate-400 mb-6 font-medium uppercase tracking-wider">Ausgezeichnet von unabhängigen Testern</p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto px-4">
              <img src="/siegel/klinik-siegel.png" alt="Qualitätssiegel: Franke & Bornberg FFF+ hervorragend, Morgen & Morgen Ausgezeichnet, LevelNine Exzellent" className="w-full h-auto" loading="lazy" />
            </motion.div>
          </div>
        </section>

        <HospitalConcept />
        <HospitalBenefits />

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="healio-container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Echte Kunden, <span className="text-healio-primary">echte Sicherheit</span></h2>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Erfahrungen von Menschen, die den Privatpatientenstatus im Krankenhaus erlebt haben.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                { name: "Markus H. (52), Hannover", text: "Nach meiner Knie-OP lag ich im Einbettzimmer, wurde vom Chefarzt persönlich operiert und betreut. Mein Kollege im gleichen Krankenhaus lag im Dreibettzimmer und hatte den Assistenzarzt. Der Unterschied ist gewaltig. Für 11 Euro im Monat eine der besten Entscheidungen meines Lebens." },
                { name: "Petra & Jan W. (34), Bremen", text: "Bei der Geburt unseres Sohnes hatten wir dank KlinikUpgrade ein Familienzimmer. Die ersten Nächte als Familie zusammen im Krankenhaus verbringen zu können, war unbezahlbar. Und durch den IKK Bonus zahlen wir effektiv keinen Cent für die Versicherung." },
                { name: "Sabine K. (41), Leipzig", text: "Mein Blinddarm musste plötzlich raus. Dank KlinikUpgrade hatte ich sofort ein Einzelzimmer und der Chefarzt hat operiert. Von fast 1.900 Euro Mehrkosten hat die Versicherung über 1.800 Euro übernommen. Ohne die Zusatzversicherung hätte ich im Mehrbettzimmer gelegen." },
              ].map((t, i) => (
                <motion.article key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4 text-center">
                  <div className="flex items-center gap-1 justify-center">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
                  <p className="font-bold text-slate-900 pt-2">{t.name}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-50">
          <div className="healio-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Häufige Fragen zur stationären Zusatzversicherung</h2>
              <p className="text-lg text-slate-600">Alles was du über das KlinikUpgrade und den IKK Classic Bonus wissen musst.</p>
            </div>
            <StationaerFaq />
          </div>
        </section>

        <HospitalContactForm />
      </article>
    </>
  );
};

export default StationaerPage;
