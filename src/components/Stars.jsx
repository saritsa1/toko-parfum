import { Star } from 'lucide-react'

export default function Stars({ value, size = 14 }) {
  return (
    <span className="inline-flex text-acc" role="img" aria-label={`Rating ${value.toFixed(1)} dari 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= Math.round(value) ? 'fill-current' : 'text-line'} />
      ))}
    </span>
  )
}
