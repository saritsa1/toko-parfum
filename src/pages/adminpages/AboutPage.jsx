const stack = ['React 19 dan React Router', 'Tailwind CSS v4', 'Vite', 'Context API dan useState', 'LocalStorage untuk menyimpan data']

export default function AboutPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-4 font-serif text-4xl">About</h1>
      <div className="rounded-xl border border-line bg-white p-6">
        <p className="mb-4">Sutra Parfum adalah prototipe toko parfum sederhana. Data produk berasal dari data dummy, sedangkan keranjang, pesanan, dan ulasan disimpan di browser.</p>
        <ul className="list-disc space-y-1 pl-5 text-mute">{stack.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </div>
  )
}
