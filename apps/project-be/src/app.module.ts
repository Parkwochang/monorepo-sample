import { Module } from '@nestjs/common';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_CONFIG, DB_CONFIG, REDIS_CONFIG, validate } from './config';
import { FoodModule } from './food/food.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [APP_CONFIG, DB_CONFIG, REDIS_CONFIG],
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate,
    }),
    FoodModule,
    CategoryModule,
    RouterModule.register([
      {
        path: 'v1',
        module: FoodModule,
      },
      {
        path: 'v1',
        module: CategoryModule,
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
