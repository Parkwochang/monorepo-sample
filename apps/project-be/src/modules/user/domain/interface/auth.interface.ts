import { AuthDto } from '@/modules/user/app/dto';

export interface IAuthRepository {
  login(user: AuthDto.Login): Promise<string | null>;
  logout(accessToken: string): Promise<void>;
  refreshToken(accessToken: string): Promise<string>;
}
