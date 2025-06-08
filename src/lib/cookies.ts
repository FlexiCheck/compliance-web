import { cookies } from 'next/headers';

export const TOKEN_KEYS = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
} as const;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  path: '/',
  maxAge: 24 * 60 * 60, // 1 day in seconds
} as const;

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: TOKEN_KEYS.accessToken,
    value: accessToken,
    ...COOKIE_OPTIONS,
  });

  cookieStore.set({
    name: TOKEN_KEYS.refreshToken,
    value: refreshToken,
    ...COOKIE_OPTIONS,
  });
};

export const removeAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEYS.accessToken);
  cookieStore.delete(TOKEN_KEYS.refreshToken);
};

export const getAuthTokens = async () => {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(TOKEN_KEYS.accessToken)?.value,
    refreshToken: cookieStore.get(TOKEN_KEYS.refreshToken)?.value,
  };
};
