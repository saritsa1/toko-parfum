import { rupiah } from '../utils/data'

export default function PriceSummary({ subtotal, ongkir, layanan, biayaMetode = 0, total }) {
  const rows = [
    ['Subtotal produk', subtotal],
    ['Ongkos kirim', ongkir],
    ['Biaya layanan', layanan],
  ]
  if (biayaMetode > 0) rows.push(['Biaya metode bayar', biayaMetode])

  return (
    <dl className="text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between py-1">
          <dt className="text-mute">{k}</dt>
          <dd>{rupiah(v)}</dd>
        </div>
      ))}
      <div className="mt-2 flex justify-between border-t border-line pt-3 text-base font-medium">
        <dt>Total pembayaran</dt>
        <dd>{rupiah(total)}</dd>
      </div>
    </dl>
  )
}