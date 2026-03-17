
/**
 * Email Service using EmailJS with dynamic imports
 */

const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE', 
  serviceId: 'YOUR_SERVICE_ID_HERE', 
  templateId: 'YOUR_TEMPLATE_ID_HERE',
};

const formatEmployees = (value) => {
  const mapping = {
    '1-10': '1 bis 10 Mitarbeiter',
    '11-50': '11 bis 50 Mitarbeiter',
    '51-200': '51 bis 200 Mitarbeiter',
    '200+': 'Über 200 Mitarbeiter'
  };
  return mapping[value] || value;
};

const formatInterest = (value) => {
  const mapping = {
    'bkv': 'Betriebliche Krankenversicherung',
    'bav': 'Betriebliche Altersvorsorge',
    'both': 'Beides',
    'all': 'Ganzheitliche Analyse gewünscht'
  };
  return mapping[value] || value;
};

const formatExisting = (value) => {
  if (!value) return 'Keine Angabe';
  const mapping = {
    'none': 'Nein, noch nichts vorhanden',
    'bav': 'Ja, Altersvorsorge vorhanden',
    'bkv': 'Ja, Krankenversicherung vorhanden',
    'both': 'Ja, beides vorhanden'
  };
  return mapping[value] || value;
};

export const sendFormSubmissionEmail = async (formData) => {
  try {
    // Dynamically import emailjs only when needed
    const emailjs = (await import('@emailjs/browser')).default;
    emailjs.init(EMAILJS_CONFIG.publicKey);

    const timestamp = new Date().toLocaleString('de-DE');
    
    const templateParams = {
      from_name: formData.name || 'Keine Angabe',
      company: formData.company || 'Keine Angabe',
      email: formData.email || 'Keine Angabe',
      phone: formData.phone || 'Keine Angabe',
      employees: formatEmployees(formData.employees),
      interest: formatInterest(formData.interest),
      existing: formatExisting(formData.existing),
      message: formData.message || '',
      timestamp: timestamp,
      to_email: 'info@healio.de'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    return { 
      success: true, 
      message: 'Ihre Anfrage wurde erfolgreich gesendet.', 
      timestamp, 
      response 
    };
  } catch (error) {
    console.error('Email sending failed details:', error);
    let errorMessage = 'Ein unerwarteter Fehler ist aufgetreten.';
    if (error && error.text) {
      errorMessage = `Server-Fehler: ${error.text}`;
    } else if (error && error.message) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage, error };
  }
};

export const sendAppointmentEmail = async (formData) => {
  try {
    const emailjs = (await import('@emailjs/browser')).default;
    emailjs.init(EMAILJS_CONFIG.publicKey);

    const timestamp = new Date().toLocaleString('de-DE');
    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      message: formData.message || 'Keine zusätzliche Nachricht',
      type: 'Terminanfrage',
      timestamp: timestamp,
      to_email: 'info@healio.de'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId, 
      templateParams
    );

    return { success: true, message: 'Appointment email sent successfully', timestamp, response };
  } catch (error) {
    console.error('Appointment email sending failed:', error);
    return { success: false, message: error.text || error.message || 'Failed to send appointment email', error };
  }
};
