// src/config/config.ts

import { z } from "zod";

import { resolveEnv } from "@utils/resolveEnv.js";

// TODO: Initial check for essential database environment variables
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME ||
  !process.env.DB_PORT
) {
  console.error(
    "❌ تنظیمات دیتابیس ناقص است. لطفاً فایل .env مناسب را بررسی کنید."
  );
  process.exit(1);
}

type AppConfig = {
  env: "development" | "production" | "test";
  db: {
    host: string;
    user: string;
    pass: string;
    name: string;
    port: number;
  };
  server: {
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
};

const envSchema = z.object({
  JWT_EXPIRES_IN: z.enum(["1h", "1d", "7d", "30m"]).default("1d"),
  JWT_REFRESH_EXPIRES_IN: z.enum(["1h", "1d", "7d", "30m"]).default("7d"),
  JWT_REFRESH_SECRET: z.string().min(10).default("default_refresh_secret"),
});

const parsedEnv = envSchema.parse(process.env);

const config = {
  env: resolveEnv(process.env.NODE_ENV),

  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
  },

  server: {
    port: parseInt(process.env.PORT ?? "3000", 10),
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? "default_secret",
    expiresIn: parsedEnv.JWT_EXPIRES_IN,
    refreshSecret: parsedEnv.JWT_REFRESH_SECRET,
    refreshExpiresIn: parsedEnv.JWT_REFRESH_EXPIRES_IN,
  },
} satisfies AppConfig;

export default config;
