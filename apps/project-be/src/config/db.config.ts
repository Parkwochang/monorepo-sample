import { registerAs } from "@nestjs/config";

export const DB_CONFIG = registerAs("db", () => ({
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}));

export const REDIS_CONFIG = registerAs("redis", () => ({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
}));
