'use server';
import { cookies } from 'next/headers';

import { request } from '@/lib/request';

import { TAuthResponse, TUser } from './schema';

enum TokenKeys {
  accessToken = 'access-token',
  refreshToken = 'refresh-token',
}

const duration = 24 * 60 * 60 * 1000;
const baseUrl = process.env.API_BASE_URL;

export const setCookieTokens = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + duration),
    maxAge: Math.floor(duration / 1000),
  } as const;

  cookieStore.set({
    name: TokenKeys.accessToken,
    value: accessToken,
    ...cookieOptions,
  });

  cookieStore.set({
    name: TokenKeys.refreshToken,
    value: refreshToken,
    ...cookieOptions,
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
  return await request(`${baseUrl}/auth/login`).post(
    {
      body: input,
      withoutAuth: true,
    },
    TAuthResponse
  );
};

export const registerAction = async (input: AuthActionInput) => {
  return await request(`${baseUrl}/auth/register`).post(
    {
      body: input,
      withoutAuth: true,
    },
    TAuthResponse
  );
};

export const getUserAction = async () => {
  return await request(`${baseUrl}/auth/me`).get({}, TUser);
};

export const refreshTokenAction = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(TokenKeys.refreshToken)?.value;
  const headers = new Headers();

  headers.set('Authorization', `Bearer ${refreshToken}`);

  return await request(`${baseUrl}/auth/refresh`).post(
    {
      withoutAuth: true,
      headers,
    },
    TAuthResponse
  );
};

export const logoutAction = async () => {
  return await request(`${baseUrl}/auth/logout`).post({});
};
