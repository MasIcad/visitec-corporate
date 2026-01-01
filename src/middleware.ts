import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // --- MENGGUNAKAN LOGIKA COOKIE LAMA ANDA (STABIL) ---
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

  // Ambil data user (Ini adalah variabel 'i' kita)
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // --- LOGIKA "i = 0" vs "i = 1" ANDA ---

  // Tentukan rute yang ingin dilindungi
  const isProtectedPath = path.startsWith('/dashboard') || path.startsWith('/admin');

  // JIKA i = 0 (user tidak ada) DAN mencoba masuk ke dashboard
  if (!user && isProtectedPath) {
    // Pastikan kita tidak me-redirect jika memang sudah di halaman login
    if (path !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // JIKA i = 1 (user ada) DAN berada di halaman login
  // Maka perintah "tendang ke login" di atas otomatis 'dimatikan' (disalahkan)
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  // Lindungi rute sesuai matcher Anda yang lama
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}