import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function PageHero({ eyebrow, title, lead, meta, crumbs = [], children }) {
  return (
    <header className="page-hero">
      <div className="bg-grid" aria-hidden="true" />
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="page-hero__glow page-hero__glow--violet" aria-hidden="true" />
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} style={{ display: 'contents' }}>
              <span aria-hidden="true">/</span>
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        )}

        <Reveal as="h1" className="page-hero__title" delay={0.05}>
          {title}
        </Reveal>

        {lead && (
          <Reveal as="p" className="page-hero__lead" delay={0.1}>
            {lead}
          </Reveal>
        )}

        {meta && (
          <Reveal className="page-hero__meta" delay={0.15}>
            {meta}
          </Reveal>
        )}

        {children}
      </div>
    </header>
  );
}
