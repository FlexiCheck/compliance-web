import { z } from 'zod';

const TReportStatus = z.union([z.literal('processing'), z.literal('finished'), z.literal('error')]);

export const TReportSchema = z.object({
  status: TReportStatus,
});
