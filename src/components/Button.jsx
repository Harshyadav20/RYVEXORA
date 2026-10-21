import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { cn, isFinePointer } from '../lib/utils.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size,
  className,
  icon = 'arrow-up-right',
  showIcon = true,
  type = 'button',
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !isFinePointer()) return undefined;

    let frame = null;
    let target = { x: 0, y: 0 };

    const apply = () => {
      frame = null;
      element.style.setProperty('--mx', `${target.x}px`);
      element.style.setProperty('--my', `${target.y}px`);
    };

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;
      target = {
        x: (relX - 0.5) * 12,
        y: (relY - 0.5) * 8,
      };
      element.style.setProperty('--gx', `${relX * 100}%`);
      element.style.setProperty('--gy', `${relY * 100}%`);
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  const classes = cn('btn', `btn--${variant}`, size && `btn--${size}`, className);
  const content = (
    <span className="btn__label">
      {children}
      {showIcon && <Icon name={icon} size={16} strokeWidth={1.7} />}
    </span>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
