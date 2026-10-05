import { createContext, useContext, useEffect, useState } from 'react'
import { KEYS, useLocalStorage } from './storage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Keranjang tersimpan di LocalStorage, tetap ada setelah refresh
  const [cart, setCart] = useLocalStorage(KEYS.cart, [])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = (product, qty = 1) => {
    setCart((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, i.stock) } : i))
        : [...prev, { ...product, qty: Math.min(qty, product.stock) }]
    )
    setToast({ id: Date.now(), text: `${product.name} masuk keranjang` })
  }

  const updateQty = (id, qty) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.min(Math.max(1, qty || 1), i.stock) } : i)))
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setCart([])

  const totalQty = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{ cart, toast, addToCart, updateQty, removeFromCart, clearCart, totalQty, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
