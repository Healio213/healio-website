import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  ArrowLeft, ArrowRight, Check, Phone,
} from 'lucide-react';
import {
  HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV, HEALIO_PHONE_DISPLAY, HEALIO_PHONE_TEL, antragTelefonAktiv,
} from '@/config/contactChannels';
import { DEFINITIONEN } from '@/data/antrag';
import {
  formatiereGeburtsdatum, geburtsdatumEingabeBereinigt, geburtsdatumFehler,
} from '@/data/sdkAmbulantAntrag';
import {
  EINSTIEG, EINWILLIGUNG, GRUND_TEXTE, HINWEIS_BEITRAG, RUECKWEICHE_TEXTE, SATZ_AUSWAHL, UKV_AUS_ZIEL, VORFRAGEN, WEICHE_TEXTE, ZAHN_SOFORT_MONAT,
  bayerischeAlterOk, bayerischeMitBaustein, definitionFuerWeiche, einstiegPunkte, fortschritt, gestellteFragen, naechsterSchritt, rueckweiche,
  seitenspalteFuss, ukvStufen, vorfragenNachWechsel, zielAus, zusatzAnzahl,
} from '@/data/antrag/zahnWeiche';
import { UKV_URL } from '@/components/sections/dental/dentalLinks';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { euro, parseDatum } from '@/lib/antragsmaske/regeln';
import { datumText } from '@/lib/antragsmaske/vertrag';
import { holeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { berechneSelbstBeitrag } from '@/lib/antragApi';
import {
  Button, Callout, FOKUS, FehlerText, Field, LINK, NeuerTab, OptionCard, TRENNUNG, buttonClass, cx, eingabeKlasse, fieldAria, schuetze, sofortScrollen,
} from '@/components/antrag/ui';
import Antragsmaske from './Antragsmaske';
import { GeteilteSeite, NitaDunkel, VertrauenPunkte } from './rahmen';
import { TERMIN_LINK, telefonLink } from './teile';

// Zahn-Strecke /antrag/zahn mit Weiche (Paket C, 20.11.2026; Adresse seit
// 12.11.2026): Einstieg, neutrale Vorfragen ohne Gesellschaftsnamen,
// Einwilligung vor den Zahnfragen, Weiche mit Gesellschaft, Tarifen und
// Beitrag für den Beginn, den die Maske vorbelegt, danach die Maske der
// gewählten Gesellschaft mit leeren Originalfragen. Regeln und Texte:
// src/data/antrag/zahnWeiche.js. Kommt der Kunde über die Wahl der zwei Wege
// von /zahn (Tarif aus dem Link), geht es wie bisher direkt in die Maske.
// Die Vorfragen bleiben im Arbeitsspeicher dieser Seite. An den Antragsdienst
// geht für den Preis der Bayerischen nur Geburtsdatum, PLZ und Beginn, ohne
// Baustein (1.6); den Baustein rechnet die Seite mit derselben Funktion wie
// der Dienst dazu.

const REIHE = ['geburt', 'V2', 'einwilligung', 'V3', 'V3a', 'V4', 'V5'];
const SCHLUESSEL = { V1: 'geburt' };
const ohneAb = (v, key) => {
  const stelle = REIHE.indexOf(key);
  return Object.fromEntries(Object.entries(v).filter(([k]) => REIHE.indexOf(k) < stelle));
};

function Optionen({ id, frage, wert, onWahl }) {
  return (
    <div role="group" aria-labelledby={`vorab-${id}-text`} className="mt-5 grid gap-3">
      {frage.optionen.map((option) => {
        const aktiv = wert === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={aktiv}
            data-vorab-antwort={option.id}
            onClick={() => onWahl(option.id)}
            className={cx(
              FOKUS,
              'flex min-h-[4rem] w-full items-start gap-3 rounded-[1.2rem] border-2 px-4 py-3.5 text-left transition active:scale-[0.99] motion-reduce:active:scale-100',
              aktiv ? 'border-emerald-700 bg-emerald-50' : 'border-home-midnight/15 bg-white [@media(hover:hover)]:hover:border-home-midnight/50 [@media(hover:hover)]:hover:bg-home-ice',
            )}
          >
            <span aria-hidden="true" className={cx('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2', aktiv ? 'border-emerald-700 bg-home-mint' : 'border-slate-400 bg-white')}>
              {aktiv && <Check className="h-4 w-4 text-home-midnight" strokeWidth={3} />}
            </span>
            <span className="min-w-0">
              <span className={cx('block font-display text-lg font-extrabold leading-snug text-home-midnight', TRENNUNG)}>{option.label}</span>
              {option.sub && <span className={cx('mt-0.5 block text-base leading-6 text-home-slate', TRENNUNG)}>{option.sub}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const telefonZiel = () => (antragTelefonAktiv('zahn') ? { text: 'Mit Nita am Telefon', href: telefonLink('zahn') } : { text: WEICHE_TEXTE.telefon.termin, href: TERMIN_LINK });

function Ueberschrift({ titelRef, children, klein = false }) {
  return (
    <h1 ref={titelRef} tabIndex={-1} className={cx('font-display font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none', klein ? 'text-[1.6rem] sm:text-3xl' : 'text-[1.75rem] sm:text-4xl', TRENNUNG)}>
      {children}
    </h1>
  );
}

function Punkte({ punkte, data }) {
  return (
    <ul className="mt-3 space-y-2.5" {...data}>
      {punkte.map((punkt) => (
        <li key={punkt} className="flex gap-3 text-base leading-6 text-home-midnight">
          <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-home-mint"><Check className="h-3.5 w-3.5 text-home-midnight" strokeWidth={3} /></span>
          <span className={cx('min-w-0', TRENNUNG)}>{schuetze(punkt)}</span>
        </li>
      ))}
    </ul>
  );
}

function GutZuWissen({ punkte }) {
  if (!punkte?.length) return null;
  return (
    <>
      <p className="mt-6 text-base font-bold text-home-midnight">{WEICHE_TEXTE.gutTitel}</p>
      <ul className="mt-2 space-y-1.5 rounded-[1rem] bg-home-ice p-4 ring-1 ring-emerald-900/10" data-gut-zu-wissen="">
        {punkte.map((punkt) => (
          <li key={punkt} className={cx('flex gap-2 text-base leading-6 text-home-midnight', TRENNUNG)}>
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
            <span className="min-w-0">{schuetze(punkt)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

// Tarife mit Beitrag (Handy: Wischkarten wie die Stufenwahl der Maske, ab Tablet nebeneinander).
function StufenKarte({
  definition, stufen, beginn, laden, mitSofort,
}) {
  const versicherer = definition.versicherer;
  return (
    <section className="mt-6 overflow-hidden rounded-[1.6rem] bg-home-midnight text-white shadow-[0_24px_48px_-24px_rgba(7,17,31,0.55)]" data-weiche-karte={definition.produkt}>
      <div className="flex items-start gap-4 p-5 sm:p-6">
        <FriendlyIcon kind="dental" size="md" tone="mint" />
        <div className="min-w-0">
          <p className="font-display text-xl font-extrabold leading-tight text-home-mint-active">die {versicherer.kurz}</p>
          <p className="text-base leading-6 text-slate-300">{versicherer.name}</p>
          <p className="mt-2 text-base leading-6 text-white">{WEICHE_TEXTE.karte}</p>
          {beginn && <p className="text-base leading-6 text-slate-300" data-weiche-beginn="">{WEICHE_TEXTE.beginn(beginn.label)}</p>}
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 sm:px-6" aria-live="polite" data-weiche-preis="">
        {laden && <p className="text-base text-slate-300">Einen Moment, wir rechnen deinen Beitrag aus …</p>}
        {!laden && stufen && (
          <div className={cx('-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden', stufen.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')} data-weiche-stufen="">
            {stufen.map((stufe) => (
              <div key={stufe.id} className="w-[70%] max-w-[16rem] shrink-0 snap-start rounded-[1.2rem] bg-white/10 p-4 ring-1 ring-white/10 sm:w-auto sm:max-w-none" data-weiche-stufe={stufe.id}>
                <p className={cx('font-display text-lg font-extrabold leading-snug text-white', TRENNUNG)}>{stufe.name}</p>
                {mitSofort && <p className="text-base leading-6 text-slate-300">mit ZAHN Sofort</p>}
                <p className="mt-2 whitespace-nowrap font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em]">{euro(stufe.beitrag)}</p>
                <p className="mt-1 text-base text-slate-300">im Monat</p>
              </div>
            ))}
          </div>
        )}
        {!laden && stufen && mitSofort && <p className="mt-3 text-base leading-6 text-slate-300">{WEICHE_TEXTE.ohneSofort}</p>}
        {!laden && stufen && <p className="mt-3 text-base leading-6 text-home-mint-active" data-am-preis="">{WEICHE_TEXTE.amPreis}</p>}
      </div>
    </section>
  );
}

function TelefonKnoepfe() {
  const ziel = telefonZiel();
  return (
    <div className="flex flex-wrap gap-2">
      <a href={ziel.href} data-zaehler-ignorieren="" className={buttonClass('primary')} data-weiche-telefon="">
        {ziel.text}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </a>
      <a href={HEALIO_PHONE_TEL} data-zaehler-ignorieren="" className={buttonClass('secondary')}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        {HEALIO_PHONE_DISPLAY}
      </a>
    </div>
  );
}

function TelefonErgebnis({ grund, titelRef }) {
  return (
    <div data-weiche-ergebnis="telefon">
      <FriendlyIcon kind="support" size="lg" tone="mint" />
      <div className="mt-4"><Ueberschrift titelRef={titelRef} klein>{WEICHE_TEXTE.telefon.titel}</Ueberschrift></div>
      <p className={cx('mt-3 text-base leading-7 text-home-midnight', TRENNUNG)}>{WEICHE_TEXTE.telefon.text}</p>
      {grund && GRUND_TEXTE[grund] && <p className={cx('mt-3 text-base font-semibold leading-7 text-home-midnight', TRENNUNG)} data-weiche-grund={grund}>{GRUND_TEXTE[grund]}</p>}
      <p className={cx('mt-3 text-base leading-7 text-home-slate', TRENNUNG)}>{WEICHE_TEXTE.telefon.darunter}</p>
      <div className="mt-5"><TelefonKnoepfe /></div>
    </div>
  );
}

// Gründe und Grenzen je Ziel, nur Annahmeregeln (C4, Teil 2.5).
function texteFuer(ziel, v) {
  if (ziel.ziel === 'bayerische-sofort') return { warum: [WEICHE_TEXTE.warum.sofort], gut: WEICHE_TEXTE.gut.sofort };
  if (ziel.ziel === 'bayerische') {
    if (v.V3 === 'fertig') return { warum: [WEICHE_TEXTE.warum.fertig], gut: WEICHE_TEXTE.gut.fertig };
    return { warum: [WEICHE_TEXTE.warum.kv], gut: [] };
  }
  if (ziel.zaehne && ziel.zaehne !== '0') return { warum: [WEICHE_TEXTE.warum.luecke(ziel.zaehne)], gut: WEICHE_TEXTE.gut.luecke };
  return { warum: [WEICHE_TEXTE.warum.ukv], gut: [] };
}

// Bayerische: Beiträge der drei Stufen vom Antragsdienst (ohne Baustein), ZAHN Sofort rechnet die Seite dazu.
function useBayerischePreise({
  aktiv, geburtsdatum, beginn, plz, versuch,
}) {
  const [stand, setStand] = useState({ schluessel: null, stufen: null, fehler: null });
  const schluessel = aktiv && geburtsdatum && beginn && /^\d{5}$/.test(plz)
    ? JSON.stringify({
      sparte: 'zahn', versicherer: 'bayerische', tarifCode: 'PRESTIGE', bausteine: [], zahlweise: 'monatlich', geburtsdatum, beginnIso: beginn.iso, plz,
    })
    : null;
  useEffect(() => {
    if (!schluessel) return undefined;
    const steuerung = new AbortController();
    berechneSelbstBeitrag(JSON.parse(schluessel), { signal: steuerung.signal })
      .then((antwort) => setStand({ schluessel, stufen: antwort.alleStufen || antwort.alleTarife || null, fehler: null }))
      .catch((fehler) => { if (fehler?.name !== 'AbortError') setStand({ schluessel, stufen: null, fehler: fehler?.code === 'antrag_preis_nicht_bestaetigt' ? 'region' : 'fehler' }); });
    return () => steuerung.abort();
  }, [schluessel, versuch]);
  if (!schluessel) return { leer: true };
  if (stand.schluessel !== schluessel) return { laden: true };
  return stand;
}

const bayerischeStufen = (alle, mitSofort) => (alle
  ? DEFINITIONEN.zahn.tarife.filter((tarif) => Number.isFinite(alle[tarif.id])).map((tarif) => ({
    id: tarif.id, name: tarif.name, grundbeitrag: alle[tarif.id], beitrag: mitSofort ? bayerischeMitBaustein(alle[tarif.id], ZAHN_SOFORT_MONAT, 'monatlich') : alle[tarif.id],
  }))
  : null);

export default function ZahnStrecke({ definition }) {
  const heute = useMemo(() => new Date(), []);
  const [vorbelegung] = useState(() => holeVorbelegung(definition.pfad));
  const ueberWahl = 'tarif' in vorbelegung;
  const [v, setV] = useState({});
  const [phase, setPhase] = useState(ueberWahl ? 'maske' : 'fragen');
  const [geburtText, setGeburtText] = useState('');
  const [plz, setPlz] = useState('');
  const [haken, setHaken] = useState(false);
  const [versucht, setVersucht] = useState(false);
  const [preisVersuch, setPreisVersuch] = useState(0);
  const [produkt, setProdukt] = useState(null);
  const [maskenDaten, setMaskenDaten] = useState({});
  const [maskenRunde, setMaskenRunde] = useState(0);
  const [wechsel, setWechsel] = useState(null);
  const [wechselPlz, setWechselPlz] = useState('');
  const titelRef = useRef(null);

  const schritt = phase === 'fragen' ? naechsterSchritt(v, { heute }) : null;
  const ziel = useMemo(() => (phase !== 'fragen' || schritt === null ? zielAus(v, { heute }) : null), [v, phase, schritt, heute]);
  const geburtsdatum = v.geburt ? datumText(geburtText, heute) || geburtText : '';
  const ukvAus = !HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV;

  // Rückweiche: Lage nach der Originalantwort und den Zusatzangaben.
  const rw = wechsel ? rueckweiche({
    v, vonProdukt: wechsel.von, frageId: wechsel.frageId, wert: wechsel.wert, zusatz: wechsel.zusatz, heute,
  }) : null;
  const rwSchritt = rw?.art === 'zusatz' ? rw.fehlt[0] : rw?.art;
  const zielBay = (phase === 'weiche' && ziel && ['bayerische', 'bayerische-sofort', 'beide'].includes(ziel.ziel))
    || (phase === 'wechsel' && rw?.art === 'wechsel' && rw.zu === 'zahn');
  const bayBeginn = phase === 'wechsel' ? rw?.ziel?.beginn : (ziel?.beginnBayerische || (ziel?.produkt === 'zahn' ? ziel.beginn : null));
  const bayPreis = useBayerischePreise({
    aktiv: zielBay || (phase === 'maske' && produkt === 'zahn'), geburtsdatum, beginn: bayBeginn, plz: phase === 'wechsel' ? wechsel?.zusatz?.plz || '' : plz, versuch: preisVersuch,
  });

  useEffect(() => {
    if (phase === 'maske') return;
    sofortScrollen(() => window.scrollTo({ top: 0 }));
    titelRef.current?.focus({ preventScroll: true });
  }, [phase, schritt, rwSchritt]);

  useEffect(() => {
    if (phase === 'fragen' && schritt === null && v.geburt) setPhase('weiche');
  }, [phase, schritt, v.geburt]);

  // ---- Maske ---------------------------------------------------------------------
  if (phase === 'maske') {
    if (ueberWahl && !produkt) return <Antragsmaske definition={definition} vorab={{ vorbelegung }} />;
    const basis = DEFINITIONEN[produkt];
    const weicheDef = definitionFuerWeiche(basis);
    const bay = produkt === 'zahn';
    const person = wechsel?.person || {};
    const zaehne = ziel?.zaehne || '0';
    const start = maskenDaten[produkt] || {
      tarif: bay ? basis.tarifVorgabe : null,
      bausteine: bay && (wechsel ? rw?.ziel?.bausteine : ziel?.bausteine)?.includes('ZAHN_SOFORT') ? ['ZAHN_SOFORT'] : [],
      geburtsdatum,
      ...(bay ? { plz: wechsel?.zusatz?.plz || plz } : {}),
      ...(person.anrede && basis.person.anreden.some((eintrag) => (eintrag.id ?? eintrag) === person.anrede) ? { anrede: person.anrede } : {}),
      formular: {
        vorname: '', nachname: '', strasse: '', plz: '', ort: '', telefon: '', email: '', krankenkasse: '', ...(person.vorname ? { vorname: person.vorname } : {}), ...(person.nachname ? { nachname: person.nachname } : {}), ...(bay ? { plz: wechsel?.zusatz?.plz || plz } : (person.plz ? { plz: person.plz } : {})),
      },
      erklaerungen: { [EINWILLIGUNG.key]: true },
      zeitpunkte: { [EINWILLIGUNG.key]: v.einwilligung },
    };
    const geburt = v.geburt;
    const preiseWeiche = bay
      ? { beginnIso: bayBeginn?.iso, stufen: Object.fromEntries((bayerischeStufen(bayPreis.stufen, false) || []).map((s) => [s.id, s.grundbeitrag])) }
      : { beginnIso: ziel?.beginn?.iso, stufen: Object.fromEntries(ukvStufen({ geburt, zaehne: '0', heute }).map((s) => [s.id, s.grundbeitrag])) };
    return (
      <Antragsmaske
        key={`${produkt}-${maskenRunde}`}
        definition={weicheDef}
        vorab={{
          vorbelegung,
          weiche: true,
          daten: start,
          zaehne: bay ? null : zaehne,
          preiseWeiche,
          hinweisBeginn: HINWEIS_BEITRAG.beginn,
          hinweisZaehne: HINWEIS_BEITRAG.zaehne,
          stufeText: RUECKWEICHE_TEXTE.stufe.text,
          stufeKnopf: RUECKWEICHE_TEXTE.stufe.knopf,
          beginnErlaubt: (option) => (bay ? bayerischeAlterOk({ geburt, heute, beginn: option }) : ukvStufen({
            geburt, zaehne, heute, beginn: option,
          }).length > 0),
          zurueck: (daten) => {
            setMaskenDaten((alt) => ({ ...alt, [produkt]: daten }));
            // Nach einem Wechsel zurück zur Rückweiche (UKV zur Bayerischen) bzw. zur Maske der Bayerischen; sonst zur Weiche.
            if (wechsel?.fertig && wechsel.von === 'zahn') { setWechsel(null); setProdukt('zahn'); setMaskenRunde((alt) => alt + 1); return; }
            if (wechsel?.fertig) { setWechsel((alt) => ({ ...alt, fertig: false })); setPhase('wechsel'); return; }
            setPhase('weiche');
          },
          beiAblehnung: ({ frageId, wert, daten }) => {
            const lage = rueckweiche({
              v, vonProdukt: produkt, frageId, wert, heute,
            });
            if (lage.art === 'telefon') return null;
            const personDaten = {
              anrede: daten.anrede, vorname: daten.formular?.vorname, nachname: daten.formular?.nachname, plz: daten.formular?.plz || daten.plz,
            };
            const starte = () => {
              setMaskenDaten((alt) => ({ ...alt, [produkt]: daten }));
              setWechsel({
                von: produkt, frageId, wert, person: personDaten, zusatz: {}, vorher: v,
              });
              setPhase('wechsel');
            };
            if (produkt === 'zahn-ukv') {
              return {
                titel: RUECKWEICHE_TEXTE.zurBayerischen.titel, text: RUECKWEICHE_TEXTE.zurBayerischen.text(zusatzAnzahl({
                  v, vonProdukt: produkt, frageId, wert, heute,
                })), knopf: RUECKWEICHE_TEXTE.zurBayerischen.knopf, onKlick: starte,
              };
            }
            if (lage.art !== 'wechsel') return null;
            const mitZuschlag = Boolean(v.V4 && v.V4 !== '0');
            return {
              titel: RUECKWEICHE_TEXTE.zurUkv.titel,
              text: RUECKWEICHE_TEXTE.zurUkv.text(mitZuschlag),
              stufen: lage.ziel.stufen,
              beginn: lage.ziel.beginn,
              knopf: RUECKWEICHE_TEXTE.zurUkv.wechseln,
              ...(ukvAus && UKV_AUS_ZIEL === 'link' ? { href: UKV_URL, extern: true, knopf: WEICHE_TEXTE.ukvAus } : {}),
              ...(ukvAus && UKV_AUS_ZIEL !== 'link' ? { nurTelefon: true } : {}),
              onKlick: () => {
                setMaskenDaten((alt) => ({ ...alt, zahn: daten, 'zahn-ukv': undefined }));
                setWechsel({
                  von: produkt, frageId, wert, person: personDaten, zusatz: {}, fertig: true,
                });
                setProdukt('zahn-ukv');
                setMaskenRunde((alt) => alt + 1);
              },
            };
          },
        }}
      />
    );
  }

  // ---- Vorfragen -----------------------------------------------------------------
  const antworte = (id, wert) => {
    const key = SCHLUESSEL[id] || id;
    setV((alt) => ({ ...ohneAb(alt, key), [key]: wert }));
  };
  const datumFehler = geburtsdatumFehler(geburtText, heute);
  const v1Weiter = () => {
    setVersucht(true);
    if (datumFehler) return;
    const bereinigt = geburtsdatumEingabeBereinigt(geburtText, heute);
    setGeburtText(bereinigt);
    const geburt = parseDatum(datumText(bereinigt, heute) || bereinigt, heute);
    if (!geburt) return;
    setVersucht(false);
    setV((alt) => ({ ...ohneAb(alt, 'geburt'), geburt }));
  };
  const einwilligungWeiter = () => {
    setVersucht(true);
    if (!haken) return;
    setVersucht(false);
    setV((alt) => ({ ...alt, einwilligung: new Date().toISOString() }));
  };
  const zurueck = () => {
    setVersucht(false);
    if (phase === 'wechsel') {
      const zusatz = { ...wechsel.zusatz };
      const gegeben = ['V3', 'V3a', 'V5', 'plz'].filter((key) => zusatz[key] !== undefined);
      const weg = gegeben[gegeben.length - 1];
      // Zurück zur ersten Gesellschaft: Vorfragen wie vor dem Wechsel (Nachbesserung K3).
      if (!weg) { if (wechsel.vorher) setV(wechsel.vorher); setWechsel(null); setPhase('maske'); setProdukt(wechsel.von); setMaskenRunde((alt) => alt + 1); return; }
      delete zusatz[weg];
      setWechsel({ ...wechsel, zusatz });
      return;
    }
    const gestellt = gestellteFragen(v, { heute });
    if (phase === 'weiche') {
      const letzte = gestellt[gestellt.length - 1];
      setV((alt) => ohneAb(alt, SCHLUESSEL[letzte] || letzte));
      setPhase('fragen');
      return;
    }
    if (schritt === 'einwilligung') { setV((alt) => ohneAb(alt, 'V2')); return; }
    const vorher = gestellt.filter((id) => id !== schritt);
    const letzte = vorher[vorher.length - 1];
    if (!letzte) return;
    if (letzte === 'V2' && v.einwilligung) { setV((alt) => ohneAb(alt, 'einwilligung')); return; }
    setV((alt) => ohneAb(alt, SCHLUESSEL[letzte] || letzte));
  };

  let inhalt = null;
  let weiterKnopf = null;
  const zeigeZurueck = !(phase === 'fragen' && schritt === 'V1');

  if (phase === 'fragen' && schritt === 'V1') {
    const fehler = versucht ? datumFehler : null;
    const zaehler = fortschritt(v, { heute });
    inhalt = (
      <div data-vorab-frage="V1">
        <div className="mb-7 flex gap-4 rounded-[1.4rem] bg-home-ice p-4 ring-1 ring-emerald-900/10 sm:p-5" data-begruessung="">
          <FriendlyIcon kind="dental" size="md" tone="mint" className="hidden sm:inline-grid" />
          <div className="min-w-0">
            <p className="font-display text-xl font-extrabold leading-tight text-home-midnight">{EINSTIEG.titel}</p>
            <ul className="mt-2 space-y-1">
              {einstiegPunkte({ ukvBeiHealio: !ukvAus }).map((punkt) => (
                <li key={punkt} className="flex gap-2 text-base leading-6 text-home-midnight">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" strokeWidth={3} aria-hidden="true" />
                  <span className="min-w-0">{schuetze(punkt)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-base leading-6 text-home-slate" data-erstinformation="">
              {EINSTIEG.erstinformation.vor}
              <a href={EINSTIEG.erstinformation.href} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={cx(FOKUS, 'rounded font-semibold text-emerald-800 underline underline-offset-4')}>{EINSTIEG.erstinformation.link}<NeuerTab /></a>
              {EINSTIEG.erstinformation.nach}
            </p>
          </div>
        </div>
        <Fortschritt {...zaehler} />
        <div className="mt-5"><Ueberschrift titelRef={titelRef} klein><span id="vorab-V1-text">{VORFRAGEN.V1.text}</span></Ueberschrift></div>
        <p className={cx('mt-2 text-base leading-7 text-home-slate', TRENNUNG)}>{VORFRAGEN.V1.hilfe}</p>
        {/* Bewusst kein Formular-Element: hier wird nichts abgeschickt (check-form-hardening). */}
        <div className="mt-5 sm:max-w-[16rem]" onKeyDown={(event) => { if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); v1Weiter(); } }}>
          <Field id="vorab-geburtsdatum" label="Dein Geburtsdatum" error={fehler}>
            <input
              {...fieldAria('vorab-geburtsdatum', { error: fehler })}
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              maxLength={12}
              placeholder={VORFRAGEN.V1.platzhalter}
              value={geburtText}
              onChange={(event) => setGeburtText(formatiereGeburtsdatum(event.target.value))}
              onBlur={(event) => setGeburtText(geburtsdatumEingabeBereinigt(event.target.value, heute))}
              className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')}
            />
          </Field>
        </div>
      </div>
    );
    weiterKnopf = { text: 'Weiter', onClick: v1Weiter, data: { 'data-vorab-weiter': '' } };
  } else if (phase === 'fragen' && schritt === 'einwilligung') {
    inhalt = (
      <div data-einwilligung="">
        <Ueberschrift titelRef={titelRef} klein>{EINWILLIGUNG.titel}</Ueberschrift>
        <p className={cx('mt-3 text-base leading-7 text-home-midnight', TRENNUNG)}>{EINWILLIGUNG.text}</p>
        <div className="mt-5" data-fehlerblock="">
          <OptionCard
            id="feld-weicheEinwilligung"
            type="checkbox"
            name="weicheEinwilligung"
            checked={haken}
            onChange={(event) => setHaken(event.target.checked)}
            describedBy={versucht && !haken ? 'fehler-weicheEinwilligung' : undefined}
            invalid={versucht && !haken}
          >
            {EINWILLIGUNG.haken}
          </OptionCard>
          <FehlerText id="fehler-weicheEinwilligung">{versucht && !haken ? EINWILLIGUNG.fehler : null}</FehlerText>
        </div>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <a href={EINWILLIGUNG.datenschutz.href} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>{EINWILLIGUNG.datenschutz.label}<NeuerTab /></a>
          <a href={telefonZiel().href} data-zaehler-ignorieren="" className={LINK} data-weiche-telefon="">{EINWILLIGUNG.telefon}</a>
        </p>
      </div>
    );
    weiterKnopf = { text: 'Weiter', onClick: einwilligungWeiter, data: { 'data-einwilligung-weiter': '' } };
  } else if (phase === 'fragen' && schritt) {
    const frage = VORFRAGEN[schritt];
    inhalt = (
      <div data-vorab-frage={schritt}>
        <Fortschritt {...fortschritt(v, { heute })} />
        <div className="mt-5"><Ueberschrift titelRef={titelRef} klein><span id={`vorab-${schritt}-text`}>{frage.text}</span></Ueberschrift></div>
        {frage.liste && (
          <ul className="mt-3 space-y-1.5 rounded-[1rem] bg-home-ice p-4 ring-1 ring-emerald-900/10">
            {frage.liste.map((punkt) => (
              <li key={punkt} className={cx('flex gap-2 text-base leading-6 text-home-midnight', TRENNUNG)}>
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                <span className="min-w-0">{punkt}</span>
              </li>
            ))}
          </ul>
        )}
        {frage.hilfe && <p className={cx('mt-2 text-base leading-7 text-home-slate', TRENNUNG)}>{frage.hilfe}</p>}
        <Optionen id={schritt} frage={frage} wert={v[schritt]} onWahl={(wert) => antworte(schritt, wert)} />
      </div>
    );
  } else if (phase === 'weiche' && ziel?.ziel === 'telefon') {
    inhalt = <TelefonErgebnis grund={ziel.grund} titelRef={titelRef} />;
  } else if (phase === 'weiche' && ziel?.ziel === 'beide') {
    // c2 (nur WAHLREGEL 'beide'): beide Karten, der Kunde wählt selbst.
    const plzOk = /^\d{5}$/.test(plz);
    const bayStufen = bayerischeStufen(bayPreis.stufen, false);
    const waehle = (ziel2) => { setProdukt(ziel2); setMaskenRunde((alt) => alt + 1); setPhase('maske'); };
    inhalt = (
      <div data-weiche-ergebnis="beide">
        <p className="text-base font-bold text-emerald-800">{WEICHE_TEXTE.oben}</p>
        <div className="mt-2"><Ueberschrift titelRef={titelRef}>{WEICHE_TEXTE.beide.titel}</Ueberschrift></div>
        <p className={cx('mt-3 text-base leading-7 text-home-midnight', TRENNUNG)}>{WEICHE_TEXTE.beide.text}</p>
        <StufenKarte definition={DEFINITIONEN['zahn-ukv']} stufen={ziel.stufen} beginn={ziel.beginn} laden={false} mitSofort={false} />
        {!ukvAus && <div className="mt-3"><Button onClick={() => waehle('zahn-ukv')} data-weiche-waehle="zahn-ukv">{WEICHE_TEXTE.beide.knopf('zahn-ukv')}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Button></div>}
        {ukvAus && UKV_AUS_ZIEL === 'link' && <div className="mt-3"><a href={UKV_URL} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('primary')}>{WEICHE_TEXTE.ukvAus}<NeuerTab /></a></div>}
        <div className="mt-6 sm:max-w-sm">
          <Field id="weiche-plz" label={WEICHE_TEXTE.plzFrage}>
            <input {...fieldAria('weiche-plz', {})} type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="z. B. 20095" value={plz} onChange={(event) => setPlz(event.target.value.replace(/\D/g, ''))} className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')} />
          </Field>
        </div>
        {plzOk && bayPreis.fehler && <Callout tone="hinweis" className="mt-5" data-weiche-region=""><p className="font-bold">{GRUND_TEXTE.region}</p></Callout>}
        {plzOk && !bayPreis.fehler && <StufenKarte definition={DEFINITIONEN.zahn} stufen={bayStufen} beginn={ziel.beginnBayerische} laden={bayPreis.laden} mitSofort={false} />}
        {plzOk && bayStufen?.length > 0 && <div className="mt-3"><Button onClick={() => waehle('zahn')} data-weiche-waehle="zahn">{WEICHE_TEXTE.beide.knopf('zahn')}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Button></div>}
        <p className={cx('mt-6 text-base leading-7 text-home-slate', TRENNUNG)} data-satz-auswahl="">{SATZ_AUSWAHL}</p>
      </div>
    );
  } else if (phase === 'weiche' && ziel) {
    const bay = ziel.produkt === 'zahn';
    const zielDef = DEFINITIONEN[ziel.produkt];
    const { warum, gut } = texteFuer(ziel, v);
    const plzOk = /^\d{5}$/.test(plz);
    const stufen = bay ? bayerischeStufen(bayPreis.stufen, ziel.ziel === 'bayerische-sofort') : ziel.stufen;
    const region = bay && bayPreis.fehler;
    inhalt = (
      <div data-weiche-ergebnis={ziel.ziel}>
        <p className="text-base font-bold text-emerald-800">{WEICHE_TEXTE.oben}</p>
        <div className="mt-2"><Ueberschrift titelRef={titelRef}>{ziel.ziel === 'beide' ? WEICHE_TEXTE.beide.titel : WEICHE_TEXTE.titel(ziel.produkt)}</Ueberschrift></div>
        {bay && (
          <div className="mt-5 sm:max-w-sm">
            <Field id="weiche-plz" label={WEICHE_TEXTE.plzFrage} error={versucht && !plzOk ? 'Bitte gib deine fünfstellige PLZ ein.' : null}>
              <input
                {...fieldAria('weiche-plz', { error: versucht && !plzOk })}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="z. B. 20095"
                value={plz}
                onChange={(event) => setPlz(event.target.value.replace(/\D/g, ''))}
                className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')}
              />
            </Field>
          </div>
        )}
        {region ? (
          <Callout tone="hinweis" className="mt-5" data-weiche-region="">
            <p className="font-bold">{GRUND_TEXTE.region}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setPreisVersuch((alt) => alt + 1)}>Später noch einmal versuchen</Button>
              <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('primary')}>{WEICHE_TEXTE.telefon.termin}<NeuerTab /></a>
            </div>
          </Callout>
        ) : (
          (!bay || plzOk) && <StufenKarte definition={zielDef} stufen={stufen} beginn={ziel.beginn} laden={bay && bayPreis.laden} mitSofort={ziel.ziel === 'bayerische-sofort'} />
        )}
        <h2 className="mt-7 font-display text-lg font-extrabold text-home-midnight">{WEICHE_TEXTE.warumTitel}</h2>
        <Punkte punkte={warum} data={{ 'data-warum': '' }} />
        <GutZuWissen punkte={gut} />
        <p className={cx('mt-6 text-base leading-7 text-home-midnight', TRENNUNG)} data-bruecke="">{WEICHE_TEXTE.bruecke(ziel.produkt)}</p>
        <p className={cx('mt-3 text-base leading-7 text-home-slate', TRENNUNG)} data-satz-auswahl="">{SATZ_AUSWAHL}</p>
        {ziel.produkt === 'zahn-ukv' && ukvAus && UKV_AUS_ZIEL === 'link' && (
          <div className="mt-5"><a href={UKV_URL} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('primary')} data-weiche-ukv-link="">{WEICHE_TEXTE.ukvAus}<NeuerTab /></a></div>
        )}
      </div>
    );
    const bereit = bay ? Boolean(stufen?.length) : Boolean(stufen?.length);
    if (ziel.produkt === 'zahn-ukv' && ukvAus) weiterKnopf = UKV_AUS_ZIEL === 'link' ? null : { ...telefonZiel(), data: { 'data-weiche-telefon': '' } };
    else if (bay && !plzOk) weiterKnopf = { text: 'Beitrag zeigen', onClick: () => setVersucht(true), data: { 'data-weiche-plz-weiter': '' } };
    else if (bereit) {
      weiterKnopf = {
        text: WEICHE_TEXTE.knopf,
        onClick: () => { setVersucht(false); setProdukt(ziel.produkt); setMaskenRunde((alt) => alt + 1); setPhase('maske'); },
        data: { 'data-weiche-weiter': '' },
      };
    }
  } else if (phase === 'wechsel' && rw) {
    if (rw.art === 'telefon') {
      inhalt = <TelefonErgebnis grund={null} titelRef={titelRef} />;
    } else if (rw.art === 'zusatz' && rw.fehlt[0] !== 'plz') {
      const id = rw.fehlt[0];
      const frage = id === 'W1' ? RUECKWEICHE_TEXTE.zusatz.abgerechnet : VORFRAGEN[id];
      const key = id === 'W1' ? 'V3' : id;
      inhalt = (
        <div data-wechsel-frage={id}>
          <Ueberschrift titelRef={titelRef} klein><span id={`vorab-${id}-text`}>{frage.text}</span></Ueberschrift>
          {frage.liste && (
            <ul className="mt-3 space-y-1.5 rounded-[1rem] bg-home-ice p-4 ring-1 ring-emerald-900/10">
              {frage.liste.map((punkt) => <li key={punkt} className={cx('flex gap-2 text-base leading-6 text-home-midnight', TRENNUNG)}><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" /><span className="min-w-0">{punkt}</span></li>)}
            </ul>
          )}
          {frage.hilfe && <p className={cx('mt-2 text-base leading-7 text-home-slate', TRENNUNG)}>{frage.hilfe}</p>}
          <Optionen id={id} frage={frage} wert={wechsel.zusatz[key]} onWahl={(wert) => setWechsel((alt) => ({ ...alt, zusatz: { ...alt.zusatz, [key]: wert } }))} />
        </div>
      );
    } else {
      // PLZ und Ergebnis auf einem Bildschirm (Preis erst mit PLZ).
      const nurPlz = rw.art === 'zusatz';
      const stufen = bayerischeStufen(bayPreis.stufen, rw.ziel?.ziel === 'bayerische-sofort');
      inhalt = (
        <div data-wechsel-ergebnis={nurPlz ? 'plz' : 'bayerische'}>
          {nurPlz ? (
            <>
              <Ueberschrift titelRef={titelRef} klein>{RUECKWEICHE_TEXTE.zusatz.plz}</Ueberschrift>
              <div className="mt-5 sm:max-w-sm">
                <Field id="wechsel-plz" label={WEICHE_TEXTE.plzFrage} error={versucht ? 'Bitte gib deine fünfstellige PLZ ein.' : null}>
                  <input
                    {...fieldAria('wechsel-plz', { error: versucht })}
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    placeholder="z. B. 20095"
                    value={wechselPlz}
                    onChange={(event) => setWechselPlz(event.target.value.replace(/\D/g, ''))}
                    className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')}
                  />
                </Field>
              </div>
            </>
          ) : (
            <>
              <p className="text-base font-bold text-emerald-800">{WEICHE_TEXTE.oben}</p>
              <div className="mt-2"><Ueberschrift titelRef={titelRef}>{RUECKWEICHE_TEXTE.zurBayerischen.ergebnisTitel}</Ueberschrift></div>
              {bayPreis.fehler ? (
                <Callout tone="hinweis" className="mt-5" data-weiche-region="">
                  <p className="font-bold">{GRUND_TEXTE.region}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => setPreisVersuch((alt) => alt + 1)}>Später noch einmal versuchen</Button>
                    <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('primary')}>{WEICHE_TEXTE.telefon.termin}<NeuerTab /></a>
                  </div>
                </Callout>
              ) : (
                <StufenKarte definition={DEFINITIONEN.zahn} stufen={stufen} beginn={rw.ziel.beginn} laden={bayPreis.laden} mitSofort={rw.ziel.ziel === 'bayerische-sofort'} />
              )}
              <p className={cx('mt-6 text-base leading-7 text-home-midnight', TRENNUNG)} data-wechsel-text="">{RUECKWEICHE_TEXTE.zurBayerischen.ergebnisText}</p>
              <p className={cx('mt-3 text-base leading-7 text-home-slate', TRENNUNG)} data-satz-auswahl="">{SATZ_AUSWAHL}</p>
              <p className="mt-4"><a href={telefonZiel().href} data-zaehler-ignorieren="" className={LINK} data-weiche-telefon="">{RUECKWEICHE_TEXTE.telefon}</a></p>
            </>
          )}
        </div>
      );
      if (nurPlz) {
        weiterKnopf = {
          text: 'Beitrag zeigen',
          onClick: () => {
            const wert = wechselPlz;
            if (!/^\d{5}$/.test(wert)) { setVersucht(true); return; }
            setVersucht(false);
            setWechsel((alt) => ({ ...alt, zusatz: { ...alt.zusatz, plz: wert } }));
          },
          data: { 'data-wechsel-plz-weiter': '' },
        };
      } else if (stufen?.length) {
        weiterKnopf = {
          text: RUECKWEICHE_TEXTE.zurBayerischen.wechseln,
          onClick: () => {
            // Vorfragen um die Lage nach der Originalantwort und die Zusatzangaben ergänzen (nur im Speicher), die Antworten an
            // die UKV verwerfen. Nachbesserung K3: nur übernehmen, was neu gefragt wurde.
            setV((alt) => vorfragenNachWechsel({
              v: alt, vonProdukt: wechsel.von, frageId: wechsel.frageId, wert: wechsel.wert, zusatz: wechsel.zusatz,
            }));
            setPlz(wechsel.zusatz.plz);
            setMaskenDaten((alt) => ({ ...alt, 'zahn-ukv': undefined, zahn: undefined }));
            setWechsel((alt) => ({ ...alt, fertig: true }));
            setProdukt('zahn');
            setMaskenRunde((alt) => alt + 1);
            setPhase('maske');
          },
          data: { 'data-wechsel-weiter': '' },
        };
      }
    }
  }

  if (phase === 'weiche' && ziel?.ziel === 'telefon') weiterKnopf = null;

  const stufeJetzt = phase === 'fragen' ? 0 : 1;
  // Nachbesserung W3: Auf den Bildschirmen der Rückweiche nennt die Seitenspalte die neue Gesellschaft erst beim Ergebnis.
  let vertrauenDef = ziel?.produkt ? DEFINITIONEN[ziel.produkt] : null;
  if (phase === 'wechsel') vertrauenDef = rw?.art === 'wechsel' ? DEFINITIONEN[rw.zu] : null;
  // Nachbesserung W2: Bei ausgeschalteter UKV-Maske gelten die Sätze zu Healio und E-Mail nicht, solange das Ziel die UKV sein kann.
  const unklarObUkv = phase === 'fragen' || (phase === 'weiche' && (!ziel || ziel.produkt === 'zahn-ukv'));
  const rechts = (
    <>
      <section>
        <FriendlyIcon kind="dental" size="md" tone="mint" />
        <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight">{EINSTIEG.seitenspalteTitel}</h2>
        <ol className="mt-5 space-y-4">
          {EINSTIEG.seitenspalte.map((punkt, stelle) => (
            <li key={punkt} className="flex items-center gap-3 text-base leading-6">
              <span aria-hidden="true" className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display font-extrabold', stelle === stufeJetzt ? 'bg-home-mint text-home-midnight' : 'bg-white/10 text-slate-300')}>{stelle + 1}</span>
              <span className={cx('min-w-0', stelle === stufeJetzt ? 'font-semibold text-white' : 'text-slate-300')}>{punkt}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-base leading-6 text-slate-300" data-seitenspalte-fuss="">{seitenspalteFuss({ ukvBeiHealio: !(ukvAus && unklarObUkv) })}</p>
      </section>
      <VertrauenPunkte definition={vertrauenDef} ohneUnterlagen={ukvAus && unklarObUkv} className="[@media(max-height:820px)]:hidden" />
      <NitaDunkel sparte="zahn" />
    </>
  );

  const bildschirm = (phase === 'fragen' && `weiche:${schritt}`) || (phase === 'wechsel' && `wechsel:${rwSchritt}`) || `weiche:${ziel?.ziel}`;
  return (
    <GeteilteSeite rechts={rechts} data-zahn-vorab="" data-bildschirm={bildschirm}>
      <div className="flex min-w-0 flex-1 flex-col lg:pt-4">
        <div className="pb-6">{inhalt}</div>
        {(zeigeZurueck || weiterKnopf) && (
          <div className="sticky bottom-0 z-30 -mx-4 mt-auto border-t border-home-midnight/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_-16px_rgba(7,17,31,0.25)] backdrop-blur sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mb-12 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-6 lg:shadow-none lg:backdrop-blur-none">
            <div className="flex items-center gap-3 lg:justify-between">
              {zeigeZurueck && (
                <Button variant="secondary" onClick={zurueck} aria-label="Zurück" className="w-12 shrink-0 !px-0 lg:w-auto lg:!px-6" data-weiche-zurueck="">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden lg:inline" aria-hidden="true">Zurück</span>
                </Button>
              )}
              {weiterKnopf?.href && (
                <a href={weiterKnopf.href} data-zaehler-ignorieren="" className={buttonClass('primary', 'min-w-0 flex-1 lg:ml-auto lg:flex-none lg:px-10')} {...weiterKnopf.data}>
                  {weiterKnopf.text}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {weiterKnopf && !weiterKnopf.href && (
                <Button onClick={weiterKnopf.onClick} className="min-w-0 flex-1 lg:ml-auto lg:flex-none lg:px-10" {...weiterKnopf.data}>
                  {weiterKnopf.text}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </GeteilteSeite>
  );
}

function Fortschritt({ n, m }) {
  if (!n || !m) return null;
  return (
    <>
      <p className="text-base font-bold text-emerald-800" data-fortschritt={`${n}/${m}`}>Frage {n} von {m}</p>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {Array.from({ length: m }, (_, stelle) => <span key={stelle} className={cx('h-1.5 flex-1 rounded-full transition-colors', stelle < n ? 'bg-emerald-600' : 'bg-home-midnight/10')} />)}
      </div>
    </>
  );
}
