import Icon from '../Icon.jsx';

export default function LuxuryDemo({ data }) {
  const { brand, nav, hero, collection, specs, atelier, quote } = data;

  return (
    <>
      <div className="demo-nav demo-nav--quiet">
        <nav className="demo-nav__links" aria-label="Demo navigation">
          {nav.slice(0, 2).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span className="demo-brand demo-brand--serif">{brand}</span>
        <nav className="demo-nav__links demo-nav__links--right" aria-label="Demo navigation, secondary">
          {nav.slice(2).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </div>

      <section className="lux-hero">
        <div className="lux-hero__plate" aria-hidden="true">
          <div className="lux-hero__grain" />
          <div className="lux-hero__figure" />
          <span className="lux-hero__caption">Look 07 · undyed wool</span>
        </div>
        <div className="lux-hero__copy">
          <span className="demo-eyebrow">{hero.eyebrow}</span>
          <h2 className="lux-title">{hero.title}</h2>
          <p className="demo-lead">{hero.lead}</p>
          <span className="lux-cta">
            Request the lookbook
            <Icon name="arrow-up-right" size={13} />
          </span>
          <ul className="lux-badges">
            {hero.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lux-collection">
        <div className="lux-collection__head">
          <h3>The collection</h3>
          <span>Nine pieces · Autumn 2026</span>
        </div>
        <div className="lux-grid">
          {collection.map((piece) => (
            <article className="lux-piece" key={piece.name}>
              <div className={`lux-piece__plate lux-plate--${piece.tone}`} aria-hidden="true">
                <span className="lux-piece__grain" />
              </div>
              <h4>{piece.name}</h4>
              <p>{piece.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lux-specs">
        <div className="lux-specs__intro">
          <span className="demo-eyebrow">The making</span>
          <h3>Cut slowly, finished by hand.</h3>
          <p>Each piece is made to order in the atelier. Cloth is chosen with you at the fitting.</p>
        </div>
        <dl className="lux-specs__list">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="lux-atelier">
        <div>
          <span className="demo-eyebrow">Enquiries</span>
          <h3>{atelier.title}</h3>
          <p>{atelier.body}</p>
          <span className="lux-quote">“{quote}”</span>
        </div>
        <form className="lux-form" aria-label="Appointment request preview" onSubmit={(event) => event.preventDefault()}>
          {atelier.fields.map((field) => (
            <label key={field}>
              <span>{field}</span>
              <span className="lux-form__line" aria-hidden="true" />
            </label>
          ))}
          <button type="button" className="lux-form__submit" disabled>
            {atelier.action}
            <Icon name="arrow-right" size={13} />
          </button>
          <p className="lux-form__note">Form preview · not connected</p>
        </form>
      </section>

      <div className="demo-footer demo-footer--quiet">
        <span>{brand} · 22 Rue de l’Atelier, Paris</span>
        <span>By appointment · Tuesday to Saturday</span>
      </div>
    </>
  );
}
