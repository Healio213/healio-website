import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe2,
  Headphones,
  Info,
  Languages,
  HelpCircle,
  Sparkles,
  TrendingUp,
  CalendarCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import SEOHead from '@/components/SEOHead';

// Beispielseite für die Mitarbeiter von Fallen Anker (Hamburg), Stand 19.11.2026.
// Noindex, nirgends verlinkt, nicht in der Sitemap. Texte bewusst in der Seite,
// damit die globalen i18n-Dateien unberührt bleiben.

// Rahmenwerte 2026 (jährlich prüfen), wie auf /lebenshilfe
const AG_SATZ = 0.04; // Arbeitgeberbeitrag: 4 % vom Brutto
const SV_FREI_MONAT = 338; // 4 % der BBG (allg. Rentenversicherung) 2026 pro Monat, AG-Beitrag wird angerechnet
const JAHR = 2026;
const TERMIN_URL = 'https://healio.de/termin';

const SZENARIEN = [
  { zins: 0.007, key: 'old' },
  { zins: 0.04, key: 'model' },
  { zins: 0.06, key: 'model' },
  { zins: 0.08, key: 'model' }
];

const euro = (wert) =>
  new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(Math.round(wert));

const prozent = (wert) =>
  `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(wert * 100)} %`;

// FV = B × ((1 + r/12)^(12·n) − 1) / (r/12), Einzahlung zum Monatsende
const endkapital = (monatlich, zinsProJahr, jahre) => {
  const i = zinsProJahr / 12;
  const n = jahre * 12;
  if (i === 0) return monatlich * n;
  return monatlich * ((Math.pow(1 + i, n) - 1) / i);
};

// Jahresangabe mit passender Mehrzahl je Sprache
const jahreText = (lang, n) => {
  if (lang === 'en') return `${n} ${n === 1 ? 'year' : 'years'}`;
  if (lang === 'tr') return `${n} yıl`;
  if (lang === 'pl') {
    if (n === 1) return '1 rok';
    const m10 = n % 10;
    const m100 = n % 100;
    return `${n} ${m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'lata' : 'lat'}`;
  }
  return `${n} ${n === 1 ? 'Jahr' : 'Jahre'}`;
};

// Platzhalter {key} durch hervorgehobene Werte ersetzen
const mitWerten = (text, werte, className) =>
  text.split(/(\{[a-z]+\})/).map((teil, i) => {
    const key = teil.match(/^\{([a-z]+)\}$/)?.[1];
    return key && key in werte ? (
      <strong key={i} className={className}>{werte[key]}</strong>
    ) : (
      <React.Fragment key={i}>{teil}</React.Fragment>
    );
  });

const kurzEuro = (wert) =>
  wert >= 1000 ? `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(wert / 1000)} T` : euro(wert);

const SPRACHEN = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'pl', label: 'Polski' }
];

const TEXTE = {
  de: {
    badge: 'Beispielseite für Fallen Anker',
    h1: 'Dein Arbeitgeber zahlt jeden Monat für deine Rente ein. Weißt du, wie viel?',
    intro: 'Hier siehst du in einer Minute, was du schon hast. Und was du selbst noch tun kannst, wenn du möchtest.',
    ctaCalc: 'Jetzt ausrechnen',
    ctaAdvice: 'Beratung anfragen',
    langLabel: 'Sprache wählen',
    moreLangs: 'Weitere Sprachen nach Wunsch.',
    stepsBadge: 'Kurz erklärt',
    stepsTitle: 'So funktioniert es in 3 Schritten',
    steps: [
      {
        title: 'Dein Arbeitgeber zahlt 4 %',
        text: 'Jeden Monat zahlt dein Arbeitgeber 4 % von deinem Bruttolohn in deine Betriebsrente. Das Geld kommt zusätzlich zu deinem Lohn. Du musst dafür nichts tun.'
      },
      {
        title: 'Du kannst etwas dazulegen',
        text: 'Wenn du möchtest, legst du selbst etwas dazu. Das Geld geht direkt von deinem Bruttolohn ab. So zahlst du darauf weniger Steuern und Abgaben.'
      },
      {
        title: 'Die Zeit arbeitet für dich',
        text: 'Dein Geld wird angelegt und kann wachsen. Auch der Zuwachs wächst dann weiter. Über viele Jahre macht die Verzinsung den größten Unterschied.'
      }
    ],
    whyBadge: 'Für dich erklärt',
    whyTitle: 'Was die Betriebsrente für dich tut',
    why: [
      { title: 'Eine zweite Rente', text: 'Später bekommst du die gesetzliche Rente. Die Betriebsrente kommt obendrauf. So hast du im Alter mehr Geld zur Verfügung.' },
      { title: 'Du musst nichts tun', text: 'Dein Arbeitgeber zahlt jeden Monat ein, zusätzlich zu deinem Lohn. Auf deinem Lohnzettel siehst du dafür keinen Abzug.' },
      { title: 'Das Geld gehört dir', text: 'Der Vertrag läuft auf deinen Namen. Was eingezahlt wurde, wächst über die Jahre weiter.' },
      { title: 'Du kannst mehr daraus machen', text: 'Wenn du selbst etwas dazulegst, geht das direkt vom Bruttolohn ab. Dadurch zahlst du weniger Steuern und Abgaben. Netto fehlt dir weniger, als du einzahlst.' },
      { title: 'Im Alter', text: 'Du bekommst das Geld als monatliche Rente oder auf einmal, je nach Vertrag. Ehrlich dazu: Dann fallen Steuern und Beiträge zur Kranken- und Pflegeversicherung an.' }
    ],
    whyExampleLabel: 'Ein Beispiel',
    whyExample: 'Du verdienst 3.200 EUR brutto im Monat. Dann zahlt dein Arbeitgeber 128 EUR im Monat für dich ein, das sind 1.536 EUR im Jahr, ohne dass du etwas tun musst.',
    grossNote: 'Bruttolohn heißt: dein Lohn vor Steuern und Abgaben.',
    calcBadge: 'Dein Rechner',
    calcTitle: 'Rechne selbst nach',
    calcSub: 'Gib deinen Bruttolohn ein. Du siehst sofort, was dein Arbeitgeber zahlt.',
    grossLabel: 'Dein Bruttolohn im Monat',
    grossAria: 'Bruttolohn in Euro',
    yearsLabel: 'Wie viele Jahre noch bis zur Rente?',
    yearsUnit: 'Jahre',
    employerLabel: 'Das zahlt dein Arbeitgeber',
    employerHint: '4 % von deinem Bruttolohn, jeden Monat',
    ownLabel: 'So viel kannst du selbst noch dazulegen',
    ownHint: 'Möglich sind 0 bis {max} EUR im Monat. Bis zu dieser Grenze zahlst du auf deinen Beitrag keine Steuern und keine Sozialabgaben.',
    ownNone: 'Mit diesem Lohn ist die Grenze schon durch den Beitrag deines Arbeitgebers erreicht.',
    limitNote: 'Die Grenze liegt {jahr} bei {grenze} EUR im Monat für alles zusammen. Der Beitrag deines Arbeitgebers zählt mit.',
    perMonth: 'im Monat',
    totalLabel: 'Zusammen fließen jeden Monat in deine Rente',
    ziBadge: 'Zinseszins',
    ziTitle: 'Zinseszins: Dein Geld arbeitet für dich',
    ziText: 'Du bekommst Zinsen auf dein Geld. Im nächsten Jahr bekommst du auch Zinsen auf diese Zinsen. Darum wächst es am Ende immer schneller.',
    ziRateLabel: 'Wähle eine Verzinsung im Jahr',
    ziKey: 'Von {ende} hast du {einzahlung} eingezahlt. {zuwachs} kommen aus Zinsen und Zinseszins.',
    ziEndLabel: 'Guthaben nach {jahre} Jahren',
    ziLegendPaid: 'Eingezahlt',
    ziLegendGain: 'Zinsen und Zinseszins',
    ziAxisYears: 'Jahre',
    ziChartAria: 'Diagramm: So wächst dein Guthaben über {jt} bei {zins} im Jahr.',
    ziValuesToggle: 'Werte als Text anzeigen',
    ziValuesRow: 'Nach {jahr} Jahren: {wert} EUR, davon eingezahlt {einzahlung} EUR',
    earlyTitle: 'Früh anfangen lohnt sich',
    earlyText: 'Gleiche Rate von {rate} EUR im Monat, gleiche Verzinsung. Nur der Start ist anders.',
    earlyNow: 'Heute anfangen ({jt})',
    earlyLater: '10 Jahre später anfangen ({jt})',
    earlyDiff: 'So viel mehr bringt dir der frühe Start',
    cardsTitle: 'Alle Beispiele im Überblick',
    cardsHint: 'Tippe auf eine Karte, dann siehst du sie im Diagramm.',
    rateNote: 'Die Prozentwerte sind Beispiele für eine mögliche jährliche Wertentwicklung, keine festen Zinsen.',
    scenTitle: 'So kann dein Guthaben wachsen',
    scenSub: 'Gleiche Einzahlung, {jt} lang. Nur die Verzinsung ist anders.',
    perYear: 'im Jahr',
    tagOld: 'klassischer Altvertrag, Beispiel',
    tagModel: 'Modellrechnung',
    paidIn: 'Eingezahlt',
    endValue: 'Mögliches Guthaben am Ende',
    swipeHint: 'Wische zur Seite für mehr Beispiele.',
    disclaimer: 'Unverbindliche Modellrechnung, keine Zusage. Bei Anlagen am Aktienmarkt schwankt der Wert, auch Verluste sind möglich. Frühere Wertentwicklungen sagen nichts Verlässliches über die Zukunft. Betriebsrenten sind in der Auszahlung zu versteuern, es fallen Beiträge zur Kranken- und Pflegeversicherung an.',
    askBadge: 'Beispiel, geplante Leistung',
    askTitle: 'Fragen? Frag einfach.',
    askText: 'Bald kannst du anrufen und mit einem Telefonassistenten sprechen. Der Assistent arbeitet mit künstlicher Intelligenz (KI). Er spricht deine Sprache und ist rund um die Uhr für dich da. Du kannst ihn alles zur Betriebsrente fragen.',
    askPoints: ['In deiner Sprache', 'Rund um die Uhr', 'Alle Fragen zur Betriebsrente'],
    askNote: 'So könnte es aussehen. Die Telefonnummer bekommst du, sobald der Dienst startet.',
    baTitle: 'Dein Vorher und Nachher',
    baText: 'In einer persönlichen Beratung schauen wir uns deine Unterlagen gemeinsam an. Du siehst auf den Cent genau, was du heute hast und was möglich wäre. Danach entscheidest du in Ruhe.',
    beforeTitle: 'Vorher: Das hast du heute',
    beforePoints: ['Was zahlt dein Arbeitgeber schon ein?', 'Wie ist dein Geld heute angelegt?', 'Was bekommst du später davon?'],
    afterTitle: 'Nachher: Das wäre möglich',
    afterPoints: ['Was bringt ein eigener Beitrag?', 'Was bleibt dir netto im Monat?', 'Was wäre am Ende möglich?'],
    baButton: 'Beratung anfragen',
    baNote: 'Die Beratung kostet dich nichts.',
    faqTitle: 'Häufige Fragen',
    faq: [
      {
        q: 'Was ist eine Betriebsrente?',
        a: 'Eine Betriebsrente ist eine Rente über deinen Arbeitgeber, zusätzlich zur gesetzlichen Rente. Während du arbeitest, wird für dich eingezahlt. Wie das genau funktioniert, steht weiter oben auf dieser Seite.'
      },
      {
        q: 'Kostet mich das etwas?',
        a: 'Nein. Den Beitrag von 4 % zahlt dein Arbeitgeber. Nur wenn du selbst etwas dazulegst, geht das von deinem Bruttolohn ab. Die Beratung ist für dich kostenlos.'
      },
      {
        q: 'Was passiert, wenn ich den Arbeitgeber wechsle?',
        a: 'Was du selbst eingezahlt hast, bleibt immer deins. Die Beiträge deines Arbeitgebers gehören dir in der Regel nach drei Jahren fest. Den Vertrag kannst du oft zum neuen Arbeitgeber mitnehmen oder bis zur Rente ruhen lassen.'
      },
      {
        q: 'Was ist mit Steuern?',
        a: 'Während du arbeitest, sind Beiträge bis zur Grenze frei von Steuern und Sozialabgaben. Steuern zahlst du erst später, wenn das Geld in der Rente ausgezahlt wird. Dann fallen auch Beiträge zur Kranken- und Pflegeversicherung an.'
      },
      {
        q: 'Muss ich selbst etwas einzahlen?',
        a: 'Nein. Der Beitrag deines Arbeitgebers fließt auch dann, wenn du nichts dazulegst. Ein eigener Beitrag ist freiwillig. Du entscheidest selbst, ob und wie viel.'
      }
    ],
    footer: 'Beispielseite der Healio GmbH, Hamburg',
    footerNote: 'Diese Seite ist eine allgemeine Information und ersetzt keine persönliche Beratung.',
    imprint: 'Impressum',
    privacy: 'Datenschutz'
  },
  en: {
    badge: 'Example page for Fallen Anker',
    h1: 'Your employer pays into your pension every month. Do you know how much?',
    intro: 'Here you can see in one minute what you already have. And what you can do yourself, if you want to.',
    ctaCalc: 'Calculate now',
    ctaAdvice: 'Ask for advice',
    langLabel: 'Choose language',
    moreLangs: 'More languages on request.',
    stepsBadge: 'In short',
    stepsTitle: 'How it works in 3 steps',
    steps: [
      {
        title: 'Your employer pays 4 %',
        text: 'Every month, your employer pays 4 % of your gross pay into your company pension. This money comes on top of your wages. You do not have to do anything for it.'
      },
      {
        title: 'You can add more',
        text: 'If you like, you can add some money yourself. It is taken straight from your gross pay. That way you pay less tax and fewer deductions on it.'
      },
      {
        title: 'Time works for you',
        text: 'Your money is invested and can grow. The growth then keeps growing too. Over many years, the rate of return makes the biggest difference.'
      }
    ],
    whyBadge: 'Explained for you',
    whyTitle: 'What your company pension does for you',
    why: [
      { title: 'A second pension', text: 'Later on you will get your state pension. Your company pension comes on top. So you have more money when you are older.' },
      { title: 'You do not have to do anything', text: 'Your employer pays in every month, on top of your wages. You will not see anything taken off your payslip for it.' },
      { title: 'The money is yours', text: 'The contract is in your name. What has been paid in keeps growing over the years.' },
      { title: 'You can make more of it', text: 'If you add something yourself, it comes straight out of your gross pay. That means you pay less tax and fewer deductions. Your take-home pay goes down by less than you pay in.' },
      { title: 'When you retire', text: 'You get the money as a monthly pension or all at once, depending on the contract. To be honest: tax and contributions to health and long-term care insurance are due then.' }
    ],
    whyExampleLabel: 'An example',
    whyExample: 'You earn 3.200 EUR gross a month. Your employer then pays 128 EUR a month for you. That is 1.536 EUR a year, without you having to do anything.',
    grossNote: 'Gross pay means your pay before tax and deductions.',
    calcBadge: 'Your calculator',
    calcTitle: 'Do the maths yourself',
    calcSub: 'Enter your gross pay. You will see right away what your employer pays.',
    grossLabel: 'Your gross pay per month',
    grossAria: 'Gross pay in euros',
    yearsLabel: 'How many years until you retire?',
    yearsUnit: 'years',
    employerLabel: 'What your employer pays',
    employerHint: '4 % of your gross pay, every month',
    ownLabel: 'How much you can add yourself',
    ownHint: 'Anything from 0 to {max} EUR a month. Up to this limit, you pay no tax and no social security contributions on it.',
    ownNone: 'With this pay, your employer’s contribution already reaches the limit.',
    limitNote: 'In {jahr} the limit is {grenze} EUR a month for everything together. Your employer’s contribution counts towards it.',
    perMonth: 'a month',
    totalLabel: 'Going into your pension every month in total',
    ziBadge: 'Compound interest',
    ziTitle: 'Compound interest: your money works for you',
    ziText: 'You get interest on your money. The next year, you also get interest on that interest. That is why it grows faster and faster in the end.',
    ziRateLabel: 'Choose a yearly rate',
    ziKey: 'Of {ende}, you paid in {einzahlung}. {zuwachs} come from interest and compound interest.',
    ziEndLabel: 'Savings after {jahre} years',
    ziLegendPaid: 'Paid in',
    ziLegendGain: 'Interest and compound interest',
    ziAxisYears: 'Years',
    ziChartAria: 'Chart: how your savings grow over {jt} at {zins} a year.',
    ziValuesToggle: 'Show values as text',
    ziValuesRow: 'After {jahr} years: {wert} EUR, of which {einzahlung} EUR paid in',
    earlyTitle: 'Starting early pays off',
    earlyText: 'Same {rate} EUR a month, same rate. Only the start is different.',
    earlyNow: 'Start today ({jt})',
    earlyLater: 'Start 10 years later ({jt})',
    earlyDiff: 'This is how much more an early start gives you',
    cardsTitle: 'All examples at a glance',
    cardsHint: 'Tap a card to see it in the chart.',
    rateNote: 'The percentages are examples of possible yearly growth, not fixed interest rates.',
    scenTitle: 'How your savings could grow',
    scenSub: 'Same payment for {jt}. Only the rate is different.',
    perYear: 'a year',
    tagOld: 'classic old contract, example',
    tagModel: 'model calculation',
    paidIn: 'Paid in',
    endValue: 'Possible amount at the end',
    swipeHint: 'Swipe sideways for more examples.',
    disclaimer: 'Non-binding model calculation, not a promise. With stock market investments the value goes up and down, and losses are possible. Past performance tells you nothing reliable about the future. Company pensions are taxed when they are paid out, and contributions to health and long-term care insurance apply.',
    askBadge: 'Example, planned service',
    askTitle: 'Questions? Just ask.',
    askText: 'Soon you will be able to call and talk to a phone assistant. The assistant uses artificial intelligence (AI). It speaks your language and is there for you day and night. You can ask it anything about your company pension.',
    askPoints: ['In your language', 'Day and night', 'All questions about your company pension'],
    askNote: 'This is how it could look. You will get the phone number as soon as the service starts.',
    baTitle: 'Your before and after',
    baText: 'In a personal meeting we look at your documents together. You see down to the cent what you have today and what would be possible. Then you decide in your own time.',
    beforeTitle: 'Before: what you have today',
    beforePoints: ['What does your employer already pay in?', 'How is your money invested today?', 'What will you get from it later?'],
    afterTitle: 'After: what would be possible',
    afterPoints: ['What does your own contribution add?', 'What is left of your take-home pay?', 'What would be possible at the end?'],
    baButton: 'Ask for advice',
    baNote: 'The advice is free for you.',
    faqTitle: 'Common questions',
    faq: [
      {
        q: 'What is a company pension?',
        a: 'A company pension is a pension through your employer, on top of your state pension. While you work, money is paid in for you. You can read how it works further up on this page.'
      },
      {
        q: 'Does it cost me anything?',
        a: 'No. Your employer pays the 4 % contribution. Only if you add something yourself does it come out of your gross pay. The advice is free for you.'
      },
      {
        q: 'What happens if I change jobs?',
        a: 'What you paid in yourself always stays yours. Your employer’s contributions usually become fully yours after three years. You can often take the contract to your new employer or let it rest until you retire.'
      },
      {
        q: 'What about taxes?',
        a: 'While you work, contributions up to the limit are free of tax and social security contributions. You only pay tax later, when the money is paid out in retirement. Contributions to health and long-term care insurance are due then as well.'
      },
      {
        q: 'Do I have to pay in myself?',
        a: 'No. Your employer’s contribution is paid even if you add nothing. Your own contribution is voluntary. You decide whether to add something and how much.'
      }
    ],
    footer: 'Example page by Healio GmbH, Hamburg',
    footerNote: 'This page is general information and does not replace personal advice.',
    imprint: 'Legal notice',
    privacy: 'Privacy'
  },
  tr: {
    badge: 'Fallen Anker için örnek sayfa',
    h1: 'İşverenin her ay emekliliğin için para yatırıyor. Ne kadar olduğunu biliyor musun?',
    intro: 'Burada bir dakikada neye sahip olduğunu görürsün. İstersen kendin neler yapabileceğini de.',
    ctaCalc: 'Hemen hesapla',
    ctaAdvice: 'Danışmanlık iste',
    langLabel: 'Dil seç',
    moreLangs: 'İstersen başka diller de eklenebilir.',
    stepsBadge: 'Kısaca',
    stepsTitle: '3 adımda nasıl işliyor',
    steps: [
      {
        title: 'İşverenin %4 ödüyor',
        text: 'İşverenin her ay brüt maaşının %4’ünü işyeri emeklilik planına (Betriebsrente) yatırıyor. Bu para maaşına ek olarak gelir. Bunun için bir şey yapmana gerek yok.'
      },
      {
        title: 'Sen de ekleyebilirsin',
        text: 'İstersen kendin de bir miktar ekleyebilirsin. Bu para doğrudan brüt maaşından kesilir. Böylece bu tutar için daha az vergi ve kesinti ödersin.'
      },
      {
        title: 'Zaman senin için çalışır',
        text: 'Paran yatırıma yönlendirilir ve büyüyebilir. Büyüyen kısım da büyümeye devam eder. Uzun yıllar içinde en büyük farkı getiri oranı yaratır.'
      }
    ],
    whyBadge: 'Senin için açıkladık',
    whyTitle: 'İşyeri emekliliği senin için ne yapar',
    why: [
      { title: 'İkinci bir emeklilik', text: 'İleride devlet emekliliğini alacaksın. İşyeri emekliliği bunun üstüne gelir. Böylece yaşlılıkta elinde daha fazla para olur.' },
      { title: 'Bir şey yapmana gerek yok', text: 'İşverenin her ay maaşına ek olarak para yatırır. Maaş bordronda bunun için bir kesinti görmezsin.' },
      { title: 'Para senindir', text: 'Sözleşme senin adına yapılır. Yatırılan para yıllar içinde büyümeye devam eder.' },
      { title: 'Daha fazlasını yapabilirsin', text: 'Kendin bir miktar eklersen, bu tutar doğrudan brüt maaşından kesilir. Böylece daha az vergi ve kesinti ödersin. Net maaşından, yatırdığın tutardan daha azı eksilir.' },
      { title: 'Emeklilikte', text: 'Parayı sözleşmeye göre aylık emekli maaşı olarak ya da bir seferde alırsın. Açıkça söyleyelim: O zaman vergi ile sağlık ve bakım sigortası primleri ödenir.' }
    ],
    whyExampleLabel: 'Bir örnek',
    whyExample: 'Ayda 3.200 EUR brüt kazanıyorsun. O zaman işverenin senin için ayda 128 EUR yatırır. Bu, yılda 1.536 EUR eder ve senin bir şey yapmana gerek yoktur.',
    grossNote: 'Brüt maaş, vergiler ve kesintilerden önceki maaşındır.',
    calcBadge: 'Hesaplayıcın',
    calcTitle: 'Kendin hesapla',
    calcSub: 'Brüt maaşını gir. İşvereninin ne kadar ödediğini hemen görürsün.',
    grossLabel: 'Aylık brüt maaşın',
    grossAria: 'Euro olarak brüt maaş',
    yearsLabel: 'Emekliliğe kaç yıl kaldı?',
    yearsUnit: 'yıl',
    employerLabel: 'İşvereninin ödediği',
    employerHint: 'Her ay brüt maaşının %4’ü',
    ownLabel: 'Kendin daha ne kadar ekleyebilirsin',
    ownHint: 'Ayda 0 ile {max} EUR arası mümkün. Bu sınıra kadar katkın için vergi ve sosyal sigorta primi ödemezsin.',
    ownNone: 'Bu maaşla sınıra işvereninin katkısıyla zaten ulaşılıyor.',
    limitNote: '{jahr} yılında bu sınır, hepsi birlikte ayda {grenze} EUR. İşvereninin katkısı da buna dahil.',
    perMonth: 'ayda',
    totalLabel: 'Her ay emekliliğine giden toplam',
    ziBadge: 'Bileşik faiz',
    ziTitle: 'Bileşik faiz: Paran senin için çalışır',
    ziText: 'Paran için faiz alırsın. Ertesi yıl bu faizin de faizini alırsın. Bu yüzden paran sonunda giderek daha hızlı büyür.',
    ziRateLabel: 'Yıllık bir oran seç',
    ziKey: 'Toplam {ende}. Bunun {einzahlung} kısmını sen yatırdın. {zuwachs} faiz ve bileşik faizden gelir.',
    ziEndLabel: '{jahre} yıl sonra birikim',
    ziLegendPaid: 'Yatırılan',
    ziLegendGain: 'Faiz ve bileşik faiz',
    ziAxisYears: 'Yıl',
    ziChartAria: 'Grafik: Birikimin yıllık {zins} ile {jt} içinde böyle büyür.',
    ziValuesToggle: 'Değerleri metin olarak göster',
    ziValuesRow: '{jahr} yıl sonra: {wert} EUR, bunun {einzahlung} EUR kısmı yatırılan',
    earlyTitle: 'Erken başlamak kazandırır',
    earlyText: 'Ayda aynı {rate} EUR, aynı oran. Sadece başlangıç farklı.',
    earlyNow: 'Bugün başla ({jt})',
    earlyLater: '10 yıl sonra başla ({jt})',
    earlyDiff: 'Erken başlamak sana bu kadar fazlasını getirir',
    cardsTitle: 'Tüm örnekler bir bakışta',
    cardsHint: 'Grafikte görmek için bir karta dokun.',
    rateNote: 'Yüzde değerleri, olası bir yıllık değer artışı için örneklerdir, sabit faiz değildir.',
    scenTitle: 'Birikimin böyle büyüyebilir',
    scenSub: '{jt} boyunca aynı ödeme. Sadece oran farklı.',
    perYear: 'yıllık',
    tagOld: 'klasik eski sözleşme, örnek',
    tagModel: 'model hesaplama',
    paidIn: 'Yatırılan',
    endValue: 'Sonunda olası birikim',
    swipeHint: 'Daha fazla örnek için yana kaydır.',
    disclaimer: 'Bağlayıcı olmayan bir model hesaplamadır, bir taahhüt değildir. Borsadaki yatırımlarda değer iner ve çıkar, kayıplar da mümkündür. Geçmişteki getiriler gelecek hakkında güvenilir bir bilgi vermez. İşyeri emeklilik ödemeleri ödeme sırasında vergilendirilir, ayrıca sağlık ve bakım sigortası primleri kesilir.',
    askBadge: 'Örnek, planlanan hizmet',
    askTitle: 'Soruların mı var? Hemen sor.',
    askText: 'Yakında arayıp bir telefon asistanıyla konuşabileceksin. Asistan yapay zekâ (YZ) ile çalışır. Senin dilini konuşur ve günün her saatinde yanındadır. İşyeri emekliliği hakkında ona her şeyi sorabilirsin.',
    askPoints: ['Kendi dilinde', 'Günün her saatinde', 'İşyeri emekliliğiyle ilgili tüm sorular'],
    askNote: 'Böyle görünebilir. Hizmet başlar başlamaz telefon numarasını alacaksın.',
    baTitle: 'Senin öncen ve sonran',
    baText: 'Kişisel bir görüşmede belgelerine birlikte bakarız. Bugün neye sahip olduğunu ve neyin mümkün olduğunu kuruşu kuruşuna görürsün. Sonra acele etmeden karar verirsin.',
    beforeTitle: 'Önce: bugün sahip oldukların',
    beforePoints: ['İşverenin şimdiden ne kadar yatırıyor?', 'Paran bugün nasıl değerlendiriliyor?', 'İleride bundan ne alacaksın?'],
    afterTitle: 'Sonra: mümkün olanlar',
    afterPoints: ['Kendi katkın ne kazandırır?', 'Ayda net olarak sana ne kalır?', 'Sonunda ne mümkün olurdu?'],
    baButton: 'Danışmanlık iste',
    baNote: 'Danışmanlık senin için ücretsiz.',
    faqTitle: 'Sık sorulan sorular',
    faq: [
      {
        q: 'İşyeri emekliliği (Betriebsrente) nedir?',
        a: 'İşyeri emekliliği, devlet emekliliğine ek olarak işverenin üzerinden yapılan bir emekliliktir. Sen çalışırken senin için para yatırılır. Nasıl işlediğini bu sayfanın yukarısında okuyabilirsin.'
      },
      {
        q: 'Bunun bana bir maliyeti var mı?',
        a: 'Hayır. %4’lük katkıyı işverenin öder. Sadece kendin bir miktar eklersen, bu tutar brüt maaşından kesilir. Danışmanlık senin için ücretsiz.'
      },
      {
        q: 'İşverenimi değiştirirsem ne olur?',
        a: 'Kendi yatırdığın para her zaman senindir. İşvereninin katkıları da genellikle üç yıl sonra kalıcı olarak senin olur. Sözleşmeyi çoğu zaman yeni işverenine götürebilir ya da emekliliğe kadar bekletebilirsin.'
      },
      {
        q: 'Vergiler ne olacak?',
        a: 'Çalıştığın sürece sınıra kadar olan katkılar vergiden ve sosyal sigorta priminden muaftır. Vergiyi ancak daha sonra, para emeklilikte ödenirken ödersin. O zaman sağlık ve bakım sigortası primleri de kesilir.'
      },
      {
        q: 'Kendim para yatırmak zorunda mıyım?',
        a: 'Hayır. İşvereninin katkısı, sen bir şey eklemesen de yatırılır. Kendi katkın tamamen isteğe bağlıdır. Ekleyip eklemeyeceğine ve ne kadar ekleyeceğine sen karar verirsin.'
      }
    ],
    footer: 'Healio GmbH’nin örnek sayfası, Hamburg',
    footerNote: 'Bu sayfa genel bilgi içindir ve kişisel danışmanlığın yerini tutmaz.',
    imprint: 'Künye (Impressum)',
    privacy: 'Gizlilik (Datenschutz)'
  },
  pl: {
    badge: 'Przykładowa strona dla Fallen Anker',
    h1: 'Twój pracodawca co miesiąc wpłaca pieniądze na twoją emeryturę. Wiesz, ile?',
    intro: 'Tutaj w minutę zobaczysz, co już masz. I co możesz zrobić sam, jeśli chcesz.',
    ctaCalc: 'Oblicz teraz',
    ctaAdvice: 'Poproś o doradztwo',
    langLabel: 'Wybierz język',
    moreLangs: 'Inne języki na życzenie.',
    stepsBadge: 'W skrócie',
    stepsTitle: 'Jak to działa, w 3 krokach',
    steps: [
      {
        title: 'Pracodawca wpłaca 4 %',
        text: 'Co miesiąc twój pracodawca wpłaca 4 % twojego wynagrodzenia brutto na twoją emeryturę pracowniczą (Betriebsrente). To pieniądze dodatkowo do twojej pensji. Nie musisz nic robić.'
      },
      {
        title: 'Możesz coś dołożyć',
        text: 'Jeśli chcesz, możesz sam coś dołożyć. Pieniądze są pobierane od razu z wynagrodzenia brutto. Dzięki temu płacisz od nich mniej podatków i składek.'
      },
      {
        title: 'Czas pracuje dla ciebie',
        text: 'Twoje pieniądze są inwestowane i mogą rosnąć. Przyrost też dalej rośnie. Przez wiele lat największą różnicę robi oprocentowanie.'
      }
    ],
    whyBadge: 'Wyjaśniamy dla ciebie',
    whyTitle: 'Co daje ci emerytura pracownicza',
    why: [
      { title: 'Druga emerytura', text: 'Później dostaniesz emeryturę państwową. Emerytura pracownicza dochodzi do niej dodatkowo. Dzięki temu na starość masz więcej pieniędzy.' },
      { title: 'Nie musisz nic robić', text: 'Twój pracodawca co miesiąc wpłaca pieniądze, dodatkowo do twojej pensji. Na pasku wypłaty nie zobaczysz z tego powodu żadnego potrącenia.' },
      { title: 'Pieniądze należą do ciebie', text: 'Umowa jest zawarta na twoje nazwisko. To, co zostało wpłacone, dalej rośnie przez lata.' },
      { title: 'Możesz zrobić z tego więcej', text: 'Jeśli dołożysz coś sam, kwota jest pobierana od razu z wynagrodzenia brutto. Dzięki temu płacisz mniej podatków i składek. Netto brakuje ci mniej, niż wpłacasz.' },
      { title: 'Na emeryturze', text: 'Dostajesz pieniądze co miesiąc albo jednorazowo, zależnie od umowy. Uczciwie mówiąc: wtedy płaci się podatek i składki na ubezpieczenie zdrowotne i pielęgnacyjne.' }
    ],
    whyExampleLabel: 'Przykład',
    whyExample: 'Zarabiasz 3.200 EUR brutto miesięcznie. Wtedy twój pracodawca wpłaca za ciebie 128 EUR miesięcznie, czyli 1.536 EUR rocznie, a ty nie musisz nic robić.',
    grossNote: 'Brutto to twoje wynagrodzenie przed podatkami i składkami.',
    calcBadge: 'Twój kalkulator',
    calcTitle: 'Policz sam',
    calcSub: 'Wpisz swoje wynagrodzenie brutto. Od razu zobaczysz, ile płaci twój pracodawca.',
    grossLabel: 'Twoje wynagrodzenie brutto miesięcznie',
    grossAria: 'Wynagrodzenie brutto w euro',
    yearsLabel: 'Ile lat zostało ci do emerytury?',
    yearsUnit: 'lat',
    employerLabel: 'Tyle płaci twój pracodawca',
    employerHint: '4 % twojego brutto, co miesiąc',
    ownLabel: 'Tyle możesz jeszcze dołożyć sam',
    ownHint: 'Możliwe od 0 do {max} EUR miesięcznie. Do tej granicy nie płacisz od swojej wpłaty podatku ani składek na ubezpieczenia społeczne.',
    ownNone: 'Przy tym wynagrodzeniu granicę osiąga już sama wpłata pracodawcy.',
    limitNote: 'W {jahr} roku granica wynosi {grenze} EUR miesięcznie łącznie. Wpłata pracodawcy też się do niej wlicza.',
    perMonth: 'miesięcznie',
    totalLabel: 'Razem co miesiąc na twoją emeryturę',
    ziBadge: 'Procent składany',
    ziTitle: 'Procent składany: twoje pieniądze pracują dla ciebie',
    ziText: 'Dostajesz odsetki od swoich pieniędzy. W kolejnym roku dostajesz też odsetki od tych odsetek. Dlatego na końcu pieniądze rosną coraz szybciej.',
    ziRateLabel: 'Wybierz roczne oprocentowanie',
    ziKey: 'Z {ende} wpłaciłeś {einzahlung}. {zuwachs} pochodzi z odsetek i procentu składanego.',
    ziEndLabel: 'Kapitał po {jahre} latach',
    ziLegendPaid: 'Wpłacono',
    ziLegendGain: 'Odsetki i procent składany',
    ziAxisYears: 'Lata',
    ziChartAria: 'Wykres: tak rośnie twój kapitał przez {jt} przy {zins} rocznie.',
    ziValuesToggle: 'Pokaż wartości jako tekst',
    ziValuesRow: 'Po {jahr} latach: {wert} EUR, w tym wpłacono {einzahlung} EUR',
    earlyTitle: 'Wczesny start się opłaca',
    earlyText: 'Ta sama wpłata {rate} EUR miesięcznie, to samo oprocentowanie. Różni się tylko start.',
    earlyNow: 'Start dziś ({jt})',
    earlyLater: 'Start 10 lat później ({jt})',
    earlyDiff: 'Tyle więcej daje ci wczesny start',
    cardsTitle: 'Wszystkie przykłady w skrócie',
    cardsHint: 'Dotknij karty, aby zobaczyć ją na wykresie.',
    rateNote: 'Wartości procentowe to przykłady możliwego rocznego wzrostu wartości, a nie stałe odsetki.',
    scenTitle: 'Tak może rosnąć twój kapitał',
    scenSub: 'Ta sama wpłata przez {jt}. Różni się tylko oprocentowanie.',
    perYear: 'rocznie',
    tagOld: 'klasyczna stara umowa, przykład',
    tagModel: 'obliczenie modelowe',
    paidIn: 'Wpłacono',
    endValue: 'Możliwy kapitał na końcu',
    swipeHint: 'Przesuń w bok, aby zobaczyć więcej przykładów.',
    disclaimer: 'Niewiążące obliczenie modelowe, a nie obietnica. Przy inwestycjach na giełdzie wartość się waha, możliwe są też straty. Wcześniejsze wyniki nie mówią nic wiarygodnego o przyszłości. Emerytura pracownicza podlega opodatkowaniu przy wypłacie, pobierane są też składki na ubezpieczenie zdrowotne i pielęgnacyjne.',
    askBadge: 'Przykład, usługa planowana',
    askTitle: 'Pytania? Po prostu zapytaj.',
    askText: 'Wkrótce będziesz mógł zadzwonić i porozmawiać z asystentem telefonicznym. Asystent działa dzięki sztucznej inteligencji (AI). Mówi w twoim języku i jest dostępny przez całą dobę. Możesz go zapytać o wszystko, co dotyczy emerytury pracowniczej.',
    askPoints: ['W twoim języku', 'Przez całą dobę', 'Wszystkie pytania o emeryturę pracowniczą'],
    askNote: 'Tak mogłoby to wyglądać. Numer telefonu dostaniesz, gdy tylko usługa ruszy.',
    baTitle: 'Twoje przed i po',
    baText: 'Na osobistej rozmowie wspólnie przeglądamy twoje dokumenty. Zobaczysz co do centa, co masz dziś i co byłoby możliwe. Potem spokojnie decydujesz.',
    beforeTitle: 'Przed: to masz dziś',
    beforePoints: ['Ile pracodawca już wpłaca?', 'Jak dziś inwestowane są twoje pieniądze?', 'Ile dostaniesz z tego później?'],
    afterTitle: 'Po: to byłoby możliwe',
    afterPoints: ['Co daje twoja własna wpłata?', 'Ile zostaje ci netto co miesiąc?', 'Co byłoby możliwe na końcu?'],
    baButton: 'Poproś o doradztwo',
    baNote: 'Doradztwo jest dla ciebie bezpłatne.',
    faqTitle: 'Częste pytania',
    faq: [
      {
        q: 'Czym jest emerytura pracownicza (Betriebsrente)?',
        a: 'To emerytura przez twojego pracodawcę, dodatkowo do emerytury państwowej. W czasie pracy wpłacane są za ciebie pieniądze. Jak to działa, przeczytasz wyżej na tej stronie.'
      },
      {
        q: 'Czy to mnie coś kosztuje?',
        a: 'Nie. Wpłatę 4 % płaci twój pracodawca. Tylko jeśli dołożysz coś sam, kwota jest pobierana z wynagrodzenia brutto. Doradztwo jest dla ciebie bezpłatne.'
      },
      {
        q: 'Co się stanie, gdy zmienię pracodawcę?',
        a: 'To, co wpłaciłeś sam, zawsze należy do ciebie. Wpłaty pracodawcy zwykle po trzech latach też stają się na stałe twoje. Umowę często możesz zabrać do nowego pracodawcy albo zostawić ją bez wpłat aż do emerytury.'
      },
      {
        q: 'A co z podatkami?',
        a: 'W czasie pracy wpłaty do granicy są wolne od podatku i składek na ubezpieczenia społeczne. Podatek płacisz dopiero później, przy wypłacie na emeryturze. Wtedy pobierane są też składki na ubezpieczenie zdrowotne i pielęgnacyjne.'
      },
      {
        q: 'Czy muszę sam coś wpłacać?',
        a: 'Nie. Wpłata pracodawcy płynie także wtedy, gdy ty nic nie dokładasz. Własna wpłata jest dobrowolna. Sam decydujesz, czy i ile dołożysz.'
      }
    ],
    footer: 'Przykładowa strona Healio GmbH, Hamburg',
    footerNote: 'Ta strona jest ogólną informacją i nie zastępuje osobistego doradztwa.',
    imprint: 'Impressum',
    privacy: 'Ochrona danych'
  }
};

const fuelle = (text, werte) =>
  Object.entries(werte).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), text);

const SectionBadge = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2 border bg-healio-light border-home-mint/20 text-healio-primary-dark text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
    <Icon className="w-3.5 h-3.5" />
    {children}
  </div>
);

const FallenAnkerPage = () => {
  const [lang, setLang] = useState('de');
  const [brutto, setBrutto] = useState(3200);
  const [laufzeit, setLaufzeit] = useState(25);
  const [eigen, setEigen] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [zinsIndex, setZinsIndex] = useState(2);
  const t = TEXTE[lang];

  const werte = useMemo(() => {
    const lohn = Math.min(20000, Math.max(0, Number(brutto) || 0));
    const agBeitrag = lohn * AG_SATZ;
    // Grenze 4 % BBG gilt für alles zusammen, AG-Beitrag wird angerechnet
    const maxEigen = Math.max(0, Math.floor(SV_FREI_MONAT - agBeitrag));
    const eigenbeitrag = Math.min(eigen, maxEigen);
    const gesamt = agBeitrag + eigenbeitrag;
    return { agBeitrag, maxEigen, eigenbeitrag, gesamt };
  }, [brutto, eigen]);

  const szenarien = useMemo(
    () =>
      SZENARIEN.map((s) => ({
        ...s,
        eingezahlt: werte.gesamt * 12 * laufzeit,
        ende: endkapital(werte.gesamt, s.zins, laufzeit)
      })),
    [werte.gesamt, laufzeit]
  );

  const gewaehlt = SZENARIEN[zinsIndex];
  const verlauf = useMemo(() => {
    const punkte = [];
    for (let jahr = 0; jahr <= laufzeit; jahr += 1) {
      const eingezahlt = werte.gesamt * 12 * jahr;
      const wert = endkapital(werte.gesamt, gewaehlt.zins, jahr);
      punkte.push({ jahr, eingezahlt: Math.round(eingezahlt), zuwachs: Math.round(wert - eingezahlt), wert });
    }
    return punkte;
  }, [werte.gesamt, gewaehlt.zins, laufzeit]);
  const ergebnis = verlauf[verlauf.length - 1];
  const spaeter = laufzeit > 10 ? endkapital(werte.gesamt, gewaehlt.zins, laufzeit - 10) : null;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const isEn = lang === 'en';

  return (
    <>
      <SEOHead
        title="Beispielseite Betriebsrente für Fallen Anker | Healio"
        description="Beispielseite zur betrieblichen Altersvorsorge für Mitarbeiter in der Pflege: Arbeitgeberbeitrag, eigener Beitrag und Modellrechnung."
        canonicalUrl="https://healio.de/fallen-anker"
        robots="noindex, nofollow"
      />

      <main lang={lang} className="bg-white overflow-hidden w-full" data-testid="fallen-anker-page">
        {/* KOPF */}
        <section className="relative text-white pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-home-midnight via-[#06131c] to-[#0b2a22]">
          <div className="absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full bg-[#25c990]/15 blur-3xl" aria-hidden="true" />
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/25 text-white/95 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-[#25c990]" />
                  {t.badge}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-balance">
                  {t.h1}
                </h1>
                <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl">{t.intro}</p>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => scrollTo('rechner')}
                    className="inline-flex items-center bg-[#25c990] hover:bg-[#1fb17e] text-slate-900 font-semibold px-7 py-4 text-base rounded-full"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    {t.ctaCalc}
                  </button>
                  <a
                    href={TERMIN_URL}
                    className="inline-flex items-center border border-white/40 text-white hover:bg-white/10 px-7 py-4 text-base rounded-full"
                  >
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    {t.ctaAdvice}
                  </a>
                </div>
              </div>

              {/* SPRACHUMSCHALTER */}
              <div className="w-full lg:w-72 rounded-2xl bg-white/10 ring-1 ring-white/25 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <Languages className="w-5 h-5 text-[#25c990]" />
                  {t.langLabel}
                </p>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label={t.langLabel}>
                  {SPRACHEN.map((s) => (
                    <button
                      key={s.code}
                      type="button"
                      lang={s.code}
                      onClick={() => setLang(s.code)}
                      aria-pressed={lang === s.code}
                      data-lang={s.code}
                      className={`rounded-xl px-3 py-2.5 text-base font-semibold transition ${
                        lang === s.code
                          ? 'bg-[#25c990] text-slate-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-white/70 mt-3">{t.moreLangs}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 SCHRITTE */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionBadge icon={Info}>{t.stepsBadge}</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.stepsTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {t.steps.map((schritt, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#25c990] text-slate-900 text-lg font-bold mb-5">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{schritt.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{schritt.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 mt-8">{t.grossNote}</p>
          </div>
        </section>

        {/* WAS DIE BETRIEBSRENTE FÜR DICH TUT */}
        <section className="py-16 lg:py-24 bg-healio-light/50" data-testid="fa-why">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionBadge icon={Sparkles}>{t.whyBadge}</SectionBadge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-balance">{t.whyTitle}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {t.why.map((block) => (
                <div key={block.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-[#25c990]" />
                    {block.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{block.text}</p>
                </div>
              ))}
              <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#25c990] mb-2">{t.whyExampleLabel}</p>
                <p className="leading-relaxed text-white/90" data-testid="fa-why-beispiel">{t.whyExample}</p>
              </div>
            </div>
          </div>
        </section>

        {/* RECHNER */}
        <section id="rechner" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <SectionBadge icon={Calculator}>{t.calcBadge}</SectionBadge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.calcTitle}</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">{t.calcSub}</p>
              </div>

              <div className="bg-slate-900 rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <label htmlFor="fa-brutto" className="block text-sm font-medium text-white/85 mb-3">
                      {t.grossLabel}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        id="fa-brutto"
                        type="range"
                        min="1000"
                        max="8000"
                        step="50"
                        value={Math.min(8000, Math.max(1000, Number(brutto) || 0))}
                        onChange={(e) => setBrutto(Number(e.target.value))}
                        className="w-full min-w-0 accent-[#25c990]"
                      />
                      <div className="flex items-baseline gap-1 bg-white/10 rounded-xl px-3 py-2 shrink-0">
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          max="20000"
                          value={brutto}
                          onChange={(e) => setBrutto(Math.max(0, Number(e.target.value)))}
                          className="w-20 bg-transparent text-right text-xl font-bold outline-none"
                          aria-label={t.grossAria}
                          data-testid="fa-brutto-input"
                        />
                        <span className="text-white/70 text-sm">EUR</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <label htmlFor="fa-laufzeit" className="text-sm font-medium text-white/85">
                        {t.yearsLabel}
                      </label>
                      <span className="font-bold text-xl whitespace-nowrap" data-testid="fa-laufzeit-wert">
                        {jahreText(lang, laufzeit)}
                      </span>
                    </div>
                    <input
                      id="fa-laufzeit"
                      type="range"
                      min="5"
                      max="45"
                      step="1"
                      value={laufzeit}
                      onChange={(e) => setLaufzeit(Number(e.target.value))}
                      className="w-full accent-[#25c990]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-[#25c990]/15 ring-2 ring-[#25c990] rounded-2xl p-5">
                    <p className="text-sm text-white/85 mb-1">{t.employerLabel}</p>
                    <p className="text-3xl font-bold text-[#25c990]" data-testid="fa-ag">
                      {euro(werte.agBeitrag)} EUR <span className="text-base font-medium text-white/70">{t.perMonth}</span>
                    </p>
                    <p className="text-sm text-white/65 mt-1">{t.employerHint}</p>
                  </div>
                  <div className="bg-white/5 ring-1 ring-white/15 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <label htmlFor="fa-eigen" className="text-sm text-white/85">{t.ownLabel}</label>
                      <span className="text-xl font-bold whitespace-nowrap" data-testid="fa-eigen-wert">
                        {euro(werte.eigenbeitrag)} EUR
                      </span>
                    </div>
                    <input
                      id="fa-eigen"
                      type="range"
                      min="0"
                      max={werte.maxEigen}
                      step="1"
                      value={werte.eigenbeitrag}
                      disabled={werte.maxEigen === 0}
                      onChange={(e) => setEigen(Number(e.target.value))}
                      className="w-full accent-[#25c990]"
                    />
                    <p className="text-sm text-white/65 mt-2">
                      {werte.maxEigen > 0 ? fuelle(t.ownHint, { max: euro(werte.maxEigen) }) : t.ownNone}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/15 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-white/85">{t.totalLabel}</p>
                  <p className="text-3xl font-bold text-[#25c990]" data-testid="fa-gesamt">
                    {euro(werte.gesamt)} EUR
                  </p>
                </div>
                <p className="text-sm text-white/60 mt-3 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#25c990]" />
                  {fuelle(t.limitNote, { jahr: JAHR, grenze: SV_FREI_MONAT })}
                </p>
              </div>

              {/* ZINSESZINS (nutzt die Eingaben des Rechners) */}
              <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm" data-testid="fa-zinseszins">
                <div className="text-center max-w-2xl mx-auto">
                  <SectionBadge icon={TrendingUp}>{t.ziBadge}</SectionBadge>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-balance">{t.ziTitle}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.ziText}</p>
                </div>

                <p className="text-sm font-medium text-slate-700 mt-8 mb-3 text-center">{t.ziRateLabel}</p>
                <div className="grid grid-cols-4 gap-2 max-w-md mx-auto" role="group" aria-label={t.ziRateLabel}>
                  {SZENARIEN.map((s, i) => (
                    <button
                      key={s.zins}
                      type="button"
                      onClick={() => setZinsIndex(i)}
                      aria-pressed={zinsIndex === i}
                      data-zins={i}
                      className={`rounded-xl px-2 py-3 text-base font-bold whitespace-nowrap transition ${
                        zinsIndex === i
                          ? 'bg-[#25c990] text-slate-900 shadow'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {prozent(s.zins)}
                    </button>
                  ))}
                </div>

                <p className="text-lg md:text-2xl text-slate-700 leading-snug text-center max-w-3xl mx-auto mt-8" data-testid="fa-zi-aussage">
                  {mitWerten(
                    t.ziKey,
                    {
                      ende: `${euro(ergebnis.wert)}\u00a0EUR`,
                      einzahlung: `${euro(ergebnis.eingezahlt)}\u00a0EUR`,
                      zuwachs: `${euro(ergebnis.wert - ergebnis.eingezahlt)}\u00a0EUR`
                    },
                    'font-bold text-slate-900 whitespace-nowrap'
                  )}
                </p>

                <div className="grid lg:grid-cols-[1fr_15rem] gap-6 mt-8 items-center">
                  <div
                    role="img"
                    aria-label={fuelle(t.ziChartAria, { jt: jahreText(lang, laufzeit), zins: prozent(gewaehlt.zins) })}
                    className="min-w-0"
                  >
                    <p className="text-xs text-slate-500 mb-1" aria-hidden="true">EUR</p>
                    <div className="h-64 sm:h-80" data-testid="fa-zi-diagramm">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={verlauf} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis
                            dataKey="jahr"
                            ticks={verlauf.filter((p) => p.jahr % 5 === 0).map((p) => p.jahr)}
                            tickLine={false}
                            axisLine={{ stroke: '#cbd5e1' }}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                          />
                          <YAxis
                            tickFormatter={kurzEuro}
                            tickLine={false}
                            axisLine={false}
                            width={52}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="eingezahlt"
                            stackId="1"
                            stroke="#94a3b8"
                            fill="#cbd5e1"
                            fillOpacity={0.9}
                            isAnimationActive={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="zuwachs"
                            stackId="1"
                            stroke="#1fb17e"
                            fill="#25c990"
                            fillOpacity={0.75}
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-500 text-right mt-1" aria-hidden="true">{t.ziAxisYears}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 text-white p-5">
                    <p className="text-sm text-white/75">{fuelle(t.ziEndLabel, { jahre: laufzeit })}</p>
                    <p className="text-3xl font-bold text-[#25c990] mb-4 whitespace-nowrap" data-testid="fa-zi-ende">
                      {euro(ergebnis.wert)} EUR
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-3 h-3 rounded-sm bg-[#cbd5e1] shrink-0" aria-hidden="true" />
                        <span>
                          {t.ziLegendPaid}
                          <br />
                          <strong className="text-base" data-testid="fa-zi-einzahlung">{euro(ergebnis.eingezahlt)} EUR</strong>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-3 h-3 rounded-sm bg-[#25c990] shrink-0" aria-hidden="true" />
                        <span>
                          {t.ziLegendGain}
                          <br />
                          <strong className="text-base" data-testid="fa-zi-zuwachs">
                            {euro(ergebnis.wert - ergebnis.eingezahlt)} EUR
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <details className="mt-4 text-sm text-slate-600">
                  <summary className="cursor-pointer font-medium text-healio-primary-dark">{t.ziValuesToggle}</summary>
                  <ul className="mt-2 space-y-1">
                    {verlauf
                      .filter((p) => p.jahr > 0 && (p.jahr % 5 === 0 || p.jahr === laufzeit))
                      .map((p) => (
                        <li key={p.jahr}>
                          {fuelle(t.ziValuesRow, { jahr: p.jahr, wert: euro(p.wert), einzahlung: euro(p.eingezahlt) })}
                        </li>
                      ))}
                  </ul>
                </details>

                {spaeter !== null && (
                  <div className="mt-8 rounded-2xl bg-healio-light/60 border border-home-mint/30 p-5 sm:p-6" data-testid="fa-frueh">
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{t.earlyTitle}</h4>
                    <p className="text-slate-600 mb-5">{fuelle(t.earlyText, { rate: euro(werte.gesamt) })}</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="rounded-xl bg-white border border-slate-200 p-4">
                        <p className="text-sm text-slate-500">{fuelle(t.earlyNow, { jt: jahreText(lang, laufzeit) })}</p>
                        <p className="text-2xl font-bold text-slate-900 whitespace-nowrap" data-testid="fa-frueh-heute">
                          {euro(ergebnis.wert)} EUR
                        </p>
                      </div>
                      <div className="rounded-xl bg-white border border-slate-200 p-4">
                        <p className="text-sm text-slate-500">{fuelle(t.earlyLater, { jt: jahreText(lang, laufzeit - 10) })}</p>
                        <p className="text-2xl font-bold text-slate-700 whitespace-nowrap" data-testid="fa-frueh-spaeter">
                          {euro(spaeter)} EUR
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-900 text-white p-4">
                        <p className="text-sm text-white/75">{t.earlyDiff}</p>
                        <p className="text-2xl font-bold text-[#25c990] whitespace-nowrap" data-testid="fa-frueh-diff">
                          + {euro(ergebnis.wert - spaeter)} EUR
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ALLE BEISPIELE (Karte wählt die Kurve) */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">{t.cardsTitle}</h3>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
                  {fuelle(t.scenSub, { jt: jahreText(lang, laufzeit) })} {t.cardsHint}
                </p>
                <div
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
                  data-testid="fa-szenarien"
                >
                  {szenarien.map((s, i) => {
                    const aktiv = i === zinsIndex;
                    return (
                      <button
                        type="button"
                        key={s.zins}
                        onClick={() => setZinsIndex(i)}
                        aria-pressed={aktiv}
                        className={`text-left snap-start shrink-0 w-[78%] sm:w-[45%] md:w-auto rounded-2xl p-6 transition ${
                          aktiv
                            ? 'border-2 border-[#25c990] bg-healio-light/60 shadow-md'
                            : 'border border-slate-200 bg-white hover:border-slate-300'
                        }`}
                        data-testid={`fa-szenario-${i}`}
                      >
                        <p className="text-3xl font-bold text-slate-900">{prozent(s.zins)}</p>
                        <p className="text-sm text-slate-500 mb-4">{t.perYear}</p>
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${
                            s.key === 'old' ? 'bg-slate-100 text-slate-600' : 'bg-[#25c990]/20 text-healio-primary-dark'
                          }`}
                        >
                          {s.key === 'old' ? t.tagOld : t.tagModel}
                        </span>
                        <p className="text-sm text-slate-500">{t.paidIn}</p>
                        <p className="text-lg font-semibold text-slate-700 mb-3" data-testid="fa-eingezahlt">
                          {euro(s.eingezahlt)} EUR
                        </p>
                        <p className="text-sm text-slate-500">{t.endValue}</p>
                        <p
                          className={`text-2xl font-bold ${aktiv ? 'text-healio-primary-dark' : 'text-slate-900'}`}
                          data-testid="fa-ende"
                        >
                          {euro(s.ende)} EUR
                        </p>
                      </button>
                    );
                  })}
                </div>
                <p className="md:hidden text-center text-sm text-slate-500 mt-2">{t.swipeHint}</p>
                <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5 text-healio-primary-dark" />
                  <div className="text-base text-slate-700 leading-relaxed space-y-2" data-testid="fa-hinweis">
                    <p>{t.disclaimer}</p>
                    <p>{t.rateNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FRAGEN: TELEFONASSISTENT */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-5">
                  {t.askBadge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.askTitle}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{t.askText}</p>
                <p className="text-sm text-slate-500">{t.askNote}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl">
                <Headphones className="w-10 h-10 text-[#25c990] mb-5" />
                <ul className="space-y-4">
                  {t.askPoints.map((punkt, i) => {
                    const Icon = [Globe2, Clock, HelpCircle][i];
                    return (
                      <li key={punkt} className="flex items-center gap-3 text-lg">
                        <Icon className="w-5 h-5 shrink-0 text-[#25c990]" />
                        {punkt}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* VORHER UND NACHHER */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-home-midnight via-[#06131c] to-home-midnight text-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.baTitle}</h2>
              <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">{t.baText}</p>
              <div className="grid md:grid-cols-2 gap-4 text-left mb-10">
                <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 p-6">
                  <p className="font-semibold text-white mb-4">{t.beforeTitle}</p>
                  <ul className="space-y-2 text-white/75">
                    {t.beforePoints.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl bg-[#25c990]/15 ring-2 ring-[#25c990] p-6">
                  <p className="font-semibold text-[#25c990] mb-4">{t.afterTitle}</p>
                  <ul className="space-y-2 text-white/85">
                    {t.afterPoints.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
              <a
                href={TERMIN_URL}
                className="inline-flex items-center bg-[#25c990] hover:bg-[#1fb17e] text-slate-900 font-semibold px-8 py-4 text-base rounded-full"
                data-testid="fa-beratung"
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                {t.baButton}
              </a>
              <p className="text-sm text-white/60 mt-4">{t.baNote}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{t.faqTitle}</h2>
              <div className="space-y-3">
                {t.faq.map((item, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-slate-900">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FUSS */}
        <section className="py-10 bg-slate-100 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
            <p className="font-semibold text-slate-800">{t.footer}</p>
            <p className="text-sm text-slate-500 mt-1">{t.footerNote}</p>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <Link to={isEn ? '/en/legal-notice' : '/impressum'} className="text-healio-primary-dark underline">
                {t.imprint}
              </Link>
              <Link to={isEn ? '/en/privacy' : '/datenschutz'} className="text-healio-primary-dark underline">
                {t.privacy}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FallenAnkerPage;
