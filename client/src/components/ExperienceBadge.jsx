import { site } from '../config/site.js';

// "10+ Years of Experience" indicator. The number comes from site.yearsExperience.
export default function ExperienceBadge({ className = '' }) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-3.5 pr-3.5 sm:gap-4 sm:py-3 sm:pl-4 sm:pr-5 ${className}`}
    >
      <span className="text-gradient shrink-0 font-display text-[clamp(2rem,1.6rem+1.2vw,2.6rem)] font-extrabold leading-none tracking-tight">
        {site.yearsExperience}
      </span>
      <span className="min-w-0 border-l border-white/15 pl-3 leading-snug sm:pl-4">
        <span className="block font-display text-[0.95rem] font-semibold text-white sm:text-base">Years of Experience</span>
        <span className="block text-[0.75rem] text-steel sm:text-sm">in software engineering and technology</span>
      </span>
    </div>
  );
}
