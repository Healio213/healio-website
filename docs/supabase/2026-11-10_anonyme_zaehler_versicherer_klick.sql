begin;

-- ---------------------------------------------------------------------------
-- Anonymer Zähler: neues Ereignis versicherer_klick (public.anonyme_zaehler)
--
-- Stand: 10.11.2026. VORBEREITET, NICHT AUSGEFÜHRT. Einspielen nur nach Franks
-- Go, im Projekt „HEALIO Production“ (ttgxhvrxepkrjrvmxcsq, Region
-- eu-central-1, Frankfurt), zum Beispiel über den Supabase-MCP mit
-- apply_migration (name: anonyme_zaehler_versicherer_klick). Setzt die
-- Tabelle aus 2026-11-02_anonyme_zaehler.sql voraus.
--
-- Reihenfolge beim Livegang ist egal: Solange diese Datei fehlt, lehnt die
-- Datenbank versicherer_klick ab, api/zaehler.js antwortet trotzdem 204 und
-- die Website merkt nichts. Gezählt wird ab dem Einspielen.
--
-- Was neu gezählt wird (shared/anonyme-zaehler.js):
--   versicherer_klick  von_pfad = Seite des Klicks (jede Seite, auch künftige
--                      Unterseiten wie /zahn/behandlung-steht-an),
--                      ziel = Versicherer aus der festen Liste
--                      (bayerische, ukv)
--
-- Was bewusst fehlt, wie bisher: IP, Uhrzeit, User-Agent, Referrer, Kennung,
-- Antworten oder Ergebnis des Zahn-Checks, Tarif. Spalten, Rechte und
-- Löschfrist bleiben unverändert; geändert werden nur die beiden CHECKs zur
-- Ereignis- und Zielliste und die Einfügeregel für anon.
-- ---------------------------------------------------------------------------

alter table public.anonyme_zaehler
  drop constraint if exists anonyme_zaehler_ereignis_check;
alter table public.anonyme_zaehler
  add constraint anonyme_zaehler_ereignis_check
    check (ereignis in ('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt', 'versicherer_klick'));

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
      or (ereignis = 'leistungsweg_klick' and ziel in (
        '/ambulant', '/zahn', '/stationaer', '/schwangerschaft', '/leistungen',
        '/en/outpatient', '/en/dental', '/en/inpatient', '/en/services'))
    );

comment on table public.anonyme_zaehler is
  'Anonymer Zähler ohne Cookies für healio.de: nur Datum, Ereignis (leistungsweg_klick, sdk_klick, kurzcheck_abgeschickt, versicherer_klick), Pfad, Ziel und mobil/desktop. Keine IP, keine Uhrzeit, keine Kennung. Einfügen nur über api/zaehler.js mit dem öffentlichen Schlüssel, Lesen nur im Dashboard. Löschung nach 25 Monaten (pg_cron anonyme-zaehler-loeschfrist).';

drop policy if exists anonyme_zaehler_anon_insert on public.anonyme_zaehler;
create policy anonyme_zaehler_anon_insert on public.anonyme_zaehler
  for insert to anon
  with check (
    tag = current_date
    and ereignis in ('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt', 'versicherer_klick')
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
--   Erwartet: ereignis_check und ziel_liste_check mit versicherer_klick.
--
--   select policyname, cmd, roles from pg_policies
--    where schemaname = 'public' and tablename = 'anonyme_zaehler';
--   Erwartet: genau anonyme_zaehler_anon_insert, INSERT, {anon}.
--
-- Auswertung Versicherer-Klicks (Summen, nie Einzelzeilen weitergeben):
--   select von_pfad, ziel as versicherer, geraet, count(*) as anzahl
--     from public.anonyme_zaehler
--    where ereignis = 'versicherer_klick' and tag >= current_date - 28
--    group by 1, 2, 3
--    order by 4 desc;
--
-- Die allgemeine Auswertung aus 2026-11-02_anonyme_zaehler.sql (gruppiert nach
-- tag, ereignis, von_pfad, ziel, geraet) zeigt das neue Ereignis ohne Änderung
-- mit an.
-- ---------------------------------------------------------------------------
