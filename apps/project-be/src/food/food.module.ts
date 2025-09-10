import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/db/db.module';
import { FoodService, FoodOptionService } from './service';
import { FoodController, FoodOptionController } from './controller';
import { FoodOptionRepository, FoodRepository } from './infra';

@Module({
  imports: [DatabaseModule],
  controllers: [FoodController, FoodOptionController],
  providers: [FoodService, FoodOptionService, FoodRepository, FoodOptionRepository],
})
export class FoodModule {}
