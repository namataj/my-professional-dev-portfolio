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

      <div className="container-page relative grid items-center gap-10 pb-12 pt-5 sm:gap-14 sm:pb-20 sm:pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[clamp(2rem,4vw,6rem)] lg:py-12">
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.2rem,1.05rem+0.6vw,1.45rem)] font-semibold leading-snug text-white">Hi, I'm {site.name}</p>
          <p className="mt-1 text-[clamp(0.9rem,0.85rem+0.25vw,1.15rem)] leading-normal text-steel">{site.shortTitle}</p>

          <h1
            id="hero-heading"
            className="mt-4 text-[clamp(2rem,1.55rem+1.5vw,2.35rem)] font-extrabold leading-[1.1] sm:mt-6 sm:text-[clamp(2.4rem,1.2rem+2.6vw,2.8rem)] sm:leading-[1.08] lg:text-[clamp(2.2rem,1rem+2.15vw,3.7rem)] lg:leading-[1.05]"
          >
            Engineering Digital Solutions. Empowering Businesses.{' '}
            <span className="text-gradient">Advancing Healthcare Innovation.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-[clamp(1rem,0.95rem+0.25vw,1.3rem)] leading-[1.7] text-steel sm:mt-6">
            I build modern business websites, responsive web applications, scalable backend systems
            and reliable test automation — backed by a Master's in Software Engineering, with a
            Doctorate in Health Informatics in progress.
          </p>

          <ExperienceBadge className="mt-6 sm:mt-8 lg:mt-7" />

          <div className="mt-6 grid gap-2 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3 lg:mt-8 [&>a]:whitespace-nowrap max-sm:[&>a]:py-2.5 lg:[&>a]:px-4 lg:[&>a]:text-[0.88rem] 2xl:[&>a]:px-7 2xl:[&>a]:py-3.5 2xl:[&>a]:text-base">
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
