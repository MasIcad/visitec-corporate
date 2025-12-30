'use client'

import { useState } from 'react'
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductView({ images, alt }: { images: string[], alt: string }) {
  const [index, setIndex] = useState(0)
  const [isFull, setIsFull] = useState(false)

  // Pastikan ada array gambar, jika kosong gunakan placeholder
  const gallery = images && images.length > 0 ? images : ["/placeholder-image.jpg"]

  const nextPhoto = () => {
    setIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevPhoto = () => {
    setIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* FRAME UTAMA */}
      <div className="relative group rounded-4xl overflow-hidden border border-slate-100 shadow-2xl aspect-square bg-slate-50">
        <img 
          src={gallery[index]} 
          alt={`${alt} - ${index + 1}`} 
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* TOMBOL NAVIGASI (Hanya muncul jika foto > 1) */}
        {gallery.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevPhoto}
              className="bg-white/90 hover:bg-brand-primary hover:text-white text-brand-dark p-3 rounded-2xl shadow-xl transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextPhoto}
              className="bg-white/90 hover:bg-brand-primary hover:text-white text-brand-dark p-3 rounded-2xl shadow-xl transition-all active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* INDIKATOR NOMOR & TOMBOL FULLSCREEN */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
           <div className="bg-brand-dark/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-white tracking-widest">
              {index + 1} / {gallery.length}
           </div>
           <button 
            onClick={() => setIsFull(true)}
            className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
           >
            <Maximize2 size={16} className="text-brand-primary" />
           </button>
        </div>
      </div>

      {/* THUMBNAIL LIST (Klik Langsung ke Foto) */}
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {gallery.map((img, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                index === i ? 'border-brand-primary scale-105 shadow-md' : 'border-transparent opacity-60'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* MODAL FULLSCREEN (Tanpa Terpotong) */}
      {isFull && (
        <div 
          className="fixed inset-0 z-999 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-16 animate-in fade-in duration-300"
          onClick={() => setIsFull(false)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-brand-primary transition-colors">
            <X size={40} />
          </button>
          <img 
            src={gallery[index]} 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            alt="Full Size View"
          />
        </div>
      )}
    </div>
  )
}