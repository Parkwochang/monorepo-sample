import { NextResponse } from 'next/server';
import type { MiddlewareConfig, NextFetchEvent, NextRequest } from 'next/server';

import type { AuthEntity } from '@workspace/http/lawni/auth';
import { parseJWT } from '@repo/utils';

import { getValidateUserToken, getTokenExpiredTime } from './shared/service';
import { MIDDLEWARE_MATCHER } from './config/setting';

// ----------------------------------------------------------------------

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const isMatch = MIDDLEWARE_MATCHER.some((matcher) => pathname.startsWith(matcher));

  console.log('isMatch : ', isMatch);

  if (!isMatch) return response;

  try {
    const userInfo = parseJWT(request.cookies.get('WSAT')?.value ?? '') as AuthEntity.UserInfo | null;

    if (!userInfo) return NextResponse.redirect(new URL('/', request.url)).cookies.delete('WSAT');

    const isExpired = await getTokenExpiredTime(userInfo);

    console.log('isExpired : ', isExpired);

    if (isExpired) {
      const newToken = await getValidateUserToken(request.cookies.get('WSAT')?.value ?? '');

      newToken &&
        response.cookies.set('WSAT', newToken, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 10, // 10 minutes
        });
    }

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url)).cookies.delete('WSAT');
  }

  // event.waitUntil(
  //   new Promise((resolve) => {
  //     setTimeout(resolve, 1000);
  //   }),
  // );
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!sign-in|api|favicon.ico|sitemap.xml|robots.txt|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
