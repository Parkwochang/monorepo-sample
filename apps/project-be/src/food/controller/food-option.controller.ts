import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { FoodOptionService } from '../service';
import { FoodOptionDto } from '../dto';

@Controller('food-option')
export class FoodOptionController {
  constructor(private readonly foodOptionService: FoodOptionService) {}

  @Get()
  findFoodOptions(@Query() query: FoodOptionDto.Params) {
    return this.foodOptionService.findFoodOptions(query);
  }

  @Get(':id')
  findOneFoodOption(@Param('id') id: string) {
    return this.foodOptionService.findOneFoodOption(Number(id));
  }

  @Post()
  createFoodOption(@Body() createFoodOptionDto: FoodOptionDto.Create) {
    return this.foodOptionService.createFoodOption(createFoodOptionDto);
  }

  @Patch(':id')
  updateFoodOption(@Param('id') id: string, @Body() updateFoodOptionDto: FoodOptionDto.Update) {
    return this.foodOptionService.updateFoodOption(Number(id), updateFoodOptionDto);
  }

  @Delete(':id')
  deleteFoodOption(@Param('id') id: string) {
    return this.foodOptionService.deleteFoodOption(Number(id));
  }
}
