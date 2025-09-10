import z from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

// ----------------------------------------------------------------------
// prettier-ignore

const LoginSchema = z.object({
  email        : z.string(),
  password     : z.string(),
});

const LogoutSchema = z.object({
  email: z.number(),
});

const RefreshTokenSchema = z.object({
  accessToken: z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export namespace AuthDto {
  export class Login extends createZodDto(LoginSchema) {}

  export class Logout extends createZodDto(LogoutSchema) {}

  export class RefreshToken extends createZodDto(RefreshTokenSchema) {}
}
