import { Link } from 'react-router-dom';
import HeroVisual from './HeroVisual.jsx';
import ExperienceBadge from './ExperienceBadge.jsx';
import { site } from '../config/site.js';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white" aria-labelledby="hero-heading">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_30%,transparent_75%)]" aria-hidden="true" />
      <div
        className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-electric/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1fr_1.2fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div>
          <p className="font-display text-lg font-semibold text-white">Hi, I'm {site.name}</p>
          <p className="mt-1 text-[0.95rem] text-steel">{site.shortTitle}</p>

          <h1
            id="hero-heading"
            className="mt-7 text-[2.4rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[2.9rem] xl:text-[3.25rem]"
          >
            Engineering Digital Solutions. Empowering Businesses.{' '}
            <span className="text-gradient">Advancing Healthcare Innovation.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel">
            I build modern business websites, responsive web applications, scalable backend systems
            and reliable test automation — backed by a Master's in Software Engineering, with a
            Doctorate in Health Informatics in progress.
          </p>

          <ExperienceBadge className="mt-8" />

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/hire-me" className="btn-cyan px-6">
              Hire Me
            </Link>
            <Link to="/services" className="btn-ghost-dark">
              Explore My Services
            </Link>
            <Link to="/portfolio" className="btn-ghost-dark">
              View My Work
            </Link>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
