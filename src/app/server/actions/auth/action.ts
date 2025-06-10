'use server';
import { cookies } from 'next/headers';

import { request } from '@/lib/request';

import { TAuthResponse } from './schema';

enum TokenKeys {
  accessToken = 'access-token',
  refreshToken = 'refresh-token',
}

const duration = 24 * 60 * 60 * 1000;
const baseUrl = process.env.API_BASE_URL;

export const setCookieToken = async (token: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(token, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: Math.floor(duration / 1000),
  });
};

export const removeTokenCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TokenKeys.accessToken);
  cookieStore.delete(TokenKeys.refreshToken);
};

type AuthActionInput = {
  email: string;
  password: string;
};

export const loginAction = async (input: AuthActionInput) => {
  const response = await request(`${baseUrl}/auth/login`).post(
    {
      body: input,
      withoutAuth: true,
    },
    TAuthResponse
  );

  if (response.access_token && response.refresh_token) {
    await setCookieToken(TokenKeys.accessToken, response.access_token);
    await setCookieToken(TokenKeys.refreshToken, response.refresh_token);
  }

  return response;
};

export const registerAction = async (input: AuthActionInput) => {
  const response = await request(`${baseUrl}/auth/register`).post(
    {
      body: input,
      withoutAuth: true,
    },
    TAuthResponse
  );

  if (response.access_token && response.refresh_token) {
    await setCookieToken(TokenKeys.accessToken, response.access_token);
    await setCookieToken(TokenKeys.refreshToken, response.refresh_token);
  }

  return response;
};

// export const getUserAction = async () => {
//   const response = await request(`${baseUrl}/auth/me`).get({}, TUser);
//   console.log('getUserAction: ', { response });

//   return response;
// };

// export const refreshTokenAction = async () => {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get(TokenKeys.refreshToken)?.value;
//   const headers = new Headers();

//   headers.set('Authorization', `Bearer ${refreshToken}`);

//   const response = await request(`${baseUrl}/auth/refresh`).post(
//     {
//       withoutAuth: true,
//       headers,
//     },
//     TAuthResponse
//   );

//   if (response.access_token && response.refresh_token) {
//     await setCookieToken(TokenKeys.accessToken, response.access_token);
//     await setCookieToken(TokenKeys.refreshToken, response.refresh_token);
//   }

//   return response;
// };

export const logoutAction = async () => {
  await removeTokenCookies();
  return await request(`${baseUrl}/auth/logout`).post({});
};
