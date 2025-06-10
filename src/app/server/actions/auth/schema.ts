import { z } from 'zod';

export const TAuthResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
});

export const TUser = z.object({
  id: z.number(),
  email: z.string(),
});
