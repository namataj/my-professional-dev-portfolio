import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Logo from './Logo.jsx';
import { site, whatsappLink } from '../config/site.js';
import { services } from '../data/services.js';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    site.github && { href: site.github, label: 'GitHub', Icon: GitHubIcon },
    site.linkedin && { href: site.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    site.whatsapp && { href: whatsappLink(), label: 'WhatsApp', Icon: WhatsAppIcon },
  ].filter(Boolean);

  return (
    <footer className="bg-navy-950 text-steel">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
            Websites, custom web applications, APIs and software testing — with a growing focus on
            healthcare technology.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel transition-colors hover:border-cyan hover:text-cyan"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel transition-colors hover:border-cyan hover:text-cyan"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="md:col-span-3" aria-label="Services">
          <h2 className="font-display text-sm font-semibold text-white">Services</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="hover:text-white">
                  {s.name.replace(' Development', '')}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/test-automation" className="hover:text-white">
                Test automation expertise
              </Link>
            </li>
            <li>
              <Link to="/healthcare-technology" className="hover:text-white">
                Healthcare technology
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="md:col-span-2" aria-label="Site">
          <h2 className="font-display text-sm font-semibold text-white">Site</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/hire-me" className="hover:text-white">Request a quote</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="font-display text-sm font-semibold text-white">Start a project</h2>
          <p className="mt-4 text-[0.95rem]">Tell me what you need and I'll reply with next steps.</p>
          <Link to="/hire-me" className="btn-cyan mt-4 px-4 py-2.5">
            Hire Me
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
