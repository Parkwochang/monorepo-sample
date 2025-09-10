import { ForbiddenException, Header, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { AuthDto } from '../dto';
import { UserRepository } from '@/modules/user/infra/repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(body: AuthDto.Login) {
    const user = await this.userRepository.findByEmail(body.email);

    if (!user) throw new UnauthorizedException('이메일이 일치하지 않습니다.');

    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return user;
  }

  async signOut() {
    return { message: '로그아웃 되었습니다.' };
  }
}
