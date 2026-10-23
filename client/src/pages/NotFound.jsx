import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <section className="bg-navy-900 py-28 text-white">
      <Seo title="Page not found" description="The page you were looking for doesn't exist." />
      <div className="container-page max-w-2xl">
        <p className="font-display text-lg font-semibold text-cyan">404</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">This page doesn't exist</h1>
        <p className="mt-4 text-lg text-steel">The link may be out of date. Head back home or explore the services.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-cyan">Go to homepage</Link>
          <Link to="/services" className="btn-ghost-dark">Explore My Services</Link>
        </div>
      </div>
    </section>
  );
}
