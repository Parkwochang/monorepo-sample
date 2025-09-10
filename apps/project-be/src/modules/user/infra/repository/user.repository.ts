import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { ZodSerializerDto } from 'nestjs-zod';

import { PrismaService } from '@/db/service/prisma.service';
import { IUserRepository } from '@/modules/user/domain/interface';
import { UserDto } from '@/modules/user/app/dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id, isDeleted: false },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, isDeleted: false },
    });
  }

  // @ZodSerializerDto(FoodOptionDto.Params)
  async findMany(parmas: UserDto.Params, tx: Prisma.TransactionClient = this.prisma) {
    const { page, take, ...where } = parmas;

    const data = await tx.user.findMany({
      orderBy: { id: 'desc' },
      skip: page * take,
      take,
      where,
    });

    return data;
  }

  async create(data: UserDto.Create): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: UserDto.Update): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  // async save(user: User): Promise<User> {
  //   const { password } = user;

  //   const hashedPassword = password && (await hash(password, 10));

  //   return this.prisma.user.upsert({
  //     where: { id: user.id },
  //     create: { ...user, password: hashedPassword },
  //     update: { ...user, password: hashedPassword },
  //   });
  // }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
