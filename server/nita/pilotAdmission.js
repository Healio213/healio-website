const CLIENT_WINDOW_MS = 10 * 60 * 1000;
const CLIENT_LIMIT = 2;
const GLOBAL_HOUR_MS = 60 * 60 * 1000;
const GLOBAL_HOUR_LIMIT = 10;
const GLOBAL_DAY_MS = 24 * 60 * 60 * 1000;
const GLOBAL_DAY_LIMIT = 30;
const MAX_CLIENT_BUCKETS = 512;

const retainSince = (timestamps, threshold) => timestamps.filter((value) => value > threshold);

const retryAfterSeconds = (oldest, windowMs, now) => Math.max(
  1,
  Math.ceil((oldest + windowMs - now) / 1000),
);

export const createPilotAdmissionController = ({ now = Date.now } = {}) => {
  const clientBuckets = new Map();
  let globalTimestamps = [];

  return Object.freeze({
    admit(clientFingerprint) {
      const currentTime = now();
      if (
        typeof clientFingerprint !== 'string'
        || clientFingerprint.length !== 64
        || !/^[a-f0-9]+$/.test(clientFingerprint)
        || !Number.isFinite(currentTime)
      ) {
        return Object.freeze({ allowed: false, retryAfter: 600, reason: 'invalid_client' });
      }

      globalTimestamps = retainSince(globalTimestamps, currentTime - GLOBAL_DAY_MS);
      for (const [key, timestamps] of clientBuckets) {
        const active = retainSince(timestamps, currentTime - CLIENT_WINDOW_MS);
        if (active.length === 0) clientBuckets.delete(key);
        else clientBuckets.set(key, active);
      }

      const clientTimestamps = clientBuckets.get(clientFingerprint) || [];
      if (clientTimestamps.length >= CLIENT_LIMIT) {
        return Object.freeze({
          allowed: false,
          retryAfter: retryAfterSeconds(clientTimestamps[0], CLIENT_WINDOW_MS, currentTime),
          reason: 'client_limit',
        });
      }

      const hourly = retainSince(globalTimestamps, currentTime - GLOBAL_HOUR_MS);
      if (hourly.length >= GLOBAL_HOUR_LIMIT) {
        return Object.freeze({
          allowed: false,
          retryAfter: retryAfterSeconds(hourly[0], GLOBAL_HOUR_MS, currentTime),
          reason: 'hour_limit',
        });
      }

      if (globalTimestamps.length >= GLOBAL_DAY_LIMIT) {
        return Object.freeze({
          allowed: false,
          retryAfter: retryAfterSeconds(globalTimestamps[0], GLOBAL_DAY_MS, currentTime),
          reason: 'day_limit',
        });
      }

      if (!clientBuckets.has(clientFingerprint) && clientBuckets.size >= MAX_CLIENT_BUCKETS) {
        return Object.freeze({ allowed: false, retryAfter: 600, reason: 'capacity_limit' });
      }

      clientBuckets.set(clientFingerprint, [...clientTimestamps, currentTime]);
      globalTimestamps.push(currentTime);
      return Object.freeze({ allowed: true, retryAfter: 0, reason: 'admitted' });
    },
  });
};
