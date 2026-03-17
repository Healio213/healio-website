
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, ArrowRightLeft } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const ACTIVITIES = [
  { id: 'impfung', title: 'Schutzimpfung', desc: '(bis zu 8x) - 30€ je Impfung', amount: 240 },
  { id: 'zahn', title: 'Zahnvorsorge', desc: '(bis 2x) - 30€ je Besuch', amount: 60 },
  { id: 'checkup', title: 'Gesundheits-Check-up', desc: '1x pro Jahr', amount: 75 },
  { id: 'krebs', title: 'Krebsvorsorge', desc: '1x pro Jahr', amount: 75 },
  { id: 'ultraschall', title: 'Ultraschallscreening', desc: '1x pro Jahr', amount: 75 },
  { id: 'kurs', title: 'IKK-Gesundheitskurs', desc: 'Mehrfach möglich', amount: 75 },
  { id: 'sport', title: 'Sport Verein/Studio', desc: 'Pro Mitgliedschaft', amount: 75 },
  { id: 'abzeichen', title: 'Sportabzeichen', desc: 'Jedes Abzeichen', amount: 75 },
  { id: 'bmi', title: 'BMI im Normalbereich', desc: '1x pro Jahr', amount: 75 },
  { id: 'blutdruck', title: 'Blutdruck normal', desc: '1x pro Jahr', amount: 75 },
  { id: 'zahnreinigung', title: 'Zahnreinigung', desc: '1x pro Jahr', amount: 40 },
  { id: 'kind', title: 'U-Untersuchungen Kind', desc: 'je Untersuchung', amount: 30 },
];

const BonusCalculator = () => {
  const calculatorUrl = "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant&agentId1=901235&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJOb2xpIiwibGFzdE5hbWUiOiJHbWJIIiwiY29tcGanySI6Ik5vbGkgR21iSCIsInN0cmVldCI6IkFybmR0c3RyLiA2IiwiemlwY29kZSI6IjIyMDg1IiwiY2l0eSI6IkhhbWJ1cmciLCJtb2JpbGUiOiIwMTc2MjQxNTMxODgiLCJlbWFpbCI6ImZyYW5rQG5vbGktdmVyc2ljaGVydW5nLmRlIn0=&remarks=IkJlaSBGcmFnZW4gc2luZCB3aXIgZvxyIFNpZSBkYS4i&defaultContact=true&employeeInsurance=NOT_BKV";
  const ikkLink = "https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V3700025016";

  const [selectedActivities, setSelectedActivities] = useState({});

  const handleToggle = (id) => {
    setSelectedActivities((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    setSelectedActivities({});
  };

  const totalBonus = useMemo(() => {
    return ACTIVITIES.reduce((sum, activity) => {
      return selectedActivities[activity.id] ? sum + activity.amount : sum;
    }, 0);
  }, [selectedActivities]);

  return (
    <section className="bg-white py-16 lg:py-24 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-[#464f5d] mb-4">
            Dein persönlicher <span className="text-[#25c990]">Bonus-Rechner</span>
          </h2>
          <p className="text-lg text-[#bec7c9] max-w-3xl mx-auto font-medium">
            So funktioniert der IKK Classic Bonus: Wähle deine Aktivitäten und sieh sofort, wie viel du rausholst!
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
          
          {/* Left Column: Checkboxes (60%) */}
          <div className="w-full lg:w-[60%] bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="text-xl font-bold text-[#464f5d] mb-6">Wähle deine Aktivitäten:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACTIVITIES.map((activity) => (
                <label 
                  key={activity.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer select-none
                    ${selectedActivities[activity.id] 
                      ? 'border-[#25c990] bg-[#25c990]/5' 
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                >
                  <div className="mt-1">
                    <Checkbox 
                      id={activity.id}
                      checked={!!selectedActivities[activity.id]}
                      onCheckedChange={() => handleToggle(activity.id)}
                      className="data-[state=checked]:bg-[#25c990] data-[state=checked]:border-[#25c990]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#464f5d] truncate leading-tight mb-1">
                      {activity.title}
                    </div>
                    <div className="text-sm text-[#bec7c9] leading-snug">
                      {activity.desc}
                    </div>
                  </div>
                  <div className="font-bold text-[#25c990] whitespace-nowrap">
                    +{activity.amount}€
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-8 text-center md:text-left">
              <button 
                onClick={handleReset}
                className="text-[#bec7c9] hover:text-[#464f5d] underline text-sm font-medium transition-colors"
              >
                Auswahl zurücksetzen
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Result Box (40%) */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-[#25c990] to-[#076046] rounded-2xl p-8 lg:p-10 shadow-xl text-white overflow-hidden relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

              <div className="relative z-10 text-center">
                <h3 className="text-xl lg:text-2xl font-semibold opacity-90 mb-4">
                  Dein möglicher Bonus:
                </h3>
                
                <div className="flex justify-center items-center h-32 mb-6">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={totalBonus}
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 1.2, opacity: 0, y: -20 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="text-7xl lg:text-8xl font-extrabold tracking-tighter"
                    >
                      {totalBonus}€
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-xs mx-auto">
                  Dein Bonus wird ausgezahlt oder direkt mit deiner Zusatzversicherung verrechnet.
                </p>

                <div className="flex flex-col gap-4">
                  <Button asChild className="bg-white text-[#25c990] hover:bg-gray-50 h-14 w-full text-base font-bold shadow-lg transition-all hover:scale-[1.02]">
                    <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">
                      <Gift className="w-5 h-5 mr-2" />
                      Tarif rechnen
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:border-white h-14 w-full text-base font-semibold transition-all">
                    <a href={ikkLink} target="_blank" rel="noopener noreferrer">
                      <ArrowRightLeft className="w-5 h-5 mr-2" />
                      Jetzt zur IKK wechseln
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BonusCalculator;
