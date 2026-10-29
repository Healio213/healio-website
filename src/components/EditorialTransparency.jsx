import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getEditorialTransparency } from '@/content/editorialTransparency';

// Verantwortlichkeit ist keine persönliche Autorenschaft oder medizinische Prüfung.
export default function EditorialTransparency({ authorName = null }) {
  const { lang } = useLanguage();
  const copy = getEditorialTransparency(lang);
  const linkClass = 'font-semibold text-[#076046] underline underline-offset-4';

  return (
    <section id="redaktion" aria-labelledby="editorial-heading" data-editorial-transparency className="scroll-mt-24 mt-10 rounded-2xl border border-emerald-100 bg-[#f4fbf8] p-5 text-slate-700 sm:p-8">
      <h2 id="editorial-heading" className="text-xl font-bold text-[#102333]">{copy.heading}</h2>
      {authorName && <p className="mt-3">{copy.authorLabel}<strong>{authorName}</strong></p>}
      <p className="mt-3 leading-7">{copy.publisher}<Link to={copy.profileHref} className={linkClass}>Frank Steinfurt</Link>{copy.role}</p>
      {copy.paragraphs.map((text) => <p key={text} className="mt-3 leading-7">{text}</p>)}
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
        {copy.links.map((link) => <li key={link.href}>{link.external
          ? <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{link.label}</a>
          : <Link to={link.href} className={linkClass}>{link.label}</Link>}</li>)}
      </ul>
    </section>
  );
}
