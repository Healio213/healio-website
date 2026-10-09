import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownToLine, CalendarCheck } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { createAltersvorsorgeKontaktState, readArtikelCheckState } from '@/lib/altersvorsorgeArtikelCheck';
import { CHECK_KONTAKT_URL, danke as content } from '@/content/altersvorsorgedepotContent';

export const FAHRPLAN_DOWNLOAD_PATH = '/downloads/healio-zuschuss-fahrplan-2027.pdf';

// Keine Bestätigung einer unbewiesenen Anmeldung und keine Kalenderdatei für
// organisatorisch noch nicht bestätigte Webinare erzeugen.
const AltersvorsorgedepotDankePage = () => {
  const { state, search } = useLocation();
  const isStartinfo = new URLSearchParams(search).get('startinfos') === 'bestaetigt';
  const snapshot = readArtikelCheckState(state);
  return (
    <>
      <SEOHead title="Zuschuss-Fahrplan und nächster Schritt | Healio" description="Lies den Zuschuss-Fahrplan 2027 und frage einen unverbindlichen persönlichen Check an." canonicalUrl="https://healio.de/altersvorsorgedepot/danke" robots="noindex, nofollow" ogImageAlt="Healio Altersvorsorgedepot" />
      <main className="min-h-screen bg-[#f4faf7] pt-24 text-slate-700 sm:pt-28">
        <section className="healio-container px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FriendlyIcon kind="document" tone="mint" size="lg" className="mx-auto" />
            <h1 className="mt-6 font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{isStartinfo ? 'Deine Startinfos zum Altersvorsorgedepot' : content.h1Ohne}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{isStartinfo ? 'Nach der Bestätigung deiner E-Mail-Adresse erhältst du neue Details, Hinweise zum Start ab 2027 und passende Webinar-Einladungen. Du kannst dich jederzeit über den Abmeldelink in jeder Informationsmail abmelden. Hier findest du außerdem deinen Zuschuss-Fahrplan.' : content.text}</p>
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-slate-950">Fragen gemeinsam klären</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">Ein Zuschuss-Check ist unverbindlich. Wir stimmen den Termin über deine Kontaktanfrage mit dir ab. Ein konkretes Produktangebot ist erst nach tatsächlicher Verfügbarkeit und Prüfung möglich.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link to={CHECK_KONTAKT_URL} state={createAltersvorsorgeKontaktState(snapshot?.value, 'check')} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25c990] px-5 py-3 text-base font-extrabold text-[#07111f] hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  {content.checkKastenKnopf}
                </Link>
                <a href={FAHRPLAN_DOWNLOAD_PATH} download="Healio-Zuschuss-Fahrplan-2027.pdf" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-base font-semibold text-[#07111f] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
                  <ArrowDownToLine className="h-5 w-5" aria-hidden="true" />
                  {content.fahrplanKnopf}
                </a>
              </div>
              <Link to="/ratgeber/altersvorsorgedepot" className="mt-5 inline-flex min-h-11 items-center text-base font-semibold text-[#087654] underline underline-offset-4">Zur Wissensbibliothek</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default AltersvorsorgedepotDankePage;
