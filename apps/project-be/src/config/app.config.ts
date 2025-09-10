import { registerAs } from '@nestjs/config';

export const APP_CONFIG = registerAs('app', () => ({
  host: process.env.MS_HOST || 'localhost',
  port: parseInt(process.env.MS_PORT ?? '8080', 10),
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
}));
