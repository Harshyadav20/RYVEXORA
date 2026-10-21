import { useState } from 'react';
import Icon from '../Icon.jsx';

/**
 * Demo frame.
 *
 * A format demo is a composition, so it is presented inside a labelled stage:
 * the chrome makes clear it is an illustrative build, and it keeps the demo's
 * own visual language from being mistaken for the RYVEXORA site itself.
 *
 * The frame opens at a viewport-like height with the composition scrolling
 * inside it; "Open full page" releases it to its natural height so the whole
 * document can be judged in one scroll.
 */
export default function DemoFrame({ format, children, className = '' }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`demo-frame ${className}${expanded ? ' is-expanded' : ''}`}
      style={{ '--demo-accent': format.accent, '--demo-accent-soft': format.accentSoft }}
    >
      <div className="demo-frame__bar">
        <div className="demo-frame__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="demo-frame__label">
          <span className="demo-frame__live" aria-hidden="true" />
          Format {format.index} · {format.name}
        </span>
        <span className="demo-frame__note">
          <Icon name="info" size={12} />
          {format.demo.brandNote}
        </span>
        <button
          type="button"
          className="demo-frame__toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Fit to frame' : 'Open full page'}
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={12} />
        </button>
      </div>

      <div className={`demo demo--${format.slug}`}>
        <div className="demo__inner">{children}</div>
      </div>

      {!expanded && (
        <span className="demo-frame__more" aria-hidden="true">
          Scroll inside the frame
          <Icon name="chevron-down" size={13} />
        </span>
      )}
    </div>
  );
}
