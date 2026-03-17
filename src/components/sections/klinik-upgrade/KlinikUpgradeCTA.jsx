import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KlinikUpgradeCTA = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="healio-container">
        <div className="bg-[#1E3A5F] rounded-2xl p-8 md:p-12 text-center md:text-left shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Warten Sie nicht bis zum Ernstfall.
              </h2>
              <p className="text-lg text-blue-100 mb-0">
                Prüfen Sie jetzt unverbindlich, welcher Versorgungsweg für Sie offen steht und wie hoch Ihr persönlicher Bonus ausfällt.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Button 
                size="lg"
                className="bg-white text-[#1E3A5F] hover:bg-gray-100 text-lg py-8 px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group border-2 border-transparent"
              >
                <Calculator className="mr-3 w-6 h-6" />
                Jetzt Annahme prüfen
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KlinikUpgradeCTA;