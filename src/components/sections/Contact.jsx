
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
        company: "", // Specifically requested empty string for company
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
        description: "Leider konnte Ihre Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter info@healio.de",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="healio-section bg-white" id="contact">
      <div className="healio-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="flex flex-col h-full justify-center"
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-healio-slate mb-6 leading-tight">
              Sie wollen wissen, wo Ihr Budget verpufft?
            </h2>
            <p className="text-lg lg:text-xl text-healio-text-light mb-10 leading-relaxed font-medium">
              15 Minuten. Keine Verkaufspräsentation. Ein wirtschaftliches Audit auf Augenhöhe. Wir zeigen Ihnen die Zahlen — Sie entscheiden.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-healio-primary/30 transition-colors shadow-sm">
                <div className="bg-healio-mint/50 w-12 h-12 flex items-center justify-center rounded-full text-healio-primary mb-2">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Direkter Draht zur Geschäftsführung</p>
                  <a href="tel:+494089755705" className="font-bold text-lg text-healio-slate hover:text-healio-primary transition-colors block">
                    +49 40 89755705
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-healio-primary/30 transition-colors shadow-sm">
                <div className="bg-healio-mint/50 w-12 h-12 flex items-center justify-center rounded-full text-healio-primary mb-2">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Schreiben Sie uns direkt</p>
                  <a href="mailto:info@healio.de" className="font-bold text-lg text-healio-slate hover:text-healio-primary transition-colors block">
                    info@healio.de
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-base font-medium text-slate-600 bg-white/50">
              <CheckCircle size={20} className="text-healio-primary" />
              <p>Datenschutzkonforme Auswertung.</p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="bg-white p-8 lg:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-healio-slate">Ihr Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full text-gray-900 bg-white h-12" 
                  placeholder="Ihr Name" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold text-healio-slate">Firmenname</Label>
                <Input 
                  id="company" 
                  name="company" 
                  type="text" 
                  required 
                  value={formData.company} 
                  onChange={handleChange} 
                  className="w-full text-gray-900 bg-white h-12" 
                  placeholder="Firmenname" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-healio-slate">Geschäftliche Email Adresse</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full text-gray-900 bg-white h-12" 
                  placeholder="name@unternehmen.de" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-healio-slate">Telefon für kurze Rückfragen</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  required
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full text-gray-900 bg-white h-12" 
                  placeholder="+49" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees" className="text-sm font-semibold text-healio-slate">Anzahl Mitarbeiter</Label>
                <Select value={formData.employees} onValueChange={(val) => handleSelectChange('employees', val)} required>
                  <SelectTrigger id="employees" className="w-full text-gray-900 bg-white h-12">
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
                <Label htmlFor="focus" className="text-sm font-semibold text-healio-slate">Fokus der Analyse</Label>
                <Select value={formData.focus} onValueChange={(val) => handleSelectChange('focus', val)} required>
                  <SelectTrigger id="focus" className="w-full text-gray-900 bg-white h-12">
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
                className="w-full bg-healio-primary hover:bg-healio-primary-dark text-white h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all mt-4"
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
