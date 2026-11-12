// Vorabfrage der Zahn-Strecke /antrag/zahn (12.11.2026, Franks Auftrag): Der
// Kunde wählt keinen Versicherer. Healio fragt vorab, daraus folgt genau ein
// Ziel: UKV ZahnPRIVAT, die Bayerische mit ZAHN Sofort oder das Telefon.
//
// Fragen und Zuordnung sind die des Zahn-Checks auf /zahn
// (src/components/sections/dental/DentalZahnCheck.jsx, computeResult und
// needsQ4, Stand 04.11.2026). Ergänzt sind nur zwei Fragen, die die
// Annahmeregeln der Strecken zwingend brauchen:
// - anzahl: Zahl der fehlenden Zähne (1, 2, 3). Die UKV rechnet den Zuschlag
//   je Zahn (Frage TF0021); der Zahn-Check fragt nur „1 bis 3“.
// - schmelz: Parodontose, Parodontitis oder Zahnschmelzdefekt in den letzten
//   3 Jahren. Die Bayerische lehnt bei „ja“ ab (Frage 4); der Zahn-Check fragt
//   den Zahnschmelzdefekt nicht.
//
// Reine Regel ohne Abhängigkeiten (Node-fähig, Test:
// scripts/check-zahn-vorabfrage.mjs). Die Antworten bleiben im
// Arbeitsspeicher der Seite und gehen nur als vorbelegte Antworten in die
// Maske; der Kunde bestätigt jede davon im Wortlaut des Versicherers.

export const OPTIONEN = {
  q1: ['ja', 'fertig', 'nein'],
  q2: ['keine', 'ziehen', 'wenige', 'viele'],
  anzahl: ['1', '2', '3'],
  q3: ['ja', 'nein'],
  schmelz: ['ja', 'nein'],
  q4: ['leistung', 'familie', 'pzr', 'preis'],
};

const behandlungOffen = (a) => a.q1 === 'ja';

// Nächste offene Frage oder null, wenn das Ziel feststeht.
export function naechsteFrage(a = {}) {
  if (!a.q1) return 'q1';
  if (!a.q2) return 'q2';
  if (a.q2 === 'viele' || a.q2 === 'ziehen') return null;
  if (a.q2 === 'wenige') {
    if (behandlungOffen(a)) return null;
    return a.anzahl ? null : 'anzahl';
  }
  if (!a.q3) return 'q3';
  if (behandlungOffen(a)) {
    if (a.q3 === 'ja') return null;
    return a.schmelz ? null : 'schmelz';
  }
  if (a.q3 === 'ja') return null;
  return a.q4 ? null : 'q4';
}

// Reihenfolge der tatsächlich gestellten Fragen (für „Zurück“ und Fortschritt).
export function gestellteFragen(a = {}) {
  const liste = [];
  const teil = {};
  for (let runde = 0; runde < 8; runde += 1) {
    const frage = naechsteFrage(teil);
    if (!frage) break;
    liste.push(frage);
    if (!(frage in a)) break;
    teil[frage] = a[frage];
  }
  return liste;
}

// Ergebnis-Schlüssel wie im Zahn-Check (dentalContent check.results), damit
// die Gründe auf dem Ergebnis-Bildschirm dieselben Texte sind.
export function ergebnisSchluessel(a = {}) {
  if (a.q2 === 'viele') return 'sonderViele';
  if (a.q2 === 'ziehen') return 'sonderKomplex';
  if (behandlungOffen(a)) {
    if (a.q2 === 'wenige' || a.q3 === 'ja' || a.schmelz === 'ja') return 'sonderKomplex';
    return 'sofort';
  }
  if (a.q2 === 'wenige') return 'ukvLuecke';
  if (a.q3 === 'ja') return 'ukvVorgeschichte';
  return {
    familie: 'ukvFamilie', pzr: 'ukvPzr', preis: 'ukvPreis',
  }[a.q4] || 'ukvLeistung';
}

// Empfohlene UKV-Stufe: nur wo der Zahn-Check eine Stufe nennt
// (ZahnPRIVAT 100 bei „Maximale Leistung“, 75 bei „Günstiger Einstieg“,
// bei Familie und Zahnreinigung 90 oder 100, dann die 100). Bei Lücke und
// Vorgeschichte nennt der Zahn-Check keine Stufe: keine Vorauswahl.
const UKV_STUFE = {
  ukvLeistung: 'Z100', ukvFamilie: 'Z100', ukvPzr: 'Z100', ukvPreis: 'Z75', ukvLuecke: null, ukvVorgeschichte: null,
};

// Ziel der Vorabfrage. Liefert null, solange Fragen offen sind, sonst
// { ziel, ergebnis, produkt, tarif, bausteine, antworten, vorbelegt }.
// ziel: 'ukv' | 'bayerische-sofort' | 'telefon' ('bayerische' ohne Baustein
// entsteht in der Vorabfrage nie, nur beim Einstieg über die Produktseite).
// antworten: Originalfragen, die eine Antwort der Vorabfrage inhaltlich
// genau abdeckt (vorbelegt, der Kunde bestätigt sie im Wortlaut).
export function zielAus(a = {}) {
  if (naechsteFrage(a) !== null) return null;
  const ergebnis = ergebnisSchluessel(a);
  if (ergebnis.startsWith('sonder')) {
    return {
      ziel: 'telefon', ergebnis, produkt: null, tarif: null, bausteine: [], antworten: {},
    };
  }
  if (ergebnis === 'sofort') {
    return {
      ziel: 'bayerische-sofort',
      ergebnis,
      produkt: 'zahn',
      tarif: 'PRESTIGE',
      bausteine: ['ZAHN_SOFORT'],
      antworten: {
        // q2 „alle Zähne vorhanden oder ersetzt“ (nicht „soll gezogen werden“): Frage 1 beider Fassungen.
        z1: 'nein',
        z1s: 'nein',
        // q3 nennt Prothese und Zahnersatz älter als 10 Jahre wörtlich: Frage 2 und 3.
        z2: 'nein',
        z3: 'nein',
        // schmelz ist Frage 4 der Bayerischen in einfachen Worten.
        z4: 'nein',
      },
    };
  }
  const antworten = {};
  // q2 hat denselben Hinweis wie TF0021 (Milch-, Weisheitszähne, Lückenschluss zählen nicht).
  antworten.TF0021 = a.q2 === 'wenige' ? a.anzahl : '0';
  // q1 „Nein, nichts davon“ deckt GF0073 (empfohlen in 2 Jahren, beabsichtigt, läuft).
  // „Schon fertig behandelt“ deckt sie nicht: GF0073 fragt auch nach Empfehlungen
  // der letzten zwei Jahre, die Frage kommt deshalb normal.
  if (a.q1 === 'nein') antworten.GF0073 = 'nein';
  return {
    ziel: 'ukv', ergebnis, produkt: 'zahn-ukv', tarif: UKV_STUFE[ergebnis], bausteine: [], antworten,
  };
}

// Alle Antwortkombinationen (für den Regeltest).
export function alleKombinationen() {
  const ergebnisse = [];
  const gehe = (a) => {
    const frage = naechsteFrage(a);
    if (!frage) { ergebnisse.push(a); return; }
    OPTIONEN[frage].forEach((wert) => gehe({ ...a, [frage]: wert }));
  };
  gehe({});
  return ergebnisse;
}
