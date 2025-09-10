import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserDto } from '@/modules/user/app/dto';
import { UserRepository } from '@/modules/user/infra/repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(body: UserDto.Params) {
    return this.userRepository.findMany(body);
  }

  async findByIdUser(id: number) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async createUser(body: UserDto.Create) {
    return this.userRepository.create({ ...body, password: await hash(body.password, 10) });
  }

  async updateUser(id: number, body: UserDto.Update) {
    return this.userRepository.update(id, body);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
