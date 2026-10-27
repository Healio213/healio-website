import { trackEvent } from '@/lib/analytics';
import { RATGEBER_GROUP_OF } from '@/content/ratgeber/registry.loaders';

// Keine Rechnerantworten oder Kontaktdaten annehmen. Die bestehende Analytics-
// Grenze entscheidet über Consent, private Routen und das ausschließliche GA4-Ziel.
const EVENTS = Object.freeze({
  article_click: 'altersvorsorge_article_click',
  calculator_start: 'altersvorsorge_calculator_start',
  form_open: 'altersvorsorge_form_open',
  form_start: 'altersvorsorge_form_start',
  lead: 'altersvorsorge_lead',
});
const PLACEMENTS = new Set(['article_calculator', 'landing_calculator', 'landing_hero', 'landing_steps', 'inline_form']);

export function trackAltersvorsorgeFunnel(stage, placement) {
  if (typeof stage !== 'string' || !Object.hasOwn(EVENTS, stage) || !PLACEMENTS.has(placement)) return false;
  try {
    return trackEvent(EVENTS[stage], { component: 'altersvorsorge_funnel', action: stage, placement }) === true;
  } catch {
    // Eine ausgefallene Messung verändert weder Navigation noch Versandstatus.
    return false;
  }
}

// Diese Herkunft dient nur der internen Anfrage an Healio. Sie ist kein
// Analyticsparameter, keine freie URL und enthält niemals Suchparameter.
export function getAltersvorsorgeArticleSource(value) {
  return typeof value === 'string' && RATGEBER_GROUP_OF.get(value) === 'altersvorsorge' ? value : null;
}
