import { z } from 'zod';
export const envSchema = z.object({
  OPEN_AI_API_KEY: z.string(),
  COHERE_API_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
