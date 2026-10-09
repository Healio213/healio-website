export const STARTINFO_CONSENT_VERSION = 'altersvorsorge-startinfos-2026-10-09';
export const STARTINFO_CONSENT_TEXT = 'Ich möchte von Healio per E-Mail neue Informationen zum Altersvorsorgedepot, Hinweise zum Start ab 2027 und Einladungen zu passenden Webinaren erhalten. Ich kann mich jederzeit über den Abmeldelink in jeder E-Mail abmelden.';
export const STARTINFO_EVENT = 'healio:altersvorsorge-startinfo';

export const isAltersvorsorgeRoute = (path) => path === '/altersvorsorgedepot'
  || path === '/ratgeber/altersvorsorgedepot'
  || /^\/ratgeber\/(?:altersvorsorgedepot|riester)-[a-z0-9-]+$/.test(path);

export const openAltersvorsorgeStartinfo = () => window.dispatchEvent(new Event(STARTINFO_EVENT));
