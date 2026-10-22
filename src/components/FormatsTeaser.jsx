import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { formats } from '../data/formats.js';

/**
 * Home teaser for the format library — four compositions, one design system.
 * Kept deliberately light: a single row of links, no second hero.
 */
export default function FormatsTeaser() {
  return (
    <section className="section section--surface" aria-labelledby="formats-teaser-heading">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Format library</span>
            <Reveal as="h2" className="h2" id="formats-teaser-heading" style={{ marginTop: 18 }}>
              One system.
              <br />
              Four ways to be understood.
            </Reveal>
          </div>
          <Reveal className="section-head__aside" delay={0.06}>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '38ch' }}>
              A clinic, a product, a maison and a studio do not need the same page. Same tokens and
              engineering — the composition changes to fit the decision.
            </p>
            <Link to="/formats" className="arrow-link" style={{ marginTop: 16 }}>
              Open the library
              <Icon name="arrow-up-right" size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="ft-row">
          {formats.map((format) => (
            <Link
              key={format.slug}
              to={`/formats/${format.slug}`}
              className="ft-item"
              style={{ '--ft-accent': format.accent }}
            >
              <span className="ft-item__index">{format.index}</span>
              <span className="ft-item__name">{format.name}</span>
              <span className="ft-item__kicker">{format.kicker}</span>
              <span className="ft-item__arrow" aria-hidden="true">
                <Icon name="arrow-up-right" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
