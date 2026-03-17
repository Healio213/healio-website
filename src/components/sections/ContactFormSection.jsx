
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { emailjsService } from '@/services/emailjsService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Send } from 'lucide-react';

const ContactFormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    interesse: '',
    nachricht: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, interesse: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.vorname || !formData.nachname || !formData.email || !formData.interesse || !formData.nachricht) {
      toast({
        title: "Fehlende Felder",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjsService.sendEmail({
        from_name: `${formData.vorname} ${formData.nachname}`.trim(),
        from_email: formData.email,
        phone: formData.telefon,
        company: "",
        message: `Interesse: ${formData.interesse}\n\nNachricht:\n${formData.nachricht}`
      }, "Startseite");

      toast({
        title: "Ihre Anfrage wurde erfolgreich gesendet.",
        description: "Wir melden uns in Kürze bei Ihnen.",
      });

      setFormData({
        vorname: '',
        nachname: '',
        email: '',
        telefon: '',
        interesse: '',
        nachricht: '',
      });
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Jetzt unverbindlich beraten lassen
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sie sind gesetzlich versichert und möchten mehr aus Ihrer Gesundheitsvorsorge herausholen? Schreiben Sie uns — wir finden den passenden Schutz für Sie.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vorname">Vorname *</Label>
                <Input
                  id="vorname"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleChange}
                  placeholder="Max"
                  required
                  className="bg-slate-50 border-slate-200 focus-visible:ring-[#25c990]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nachname">Nachname *</Label>
                <Input
                  id="nachname"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleChange}
                  placeholder="Mustermann"
                  required
                  className="bg-slate-50 border-slate-200 focus-visible:ring-[#25c990]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="max@beispiel.de"
                  required
                  className="bg-slate-50 border-slate-200 focus-visible:ring-[#25c990]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon (optional)</Label>
                <Input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  value={formData.telefon}
                  onChange={handleChange}
                  placeholder="0123 456789"
                  className="bg-slate-50 border-slate-200 focus-visible:ring-[#25c990]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interesse">Interesse an *</Label>
              <Select value={formData.interesse} onValueChange={handleSelectChange} required>
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-[#25c990]">
                  <SelectValue placeholder="Bitte wählen..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ambulante Zusatzversicherung">Ambulante Zusatzversicherung</SelectItem>
                  <SelectItem value="Zahnzusatzversicherung">Zahnzusatzversicherung</SelectItem>
                  <SelectItem value="Stationäre Zusatzversicherung">Stationäre Zusatzversicherung</SelectItem>
                  <SelectItem value="Tierkrankenversicherung">Tierkrankenversicherung</SelectItem>
                  <SelectItem value="Mehrere Bereiche">Mehrere Bereiche</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nachricht">Nachricht *</Label>
              <Textarea
                id="nachricht"
                name="nachricht"
                value={formData.nachricht}
                onChange={handleChange}
                placeholder="Beschreiben Sie kurz Ihr Anliegen oder welche Leistungen Sie interessieren..."
                rows={5}
                required
                className="bg-slate-50 border-slate-200 focus-visible:ring-[#25c990] resize-y"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#25c990] hover:bg-[#1db37f] text-white py-6 text-lg rounded-xl shadow-lg shadow-[#25c990]/20 transition-all hover:-translate-y-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  Anfrage senden
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-slate-500 mt-4">
              * Pflichtfelder. Ihre Daten werden sicher übermittelt und vertraulich behandelt.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;
