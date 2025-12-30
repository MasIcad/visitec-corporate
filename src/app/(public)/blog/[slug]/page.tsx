import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Calendar, Eye, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase.from('posts').select('*').eq('slug', params.slug).single();

  if (!post) return notFound();

  // Logika Update View
  await supabase.from('posts').update({ views: (post.views || 0) + 1 }).eq('id', post.id);

  const gallery = post.content?.gallery || [post.image_url];
  const bodyText = typeof post.content === 'object' ? post.content.body : post.content;

  return (
    <article className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="relative h-[60vh] w-full bg-brand-dark">
        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-20">
          <div className="max-w-4xl mx-auto">
            <span className="bg-brand-primary text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Insights</span>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-dark leading-tight mb-8 uppercase italic tracking-tighter">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 border-t border-slate-100 pt-6">
               <div className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.created_at).toLocaleDateString('id-ID')}</div>
               <div className="flex items-center gap-2"><Eye size={16} /> {post.views + 1} Pembaca</div>
               <div className="flex items-center gap-2"><User size={16} /> Admin Powerindo</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Isi Teks Artikel */}
        <div className="prose prose-xl prose-slate max-w-none mb-20">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-xl">
            {bodyText}
          </div>
        </div>

        {/* Galeri Foto Pendukung */}
        {gallery.length > 1 && (
          <div className="mt-16 space-y-10">
            <h3 className="text-2xl font-black text-brand-dark italic uppercase tracking-tighter">Gallery Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.slice(1).map((img: string, i: number) => (
                <div key={i} className="rounded-4xl overflow-hidden shadow-xl border border-slate-100 aspect-video group">
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 pt-10 border-t border-slate-100">
            <Link href="/blog" className="inline-flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest hover:gap-5 transition-all">
                <ArrowLeft size={20} /> Kembali ke Berita
            </Link>
        </div>
      </div>
    </article>
  );
}