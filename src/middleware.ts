import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // TETAP PAKAI LOGIKA COOKIE LAMA ANDA (YANG BERHASIL LOGIN)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Gunakan getUser() untuk keamanan, tapi kita ambil path-nya dulu
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // --- SOLUSI FIX REDIRECT LOOP ---

  // 1. Jika mencoba akses halaman proteksi (Admin/Dashboard) tapi BELUM login
  // Kita cek spesifik: User harus null DAN path harus di area terlarang
  const isProtectedPath = path.startsWith('/dashboard') || path.startsWith('/admin');
  
  if (!user && isProtectedPath) {
    // Pastikan tidak me-redirect jika memang sudah di halaman login
    if (path !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 2. Jika SUDAH login & mencoba buka /login, lempar ke /dashboard (sesuai kode lama Anda)
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}