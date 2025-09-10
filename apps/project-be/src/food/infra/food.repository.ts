import { Injectable } from '@nestjs/common';
import type { Prisma, Food } from '@prisma/client';

import { PrismaService } from '@/db/service/prisma.service';
import { FoodDto } from '../dto';

interface IFoodRepository {
  findFoods(parmas?: FoodDto.Params): Promise<Food[]>;
  createFood(food: FoodDto.Create): Promise<Food>;
  updateFood(id: number, food: FoodDto.Update): Promise<Food>;
  deleteFood(id: number): Promise<Food>;
}

@Injectable()
export class FoodRepository implements IFoodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneFood(id: number, tx: Prisma.TransactionClient = this.prisma) {
    return tx.food.findUnique({ where: { id } });
  }

  async findFoods(parmas: FoodDto.Params, tx: Prisma.TransactionClient = this.prisma) {
    const { page, take, ...rest } = parmas;

    const data = await tx.food.findMany({
      orderBy: { id: 'desc' },
      skip: page * take,
      take,
      where: {
        ...rest,
      },
    });

    return data;
  }

  async createFood(data: FoodDto.Create): Promise<Food> {
    return this.prisma.food.create({ data });
  }

  async updateFood(id: number, data: FoodDto.Update): Promise<Food> {
    return this.prisma.food.update({
      where: { id },
      data,
    });
  }

  async deleteFood(id: number): Promise<Food> {
    return this.prisma.food.delete({ where: { id } });
  }
}
