
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { emailjsService } from '@/services/emailjsService';

const DentalContactForm = () => {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjsService.sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: "",
        message: "Anfrage Zahnzusatzversicherung"
      }, "Zahnzusatz");
      
      toast({
        title: t('form.success'),
        description: t('form.successDesc'),
      });
      
      setFormData({ name: '', email: '', phone: '' });
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

  return (
    <section className="py-16 bg-white" id="dental-contact">
      <div className="container mx-auto px-6 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t('dental.title')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('form.name')}</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('form.email')}</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('form.phone')}</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="bg-white" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#25c990] hover:bg-[#1db37f] text-white h-12 mt-4">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.sending')}</> : <><Send className="mr-2 h-4 w-4" /> {t('dental.submit')}</>}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DentalContactForm;
