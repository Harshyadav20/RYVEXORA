import { useEffect } from 'react';

const SITE_URL = 'https://ryvexora.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

/**
 * Lightweight document-head management. Keeps titles, descriptions, canonical
 * URLs and social cards in sync with the active route.
 */
export default function useSeo({ title, description, path = '/', image = DEFAULT_IMAGE, type = 'website' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — RYVEXORA` : 'RYVEXORA — Build Beyond Limits';
    const url = `${SITE_URL}${path}`;
    document.title = fullTitle;

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }

    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:image"]', 'content', image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, path, image, type]);
}
