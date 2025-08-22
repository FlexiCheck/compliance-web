// src/components/auth/AuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/sign-in',
}: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setIsAuthenticated(false);
        if (requireAuth) {
          router.push(redirectTo);
        }
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          // If authenticated user is on auth pages, redirect to dashboard
          if (!requireAuth && window.location.pathname.startsWith('/sign-in')) {
            router.push('/dashboard');
          }
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsAuthenticated(false);
          if (requireAuth) {
            router.push(redirectTo);
          }
        }
      } catch (error) {
        console.error('Auth validation failed:', error);
        setIsAuthenticated(false);
        if (requireAuth) {
          router.push(redirectTo);
        }
      }
    };

    validateToken();
  }, [router, requireAuth, redirectTo]);

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Don't render children if auth is required but user isn't authenticated
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
