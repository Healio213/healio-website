
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { emailjsService } from '@/services/emailjsService';

const HospitalContactForm = () => {
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
        message: "Anfrage Stationäre Zusatzversicherung"
      }, "Stationäre");
      
      toast({
        title: "Ihre Anfrage wurde erfolgreich gesendet.",
        description: "Wir melden uns in Kürze bei Ihnen.",
      });
      
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Leider konnte Ihre Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter info@healio.de",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white" id="hospital-contact">
      <div className="container mx-auto px-6 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Privatpatienten-Status anfragen</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon (optional)</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="bg-white" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#25c990] hover:bg-[#1db37f] text-white h-12 mt-4">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird gesendet...</> : <><Send className="mr-2 h-4 w-4" /> Anfrage senden</>}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HospitalContactForm;
