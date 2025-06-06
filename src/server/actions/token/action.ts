'use server';

import { request } from '@/lib/request';
const baseUrl = process.env.API_BASE_URL;

export const getCachedTokenReport = async () => {
  return await request(`${baseUrl}/compliance/cached_report`).get({});
};

type ScanTokenInput = {
  symbol: string;
  url: string;
};

export const scanToken = async (input: ScanTokenInput) => {
  return await request(`${baseUrl}/compliance/report`).post({
    body: input,
  });
};
