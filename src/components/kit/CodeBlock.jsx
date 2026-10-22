import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';

/**
 * Small, honest code panel: line numbers, a copy button, and a nine-token
 * highlighter.
 *
 * The highlighter escapes HTML first and only then wraps escaped text in span
 * tags, so it can never inject markup. Syntax colour is decoration — the copy
 * button copies the raw string, not the highlighted DOM.
 */
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

/**
 * One pass, so inserted markup is never re-scanned. An earlier version ran
 * four sequential replaces and the attribute rule then matched `class=` inside
 * the spans it had just written, which silently destroyed the output.
 */
const TOKEN =
  /(&lt;\/?)([A-Za-z][\w.]*)|(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|`[^`]*?`)|(\s)([a-zA-Z][\w-]*)(=)|\b(import|from|export|default|function|return|const|let|var)\b|\b(true|false|null|undefined)\b|(?<![\w-])(\d+(?:\.\d+)?)(?![\w-])/g;

function highlight(code) {
  return escapeHtml(code).replace(TOKEN, (match, bracket, tag, str, space, attr, eq, keyword, bool, num) => {
    if (tag) return `${bracket}<span class="tok-tag">${tag}</span>`;
    if (str) return `<span class="tok-str">${str}</span>`;
    if (attr) return `${space}<span class="tok-attr">${attr}</span>${eq}`;
    if (keyword) return `<span class="tok-key">${keyword}</span>`;
    if (bool) return `<span class="tok-bool">${bool}</span>`;
    if (num) return `<span class="tok-num">${num}</span>`;
    return match;
  });
}

export default function CodeBlock({ code, filename }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard is unavailable over plain HTTP or when denied; fall back to a
      // selection so the user can still copy manually.
      const area = document.createElement('textarea');
      area.value = code;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand?.('copy');
      area.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const lines = code.split('\n');

  return (
    <div className="code-panel">
      <div className="code-panel__bar">
        <span className="code-panel__file">
          <Icon name="code" size={13} />
          {filename ?? 'element.jsx'}
        </span>
        <button
          type="button"
          className={`code-panel__copy${copied ? ' is-copied' : ''}`}
          onClick={copy}
        >
          <Icon name={copied ? 'check' : 'copy'} size={13} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="code-panel__body">
        <span className="code-panel__gutter" aria-hidden="true">
          {lines.map((_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </span>
        <pre className="code-panel__pre">
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Snippet copied to the clipboard' : ''}
      </span>
    </div>
  );
}
