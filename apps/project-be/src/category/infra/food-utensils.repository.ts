import { Body, Injectable } from '@nestjs/common';
import type { Prisma, FoodUtensils } from '@prisma/client';

import { PrismaService } from '@/db/service/prisma.service';
import { UntensilsDto } from '../dto';

interface IFoodUtensilsRepository {
  findOneFoodUtensils(id: number): Promise<FoodUtensils | null>;
  findFoodUtensils(parmas: UntensilsDto.Params): Promise<FoodUtensils[]>;
  createFoodUtensils(foodUtensils: UntensilsDto.Create): Promise<FoodUtensils>;
  updateFoodUtensils(id: number, foodUtensils: UntensilsDto.Update): Promise<FoodUtensils>;
  deleteFoodUtensils(id: number): Promise<FoodUtensils>;
}

@Injectable()
export class FoodUtensilsRepository implements IFoodUtensilsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneFoodUtensils(id: number) {
    return this.prisma.foodUtensils.findUnique({
      where: { id, isDeleted: false },
    });
  }

  async findFoodUtensils(parmas: UntensilsDto.Params, tx: Prisma.TransactionClient = this.prisma) {
    const { page, take, ...where } = parmas;

    const data = await tx.foodUtensils.findMany({
      orderBy: { id: 'desc' },
      skip: (page - 1) * take,
      take,
      where,
    });

    return data;
  }

  async createFoodUtensils(@Body() data: UntensilsDto.Create): Promise<FoodUtensils> {
    return this.prisma.foodUtensils.create({ data });
  }

  async updateFoodUtensils(id: number, data: UntensilsDto.Update): Promise<FoodUtensils> {
    return this.prisma.foodUtensils.update({
      where: { id },
      data,
    });
  }

  async deleteFoodUtensils(id: number): Promise<FoodUtensils> {
    return this.prisma.foodUtensils.delete({
      where: { id },
    });
  }
}
