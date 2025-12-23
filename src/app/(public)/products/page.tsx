import { supabase } from '@/lib/supabase'
import Reveal from '@/components/layout/Reveal'

export default async function ProductsPage() {
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <section className="py-32 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-16 text-brand-dark italic">OUR PRODUCTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products?.map((item) => (
            <Reveal key={item.id}>
              <div className="group border border-slate-100 rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                <div className="h-72 overflow-hidden">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-brand-dark">{item.name}</h3>
                  <p className="text-slate-500 mb-6 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-brand-primary">
                      Rp {item.price?.toLocaleString('id-ID')}
                    </span>
                    <button className="text-sm font-bold border-b-2 border-brand-dark">DETAILS</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}