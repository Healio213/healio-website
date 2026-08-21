
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Calculator } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const coreValueIcons = [
  { kind: 'budget', tone: 'butter' },
  { kind: 'ambulant', tone: 'mint' },
  { kind: 'calculator', tone: 'sky' },
  { kind: 'bonus', tone: 'lavender' },
];
const coreValueKeys = ['gesundheitsbudget', 'behandlungen', 'erstattung', 'bonus'];

const coverageIcons = [
  { kind: 'glasses', tone: 'sky' },
  { kind: 'glasses', tone: 'lavender' },
  { kind: 'naturopathy', tone: 'butter' },
  { kind: 'naturopathy', tone: 'coral' },
  { kind: 'naturopathy', tone: 'mint' },
  { kind: 'prevention', tone: 'mint' },
  { kind: 'prevention', tone: 'coral' },
  { kind: 'medication', tone: 'lavender' },
  { kind: 'region', tone: 'sky' },
  { kind: 'support', tone: 'butter' },
];
const coverageKeys = ['sehhilfen', 'augenLaser', 'heilpraktiker', 'osteopathie', 'tcm', 'vorsorge', 'impfungen', 'arzneimittel', 'ausland', 'beratung'];

const stepNums = [1, 2, 3, 4, 5];
const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'];

const whyHealioIcons = [
  { kind: 'comparison', tone: 'coral' },
  { kind: 'support', tone: 'mint' },
  { kind: 'comparison', tone: 'butter' },
  { kind: 'support', tone: 'lavender' },
  { kind: 'bonus', tone: 'sky' },
];
const whyHealioKeys = ['ergebnisse', 'begleitung', 'klarheit', 'ansprechpartner', 'bonusnutzung'];

const AmbulantConceptAccordion = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section id="healio-konzept" className="scroll-mt-24 py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            <HighlightText text={t('conceptAccordion.title')} />
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
                <p className="mb-6 max-w-3xl text-lg leading-relaxed text-gray-600">
                  {t('conceptAccordion.section2Intro')}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {coreValueKeys.map((key, idx) => {
                    const icon = coreValueIcons[idx];
                    const title = t(`conceptAccordion.coreValues.${key}.title`);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow"
                      >
                        <FriendlyIcon kind={icon.kind} label={title} tone={icon.tone} size="sm" className="mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                        <p className="text-sm text-gray-600">{t(`conceptAccordion.coreValues.${key}.desc`)}</p>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <strong>{t('conceptAccordion.noteLabel')}:</strong> {t('conceptAccordion.hinweis')}
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
                    const icon = coverageIcons[idx];
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
                        <FriendlyIcon kind={icon.kind} label={cardTitle} tone={icon.tone} size="sm" />
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

            {/* SECTION 5 (Beispielrechnung) entfernt am 06.08.2026: dupliziert
                die grosse Beispielrechnungs-Sektion, die direkt nach Rechner
                und Tariftabelle steht. */}

            {/* SECTION 6 */}
            <AccordionItem value="item-6" className="border-b-0 px-6 py-2">
              <AccordionTrigger className="text-xl font-bold text-gray-900 hover:no-underline hover:text-[#10b981] transition-colors">
                {t('conceptAccordion.section6Title')}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {whyHealioKeys.map((key, idx) => {
                    const icon = whyHealioIcons[idx];
                    const title = t(`conceptAccordion.whyHealio.${key}.title`);
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg hover:border-[#10b981] transition-all"
                      >
                        <FriendlyIcon kind={icon.kind} label={title} tone={icon.tone} size="sm" className="mb-4" />
                        <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
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
