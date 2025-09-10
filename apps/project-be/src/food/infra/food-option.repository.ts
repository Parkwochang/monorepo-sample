import { Injectable, Logger } from '@nestjs/common';
import type { Prisma, FoodOption, Food } from '@prisma/client';

import { PrismaService } from '@/db/service/prisma.service';
import { FoodOptionDto } from '../dto';
import { ZodSerializerDto } from 'nestjs-zod';

interface IFoodOptionRepository {
  findOneFoodOption(id: number): Promise<FoodOption | null>;
  findFoodOptions(parmas: FoodOptionDto.Params): Promise<FoodOption[]>;
  createFoodOption(foodOption: FoodOptionDto.Create): Promise<FoodOption>;
  updateFoodOption(id: number, foodOption: FoodOptionDto.Update): Promise<FoodOption>;
  deleteFoodOption(id: number): Promise<FoodOption>;
}

@Injectable()
export class FoodOptionRepository implements IFoodOptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneFoodOption(id: number) {
    return this.prisma.foodOption.findUnique({
      where: { id, isDeleted: false },
    });
  }

  // @ZodSerializerDto(FoodOptionDto.Params)
  async findFoodOptions(parmas: FoodOptionDto.Params, tx: Prisma.TransactionClient = this.prisma) {
    const { page, take, ...where } = /* parmas; */ FoodOptionDto.Params.transform(parmas);

    Logger.log(parmas, page, take);

    const data = await tx.foodOption.findMany({
      orderBy: { id: 'desc' },
      skip: (page - 1) * take,
      take,
      where,
    });
    Logger.log(data);
    return data;
  }

  async createFoodOption(data: FoodOptionDto.Create): Promise<FoodOption> {
    return this.prisma.foodOption.create({ data });
  }

  async updateFoodOption(id: number, data: FoodOptionDto.Update): Promise<FoodOption> {
    return this.prisma.foodOption.update({
      where: { id },
      data,
    });
  }

  async deleteFoodOption(id: number): Promise<FoodOption> {
    return this.prisma.foodOption.delete({
      where: { id },
    });
  }
}

function MyDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // 원본 메소드 저장

  descriptor.value = async function (...args: any[]) {
    // ✨ BEFORE - 원본 메소드 실행 전
    console.log('메소드 실행 전 로직', args);

    // 🎯 원본 메소드 실행
    const result = await originalMethod.apply(this, args);

    // ✨ AFTER - 원본 메소드 실행 후
    console.log('메소드 실행 후 로직', result);

    return result;
  };
}
