
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Mail, Phone, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { emailjsService } from '@/services/emailjsService';
import Header from '@/components/Header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PotenzialanalysePage = () => {
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
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!formData.company.trim()) newErrors.company = 'Unternehmen ist erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!formData.mitarbeiteranzahl) newErrors.mitarbeiteranzahl = 'Bitte wählen Sie die Mitarbeiteranzahl';
    if (!formData.fokus_bav) newErrors.fokus_bav = 'Bitte geben Sie an, ob Fokus auf bAV liegt';
    if (!formData.fokus_bkv) newErrors.fokus_bkv = 'Bitte geben Sie an, ob Fokus auf bKV liegt';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Überprüfung fehlgeschlagen",
        description: "Bitte füllen Sie alle markierten Pflichtfelder aus.",
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
        title: "Erfolgreich gesendet!",
        description: "Vielen Dank! Ihre Anfrage wurde erfolgreich gespeichert. Wir kontaktieren Sie in Kürze.",
        className: "bg-green-50 border-green-200 text-green-900",
      });
      
      setFormData(initialFormState);
    } catch (error) {
      setSubmitError(error.message || "Ein Netzwerkfehler ist aufgetreten.");
      toast({
        variant: "destructive",
        title: "Fehler beim Senden",
        description: error.message || "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
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
              Ihre Potenzialanalyse.
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
              Lassen Sie uns in 15 Minuten prüfen, wie viel ungenutztes Budget für Lohnnebenkosten aktuell in Ihrem Unternehmen steckt.
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
                <Label htmlFor="name" className="text-gray-900 font-medium">Ihr Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Vorname und Nachname" 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900 font-medium">Unternehmen *</Label>
                <Input 
                  id="company" 
                  placeholder="Firmenname" 
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.company ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium">Geschäftliche E-Mail Adresse *</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="name@unternehmen.de" 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`py-3 px-4 border-gray-200 focus-visible:ring-gray-300 shadow-sm text-gray-900 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 font-medium">Telefonnummer</Label>
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
                <Label className="text-gray-900 font-medium">Anzahl Mitarbeiter *</Label>
                <Select disabled={isSubmitting} value={formData.mitarbeiteranzahl} onValueChange={(val) => handleSelectChange('mitarbeiteranzahl', val)}>
                  <SelectTrigger className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.mitarbeiteranzahl ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1 bis 10 Mitarbeiter</SelectItem>
                    <SelectItem value="11-50">11 bis 50 Mitarbeiter</SelectItem>
                    <SelectItem value="51-200">51 bis 200 Mitarbeiter</SelectItem>
                    <SelectItem value="200+">Über 200 Mitarbeiter</SelectItem>
                  </SelectContent>
                </Select>
                {errors.mitarbeiteranzahl && <p className="text-sm text-red-500">{errors.mitarbeiteranzahl}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">Fokus auf Betriebliche Altersvorsorge (bAV)? *</Label>
                <Select disabled={isSubmitting} value={formData.fokus_bav} onValueChange={(val) => handleSelectChange('fokus_bav', val)}>
                  <SelectTrigger className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.fokus_bav ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ja">Ja, starkes Interesse</SelectItem>
                    <SelectItem value="Eher Ja">Eher Ja</SelectItem>
                    <SelectItem value="Nein">Nein, aktuell nicht</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fokus_bav && <p className="text-sm text-red-500">{errors.fokus_bav}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium">Fokus auf Betriebliche Krankenversicherung (bKV)? *</Label>
                <Select disabled={isSubmitting} value={formData.fokus_bkv} onValueChange={(val) => handleSelectChange('fokus_bkv', val)}>
                  <SelectTrigger className={`w-full py-3 px-4 border-gray-200 focus:ring-gray-300 shadow-sm text-gray-900 ${errors.fokus_bkv ? 'border-red-500 focus:ring-red-500' : ''}`}>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ja">Ja, starkes Interesse</SelectItem>
                    <SelectItem value="Eher Ja">Eher Ja</SelectItem>
                    <SelectItem value="Nein">Nein, aktuell nicht</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fokus_bkv && <p className="text-sm text-red-500">{errors.fokus_bkv}</p>}
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Übertragung fehlgeschlagen</p>
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
                      Wird gesendet...
                    </>
                  ) : submitError ? (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Erneut versuchen
                    </>
                  ) : (
                    'Anfrage absenden'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Alternative Kontaktmöglichkeiten
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
