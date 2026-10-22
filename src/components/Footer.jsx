import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { services } from '../data/services.js';
import { site } from '../data/site.js';
import { getLenis } from '../hooks/useSmoothScroll.js';

const scrollToTop = () => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="shell footer-top">
        <div className="footer-brand">
          <Link to="/" className="brand" aria-label="RYVEXORA — home">
            <Logo />
          </Link>
          <p>
            A technology and digital growth studio building the websites, systems and software that
            move businesses forward.
          </p>
          <span className="badge">
            <span className="badge__dot" />
            {site.availability}
          </span>
        </div>

        <div className="footer-col">
          <h3>Studio</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/process">How we work</Link></li>
            <li><Link to="/work">Selected work</Link></li>
            <li><Link to="/formats">Formats</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <address>{site.location} · Working worldwide</address>
            </li>
            <li>
              <span className="faint">{site.hours}</span>
            </li>
            <li>
              <span className="faint">{site.responseTime}</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        RYVEXORA
      </p>

      <div className="shell">
        <div className="footer-bottom">
          <span>© {year} RYVEXORA. All rights reserved.</span>
          <div className="footer-bottom__links">
            <span className="mono" style={{ letterSpacing: '0.1em' }}>
              Built in Mumbai · {site.coordinates}
            </span>
            <button type="button" className="to-top" onClick={scrollToTop}>
              Back to top
              <Icon name="arrow-up" size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
