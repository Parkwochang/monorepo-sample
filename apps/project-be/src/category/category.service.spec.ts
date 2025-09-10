import { Test, TestingModule } from '@nestjs/testing';
import { FoodIngredientService, FoodUtensilsService } from './service';

describe('FoodIngredientService', () => {
  let service: FoodIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodIngredientService],
    }).compile();

    service = module.get<FoodIngredientService>(FoodIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('FoodUtensilsService', () => {
  let service: FoodUtensilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodUtensilsService],
    }).compile();

    service = module.get<FoodUtensilsService>(FoodUtensilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
