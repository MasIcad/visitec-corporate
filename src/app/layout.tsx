import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans", 
});

// TAMBAHKAN KODE METADATA INI
export const metadata: Metadata = {
  title: "Powerindo Jaya Nusantara - Kontraktor & Distributor Alat Listrik",
  description: "PT. Powerindo Jaya Nusantara: Spesialis Mechanical Electrical Contractor, perakitan trafo, distributor alat listrik, dan jasa engineering terpercaya di Indonesia.",
  keywords: ["Powerindojayanusantara", "Teknologi", "Mechanical Electrical Contractor", "Supplier", "Distributor", "Indonesia", "Supplier Alat Listrik", "Jasa Engineering Listrik","PJN" ],
  authors: [{ name: "Powerindo Jaya Nusantara Team" }],
  openGraph: {
    title: "Powerindo Jaya Nusantara | Integrated Electrical Solutions",
    description: "Solusi infrastruktur listrik dan mekanikal terpadu. Produk lengkap dengan standar kualitas internasional.",
    url: "https://powerindojayanusantara.vercel.app/", // Ganti dengan domain asli jika sudah ada
    siteName: "Powerindo Jaya Nusantara",
    images: [
      {
        url: "/Logo2.png", // Gambar yang akan muncul saat link dibagikan
        width: 800,
        height: 600,
        alt: "Logo Powerindo Jaya Nusantara",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jakarta.className} antialiased`}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}