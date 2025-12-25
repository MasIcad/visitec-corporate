'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' //

export default function AdminProductDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Ambil data produk saat halaman dimuat
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
    setLoading(false)
  }

  // 2. Fungsi Hapus Produk
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus produk ini?")
    if (confirmDelete) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id) // Hapus berdasarkan ID unik

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
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Manajemen Produk</h1>
        <a href="/admin/dashboard/products/new" className="bg-blue-600 text-white px-6 py-2 rounded-lg">+ Tambah Produk</a>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left bg-gray-50">
            <th className="p-4">Nama</th>
            <th className="p-4">Harga</th>
            <th className="p-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{item.name}</td>
              <td className="p-4">Rp {item.price?.toLocaleString('id-ID')}</td>
              <td className="p-4">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p className="text-center py-10">Memuat data...</p>}
    </div>
  )
}