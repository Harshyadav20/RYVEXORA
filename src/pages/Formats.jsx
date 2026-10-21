import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { formats, formatPrinciples, formatComparison } from '../data/formats.js';


export default function Formats() {
  useSeo({
    title: 'Formats',
    description:
      'Four composition systems from one design language — clinic, digital product, luxury house and creator portfolio. Layout, hierarchy and asks change; the engineering does not.',
    path: '/formats',
  });

  return (
    <div className="page">
      <PageHero
        eyebrow="Format library"
        title={
          <>
            One system.
            <br />
            <span className="text-gradient">Four ways to be understood.</span>
          </>
        }
        lead="A clinic, a SaaS product, a maison and a photographer do not need the same page. These are four complete compositions on the same tokens, components and engineering — each rebuilt around the one decision its visitor is trying to make."
        crumbs={[{ label: 'Formats' }]}
        meta={
          <div className="fmt-hero-meta">
            <span className="chip">4 formats</span>
            <span className="chip">Shared design system</span>
            <span className="chip">Every brand below is illustrative</span>
          </div>
        }
      />

      <section className="section section--tight">
        <div className="shell">
          <div className="fmt-principles">
            {formatPrinciples.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.04}>
                <article className="fmt-principle">
                  <span className="fmt-principle__num">{String(index + 1).padStart(2, '0')}</span>
                  <h2>{principle.title}</h2>
                  <p>{principle.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="formats-heading">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">The library</span>
              <h2 className="h2" id="formats-heading" style={{ marginTop: 18 }}>
                Four formats, built end to end.
              </h2>
            </div>
            <p className="section-head__aside">
              Each opens as a full composition — navigation, hierarchy, asks and footer — not a screenshot of a hero.
            </p>
          </div>

          <div className="fmt-grid">
            {formats.map((format, index) => (
              <Reveal key={format.slug} delay={(index % 2) * 0.05}>
                <Link
                  to={`/formats/${format.slug}`}
                  className="fmt-card"
                  style={{ '--fmt-accent': format.accent, '--fmt-accent-soft': format.accentSoft }}
                >
                  <div className={`fmt-card__preview fmt-preview--${format.slug}`} aria-hidden="true">
                    <span className="fmt-card__ghost">{format.demo.brand}</span>
                    <span className="fmt-card__swatch" />
                    <span className="fmt-card__line fmt-card__line--a" />
                    <span className="fmt-card__line fmt-card__line--b" />
                    <span className="fmt-card__block" />
                  </div>

                  <div className="fmt-card__body">
                    <div className="fmt-card__top">
                      <span className="fmt-card__index">Format {format.index}</span>
                      <span className="fmt-card__kicker">{format.kicker}</span>
                    </div>
                    <h3>{format.name}</h3>
                    <p>{format.summary}</p>
                    <dl className="fmt-card__meta">
                      <div>
                        <dt>Built for</dt>
                        <dd>{format.audience}</dd>
                      </div>
                      <div>
                        <dt>Primary action</dt>
                        <dd>{format.primaryAction}</dd>
                      </div>
                    </dl>
                    <span className="arrow-link">
                      Open the format
                      <Icon name="arrow-up-right" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="compare-heading">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Side by side</span>
              <h2 className="h2" id="compare-heading" style={{ marginTop: 18 }}>
                What actually changes.
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                The palette, type scale and components stay. The hierarchy, the density and the ask move to fit
                the decision in front of the visitor.
              </p>
            </div>
          </div>

          <Reveal>
            <div className="fmt-table-wrap" tabIndex={0} role="region" aria-label="Format comparison">
              <table className="fmt-table">
                <caption className="sr-only">
                  Comparison of the four formats across first screen, primary ask, proof, density, motion and
                  what each format never does.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Layer</th>
                    {formats.map((format) => (
                      <th scope="col" key={format.slug}>
                        <span className="fmt-table__name">{format.name}</span>
                        <span className="fmt-table__index">Format {format.index}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formatComparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => (
                        <td key={formats[index].slug}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="fmt-note" delay={0.05}>
            <Icon name="info" size={16} />
            <p>
              Every format shares one rule: no invented proof. Where a template would normally carry a client logo
              or a performance statistic, the space is deliberately left empty and labelled.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Not sure which one"
        title="Tell us the decision your visitor is making."
        lead="That single sentence decides the format. Send it over and we will tell you which composition fits — and which one would waste your budget."
        primaryLabel="Start a project"
        secondaryLabel="See the work"
        secondaryTo="/work"
      />
    </div>
  );
}
