import Icon from '../Icon.jsx';

export default function MedicalDemo({ data }) {
  const { brand, nav, hero, booker, treatments, visit, clinician, fees, faq } = data;

  return (
    <>
      <div className="demo-nav">
        <span className="demo-brand">
          <span className="demo-brand__mark" aria-hidden="true">N</span>
          {brand}
        </span>
        <nav className="demo-nav__links" aria-label="Demo navigation">
          {nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span className="demo-nav__actions">
          <span className="demo-btn demo-btn--accent">
            <Icon name="calendar" size={13} /> Book
          </span>
        </span>
      </div>

      <section className="med-hero">
        <div className="med-hero__copy">
          <span className="demo-eyebrow">{hero.eyebrow}</span>
          <h2 className="demo-h1">{hero.title}</h2>
          <p className="demo-lead">{hero.lead}</p>
          <ul className="med-badges">
            {hero.badges.map((badge) => (
              <li key={badge}>
                <Icon name="check" size={11} /> {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="med-booker" role="group" aria-label="Appointment request preview">
          <span className="med-booker__flag">
            <Icon name="clock" size={12} /> Next: 09:20 tomorrow
          </span>
          <h3>{booker.title}</h3>
          {booker.fields.map((field) => (
            <label className="med-field" key={field.label}>
              <span>{field.label}</span>
              <span className="med-field__value">
                {field.value}
                <Icon name="chevron-down" size={12} />
              </span>
            </label>
          ))}
          <button type="button" className="demo-btn demo-btn--accent demo-btn--block" disabled>
            {booker.action}
          </button>
          <p className="med-booker__note">{booker.note}</p>
        </div>
      </section>

      <section className="med-section">
        <div className="med-section__head">
          <h3 className="demo-h3">Treatments</h3>
          <span className="demo-link">All treatments <Icon name="arrow-right" size={12} /></span>
        </div>
        <div className="med-treatments">
          {treatments.map((treatment) => (
            <article className="med-treatment" key={treatment.name}>
              <span className="med-treatment__time">{treatment.time}</span>
              <h4>{treatment.name}</h4>
              <p>{treatment.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="med-section med-visit">
        <h3 className="demo-h3">What happens, in order</h3>
        <ol className="med-steps">
          {visit.map((step) => (
            <li key={step.step}>
              <span className="med-steps__num">{step.step}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="med-section med-proof">
        <div className="med-clinician">
          <div className="med-clinician__portrait" aria-hidden="true">
            <span>AM</span>
          </div>
          <div>
            <span className="demo-eyebrow">Clinical lead</span>
            <h4>{clinician.name}</h4>
            <p className="med-clinician__role">{clinician.role}</p>
            <ul className="med-creds">
              {clinician.credentials.map((credential) => (
                <li key={credential}>
                  <Icon name="shield" size={11} /> {credential}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="med-fees">
          <h4>Fees, before you book</h4>
          <ul>
            {fees.map((fee) => (
              <li key={fee.label}>
                <span>{fee.label}</span>
                <strong>{fee.price}</strong>
              </li>
            ))}
          </ul>
          <p className="med-fees__note">Illustrative pricing · every plan is confirmed in writing.</p>
        </div>
      </section>

      <section className="med-section">
        <h3 className="demo-h3">Questions patients ask</h3>
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
        <span>{brand} · 14 Northbeam Row, London</span>
        <span>Mon–Sat 08:30–19:00 · Emergency slots daily</span>
      </div>
    </>
  );
}
