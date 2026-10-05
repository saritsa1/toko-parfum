import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, Info, RotateCcw, ShoppingBag, Zap } from 'lucide-react'
import { useCart } from '../utils/CartContext'
import { ratingInfo } from '../utils/storage'
import Stars from './Stars'
import { rupiah } from '../utils/data'
import ProductImage from './ProductImage'

// Kartu dua sisi: depan = gambar produk, belakang = keterangan dan aksi.
// Kartu hanya terbalik saat diklik (atau Enter/Space via keyboard).
export default function ProductCard({ p }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const rating = ratingInfo(p)
  const [flipped, setFlipped] = useState(false)
  const buyNow = () => {
    addToCart(p)
    navigate('/checkout')
  }

  return (
    <article className="perspective-[1000px]">
      <div className={`relative aspect-[3/4.3] transform-3d transition-transform duration-700 ease-[cubic-bezier(.4,.2,.2,1)] ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Sisi depan */}
        <button
          type="button"
          inert={flipped}
          onClick={() => setFlipped(true)}
          aria-label={`Lihat info ${p.name}`}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-line bg-white text-left shadow-sm backface-hidden"
        >
          <div className="min-h-0 flex-1"><ProductImage p={p} /></div>
          <div className="p-4">
            <div className="flex items-center justify-between text-xs text-mute">
              <span>{p.category_name}</span>
              <span className="flex items-center gap-1"><Stars value={rating.avg} size={12} />{rating.avg.toFixed(1)}</span>
            </div>
            {/* text-xl: judul terpanjang tetap satu baris, jadi tinggi gambar tidak berubah-ubah */}
            <h3 className="font-serif text-xl leading-tight">{p.name}</h3>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-medium">{rupiah(p.price)}</span>
              <Info size={18} className="text-mute" aria-hidden="true" />
            </div>
          </div>
        </button>

        {/* Sisi belakang */}
        <div inert={!flipped} className="absolute inset-0 flex rotate-y-180 flex-col rounded-xl border border-line bg-white p-5 shadow-sm backface-hidden">
          <div className="flex items-start justify-between">
            <span className="rounded-full bg-soft px-3 py-0.5 text-xs">{p.category_name}</span>
            <button type="button" onClick={() => setFlipped(false)} aria-label="Balik kartu" className="text-mute hover:text-ink">
              <RotateCcw size={18} />
            </button>
          </div>
          <h3 className="mt-3 font-serif text-2xl leading-tight">{p.name}</h3>
          <p className="mt-1 text-sm text-mute">{p.notes}</p>
          <p className="mt-3 line-clamp-4 text-sm">{p.desc}</p>
          <p className="mt-auto pb-3 pt-2 text-sm text-mute">50 ml, stok {p.stock}</p>
          <div className="grid gap-2">
            <button type="button" onClick={buyNow} className="btn btn-solid py-2 text-sm"><Zap size={16} />Beli sekarang</button>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => addToCart(p)} className="btn btn-ghost px-3 py-2 text-sm"><ShoppingBag size={16} />Keranjang</button>
              <Link to={`/product/${p.slug}`} state={p} className="btn btn-ghost px-3 py-2 text-sm"><Eye size={16} />Detail</Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}