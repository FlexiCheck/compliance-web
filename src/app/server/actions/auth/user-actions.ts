'use server';

import 'server-only';

import { TOKEN_KEYS } from '@/lib/cookies';
import { request } from '@/lib/request';

import { setCookieToken } from './action';
import { TAuthResponse, TUser } from './schema';
const baseUrl = process.env.API_BASE_URL;

export const getUserAction = async () => {
  const response = await request(`${baseUrl}/auth/me`).get({}, TUser);
  console.log('getUserAction: ', { response });

  return response;
};

export const refreshTokenAction = async (refreshToken?: string) => {
  const headers = new Headers();

  headers.set('Authorization', `Bearer ${refreshToken}`);

  const response = await request(`${baseUrl}/auth/refresh`).post(
    {
      withoutAuth: true,
      headers,
    },
    TAuthResponse
  );

  if (response.access_token && response.refresh_token) {
    await setCookieToken(TOKEN_KEYS.accessToken, response.access_token);
    await setCookieToken(TOKEN_KEYS.refreshToken, response.refresh_token);
  }

  return response;
};
