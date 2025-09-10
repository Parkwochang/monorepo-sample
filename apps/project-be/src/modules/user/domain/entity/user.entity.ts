import { User as PrismaUser } from '@prisma/client';

export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
  PASTOR = 'PASTOR',
}

export class UserEntity {
  constructor(private data: PrismaUser) {}

  public activate(): void {
    this.data.isActive = true;
  }

  public deactivate(): void {
    this.data.isActive = false;
  }

  public isAdmin(): boolean {
    return this.data.role === UserRole.ADMIN;
  }

  get isActive(): boolean {
    return this.data.isActive;
  }
}
