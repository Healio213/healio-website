
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TextHighlight, AnimatedCounter } from '@/components/ui/ScrollAnimation';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const GesundheitSection = () => {
  const { t } = useTranslation('home');

  const hrBenefits = [
    {
      kind: 'ambulant',
      tone: 'mint',
      title: t('gesundheit.fasterAppointments'),
      desc: t('gesundheit.fasterAppointmentsDesc'),
      border: "border-l-emerald-500"
    },
    {
      kind: 'money',
      tone: 'sky',
      title: t('gesundheit.lessSickDays'),
      desc: t('gesundheit.lessSickDaysDesc'),
      border: "border-l-blue-500"
    },
    {
      kind: 'money',
      tone: 'butter',
      title: t('gesundheit.saveCosts'),
      desc: t('gesundheit.saveCostsDesc'),
      border: "border-l-amber-500"
    },
    {
      kind: 'support',
      tone: 'coral',
      title: t('gesundheit.retention'),
      desc: t('gesundheit.retentionDesc'),
      border: "border-l-rose-500"
    }
  ];

  return (
    <section className="py-28 lg:py-36 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white relative z-10" id="bkv-hr-benefits">
      <div className="healio-container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              <HighlightText text={t('gesundheit.title')} />
            </h2>
            <p className="text-lg text-slate-500">
              Zahlen lügen nicht. Eine bKV ist kein Wohlfühl-Benefit. Sie ist eine <span className="text-healio-primary font-semibold">Investition mit messbarem Return</span>.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
          {[
            { value: 30, suffix: " %", label: t('gesundheit.lessAbsence') },
            { value: 400, suffix: " €", label: t('gesundheit.costPerDay') },
            { value: 5, suffix: " Tage", label: t('gesundheit.insteadOfWeeks') }
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
              <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hrBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 border-l-4 ${benefit.border} group flex flex-col items-center text-center`}
            >
              <FriendlyIcon kind={benefit.kind} tone={benefit.tone} className="mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GesundheitSection;
