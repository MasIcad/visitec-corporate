// 1. Tetap memaksa data selalu diperbarui
export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase' 
import HeroSlider from '@/components/layout/HeroSlider' 
import Reveal from '@/components/layout/Reveal'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react' 
import Link from 'next/link'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import FloatingContact from '@/components/layout/FloatingContact'
import { motion } from 'framer-motion'

const MotionLink = motion.create(Link)

// Komponen Divider untuk transisi halus
export function SectionDivider() {
  return (
    <div className="relative h-20 w-full bg-slate-50 overflow-hidden">
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="absolute bottom-0 h-full w-full fill-brand-dark"
      >
        <polygon points="0,100 100,100 100,0" />
      </svg>
    </div>
  )
}

export default async function HomePage() {
  // 2. Fetch data Gallery
  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <main className="bg-white relative">
      <AnnouncementBar />
      <HeroSlider />

      {/* Section About Overview */}
      <section id="about-section" className="py-32 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-8">
                  About Powerindo Jaya Nusantara
                </h2>
                <p className="text-4xl md:text-6xl font-light text-brand-dark leading-[1.1]">
                  Leading the way in <span className="font-bold">Digital Transformation</span> and Infrastructure.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-xl text-slate-600 leading-relaxed">
                  Kami mendedikasikan diri untuk memberikan solusi teknik terbaik bagi sektor industri di Indonesia.
                </p>
                <p className="text-slate-600">
                  Visi Kami: Menjadi perusahaan penyedia solusi peralatan listrik terkemuka yang mengutamakan kualitas produk dan keunggulan teknis di setiap karya.
                </p>
                <div className="pt-6">
                  <Link 
                    href="/about" 
                    className="text-brand-dark font-bold border-b-2 border-brand-primary pb-2 hover:text-brand-primary transition-all inline-block"
                  >
                    OUR HISTORY →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section Expertise */}
      <section className="bg-slate-50 py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
                  Integrated Solutions for High-Scale Enterprise.
                </h3>
              </div>
              {/* PERBAIKAN: Link diarahkan ke ID di halaman About */}
              <Link 
                href="/about#expertise-section" 
                className="px-8 py-4 border-2 border-brand-dark text-brand-dark font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all"
              >
                VIEW ALL SERVICES
              </Link>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              { 
                title: 'Mechanical Electrical Contractor', 
                icon: '01',
                desc: 'Layanan instalasi, pemeliharaan, dan integrasi sistem mekanikal elektrikal skala industri yang presisi, aman, dan memenuhi standar internasional.'
              },
              { 
                title: 'Supplier', 
                icon: '02',
                desc: 'Penyedia komponen elektrikal dan infrastruktur digital berkualitas tinggi dari brand ternama untuk menjamin keandalan operasional bisnis Anda.'
              },
              { 
                title: 'Distributor', 
                icon: '03',
                desc: 'Distributor resmi perangkat teknologi dan sistem otomasi terintegrasi yang memastikan rantai pasok dan distribusi proyek Anda berjalan tanpa hambatan.'
              }
            ].map((item, i) => (
              <div key={i} className="h-full">
                <Reveal>
                  <div className="group relative bg-white p-12 rounded-4xl border border-slate-200 transition-all duration-500 hover:-translate-y-4 h-full flex flex-col">
                    <div className="absolute inset-0 bg-brand-dark scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-4xl z-0" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-4xl font-black text-slate-100 group-hover:text-white/10 transition-colors mb-8">
                        {item.icon}
                      </div>
                      
                      <div className="min-h-20">
                        <h4 className="text-2xl font-bold text-brand-dark group-hover:text-white mb-4 transition-colors leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      
                      <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed text-sm grow">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSISI KE GELAP */}
      <SectionDivider />

      {/* Gallery Section + Watermark */}
      <section className="pt-20 pb-0 bg-brand-dark text-white overflow-hidden relative">
        {/* WATERMARK BACKGROUND */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
          <h2 className="text-[15vw] font-black italic tracking-tighter uppercase">POWERINDO</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Gallery</h2>
          <h3 className="text-4xl font-bold italic uppercase tracking-tighter">Our Work In Action</h3>
        </div>
        
        <div className="flex gap-6 overflow-x-auto px-6 md:px-[calc((100vw-1280px)/2)] scrollbar-hide snap-x snap-mandatory pb-10 relative z-10">
          {galleryItems && galleryItems.length > 0 ? (
            galleryItems.map((item) => (
              <div key={item.id} className="shrink-0 w-[85vw] md:w-112.5 snap-center">
                <Reveal>
                  <div className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-white/10">
                    <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title || "Project"} />
                    <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                       <p className="font-bold text-lg uppercase tracking-widest">{item.title}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))
          ) : (
            <div className="w-full px-6 italic text-slate-500">No gallery items yet.</div>
          )}
        </div>
      </section>

      {/* FINAL CTA SECTION (PENGHILANG GAP) */}
      <section className="bg-brand-dark py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
              Ready to Power Up Your <br />
              <span className="text-[#2DC653]">Infrastructure?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Konsultasikan kebutuhan infrastruktur listrik dan solusi energi perusahaan Anda bersama mitra teknologi terpercaya.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-5 md:py-6 bg-brand-primary text-white font-bold rounded-full shadow-2xl hover:scale-105 transition-all group whitespace-nowrap"
            >
              <span className="text-sm md:text-base">START A PROJECT WITH US</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform shrink-0" />
            </Link>
          </Reveal>
        </div>
      </section>

      <FloatingContact />
    </main>
  );
}