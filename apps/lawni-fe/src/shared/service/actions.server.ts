'use server';

import { redirect } from 'next/navigation';

import { parseJWT } from '@repo/utils';
import type { AuthEntity } from '@workspace/http/must/auth';

import { checkUserRole } from '@/lib/utils';
import { deleteServerCookie, getServerCookie, redirectPage, setServerCookie } from './utils.server';
import { getTime, parse } from 'date-fns';

// ----------------------------------------------------------------------
// ! 유저 정보 관리

export async function getParsedUserJwt() {
  const accessToken = (await getServerCookie('WSAT')) as string | undefined;

  return parseJWT(accessToken) as AuthEntity.UserInfo | undefined;
}

// ----------------------------------------------------------------------
// ! 로그인 관리

export async function logout() {
  deleteServerCookie(['WSAT']);
}

export async function processLogin(accessToken: string) {
  if (!accessToken) return null;

  const userRole = checkUserRole(parseJWT(accessToken) as AuthEntity.UserInfo);

  if (process.env.NODE_ENV === 'development') {
    await setServerCookie([
      {
        name: 'WSAT',
        value: accessToken,
        options: {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 30,
        },
      },
    ]);
  }

  return userRole;
}

// ----------------------------------------------------------------------

export async function getTokenExpiredTime(token: AuthEntity.UserInfo) {
  const { exp } = token;

  const now = getTime(new Date()) + 9 * 60 * 60 * 1000; // 한국 시간 변환

  return (exp - 30) * 1000 < now;
}

// ----------------------------------------------------------------------

export async function redirectByRole(role: Awaited<ReturnType<typeof checkUserRole>>) {
  if (!role) return null;
  redirectPage(`/${role.toLowerCase()}`);
}

// ----------------------------------------------------------------------

/**
 * 유저 권한 검증
 * @param role 검증할 권한 (ADMIN, LEADER, PASTOR, MEMBER)
 * @type (AuthEntity.UserInfo['role'])
 * @returns AuthEntity.UserInfo | null
 * @description 유저 권한 검증 후 유저 정보 반환 검증 실패시 로그인 페이지 이동
 * @example
 * await validateUserPermissions('ADMIN');
 */
export async function validateUserPermissions(role: AuthEntity.UserInfo['role']) {
  const userInfo = await getParsedUserJwt();
  const userPermissions = checkUserRole(userInfo);

  if (userPermissions === role) {
    return userInfo as AuthEntity.UserInfo;
  }

  redirect('/sign-in');
}

// ----------------------------------------------------------------------

/**
 * 권한 없는 유저 리다이렉트
 * @returns 권한 없는 유저 리다이렉트 (ADMIN, LEADER, PASTOR, MEMBER)
 * @type {AuthEntity.UserInfo['role']}
 * @description 현재 사이트에 접근 할 수 없는 권한 전체를 리다이렉트 처리
 * @example
 * await redirectToAuthorizedPage();
 */
export async function redirectToAuthorizedPage() {
  const userPermissions = checkUserRole(await getParsedUserJwt());

  return redirectByRole(userPermissions);
}
