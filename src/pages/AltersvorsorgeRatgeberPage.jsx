import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import AltersvorsorgeIllustration from '@/components/sections/altersvorsorge/AltersvorsorgeIllustration';
import SEOHead from '@/components/SEOHead';
import { RATGEBER_ENTRIES } from '@/content/ratgeber/registry';
import { altersvorsorgeClusters, ALTERSVORSORGE_HUB_PATH } from '@/content/ratgeber/altersvorsorge/shared';

// Der Hub braucht nur Kartenmetadaten. Die vollständigen Artikel werden erst
// auf der jeweiligen Artikelseite über registry.loaders.js geladen.
const altersvorsorgeArticles = RATGEBER_ENTRIES.filter((entry) => entry.group === 'altersvorsorge');

const AltersvorsorgeRatgeberPage = () => (
  <>
    <SEOHead
      title="Altersvorsorgedepot: 24 Ratgeber zu Förderung und Riester | Healio"
      description="Altersvorsorgedepot ab 2027 verstehen: Förderung, Riester-Wechsel, Kinderzulage, Selbstständige, Kosten und Auszahlung. Mit Beispielen und amtlichen Quellen."
      canonicalUrl={`https://healio.de${ALTERSVORSORGE_HUB_PATH}`}
      schemaMarkup={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Ratgeber zum Altersvorsorgedepot',
        url: `https://healio.de${ALTERSVORSORGE_HUB_PATH}`,
        hasPart: altersvorsorgeArticles.map((article) => ({
          '@type': 'Article',
          headline: article.listTitle,
          url: `https://healio.de/ratgeber/${article.slug}`,
        })),
      }}
    />
    <main className="min-h-screen bg-[#f7f5f0] pb-20 pt-28 text-home-midnight sm:pt-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Link to="/ratgeber" className="text-sm font-semibold text-[#087654] underline underline-offset-4">Alle Healio-Ratgeber</Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#087654]">Altersvorsorge ab 2027</p>
            <h1 className="mt-4 max-w-[22ch] font-display text-[clamp(2.1rem,4.4vw,4.2rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">Was dir das neue Altersvorsorgedepot bringt.</h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-8 text-slate-700">Förderung verstehen, deinen Riester-Vertrag einordnen und eine Entscheidung mit offenen Kosten treffen. Hier findest du {altersvorsorgeArticles.length} Ratgeber mit konkreten Beispielen, Checklisten und amtlichen Quellen.</p>
            <p className="mt-4 max-w-[65ch] text-base leading-7 text-slate-600">Das neue Depot kann ab 2027 staatlich gefördert werden. Es investiert in Wertpapiere, deren Wert schwankt. Förderung und Rendite sind unterschiedliche Dinge. Das Geld ist für die Rente bestimmt.</p>
            <p className="mt-4 text-sm leading-6 text-slate-500">Redaktion: Healio GmbH · Quellenstand 8. Oktober 2026</p>
          </div>
          <aside className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
            <AltersvorsorgeIllustration kind="wissen" className="h-20 w-20" />
            <h2 className="mt-4 font-display text-2xl font-extrabold">Wo möchtest du anfangen?</h2>
            <nav aria-label="Themen zur Altersvorsorge" className="mt-5">
              <ul className="space-y-3">
                {altersvorsorgeClusters.map((cluster) => (
                  <li key={cluster.id}><a href={`#${cluster.id}`} className="flex min-h-11 items-center justify-between gap-3 text-base font-semibold text-[#087654] underline underline-offset-4">{cluster.title}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a></li>
                ))}
              </ul>
            </nav>
            <Link to="/altersvorsorgedepot#rechner" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-home-midnight px-5 py-3 text-center font-semibold text-white">Meinen Zuschuss berechnen<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            <p className="mt-3 text-sm leading-6 text-slate-500">Der Rechner ist ohne Anmeldung zugänglich.</p>
          </aside>
        </div>

        {altersvorsorgeClusters.map((cluster) => (
          <section key={cluster.id} id={cluster.id} aria-labelledby={`${cluster.id}-heading`} className="mt-16 scroll-mt-28">
            <AltersvorsorgeIllustration kind={cluster.id} className="mb-4 h-20 w-20" />
            <h2 id={`${cluster.id}-heading`} className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{cluster.title}</h2>
            <p className="mt-3 max-w-[70ch] text-base leading-7 text-slate-600">{cluster.description}</p>
            <ul className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {altersvorsorgeArticles.filter((article) => article.cluster === cluster.id).map((article) => (
                <li key={article.slug} className="min-w-0">
                  <article className="flex h-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-6">
                    <h3 className="font-display text-xl font-extrabold leading-snug"><Link to={`/ratgeber/${article.slug}`} className="rounded-sm underline decoration-emerald-200 underline-offset-4 hover:decoration-[#087654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">{article.listTitle}</Link></h3>
                    <p className="mt-4 text-base leading-7 text-slate-600">{article.listTeaser}</p>
                    <p className="mt-auto flex items-center gap-2 pt-5 text-sm text-slate-500"><Clock className="h-4 w-4" aria-hidden="true" />{article.readingTimeMinutes} Min. Lesezeit</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-16 rounded-3xl bg-home-midnight p-7 text-white sm:p-10" aria-labelledby="webinar-naechster-schritt">
          <h2 id="webinar-naechster-schritt" className="font-display text-2xl font-extrabold sm:text-3xl">Du möchtest die Fragen gemeinsam durchgehen?</h2>
          <p className="mt-4 max-w-[70ch] text-lg leading-8 text-slate-200">Lies zuerst den Zuschuss-Fahrplan oder lass dich über neue Details und den Start informieren. Im persönlichen Zuschuss-Check betrachten wir deine Situation und die Unterlagen. Webinar-Einladungen folgen, sobald Termine feststehen. Du entscheidest anschließend in Ruhe.</p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link to="/altersvorsorgedepot#webinar" className="inline-flex min-h-12 items-center justify-center rounded-full bg-home-mint px-6 py-3 font-semibold text-home-midnight">Fahrplan und Startinfos ansehen</Link>
            <Link to="/altersvorsorgedepot#zuschuss-check" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-6 py-3 font-semibold text-white">Zuschuss-Check ansehen</Link>
          </div>
        </section>
      </div>
    </main>
  </>
);

export default AltersvorsorgeRatgeberPage;
