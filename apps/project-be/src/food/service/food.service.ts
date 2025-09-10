import { Injectable } from '@nestjs/common';

import { FoodRepository } from '@/food/infra/food.repository';
import { FoodDto } from '../dto';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  findOneFood(id: number) {
    return this.foodRepository.findOneFood(id);
  }

  findFoods(query: FoodDto.Params) {
    return this.foodRepository.findFoods(query);
  }

  createFood(createFoodDto: FoodDto.Create) {
    return this.foodRepository.createFood(createFoodDto);
  }

  updateFood(id: number, updateFoodDto: FoodDto.Update) {
    return this.foodRepository.updateFood(id, updateFoodDto);
  }

  deleteFood(id: number) {
    return this.foodRepository.deleteFood(id);
  }
}
