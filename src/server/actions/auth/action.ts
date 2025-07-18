'use server';
import { cookies } from 'next/headers';

import { request } from '@/lib/request';

import { TAuthResponse, TMessageResponse, TUser } from './schema';

enum TokenKeys {
  accessToken = 'access-token',
  refreshToken = 'refresh-token',
  initiateToken = 'initiate-token',
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

export const resendVerificationLinkAction = async ({ email }: { email: string }) => {
  const query = new URLSearchParams();

  query.set('email', email);

  return await request(`${baseUrl}/auth/resend`).get(
    {
      query,
      withoutAuth: true,
    },
    TMessageResponse
  );
};

export const registerAction = async (input: AuthActionInput) => {
  return await request(`${baseUrl}/auth/register`).post(
    {
      body: input,
      withoutAuth: true,
    },
    TMessageResponse
  );
};

export const getUserAction = async () => {
  return await request(`${baseUrl}/auth/me`).get({}, TUser);
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
    await setCookieToken(TokenKeys.accessToken, response.access_token);
    await setCookieToken(TokenKeys.refreshToken, response.refresh_token);
  }

  return response;
};

export const logoutAction = async () => {
  await removeTokenCookies();
  return await request(`${baseUrl}/auth/logout`).post({});
};
