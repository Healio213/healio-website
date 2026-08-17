
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';
import { trackEvent } from '@/lib/analytics';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// GA4-Parameter erlauben nur einfache Token; Umlaute/Leerzeichen im
// pageSource-Label würden sonst vom Sanitizer verworfen.
const toPlacementToken = (value) => (
  String(value || 'unbekannt')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'unbekannt'
);

export const emailjsService = {
  normalizeData: (data, pageSource) => ({
    from_name: data.from_name || "",
    from_email: data.from_email || "",
    phone: data.phone || "",
    company: data.company || "",
    message: data.message || "",
    page_source: pageSource || "Unbekannt"
  }),
  
  sendEmail: async (formData, pageSource) => {
    try {
      const normalizedParams = emailjsService.normalizeData(formData, pageSource);
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          ...normalizedParams,
          to_email: 'info@healio.de',
        }
      );
      trackEvent('generate_lead', {
        component: 'contact_form',
        placement: toPlacementToken(pageSource),
      });
      return { success: true, response };
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }
};
