export const cn = (...names) => names.filter(Boolean).join(' ');

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const lerp = (a, b, t) => a + (b - a) * t;

export const damp = (current, target, lambda, delta) =>
  lerp(current, target, 1 - Math.exp(-lambda * delta));

export const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

export const isWebGLAvailable = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl && window.WebGLRenderingContext);
  } catch {
    return false;
  }
};

export const formatList = (items = []) => {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
};

export const slugToTitle = (slug = '') =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const mailtoLink = (email, subject, body) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
