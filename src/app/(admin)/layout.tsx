import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased bg-slate-50`}>
        {/* Kamu bisa menambahkan Sidebar admin di sini nanti */}
        {children}
      </body>
    </html>
  );
}