import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgressBar from './components/ScrollProgressBar.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import { useSmoothScroll } from './hooks/useSmoothScroll.js';
import usePointerGlow from './hooks/usePointerGlow.js';

import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Work from './pages/Work.jsx';
import About from './pages/About.jsx';
import Process from './pages/Process.jsx';
import Privacy from './pages/Privacy.jsx';
import Formats from './pages/Formats.jsx';
import Kit from './pages/Kit.jsx';
import NotFound from './pages/NotFound.jsx';

const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'));
const WorkDetail = lazy(() => import('./pages/WorkDetail.jsx'));
const FormatDetail = lazy(() => import('./pages/FormatDetail.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

function RouteFallback() {
  return (
    <div className="route-fallback" aria-busy="true" aria-live="polite">
      <span className="scene-loading__ring" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export default function App() {
  useSmoothScroll();
  usePointerGlow();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgressBar />
      <ScrollManager />
      <Header />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/kit" element={<Kit />} />
            <Route path="/formats" element={<Formats />} />
            <Route path="/formats/:slug" element={<FormatDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
