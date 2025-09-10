import z from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

import { CaseTransformService } from '@/common/decorator';

// ----------------------------------------------------------------------

const PaginationSchema = z.object({
  page: z
    .string()
    .or(z.number())
    .optional()
    .transform((val) => (val ? Math.max(1, Number(val)) - 1 : 0)),
  take: z
    .string()
    .or(z.number())
    .optional()
    .transform((val) => (val ? Math.min(100, Math.max(1, Number(val))) : 10)),
  isActive: z.boolean().optional().default(true),
  isDeleted: z.boolean().optional().default(false),
});

const numericStringSchema = z
  .string()
  .regex(/^\d+$/, 'Must be a string containing only digits.')
  .or(z.number())
  .transform(Number);

// ----------------------------------------------------------------------
// ! FOOD
// prettier-ignore

const CreateFoodSchema = z.object({
  name         : z.string(),
  description  : z.string(),
  imageUrl     : z.string(),
  ingredientId : z.number(),
  utensilId    : z.number(),
})

// Update는 body에서 id를 받지 않음 (URL 파라미터에서 받음)
const UpdateFoodSchema = CreateFoodSchema.partial();

// ----------------------------------------------------------------------
// prettier-ignore

const FoodParamsSchema = PaginationSchema.extend({
  id           : numericStringSchema.optional(),
  ingredientId: numericStringSchema.optional(),
  name         : z.string().optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore
const CreateFoodOptionSchema = z.object({
  name         : z.string(),
  description  : z.string(),
  timer        : z.string(),
  imageUrl     : z.string(),
  foodId       : z.number(),
  utensilId    : z.number(),
  ingredientId : z.number(),
});

// Update는 body에서 id를 받지 않음 (URL 파라미터에서 받음)
const UpdateFoodOptionSchema = CreateFoodOptionSchema.partial();

// ----------------------------------------------------------------------
// ! FOOD OPTION
// prettier-ignore

const FoodOptionParamsSchema = PaginationSchema.extend({
  id           : numericStringSchema.optional(),
  foodId       : numericStringSchema.optional(),
  utensilId    : numericStringSchema.optional(),
  ingredientId : numericStringSchema.optional(),
  name         : z.string().optional(),
  timer        : z.string().optional(),
});

export namespace FoodDto {
  export class Create extends createZodDto(CreateFoodSchema) {}

  export class Update extends createZodDto(UpdateFoodSchema) {}

  export class Params extends createZodDto(FoodParamsSchema) {}
}

// ----------------------------------------------------------------------

export namespace FoodOptionDto {
  export class Create extends createZodDto(CreateFoodOptionSchema) {}

  export class Update extends createZodDto(UpdateFoodOptionSchema) {}

  export class Params extends createZodDto(FoodOptionParamsSchema) {
    static readonly transform = (data: any) => {
      // const validatedData = this.schema.parse(data);

      return new CaseTransformService().toSnakeCase(data);
    };
  }
}
