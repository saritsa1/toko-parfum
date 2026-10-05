// Data dummy produk. Field: id, name, slug, price, stock, category, category_name, rating, img
// Foto disimpan di public/images dan dipanggil lewat path /images/...
export const products = [
  { id: 1, name: "Rose d'Amour", slug: 'rose-damour', price: 485000, stock: 12, category: 1, category_name: 'Floral', rating: 4.6, color: '#2f5a47', img: '/images/rose-damour.webp', notes: 'Mawar, peony, musk', desc: 'Mawar yang lembut dan romantis, hangat di kulit. Cocok untuk acara santai maupun formal.' },
  { id: 2, name: 'Osmanthus Crystal', slug: 'osmanthus-crystal', price: 530000, stock: 10, category: 1, category_name: 'Floral', rating: 4.5, color: '#e07b5a', img: '/images/osmanthus-crystal.webp', notes: 'Osmanthus, persik, musk bening', desc: 'Bunga osmanthus yang cerah dengan sentuhan buah. Ringan, manis, dan mudah disukai.' },
  { id: 3, name: 'Hinoki Sublime', slug: 'hinoki-sublime', price: 560000, stock: 8, category: 2, category_name: 'Woody', rating: 4.4, color: '#7a8a3a', img: '/images/hinoki-sublime.webp', notes: 'Hinoki, cedar, lumut', desc: 'Kayu hinoki yang tenang dan segar seperti hutan setelah hujan. Tahan hingga sore.' },
  { id: 4, name: 'Alexandra', slug: 'alexandra', price: 610000, stock: 6, category: 2, category_name: 'Woody', rating: 4.8, color: '#7f98b8', img: '/images/alexandra.webp', notes: 'Iris, cendana, amber lembut', desc: 'Aroma bertekstur halus dengan dasar kayu yang hangat. Elegan untuk malam hari.' },
  { id: 5, name: 'Chronic Tonic', slug: 'chronic-tonic', price: 420000, stock: 15, category: 3, category_name: 'Fresh', rating: 4.2, color: '#1f8a85', img: '/images/chronic-tonic.webp', notes: 'Jeruk, jahe, herbal', desc: 'Segar dan bersemangat, seperti tonik herbal dingin. Pilihan untuk dipakai sehari-hari.' },
  { id: 6, name: 'High Tide Low Tide', slug: 'high-tide-low-tide', price: 450000, stock: 9, category: 3, category_name: 'Fresh', rating: 4.3, color: '#6b4a36', img: '/images/high-tide-low-tide.webp', notes: 'Garam laut, driftwood, musk', desc: 'Aroma pantai saat air pasang surut, dengan akhir kayu apung yang bersih.' },
]

export const categories = ['Semua', 'Floral', 'Woody', 'Fresh']

export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

// ===== Pembayaran dan pengiriman =====
export const SERVICE_FEE = 1000

export const shippingOptions = [
  { id: 'reguler', name: 'Reguler', est: '3-5 hari', cost: 15000 },
  { id: 'express', name: 'Express', est: '1-2 hari', cost: 30000 },
]

// type menentukan instruksi yang tampil di halaman pesanan
export const paymentGroups = [
  { group: 'Transfer Bank (Virtual Account)', type: 'va', methods: [
    { id: 'bca', name: 'BCA Virtual Account', prefix: '39201', fee: 0 },
    { id: 'bni', name: 'BNI Virtual Account', prefix: '8808', fee: 0 },
    { id: 'mandiri', name: 'Mandiri Virtual Account', prefix: '88608', fee: 0 },
  ] },
  { group: 'E-Wallet', type: 'ewallet', methods: [
    { id: 'gopay', name: 'GoPay', fee: 0 },
    { id: 'ovo', name: 'OVO', fee: 0 },
    { id: 'shopeepay', name: 'ShopeePay', fee: 0 },
  ] },
  { group: 'Bayar di Tempat', type: 'cod', methods: [
    { id: 'cod', name: 'COD (Bayar di Tempat)', fee: 5000 },
  ] },
]

// Daftar datar semua metode, ditambah type dari grupnya
export const allMethods = paymentGroups.flatMap((g) => g.methods.map((m) => ({ ...m, type: g.type })))

// Nomor VA tiruan: prefix bank + 10 angka acak
export const makeVA = (prefix) => prefix + Math.floor(1e9 + Math.random() * 9e9)