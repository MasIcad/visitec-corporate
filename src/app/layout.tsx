import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";

// Konfigurasi Font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans", 
});

// Konfigurasi SEO & Metadata Powerindo Jaya Nusantara
export const metadata: Metadata = {
  title: "Powerindo Jaya Nusantara - Kontraktor & Distributor Alat Listrik",
  description: "PT. Powerindo Jaya Nusantara: Spesialis Mechanical Electrical Contractor, perakitan trafo, distributor alat listrik, dan jasa engineering terpercaya di Indonesia.",
  keywords: ["Powerindojayanusantara", "Teknologi", "Mechanical Electrical Contractor", "Supplier", "Distributor", "Indonesia", "Supplier Alat Listrik", "Jasa Engineering Listrik","PJN", "Jual Cubicle Schneider", "Distributor Cubicle Schneider SM6", "Supplier Schneider Terlengkap Jawa", "Distributor Resmi Schneider Indonesia", "Distributor Schneider Surabaya Murah", "Jasa Setting dan Pasang Cubicle Schneider Jawa", "Jual Trafo Murah", "Distributor Transformator Murah", "Harga Trafo Trafindo Ready Stock", "Supplier Trafo Original Garansi Resmi", "Jual Trafo Listrik Tegangan Menengah Jawa", "Jual Panel ATS LVMDP Murah", "Pembuatan Panel ATS LVMDP", "Harga Panel LVMDP", "Jual Panel AMF - ATS", "Supplier Panel ATS LVMDP", "Jasa Fabrikasi Panel ATS LVMDP", "Jual Main Distribution Panel MDP/SDP", "Distributor Panel Kapasitor Bank Jawa", "Supplier Panel Distribusi Listrik", "Jasa Maintenance Panel MDP SDP Jawa", "Jual Genset Murah Jawa Ready Stock", "Distributor Genset Diesel", "Jual Panel Synchron Generator Sets Murah", "Jasa Instalasi dan Service Genset Jawa", "Jual Kabel TM (Tegangan Menengah) Murah Jawa", "Distributor Kabel TR (Tegangan Rendah) Jawa", "Jasa Pasang Penangkal Petir Eksternal Jawa", "Instalasi Arrester MV dan LV Schneider Murah", "Jual Gas Detector LPG Storage Jawa", "Supplier Kabel Listrik dan Aksesoris"],
  authors: [{ name: "Powerindo Jaya Nusantara Team" }],
  openGraph: {
    title: "Powerindo Jaya Nusantara | Mechanical Electrical Contractor",
    description: "Solusi infrastruktur listrik dan mekanikal terpadu. Produk lengkap dengan standar kualitas internasional.",
    url: "https://powerindojayanusantara.vercel.app/", 
    siteName: "Powerindo Jaya Nusantara",
    images: [
      {
        url: "/Logo2.png", 
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

// Fungsi RootLayout Tunggal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jakarta.className} antialiased`}>
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>

        {/* Integrasi Google Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}