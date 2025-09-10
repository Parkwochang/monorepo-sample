import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { FoodService } from '../service';
import { FoodDto } from '../dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  findFoods(@Query() query: FoodDto.Params) {
    return this.foodService.findFoods(query);
  }

  @Get(':id')
  findOneFood(@Param('id') id: string) {
    return this.foodService.findOneFood(Number(id));
  }

  @Post()
  createFood(@Body() createFoodDto: FoodDto.Create) {
    return this.foodService.createFood(createFoodDto);
  }

  @Patch(':id')
  updateFood(@Param('id') id: string, @Body() updateFoodDto: FoodDto.Update) {
    return this.foodService.updateFood(Number(id), updateFoodDto);
  }

  @Delete(':id')
  deleteFood(@Param('id') id: string) {
    return this.foodService.deleteFood(Number(id));
  }
}
// function TestDi() {
//   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     console.log("TestDi :::", target, propertyKey, descriptor);
//     return descriptor;
//   };
// }
