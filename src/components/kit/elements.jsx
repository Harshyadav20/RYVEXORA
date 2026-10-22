import { useEffect, useId, useRef, useState } from 'react';
import Icon from '../Icon.jsx';

/* ------------------------------------------------------------------ helpers */

function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return [on, () => setOn((v) => !v)];
}

/* ------------------------------------------------------------------ Actions */

function ButtonPreview() {
  return (
    <div className="el-stack el-stack--center">
      <div className="el-row el-row--center">
        <span className="btn btn--sm">
          <span className="btn__label">
            Start a project
            <Icon name="arrow-up-right" size={15} />
          </span>
        </span>
        <span className="btn btn--ghost btn--sm">
          <span className="btn__label">
            See the work
            <Icon name="arrow-right" size={15} />
          </span>
        </span>
      </div>
      <div className="el-row el-row--center">
        <span className="btn btn--ghost btn--sm el-btn-quiet">
          <span className="btn__label">Loading…</span>
        </span>
        <span className="btn btn--sm is-disabled" aria-disabled="true">
          <span className="btn__label">Unavailable</span>
        </span>
      </div>
    </div>
  );
}

function IconButtonPreview() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <div className="el-row el-row--center el-row--gap">
      <button type="button" className="el-icon-btn" aria-label="Copy link" onClick={() => setCopied(true)}>
        <Icon name="copy" size={16} />
      </button>
      <button
        type="button"
        className={`el-icon-btn${saved ? ' is-active' : ''}`}
        aria-label="Save element"
        aria-pressed={saved}
        onClick={() => setSaved((v) => !v)}
      >
        <Icon name={saved ? 'check' : 'plus'} size={16} />
      </button>
      <button type="button" className="el-icon-btn" aria-label="Share">
        <Icon name="send" size={16} />
      </button>
      <span className="el-live" aria-live="polite">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}

function SwitchPreview() {
  const [motion, setMotion] = useToggle(true);
  const [digest, setDigest] = useToggle(false);
  return (
    <div className="el-stack">
      <label className="el-switch">
        <input type="checkbox" checked={motion} onChange={setMotion} />
        <span className="el-switch__track" aria-hidden="true">
          <span className="el-switch__thumb" />
        </span>
        <span className="el-switch__copy">
          Reduced motion
          <small>Slows every transition to a fade.</small>
        </span>
      </label>

      <label className="el-switch">
        <input type="checkbox" checked={digest} onChange={setDigest} />
        <span className="el-switch__track" aria-hidden="true">
          <span className="el-switch__thumb" />
        </span>
        <span className="el-switch__copy">
          Weekly digest
          <small>One email, Friday morning.</small>
        </span>
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------- Inputs */

function FieldPreview() {
  // The same preview renders in the starters row and again in the gallery, so
  // ids must be instance-scoped or the labels point at the wrong input.
  const uid = useId();
  const email = `${uid}-email`;
  const budget = `${uid}-budget`;

  return (
    <div className="el-stack">
      <div className="el-field">
        <label htmlFor={email}>
          Work email <span className="el-field__req" aria-hidden="true">*</span>
        </label>
        <input id={email} type="email" placeholder="you@company.com" aria-describedby={`${email}-hint`} />
        <p id={`${email}-hint`} className="el-field__hint">We reply within one working day.</p>
      </div>

      <div className="el-field is-invalid">
        <label htmlFor={budget}>Project budget</label>
        <input id={budget} defaultValue="Not sure yet" aria-invalid="true" aria-describedby={`${budget}-err`} />
        <p id={`${budget}-err`} className="el-field__error">
          <Icon name="alert" size={12} /> Pick a range so the quote is accurate.
        </p>
      </div>
    </div>
  );
}

function SearchPreview() {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === '/' && document.activeElement !== ref.current) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        event.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="el-stack">
      <div className="el-search">
        <Icon name="compass" size={15} />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setValue('');
          }}
          placeholder="Search elements"
          aria-label="Search elements"
        />
        <kbd>/</kbd>
      </div>
      <p className="el-caption">
        {value ? `${value.length} characters — Escape clears` : 'Press / anywhere on this page'}
      </p>
    </div>
  );
}

function SegmentedPreview() {
  const [value, setValue] = useState('Desktop');
  return (
    <div className="el-stack el-stack--center">
      <div className="el-segmented" role="radiogroup" aria-label="Preview width">
        {['Desktop', 'Tablet', 'Phone'].map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            className={value === option ? 'is-on' : ''}
            onClick={() => setValue(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="el-caption">Selected · {value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Display */

function MetricPreview() {
  return (
    <div className="el-grid el-grid--2">
      {[
        { label: 'Time to first value', value: '9 days', note: 'Median across the last four builds' },
        { label: 'Rounds to sign-off', value: '2', note: 'Design rounds before build starts' },
      ].map((metric) => (
        <div className="el-metric" key={metric.label}>
          <span className="el-metric__label">{metric.label}</span>
          <strong className="el-metric__value">{metric.value}</strong>
          <span className="el-metric__note">{metric.note}</span>
        </div>
      ))}
    </div>
  );
}

function TagPreview() {
  return (
    <div className="el-stack">
      <div className="el-tags">
        {['React', 'Vite', 'Three.js', 'PHP'].map((tag) => (
          <span className="el-tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="el-tags">
        {['Stable', 'Documented'].map((tag) => (
          <span className="el-tag el-tag--outline" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function AvatarPreview() {
  const people = [
    { initials: 'AR', name: 'Aarav R.' },
    { initials: 'SN', name: 'Sana N.' },
    { initials: 'KM', name: 'Kabir M.' },
  ];
  return (
    <div className="el-stack el-stack--center">
      <div className="el-avatars">
        {people.map((person) => (
          <span className="el-avatar" key={person.initials} title={person.name}>
            {person.initials}
            <span className="sr-only">{person.name}</span>
          </span>
        ))}
        <span className="el-avatar el-avatar--count">+2</span>
      </div>
      <p className="el-caption">Three of five — initials are a fallback for a real face</p>
    </div>
  );
}

function PricePreview() {
  return (
    <div className="el-price">
      <span className="el-price__flag">Most chosen</span>
      <div className="el-price__head">
        <h4>Fixed scope</h4>
        <p className="el-price__value">
          <small>from</small> ₹85,000
        </p>
      </div>
      <ul className="el-price__list">
        <li><Icon name="check" size={13} /> Site, copy and one revision round</li>
        <li><Icon name="check" size={13} /> 3–4 weeks, fixed date</li>
        <li><Icon name="check" size={13} /> You own the code</li>
      </ul>
      <span className="btn btn--sm btn--block">
        <span className="btn__label">Start a project</span>
      </span>
    </div>
  );
}

function ProgressPreview() {
  const [value, setValue] = useState(68);
  return (
    <div className="el-stack">
      {[
        { label: 'Build', value, tone: '' },
        { label: 'Copy review', value: 100, tone: 'is-ok' },
      ].map((meter) => (
        <div className="el-meter" key={meter.label}>
          <div className="el-meter__head">
            <span>{meter.label}</span>
            <b>{meter.value}%</b>
          </div>
          <div
            className={`el-meter__track ${meter.tone}`}
            role="progressbar"
            aria-valuenow={meter.value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={meter.label}
          >
            <span style={{ width: `${meter.value}%` }} />
          </div>
        </div>
      ))}
      <button type="button" className="el-link" onClick={() => setValue((v) => (v >= 96 ? 34 : v + 16))}>
        Advance build
        <Icon name="arrow-right" size={12} />
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- Navigation */

function TabsPreview() {
  const [tab, setTab] = useState('Preview');
  return (
    <div className="el-stack">
      <div className="el-tabs" role="tablist" aria-label="Element detail">
        {['Preview', 'Code', 'Info'].map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? 'is-on' : ''}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="el-tabs__panel" role="tabpanel">
        {tab === 'Preview' && 'The rendered element.'}
        {tab === 'Code' && 'The JSX that produced it.'}
        {tab === 'Info' && 'Props, states and constraints.'}
      </div>
    </div>
  );
}

function BreadcrumbPreview() {
  return (
    <nav className="el-crumbs" aria-label="Breadcrumb">
      <a href="#kit">Home</a>
      <span aria-hidden="true">/</span>
      <a href="#kit">Kit</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">Button</span>
    </nav>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(2);
  const pages = 6;
  return (
    <div className="el-stack el-stack--center">
      <div className="el-pager">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          <Icon name="chevron-right" size={14} style={{ transform: 'rotate(180deg)' }} />
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={n === page ? 'is-on' : ''}
            aria-current={n === page ? 'page' : undefined}
            aria-label={`Page ${n}`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
        <button type="button" aria-label="Next page" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>
          <Icon name="chevron-right" size={14} />
        </button>
      </div>
      <p className="el-caption">Page {page} of {pages}</p>
    </div>
  );
}

/* ----------------------------------------------------------------- Feedback */

function AlertPreview() {
  return (
    <div className="el-stack">
      <div className="el-alert">
        <Icon name="info" size={16} />
        <div>
          <strong>Illustrative content</strong>
          <p>Every brand shown in this library is fictional.</p>
        </div>
      </div>
      <div className="el-alert el-alert--warn">
        <Icon name="alert" size={16} />
        <div>
          <strong>Not connected</strong>
          <p>This form does not submit anywhere yet.</p>
        </div>
      </div>
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="el-empty">
      <span className="el-empty__icon" aria-hidden="true">
        <Icon name="layers" size={20} />
      </span>
      <h4>Nothing saved yet</h4>
      <p>Elements you bookmark appear here, newest first.</p>
      <span className="btn btn--ghost btn--sm">
        <span className="btn__label">Browse elements</span>
      </span>
    </div>
  );
}

function ToastPreview() {
  const [open, setOpen] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!open || paused) return undefined;
    const timer = window.setTimeout(() => setOpen(false), 4000);
    return () => window.clearTimeout(timer);
  }, [open, paused]);

  return (
    <div className="el-stack el-stack--center">
      <div className="el-toast-stage">
        {open ? (
          <div
            className="el-toast"
            role="status"
            aria-live="polite"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <Icon name="check" size={15} />
            <span>Snippet copied to the clipboard</span>
            <button type="button" aria-label="Dismiss" onClick={() => setOpen(false)}>
              <Icon name="close" size={13} />
            </button>
            <span className="el-toast__timer" aria-hidden="true" style={{ animationPlayState: paused ? 'paused' : 'running' }} />
          </div>
        ) : (
          <button type="button" className="el-link" onClick={() => setOpen(true)}>
            Replay toast
            <Icon name="arrow-right" size={12} />
          </button>
        )}
      </div>
      <p className="el-caption">Auto-dismisses in 4s · pauses on hover or focus</p>
    </div>
  );
}

/* -------------------------------------------------------------------- index */

export const ELEMENT_PREVIEWS = {
  button: ButtonPreview,
  'icon-button': IconButtonPreview,
  switch: SwitchPreview,
  field: FieldPreview,
  search: SearchPreview,
  segmented: SegmentedPreview,
  metric: MetricPreview,
  tag: TagPreview,
  avatar: AvatarPreview,
  price: PricePreview,
  progress: ProgressPreview,
  tabs: TabsPreview,
  breadcrumb: BreadcrumbPreview,
  pagination: PaginationPreview,
  alert: AlertPreview,
  empty: EmptyPreview,
  toast: ToastPreview,
};

export default ELEMENT_PREVIEWS;
