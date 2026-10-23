import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Hero from '../components/Hero.jsx';
import HealthcareSection from '../components/HealthcareSection.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import {
  ServicesOverview,
  WhyChoose,
  EducationSkills,
  CtaBand,
} from '../components/HomeSections.jsx';
import { projects } from '../data/projects.js';

const featuredIds = ['user-management', 'selenium-framework', 'healthcare-dashboard'];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const featured = projects.filter((p) => featuredIds.includes(p.id));

  return (
    <>
      <Seo
        path="/"
        title="Software Engineer with 10+ Years of Experience | Full-Stack & Test Automation"
        description="James Namata is a software engineer with over 10 years of experience building websites, custom web applications, REST APIs and test automation with Selenium, Playwright, Robot Framework and ACCELQ."
      />
      {/* Order: services first (primary business), then credibility, then the healthcare specialization */}
      <Hero />
      <ServicesOverview />
      <WhyChoose />
      <HealthcareSection />
      <section className="bg-white py-20 sm:py-28" aria-labelledby="work-heading">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="work-heading"
              title="Selected work"
              intro="Demonstration projects that show how I approach full-stack development, test automation and healthcare data."
            />
            <Link to="/portfolio" className="btn-ghost-light shrink-0">
              View My Work
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} onViewDetails={setSelected} />
            ))}
          </div>
        </div>
      </section>

      <EducationSkills />
      <CtaBand />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
