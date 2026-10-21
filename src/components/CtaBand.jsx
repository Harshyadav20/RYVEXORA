import Button from './Button.jsx';
import Reveal from './Reveal.jsx';

export default function CtaBand({
  eyebrow = 'Next step',
  title = "Let's build what's next.",
  lead = "Tell us what you are working on. We will reply with an honest view of scope, budget and the next sensible step.",
  primaryLabel = 'Start a project',
  secondaryLabel = 'Explore services',
  secondaryTo = '/services',
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="shell">
        <div className="cta-band__inner">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
            <h2 id="cta-band-title">{title}</h2>
            <p>{lead}</p>
          </Reveal>
          <Reveal className="btn-row" delay={0.08}>
            <Button to="/contact">{primaryLabel}</Button>
            <Button to={secondaryTo} variant="ghost">
              {secondaryLabel}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
