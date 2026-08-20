
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import HighlightText from '@/components/ui/HighlightText';

// Hinweis für werdende Eltern: Kindernachversicherung im SDK-Klinik-Tarif.
// Fachliche Grundlage identisch zur Klinik-Sektion auf /hebammen: Elternteil
// muss bei der Geburt versichert sein, danach 2 Monate Zeit für die Anmeldung
// des Kindes ohne Gesundheitsprüfung, rückwirkend ab dem Tag der Geburt.
const HospitalNeugeborene = () => {
  const { t } = useTranslation('stationaer');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Stationär' });

  const cards = [
    { icon: 'family-care', tone: 'coral', title: t('neugeborene.card1Title'), text: t('neugeborene.card1Text') },
    { icon: 'protection-path', tone: 'mint', title: t('neugeborene.card2Title'), text: t('neugeborene.card2Text') },
    { icon: 'hospital-comfort', tone: 'lavender', title: t('neugeborene.card3Title'), text: t('neugeborene.card3Text') },
  ];

  return (
    <section className="bg-gradient-to-b from-rose-50 via-white to-emerald-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-rose-500 mb-4">
            {t('neugeborene.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-healio-dark mb-4">
            <HighlightText text={t('neugeborene.title')} />
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            {t('neugeborene.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-rose-100 bg-white p-6 shadow-md"
            >
              <FriendlyIcon icon={card.icon} tone={card.tone} size="sm" className="mb-4" />
              <h3 className="mb-2 text-lg font-extrabold text-healio-dark">{card.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-emerald-100 bg-white px-5 py-4 text-center shadow-sm">
          <p className="text-sm md:text-base font-medium text-gray-700">
            {t('neugeborene.requirement')}
          </p>
          <a
            href={sdkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSdkClick('neugeborene-hinweis', referrer)}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-healio-primary px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {t('neugeborene.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HospitalNeugeborene;
