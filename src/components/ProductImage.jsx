import { useState } from 'react'
import Bottle from './Bottle'

// Menampilkan foto produk; jika foto tidak ada/gagal dimuat, pakai ilustrasi botol
export default function ProductImage({ p }) {
  const [failed, setFailed] = useState(false)
  if (!p.img || failed) return <Bottle color={p.color} shape={p.id} />
  return (
    <img
      src={p.img}
      alt={p.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="block h-full w-full bg-soft object-contain p-3"
    />
  )
}
