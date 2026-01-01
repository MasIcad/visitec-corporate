import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

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

  // Menggunakan getUser() untuk validasi keamanan di sisi server
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // --- LOGIKA PROTEKSI ---

  // 1. Jika mencoba akses area dashboard/admin tapi user tidak ditemukan (null)
  const isProtectedPath = path.startsWith('/dashboard') || path.startsWith('/admin')
  
  if (!user && isProtectedPath) {
    // Pastikan kita tidak berada di halaman login agar tidak terjadi loop
    if (path !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 2. Jika sudah login (user ada) dan mencoba akses /login, pindahkan ke dashboard
  if (user && path === '/login') {
    // Gunakan path /dashboard sesuai preferensi keberhasilan kode lama kamu
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}