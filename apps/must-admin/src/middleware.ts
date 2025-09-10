import { NextResponse } from 'next/server';
import type { MiddlewareConfig, NextRequest } from 'next/server';

import type { AuthEntity } from '@workspace/http/lawni/auth';
import { parseJWT } from '@repo/utils';

import { validateAccessToken, getTokenExpiredTime } from './shared/service';
import { MIDDLEWARE_MATCHER } from './config/config-map';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  const redirect = NextResponse.redirect(new URL(`/`, request.url));

  const isMatch = MIDDLEWARE_MATCHER.some((matcher) => pathname.startsWith(matcher));

  if (!isMatch) return response;

  try {
    const userInfo = parseJWT(request.cookies.get('WSAT')?.value ?? '') as AuthEntity.UserInfo | null;

    if (!userInfo) return redirect;

    const isExpired = await getTokenExpiredTime(userInfo);

    if (isExpired) {
      const newToken = await validateAccessToken(request.cookies.get('WSAT')?.value ?? '');

      console.log('change token : ', newToken);

      newToken &&
        response.cookies.set('WSAT', newToken, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60, // 10 minutes
        });
    }

    return response;
  } catch (error) {
    console.log('middleware : 401 error');
    return redirect.cookies.delete('WSAT');
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!sign-up|api|favicon.ico|sitemap.xml|robots.txt|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
