import { useId } from 'react';

/**
 * Decorative, dependency-free visuals for each service. They use CSS animation
 * (slow, subtle) rather than WebGL so six cards can live on one page without
 * costing a frame budget.
 */
export default function ServiceVisual({ variant = 'web', accent }) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (suffix) => `${rawId}-${suffix}`;

  const wrap = (children) => (
    <div className="viz" style={accent ? { color: accent } : undefined} aria-hidden="true">
      <svg viewBox="0 0 320 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </div>
  );

  if (variant === 'ai') {
    const layers = [
      { x: 74, ys: [62, 96, 130] },
      { x: 160, ys: [42, 76, 110, 144] },
      { x: 246, ys: [62, 96, 130] },
    ];
    return wrap(
      <>
        <defs>
          <radialGradient id={id('core')} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="0.45" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="93" r="78" fill={`url(#${id('core')})`} opacity="0.5" />
        {[0, 1].map((l) =>
          layers[l].ys.map((y1, i) =>
            layers[l + 1].ys.map((y2, j) => {
              const dim = (i + j) % 3 === 0;
              return (
                <line
                  key={`${l}-${i}-${j}`}
                  x1={layers[l].x}
                  y1={y1}
                  x2={layers[l + 1].x}
                  y2={y2}
                  stroke="currentColor"
                  strokeOpacity={dim ? 0.42 : 0.14}
                  strokeWidth={dim ? 1 : 0.7}
                  className={dim ? 'viz__dash viz__dash--slow' : undefined}
                />
              );
            }),
          ),
        )}
        {layers.map((layer, li) =>
          layer.ys.map((y, ni) => (
            <g key={`${li}-${ni}`}>
              <circle
                cx={layer.x}
                cy={y}
                r={li === 1 ? 9 : 7}
                fill="#0C141F"
                stroke="currentColor"
                strokeOpacity={0.55}
              />
              <circle
                cx={layer.x}
                cy={y}
                r={3}
                fill="currentColor"
                className="viz__pulse"
                style={{ animationDelay: `${(li * 0.4 + ni * 0.22).toFixed(2)}s` }}
              />
            </g>
          )),
        )}
        <circle cx="160" cy="93" r="24" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 5" />
        <circle cx="160" cy="93" r="15" stroke="currentColor" strokeOpacity="0.55" />
        <circle cx="160" cy="93" r="6" fill="currentColor" />
      </>,
    );
  }

  if (variant === 'seo') {
    return wrap(
      <>
        <defs>
          <linearGradient id={id('bar')} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <g className="viz__float viz__float--slow">
          <circle cx="92" cy="96" r="28" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx="92" cy="96" r="48" stroke="currentColor" strokeOpacity="0.22" strokeDasharray="4 6" />
          <circle cx="92" cy="96" r="68" stroke="currentColor" strokeOpacity="0.12" />
          <circle cx="92" cy="96" r="5" fill="currentColor" />
          <circle cx="92" cy="48" r="3" fill="currentColor" className="viz__pulse" />
          <circle cx="140" cy="96" r="3" fill="currentColor" className="viz__pulse viz__pulse--delay" />
          <path
            d="M92 96 128 60"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
        </g>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const heights = [34, 52, 44, 72, 60, 96];
          const height = heights[i];
          return (
            <rect
              key={i}
              x={180 + i * 20}
              y={148 - height}
              width="11"
              height={height}
              rx="3"
              fill={`url(#${id('bar')})`}
            />
          );
        })}
        <path
          d="M184 108 208 90 228 96 248 66 268 74 288 40"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path className="viz__dash" d="M164 160h124" stroke="currentColor" strokeOpacity="0.2" />
      </>,
    );
  }

  if (variant === 'email') {
    return wrap(
      <>
        <defs>
          <linearGradient id={id('env')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <g className="viz__float">
          <rect x="30" y="58" width="108" height="70" rx="9" fill={`url(#${id('env')})`} stroke="currentColor" strokeOpacity="0.5" />
          <path d="M32 63l52 40 52-40" stroke="currentColor" strokeOpacity="0.6" strokeLinejoin="round" />
          <path d="M32 124l40-32M136 124l-40-32" stroke="currentColor" strokeOpacity="0.2" />
          <circle cx="132" cy="62" r="7" fill="#0A1119" stroke="currentColor" strokeOpacity="0.6" />
          <circle cx="132" cy="62" r="2.6" fill="currentColor" />
        </g>
        <path
          className="viz__dash viz__dash--slow"
          d="M144 93h28"
          stroke="currentColor"
          strokeOpacity="0.45"
        />
        {[0, 1, 2].map((i) => (
          <g key={i} className={i === 1 ? 'viz__float viz__float--delay' : undefined}>
            <rect
              x="178"
              y={44 + i * 40}
              width="112"
              height="30"
              rx="7"
              fill="#0B1119"
              stroke="currentColor"
              strokeOpacity={i === 2 ? 0.5 : 0.2}
            />
            <circle cx="195" cy={59 + i * 40} r="5.5" stroke="currentColor" strokeOpacity="0.6" />
            {i === 2 ? (
              <path d="m192.6 59-1.8 2 3.4 3.4 5.4-5.6" transform={`translate(0 ${i * 40})`} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <circle cx="195" cy={59 + i * 40} r="2" fill="currentColor" />
            )}
            <rect x="208" y={54 + i * 40} width="60" height="4" rx="2" fill="currentColor" fillOpacity="0.28" />
            <rect x="208" y={62 + i * 40} width="40" height="4" rx="2" fill="#A2ADBF" fillOpacity="0.18" />
          </g>
        ))}
      </>,
    );
  }

  if (variant === 'saas') {
    return wrap(
      <>
        <defs>
          <linearGradient id={id('panel')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <g className="viz__float viz__float--slow" opacity="0.55">
          <rect x="130" y="26" width="118" height="84" rx="8" fill="#0B1119" stroke="currentColor" strokeOpacity="0.25" />
          <rect x="142" y="38" width="42" height="5" rx="2.5" fill="currentColor" fillOpacity="0.4" />
          <rect x="142" y="52" width="94" height="46" rx="5" fill="currentColor" fillOpacity="0.06" />
        </g>
        <g className="viz__float viz__float--delay" opacity="0.75">
          <rect x="96" y="44" width="124" height="88" rx="8" fill="#0B1119" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="108" y="56" width="34" height="4" rx="2" fill="currentColor" fillOpacity="0.45" />
          <rect x="108" y="68" width="100" height="52" rx="5" fill={`url(#${id('panel')})`} />
        </g>
        <g className="viz__float">
          <rect x="52" y="66" width="152" height="100" rx="9" fill="#0A111A" stroke="currentColor" strokeOpacity="0.55" />
          <path d="M52 86h152" stroke="currentColor" strokeOpacity="0.25" />
          <circle cx="64" cy="76" r="2.2" fill="currentColor" fillOpacity="0.6" />
          <circle cx="72" cy="76" r="2.2" fill="currentColor" fillOpacity="0.3" />
          <rect x="64" y="96" width="32" height="58" rx="4" fill="currentColor" fillOpacity="0.06" />
          <rect x="104" y="96" width="88" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
          <rect x="104" y="128" width="42" height="26" rx="4" fill="currentColor" fillOpacity="0.06" />
          <rect x="150" y="128" width="42" height="26" rx="4" fill="currentColor" fillOpacity="0.16" />
        </g>
        <circle cx="250" cy="132" r="3" fill="currentColor" className="viz__pulse" />
        <path className="viz__dash" d="M250 132v26" stroke="currentColor" strokeOpacity="0.35" />
      </>,
    );
  }

  if (variant === 'automation') {
    const nodes = [
      { x: 52, y: 118, done: true },
      { x: 108, y: 70, done: true },
      { x: 164, y: 112, done: false },
      { x: 220, y: 62, done: true },
      { x: 274, y: 106, done: false },
    ];
    return wrap(
      <>
        <path
          d="M52 118c20 0 24-48 56-48s26 42 56 42 26-50 56-50 26 44 54 44"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="4 6"
          className="viz__dash"
        />
        {nodes.map((node, i) => (
          <g key={i} className={i % 2 === 0 ? 'viz__float' : 'viz__float viz__float--delay'}>
            <rect
              x={node.x - 20}
              y={node.y - 20}
              width="40"
              height="40"
              rx="12"
              fill="#0B121B"
              stroke="currentColor"
              strokeOpacity={node.done ? 0.7 : 0.3}
            />
            {node.done ? (
              <path
                d={`M${node.x - 6} ${node.y + 1} l4 4 9-10`}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <circle cx={node.x} cy={node.y} r="4.5" stroke="currentColor" strokeOpacity="0.6" />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r="26"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="2 4"
            />
          </g>
        ))}
        <g opacity="0.5">
          <rect x="216" y="140" width="96" height="24" rx="6" fill="currentColor" fillOpacity="0.06" />
          <rect x="226" y="149" width="46" height="4" rx="2" fill="currentColor" fillOpacity="0.35" />
          <circle cx="298" cy="152" r="3" fill="currentColor" />
        </g>
      </>,
    );
  }

  // default: web
  return wrap(
    <>
      <defs>
        <linearGradient id={id('frame')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <g className="viz__float viz__float--slow" opacity="0.6">
        <rect x="150" y="24" width="128" height="92" rx="9" fill={`url(#${id('frame')})`} stroke="currentColor" strokeOpacity="0.26" />
        <rect x="150" y="24" width="128" height="18" rx="9" fill="currentColor" fillOpacity="0.05" />
        <circle cx="161" cy="33" r="2" fill="currentColor" fillOpacity="0.5" />
        <rect x="162" y="54" width="66" height="7" rx="3.5" fill="currentColor" fillOpacity="0.35" />
        <rect x="162" y="68" width="96" height="3.5" rx="1.75" fill="#A2ADBF" fillOpacity="0.25" />
        <rect x="162" y="77" width="78" height="3.5" rx="1.75" fill="#A2ADBF" fillOpacity="0.18" />
        <rect x="162" y="90" width="82" height="16" rx="4" fill="currentColor" fillOpacity="0.05" />
      </g>
      <g className="viz__float">
        <rect x="38" y="52" width="160" height="110" rx="10" fill="#080e16" stroke="currentColor" strokeOpacity="0.5" />
        <path d="M38 74h160" stroke="currentColor" strokeOpacity="0.2" />
        <circle cx="50" cy="63" r="2.2" fill="currentColor" fillOpacity="0.65" />
        <circle cx="58" cy="63" r="2.2" fill="currentColor" fillOpacity="0.35" />
        <circle cx="66" cy="63" r="2.2" fill="currentColor" fillOpacity="0.2" />
        <rect x="84" y="59" width="66" height="8" rx="4" fill="currentColor" fillOpacity="0.07" />
        <rect x="52" y="88" width="66" height="9" rx="4.5" fill="currentColor" fillOpacity="0.85" />
        <rect x="52" y="106" width="110" height="4" rx="2" fill="#A2ADBF" fillOpacity="0.32" />
        <rect x="52" y="115" width="90" height="4" rx="2" fill="#A2ADBF" fillOpacity="0.22" />
        <rect x="52" y="131" width="52" height="17" rx="8.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeOpacity="0.5" />
        <rect x="112" y="131" width="38" height="17" rx="8.5" fill="#F4F7FF" fillOpacity="0.04" />
      </g>
      <path className="viz__dash" d="M116 42h56" stroke="currentColor" strokeOpacity="0.4" />
      <circle cx="178" cy="42" r="2.4" fill="currentColor" />
    </>,
  );
}
