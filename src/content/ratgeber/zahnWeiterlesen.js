/**
 * Weiterlesen-Block auf /zahn (Zahn-Ratgeber Welle 1, 06.10.2026).
 *
 * Bewusst eine kleine eigene Liste statt eines Imports aus dem Register:
 * /zahn soll schlank bleiben und nicht mit jedem neuen Ratgeber wachsen. Der
 * Vertragstest (check-ratgeber-contract.mjs) prüft, dass jeder Slug hier im
 * Register steht und der Titel dem listTitle entspricht.
 */
export const ZAHN_WEITERLESEN = Object.freeze([
  { slug: 'zahnersatz-kosten', title: 'Zahnersatz Kosten: was die Kasse zahlt und was du selbst zahlst' },
  { slug: 'professionelle-zahnreinigung-kosten', title: 'Professionelle Zahnreinigung: Kosten und was deine Kasse dazugibt' },
  { slug: 'zahnimplantat-kosten', title: 'Zahnimplantat: Kosten, Kassenanteil und Eigenanteil' },
  { slug: 'wurzelbehandlung-kosten', title: 'Wurzelbehandlung: wann die Kasse zahlt und was privat kostet' },
  { slug: 'zahnkrone-kosten', title: 'Zahnkrone: Arten, Kosten und Festzuschuss' },
  { slug: 'bonusheft-zahnarzt', title: 'Bonusheft beim Zahnarzt: so viel mehr zahlt die Kasse' },
  { slug: 'zahnzusatzversicherung-ohne-wartezeit', title: 'Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag gilt' },
  { slug: 'zahnzusatzversicherung-fehlender-zahn', title: 'Zahnzusatzversicherung bei fehlendem Zahn: was noch geht und was nicht' },
]);
