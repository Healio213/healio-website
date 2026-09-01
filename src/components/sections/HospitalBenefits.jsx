
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const mainBenefitKeys = ['spitzenversorgung', 'privatsphaere', 'wartezeiten', 'familienfreundlich'];

const featureKeys = ['einbettzimmer', 'chefarzt', 'klinikwahl', 'keineWartezeit', 'tagegeld', 'ambulanteOps', 'familienzimmer', 'vorNachStationaer'];

// Reihenfolge: Spitzenversorgung, Privatsphäre, Einstieg für Aktive, Familie
const mainBenefitIcons = ['ambulant', 'hospital', 'protection', 'family'];

// Die Detailleistungen bekommen eigene, leicht erfassbare Motive. Die kleinere
// Kachelgröße hält die visuelle Hierarchie unterhalb der vier Hauptvorteile.
const featureIcons = [
  { kind: 'hospital', tone: 'lavender' },
  { kind: 'ambulant', tone: 'mint' },
  { kind: 'hospital', tone: 'sky' },
  { kind: 'switch', tone: 'butter' },
  { kind: 'money', tone: 'butter' },
  { kind: 'hospital', tone: 'coral' },
  { kind: 'family', tone: 'lavender' },
  { kind: 'hospital', tone: 'sky' },
];

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
                <FriendlyIcon kind={mainBenefitIcons[idx]} tone={idx % 2 ? 'lavender' : 'mint'} size="sm" />
                <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t(`benefits.mainBenefits.${key}.title`)}</h4>
                <p className="text-slate-600">{t(`benefits.mainBenefits.${key}.desc`)}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <details className="group mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 text-left">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-inset sm:px-6 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="group-open:hidden">{t('benefits.detailsShow')}</span>
              <span className="hidden group-open:inline">{t('benefits.detailsHide')}</span>
            </span>
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-healio-primary transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>

          <div className="grid gap-6 border-t border-slate-200 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {featureKeys.map((key, index) => (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group/card flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-[#25c990]/30 hover:shadow-lg"
              >
                <FriendlyIcon
                  kind={featureIcons[index].kind}
                  tone={featureIcons[index].tone}
                  size="sm"
                  className="mb-5 transition-transform duration-300 group-hover/card:-translate-y-1 group-hover/card:scale-105"
                />
                <h3 className="mb-3 text-lg font-bold text-slate-900">{t(`benefits.features.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{t(`benefits.features.${key}.desc`)}</p>
              </motion.article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
};

export default HospitalBenefits;
