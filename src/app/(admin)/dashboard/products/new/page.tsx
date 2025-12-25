'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' // Pastikan path ini sesuai dengan file lib Anda

// Definisikan tipe data agar tidak error TypeScript 'implicitly any'
interface Product {
  id: string;
  name: string;
  price: number;
  created_at: string;
}

export default function AdminProductDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Ambil data produk saat halaman dimuat
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    // Mengambil data dari tabel 'products' yang sudah kita buat di SQL Editor
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setProducts(data)
    setLoading(false)
  }

  // 2. Fungsi Hapus Produk (Berjalan karena Policy RLS yang kita 'Run' tadi)
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus produk ini?")
    if (confirmDelete) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id) // Menghapus berdasarkan ID unik

      if (error) {
        alert("Gagal menghapus: " + error.message)
      } else {
        // Update tampilan secara lokal agar produk langsung hilang dari daftar
        setProducts(products.filter(p => p.id !== id))
        alert("Produk berhasil dihapus!")
      }
    }
  }

  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-brand-dark italic">PRODUCT MANAGEMENT</h1>
        <a 
          href="/admin/dashboard/products/new" 
          className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          + TAMBAH PRODUK
        </a>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-3xl shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left bg-slate-50">
              <th className="p-6 text-slate-500 font-bold">NAMA PRODUK</th>
              <th className="p-6 text-slate-500 font-bold">HARGA</th>
              <th className="p-6 text-slate-500 font-bold text-right">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50 transition-colors">
                <td className="p-6 font-bold text-brand-dark">{item.name}</td>
                <td className="p-6 text-slate-600">
                  Rp {item.price ? Number(item.price).toLocaleString('id-ID') : '0'}
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 font-black tracking-widest text-xs"
                  >
                    HAPUS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <p className="text-center py-20 text-slate-400 animate-pulse">Memuat data katalog...</p>}
      {!loading && products.length === 0 && (
        <p className="text-center py-20 text-slate-400">Belum ada produk. Silakan tambah produk baru.</p>
      )}
    </div>
  )
}