
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TextHighlight, AnimatedCounter } from '@/components/ui/ScrollAnimation';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const BavProviderComparison = () => {
  const { t } = useTranslation('home');

  const benefits = [
    {
      kind: 'protection',
      tone: 'sky',
      title: t('bav.legalClaim'),
      description: t('bav.legalClaimDesc'),
      border: "border-l-blue-500"
    },
    {
      kind: 'money',
      tone: 'coral',
      title: t('bav.pensionGap'),
      description: t('bav.pensionGapDesc'),
      border: "border-l-rose-500"
    },
    {
      kind: 'money',
      tone: 'mint',
      title: t('bav.taxBenefits'),
      description: t('bav.taxBenefitsDesc'),
      border: "border-l-emerald-500"
    },
    {
      kind: 'bonus',
      tone: 'lavender',
      title: t('bav.employerSubsidy'),
      description: t('bav.employerSubsidyDesc'),
      border: "border-l-indigo-500"
    }
  ];

  return (
    <section className="py-28 lg:py-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

        {/* Introduction */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              <HighlightText text={t('bav.title')} />
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-[#25c990] to-emerald-300 rounded-full mx-auto my-8"></div>

            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed font-medium">
              Seit 2002 hat jeder Arbeitnehmer gesetzlichen Anspruch auf Entgeltumwandlung. Die meisten Unternehmen haken das Thema ab und lassen enormes Potenzial liegen. Wenige nutzen die bAV als das, was sie sein kann: ein strategischer Vorteil, der Sozialabgaben senkt und Fachkräfte bindet.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: 800, suffix: " €", label: t('bav.gapPerMonth') },
            { value: 338, suffix: " €", label: t('bav.taxFreePerMonth') },
            { value: 15, suffix: " %", label: t('bav.mandatorySubsidy') },
            { value: 2002, suffix: "", label: t('bav.legalClaimSince') }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-healio-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm lg:text-base text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Clean Cards with colored left border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white p-7 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 border-l-4 ${benefit.border} group`}
            >
              <FriendlyIcon kind={benefit.kind} tone={benefit.tone} size="sm" className="mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BavProviderComparison;
