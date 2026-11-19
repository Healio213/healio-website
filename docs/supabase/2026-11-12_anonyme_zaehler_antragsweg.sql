begin;

-- ---------------------------------------------------------------------------
-- Anonymer Zähler: neues Ereignis antragsweg (public.anonyme_zaehler)
--
-- Stand: 12.11.2026. VORBEREITET, NICHT AUSGEFÜHRT. Einspielen nur nach Franks
-- Go, im Projekt „HEALIO Production“, nach
-- 2026-11-10_anonyme_zaehler_versicherer_klick.sql. Die Datei schreibt beide
-- CHECKs und die Einfügeregel vollständig neu (enthält versicherer_klick mit).
--
-- Solange diese Datei fehlt, lehnt die Datenbank antragsweg ab, api/zaehler.js
-- antwortet trotzdem 204 und die Website merkt nichts. Die Wahl selbst ist
-- ohnehin hinter HEALIO_ANTRAGSWAHL_AKTIV (Standard aus).
--
-- Was neu gezählt wird (shared/anonyme-zaehler.js, ANTRAGSWEG_ZIELE):
--   antragsweg  von_pfad = Produktseite der Wahl (/ambulant, /zahn, /stationaer),
--               ziel = <sparte>-gezeigt | <sparte>-allein | <sparte>-telefon
--
-- Was bewusst fehlt: Tarif, Geburtsjahr, Antworten, jede Angabe zur Person,
-- IP, Uhrzeit, Kennung. Spalten, Rechte und Löschfrist bleiben unverändert.
-- ---------------------------------------------------------------------------

alter table public.anonyme_zaehler
  drop constraint if exists anonyme_zaehler_ereignis_check;
alter table public.anonyme_zaehler
  add constraint anonyme_zaehler_ereignis_check
    check (ereignis in ('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt', 'versicherer_klick', 'antragsweg'));

-- Feste Zielliste je Ereignis (shared/anonyme-zaehler.js: LEISTUNGSSEITEN,
-- KURZCHECK_VARIANTEN, ZAEHLER_VERSICHERER). Kein freier Text im Ziel.
alter table public.anonyme_zaehler
  drop constraint if exists anonyme_zaehler_ziel_liste_check;
alter table public.anonyme_zaehler
  add constraint anonyme_zaehler_ziel_liste_check
    check (
      (ereignis = 'sdk_klick' and ziel is null)
      or (ereignis = 'kurzcheck_abgeschickt' and ziel in ('naturheilkunde', 'schwangerschaft'))
      or (ereignis = 'versicherer_klick' and ziel in ('bayerische', 'ukv'))
      or (ereignis = 'antragsweg' and ziel in ('ambulant-gezeigt', 'ambulant-allein', 'ambulant-telefon', 'zahn-gezeigt', 'zahn-allein', 'zahn-telefon', 'stationaer-gezeigt', 'stationaer-allein', 'stationaer-telefon'))
      or (ereignis = 'leistungsweg_klick' and ziel in (
        '/ambulant', '/ambulant/osteopathie', '/zahn', '/zahn/behandlung-steht-an', '/stationaer', '/schwangerschaft', '/schwangerschaft/baby-geplant', '/leistungen',
        '/en/outpatient', '/en/dental', '/en/inpatient', '/en/services'))
    );

comment on table public.anonyme_zaehler is
  'Anonymer Zähler ohne Cookies für healio.de: nur Datum, Ereignis (leistungsweg_klick, sdk_klick, kurzcheck_abgeschickt, versicherer_klick, antragsweg), Pfad, Ziel und mobil/desktop. Keine IP, keine Uhrzeit, keine Kennung. Einfügen nur über api/zaehler.js mit dem öffentlichen Schlüssel, Lesen nur im Dashboard. Löschung nach 25 Monaten (pg_cron anonyme-zaehler-loeschfrist).';

drop policy if exists anonyme_zaehler_anon_insert on public.anonyme_zaehler;
create policy anonyme_zaehler_anon_insert on public.anonyme_zaehler
  for insert to anon
  with check (
    tag = current_date
    and ereignis in ('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt', 'versicherer_klick', 'antragsweg')
    and von_pfad ~ '^[a-z0-9/-]{1,160}$'
    and (ziel is null or ziel ~ '^[a-z0-9/-]{1,160}$')
    and geraet in ('mobil', 'desktop')
    and ((ereignis = 'sdk_klick') = (ziel is null))
  );

commit;

-- ---------------------------------------------------------------------------
-- Prüfung nach dem Einspielen (nur lesen):
--
--   select conname, pg_get_constraintdef(oid) from pg_constraint
--    where conrelid = 'public.anonyme_zaehler'::regclass order by conname;
--   Erwartet: ereignis_check und ziel_liste_check mit antragsweg.
--
-- Auswertung der Wahl (Summen, nie Einzelzeilen weitergeben):
--   select ziel, geraet, count(*) as anzahl
--     from public.anonyme_zaehler
--    where ereignis = 'antragsweg' and tag >= current_date - 28
--    group by 1, 2
--    order by 1, 2;
-- ---------------------------------------------------------------------------
