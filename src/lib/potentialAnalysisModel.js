export const POTENTIAL_ANALYSIS_CONCERNS = Object.freeze([
  'kassenboost',
  'bav',
  'bkv',
  'gesamtsystem',
  'unsicher',
]);

const PRESELECTABLE_INTERESTS = new Set(['kassenboost', 'bav']);
const LEGACY_NOT_REQUESTED = 'Nicht angefragt';

export const normalizePotentialInterest = (interest) => (
  PRESELECTABLE_INTERESTS.has(interest) ? interest : ''
);

export const getPotentialAnalysisDetailVisibility = (concern) => ({
  bav: concern === 'bav' || concern === 'gesamtsystem',
  bkv: concern === 'bkv' || concern === 'gesamtsystem',
});

export const mapPotentialAnalysisToLegacyFields = (formData) => {
  const visibility = getPotentialAnalysisDetailVisibility(formData.anliegen);

  return {
    fokus_bav: visibility.bav ? formData.fokus_bav : LEGACY_NOT_REQUESTED,
    fokus_bkv: visibility.bkv ? formData.fokus_bkv : LEGACY_NOT_REQUESTED,
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
  const legacyFields = mapPotentialAnalysisToLegacyFields(formData);

  return [
    `Anliegen: ${formData.anliegen}`,
    `Mitarbeiteranzahl: ${formData.mitarbeiteranzahl}`,
    `Fokus bAV: ${legacyFields.fokus_bav}`,
    `Fokus bKV: ${legacyFields.fokus_bkv}`,
  ].join('\n');
};
