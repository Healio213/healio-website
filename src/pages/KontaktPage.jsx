
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { emailjsService } from '@/services/emailjsService';

const KontaktPage = () => {
  const { t } = useTranslation('contact');
  const { t: tSeo } = useTranslation('seo');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('form.missingFields'),
        description: t('form.missingFieldsDesc'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjsService.sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: "", // Required to be empty string per task 9
        message: `Unternehmen: ${formData.company}\n\nNachricht:\n${formData.message}`
      }, "Kontakt");

      toast({
        title: t('form.success'),
        description: t('form.successDesc'),
      });
      
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: t('form.error'),
        description: t('form.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const schemaMarkup = createWebPageSchema(
    'Kontakt',
    tSeo('kontakt.description')
  );

  return (
    <>
      <SEOHead
        title={tSeo('kontakt.title')}
        description={tSeo('kontakt.description')}
        canonicalUrl="https://www.healio.de/kontakt"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-gradient-to-b from-white via-emerald-50/20 to-white min-h-screen pt-32 pb-16">
        
        {/* SECTION 1: Introduction */}
        <section className="healio-container px-4 sm:px-6 md:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              {t('page.title')}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {tSeo('kontakt.description')}
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: Two-Column Layout */}
        <section className="healio-container px-4 sm:px-6 md:px-8 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            
            {/* Left Column: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-md border border-slate-100 h-full">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">{t('page.office')}</h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-[#10B981] shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-1">{t('page.address')}</h3>
                      <p className="text-lg text-slate-900 font-medium">
                        Healio GmbH<br />
                        Arndtstr. 6<br />
                        22085 Hamburg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-[#10B981] shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-1">{t('page.email')}</h3>
                      <a href="mailto:kontakt@healio.de" className="text-lg text-slate-900 font-medium hover:text-[#10B981] transition-colors">
                        kontakt@healio.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-[#10B981] shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 mb-1">{t('page.phone')}</h3>
                      <a href="tel:+494089755705" className="text-lg text-slate-900 font-medium hover:text-[#10B981] transition-colors">
                        +49 40 89755705
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100">
                  <Button 
                    asChild
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 text-lg font-medium rounded-xl"
                  >
                    <a href="tel:+494089755705">
                      <Phone className="mr-2 w-5 h-5" />
                      {t('page.startCall')}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-md border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700">{t('form.name')}</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full text-slate-900 bg-slate-50 h-12 border-slate-200 focus:border-[#10B981] focus:ring-[#10B981]" 
                      placeholder={t('form.namePlaceholder')} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">{t('form.email')}</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full text-slate-900 bg-slate-50 h-12 border-slate-200 focus:border-[#10B981] focus:ring-[#10B981]" 
                      placeholder={t('form.emailPlaceholder')} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-semibold text-slate-700">{t('form.company')}</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      type="text" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="w-full text-slate-900 bg-slate-50 h-12 border-slate-200 focus:border-[#10B981] focus:ring-[#10B981]" 
                      placeholder={t('form.companyPlaceholder')} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">{t('form.phone')}</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full text-slate-900 bg-slate-50 h-12 border-slate-200 focus:border-[#10B981] focus:ring-[#10B981]" 
                      placeholder={t('form.phonePlaceholder')} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-slate-700">{t('form.message')}</Label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      value={formData.message} 
                      onChange={handleChange} 
                      className="w-full text-slate-900 bg-slate-50 min-h-[150px] p-4 rounded-xl border border-slate-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all resize-y" 
                      placeholder={t('form.messagePlaceholder')} 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t('form.sending')}</> : <><Send className="mr-2 w-5 h-5" /> {t('form.submit')}</>}
                  </Button>
                  
                </form>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 3: Location (Google Maps) */}
        <section className="w-full">
          <div className="w-full h-[400px] md:h-[500px] bg-slate-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.349633854124!2d10.015241777265267!3d53.56942945826958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18ef0e3f28249%3A0xc02e48e8990b798b!2sArndtstraße%206%2C%2022085%20Hamburg!5e0!3m2!1sen!2sde!4v1710000000000!5m2!1sen!2sde" 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Healio Standort Hamburg"
            ></iframe>
          </div>
        </section>

      </main>
    </>
  );
};

export default KontaktPage;
