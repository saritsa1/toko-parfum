import { Link, useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import ProductCard from '../../components/ProductCard'
import ProductImage from '../../components/ProductImage'
import { products, categories } from '../../utils/data'

export default function Dashboard() {
  // Kata kunci dan kategori dibaca dari URL (?q=...&cat=...)
  const [params, setParams] = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const cat = params.get('cat') ?? 'Semua'

  // Mengganti kategori = mengubah parameter cat di URL, tombol lain ikut ter-update
  const setCat = (c) => {
    const next = new URLSearchParams(params)
    if (c === 'Semua') next.delete('cat')
    else next.set('cat', c)
    setParams(next, { replace: true })
  }

  const list = products.filter(
    (p) =>
      (cat === 'Semua' || p.category_name === cat) &&
      `${p.name} ${p.notes} ${p.category_name}`.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div>
      {!q && (
        <section className="grid items-center gap-10 pb-14 pt-4 md:grid-cols-[1.3fr_.7fr]">
          <div>
            <h1 className="rise mb-4 font-serif text-5xl leading-tight md:text-6xl">
              Wangi yang tenang, bertahan sepanjang hari.
            </h1>
            <p className="rise max-w-[46ch] text-lg text-mute" style={{ animationDelay: '.15s' }}>
              Enam aroma pilihan dari bahan yang diracik perlahan. Tanpa ramai, hanya yang perlu.
            </p>
          </div>
        </section>
      )}

      <h2 className="mb-4 font-serif text-3xl">{q ? `Hasil untuk "${q}"` : 'Dashboard Produk'}</h2>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter golongan aroma">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1 text-sm transition-colors ${cat === c ? 'border-ink bg-ink text-white' : 'border-line text-mute hover:border-ink hover:text-ink'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="py-16 text-center text-mute">
          <SearchX size={40} className="mx-auto mb-3" aria-hidden="true" />
          <p>Tidak ada parfum yang cocok. Coba kata lain atau golongan lain.</p>
          <Link to="/" className="btn btn-ghost mt-5">Tampilkan semua</Link>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-6">
          {list.map((item) => (
            <ProductCard key={item.id} p={item} />
          ))}
        </div>
      )}
    </div>
  )
}