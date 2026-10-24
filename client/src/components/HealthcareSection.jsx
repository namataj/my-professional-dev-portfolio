import { Link } from 'react-router-dom';
import { GraduationCap, Info } from 'lucide-react';
import Icon from './Icon.jsx';
import { homeHealthcareAreas } from '../data/healthcare.js';

// Healthcare technology vision for the homepage — a secondary specialization.
export default function HealthcareSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28" aria-labelledby="hc-heading">
      <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden="true" />
      <svg
        className="absolute -right-10 top-16 hidden w-[min(40vw,760px)] opacity-30 lg:block"
        viewBox="0 0 560 120"
        aria-hidden="true"
      >
        <path d="M0 70h200l20-40 26 80 28-70 18 30h268" fill="none" stroke="#1FD1E8" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>

      <div className="container-page relative">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-cyan">
            <GraduationCap size={16} aria-hidden="true" />
            Doctorate in Health Informatics — in progress
          </p>
          <h2 id="hc-heading" className="heading-section mt-5 font-bold">
            Bridging Software Engineering &amp; Healthcare Innovation
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            Alongside my software engineering work, my doctoral studies in Health Informatics are
            focused on how technology can make healthcare more efficient, connected, and
            patient-centered. My goal is to bring proven engineering and testing practices to secure,
            interoperable digital health solutions.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {homeHealthcareAreas.map((a) => (
            <li key={a.slug} className="bg-navy-900 p-6 transition-colors hover:bg-navy-800">
              <Icon name={a.icon} size={24} className="text-cyan" />
              <h3 className="mt-4 text-lg font-semibold">{a.name}</h3>
              <p className="mt-1.5 text-[0.95rem] text-steel">{a.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex max-w-2xl gap-3 text-[0.95rem] text-steel">
            <Info size={20} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
            These are the areas my doctoral studies and engineering work are building toward — a
            developing specialization, not a list of completed healthcare projects.
          </p>
          <Link to="/healthcare-technology" className="btn-cyan shrink-0">
            Explore Healthcare Technology
          </Link>
        </div>
      </div>
    </section>
  );
}
