'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    // Visual: Gardu Induk / Trafo Besar
    image: 'https://images.unsplash.com/photo-1594595240905-04ae0d99f73b?auto=format&fit=crop&q=80&w=1920',
    title: 'ELECTRICAL CONTRACTOR',
    desc: 'Ahli dalam instalasi, pemeliharaan, dan integrasi sistem mekanikal elektrikal skala industri yang kompleks.'
  },
  {
    // Visual: Detail Komponen Listrik/Trafo
    image: 'https://images.unsplash.com/photo-1580737338041-628c113e7661?auto=format&fit=crop&q=80&w=1920',
    title: 'PREMIUM SUPPLIER',
    desc: 'Penyedia komponen elektrikal dan infrastruktur energi berkualitas tinggi untuk menjamin keandalan bisnis Anda.'
  },
  {
    // Visual: Jaringan Distribusi
    image: 'https://images.unsplash.com/photo-1487803868669-411d48552474?auto=format&fit=crop&q=80&w=1920',
    title: 'OFFICIAL DISTRIBUTOR',
    desc: 'Distributor resmi perangkat teknologi otomasi dan sistem kelistrikan yang memastikan rantai pasok proyek tanpa hambatan.'
  },
  {
    // Visual: Fasilitas Industri Modern
    image: 'https://images.unsplash.com/photo-1563968351004-f92d55fc4499?auto=format&fit=crop&q=80&w=1920',
    title: 'INTEGRATED SOLUTIONS',
    desc: 'Mitra strategis dalam menghadirkan solusi infrastruktur energi terpadu untuk efisiensi dan masa depan industri.'
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000) 
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[current].image} 
            className="h-full w-full object-cover" 
            alt={`Hero Slide ${current + 1}`} 
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 italic tracking-tighter uppercase">
                {slides[current].title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl leading-relaxed">
                {slides[current].desc}
              </p>
              <div className="flex gap-4">
                <a 
                  href="#about-section"
                  className="px-10 py-5 bg-brand-primary text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3 cursor-pointer shadow-2xl group"
                >
                  LEARN MORE <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform"/>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              current === i ? 'w-16 bg-brand-primary' : 'w-8 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-brand-dark/20 to-transparent z-0 pointer-events-none" />
    </div>
  )
}