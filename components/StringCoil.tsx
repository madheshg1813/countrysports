/** A coil of string drawn in the chosen colour; stands in until product photos are supplied. */
export default function StringCoil({ color }: { color: string }) {
  const rings = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-3/4 w-3/4 transition-transform duration-500 group-hover:rotate-12">
      <circle cx="100" cy="100" r="86" fill="#f1f5f9" />
      {rings.map((i) => (
        <g key={i}>
          <circle cx="100" cy={100 + (i - 3) * 1.2} r={78 - i * 3.5} fill="none" stroke="rgba(16,24,40,0.35)" strokeWidth="4.5" />
          <circle cx="100" cy={100 + (i - 3) * 1.2} r={78 - i * 3.5} fill="none" stroke={color} strokeWidth="3" />
        </g>
      ))}
      <circle cx="100" cy="100" r="50" fill="#fff" stroke="#e4e9f0" strokeWidth="2" />
      <path d="M 150 40 C 175 20, 190 35, 185 55" fill="none" stroke="rgba(16,24,40,0.35)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 150 40 C 175 20, 190 35, 185 55" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
