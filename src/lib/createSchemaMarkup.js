/**
 * Utility functions to create JSON-LD Schema Markup for SEO
 */

export const createOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HEALIO GmbH",
    "legalName": "HEALIO GmbH",
    "url": "https://www.healio.de",
    "logo": "https://www.healio.de/favicon.svg",
    "description": "Ihr Experte für betriebliche Altersvorsorge (bAV) und betriebliche Krankenversicherung (bKV) in Hamburg.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Arndtstraße 6",
      "addressLocality": "Hamburg",
      "postalCode": "22085",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+494089755705",
      "contactType": "customer service",
      "email": "info@healio.de",
      "availableLanguage": ["German"]
    },
    "foundingDate": "2021",
    "sameAs": [
      "https://www.facebook.com/healio",
      "https://www.instagram.com/healio",
      "https://www.linkedin.com/company/healio"
    ]
  };
};

export const createServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Gesundheitsoptimierung & Bonusprogramm",
    "name": "Healio Gesundheitskonzept",
    "description": "Intelligente Kombination aus Zusatzversicherung und IKK Bonusprogramm für maximale Gesundheitsvorteile und Kostenerstattung.",
    "provider": {
      "@type": "Organization",
      "name": "Healio",
      "url": "https://www.healio.de"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Germany"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.healio.de",
      "servicePhone": "+49-40-1802-4898-0"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "description": "Kostenlose Beratung und Tarifberechnung"
    }
  };
};

export const createAggregateRatingSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Service",
      "name": "Healio Gesundheitskonzept"
    },
    "ratingValue": "5",
    "bestRating": "5",
    "ratingCount": "3"
  };
};

export const createWebPageSchema = (pageName, description) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageName,
    "description": description,
    "url": `https://www.healio.de/${pageName.toLowerCase().replace(/\s+/g, '-')}`,
    "publisher": {
      "@type": "Organization",
      "name": "Healio"
    },
    "inLanguage": "de-DE"
  };
};

export const createBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const createFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};