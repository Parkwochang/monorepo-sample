import { User } from '@prisma/client';

import { UserDto } from '@/modules/user/app/dto';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findMany(parmas: UserDto.Params): Promise<User[]>;
  // save(user: User): Promise<User>;
  create(data: UserDto.Create): Promise<User>;
  update(id: number, data: UserDto.Update): Promise<User>;
  delete(id: number): Promise<void>;
}
