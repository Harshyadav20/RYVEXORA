import { Link, useParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { getService, services } from '../data/services.js';
import { site } from '../data/site.js';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import ServiceVisual from '../components/ServiceVisual.jsx';
import Accordion from '../components/Accordion.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug ?? '');

  useSeo({
    title: service ? service.title : 'Service not found',
    description: service?.summary,
    path: `/services/${slug ?? ''}`,
  });

  if (!service) return <NotFound />;

  const related = service.related
    .map((relatedSlug) => services.find((item) => item.slug === relatedSlug))
    .filter(Boolean);

  return (
    <div className="page">
      <header className="detail-hero">
        <div className="bg-grid" aria-hidden="true" />
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{service.title}</span>
          </nav>

          <div className="detail-hero__grid">
            <div>
              <span className="eyebrow">
                Service {service.index} · {service.kicker}
              </span>
              <h1>{service.title}</h1>
              <p className="detail-hero__lead">{service.summary}</p>

              <div className="btn-row detail-hero__actions">
                <Button to="/contact">Start a project</Button>
                <Button
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Question about ${service.title}`)}`}
                  variant="ghost"
                  icon="mail"
                >
                  Ask a question
                </Button>
              </div>
            </div>

            <aside className="detail-hero__aside">
              <ServiceVisual variant={service.visual} accent={service.accent} />
              <div className="detail-aside__row">
                <span className="detail-aside__label">Discipline</span>
                <span className="detail-aside__value">{service.kicker}</span>
              </div>
              <div className="detail-aside__row">
                <span className="detail-aside__label">Engagement</span>
                <span className="detail-aside__value">Fixed-scope project or monthly partnership</span>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="shell detail-layout">
          <div>
            <Reveal className="detail-block">
              <span className="eyebrow">Context</span>
              <h2 className="detail-block__title" style={{ marginTop: 16 }}>
                What this is for
              </h2>
              <p>{service.description}</p>
            </Reveal>

            <Reveal className="detail-block">
              <h2 className="detail-block__title">What you get</h2>
              <div className="deliverable-grid">
                {service.deliverables.map((item) => (
                  <div className="deliverable" key={item}>
                    <Icon name="check" size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="detail-block">
              <h2 className="detail-block__title">How we approach it</h2>
              <div className="step-list">
                {service.approach.map((step, index) => (
                  <div className="step" key={step.title}>
                    <span className="step__num">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="detail-block">
              <h2 className="detail-block__title">What good looks like</h2>
              <ul className="outcome-list">
                {service.outcomes.map((item) => (
                  <li key={item}>
                    <Icon name="sparkle" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="detail-block">
              <h2 className="detail-block__title">Tools &amp; technology</h2>
              <div className="stack-cloud">
                {service.stack.map((tool) => (
                  <span className="chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: 18, fontSize: '0.82rem', color: 'var(--faint)' }}>
                Tools change as the problem requires. We choose boring, well-supported technology
                unless there is a clear reason not to.
              </p>
            </Reveal>

            <Reveal className="detail-block" id="faq">
              <h2 className="detail-block__title">Questions, answered</h2>
              <Accordion items={service.faqs} />
            </Reveal>
          </div>

          <Reveal as="aside" className="detail-aside" delay={0.05}>
            <div>
              <span className="detail-aside__label">Service</span>
              <p className="detail-aside__value" style={{ marginTop: 4 }}>
                {service.title}
              </p>
            </div>

            <div className="detail-aside__row">
              <span className="detail-aside__label">Kickoff</span>
              <span className="detail-aside__value">After scope and deposit</span>
            </div>
            <div className="detail-aside__row">
              <span className="detail-aside__label">Contact</span>
              <a
                className="detail-aside__value"
                href={`mailto:${site.email}`}
                style={{ color: 'var(--cyan)', textDecoration: 'none' }}
              >
                {site.email}
              </a>
            </div>

            <span className="badge">
              <span className="badge__dot" />
              {site.availability}
            </span>

            <Button to="/contact" className="btn--block">
              Start a project
            </Button>

            <Link to="/process" className="arrow-link">
              See the full process
              <Icon name="arrow-up-right" size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface section--tight" aria-labelledby="related-heading">
          <div className="shell">
            <h2 className="h3" id="related-heading" style={{ marginBottom: 22 }}>
              Usually combined with
            </h2>
            <div className="related-grid">
              {related.map((item) => (
                <Reveal key={item.slug}>
                  <Link to={`/services/${item.slug}`} className="related-card">
                    <span className="kicker-number">SERVICE {item.index}</span>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <span className="arrow-link" style={{ marginTop: 'auto' }}>
                      Explore {item.title.toLowerCase()}
                      <Icon name="arrow-up-right" size={14} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Tell us what you are trying to solve."
        lead="A short, honest brief is more useful than a long one. We will reply with scope, price and whether we are the right studio for it."
        primaryLabel="Start a project"
        secondaryLabel="Explore more services"
        secondaryTo="/services"
      />
    </div>
  );
}
