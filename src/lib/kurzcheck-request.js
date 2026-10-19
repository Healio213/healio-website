/**
 * Aus dem Formularzustand des Kurzchecks wird die Anfrage für den EU-Weg.
 * Bewusst ohne React, damit der Vertragstest genau diesen Weg gegen die
 * Prüfung der Funktion laufen lassen kann.
 */

import { buildKurzcheckPayload, normalizeKurzcheckPhone } from '../../shared/kurzcheck.js';
import { readCampaignUtm } from './campaign-landing.js';

export const readKurzcheckContact = (contact) => ({
  firstName: contact.vorname.trim(),
  phone: normalizeKurzcheckPhone(contact.telefon),
  email: contact.email.trim(),
});

export const buildKurzcheckRequest = ({ config, answers, contact, search }) => buildKurzcheckPayload({
  config,
  answers,
  ...readKurzcheckContact(contact),
  utm: readCampaignUtm(search),
});
