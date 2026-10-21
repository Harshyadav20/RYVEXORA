import Reveal from './Reveal.jsx';
import { cn } from '../lib/utils.js';

export default function SectionHead({ eyebrow, title, lead, action, className }) {
  return (
    <div className={cn('section-head', className)}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Reveal as="h2" className="h2" style={{ marginTop: 18 }}>
          {title}
        </Reveal>
        {lead && (
          <Reveal as="p" className="lead" style={{ marginTop: 18 }} delay={0.05}>
            {lead}
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal className="section-head__aside" delay={0.1}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
