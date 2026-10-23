import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout.jsx';
import PageTransition from './components/PageTransition.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Healthcare from './pages/Healthcare.jsx';
import TestAutomation from './pages/TestAutomation.jsx';
import Portfolio from './pages/Portfolio.jsx';
import HireMe from './pages/HireMe.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

// Future features (client portal, invoices, booking) can be added here as new
// routes. Keep them out of this list until they are finished so nothing
// half-built is reachable on the live site.
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  { path: '/test-automation', element: <TestAutomation /> },
  { path: '/healthcare-technology', element: <Healthcare /> },
  { path: '/portfolio', element: <Portfolio /> },
  { path: '/hire-me', element: <HireMe /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
  { path: '*', element: <NotFound /> },
];

export default function App() {
  const location = useLocation();
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={<PageTransition>{element}</PageTransition>} />
          ))}
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
