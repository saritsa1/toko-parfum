import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'

export default function MainLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const cat = params.get('cat') ?? 'Semua'

  // Kata kunci dan kategori disimpan di URL (?q=...&cat=...),
  // jadi halaman Dashboard tinggal membaca nilainya dari sana
  const update = (next) => {
    const merged = { q, cat, ...next }
    const sp = new URLSearchParams()
    if (merged.q) sp.set('q', merged.q)
    if (merged.cat !== 'Semua') sp.set('cat', merged.cat)
    const s = sp.toString()
    navigate(s ? `/?${s}` : '/', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navbar */}
      <Navbar />

      {/* Search & Filter */}
      <header className="border-b border-line bg-soft">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-4 md:flex-row">
          <div role="search" className="relative w-full md:w-1/3">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
            <input
              type="text"
              value={q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Cari nama, aroma, golongan"
              aria-label="Cari parfum"
              className="w-full rounded-lg border border-line bg-white py-2 pl-10 pr-9"
            />
            {q && (
              <button onClick={() => update({ q: '' })} aria-label="Hapus pencarian" className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main key={pathname} className="page mx-auto w-full max-w-5xl flex-1 px-5 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-6 text-center text-sm text-mute">
        &copy; 2025 Sutra Parfum | Version 1.0
      </footer>
      <Toast />
    </div>
  )
}