import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ChevronDown,
  Clock,
  Globe2,
  Headphones,
  Info,
  Languages,
  HelpCircle,
  Sparkles,
  CalendarCheck
} from 'lucide-react';
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
    scenTitle: 'So kann dein Guthaben wachsen',
    scenSub: 'Gleiche Einzahlung, {jahre} Jahre lang. Nur die Verzinsung ist anders.',
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
        a: 'Eine Betriebsrente ist eine Rente zusätzlich zur gesetzlichen Rente. Während du arbeitest, zahlt dein Arbeitgeber ein, und wenn du möchtest, auch du. Im Rentenalter bekommst du das Geld als monatliche Rente oder auf einmal, je nach Vertrag.'
      },
      {
        q: 'Kostet mich das etwas?',
        a: 'Den Beitrag von 4 % zahlt dein Arbeitgeber. Das kostet dich nichts. Wenn du selbst etwas dazulegst, geht das von deinem Bruttolohn ab. Weil du darauf weniger Steuern und Abgaben zahlst, sinkt dein Nettolohn weniger, als du einzahlst.'
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
    scenTitle: 'How your savings could grow',
    scenSub: 'Same payment for {jahre} years. Only the rate of return is different.',
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
        a: 'A company pension is paid on top of your state pension. While you work, your employer pays in, and you can too if you want. When you retire, you get the money as a monthly pension or all at once, depending on the contract.'
      },
      {
        q: 'Does it cost me anything?',
        a: 'Your employer pays the 4 % contribution. It costs you nothing. If you add money yourself, it comes out of your gross pay. Because you pay less tax and fewer deductions on it, your take-home pay goes down by less than you pay in.'
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
    scenTitle: 'Birikimin böyle büyüyebilir',
    scenSub: '{jahre} yıl boyunca aynı ödeme. Sadece getiri oranı farklı.',
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
        a: 'Devlet emekliliğine ek olarak ödenen bir emekliliktir. Sen çalışırken işverenin para yatırır, istersen sen de yatırabilirsin. Emekli olunca bu parayı sözleşmeye göre aylık emekli maaşı olarak ya da bir seferde alırsın.'
      },
      {
        q: 'Bunun bana bir maliyeti var mı?',
        a: '%4’lük katkıyı işverenin öder. Bu sana hiçbir şeye mal olmaz. Kendin bir miktar eklersen, bu tutar brüt maaşından kesilir. Bu tutar için daha az vergi ve kesinti ödediğin için net maaşın, yatırdığın tutardan daha az düşer.'
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
    scenTitle: 'Tak może rosnąć twój kapitał',
    scenSub: 'Ta sama wpłata przez {jahre} lat. Różni się tylko oprocentowanie.',
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
        a: 'To emerytura dodatkowa do emerytury państwowej. W czasie pracy wpłaca na nią twój pracodawca, a jeśli chcesz, także ty. Na emeryturze dostajesz te pieniądze co miesiąc albo jednorazowo, zależnie od umowy.'
      },
      {
        q: 'Czy to mnie coś kosztuje?',
        a: 'Wpłatę 4 % płaci twój pracodawca. To nic cię nie kosztuje. Jeśli dołożysz coś sam, kwota jest pobierana z wynagrodzenia brutto. Ponieważ płacisz od niej mniej podatków i składek, twoja pensja netto spada mniej, niż wynosi wpłata.'
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
                        {laufzeit} {t.yearsUnit}
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

              {/* SZENARIEN */}
              <div className="mt-12">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">{t.scenTitle}</h3>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
                  {fuelle(t.scenSub, { jahre: laufzeit })}
                </p>
                <div
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
                  data-testid="fa-szenarien"
                >
                  {szenarien.map((s, i) => {
                    const hervor = i === szenarien.length - 1;
                    return (
                      <div
                        key={s.zins}
                        className={`snap-start shrink-0 w-[78%] sm:w-[45%] md:w-auto rounded-2xl p-6 ${
                          hervor
                            ? 'border-2 border-[#25c990] bg-healio-light/60 shadow-md'
                            : 'border border-slate-200 bg-white'
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
                          className={`text-2xl font-bold ${hervor ? 'text-healio-primary-dark' : 'text-slate-900'}`}
                          data-testid="fa-ende"
                        >
                          {euro(s.ende)} EUR
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="md:hidden text-center text-sm text-slate-500 mt-2">{t.swipeHint}</p>
                <div className="mt-6 rounded-2xl border border-slate-300 bg-slate-50 p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 shrink-0 mt-0.5 text-healio-primary-dark" />
                  <p className="text-base text-slate-700 leading-relaxed" data-testid="fa-hinweis">{t.disclaimer}</p>
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
