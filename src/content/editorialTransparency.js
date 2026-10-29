// Gemeinsame Quelle für React, statisches Blog-HTML und dessen Ausfallfallback.
export function getEditorialTransparency(lang = 'de') {
  const en = lang === 'en';
  return {
    heading: en ? 'Who is responsible for this content?' : 'Wer steht hinter diesem Inhalt?',
    authorLabel: en ? 'Author: ' : 'Autor: ',
    publisher: en ? 'Publisher: Healio GmbH. Editorial responsibility: ' : 'Herausgeber: Healio GmbH. Redaktionell verantwortlich: ',
    role: en ? ', founder and managing director.' : ', Gründer und Geschäftsführer.',
    profileHref: en ? '/en/about#frank-steinfurt' : '/about#frank-steinfurt',
    paragraphs: en ? [
      'Our focus is health insurance, reimbursement and health budgets. Statutes, legislation and policy documents provide the basis for these topics; the sources are linked in the articles. Medical diagnosis and treatment belong with qualified health professionals.',
      'Healio GmbH holds permission under section 34d (1) GewO. Register number: D-C1LE-OVLQH-98; registration authority: IHK Hamburg. This permission covers insurance mediation.',
      'If you take out an insurance policy through Healio, we generally receive a commission from the insurer. General information does not replace an assessment of your circumstances, the policy terms or medical advice.',
    ] : [
      'Unser Schwerpunkt sind Versicherungen, Erstattung und Gesundheitsbudgets. Grundlage dafür sind Satzungen, Gesetzestexte und Tarifunterlagen; die Quellen verlinken wir in den Artikeln. Medizinische Diagnose und Behandlung gehören in die Hände qualifizierter Gesundheitsberufe.',
      'Die Healio GmbH hat die Erlaubnis nach § 34d Abs. 1 GewO. Registrierungsnummer: D-C1LE-OVLQH-98; Registrierungsstelle: IHK Hamburg. Diese Erlaubnis betrifft die Versicherungsvermittlung.',
      'Bei einem Versicherungsabschluss über Healio erhalten wir in der Regel eine Courtage vom Versicherer. Allgemeine Informationen ersetzen keine Prüfung deiner persönlichen Situation, der Versicherungsbedingungen oder eine medizinische Beratung.',
    ],
    links: [
      { href: 'https://www.vermittlerregister.info', label: en ? 'Check the official register' : 'Offizielles Vermittlerregister prüfen', external: true },
      { href: en ? '/en/legal-notice' : '/impressum', label: en ? 'Legal notice' : 'Impressum' },
      { href: en ? '/en/initial-information' : '/erstinformation', label: en ? 'Initial information and remuneration' : 'Erstinformation und Vergütung' },
      { href: en ? '/en/contact' : '/kontakt', label: en ? 'Report a correction' : 'Korrektur melden' },
    ],
  };
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export function createEditorialTransparencyHtml(authorName, lang = 'de') {
  const copy = getEditorialTransparency(lang);
  return `<section id="redaktion" aria-labelledby="editorial-heading" data-editorial-transparency class="scroll-mt-24 mt-10 rounded-2xl border border-emerald-100 bg-[#f4fbf8] p-5 text-slate-700 sm:p-8">
    <h2 id="editorial-heading" class="text-xl font-bold text-[#102333]">${escapeHtml(copy.heading)}</h2>
    ${authorName ? `<p class="mt-3">${escapeHtml(copy.authorLabel)}<strong>${escapeHtml(authorName)}</strong></p>` : ''}
    <p class="mt-3 leading-7">${escapeHtml(copy.publisher)}<a href="${copy.profileHref}" class="font-semibold text-[#076046] underline underline-offset-4">Frank Steinfurt</a>${escapeHtml(copy.role)}</p>
    ${copy.paragraphs.map((text) => `<p class="mt-3 leading-7">${escapeHtml(text)}</p>`).join('')}
    <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">${copy.links.map((link) => `<li><a href="${link.href}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''} class="font-semibold text-[#076046] underline underline-offset-4">${escapeHtml(link.label)}</a></li>`).join('')}</ul>
  </section>`;
}
