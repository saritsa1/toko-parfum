import { RotateCcw } from 'lucide-react'
import Stars from '../../components/Stars'
import { KEYS, readStorage, useLocalStorage } from '../../utils/storage'
import { products, rupiah } from '../../utils/data'

const STATUS = ['Menunggu Pembayaran', 'Dibayar', 'Diproses', 'Dikirim', 'Selesai']

// Halaman admin membaca data yang diinput pengguna di toko (pesanan dan ulasan)
export default function AdminDashboard() {
  const [orders, setOrders] = useLocalStorage(KEYS.orders, [])
  const reviews = Object.entries(readStorage(KEYS.reviews, {})).flatMap(([id, list]) =>
    list.map((r) => ({ ...r, produk: products.find((p) => p.id === +id)?.name }))
  )
  const stats = [
    ['Pesanan', orders.length],
    ['Pendapatan', rupiah(orders.reduce((s, o) => s + o.total, 0))],
    ['Ulasan', reviews.length],
    ['Produk', products.length],
  ]
  const setStatus = (id, status) => setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))
  const reset = () => {
    if (!confirm('Hapus semua data demo (keranjang, pesanan, ulasan)?')) return
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
    location.reload()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-4xl">Dashboard</h1>
        <button onClick={reset} className="btn btn-ghost px-4 py-2 text-sm"><RotateCcw size={15} />Reset data</button>
      </div>
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-white p-4">
            <p className="text-sm text-mute">{k}</p>
            <p className="font-serif text-3xl">{v}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 font-serif text-2xl">Pesanan masuk</h2>
      {orders.length === 0 ? (
        <p className="mb-10 text-mute">Belum ada pesanan. Pesanan dari halaman checkout akan muncul di sini.</p>
      ) : (
        <div className="mb-10 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-mute">
              <tr><th className="p-3">Tanggal</th><th className="p-3">Pembeli</th><th className="p-3">Item</th><th className="p-3">Total</th><th className="p-3">Status</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="p-3">{o.tanggal}</td>
                  <td className="p-3">{o.nama}<br /><span className="text-mute">{o.bayar}</span></td>
                  <td className="p-3">{o.items.map((i) => `${i.name} x${i.qty}`).join(', ')}</td>
                  <td className="p-3">{rupiah(o.total)}</td>
                  <td className="p-3">
                    <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} aria-label={`Status pesanan ${o.nama}`} className="rounded border border-line bg-white p-1">
                      {STATUS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mb-3 font-serif text-2xl">Ulasan pelanggan</h2>
      {reviews.length === 0 ? (
        <p className="text-mute">Belum ada ulasan.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-xl border border-line bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium">{r.produk}</span><Stars value={r.rating} />
              </div>
              <p className="text-sm text-mute">{r.nama}, {r.tanggal}</p>
              <p>{r.review}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
