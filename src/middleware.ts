import { NextRequest, NextResponse } from 'next/server';

import { getUserAction, refreshTokenAction } from './server/actions';

const TOKEN_KEYS = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
} as const;

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((route) => currentPath.startsWith(route));

  const accessToken = request.cookies.get(TOKEN_KEYS.accessToken)?.value;

  const nextRedirect = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl));

  if (!accessToken && isProtectedRoute) {
    return nextRedirect('/sign-in');
  }

  if (accessToken) {
    try {
      const user = await getUserAction();
      console.log({ user });

      if (isProtectedRoute && !user?.email) {
        return nextRedirect('/sign-in');
      }

      if (!isProtectedRoute && user?.email) {
        return nextRedirect('/dashboard');
      }
    } catch (error) {
      console.log('getUserAction error: ', { error });
      try {
        const refresh = await refreshTokenAction();
        console.log({ refresh });

        if (refresh.access_token && refresh.refresh_token) {
          const response = NextResponse.next();

          // Set both tokens
          response.cookies.set({
            name: TOKEN_KEYS.accessToken,
            value: refresh.access_token,
            httpOnly: false,
            secure: false,
            // secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 24 * 60 * 60, // 1 day in seconds
            sameSite: 'lax',
          });

          response.cookies.set({
            name: TOKEN_KEYS.refreshToken,
            value: refresh.refresh_token,
            httpOnly: false,
            secure: false,
            // secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 24 * 60 * 60, // 1 day in seconds
            sameSite: 'lax',
          });

          return response;
        } else {
          return nextRedirect('/sign-in');
        }
      } catch (error) {
        console.log('refreshTokenAction error: ', { error });
        if (isProtectedRoute) {
          return nextRedirect('/sign-in');
        }
      }

      return NextResponse.next();
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
