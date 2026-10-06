// Sichtbare Fragen und Antworten auf /ambulant und /en/outpatient.
//
// Eine Quelle für zwei Stellen: AmbulantConversionFlow zeigt sie an, und
// scripts/seo-routes.mjs schreibt daraus das FAQ-Schema ins vorgerenderte
// HTML. Vorher stand dort eine abgeschriebene Fassung, die der Seite
// widersprach („Gibt es einen Haken? Nein.“, „15 bis 50 Euro“; Gegenprüfung
// der Marktanalyse vom 05.10.2026). Die Datei bleibt frei von JSX und
// '@/'-Pfaden, damit Node sie beim Build direkt laden kann.
//
// Fakten laut SDK-AVB Teil II AP-Tarife 1.753a, Stand 01.01.2023 (auf sdk.de
// am 06.10.2026 unverändert abrufbar): keine Wartezeiten (Abschnitt II), vier
// Töpfe je zwei Kalenderjahre ab Versicherungsbeginn ohne Anlaufstaffel,
// Sehhilfen in jeder Stufe zu 100 %, Heilpraktiker rechnen nach GebüH ab.
// Gesundheitsfragen: Die SDK lehnt grundsätzlich niemanden ab, Zuschlag oder
// einzelner Ausschluss sind möglich (Rote Linie: „ohne Ablehnung“, nie „keine
// Gesundheitsfragen“).

import { SDK_AMBULANT_BEITRAEGE } from '../../../data/sdkAmbulantBeitraege.js';

const TARIF_CODES = ['AP5', 'AP7', 'AP9', 'AP1'];
const ALLE_BEITRAEGE = SDK_AMBULANT_BEITRAEGE.gruppen.flatMap((gruppe) => TARIF_CODES.map((code) => gruppe[code]));
const formatBeitrag = (wert, locale) => new Intl.NumberFormat(locale, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(wert);
const beitragVon = (locale) => formatBeitrag(Math.min(...ALLE_BEITRAEGE), locale);
const beitragBis = (locale) => formatBeitrag(Math.max(...ALLE_BEITRAEGE), locale);

export const AMBULANT_FAQS = {
  de: [
    {
      q: 'Was steckt hinter den 3.000 EUR?',
      a: 'Die 3.000 EUR bezeichnen das mögliche Gesundheitsbudget des leistungsstärksten ambulanten Tarifs über zwei Jahre. Wie viel tatsächlich erstattet wird, hängt vom gewählten Tarif, den eingereichten Rechnungen und den Tarifbedingungen ab. Ein Kassenbonus kommt nicht obendrauf, er kann beim Beitrag helfen.',
    },
    {
      q: 'Was kostet der ambulante Schutz im Monat?',
      a: `Das hängt von deinem Alter und der Tarifstufe ab. Laut den SDK-Beiträgen (Stand ${SDK_AMBULANT_BEITRAEGE.stand}) liegt der Monatsbeitrag zwischen ${beitragVon('de-DE')} und ${beitragBis('de-DE')} EUR. Deinen eigenen Beitrag siehst du in der Tarifwahl, sobald du dein Geburtsjahr eingibst. Bei Vorerkrankungen kann ein Risikozuschlag dazukommen.`,
    },
    {
      q: 'Wie viel vom Beitrag kann mein Kassenbonus ausgleichen?',
      a: 'Ganz oder teilweise. Entscheidend sind deine Krankenkasse, deine nachgewiesenen Aktivitäten, der gewählte Tarif und die anrechenbaren Kosten. KassenBoost berechnet deshalb deinen realistisch erreichbaren Bonus und stellt ihn dem Beitrag gegenüber.',
    },
    {
      q: 'Muss ich für den Zusatzschutz die Krankenkasse wechseln?',
      a: 'Nein. Zusatzversicherung und gesetzliche Krankenkasse sind zwei getrennte Entscheidungen. Du kannst zuerst den Schutz wählen und danach mit KassenBoost prüfen, ob eine andere Krankenkasse finanziell besser dazu passt.',
    },
    {
      q: 'Gibt es eine Wartezeit?',
      a: 'Nein, die dargestellten ambulanten Tarife haben keine allgemeine Wartezeit. Versicherungsschutz besteht für neue Versicherungsfälle ab dem vereinbarten Beginn im Rahmen der Tarifbedingungen. Behandlungen, die vor Beginn schon laufen oder angeraten sind, bleiben ausgenommen.',
    },
    {
      q: 'Muss ich Gesundheitsfragen beantworten?',
      a: 'Ja, im Antrag beantwortest du Gesundheitsfragen vollständig und wahrheitsgemäß. Abgelehnt wirst du deshalb grundsätzlich nicht, auch nicht mit Vorerkrankungen. Je nach Angaben kann ein Risikozuschlag dazukommen, in Einzelfällen auch ein Ausschluss für eine bestimmte Erkrankung.',
    },
    {
      q: 'Was passiert nach dem Klick auf den Rechner?',
      a: 'Du wechselst in den digitalen Tarifrechner unseres Produktpartners. Dort gibst du dein Alter ein, vergleichst die Tarifstufen und siehst den persönlichen Beitrag, bevor du einen Antrag stellst.',
    },
    {
      q: 'Wie verteilen sich die Budgets auf die Leistungen?',
      a: 'Jede Tarifstufe hat vier eigene Höchstbeträge für Sehhilfen, Naturheilverfahren, Vorsorge und gesetzliche Zuzahlungen, jeweils für zwei Kalenderjahre ab Versicherungsbeginn. Eine Anlaufstaffel gibt es nicht. Beginnt dein Vertrag im Laufe des Jahres, ist der erste Zeitraum kürzer. Die genaue Aufteilung siehst du direkt in unserem Budget-Ledger; maßgeblich bleiben die Tarifbedingungen.',
    },
    {
      q: 'Sind Heilpraktiker und Osteopathie mitversichert?',
      a: 'Beide Bereiche werden über den Topf für Naturheilverfahren berücksichtigt. Heilpraktiker rechnen dafür nach dem Gebührenverzeichnis für Heilpraktiker (GebüH) ab. Welche Behandlung und welcher Rechnungsbetrag erstattungsfähig sind, richtet sich nach der gewählten Tarifstufe und den Tarifbedingungen.',
    },
    {
      q: 'Was gilt für Brille und Kontaktlinsen?',
      a: 'Dafür gibt es in jeder Tarifstufe einen eigenen Sehhilfen-Topf von 200 bis 500 EUR je zwei Kalenderjahre. Brille und Kontaktlinsen erstattet der Tarif in jeder Stufe zu 100 %, bis die Grenze des Topfs erreicht ist.',
    },
    {
      q: 'Kann mein Kassenbonus den Beitrag komplett ausgleichen?',
      a: 'Das ist kein garantierter Tarifpreis. Ja, wenn dein anerkannter Kassenbonus mindestens so hoch ist wie dein Jahresbeitrag. Dann bleibt dir vom Beitrag nichts übrig. Kasse, Aktivitäten, Tarif und Bonusbedingungen bestimmen das Ergebnis.',
    },
  ],
  en: [
    { q: 'What is behind the EUR 3,000?', a: 'EUR 3,000 is the potential two-year health budget in the strongest outpatient tier. Actual reimbursement depends on the chosen plan, eligible invoices and policy terms. An insurer bonus does not come on top, it can help with the premium.' },
    { q: 'What does outpatient cover cost per month?', a: `That depends on your age and the tier. According to the SDK premiums (as of ${SDK_AMBULANT_BEITRAEGE.stand}), the monthly premium ranges from EUR ${beitragVon('en-GB')} to EUR ${beitragBis('en-GB')}. You see your own premium in the tier selection once you enter your year of birth. Pre-existing conditions may add a risk surcharge.` },
    { q: 'How much of the premium can my insurer bonus offset?', a: 'All or part of it. Your insurer, verified activities, selected plan and eligible costs determine the result. KassenBoost compares your realistically achievable bonus with the premium.' },
    { q: 'Do I have to switch statutory insurer?', a: 'No. Supplementary cover and statutory insurance are separate decisions. Choose cover first, then use KassenBoost to check whether another insurer is a better financial match.' },
    { q: 'Is there a waiting period?', a: 'No, the displayed outpatient plans have no general waiting period. Cover applies to new insured events from the agreed start under the applicable terms. Treatment that is already under way or recommended before the start remains excluded.' },
    { q: 'Do I have to answer health questions?', a: 'Yes, you answer health questions in the application fully and truthfully. As a rule, this does not lead to a rejection, even with pre-existing conditions. Depending on your answers, a risk surcharge may apply, and in individual cases an exclusion for a specific condition.' },
    { q: 'What happens after I open the calculator?', a: 'You continue to the digital calculator of our product partner, enter your age, compare the tiers and see your personal premium before applying. The calculator is in German.' },
    { q: 'How is the budget divided?', a: 'Each tariff has four separate maximums for vision aids, natural therapies, prevention and statutory co-payments, each for two calendar years from the policy start. There is no ramp-up period. If your policy starts during the year, the first period is shorter. The ledger shows the exact split; the policy terms remain decisive.' },
    { q: 'Are alternative practitioners and osteopathy covered?', a: 'Both are considered under the natural-therapies pot. Alternative practitioners bill under the German fee schedule for Heilpraktiker (GebüH). Eligible treatments and invoice amounts depend on the selected tariff and policy terms.' },
    { q: 'What applies to glasses and contact lenses?', a: 'Each tariff has a separate vision-aid pot of EUR 200 to EUR 500 per two calendar years. Glasses and contact lenses are reimbursed at 100% in every tier until the pot is used up.' },
    { q: 'Can my insurer bonus offset the premium completely?', a: 'This is not a guaranteed tariff price. Yes, if your recognised insurer bonus is at least as high as your annual premium. Then none of the premium is left for you to pay. Insurer, activities, tariff and bonus terms determine the result.' },
  ],
};
