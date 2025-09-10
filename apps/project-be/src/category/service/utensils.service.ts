import { Injectable } from '@nestjs/common';

import { FoodUtensilsRepository } from '@/category/infra';
import { PrismaService } from '@/db/service/prisma.service';
// import { RedisService } from '@/db/service';
import { UntensilsDto } from '../dto';

@Injectable()
export class FoodUtensilsService {
  constructor(
    private readonly foodUtensilsRepository: FoodUtensilsRepository,
    private readonly prisma: PrismaService,
    // private readonly redis: RedisService,
  ) {}

  findOneFoodUtensils(id: number) {
    return this.foodUtensilsRepository.findOneFoodUtensils(id);
  }

  async findFoodUtensils(query: UntensilsDto.Params) {
    return this.prisma.$transaction(async (tx) => {
      return this.foodUtensilsRepository.findFoodUtensils(query, tx);
    });
  }

  createFoodUtensils(createFoodUtensilsDto: UntensilsDto.Create) {
    return this.foodUtensilsRepository.createFoodUtensils(createFoodUtensilsDto);
  }

  updateFoodUtensils(id: number, updateFoodUtensilsDto: UntensilsDto.Update) {
    return this.foodUtensilsRepository.updateFoodUtensils(id, updateFoodUtensilsDto);
  }

  deleteFoodUtensils(id: number) {
    return this.foodUtensilsRepository.deleteFoodUtensils(id);
  }
}
