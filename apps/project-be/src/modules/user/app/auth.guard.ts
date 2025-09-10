import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request as expReq } from 'express';

import { APP_CONFIG } from '@/config';
import { UserRepository } from '../infra/repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.get('WSAT');

    if (!token) {
      throw new UnauthorizedException('인증 토큰이 없습니다.');
    }

    this.logger.log('인증이 성공하였습니다.');

    return true;
  }
}

// export class AuthGuard extends NestAuthGuard('jwt') {
//   canActivate(context: ExecutionContext): any {
//     return super.canActivate(context);
//   }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly userRepository: UserRepository) {
    super({
      secretOrKey: APP_CONFIG.KEY['JWT_SECRET'] || 'super-secret-key',
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: expReq) => {
          return request?.cookies.WSAT;
        },
      ]),
    });
  }

  async validate(payload) {
    this.logger.log(payload);

    const { email } = payload;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 유저입니다.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('서비스 이용이 승인되지 않은 유저입니다.');
    }

    return user;
  }
}
