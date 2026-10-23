import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { ProcessSteps, CtaBand } from '../components/HomeSections.jsx';
import { services } from '../data/services.js';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      <Seo
        path="/services"
        title="Website Development, Web Applications, APIs & Test Automation Services"
        description="Website development, e-commerce, custom web applications, REST APIs, and test automation with Selenium, Playwright, Robot Framework and ACCELQ, from a software engineer with 10+ years of experience."
      />
      <PageHeader
        title="Digital Solutions Designed to Help Your Business Grow"
        intro={
          <p>
            Whether you need a professional website, a custom application, or reliable software
            testing, I provide practical technology solutions tailored to your business needs.
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/hire-me" className="btn-cyan">Request a Quote</Link>
          <Link to="/healthcare-technology" className="btn-ghost-dark">Healthcare technology services</Link>
        </div>
      </PageHeader>

      <section className="bg-mist py-16 sm:py-20" aria-label="Services">
        <div className="container-page grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <ProcessSteps />
      <CtaBand
        title="Not sure which service fits?"
        text="Describe what you're trying to achieve and I'll recommend the right approach."
      />
    </>
  );
}
