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
      a: 'Die 3.000 EUR sind die Summe aus vier getrennten Erstattungsbudgets im leistungsstärksten SDK-Tarif AP1 über zwei Kalenderjahre: 1.000 EUR für Naturheilverfahren, 500 EUR für Sehhilfen, 500 EUR für Vorsorge, Impfungen und anerkannte Präventionskurse sowie 1.000 EUR für Hilfsmittel und gesetzliche Zuzahlungen. Es ist kein frei verfügbares Guthaben. Wie viel erstattet wird, hängt von den versicherten Rechnungen und Tarifbedingungen ab. Ein Kassenbonus kann beim Beitrag helfen.',
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
      a: 'Die SDK-AP-Tarife und der freiwillige UKV-Baustein VorsorgePRIVAT haben keine allgemeine Wartezeit. Versicherungsschutz besteht ab dem vereinbarten Beginn im Rahmen der Tarifbedingungen; bereits laufende oder angeratene Behandlungen sind dadurch nicht automatisch versichert. Für den getrennten Alternativweg ARAG V100 gilt eine allgemeine Wartezeit von drei Monaten.',
    },
    {
      q: 'Muss ich Gesundheitsfragen beantworten?',
      a: 'Bei der SDK beantwortest du Gesundheitsfragen vollständig und wahrheitsgemäß. Abgelehnt wirst du deshalb grundsätzlich nicht, auch nicht mit Vorerkrankungen. Je nach Angaben kann ein Risikozuschlag dazukommen, in Einzelfällen auch ein Ausschluss für eine bestimmte Erkrankung. Beim freiwilligen UKV-Baustein fragt der Antrag nach Sehhilfe und Gehör. ARAG V100 lehnt wegen Vorerkrankungen nicht ab, prüft aber vorhandenen oder beantragten gleichartigen Schutz.',
    },
    {
      q: 'Was passiert nach dem Klick auf den Rechner?',
      a: 'Vor dem externen Rechner gibst du einmal pro Sitzung deinen Vornamen und deine E-Mail-Adresse ein, damit wir dir den Kassenbonus-Leitfaden einmalig per E-Mail senden können. Danach öffnet sich der Rechner in einem neuen Tab. Dort vergleichst du die Tarifstufen, siehst den persönlichen Beitrag und beantwortest die Antragsfragen, bevor du einen Antrag stellst.',
    },
    {
      q: 'Wie verteilen sich die Budgets auf die Leistungen?',
      a: 'Jede SDK-Tarifstufe hat vier eigene Höchstbeträge: Sehhilfen, Naturheilverfahren, Vorsorge mit Impfungen und anerkannten Präventionskursen sowie Hilfsmittel mit gesetzlichen Zuzahlungen. Jeder Topf gilt für zwei Kalenderjahre ab Versicherungsbeginn. Eine Anlaufstaffel gibt es nicht. Beginnt dein Vertrag im Laufe des Jahres, ist der erste Zeitraum kürzer. Die genaue Aufteilung siehst du in der Budgetübersicht; maßgeblich bleiben die Tarifbedingungen.',
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
    { q: 'What is behind the EUR 3,000?', a: 'EUR 3,000 is the sum of four separate reimbursement budgets in the strongest SDK tier, AP1, over two calendar years: EUR 1,000 for natural therapies, EUR 500 for vision aids, EUR 500 for screening, vaccinations and approved prevention courses, and EUR 1,000 for medical aids and statutory co-payments. It is not freely available cash. Reimbursement depends on insured invoices and policy terms. A statutory insurer bonus can help with the premium.' },
    { q: 'What does outpatient cover cost per month?', a: `That depends on your age and the tier. According to the SDK premiums (as of ${SDK_AMBULANT_BEITRAEGE.stand}), the monthly premium ranges from EUR ${beitragVon('en-GB')} to EUR ${beitragBis('en-GB')}. You see your own premium in the tier selection once you enter your year of birth. Pre-existing conditions may add a risk surcharge.` },
    { q: 'How much of the premium can my insurer bonus offset?', a: 'All or part of it. Your insurer, verified activities, selected plan and eligible costs determine the result. KassenBoost compares your realistically achievable bonus with the premium.' },
    { q: 'Do I have to switch statutory insurer?', a: 'No. Supplementary cover and statutory insurance are separate decisions. Choose cover first, then use KassenBoost to check whether another insurer is a better financial match.' },
    { q: 'Is there a waiting period?', a: 'SDK AP plans and the optional UKV VorsorgePRIVAT add-on have no general waiting period. Cover applies from the agreed start under the applicable terms; treatment already under way or recommended is not automatically covered. The separate ARAG V100 alternative has a general waiting period of three months.' },
    { q: 'Do I have to answer health questions?', a: 'For SDK, you answer health questions fully and truthfully. As a rule, this does not lead to a rejection, even with pre-existing conditions. Depending on your answers, a risk surcharge may apply, and in individual cases an exclusion for a specific condition. The optional UKV add-on asks about vision aids and hearing. ARAG V100 has no health questions but asks about existing or applied-for equivalent cover.' },
    { q: 'What happens after I open the calculator?', a: 'Before opening the external calculator, you enter your first name and email once per session so we can email you the statutory health bonus guide once. The calculator then opens in a new tab. There you compare tiers, see your personal premium and answer the application questions before applying. The insurer’s application is in German.' },
    { q: 'How is the budget divided?', a: 'Each SDK tariff has four separate maximums: vision aids, natural therapies, screening with vaccinations and approved prevention courses, and medical aids with statutory co-payments. Each pot covers two calendar years from the policy start. There is no ramp-up period. If your policy starts during the year, the first period is shorter. The budget overview shows the exact split; policy terms remain decisive.' },
    { q: 'Are alternative practitioners and osteopathy covered?', a: 'Both are considered under the natural-therapies pot. Alternative practitioners bill under the German fee schedule for Heilpraktiker (GebüH). Eligible treatments and invoice amounts depend on the selected tariff and policy terms.' },
    { q: 'What applies to glasses and contact lenses?', a: 'Each tariff has a separate vision-aid pot of EUR 200 to EUR 500 per two calendar years. Glasses and contact lenses are reimbursed at 100% in every tier until the pot is used up.' },
    { q: 'Can my insurer bonus offset the premium completely?', a: 'This is not a guaranteed tariff price. Yes, if your recognised insurer bonus is at least as high as your annual premium. Then none of the premium is left for you to pay. Insurer, activities, tariff and bonus terms determine the result.' },
  ],
};
