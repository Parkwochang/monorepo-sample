import { Injectable } from '@nestjs/common';

import { FoodIngredientRepository } from '@/category/infra';
import { PrismaService } from '@/db/service/prisma.service';
// import { RedisService } from '@/db/service';
import { IngredientDto } from '../dto';

@Injectable()
export class FoodIngredientService {
  constructor(
    private readonly foodIngredientRepository: FoodIngredientRepository,
    private readonly prisma: PrismaService,
    // private readonly redis: RedisService,
  ) {}

  findOneFoodIngredient(id: number) {
    return this.foodIngredientRepository.findOneFoodIngredient(id);
  }

  async findFoodIngredients(query: IngredientDto.Params) {
    return this.prisma.$transaction(async (tx) => {
      return this.foodIngredientRepository.findFoodIngredients(query, tx);

      // return tx.$queryRaw`
      // SELECT *
      // FROM "Food_Ingredient"
      // WHERE "id" = ${query}
      // FOR UPDATE
      // `;
    });
  }

  createFoodIngredient(createFoodIngredientDto: IngredientDto.Create) {
    return this.foodIngredientRepository.createFoodIngredient(createFoodIngredientDto);
  }

  updateFoodIngredient(id: number, updateFoodIngredientDto: IngredientDto.Update) {
    return this.foodIngredientRepository.updateFoodIngredient(id, updateFoodIngredientDto);
  }

  deleteFoodIngredient(id: number) {
    return this.foodIngredientRepository.deleteFoodIngredient(id);
  }
}
