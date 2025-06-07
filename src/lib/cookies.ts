import Cookies from 'js-cookie';

export const TOKEN_KEYS = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
} as const;

const COOKIE_OPTIONS = {
  expires: 1, // 1 day
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set(TOKEN_KEYS.accessToken, accessToken, COOKIE_OPTIONS);
  Cookies.set(TOKEN_KEYS.refreshToken, refreshToken, COOKIE_OPTIONS);
};

export const removeAuthCookies = () => {
  Cookies.remove(TOKEN_KEYS.accessToken, { path: '/' });
  Cookies.remove(TOKEN_KEYS.refreshToken, { path: '/' });
};

export const getAuthTokens = () => {
  return {
    accessToken: Cookies.get(TOKEN_KEYS.accessToken),
    refreshToken: Cookies.get(TOKEN_KEYS.refreshToken),
  };
};
