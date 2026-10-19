begin;

-- ---------------------------------------------------------------------------
-- Kurzcheck mit Gesundheitsbezug (/check/schwangerschaft): eigener Weg in der EU
--
-- Stand: 19.10.2026. VORBEREITET, NICHT AUSGEFÜHRT. Einspielen nur nach Franks
-- Go, im Projekt „HEALIO Production“ (Region eu-central-1, Frankfurt), zum
-- Beispiel über den Supabase-MCP mit apply_migration (name: kurzcheck_leads).
-- Die Datei liegt bewusst nicht unter supabase/migrations, damit keine
-- Automatik sie anwendet. Reihenfolge beim Livegang: erst diese Migration und
-- das Token (Schritt unten), dann der Website-Deploy. Ohne Tabelle antwortet
-- api/kurzcheck-lead.js mit 502 und die Anfrage geht verloren.
--
-- Schreibweg: api/kurzcheck-lead.js (Vercel, Region fra1) ruft die Funktion
-- public.submit_kurzcheck_lead mit dem öffentlichen Schlüssel UND einem
-- geheimen Token auf. Der öffentliche Schlüssel steckt auch in der Mobile App
-- und ist kein Geheimnis; ohne Token lässt sich deshalb nichts einfügen.
--   * anon und authenticated haben auf der Tabelle keinerlei Rechte
--     (RLS + FORCE RLS, keine Policy). Lesen geht nur im Supabase-Dashboard.
--   * Die Funktion fügt nur ein. Zeitpunkte, Status und Notizen setzt immer
--     die Datenbank.
--   * Die IP steht nur als HMAC-Prüfwert in der Tabelle (IPv6 als /64-Netz).
--
-- Token einrichten, einmalig nach dem Einspielen: Das Einrichtungsskript
-- docs/kurzcheck-hinweis/setup_kurzcheck_hinweis.py (Phase activate) legt
-- KURZCHECK_INGEST_TOKEN verschlüsselt in Vercel an und schreibt nur dessen
-- SHA-256-Wert (ingest_token_sha256) in seinen Checkpoint. Diesen Wert hier
-- eintragen und <SHA256_HEX> ersetzen (Claude per Supabase-MCP, nichts für Frank):
--     insert into private.kurzcheck_ingest_tokens (token_name, token_sha256)
--     values ('vercel-kurzcheck', '\x<SHA256_HEX>'::bytea)
--     on conflict (token_name) do update
--       set token_sha256 = excluded.token_sha256, enabled = true,
--           valid_from = now(), rotated_at = now();
--   Das Token läuft bewusst nicht von selbst ab, damit der Check nicht eines
--   Tages still ausfällt. Getauscht wird nur bei Verdacht. Scheitert das
--   Speichern, meldet die Funktion das über den Hinweisweg an info@ und im
--   Vercel-Log.
--
-- Löschfristen, wie in der Datenschutzerklärung (#kurzcheck) zugesagt:
--   * Anfragen löscht der tägliche Löschlauf ab dem 89. Tag, spätestens am 90.
--     Healio darf eine erledigte Anfrage früher löschen; das ist ihr Abschluss.
--   * Der Einwilligungsnachweis (Vorname, Kontaktangaben, Fassung, Zeitpunkt,
--     ohne Antworten) liegt getrennt in private.kurzcheck_consent_proofs.
--     Die Frist läuft ab dem Abschluss der Anfrage, also ab ihrer Löschung,
--     weil die Einwilligung danach nicht mehr verwendet wird:
--     mit Telefonnummer fünf Jahre (§ 7a UWG, neu nach jeder Verwendung),
--     ohne Telefonnummer bis zum Ende des dritten folgenden Kalenderjahres
--     (regelmäßige Verjährung). Bis zur Löschung der Anfrage steht dort die
--     längste mögliche Frist.
--
-- Hinweis an Healio: api/kurzcheck-lead.js meldet jeden Eingang über den
-- eigenen n8n-Weiterleiter (Hetzner) an info@healio.de, nur Kennung, Fassung
-- und Zeit. Ob das geklappt hat, steht je Anfrage in notified_at und
-- notify_failures. Die tägliche Erinnerung (api/kurzcheck-erinnerung.js, Vercel
-- Cron) liest nur Zählwerte über kurzcheck_reminder_status und meldet offene
-- und nicht gemeldete Anfragen, damit kein Ausfall still bleibt.
-- ---------------------------------------------------------------------------

create table if not exists public.kurzcheck_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  check_key text not null
    check (check_key in ('schwangerschaft')),
  thema text not null
    check (thema in ('vorsorge', 'klinikschutz-kind', 'beides')),
  kasse text not null
    check (kasse in ('tk', 'barmer', 'dak', 'aok', 'ikk-classic', 'andere')),
  first_name text not null
    check (char_length(first_name) between 1 and 80),
  phone text
    check (phone is null or char_length(phone) between 6 and 40),
  email text
    check (
      email is null
      or (
        char_length(email) between 5 and 254
        and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
      )
    ),
  consent_contact boolean not null
    check (consent_contact = true),
  consent_health_data boolean not null
    check (consent_health_data = true),
  consent_text_version text not null
    check (char_length(consent_text_version) between 3 and 60),
  consent_at timestamptz not null default now(),
  source text not null default 'website_kurzcheck'
    check (source = 'website_kurzcheck'),
  utm jsonb
    check (
      utm is null
      or (
        jsonb_typeof(utm) = 'object'
        and (utm - array['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) = '{}'::jsonb
        and pg_column_size(utm) <= 2048
      )
    ),
  ip_hash text
    check (ip_hash is null or ip_hash ~ '^[0-9a-f]{64}$'),
  status text not null default 'neu'
    check (status in ('neu', 'kontaktiert', 'erledigt')),
  notes text
    check (notes is null or char_length(notes) <= 500),
  notified_at timestamptz,
  notify_failures smallint not null default 0
    check (notify_failures between 0 and 1000),
  constraint kurzcheck_leads_contact_check
    check (phone is not null or email is not null)
);

comment on table public.kurzcheck_leads is
  'Anfragen aus dem Kurzcheck mit Gesundheitsbezug (Art. 9 DSGVO). Einfügen nur über public.submit_kurzcheck_lead mit Token, Löschung ab Tag 89 durch private.purge_kurzcheck_leads().';
comment on column public.kurzcheck_leads.ip_hash is
  'HMAC-SHA-256 mit LEAD_IP_SALT über die IP (IPv6 als /64-Netz), nie die IP selbst.';
comment on column public.kurzcheck_leads.notes is
  'Nur für Healio. Keine weiteren Gesundheitsangaben eintragen.';
comment on column public.kurzcheck_leads.notified_at is
  'Zeitpunkt der Eingangsmail oder der Erinnerung an info@healio.de. Leer heißt: Healio wurde noch nicht benachrichtigt.';
comment on column public.kurzcheck_leads.notify_failures is
  'Fehlgeschlagene Versuche der Eingangsmail. Die tägliche Erinnerung holt sie nach.';

create index if not exists kurzcheck_leads_created_at_idx
  on public.kurzcheck_leads (created_at);
create index if not exists kurzcheck_leads_ip_hash_created_at_idx
  on public.kurzcheck_leads (ip_hash, created_at)
  where ip_hash is not null;

alter table public.kurzcheck_leads enable row level security;
alter table public.kurzcheck_leads force row level security;

revoke all on table public.kurzcheck_leads from public, anon, authenticated;
grant select, insert, update, delete on table public.kurzcheck_leads to service_role;

-- Frühere Fassung dieser Datei gab anon ein direktes Insert-Recht. Falls sie
-- schon einmal eingespielt wurde, verschwindet die Policy hier wieder.
drop policy if exists anon_insert_kurzcheck_leads on public.kurzcheck_leads;

-- ---------------------------------------------------------------------------
-- Token für den Schreibweg (nur der SHA-256-Wert, nie der Klartext)
-- ---------------------------------------------------------------------------

create table if not exists private.kurzcheck_ingest_tokens (
  token_name text primary key
    check (char_length(token_name) between 3 and 80),
  token_sha256 bytea not null
    check (octet_length(token_sha256) = 32),
  enabled boolean not null default true,
  valid_from timestamptz not null default now(),
  -- Leer heißt: kein Ablauf. Nur bei Bedarf setzen und dann rechtzeitig tauschen.
  expires_at timestamptz,
  rotated_at timestamptz
);

alter table private.kurzcheck_ingest_tokens enable row level security;
alter table private.kurzcheck_ingest_tokens force row level security;
revoke all on table private.kurzcheck_ingest_tokens from public, anon, authenticated;

-- Gemeinsame Tokenprüfung für alle Schreib- und Lesewege der Funktionen.
create or replace function private.kurzcheck_token_valid(p_token text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select p_token is not null
     and char_length(p_token) >= 32
     and exists (
       select 1
         from private.kurzcheck_ingest_tokens as token
        where token.enabled
          and token.valid_from <= now()
          and (token.expires_at is null or token.expires_at > now())
          and token.token_sha256 = pg_catalog.sha256(pg_catalog.convert_to(p_token, 'UTF8'))
     );
$$;

revoke all on function private.kurzcheck_token_valid(text) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Bremse: je Absender wie in der Funktion, dazu eine sehr hohe Gesamtgrenze
-- nur als Speicherschutz. Echter Verkehr liegt weit darunter; wer sie
-- erreichen will, braucht 400 verschiedene Absender in zehn Minuten.
-- ---------------------------------------------------------------------------

create or replace function private.limit_kurzcheck_leads()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.ip_hash is not null and (
    select count(*)
      from public.kurzcheck_leads
     where ip_hash = new.ip_hash
       and created_at > now() - interval '10 minutes'
  ) >= 5 then
    raise exception 'kurzcheck_rate_limited' using errcode = 'P0001';
  end if;
  if (
    select count(*)
      from public.kurzcheck_leads
     where created_at > now() - interval '10 minutes'
  ) >= 2000 then
    raise exception 'kurzcheck_rate_limited' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

revoke all on function private.limit_kurzcheck_leads() from public, anon, authenticated;

drop trigger if exists kurzcheck_leads_rate_limit on public.kurzcheck_leads;
create trigger kurzcheck_leads_rate_limit
  before insert on public.kurzcheck_leads
  for each row
  execute function private.limit_kurzcheck_leads();

-- ---------------------------------------------------------------------------
-- Schreibweg für api/kurzcheck-lead.js
-- ---------------------------------------------------------------------------

create or replace function public.submit_kurzcheck_lead(p_token text, p_lead jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.kurzcheck_token_valid(p_token) then
    raise exception 'kurzcheck_forbidden' using errcode = '42501';
  end if;

  if p_lead is null or pg_catalog.jsonb_typeof(p_lead) <> 'object' then
    raise exception 'kurzcheck_invalid' using errcode = '22023';
  end if;

  -- Feste Spaltenliste: created_at, consent_at, status und notes setzt die
  -- Datenbank, egal was im Aufruf steht.
  insert into public.kurzcheck_leads (
    id,
    check_key,
    thema,
    kasse,
    first_name,
    phone,
    email,
    consent_contact,
    consent_health_data,
    consent_text_version,
    source,
    utm,
    ip_hash
  )
  values (
    coalesce((p_lead ->> 'id')::uuid, pg_catalog.gen_random_uuid()),
    p_lead ->> 'check_key',
    p_lead ->> 'thema',
    p_lead ->> 'kasse',
    p_lead ->> 'first_name',
    p_lead ->> 'phone',
    p_lead ->> 'email',
    (p_lead ->> 'consent_contact')::boolean,
    (p_lead ->> 'consent_health_data')::boolean,
    p_lead ->> 'consent_text_version',
    p_lead ->> 'source',
    case when pg_catalog.jsonb_typeof(p_lead -> 'utm') = 'object' then p_lead -> 'utm' end,
    p_lead ->> 'ip_hash'
  );
end;
$$;

revoke all on function public.submit_kurzcheck_lead(text, jsonb) from public, anon, authenticated;
grant execute on function public.submit_kurzcheck_lead(text, jsonb) to anon;

-- ---------------------------------------------------------------------------
-- Hinweisstatus und tägliche Erinnerung (nur Zählwerte, keine Personendaten)
-- ---------------------------------------------------------------------------

create or replace function public.record_kurzcheck_notification(p_token text, p_id uuid, p_ok boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.kurzcheck_token_valid(p_token) then
    raise exception 'kurzcheck_forbidden' using errcode = '42501';
  end if;
  if p_ok then
    update public.kurzcheck_leads
       set notified_at = coalesce(notified_at, now())
     where id = p_id;
  else
    update public.kurzcheck_leads
       set notify_failures = least(notify_failures + 1, 1000)
     where id = p_id;
  end if;
end;
$$;

revoke all on function public.record_kurzcheck_notification(text, uuid, boolean) from public, anon, authenticated;
grant execute on function public.record_kurzcheck_notification(text, uuid, boolean) to anon;

create or replace function public.kurzcheck_reminder_status(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_status jsonb;
begin
  if not private.kurzcheck_token_valid(p_token) then
    raise exception 'kurzcheck_forbidden' using errcode = '42501';
  end if;
  select pg_catalog.jsonb_build_object(
           'checked_at', now(),
           'open', count(*) filter (where lead.status = 'neu'),
           'open_overdue', count(*) filter (where lead.status = 'neu' and lead.created_at < now() - interval '24 hours'),
           'unannounced', count(*) filter (where lead.notified_at is null and lead.created_at < now() - interval '5 minutes')
         )
    into v_status
    from public.kurzcheck_leads as lead;
  return v_status;
end;
$$;

revoke all on function public.kurzcheck_reminder_status(text) from public, anon, authenticated;
grant execute on function public.kurzcheck_reminder_status(text) to anon;

create or replace function public.mark_kurzcheck_reminded(p_token text, p_until timestamptz)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if not private.kurzcheck_token_valid(p_token) then
    raise exception 'kurzcheck_forbidden' using errcode = '42501';
  end if;
  update public.kurzcheck_leads
     set notified_at = now()
   where notified_at is null
     and created_at < p_until - interval '5 minutes';
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function public.mark_kurzcheck_reminded(text, timestamptz) from public, anon, authenticated;
grant execute on function public.mark_kurzcheck_reminded(text, timestamptz) to anon;

-- ---------------------------------------------------------------------------
-- Einwilligungsnachweis, getrennt von der Anfrage und ohne Antworten
-- ---------------------------------------------------------------------------

create table if not exists private.kurzcheck_consent_proofs (
  request_id uuid primary key,
  consented_at timestamptz not null,
  consent_text_version text not null
    check (char_length(consent_text_version) between 3 and 60),
  first_name text not null
    check (char_length(first_name) between 1 and 80),
  phone text
    check (phone is null or char_length(phone) between 6 and 40),
  email text
    check (email is null or char_length(email) between 5 and 254),
  -- Widerruf: Healio trägt den Zeitpunkt ein und löscht die Anfrage; der
  -- Nachweis bleibt samt Widerruf für die Frist bestehen.
  revoked_at timestamptz,
  delete_after timestamptz not null
);

comment on table private.kurzcheck_consent_proofs is
  'Nachweis der Einwilligung ohne Antworten aus dem Kurzcheck. Frist ab Abschluss (Löschung) der Anfrage: mit Telefon fünf Jahre (§ 7a UWG), ohne Telefon bis Ende des dritten folgenden Kalenderjahres. Kein Fremdschlüssel, weil die Anfrage früher gelöscht wird. Lässt auf die Nutzung des Schwangerschafts-Checks schließen, Aufbewahrung daher auch nach Art. 9 Abs. 2 lit. f DSGVO.';

create index if not exists kurzcheck_consent_proofs_delete_after_idx
  on private.kurzcheck_consent_proofs (delete_after);

alter table private.kurzcheck_consent_proofs enable row level security;
alter table private.kurzcheck_consent_proofs force row level security;
revoke all on table private.kurzcheck_consent_proofs from public, anon, authenticated;
grant select, insert, update, delete on table private.kurzcheck_consent_proofs to service_role;

create or replace function private.copy_kurzcheck_consent_proof()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into private.kurzcheck_consent_proofs (
    request_id,
    consented_at,
    consent_text_version,
    first_name,
    phone,
    email,
    delete_after
  )
  values (
    new.id,
    new.consent_at,
    new.consent_text_version,
    new.first_name,
    new.phone,
    new.email,
    case
      when new.phone is not null then new.consent_at + interval '5 years 90 days'
      else pg_catalog.date_trunc('year', new.consent_at + interval '90 days') + interval '4 years'
    end
  )
  on conflict (request_id) do nothing;
  return null;
end;
$$;

revoke all on function private.copy_kurzcheck_consent_proof() from public, anon, authenticated;

drop trigger if exists kurzcheck_leads_consent_proof on public.kurzcheck_leads;
create trigger kurzcheck_leads_consent_proof
  after insert on public.kurzcheck_leads
  for each row
  execute function private.copy_kurzcheck_consent_proof();

-- Abschluss der Anfrage: Sobald sie gelöscht wird (von Hand oder im
-- Löschlauf), beginnt die Frist des Nachweises ab jetzt.
create or replace function private.close_kurzcheck_consent_proof()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update private.kurzcheck_consent_proofs
     set delete_after = case
       when old.phone is not null then now() + interval '5 years'
       else pg_catalog.date_trunc('year', now()) + interval '4 years'
     end
   where request_id = old.id;
  return null;
end;
$$;

revoke all on function private.close_kurzcheck_consent_proof() from public, anon, authenticated;

drop trigger if exists kurzcheck_leads_close_consent_proof on public.kurzcheck_leads;
create trigger kurzcheck_leads_close_consent_proof
  after delete on public.kurzcheck_leads
  for each row
  execute function private.close_kurzcheck_consent_proof();

-- ---------------------------------------------------------------------------
-- Täglicher Löschlauf
-- ---------------------------------------------------------------------------

create or replace function private.purge_kurzcheck_leads()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Ab Tag 89, damit der tägliche Lauf die Zusage „spätestens 90 Tage“ hält.
  delete from public.kurzcheck_leads
   where created_at < now() - interval '89 days';
  delete from private.kurzcheck_consent_proofs
   where delete_after < now();
end;
$$;

revoke all on function private.purge_kurzcheck_leads() from public, anon, authenticated;

create extension if not exists pg_cron with schema pg_catalog;
grant usage on schema cron to postgres;

-- cron.schedule ersetzt einen gleichnamigen Auftrag, die Datei bleibt damit
-- wiederholbar. 03:15 UTC ist nachts in Hamburg.
select cron.schedule(
  'kurzcheck-loeschfrist',
  '15 3 * * *',
  $cron$select private.purge_kurzcheck_leads();$cron$
);

commit;

-- ---------------------------------------------------------------------------
-- Prüfung danach (lesend):
--
--   select grantee, privilege_type
--     from information_schema.role_table_grants
--    where table_schema = 'public' and table_name = 'kurzcheck_leads'
--      and grantee in ('anon', 'authenticated');
--   Erwartet: keine Zeile.
--
--   select policyname from pg_policies
--    where schemaname = 'public' and tablename = 'kurzcheck_leads';
--   Erwartet: keine Zeile.
--
--   select p.proname,
--          has_function_privilege('anon', p.oid, 'execute') as anon_rpc,
--          has_function_privilege('authenticated', p.oid, 'execute') as auth_rpc
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public' and p.proname like '%kurzcheck%';
--   Erwartet: vier Funktionen, anon_rpc = true, auth_rpc = false.
--
--   select token_name, enabled, expires_at, octet_length(token_sha256) as hash_bytes
--     from private.kurzcheck_ingest_tokens;
--   Erwartet: genau ein Token, hash_bytes = 32, expires_at leer.
--
--   select jobname, schedule, active from cron.job where jobname = 'kurzcheck-loeschfrist';
--   Erwartet: 15 3 * * *, active = true.
-- ---------------------------------------------------------------------------
