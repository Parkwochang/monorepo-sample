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
// ! FOOD Utensils (도구)
// prettier-ignore

const CreateUntensilsSchema = z.object({
  name         : z.string(),
  description  : z.string(),
  imageUrl     : z.string(),
  ingredientId : z.number(),
  utensilId    : z.number(),
})

const UpdateUntensilsSchema = CreateUntensilsSchema.partial();

// prettier-ignore

const UntensilsParamsSchema = PaginationSchema.extend({
  id  : numericStringSchema.optional(),
  name: z.string().optional(),
});

// ----------------------------------------------------------------------

export namespace UntensilsDto {
  export class Create extends createZodDto(CreateUntensilsSchema) {
    static readonly schema = CreateUntensilsSchema;
  }

  export class Update extends createZodDto(UpdateUntensilsSchema) {
    static readonly schema = UpdateUntensilsSchema;
  }

  export class Params extends createZodDto(UntensilsParamsSchema) {
    static readonly schema = UntensilsParamsSchema;
  }
}
