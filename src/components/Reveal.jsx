import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { cn } from '../lib/utils.js';

/**
 * Scroll-triggered entrance. Animates a wrapper rather than individual text
 * nodes so layout stays stable and reduced-motion users get static content.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 26,
  duration = 0.9,
  start = 'top 87%',
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const element = ref.current;
    if (!element) return undefined;

    const context = gsap.context(() => {
      gsap.from(element, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          once,
        },
      });
    });

    return () => context.revert();
  }, [reduced, delay, y, duration, start, once]);

  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
