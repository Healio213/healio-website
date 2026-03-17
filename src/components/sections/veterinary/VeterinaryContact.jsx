
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calculator, Phone, Mail, CheckCircle, Dog } from 'lucide-react';

const VeterinaryContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    animalType: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Anfrage eingegangen",
      description: "Wir erstellen eine unverbindliche Berechnung für Ihr Tier.",
      duration: 5000,
      className: "bg-[#1E3A8A] text-white border-blue-800"
    });
    setFormData({ name: '', email: '', animalType: '', age: '' });
  };

  return (
    <section id="vet-contact" className="py-12 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="healio-container px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-[#1E3A8A] font-bold uppercase tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">
              <Dog className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Sie wollen wissen, was Absicherung für Ihr Tier kostet?</span>
            </div>
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
              Rasse, Alter, Gesundheitsstatus — wir berechnen Ihren individuellen Tarif. Keine Verkaufsgespräche. Zahlen und Fakten.
            </p>

            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-0">
              <div className="flex items-center gap-3 sm:gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="bg-blue-50 p-2.5 sm:p-3 rounded-full text-[#1E3A8A] shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wider">Beratungstelefon</p>
                  <a href="tel:+4940180248980" className="font-bold text-base sm:text-lg text-slate-900 hover:text-[#1E3A8A] transition-colors block truncate">
                    +49 40 1802 4898 - 0
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="bg-blue-50 p-2.5 sm:p-3 rounded-full text-[#1E3A8A] shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wider">E-Mail Kontakt</p>
                  <a href="mailto:info@healio.de" className="font-bold text-base sm:text-lg text-slate-900 hover:text-[#1E3A8A] transition-colors block truncate">
                    info@healio.de
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border-t-4 border-[#1E3A8A]"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Beitrag berechnen</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Ihr Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none bg-slate-50 text-slate-900 placeholder:text-gray-400" 
                  placeholder="Max Mustermann" 
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">E-Mail Adresse</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none bg-slate-50 text-slate-900 placeholder:text-gray-400" 
                  placeholder="name@example.com" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="animalType" className="text-sm font-medium text-slate-700 ml-1">Tierart / Rasse</label>
                  <input 
                    id="animalType" 
                    name="animalType" 
                    type="text" 
                    value={formData.animalType} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none bg-slate-50 text-slate-900 placeholder:text-gray-400" 
                    placeholder="z.B. Hund, Labrador" 
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="age" className="text-sm font-medium text-slate-700 ml-1">Alter</label>
                  <input 
                    id="age" 
                    name="age" 
                    type="text" 
                    value={formData.age} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none bg-slate-50 text-slate-900 placeholder:text-gray-400" 
                    placeholder="z.B. 3 Jahre" 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all mt-2 active:scale-[0.98]">
                Beitrag berechnen
                <Calculator className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4 bg-gray-50 py-2 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                <span>Kostenlose & unverbindliche Anfrage</span>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VeterinaryContact;
