
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Send, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { emailjsService } from '@/services/emailjsService';

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    employees: '',
    focus: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employees || !formData.focus) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
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
        company: "",
        message: `Unternehmen: ${formData.company}\nMitarbeiter: ${formData.employees}\nFokus: ${formData.focus}`
      }, "Kontakt");

      toast({
        title: "Ihre Anfrage wurde erfolgreich gesendet.",
        description: "Wir melden uns in Kürze bei Ihnen.",
      });

      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        employees: '',
        focus: ''
      });

      setTimeout(() => {
        navigate('/potenzialanalyse');
      }, 1000);
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Leider konnte Ihre Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter kontakt@healio.de",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 lg:py-36 bg-slate-900 relative overflow-hidden" id="contact">
      {/* Subtle background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-healio-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="healio-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full justify-center"
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight">
              Sie wollen wissen, wo Ihr Budget verpufft?
            </h2>
            <p className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed font-medium">
              15 Minuten. Keine Verkaufspräsentation. Ein wirtschaftliches Audit auf Augenhöhe. Wir zeigen Ihnen die Zahlen — Sie entscheiden.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex flex-col gap-3 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-healio-primary/30 transition-colors">
                <div className="bg-healio-primary/15 w-12 h-12 flex items-center justify-center rounded-full text-healio-primary mb-2">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Direkter Draht zur Geschäftsführung</p>
                  <a href="tel:+494089755705" className="font-bold text-lg text-white hover:text-healio-primary transition-colors block">
                    +49 40 89755705
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-healio-primary/30 transition-colors">
                <div className="bg-healio-primary/15 w-12 h-12 flex items-center justify-center rounded-full text-healio-primary mb-2">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Schreiben Sie uns direkt</p>
                  <a href="mailto:kontakt@healio.de" className="font-bold text-lg text-white hover:text-healio-primary transition-colors block">
                    kontakt@healio.de
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-base font-medium text-slate-500">
              <CheckCircle size={20} className="text-healio-primary" />
              <p>Datenschutzkonforme Auswertung.</p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-300">Ihr Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-white bg-white/[0.08] border-white/15 h-12 placeholder:text-slate-500 focus:border-healio-primary focus:ring-healio-primary/20"
                  placeholder="Ihr Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold text-slate-300">Firmenname</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full text-white bg-white/[0.08] border-white/15 h-12 placeholder:text-slate-500 focus:border-healio-primary focus:ring-healio-primary/20"
                  placeholder="Firmenname"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-300">Geschäftliche Email Adresse</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-white bg-white/[0.08] border-white/15 h-12 placeholder:text-slate-500 focus:border-healio-primary focus:ring-healio-primary/20"
                  placeholder="name@unternehmen.de"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-300">Telefon für kurze Rückfragen</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-white bg-white/[0.08] border-white/15 h-12 placeholder:text-slate-500 focus:border-healio-primary focus:ring-healio-primary/20"
                  placeholder="+49"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees" className="text-sm font-semibold text-slate-300">Anzahl Mitarbeiter</Label>
                <Select value={formData.employees} onValueChange={(val) => handleSelectChange('employees', val)} required>
                  <SelectTrigger id="employees" className="w-full text-white bg-white/[0.08] border-white/15 h-12">
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1 bis 10 Mitarbeiter</SelectItem>
                    <SelectItem value="11-50">11 bis 50 Mitarbeiter</SelectItem>
                    <SelectItem value="51-200">51 bis 200 Mitarbeiter</SelectItem>
                    <SelectItem value="200+">Über 200 Mitarbeiter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="focus" className="text-sm font-semibold text-slate-300">Fokus der Analyse</Label>
                <Select value={formData.focus} onValueChange={(val) => handleSelectChange('focus', val)} required>
                  <SelectTrigger id="focus" className="w-full text-white bg-white/[0.08] border-white/15 h-12">
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkv">Betriebliche Krankenversicherung</SelectItem>
                    <SelectItem value="bav">Betriebliche Altersvorsorge</SelectItem>
                    <SelectItem value="both">Kombination aus beiden Themen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-healio-primary hover:bg-[#1da877] text-white h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-[0_6px_20px_rgba(37,201,144,0.3)] transition-all mt-4"
              >
                {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Wird gesendet...</> : <><Send className="mr-2 w-5 h-5" /> Gespräch anfragen</>}
              </Button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
