
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

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
      return { success: true, response };
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }
};
