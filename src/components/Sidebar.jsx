import { Link, NavLink } from 'react-router-dom'
import { Info, LayoutDashboard, Sparkles, Store } from 'lucide-react'

// Props: sidebarOpen (boolean) dan setSidebarOpen dikirim dari AdminLayout
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const cls = ({ isActive }) =>
    `flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${isActive ? 'bg-soft text-ink' : 'text-mute hover:bg-soft'}`
  return (
    <aside className={`${sidebarOpen ? 'block' : 'hidden'} w-64 shrink-0 border-r border-line bg-white max-md:absolute max-md:inset-y-0 max-md:z-10 max-md:shadow-lg md:block`}>
      <div className="flex items-center gap-2 p-5 font-serif text-2xl">
        <Sparkles size={20} className="text-acc" aria-hidden="true" />Sutra Admin
      </div>
      <nav aria-label="Menu admin" className="flex flex-col gap-1 px-3">
        <NavLink to="/admin/dashboard" className={cls} onClick={() => setSidebarOpen(false)}><LayoutDashboard size={17} />Dashboard</NavLink>
        <NavLink to="/admin/about" className={cls} onClick={() => setSidebarOpen(false)}><Info size={17} />About</NavLink>
        <Link to="/" className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-mute hover:bg-soft"><Store size={17} />Lihat toko</Link>
      </nav>
    </aside>
  )
}
