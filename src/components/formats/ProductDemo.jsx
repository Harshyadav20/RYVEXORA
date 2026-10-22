import Icon from '../Icon.jsx';

export default function ProductDemo({ data }) {
  const { brand, nav, hero, window: app, features, pricing, integrations, faq } = data;

  return (
    <>
      <div className="demo-nav">
        <span className="demo-brand">
          <span className="demo-brand__mark demo-brand__mark--square" aria-hidden="true">
            <Icon name="layers" size={14} />
          </span>
          {brand}
        </span>
        <nav className="demo-nav__links" aria-label="Demo navigation">
          {nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span className="demo-nav__actions">
          <span className="demo-btn demo-btn--ghost">Sign in</span>
          <span className="demo-btn demo-btn--accent">Book a demo</span>
        </span>
      </div>

      <section className="prod-hero">
        <span className="demo-eyebrow">{hero.eyebrow}</span>
        <h2 className="demo-h1 prod-hero__title">{hero.title}</h2>
        <p className="demo-lead prod-hero__lead">{hero.lead}</p>
        <div className="prod-hero__actions">
          <span className="demo-btn demo-btn--accent">Book a demo</span>
          <span className="demo-btn demo-btn--ghost">Start free</span>
        </div>
        <ul className="prod-badges">
          {hero.badges.map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>
      </section>

      <div className="prod-window" role="img" aria-label={`${brand} dashboard preview`}>
        <div className="prod-window__bar">
          <span className="prod-window__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="prod-window__title">{app.title}</span>
          <span className="prod-window__pill">Live</span>
        </div>
        <div className="prod-window__body">
          <aside className="prod-side" aria-hidden="true">
            {app.tabs.map((tab, index) => (
              <span className={index === 2 ? 'is-on' : ''} key={tab}>
                <i />
                {tab}
              </span>
            ))}
          </aside>
          <div className="prod-main">
            <div className="prod-kpis">
              {app.kpi.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="prod-table">
              <div className="prod-table__head">
                <span>Account</span>
                <span>Status</span>
                <span>Items</span>
              </div>
              {app.rows.map((row) => (
                <div className="prod-table__row" key={row.a}>
                  <span>{row.a}</span>
                  <span className={row.b.includes('review') ? 'is-warn' : 'is-ok'}>{row.b}</span>
                  <span>{row.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="prod-section">
        <div className="prod-features">
          {features.map((feature, index) => (
            <article className="prod-feature" key={feature.title}>
              <div className="prod-feature__num">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <span className="prod-feature__tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prod-section prod-pricing">
        <div className="prod-section__head">
          <h3 className="demo-h3">Pricing you can read</h3>
          <span className="demo-link">Compare plans <Icon name="arrow-right" size={12} /></span>
        </div>
        <div className="prod-tiers">
          {pricing.map((tier) => (
            <article className={`prod-tier ${tier.featured ? 'is-featured' : ''}`} key={tier.name}>
              {tier.featured && <span className="prod-tier__flag">Most teams</span>}
              <h4>{tier.name}</h4>
              <p className="prod-tier__price">
                {tier.price}
                {tier.price.startsWith('$') && tier.price !== '$0' && <small> / mo</small>}
              </p>
              <p className="prod-tier__note">{tier.note}</p>
              <span className={`demo-btn ${tier.featured ? 'demo-btn--accent' : 'demo-btn--ghost'} demo-btn--block`}>
                {tier.cta}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="prod-section prod-integrations">
        <span className="demo-eyebrow">Works with what you already run</span>
        <ul>
          {integrations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="prod-section">
        <div className="med-faq">
          {faq.map((item) => (
            <div className="med-faq__item" key={item.q}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="demo-footer">
        <span>{brand} · Illustrative product interface</span>
        <span>Status · Security · Docs · Privacy</span>
      </div>
    </>
  );
}
