import { useLayoutEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { gsap } from '../lib/gsap.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import { processSteps } from '../data/process.js';
import { cn } from '../lib/utils.js';

export default function ProcessRail({ steps = processSteps, className, showDuration = true }) {
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return undefined;

    const media = gsap.matchMedia();

    const build = (axis) => () => {
      const elements = Array.from(rail.querySelectorAll('.process-step'));

      const setActive = (progress) => {
        const count = Math.ceil(progress * elements.length);
        elements.forEach((element, index) => {
          element.classList.toggle('is-active', index < count);
        });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rail,
          start: 'top 82%',
          end: 'bottom 58%',
          scrub: 0.7,
          onUpdate: (self) => setActive(self.progress),
          onRefresh: (self) => setActive(self.progress),
        },
      });

      timeline.fromTo(fill, { [axis]: 0 }, { [axis]: 1, ease: 'none', duration: 1 });
    };

    media.add('(min-width: 901px)', build('scaleX'));
    media.add('(max-width: 900px)', build('scaleY'));

    return () => media.revert();
  }, [reduced]);

  return (
    <div className={cn('process-rail', className)} ref={railRef}>
      <div className="process-rail__track" aria-hidden="true">
        <div className="process-rail__fill" ref={fillRef} />
      </div>

      {steps.map((step) => (
        <div className="process-step" key={step.slug}>
          <div className="process-step__node">
            <Icon name={step.icon} size={17} strokeWidth={1.5} />
          </div>
          <span className="process-step__num">{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.summary}</p>
          {showDuration && <span className="process-step__duration">{step.duration}</span>}
        </div>
      ))}
    </div>
  );
}
