import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import CodeBlock from './CodeBlock.jsx';
import { ELEMENT_PREVIEWS } from './elements.jsx';
import { startScroll, stopScroll } from '../../hooks/useSmoothScroll.js';

const TABS = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'info', label: 'Info' },
];

/**
 * Element detail — the registry pattern: Preview / Code / Info tabs with a
 * copyable snippet, opened as a side panel so the gallery stays in view.
 *
 * Accessibility: it is a modal. Focus moves in, is trapped, returns to the
 * trigger, Escape closes, and background scroll is locked through the site's
 * own Lenis controller (not a body overflow hack, which Lenis would fight).
 */
export default function ElementDrawer({ element, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [tab, setTab] = useState('preview');

  useEffect(() => {
    if (!element) return undefined;
    setTab('preview');
  }, [element]);

  useEffect(() => {
    if (!element) return undefined;

    const previouslyFocused = document.activeElement;
    stopScroll();
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      startScroll();
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus?.();
    };
  }, [element, onClose]);

  if (!element) return null;

  const Preview = ELEMENT_PREVIEWS[element.id];

  return (
    <div
      className="kit-drawer"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="kit-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="kit-drawer-title"
        ref={panelRef}
      >
        <div className="kit-drawer__top">
          <span className="kit-drawer__crumb">
            <span>Kit</span>
            <span aria-hidden="true">/</span>
            <span>{element.name}</span>
          </span>
          <button type="button" className="el-icon-btn" aria-label="Close panel" onClick={onClose} ref={closeRef}>
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="kit-drawer__body">
          <div className="kit-drawer__head">
            <div className="kit-drawer__title-row">
              <h2 id="kit-drawer-title">{element.name}</h2>
              <span className="kit-status">{element.status}</span>
            </div>
            <p>{element.summary}</p>
            <div className="el-tags">
              {element.tags.map((tag) => (
                <span className="el-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="kit-tabs" role="tablist" aria-label="Element detail">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`kit-tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`kit-panel-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                className={tab === item.id ? 'is-on' : ''}
                onClick={() => setTab(item.id)}
              >
                {item.label}
                {item.id === 'code' && <span className="kit-tabs__count">{element.code.split('\n').length}</span>}
              </button>
            ))}
          </div>

          {tab === 'preview' && (
            <div className="kit-panel" role="tabpanel" id="kit-panel-preview" aria-labelledby="kit-tab-preview">
              <div className="kit-stage">{Preview ? <Preview /> : null}</div>
              <p className="kit-stage__note">
                <Icon name="info" size={13} />
                Live element — interact with it. Nothing here submits anywhere.
              </p>
            </div>
          )}

          {tab === 'code' && (
            <div className="kit-panel" role="tabpanel" id="kit-panel-code" aria-labelledby="kit-tab-code">
              <CodeBlock code={element.code} filename={`${element.id}.jsx`} />
            </div>
          )}

          {tab === 'info' && (
            <div className="kit-panel" role="tabpanel" id="kit-panel-info" aria-labelledby="kit-tab-info">
              <dl className="kit-spec">
                <div>
                  <dt>Category</dt>
                  <dd>{element.category}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{element.status}</dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd>{element.tags.join(' · ')}</dd>
                </div>
              </dl>

              <h3 className="kit-sub">Rules this element follows</h3>
              <ul className="kit-notes">
                {element.notes.map((note) => (
                  <li key={note}>
                    <Icon name="check" size={13} />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
