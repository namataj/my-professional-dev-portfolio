import { Link } from 'react-router-dom';
import HeroVisual from './HeroVisual.jsx';
import ExperienceBadge from './ExperienceBadge.jsx';
import { site } from '../config/site.js';

export default function Hero() {
  return (
    <section
      className="relative flex w-full items-center overflow-hidden bg-navy-900 text-white lg:min-h-[calc(100svh-72px)]"
      aria-labelledby="hero-heading"
    >
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_30%,transparent_75%)]" aria-hidden="true" />
      <div
        className="absolute -right-40 top-10 aspect-square w-[min(60vw,900px)] rounded-full bg-electric/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-12 pb-16 pt-6 sm:gap-14 sm:pb-20 sm:pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[clamp(2rem,4vw,6rem)] lg:py-12">
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.1rem,0.95rem+0.5vw,1.45rem)] font-semibold text-white">Hi, I'm {site.name}</p>
          <p className="mt-1 text-[clamp(0.95rem,0.85rem+0.3vw,1.15rem)] text-steel">{site.shortTitle}</p>

          <h1
            id="hero-heading"
            className="mt-6 text-[clamp(2.1rem,1.2rem+2.4vw,2.6rem)] font-extrabold leading-[1.05] sm:mt-7 sm:text-[2.75rem] lg:mt-6 lg:text-[clamp(2.2rem,1rem+2.15vw,3.7rem)]"
          >
            Engineering Digital Solutions. Empowering Businesses.{' '}
            <span className="text-gradient">Advancing Healthcare Innovation.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[clamp(1.05rem,0.95rem+0.35vw,1.3rem)] leading-relaxed text-steel sm:mt-7 lg:mt-6">
            I build modern business websites, responsive web applications, scalable backend systems
            and reliable test automation — backed by a Master's in Software Engineering, with a
            Doctorate in Health Informatics in progress.
          </p>

          <ExperienceBadge className="mt-8 lg:mt-7" />

          <div className="mt-9 flex flex-wrap gap-3 lg:mt-8 max-[420px]:flex-col max-[420px]:[&>a]:w-full lg:[&>a]:px-7 lg:[&>a]:py-3.5 lg:[&>a]:text-base">
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
