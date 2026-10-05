import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    // font-serif = Times New Roman untuk seluruh area admin, lining-nums = bentuk angka seragam
    <div className="relative flex h-screen bg-paper font-serif lining-nums">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar khusus mobile */}
        <div className="flex items-center justify-between border-b border-line bg-white p-4 md:hidden">
          <h1 className="font-serif text-xl">Sutra Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Buka menu" className="rounded border border-line p-2"><Menu size={18} /></button>
        </div>
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
        <footer className="border-t border-line bg-white p-4 text-center text-sm text-mute">&copy; 2025 Sutra Admin v1.0.0</footer>
      </div>
    </div>
  )
}