import { Injectable } from '@nestjs/common';

import { FoodOptionRepository } from '@/food/infra/food-option.repository';
import { PrismaService } from '@/db/service/prisma.service';
// import { RedisService } from '@/db/service';
import { FoodOptionDto } from '../dto';

@Injectable()
export class FoodOptionService {
  constructor(
    private readonly foodOptionRepository: FoodOptionRepository,
    private readonly prisma: PrismaService,
    // private readonly redis: RedisService,
  ) {}

  findOneFoodOption(id: number) {
    return this.foodOptionRepository.findOneFoodOption(id);
  }

  async findFoodOptions(query: FoodOptionDto.Params) {
    return this.prisma.$transaction(async (tx) => {
      return this.foodOptionRepository.findFoodOptions(query, tx);

      // return tx.$queryRaw`
      // SELECT *
      // FROM "Food_Option"
      // WHERE "id" = ${query}
      // FOR UPDATE
      // `;
    });
  }

  createFoodOption(createFoodOptionDto: FoodOptionDto.Create) {
    return this.foodOptionRepository.createFoodOption(createFoodOptionDto);
  }

  updateFoodOption(id: number, updateFoodOptionDto: FoodOptionDto.Update) {
    return this.foodOptionRepository.updateFoodOption(id, updateFoodOptionDto);
  }

  deleteFoodOption(id: number) {
    return this.foodOptionRepository.deleteFoodOption(id);
  }
}
