import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '../../utils/CartContext'
import { KEYS, useLocalStorage } from '../../utils/storage'
import { shippingOptions, paymentGroups, allMethods, SERVICE_FEE, makeVA, rupiah } from '../../utils/data'
import PriceSummary from '../../components/PriceSummary'

const field = 'w-full border border-mute/50 bg-white p-3'
// has-checked: styling berubah otomatis saat radio di dalam label terpilih
const choice = 'flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-white p-3 has-checked:border-acc has-checked:bg-soft'

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [orders, setOrders] = useLocalStorage(KEYS.orders, [])
  const [form, setForm] = useState({ nama: '', telepon: '', alamat: '' })
  const [shipId, setShipId] = useState('reguler')
  const [payId, setPayId] = useState('')
  const [errors, setErrors] = useState({})

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Nilai turunan: dihitung ulang setiap render, tidak perlu disimpan di state
  const ship = shippingOptions.find((s) => s.id === shipId)
  const method = allMethods.find((m) => m.id === payId)
  const biayaMetode = method?.fee ?? 0
  const total = totalPrice + ship.cost + SERVICE_FEE + biayaMetode

  // Semua hook harus berada di atas return ini
  if (cart.length === 0) {
    return <p>Keranjang kosong. <Link to="/" className="underline">Pilih parfum dulu</Link></p>
  }

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (form.nama.trim().length < 3) err.nama = 'Nama minimal 3 karakter.'
    if (!/^08\d{8,12}$/.test(form.telepon)) err.telepon = 'Nomor HP harus diawali 08 dan 10-14 digit.'
    if (form.alamat.trim().length < 10) err.alamat = 'Alamat minimal 10 karakter.'
    if (!method) err.bayar = 'Pilih metode pembayaran.'
    setErrors(err)
    if (Object.keys(err).length) return

    const sekarang = Date.now()
    const order = {
      id: sekarang,
      no: 'SP' + String(sekarang).slice(-8),
      tanggal: new Date(sekarang).toLocaleString('id-ID'),
      batas: new Date(sekarang + 24 * 60 * 60 * 1000).toLocaleString('id-ID'),
      nama: form.nama.trim(),
      telepon: form.telepon,
      alamat: form.alamat.trim(),
      kurir: `${ship.name} (${ship.est})`,
      bayar: method.name,          // nama metode, dipakai tabel admin
      tipe: method.type,           // va / ewallet / cod
      va: method.prefix ? makeVA(method.prefix) : null,
      items: cart.map(({ id, name, qty, price, img }) => ({ id, name, qty, price, img })),
      subtotal: totalPrice,
      ongkir: ship.cost,
      layanan: SERVICE_FEE,
      biayaMetode,
      total,
      status: method.type === 'cod' ? 'Diproses' : 'Menunggu Pembayaran',
    }
    setOrders([...orders, order])
    clearCart()
    // replace: tombol Back tidak kembali ke checkout yang sudah kosong
    navigate(`/order/${order.id}`, { replace: true })
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-[1fr_340px]">
      <div>
        {/* Tombol kembali: pengguna bisa membatalkan checkout tanpa kehilangan isi keranjang */}
        <Link to="/cart" className="mb-4 inline-flex items-center gap-1 text-mute hover:text-ink"><ArrowLeft size={16} />Kembali ke keranjang</Link>
        <h1 className="mb-6 font-serif text-4xl">Checkout</h1>

        <h2 className="mb-3 font-serif text-2xl">Alamat pengiriman</h2>
        <div className="mb-3">
          <label htmlFor="nama" className="mb-1 block font-medium">Nama penerima</label>
          <input id="nama" name="nama" value={form.nama} onChange={change} className={field} />
          <small className="block min-h-5 text-red-700">{errors.nama}</small>
        </div>
        <div className="mb-3">
          <label htmlFor="telepon" className="mb-1 block font-medium">Nomor HP</label>
          <input id="telepon" name="telepon" inputMode="numeric" value={form.telepon} onChange={change} className={field} />
          <small className="block min-h-5 text-red-700">{errors.telepon}</small>
        </div>
        <div className="mb-8">
          <label htmlFor="alamat" className="mb-1 block font-medium">Alamat lengkap</label>
          <textarea id="alamat" name="alamat" rows="3" value={form.alamat} onChange={change} className={field} />
          <small className="block min-h-5 text-red-700">{errors.alamat}</small>
        </div>

        <fieldset className="mb-8">
          <legend className="mb-3 font-serif text-2xl">Pengiriman</legend>
          <div className="grid gap-2">
            {shippingOptions.map((s) => (
              <label key={s.id} className={choice}>
                <input type="radio" name="kurir" checked={shipId === s.id} onChange={() => setShipId(s.id)} />
                <span className="flex-1">{s.name} <span className="text-sm text-mute">estimasi {s.est}</span></span>
                <span>{rupiah(s.cost)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-serif text-2xl">Metode pembayaran</legend>
          {paymentGroups.map((g) => (
            <div key={g.group} className="mb-4">
              <p className="mb-2 text-sm text-mute">{g.group}</p>
              <div className="grid gap-2">
                {g.methods.map((m) => (
                  <label key={m.id} className={choice}>
                    <input type="radio" name="bayar" value={m.id} checked={payId === m.id} onChange={() => setPayId(m.id)} />
                    <span className="flex-1">{m.name}</span>
                    {m.fee > 0 && <span className="text-sm text-mute">+{rupiah(m.fee)}</span>}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <small className="block min-h-5 text-red-700">{errors.bayar}</small>
        </fieldset>
      </div>

      {/* Ringkasan belanja */}
      <aside className="h-fit rounded-xl border border-line bg-white p-5 md:sticky md:top-24">
        <h2 className="mb-3 font-serif text-2xl">Rincian belanja</h2>
        <ul className="mb-4 space-y-3 border-b border-line pb-4">
          {cart.map((i) => (
            <li key={i.id} className="flex items-center gap-3 text-sm">
              {i.img && <img src={i.img} alt="" className="h-12 w-12 rounded bg-soft object-contain" />}
              <span className="flex-1">{i.name}<br /><span className="text-mute">{i.qty} x {rupiah(i.price)}</span></span>
              <span>{rupiah(i.qty * i.price)}</span>
            </li>
          ))}
        </ul>
        <PriceSummary subtotal={totalPrice} ongkir={ship.cost} layanan={SERVICE_FEE} biayaMetode={biayaMetode} total={total} />
        <button type="submit" className="btn btn-solid mt-5 w-full">Buat pesanan</button>
        {/* Tombol batal: kembali ke keranjang, isi keranjang tidak dihapus */}
        <Link to="/cart" className="btn btn-ghost mt-2 w-full">Batal</Link>
      </aside>
    </form>
  )
}