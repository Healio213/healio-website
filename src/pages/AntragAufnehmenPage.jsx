import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  CalendarDays, CheckCircle2, Headphones, Laptop, Lock, MailCheck, MicOff, PhoneOff, WifiOff,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import CampaignShell from '@/components/campaign/CampaignShell';
import { HEALIO_ANTRAG_GESPRAECH_AKTIV, HEALIO_ANTRAG_GESPRAECH_API } from '@/config/contactChannels';
import {
  formatBeitrag, formatUhr, mailZustand, starteAntragGespraech,
} from '@/lib/nitaAntragGespraech';
import {
  Button, Callout, OptionCard, bodyText, buttonClass, cx, schuetze, sofortScrollen,
} from '@/components/antrag/ui';

// Antragsgespräch mit Nita (10.11.2026, SCHNITTSTELLE.md 11.2): Der Kunde spricht mit Nita, sie nimmt den
// Antrag auf den ambulanten Zusatzschutz der SDK auf, danach kommt Mail 1 mit dem Link zur Prüfseite.
// Auf dieser Seite gibt es nie einen Prüflink. Ohne Layout, noindex, ohne Messung, Nita-Leiste, WhatsApp und
// Cookie-Hinweis (wie /antrag/pruefen). Hinter dem Schalter HEALIO_ANTRAG_GESPRAECH_AKTIV.
// Die Zustimmung zur Sprachverbindung lebt nur im Zustand dieser Seite, nichts wird gespeichert.

const ONLINE_LINK = '/ambulant';
const TERMIN_LINK = '/terminvereinbarung';
// Textlink im Fließtext: inline statt inline-flex (LINK), damit Zeilen nicht auseinanderfallen; Tippfläche über Polster.
const LINK_IM_TEXT = 'rounded py-2.5 font-semibold text-emerald-800 underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-home-midnight [@media(hover:hover)]:hover:text-home-midnight';

function Kopf({ icon: Icon, ton = 'mint', titel, titelRef }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {Icon && (
        <span className={cx('flex h-14 w-14 items-center justify-center rounded-full', ton === 'mint' ? 'bg-home-mint/20 text-emerald-800' : 'bg-slate-200 text-home-midnight')}>
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
      )}
      <h1 ref={titelRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">{schuetze(titel)}</h1>
    </div>
  );
}

// Die zwei anderen Wege: online selbst abschließen oder Termin. Echte Seitennavigation.
function AndereWege({ titel = 'Oder so, wie es dir lieber ist' }) {
  const wege = [
    {
      href: ONLINE_LINK, icon: Laptop, name: 'Online selbst abschließen', text: 'Beitrag rechnen und den Antrag in Ruhe selbst ausfüllen.',
    },
    {
      href: TERMIN_LINK, icon: CalendarDays, name: 'Termin vereinbaren', text: 'Wir gehen den Antrag persönlich mit dir durch, per Video oder Telefon.',
    },
  ];
  return (
    <section className="space-y-3" aria-labelledby="andere-wege" data-andere-wege="">
      <h2 id="andere-wege" className="font-display text-xl font-extrabold text-home-midnight">{titel}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {wege.map(({
          href, icon: Icon, name, text,
        }) => (
          <li key={href}>
            <a
              href={href}
              data-zaehler-ignorieren=""
              className="flex min-h-12 items-start gap-3 rounded-[1.2rem] border-2 border-slate-300 bg-white p-4 outline-none transition focus-visible:ring-[3px] focus-visible:ring-home-midnight focus-visible:ring-offset-2 [@media(hover:hover)]:hover:border-emerald-700"
            >
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-home-mint/20 text-emerald-800">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-base font-extrabold leading-snug text-home-midnight underline decoration-emerald-700/40 underline-offset-4">{name}</span>
                <span className="mt-0.5 block text-base leading-6 text-home-slate">{text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Ausgeschaltet({ titelRef }) {
  return (
    <div className="space-y-6" data-zustand="aus">
      <Kopf titel="Dein Antrag auf den ambulanten Zusatzschutz" titelRef={titelRef} />
      <p className={bodyText}>Das Gespräch mit Nita gibt es hier gerade nicht. Du hast aber zwei einfache Wege zu deinem Antrag.</p>
      <AndereWege titel="So kommst du zu deinem Antrag" />
    </div>
  );
}

function Einstieg({ zustimmung, setZustimmung, starten, titelRef }) {
  return (
    <div className="space-y-6" data-zustand="einstieg">
      <Kopf titel="Deinen Antrag gemeinsam mit Nita aufnehmen" titelRef={titelRef} />
      <div className="space-y-3">
        <p className={bodyText}>
          Nita ist eine KI. Sie geht mit dir im Gespräch den Antrag für den ambulanten Zusatzschutz der SDK durch. Das dauert etwa fünf bis zehn Minuten.
        </p>
        <p className={bodyText}>
          Danach bekommst du eine Mail. Darin prüfst du alles in Ruhe und bestätigst selbst. Vorher ist nichts abgeschlossen.
        </p>
      </div>

      <div className="rounded-[1.2rem] border-2 border-slate-300 bg-white p-4">
        <h2 className="font-display text-base font-extrabold text-home-midnight">Halte bereit</h2>
        <ul className="mt-2 space-y-1.5">
          {['Dein Geburtsdatum', 'Deine Adresse', 'Deine Mail-Adresse', 'Den Namen deiner Krankenkasse'].map((punkt) => (
            <li key={punkt} className="flex items-start gap-2.5 text-base leading-6 text-home-midnight">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>{schuetze(punkt)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-start gap-2.5 border-t border-slate-200 pt-3 text-base leading-6 text-home-slate">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-home-midnight" aria-hidden="true" />
          <span>Deine IBAN brauchst du erst später auf der Prüfseite, nie am Telefon.</span>
        </p>
      </div>

      <div className="space-y-2">
        <OptionCard id="feld-zustimmung" type="checkbox" checked={zustimmung} onChange={(e) => setZustimmung(e.target.checked)} describedBy="zustimmung-mehr">
          Für das Gespräch wird mein Ton an OpenAI übertragen und dort verarbeitet.
        </OptionCard>
        <p id="zustimmung-mehr" className="pl-1 text-base leading-6 text-home-slate">
          Mehr dazu in der{' '}
          <a href="/datenschutz" target="_blank" rel="noopener" className={LINK_IM_TEXT}>
            Datenschutzerklärung
            <span className="sr-only"> (öffnet in neuem Tab)</span>
          </a>
          .
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={starten} disabled={!zustimmung} className="w-full sm:w-auto" data-start="">
          Gespräch starten
        </Button>
        <p className="flex items-center gap-2 text-base leading-6 text-home-slate">
          <Headphones className="h-5 w-5 shrink-0 text-home-midnight" aria-hidden="true" />
          <span>Tipp: Kopfhörer verhindern Echo.</span>
        </p>
      </div>

      <p className={cx(bodyText, 'border-t border-slate-300 pt-5')}>
        Lieber ohne Gespräch? Du kannst auch{' '}
        <a href={ONLINE_LINK} data-zaehler-ignorieren="" className={LINK_IM_TEXT}>online selbst abschließen</a>
        {' '}oder{' '}
        <a href={TERMIN_LINK} data-zaehler-ignorieren="" className={LINK_IM_TEXT}>einen Termin vereinbaren</a>.
      </p>
    </div>
  );
}

function Verbinden({ phase, abbrechen, titelRef }) {
  return (
    <div className="space-y-6" data-zustand="verbinden" aria-busy="true">
      <div className="flex flex-col items-start gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-home-mint border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
        <h1 ref={titelRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">
          Verbindung wird aufgebaut
        </h1>
      </div>
      <p className={bodyText} aria-live="polite">
        {phase === 'mikrofon'
          ? 'Dein Browser fragt gleich, ob er das Mikrofon nutzen darf. Tippe dann auf „Erlauben“.'
          : 'Einen Moment, gleich ist Nita für dich da.'}
      </p>
      <Button variant="secondary" onClick={abbrechen} className="w-full sm:w-auto">Abbrechen</Button>
    </div>
  );
}

// Ruhige Kugel im Stil der Nita-Leiste, atmet langsam (ohne Bewegung bei reduzierter Bewegung).
function NitaKugel({ aktiv }) {
  return (
    <span aria-hidden="true" className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
      <span className={cx('absolute inset-0 rounded-full bg-home-mint/25', aktiv && 'animate-[nita-atmen_4.8s_ease-in-out_infinite] motion-reduce:animate-none')} />
      <span
        className="relative h-20 w-20 rounded-full border border-home-mint/70 sm:h-24 sm:w-24"
        style={{
          background: 'radial-gradient(circle at 28% 24%,rgba(255,255,255,.96) 0 5%,rgba(255,255,255,.32) 14%,transparent 29%),radial-gradient(circle at 69% 74%,rgba(94,224,177,.98) 0 8%,rgba(37,201,144,.72) 34%,transparent 55%),conic-gradient(from 214deg,#07111f,#25c990,#effdf4,#076046,#07111f,#5ee0b1,#07111f)',
          boxShadow: '0 0 0 6px rgba(37,201,144,.12), inset -8px -10px 18px rgba(7,17,31,.38), inset 8px 8px 16px rgba(239,253,244,.4)',
        }}
      />
      <style>{'@keyframes nita-atmen{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.12);opacity:1}}'}</style>
    </span>
  );
}

function Gespraech({
  gespraech, beitrag, beenden, titelRef,
}) {
  return (
    <div className="space-y-6" data-zustand="gespraech">
      <div className="flex flex-col items-center gap-4 rounded-[1.6rem] bg-home-midnight px-4 py-8 text-center text-white sm:py-10">
        <NitaKugel aktiv={gespraech.verbunden} />
        <h1 ref={titelRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] outline-none sm:text-4xl" aria-live="polite">
          {gespraech.verbunden ? 'Nita hört zu' : 'Nita meldet sich gleich'}
        </h1>
        <p className="font-display text-xl font-bold tabular-nums text-slate-200" data-uhr="">
          <span className="sr-only">Gesprächsdauer </span>
          {formatUhr(gespraech.sekunden)}
        </p>
        {beitrag !== null && (
          <p className="rounded-full bg-white/10 px-4 py-2 text-base font-semibold text-white" data-beitrag="" aria-live="polite">
            Dein Beitrag: {formatBeitrag(beitrag)} EUR im Monat
          </p>
        )}
      </div>
      <p className={cx(bodyText, 'text-center')}>Sprich ganz normal. Wenn dir etwas unklar ist, frag Nita einfach.</p>
      <div className="flex flex-col items-center gap-3">
        <Button variant="secondary" onClick={beenden} className="w-full sm:w-auto" data-beenden="">
          <PhoneOff className="h-5 w-5" aria-hidden="true" />
          Gespräch beenden
        </Button>
        <p className="text-center text-base leading-6 text-home-slate">Nichts wird abgeschlossen, bevor du auf deiner Prüfseite bestätigst.</p>
      </div>
    </div>
  );
}

// Nach dem Festhalten (auch während das Gespräch noch läuft). Nie ein Prüflink.
function Festgehalten({
  mail, gespraech, beenden, titelRef,
}) {
  const art = mailZustand(mail);
  const unterwegs = art === 'unterwegs';
  return (
    <div className="space-y-6" data-zustand="festgehalten" data-mail={art}>
      <Kopf icon={unterwegs ? MailCheck : CheckCircle2} titel={unterwegs ? 'Deine Mail ist unterwegs' : 'Dein Antrag ist festgehalten'} titelRef={titelRef} />
      {unterwegs && (
        <div className="space-y-3">
          <p className={bodyText}>
            Tippe in der Mail auf den Knopf „Antrag prüfen und bestätigen“. Er führt dich zu deiner Prüfseite. Der Link gilt 7 Tage.
          </p>
          <p className={bodyText}>Keine Mail da? Schau auch im Spam-Ordner nach.</p>
        </div>
      )}
      {art === 'fehler' && (
        <p className={bodyText}>Die Mail ging gerade nicht raus, wir schicken dir den Link.</p>
      )}
      <Callout tone="info">Bis du auf deiner Prüfseite bestätigst, ist nichts abgeschlossen.</Callout>
      {gespraech && (
        <div className="flex flex-col gap-3 rounded-[1.2rem] border-2 border-slate-300 bg-white p-4 sm:flex-row sm:items-center sm:justify-between" data-laeuft-noch="">
          <p className="text-base leading-6 text-home-midnight">
            Das Gespräch läuft noch
            <span className="ml-2 font-bold tabular-nums" data-uhr="">{formatUhr(gespraech.sekunden)}</span>
          </p>
          <Button variant="secondary" onClick={beenden} className="w-full sm:w-auto" data-beenden="">
            <PhoneOff className="h-5 w-5" aria-hidden="true" />
            Gespräch beenden
          </Button>
        </div>
      )}
      {!gespraech && (
        <p className={bodyText}>
          Fragen? Antworte einfach auf unsere Mail oder{' '}
          <a href={TERMIN_LINK} data-zaehler-ignorieren="" className={LINK_IM_TEXT}>vereinbare einen Termin</a>.
        </p>
      )}
    </div>
  );
}

const BEENDET_TEXT = {
  zeit: 'Die Zeit für das Gespräch ist um.',
  getrennt: 'Die Verbindung ist abgerissen.',
  aufgelegt: 'Das Gespräch ist zu Ende.',
  selbst: 'Das Gespräch ist beendet.',
};

function Beendet({ grund, nochmal, titelRef }) {
  return (
    <div className="space-y-6" data-zustand="beendet">
      <Kopf icon={PhoneOff} ton="grau" titel="Es ist nichts gespeichert" titelRef={titelRef} />
      <p className={bodyText}>
        {BEENDET_TEXT[grund] || BEENDET_TEXT.selbst} Dein Antrag ist noch nicht festgehalten, du kannst jederzeit neu anfangen.
      </p>
      <Button onClick={nochmal} className="w-full sm:w-auto" data-nochmal="">Noch einmal starten</Button>
      <AndereWege />
    </div>
  );
}

const FEHLER = {
  mikrofon: {
    icon: MicOff,
    titel: 'Ohne Mikrofon geht es leider nicht',
    text: 'Erlaube deinem Browser das Mikrofon, meist über das Schloss neben der Adresse. Dann versuch es noch einmal.',
    nochmal: true,
  },
  technik: {
    icon: MicOff,
    titel: 'Dein Browser kann das Gespräch nicht führen',
    text: 'Mit einem aktuellen Chrome, Safari oder Firefox klappt es.',
    nochmal: false,
  },
  grenze: {
    icon: CalendarDays,
    titel: 'Heute sind keine Gespräche mehr frei',
    text: 'Morgen ist Nita wieder für dich da. Oder du nimmst einen der anderen Wege.',
    nochmal: false,
  },
  zu_oft: {
    icon: CalendarDays,
    titel: 'Gerade ist kein Gespräch frei',
    text: 'Du hast eben schon mit Nita gesprochen. Versuch es in einer Stunde noch einmal oder nimm einen der anderen Wege.',
    nochmal: false,
  },
  nicht_erreichbar: {
    icon: WifiOff,
    titel: 'Nita ist gerade nicht erreichbar',
    text: 'Wir kommen gerade nicht zu ihr durch. Versuch es später noch einmal oder nimm einen der anderen Wege.',
    nochmal: true,
  },
  aus: {
    icon: WifiOff,
    titel: 'Nita ist gerade nicht erreichbar',
    text: 'Das Gespräch gibt es im Moment nicht. Nimm gern einen der anderen Wege.',
    nochmal: false,
  },
};

function Fehler({ grund, nochmal, titelRef }) {
  const f = FEHLER[grund] || FEHLER.nicht_erreichbar;
  return (
    <div className="space-y-6" data-zustand="fehler" data-grund={grund}>
      <Kopf icon={f.icon} ton="grau" titel={f.titel} titelRef={titelRef} />
      <p className={bodyText}>{f.text}</p>
      {f.nochmal && <Button onClick={nochmal} className="w-full sm:w-auto" data-nochmal="">Noch einmal versuchen</Button>}
      <AndereWege />
    </div>
  );
}

function Gespraechsablauf({ titelRef }) {
  const [zustimmung, setZustimmung] = useState(false);
  // phase: einstieg | mikrofon | verbinden | gespraech | fehler | beendet
  const [lauf, setLauf] = useState({ phase: 'einstieg' });
  const [beitrag, setBeitrag] = useState(null);
  const [festgehalten, setFestgehalten] = useState(null);
  const gespraechRef = useRef(null);

  const starten = useCallback(() => {
    if (!zustimmung || gespraechRef.current) return;
    setBeitrag(null);
    setFestgehalten(null);
    setLauf({ phase: 'mikrofon' });
    const gespraech = starteAntragGespraech({
      api: HEALIO_ANTRAG_GESPRAECH_API,
      aufZustand: (z) => {
        if (z.phase === 'fehler' || z.phase === 'beendet') gespraechRef.current = null;
        setLauf(z);
      },
      aufErgebnis: (e) => {
        if (e.art === 'beitrag') setBeitrag(e.beitrag);
        if (e.art === 'festgehalten') setFestgehalten({ mail: e.mail });
      },
    });
    gespraechRef.current = gespraech;
  }, [zustimmung]);

  const beenden = useCallback(() => { gespraechRef.current?.beenden(); }, []);

  // Seite verlassen oder Route wechseln: Gespräch sauber beenden.
  useEffect(() => () => { gespraechRef.current?.beenden(); gespraechRef.current = null; }, []);

  const schluessel = festgehalten ? `fest-${lauf.phase === 'gespraech'}` : lauf.phase;
  useEffect(() => {
    sofortScrollen(() => window.scrollTo({ top: 0 }));
    if (schluessel !== 'einstieg') titelRef.current?.focus({ preventScroll: true });
  }, [schluessel, titelRef]);

  if (festgehalten) {
    return (
      <Festgehalten
        mail={festgehalten.mail}
        gespraech={lauf.phase === 'gespraech' ? lauf : null}
        beenden={beenden}
        titelRef={titelRef}
      />
    );
  }
  if (lauf.phase === 'mikrofon' || lauf.phase === 'verbinden') return <Verbinden phase={lauf.phase} abbrechen={beenden} titelRef={titelRef} />;
  if (lauf.phase === 'gespraech') return <Gespraech gespraech={lauf} beitrag={beitrag} beenden={beenden} titelRef={titelRef} />;
  if (lauf.phase === 'fehler') return <Fehler grund={lauf.grund} nochmal={starten} titelRef={titelRef} />;
  if (lauf.phase === 'beendet') return <Beendet grund={lauf.grund} nochmal={starten} titelRef={titelRef} />;
  return <Einstieg zustimmung={zustimmung} setZustimmung={setZustimmung} starten={starten} titelRef={titelRef} />;
}

export default function AntragAufnehmenPage() {
  const titelRef = useRef(null);
  return (
    <div className="font-sans text-home-midnight">
      <SEOHead
        title="Antrag mit Nita aufnehmen | Healio"
        description="Nimm deinen Antrag auf den ambulanten Zusatzschutz im Gespräch mit Nita auf."
        robots="noindex, nofollow"
      />
      <CampaignShell trustNote="Verschlüsselt übertragen">
        <div className="mx-auto w-full max-w-3xl break-words px-4 py-8 sm:py-12">
          {HEALIO_ANTRAG_GESPRAECH_AKTIV ? <Gespraechsablauf titelRef={titelRef} /> : <Ausgeschaltet titelRef={titelRef} />}
        </div>
      </CampaignShell>
    </div>
  );
}
