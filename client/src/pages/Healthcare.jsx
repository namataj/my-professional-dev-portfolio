import { Link } from 'react-router-dom';
import { Check, Lock, Info } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Icon from '../components/Icon.jsx';
import { healthcareAreas } from '../data/healthcare.js';

const safeguards = [
  'Collect and store only the minimum health data a feature actually needs.',
  'Encrypt data in transit (HTTPS/TLS) and at rest.',
  'Role-based access control and audit logging for anyone viewing sensitive records.',
  'Business Associate Agreements with hosting and service providers where HIPAA applies.',
  'A formal risk assessment before any system handles protected health information.',
  'Synthetic or de-identified data for development, demos and testing.',
];

export default function Healthcare() {
  return (
    <>
      <Seo
        path="/healthcare-technology"
        title="Healthcare Technology Solutions & Health Informatics"
        description="Healthcare software development by a software engineer pursuing a Doctorate in Health Informatics: healthcare websites, management applications, data dashboards, API integration and testing."
      />
      <PageHeader
        title="Bridging Software Engineering & Healthcare Innovation"
        intro={
          <>
            <p>
              Technology has the power to transform healthcare, improve operational efficiency, and
              support better patient experiences.
            </p>
            <p>
              As a Software Engineer pursuing a Doctorate in Health Informatics, my goal is to bridge
              the gap between advanced software engineering and healthcare delivery.
            </p>
            <p>
              By combining my expertise in full-stack development, backend architecture, database
              systems, and software quality assurance with my growing knowledge of health informatics,
              I aim to contribute to secure, efficient, interoperable, and patient-centered digital
              health solutions.
            </p>
          </>
        }
      />

      {/* Honest framing */}
      <div className="border-b border-cloud bg-white">
        <div className="container-page flex gap-4 py-6 text-[0.98rem] text-slate-ink">
          <Info size={22} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-navy-900">A developing specialization.</strong> The
            areas below describe where my engineering skills and doctoral studies are focused. They are
            capabilities and goals I'm building toward — not a record of completed healthcare client
            engagements.
          </p>
        </div>
      </div>

      <section className="bg-mist py-16 sm:py-20" aria-labelledby="focus-heading">
        <div className="container-page">
          <SectionHeading id="focus-heading" title="Healthcare technology focus areas" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {healthcareAreas.map((a) => (
              <article key={a.slug} className="flex flex-col rounded-2xl border border-cloud bg-white p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-cyan">
                  <Icon name={a.icon} size={24} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy-900">{a.name}</h3>
                <p className="mt-3 text-sm font-semibold text-slate-ink">{a.listLabel}</p>
                <ul className="mt-2 space-y-2 text-[0.95rem]">
                  {a.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Link to={`/hire-me?service=${a.slug}`} className="btn-ghost-light px-4 py-2.5 text-sm">
                    Discuss this area
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & security */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="privacy-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric">
              <Lock size={24} aria-hidden="true" />
            </span>
            <SectionHeading
              id="privacy-heading"
              className="mt-5"
              title="Privacy and security come first"
              intro="Any system that handles protected health information needs safeguards designed in from the start. HIPAA compliance depends on how a whole organization operates — it can't be claimed for a website or application without a proper assessment, so I won't make that claim. What I can do is build with these practices in mind:"
            />
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-2">
            {safeguards.map((s) => (
              <li key={s} className="flex gap-3 rounded-xl bg-mist p-5 text-[0.96rem]">
                <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
        <svg className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2 opacity-20" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 64h470l26-48 34 96 36-80 22 32h612" fill="none" stroke="#1FD1E8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="container-page relative text-center">
          <p className="font-display text-lg font-semibold text-cyan">My vision</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">
            A future where technology makes healthcare more{' '}
            <span className="text-gradient">connected, efficient, accessible, and patient-centered.</span>
          </h2>
          <Link to="/contact" className="btn-cyan mt-10 px-7">
            Let's Explore Healthcare Innovation Together
          </Link>
        </div>
      </section>
    </>
  );
}
