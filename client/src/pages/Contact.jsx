import { Link } from 'react-router-dom';
import { Mail, Phone, CalendarClock, MapPin } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '../components/SocialIcons.jsx';
import { site, whatsappLink } from '../config/site.js';

export default function Contact() {
  const channels = [
    site.email && { Icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.phone && { Icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
    site.location && { Icon: MapPin, label: 'Location', value: site.location },
  ].filter(Boolean);

  const profiles = [
    site.github && { Icon: GitHubIcon, label: 'GitHub', href: site.github },
    site.linkedin && { Icon: LinkedInIcon, label: 'LinkedIn', href: site.linkedin },
  ].filter(Boolean);

  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        description="Contact James Namata about a website, web application, API, test automation or healthcare technology project."
      />
      <PageHeader
        title="Have a Project in Mind? Let's Build Something Exceptional."
        intro={<p>Send a message, start a WhatsApp chat, or request a free consultation.</p>}
      />

      <section className="bg-mist py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-14">
          <aside className="space-y-6">
            <ul className="space-y-4">
              {channels.map(({ Icon: I, label, value, href }) => (
                <li key={label} className="flex items-start gap-4 rounded-xl bg-white p-5">
                  <I size={22} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-ink">{label}</p>
                    {href ? (
                      <a href={href} className="break-words font-semibold text-navy-900 hover:text-electric">{value}</a>
                    ) : (
                      <p className="font-semibold text-navy-900">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {site.whatsapp && (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-[#1DA851] text-white hover:bg-[#178A43]"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </a>
            )}

            <div className="rounded-2xl bg-navy-900 p-6 text-white">
              <CalendarClock size={26} className="text-cyan" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">Free consultation</h2>
              <p className="mt-1.5 text-[0.95rem] text-steel">
                A short call to discuss your goals and whether I'm the right fit for your project.
              </p>
              <Link to="/hire-me?service=other" className="btn-cyan mt-5 w-full">
                Request a Consultation
              </Link>
            </div>

            {profiles.length > 0 && (
              <div className="flex gap-3">
                {profiles.map(({ Icon: I, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-light flex-1 bg-white"
                  >
                    <I className="h-[18px] w-[18px]" /> {label}
                  </a>
                ))}
              </div>
            )}
          </aside>

          <div className="rounded-2xl border border-cloud bg-white p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-navy-900">Send a message</h2>
            <p className="mb-8 mt-2 text-slate-ink">
              For a detailed project quote, use the{' '}
              <Link to="/hire-me" className="font-medium text-electric underline-offset-2 hover:underline">
                quote request form
              </Link>
              .
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
