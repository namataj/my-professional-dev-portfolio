import { ExternalLink } from 'lucide-react';
import ProjectPreview from './ProjectPreview.jsx';
import { GitHubIcon } from './SocialIcons.jsx';

export const statusLabel = {
  concept: 'Concept',
  demo: 'Demo',
  complete: 'Completed',
};

export default function ProjectCard({ project, onViewDetails }) {
  const { name, category, status, description, tech, github, demo, image, preview } = project;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cloud bg-white">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-cloud">
        {image ? (
          <img src={image} alt={`Screenshot of ${name}`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <ProjectPreview type={preview} />
        )}
        <span className="absolute right-2 top-[3px] rounded bg-cyan px-1.5 py-px text-[11px] font-semibold leading-4 text-navy-900">
          {statusLabel[status] || status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-electric">{category}</p>
        <h3 className="mt-1.5 text-xl font-bold text-navy-900">{name}</h3>
        <p className="mt-2 text-[0.96rem] text-slate-ink">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {tech.map((t) => (
            <li key={t} className="rounded-md bg-mist px-2 py-0.5 text-[0.8rem] font-medium text-slate-ink">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <button type="button" onClick={() => onViewDetails?.(project)} className="btn-primary px-4 py-2.5 text-sm sm:py-2">
            View Details
          </button>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="btn-ghost-light px-3 py-2.5 text-sm sm:py-2">
              <GitHubIcon className="h-4 w-4" /> Code
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-ghost-light px-3 py-2.5 text-sm sm:py-2">
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
