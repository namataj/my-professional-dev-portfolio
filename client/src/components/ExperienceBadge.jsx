import { site } from '../config/site.js';

// "10+ Years of Experience" indicator. The number comes from site.yearsExperience.
export default function ExperienceBadge({ className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-4 pr-5 ${className}`}
    >
      <span className="text-gradient font-display text-[2.6rem] font-extrabold leading-none tracking-tight">
        {site.yearsExperience}
      </span>
      <span className="border-l border-white/15 pl-4 leading-snug">
        <span className="block font-display text-base font-semibold text-white">Years of Experience</span>
        <span className="block text-sm text-steel">in software engineering and technology</span>
      </span>
    </div>
  );
}
