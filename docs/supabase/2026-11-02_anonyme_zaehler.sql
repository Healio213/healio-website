begin;

-- ---------------------------------------------------------------------------
-- Anonymer Zähler ohne Cookies für healio.de (public.anonyme_zaehler)
--
-- Stand: 02.11.2026. VORBEREITET, NICHT AUSGEFÜHRT. Einspielen nur nach Franks
-- Go, im Projekt „HEALIO Production“ (ttgxhvrxepkrjrvmxcsq, Region
-- eu-central-1, Frankfurt), zum Beispiel über den Supabase-MCP mit
-- apply_migration (name: anonyme_zaehler). Die Datei liegt wie die übrigen
-- Website-Migrationen bewusst nicht unter supabase/migrations, damit keine
-- Automatik sie anwendet.
--
-- Reihenfolge beim Livegang ist egal: Ohne Tabelle antwortet api/zaehler.js
-- trotzdem 204 und die Website merkt nichts. Gezählt wird ab dem Einspielen.
--
-- Was gezählt wird (src/lib/anonyme-zaehler.js, shared/anonyme-zaehler.js):
--   leistungsweg_klick     von_pfad = Seite des Klicks, ziel = Leistungsseite
--   sdk_klick              von_pfad = Seite, auf der der SDK-Rechner aufging
--   kurzcheck_abgeschickt  von_pfad = Pfad des Checks, ziel = Variante
--                          (naturheilkunde oder schwangerschaft)
--
-- Was bewusst fehlt: IP, Uhrzeit, User-Agent, Referrer, Cookie- oder
-- Sitzungskennung, laufende Nummer. Je Zeile gibt es nur Datum, Ereignis,
-- zwei Pfade und mobil oder desktop. Ausgewertet wird nur als Summe.
--
-- Schreibweg: api/zaehler.js (Vercel, fra1) mit dem vorhandenen öffentlichen
-- Schlüssel (Vercel-Env SUPABASE_URL und SUPABASE_PUBLISHABLE_KEY, dieselben
-- Werte wie für praxis_leitfaden_leads). Der öffentliche Schlüssel ist kein
-- Geheimnis; deshalb prüft die Datenbank jede Zeile selbst:
--   * anon darf nur einfügen, und nur die vier Spalten. Das Datum setzt die
--     Datenbank, ein Rückdatieren ist nicht möglich.
--   * kein select, update oder delete für anon und authenticated.
--   * Ziele nur aus der festen Liste (Leistungsseiten, zwei Kurzcheck-
--     Varianten), wie in shared/anonyme-zaehler.js.
--   * Keine security-definer-Funktion und kein Trigger (Gegenprüfung
--     02.11.2026). Gegen Flutung bremst api/zaehler.js (60 Zählungen je
--     Minute und Anschluss); der Schlüssel liegt nur in Vercel, nicht im
--     Browser.
--   * Löschung nach 25 Monaten per pg_cron (Vergleich Jahr gegen Vorjahr
--     bleibt möglich). So steht es in der Datenschutzerklärung.
-- ---------------------------------------------------------------------------

create table if not exists public.anonyme_zaehler (
  tag date not null default current_date,
  ereignis text not null,
  von_pfad text not null,
  ziel text,
  geraet text not null,
  constraint anonyme_zaehler_ereignis_check
    check (ereignis in ('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt')),
  constraint anonyme_zaehler_von_pfad_check
    check (von_pfad ~ '^[a-z0-9/-]{1,160}$'),
  constraint anonyme_zaehler_ziel_check
    check (ziel is null or ziel ~ '^[a-z0-9/-]{1,160}$'),
  constraint anonyme_zaehler_geraet_check
    check (geraet in ('mobil', 'desktop')),
  -- Nur der SDK-Klick kommt ohne Ziel aus.
  constraint anonyme_zaehler_ziel_passt_check
    check ((ereignis = 'sdk_klick') = (ziel is null)),
  -- Feste Zielliste je Ereignis (shared/anonyme-zaehler.js: LEISTUNGSSEITEN,
  -- KURZCHECK_VARIANTEN). Kein freier Text im Ziel.
  constraint anonyme_zaehler_ziel_liste_check
    check (
      (ereignis = 'sdk_klick' and ziel is null)
      or (ereignis = 'kurzcheck_abgeschickt' and ziel in ('naturheilkunde', 'schwangerschaft'))
      or (ereignis = 'leistungsweg_klick' and ziel in (
        '/ambulant', '/ambulant/osteopathie', '/zahn', '/stationaer', '/schwangerschaft', '/schwangerschaft/baby-geplant', '/leistungen',
        '/en/outpatient', '/en/dental', '/en/inpatient', '/en/services'))
    )
);

comment on table public.anonyme_zaehler is
  'Anonymer Zähler ohne Cookies für healio.de: nur Datum, Ereignis (leistungsweg_klick, sdk_klick, kurzcheck_abgeschickt), Pfad, Ziel und mobil/desktop. Keine IP, keine Uhrzeit, keine Kennung. Einfügen nur über api/zaehler.js mit dem öffentlichen Schlüssel, Lesen nur im Dashboard. Löschung nach 25 Monaten (pg_cron anonyme-zaehler-loeschfrist).';

create index if not exists anonyme_zaehler_tag_idx on public.anonyme_zaehler (tag);

-- RLS gilt für anon und authenticated. Bewusst ohne FORCE: Der Löschlauf
-- läuft als Eigentümer und muss die Zeilen sehen können.
alter table public.anonyme_zaehler enable row level security;

revoke all on table public.anonyme_zaehler from public, anon, authenticated;
-- Die Standardrechte von Supabase geben service_role sonst alles; danach
-- bleibt nur Lesen und Löschen, wie unten in der Prüfung erwartet.
revoke all on table public.anonyme_zaehler from service_role;
grant insert (ereignis, von_pfad, ziel, geraet) on table public.anonyme_zaehler to anon;
grant select, delete on table public.anonyme_zaehler to service_role;

drop policy if exists anonyme_zaehler_anon_insert on public.anonyme_zaehler;
create policy anonyme_zaehler_anon_insert on public.anonyme_zaehler
  for insert to anon
  with check (
    tag = current_date
    and ereignis in ('leistungsweg_klick', 'sdk_klick', 'kurzcheck_abgeschickt')
    and von_pfad ~ '^[a-z0-9/-]{1,160}$'
    and (ziel is null or ziel ~ '^[a-z0-9/-]{1,160}$')
    and geraet in ('mobil', 'desktop')
    and ((ereignis = 'sdk_klick') = (ziel is null))
  );

-- Löschfrist: Zeilen älter als 25 Monate. 03:40 UTC ist nachts in Hamburg.
-- cron.schedule ersetzt einen gleichnamigen Auftrag, die Datei bleibt damit
-- wiederholbar.
select cron.schedule(
  'anonyme-zaehler-loeschfrist',
  '40 3 * * *',
  $cron$delete from public.anonyme_zaehler where tag < (current_date - interval '25 months');$cron$
);

commit;

-- ---------------------------------------------------------------------------
-- Prüfung nach dem Einspielen (nur lesen):
--
--   select relrowsecurity, relforcerowsecurity from pg_class
--    where oid = 'public.anonyme_zaehler'::regclass;
--   Erwartet: true, false.
--
--   select grantee, privilege_type from information_schema.role_table_grants
--    where table_schema = 'public' and table_name = 'anonyme_zaehler'
--    order by grantee, privilege_type;
--   Erwartet: anon nur INSERT (spaltenweise), service_role SELECT und DELETE.
--
--   select jobname, schedule, active from cron.job
--    where jobname = 'anonyme-zaehler-loeschfrist';
--   Erwartet: 40 3 * * *, active = true.
--
-- Auswertung (Summen, nie Einzelzeilen weitergeben):
--   select tag, ereignis, von_pfad, ziel, geraet, count(*) as anzahl
--     from public.anonyme_zaehler
--    where tag >= current_date - 14
--    group by 1, 2, 3, 4, 5
--    order by 1 desc, 6 desc;
-- ---------------------------------------------------------------------------
