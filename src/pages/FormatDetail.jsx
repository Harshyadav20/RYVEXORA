import { Link, useParams } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import CtaBand from '../components/CtaBand.jsx';
import DemoFrame from '../components/formats/DemoFrame.jsx';
import MedicalDemo from '../components/formats/MedicalDemo.jsx';
import ProductDemo from '../components/formats/ProductDemo.jsx';
import LuxuryDemo from '../components/formats/LuxuryDemo.jsx';
import CreatorDemo from '../components/formats/CreatorDemo.jsx';
import { formats, formatBySlug } from '../data/formats.js';
import NotFound from './NotFound.jsx';

const DEMOS = {
  medical: MedicalDemo,
  'digital-product': ProductDemo,
  luxury: LuxuryDemo,
  creator: CreatorDemo,
};

export default function FormatDetail() {
  const { slug } = useParams();
  const format = formatBySlug(slug);

  useSeo({
    title: format ? `${format.name} format` : 'Format not found',
    description: format ? format.summary : 'This format is not in the library.',
    path: `/formats/${slug}`,
  });

  if (!format) return <NotFound />;

  const Demo = DEMOS[format.slug];
  const currentIndex = formats.findIndex((item) => item.slug === format.slug);
  const next = formats[(currentIndex + 1) % formats.length];

  return (
    <div
      className="page fmt-detail"
      style={{ '--fmt-accent': format.accent, '--fmt-accent-soft': format.accentSoft }}
    >
      <header className="fmt-detail__hero">
        <div className="bg-grid" aria-hidden="true" />
        <span className="fmt-detail__glow" aria-hidden="true" />
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/formats">Formats</Link>
            <span aria-hidden="true">/</span>
            <span>{format.name}</span>
          </nav>

          <div className="fmt-detail__layout">
            <div>
              <span className="eyebrow">
                Format {format.index} · {format.kicker}
              </span>
              <h1 className="fmt-detail__title">{format.headline}</h1>
              <p className="lead">{format.summary}</p>
              <div className="fmt-detail__actions">
                <Link className="btn" to="/contact">
                  Build this format
                </Link>
                <Link className="btn btn--ghost" to="/formats">
                  All formats
                  <Icon name="arrow-right" size={15} />
                </Link>
              </div>
            </div>

            <aside className="fmt-detail__aside" aria-label="Format facts">
              <dl>
                <div>
                  <dt>Built for</dt>
                  <dd>{format.audience}</dd>
                </div>
                <div>
                  <dt>Primary action</dt>
                  <dd>{format.primaryAction}</dd>
                </div>
                <div>
                  <dt>Default motion</dt>
                  <dd>{format.motion}</dd>
                </div>
              </dl>
              <div className="fmt-detail__pages">
                <span>Page architecture</span>
                <ul>
                  {format.keyPages.map((page) => (
                    <li key={page}>{page}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section className="section section--flush-top fmt-stage-section" aria-labelledby="demo-heading">
        <div className="shell">
          <div className="fmt-stage__head">
            <h2 id="demo-heading" className="sr-only">
              {format.name} composition preview
            </h2>
            <span className="fmt-stage__label">
              <Icon name="compass" size={13} /> Full composition · scroll inside the frame on mobile
            </span>
            <span className="fmt-stage__hint">Illustrative content throughout</span>
          </div>

          <Reveal>
            <DemoFrame format={format}>
              <Demo data={format.demo} />
            </DemoFrame>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="changes-heading">
        <div className="shell fmt-split">
          <div>
            <span className="eyebrow">What we change</span>
            <h2 className="h2" id="changes-heading" style={{ marginTop: 18 }}>
              The decisions this format makes for you.
            </h2>
            <ul className="fmt-list fmt-list--checks">
              {format.changes.map((item) => (
                <li key={item}>
                  <Icon name="check" size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow">What we never do</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Lines this format will not cross.
            </h2>
            <ul className="fmt-list fmt-list--crosses">
              {format.avoid.map((item) => (
                <li key={item}>
                  <Icon name="close" size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="shell">
          <Reveal className="fmt-seo">
            <span className="fmt-seo__label">
              <Icon name="globe" size={14} /> Search &amp; structure
            </span>
            <p>{format.seo}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Link className="fmt-next" to={`/formats/${next.slug}`}>
            <div>
              <span className="eyebrow">Next format</span>
              <h2>{next.name}</h2>
              <p>{next.headline}</p>
            </div>
            <span className="fmt-next__arrow" aria-hidden="true">
              <Icon name="arrow-up-right" size={20} />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="Format + studio"
        title="We can build this, or tell you it is wrong."
        lead="Send the decision your visitor is trying to make. We will reply with the format that fits, the pages it needs and what it costs."
        primaryLabel="Start a project"
        secondaryLabel="See selected work"
        secondaryTo="/work"
      />
    </div>
  );
}
