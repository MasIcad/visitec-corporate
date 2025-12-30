'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, Package, Image as ImageIcon, Loader2, 
  Trash2, LayoutDashboard, FileText, Save, X, Tag, Pencil, RotateCcw, Users, Mail
} from 'lucide-react';

export default function DashboardPage() {
  // Tambahkan 'subscribers' ke activeTab
  const [activeTab, setActiveTab] = useState<'insight' | 'products' | 'gallery' | 'subscribers'>('insight');
  const [loading, setLoading] = useState(false);
  
  const [posts, setPosts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]); // State baru untuk subscribers
  
  const categories = [
    "Trafo", "Cubicle", "ATS+LVMDP", "Capasitor Bank", 
    "Kabel - Tegangan Menengah", "Kabel - Tegangan Rendah", 
    "Genset", "Penangkal Petir", "Busduct", "Hydrant", "AC"
  ];

  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const [prodForm, setProdForm] = useState({ 
    name: '', 
    desc: '', 
    price: '', 
    category: '', 
    files: [] as File[],
    existingImages: [] as string[] 
  });

  const [postForm, setPostForm] = useState({ 
    title: '', 
    content: '', 
    files: [] as File[],
    existingImages: [] as string[] 
  });

  const [gallForm, setGallForm] = useState({ title: '', file: null as File | null });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data: postsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const { data: gallData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    const { data: subData } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
    
    if (postsData) setPosts(postsData);
    if (prodData) setProducts(prodData);
    if (gallData) setGallery(gallData);
    if (subData) setSubscribers(subData);
  }

  const uploadToStorage = async (file: File, folder: string) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const filePath = `${folder}/${fileName}`;
    const { error } = await supabase.storage.from('visitec-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('visitec-assets').getPublicUrl(filePath).data.publicUrl;
  };

  const handleEditPostClick = (post: any) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title,
      content: typeof post.content === 'object' ? post.content.body : post.content,
      files: [],
      existingImages: post.content?.gallery || (post.image_url ? [post.image_url] : [])
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls: string[] = [...postForm.existingImages];
      
      if (postForm.files.length > 0) {
        for (const file of postForm.files) {
          const url = await uploadToStorage(file, 'blog');
          imageUrls.push(url);
        }
      }
      
      if (imageUrls.length === 0) throw new Error("Artikel wajib memiliki minimal 1 foto.");

      const postData = { 
        title: postForm.title, 
        content: { body: postForm.content, gallery: imageUrls },
        image_url: imageUrls[0] || '',
        slug: postForm.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
      };

      if (editingPostId) {
        await supabase.from('posts').update(postData).eq('id', editingPostId);
        alert('Artikel Berhasil Diperbarui!');
      } else {
        await supabase.from('posts').insert([postData]);
        alert('Artikel Berhasil Dipublish!');
      }

      setPostForm({ title: '', content: '', files: [], existingImages: [] });
      setEditingPostId(null);
      fetchData();
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  const handleEditProdClick = (p: any) => {
    setEditingProdId(p.id);
    setProdForm({
      name: p.name,
      desc: p.description,
      price: p.price.toString(),
      category: p.category,
      files: [],
      existingImages: p.images || [p.image_url]
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProdId && prodForm.files.length === 0) return alert('Pilih minimal 1 gambar produk!');
    if (!prodForm.category) return alert('Pilih kategori produk!');
    
    setLoading(true);
    try {
      let imageUrls: string[] = [...prodForm.existingImages];
      
      if (prodForm.files.length > 0) {
        for (const file of prodForm.files) {
          const url = await uploadToStorage(file, 'products');
          imageUrls.push(url);
        }
      }

      const productData = { 
        name: prodForm.name, 
        description: prodForm.desc, 
        price: parseFloat(prodForm.price), 
        category: prodForm.category,
        image_url: imageUrls[0], 
        images: imageUrls        
      };

      if (editingProdId) {
        await supabase.from('products').update(productData).eq('id', editingProdId);
        alert('Produk Berhasil Diperbarui!');
      } else {
        await supabase.from('products').insert([productData]);
        alert('Produk Berhasil Ditambahkan!');
      }

      setProdForm({ name: '', desc: '', price: '', category: '', files: [], existingImages: [] });
      setEditingProdId(null);
      fetchData();
    } catch (err: any) { alert("Gagal: " + err.message); }
    finally { setLoading(false); }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gallForm.file) return alert('Pilih foto gallery!');
    setLoading(true);
    try {
      const url = await uploadToStorage(gallForm.file, 'gallery');
      await supabase.from('gallery').insert([{ title: gallForm.title, image_url: url }]);
      alert('Berhasil ditambahkan ke Gallery!');
      setGallForm({ title: '', file: null });
      fetchData();
    } catch (err: any) { alert(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-brand-dark italic uppercase tracking-tighter">Powerindo Jaya Nusantara Control Center</h1>
          <p className="text-slate-500 mt-2">Kelola konten, produk, dan performa digital perusahaan.</p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {[
            { id: 'insight', label: 'Insights', icon: LayoutDashboard },
            { id: 'products', label: 'Produk', icon: Package },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'subscribers', label: 'Leads', icon: Users }, // Tab baru
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all text-xs md:text-sm ${activeTab === tab.id ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. TAB INSIGHTS */}
      {activeTab === 'insight' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-4xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <FileText className="text-brand-primary" /> 
                {editingPostId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
              </h2>
              <form onSubmit={handleAddPost} className="space-y-6">
                <input type="text" placeholder="Judul Artikel" required className="w-full p-5 bg-slate-50 rounded-2xl outline-none text-xl font-bold" value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} />
                <textarea placeholder="Mulai menulis konten di sini..." required className="w-full p-5 bg-slate-50 rounded-2xl outline-none h-80 resize-none" value={postForm.content} onChange={e => setPostForm({...postForm, content: e.target.value})} />
                
                <div className="space-y-4">
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Gallery Foto Artikel</p>
                   <div className="flex flex-wrap gap-3">
                      {postForm.existingImages.map((url, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-brand-primary/20 group">
                          <img src={url} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setPostForm({...postForm, existingImages: postForm.existingImages.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                        </div>
                      ))}
                      {postForm.files.map((file, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-dashed border-brand-primary">
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-60" />
                          <button type="button" onClick={() => setPostForm({...postForm, files: postForm.files.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={12} /></button>
                        </div>
                      ))}
                      <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors text-slate-400">
                        <Plus size={24} />
                        <span className="text-[10px] font-bold mt-1">Tambah</span>
                        <input type="file" multiple hidden onChange={e => setPostForm({...postForm, files: [...postForm.files, ...Array.from(e.target.files || [])]})} />
                      </label>
                   </div>
                </div>

                <div className="flex gap-3 pt-6">
                    {editingPostId && (
                        <button type="button" onClick={() => { setEditingPostId(null); setPostForm({title:'', content:'', files:[], existingImages:[]})}} className="flex-1 py-5 bg-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"><RotateCcw size={18}/> Batal</button>
                    )}
                    <button disabled={loading} className="flex-2 py-5 bg-brand-primary text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-brand-primary/90 transition-all">
                        {loading ? <Loader2 className="animate-spin" /> : editingPostId ? <Save size={20} /> : <Plus />} 
                        {editingPostId ? 'Perbarui Artikel' : 'Publish Artikel'}
                    </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-4">
             <h3 className="font-bold text-brand-dark uppercase tracking-wider text-sm">Artikel Terbaru</h3>
             {posts.map(post => (
               <div key={post.id} className="p-4 bg-white rounded-2xl border flex items-center justify-between gap-4 group hover:border-brand-primary transition-all shadow-sm">
                 <div className="flex items-center gap-4 overflow-hidden">
                   <img src={post.image_url} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                   <p className="font-bold text-xs truncate">{post.title}</p>
                 </div>
                 <div className="flex gap-1">
                    <button onClick={() => handleEditPostClick(post)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"><Pencil size={18} /></button>
                    <button onClick={async () => { if(confirm('Hapus artikel ini?')) { await supabase.from('posts').delete().eq('id', post.id); fetchData(); } }} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors shrink-0"><Trash2 size={18} /></button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* 2. TAB PRODUK */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100 sticky top-32">
              <h2 className="text-2xl font-bold mb-8">{editingProdId ? 'Edit Produk' : 'Tambah Produk'}</h2>
              <form onSubmit={handleAddProduct} className="space-y-5">
                <input type="text" placeholder="Nama Produk" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} />
                
                <select required className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-slate-600 cursor-pointer" value={prodForm.category} onChange={e => setProdForm({...prodForm, category: e.target.value})}>
                  <option value="" disabled>Pilih Kategori Produk</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <input type="number" placeholder="Harga" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} />
                <textarea placeholder="Deskripsi..." required className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-32" value={prodForm.desc} onChange={e => setProdForm({...prodForm, desc: e.target.value})} />
                
                <div className="space-y-4">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Foto Produk</p>
                   <div className="flex flex-wrap gap-2">
                      {prodForm.existingImages.map((url, i) => (
                        <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border">
                          <img src={url} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setProdForm({...prodForm, existingImages: prodForm.existingImages.filter((_, idx) => idx !== i)})} className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5"><X size={10} /></button>
                        </div>
                      ))}
                      
                      {prodForm.files.map((file, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-dashed border-brand-primary">
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-70" />
                          <button type="button" onClick={() => setProdForm({...prodForm, files: prodForm.files.filter((_, i) => i !== idx)})} className="absolute top-0 right-0 bg-red-500 text-white p-0.5"><X size={10} /></button>
                        </div>
                      ))}

                      <label className="w-12 h-12 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer text-slate-400 hover:bg-slate-50">
                        <Plus size={16} /><input type="file" multiple hidden onChange={e => setProdForm({...prodForm, files: [...prodForm.files, ...Array.from(e.target.files || [])]})} />
                      </label>
                   </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button disabled={loading} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg flex justify-center items-center gap-2 cursor-pointer">
                        {loading ? <Loader2 className="animate-spin" /> : editingProdId ? <Save size={18}/> : <Plus />} 
                        {editingProdId ? 'Update Produk' : 'Publish Produk'}
                    </button>
                    {editingProdId && (
                        <button type="button" onClick={() => { setEditingProdId(null); setProdForm({name:'', desc:'', price:'', category:'', files:[], existingImages:[]})}} className="w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl flex justify-center items-center gap-2"><RotateCcw size={18}/> Batal</button>
                    )}
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
             <h3 className="font-bold text-brand-dark uppercase tracking-wider text-sm mb-4">Daftar Inventori</h3>
             {products.map(p => (
               <div key={p.id} className="bg-white p-5 rounded-3xl border flex justify-between items-center shadow-sm group">
                 <div className="flex gap-5 items-center">
                   <img src={p.image_url} className="w-20 h-20 rounded-2xl object-cover" />
                   <div>
                     <span className="bg-blue-50 text-brand-primary text-[10px] font-black px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-tighter"><Tag size={10} className="inline mr-1"/>{p.category || 'N/A'}</span>
                     <h4 className="font-bold text-lg text-brand-dark mt-1">{p.name}</h4>
                     <p className="text-brand-primary font-black">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                   </div>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => handleEditProdClick(p)} className="p-4 text-blue-500 hover:bg-blue-50 rounded-2xl transition-colors"><Pencil size={22} /></button>
                    <button onClick={async () => { if(confirm('Hapus produk ini?')) { await supabase.from('products').delete().eq('id', p.id); fetchData(); } }} className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-colors"><Trash2 size={22} /></button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* 3. TAB GALLERY */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-4xl shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-8">Add to Gallery</h2>
              <form onSubmit={handleAddGallery} className="space-y-6">
                <input type="text" placeholder="Judul Proyek" required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={gallForm.title} onChange={e => setGallForm({...gallForm, title: e.target.value})} />
                <div className="border-2 border-dashed border-slate-200 p-10 rounded-3xl text-center">
                  <input type="file" id="gallFile" hidden onChange={e => setGallForm({...gallForm, file: e.target.files?.[0] || null})} />
                  <label htmlFor="gallFile" className="cursor-pointer flex flex-col items-center gap-3 text-slate-400 font-bold">
                    {gallForm.file ? (
                      <div className="w-full aspect-video rounded-xl overflow-hidden mb-2">
                         <img src={URL.createObjectURL(gallForm.file)} className="w-full h-full object-cover" />
                      </div>
                    ) : <ImageIcon size={40} />}
                    {gallForm.file ? gallForm.file.name : "Pilih Foto Pekerjaan"}
                  </label>
                </div>
                <button disabled={loading} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg cursor-pointer">{loading ? <Loader2 className="animate-spin" /> : "Upload ke Gallery"}</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
             {gallery.map(item => (
               <div key={item.id} className="aspect-square rounded-3xl overflow-hidden border relative group shadow-sm">
                 <img src={item.image_url} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-4 gap-4">
                   <p className="text-white text-xs font-bold text-center">{item.title}</p>
                   <button onClick={async () => { if(confirm('Hapus foto ini dari gallery?')) { await supabase.from('gallery').delete().eq('id', item.id); fetchData(); } }} className="p-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors shadow-xl"><Trash2 size={20} /></button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* 4. TAB SUBSCRIBERS (FITUR BARU) */}
      {activeTab === 'subscribers' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-white p-10 rounded-4xl shadow-xl border border-slate-100">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-brand-dark italic uppercase tracking-tighter flex items-center gap-3">
                    <Mail className="text-brand-primary" /> Potential Leads
                  </h2>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Daftar Email yang Terdaftar via Newsletter</p>
                </div>
                <div className="bg-blue-50 text-brand-primary px-6 py-3 rounded-2xl border border-blue-100 font-black italic">
                   TOTAL: {subscribers.length} EMAIL
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between group hover:border-brand-primary transition-all">
                    <div>
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        <Mail size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
                      </div>
                      <p className="font-bold text-brand-dark truncate">{sub.email}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-2">
                        Terdaftar: {new Date(sub.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <button 
                      onClick={async () => { if(confirm('Hapus email ini dari daftar?')) { await supabase.from('subscribers').delete().eq('id', sub.id); fetchData(); } }}
                      className="mt-6 p-3 bg-white text-red-400 hover:bg-red-50 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition-colors border border-slate-100"
                    >
                      <Trash2 size={14} /> Hapus Data
                    </button>
                  </div>
                ))}
              </div>

              {subscribers.length === 0 && (
                <div className="py-20 text-center">
                   <Users size={48} className="mx-auto text-slate-200 mb-4" />
                   <p className="text-slate-400 italic">Belum ada orang yang subscribe ke newsletter.</p>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}