import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Portrait from '../components/Portrait.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Skills from '../components/Skills.jsx';
import { CtaBand, EducationCards, FrameworkBadges } from '../components/HomeSections.jsx';
import ExperienceBadge from '../components/ExperienceBadge.jsx';
import { site } from '../config/site.js';

const philosophy = [
  { title: 'Understand the problem first', text: 'Good software starts with the business goal and the people who will use it.' },
  { title: 'Build for maintainability', text: 'Clear structure and readable code make the next change cheaper, not harder.' },
  { title: 'Test as you go', text: 'Quality is designed in from the beginning, with automated checks where they add value.' },
  { title: 'Communicate plainly', text: 'Regular updates in plain language, with honest estimates and no surprises.' },
];

const interests = [
  'Health information systems',
  'Interoperability and healthcare data exchange (including FHIR)',
  'Healthcare workflow modernization',
  'Operational analytics and dashboards',
  'Privacy and security in healthcare software',
  'Patient-centered digital experiences',
];

// Milestones intentionally carry no dates — add them when you're ready.
const journey = [
  { title: 'Software engineering foundation', text: 'Built core skills in software development, web technologies and databases.' },
  { title: 'Over a decade in software engineering and technology', text: 'More than 10 years solving technical problems across development and quality engineering.' },
  { title: 'Full-stack development', text: 'Frontend, backend, API integration and database-driven applications with React, Node.js, Express and MySQL.' },
  { title: 'Test automation and quality engineering', text: 'Selenium with C# and Java, Playwright with JavaScript, Robot Framework with Python, and ACCELQ.' },
  { title: "Master's in Software Engineering", text: 'Formal training across architecture, development and software quality.' },
  { title: 'Doctorate in Health Informatics (in progress)', text: 'Expanding into healthcare information systems and digital health.' },
  { title: 'Next: healthcare technology solutions', text: 'Applying engineering and informatics to real healthcare operational challenges.' },
];

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About James Namata"
        description="James Namata is a software engineer with over 10 years of experience, a Master's in Software Engineering, and a Doctorate in Health Informatics in progress. Full-stack development and test automation."
      />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="container-page relative grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl">About me</h1>
            <p className="mt-3 text-steel">{site.fullTitle}</p>
            <ExperienceBadge className="mt-7" />
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-steel">
              <p>
                I'm James Namata, a Software Engineer with over 10 years of experience in software
                engineering and technology.
              </p>
              <p>
                Throughout my professional journey, I have developed a strong foundation in software
                development, quality engineering, test automation, and solving complex technical
                challenges.
              </p>
              <p>
                My expertise spans frontend development, backend systems, API integration,
                database-driven applications, and automated software testing using technologies such
                as Selenium with C# and Java, Playwright with JavaScript, Robot Framework with Python,
                and ACCELQ.
              </p>
              <p>
                I hold a Master's degree in Software Engineering and am currently pursuing a Doctorate
                in Health Informatics.
              </p>
              <p>
                As I continue expanding my expertise, I am particularly interested in applying software
                engineering and digital technology to healthcare, with the goal of supporting more
                efficient, connected, and patient-centered healthcare systems.
              </p>
              <p className="text-white">
                My professional mission is to build reliable software solutions that empower
                businesses, improve operational efficiency, and create meaningful impact.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              {/* <a href={site.resumeUrl} download className="btn-cyan">
                <Download size={18} aria-hidden="true" />
              Download Resume
              </a> */}
              <Link to="/hire-me" className="btn-ghost-dark">Hire Me</Link>
            </div>
            {site.resumeIsPlaceholder && (
              <p className="mt-3 text-sm text-steel/80">Resume coming soon.</p>
            )}
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(37,99,255,0.55)] lg:sticky lg:top-28 lg:mt-24">
            <Portrait />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-white py-20 sm:py-24" aria-labelledby="edu-heading">
        <div className="container-page">
          <SectionHeading id="edu-heading" title="Education" />
          <div className="mt-10">
            <EducationCards />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-mist py-20 sm:py-24" aria-labelledby="skills-heading">
        <div className="container-page">
          <SectionHeading
            id="skills-heading"
            title="Technical skills"
            intro="The tools and disciplines I use to design, build and test software."
          />
          <div className="mt-10">
            <Skills />
          </div>
          <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-navy-900 p-7 text-white lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Test automation frameworks</h3>
              <div className="mt-4">
                <FrameworkBadges />
              </div>
            </div>
            <Link to="/test-automation" className="btn-cyan shrink-0">View Testing Expertise</Link>
          </div>
        </div>
      </section>

      {/* Philosophy + interests */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading title="Development philosophy" />
            <dl className="mt-8 space-y-6">
              {philosophy.map((p) => (
                <div key={p.title} className="border-l-2 border-electric pl-5">
                  <dt className="font-display text-lg font-semibold text-navy-900">{p.title}</dt>
                  <dd className="mt-1 text-slate-ink">{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeading title="Healthcare technology interests" />
            <ul className="mt-8 divide-y divide-cloud border-y border-cloud">
              {interests.map((i) => (
                <li key={i} className="flex items-center gap-3 py-4 text-charcoal">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <Link to="/healthcare-technology" className="btn-ghost-light mt-8">
              Healthcare Technology
            </Link>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-mist py-20 sm:py-24" aria-labelledby="journey-heading">
        <div className="container-page">
          <SectionHeading id="journey-heading" title="Professional journey" />
          <ol className="relative mt-10 max-w-3xl border-l-2 border-cloud">
            {journey.map((step, i) => (
              <li key={step.title} className="relative pb-9 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full ring-4 ring-mist ${
                    i === journey.length - 1 ? 'border-2 border-electric bg-mist' : 'bg-electric'
                  }`}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-1 text-slate-ink">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
