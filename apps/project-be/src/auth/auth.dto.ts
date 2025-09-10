import z from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

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
// ! USER
// prettier-ignore

const CreateUserSchema = z.object({
  name         : z.string(),
  email        : z.string(),
  password     : z.string(),
  provider     : z.enum(['EMAIL', 'GOOGLE', 'APPLE', 'KAKAO', 'NAVER']).default('EMAIL'),
  role         : z.enum(['MEMBER', 'ADMIN']).default('MEMBER'),
  isActive     : z.boolean().default(true),
  isDeleted    : z.boolean().default(false),
})

const UpdateUserSchema = CreateUserSchema.partial();

// ----------------------------------------------------------------------
// prettier-ignore

const UserParamsSchema = PaginationSchema.extend({
  id           : numericStringSchema.optional(),
  email        : z.string().optional(),
  name         : z.string().optional(),
  provider     : z.enum(['EMAIL', 'GOOGLE', 'APPLE', 'KAKAO', 'NAVER']).optional(),
  role         : z.enum(['MEMBER', 'ADMIN']).optional(),
  isActive     : z.boolean().optional().default(true),
  isDeleted    : z.boolean().optional().default(false),
});

// ----------------------------------------------------------------------
// prettier-ignore

const LoginSchema = z.object({
  email        : z.string(),
  password     : z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export namespace AuthDto {
  export class Create extends createZodDto(CreateUserSchema) {}

  export class Update extends createZodDto(UpdateUserSchema) {}

  export class Params extends createZodDto(UserParamsSchema) {}

  export class Login extends createZodDto(LoginSchema) {}
}
