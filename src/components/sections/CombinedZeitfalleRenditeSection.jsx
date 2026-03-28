
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CombinedZeitfalleRenditeSection = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  return (
    <section className="py-28 lg:py-36 bg-slate-50 overflow-hidden relative" aria-labelledby="zeitfalle-heading">
      <div className="healio-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: The Problem/Concept */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="zeitfalle-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Die Wahrheit über Gehaltserhöhungen, die Ihr Steuerberater Ihnen nicht sagt.
            </h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Eine Lohnerhöhung von 50 € kostet Sie als Arbeitgeber ca. 60 €. Beim Mitarbeiter kommen 21 € an. Der Rest geht an Staat und Sozialversicherung. Unternehmen, die das verstanden haben, nutzen Healio.
              </p>

              <div className="bg-healio-primary/5 border-l-4 border-healio-primary p-6 rounded-r-xl">
                <p className="font-medium text-slate-800 italic">
                  "50 € Arbeitgeberaufwand. 21 € beim Mitarbeiter. Das ist keine Großzügigkeit — das ist ein Strukturproblem."
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-healio-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-slate-800">Höhere Wertschätzung:</span>
                    <p className="text-slate-500">Wahrnehmung schlägt Betrag: Ein Gesundheits-Benefit bleibt im Gedächtnis. 21 € Netto-Erhöhung nicht.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-healio-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-slate-800">Steuerliche Optimierung:</span>
                    <p className="text-slate-500">§ 3 Nr. 62 EStG, Sachbezugswerte, Pauschalbesteuerung. Wir kennen jeden legalen Hebel.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button asChild className="bg-healio-primary hover:bg-healio-primary-dark text-white px-8 py-6 rounded-xl text-lg shadow-lg">
                <Link to={getPath('potenzialanalyse')}>
                  Erstgespräch vereinbaren
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Visual Comparison/Rendite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-2xl text-white relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <TrendingUp className="text-healio-primary" />
                Der Rendite-Vergleich
              </h3>

              <div className="space-y-10">
                {/* Scenario 1 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 font-medium">{t('rendite.classicRaise')}</span>
                    <span className="text-xl font-bold">50 € AG-Aufwand</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "45%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-red-400"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">29 € Steuern/Abgaben</span>
                    <span className="text-green-400 font-bold">21 € Netto-Effekt</span>
                  </div>
                </div>

                {/* Scenario 2 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 font-medium">{t('rendite.healthBenefit')}</span>
                    <span className="text-xl font-bold">50 € AG-Aufwand</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-healio-primary"
                    />
                  </div>
                  <div className="flex justify-end text-sm mt-2">
                    <span className="text-green-400 font-bold text-lg">1.500 € Gesundheitsbudget/Jahr</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-healio-primary/20 rounded-lg">
                    <Clock className="text-healio-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Gleicher Aufwand. Anderes Ergebnis.</h4>
                    <p className="text-slate-400 text-sm">
                      Kein Trick. Kein Steuersparmodell. Geltendes Recht, konsequent angewendet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-healio-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-healio-primary/10 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CombinedZeitfalleRenditeSection;
