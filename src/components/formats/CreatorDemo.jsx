import Icon from '../Icon.jsx';

export default function CreatorDemo({ data }) {
  const { brand, nav, hero, availability, work, services, process, faq } = data;

  return (
    <>
      <div className="demo-nav">
        <span className="demo-brand">{brand}</span>
        <nav className="demo-nav__links" aria-label="Demo navigation">
          {nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span className="demo-nav__actions">
          <span className="demo-btn demo-btn--accent">Enquire</span>
        </span>
      </div>

      <section className="cre-hero">
        <div className="cre-hero__copy">
          <span className="demo-eyebrow">{hero.eyebrow}</span>
          <h2 className="demo-h1 cre-title">{hero.title}</h2>
          <p className="demo-lead">{hero.lead}</p>
          <ul className="cre-badges">
            {hero.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        </div>

        <div className="cre-portrait" aria-hidden="true">
          <div className="cre-portrait__frame">
            <span className="cre-portrait__grain" />
            <span className="cre-portrait__monogram">SN</span>
          </div>
          <div className="cre-available">
            <span className="cre-available__dot" />
            <div>
              <span>{availability.label}</span>
              <strong>{availability.value}</strong>
            </div>
            <span className="cre-available__note">{availability.note}</span>
          </div>
        </div>
      </section>

      <section className="cre-work">
        <div className="cre-work__head">
          <h3>Selected work</h3>
          <span className="demo-link">Full archive <Icon name="arrow-right" size={12} /></span>
        </div>
        <div className="cre-grid">
          {work.map((piece, index) => (
            <article className={`cre-piece cre-piece--${piece.tone} ${index === 0 ? 'cre-piece--wide' : ''}`} key={piece.title}>
              <span className="cre-piece__grain" aria-hidden="true" />
              <div className="cre-piece__meta">
                <h4>{piece.title}</h4>
                <span>{piece.kind}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cre-services">
        <div className="cre-services__head">
          <h3>Ways to work together</h3>
          <p>Rates are starting points. Scope, usage and delivery are agreed in writing before a hold is confirmed.</p>
        </div>
        <div className="cre-rates">
          {services.map((service) => (
            <article className="cre-rate" key={service.title}>
              <div>
                <h4>{service.title}</h4>
                <p>{service.detail}</p>
              </div>
              <span>{service.from}</span>
            </article>
          ))}
        </div>
        <ol className="cre-process">
          {process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="cre-faq">
        {faq.map((item) => (
          <div key={item.q}>
            <h4>{item.q}</h4>
            <p>{item.a}</p>
          </div>
        ))}
      </section>

      <div className="demo-footer">
        <span>{brand} · Mumbai · working worldwide</span>
        <span>Booking Q1 2027 · Replies within two working days</span>
      </div>
    </>
  );
}
