import { useSearchParams, Link } from 'react-router-dom';
import { Clock, MessageSquare, FileText } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import QuoteForm from '../components/QuoteForm.jsx';
import { allServiceSlugs } from '../data/formOptions.js';
import { site } from '../config/site.js';

const nextSteps = [
  { Icon: FileText, title: 'I review your request', text: 'I read your project details and note any questions.' },
  { Icon: MessageSquare, title: 'We talk it through', text: 'A short call or email exchange to clarify goals and scope.' },
  { Icon: Clock, title: 'You get a proposal', text: 'A clear scope, timeline and price — no obligation.' },
];

export default function HireMe() {
  const [params] = useSearchParams();
  const requested = params.get('service') || '';
  const initialService = allServiceSlugs.includes(requested) ? requested : '';

  return (
    <>
      <Seo
        path="/hire-me"
        title="Hire Me / Request a Quote"
        description="Request a quote for website development, a custom web application, REST API, test automation or healthcare technology project."
      />
      <PageHeader
        title="Request a quote"
        intro={<p>Tell me about your project. The more detail you share, the more useful my reply will be.</p>}
      />

      <section className="bg-mist py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          <div className="rounded-2xl border border-cloud bg-white p-6 sm:p-10">
            {/* key remounts the form when a different service link is followed */}
            <QuoteForm key={initialService} initialService={initialService} />
          </div>

          <aside className="space-y-8 lg:pt-4">
            <div>
              <h2 className="text-xl font-bold text-navy-900">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map(({ Icon: I, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-cyan">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 font-semibold text-navy-900">
                        <I size={16} className="text-electric" aria-hidden="true" /> {title}
                      </h3>
                      <p className="mt-0.5 text-[0.95rem] text-slate-ink">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-navy-900 p-6 text-white">
              <h2 className="text-lg font-semibold">Prefer to talk first?</h2>
              <p className="mt-2 text-[0.95rem] text-steel">
                Email <a href={`mailto:${site.email}`} className="text-cyan underline-offset-2 hover:underline">{site.email}</a>{' '}
                or use the contact page to request a consultation.
              </p>
              <Link to="/contact" className="btn-ghost-dark mt-5 px-4 py-2.5 text-sm">Contact</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
