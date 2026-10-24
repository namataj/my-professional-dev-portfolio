import { Link } from 'react-router-dom';
import { Check, GraduationCap } from 'lucide-react';
import Icon from './Icon.jsx';
import SectionHeading from './SectionHeading.jsx';
import Skills from './Skills.jsx';
import { homeServices } from '../data/services.js';
import { testFrameworks, TEST_AUTOMATION_SLUG } from '../data/testAutomation.js';

// ---------------------------------------------------------------------------
// What Can I Build for You? — the primary business section
// ---------------------------------------------------------------------------
function HomeServiceCard({ service }) {
  return (
    <article className="flex flex-col rounded-2xl border border-cloud bg-white p-7 transition-[border-color,box-shadow] hover:border-electric/40 hover:shadow-[0_18px_40px_-24px_rgba(10,22,48,0.35)]">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-electric">
        <Icon name={service.icon} size={24} />
      </span>
      <h3 className="mt-5 text-xl font-bold text-navy-900">{service.name}</h3>
      <p className="mt-2 text-slate-ink">{service.summary}</p>
      <div className="mt-auto pt-6">
        <Link to={`/hire-me?service=${service.slug}`} className="btn-primary px-4 py-2.5 text-sm">
          Request a Quote
        </Link>
      </div>
    </article>
  );
}

// Framework badges, reused by the homepage card and the Services page card.
export function FrameworkBadges({ tone = 'dark' }) {
  const dark = tone === 'dark';
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Test automation frameworks">
      {testFrameworks.map((f) => (
        <li
          key={f.id}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
            dark ? 'border-white/15 bg-white/[0.06] text-white' : 'border-cloud bg-mist text-navy-900'
          }`}
        >
          <Icon name={f.icon} size={16} className={dark ? 'text-cyan' : 'text-electric'} />
          {f.badge}
        </li>
      ))}
    </ul>
  );
}

// The test automation card is the highlighted one: dark, larger, with badges.
function FeaturedTestCard({ service }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl bg-navy-900 p-7 text-white sm:p-9 md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-span-2">
      <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative flex flex-1 flex-col">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
          <Icon name={service.icon} size={24} />
        </span>
        <h3 className="mt-5 text-2xl font-bold sm:text-[1.7rem]">{service.name}</h3>
        <p className="mt-3 max-w-xl text-steel">{service.summary}</p>

        <h4 className="mt-7 font-display text-sm font-semibold text-white">Frameworks I work with</h4>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2" aria-label="Test automation frameworks">
          {testFrameworks.map((f) => (
            <li key={f.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
                <Icon name={f.icon} size={18} />
              </span>
              <span>
                <span className="block font-display font-semibold text-white">{f.badge}</span>
                <span className="mt-0.5 block text-sm text-steel">{f.capabilities[0]}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-9">
          <Link to={`/hire-me?service=${TEST_AUTOMATION_SLUG}`} className="btn-cyan px-5">
            Request Test Automation Services
          </Link>
          <Link to="/test-automation" className="btn-ghost-dark">
            View Testing Expertise
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesOverview() {
  return (
    <section className="bg-mist py-20 sm:py-28" aria-labelledby="build-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="build-heading"
            title="What Can I Build for You?"
            intro="With over a decade of experience in technology, I provide modern, reliable, and customized software solutions that help businesses grow and operate efficiently."
          />
          <Link to="/services" className="btn-ghost-light shrink-0 bg-white">
            See all services
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((s) =>
            s.featured ? <FeaturedTestCard key={s.slug} service={s} /> : <HomeServiceCard key={s.slug} service={s} />
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why choose James
// ---------------------------------------------------------------------------
const reasons = [
  { title: 'Over 10 years of experience', text: 'More than a decade in software engineering and technology.' },
  { title: "Master's degree in Software Engineering", text: 'Formal training across the full software development lifecycle.' },
  { title: 'Full-stack development capabilities', text: 'Frontend, backend and database handled by one accountable engineer.' },
  { title: 'Test automation across four frameworks', text: 'Selenium (C# / Java), Playwright, Robot Framework and ACCELQ.' },
  { title: 'Business-focused problem solving', text: 'Technical choices made around your goals, budget and users.' },
  { title: 'Focus on reliable, maintainable solutions', text: 'Clean, documented code that is easy to extend later.' },
  { title: 'Doctoral studies in Health Informatics', text: 'A growing specialization in healthcare information systems.' },
  { title: 'Commitment to continuous learning', text: 'Current with modern tools, standards and best practices.' },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionHeading
          id="why-heading"
          title="Why Choose James Namata?"
          intro="You work directly with an experienced engineer who cares as much about how your software holds up next year as how it looks on launch day."
        />
        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <li key={r.title} className="border-t-2 border-navy-900 pt-5">
              <Check size={20} className="text-electric" aria-hidden="true" />
              <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug text-navy-900">{r.title}</h3>
              <p className="mt-2 text-[0.95rem] text-slate-ink">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Education & technical skills
// ---------------------------------------------------------------------------
export const education = [
  {
    degree: 'Doctorate in Health Informatics',
    status: 'In progress',
    text: 'Studying healthcare information systems, interoperability, data management and digital health innovation.',
  },
  {
    degree: "Master's Degree in Software Engineering",
    status: 'Completed',
    text: 'Software architecture, full-stack development, databases, and software quality assurance.',
  },
];

export function EducationCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {education.map((e) => (
        <article key={e.degree} className="flex gap-5 rounded-2xl border border-cloud bg-white p-7">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-cyan">
            <GraduationCap size={24} aria-hidden="true" />
          </span>
          <div>
            <span
              className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                e.status === 'In progress' ? 'bg-cyan/15 text-[#0B7C8C]' : 'bg-electric/10 text-electric'
              }`}
            >
              {e.status}
            </span>
            <h3 className="mt-2 text-xl font-bold text-navy-900">{e.degree}</h3>
            <p className="mt-2 text-slate-ink">{e.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function EducationSkills() {
  return (
    <section className="bg-mist py-20 sm:py-28" aria-labelledby="edu-skills-heading">
      <div className="container-page">
        <SectionHeading
          id="edu-skills-heading"
          title="Education & technical skills"
          intro="A formal foundation in software engineering, a doctorate in progress, and the tools I use every day."
        />
        <div className="mt-12">
          <EducationCards />
        </div>
        <div className="mt-5">
          <Skills />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How I work: a real sequence, so it is numbered (shown on the Services page)
// ---------------------------------------------------------------------------
export const processSteps = [
  { title: 'Discovery & Consultation', text: "Understand the client's business goals and requirements." },
  { title: 'Planning & Design', text: 'Define the solution, architecture, and user experience.' },
  { title: 'Development', text: 'Build the website or application using appropriate technologies.' },
  { title: 'Testing & Quality Assurance', text: 'Validate functionality, usability, responsiveness, and reliability.' },
  { title: 'Deployment', text: 'Prepare and launch the application.' },
  { title: 'Maintenance & Support', text: 'Provide agreed ongoing technical support.' },
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="process-heading">
      <div className="container-page">
        <SectionHeading
          id="process-heading"
          title="How I work"
          intro="A clear, six-step process so you always know what is happening and what comes next."
        />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-cloud md:hidden" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-electric via-cyan to-cloud lg:block" aria-hidden="true" />
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block">
              <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-cyan ring-4 ring-white">
                {i + 1}
              </span>
              <div className="md:mt-5">
                <h3 className="text-[1.05rem] font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-slate-ink">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing call to action
// ---------------------------------------------------------------------------
export function CtaBand({
  title = "Your Vision. My Expertise. Over a Decade of Experience. Let's Build Something Exceptional.",
  text = "Tell me about your project. I'll review it and reply with practical next steps.",
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
      <div className="container-page relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <h2 className="heading-section font-extrabold">{title}</h2>
          <p className="mt-4 text-lg text-steel">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/hire-me" className="btn-cyan px-6">Hire Me</Link>
          <Link to="/contact" className="btn-ghost-dark">Contact</Link>
        </div>
      </div>
    </section>
  );
}
