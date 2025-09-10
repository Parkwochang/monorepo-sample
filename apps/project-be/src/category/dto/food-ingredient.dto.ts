import { createZodDto } from 'nestjs-zod/dto';
import z from 'zod';

const PaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, parseInt(val)) : 1)),
  take: z
    .string()
    .optional()
    .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val))) : 10)),
  isActive: z.boolean().optional().default(true),
  isDeleted: z.boolean().optional().default(false),
});

const numericStringSchema = z.string().regex(/^\d+$/, 'Must be a string containing only digits.').transform(Number);

// ----------------------------------------------------------------------
// ! FOOD INGREDIENT (재료)
// prettier-ignore

const CreateIngredientSchema = z.object({
  name         : z.string(),
  description  : z.string(),
  imageUrl     : z.string(),
  ingredientId : z.number(),
  utensilId    : z.number(),
})

const UpdateIngredientSchema = CreateIngredientSchema.partial();

// prettier-ignore

const IngredientParamsSchema = PaginationSchema.extend({
  id  : numericStringSchema.optional(),
  name: z.string().optional(),
});

// ----------------------------------------------------------------------

export namespace IngredientDto {
  export class Create extends createZodDto(CreateIngredientSchema) {
    static readonly schema = CreateIngredientSchema;
  }

  export class Update extends createZodDto(UpdateIngredientSchema) {
    static readonly schema = UpdateIngredientSchema;
  }

  export class Params extends createZodDto(IngredientParamsSchema) {
    static readonly schema = IngredientParamsSchema;
  }
}
