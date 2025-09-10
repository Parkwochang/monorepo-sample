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
  .or(z.number({ message: '숫자를 입력해주세요.' }))
  .transform(Number);

const PasswordSchema = z
  .string()
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{10,20}$/,
    { message: '비밀번호는 10자 이상 20자 이하의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.' },
  );
// ----------------------------------------------------------------------
// ! USER
// prettier-ignore

const CreateUserSchema = z.object({
  name         : z.string().trim().min(1, { message: '이름을 입력해주세요.' }),
  email        : z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  password     : PasswordSchema,
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
  email        : z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }).optional(),
  name         : z.string().trim().min(1, { message: '이름을 입력해주세요.' }).optional(),
  provider     : z.enum(['EMAIL', 'GOOGLE', 'APPLE', 'KAKAO', 'NAVER']).optional(),
  role         : z.enum(['MEMBER', 'ADMIN']).optional(),
  isActive     : z.boolean().optional().default(true),
  isDeleted    : z.boolean().optional().default(false),
});

// ----------------------------------------------------------------------
// prettier-ignore

export namespace UserDto {
  export class Create extends createZodDto(CreateUserSchema) {}

  export class Update extends createZodDto(UpdateUserSchema) {}

  export class Params extends createZodDto(UserParamsSchema) {}
}
