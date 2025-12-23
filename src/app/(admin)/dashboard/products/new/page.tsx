'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('products').insert([
      { name, description, price: parseFloat(price), image_url: imageUrl }
    ])
    if (!error) router.push('/products')
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-8">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" placeholder="Nama Produk" className="w-full p-4 border rounded-xl" onChange={e => setName(e.target.value)} required />
        <textarea placeholder="Deskripsi Produk" className="w-full p-4 border rounded-xl h-32" onChange={e => setDescription(e.target.value)} />
        <input type="number" placeholder="Harga (Rp)" className="w-full p-4 border rounded-xl" onChange={e => setPrice(e.target.value)} required />
        <input type="text" placeholder="URL Gambar Produk" className="w-full p-4 border rounded-xl" onChange={e => setImageUrl(e.target.value)} required />
        <button type="submit" className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-blue-700">Publish Produk</button>
      </form>
    </div>
  )
}