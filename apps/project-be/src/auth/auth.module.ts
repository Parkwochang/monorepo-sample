import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [JwtModule.register({ global: true, signOptions: { expiresIn: '10m' } })],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
