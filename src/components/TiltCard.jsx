import { useEffect, useRef } from 'react';
import { cn, isFinePointer } from '../lib/utils.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * Lightweight pointer tilt. Writes CSS custom properties so the visual change
 * is handled entirely by the compositor — no React re-renders while moving.
 */
export default function TiltCard({
  children,
  as: Tag = 'div',
  className,
  max = 5,
  glow = true,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Coarse pointers cannot hover: a tap lights the card for a moment so the
  // interaction is discoverable on touch devices without revealing/hiding copy.
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || isFinePointer()) return undefined;

    let timer = null;
    const onTap = () => {
      element.classList.add('is-lit');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => element.classList.remove('is-lit'), 2400);
    };

    element.addEventListener('pointerdown', onTap);
    return () => {
      window.clearTimeout(timer);
      element.removeEventListener('pointerdown', onTap);
      element.classList.remove('is-lit');
    };
  }, [reduced]);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !isFinePointer()) return undefined;

    let frame = null;
    let next = null;

    const write = () => {
      frame = null;
      if (!next) return;
      element.style.setProperty('--rx', `${next.rx}deg`);
      element.style.setProperty('--ry', `${next.ry}deg`);
      element.style.setProperty('--px', `${next.px}%`);
      element.style.setProperty('--py', `${next.py}%`);
    };

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      next = {
        rx: (0.5 - y) * max * 2,
        ry: (x - 0.5) * max * 2,
        px: x * 100,
        py: y * 100,
      };
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onEnter = () => element.classList.add('is-tilting');

    const onLeave = () => {
      element.classList.remove('is-tilting');
      next = null;
      element.style.setProperty('--rx', '0deg');
      element.style.setProperty('--ry', '0deg');
      element.style.setProperty('--px', '50%');
      element.style.setProperty('--py', '50%');
    };

    element.addEventListener('pointerenter', onEnter);
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [max, reduced]);

  return (
    <Tag ref={ref} className={cn('tilt', className)} {...rest}>
      {glow && <span className="tilt__glow" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
