import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { APP_CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigType<typeof APP_CONFIG>>(APP_CONFIG.KEY);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(cookieParser());

  // app.useGlobalPipes(new ZodValidationPipe());
  // app.use(helmet());

  await app.listen(config.port);

  Logger.log(process.env.NODE_ENV, 'Project-NODE_ENV');

  Logger.log(`🚀 Application is running on: TCP ${JSON.stringify(config)}`, 'bootstrap-msa');
}
bootstrap();

// const config = new ConfigService();
// const options = config.get('service').options;
