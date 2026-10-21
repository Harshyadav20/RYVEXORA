import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { services } from '../data/services.js';
import { nav, site } from '../data/site.js';
import { cn } from '../lib/utils.js';
import { startScroll, stopScroll } from '../hooks/useSmoothScroll.js';

const isActivePath = (pathname, to) =>
  pathname === to || (to !== '/' && pathname.startsWith(`${to}/`));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    stopScroll();
    const previouslyFocused = document.activeElement;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      startScroll();
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus?.();
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((value) => !value);

  return (
    <>
      <header className={cn('site-header', scrolled && 'is-scrolled')}>
        <div className="shell header-inner">
          <Link to="/" className="brand" aria-label="RYVEXORA — home">
            <Logo />
          </Link>

          <nav className="main-nav" aria-label="Primary">
            {nav.map((item) => {
              const active = isActivePath(location.pathname, item.to);
              if (!item.mega) {
                return (
                  <div className="nav-item" key={item.to}>
                    <Link
                      to={item.to}
                      className={cn('nav-link', active && 'is-active')}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <div className="nav-item nav-item--mega" key={item.to}>
                  <Link
                    to={item.to}
                    className={cn('nav-link', active && 'is-active')}
                    aria-haspopup="true"
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    <Icon name="chevron-down" size={12} strokeWidth={1.8} />
                  </Link>
                  <div className="mega" aria-label="Services">
                    <div className="mega__grid">
                      {services.map((service) => (
                        <Link
                          to={`/services/${service.slug}`}
                          className="mega__link"
                          key={service.slug}
                        >
                          <span className="mega__index">{service.index}</span>
                          <span>
                            <span className="mega__title">{service.title}</span>
                            <span className="mega__desc">{service.kicker}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mega__foot">
                      <span className="mono faint">Six disciplines. One studio.</span>
                      <Link to="/services" className="arrow-link">
                        All services
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="header-actions">
            <span className="header-status">
              <span className="badge__dot" />
              {site.availability}
            </span>
            <Button to="/contact" size="sm">
              Start a project
            </Button>
            <button
              type="button"
              className="menu-toggle"
              ref={toggleRef}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn('mobile-menu', menuOpen && 'is-open')}
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-menu__top">
          <Link to="/" className="brand" aria-label="RYVEXORA — home" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            ref={closeRef}
            aria-label="Close menu"
            onClick={() => {
              setMenuOpen(false);
              toggleRef.current?.focus();
            }}
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="mobile-menu__body">
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {[{ label: 'Home', to: '/' }, ...nav, { label: 'Contact', to: '/contact' }].map(
              (item, index) => (
                <Link
                  to={item.to}
                  key={item.to}
                  className="mobile-menu__link"
                  style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : '0ms' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </Link>
              ),
            )}
          </nav>

          <div className="mobile-menu__services">
            {services.map((service) => (
              <Link
                to={`/services/${service.slug}`}
                key={service.slug}
                onClick={() => setMenuOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </div>

          <div className="mobile-menu__foot">
            <span className="mono faint">Say hello</span>
            <a href={`mailto:${site.email}`} className="h3" style={{ color: 'var(--text)' }}>
              {site.email}
            </a>
            <Button to="/contact" className="btn--block">
              Start a project
            </Button>
            <p className="mono faint" style={{ letterSpacing: '0.08em' }}>
              {site.location} · {site.hours}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
