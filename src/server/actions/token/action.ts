'use server';

import { request } from '@/lib/request';
const baseUrl = process.env.API_BASE_URL;

export const getCachedToken = async () => {
  return await request(`${baseUrl}/cached`).post({});
};

type ScanTokenInput = {
  symbol: string;
  url: string;
};

export const scanToken = async (input: ScanTokenInput) => {
  return await request(`${baseUrl}/report`).post({
    body: input,
  });
};
