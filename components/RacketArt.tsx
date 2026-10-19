/**
 * Line drawing of a strung badminton racket head, used as hero art until a
 * real stringing photo is supplied (see photos.hero in lib/business.ts).
 */
export default function RacketArt({ className = '' }: { className?: string }) {
  const mains = Array.from({ length: 11 }, (_, i) => 128 + i * 14.4);
  const crosses = Array.from({ length: 13 }, (_, i) => 74 + i * 15.5);

  return (
    <svg viewBox="0 0 400 520" fill="none" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="racket-bed">
          <ellipse cx="200" cy="170" rx="96" ry="118" />
        </clipPath>
        <radialGradient id="racket-glow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#8bcf16" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8bcf16" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="215" rx="185" ry="195" fill="url(#racket-glow)" />

      <g transform="rotate(-18 200 260)">
        <g clipPath="url(#racket-bed)" stroke="#8bcf16" strokeWidth="1.6" strokeOpacity="0.85">
          {mains.map((x) => <line key={`m${x}`} x1={x} y1="40" x2={x} y2="300" />)}
          {crosses.map((y) => <line key={`c${y}`} x1="90" y1={y} x2="310" y2={y} />)}
        </g>
        <ellipse cx="200" cy="170" rx="104" ry="126" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="9" />
        <ellipse cx="200" cy="170" rx="104" ry="126" stroke="#8bcf16" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="2 14" />
        <path d="M178 292 L200 336 L222 292" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="7" strokeLinejoin="round" />
        <rect x="194" y="334" width="12" height="118" rx="5" fill="#ffffff" fillOpacity="0.9" />
        <rect x="188" y="430" width="24" height="78" rx="9" fill="#0b3d67" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
        {[446, 462, 478, 494].map((y) => (
          <line key={y} x1="190" y1={y} x2="210" y2={y + 6} stroke="#8bcf16" strokeOpacity="0.6" strokeWidth="2" />
        ))}
      </g>
    </svg>
  );
}
