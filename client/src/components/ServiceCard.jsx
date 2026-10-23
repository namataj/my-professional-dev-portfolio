import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import Icon from './Icon.jsx';
import { FrameworkBadges } from './HomeSections.jsx';

// Service card used on the Services page. "Learn more" expands the full list
// of deliverables and features in place; "Request a quote" opens the quote
// form with this service already selected.
export default function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false);
  const { slug, icon, name, summary, examples, features, showFrameworks, detailsPath } = service;
  const preview = examples.slice(0, 4);
  const detailsId = `${slug}-details`;

  return (
    <article
      id={slug}
      className="flex scroll-mt-28 flex-col rounded-2xl border border-cloud bg-white p-7 transition-[border-color,box-shadow] hover:border-electric/40 hover:shadow-[0_18px_40px_-24px_rgba(10,22,48,0.35)]"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-cyan">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="mt-5 text-xl font-bold text-navy-900">{name}</h3>
      <p className="mt-2 text-slate-ink">{summary}</p>

      {showFrameworks && (
        <div className="mt-5">
          <FrameworkBadges tone="light" />
        </div>
      )}

      <ul className="mt-5 space-y-2 text-[0.95rem] text-charcoal">
        {(expanded ? examples : preview).map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div id={detailsId} hidden={!expanded}>
        {features.length > 0 && (
          <div className="mt-5 border-t border-cloud pt-5">
            <h4 className="font-display text-sm font-semibold text-navy-900">Included features</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {features.map((f) => (
                <li key={f} className="rounded-md bg-mist px-2.5 py-1 text-sm text-slate-ink">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
        <Link to={`/hire-me?service=${slug}`} className="btn-primary px-4 py-2.5 text-sm">
          Request a Quote
        </Link>
        {detailsPath && (
          <Link to={detailsPath} className="btn-ghost-light px-4 py-2.5 text-sm">
            View Testing Expertise
          </Link>
        )}
        {(examples.length > preview.length || features.length > 0) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="btn-ghost-light px-4 py-2.5 text-sm"
          >
            {expanded ? 'Show less' : 'Learn More'}
            <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
}
