'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function loginAction(email: string, password: string) {
  const supabase = await createSupabaseServer()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email atau password salah' }
  }

  redirect('/dashboard')
}

export async function logoutAction() {
  const supabase = await createSupabaseServer()
  
  // Menghapus session di server dan membersihkan cookie
  await supabase.auth.signOut()
  
  // Membersihkan cache dashboard agar tidak bisa diakses via tombol 'back' browser
  revalidatePath('/dashboard', 'layout')
  revalidatePath('/admin', 'layout')
  
  // Lempar kembali ke halaman login
  redirect('/login')
}