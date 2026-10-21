import { useId, useState } from 'react';
import { cn } from '../lib/utils.js';

export default function Accordion({ items = [], defaultOpen = 0, className }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <div className={cn('accordion', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `acc-${uid}-${index}-btn`;
        const panelId = `acc-${uid}-${index}-panel`;

        return (
          <div className={cn('acc', isOpen && 'is-open')} key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="acc__btn"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.q}</span>
                <span className="acc__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="acc__panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
            >
              <div className="acc__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
