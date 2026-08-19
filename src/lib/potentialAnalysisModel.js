export const POTENTIAL_ANALYSIS_CONCERNS = Object.freeze([
  'kassenboost',
  'bav',
  'bkv',
  'gesamtsystem',
  'unsicher',
]);

const PRESELECTABLE_INTERESTS = new Set(['kassenboost', 'bav']);
const LEGACY_NOT_REQUESTED = 'Nicht angefragt';
const LEGACY_CONCERN_LABELS = Object.freeze({
  kassenboost: 'Anliegen KassenBoost',
  bav: 'Anliegen bAV',
  bkv: 'Anliegen bKV',
  gesamtsystem: 'Anliegen Gesamtsystem',
  unsicher: 'Anliegen unsicher',
});

export const normalizePotentialInterest = (interest) => (
  PRESELECTABLE_INTERESTS.has(interest) ? interest : ''
);

export const getPotentialAnalysisDetailVisibility = (concern) => ({
  bav: concern === 'bav' || concern === 'gesamtsystem',
  bkv: concern === 'bkv' || concern === 'gesamtsystem',
});

export const mapPotentialAnalysisToLegacyFields = (formData) => {
  const visibility = getPotentialAnalysisDetailVisibility(formData.anliegen);
  const concernLabel = LEGACY_CONCERN_LABELS[formData.anliegen] || 'Anliegen nicht angegeben';
  const bavDetail = visibility.bav ? (formData.fokus_bav || 'Offen') : LEGACY_NOT_REQUESTED;
  const bkvDetail = visibility.bkv ? (formData.fokus_bkv || 'Offen') : LEGACY_NOT_REQUESTED;

  return {
    fokus_bav: `${concernLabel} | bAV: ${bavDetail}`,
    fokus_bkv: `${concernLabel} | bKV: ${bkvDetail}`,
  };
};

export const createPotentialAnalysisDatabaseRecord = (formData) => {
  const legacyFields = mapPotentialAnalysisToLegacyFields(formData);

  return {
    name: formData.name,
    company: formData.company,
    email: formData.email,
    phone: formData.phone,
    mitarbeiteranzahl: formData.mitarbeiteranzahl,
    ...legacyFields,
  };
};

export const buildPotentialAnalysisEmailMessage = (formData) => {
  const visibility = getPotentialAnalysisDetailVisibility(formData.anliegen);
  const bavDetail = visibility.bav ? (formData.fokus_bav || 'Offen') : LEGACY_NOT_REQUESTED;
  const bkvDetail = visibility.bkv ? (formData.fokus_bkv || 'Offen') : LEGACY_NOT_REQUESTED;

  return [
    `Anliegen: ${formData.anliegen}`,
    `Mitarbeiteranzahl: ${formData.mitarbeiteranzahl}`,
    `Fokus bAV: ${bavDetail}`,
    `Fokus bKV: ${bkvDetail}`,
  ].join('\n');
};

export const summarizePotentialAnalysisDelivery = ({ emailResult, databaseResult }) => {
  const delivery = {
    emailjs: emailResult.status,
    supabase: databaseResult.status,
  };
  const successfulChannels = Object.values(delivery)
    .filter((status) => status === 'fulfilled')
    .length;

  return {
    delivery,
    successfulChannels,
    hasSuccessfulDelivery: successfulChannels > 0,
    isPartialDelivery: successfulChannels === 1,
  };
};
