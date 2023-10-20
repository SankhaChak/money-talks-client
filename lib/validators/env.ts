import { z } from "zod";

const envSchema = z.object({
  //   NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
  //   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(1),
  //   NEXT_PUBLIC_RAINBOWKIT_APP_NAME: z.string().min(1),
});

export const env = envSchema.parse(process.env);
