import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import GuidedCallbackButton from './GuidedCallbackButton';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

export default function GuidedJourney({ product = 'any', className = '', showImages = false }) {
  const { lang } = useLanguage();
  const de = lang === 'de';
  const steps = de ? [
    { kind: 'support', tone: 'mint', title: 'Termin buchen', text: 'Du wählst eine passende Zeit für deinen persönlichen Beratungstermin.' },
    { kind: 'mandate', tone: 'butter', title: 'Gemeinsam klären', text: 'Wir gehen Tarifwahl, Gesundheitsfragen und Beitrag persönlich mit dir durch.' },
    { kind: 'thinking', tone: 'lavender', title: 'In Ruhe entscheiden', text: 'Du prüfst und bestätigst deinen Antrag per E-Mail. Wir begleiten dich bis zur Einreichung.' },
  ] : [
    { kind: 'support', tone: 'mint', title: 'Book an appointment', text: 'Choose a time that suits you for your personal consultation.' },
    { kind: 'mandate', tone: 'butter', title: 'Work it out together', text: 'We personally guide you through cover, health questions and your premium.' },
    { kind: 'thinking', tone: 'lavender', title: 'Decide in your own time', text: 'Review and confirm your application by email. We support you through submission.' },
  ];
  return (
    <section id={`begleiteter-abschluss-${product}`} data-guided-journey data-healio-nita-avoid className={`bg-[#EFF8F3] py-12 text-home-midnight md:py-16 ${className}`}>
      <div className="healio-container px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] md:text-4xl">{de ? 'Dein Schutz. Gemeinsam geklärt.' : 'Your cover. Worked out together.'}</h2>
          <p className="mt-3 max-w-[56ch] text-base leading-7 text-[#355248]">{de ? 'Wir begleiten dich vom ersten Wunsch bis zum Antrag. Du entscheidest Schritt für Schritt.' : 'We guide you from your first question to your application. You stay in control at every step.'}</p>
        </div>
        <ol role="list" className="mt-8 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-10">
          {steps.map(({ kind, tone, title, text }) => (
            <li key={title} className="grid list-none grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 md:block">
              <FriendlyIcon kind={kind} tone={tone} size="lg" className="!h-16 !w-16 md:!h-20 md:!w-20" />
              <h3 className="font-display text-lg font-bold leading-snug md:mt-5">{title}</h3>
              <p className="col-span-2 max-w-[38ch] text-base leading-7 text-[#355248] md:mt-2">{text}</p>
            </li>
          ))}
        </ol>
        {showImages && (
          <div className="mt-8">
            <MobileSwipeRow label={de ? 'Dein Weg mit Healio in Bildern' : 'Your Healio journey in pictures'} desktopClassName="md:grid md:grid-cols-3 md:gap-6">
              {['schritt1-kasse', 'schritt2-schutz', 'schritt3-bonus'].map((scene, index) => (
                <img key={scene} src={`/images/home-cards/${scene}.webp`} alt={(de ? ['Mann vergleicht Möglichkeiten an seinem Laptop', 'Frau betrachtet ambulanten, Zahn- und Klinikschutz', 'Frau beim Sport im Park'] : ['Man compares options at his laptop', 'Woman considers outpatient, dental and hospital cover', 'Woman exercising in a park'])[index]} width="720" height="540" loading="lazy" className="h-auto w-full rounded-2xl object-contain" />
              ))}
            </MobileSwipeRow>
          </div>
        )}
        <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
          <GuidedCallbackButton product={product} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-home-midnight px-6 py-3 font-bold text-white transition hover:bg-[#244337] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18543B]">
            {de ? 'Termin buchen' : 'Book an appointment'}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </GuidedCallbackButton>
          <p className="max-w-[44ch] text-sm leading-6 text-[#355248]">{de ? 'Im Gespräch schließt du noch nichts ab. Du prüfst zuerst alle Angaben.' : 'The consultation does not conclude a contract. You review all details first.'}</p>
        </div>
      </div>
    </section>
  );
}
