import { Suspense, lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import Icon from './Icon.jsx';
import { site } from '../data/site.js';
import { cn, isWebGLAvailable, prefersReducedMotion } from '../lib/utils.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

const ContactScene = lazy(() => import('../three/ContactScene.jsx'));

export default function ContactSection({ className, breadcrumbs = false }) {
  const reduced = useReducedMotion();
  const [canRender, setCanRender] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [section, setSection] = useState(null);

  useEffect(() => {
    const evaluate = () =>
      setCanRender(window.innerWidth >= 1000 && !prefersReducedMotion() && isWebGLAvailable());
    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, [reduced]);

  useEffect(() => {
    if (!canRender || !section) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSceneReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [canRender, section]);

  return (
    <section className={cn('contact-section', className)} id="contact" ref={setSection}>
      <div className="contact-section__canvas" aria-hidden="true">
        {sceneReady && (
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <ContactScene />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>

      <div className="shell">
        {breadcrumbs && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
        )}

        <div className="contact-section__grid">
          <div className="contact-section__head">
            <span className="eyebrow">Start a project</span>
            <h2 className="contact-section__title">
              <span>LET&rsquo;S BUILD</span>
              <span>
                <em>WHAT&rsquo;S NEXT.</em>
              </span>
            </h2>
            <p className="contact-section__lead">
              Have an idea? Tell us where you are and where you want to be. You will get a considered
              reply with a clear next step — not an automated sales sequence.
            </p>

            <div className="contact-section__details">
              <div className="contact-detail">
                <Icon name="mail" size={16} />
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
              <div className="contact-detail">
                <Icon name="map-pin" size={16} />
                <div>
                  <strong>Studio</strong>
                  {site.location} · working worldwide
                </div>
              </div>
              <div className="contact-detail">
                <Icon name="clock" size={16} />
                <div>
                  <strong>Response</strong>
                  {site.responseTime} · {site.hours}
                </div>
              </div>
            </div>

            <div className="contact-section__orb" aria-hidden="true">
              <div className="orb" />
            </div>
          </div>

          <div className="contact-section__form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
