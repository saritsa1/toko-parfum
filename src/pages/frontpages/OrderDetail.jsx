import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CircleCheck, Copy } from 'lucide-react'
import PriceSummary from '../../components/PriceSummary'
import { KEYS, useLocalStorage } from '../../utils/storage'
import { rupiah } from '../../utils/data'

export default function OrderDetail() {
  const { id } = useParams()
  const [orders, setOrders] = useLocalStorage(KEYS.orders, [])
  const [copied, setCopied] = useState(false)
  const o = orders.find((x) => x.id === +id)

  if (!o) return <p>Pesanan tidak ditemukan. <Link to="/" className="underline">Kembali ke koleksi</Link></p>

  const copy = async () => {
    await navigator.clipboard.writeText(String(o.va))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  // Simulasi: di aplikasi asli status berubah dari notifikasi payment gateway
  const bayar = () => setOrders(orders.map((x) => (x.id === o.id ? { ...x, status: 'Dibayar' } : x)))
  const menunggu = o.status === 'Menunggu Pembayaran'

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <CircleCheck size={44} className="mx-auto mb-2 text-acc" />
        <h1 className="font-serif text-4xl">Pesanan berhasil dibuat</h1>
        <p className="text-mute">Nomor pesanan <strong className="font-medium text-ink">{o.no}</strong>, {o.tanggal}</p>
        <span className="mt-2 inline-block rounded-full bg-soft px-4 py-1 text-sm">{o.status}</span>
      </div>

      {/* Instruksi pembayaran sesuai jenis metode */}
      <section className="mb-6 rounded-xl border border-line bg-white p-5">
        <h2 className="mb-2 font-serif text-2xl">Pembayaran</h2>
        <p className="text-sm text-mute">{o.bayar}</p>
        {o.tipe === 'va' && (
          <div className="mt-3">
            <p className="text-sm">Nomor Virtual Account</p>
            <p className="flex items-center gap-3 font-mono text-2xl tracking-wider">
              {o.va}
              <button type="button" onClick={copy} className="btn btn-ghost px-3 py-1 text-sm"><Copy size={14} />{copied ? 'Tersalin' : 'Salin'}</button>
            </p>
          </div>
        )}
        {o.tipe === 'ewallet' && <p className="mt-3">Buka aplikasi {o.bayar} Anda, lalu selesaikan pembayaran sebesar {rupiah(o.total)}.</p>}
        {o.tipe === 'cod' && <p className="mt-3">Siapkan uang pas {rupiah(o.total)} saat paket tiba.</p>}
        {menunggu && (
          <>
            <p className="mt-3 text-sm text-mute">Bayar sebelum {o.batas}</p>
            <button type="button" onClick={bayar} className="btn btn-solid mt-4">Simulasikan pembayaran</button>
          </>
        )}
      </section>

      <section className="mb-6 rounded-xl border border-line bg-white p-5">
        <h2 className="mb-2 font-serif text-2xl">Info pengiriman</h2>
        <p>{o.nama}, {o.telepon}</p>
        <p className="text-mute">{o.alamat}</p>
        <p className="mt-2 text-sm">Kurir: {o.kurir}</p>
      </section>

      <section className="mb-6 rounded-xl border border-line bg-white p-5">
        <h2 className="mb-3 font-serif text-2xl">Rincian belanja</h2>
        <ul className="mb-4 space-y-3 border-b border-line pb-4">
          {o.items.map((i) => (
            <li key={i.id} className="flex items-center gap-3 text-sm">
              {i.img && <img src={i.img} alt="" className="h-12 w-12 rounded bg-soft object-contain" />}
              <span className="flex-1">{i.name}<br /><span className="text-mute">{i.qty} x {rupiah(i.price)}</span></span>
              <span>{rupiah(i.qty * i.price)}</span>
            </li>
          ))}
        </ul>
        <PriceSummary subtotal={o.subtotal} ongkir={o.ongkir} layanan={o.layanan} biayaMetode={o.biayaMetode} total={o.total} />
      </section>

      <div className="text-center"><Link to="/" className="btn btn-ghost">Lanjut belanja</Link></div>
    </div>
  )
}