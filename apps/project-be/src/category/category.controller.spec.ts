import { Test, TestingModule } from '@nestjs/testing';
import { IngredientController, UtensilsController } from './category.controller';
import { FoodIngredientService, FoodUtensilsService } from './service';

describe('IngredientController', () => {
  let controller: IngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [FoodIngredientService],
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('UtensilsController', () => {
  let controller: UtensilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtensilsController],
      providers: [FoodUtensilsService],
    }).compile();

    controller = module.get<UtensilsController>(UtensilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
