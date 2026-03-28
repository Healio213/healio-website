
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Mail, Phone, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { emailjsService } from '@/services/emailjsService';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PotenzialanalysePage = () => {
  const { t } = useTranslation('contact');
  const { t: tSeo } = useTranslation('seo');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const initialFormState = {
    name: '',
    company: '',
    email: '',
    phone: '',
    mitarbeiteranzahl: '',
    fokus_bav: '',
    fokus_bkv: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
    if (!formData.fokus_bav) newErrors.fokus_bav = t('potenzialanalyse.bavRequired');
    if (!formData.fokus_bkv) newErrors.fokus_bkv = t('potenzialanalyse.bkvRequired');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: t('potenzialanalyse.validation'),
        description: t('potenzialanalyse.validationDesc'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send via EmailJS
      await emailjsService.sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: `Mitarbeiteranzahl: ${formData.mitarbeiteranzahl}\nFokus bAV: ${formData.fokus_bav}\nFokus bKV: ${formData.fokus_bkv}`
      }, "Potenzialanalyse");

      // 2. Save to Supabase (Database)
      const { error: dbError } = await supabase.from('potenzialanalyse_anfragen').insert([
        {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          mitarbeiteranzahl: formData.mitarbeiteranzahl,
          fokus_bav: formData.fokus_bav,
          fokus_bkv: formData.fokus_bkv
        }
      ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }

      toast({
        title: t('potenzialanalyse.success'),
        description: t('potenzialanalyse.successDesc'),
        className: "bg-green-50 border-green-200 text-green-900",
      });
      
      setFormData(initialFormState);
    } catch (error) {
      setSubmitError(error.message || "Ein Netzwerkfehler ist aufgetreten.");
      toast({
        variant: "destructive",
        title: t('potenzialanalyse.errorSend'),
        description: error.message || t('potenzialanalyse.errorSendDesc'),
      });
    } finally {
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
        canonicalUrl="https://www.healio.de/potenzialanalyse"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Kostenlose Potenzialanalyse",
          "description": "Erfahren Sie, wie Ihr Unternehmen von betrieblicher Vorsorge profitieren kann.",
          "url": "https://www.healio.de/potenzialanalyse",
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
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-[500px] mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 font-medium">{t('potenzialanalyse.name')}</Label>
                <Input 
                  id="name" 
                  placeholder={t('potenzialanalyse.namePlaceholder')} 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900 font-medium">{t('potenzialanalyse.company')}</Label>
                <Input 
                  id="company" 
                  placeholder={t('potenzialanalyse.companyPlaceholder')} 
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.company ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium">{t('potenzialanalyse.email')}</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder={t('potenzialanalyse.emailPlaceholder')} 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 font-medium">{t('potenzialanalyse.phone')}</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+49" 
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">{t('potenzialanalyse.employees')}</Label>
                <Select disabled={isSubmitting} value={formData.mitarbeiteranzahl} onValueChange={(val) => handleSelectChange('mitarbeiteranzahl', val)}>
                  <SelectTrigger className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.mitarbeiteranzahl ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder={t('potenzialanalyse.employeesPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">{t('potenzialanalyse.employees1to10')}</SelectItem>
                    <SelectItem value="11-50">{t('potenzialanalyse.employees11to50')}</SelectItem>
                    <SelectItem value="51-200">{t('potenzialanalyse.employees51to200')}</SelectItem>
                    <SelectItem value="200+">{t('potenzialanalyse.employeesOver200')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.mitarbeiteranzahl && <p className="text-sm text-red-500">{errors.mitarbeiteranzahl}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">{t('potenzialanalyse.bavFocus')}</Label>
                <Select disabled={isSubmitting} value={formData.fokus_bav} onValueChange={(val) => handleSelectChange('fokus_bav', val)}>
                  <SelectTrigger className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.fokus_bav ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ja">{t('potenzialanalyse.yesStrong')}</SelectItem>
                    <SelectItem value="Eher Ja">{t('potenzialanalyse.yesRather')}</SelectItem>
                    <SelectItem value="Nein">{t('potenzialanalyse.noCurrently')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fokus_bav && <p className="text-sm text-red-500">{errors.fokus_bav}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">{t('potenzialanalyse.bkvFocus')}</Label>
                <Select disabled={isSubmitting} value={formData.fokus_bkv} onValueChange={(val) => handleSelectChange('fokus_bkv', val)}>
                  <SelectTrigger className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.fokus_bkv ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ja">{t('potenzialanalyse.yesStrong')}</SelectItem>
                    <SelectItem value="Eher Ja">{t('potenzialanalyse.yesRather')}</SelectItem>
                    <SelectItem value="Nein">{t('potenzialanalyse.noCurrently')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fokus_bkv && <p className="text-sm text-red-500">{errors.fokus_bkv}</p>}
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">{t('potenzialanalyse.transferFailed')}</p>
                    <p>{submitError}</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
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
                  <span>E-Mail: <a href="mailto:kontakt@healio.de" className="text-healio-primary hover:underline font-medium">kontakt@healio.de</a></span>
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
