import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Ülke kodu → dil eşlemesi
const countryLocaleMap: Record<string, string> = {
  TR: 'tr', // Türkiye
  AZ: 'az', // Azerbaycan
  RU: 'ru', // Rusya
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece root '/' ziyaretinde geo-tespit yap
  if (pathname === '/') {
    // Kullanıcının daha önce manuel seçtiği bir dil var mı?
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;

    if (!savedLocale) {
      // Vercel'in ülke header'ını oku
      const country = request.headers.get('x-vercel-ip-country') ?? '';
      const locale = countryLocaleMap[country.toUpperCase()] ?? 'en';

      const url = request.nextUrl.clone();
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(tr|az|en|ru)/:path*']
};
