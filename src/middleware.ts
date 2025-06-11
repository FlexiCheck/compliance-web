'use server';

import { NextRequest, NextResponse } from 'next/server';

const TOKEN_KEYS = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
} as const;

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((route) => currentPath.startsWith(route));

  const accessToken = request.cookies.get(TOKEN_KEYS.accessToken)?.value;
  const refreshToken = request.cookies.get(TOKEN_KEYS.refreshToken)?.value;

  const nextRedirect = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl));

  if (!accessToken && isProtectedRoute) {
    return nextRedirect('/sign-in');
  }

  if (accessToken) {
    try {
      const response = await fetch(new URL('/api/auth/check', request.url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      const data = await response.json();

      if (!data.isAuthenticated) {
        if (isProtectedRoute) {
          return nextRedirect('/sign-in');
        }
        return NextResponse.next();
      }

      // Handle token refresh if new tokens were provided
      if (data.tokens) {
        const response = NextResponse.next();

        response.cookies.set({
          name: TOKEN_KEYS.accessToken,
          value: data.tokens.accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 24 * 60 * 60, // 1 day in seconds
          sameSite: 'lax',
        });

        response.cookies.set({
          name: TOKEN_KEYS.refreshToken,
          value: data.tokens.refreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 24 * 60 * 60, // 1 day in seconds
          sameSite: 'lax',
        });

        return response;
      }

      // Handle authenticated user redirects
      if (isProtectedRoute && !data.user?.email) {
        return nextRedirect('/sign-in');
      }

      if (!isProtectedRoute && data.user?.email) {
        return nextRedirect('/dashboard');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (isProtectedRoute) {
        return nextRedirect('/sign-in');
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
