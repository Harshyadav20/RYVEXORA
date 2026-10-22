import { useEffect } from 'react';

/**
 * One pointer listener for every lit surface on the page.
 *
 * Cards read `--spot-x` / `--spot-y` from this hook; the CSS uses those
 * coordinates to place a soft light under the cursor. Delegating to a single
 * document listener keeps it cheap when a page has thirty panels on it.
 *
 * Skipped entirely on touch devices and for reduced-motion users: the CSS
 * fallback (light resting at the top edge) still reads correctly.
 */
const SELECTOR = [
  '.card',
  '.panel',
  '.service-card',
  '.project-card',
  '.work-card',
  '.fmt-card',
  '.principle',
  '.contact-next__item',
].join(',');

export default function usePointerGlow() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = null;
    let current = null;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = null;
      if (!current) return;
      const rect = current.getBoundingClientRect();
      current.style.setProperty('--spot-x', `${x - rect.left}px`);
      current.style.setProperty('--spot-y', `${y - rect.top}px`);
    };

    const onMove = (event) => {
      const target = event.target instanceof Element ? event.target.closest(SELECTOR) : null;

      if (target !== current) {
        if (current) {
          current.style.removeProperty('--spot-x');
          current.style.removeProperty('--spot-y');
        }
        current = target;
      }

      if (!current) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      if (current) {
        current.style.removeProperty('--spot-x');
        current.style.removeProperty('--spot-y');
      }
      current = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);
}
