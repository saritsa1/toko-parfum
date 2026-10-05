import { useEffect, useState } from 'react'

// Kunci LocalStorage yang dipakai aplikasi
export const KEYS = { cart: 'sutra-cart', reviews: 'sutra-reviews', orders: 'sutra-orders' }

// Baca sekali dari LocalStorage (aman jika kosong/rusak)
export function readStorage(key, initial) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? initial : JSON.parse(raw)
  } catch {
    return initial
  }
}

// Custom hook: state React yang otomatis tersinkron dengan LocalStorage
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => readStorage(key, initial))
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* penyimpanan penuh atau diblokir: abaikan */
    }
  }, [key, value])
  return [value, setValue]
}

// Rata-rata rating: dari ulasan pengguna jika ada, jika tidak pakai rating awal produk
export function ratingInfo(p) {
  const list = readStorage(KEYS.reviews, {})[p.id] ?? []
  if (!list.length) return { avg: p.rating, count: 0 }
  return { avg: list.reduce((s, r) => s + r.rating, 0) / list.length, count: list.length }
}
