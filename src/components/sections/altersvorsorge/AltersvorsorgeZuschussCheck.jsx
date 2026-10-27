import React, { useId } from 'react';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { Link, useLocation } from 'react-router-dom';
import { CalendarCheck, PhoneCall } from 'lucide-react';
import AltersvorsorgeIllustration from './AltersvorsorgeIllustration';
import { CHECK_KONTAKT_URL, zuschussCheck } from '@/content/altersvorsorgedepotContent';
import { createAltersvorsorgeKontaktState } from '@/lib/altersvorsorgeArtikelCheck';
import { buildInternalRatgeberUrl } from '@/lib/ratgeber-cta';

/**
 * Drei Schritte von der gespeicherten Rechnung zum vorbereiteten Januarstart.
 * Der Hauptknopf öffnet das Kurzformular beim Rechner (onVormerken).
 * Der bestehende Kontaktweg bleibt für eine gesonderte Rückrufanfrage erhalten.
 *
 * Alle Texte stehen in der Content-Datei (zuschussCheck). `kapazitaetHinweis`
 * zeigt den Satz zur begrenzten Zahl an Checks nur, wenn er dort eingeschaltet ist.
 */
const AltersvorsorgeZuschussCheck = ({ rechnerWert, onVormerken, id = 'zuschuss-check' }) => {
  const headingId = useId();
  const inhalt = zuschussCheck;
  const { search } = useLocation();
  const kontaktUrl = buildInternalRatgeberUrl(CHECK_KONTAKT_URL, search, {
    utm_source: 'healio', utm_medium: 'landingpage', utm_campaign: 'altersvorsorgedepot',
  });

  return (
    <section id={id} className="healio-container scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8" aria-labelledby={headingId}>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#081f2b] via-[#064b3d] to-[#03362f] p-6 text-white shadow-[0_28px_80px_rgba(7,17,31,0.22)] sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#5ee0b1]">{inhalt.eyebrow}</p>
          <h2 id={headingId} className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            {inhalt.ueberschrift}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/85">{inhalt.unterzeile}</p>
        </div>

        <MobileSwipeRow
          label={inhalt.ueberschrift}
          className="mt-8"
          desktopClassName="md:grid md:grid-cols-3 md:gap-4"
          itemClassName="flex"
          mobileItemWidth="w-[85%]"
          dotsTone="dark"
          bleed={false}
        >
          {inhalt.karten.map((karte, index) => {
            return (
              <div key={karte.titel} className="h-full w-full rounded-2xl border border-white/15 bg-white/10 p-5">
                <div className="flex items-start justify-between gap-3">
                  <AltersvorsorgeIllustration kind={karte.icon} className="h-20 w-20" />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#5ee0b1]/50 font-display text-base font-extrabold text-[#5ee0b1]" aria-label={`Schritt ${index + 1}`}>{index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-white">{karte.titel}</h3>
                <p className="mt-2 text-base leading-7 text-white/85">{karte.text}</p>
              </div>
            );
          })}
        </MobileSwipeRow>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center">
          <p className="text-base leading-7 text-white/90">{inhalt.ablaufzeile}</p>
          <p className="rounded-xl border border-[#5ee0b1]/40 bg-[#25c990]/15 px-4 py-3 text-base font-semibold leading-7 text-white">
            {inhalt.startzeile}
          </p>
          {inhalt.kapazitaetHinweis && (
            <p className="text-base leading-7 text-white/85">{inhalt.kapazitaetText}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onVormerken}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25c990] px-7 py-4 text-center font-display text-base font-extrabold text-[#07111f] shadow-lg shadow-[#25c990]/25 transition hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1]"
          >
            <CalendarCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
            {inhalt.knopfTermin}
          </button>
          <Link
            to={kontaktUrl}
            state={createAltersvorsorgeKontaktState(rechnerWert, 'rueckruf')}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-white/60 px-7 py-4 font-display text-base font-extrabold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1]"
          >
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
            {inhalt.knopfRueckruf}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AltersvorsorgeZuschussCheck;
