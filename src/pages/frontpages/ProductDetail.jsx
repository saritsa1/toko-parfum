import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Trash2, Zap } from 'lucide-react'
import ProductImage from '../../components/ProductImage'
import Stars from '../../components/Stars'
import { useCart } from '../../utils/CartContext'
import { KEYS, useLocalStorage } from '../../utils/storage'
import { products, rupiah } from '../../utils/data'

const field = 'w-full border border-mute/50 bg-white p-3'

export default function ProductDetail() {
  // Mengambil id (isinya slug) dari URL
  const { id } = useParams()
  // Mengambil state yang dikirim dari Link di ProductCard
  const location = useLocation()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  // Ulasan semua produk disimpan di LocalStorage: { [idProduk]: [ulasan] }
  const [allReviews, setAllReviews] = useLocalStorage(KEYS.reviews, {})
  const [rating, setRating] = useState(0)
  const [nama, setNama] = useState('')
  const [review, setReview] = useState('')
  const [error, setError] = useState('')

  // p = objek produk dari state Link. Kalau halaman dibuka langsung lewat URL
  // (refresh / link dibagikan), state kosong, jadi dicari dari data berdasarkan slug
  const p = location.state ?? products.find((x) => x.slug === id)
  if (!p) return <p>Produk tidak ditemukan. <Link to="/" className="underline">Kembali ke koleksi</Link></p>

  const reviews = allReviews[p.id] ?? []
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : p.rating

  const submit = (e) => {
    e.preventDefault()
    if (!rating || !review.trim()) return setError('Pilih rating bintang dan tulis ulasan Anda.')
    const r = { id: Date.now(), nama: nama.trim() || 'Pembeli', rating, review: review.trim(), tanggal: new Date().toLocaleDateString('id-ID') }
    setAllReviews({ ...allReviews, [p.id]: [r, ...reviews] })
    setRating(0); setNama(''); setReview(''); setError('')
  }
  const remove = (id) => setAllReviews({ ...allReviews, [p.id]: reviews.filter((r) => r.id !== id) })

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1 text-mute hover:text-ink"><ArrowLeft size={16} />Kembali ke koleksi</Link>
      <div className="mt-6 grid gap-12 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl border border-line shadow-sm"><ProductImage p={p} /></div>
        <div>
          <h1 className="font-serif text-5xl">{p.name}</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-mute">
            <Stars value={avg} size={16} />{avg.toFixed(1)} ({reviews.length} ulasan)
          </p>
          <p className="my-2 text-2xl">{rupiah(p.price)}</p>
          <p>{p.desc}</p>
          <dl className="my-6 border-t border-line">
            {[['Aroma', p.notes], ['Golongan', p.category_name], ['Ukuran', '50 ml'], ['Stok', p.stock]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-line py-2"><dt className="text-mute">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-line">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Kurangi jumlah" className="p-3 hover:text-acc"><Minus size={16} /></button>
              <span className="w-8 text-center" aria-live="polite">{qty}</span>
              <button onClick={() => setQty(Math.min(p.stock, qty + 1))} aria-label="Tambah jumlah" className="p-3 hover:text-acc"><Plus size={16} /></button>
            </div>
            <button onClick={() => addToCart(p, qty)} className="btn btn-ghost"><ShoppingBag size={18} />Tambah ke keranjang</button>
            <button onClick={() => { addToCart(p, qty); navigate('/checkout') }} className="btn btn-solid"><Zap size={18} />Beli sekarang</button>
          </div>
        </div>
      </div>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 font-serif text-3xl">Ulasan</h2>
          {reviews.length === 0 ? (
            <p className="text-mute">Belum ada ulasan. Jadilah yang pertama memberi rating.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-xl border border-line bg-white p-4">
                  <div className="flex items-center justify-between">
                    <Stars value={r.rating} />
                    <button onClick={() => remove(r.id)} aria-label="Hapus ulasan" className="text-mute hover:text-red-700"><Trash2 size={16} /></button>
                  </div>
                  <p className="text-sm text-mute">{r.nama}, {r.tanggal}</p>
                  <p className="mt-1">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={submit} noValidate>
          <h2 className="mb-4 font-serif text-3xl">Beri rating</h2>
          <div className="mb-4 flex gap-1" role="group" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} aria-label={`${s} bintang`} aria-pressed={s <= rating}
                className={`transition-transform hover:scale-110 ${s <= rating ? 'text-acc' : 'text-line'}`}>
                <Star size={30} className={s <= rating ? 'fill-current' : ''} />
              </button>
            ))}
          </div>
          <label htmlFor="nama" className="mb-1 block font-medium">Nama (opsional)</label>
          <input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className={`${field} mb-4`} />
          <label htmlFor="review" className="mb-1 block font-medium">Pengalaman Anda</label>
          <textarea id="review" rows="4" value={review} onChange={(e) => setReview(e.target.value)} className={`${field} mb-2`} />
          <small className="mb-2 block min-h-5 text-red-700" role="alert">{error}</small>
          <button type="submit" className="btn btn-solid">Kirim ulasan</button>
        </form>
      </section>
    </div>
  )
}