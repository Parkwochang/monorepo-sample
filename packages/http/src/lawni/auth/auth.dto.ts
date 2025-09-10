import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore
const LoginDto = z.object({
  username: z.string().trim().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().trim().min(1, { message: '비밀번호를 입력해주세요' }),
});

// ----------------------------------------------------------------------
// prettier-ignore
const OauthLoginDto = z.object({
  accountId: z.string().trim().min(1, { message: '아이디를 입력해주세요' }),
  name: z.string().trim().min(1, { message: '이름을 입력해주세요' }),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
});

// ----------------------------------------------------------------------
// prettier-ignore
const LoginResDto = z.object({
  accessToken: z.string().trim().min(1),
});

// ----------------------------------------------------------------------
// prettier-ignore

const UserInfoDto = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  name: z.string(),
  role: z.enum(['MEMBER', 'LEADER', 'PASTOR', 'ADMIN']),
  exp: z.number(),
  iat: z.number(),
  id: z.number(),
  isActive: z.boolean(),
  churchId: z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore
export namespace AuthEntity {
  export type Login           = z.input<typeof LoginDto>;
  export type LoginRes        = z.infer<typeof LoginResDto>;
  export type OauthLogin      = z.input<typeof OauthLoginDto>;
  export type UserInfo        = z.infer<typeof UserInfoDto>;
}

export { LoginDto, LoginResDto, OauthLoginDto, UserInfoDto };
