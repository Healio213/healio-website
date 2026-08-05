
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { Check } from 'lucide-react';

const mainBenefitKeys = ['spitzenversorgung', 'privatsphaere', 'wartezeiten', 'familienfreundlich'];

const featureKeys = ['einbettzimmer', 'chefarzt', 'klinikwahl', 'keineWartezeit', 'tagegeld', 'ambulanteOps', 'familienzimmer', 'vorNachStationaer'];

// Nur die vier Hauptvorteile tragen eine Emoji-Kachel. Die acht Detailpunkte
// darunter bekommen ein schlichtes Häkchen, sonst konkurrieren zwölf bunte
// Kacheln direkt untereinander.
// Reihenfolge: Spitzenversorgung, Privatsphäre, Einstieg für Aktive, Familie
const mainBenefitIcons = ['🩺', '🛏️', '🏃', '👨‍👩‍👧'];

const HospitalBenefits = () => {
  const { t } = useTranslation('stationaer');

  return (
    <section className="py-24 bg-white" aria-labelledby="hospital-benefits-heading" id="leistungen">
      <div className="healio-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 id="hospital-benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {t('benefits.title')}
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mainBenefitKeys.map((key, idx) => (
              <article key={key} className="bg-[#25c990]/5 p-6 rounded-2xl border border-[#25c990]/20 flex items-start gap-5 text-left">
                <FriendlyIcon emoji={mainBenefitIcons[idx]} tone={idx % 2 ? 'lavender' : 'mint'} size="sm" />
                <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t(`benefits.mainBenefits.${key}.title`)}</h4>
                <p className="text-slate-600">{t(`benefits.mainBenefits.${key}.desc`)}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featureKeys.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-[#25c990]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <span
                className="mb-5 grid h-10 w-10 place-items-center rounded-full bg-[#25c990]/10 text-[#25c990] ring-1 ring-[#25c990]/25 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t(`benefits.features.${key}.title`)}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t(`benefits.features.${key}.desc`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefits;
