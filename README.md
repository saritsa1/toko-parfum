# Sutra Parfum

Prototipe toko parfum online sederhana. Dibuat sebagai tugas Web Programming
(Universitas Pendidikan Ganesha) dengan React dan Tailwind CSS.

**Demo:** (tempel link Vercel di sini)

## Fitur
- Dashboard produk dengan pencarian dan filter kategori
- Detail produk dengan rating dan ulasan
- Keranjang belanja (tambah, ubah jumlah, hapus)
- Checkout dengan validasi form dan pilihan pengiriman/pembayaran
- Halaman pesanan setelah checkout
- Halaman admin yang membaca pesanan dan ulasan dari toko

## Tech Stack
- React 19
- Vite 7
- Tailwind CSS 4
- React Router 7
- lucide-react (ikon)

## Konsep React yang diterapkan
| Konsep | Contoh |
|---|---|
| Component | ProductCard, Navbar, Stars, MainLayout, AdminLayout |
| Passing props | `<ProductCard p={item} />`, `<Stars value={...} />` |
| Conditional rendering | Keranjang kosong, badge jumlah, sidebar admin |
| useState | Form ulasan, form checkout, kartu terbalik, sidebar |
| useContext | CartContext (keranjang dipakai Navbar, Cart, Checkout) |

## Struktur folder
src/
├─ main.jsx, App.jsx, index.css
├─ layouts/        MainLayout, AdminLayout
├─ components/     Navbar, Sidebar, ProductCard, Stars, ...
├─ pages/
│  ├─ frontpages/  Dashboard, ProductDetail, Cart, Checkout, OrderDetail
│  └─ adminpages/  AdminDashboard, AboutPage
└─ utils/          data.js, CartContext.jsx, storage.js

## Menjalankan di komputer
Butuh Node.js 20.19 atau lebih baru.

    npm install
    npm run dev

Build untuk produksi: `npm run build`