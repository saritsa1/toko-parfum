import { Link, NavLink } from 'react-router-dom'
import { CreditCard, LayoutDashboard, Settings, ShoppingBag, Sparkles } from 'lucide-react'
import { useCart } from '../utils/CartContext'

const link = ({ isActive }) =>
  `flex items-center gap-1.5 border-b py-1 transition-colors ${isActive ? 'border-ink text-ink' : 'border-transparent text-mute hover:text-ink'}`

{/* Export Komponen dengan nama Navbar */}
export default function Navbar() {
  const { totalQty } = useCart()

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Menu utama" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-3xl tracking-wide">
          <Sparkles size={22} className="text-acc" aria-hidden="true" />Sutra Parfum
        </Link>
        {/* Menu Navigasi */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm md:text-base">
          {/* Dashboard Links (halaman Dashboard dipasang sebagai index route di path "/") */}
          <NavLink to="/" end className={link}><LayoutDashboard size={17} />Dashboard</NavLink>
          <NavLink to="/cart" className={link}>
            <ShoppingBag size={17} />Keranjang
            {totalQty > 0 && (
              <span key={totalQty} className="bump rounded-full bg-acc px-2 text-xs text-white" aria-label={`${totalQty} item`}>{totalQty}</span>
            )}
          </NavLink>
          <NavLink to="/checkout" className={link}><CreditCard size={17} />Checkout</NavLink>
          {/* Menu Admin: membuka halaman admin yang memakai AdminLayout */}
          <NavLink to="/admin/dashboard" className={link}><Settings size={17} />Admin</NavLink>
        </div>
      </nav>
    </header>
  )
}