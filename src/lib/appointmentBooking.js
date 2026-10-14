const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Xomawz_P3MQ6F0mitt7Oj6eF1Px6h2TSBPuO2EvSH96yd2_ePTLHCUUwvCkKh8mNQDl0BvSdL';

export const APPOINTMENT_BOOKING = Object.freeze({
  provider: 'google_calendar',
  url: BOOKING_URL,
  // Google Calendar > sharing options > inline booking page, verified 2026-09-05.
  embedUrl: `${BOOKING_URL}?gv=true`,
  durationMinutes: 45,
  location: 'Google Meet',
});

// Frank explicitly selected the existing website calendar for this launch.
// The UI says appointment to match its current Google Meet setup.
export const PHONE_APPOINTMENT_BOOKING = APPOINTMENT_BOOKING;

export const getSafeAppointmentEmbedUrl = (value) => {
  const configuration = [APPOINTMENT_BOOKING, PHONE_APPOINTMENT_BOOKING]
    .find((booking) => booking && booking.embedUrl === value);
  if (typeof value !== 'string' || !configuration) return null;
  try {
    const url = new URL(value);
    const booking = new URL(configuration.url);
    if (url.origin !== booking.origin || url.pathname !== booking.pathname) return null;
    if (url.username || url.password || url.hash) return null;
    return url.toString();
  } catch {
    return null;
  }
};
