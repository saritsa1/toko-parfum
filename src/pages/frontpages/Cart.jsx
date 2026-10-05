import { Link } from 'react-router-dom'
import { ArrowRight, Trash2 } from 'lucide-react'
import ProductImage from '../../components/ProductImage'
import { useCart } from '../../utils/CartContext'
import { rupiah } from '../../utils/data'

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div>
        <h1 className="mb-3 font-serif text-4xl">Keranjang</h1>
        <p className="text-mute">Keranjang masih kosong. <Link to="/" className="underline">Pilih parfum</Link></p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-4xl">Keranjang</h1>
      <ul className="border-t border-line">
        {cart.map((i) => (
          <li key={i.id} className="flex flex-wrap items-center gap-4 border-b border-line py-4">
            <div className="w-16"><div className="aspect-square overflow-hidden rounded-md"><ProductImage p={i} /></div></div>
            <div className="flex-1">
              <p className="font-serif text-xl">{i.name}</p>
              <p className="text-mute">{rupiah(i.price)}</p>
            </div>
            <label className="text-sm">
              <span className="sr-only">Jumlah {i.name}</span>
              <input
                type="number"
                min="1"
                max={i.stock}
                value={i.qty}
                onChange={(e) => updateQty(i.id, parseInt(e.target.value))}
                className="w-16 border border-mute/50 bg-white p-1 text-center"
              />
            </label>
            <button onClick={() => removeFromCart(i.id)} aria-label={`Hapus ${i.name}`} className="p-2 text-mute hover:text-red-700"><Trash2 size={18} /></button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xl">Total: <strong className="font-medium">{rupiah(totalPrice)}</strong></p>
        <Link to="/checkout" className="btn btn-solid">Lanjut ke checkout<ArrowRight size={18} /></Link>
      </div>
    </div>
  )
}
