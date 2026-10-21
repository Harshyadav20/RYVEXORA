import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '../lib/gsap.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { cn } from '../lib/utils.js';

const WORDS = [
  { text: 'IDEAS.', outline: false },
  { text: 'ENGINEERING.', outline: true },
  { text: 'INTELLIGENCE.', outline: false },
  { text: 'GROWTH.', outline: true },
];

export default function WordSequence() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const words = useMemo(() => WORDS, []);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const section = sectionRef.current;
    const elements = wordRefs.current.filter(Boolean);
    if (!section || elements.length !== words.length) return undefined;

    const context = gsap.context(() => {
      gsap.set(elements, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: (self) => {
            const next = Math.min(words.length - 1, Math.floor(self.progress * words.length));
            setActive(next);
          },
        },
      });

      elements.forEach((element, index) => {
        const at = index * 1;
        timeline.fromTo(
          element,
          { autoAlpha: 0, y: 80, scale: 0.94, filter: 'blur(14px)' },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
          },
          at,
        );

        if (index < elements.length - 1) {
          timeline.to(
            element,
            {
              autoAlpha: 0,
              y: -70,
              scale: 1.05,
              filter: 'blur(10px)',
              duration: 0.32,
              ease: 'power2.in',
            },
            at + 0.6,
          );
        }
      });

      timeline.to({}, { duration: 0.7 });
    }, section);

    return () => context.revert();
  }, [reduced, words.length]);

  return (
    <section
      className={cn('words', reduced && 'words--static')}
      ref={sectionRef}
      aria-labelledby="words-heading"
    >
      <h2 id="words-heading" className="sr-only">
        Ideas become engineering, engineering becomes intelligence, intelligence becomes growth.
      </h2>

      <div className="words__sticky">
        <div className="words__bg" aria-hidden="true" />
        <span className="words__label">The RYVEXORA loop</span>

        <div className="words__stack">
          {words.map((word, index) => (
            <div
              key={word.text}
              ref={(element) => {
                wordRefs.current[index] = element;
              }}
              className={cn('words__word', word.outline && 'words__word--outline')}
              aria-hidden="true"
            >
              {word.text}
            </div>
          ))}
        </div>

        <div className="words__meta">
          <span className="words__count">
            <b>{String((reduced ? words.length : active + 1)).padStart(2, '0')}</b> / 04
          </span>
          <p className="words__note">
            Ideas become engineering. Engineering becomes intelligence. Intelligence compounds into
            growth.
          </p>
        </div>
      </div>
    </section>
  );
}
