import { useId } from 'react';

export default function Logo({ className, withName = true }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gradient = `ryv-gradient-${id}`;
  const glow = `ryv-glow-${id}`;

  return (
    <>
      <svg
        className={className ?? 'brand__mark'}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradient} x1="8" y1="6" x2="58" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#36d9ff" />
            <stop offset="0.5" stopColor="#246bfd" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#246bfd" stopOpacity="0.55" />
            <stop offset="1" stopColor="#246bfd" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#07090d" />
        <circle cx="32" cy="32" r="26" fill={`url(#${glow})`} />
        <path
          d="M20 46V18h11.4c6.2 0 10.2 3.5 10.2 9 0 4.2-2.4 7.3-6.3 8.5L43 46h-7.3l-6.6-9.3h-2.6V46H20Zm6.5-15.1h4.4c2.4 0 3.9-1.2 3.9-3.3 0-2.1-1.5-3.3-3.9-3.3h-4.4v6.6Z"
          fill={`url(#${gradient})`}
        />
        <path d="M44.5 18 51 30.5" stroke="#36d9ff" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      </svg>
      {withName && (
        <span className="brand__name">
          RYVEX<span>ORA</span>
        </span>
      )}
    </>
  );
}
