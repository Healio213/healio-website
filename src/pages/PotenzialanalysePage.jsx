
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, CheckCircle2, Clock3, Mail, Phone, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { emailjsService } from '@/services/emailjsService';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/hooks/useLanguage';
import {
  buildPotentialAnalysisEmailMessage,
  createPotentialAnalysisDatabaseRecord,
  getPotentialAnalysisDetailVisibility,
  normalizePotentialInterest,
} from '@/lib/potentialAnalysisModel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CONFIRMATION_STORAGE_KEY = 'healio:potential-analysis-confirmation:v1';
const CONFIRMATION_TTL_MS = 30 * 60 * 1000;

const PotenzialanalysePage = () => {
  const { t } = useTranslation('contact');
  const { t: tSeo } = useTranslation('seo');
  const { lang, getPath } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/potential-analysis' : 'https://healio.de/potenzialanalyse';
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');
  const submitLockRef = useRef(false);
  
  const initialFormState = {
    name: '',
    company: '',
    email: '',
    phone: '',
    mitarbeiteranzahl: '',
    anliegen: normalizePotentialInterest(searchParams.get('interest')),
    fokus_bav: '',
    fokus_bkv: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const detailVisibility = getPotentialAnalysisDetailVisibility(formData.anliegen);

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitError(null);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setSubmitError(null);
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('potenzialanalyse.nameRequired');
    if (!formData.company.trim()) newErrors.company = t('potenzialanalyse.companyRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('potenzialanalyse.emailRequired');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('potenzialanalyse.emailInvalid');
    }
    if (!formData.mitarbeiteranzahl) newErrors.mitarbeiteranzahl = t('potenzialanalyse.employeesRequired');
    if (!formData.anliegen) newErrors.anliegen = t('potenzialanalyse.concernRequired');
    if (detailVisibility.bav && !formData.fokus_bav) newErrors.fokus_bav = t('potenzialanalyse.bavRequired');
    if (detailVisibility.bkv && !formData.fokus_bkv) newErrors.fokus_bkv = t('potenzialanalyse.bkvRequired');
    
    setErrors(newErrors);
    const firstInvalidField = Object.keys(newErrors)[0];
    if (firstInvalidField) {
      window.requestAnimationFrame(() => document.getElementById(firstInvalidField)?.focus());
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLockRef.current || submissionComplete) return;
    setSubmitError(null);
    setSubmitStatus('');
    
    if (!validateForm()) {
      setSubmitStatus(t('potenzialanalyse.validationDesc'));
      toast({
        variant: "destructive",
        title: t('potenzialanalyse.validation'),
        description: t('potenzialanalyse.validationDesc'),
      });
      return;
    }

    submitLockRef.current = true;
    try {
      sessionStorage.removeItem(CONFIRMATION_STORAGE_KEY);
    } catch {
      // Das Formular funktioniert auch, wenn Session Storage nicht verfügbar ist.
    }
    setIsSubmitting(true);
    setSubmitStatus(t('potenzialanalyse.submittingStatus'));

    try {
      const emailMessage = buildPotentialAnalysisEmailMessage(formData);
      const databaseRecord = createPotentialAnalysisDatabaseRecord(formData);
      const emailRequest = Promise.resolve().then(() => emailjsService.sendEmail({
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: emailMessage
        }, 'Potenzialanalyse'));

      const databaseRequest = Promise.resolve().then(async () => {
        const { error: dbError } = await supabase
          .from('potenzialanalyse_anfragen')
          .insert([databaseRecord]);
        if (dbError) throw dbError;
      });

      const [emailResult, databaseResult] = await Promise.allSettled([emailRequest, databaseRequest]);
      const delivery = {
        emailjs: emailResult.status,
        supabase: databaseResult.status,
      };
      const successfulChannels = Object.values(delivery).filter((status) => status === 'fulfilled').length;

      if (successfulChannels === 0) {
        setSubmitError(t('potenzialanalyse.errorSendDesc'));
        setSubmitStatus(t('potenzialanalyse.errorLiveStatus'));
        toast({
          variant: 'destructive',
          title: t('potenzialanalyse.errorSend'),
          description: t('potenzialanalyse.errorSendDesc'),
        });
        return;
      }

      const isPartialDelivery = successfulChannels === 1;
      const createdAt = Date.now();
      setSubmissionComplete(true);
      setSubmitStatus(isPartialDelivery
        ? t('potenzialanalyse.partialSuccessDesc')
        : t('potenzialanalyse.successDesc'));

      toast({
        title: t('potenzialanalyse.success'),
        description: isPartialDelivery
          ? t('potenzialanalyse.partialSuccessDesc')
          : t('potenzialanalyse.successDesc'),
        className: "bg-green-50 border-green-200 text-green-900",
      });

      try {
        sessionStorage.setItem(CONFIRMATION_STORAGE_KEY, JSON.stringify({
          type: 'potential-analysis',
          createdAt,
          expiresAt: createdAt + CONFIRMATION_TTL_MS,
          delivery,
        }));
        navigate(getPath('confirmation'), { replace: true });
      } catch {
        // Die Anfrage ist bereits angekommen. Ohne Sessionstatus bleibt die
        // ehrliche Erfolgsmeldung deshalb auf dieser Seite sichtbar.
      }
    } catch {
      setSubmitError(t('potenzialanalyse.errorSendDesc'));
      setSubmitStatus(t('potenzialanalyse.errorLiveStatus'));
      toast({
        variant: "destructive",
        title: t('potenzialanalyse.errorSend'),
        description: t('potenzialanalyse.errorSendDesc'),
      });
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <SEOHead
        title={tSeo('potenzialanalyse.title')}
        description={tSeo('potenzialanalyse.description')}
        canonicalUrl={canonicalUrl}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Kostenlose Potenzialanalyse",
          "description": "Erfahren Sie, wie Ihr Unternehmen von betrieblicher Vorsorge profitieren kann.",
          "url": canonicalUrl,
          "publisher": { "@type": "Organization", "name": "HEALIO GmbH" }
        }}
      />
      <Header />
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              {t('potenzialanalyse.title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
              {t('potenzialanalyse.subtitle')}
            </p>
            <div className="mt-8 rounded-2xl bg-slate-900 px-6 py-6 text-left text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-healio-mint" aria-hidden="true" />
                  <p className="text-sm leading-relaxed"><strong className="block text-white">{t('potenzialanalyse.resultLabel')}</strong>{t('potenzialanalyse.resultText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-healio-mint" aria-hidden="true" />
                  <p className="text-sm leading-relaxed"><strong className="block text-white">{t('potenzialanalyse.durationLabel')}</strong>{t('potenzialanalyse.durationText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-healio-mint" aria-hidden="true" />
                  <p className="text-sm leading-relaxed"><strong className="block text-white">{t('potenzialanalyse.costLabel')}</strong>{t('potenzialanalyse.costText')}</p>
                </div>
              </div>
              <p className="mt-5 border-t border-white/15 pt-4 text-sm leading-relaxed text-slate-200">
                {t('potenzialanalyse.privacyText')}{' '}
                <Link to={getPath('datenschutz')} className="font-semibold text-healio-mint underline decoration-healio-mint/40 underline-offset-4 hover:decoration-healio-mint">
                  {t('potenzialanalyse.privacyLink')}
                </Link>
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-[500px] mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <p className="sr-only" role="status" aria-live="polite">{submitStatus}</p>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 font-medium">{t('potenzialanalyse.name')}</Label>
                <Input 
                  id="name" 
                  placeholder={t('potenzialanalyse.namePlaceholder')} 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting || submissionComplete}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.name && <p id="name-error" className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900 font-medium">{t('potenzialanalyse.company')}</Label>
                <Input 
                  id="company" 
                  placeholder={t('potenzialanalyse.companyPlaceholder')} 
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting || submissionComplete}
                  autoComplete="organization"
                  required
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.company ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.company && <p id="company-error" className="text-sm text-red-600">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium">{t('potenzialanalyse.email')}</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder={t('potenzialanalyse.emailPlaceholder')} 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting || submissionComplete}
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 font-medium">{t('potenzialanalyse.phone')}</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+49" 
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting || submissionComplete}
                  autoComplete="tel"
                  className="py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mitarbeiteranzahl" className="text-gray-900 font-medium">{t('potenzialanalyse.employees')}</Label>
                <Select disabled={isSubmitting || submissionComplete} value={formData.mitarbeiteranzahl} onValueChange={(val) => handleSelectChange('mitarbeiteranzahl', val)}>
                  <SelectTrigger id="mitarbeiteranzahl" aria-invalid={Boolean(errors.mitarbeiteranzahl)} aria-describedby={errors.mitarbeiteranzahl ? 'employees-error' : undefined} className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.mitarbeiteranzahl ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder={t('potenzialanalyse.employeesPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">{t('potenzialanalyse.employees1to10')}</SelectItem>
                    <SelectItem value="11-50">{t('potenzialanalyse.employees11to50')}</SelectItem>
                    <SelectItem value="51-200">{t('potenzialanalyse.employees51to200')}</SelectItem>
                    <SelectItem value="200+">{t('potenzialanalyse.employeesOver200')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.mitarbeiteranzahl && <p id="employees-error" className="text-sm text-red-600">{errors.mitarbeiteranzahl}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="anliegen" className="text-gray-900 font-medium">{t('potenzialanalyse.concern')}</Label>
                <Select disabled={isSubmitting || submissionComplete} value={formData.anliegen} onValueChange={(val) => handleSelectChange('anliegen', val)}>
                  <SelectTrigger id="anliegen" aria-required="true" aria-invalid={Boolean(errors.anliegen)} aria-describedby={errors.anliegen ? 'concern-error' : undefined} className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.anliegen ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder={t('potenzialanalyse.concernPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kassenboost">{t('potenzialanalyse.concernOptions.kassenboost')}</SelectItem>
                    <SelectItem value="bav">{t('potenzialanalyse.concernOptions.bav')}</SelectItem>
                    <SelectItem value="bkv">{t('potenzialanalyse.concernOptions.bkv')}</SelectItem>
                    <SelectItem value="gesamtsystem">{t('potenzialanalyse.concernOptions.gesamtsystem')}</SelectItem>
                    <SelectItem value="unsicher">{t('potenzialanalyse.concernOptions.unsicher')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.anliegen && <p id="concern-error" className="text-sm text-red-600">{errors.anliegen}</p>}
              </div>

              {detailVisibility.bav && (
                <div className="space-y-2">
                  <Label htmlFor="fokus_bav" className="text-gray-900 font-medium">{t('potenzialanalyse.bavFocus')}</Label>
                  <Select disabled={isSubmitting || submissionComplete} value={formData.fokus_bav} onValueChange={(val) => handleSelectChange('fokus_bav', val)}>
                    <SelectTrigger id="fokus_bav" aria-required="true" aria-invalid={Boolean(errors.fokus_bav)} aria-describedby={errors.fokus_bav ? 'bav-error' : undefined} className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.fokus_bav ? 'border-red-500 focus:ring-red-500' : ''}`}>
                      <SelectValue placeholder={t('potenzialanalyse.selectPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ja">{t('potenzialanalyse.yesStrong')}</SelectItem>
                      <SelectItem value="Eher Ja">{t('potenzialanalyse.yesRather')}</SelectItem>
                      <SelectItem value="Nein">{t('potenzialanalyse.noCurrently')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.fokus_bav && <p id="bav-error" className="text-sm text-red-600">{errors.fokus_bav}</p>}
                </div>
              )}

              {detailVisibility.bkv && (
                <div className="space-y-2">
                  <Label htmlFor="fokus_bkv" className="text-gray-900 font-medium">{t('potenzialanalyse.bkvFocus')}</Label>
                  <Select disabled={isSubmitting || submissionComplete} value={formData.fokus_bkv} onValueChange={(val) => handleSelectChange('fokus_bkv', val)}>
                    <SelectTrigger id="fokus_bkv" aria-required="true" aria-invalid={Boolean(errors.fokus_bkv)} aria-describedby={errors.fokus_bkv ? 'bkv-error' : undefined} className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.fokus_bkv ? 'border-red-500 focus:ring-red-500' : ''}`}>
                      <SelectValue placeholder={t('potenzialanalyse.selectPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ja">{t('potenzialanalyse.yesStrong')}</SelectItem>
                      <SelectItem value="Eher Ja">{t('potenzialanalyse.yesRather')}</SelectItem>
                      <SelectItem value="Nein">{t('potenzialanalyse.noCurrently')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.fokus_bkv && <p id="bkv-error" className="text-sm text-red-600">{errors.fokus_bkv}</p>}
                </div>
              )}

              {submitError && (
                <div role="alert" aria-live="assertive" className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">{t('potenzialanalyse.transferFailed')}</p>
                    <p>{submitError}</p>
                  </div>
                </div>
              )}

              {submissionComplete && (
                <div role="status" aria-live="polite" className="flex items-start gap-3 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <p>{submitStatus}</p>
                </div>
              )}

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || submissionComplete}
                  data-track="potential-analysis-submit"
                  className="w-full py-6 text-base font-medium rounded-lg text-white transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2d7a4a' }}
                  onMouseEnter={(e) => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#23613a' }}
                  onMouseLeave={(e) => { if(!isSubmitting) e.currentTarget.style.backgroundColor = '#2d7a4a' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : submissionComplete ? (
                    t('potenzialanalyse.received')
                  ) : submitError ? (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      {t('potenzialanalyse.retry')}
                    </>
                  ) : (
                    t('potenzialanalyse.submit')
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {t('potenzialanalyse.alternatives')}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>E-Mail: <a href="mailto:info@healio.de" className="text-healio-primary hover:underline font-medium">info@healio.de</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>Telefon: <a href="tel:+494089755705" className="text-healio-primary hover:underline font-medium">+49 40 89755705</a></span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default PotenzialanalysePage;
