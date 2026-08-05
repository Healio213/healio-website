import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Award, ExternalLink } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const exampleCards = [
  { key: 'fracture', emoji: '🦴', tone: 'mint' },
  { key: 'familyRoom', emoji: '👶', tone: 'lavender' },
];

const HospitalConcept = () => {
  const { t } = useTranslation('stationaer');

  const tariffDetails = t('concept.tariffDetails', { returnObjects: true });
  const besonderheiten = t('concept.besonderheiten', { returnObjects: true });
  const plus = t('concept.plus', { returnObjects: true });
  const top = t('concept.top', { returnObjects: true });

  const tariffRows = tariffDetails ? [
    [tariffDetails.komfort?.label, tariffDetails.komfort?.value],
    [tariffDetails.klinikwahl?.label, tariffDetails.klinikwahl?.value],
    [tariffDetails.roomingIn?.label, tariffDetails.roomingIn?.value],
    [tariffDetails.familienzimmer?.label, tariffDetails.familienzimmer?.value],
    [tariffDetails.privatarzt?.label, tariffDetails.privatarzt?.value],
    [tariffDetails.gebuehren?.label, tariffDetails.gebuehren?.value],
    [tariffDetails.ambulanteOps?.label, tariffDetails.ambulanteOps?.value],
    [tariffDetails.vorNachStationaer?.label, tariffDetails.vorNachStationaer?.value],
    [tariffDetails.tagegeld?.label, tariffDetails.tagegeld?.value],
    [tariffDetails.keineWartezeit?.label, tariffDetails.keineWartezeit?.value],
  ] : [];

  return (
    <section className="healio-section bg-gray-50 py-20" aria-labelledby="hospital-concept-heading">
      <div className="healio-container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="hospital-concept-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              {t('concept.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('concept.subtitle')}
            </p>
          </div>

          {/* Haupt-Tarifkarte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 relative ring-2 ring-healio-primary mb-12 max-w-3xl mx-auto"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-healio-primary text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" /> {t('concept.empfehlung')}
            </div>

            <div className="text-center mb-8 mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900">{t('concept.tariffName')}</h3>
              <p className="text-4xl font-extrabold text-healio-primary mt-2">{t('concept.tariffType')}</p>
              <p className="text-slate-500 mt-1">{t('concept.tariffPrice')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm mb-8">
              {tariffRows.map(([label, value], i) => (
                <div key={i} className="flex flex-col gap-1 py-2 border-b border-gray-50 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 text-slate-600">{label}</span>
                  <span className="min-w-0 break-words font-semibold text-slate-900 sm:text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Top vs Plus Vergleich */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-4 text-center">{t('concept.vergleichTitle')}</h4>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm flex-1">
                  <p className="text-lg font-extrabold text-slate-700">{plus?.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{plus?.zimmer}</p>
                  <p className="text-sm text-slate-500">{plus?.tagegeld}</p>
                  <p className="text-healio-primary font-bold mt-2">{plus?.preis}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
                <div className="text-center p-4 bg-white rounded-lg shadow-sm flex-1 ring-2 ring-healio-primary">
                  <p className="text-lg font-extrabold text-healio-primary">{top?.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{top?.zimmer}</p>
                  <p className="text-sm text-slate-500">{top?.tagegeld}</p>
                  <p className="text-healio-primary font-bold mt-2">{top?.preis}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IKK Kombination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300/50 rounded-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-extrabold text-yellow-600">
                0 €
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{t('concept.ikkComboTitle')}</h3>
                <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: t('concept.ikkComboText') }} />
              </div>
            </div>
          </motion.div>

          {/* Realistische Modellrechnungen für freiwillige Wahlleistungen */}
          <div className="mx-auto mb-12 max-w-5xl">
            <div className="mx-auto mb-7 max-w-3xl text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-healio-primary">
                {t('concept.examplesEyebrow')}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                {t('concept.examplesTitle')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                {t('concept.examplesSubtitle')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {exampleCards.map((example, index) => {
                const details = t(`concept.examples.${example.key}`, { returnObjects: true });
                const rows = Array.isArray(details?.rows) ? details.rows : [];

                return (
                  <motion.article
                    key={example.key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(35,48,67,0.09)]"
                  >
                    <div className="flex items-start gap-4 border-b border-slate-100 bg-gradient-to-br from-emerald-50/70 via-white to-violet-50/60 p-5 sm:p-6">
                      <FriendlyIcon emoji={example.emoji} tone={example.tone} size="sm" />
                      <div>
                        <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.17em] text-healio-primary">
                          {details?.eyebrow}
                        </p>
                        <h4 className="text-lg font-extrabold leading-snug text-slate-900 sm:text-xl">
                          {details?.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <dl className="space-y-3 text-sm">
                        {rows.map((row) => (
                          <div key={`${example.key}-${row.label}`} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
                            <dt className="leading-relaxed text-slate-600">{row.label}</dt>
                            <dd className="max-w-[42%] text-right font-semibold leading-relaxed text-slate-900">{row.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-5 rounded-2xl bg-rose-50/80 p-4 ring-1 ring-rose-100">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-bold text-slate-700">{details?.withoutLabel}</span>
                          <span className="text-xl font-extrabold text-rose-600">{details?.withoutValue}</span>
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-bold text-slate-800">{details?.withLabel}</span>
                          <span className="text-xl font-extrabold text-healio-primary">{details?.withValue}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">{details?.note}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 p-4 text-center text-xs leading-relaxed text-slate-500 sm:px-6">
              <p>{t('concept.examplesSourceIntro')}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-semibold text-slate-600">
                <a href="https://www.bundesgesundheitsministerium.de/abrechnung-krankenhausleistungen/seite" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-healio-primary">
                  {t('concept.examplesSourceBmg')} <ExternalLink className="h-3 w-3" />
                </a>
                <a href="https://www.helios-gesundheit.de/standorte-angebote/kliniken/rottweil/aufenthalt/komfortbereich/zimmerwahl/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-healio-primary">
                  {t('concept.examplesSourceClinic')} <ExternalLink className="h-3 w-3" />
                </a>
                <a href="https://www.sdk.de/downloads/Bedingungen/Tarifbeschreibung-Krankenhauszusatzversicherung-SPU-1.671g.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-healio-primary">
                  {t('concept.examplesSourceTariff')} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Besonderheiten */}
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{t('concept.besonderheitenTitle')}</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {Array.isArray(besonderheiten) && besonderheiten.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalConcept;
