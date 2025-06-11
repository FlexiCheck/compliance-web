import { NextRequest, NextResponse } from 'next/server';

import { getUserAction, refreshTokenAction } from '@/app/server/actions';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    try {
      const user = await getUserAction();

      if (!user?.email) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
      }

      return NextResponse.json({ isAuthenticated: true, user });
    } catch (error) {
      console.log('Error in routes POST', { error });
      // Try to refresh the token
      if (refreshToken) {
        try {
          const refresh = await refreshTokenAction(refreshToken);

          if (refresh.access_token && refresh.refresh_token) {
            return NextResponse.json({
              isAuthenticated: true,
              tokens: {
                accessToken: refresh.access_token,
                refreshToken: refresh.refresh_token,
              },
            });
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }

      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
