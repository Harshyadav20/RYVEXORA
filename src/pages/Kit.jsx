import { useEffect, useMemo, useRef, useState } from 'react';
import useSeo from '../hooks/useSeo.js';
import Icon from '../components/Icon.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ElementDrawer from '../components/kit/ElementDrawer.jsx';
import { ELEMENT_PREVIEWS } from '../components/kit/elements.jsx';
import { kitElements, kitCategories } from '../data/kit.js';

const COUNT_BY_CATEGORY = kitCategories.reduce((acc, category) => {
  acc[category.id] =
    category.id === 'all'
      ? kitElements.length
      : kitElements.filter((element) => element.category === category.id).length;
  return acc;
}, {});

const STARTERS = ['button', 'field', 'price', 'tabs', 'alert', 'metric'];

export default function Kit() {
  useSeo({
    title: 'Kit — UI elements',
    description:
      'Every element RYVEXORA builds with: buttons, fields, pricing tiers, meters, tabs, alerts and empty states. Rendered live from the design system, with the code that produced them.',
    path: '/kit',
  });

  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const searchRef = useRef(null);

  // "/" focuses search, Escape clears — the same contract as the search element
  // this page documents, so the demo is honest by construction.
  useEffect(() => {
    const onKey = (event) => {
      const tag = document.activeElement?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (event.key === '/' && !typing && !openId) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openId]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return kitElements.filter((element) => {
      const matchesCategory = category === 'all' || element.category === category;
      const haystack = `${element.name} ${element.summary} ${element.tags.join(' ')}`.toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [category, query]);

  const openElement = openId ? kitElements.find((element) => element.id === openId) : null;

  return (
    <div className="page kit">
      <header className="kit-hero">
        <div className="bg-grid" aria-hidden="true" />
        <span className="kit-hero__glow" aria-hidden="true" />
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Kit</span>
          </nav>

          <div className="kit-hero__layout">
            <div>
              <span className="eyebrow">Element library</span>
              <h1 className="kit-hero__title">
                Every element,
                <br />
                <span className="text-gradient">rendered live.</span>
              </h1>
              <p className="lead">
                Not screenshots. Each tile is the real component from this site&rsquo;s design
                system — open one to use it, read its rules, and copy the markup that produced it.
              </p>

              <div className="kit-hero__stats">
                <span>
                  <b>{kitElements.length}</b> elements
                </span>
                <span>
                  <b>{kitCategories.length - 1}</b> categories
                </span>
                <span>
                  <b>0</b> dependencies
                </span>
              </div>
            </div>

            <aside className="kit-hero__aside" aria-label="How to use the kit">
              <span className="kit-hero__aside-label">How to read a tile</span>
              <ul>
                <li>
                  <Icon name="compass" size={14} />
                  <span><b>Preview</b> is interactive — hover, type, toggle.</span>
                </li>
                <li>
                  <Icon name="code" size={14} />
                  <span><b>Code</b> is the JSX that built it.</span>
                </li>
                <li>
                  <Icon name="shield" size={14} />
                  <span><b>Info</b> lists the rules and constraints.</span>
                </li>
              </ul>
              <a className="arrow-link" href="/formats">
                See them composed into a page
                <Icon name="arrow-up-right" size={15} />
              </a>
            </aside>
          </div>
        </div>
      </header>

      {/* Start here — ordered by how often they decide the other elements,
          not by invented popularity. */}
      <section className="kit-starters" aria-labelledby="starters-heading">
        <div className="shell">
          <div className="kit-starters__head">
            <h2 id="starters-heading">Start here</h2>
            <span>The six that set the tone for everything else</span>
          </div>
          <ol className="kit-starters__row">
            {STARTERS.map((id, index) => {
              const element = kitElements.find((item) => item.id === id);
              const Preview = ELEMENT_PREVIEWS[id];
              return (
                <li key={id}>
                  <article className="kit-starter">
                    <span className="kit-starter__num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="kit-starter__stage" aria-hidden="true" inert>
                      {/* The wrapper shrinks to the scaled box (scale() alone
                          keeps the original layout size, which overflowed the
                          fixed-height stage). */}
                      <span className="kit-starter__scale">
                        <Preview />
                      </span>
                    </span>
                    <span className="kit-starter__meta">
                      <b>{element.name}</b>
                      <span>{element.category}</span>
                    </span>
                    <button type="button" className="kit-starter__hit" onClick={() => setOpenId(id)}>
                      <span className="sr-only">Open {element.name}</span>
                    </button>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Toolbar */}
      <div className="kit-toolbar">
        <div className="shell kit-toolbar__inner">
          <div className="el-search kit-search">
            <Icon name="compass" size={15} />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
              placeholder="Search elements"
              aria-label="Search elements"
            />
            <kbd>/</kbd>
          </div>

          <div className="kit-filters" role="group" aria-label="Filter by category">
            {kitCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={category === item.id ? 'is-on' : ''}
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
                <span className="kit-filters__count">{COUNT_BY_CATEGORY[item.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="section section--flush-top kit-gallery" aria-labelledby="gallery-heading">
        <div className="shell">
          <div className="kit-gallery__head">
            <h2 id="gallery-heading">
              {category === 'all' ? 'All elements' : kitCategories.find((c) => c.id === category)?.label}
            </h2>
            <span className="kit-gallery__count" aria-live="polite">
              {filtered.length} of {kitElements.length}
              {query && ` · “${query}”`}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="kit-empty">
              <span className="kit-empty__icon" aria-hidden="true">
                <Icon name="compass" size={20} />
              </span>
              <h3>Nothing matches “{query}”</h3>
              <p>Try a broader term, or clear the filter to see the whole library.</p>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
              >
                <span className="btn__label">Clear filters</span>
              </button>
            </div>
          ) : (
            <div className="kit-grid">
              {filtered.map((element) => (
                <ElementTile
                  key={element.id}
                  element={element}
                  onOpen={() => setOpenId(element.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Use them properly"
        title="An element library is not a design."
        lead="These pieces are only worth anything arranged around the decision your visitor is making. Bring us the decision; we will bring the composition."
        primaryLabel="Start a project"
        secondaryLabel="See the formats"
        secondaryTo="/formats"
      />

      <ElementDrawer element={openElement} onClose={() => setOpenId(null)} />
    </div>
  );
}

function ElementTile({ element, onOpen }) {
  const Preview = ELEMENT_PREVIEWS[element.id];

  return (
    <article className="kit-tile">
      {/*
        The preview is live but inert: these elements contain their own buttons,
        and a button cannot legally contain a button. Interaction happens in the
        drawer; the tile is one big labelled target instead.
      */}
      <div className="kit-tile__stage" aria-hidden="true" inert>
        <span className="kit-tile__scale">
          <Preview />
        </span>
        <span className="kit-tile__scrim" />
        <span className="kit-tile__cue">
          Open
          <Icon name="arrow-up-right" size={13} />
        </span>
      </div>

      <div className="kit-tile__meta">
        <span className="kit-tile__name">{element.name}</span>
        <span className="kit-tile__cat">{element.category}</span>
      </div>

      <button type="button" className="kit-tile__hit" onClick={onOpen}>
        <span className="sr-only">Open {element.name}</span>
      </button>
    </article>
  );
}
