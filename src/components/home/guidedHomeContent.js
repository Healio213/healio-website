const content = {
  de: {
    titleLead: 'Passender Schutz.',
    titleAccent: 'Gemeinsam geklärt.',
    description: 'Ambulant, Zahn oder Klinik: Wir klären deinen Schutz und Beitrag gemeinsam. Dein Kassenbonus kann mitbezahlen.',
    cta: 'Termin buchen',
    discoverCta: 'Schutz entdecken',
    hint: 'Wähle eine passende Zeit. Wir klären deinen Schutz gemeinsam.',
    finalTitle: 'Dein nächster Schritt? Gemeinsam klären.',
    finalDescription: 'Lass uns deinen Bedarf besprechen. Deinen Antrag prüfst du anschließend per E-Mail.',
    trustTitle: 'Gut begleitet. Bis zu deiner Entscheidung.',
    trustText: 'Wir klären mit dir Leistungen und Beitrag und begleiten dich bis zur Einreichung.',
  },
  en: {
    titleLead: 'Cover that fits.',
    titleAccent: 'Let’s work it out together.',
    description: 'Outpatient, dental or hospital cover: we work out your cover and premium together. Your statutory insurance bonus can help pay for it.',
    cta: 'Book an appointment',
    discoverCta: 'Explore cover',
    hint: 'Choose a time that suits you. We discuss your cover together.',
    finalTitle: 'Your next step? Let’s work it out.',
    finalDescription: 'Let’s talk about your needs. You then review your application by email.',
    trustTitle: 'Support for a confident decision.',
    trustText: 'We explain benefits and premiums with you and support you through submission.',
  },
};

export const getGuidedHomeContent = (language = 'de') => content[language] || content.de;
