'use server';

import { z } from 'zod';

import { request } from '@/lib/request';

import { TReportSchema } from './schema';

const baseUrl = process.env.API_BASE_URL;

export const getCachedTokenReport = async () => {
  return await request(`${baseUrl}/compliance/cached_report`).get({}, z.any());
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

type GenerateReportInput = {
  symbol: string;
  url: string;
};

export const generateReportAction = async (input: GenerateReportInput) => {
  return await request(`${baseUrl}/compliance/report/generate`).post(
    {
      body: input,
    },
    TReportSchema
  );
};

export const getReportStatusAction = async () => {
  return await request(`${baseUrl}/compliance/report/status`).post({}, TReportSchema);
};
