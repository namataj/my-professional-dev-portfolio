import Icon from './Icon.jsx';
import { skillGroups } from '../data/skills.js';

export function SkillBadge({ name, color, tone = 'light' }) {
  return (
    <li
      className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm font-medium ${
        tone === 'dark' ? 'border-white/10 bg-white/5 text-white' : 'border-cloud bg-white text-charcoal'
      }`}
    >
      <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: color }} aria-hidden="true" />
      {name}
    </li>
  );
}

// Skill groups in a two-column grid; large groups take the full width.
export default function Skills() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {skillGroups.map((g, i) => {
        // Full-width when it has many skills, or when it would sit alone in the last row.
        const wide = g.skills.length > 6 || (i === skillGroups.length - 1 && i % 2 === 1 && skillGroups[i - 1].skills.length > 6);
        return (
          <div
            key={g.name}
            className={`rounded-2xl border border-cloud bg-white p-6 ${wide ? 'md:col-span-2' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 text-cyan">
                <Icon name={g.icon} size={20} />
              </span>
              <h3 className="text-lg font-semibold text-navy-900">{g.name}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <SkillBadge key={s.name} {...s} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
