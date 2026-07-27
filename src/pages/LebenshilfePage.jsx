import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Coins,
  Info,
  PiggyBank,
  Sparkles,
  TrendingUp,
  Users,
  CalendarCheck,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';

// Rahmenwerte 2026 (jaehrlich pruefen)
const AG_SATZ = 0.046; // Arbeitgeberbeitrag der Lebenshilfe: 4,6 % vom Brutto
const AN_PFLICHT_SATZ = 0.023; // verpflichtender Eigenanteil: 2,3 % vom Brutto
const SV_FREI_MONAT = 338; // 4 % der BBG (allg. Rentenversicherung) 2026 pro Monat
const STEUERFREI_MONAT = 676; // 8 % der BBG nach § 3 Nr. 63 EStG pro Monat
const JAHR = 2026;

const euro = (wert) =>
  new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(wert));

// Endkapital bei monatlicher Einzahlung zum Monatsende
const endkapital = (monatlich, zinsProJahr, jahre) => {
  const i = zinsProJahr / 12;
  const n = jahre * 12;
  if (i === 0) return monatlich * n;
  return monatlich * ((Math.pow(1 + i, n) - 1) / i);
};

// Vereinfachte Brutto-Netto-Naeherung: AN-Anteil Sozialversicherung ~20 %,
// Grenzsteuersatz grob nach Monatsbrutto (Steuerklasse-I-Naeherung)
const SV_SATZ_AN = 0.2;
const schaetzeGrenzsteuersatz = (brutto) => {
  if (brutto < 2000) return 0.2;
  if (brutto < 3000) return 0.27;
  if (brutto < 4000) return 0.32;
  if (brutto < 5000) return 0.37;
  return 0.42;
};

const nachleseThemen = [
  {
    frage: 'Was ist Entgeltumwandlung genau?',
    antwort:
      'Bei der Entgeltumwandlung fließt ein Teil Ihres Bruttogehalts direkt in Ihre betriebliche Altersvorsorge, bevor Steuern und Sozialabgaben berechnet werden. Dadurch kostet Sie ein Beitrag von zum Beispiel 100 Euro netto oft nur rund 50 bis 60 Euro, je nach Steuerklasse und Einkommen. Die genaue Ersparnis hängt von Ihrer persönlichen Situation ab.'
  },
  {
    frage: 'Wer zahlt bei der Lebenshilfe was?',
    antwort:
      'Ihr Arbeitgeber beteiligt sich mit 4,6 Prozent Ihres Bruttogehalts an Ihrer betrieblichen Altersvorsorge. Als Eigenanteil sind 2,3 Prozent vom Brutto verpflichtend vorgesehen. Zusammen ergibt das bereits eine solide Basis. Zusätzlich können Sie freiwillig weiter aufstocken, und genau hier liegt für die meisten Mitarbeitenden das größte ungenutzte Potenzial.'
  },
  {
    frage: `Was bedeuten die 4 Prozent der Beitragsbemessungsgrenze (${SV_FREI_MONAT} Euro)?`,
    antwort:
      `Die Beitragsbemessungsgrenze (BBG) der allgemeinen Rentenversicherung ist eine gesetzliche Rechengröße und wird jedes Jahr angepasst. Bis zu 4 Prozent der BBG, im Jahr ${JAHR} sind das ${SV_FREI_MONAT} Euro im Monat, bleibt Ihre Entgeltumwandlung frei von Sozialversicherungsbeiträgen. Steuerfrei sind nach § 3 Nr. 63 EStG sogar bis zu 8 Prozent der BBG, also ${STEUERFREI_MONAT} Euro monatlich. Solange Ihre eigenen Beiträge unter diesen Grenzen liegen, haben Sie ungenutzten Förder-Spielraum.`
  },
  {
    frage: 'Warum lohnt es sich, die Lücke bis zur Fördergrenze zu schließen?',
    antwort:
      'Jeder Euro innerhalb der Fördergrenzen wird aus dem Brutto bespart und arbeitet über Jahrzehnte für Sie. Durch den Zinseszinseffekt entscheidet neben der Höhe des Beitrags vor allem die Rendite über das Endergebnis. Der Unterschied zwischen einer Anlage mit unter einem Prozent und einer marktorientierten Anlage kann über ein Berufsleben ein Vielfaches des eingezahlten Kapitals ausmachen. Die Szenarien im Rechner oben zeigen die Bandbreite als unverbindliche Modellrechnung.'
  },
  {
    frage: 'Wie sicher ist das Geld und welche Risiken gibt es?',
    antwort:
      'Fondsgebundene Lösungen investieren in Aktien- und ETF-Portfolios. Sie bieten langfristig höhere Renditechancen, unterliegen aber Wertschwankungen bis hin zum Verlustrisiko. Frühere Wertentwicklungen sind kein verlässlicher Indikator für die Zukunft. Klassische Garantieprodukte schwanken weniger, erwirtschaften dafür aktuell oft weniger als die Inflation. Welche Mischung zu Ihnen passt, hängt von Laufzeit und Risikoneigung ab und gehört in ein persönliches Gespräch.'
  },
  {
    frage: 'Was passiert bei Jobwechsel, Elternzeit oder Krankheit?',
    antwort:
      'Ihr Vertrag gehört Ihnen. Bei einem Arbeitgeberwechsel können Sie ihn mitnehmen oder beitragsfrei stellen. In Elternzeit oder bei längerer Krankheit lassen sich Beiträge pausieren und später wieder aufnehmen. Das bereits aufgebaute Kapital bleibt dabei erhalten und arbeitet weiter.'
  },
  {
    frage: 'Wie wird die Betriebsrente später besteuert?',
    antwort:
      'Die Auszahlungen werden nachgelagert besteuert, also erst im Rentenalter, in dem der persönliche Steuersatz meist niedriger ist als im Berufsleben. Auf Betriebsrenten fallen für gesetzlich Versicherte Kranken- und Pflegeversicherungsbeiträge an, wobei ein Freibetrag gilt. Auch das rechnen wir in der persönlichen Beratung transparent mit ein.'
  },
  {
    frage: 'Ich zahle schon den Pflichtanteil. Muss ich etwas tun?',
    antwort:
      'Nein, der Pflichtanteil läuft automatisch. Die entscheidende Frage ist, ob Sie Ihren restlichen Förder-Spielraum nutzen möchten und wo Ihre Beiträge angelegt sind. Beides lässt sich in einem kurzen Gespräch klären: erst der Blick auf den Ist-Zustand, dann die Entscheidung, ob und wie Sie aufstocken.'
  },
  {
    frage: 'Was kostet mich die Beratung?',
    antwort:
      'Das Erstgespräch und die Analyse Ihres Ist-Zustands sind für Sie kostenfrei und unverbindlich. Healio wird als Versicherungsmakler im Fall einer Vermittlung über die im Produkt einkalkulierte Vergütung bezahlt. Alle Kosten eines Vorschlags legen wir vor einer Entscheidung offen.'
  }
];

const LebenshilfePage = () => {
  const [brutto, setBrutto] = useState(3200);
  const [laufzeit, setLaufzeit] = useState(30);
  const [mitLuecke, setMitLuecke] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const werte = useMemo(() => {
    const agBeitrag = brutto * AG_SATZ;
    const pflicht = brutto * AN_PFLICHT_SATZ;
    const luecke = Math.max(0, SV_FREI_MONAT - pflicht);
    const sparbeitrag = agBeitrag + pflicht + (mitLuecke ? luecke : 0);
    // Brutto-Netto: Eigenbeitrag kommt aus dem Brutto, spart also Steuern + Sozialabgaben
    const eigenbeitrag = pflicht + (mitLuecke ? luecke : 0);
    const steuersatz = schaetzeGrenzsteuersatz(brutto);
    const ersparnis = eigenbeitrag * (steuersatz + SV_SATZ_AN);
    const nettoKosten = eigenbeitrag - ersparnis;
    const hebel = nettoKosten > 0 ? sparbeitrag / nettoKosten : 0;
    return { agBeitrag, pflicht, luecke, sparbeitrag, eigenbeitrag, steuersatz, ersparnis, nettoKosten, hebel };
  }, [brutto, mitLuecke]);

  // Vorher-Nachher: identischer Sparbeitrag, nur die Anlage unterscheidet sich
  const vergleich = useMemo(() => {
    const basis = werte.sparbeitrag;
    return {
      einzahlung: basis * 12 * laufzeit,
      heute: endkapital(basis, 0.01, laufzeit),
      mittel: endkapital(basis, 0.05, laufzeit),
      markt: endkapital(basis, 0.07, laufzeit)
    };
  }, [werte.sparbeitrag, laufzeit]);

  const scrollToRechner = () => {
    document.getElementById('rechner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="Ihre betriebliche Altersvorsorge bei der Lebenshilfe | Healio"
        description="Arbeitgeberbeitrag, Pflichtanteil und Ihr persönlicher Förder-Spielraum: verstehen, berechnen und ausschöpfen. Informationsseite für Mitarbeitende der Lebenshilfe im Kreis Pinneberg."
        canonicalUrl="https://healio.de/lebenshilfe"
        robots="noindex, nofollow"
      />

      <main className="bg-white overflow-hidden w-full">
        {/* HERO */}
        <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-lebenshilfe-ruhestand.webp"
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[77%_center] md:object-center"
            />
            <div className="absolute inset-0 bg-slate-950/35 md:bg-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-slate-900/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex flex-col items-start bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3.5 mb-6 shadow-xl shadow-slate-950/15 ring-1 ring-white/80">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  In Zusammenarbeit mit
                </span>
                <img
                  src="/images/lebenshilfe-logo.png"
                  alt="Lebenshilfe im Kreis Pinneberg"
                  className="h-12 md:h-14 w-auto"
                />
              </div>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/25 text-white/95 text-sm font-medium px-4 py-1.5 rounded-full">
                  <Users className="w-4 h-4" />
                  Für Mitarbeitende der Lebenshilfe im Kreis Pinneberg
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-balance">
                Kurs auf einen glücklichen Ruhestand.
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl">
                Die Lebenshilfe zahlt zusätzlich 4,6 Prozent Ihres Bruttogehalts in Ihre
                betriebliche Altersvorsorge. Berechnen Sie, was bereits für Sie zurückgelegt wird,
                welcher Förder-Spielraum noch offen ist und was langfristig daraus entstehen kann.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={scrollToRechner}
                  className="bg-[#25c990] hover:bg-[#1fb17e] text-slate-900 font-semibold px-7 py-6 text-base rounded-full"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Meinen Spielraum berechnen
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById('termin')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="border-white/40 bg-transparent text-white hover:bg-white/10 px-7 py-6 text-base rounded-full"
                >
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  Termin direkt buchen
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
                <span><strong className="text-white font-semibold">4,6 %</strong> Arbeitgeberbeitrag</span>
                <span className="hidden sm:block w-px h-4 bg-white/30" aria-hidden="true" />
                <span><strong className="text-white font-semibold">2,3 %</strong> Eigenanteil</span>
                <span className="hidden sm:block w-px h-4 bg-white/30" aria-hidden="true" />
                <span>Spielraum bis <strong className="text-white font-semibold">{SV_FREI_MONAT} €</strong></span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SO FUNKTIONIERT IHR MODELL */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 border bg-teal-50 border-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                So funktioniert Ihr Modell
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Drei Bausteine, ein Ziel
              </h2>
              <p className="text-slate-600">
                Ihre betriebliche Altersvorsorge bei der Lebenshilfe besteht aus dem
                Arbeitgeberbeitrag, Ihrem Pflichtanteil und Ihrem freiwilligen Spielraum.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Building2,
                  titel: '4,6 % zahlt Ihr Arbeitgeber',
                  text: 'Die Lebenshilfe beteiligt sich mit 4,6 Prozent Ihres Bruttogehalts an Ihrer Altersvorsorge. Dieses Geld kommt zusätzlich zu Ihrem Gehalt, Sie müssen dafür nichts tun.'
                },
                {
                  icon: Coins,
                  titel: '2,3 % sind Ihr Pflichtanteil',
                  text: 'Als Eigenanteil sind 2,3 Prozent vom Brutto verpflichtend vorgesehen. Er wird direkt aus dem Bruttogehalt bespart und mindert dadurch Ihre Steuer- und Abgabenlast.'
                },
                {
                  icon: PiggyBank,
                  titel: `Ihr Spielraum bis ${SV_FREI_MONAT} €`,
                  text: `Bis zu 4 Prozent der Beitragsbemessungsgrenze (${JAHR}: ${SV_FREI_MONAT} Euro im Monat) bleibt Entgeltumwandlung sozialabgabenfrei, bis ${STEUERFREI_MONAT} Euro sogar steuerfrei. Die Differenz zu Ihrem Pflichtanteil ist Ihre persönliche Lücke.`
                }
              ].map((karte, i) => (
                <motion.div
                  key={karte.titel}
                  className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
                    <karte.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{karte.titel}</h3>
                  <p className="text-slate-600 leading-relaxed">{karte.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RECHNER */}
        <section id="rechner" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 border bg-teal-50 border-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                  <Calculator className="w-3.5 h-3.5" />
                  Ihr persönlicher Überblick
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Was steckt in Ihrem Gehalt?
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Geben Sie Ihr monatliches Bruttogehalt ein. Sie sehen sofort, was heute schon
                  fließt und wie viel Förder-Spielraum Ihnen noch bleibt.
                </p>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl">
                <label htmlFor="brutto" className="block text-sm font-medium text-white/80 mb-3">
                  Ihr monatliches Bruttogehalt
                </label>
                <div className="flex items-center gap-5 mb-2">
                  <input
                    id="brutto"
                    type="range"
                    min="1500"
                    max="9000"
                    step="50"
                    value={brutto}
                    onChange={(e) => setBrutto(Number(e.target.value))}
                    className="w-full accent-[#25c990]"
                  />
                  <div className="flex items-baseline gap-1 bg-white/10 rounded-xl px-4 py-2 min-w-[130px] justify-center">
                    <input
                      type="number"
                      min="0"
                      max="20000"
                      value={brutto}
                      onChange={(e) => setBrutto(Math.max(0, Number(e.target.value)))}
                      className="w-20 bg-transparent text-right text-xl font-bold outline-none"
                      aria-label="Bruttogehalt in Euro"
                    />
                    <span className="text-white/70">€</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <p className="text-sm text-white/70 mb-1">Arbeitgeber (4,6 %)</p>
                    <p className="text-2xl font-bold text-[#25c990]">{euro(werte.agBeitrag)} €</p>
                    <p className="text-xs text-white/50 mt-1">zahlt die Lebenshilfe monatlich</p>
                  </div>
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <p className="text-sm text-white/70 mb-1">Ihr Pflichtanteil (2,3 %)</p>
                    <p className="text-2xl font-bold">{euro(werte.pflicht)} €</p>
                    <p className="text-xs text-white/50 mt-1">aus Ihrem Brutto, läuft bereits</p>
                  </div>
                  <div className="bg-[#25c990]/15 ring-2 ring-[#25c990] rounded-2xl p-5">
                    <p className="text-sm text-white/80 mb-1">Ihr freier Spielraum</p>
                    <p className="text-2xl font-bold text-[#25c990]">{euro(werte.luecke)} €</p>
                    <p className="text-xs text-white/60 mt-1">
                      bis zur Sozialabgaben-Grenze von {SV_FREI_MONAT} €
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="laufzeit" className="text-sm text-white/80">
                        Zeit bis zur Rente
                      </label>
                      <span className="font-bold">{laufzeit} Jahre</span>
                    </div>
                    <input
                      id="laufzeit"
                      type="range"
                      min="10"
                      max="40"
                      step="1"
                      value={laufzeit}
                      onChange={(e) => setLaufzeit(Number(e.target.value))}
                      className="w-full accent-[#25c990]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMitLuecke(!mitLuecke)}
                    className={`rounded-2xl p-5 text-left transition ring-1 ${
                      mitLuecke
                        ? 'bg-[#25c990]/15 ring-[#25c990]'
                        : 'bg-white/5 ring-white/15 hover:ring-white/40'
                    }`}
                    aria-pressed={mitLuecke}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-white/85">
                        Förder-Spielraum von {euro(werte.luecke)} € zusätzlich nutzen
                      </span>
                      <span
                        className={`shrink-0 w-11 h-6 rounded-full relative transition ${
                          mitLuecke ? 'bg-[#25c990]' : 'bg-white/20'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                            mitLuecke ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </span>
                    </div>
                    <p className="text-xs text-white/55 mt-2">
                      {mitLuecke
                        ? `Gerechnet wird mit ${euro(werte.sparbeitrag)} € Gesamtbeitrag im Monat.`
                        : `Aktuell gerechnet: Ihr heutiger Beitrag von ${euro(werte.sparbeitrag)} € im Monat.`}
                    </p>
                  </button>
                </div>

                <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/15 p-5">
                  <p className="text-sm font-semibold text-white/90 mb-4">
                    Brutto und Netto: Was kostet Sie Ihr Eigenbeitrag wirklich?
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-white/70 mb-1">Eigenbeitrag aus dem Brutto</p>
                      <p className="text-2xl font-bold">{euro(werte.eigenbeitrag)} €</p>
                      <p className="text-xs text-white/50 mt-1">
                        {mitLuecke ? 'Pflichtanteil plus Spielraum' : 'Ihr Pflichtanteil (2,3 %)'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">Steuer- und Abgabenersparnis</p>
                      <p className="text-2xl font-bold text-[#25c990]">
                        − {euro(werte.ersparnis)} €
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        ca. {Math.round(werte.steuersatz * 100)} % Steuer + 20 % Sozialabgaben
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#25c990]/15 ring-2 ring-[#25c990] p-3 -m-3 sm:m-0 sm:p-3">
                      <p className="text-sm text-white/80 mb-1">Echte Netto-Kosten</p>
                      <p className="text-2xl font-bold text-[#25c990]">
                        nur ≈ {euro(werte.nettoKosten)} €
                      </p>
                      <p className="text-xs text-white/60 mt-1">im Monat, nach Ersparnis</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/85 mt-4 pt-4 border-t border-white/10">
                    Zusammen mit dem Arbeitgeberbeitrag fließen{' '}
                    <b>{euro(werte.sparbeitrag)} €</b> monatlich in Ihre Vorsorge, Sie spüren davon
                    netto nur rund <b>{euro(werte.nettoKosten)} €</b>. Das heißt:{' '}
                    <b className="text-[#25c990]">
                      Für jeden Netto-Euro arbeiten rund {werte.hebel.toFixed(1).replace('.', ',')} Euro
                    </b>{' '}
                    für Ihre Rente.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 mt-4 text-sm text-white/75">
                  <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#25c990]" />
                  <p>
                    Vereinfachte Darstellung auf Basis der Rahmenwerte {JAHR} (4 % der
                    Beitragsbemessungsgrenze = {SV_FREI_MONAT} € sozialabgabenfrei, {STEUERFREI_MONAT} €
                    steuerfrei nach § 3 Nr. 63 EStG). Die Brutto-Netto-Werte sind eine Näherung mit
                    geschätztem Grenzsteuersatz (Steuerklasse I) und rund 20 % Arbeitnehmeranteil zur
                    Sozialversicherung. Ihre tatsächlichen Werte hängen von Steuerklasse, Kirchensteuer,
                    Tarif und Vertrag ab und werden im Gespräch individuell geprüft, inklusive der
                    exakten Gegenüberstellung Ihrer Lohnabrechnung vorher und nachher.
                  </p>
                </div>
              </div>

              {/* VORHER-NACHHER */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  Vorher und nachher: Ihre {euro(werte.sparbeitrag)} € im Monat
                </h3>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
                  Identische Einzahlung über {laufzeit} Jahre ({euro(vergleich.einzahlung)} € gesamt),
                  jeweils zum Monatsende. Der einzige Unterschied: wo Ihr Geld arbeitet.
                </p>
                <div className="grid md:grid-cols-2 gap-4 items-stretch">
                  <div className="rounded-2xl border border-slate-200 bg-white p-7">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-4">
                      Vorher: heutige Lösung
                    </span>
                    <p className="text-sm text-slate-500 mb-1">
                      klassisch angelegt, rund 1 % effektiv
                    </p>
                    <p className="text-4xl font-bold text-slate-700">{euro(vergleich.heute)} €</p>
                    <p className="text-xs text-slate-400 mt-2">
                      Nach Inflation entspricht das real einem Kaufkraftverlust.
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-[#25c990] bg-teal-50/60 p-7 shadow-md">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-800 bg-[#25c990]/20 px-3 py-1 rounded-full mb-4">
                      Nachher: marktorientiert
                    </span>
                    <p className="text-sm text-slate-600 mb-1">
                      bis zu 100 % Aktien-/ETF-Quote, Modellszenario 7 % p. a.
                    </p>
                    <p className="text-4xl font-bold text-teal-800">{euro(vergleich.markt)} €</p>
                    <p className="text-xs text-slate-500 mt-2 inline-flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      im mittleren Szenario mit 5 % p. a.: {euro(vergleich.mittel)} €
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-slate-900 text-white text-center py-5 px-6">
                  <p className="text-sm text-white/70 mb-1">Unterschied im Modellvergleich</p>
                  <p className="text-3xl font-bold text-[#25c990]">
                    + {euro(vergleich.markt - vergleich.heute)} €
                  </p>
                </div>
                <p className="text-xs text-slate-400 text-center mt-4 max-w-3xl mx-auto">
                  Unverbindliche Modellrechnung ohne Steuern, Kosten und Förderungen, keine
                  Garantie und keine Prognose. Fondsgebundene Anlagen unterliegen Wertschwankungen
                  bis hin zum Verlustrisiko. Frühere Wertentwicklungen sind kein verlässlicher
                  Indikator für künftige Ergebnisse. Die Einordnung der heutigen Lösung beruht auf
                  unserer Auswertung typischer Bestandsverträge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NACHLESEN */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 border bg-teal-50 border-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                  <Info className="w-3.5 h-3.5" />
                  Zum Nachlesen
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Alles Wichtige in Ruhe erklärt
                </h2>
                <p className="text-slate-600">
                  Von der Entgeltumwandlung bis zur Besteuerung im Rentenalter: die häufigsten
                  Fragen, verständlich beantwortet.
                </p>
              </div>
              <div className="space-y-3">
                {nachleseThemen.map((item, index) => (
                  <div
                    key={item.frage}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-slate-900">{item.frage}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">{item.antwort}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA MIT DIREKTER TERMINBUCHUNG */}
        <section id="termin" className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Termin direkt hier buchen
              </h2>
              <p className="text-white/80 mb-3 leading-relaxed max-w-2xl mx-auto">
                Kein Formular, kein Unterschriftenzettel, keine Umwege: Wählen Sie einfach unten
                einen freien Termin. Wir schauen gemeinsam auf Ihren Stand: Was läuft bereits, wo
                liegt Ihr Spielraum, und wo arbeitet Ihr Geld heute? Kostenfrei und unverbindlich,
                per Telefon oder Videocall.
              </p>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl p-1 sm:p-2 mb-8">
                <iframe
                  src="https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&utm_source=lebenshilfe-lp&utm_medium=web&utm_campaign=bav-lebenshilfe"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Termin online buchen"
                  aria-label="Kalender zur Terminbuchung"
                  className="w-full h-[600px] md:h-[680px] rounded-xl"
                ></iframe>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <a href="tel:+494089755705" className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" /> 040 89755705
                </a>
                <a href="mailto:info@healio.de" className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" /> info@healio.de
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 text-xs text-white/50">
                <CheckCircle2 className="w-4 h-4" />
                Healio GmbH, Versicherungsmakler mit Erlaubnis nach § 34d GewO. Diese Seite ist
                eine allgemeine Information und ersetzt keine individuelle Beratung.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LebenshilfePage;
