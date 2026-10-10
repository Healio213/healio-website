import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SiegelTicker from '@/components/sections/shared/SiegelTicker';
import { IKK_SEALS } from '@/components/sections/shared/IkkKassenSiegel';

/**
 * Produktseiten: statische Siegelzeilen mit sichtbarer Bewertung und Geltungsbereich.
 * Vorhandene Originalbilder bleiben unverändert. SDK Fairness 2025 bewertet den
 * Anbieter; die Zahnsiegel gelten nur für UKV ZahnPRIVAT 100 bzw. ZAHN Prestige.
 * SDK-Vollversicherungsratings dürfen nicht als AP-/SP-Auszeichnung erscheinen.
 * Originalquellen am 10.10.2026 erneut geprüft; die bestehenden Lizenzfragen
 * sind im Marketing-Nachweis dokumentiert, keine neue Nutzungsfreigabe behauptet.
 * HealioSiegelBand bleibt für die separate B2C-Schwangerschaftsstrecke erhalten.
 * Partnerseiten verwenden diese Komponenten nicht.
 */
const FAIRNESS = { src: '/siegel/sdk/fairnesspreis.png', altKey: 'awards.items.fairness' };

// Stand 05.10.2026: Bilddateien unverändert von den offiziellen Quellen
// (siehe Kopfkommentar). Alt-Texte stehen im Namespace zahn (siegel.awards.*).
const UKV_ZAHN_FRANKE_BORNBERG = {
  src: '/siegel/ukv/franke-bornberg-zahnprivat100-2026.svg',
  altKey: 'siegel.awards.frankeBornberg',
  ns: 'zahn',
};
const BAYERISCHE_ZAHN_WARENTEST = {
  src: '/siegel/bayerische/warentest-zahn-prestige-2026-09.jpg',
  altKey: 'siegel.awards.warentest',
  ns: 'zahn',
};

// Quelldateimaße halten die Bildfläche beim Laden stabil.
const SDK_SIZE = { width: 240, height: 240 };
const UKV_ZAHN_SIZE = { width: 432, height: 216 };
const BAYERISCHE_ZAHN_SIZE = { width: 600, height: 399 };
const IKK_SIZE = { width: 500, height: 403 };

const TICKER_IMAGE_SIZE = { sdk: SDK_SIZE, ukv: UKV_ZAHN_SIZE, bayerische: BAYERISCHE_ZAHN_SIZE };

// Seiten, auf denen das Band auch die IKK-Siegel zeigt, ohne dass die Seite
// withIkk setzt (wie der IKK-Block auf der Seite selbst).
const IKK_TICKER_PATHS = new Set(['/ambulant', '/en/outpatient', '/heilpraktiker-zusatzversicherung']);

const AWARD_SETS = {
  default: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
  zahn: [
    // Leistungsweg: UKV, drei Stufen. Das Siegel gehört nur zu ZahnPRIVAT 100.
    { id: 'ukv', labelKey: 'awards.groups.ukvZahn', items: [UKV_ZAHN_FRANKE_BORNBERG] },
    // Sofortschutz-Weg: die Bayerische bietet auf /zahn nur ZAHN Sofort an,
    // immer zusammen mit einem Zahntarif der Bayerischen. Das Siegel bewertet
    // den Tarif ZAHN Prestige, nicht den Baustein ZAHN Sofort.
    { id: 'bayerische', labelKey: 'awards.groups.bayerischeZahn', items: [BAYERISCHE_ZAHN_WARENTEST] },
    // Das IKK-Leistungssiegel (Stand 03/2026, Note 1,5) ist abgelaufen:
    // krankenkasseninfo.de hat 09/2026 neue Ergebnisse veröffentlicht. Eine
    // neue Fassung hat die IKK dafür nicht geschickt, deshalb hier nicht mehr.
  ],
  stationaer: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
  // Separate B2C-Schwangerschaftsstrecke (HealioSiegelBand).
  schwangerschaft: [
    { id: 'sdk', labelKey: 'awards.groups.sdk', items: [FAIRNESS] },
  ],
};

// Hinweis unter der Zeile, wenn ein Siegel nur für einen Teil der angebotenen
// Tarife gilt (Pflichthinweis, deshalb mindestens 14 px).
const AWARD_NOTES = {
  zahn: 'awards.notes.zahn',
};

const toneClasses = {
  light: 'bg-white border-gray-100',
  ice: 'bg-home-ice border-emerald-900/10',
  transparent: 'bg-transparent border-transparent',
};

const AWARD_DETAILS = {
  sdk: {
    key: 'sdk',
    source: 'https://www.sdk.de/unternehmen/presse/sdk-zum-zwoelften-mal-mit-dem-deutschen-fairness-preis-ausgezeichnet',
  },
  ukv: {
    key: 'ukv',
    source: 'https://www.ukv.de/ueber-uns/ratings-auszeichnungen.html',
  },
  bayerische: {
    key: 'bayerische',
    source: 'https://www.diebayerische.de/versicherungen/zahnzusatzversicherung/',
  },
};

// Bestehendes Handy-Band der separaten B2C-Schwangerschaftsstrecke.
// Die Produkt- und Partnerseiten verwenden es nicht mehr.
export const HealioSiegelBand = ({ productSet, withIkk, ikkOrder, size, ariaLabel, className = '' }) => {
  const { t } = useTranslation(['common', 'zahn']);
  const { pathname } = useLocation();
  const isPregnancySet = productSet === 'schwangerschaft';
  const groups = AWARD_SETS[productSet] || AWARD_SETS.default;
  const noteKey = AWARD_NOTES[productSet];
  const showIkk = withIkk ?? (isPregnancySet || productSet === 'zahn' || productSet === 'stationaer' || IKK_TICKER_PATHS.has(pathname));
  // Auf /schwangerschaft steht das Siegel für Schwangere und junge Eltern vorn.
  const ikkKeys = (ikkOrder ?? (isPregnancySet ? 'parents' : 'family')) === 'parents' ? ['parents', 'family'] : ['family', 'parents'];
  const items = [
    ...groups.flatMap((group) => group.items.map((award) => ({
      id: group.id,
      src: award.src,
      alt: t(award.altKey, award.ns ? { ns: award.ns } : undefined),
      ...TICKER_IMAGE_SIZE[group.id],
    }))),
    ...(showIkk ? ikkKeys.map((key) => ({
      id: `ikk-${key}`,
      src: IKK_SEALS[key].src,
      alt: t(IKK_SEALS[key].altKey),
      ...IKK_SIZE,
    })) : []),
  ];
  const notes = [
    ...(noteKey ? [t(noteKey)] : []),
    ...(showIkk ? [t('awards.groups.ikkNote')] : []),
  ];

  return (
    <SiegelTicker
      className={className}
      items={items}
      ariaLabel={ariaLabel || t('awards.label')}
      notes={notes}
      size={size ?? (isPregnancySet ? 'large' : 'regular')}
    />
  );
};

const HealioAwardsRow = ({
  label,
  compact = false,
  size,
  tone = 'light',
  bordered = true,
  className = '',
  productSet,
}) => {
  const { t } = useTranslation(['common', 'zahn']);
  const caption = label || t('awards.label');
  const groups = AWARD_SETS[productSet] || AWARD_SETS.default;
  const noteKey = AWARD_NOTES[productSet];
  const multi = groups.length > 1;
  const spacing = compact || size === 'compact' ? 'py-4 md:py-6' : 'py-6 md:py-8';

  return (
    <section
      data-awards-row
      className={`${toneClasses[tone] || toneClasses.light} ${bordered ? 'border-b' : ''} ${spacing} ${className}`}
      aria-label={caption}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold text-slate-600">{caption}</p>
        <ul className={`mx-auto mt-5 grid gap-6 ${multi ? 'md:grid-cols-2 md:gap-10' : 'max-w-2xl'}`}>
          {groups.map((group) => {
            const detail = AWARD_DETAILS[group.id];
            const key = `awards.details.${detail.key}`;
            return (
              <li key={group.id} className="flex min-w-0 items-center gap-4 sm:gap-6">
                <div className="flex w-28 shrink-0 items-center justify-center sm:w-32">
                  {group.items.map((award) => (
                    <img
                      key={award.src}
                      src={award.src}
                      alt={t(award.altKey, award.ns ? { ns: award.ns } : undefined)}
                      width={TICKER_IMAGE_SIZE[group.id].width}
                      height={TICKER_IMAGE_SIZE[group.id].height}
                      className="max-h-24 w-auto max-w-full object-contain sm:max-h-28"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold leading-snug text-[#071726]">{t(`${key}.title`)}</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-[#087654]">{t(`${key}.result`)}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{t(`${key}.scope`)}</p>
                  <a
                    href={detail.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-10 items-center text-sm leading-5 text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-[#087654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]"
                  >
                    {t(`${key}.source`)}<span className="ml-1" aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        {noteKey && (
          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-slate-600">{t(noteKey)}</p>
        )}
      </div>
    </section>
  );
};

export default HealioAwardsRow;
