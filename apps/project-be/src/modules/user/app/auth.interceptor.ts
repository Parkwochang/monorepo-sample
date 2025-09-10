import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request as expReq, Response as expRes } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  constructor(/* private readonly authService: AuthService */) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((data) => {
        if (data?.accessToken) {
          this.setTokenCookie({ response, name: 'WSAT', token: data.token, maxAge: 5 * 60 * 1000 });

          return response.redirect(302, '/');
          // delete data.token;
        }
      }),
    );
  }

  private setTokenCookie({
    response,
    name,
    token,
    maxAge,
  }: {
    response: expRes;
    name: string;
    token: string;
    maxAge: number;
  }) {
    response.cookie(name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge,
    });
  }

  // @Res({ passthrough: true })
}
