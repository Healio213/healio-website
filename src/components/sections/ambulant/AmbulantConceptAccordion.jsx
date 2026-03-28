
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Zap, Lightbulb, Gift, Eye, Sparkles, Leaf, Hand, Activity, Shield, Syringe, Pill, Globe, Heart, Target, Users, Calculator } from 'lucide-react';

const coreValueIcons = [CheckCircle, Zap, Lightbulb, Gift];
const coreValueKeys = ['planbarkeit', 'erstattung', 'einfachheit', 'turbo'];

const coverageIcons = [Eye, Sparkles, Leaf, Hand, Activity, Shield, Syringe, Pill, Globe, Heart];
const coverageKeys = ['sehhilfen', 'augenLaser', 'heilpraktiker', 'osteopathie', 'tcm', 'vorsorge', 'impfungen', 'arzneimittel', 'ausland', 'beratung'];

const stepNums = [1, 2, 3, 4, 5];
const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'];

const whyHealioIcons = [Target, Users, Lightbulb, Shield, Sparkles];
const whyHealioKeys = ['ergebnisse', 'begleitung', 'klarheit', 'ansprechpartner', 'bonusnutzung'];

const AmbulantConceptAccordion = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {t('conceptAccordion.title')}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <Accordion type="single" collapsible className="w-full">

            {/* SECTION 1 */}
            <AccordionItem value="item-1" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section1Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>{t('conceptAccordion.section1Text1')}</p>
                  <p>{t('conceptAccordion.section1Text2')}</p>
                  <p>{t('conceptAccordion.section1Text3')}</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>{t('conceptAccordion.section1Bullet1')}</li>
                    <li>{t('conceptAccordion.section1Bullet2')}</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 2 */}
            <AccordionItem value="item-2" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section2Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {coreValueKeys.map((key, idx) => {
                    const Icon = coreValueIcons[idx];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow"
                      >
                        <Icon className="w-10 h-10 text-[#10b981] mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">{t(`conceptAccordion.coreValues.${key}.title`)}</h4>
                        <p className="text-sm text-gray-600">{t(`conceptAccordion.coreValues.${key}.desc`)}</p>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <strong>Hinweis:</strong> {t('conceptAccordion.hinweis')}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 3 */}
            <AccordionItem value="item-3" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section3Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coverageKeys.map((key, idx) => {
                    const Icon = coverageIcons[idx];
                    const cardTitle = t(`conceptAccordion.coverage.${key}.title`);
                    const cardDesc = t(`conceptAccordion.coverage.${key}.desc`);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white border p-4 rounded-xl transition-all flex items-start gap-3 border-gray-200 hover:border-[#10b981] hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-100">
                          <Icon className="w-6 h-6 text-[#10b981]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                            {cardTitle}
                          </h4>
                          {cardDesc && <p className="text-xs text-gray-500 font-medium">{cardDesc}</p>}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 4 */}
            <AccordionItem value="item-4" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section4Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-4">
                  {stepKeys.map((key, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-[#10b981] transition-colors"
                    >
                      <span className="w-10 h-10 bg-[#10b981] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {stepNums[idx]}
                      </span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{t(`conceptAccordion.steps.${key}.title`)}</h4>
                        <p className="text-gray-600">{t(`conceptAccordion.steps.${key}.desc`)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 5 */}
            <AccordionItem value="item-5" className="border-b border-gray-100 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section5Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#10b981] rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-8 h-8 text-[#10b981]" />
                    <h4 className="text-2xl font-bold text-gray-900">{t('conceptAccordion.exampleCalc.tariffName')}</h4>
                  </div>

                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between items-center pb-3 border-b border-green-200">
                      <span className="text-gray-700 font-medium">{t('conceptAccordion.exampleCalc.monthlyContribution')}</span>
                      <span className="text-gray-900 font-bold">{t('conceptAccordion.exampleCalc.monthlyContributionValue')}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-green-200">
                      <span className="text-gray-700 font-medium">{t('conceptAccordion.exampleCalc.yearlyCost')}</span>
                      <span className="text-gray-900 font-bold">{t('conceptAccordion.exampleCalc.yearlyCostValue')}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-green-200">
                      <span className="text-gray-700 font-medium">{t('conceptAccordion.exampleCalc.ikkBonus')}</span>
                      <span className="text-[#10b981] font-bold">{t('conceptAccordion.exampleCalc.ikkBonusValue')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-white rounded-lg p-4 shadow-sm">
                      <span className="text-gray-900 font-bold text-xl">{t('conceptAccordion.exampleCalc.result')}</span>
                      <span className="text-[#10b981] font-extrabold text-xl">{t('conceptAccordion.exampleCalc.resultValue')}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-green-200">
                    <h5 className="font-bold text-gray-900 mb-3">{t('conceptAccordion.exampleCalc.benefitsTitle')}</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        {t('conceptAccordion.exampleCalc.benefit1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        {t('conceptAccordion.exampleCalc.benefit2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        {t('conceptAccordion.exampleCalc.benefit3')}
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SECTION 6 */}
            <AccordionItem value="item-6" className="border-b-0 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section6Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {whyHealioKeys.map((key, idx) => {
                    const Icon = whyHealioIcons[idx];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg hover:border-[#10b981] transition-all"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#10b981]" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{t(`conceptAccordion.whyHealio.${key}.title`)}</h4>
                        <p className="text-sm text-gray-600">{t(`conceptAccordion.whyHealio.${key}.desc`)}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantConceptAccordion;
