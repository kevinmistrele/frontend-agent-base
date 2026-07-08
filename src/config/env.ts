import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().default('https://example.test'),
});

export const env = envSchema.parse(import.meta.env);
