import React, { useId } from 'react';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { Link, useLocation } from 'react-router-dom';
import { CalendarCheck, ChevronRight, PhoneCall } from 'lucide-react';
import AltersvorsorgeIllustration from './AltersvorsorgeIllustration';
import { friendlyIconAssets } from '@/components/ui/healioSoftClayIcons';
import { MOTIV_SITZ, SCHRITT_MOTIVE, motivSitzStil } from '@/lib/altersvorsorgeBildmotive';
import { CHECK_KONTAKT_URL, zuschussCheck } from '@/content/altersvorsorgedepotContent';
import { createAltersvorsorgeKontaktState } from '@/lib/altersvorsorgeArtikelCheck';
import { buildInternalRatgeberUrl } from '@/lib/ratgeber-cta';

// Größter sichtbarer Bildinhalt auf der Bühne und Höhe des Fußpunkts über dem Bühnenboden (rem).
const BUEHNE = { breite: 8.5, hoehe: 7.25, fuss: 2.5 };

// Kleine Bühne je Schritt: Lichthof, Podest und darauf das plastische Motiv.
const SchrittBuehne = ({ name, nummer }) => {
  const motiv = SCHRITT_MOTIVE[name];
  const bild = motiv ? friendlyIconAssets[motiv] : null;
  const sitz = motiv ? MOTIV_SITZ[motiv] : null;

  return (
    <div
      data-schritt-symbol={name}
      data-schritt-motiv={bild && sitz ? motiv : 'ersatz'}
      className="relative isolate m-2 h-52 overflow-hidden rounded-[1.4rem] bg-[linear-gradient(180deg,#061a26_0%,#06303a_62%,#0a4a42_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
    >
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[48%] -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,255,245,0.7)_0%,rgba(94,224,177,0.34)_36%,rgba(37,201,144,0)_70%)]" />
      {/* Podest und Motiv in einem Rahmen: auf schmalen Tablet-Spalten rücken beide gemeinsam etwas zusammen. */}
      <div className="absolute inset-0 origin-bottom md:max-lg:scale-[0.84]">
        <span aria-hidden="true" className="pointer-events-none absolute bottom-[0.95rem] left-1/2 h-[3.1rem] w-[11.5rem] -translate-x-1/2 rounded-[50%_/_1.1rem] bg-[linear-gradient(90deg,#0a5a48_0%,#18a880_34%,#12906f_60%,#073f33_100%)] shadow-[0_18px_30px_rgba(1,14,18,0.6)]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-[1.85rem] left-1/2 h-[2.2rem] w-[11.5rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_36%,#f4fffa_0%,#bdf6e1_42%,#67ddb3_100%)] shadow-[inset_0_1px_0_1px_rgba(255,255,255,0.55),inset_0_-5px_8px_rgba(8,96,76,0.3)]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-[2.15rem] left-1/2 h-[1.15rem] w-[6.5rem] -translate-x-1/2 rounded-[50%] bg-[#07493c]/50 blur-[5px]" />
        {bild && sitz ? (
          <img
            src={bild}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={sitz.b}
            height={sitz.h}
            style={motivSitzStil(sitz, BUEHNE)}
            className="absolute left-1/2 max-w-none select-none drop-shadow-[0_8px_10px_rgba(2,22,20,0.32)] transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
          />
        ) : (
          // Unbekannter Schlüssel: bisheriges Bildchen, damit die Bühne nicht leer bleibt.
          <AltersvorsorgeIllustration kind={name} className="absolute bottom-10 left-1/2 h-24 w-24 -translate-x-1/2" />
        )}
      </div>
      <span className="absolute left-2.5 top-2.5 inline-flex min-h-8 items-center rounded-full bg-white/10 px-3 font-display text-base font-extrabold text-[#c8f7e6] ring-1 ring-inset ring-white/20 backdrop-blur-sm">
        Schritt {nummer}
      </span>
    </div>
  );
};

/**
 * Drei Schritte von der gespeicherten Rechnung zum vorbereiteten Januarstart.
 * Der Hauptknopf öffnet das Kurzformular beim Rechner (onVormerken).
 * Der bestehende Kontaktweg bleibt für eine gesonderte Rückrufanfrage erhalten.
 *
 * Alle Texte stehen in der Content-Datei (zuschussCheck). `kapazitaetHinweis`
 * zeigt den Satz zur begrenzten Zahl an Checks nur, wenn er dort eingeschaltet ist.
 */
const AltersvorsorgeZuschussCheck = ({ rechnerWert, onVormerken, id = 'zuschuss-check', inhalt: eigeneTexte = null, utmContent = null }) => {
  const headingId = useId();
  // Unterseiten bringen eigene Texte mit; Knöpfe und Schalter bleiben die der Hauptseite.
  const inhalt = eigeneTexte ? { ...zuschussCheck, ...eigeneTexte } : zuschussCheck;
  const { search } = useLocation();
  const kontaktUrl = buildInternalRatgeberUrl(CHECK_KONTAKT_URL, search, {
    utm_source: 'healio', utm_medium: 'landingpage', utm_campaign: 'altersvorsorgedepot',
    ...(utmContent ? { utm_content: utmContent } : {}),
  });
  const letzte = inhalt.karten.length - 1;

  return (
    <section id={id} className="healio-container scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8" aria-labelledby={headingId}>
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#061a26] via-[#064b3d] to-[#03362f] p-6 text-white shadow-[0_28px_80px_rgba(7,17,31,0.22)] sm:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_at_50%_0%,rgba(94,224,177,0.22),rgba(94,224,177,0)_68%)]" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-base font-bold text-[#5ee0b1]">{inhalt.eyebrow}</p>
          <h2 id={headingId} className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            {inhalt.ueberschrift}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/85">{inhalt.unterzeile}</p>
        </div>

        <MobileSwipeRow
          label={inhalt.ueberschrift}
          as="ol"
          className="mt-9"
          desktopClassName="md:grid md:grid-cols-3 md:gap-5"
          itemClassName="flex"
          mobileItemWidth="w-[85%]"
          dotsTone="dark"
          bleed={false}
        >
          {inhalt.karten.map((karte, index) => (
            <div
              key={karte.titel}
              className="group relative flex h-full w-full flex-col rounded-[1.9rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.05)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.1)] md:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.1),0_18px_40px_rgba(2,20,18,0.28)]"
            >
              <SchrittBuehne name={karte.icon} nummer={index + 1} />
              <div className="px-6 pb-7 pt-4 md:max-lg:px-4">
                <h3 className="break-words font-display text-xl font-extrabold leading-snug text-white max-lg:hyphens-auto">{karte.titel}</h3>
                <p className="mt-2 break-words text-base leading-7 text-white/85 md:max-lg:hyphens-auto">{karte.text}</p>
              </div>
              {index < letzte && (
                <span aria-hidden="true" className="absolute -right-[1.65rem] top-[6rem] z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-[#0b4a3e] text-[#8ef0cd] shadow-[0_6px_14px_rgba(1,14,18,0.45),inset_0_0_0_1px_rgba(142,240,205,0.45)] md:flex">
                  <ChevronRight className="h-4 w-4" strokeWidth={2.6} />
                </span>
              )}
            </div>
          ))}
        </MobileSwipeRow>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center">
          <p className="text-base leading-7 text-white/90">{inhalt.ablaufzeile}</p>
          <p className="rounded-2xl border border-[#5ee0b1]/35 bg-[#25c990]/[0.14] px-4 py-3 text-base font-semibold leading-7 text-white">
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
