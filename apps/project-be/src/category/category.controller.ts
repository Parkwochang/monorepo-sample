import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoodIngredientService, FoodUtensilsService } from './service';
import { UntensilsDto, IngredientDto } from './dto';

// ----------------------------------------------------------------------
// ! 도구

@Controller('utensils')
export class UtensilsController {
  constructor(private readonly foodUtensilsService: FoodUtensilsService) {}

  @Post()
  create(@Body() createUntensilsDto: UntensilsDto.Create) {
    return this.foodUtensilsService.createFoodUtensils(createUntensilsDto);
  }

  @Get()
  findAll(@Query() query: UntensilsDto.Params) {
    return this.foodUtensilsService.findFoodUtensils(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodUtensilsService.findOneFoodUtensils(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UntensilsDto.Update) {
    return this.foodUtensilsService.updateFoodUtensils(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodUtensilsService.deleteFoodUtensils(+id);
  }
}

// ----------------------------------------------------------------------
// ! 재료

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly foodIngredientService: FoodIngredientService) {}

  @Post()
  create(@Body() createIngredientDto: IngredientDto.Create) {
    return this.foodIngredientService.createFoodIngredient(createIngredientDto);
  }

  @Get()
  findAll(@Query() query: IngredientDto.Params) {
    return this.foodIngredientService.findFoodIngredients(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodIngredientService.findOneFoodIngredient(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientDto: IngredientDto.Update) {
    return this.foodIngredientService.updateFoodIngredient(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodIngredientService.deleteFoodIngredient(+id);
  }
}
