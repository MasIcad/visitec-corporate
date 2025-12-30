'use client' // Wajib agar useState dan form submission berfungsi

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, MapPin, Phone, Loader2, Facebook } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  // State untuk menangani logika subscribe
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Fungsi pengiriman email ke Supabase
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('subscribers') // Pastikan tabel 'subscribers' sudah dibuat di SQL Editor
        .insert([{ email }])

      if (error) throw error
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setLoading(false)
      // Reset status pesan setelah 3 detik
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  // Data Sosial Media tetap sama seperti kodingan Anda
  const socialLinks = [
    { 
      Icon: Facebook, 
      href: "https://www.facebook.com/Powerindoo/" 
    },
    { 
      Icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ), 
      href: "https://www.tiktok.com/@powerindojayanusantara?_r=1&_t=ZS-92d6L5GgFIi" 
    },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-20">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter italic">
              POWERINDO<span className="text-brand-primary">JAYA NUSANTARA</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              Leading the digital frontier with robust infrastructure and innovative enterprise solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-brand-primary transition-colors">Katalog</Link></li>
              <li><Link href="/blog" className="hover:text-brand-primary transition-colors">Insight</Link></li>
              <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Contact Info */}
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-6 text-slate-400 text-sm">
              <li className="flex gap-4">
                <MapPin className="text-brand-primary shrink-0" size={20} />
                <span>Kawasan Industri Terpadu, Indonesia</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-brand-primary shrink-0" size={20} />
                <div className="flex flex-col">
                  <span>+6281252505111</span>
                  <span>+6282245616400</span>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="text-brand-primary shrink-0" size={20} />
                <span className="break-all leading-tight">
                  powerindo1230@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter (DIUBAH MENJADI FORM BERFUNGSI) */}
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Stay Updated</h4>
            <p className="text-slate-400 mb-6 text-sm">Subscribe to our monthly corporate insights.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/10 px-5 py-3 rounded-full text-sm focus:outline-none focus:border-brand-primary w-full transition-all" 
              />
              <button 
                disabled={loading}
                className="bg-brand-primary text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-all text-sm w-full flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : 'SUBSCRIBE'}
              </button>

              {/* Feedback status untuk user */}
              {status === 'success' && (
                <p className="text-green-400 text-[10px] font-bold animate-pulse uppercase tracking-widest mt-1">✓ Terima kasih! Anda telah terdaftar.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-[10px] font-bold mt-1 uppercase tracking-widest">⚠ Email salah atau sudah terdaftar.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-slate-500 text-xs sm:text-sm">
          <p>© 2025 PT Powerindo Jaya Nusantara. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/legal" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/legal" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}