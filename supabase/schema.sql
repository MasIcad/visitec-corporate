-- 1. PEMBUATAN TABEL (DENGAN PENGECEKAN)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB,
  image_url TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_name TEXT,
  comment_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  title TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. AKTIFKAN RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 3. PEMBERSIHAN & PEMBUATAN POLICY (AGAR TIDAK DUPLIKAT)
DO $$ 
BEGIN
    -- Hapus policy lama jika ada agar tidak error saat di-run ulang
    DROP POLICY IF EXISTS "Public can view posts" ON posts;
    DROP POLICY IF EXISTS "Admins can manage posts" ON posts;
    DROP POLICY IF EXISTS "Public can view products" ON products;
    DROP POLICY IF EXISTS "Admins can manage products" ON products;
    DROP POLICY IF EXISTS "Public can view gallery" ON gallery;
    DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Admins can upload images" ON storage.objects;
END $$;

-- Buat Policy Baru
CREATE POLICY "Public can view posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Admins can manage posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- Policy untuk Storage (Bucket: visitec-assets)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'visitec-assets');
CREATE POLICY "Admins can upload images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'visitec-assets' AND auth.role() = 'authenticated');