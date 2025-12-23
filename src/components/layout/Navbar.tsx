export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <span className="text-xl font-bold text-brand-dark">VISITEC</span>
        <div className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-brand-primary transition-colors">Home</a>
          <a href="/products" className="hover:text-brand-primary transition-colors">Katalog</a> {/* Tambahkan ini */}
          <a href="/blog" className="hover:text-brand-primary transition-colors">Insights</a>
        </div>
      </div>
    </nav>
  );
}