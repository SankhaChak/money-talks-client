import { z } from "zod";

const clientEnvSchema = z.object({
  ALCHEMY_API_KEY: z.string().min(1),
  WALLET_CONNECT_PROJECT_ID: z.string().min(1),
  RAINBOWKIT_APP_NAME: z.string().min(1),
});

export const clientEnv = clientEnvSchema.parse({
  ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  RAINBOWKIT_APP_NAME: process.env.NEXT_PUBLIC_RAINBOWKIT_APP_NAME,
});
