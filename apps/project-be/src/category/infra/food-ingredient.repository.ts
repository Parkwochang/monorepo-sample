import { Body, Injectable } from '@nestjs/common';
import type { Prisma, FoodIngredient } from '@prisma/client';

import { PrismaService } from '@/db/service/prisma.service';
import { IngredientDto } from '../dto';

interface IFoodIngredientRepository {
  findOneFoodIngredient(id: number): Promise<FoodIngredient | null>;
  findFoodIngredients(parmas: IngredientDto.Params): Promise<FoodIngredient[]>;
  createFoodIngredient(foodIngredient: IngredientDto.Create): Promise<FoodIngredient>;
  updateFoodIngredient(id: number, foodIngredient: IngredientDto.Update): Promise<FoodIngredient>;
  deleteFoodIngredient(id: number): Promise<FoodIngredient>;
}

@Injectable()
export class FoodIngredientRepository implements IFoodIngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneFoodIngredient(id: number) {
    return this.prisma.foodIngredient.findUnique({
      where: { id, isDeleted: false },
    });
  }

  async findFoodIngredients(parmas: IngredientDto.Params, tx: Prisma.TransactionClient = this.prisma) {
    const { page, take, ...where } = parmas;

    const data = await tx.foodIngredient.findMany({
      orderBy: { id: 'desc' },
      skip: (page - 1) * take,
      take,
      where,
    });

    return data;
  }

  async createFoodIngredient(@Body() data: IngredientDto.Create): Promise<FoodIngredient> {
    return this.prisma.foodIngredient.create({ data });
  }

  async updateFoodIngredient(id: number, data: IngredientDto.Update): Promise<FoodIngredient> {
    return this.prisma.foodIngredient.update({
      where: { id },
      data,
    });
  }

  async deleteFoodIngredient(id: number): Promise<FoodIngredient> {
    return this.prisma.foodIngredient.delete({
      where: { id },
    });
  }
}
