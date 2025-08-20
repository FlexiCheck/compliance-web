// 'use server';

// import { NextRequest, NextResponse } from 'next/server';

// const TOKEN_KEYS = {
//   accessToken: 'access-token',
//   refreshToken: 'refresh-token',
// } as const;

// export async function middleware(request: NextRequest) {
//   const protectedRoutes = ['/dashboard'];
//   const currentPath = request.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.find((route) => currentPath.startsWith(route));

//   const accessToken = request.cookies.get(TOKEN_KEYS.accessToken)?.value;
//   const refreshToken = request.cookies.get(TOKEN_KEYS.refreshToken)?.value;

//   const nextRedirect = (path: string) => NextResponse.redirect(new URL(path, request.nextUrl));

//   if (!accessToken && isProtectedRoute) {
//     return nextRedirect('/sign-in');
//   }

//   if (accessToken) {
//     try {
//       const response = await fetch(new URL('/api/auth/check', request.url), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ accessToken, refreshToken }),
//       });

//       const data = await response.json();

//       if (!data.isAuthenticated) {
//         if (isProtectedRoute) {
//           return nextRedirect('/sign-in');
//         }
//         return NextResponse.next();
//       }

//       // Handle token refresh if new tokens were provided
//       if (data.tokens) {
//         const response = NextResponse.next();

//         response.cookies.set({
//           name: TOKEN_KEYS.accessToken,
//           value: data.tokens.accessToken,
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'production',
//           path: '/',
//           maxAge: 24 * 60 * 60, // 1 day in seconds
//           sameSite: 'lax',
//         });

//         response.cookies.set({
//           name: TOKEN_KEYS.refreshToken,
//           value: data.tokens.refreshToken,
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'production',
//           path: '/',
//           maxAge: 24 * 60 * 60, // 1 day in seconds
//           sameSite: 'lax',
//         });

//         return response;
//       }

//       // Handle authenticated user redirects
//       if (isProtectedRoute && !data.user?.email) {
//         return nextRedirect('/sign-in');
//       }

//       if (!isProtectedRoute && data.user?.email) {
//         return nextRedirect('/dashboard');
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       if (isProtectedRoute) {
//         return nextRedirect('/sign-in');
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };

// in src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

const TOKEN_KEYS = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
} as const;

const protectedRoutes = ['/dummy'];

export async function middleware(request: NextRequest) {
  console.log('--- Middleware running for path:', request.nextUrl.pathname);
  console.log('All cookies on this request:', request.cookies.getAll());

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(TOKEN_KEYS.accessToken)?.value;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  console.log(isProtectedRoute, 'isProtectedRouteisProtectedRoute');
  // --- CASE 1: No Access Token ---
  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // --- CASE 2: Access Token Exists ---
  if (accessToken) {
    // --- THIS IS THE UPDATED LINE ---
    const validationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`;
    // --- END OF UPDATE ---

    try {
      const response = await fetch(validationUrl, {
        method: 'GET', // This is likely GET for a '/users/me' endpoint
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (isProtectedRoute) {
          const redirectResponse = NextResponse.redirect(new URL('/sign-in', request.url));
          redirectResponse.cookies.delete(TOKEN_KEYS.accessToken);
          redirectResponse.cookies.delete(TOKEN_KEYS.refreshToken);
          return redirectResponse;
        }
        return NextResponse.next();
      }

      const data = await response.json();

      // This token refresh logic is likely handled by your backend now,
      // but we can keep it in case it's needed.
      if (data.tokens) {
        // ... (This logic remains the same, no changes needed)
      }

      const isPublicAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
      console.log(isPublicAuthRoute, 'isPublicAuthRoute');
      if (isPublicAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Middleware validation error:', error);
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
