import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getUserAction, refreshTokenAction } from './server/actions';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const protectedRoutes = ['/dashboard'];
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.find((route) => currentPath.startsWith(route));

  // const token = request.cookies.get('access-token')?.value;
  const token = cookieStore.get('access-token')?.value;

  console.log({ token });

  const nextRedirect = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl));

  if (!token && isProtectedRoute) {
    return nextRedirect('/sign-in');
  }

  if (token) {
    try {
      const user = await getUserAction();

      if (isProtectedRoute && !user.email) {
        return nextRedirect('/sign-in');
      }

      if (!isProtectedRoute && user.email) {
        return nextRedirect('/dashboard');
      }
    } catch {
      try {
        const refresh = await refreshTokenAction();

        if (refresh.access_token) {
          cookieStore.set('access-token', refresh.access_token);
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
