import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ServiceVisual from '../components/ServiceVisual.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import { services } from '../data/services.js';

const engagements = [
  {
    number: '01',
    title: 'Fixed-scope project',
    body: 'A defined outcome, a fixed price and a delivery window agreed before design begins. Best for sites, launches, automation builds and first product releases.',
    icon: 'compass',
  },
  {
    number: '02',
    title: 'Monthly partnership',
    body: 'A reserved block of senior time each month for improvements, experiments and maintenance. Cancel with 30 days notice — no annual lock-in.',
    icon: 'pulse',
  },
  {
    number: '03',
    title: 'Advisory sprint',
    body: 'One to two weeks of audit, architecture and prioritisation when you need a senior second opinion before committing a larger budget.',
    icon: 'gauge',
  },
];

export default function Services() {
  useSeo({
    title: 'Services',
    description:
      'Web development, AI and automation, SEO and growth, cold email systems, SaaS engineering and business automation. Six disciplines, one accountable studio.',
    path: '/services',
  });

  return (
    <div className="page">
      <PageHero
        eyebrow="Services"
        title={
          <>
            Six disciplines.{' '}
            <br />
            <span className="text-gradient">One accountable studio.</span>
          </>
        }
        lead="Most real problems need more than one skill. We keep strategy, design and engineering together so the answer stays coherent from brief to production."
        crumbs={[{ label: 'Services' }]}
        meta={
          <>
            <span className="chip chip--accent">Fixed-scope pricing</span>
            <span className="chip">Senior-led delivery</span>
            <span className="chip">You own the code</span>
          </>
        }
      />

      <section className="section" aria-label="All services">
        <div className="shell">
          <div className="service-index">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.03} y={18}>
                <Link to={`/services/${service.slug}`} className="service-row">
                  <span className="service-row__num">{service.index}</span>
                  <div className="service-row__main">
                    <h2>{service.title}</h2>
                    <p>{service.summary}</p>
                    <div className="service-row__tags">
                      {service.stack.slice(0, 4).map((tool) => (
                        <span className="chip" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="service-row__viz">
                    <ServiceVisual variant={service.visual} accent={service.accent} />
                  </div>
                  <span className="service-row__arrow" aria-hidden="true">
                    <Icon name="arrow-up-right" size={17} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="engagement-heading">
        <div className="shell">
          <SectionHead
            eyebrow="Engagement models"
            title={<span id="engagement-heading">Three ways to work with us.</span>}
            lead="No retainer you will not use, no unexplained change orders. The model is chosen to fit the work, not the other way around."
          />

          <div className="grid grid--3">
            {engagements.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="principle" style={{ height: '100%' }}>
                  <div className="principle__num">{item.number}</div>
                  <span style={{ color: 'var(--cyan)' }}>
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="form__note" delay={0.1} style={{ marginTop: 26 }}>
            Prices are fixed after a short discovery. Where scope is genuinely unclear, we quote the
            discovery on its own so you can decide before committing further.
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        lead="Describe the problem rather than the solution. We will tell you what actually needs building — including when the answer is smaller than you expected."
        primaryLabel="Describe your project"
        secondaryLabel="See how we work"
        secondaryTo="/process"
      />
    </div>
  );
}
