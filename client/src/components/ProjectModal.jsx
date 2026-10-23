import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ExternalLink, X } from 'lucide-react';
import ProjectPreview from './ProjectPreview.jsx';
import { GitHubIcon } from './SocialIcons.jsx';
import { statusLabel } from './ProjectCard.jsx';

// Accessible project details dialog: traps focus, closes on Escape or backdrop click.
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!project) return;
    lastFocused.current = document.activeElement;
    const dialog = dialogRef.current;
    dialog?.querySelector('button')?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialog) {
        const focusable = dialog.querySelectorAll('a[href], button:not([disabled])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocused.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl"
          >
            <div className="relative aspect-[16/8] overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={`Screenshot of ${project.name}`} className="h-full w-full object-cover" />
              ) : (
                <ProjectPreview type={project.preview} />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-7 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-electric">{project.category}</span>
                <span className="rounded-md bg-mist px-2 py-0.5 font-semibold text-navy-900">
                  {statusLabel[project.status] || project.status}
                </span>
              </div>
              <h2 id="project-modal-title" className="mt-2 text-2xl font-bold text-navy-900">
                {project.name}
              </h2>
              <p className="mt-3 text-slate-ink">{project.details}</p>

              <h3 className="mt-6 font-display text-sm font-semibold text-navy-900">Key features</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[0.95rem]">
                    <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 font-display text-sm font-semibold text-navy-900">Technologies</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-md bg-mist px-2 py-0.5 text-sm text-slate-ink">{t}</li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-cloud pt-6">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                    <GitHubIcon className="h-4 w-4" /> View code
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <ExternalLink size={16} aria-hidden="true" /> Live demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <p className="text-sm text-slate-ink">
                    This is a concept project. Code and demo links will be added once it is published.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
