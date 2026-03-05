import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authSession = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');
  // Ambil tiket onboarding yang tadi kita buat
  const onboardingCookie = request.cookies.get('pesen_onboarding');
  const pathname = request.nextUrl.pathname;

  // 1. Kalau belum login, usir ke /login
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
    if (!authSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. CEK ONBOARDING: Punya tiket onboarding tapi mencoba menyusup ke /dashboard? Belokkan!
  if (pathname.startsWith('/dashboard') && onboardingCookie) {
     return NextResponse.redirect(new URL('/onboarding?email=' + onboardingCookie.value, request.url));
  }

  // 3. JIKA SUDAH SELESAI ONBOARDING (tidak punya tiket) tapi mencoba iseng buka /onboarding
  if (pathname.startsWith('/onboarding') && !onboardingCookie) {
     return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Jika sudah login, larang buka halaman depan/login lagi
  if (pathname === '/login' || pathname === '/register') {
    if (authSession) {
      // Jika dia masih punya utang onboarding, arahkan ke sana dulu
      if (onboardingCookie) {
         return NextResponse.redirect(new URL('/onboarding?email=' + onboardingCookie.value, request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding', '/login', '/register'],
};