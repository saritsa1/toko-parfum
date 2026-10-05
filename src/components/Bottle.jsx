// Ilustrasi botol parfum (SVG). shape 0 = kotak, 1 = tinggi, 2 = bulat
const SHAPES = [
  { top: 92, body: <rect x="55" y="92" width="90" height="126" rx="10" />, hx: 63 },
  { top: 82, body: <rect x="68" y="82" width="64" height="136" rx="6" />, hx: 76 },
  { top: 93, body: <circle cx="100" cy="155" r="62" />, hx: 64 },
]

export default function Bottle({ color, shape = 0 }) {
  const s = SHAPES[shape % 3]
  const g = `g${color.slice(1)}${shape}`
  return (
    <svg viewBox="0 0 200 250" className="block h-full w-full" role="img" aria-label="Botol parfum">
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity=".72" />
        </linearGradient>
        <radialGradient id={`b${g}`} cx=".5" cy=".42" r=".7">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ebe8e2" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill={`url(#b${g})`} />
      <ellipse cx="100" cy="224" rx="56" ry="6" fill="#1f2326" opacity=".1" />
      <g fill={`url(#${g})`}>
        {s.body}
        <rect x="92" y={s.top - 8} width="16" height="10" />
      </g>
      <rect x="80" y={s.top - 48} width="40" height="34" rx="3" fill="#1f2326" />
      <rect x="84" y={s.top - 14} width="32" height="6" fill="#c9a66b" />
      <rect x="78" y="140" width="44" height="42" rx="2" fill="#fff" opacity=".6" />
      <rect x="86" y="152" width="28" height="2" fill="#1f2326" opacity=".5" />
      <rect x="90" y="160" width="20" height="2" fill="#1f2326" opacity=".3" />
      <rect x={s.hx} y={s.top + 16} width="7" height="70" rx="3.5" fill="#fff" opacity=".4" />
    </svg>
  )
}
