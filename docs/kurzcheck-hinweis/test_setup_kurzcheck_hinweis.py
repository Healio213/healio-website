"""Tests für setup_kurzcheck_hinweis.py ohne Netz.

Ausführen: python3 -m unittest discover -s docs/kurzcheck-hinweis -p 'test_setup_kurzcheck_hinweis.py' -v
"""
import copy
import hashlib
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest import mock

import setup_kurzcheck_hinweis as setup

BREVO_REF = {'id': setup.BREVO_CREDENTIAL, 'name': 'Brevo API (Auffangnetz)'}


class FakeAPI:
    """Bildet nur die Aufrufe nach, die das Skript machen darf."""

    def __init__(self, workflows=None, envs=None):
        self.calls = []
        self.workflows = {} if workflows is None else workflows
        self.envs = [] if envs is None else envs
        self.credentials = {}

    def call(self, service, method, path, data=None, statuses=(200, 201, 204)):
        self.calls.append((service, method, path.split('?')[0], copy.deepcopy(data)))
        if service == 'brevo' and path == '/senders':
            return {'senders': [{'id': 1, 'email': 'info@healio.de', 'active': True}]}
        if service == 'n8n' and method == 'GET' and path == '/workflows/' + setup.REFERENCE_WORKFLOW:
            return {'nodes': [{'name': setup.REFERENCE_NODE, 'credentials': {'httpHeaderAuth': BREVO_REF}}]}
        if service == 'n8n' and method == 'GET' and path.startswith('/workflows?'):
            return {'data': [{'id': key, 'name': value['name']} for key, value in self.workflows.items()]}
        if service == 'n8n' and method == 'POST' and path == '/credentials':
            self.credentials['cred-1'] = data
            return {'id': 'cred-1'}
        if service == 'n8n' and method == 'POST' and path == '/workflows':
            self.workflows['wf-1'] = {**data, 'id': 'wf-1', 'active': False}
            return {'id': 'wf-1'}
        if service == 'n8n' and method == 'GET' and path.startswith('/workflows/'):
            return copy.deepcopy(self.workflows[path.split('/')[2]])
        if service == 'n8n' and method == 'POST' and path.endswith('/activate'):
            self.workflows[path.split('/')[2]]['active'] = True
            return {}
        if service == 'vercel' and method == 'GET' and '/env/' in path:
            env_id = path.split('/env/')[1].split('?')[0]
            return {'value': next(e['value'] for e in self.envs if e['id'] == env_id)}
        if service == 'vercel' and method == 'GET':
            return {'envs': [{k: v for k, v in e.items() if k != 'value'} for e in self.envs]}
        if service == 'vercel' and method == 'POST':
            env = {'id': f'env-{len(self.envs) + 1}', 'key': data['key'], 'type': data['type'], 'target': data['target'], 'value': data['value']}
            self.envs.append(env)
            return {'created': {k: v for k, v in env.items() if k != 'value'}}
        raise AssertionError(f'Unerwarteter Aufruf: {service} {method} {path}')


class SetupTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        base = Path(self.tmp.name)
        self.patches = [
            mock.patch.object(setup, 'CHECKPOINT', base / 'checkpoint.json'),
            mock.patch.object(setup, 'PRIVATE', base / 'private.json'),
        ]
        for patch in self.patches:
            patch.start()

    def tearDown(self):
        for patch in self.patches:
            patch.stop()
        self.tmp.cleanup()

    def prepared(self, api):
        cp = {}
        setup.prepare(api, cp, setup.inspect(api))
        return cp

    def test_workflow_versendet_nur_transaktionsmail_an_info(self):
        wf = setup.workflow({'header_credential_id': 'cred-1'}, BREVO_REF)
        text = json.dumps(wf, ensure_ascii=False)
        self.assertNotIn('/contacts', text)
        self.assertNotIn('doubleOptin', text)
        self.assertNotIn('listIds', text)
        urls = [n['parameters'].get('url') for n in wf['nodes'] if n['type'] == 'n8n-nodes-base.httpRequest']
        self.assertEqual(urls, ['https://api.brevo.com/v3/smtp/email'])
        code = next(n for n in wf['nodes'] if n['name'] == 'Hinweis prüfen und Mail bauen')['parameters']['jsCode']
        self.assertEqual(code, setup.CODE_FILE.read_text(encoding='utf-8'))
        webhook = next(n for n in wf['nodes'] if n['type'] == 'n8n-nodes-base.webhook')
        self.assertEqual(webhook['parameters']['authentication'], 'headerAuth')
        self.assertEqual(webhook['parameters']['path'], setup.WEBHOOK_PATH)
        self.assertEqual(wf['settings']['saveDataSuccessExecution'], 'none')
        self.assertEqual(wf['settings']['saveDataErrorExecution'], 'none')
        self.assertIs(wf['settings']['saveManualExecutions'], False)
        result = next(n for n in wf['nodes'] if n['name'] == 'Nur bestätigte Annahme')['parameters']['jsCode']
        self.assertIn('statusCode === 201', result)
        self.assertIn('messageId', result)

    def test_prepare_legt_nur_credential_und_inaktiven_workflow_an(self):
        api = FakeAPI()
        cp = self.prepared(api)
        writes = [(s, m, p) for s, m, p, _ in api.calls if m == 'POST']
        self.assertEqual(writes, [('n8n', 'POST', '/credentials'), ('n8n', 'POST', '/workflows')])
        self.assertTrue(cp['prepared_verified'])
        self.assertFalse(api.workflows['wf-1']['active'])
        self.assertEqual(api.credentials['cred-1']['data']['name'], setup.HEADER_FIELD)
        self.assertGreaterEqual(len(api.credentials['cred-1']['data']['value']), 32)
        self.assertEqual(os.stat(setup.PRIVATE).st_mode & 0o777, 0o600)
        self.assertNotIn(api.credentials['cred-1']['data']['value'], setup.CHECKPOINT.read_text())

    def test_prepare_verweigert_dubletten_und_fremde_variablen(self):
        with self.assertRaises(setup.SetupError):
            setup.prepare(FakeAPI(workflows={'x': {'name': setup.WORKFLOW_NAME}}), {}, setup.inspect(FakeAPI(workflows={'x': {'name': setup.WORKFLOW_NAME}})))
        api = FakeAPI(envs=[{'id': 'e', 'key': 'CRON_SECRET', 'type': 'encrypted', 'target': ['production'], 'value': 'x' * 40}])
        with self.assertRaises(setup.SetupError):
            setup.prepare(api, {}, setup.inspect(api))

    def test_activate_prueft_negativfaelle_und_legt_vier_variablen_an(self):
        api = FakeAPI()
        cp = self.prepared(api)
        values = json.loads(setup.PRIVATE.read_text())
        seen = []

        def fake_request(url, method, headers, payload):
            seen.append((url, headers.get(setup.HEADER_FIELD), payload))
            if headers.get(setup.HEADER_FIELD) != values['relay']:
                return 403, {}
            return 400, {'accepted': False}

        with mock.patch.object(setup, 'request', side_effect=fake_request):
            setup.activate(api, cp)
        self.assertTrue(api.workflows['wf-1']['active'])
        self.assertEqual({e['key'] for e in api.envs}, set(setup.ENV_KEYS))
        self.assertTrue(all(e['type'] == 'encrypted' and e['target'] == ['production'] for e in api.envs))
        by_key = {e['key']: e['value'] for e in api.envs}
        self.assertEqual(by_key['KURZCHECK_NOTIFY_WEBHOOK_URL'], setup.WEBHOOK)
        self.assertEqual(by_key['KURZCHECK_NOTIFY_WEBHOOK_SECRET'], values['relay'])
        self.assertEqual(cp['ingest_token_sha256'], hashlib.sha256(values['ingest'].encode()).hexdigest())
        self.assertFalse(setup.PRIVATE.exists(), 'lokale Kopie der Geheimnisse bleibt liegen')
        self.assertFalse(any(e['value'] in setup.CHECKPOINT.read_text() for e in api.envs if e['key'] != 'KURZCHECK_NOTIFY_WEBHOOK_URL'))
        self.assertTrue(all(url == setup.WEBHOOK for url, _, _ in seen))
        self.assertEqual(len(seen), 3)

    def test_activate_bricht_ab_wenn_weiterleiter_falsches_annimmt(self):
        api = FakeAPI()
        cp = self.prepared(api)
        with mock.patch.object(setup, 'request', return_value=(200, {'accepted': True})):
            with self.assertRaises(setup.SetupError):
                setup.activate(api, cp)
        self.assertEqual(api.envs, [], 'Variablen trotz fehlgeschlagenem Negativtest angelegt')

    def test_testphase_schickt_genau_eine_testmail(self):
        api = FakeAPI()
        cp = self.prepared(api)
        values = json.loads(setup.PRIVATE.read_text())
        with mock.patch.object(setup, 'request', side_effect=lambda url, m, h, p: (403, {}) if h.get(setup.HEADER_FIELD) != values['relay'] else (400, {'accepted': False})):
            setup.activate(api, cp)
        sent = []

        def accept(url, method, headers, payload):
            sent.append(payload)
            return 200, {'accepted': True}

        with mock.patch.object(setup, 'request', side_effect=accept):
            setup.test(api, cp)
        self.assertEqual(len(sent), 1)
        self.assertEqual(sorted(sent[0].keys()), ['kind', 'received_at'])
        self.assertEqual(sent[0]['kind'], 'test')
        self.assertTrue(cp['test_mail']['accepted'])
        with mock.patch.object(setup, 'request', return_value=(502, {'accepted': False})):
            with self.assertRaises(setup.SetupError):
                setup.test(api, cp)

    def test_activate_erkennt_verlorenen_wiederaufnahme_speicher(self):
        api = FakeAPI()
        cp = self.prepared(api)
        self.assertEqual(len(cp['relay_sha256']), 64)
        setup.PRIVATE.unlink()
        with mock.patch.object(setup, 'request', side_effect=AssertionError('Webhook darf nicht aufgerufen werden')):
            with self.assertRaises(setup.SetupError) as raised:
                setup.activate(api, cp)
        self.assertIn('Wiederaufnahme-Speicher fehlt', str(raised.exception))
        self.assertFalse(api.workflows['wf-1']['active'], 'Workflow trotz fehlendem Speicher aktiviert')
        self.assertFalse(setup.PRIVATE.exists(), 'activate darf keine neuen Werte erzeugen')

    def test_activate_erkennt_fremden_wiederaufnahme_speicher(self):
        api = FakeAPI()
        cp = self.prepared(api)
        values = json.loads(setup.PRIVATE.read_text())
        values['relay'] = 'x' * 64
        setup.PRIVATE.write_text(json.dumps(values))
        os.chmod(setup.PRIVATE, 0o600)
        with self.assertRaises(setup.SetupError):
            setup.activate(api, cp)
        self.assertFalse(api.workflows['wf-1']['active'])

    def test_testphase_erst_nach_activate(self):
        with self.assertRaises(setup.SetupError):
            setup.test(FakeAPI(), {})


if __name__ == '__main__':
    unittest.main()
