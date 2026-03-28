
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, MessageCircle, Heart } from 'lucide-react';

const stepIcons = [Calculator, MessageCircle, Heart];
const stepKeys = ['step1', 'step2', 'step3'];

const AmbulantHowItWorks = () => {
  const { t } = useTranslation('ambulant');

  const steps = stepKeys.map((key, i) => ({
    id: i + 1,
    title: t(`howItWorks.${key}Title`),
    desc: t(`howItWorks.${key}Desc`),
    icon: stepIcons[i],
  }));

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-healio-dark mb-4"
          >
            {t('howItWorks.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 font-medium"
          >
            {t('howItWorks.subtitle')}
          </motion.p>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="absolute top-10 left-[15%] right-[15%] h-1 bg-healio-primary/20 hidden md:block rounded-full" />

          {/* Mobile connecting line */}
          <div className="absolute left-[39px] top-10 bottom-10 w-1 bg-healio-primary/20 md:hidden rounded-full" />

          <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-between relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8 w-full md:w-1/3 group"
              >
                {/* Circle Number */}
                <div className="w-20 h-20 rounded-full bg-healio-primary text-white flex items-center justify-center text-3xl font-extrabold shrink-0 shadow-lg relative z-20 transition-transform duration-400 group-hover:scale-110 group-hover:shadow-xl ring-8 ring-white">
                  {step.id}
                </div>

                {/* Content Card */}
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all duration-400 group-hover:shadow-2xl group-hover:scale-[1.05] w-full flex flex-col md:items-center text-left md:text-center relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-healio-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 ease-in-out" />

                  <div className="relative z-10 flex flex-col md:items-center w-full">
                    <step.icon className="w-10 h-10 text-healio-primary mb-6 md:mx-auto" />
                    <h3 className="text-2xl font-bold text-healio-dark mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantHowItWorks;
