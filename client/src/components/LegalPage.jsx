import Seo from './Seo.jsx';
import PageHeader from './PageHeader.jsx';

export default function LegalPage({ title, path, description, updated, sections }) {
  return (
    <>
      <Seo path={path} title={title} description={description} />
      <PageHeader title={title} intro={<p>Last updated: {updated}</p>} />
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl space-y-10">
            <p className="rounded-xl bg-mist p-5 text-sm text-slate-ink">
              This is a general template, not legal advice. Review it, adjust it to how you actually
              operate, and consider having it checked by a qualified professional.
            </p>
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-2xl font-bold text-navy-900">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-charcoal">
                  {s.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
