import { NextRequest, NextResponse } from 'next/server';

import { getUserAction, refreshTokenAction } from './server/actions';

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((route) => currentPath.startsWith(route));

  const token = request.cookies.get('access-token')?.value;

  const nextRedirect = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl));

  if (!token && isProtectedRoute) {
    return nextRedirect('/sign-in');
  }

  if (token) {
    try {
      console.log({ token });
      const user = await getUserAction();

      console.log({ user });

      if (isProtectedRoute && !user.email) {
        return nextRedirect('/sign-in');
      }

      if (!isProtectedRoute && user.email) {
        return nextRedirect('/dashboard');
      }
    } catch {
      try {
        console.log('refresh!!');
        const refresh = await refreshTokenAction();
        console.log({ refresh });

        if (refresh.access_token) {
          request.cookies.set('access-token', refresh.access_token);
        } else {
          return nextRedirect('/sign-in');
        }
      } catch {
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
