import Reveal from '@/components/layout/Reveal';

export default function LegalPage() {
  return (
    // Menggunakan text-brand-dark agar kontras tinggi dan tidak menyatu dengan bg
    <main className="bg-slate-50 min-h-screen py-32 px-6 text-brand-dark/90">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-4xl shadow-sm border border-slate-100">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-10 italic uppercase tracking-tighter">
            Privacy Policy <span className="text-brand-primary">&</span> Terms
          </h1>
          
          <div className="w-20 h-1.5 bg-brand-primary mb-12 rounded-full" />
          
          <section className="mb-12">
            <h2 className="text-xl font-bold text-brand-dark mb-4 uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm">1</span>
              Kebijakan Privasi
            </h2>
            <p className="leading-relaxed mb-4 text-justify">
              PT Powerindo Jaya Nusantara berkomitmen untuk melindungi privasi setiap pengunjung website kami. Informasi yang Anda berikan melalui formulir kontak atau WhatsApp hanya akan digunakan untuk kepentingan komunikasi bisnis, konsultasi proyek, dan layanan pelanggan. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan tertulis.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-brand-dark mb-4 uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm">2</span>
              Syarat & Ketentuan
            </h2>
            <p className="leading-relaxed mb-4 text-justify">
              Seluruh konten, gambar, logo, dan informasi teknis produk yang ditampilkan dalam website ini adalah milik intelektual PT Powerindo Jaya Nusantara. Penggunaan konten tanpa izin tertulis dari pihak manajemen dilarang keras. 
            </p>
            <p className="leading-relaxed mb-4 text-justify">
              Harga produk yang tertera adalah estimasi dan dapat berubah sewaktu-waktu sesuai dengan fluktuasi pasar dan kebijakan perusahaan. Untuk penawaran resmi (Quotation), silakan hubungi tim sales kami melalui jalur komunikasi yang tersedia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-dark mb-4 uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm">3</span>
              Kontak Hukum
            </h2>
            <p className="leading-relaxed">
              Jika Anda memiliki pertanyaan lebih lanjut mengenai kebijakan hukum atau ingin mengajukan kerja sama resmi, silakan hubungi kami melalui email di: <span className="font-bold text-brand-primary underline decoration-brand-primary/30 underline-offset-4">powerindo1230@gmail.com</span>
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}