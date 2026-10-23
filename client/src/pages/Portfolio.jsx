import { useMemo, useState } from 'react';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { CtaBand } from '../components/HomeSections.jsx';
import { projects, projectCategories } from '../data/projects.js';

export default function Portfolio() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => (category === 'All' ? projects : projects.filter((p) => p.category === category)),
    [category]
  );

  return (
    <>
      <Seo
        path="/portfolio"
        title="Portfolio & Projects"
        description="React websites, full-stack applications, backend APIs, test automation and healthcare technology demonstration projects by James Namata."
      />
      <PageHeader
        title="Portfolio & projects"
        intro={
          <p>
            Demonstration projects across React, full-stack development, APIs, test automation and
            healthcare data. Each is clearly labeled with its status.
          </p>
        }
      />

      <section className="bg-mist py-14 sm:py-16" aria-label="Projects">
        <div className="container-page">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {projectCategories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-cloud bg-white text-slate-ink hover:border-electric hover:text-electric'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-slate-ink" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
            {category !== 'All' && ` in ${category}`}.
          </p>

          {visible.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} onViewDetails={setSelected} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-cloud bg-white p-10 text-center text-slate-ink">
              No projects in this category yet. Choose another category to keep browsing.
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Have a project like these in mind?"
        text="I can build it for you. Tell me what you need and I'll reply with next steps."
      />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
