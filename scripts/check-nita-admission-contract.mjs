import assert from 'node:assert/strict';
import { createPilotAdmissionController } from '../server/nita/pilotAdmission.js';

const fingerprint = (value) => value.toString(16).padStart(64, '0');

{
  let currentTime = 1_000;
  const controller = createPilotAdmissionController({ now: () => currentTime });
  assert.equal(controller.admit('not-a-fingerprint').allowed, false, 'Ungültige Fingerprints müssen fail-closed bleiben.');
  assert.equal(controller.admit(fingerprint(1)).allowed, true);
  assert.equal(controller.admit(fingerprint(1)).allowed, true);
  const blocked = controller.admit(fingerprint(1));
  assert.deepEqual(blocked, { allowed: false, retryAfter: 600, reason: 'client_limit' });
  currentTime += 600_001;
  assert.equal(controller.admit(fingerprint(1)).allowed, true, 'Nach dem Client-Fenster muss der Pilot wieder zugänglich sein.');
}

{
  let currentTime = 2_000;
  const controller = createPilotAdmissionController({ now: () => currentTime });
  for (let index = 1; index <= 10; index += 1) {
    assert.equal(controller.admit(fingerprint(index)).allowed, true);
  }
  const blocked = controller.admit(fingerprint(11));
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.reason, 'hour_limit');
  assert.equal(blocked.retryAfter, 3_600);
  currentTime += 3_600_001;
  assert.equal(controller.admit(fingerprint(11)).allowed, true, 'Das globale Stundenfenster muss sauber auslaufen.');
}

{
  let currentTime = 0;
  const controller = createPilotAdmissionController({ now: () => currentTime });
  for (let batch = 0; batch < 3; batch += 1) {
    for (let index = 1; index <= 10; index += 1) {
      assert.equal(controller.admit(fingerprint((batch * 10) + index)).allowed, true);
    }
    currentTime += 3_600_001;
  }
  const blocked = controller.admit(fingerprint(31));
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.reason, 'day_limit', 'Die Tagesgrenze muss auch über mehrere Stundenfenster hinweg greifen.');
  assert.ok(blocked.retryAfter > 0 && blocked.retryAfter <= 86_400);
  currentTime = 86_400_001;
  assert.equal(controller.admit(fingerprint(31)).allowed, true, 'Das globale Tagesfenster muss sauber auslaufen.');
}

{
  const controller = createPilotAdmissionController({ now: () => Number.NaN });
  assert.equal(controller.admit(fingerprint(1)).allowed, false, 'Eine ungültige Serverzeit darf keine Session freigeben.');
}

console.log('Nita-Pilot-Admission erfüllt Client-, Stunden- und Tageslimits fail-closed.');
