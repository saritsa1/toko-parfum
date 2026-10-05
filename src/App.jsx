import { Routes, Route, Link, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/frontpages/Dashboard'
import ProductDetail from './pages/frontpages/ProductDetail'
import Cart from './pages/frontpages/Cart'
import Checkout from './pages/frontpages/Checkout'
import AdminDashboard from './pages/adminpages/AdminDashboard'
import AboutPage from './pages/adminpages/AboutPage'
import OrderDetail from './pages/frontpages/OrderDetail'

function NotFound() {
  return <p>Halaman tidak ditemukan. <Link to="/" className="underline">Kembali ke beranda</Link></p>
}

export default function App() {
  return (
    <Routes>
      {/* Halaman toko memakai MainLayout (Outlet) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="order/:id" element={<OrderDetail />} />
      </Route>
      {/* Halaman admin memakai AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
