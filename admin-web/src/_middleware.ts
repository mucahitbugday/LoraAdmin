import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/.well-known/')) {
        return NextResponse.next();
    }

    const token = request.cookies.get('refresh_token');
    const isAuthenticated = !!token;

    const isAuthPage = ['/login', '/register'].some((authPath) =>
        request.nextUrl.pathname.startsWith(authPath)
    );

    const isProtectedPage = !isAuthPage && request.nextUrl.pathname.startsWith('/');

    // Giriş yapmamışsa ve korumalı sayfaya erişiyorsa login'e yönlendir
    if (!isAuthenticated && isProtectedPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Giriş yapmışsa ve auth sayfasına (login/register) erişiyorsa ana sayfaya yönlendir
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// sadece sayfa yollarını eşle
export const config = {
    matcher: ['/((?!_next|favicon.ico|static|public|api|.*\\..*).*)']
};
