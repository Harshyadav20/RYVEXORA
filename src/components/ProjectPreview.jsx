import Icon from './Icon.jsx';
import { cn } from '../lib/utils.js';

const URLS = {
  dashboard: 'atlas.app/overview',
  commerce: 'novacommerce.store',
  ops: 'helix.ops/review',
  seo: 'signal.market/insights',
  outreach: 'orbit.outreach/sequences',
};

function Dashboard({ project }) {
  return (
    <div className="pv-dash">
      <aside className="pv-side">
        {[0, 1, 2, 3, 4].map((i) => (
          <div className={cn('pv-side__item', i === 0 && 'is-active')} key={i}>
            <span className="pv-side__dot" />
            <span className="pv-side__line" style={{ width: `${[62, 48, 70, 54, 40][i]}%` }} />
          </div>
        ))}
        <div style={{ marginTop: 'auto' }} className="pv-side__item">
          <span className="pv-side__dot" />
          <span className="pv-side__line" style={{ width: '36%' }} />
        </div>
      </aside>

      <div className="pv-main">
        <div className="pv-head">
          <div>
            <span className="pv-label">Revenue workspace</span>
            <div className="pv-title">{project.name}</div>
          </div>
          <span className="pv-label" style={{ color: '#36d9ff' }}>Live</span>
        </div>

        <div className="pv-kpis">
          {[
            ['Pipeline', '24 deals'],
            ['Forecast', 'Q3'],
            ['Accounts', '—'],
          ].map(([label, value]) => (
            <div className="pv-kpi" key={label}>
              <span className="pv-label">{label}</span>
              <div className="pv-kpi__val">{value}</div>
            </div>
          ))}
        </div>

        <div className="pv-chart">
          {[42, 58, 36, 72, 54, 88, 66, 94, 78, 60].map((height, i) => (
            <span
              key={i}
              className={cn('pv-bar', i % 4 === 0 && 'pv-bar--violet')}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Commerce({ project }) {
  return (
    <div className="pv-commerce">
      <div className="pv-nav">
        <span className="pv-title" style={{ fontSize: '2.6cqw' }}>
          {project.name.replace('Commerce', '')}
          <span style={{ color: '#36d9ff' }}>.</span>
        </span>
        <div className="pv-nav__links">
          {['Shop', 'Journal', 'Stockists'].map((label) => (
            <span className="pv-label" key={label}>{label}</span>
          ))}
        </div>
        <span className="pv-label">Cart (2)</span>
      </div>

      <div className="pv-hero">
        <div style={{ maxWidth: '56%' }}>
          <span className="pv-label">Fall / Winter 26</span>
          <div className="pv-title" style={{ fontSize: '4.6cqw', marginTop: '1cqw' }}>
            Objects for
            <br />
            everyday motion.
          </div>
          <span
            style={{
              display: 'inline-block',
              marginTop: '1.8cqw',
              height: '1.8cqw',
              width: '16cqw',
              borderRadius: '99px',
              background: '#f4f7ff',
            }}
          />
        </div>
        <div
          style={{
            width: '24%',
            aspectRatio: '1',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 34% 30%, #ffffff 0%, #9fe6ff 6%, #2a3d5c 34%, #0a1119 72%)',
            boxShadow: '0 0 6cqw rgba(54,217,255,0.35), inset -1cqw -1.4cqw 3cqw rgba(0,0,0,0.8)',
          }}
        />
      </div>

      <div className="pv-products">
        {['Monolith Lamp', 'Arc Chair', 'Fold Shelf'].map((name, index) => (
          <div className="pv-product" key={name}>
            <div className="pv-product__img" />
            <span className="pv-label">{`0${index + 1}`}</span>
            <span style={{ fontSize: '1.9cqw', color: '#e8f0fb' }}>{name}</span>
            <div className="pv-line" style={{ width: '40%', opacity: 0.5 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Ops({ project }) {
  return (
    <div className="pv-ops">
      <div className="pv-doc">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="pv-label">Incoming document</span>
          <span className="pv-label" style={{ color: '#8b5cf6' }}>PDF</span>
        </div>
        <div className="pv-line" style={{ width: '48%', marginTop: '1.4cqw' }} />
        <div className="pv-line" style={{ width: '84%', opacity: 0.55 }} />
        <div className="pv-line" style={{ width: '76%', opacity: 0.4 }} />
        <div className="pv-doc__hl" style={{ width: '62%', marginTop: '1.2cqw' }} />
        <div className="pv-line" style={{ width: '88%', opacity: 0.35 }} />
        <div className="pv-line" style={{ width: '64%', opacity: 0.25 }} />
        <div className="pv-line" style={{ width: '78%', opacity: 0.25 }} />
        <div className="pv-doc__hl" style={{ width: '44%', background: 'rgba(139,92,246,0.45)' }} />
        <div className="pv-line" style={{ width: '52%', opacity: 0.25 }} />
      </div>

      <div className="pv-arrow">
        <Icon name="arrow-right" size={18} />
      </div>

      <div className="pv-extract">
        <span className="pv-label" style={{ color: '#c3b0ff' }}>Extracted fields</span>
        {[
          ['Supplier', 'Northline Ltd'],
          ['Invoice', 'NL-2041'],
          ['Due', '30 days'],
        ].map(([label, value]) => (
          <div className="pv-field" key={label}>
            <span className="pv-label">{label}</span>
            <span className="pv-field__val">{value}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '1cqw', marginTop: '0.4cqw' }}>
          <span className="pv-field" style={{ padding: '0.7cqw 1.2cqw' }}>
            <span className="pv-field__val" style={{ color: '#a7f3d0' }}>Source linked</span>
          </span>
          <span className="pv-field" style={{ padding: '0.7cqw 1.2cqw' }}>
            <span className="pv-field__val" style={{ color: '#c3b0ff' }}>Needs review</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Seo({ project }) {
  return (
    <div className="pv-seo">
      <div className="pv-search">
        <span
          style={{
            width: '1.7cqw',
            height: '1.7cqw',
            borderRadius: '50%',
            border: '0.25cqw solid rgba(244,247,255,.45)',
            display: 'inline-block',
          }}
        />
        <span style={{ fontSize: '1.8cqw', color: 'rgba(244,247,255,.5)' }}>
          {project.category.split(' · ')[0].toLowerCase()} templates for growing teams
        </span>
      </div>

      <div className="pv-results">
        {[
          'A practical guide to programmatic pages',
          'Template architecture that stays useful',
          'How we decide when a page should exist',
        ].map((title, index) => (
          <div key={title}>
            <span className="pv-label">{`ryvexora.com › insights › ${index + 1}`}</span>
            <div className="pv-result__title">{title}</div>
            <div className="pv-line" style={{ width: `${[72, 58, 64][index]}%`, marginTop: '0.6cqw', opacity: 0.4 }} />
          </div>
        ))}
      </div>

      <div className="pv-rank">
        <span className="pv-label">Template performance</span>
        {[
          ['Guide template', 78],
          ['Comparison template', 52],
          ['Directory template', 90],
        ].map(([label, width], index) => (
          <div className="pv-rank__row" key={label}>
            <span className="pv-label" style={{ width: '34%' }}>{label}</span>
            <span className="pv-rank__track">
              <span
                className="pv-rank__fill"
                style={{
                  width: `${width}%`,
                  background:
                    index === 1
                      ? 'linear-gradient(90deg, rgba(139,92,246,.3), #8b5cf6)'
                      : undefined,
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Outreach({ project }) {
  return (
    <div className="pv-outreach">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2cqw' }}>
        <div>
          <span className="pv-label">Sequence · {project.name}</span>
          <div className="pv-title" style={{ fontSize: '3.2cqw' }}>Day 1 — introduction</div>
        </div>
        <span className="pv-label">3 steps</span>
      </div>

      <div className="pv-steps">
        {[
          ['Step 1', 'Open · 09:00'],
          ['Step 2', 'Follow-up · +3d'],
          ['Step 3', 'Close · +7d'],
        ].map(([title, meta], index) => (
          <div className={cn('pv-step', index === 0 && 'is-done')} key={title}>
            <span className="pv-label">{meta}</span>
            <div style={{ fontSize: '2cqw', marginTop: '0.8cqw', color: '#eaf4ff' }}>{title}</div>
            <div className="pv-line" style={{ width: '70%', marginTop: '1cqw', opacity: 0.4 }} />
            {index < 2 && (
              <span
                style={{
                  position: 'absolute',
                  right: '-1.2cqw',
                  top: '50%',
                  width: '1.2cqw',
                  height: '0.15cqw',
                  background: 'rgba(54,217,255,.4)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pv-reply">
        <span className="pv-label" style={{ color: '#bfe9ff' }}>Reply received</span>
        <p className="pv-reply__text" style={{ margin: '0.8cqw 0 0' }}>
          “Relevant timing — could you send a few slots for Thursday?”
        </p>
      </div>

      <span className="pv-label">Sequence paused automatically</span>
    </div>
  );
}

const VARIANTS = {
  dashboard: Dashboard,
  commerce: Commerce,
  ops: Ops,
  seo: Seo,
  outreach: Outreach,
};

export default function ProjectPreview({ project, tall = false, className }) {
  const Variant = VARIANTS[project.visual] ?? Dashboard;

  return (
    <div className={cn('project-preview', tall && 'project-preview--tall', className)} role="img" aria-label={`${project.name} interface preview`}>
      <div className="pv-top">
        <span className="pv-dot" />
        <span className="pv-dot" />
        <span className="pv-dot" />
        <span className="pv-url">{URLS[project.visual] ?? 'ryvexora.com'}</span>
      </div>
      <div className="pv-body">
        <Variant project={project} />
      </div>
    </div>
  );
}
