import { Link } from 'react-router-dom';
import { Check, Gauge, Repeat, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Icon from '../components/Icon.jsx';
import { FrameworkBadges, CtaBand } from '../components/HomeSections.jsx';
import { testFrameworks, testAutomationDescription, TEST_AUTOMATION_SLUG } from '../data/testAutomation.js';
import { services } from '../data/services.js';

const outcomes = [
  { Icon: ShieldCheck, title: 'Higher software quality', text: 'Defects are caught before they reach your users.' },
  { Icon: Repeat, title: 'Less repetitive manual testing', text: 'Automated suites take over the checks your team repeats every release.' },
  { Icon: Gauge, title: 'Faster, more dependable releases', text: 'Regression coverage you can run on every change, so shipping feels safe.' },
];

export default function TestAutomation() {
  const testingService = services.find((s) => s.slug === TEST_AUTOMATION_SLUG);

  return (
    <>
      <Seo
        path="/test-automation"
        title="Software Testing & Test Automation — Selenium, Playwright, Robot Framework, ACCELQ"
        description="Test automation services with Selenium WebDriver (C# and Java), Playwright (JavaScript), Robot Framework (Python) and ACCELQ: functional, regression, cross-browser and API testing."
      />
      <PageHeader title="Software Testing & Test Automation" intro={<p>{testAutomationDescription}</p>}>
        <div className="mt-8">
          <FrameworkBadges />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={`/hire-me?service=${TEST_AUTOMATION_SLUG}`} className="btn-cyan">
            Request Test Automation Services
          </Link>
          <Link to="/portfolio" className="btn-ghost-dark">View My Work</Link>
        </div>
      </PageHeader>

      {/* Outcomes */}
      <section className="border-b border-cloud bg-white" aria-label="What test automation gives you">
        <ul className="container-page grid divide-y divide-cloud md:grid-cols-3 md:divide-x md:divide-y-0">
          {outcomes.map(({ Icon: I, title, text }) => (
            <li key={title} className="flex gap-4 py-8 md:px-7 md:first:pl-0">
              <I size={24} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-semibold text-navy-900">{title}</h2>
                <p className="mt-1 text-[0.96rem] text-slate-ink">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Frameworks, in the order given */}
      <section className="bg-mist py-16 sm:py-24" aria-labelledby="frameworks-heading">
        <div className="container-page">
          <SectionHeading
            id="frameworks-heading"
            title="Technologies & frameworks"
            intro="I choose the framework that fits your application, your team's language, and how your tests will be maintained."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {testFrameworks.map((f, i) => (
              <li key={f.id} id={f.id} className="scroll-mt-28 rounded-2xl border border-cloud bg-white p-7 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-cyan">
                    <Icon name={f.icon} size={24} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-ink">
                      <span className="sr-only">Framework {i + 1}: </span>
                      {f.languages}
                    </p>
                    <h3 className="text-2xl font-bold text-navy-900">{f.name}</h3>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {f.capabilities.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[0.96rem]">
                      <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Full service list */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="testing-services-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            id="testing-services-heading"
            title="Testing services"
            intro="From a single regression suite to a complete automation framework, testing can be added to a new project or an application you already run."
          />
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {testingService?.examples.map((e) => (
              <li key={e} className="flex gap-3 rounded-xl bg-mist p-4 text-[0.96rem]">
                <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Ready to automate your testing?"
        text="Tell me about your application and current testing process, and I'll recommend the right framework and approach."
      />
    </>
  );
}
