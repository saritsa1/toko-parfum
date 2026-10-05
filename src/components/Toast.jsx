import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useCart } from '../utils/CartContext'

export default function Toast() {
  const { toast } = useCart()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
      {toast && (
        <div key={toast.id} className="toast pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2.5 pl-4 pr-5 text-sm text-white shadow-lg">
          <Check size={17} className="text-[#c9a66b]" />
          <span>{toast.text}</span>
          <Link to="/cart" className="underline underline-offset-4">Lihat keranjang</Link>
        </div>
      )}
    </div>
  )
}
