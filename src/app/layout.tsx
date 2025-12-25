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
  title: "Visitec Corporate - Inovasi IoT & Solusi Teknologi",
  description: "Penyedia layanan IoT dan wawasan teknologi terdepan untuk masa depan digital Anda.",
  keywords: ["IoT Indonesia", "Visitec", "Corporate Blog", "Teknologi"],
  authors: [{ name: "Visitec Team" }],
  openGraph: {
    title: "Visitec Corporate",
    description: "Solusi IoT dan Blog Teknologi Terkini",
    url: "https://visitec.vercel.app", // Ganti dengan domain asli jika sudah ada
    siteName: "Visitec",
    type: "website",
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