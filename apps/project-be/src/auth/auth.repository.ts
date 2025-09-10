import { ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { hash, compare, genSalt } from 'bcrypt';
import { ZodSerializerDto } from 'nestjs-zod';

import { PrismaService } from '@/db/service/prisma.service';
import { AuthDto } from './auth.dto';

interface IAuthRepository {
  findOneUser(id: number): Promise<User | null>;
  findUsers(parmas: AuthDto.Params): Promise<User[]>;
  createUser(user: AuthDto.Create): Promise<User>;
  updateUser(id: number, user: AuthDto.Update): Promise<User>;
  deleteUser(id: number): Promise<User>;
  login(user: AuthDto.Login): Promise<User | null>;
}

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id, isDeleted: false },
    });
  }

  // @ZodSerializerDto(FoodOptionDto.Params)
  async findUsers(parmas: AuthDto.Params, tx: Prisma.TransactionClient = this.prisma) {
    const { page, take, ...where } = parmas;

    const data = await tx.user.findMany({
      orderBy: { id: 'desc' },
      skip: page * take,
      take,
      where,
    });
    Logger.log(data);
    return data;
  }

  async createUser(data: AuthDto.Create): Promise<User> {
    return this.prisma.user.create({ data: { ...data, password: await hash(data.password, 10) } });
  }

  async updateUser(id: number, data: AuthDto.Update): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async login(data: AuthDto.Login): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email: data.email } });
  }
}
