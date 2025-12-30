'use client'

export default function Navbar() {
  return (
    <nav 
      // Variabel ini diisi otomatis oleh AnnouncementBar.tsx
      style={{ top: 'var(--announcement-height, 0px)' }}
      className="sticky z-50 border-b bg-white/70 backdrop-blur-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* Bagian Brand: Logo + Teks */}
        <a href="/" className="flex items-center gap-3 group">
          <img 
            src="/Logo.jpeg" 
            alt="Logo Powerindo Jaya Nusantara" 
            className="h-10 w-auto object-contain" 
          />
          <span className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
            Powerindo Jaya Nusantara
          </span>
        </a>

        {/* Navigasi Link */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/" className="hover:text-brand-primary transition-colors">Home</a>
          <a href="/products" className="hover:text-brand-primary transition-colors">Katalog</a>
          <a href="/blog" className="hover:text-brand-primary transition-colors">Insights</a>
          <a href="/gallery" className="hover:text-brand-primary transition-colors">Gallery</a>
          <a href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}