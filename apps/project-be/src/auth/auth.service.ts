import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { AuthDto } from './auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(body: AuthDto.Login) {
    const user = await this.authRepository.login(body);

    if (!user) throw new UnauthorizedException('이메일이 일치하지 않습니다.');

    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return user;
  }

  async findUsers(body: AuthDto.Params) {
    return this.authRepository.findUsers(body);
  }

  async findOneUser(id: number) {
    return this.authRepository.findOneUser(id);
  }

  async createUser(body: AuthDto.Create) {
    return this.authRepository.createUser(body);
  }

  async updateUser(id: number, body: AuthDto.Update) {
    return this.authRepository.updateUser(id, body);
  }

  async deleteUser(id: number) {
    return this.authRepository.deleteUser(id);
  }
}
