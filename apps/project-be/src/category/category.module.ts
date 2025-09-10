import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/db/db.module';
import { FoodIngredientService, FoodUtensilsService } from './service';
import { IngredientController, UtensilsController } from './category.controller';
import { FoodIngredientRepository, FoodUtensilsRepository } from './infra';

@Module({
  imports: [DatabaseModule],
  controllers: [IngredientController, UtensilsController],
  providers: [FoodIngredientService, FoodUtensilsService, FoodIngredientRepository, FoodUtensilsRepository],
})
export class CategoryModule {}
