import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore
const CategoryResDto = z.object({
  id          : z.number(),
  categoryCode: z.string(),
  categoryName: z.string(),
  description : z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore
const CategoryDetailResDto = z.object({
  title            : z.string(),
  description      : z.string(),
  descriptionSample: z.string(),
  isRequired       : z.boolean(),
  sortOrder        : z.number(),
  categoryName     : z.string(),
  id               : z.number(),
  categoryId       : z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore
export namespace CategoryEntity {
  export type CategoryRes       = z.infer<typeof CategoryResDto>;
  export type CategoryDetailRes = z.infer<typeof CategoryDetailResDto>;
}
