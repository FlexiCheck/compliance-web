'use server';
import { cookies } from 'next/headers';

import { request } from '@/lib/request';

import { TAuthResponse, TRegisterResponse, TUser } from './schema';

enum TokenKeys {
  accessToken = 'access-token',
}

const duration = 24 * 60 * 60 * 1000;
const baseUrl = process.env.API_BASE_URL;

export const setCookieAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: TokenKeys.accessToken,
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + duration),
  });
};

export const removeAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TokenKeys.accessToken);
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
    TRegisterResponse
  );
};

export const getUserAction = async () => {
  return await request(`${baseUrl}/auth/me`).get({}, TUser);
};

export const refreshTokenAction = async () => {
  return await request(`${baseUrl}/auth/refresh`).post(
    {
      withoutAuth: true,
    },
    TAuthResponse
  );
};

export const logoutAction = async () => {
  return await request(`${baseUrl}/auth/logout`).post({});
};
