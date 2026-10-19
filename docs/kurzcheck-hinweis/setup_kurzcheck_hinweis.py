"""Hinweisweg für den Kurzcheck Schwangerschaft einrichten (n8n-Weiterleiter + Vercel-Variablen).

Muster wie die Altersvorsorge-Startinfos (Healio/Altersvorsorgedepot-Funnel/startinfo):
eigener n8n-Workflow auf dem Hetzner-Server, vorhandener Brevo-Zugang aus n8n,
eigene Header-Credential, Vercel-Variablen per API. Frank muss keinen Schlüssel
eintragen. Brevo-Kontakte, Listen, Vorlagen und der gestoppte Kaltversand werden
nicht berührt; der Workflow ruft ausschließlich POST /v3/smtp/email mit festem
Absender und festem Empfänger info@healio.de auf.

Phasen (nur nach Franks Go ausführen, Reihenfolge einhalten):
  inspect   liest nur Metadaten (Absender, Brevo-Referenz, Workflows, Variablen)
  prepare   legt Header-Credential und inaktiven Workflow an und prüft beide
  activate  aktiviert den Workflow, prüft Negativfälle, legt die vier
            Produktionsvariablen an und gibt den SHA-256-Wert des Datenbank-Tokens
            für private.kurzcheck_ingest_tokens aus
  test      schickt genau eine Testmail über den Weiterleiter an info@healio.de

Schlüssel erscheinen nie in der Ausgabe. Der private Wiederaufnahme-Speicher hat
Modus 0600 und wird nach erfolgreichem activate gelöscht; danach liest test das
Relay-Geheimnis aus der verschlüsselten Vercel-Variablen.
"""
import argparse
import datetime as dt
import hashlib
import http.client
import json
import os
from pathlib import Path
import secrets
import socket
import ssl
import sys
from urllib.parse import urlsplit

HERE = Path(__file__).resolve().parent
FRANK_AI = Path(os.environ.get('HEALIO_FRANK_AI_DIR', '/Users/franksteinfurt/Frank AI'))
ENV_FILE = Path(os.environ.get('HEALIO_SETUP_ENV_FILE', FRANK_AI / 'Healio' / '.env'))
CHECKPOINT = Path(os.environ.get('HEALIO_KURZCHECK_CHECKPOINT', FRANK_AI / 'Healio' / 'Kurzcheck-Hinweis' / 'checkpoint.json'))
PRIVATE = Path(os.environ.get('HEALIO_KURZCHECK_PRIVATE', '/private/tmp/healio-kurzcheck-hinweis-20261019-secret.json'))
CODE_FILE = HERE / 'n8n-hinweis-code.txt'

WORKFLOW_NAME = 'Healio Kurzcheck Hinweis 2026-10-19'
HEADER_NAME = 'Healio Kurzcheck Hinweis Header 2026-10-19'
HEADER_FIELD = 'x-healio-kurzcheck-secret'
WEBHOOK_PATH = 'healio-kurzcheck-hinweis'
WEBHOOK = 'https://n8n.healio.de/webhook/' + WEBHOOK_PATH
PROJECT = 'prj_EQV4tZClsTS9L3d7JSifDiDyrts3'
TEAM = 'team_QzhFFzVtPCUJdujdrktDh2Lc'
# Vorhandener, abgenommener Workflow, aus dem die Brevo-Referenz gelesen wird.
REFERENCE_WORKFLOW = 'DT8OMTwbP6WKvTHj'
REFERENCE_NODE = 'Eigene Brevo DOI'
BREVO_CREDENTIAL = 'LjQ9YaP5Cyc1Ifw5'
UA = 'healio-setup/1.0 (+https://healio.de)'
BASES = {'brevo': 'https://api.brevo.com/v3', 'n8n': 'https://n8n.healio.de/api/v1', 'vercel': 'https://api.vercel.com'}
ENV_KEYS = ['KURZCHECK_NOTIFY_WEBHOOK_URL', 'KURZCHECK_NOTIFY_WEBHOOK_SECRET', 'KURZCHECK_INGEST_TOKEN', 'CRON_SECRET']


class SetupError(Exception):
    pass


def ipv4_connection(address, timeout=socket._GLOBAL_DEFAULT_TIMEOUT, source_address=None):
    host, port = address
    last_error = None
    for family, kind, proto, _, endpoint in socket.getaddrinfo(host, port, socket.AF_INET, socket.SOCK_STREAM):
        sock = socket.socket(family, kind, proto)
        try:
            if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                sock.settimeout(timeout)
            if source_address:
                sock.bind(source_address)
            sock.connect(endpoint)
            return sock
        except OSError as error:
            last_error = error
            sock.close()
    raise last_error or OSError('Keine IPv4-Verbindung')


def request(url, method='GET', headers=None, payload=None):
    """Keine Redirects; TLS-Prüfung; Antworten nur im Speicher."""
    parts = urlsplit(url)
    if parts.scheme != 'https' or parts.hostname not in {'api.brevo.com', 'n8n.healio.de', 'api.vercel.com'}:
        raise SetupError('Zielhost nicht erlaubt')
    conn = http.client.HTTPSConnection(parts.hostname, timeout=30, context=ssl.create_default_context())
    conn._create_connection = ipv4_connection
    body = None if payload is None else json.dumps(payload, ensure_ascii=False).encode('utf-8')
    all_headers = {'accept': 'application/json', 'content-type': 'application/json', 'user-agent': UA, **(headers or {})}
    try:
        conn.request(method, parts.path + ('?' + parts.query if parts.query else ''), body=body, headers=all_headers)
        res = conn.getresponse()
        raw = res.read()
        try:
            parsed = json.loads(raw) if raw else {}
        except (json.JSONDecodeError, UnicodeDecodeError):
            parsed = {}
        return res.status, parsed
    finally:
        conn.close()


def read_env():
    values = {}
    for line in ENV_FILE.read_text(encoding='utf-8').splitlines():
        if '=' in line and not line.lstrip().startswith('#'):
            key, value = line.split('=', 1)
            values[key.strip()] = value.strip().strip('"').strip("'")
    return values


class API:
    def __init__(self):
        values = read_env()
        auth = json.loads((Path.home() / 'Library/Application Support/com.vercel.cli/auth.json').read_text())
        self.headers = {
            'brevo': {'api-key': values.get('BREVO_API_KEY', '')},
            'n8n': {'X-N8N-API-KEY': values.get('N8N_API_KEY', '')},
            'vercel': {'Authorization': 'Bearer ' + auth.get('token', '')},
        }
        if not all([values.get('BREVO_API_KEY'), values.get('N8N_API_KEY'), auth.get('token')]):
            raise SetupError('Ein erforderlicher vorhandener Zugang fehlt')

    def raw(self, service, method, path, data=None):
        return request(BASES[service] + path, method, self.headers[service], data)

    def call(self, service, method, path, data=None, statuses=(200, 201, 204)):
        status, result = self.raw(service, method, path, data)
        if status not in statuses:
            # Keine API-Fehlermeldungen ausgeben: sie könnten Eingaben wiederholen.
            raise SetupError(f'{service} {method} {path.split("?")[0]}: HTTP {status}')
        return result


def save(cp):
    cp['updated_at'] = dt.datetime.now(dt.timezone.utc).isoformat()
    CHECKPOINT.parent.mkdir(parents=True, exist_ok=True)
    CHECKPOINT.write_text(json.dumps(cp, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def private_secrets(create):
    """Drei eigene Zufallswerte, nur für die Wiederaufnahme zwischen prepare und activate.

    Nur prepare darf neue Werte erzeugen. Fehlt der Speicher in activate (zum
    Beispiel nach einem Neustart, /private/tmp wird geleert), bricht das Skript
    mit einer klaren Meldung ab, statt neue Werte zu erzeugen, die nicht mehr zur
    Header-Credential in n8n passen.
    """
    if PRIVATE.exists():
        if PRIVATE.stat().st_mode & 0o077:
            raise SetupError('Privater Wiederaufnahme-Speicher ist nicht auf 0600 beschränkt')
        values = json.loads(PRIVATE.read_text())
    elif not create:
        raise SetupError('Wiederaufnahme-Speicher fehlt: n8n-Credential und Workflow aus dem Checkpoint löschen und prepare neu starten')
    else:
        values = {'relay': secrets.token_urlsafe(48), 'ingest': secrets.token_urlsafe(48), 'cron': secrets.token_urlsafe(48)}
        fd = os.open(PRIVATE, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, 'w') as stream:
            json.dump(values, stream)
    if any(len(values.get(key, '')) < 32 for key in ('relay', 'ingest', 'cron')):
        raise SetupError('Ein eigener Zufallswert ist zu kurz')
    return values


def validate_code():
    code = CODE_FILE.read_text(encoding='utf-8')
    if 'info@healio.de' not in code or '/contacts' in code:
        raise SetupError('Hinweis-Code entspricht nicht dem geprüften Stand')
    return code


def workflow(cp, brevo_ref):
    credential = {'id': cp['header_credential_id'], 'name': HEADER_NAME}
    nodes = [
        {'id': 'kurzcheck-webhook', 'name': 'Kurzcheck Website', 'type': 'n8n-nodes-base.webhook', 'typeVersion': 2, 'position': [0, 0],
         'webhookId': 'healio-kurzcheck-hinweis-20261019',
         'parameters': {'httpMethod': 'POST', 'path': WEBHOOK_PATH, 'authentication': 'headerAuth', 'responseMode': 'responseNode', 'options': {}},
         'credentials': {'httpHeaderAuth': credential}},
        {'id': 'kurzcheck-validation', 'name': 'Hinweis prüfen und Mail bauen', 'type': 'n8n-nodes-base.code', 'typeVersion': 2, 'position': [220, 0],
         'parameters': {'jsCode': validate_code()}},
        {'id': 'kurzcheck-valid', 'name': 'Gültig?', 'type': 'n8n-nodes-base.if', 'typeVersion': 1, 'position': [440, 0],
         'parameters': {'conditions': {'boolean': [{'value1': '={{ $json.ok }}', 'value2': True}]}}},
        {'id': 'kurzcheck-mail', 'name': 'Brevo Transaktionsmail', 'type': 'n8n-nodes-base.httpRequest', 'typeVersion': 4.2, 'position': [660, -100],
         'onError': 'continueRegularOutput',
         'parameters': {'method': 'POST', 'url': 'https://api.brevo.com/v3/smtp/email',
                        'authentication': 'genericCredentialType', 'genericAuthType': 'httpHeaderAuth', 'sendHeaders': True,
                        'headerParameters': {'parameters': [{'name': 'User-Agent', 'value': UA}]},
                        'sendBody': True, 'specifyBody': 'json', 'jsonBody': '={{ JSON.stringify($json.payload) }}',
                        'options': {'timeout': 10000, 'response': {'response': {'fullResponse': True, 'neverError': True}}}},
         'credentials': {'httpHeaderAuth': brevo_ref}},
        {'id': 'kurzcheck-result', 'name': 'Nur bestätigte Annahme', 'type': 'n8n-nodes-base.code', 'typeVersion': 2, 'position': [880, -100],
         'parameters': {'jsCode': "const accepted = $json.statusCode === 201 && typeof $json.body?.messageId === 'string'; return [{json:{accepted,status:accepted?200:502}}];"}},
        {'id': 'kurzcheck-response', 'name': 'Annahme antworten', 'type': 'n8n-nodes-base.respondToWebhook', 'typeVersion': 1.1, 'position': [1100, -100],
         'parameters': {'respondWith': 'json', 'responseBody': '={{ JSON.stringify({accepted:$json.accepted}) }}', 'options': {'responseCode': '={{ $json.status }}'}}},
        {'id': 'kurzcheck-reject', 'name': 'Ungültig ablehnen', 'type': 'n8n-nodes-base.respondToWebhook', 'typeVersion': 1.1, 'position': [660, 100],
         'parameters': {'respondWith': 'json', 'responseBody': '{"accepted":false}', 'options': {'responseCode': '={{ $json.status }}'}}},
    ]

    def link(name):
        return {'node': name, 'type': 'main', 'index': 0}
    return {'name': WORKFLOW_NAME,
            'settings': {'executionOrder': 'v1', 'saveDataSuccessExecution': 'none', 'saveDataErrorExecution': 'none',
                         'saveManualExecutions': False, 'saveExecutionProgress': False},
            'nodes': nodes,
            'connections': {
                'Kurzcheck Website': {'main': [[link('Hinweis prüfen und Mail bauen')]]},
                'Hinweis prüfen und Mail bauen': {'main': [[link('Gültig?')]]},
                'Gültig?': {'main': [[link('Brevo Transaktionsmail')], [link('Ungültig ablehnen')]]},
                'Brevo Transaktionsmail': {'main': [[link('Nur bestätigte Annahme')]]},
                'Nur bestätigte Annahme': {'main': [[link('Annahme antworten')]]},
            }}


def brevo_ref_from(wf, node_name):
    node = next((n for n in wf.get('nodes', []) if n.get('name') == node_name), None)
    ref = (node or {}).get('credentials', {}).get('httpHeaderAuth', {})
    if str(ref.get('id')) != BREVO_CREDENTIAL:
        raise SetupError('Workflow verwendet nicht die bekannte vorhandene Brevo-Referenz')
    return ref


def inspect(api):
    senders = api.call('brevo', 'GET', '/senders').get('senders', [])
    sender = [s for s in senders if s.get('email', '').lower() == 'info@healio.de']
    if len(sender) != 1 or sender[0].get('active') is not True:
        raise SetupError('Vorhandener info@healio.de-Absender ist nicht aktiv verifiziert')
    reference = api.call('n8n', 'GET', '/workflows/' + REFERENCE_WORKFLOW)
    brevo_ref = brevo_ref_from(reference, REFERENCE_NODE)
    workflows = api.call('n8n', 'GET', '/workflows?limit=250').get('data', [])
    envs = api.call('vercel', 'GET', f'/v9/projects/{PROJECT}/env?teamId={TEAM}').get('envs', [])
    return {'sender_verified': True, 'brevo_ref': brevo_ref, 'workflows': workflows, 'envs': envs}


def prepare(api, cp, info):
    if any(w.get('name') == WORKFLOW_NAME and w.get('id') != cp.get('workflow_id') for w in info['workflows']):
        raise SetupError('Eigener Workflow existiert außerhalb des Checkpoints; keine Dublette angelegt')
    if any(e.get('key') in ENV_KEYS and e.get('key') not in cp.get('vercel_env_ids', {}) for e in info['envs']):
        raise SetupError('Eine der Vercel-Variablen existiert ohne Checkpoint; nichts überschrieben')
    values = private_secrets(create=not cp.get('header_credential_id'))
    if cp.get('relay_sha256') and hashlib.sha256(values['relay'].encode('utf-8')).hexdigest() != cp['relay_sha256']:
        raise SetupError('Wiederaufnahme-Speicher passt nicht zur angelegten n8n-Credential')
    if not cp.get('header_credential_id'):
        cp['header_credential_id'] = api.call('n8n', 'POST', '/credentials', {
            'name': HEADER_NAME, 'type': 'httpHeaderAuth', 'data': {'name': HEADER_FIELD, 'value': values['relay']}})['id']
        cp['relay_sha256'] = hashlib.sha256(values['relay'].encode('utf-8')).hexdigest()
        save(cp)
    if not cp.get('workflow_id'):
        cp['workflow_id'] = api.call('n8n', 'POST', '/workflows', workflow(cp, info['brevo_ref']))['id']
        save(cp)
    verify(api, cp)
    cp['prepared_verified'] = True
    save(cp)


def verify(api, cp, active=None):
    wf = api.call('n8n', 'GET', '/workflows/' + cp['workflow_id'])
    expected = workflow(cp, brevo_ref_from(wf, 'Brevo Transaktionsmail'))
    if wf.get('name') != WORKFLOW_NAME or wf.get('nodes') != expected['nodes'] or wf.get('connections') != expected['connections']:
        raise SetupError('Workflow stimmt nicht exakt mit der geprüften Struktur überein')
    for key, value in expected['settings'].items():
        if wf.get('settings', {}).get(key) != value:
            raise SetupError('Workflow-Speichereinstellung stimmt nicht')
    if active is not None and wf.get('active') is not active:
        raise SetupError('Workflow-Aktivstatus stimmt nicht')
    cp['verification'] = {'workflow_active': wf.get('active', False), 'no_execution_payloads_saved': True,
                          'brevo_endpoint': '/v3/smtp/email', 'recipient': 'info@healio.de', 'lists_touched': False}
    save(cp)


def received_at():
    now = dt.datetime.now(dt.timezone.utc)
    return now.strftime('%Y-%m-%dT%H:%M:%S.') + f'{now.microsecond // 1000:03d}Z'


def activate(api, cp):
    if not cp.get('prepared_verified'):
        raise SetupError('Prepare-Prüfgate fehlt')
    inspect(api)
    verify(api, cp)
    values = private_secrets(create=False)
    if hashlib.sha256(values['relay'].encode('utf-8')).hexdigest() != cp.get('relay_sha256'):
        raise SetupError('Wiederaufnahme-Speicher passt nicht zur angelegten n8n-Credential')
    api.call('n8n', 'POST', f'/workflows/{cp["workflow_id"]}/activate')
    verify(api, cp, active=True)
    invalid_auth, _ = request(WEBHOOK, 'POST', {HEADER_FIELD: 'invalid-kurzcheck-auth'}, {})
    invalid_payload, result = request(WEBHOOK, 'POST', {HEADER_FIELD: values['relay']}, {})
    foreign_field, result_foreign = request(WEBHOOK, 'POST', {HEADER_FIELD: values['relay']},
                                            {'kind': 'test', 'received_at': received_at(), 'email': 'x@example.test'})
    if invalid_auth not in (401, 403) or invalid_payload != 400 or result.get('accepted') is not False \
            or foreign_field != 400 or result_foreign.get('accepted') is not False:
        raise SetupError(f'Negativtest fehlgeschlagen: Auth HTTP {invalid_auth}, leer HTTP {invalid_payload}, Zusatzfeld HTTP {foreign_field}')
    cp['negative_smoke'] = {'invalid_auth_status': invalid_auth, 'empty_payload_status': invalid_payload,
                            'foreign_field_status': foreign_field, 'real_mail': False}
    save(cp)
    definitions = {
        'KURZCHECK_NOTIFY_WEBHOOK_URL': WEBHOOK,
        'KURZCHECK_NOTIFY_WEBHOOK_SECRET': values['relay'],
        'KURZCHECK_INGEST_TOKEN': values['ingest'],
        'CRON_SECRET': values['cron'],
    }
    existing = api.call('vercel', 'GET', f'/v9/projects/{PROJECT}/env?teamId={TEAM}').get('envs', [])
    for key, value in definitions.items():
        found = [e for e in existing if e.get('key') == key and 'production' in e.get('target', [])]
        if found:
            if len(found) != 1 or cp.get('vercel_env_ids', {}).get(key) != found[0].get('id'):
                raise SetupError('Bestehende Vercel-Variable wird nicht überschrieben: ' + key)
            continue
        created = api.call('vercel', 'POST', f'/v10/projects/{PROJECT}/env?teamId={TEAM}',
                           {'key': key, 'value': value, 'type': 'encrypted', 'target': ['production'],
                            'comment': 'Kurzcheck Schwangerschaft: EU-Weg und Hinweis an info@'})
        env = created.get('created', created)
        if isinstance(env, list):
            env = env[0]
        cp.setdefault('vercel_env_ids', {})[key] = env['id']
        save(cp)
    envs = api.call('vercel', 'GET', f'/v9/projects/{PROJECT}/env?teamId={TEAM}').get('envs', [])
    for key, value in definitions.items():
        env = next(e for e in envs if e['id'] == cp['vercel_env_ids'][key])
        if env.get('key') != key or env.get('type') != 'encrypted' or env.get('target') != ['production']:
            raise SetupError('Vercel-Metadaten stimmen nicht für ' + key)
        decrypted = api.call('vercel', 'GET', f'/v1/projects/{PROJECT}/env/{env["id"]}?teamId={TEAM}')
        if decrypted.get('value') != value:
            raise SetupError('Vercel-Wertprüfung fehlgeschlagen für ' + key)
    cp['ingest_token_sha256'] = hashlib.sha256(values['ingest'].encode('utf-8')).hexdigest()
    cp['production_environment_verified'] = True
    save(cp)
    # Alle Werte liegen jetzt verschlüsselt in Vercel und in n8n; die lokale Kopie wird entfernt.
    PRIVATE.unlink(missing_ok=True)


def test(api, cp):
    if not cp.get('production_environment_verified'):
        raise SetupError('activate ist noch nicht abgeschlossen')
    verify(api, cp, active=True)
    env_id = cp['vercel_env_ids']['KURZCHECK_NOTIFY_WEBHOOK_SECRET']
    secret = api.call('vercel', 'GET', f'/v1/projects/{PROJECT}/env/{env_id}?teamId={TEAM}').get('value', '')
    if len(secret) < 32:
        raise SetupError('Relay-Geheimnis nicht lesbar')
    status, result = request(WEBHOOK, 'POST', {HEADER_FIELD: secret}, {'kind': 'test', 'received_at': received_at()})
    if status != 200 or result.get('accepted') is not True:
        raise SetupError(f'Testmail nicht angenommen: HTTP {status}')
    cp['test_mail'] = {'accepted': True, 'at': received_at()}
    save(cp)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('phase', choices=['inspect', 'prepare', 'activate', 'test'])
    args = parser.parse_args()
    api = API()
    cp = json.loads(CHECKPOINT.read_text()) if CHECKPOINT.exists() else {}
    if args.phase == 'inspect':
        info = inspect(api)
        print(json.dumps({'sender_verified': info['sender_verified'], 'existing_brevo_credential_verified': True,
                          'own_workflow_count': sum(w.get('name') == WORKFLOW_NAME for w in info['workflows']),
                          'existing_env_keys': [e['key'] for e in info['envs'] if e.get('key') in ENV_KEYS]}, ensure_ascii=False))
        return
    if args.phase == 'prepare':
        prepare(api, cp, inspect(api))
    elif args.phase == 'activate':
        activate(api, cp)
    else:
        test(api, cp)
    print(json.dumps({'phase': args.phase, 'workflow_id': cp.get('workflow_id'), 'verification': cp.get('verification'),
                      'negative_smoke': cp.get('negative_smoke'),
                      'production_environment_verified': cp.get('production_environment_verified', False),
                      'ingest_token_sha256': cp.get('ingest_token_sha256'), 'test_mail': cp.get('test_mail')}, ensure_ascii=False))


if __name__ == '__main__':
    try:
        main()
    except (SetupError, OSError, KeyError, ValueError, StopIteration) as error:
        print(str(error) if isinstance(error, SetupError) else f'Lokaler/Netzwerkfehler: {type(error).__name__}', file=sys.stderr)
        sys.exit(1)
